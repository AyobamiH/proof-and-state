# Architecture

## Objective

Operate approved portfolio GTM work from durable source control and direct provider APIs. The system must produce attention, trust, successful usage, evidence, or stronger distribution without hiding uncertainty or relying on browser automation.

## Components

| Component | Responsibility | Explicit exclusion |
|---|---|---|
| Direct provider adapters | Google Business Profile, LinkedIn, Facebook, Instagram, and Threads publication and retrieval | No social publishing intermediary |
| Cloudinary asset service | Durable media identity, validation, transformation, and delivery | No transient local-only campaign assets |
| GTM orchestrator | Queue, scheduling, rotation, validation, idempotency, retry, receipts, and analytics cursors | No silent publication or success inference |
| Cloudflare runtime | Worker execution, D1 state, Queues, dead-letter queue, Cron Triggers, and encrypted secrets | No plaintext credentials in Git or D1 |

## Trust boundaries

1. Content generation proposes a job; it does not publish it.
2. Policy validation confirms brand, channel, rotation, destination, asset, approval mode, and schedule.
3. The provider adapter performs the authorised mutation.
4. The provider adapter reads back the exact provider object.
5. Reconciliation compares intended and observed state.
6. The evidence store records the decision and non-secret receipt.

The provider is the authority for whether a post exists. The orchestrator is the authority for whether the observed post matches the intended job. Neither a request attempt nor a successful HTTP status alone proves publication.

## State machine

`DRAFT → VALIDATED → QUEUED → SUBMITTED → PUBLISHED_VERIFIED → MEASURED`

Failure states:

- `RETRYABLE`: timeout, rate limit, or provider 5xx; returns to the durable queue with the same idempotency key.
- `BLOCKED`: revoked OAuth, missing permission, wrong account/Page, invalid media, or required provider review.
- `FAILED`: deterministic non-retryable rejection or exhausted recovery policy.

## Data model

`jobs` stores the canonical requested operation and its state. `attempts` stores the append-only transition trail. `receipts` stores redacted submission and read-back evidence. Secret values are never data-model fields.

## Deployment gate

Production deployment is prohibited until:

1. Cloudflare D1, Queue, dead-letter queue, and Worker are provisioned.
2. OAuth redirect URIs are final and registered.
3. Every provider permission probe passes against the intended account or Page.
4. A non-public or narrowly bounded canary succeeds where the provider offers one.
5. One production canary is explicitly authorised and read back.
6. Duplicate, timeout, expired-token, rate-limit, and mismatched-read-back tests pass.
7. `PUBLISHING_ENABLED` is changed only after the exact deployed version is recorded.
