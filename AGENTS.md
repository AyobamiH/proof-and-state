# Proof & State agent instructions

## Portfolio invariant

Keep execution, independent verification, consequence receipts, and portfolio governance in separate trust domains. No product may certify its own consequential outcome.

## Self-documenting governance

- Select the relevant item in `governance/portfolio-ledger.json` before consequential work.
- Update the work item and Evidence Story Bank in the same change as a product, contract, evidence, distribution, deployment, domain, or external-state record.
- Every non-complete item retains an owner, next action, wait condition, re-entry condition, and stale date. Blocked and deferred work is tracked work, never an omission.
- Run `node scripts/render-portfolio-state.mjs`; do not edit `docs/PORTFOLIO-STATE.md` by hand.
- Record exact commits, PR heads, CI runs, deployments, runtime observations, review states, and verifier subjects separately.

## Shared operating contract

- Use `governance/shared-operating-contract.json` for cross-product state, green, credential-custody, temporary-bridge and machine-discovery semantics.
- Never promote provider acceptance to read-back or outcome verification.
- Treat `unknown` as a first-class state.
- Temporary authority must carry an expiry condition and removal proof.

## Authority

Inspection and local documentation are ordinary work. Push, pull-request, merge, deployment, publication, secret access, and destructive actions require their consequence authority. Never expose secret or private contact values in evidence.

<!-- agent-foundations:begin -->
## Repository-owned skills and knowledge

Read [secure-api-delivery](.agents/skills/secure-api-delivery/SKILL.md) at the start of every development task, including documentation-only work. Record scope, exact revision, authority, affected trust boundaries and planned checks before edits. Mark checks passed, failed, not run or not applicable with reasons; documentation-only work still needs this initial applicability review.

Read [repository knowledge](.agents/knowledge/README.md) and its relevant linked sources. If the skill is absent from your catalog, open the relative file directly. The complete skill and references belong to this repository; no home-directory installation is required. Existing project instructions and specialised skills remain authoritative for their areas. This guidance does not authorise live scans, credentials, publishing or deployment and is not a CI enforcement claim.

Run `python3 .agents/validate_foundations.py` for the lightweight repository-only discovery check. It validates the local skill files and new navigation links, not application security or live runtime health.

Update the relevant knowledge and its authoritative source in the same change when architecture, behaviour, commands or boundaries change. Preserve verified lessons and decision rationale, not raw chat transcripts, secrets or unverified live status. Link to authoritative records rather than maintaining competing copies.
<!-- agent-foundations:end -->
