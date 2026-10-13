import type { PagesFunction, D1Database } from "@cloudflare/workers-types";
import { handleContact } from "../../lib/contact-handler.mjs";
interface Env {
  DB: D1Database;
  TURNSTILE_SECRET_KEY: string;
  RATE_LIMIT_SECRET: string;
  ALLOWED_ORIGINS?: string;
  RESEND_API_KEY?: string;
  LEAD_FROM_EMAIL?: string;
  LEAD_NOTIFY_EMAIL?: string;
  LOCAL_DEV?: string;
}
// The shared handler uses the standard Fetch API in Node tests. In Pages its
// global Response is Cloudflare's Response, including the Workers extensions.
export const onRequest = (context: Parameters<PagesFunction<Env>>[0]) =>
  handleContact(context.request, context.env, context.waitUntil.bind(context));
