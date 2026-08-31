# Current Status

Observed 2026-08-30.

The canonical ordered portfolio backlog, source-ledger commit, owners, wait conditions, stale dates, and Evidence Story Bank are generated from `governance/portfolio-ledger.json` into [Portfolio state](PORTFOLIO-STATE.md).

| Area | Status | Evidence |
| --- | --- | --- |
| Canonical governance repository | Implemented | `AyobamiH/proof-and-state`, initial commit `70216ea38037ace3891b048d7bd5df03013d9913` |
| Private DoneState GitHub App | Configured | App `4761698`, slug `donestate-maintenance-ayobamih` |
| Selected-repository installation | Verified | Installation `157513439`; only `AyobamiH/donestate` |
| PR-only repository policy | Verified | `pr_only`, automatic repair and scheduling enabled |
| Supporting GitHub App repairs | Merged and deployed | PRs #12, #13, #14, #16, #19, and diagnostic #24 |
| Real maintenance execution | Complete | Run `b4242932-0bc1-4876-a202-634d9c12d72a`; App branch and commit; PR #22 |
| Exact PR CI | Verified from GitHub | Run `33260424569`; all three named checks succeeded on `ffec48e6…` |
| Independent signed decision | Blocked by verifier decision defect | OpsTruth observes the exact jobs and head but signs `uncertain`; OpsTruth issue #12 |
| Canary merge | Intentionally not performed | PR #22 remains open; automatic maintenance has no merge authority |
| Historical hosted canary | Previously verified | Not rechecked during this owner-side completion |
| Directory release assets | Merged | Demo PR #26 and icon PR #27; source branches preserved |
| OAuth and reviewer hardening | Merged and deployed | DoneState PRs #28–#36 |
| Final review-path deployment | Verified from GitHub | Source `1588c058…`; CI `33297909263`; deployment `33297909318` |
| DoneState owned service domain | Deployed and live | Current source `1d6f214…`; CI `33339639434`; deployment `33339639417`; Cloudflare version `774f0298-062f-4442-96d4-e2d52d7b1f94` |
| OpsTruth owned website domain | Deployed and live | PR #13; source `43c9029…`; deployment `33300001348`; Cloudflare version `111ebf9e-fd06-48fd-b162-3f976877f39e` |
| OpsTruth owned MCP domain | Deployed and live | Plugin PR #7; source `915ab911…`; deployment `33300000143`; Cloudflare version `4a5ef5ed-fad8-48a4-9d2b-5eaeb4ad4bfe` |
| Proof & State apex website | Deployed and live | Website PR #2; source `46f01c8b…`; CI `33303293557`; deployment `33303293558`; job `99240836047`; Cloudflare version `64778fc0-88b3-4aee-877d-ac69407757a8` |
| API-only GTM orchestrator | Contract and Cloudflare deployment gates implemented; runtime and live provider access unproven | Direct Google, LinkedIn, Facebook, Instagram, Threads and Cloudinary adapters; idempotent publishing-disabled Cloudflare canary; 20 local tests passed on 2026-08-31; no successful runtime health read-back, live OAuth permission or publication canary yet |
| Proof & State website verification | Healthy with bounded warnings | OpsTruth signed handoff, deployment-preflight and four-path health receipts; no failures; branch protection, PR template, security policy and licence remain follow-ups |
| OpsTruth MCP identity design | Aligned and deployed | `opstruth-chatgpt-plugin` PR #9; merge `6a4a01a1…`; post-merge CI `33306940776`; deployment `33306940759`; Cloudflare version `e2e0efcb-377d-4b79-8cb9-7039b3341e11` |
| OpsTruth GitHub Action | Published and publicly listed | Marketplace `opstruth-evidence`; releases `v1.0.0` and `v1`; source `45f4debb…`; categories Code quality and AI Assisted; implementation PR #15; post-merge CI `33308062407` |
| DoneState self-documenting governance | Merged and green | PR #46; merge `364cf86e…`; PR CI `33329584126`; post-merge CI `33329629870`; exact DoneState ledger now pinned from this portfolio ledger |
| DoneState Marketplace listing | Submitted, under review, hardened and deployed | Submission PR #45 and merge `37e049b9…`; GitHub reports `Pending for publish`; hardening PR #47 and merge `ac54dcaa…`; post-merge CI `33330067769`; deployment `33330067776`; Cloudflare version `c3c3dd14-512d-4ee5-a25a-f44914c00654`; closure PR #48 and merge `b8caff89…` |
| DoneState Marketplace webhook | Live, signed and receipt-enabled | Receipt PR #55; 98 Worker tests; production version `774f0298…`; versioned responses exclude account and plan identity |
| DoneState Marketplace development | Isolated and recovered; lifecycle proof active | OAuth App `3826463`; owner-only draft `donestate-marketplace-development`; development version `b09b3849…`; cancellation `90b920c0-a4ba-11f1-852b-f37103c46ff2` returned HTTP 202 with final `CANCELLED` state; changed/pending-change results remain open |
| AI Work Accountability website | Runtime not bound | `https://aiworkaccountability.com` was observed at HTTP 502; no site runtime source was identified |
| OpenAI MCP scan | Complete | 19 tools imported; 57 annotation justifications saved |
| OpenAI directory version | In external review on retained transport | DoneState `0.2.0`; status `Review`; submitted MCP URL remains exactly `https://donestate-mcp.woeinvests.workers.dev/mcp`; the owned-domain cutover did not mutate the locked review snapshot |

## Overall

Owner-side GitHub configuration, App credential use, bounded execution, App-authored publication, local validation, exact-head CI, directory assets, reviewer access, MCP scanning, the OpenAI review submission, the DoneState/OpsTruth service-domain cutovers, and the independently owned Proof & State website deployment are complete.

The directory version is in `Review`; that is not approval or publication. Its submitted MCP URL still uses the retained Worker transport. The canonical URL for new integrations is `https://donestate.proofandstate.com/mcp`, but changing the origin in OpenAI requires a new plugin version and review rather than an automatic DNS substitution. Separately, the fresh maintenance canary still requires a corrected independent OpsTruth decision for its existing sealed handoff. DoneState correctly remains `AWAITING_VERIFICATION` and has not promoted an uncertain observation to completion.

OpsTruth is now published at `https://github.com/marketplace/actions/opstruth-evidence`; its immutable `v1.0.0` and stable `v1` references resolve to the verified PR #15 source commit. DoneState's separate OAuth listing was submitted on 30 August 2026 and GitHub reports `Pending for publish` and under review. Binding privacy and terms, the private publisher contact record, account prerequisites and the final review request are complete. Public contact aliases, a legitimate operator service address, the ICO fee self-assessment and offered-territory choices remain a separate blocked operator decision. OpsTruth publication and DoneState submission do not imply DoneState Marketplace approval or publication.

The owner-only development listing is a different external state from the submitted production listing. Its app, Worker, state, and credential target are isolated and recovered; exact ping and purchase identities are recorded, and the cancellation returned HTTP 202 with final isolated `CANCELLED` state. Live `changed`, `pending_change`, and `pending_change_cancelled` transitions remain unrecorded. Those three gaps keep development lifecycle work active without changing production review state.

No source branch in the evidence chain has been deleted.

The service cutovers do not prove that every purchased apex domain has an application behind it. Proof & State now has an identified source, exact-commit CI, a Cloudflare deployment receipt, canonical-domain bindings and independent live observations. The AI Work Accountability apex still needs an identified application source and runtime binding and remains an explicit infrastructure gap. See the [domain registry](DOMAIN-REGISTRY.md).
