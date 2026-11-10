
<!-- agent-foundations:begin -->
# Proof & State agent knowledge

This repository owns portfolio governance and evidence indexes, not the implementation authority of every product. Read [architecture](../../docs/ARCHITECTURE.md), [integration contracts](../../docs/INTEGRATION-CONTRACTS.md), and [the shared operating contract](../../docs/SHARED-OPERATING-CONTRACT.md).

## Sources and boundaries

[governance/portfolio-ledger.json](../../governance/portfolio-ledger.json) is the canonical portfolio record. [render-portfolio-state.mjs](../../scripts/render-portfolio-state.mjs) validates and renders [PORTFOLIO-STATE.md](../../docs/PORTFOLIO-STATE.md); never hand-edit the generated page. [shared-operating-contract.json](../../governance/shared-operating-contract.json) owns cross-product state meanings.

The [GTM orchestrator](../../apps/gtm-orchestrator/README.md) is a separately bounded API-only application. Its provider permissions, canaries and readback gates cannot be inferred from portfolio documentation. Preserve publishing-disabled defaults and never substitute browser publishing for an unavailable provider.

## Setup and validation

[package.json](../../package.json) declares Node.js 24+, an npm workspace for the orchestrator, `npm test`, `npm run test:governance`, and `npm run governance:check`. Install locked dependencies with `npm ci` when needed. `npm run governance:render` regenerates governed documents; only run it after an intentional source-ledger change. Foundation-only validation is `python3 .agents/validate_foundations.py` (Python 3 standard library).

## Lessons and maintenance

Existing [README governance rules](../../README.md) and the architecture separate execution, independent observation and evidence custody. Provider acceptance is not readback; a signature is not proof of an external effect. Exact PR head, merged main, deployment and observed outcome are distinct records. Keep unknowns explicit and historical evidence unchanged.

Update the relevant knowledge and its authoritative source in the same change when architecture, behaviour, commands or boundaries change. Preserve verified lessons and decision rationale, not raw chat transcripts, secrets or unverified live status. Link to authoritative records rather than maintaining competing copies.
<!-- agent-foundations:end -->
