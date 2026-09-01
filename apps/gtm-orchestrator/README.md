# Proof & State GTM Orchestrator

This application is the API-only operating layer for approved Proof & State portfolio GTM work.

It directly integrates with:

- Google Business Profile APIs;
- LinkedIn APIs;
- Meta APIs for Facebook, Instagram, and Threads;
- Cloudinary APIs for durable media.

No social-media intermediary and no browser publishing fallback is part of the architecture.

## Safety contract

- Publishing is disabled unless `PUBLISHING_ENABLED=true`.
- Provider credentials are secrets and never belong in Git.
- Every job has a deterministic idempotency key.
- Every successful submission must pass provider read-back.
- A timeout or ambiguous response is inspected before retry.
- Retryable failures return to the durable queue; permission failures are blocked.
- A provider outage never causes a browser or unapproved-vendor fallback.

## Current maturity

`0.1.0` is an architecture and contract-test baseline. Final PR head `0cc6f72014b75adb422d82b73179e56039913cc4` passed 24 tests and deployed as Worker version `5641712a-cfc4-4ce6-b94f-f0975de76c1b` with `publishingEnabled=false`. PR #13 merged as `2ad721357993a92dfc4d26b2b3ea4a9239ab95d6` from the same tree, but its post-merge deployment job was skipped, so exact-main deployment remains unproven. This does not claim live provider access. Each adapter remains gated until its OAuth connection, account/page identity, permission probe, sandbox canary, production canary, and read-back are recorded.

## Local checks

```bash
npm test
npm run doctor --workspace=@proof-and-state/gtm-orchestrator
```

The doctor reports secret **names** and configuration gaps only. It never prints secret values.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Provider feasibility](docs/PROVIDER-FEASIBILITY.md)
- [Credentials](docs/CREDENTIALS.md)
- [Threat model](docs/THREAT-MODEL.md)
- [Test strategy](docs/TEST-STRATEGY.md)
- [Operations](docs/RUNBOOK.md)
