# Proof & State agent instructions

## Portfolio invariant

Keep execution, independent verification, consequence receipts, and portfolio governance in separate trust domains. No product may certify its own consequential outcome.

## Self-documenting governance

- Select the relevant item in `governance/portfolio-ledger.json` before consequential work.
- Update the work item and Evidence Story Bank in the same change as a product, contract, evidence, distribution, deployment, domain, or external-state record.
- Every non-complete item retains an owner, next action, wait condition, re-entry condition, and stale date. Blocked and deferred work is tracked work, never an omission.
- Run `node scripts/render-portfolio-state.mjs`; do not edit `docs/PORTFOLIO-STATE.md` by hand.
- Record exact commits, PR heads, CI runs, deployments, runtime observations, review states, and verifier subjects separately.

## Authority

Inspection and local documentation are ordinary work. Push, pull-request, merge, deployment, publication, secret access, and destructive actions require their consequence authority. Never expose secret or private contact values in evidence.
