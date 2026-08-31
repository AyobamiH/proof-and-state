CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL,
  channel TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('QUEUED','SUBMITTED','PUBLISHED_VERIFIED','RETRYABLE','BLOCKED','FAILED')),
  scheduled_at TEXT NOT NULL,
  idempotency_key TEXT NOT NULL UNIQUE,
  provider_post_id TEXT,
  payload_json TEXT NOT NULL,
  verified_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS jobs_due ON jobs(status, scheduled_at);

CREATE TABLE IF NOT EXISTS attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id TEXT NOT NULL REFERENCES jobs(id),
  event TEXT NOT NULL,
  details_json TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id TEXT NOT NULL REFERENCES jobs(id),
  phase TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);
