import { readFileSync } from "node:fs";
import { parse } from "jsonc-parser";
const parseErrors = [];
const config = parse(
  readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8"),
  parseErrors,
  { allowTrailingComma: true },
);
if (parseErrors.length) throw new Error("Fix invalid JSONC in wrangler.jsonc before deployment.");
const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const database = config.d1_databases?.find((item) => item.binding === "DB");
const errors = [];
if (!key || /^[123]x000000/.test(key))
  errors.push(
    "Set a real NEXT_PUBLIC_TURNSTILE_SITE_KEY in the build environment.",
  );
if (
  !database?.database_id ||
  database.database_id === "00000000-0000-0000-0000-000000000000"
)
  errors.push(
    "Replace the local placeholder D1 database ID in wrangler.jsonc.",
  );
if (process.env.LOCAL_DEV || config.vars?.LOCAL_DEV)
  errors.push("Remove LOCAL_DEV from the cloud build and runtime environment.");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  "Public deployment configuration checked. Verify runtime secrets, DNS and email delivery using docs/DEPLOYMENT.md.",
);
