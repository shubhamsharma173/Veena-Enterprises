// Operator-only tool: secrets are read from this shell's environment, never from the browser.
import { notifyLead } from "../lib/contact-handler.mjs";
const required = [
  "CLOUDFLARE_ACCOUNT_ID",
  "CLOUDFLARE_DATABASE_ID",
  "CLOUDFLARE_API_TOKEN",
  "RESEND_API_KEY",
  "LEAD_FROM_EMAIL",
  "LEAD_NOTIFY_EMAIL",
];
for (const name of required)
  if (!process.env[name])
    throw new Error("Missing environment variable: " + name);
async function query(sql, params = []) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.CLOUDFLARE_API_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
      signal: AbortSignal.timeout(15000),
    },
  );
  const data = await response.json();
  if (!response.ok || !data.success || !data.result?.[0]?.success)
    throw new Error(
      "D1 query failed; inspect your account and token permissions.",
    );
  return data.result[0].results;
}
const DB = {
  prepare(sql) {
    return {
      bind(...params) {
        return { run: () => query(sql, params) };
      },
    };
  },
};
const leads = await query(
  "SELECT id, name, phone, message FROM leads WHERE notification_status IN ('pending','failed','unconfigured') AND created_at < strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-5 minutes') ORDER BY created_at LIMIT 20",
);
for (const lead of leads) {
  await notifyLead({ ...process.env, DB }, lead);
  console.log("Processed notification reference " + lead.id.slice(0, 8));
}
console.log(
  "Review notification_status in D1 to confirm provider acceptance; this is not proof of inbox delivery.",
);
