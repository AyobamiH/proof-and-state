# Roadmap

## Completed foundation

- Establish the canonical Proof & State governance repository.
- Separate DoneState execution, OpsTruth observation, and AgentProof evidence responsibilities.
- Configure the private least-privilege DoneState GitHub App.
- Install it with Only select repositories and select only `AyobamiH/donestate`.
- Prove App-authored branch, commit, PR, and required-CI operation.
- Make pending-CI `uncertain` attestations retryable.
- Add repository-hosted directory assets and a server-enforced read-only reviewer identity.
- Import 19 MCP tools, justify all 57 annotations, and submit DoneState 0.2.0 for OpenAI review.
- Submit the DoneState GitHub Marketplace listing, install self-documenting project governance, harden lifecycle ordering and operations, and record the exact deployment.

## Current closeout

- Monitor the OpenAI review decision; treat `Review` as neither approval nor publication.
- Publish the directory version only after OpenAI approval and a separate owner-authorised publication action.
- Review and merge DoneState PR #58 only under owner authority, then require green post-merge CI before treating main as repaired; PR-head run `33479525695` is green while main run `33474288066` remains red.
- Restore OpsTruth's authenticated GitHub read lane through plugin issue #11. PRs #19 through #22 have green exact-head CI and automated policy reviews but remain unmerged, unapproved by a human, and undeployed.
- Run the existing publishing-disabled GTM canary at exact main commit `2ad72135…`; the deployed final PR head `0cc6f720…` and identical tree do not prove an exact-main deployment.
- Keep restored branch `feat/api-gtm-orchestrator` pinned to exact final PR head `0cc6f720…` and record later branch-lifecycle transitions without erasing the deletion history.
- Merge the issue #14 portfolio repair only under owner authority and close PF-GOV-001 only after an exact successful post-merge Governance run.
- Monitor the DoneState GitHub Marketplace review decision; treat `Pending for publish` as neither approval nor publication.
- Finish the isolated Marketplace draft lifecycle by exercising the live `changed`, `pending_change`, and `pending_change_cancelled` transitions; the signed cancellation and final `CANCELLED` entitlement are recorded, and the production listing must not be used for tests.
- Complete the genuine public operator alias, service-address, ICO assessment and offered-territory decisions without exposing private contact data.

## Next

- Define AgentProof merge, deploy, package, and release receipt profiles.
- Keep the generated portfolio ledger and stale-state CI green; add non-secret evidence-content checks after the initial closure gate.
- Exercise one owner-approved merge-to-deploy receipt chain.
- Begin Cloudinary and direct-provider identity and permission preflights only after the exact-main publishing-disabled GTM canary succeeds; keep live publishing disabled.

## Later, gated by evidence

- Add CrabBox or ClawPatch only for isolation or recovery requirements not met by direct Codex execution and repository-native CI.
- Pilot a second selected repository.
- Introduce fleet scheduling only after repository-by-repository authority and verification policies are independently auditable.
