# Product Registry

| Product | Canonical implementation | Lifecycle | Owner-side status | Primary output |
| --- | --- | --- | --- | --- |
| Proof & State | [Governance](https://github.com/AyobamiH/proof-and-state) and [website](https://github.com/AyobamiH/proof-and-state-website) | Governance and website active | Canonical governance repository established; independently owned website deployed to Cloudflare at `proofandstate.com` | Policies, contracts, roadmap, evidence indexes, portfolio website |
| DoneState | [AyobamiH/donestate](https://github.com/AyobamiH/donestate) | Hosted 0.2.0 in OpenAI Review; GitHub Marketplace integration deployed but not listed | Private maintenance App remains installed only on `AyobamiH/donestate`; the separate Marketplace OAuth flow and signed webhook are live at `donestate.proofandstate.com`; contact, binding legal text and final review submission remain owner gates | Bounded objectives, branches, PRs, durable event chain |
| OpsTruth | [AyobamiH/opstruth](https://github.com/AyobamiH/opstruth) and [MCP source](https://github.com/AyobamiH/opstruth-chatgpt-plugin) | Integrated, deployed and listed in GitHub Marketplace | Website and MCP identity surfaces are aligned; read-only Action published as `v1.0.0` with stable `v1` reference at [OpsTruth evidence](https://github.com/marketplace/actions/opstruth-evidence) | Verification attestation, report digest and read-only GitHub Action outputs |
| AgentProof | Evidence and receipt layer | Contract defined | Downstream release-proof work remains | Merge, deploy, release, and package receipts |
| CrabBox / ClawPatch | Optional isolation or recovery capabilities | Deferred | Not required for the one-repository canary | Sandboxed or recovery execution evidence |
| Fleet maintenance | Multi-repository scheduling | Deferred | Starts only after governance sign-off | Repository-scoped findings and PR-only repairs |

## Registration policy

A product is registered only when its responsibility, prohibited responsibility, canonical source, trust domain, and evidence outputs are explicit. Product status is evidence-backed and must distinguish implemented, configured, observed, verified, released, and merely planned.
