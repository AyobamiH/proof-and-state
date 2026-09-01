# Current Status

Observed 2026-09-01.

The canonical ordered portfolio backlog, source-ledger commit, owners, wait conditions, stale dates, and Evidence Story Bank are generated from `governance/portfolio-ledger.json` into [Portfolio state](PORTFOLIO-STATE.md).

| Area | Status | Evidence |
| --- | --- | --- |
| Canonical governance repository | Implemented | `AyobamiH/proof-and-state`, initial commit `70216ea38037ace3891b048d7bd5df03013d9913` |
| Private DoneState GitHub App | Configured | App `4761698`, slug `donestate-maintenance-ayobamih` |
| Selected-repository installation | Verified | Installation `157513439`; only `AyobamiH/donestate` |
| PR-only repository policy | Verified | `pr_only`, automatic repair and scheduling enabled |
| Supporting GitHub App repairs | Merged and deployed | PRs #12, #13, #14, #16, #19, and diagnostic #24 |
| Real maintenance execution | Merged, outcome verification unproven | Run `b4242932-0bc1-4876-a202-634d9c12d72a`; PR #22 head `ffec48e6…`; owner-performed merge `4543c4dc…` |
| Exact PR and post-merge CI | PR green, current main red | PR run `33260424569` passed all three named checks on `ffec48e6…`; post-merge run `33474288066` failed the governance impact gate on `4543c4dc…` |
| Independent signed decision | Blocked by verifier decision defect | OpsTruth's decision for the PR head was `uncertain`; neither the PR head nor merge has a conclusive independent outcome |
| Canary merge | Performed outside automatic authority | PR #22 is merged; the automatic maintenance executor still has no merge authority, and merge is not verification |
| Historical hosted canary | Previously verified | Not rechecked during this owner-side completion |
| Directory release assets | Merged | Demo PR #26 and icon PR #27; source branches preserved |
| OAuth and reviewer hardening | Merged and deployed | DoneState PRs #28–#36 |
| Final review-path deployment | Verified from GitHub | Source `1588c058…`; CI `33297909263`; deployment `33297909318` |
| DoneState owned service domain | Deployed and live | Current source `1d6f214…`; CI `33339639434`; deployment `33339639417`; Cloudflare version `774f0298-062f-4442-96d4-e2d52d7b1f94` |
| OpsTruth owned website domain | Deployed and live | PR #13; source `43c9029…`; deployment `33300001348`; Cloudflare version `111ebf9e-fd06-48fd-b162-3f976877f39e` |
| OpsTruth owned MCP domain | Deployed and live | Plugin PR #7; source `915ab911…`; deployment `33300000143`; Cloudflare version `4a5ef5ed-fad8-48a4-9d2b-5eaeb4ad4bfe` |
| Proof & State apex website | Deployed and live | Website PR #2; source `46f01c8b…`; CI `33303293557`; deployment `33303293558`; job `99240836047`; Cloudflare version `64778fc0-88b3-4aee-877d-ac69407757a8` |
| API-only GTM orchestrator | Final PR head deployed; exact-main deployment unproven | Final PR head `0cc6f720…` passed 24 tests and publishing-disabled canary run `33471910108`; Worker `5641712a-cfc4-4ce6-b94f-f0975de76c1b`; PR #13 merged as `2ad72135…` from identical tree `98896963…`; post-merge run `33472305391` passed contracts but skipped deployment; source branch `feat/api-gtm-orchestrator` was deleted after merge and restored at exact head `0cc6f720…` |
| Proof & State website verification | Healthy with bounded warnings | OpsTruth signed handoff, deployment-preflight and four-path health receipts; no failures; branch protection, PR template, security policy and licence remain follow-ups |
| OpsTruth MCP identity design | Aligned and deployed | `opstruth-chatgpt-plugin` PR #9; merge `6a4a01a1…`; post-merge CI `33306940776`; deployment `33306940759`; Cloudflare version `e2e0efcb-377d-4b79-8cb9-7039b3341e11` |
| OpsTruth production repair candidates | Exact heads green, all unmerged | PR #19 `37696a81…`: CI `33479905045`, automated review `33479905072`; PR #20 `6ea2b450…`: CI `33479907043`, automated review `33479907078`; PR #21 `074f3f06…`: CI `33479910167`, automated review `33479910111`; PR #22 `67471fbe…`: CI `33479910134`, automated review `33479910193`; automated review is not human approval; issue #11 remains the authenticated-read blocker |
| OpsTruth GitHub Action | Published and publicly listed | Marketplace `opstruth-evidence`; releases `v1.0.0` and `v1`; source `45f4debb…`; categories Code quality and AI Assisted; implementation PR #15; post-merge CI `33308062407` |
| DoneState self-documenting governance | Current main red; repair PR green and unmerged | Portfolio pin advanced to `4543c4dc…`; post-merge workflow `33474288066` failed because the canary document changed without its canonical ledger; PR #58 head `30e90e9e…` passed run `33479525695`, but main remains red until an owner merge and green post-merge run |
| DoneState Marketplace listing | Submitted, under review, hardened and deployed | Submission PR #45 and merge `37e049b9…`; GitHub reports `Pending for publish`; hardening PR #47 and merge `ac54dcaa…`; post-merge CI `33330067769`; deployment `33330067776`; Cloudflare version `c3c3dd14-512d-4ee5-a25a-f44914c00654`; closure PR #48 and merge `b8caff89…` |
| DoneState Marketplace webhook | Live, signed and receipt-enabled | Receipt PR #55; 98 Worker tests; production version `774f0298…`; versioned responses exclude account and plan identity |
| DoneState Marketplace development | Isolated and recovered; lifecycle proof active | OAuth App `3826463`; owner-only draft `donestate-marketplace-development`; development version `b09b3849…`; cancellation `90b920c0-a4ba-11f1-852b-f37103c46ff2` returned HTTP 202 with final `CANCELLED` state; changed/pending-change results remain open |
| AI Work Accountability website | Runtime not bound | `https://aiworkaccountability.com` was observed at HTTP 502; no site runtime source was identified |
| OpenAI MCP scan | Complete | 19 tools imported; 57 annotation justifications saved |
| OpenAI directory version | In external review on retained transport | DoneState `0.2.0`; status `Review`; submitted MCP URL remains exactly `https://donestate-mcp.woeinvests.workers.dev/mcp`; the owned-domain cutover did not mutate the locked review snapshot |

## Overall

Owner-side GitHub configuration, App credential use, bounded execution, App-authored PR creation, directory assets, reviewer access, MCP scanning, the OpenAI review submission, the DoneState/OpsTruth service-domain cutovers, and the independently owned Proof & State website deployment have evidence. The DoneState maintenance outcome is not complete: PR #22 was merged after an `uncertain` OpsTruth decision, current main is red on the governance impact gate, and green repair PR #58 is still unmerged.

The directory version is in `Review`; that is not approval or publication. Its submitted MCP URL still uses the retained Worker transport. The canonical URL for new integrations is `https://donestate.proofandstate.com/mcp`, but changing the origin in OpenAI requires a new plugin version and review rather than an automatic DNS substitution. Separately, the maintenance canary still requires a corrected independent OpsTruth decision. Its later merge does not promote the `uncertain` observation to completion, and the red post-merge governance state must be repaired.

The GTM orchestrator has a successful publishing-disabled deployment for final PR head `0cc6f72014b75adb422d82b73179e56039913cc4`, Worker version `5641712a-cfc4-4ce6-b94f-f0975de76c1b`, and an exact health observation with `publishingEnabled=false`. PR #13 later merged as `2ad721357993a92dfc4d26b2b3ea4a9239ab95d6` from the same tree, but the post-merge deployment job was skipped. Identical trees do not establish identical commit-bound deployment subjects, so exact-main deployment remains unproven and publishing remains disabled.

OpsTruth PRs #19 through #22 have exact green CI and automated maintainer-review runs, but all remain unmerged. The automated review is a policy check, not human approval, and none of those branches is deployed. Plugin issue #11 still blocks fresh DoneState verification because the least-privilege authenticated GitHub read lane is not implemented.

OpsTruth is now published at `https://github.com/marketplace/actions/opstruth-evidence`; its immutable `v1.0.0` and stable `v1` references resolve to the verified PR #15 source commit. DoneState's separate OAuth listing was submitted on 30 August 2026 and GitHub reports `Pending for publish` and under review. Binding privacy and terms, the private publisher contact record, account prerequisites and the final review request are complete. Public contact aliases, a legitimate operator service address, the ICO fee self-assessment and offered-territory choices remain a separate blocked operator decision. OpsTruth publication and DoneState submission do not imply DoneState Marketplace approval or publication.

The owner-only development listing is a different external state from the submitted production listing. Its app, Worker, state, and credential target are isolated and recovered; exact ping and purchase identities are recorded, and the cancellation returned HTTP 202 with final isolated `CANCELLED` state. Live `changed`, `pending_change`, and `pending_change_cancelled` transitions remain unrecorded. Those three gaps keep development lifecycle work active without changing production review state.

The GTM source branch `feat/api-gtm-orchestrator` was deleted after PR #13 merged and later restored at exact final head `0cc6f72014b75adb422d82b73179e56039913cc4`. The deletion and restoration are both part of the evidence history.

The service cutovers do not prove that every purchased apex domain has an application behind it. Proof & State now has an identified source, exact-commit CI, a Cloudflare deployment receipt, canonical-domain bindings and independent live observations. The AI Work Accountability apex still needs an identified application source and runtime binding and remains an explicit infrastructure gap. See the [domain registry](DOMAIN-REGISTRY.md).
