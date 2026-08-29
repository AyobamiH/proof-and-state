# Architecture

## Trust domains

Proof & State separates authority, execution, observation, and evidence custody.

1. An owner grants a bounded consequence envelope.
2. DoneState pins the base commit, executes in isolation, validates locally, and may publish only the authorised branch or pull request.
3. GitHub supplies immutable commit identities and check results for the exact pull-request head.
4. OpsTruth re-observes the public or explicitly delegated evidence and signs a decision with a pinned independent key.
5. AgentProof indexes later merge, deployment, package, and release receipts without reclassifying execution claims as observed fact.
6. Proof & State records the portfolio decision, product boundary, and evidence references.

## Invariants

- No executor-produced statement can transition its own run to verified.
- An uncertain independent observation is retryable and remains awaiting verification.
- Failed verification is fail-closed.
- Automatic maintenance is PR-only; merge authority stays with the owner.
- Installation scope and repository selection are both enforced.
- A mutating action with an ambiguous effect is not retried blindly.
- Secrets are referenced by custody and fingerprint, never indexed in plaintext.

## Evidence chain

| Stage | Canonical identity | Primary custodian |
| --- | --- | --- |
| Objective | Run ID, objective digest, pinned base SHA | DoneState |
| Execution | Action settlements and hash-chained events | DoneState |
| Publication | Branch, head SHA, PR number | GitHub |
| Validation | Check names and conclusions on exact head | GitHub |
| Independent decision | Signed attestation, report digest, signer fingerprint | OpsTruth |
| Downstream proof | Merge, deploy, release, and package receipts | AgentProof |
| Portfolio index | Cross-product evidence references and status | Proof & State |

## Escalation boundary

CrabBox or ClawPatch is introduced only when direct Codex execution and repository-native CI cannot provide the necessary isolation or recovery semantics. Multi-repository fleet automation follows only after one-repository PR-only maintenance is proven and indexed.
