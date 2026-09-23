---
schema: clawsweeper.project-vision.v1
project_id: proof-and-state
repository: AyobamiH/proof-and-state
---

# Project Vision

## Identity

Proof & State is the governance layer for a family of narrowly separated products that execute authorised work, verify outcomes independently, and preserve evidence without allowing a product to certify itself.

## Purpose

Own portfolio-level contracts, sequencing, evidence indexes, and trust boundaries across DoneState, OpsTruth, AgentProof, and governed applications.

## Owns

- Portfolio governance and cross-product contracts.
- Product/domain registries and integration boundaries.
- Evidence indexes, portfolio sequencing, and canonical governance state.
- Cross-product rules that preserve separation between execution, verification, and evidence.

## Does Not Own

- DoneState implementation or execution logic.
- OpsTruth implementation or verification logic.
- AgentProof implementation or receipt semantics.
- The public website implementation, which belongs to proof-and-state-website.

## Non-Negotiable Invariants

- Authority is explicit, bounded, and consequence-specific.
- Execution and independent verification remain separate trust domains.
- No product may use its own claim of success as independent proof.
- Exact commits, heads, installation scope, checks, and evidence digests remain distinct evidence subjects.
- Product repositories remain canonical implementation sources.
- Consequential portfolio events must remain traceable in the governance ledger.

## Evidence of Done

A portfolio claim is complete only when its implementation source, governance record, and required independent evidence agree. Deployment, review approval, publication, and verification are separate states.

## Relationships

- DoneState: authorised execution control plane.
- OpsTruth: independent verification plane.
- AgentProof: evidence and signed-receipt layer.
- proof-and-state-website: public explanatory surface.

## Canonical Sources

README.md, docs/ARCHITECTURE.md, docs/PRODUCT-REGISTRY.md, docs/INTEGRATION-CONTRACTS.md, docs/STATUS.md, and the generated portfolio state.

## Agent Rule

Use this repository to reason about portfolio ownership and trust boundaries, not to implement product behaviour that belongs in a child repository.
