# Product Registry

| Product | Canonical implementation | Lifecycle | Owner-side status | Primary output |
| --- | --- | --- | --- | --- |
| Proof & State | [Governance](https://github.com/AyobamiH/proof-and-state) and [website](https://github.com/AyobamiH/proof-and-state-website) | Governance and website active | Canonical governance repository established; independently owned website deployed to Cloudflare at `proofandstate.com` | Policies, contracts, roadmap, evidence indexes, portfolio website |
| DoneState | [AyobamiH/donestate](https://github.com/AyobamiH/donestate) | Hosted 0.2.0 in OpenAI Review | Private GitHub App installed on one selected repository; canonical service live at `donestate.proofandstate.com`; submitted review transport retained | Bounded objectives, branches, PRs, durable event chain |
| OpsTruth | [AyobamiH/opstruth](https://github.com/AyobamiH/opstruth) and [MCP source](https://github.com/AyobamiH/opstruth-chatgpt-plugin) | Integrated and deployed | Website live at `opstruth.io`; MCP live at `mcp.opstruth.io/mcp`; pinned verifier fingerprint and signed retryable decisions in use | Verification attestation and report digest |
| AgentProof | Evidence and receipt layer | Contract defined | Downstream release-proof work remains | Merge, deploy, release, and package receipts |
| CrabBox / ClawPatch | Optional isolation or recovery capabilities | Deferred | Not required for the one-repository canary | Sandboxed or recovery execution evidence |
| Fleet maintenance | Multi-repository scheduling | Deferred | Starts only after governance sign-off | Repository-scoped findings and PR-only repairs |

## Registration policy

A product is registered only when its responsibility, prohibited responsibility, canonical source, trust domain, and evidence outputs are explicit. Product status is evidence-backed and must distinguish implemented, configured, observed, verified, released, and merely planned.
