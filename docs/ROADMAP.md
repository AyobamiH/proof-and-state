# Roadmap

## Completed foundation

- Establish the canonical Proof & State governance repository.
- Separate DoneState execution, OpsTruth observation, and AgentProof evidence responsibilities.
- Configure the private least-privilege DoneState GitHub App.
- Install it with Only select repositories and select only `AyobamiH/donestate`.
- Prove App-authored branch, commit, PR, and required-CI operation.
- Make pending-CI `uncertain` attestations retryable.

## Current closeout

- Obtain and index the final fresh OpsTruth decision for the exact canary PR head.
- Merge governance and product records.
- Close superseded issues and PRs without deleting their source branches.
- Update DoneState current-status documentation with exact evidence identifiers.

## Next

- Define AgentProof merge, deploy, package, and release receipt profiles.
- Add governance checks that validate evidence-index schema and non-secret content.
- Exercise one owner-approved merge-to-deploy receipt chain.

## Later, gated by evidence

- Add CrabBox or ClawPatch only for isolation or recovery requirements not met by direct Codex execution and repository-native CI.
- Pilot a second selected repository.
- Introduce fleet scheduling only after repository-by-repository authority and verification policies are independently auditable.
