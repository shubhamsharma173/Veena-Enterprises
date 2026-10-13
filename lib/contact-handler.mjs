/* eslint-disable no-control-regex -- Reject control characters in user-submitted text. */
const MAX_BODY = 12000;
const localHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);
export function validateLead(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  if (
    typeof data.name !== "string" ||
    typeof data.phone !== "string" ||
    typeof data.message !== "string"
  )
    return null;
  const name = data.name.trim(),
    message = data.message.trim();
  const phone = data.phone
    .replace(/[\s()-]/g, "")
    .replace(/^(?:\+91|91|0)(?=[6-9]\d{9}$)/, "");
  if (name.length < 2 || name.length > 80 || /[\u0000-\u001f\u007f]/.test(name))
    return null;
  if (
    !/^[6-9]\d{9}$/.test(phone) ||
    data.phone.length > 20 ||
    message.length < 10 ||
    message.length > 2000
  )
    return null;
  if (
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(message) ||
    data.consent !== true ||
    data.website
  )
    return null;
  return { name, phone: "+91" + phone, message, consent: true };
}
function json(status, body, extra = {}) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extra,
    },
  });
}
async function bodyJSON(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("body");
  let size = 0;
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) {
      await reader.cancel();
      throw new Error("size");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}
async function digest(text) {
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(bytes), (x) =>
    x.toString(16).padStart(2, "0"),
  ).join("");
}
async function ipHash(ip, secret, bucket) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const result = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(bucket + ":" + ip),
  );
  return Array.from(new Uint8Array(result), (x) =>
    x.toString(16).padStart(2, "0"),
  ).join("");
}
export async function notifyLead(env, lead, fetcher = fetch) {
  if (!env.RESEND_API_KEY || !env.LEAD_FROM_EMAIL || !env.LEAD_NOTIFY_EMAIL) {
    await env.DB.prepare(
      "UPDATE leads SET notification_status = 'unconfigured' WHERE id = ?",
    )
      .bind(lead.id)
      .run();
    return;
  }
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.RESEND_API_KEY,
        "Content-Type": "application/json",
        "Idempotency-Key": "lead/" + lead.id,
      },
      body: JSON.stringify({
        from: env.LEAD_FROM_EMAIL,
        to: [env.LEAD_NOTIFY_EMAIL],
        subject: "New solar inquiry — " + lead.id.slice(0, 8),
        text: [
          "A new website inquiry has been saved.",
          "",
          "Reference: " + lead.id,
          "Name: " + lead.name,
          "Phone: " + lead.phone,
          "",
          "Message:",
          lead.message,
          "",
          "Consent: contact about this inquiry only.",
          "Manage this lead in the Cloudflare D1 leads table.",
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.id) throw new Error("provider");
    await env.DB.prepare(
      "UPDATE leads SET notification_status = 'sent', notification_id = ? WHERE id = ?",
    )
      .bind(result.id, lead.id)
      .run();
  } catch {
    await env.DB.prepare(
      "UPDATE leads SET notification_status = 'failed' WHERE id = ?",
    )
      .bind(lead.id)
      .run();
  }
}
export async function handleContact(request, env, waitUntil, fetcher = fetch) {
  if (request.method !== "POST")
    return json(
      405,
      { error: "Use POST to submit an inquiry." },
      { Allow: "POST" },
    );
  const url = new URL(request.url);
  const local = env.LOCAL_DEV === "true" && localHosts.has(url.hostname);
  const origins = (
    env.ALLOWED_ORIGINS || "https://veenasolar.com,https://www.veenasolar.com"
  )
    .split(",")
    .map((x) => x.trim());
  if (local) origins.push(url.origin);
  if (!origins.includes(request.headers.get("Origin")))
    return json(403, { error: "Please submit the form from our website." });
  if (
    !request.headers
      .get("Content-Type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return json(415, {
      error: "Please submit the form on our website, or call +91 82332 61929.",
    });
  if (Number(request.headers.get("Content-Length")) > MAX_BODY)
    return json(413, { error: "Your message is too large." });
  if (
    !env.DB ||
    (!local &&
      (!env.TURNSTILE_SECRET_KEY ||
        !env.RATE_LIMIT_SECRET ||
        /^[123]x000000/.test(env.TURNSTILE_SECRET_KEY)))
  )
    return json(503, {
      error:
        "Online inquiries are temporarily unavailable. Please call +91 82332 61929.",
    });
  let data;
  try {
    data = await bodyJSON(request);
  } catch {
    return json(400, {
      error: "Please check your form details and try again.",
    });
  }
  const lead = validateLead(data);
  if (!lead)
    return json(400, {
      error:
        "Please enter a valid name, Indian mobile number, message and contact consent.",
    });
  const key = request.headers.get("Idempotency-Key") || "";
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      key,
    )
  )
    return json(400, { error: "Please refresh the page and try again." });
  try {
    const fingerprint = await digest(JSON.stringify(lead));
    const existing = await env.DB.prepare(
      "SELECT id, payload_hash FROM leads WHERE id = ?",
    )
      .bind(key)
      .first();
    if (existing)
      return existing.payload_hash === fingerprint
        ? json(200, { ok: true, reference: key.slice(0, 8) })
        : json(409, {
            error: "The inquiry changed. Please refresh and submit again.",
          });
    const now = Math.floor(Date.now() / 1000),
      bucket = Math.floor(now / 600);
    const network =
      request.headers.get("CF-Connecting-IP") || (local ? "local" : null);
    if (!network)
      return json(503, {
        error: "Online inquiries are temporarily unavailable. Please call us.",
      });
    const hash = await ipHash(
      network,
      env.RATE_LIMIT_SECRET || "local-development-only",
      bucket,
    );
    const rate = await env.DB.prepare(
      "INSERT INTO contact_rate_limits (key, count, expires_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count = count + 1 RETURNING count",
    )
      .bind(hash, now + 1200)
      .first();
    if (!rate || rate.count > 5)
      return json(
        429,
        { error: "Too many attempts. Please wait 10 minutes or call us." },
        { "Retry-After": "600" },
      );
    if (!local) {
      if (
        typeof data.turnstileToken !== "string" ||
        !data.turnstileToken ||
        data.turnstileToken.length > 2048
      )
        return json(400, { error: "Please complete the security check." });
      const check = await fetcher(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: env.TURNSTILE_SECRET_KEY,
            response: data.turnstileToken,
            remoteip: network,
          }),
          signal: AbortSignal.timeout(8000),
        },
      );
      const verified = await check.json();
      const hosts = origins.map((origin) => new URL(origin).hostname);
      if (
        !check.ok ||
        !verified.success ||
        verified.action !== "contact" ||
        !hosts.includes(verified.hostname)
      )
        return json(400, {
          error: "The security check expired or failed. Please try again.",
        });
    }
    const inserted = await env.DB.prepare(
      "INSERT INTO leads (id, name, phone, message, consent_version, payload_hash, notification_status) VALUES (?, ?, ?, ?, '2026-10-12', ?, 'pending') ON CONFLICT(id) DO NOTHING RETURNING id",
    )
      .bind(key, lead.name, lead.phone, lead.message, fingerprint)
      .first();
    if (!inserted) {
      const duplicate = await env.DB.prepare(
        "SELECT id, payload_hash FROM leads WHERE id = ?",
      )
        .bind(key)
        .first();
      if (duplicate?.payload_hash !== fingerprint)
        return json(409, {
          error: "The inquiry changed. Please refresh and submit again.",
        });
    } else {
      waitUntil(
        notifyLead(env, { ...lead, id: key }, fetcher).catch(() =>
          console.error(
            "Lead notification status update failed; review pending notifications.",
          ),
        ),
      );
    }
    waitUntil(
      env.DB.prepare("DELETE FROM contact_rate_limits WHERE expires_at < ?")
        .bind(now)
        .run()
        .catch(() => console.error("Rate-limit cleanup failed.")),
    );
    return json(201, { ok: true, reference: key.slice(0, 8) });
  } catch {
    console.error("Contact submission failed; no customer data logged.");
    return json(503, {
      error:
        "We could not confirm your inquiry. Please try again or call +91 82332 61929.",
    });
  }
}
