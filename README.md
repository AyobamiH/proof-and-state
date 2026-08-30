# Proof & State

Proof & State is the governance layer for a family of narrowly separated products that execute authorised work, observe outcomes independently, and preserve evidence without allowing any product to certify itself.

## Product boundary

| Product | Responsibility | Must not do |
| --- | --- | --- |
| [DoneState](docs/products/DONESTATE.md) | Execute bounded, authorised maintenance and publish reviewable changes | Prove its own completion or silently widen authority |
| [OpsTruth](docs/products/OPSTRUTH.md) | Independently observe exact outcomes and sign verification decisions | Mutate the target or trust executor claims |
| [AgentProof](docs/products/AGENTPROOF.md) | Index merge, deploy, release, and receipt evidence | Treat signatures alone as proof that an action occurred |
| Proof & State | Own portfolio governance, contracts, evidence indexes, and sequencing | Collapse execution and verification into one trust domain |

## Canonical records

- [Architecture](docs/ARCHITECTURE.md)
- [Product registry](docs/PRODUCT-REGISTRY.md)
- [Domain registry](docs/DOMAIN-REGISTRY.md)
- [Integration contracts](docs/INTEGRATION-CONTRACTS.md)
- [Current status](docs/STATUS.md)
- [Roadmap](docs/ROADMAP.md)
- [DoneState owner-side completion evidence](evidence/donestate/2026-08-29-owner-side-completion.md)
- [DoneState OpenAI review submission evidence](evidence/donestate/2026-08-30-openai-review-submission.md)
- [Owned-domain cutover evidence](evidence/domains/2026-08-30-owned-domain-cutover.md)
- [GitHub Marketplace preparation evidence](evidence/marketplaces/2026-08-30-github-marketplace-preparation.md)

## Governance rules

1. Authority is explicit, bounded, and consequence-specific.
2. DoneState is PR-only for automatic repository maintenance.
3. OpsTruth remains independently operated and independently signed.
4. AgentProof records evidence; it does not infer effects from signatures alone.
5. Exact commits, pull-request heads, check contexts, installation scope, and hash-chain digests are the units of evidence.
6. Source branches and superseded attempts remain available when they are part of the audit trail.

This repository is the canonical governance source. Product repositories remain the canonical implementation sources.
