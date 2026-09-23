---
schema: clawsweeper.project-vision.v1
project_id: proof-and-state
repository: AyobamiH/proof-and-state
---

# Project Vision

## Identity

Proof & State is the portfolio governance and trust-boundary layer for products that let machines act while preserving evidence strong enough to determine whether they did what they claim.

## Purpose

Keep authority, execution, signed action evidence, independent observation, and portfolio truth separated so no product can certify its own success. Own the cross-product contracts, sequencing, evidence indexes, and status model that bind DoneState, OpsTruth, AgentProof, and governed applications into one coherent system.

## Owns

- Portfolio governance and cross-product contracts.
- Product/domain registries, sequencing, and integration boundaries.
- Cross-product evidence indexes and canonical portfolio state.
- The distinction between authority, execution, receipt/evidence, independent verification, deployment identity, marketplace state, and public product claims.
- Rules that prevent one trust domain from silently substituting for another.

## Does Not Own

- DoneState implementation or execution logic.
- OpsTruth implementation or verifier signing identity.
- AgentProof implementation or protocol semantics.
- The public website implementation, which belongs to proof-and-state-website.
- Product behaviour merely because Proof & State records its status.

## Non-Negotiable Invariants

- Authority is explicit, bounded, and consequence-specific.
- No executor-produced statement may independently verify its own work.
- DoneState executes authorised work; OpsTruth independently observes and verifies.
- AgentProof provides transaction-bound authority and signed evidence for consequential actions; in the current Proof & State chain it also indexes downstream merge, deploy, package, and release proof without replacing OpsTruth.
- Exact commits, PR heads, installation scope, checks, deployment identities, marketplace states, and evidence digests remain separate evidence subjects.
- Product repositories remain canonical implementation sources.
- Consequential portfolio events remain traceable in the governance ledger.
- Failed or uncertain independent verification fails closed rather than being converted into success.

## Evidence of Done

A portfolio claim is complete only when the owning implementation source, governance record, exact subject identity, and required independent evidence agree. Merge, deployment, submission, approval, publication, installation, verification, and real-user outcome are distinct states.

## Relationships

- DoneState: authorised execution control plane.
- OpsTruth: independent read-only verification plane and source of VERIFIED decisions.
- AgentProof: framework-neutral action-authorisation, signed-receipt, recovery, and downstream consequential-action evidence layer.
- proof-and-state-website: public explanatory surface whose claims must follow portfolio evidence.

## Canonical Sources

README.md, docs/ARCHITECTURE.md, docs/PRODUCT-REGISTRY.md, docs/INTEGRATION-CONTRACTS.md, docs/STATUS.md, the generated portfolio state, and the relevant product boundary document under docs/products/.

## Agent Rule

Use this repository to decide portfolio ownership, sequencing, and trust boundaries. Do not implement child-product behaviour here, collapse evidence states, or let one product's receipt stand in for another product's independent observation.
