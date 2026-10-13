import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import {
  handleContact,
  notifyLead,
  validateLead,
} from "../lib/contact-handler.mjs";
const valid = {
  name: "Local QA",
  phone: "9876543210",
  message: "Local test inquiry, not a customer.",
  consent: true,
  website: "",
  turnstileToken: "test-token",
};
function fixture() {
  const db = new DatabaseSync(":memory:");
  db.exec(
    readFileSync(
      new URL("../migrations/0001_leads.sql", import.meta.url),
      "utf8",
    ),
  );
  const DB = {
    prepare(sql) {
      return {
        bind(...args) {
          return {
            async first() {
              return db.prepare(sql).get(...args) ?? null;
            },
            async run() {
              return db.prepare(sql).run(...args);
            },
          };
        },
      };
    },
  };
  return {
    db,
    env: {
      DB,
      TURNSTILE_SECRET_KEY: "production-test-mock",
      RATE_LIMIT_SECRET: "test-only",
      RESEND_API_KEY: "mock",
      LEAD_FROM_EMAIL: "leads@example.com",
      LEAD_NOTIFY_EMAIL: "inbox@example.com",
    },
  };
}
function request(
  data = valid,
  {
    key = crypto.randomUUID(),
    origin = "https://veenasolar.com",
    method = "POST",
    url = "https://veenasolar.com/api/contact",
    headers = {},
  } = {},
) {
  return new Request(url, {
    method,
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      "Idempotency-Key": key,
      "CF-Connecting-IP": "192.0.2.1",
      ...headers,
    },
    ...(method === "POST" ? { body: JSON.stringify(data) } : {}),
  });
}
const verification = async () =>
  Response.json({
    success: true,
    hostname: "veenasolar.com",
    action: "contact",
  });
async function run(req, env, fetcher = verification) {
  const pending = [];
  const response = await handleContact(
    req,
    env,
    (p) => pending.push(p),
    fetcher,
  );
  await Promise.all(pending);
  return response;
}
test("normalizes Indian mobile formats without losing name or message", () => {
  for (const phone of [
    "9876543210",
    "+91 98765 43210",
    "919876543210",
    "09876543210",
  ])
    assert.equal(validateLead({ ...valid, phone }).phone, "+919876543210");
});
test("rejects malformed or excessive fields, missing consent and honeypot", () => {
  for (const data of [
    null,
    [],
    {},
    { ...valid, name: "x" },
    { ...valid, name: "a\nb" },
    { ...valid, phone: "1234567890" },
    { ...valid, phone: "987654321012" },
    { ...valid, message: "short" },
    { ...valid, message: "x".repeat(2001) },
    { ...valid, consent: "true" },
    { ...valid, website: "spam" },
  ])
    assert.equal(validateLead(data), null);
});
test("saves valid lead even when email provider fails", async (t) => {
  const { db, env } = fixture();
  t.after(() => db.close());
  const response = await run(request(), env, async (url) =>
    url.includes("siteverify")
      ? verification()
      : Response.json({ error: "unavailable" }, { status: 503 }),
  );
  assert.equal(response.status, 201);
  const row = db.prepare("SELECT * FROM leads").get();
  assert.equal(row.phone, "+919876543210");
  assert.equal(row.notification_status, "failed");
});
test("records notification provider acceptance and fixed business recipient", async (t) => {
  const { db, env } = fixture();
  t.after(() => db.close());
  await run(request(), env, async (url, options) => {
    if (url.includes("siteverify")) return verification();
    assert.deepEqual(JSON.parse(options.body).to, ["inbox@example.com"]);
    assert.ok(options.headers["Idempotency-Key"].startsWith("lead/"));
    return Response.json({ id: "email-123" });
  });
  assert.equal(
    db.prepare("SELECT notification_id FROM leads").get().notification_id,
    "email-123",
  );
});
test("missing email configuration preserves the inquiry for manual follow-up", async (t) => {
  const { db, env } = fixture();
  t.after(() => db.close());
  delete env.RESEND_API_KEY;
  assert.equal((await run(request(), env)).status, 201);
  assert.equal(
    db.prepare("SELECT notification_status FROM leads").get()
      .notification_status,
    "unconfigured",
  );
});
test("retry is idempotent even with an expired Turnstile token", async (t) => {
  const { db, env } = fixture();
  t.after(() => db.close());
  delete env.RESEND_API_KEY;
  const key = crypto.randomUUID();
  await run(request(valid, { key }), env);
  assert.equal(
    (
      await run(request({ ...valid, turnstileToken: "" }, { key }), env, () => {
        throw new Error("must not call");
      })
    ).status,
    200,
  );
  assert.equal(db.prepare("SELECT count(*) AS n FROM leads").get().n, 1);
  assert.equal(
    (await run(request({ ...valid, name: "Changed name" }, { key }), env))
      .status,
    409,
  );
});
test("rejects cross-origin, absent origin, GET and wrong content type", async (t) => {
  const { db, env } = fixture();
  t.after(() => db.close());
  assert.equal(
    (await run(request(valid, { origin: "https://evil.example" }), env)).status,
    403,
  );
  assert.equal((await run(request(valid, { origin: "" }), env)).status, 403);
  assert.equal((await run(request(valid, { method: "GET" }), env)).status, 405);
  assert.equal(
    (
      await run(
        request(valid, { headers: { "Content-Type": "text/plain" } }),
        env,
      )
    ).status,
    415,
  );
  assert.equal(db.prepare("SELECT count(*) AS n FROM leads").get().n, 0);
});
test("requires production protection and cannot enable local bypass on public host", async (t) => {
  const { db, env } = fixture();
  t.after(() => db.close());
  env.LOCAL_DEV = "true";
  delete env.TURNSTILE_SECRET_KEY;
  assert.equal((await run(request(), env)).status, 503);
  env.TURNSTILE_SECRET_KEY = "1x0000000000000000000000000000000AA";
  assert.equal((await run(request(), env)).status, 503);
});
test("rejects invalid, expired, wrong-host and wrong-action security checks", async (t) => {
  const { db, env } = fixture();
  t.after(() => db.close());
  for (const result of [
    { success: false },
    { success: true, hostname: "evil.example", action: "contact" },
    { success: true, hostname: "veenasolar.com", action: "other" },
  ]) {
    assert.equal(
      (await run(request(), env, async () => Response.json(result))).status,
      400,
    );
  }
  assert.equal(db.prepare("SELECT count(*) AS n FROM leads").get().n, 0);
});
test("rate limit is enforced before repeated verification calls", async (t) => {
  const { db, env } = fixture();
  t.after(() => db.close());
  for (let i = 0; i < 5; i++)
    await run(request(), env, async () => Response.json({ success: false }));
  const response = await run(request(), env, () => {
    throw new Error("should not call");
  });
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "600");
});
test("rejects oversized bodies and invalid request keys", async (t) => {
  const { db, env } = fixture();
  t.after(() => db.close());
  assert.equal(
    (await run(request(valid, { headers: { "Content-Length": "13000" } }), env))
      .status,
    413,
  );
  assert.equal(
    (await run(request({ ...valid, message: "x".repeat(13000) }), env)).status,
    400,
  );
  assert.equal(
    (await run(request(valid, { key: "invalid" }), env)).status,
    400,
  );
});
test("database failure never reports a successful submission", async () => {
  const response = await run(request(), {
    DB: {
      prepare() {
        throw new Error("unavailable");
      },
    },
    TURNSTILE_SECRET_KEY: "configured",
    RATE_LIMIT_SECRET: "configured",
  });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, undefined);
});
test("SQL-like input is stored as text using bound parameters", async (t) => {
  const { db, env } = fixture();
  t.after(() => db.close());
  delete env.RESEND_API_KEY;
  const data = {
    ...valid,
    name: "O'Connor",
    message: "'; DROP TABLE leads; -- a test inquiry",
  };
  assert.equal((await run(request(data), env)).status, 201);
  assert.equal(
    db.prepare("SELECT message FROM leads").get().message,
    data.message,
  );
});
test("local development works only on loopback with explicit local flag", async (t) => {
  const { db, env } = fixture();
  t.after(() => db.close());
  env.LOCAL_DEV = "true";
  delete env.RESEND_API_KEY;
  delete env.TURNSTILE_SECRET_KEY;
  assert.equal(
    (
      await run(
        request(valid, {
          url: "http://127.0.0.1:3000/api/contact",
          origin: "http://127.0.0.1:3000",
        }),
        env,
        () => {
          throw new Error("no external calls");
        },
      )
    ).status,
    201,
  );
});
test("notification retry can update a stored failed lead", async (t) => {
  const { db, env } = fixture();
  t.after(() => db.close());
  const key = crypto.randomUUID();
  await run(request(valid, { key }), env, async (url) =>
    url.includes("siteverify")
      ? verification()
      : Response.json({}, { status: 500 }),
  );
  await notifyLead(env, { ...validateLead(valid), id: key }, async () =>
    Response.json({ id: "retried-email" }),
  );
  assert.equal(
    db.prepare("SELECT notification_status FROM leads").get()
      .notification_status,
    "sent",
  );
});
