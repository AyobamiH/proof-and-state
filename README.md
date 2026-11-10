# Proof & State

Proof & State is the governance layer for a family of narrowly separated products that execute authorised work, observe outcomes independently, and preserve evidence without allowing any product to certify itself.

## Public evidence and independent review

The four standalone historical case studies are linked from the published [AI Work Accountability writing archive](https://aiworkaccountability.com/writing/). Their scope is preserved: Post-Once collector recovery, AgentProof's bounded 17-check repository-patch canary, OpsTruth independent evidence verification and DoneState PR-only execution.

- [Proof & State Discussion #44 - can existing standards prove agent outcomes?](https://github.com/AyobamiH/proof-and-state/discussions/44) welcomes falsifiable counterexamples and evidence that existing standards already suffice.
- [AgentProof's eight-case lost-acknowledgement reproduction](https://github.com/AyobamiH/agentproof/blob/main/docs/research/repro-outcome-uncertainty/README.md) and [independent challenge #30](https://github.com/AyobamiH/agentproof/issues/30) use source-only fixtures, **not** a production release replay.
- [Post-Once two-busy-strike deferral model](docs/research/post-once-lock-deferral.md) provides a public synthetic explanation of two actual lock refusals versus eleven not-attempted vaults. Historical operational receipts remain private.

These are research and scrutiny links, not authority to merge the products, introduce a shared runtime, claim third-party adoption, or retry an ambiguous external effect.

## Product boundary

| Product | Responsibility | Must not do |
| --- | --- | --- |
| [DoneState](docs/products/DONESTATE.md) | Execute bounded, authorised maintenance and publish reviewable changes | Prove its own completion or silently widen authority |
| [OpsTruth](docs/products/OPSTRUTH.md) | Independently observe exact outcomes and sign verification decisions | Mutate the target or trust executor claims |
| [AgentProof](docs/products/AGENTPROOF.md) | Index merge, deploy, release, and receipt evidence | Treat signatures alone as proof that an action occurred |
| Proof & State | Own portfolio governance, contracts, evidence indexes, and sequencing | Collapse execution and verification into one trust domain |

## Governed applications

- [GTM Orchestrator](apps/gtm-orchestrator/README.md): API-only publishing, scheduling, provider read-back, retries, and evidence records for approved Proof & State portfolio brands.

The final PR-head GTM canary is deployed with publishing disabled. Exact-main deployment remains unproven because the post-merge deployment job was skipped. The canonical ledger keeps those commit-bound states separate.

## Canonical records

- [Architecture](docs/ARCHITECTURE.md)
- [Shared operating contract](docs/SHARED-OPERATING-CONTRACT.md)
- [Product registry](docs/PRODUCT-REGISTRY.md)
- [Domain registry](docs/DOMAIN-REGISTRY.md)
- [Integration contracts](docs/INTEGRATION-CONTRACTS.md)
- [Current status](docs/STATUS.md)
- [Generated portfolio state](docs/PORTFOLIO-STATE.md)
- [Roadmap](docs/ROADMAP.md)
- [DoneState owner-side completion evidence](evidence/donestate/2026-08-29-owner-side-completion.md)
- [DoneState OpenAI review submission evidence](evidence/donestate/2026-08-30-openai-review-submission.md)
- [Owned-domain cutover evidence](evidence/domains/2026-08-30-owned-domain-cutover.md)
- [GitHub Marketplace preparation evidence](evidence/marketplaces/2026-08-30-github-marketplace-preparation.md)
- [DoneState Marketplace webhook live evidence](evidence/marketplaces/2026-08-30-donestate-webhook-live.md)
- [DoneState Marketplace submission and hardening evidence](evidence/marketplaces/2026-08-30-donestate-marketplace-submission-and-hardening.md)
- [API-only GTM orchestrator baseline](evidence/gtm/2026-08-31-api-orchestrator-baseline.md)

## Governance rules

1. Authority is explicit, bounded, and consequence-specific.
2. DoneState is PR-only for automatic repository maintenance.
3. OpsTruth remains independently operated and independently signed.
4. AgentProof records evidence; it does not infer effects from signatures alone.
5. Exact commits, pull-request heads, check contexts, installation scope, and hash-chain digests are the units of evidence.
6. Source branches and superseded attempts remain available when they are part of the audit trail.
7. Every consequential portfolio event updates `governance/portfolio-ledger.json`; `docs/PORTFOLIO-STATE.md` is generated, and CI rejects drift or stale accountability.

This repository is the canonical governance source. Product repositories remain the canonical implementation sources.

## Agent contributors

Start with [AGENTS.md](AGENTS.md) for repository-owned skills, knowledge and required scope review.
