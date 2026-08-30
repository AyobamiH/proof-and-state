# Domain Registry

Observed 2026-08-30.

| Product surface | Canonical location | Live state | Compatibility or evidence boundary |
| --- | --- | --- | --- |
| Proof & State governance | `https://proofandstate.com` | HTTP 502; application runtime not bound | Canonical source is `AyobamiH/proof-and-state`; a website has not been invented from governance documents |
| DoneState product narrative | `https://proofandstate.com/donestate` | Blocked by the unbound parent website | The product remains under Proof & State rather than a newly purchased standalone domain |
| DoneState hosted service | `https://donestate.proofandstate.com/mcp` | Live | `donestate-mcp.woeinvests.workers.dev/mcp` retained for immutable OpenAI version 0.2.0 review compatibility |
| OpsTruth website | `https://opstruth.io` | Live | Historical evidence may preserve earlier Worker URLs |
| OpsTruth hosted MCP | `https://mcp.opstruth.io/mcp` | Live | `opstruth-chatgpt.woeinvests.workers.dev/mcp` remains a non-canonical compatibility surface |
| AI Work Accountability | `https://aiworkaccountability.com` | HTTP 502; application runtime not bound | No runtime source repository was identified during the cutover |
| One Click Website Design Factory | `https://oneclickwebsitedesignfactory.com` | Already healthy; unchanged | Outside the DoneState/OpsTruth Worker cutover |

## Canonical URL policy

New configuration, plugin manifests, documentation, metadata, website links, and OAuth settings use owned domains. A `workers.dev` URL may remain only when it is required by an immutable submitted review or preserved historical evidence. Its continued reachability is not a claim that it is canonical.

An owned DNS name is not considered complete merely because it exists. Completion requires an identified source, a deployment receipt, and a live observation. That rule is why the Proof & State and AI Work Accountability apexes remain explicitly open infrastructure gaps.
