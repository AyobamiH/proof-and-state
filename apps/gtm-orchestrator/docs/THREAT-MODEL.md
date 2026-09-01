# Threat model

## Protected outcomes

- Publish only to the intended brand and provider identity.
- Prevent duplicate or partially mutated posts.
- Prevent credential disclosure.
- Prevent an executor from claiming publication without provider evidence.
- Preserve a non-secret audit trail.

## Principal risks and controls

| Risk | Control |
|---|---|
| Wrong Page, profile, or location | Persist verified provider IDs; preflight identity before mutation |
| Duplicate post after timeout | Deterministic idempotency key; read back before retry; durable attempt trail |
| Stolen provider token | Encrypted Worker secrets, least privilege, rotation, no plaintext logs |
| Malicious destination or asset | HTTPS requirement, approved-domain policy, Cloudinary tenant validation |
| Provider response drift | Versioned adapters and fixture contracts; fail closed on unknown shapes |
| Unapproved vendor fallback | Provider allowlist contains direct APIs only; unsupported channels fail validation |
| False success | Exact provider ID, copy, media, account and destination reconciliation |
| Queue poison or replay | Signed admin requests, unique job IDs, unique idempotency keys, retry ceiling and dead-letter queue |
| Excessive autonomous authority | Per-brand policies, standing/per-post approval modes, publishing feature flag |

Provider terms, security challenges, app review, OAuth revocation, and platform outages are explicit blocked states. They are never bypassed through a browser.
