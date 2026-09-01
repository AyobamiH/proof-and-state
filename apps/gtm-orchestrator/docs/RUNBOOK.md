# Operations runbook

## Normal cycle

1. Observe product and channel evidence.
2. Create a platform-native job and durable Cloudinary asset.
3. Validate destination, UTM, rotation, account identity, permission and approval mode.
4. Queue the job with a deterministic idempotency key.
5. Submit through the direct provider adapter.
6. Read back and reconcile the exact provider object.
7. Record the receipt and measurement cursor.

## Failure response

- `401` or `403`: block the provider connection; request reauthorisation or permission correction once.
- `408`, `429`, or `5xx`: preserve the job and retry with controlled backoff.
- Timeout after mutation: query by provider identity or recent-post window before any retry.
- Missing provider post ID: block; do not infer success.
- Read-back mismatch: block and preserve both intended and observed digests.
- Provider API unavailable: leave queued; do not use a browser or third-party intermediary.

## Activation

Keep `PUBLISHING_ENABLED=false` through provisioning, provider review, permission probes, contract tests, and the canary preparation. Set it to `true` only for an exact deployed version after consequence authority is recorded.

## Cloudflare canary

The `gtm-production` GitHub environment owns `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and `ORCHESTRATOR_ADMIN_TOKEN`. The deployment workflow:

1. verifies the token is active and validates secret shapes without printing their values;
2. creates or reuses the `proof-state-gtm` D1 database and primary/dead-letter Queues;
3. writes an ignored runtime Wrangler configuration, an ephemeral Worker secrets file, and a mode-0600 normalized Cloudflare credential file;
4. applies committed D1 migrations;
5. deploys the Worker with `PUBLISHING_ENABLED=false`;
6. calls `wrangler deployments status --json` and requires exactly one active version at 100 percent traffic;
7. calls `wrangler versions view <deployed-version> --json` and requires the exact version ID, deployment message, `DEPLOYMENT_SHA`, and `PUBLISHING_ENABLED=false`; and
8. independently reads `/health` until the exact Git commit is returned with publishing still disabled.

Resource discovery happens before creation, so a retry reuses named resources instead of duplicating them. Any ambiguous or failed control-plane response stops the workflow.

The publishing-disabled canary may run only after contract tests for a manual `workflow_dispatch` whose exact ref is `refs/heads/main`. Pull requests and ordinary pushes cannot create a deployment job. This path is environment-bound, not environment-reviewed. Authenticated GitHub control-plane read-back on 2026-09-01 showed exactly the three expected secret names, Required reviewers off, Wait timer off, administrator bypass on, and deployment branches and tags set to No restriction. The environment is a credential namespace, not a reviewed, owner-approved, or protected consequence boundary.

Checkout, setup, dependency installation, and local provider-state verification do not receive production credentials in their process environment. Credentialed steps source the normalized runner-temp file only immediately before commands that require provider access, and the active-deployment step unsets those credentials before local parsing. This is process-environment scoping, not operating-system capability isolation: later steps use the same runner identity and can read runner-temp files until cleanup. Early traps minimize file lifetime, and a final `always()` step removes both exact credential files before Action post-hooks even when an earlier step fails. Use separate jobs and runners if hard capability isolation becomes required.

A workflow or local candidate is implementation evidence only. Exact-main deployment stays unproven until Cloudflare reports one 100-percent active version, that version's bindings and message identify the exact commit with publishing disabled, and the independent health read-back agrees. `actions/checkout@v4` and `actions/setup-node@v4` remain existing mutable major tags because the repository does not record reviewed immutable SHAs; pinning them is a separate supply-chain follow-up rather than a guessed change.
