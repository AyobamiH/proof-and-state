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
3. writes an ignored runtime Wrangler configuration and ephemeral secrets file;
4. applies committed D1 migrations;
5. deploys the Worker with `PUBLISHING_ENABLED=false`;
6. calls `wrangler deployments status --json` and requires exactly one active version at 100 percent traffic;
7. calls `wrangler versions view <deployed-version> --json` and requires the exact version ID, deployment message, `DEPLOYMENT_SHA`, and `PUBLISHING_ENABLED=false`; and
8. independently reads `/health` until the exact Git commit is returned with publishing still disabled.

Resource discovery happens before creation, so a retry reuses named resources instead of duplicating them. Any ambiguous or failed control-plane response stops the workflow.

The publishing-disabled canary may run after contract tests for a push to `main`, an environment-reviewed `workflow_dispatch`, or the same-repository authorised canary PR. The `gtm-production` environment remains the review and credential boundary. A workflow or local candidate is implementation evidence only. Exact-main deployment stays unproven until Cloudflare reports one 100-percent active version, that version's bindings and message identify the exact commit with publishing disabled, and the independent health read-back agrees.
