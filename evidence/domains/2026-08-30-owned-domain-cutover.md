# Owned-domain cutover evidence — 2026-08-30

## Outcome

The two deployed service families now use owned canonical domains:

- DoneState: `https://donestate.proofandstate.com/mcp`
- OpsTruth website: `https://opstruth.io`
- OpsTruth MCP: `https://mcp.opstruth.io/mcp`

The One Click website was already healthy and was not disturbed. The Proof & State and AI Work Accountability apexes remain HTTP 502 because no application runtime source or binding was identified; they are not claimed complete.

## Deployment receipts

| Surface | PR and source | Hosted checks | Deployment evidence |
| --- | --- | --- | --- |
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

- `https://donestate.proofandstate.com/`: HTTP 200 identity page.
- DoneState OpenAI challenge: HTTP 200 without copying the response value into evidence.
- DoneState MCP without credentials: HTTP 401 with canonical protected-resource metadata.
- DoneState OAuth metadata: HTTP 200 with canonical authorization, token, registration, and revocation endpoints.
- DoneState webhook GET: HTTP 405, confirming a POST-only route without delivering an event.
- `https://opstruth.io/`: public website loaded with its production title.
- `https://mcp.opstruth.io/`: MCP identity page loaded with canonical endpoint and policy/support links.

## Preserved truth boundaries

- The already verified historical DoneState canary `631d8a08-d337-4bae-bd18-b55c31f48a8b` was not rechecked.
- The fresh maintenance canary `b4242932-0bc1-4876-a202-634d9c12d72a` remains `AWAITING_VERIFICATION` because its independent OpsTruth outcome is still `uncertain`; PR #22 remains open and unmerged.
- OpenAI version 0.2.0 remains in Review. No approval, directory publication, or terms acceptance is inferred from the domain deployment.
- Every source and evidence branch remains preserved.
