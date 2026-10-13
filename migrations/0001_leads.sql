CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  consent_version TEXT NOT NULL,
  payload_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','contacted','quoted','won','closed')),
  notification_status TEXT NOT NULL DEFAULT 'pending' CHECK(notification_status IN ('pending','sent','failed','unconfigured')),
  notification_id TEXT
);
CREATE INDEX IF NOT EXISTS leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS leads_notification ON leads(notification_status);
CREATE TABLE IF NOT EXISTS contact_rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS rate_expiry ON contact_rate_limits(expires_at);
