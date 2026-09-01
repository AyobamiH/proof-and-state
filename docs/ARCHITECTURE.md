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

## GTM operating plane

The GTM orchestrator is a governed application inside this repository. It has four approved architectural components:

1. Direct Google Business Profile, LinkedIn, Facebook, Instagram, and Threads APIs.
2. Cloudinary API for durable media and platform transformations.
3. Direct Google OAuth and Business Profile API access, without a publishing intermediary.
4. A Cloudflare-hosted orchestrator for queueing, rotation, validation, scheduling, retries, receipts, and measurement.

The browser is not a publishing path or fallback. Provider outages remain queued. Revoked credentials block the affected adapter. No unapproved social-media intermediary may be introduced as a recovery path.

Publishing is a consequence-bearing action. A successful API submission is not sufficient: the same provider must return the created object and its identity, text, media, account, and destination must reconcile with the intended job before the orchestrator records `PUBLISHED_VERIFIED`.
