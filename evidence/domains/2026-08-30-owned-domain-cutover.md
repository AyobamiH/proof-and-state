# Owned-domain cutover evidence — 2026-08-30

## Outcome

The portfolio website and two deployed service families now use owned canonical domains:

- Proof & State website: `https://proofandstate.com`
- DoneState: `https://donestate.proofandstate.com/mcp`
- OpsTruth website: `https://opstruth.io`
- OpsTruth MCP: `https://mcp.opstruth.io/mcp`

The Proof & State frontend is owned independently in `AyobamiH/proof-and-state-website`; Lovable supplied the original design scaffold but is not the source, deployment or domain authority. The One Click website was already healthy and was not disturbed. AI Work Accountability remains HTTP 502 because no application runtime source or binding was identified; it is not claimed complete.

## Deployment receipts

| Surface | PR and source | Hosted checks | Deployment evidence |
| --- | --- | --- | --- |
| Proof & State website | `AyobamiH/proof-and-state-website#2`; `46f01c8bc784bd73f3ca50023c0815d8140839a9` | PR CI `33303259294`; main CI `33303293557` | run `33303293558`; successful attempt 3 job `99240836047`; Cloudflare version `64778fc0-88b3-4aee-877d-ac69407757a8` |
| DoneState MCP | `AyobamiH/donestate#38`; `c69896d06f1a490ab1f67606fd0d406ab826191b` | PR CI `33299986374`; main CI `33300648343` | run `33300648341`; job `99228025051`; Cloudflare version `11018054-685f-4e7e-ab6b-f30817b2d89f` |
| OpsTruth website | `AyobamiH/opstruth#13`; `43c9029b06b0746e895d9e8136b1e6830f207a57` | PR CI `33299963216`; main CI `33300001349` | run `33300001348`; job `99226224422`; Cloudflare version `111ebf9e-fd06-48fd-b162-3f976877f39e` |
| OpsTruth MCP | `AyobamiH/opstruth-chatgpt-plugin#7`; `915ab91110bddf520551b318723baac49213e33a` | PR CI `33299933644`; maintainer `33299933712`; main CI `33300000121` | run `33300000143`; job `99226220511`; Cloudflare version `4a5ef5ed-fad8-48a4-9d2b-5eaeb4ad4bfe` |

## DoneState owner settings

- OAuth App homepage and exact canonical callback use `donestate.proofandstate.com`.
- The older callback remains for the immutable in-review OpenAI submission.
- Private GitHub App `4761698` uses the canonical homepage and webhook.
- Installation `157513439` remains **Only select repositories**, only `AyobamiH/donestate`.
- PR-only permissions and the prohibition on merge, deployment, release, administration, secret management, and workflow write remain unchanged.

## Live observations

- `https://proofandstate.com/`: HTTP 200 and expected production marker.
- `https://www.proofandstate.com/`: HTTP 308 to `https://proofandstate.com/`.
- `https://proofandstate.com/donestate`: HTTP 200 and expected DoneState content.
- `https://proofandstate.com/products/donestate`: HTTP 301 to `/donestate`.
- `https://proofandstate.com/sitemap.xml`: HTTP 200 with canonical Proof & State URLs.
- `https://proofandstate.com/robots.txt`: HTTP 200 with the canonical sitemap location.
- `https://donestate.proofandstate.com/`: HTTP 200 identity page.
- DoneState OpenAI challenge: HTTP 200 without copying the response value into evidence.
- DoneState MCP without credentials: HTTP 401 with canonical protected-resource metadata.
- DoneState OAuth metadata: HTTP 200 with canonical authorization, token, registration, and revocation endpoints.
- DoneState webhook GET: HTTP 405, confirming a POST-only route without delivering an event.
- `https://opstruth.io/`: public website loaded with its production title.
- `https://mcp.opstruth.io/`: MCP identity page loaded with canonical endpoint and policy/support links.

## Independent OpsTruth verification

OpsTruth 0.4.0 re-observed the public repository and deployment after GitHub Actions completed:

- GitHub handoff: exact head `46f01c8bc784bd73f3ca50023c0815d8140839a9`; CI run `33303293557` and deployment run `33303293558` successful; receipt digest `ec21ceec3b41d1f4b82f37db36a870501775105cf57eb6a4678e520fd2000bce`.
- Deployment preflight: Cloudflare and `wrangler.jsonc` detected with zero warnings and zero failures; receipt digest `78f33e3bc5973714a0db07bf73dfca94b3e721f9fd85af721bbbe53b49cc7df8`.
- Bounded live probe: `/`, `/donestate`, `/sitemap.xml`, and `/robots.txt` returned HTTP 200 and status `healthy`; receipt digest `215267372e31b6c070d8b8b68f8efb27098536d92060b5e2d3cff65e25bce11d`.
- All three receipts were signed by `sha256:09544c3ede70b832a114918bb439960004655faf9d36981e1402587af9429c86`.

The handoff report recorded two warnings: no pull-request template was visible and `main` was not protected. Its broader static verdict remained `Insufficient evidence`, correctly preserving the boundary that public repository evidence and health responses do not prove full application correctness. Separate body-level observations above verify only the named routes and markers.

## Preserved truth boundaries

- The already verified historical DoneState canary `631d8a08-d337-4bae-bd18-b55c31f48a8b` was not rechecked.
- The fresh maintenance canary `b4242932-0bc1-4876-a202-634d9c12d72a` remains `AWAITING_VERIFICATION` because its independent OpsTruth outcome is still `uncertain`; PR #22 remains open and unmerged.
- OpenAI version 0.2.0 remains in Review. No approval, directory publication, or terms acceptance is inferred from the domain deployment.
- Every source and evidence branch remains preserved.
