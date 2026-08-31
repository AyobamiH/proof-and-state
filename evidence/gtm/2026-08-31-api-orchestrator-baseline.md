# API-only GTM orchestrator baseline

Observed 2026-08-31.

## Situation

Repeated browser-driven publication required operator intervention and created ambiguous image-only or unverified post states. An unapproved publishing intermediary was briefly proposed and then explicitly rejected.

## Architecture decision

The only approved operating components are direct Google Business Profile, LinkedIn, Facebook, Instagram and Threads APIs; Cloudinary for durable media; and a Proof & State GTM orchestrator hosted on existing Cloudflare infrastructure. The browser is not a publishing path or fallback.

## Implemented evidence

- Application source under `apps/gtm-orchestrator`.
- Direct provider adapter boundaries for Google, LinkedIn, Facebook, Instagram, and Threads.
- Cloudinary tenant/media validation.
- Fail-closed publishing feature flag.
- Deterministic idempotency and durable D1/Queue schema.
- Submission plus exact provider read-back reconciliation.
- Retryable, blocked, and terminal failure semantics.
- Credential custody, provider feasibility, threat model, test strategy, and runbook documentation.
- Staged credential handoff that provisions the stable Worker callback before creating provider OAuth clients.
- Sixteen synthetic contract and orchestration tests passed locally, including submitted/read-back retry and ambiguous-mutation protection.

## Explicitly unproven

- Google Business Profile API project approval.
- Live provider OAuth and required permissions.
- Cloudflare D1, Queue, Worker, and dead-letter queue provisioning.
- Live canary publication or provider read-back on any channel.
- Public visibility and analytics retrieval.

No post was created and no live-provider capability is claimed by this baseline.
