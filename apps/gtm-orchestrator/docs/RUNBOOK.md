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
