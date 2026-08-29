# Product Registry

| Product | Canonical implementation | Lifecycle | Owner-side status | Primary output |
| --- | --- | --- | --- | --- |
| Proof & State | [AyobamiH/proof-and-state](https://github.com/AyobamiH/proof-and-state) | Governance active | Canonical repository established | Policies, contracts, roadmap, evidence indexes |
| DoneState | [AyobamiH/donestate](https://github.com/AyobamiH/donestate) | Owner canary complete pending final index merge | Private GitHub App installed on one selected repository | Bounded objectives, branches, PRs, durable event chain |
| OpsTruth | Independent verifier service | Integrated | Pinned verifier fingerprint and signed retryable decisions in use | Verification attestation and report digest |
| AgentProof | Evidence and receipt layer | Contract defined | Downstream release-proof work remains | Merge, deploy, release, and package receipts |
| CrabBox / ClawPatch | Optional isolation or recovery capabilities | Deferred | Not required for the one-repository canary | Sandboxed or recovery execution evidence |
| Fleet maintenance | Multi-repository scheduling | Deferred | Starts only after governance sign-off | Repository-scoped findings and PR-only repairs |

## Registration policy

A product is registered only when its responsibility, prohibited responsibility, canonical source, trust domain, and evidence outputs are explicit. Product status is evidence-backed and must distinguish implemented, configured, observed, verified, released, and merely planned.
