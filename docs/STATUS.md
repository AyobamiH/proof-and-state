# Current Status

Observed 2026-10-02.

The canonical ordered portfolio backlog, source-ledger commit, owners, wait conditions, stale dates, product/channel matrix, and Evidence Story Bank are generated from `governance/portfolio-ledger.json` into [Portfolio state](PORTFOLIO-STATE.md).

## Current portfolio truth

| Area | Status | Evidence |
| --- | --- | --- |
| DoneState owned service | Live controlled access | Canonical MCP endpoint `https://donestate.proofandstate.com/mcp`; runtime source `7b25b6ae288d02ab9a6354a740ec06681d3ffc49`; deploy `37012973974`; Worker `31789414-8495-479b-9950-80f890cf29b4` |
| DoneState current main | Protected and CI-verified | `4083524b57800d196e2c82690d2d349f1fa3cc2d`; post-merge CI `37013514877` passed `core (22)`, `core (24)`, and `hosted-plugin` |
| DoneState independent verification | Fresh successor VERIFIED | Run `c4a07fa6-90b2-4597-a4c6-eae66de5a3e8`; open PR #115 at head `41f1ae3b0fed670e64bd99f1bcb1aea9c9e7e869`; exact-head CI `33806832575`; complete OpsTruth v2 response accepted |
| DoneState account controls | Implemented and deployed, acceptance incomplete | Account console and whole-account deletion shipped without adding MCP tools; real browser readback and disposable-account destructive acceptance remain |
| DoneState Marketplace webhook health | Deployed | PR #127; merge `6964e2118c77d35e1e2abdbc69bcdaa05fe0c997`; deploy `37011174983`; bounded 5xx operational failure receipts and hourly escalation |
| DoneState aggregate funnel | Deployed | PR #129; merge `7b25b6ae288d02ab9a6354a740ec06681d3ffc49`; privacy-minimal daily counters, 90-day retention, no customer identifiers |
| DoneState OpenAI channel | In Review, last explicitly observed 2026-09-08 | Version 0.3.0; existing product retained; approval, publication and directory-originated customer outcome remain unproven |
| DoneState GitHub Marketplace | Pending for publish / unpublished, last explicitly observed | Owner preview is not public-availability evidence; development listing remains isolated and still lacks `changed`, `pending_change`, and `pending_change_cancelled` provider receipts |
| OpsTruth current main | Protected | `0ff048499da218c63707de178306c4d2329dad8f`; active ruleset `22247265`; no open pull requests; hourly DoneState contract-drift run `37007974978` passed |
| OpsTruth production verifier | Deployed and used successfully | Repair source `eef00ca4f242cf99d6b39e8c37ae4b84970a86e4`; deploy `33808853917`; final Worker `70759864-063a-465d-a664-b5ee2224507e`; complete v2 response accepted by DoneState |
| OpsTruth OpenAI channel | Public 0.4.0 release baseline | Repository package is 0.4.1, but the established directory-release evidence remains 0.4.0; clean-account install/use remains separate evidence |
| OpsTruth GitHub Action | Published | `opstruth-evidence`; immutable `v1.0.0` and stable `v1` references remain tied to source `45f4debbd3fbe8217599ab697b8f6c855b372e0b` |
| Proof & State parent governance | Reconciled; protection still open | Reconciliation PR #26 merged as `dc88e4040599add6e8cf11974d11e71a98c8a9bd`; post-merge Governance `37019231111` and GTM contract run `37019231272` passed; parent main remains unprotected pending the second trusted human reviewer and explicit repository-admin decision |
| Proof & State GTM orchestrator | Publishing disabled; exact-current-main deployment unproven | PR-head deployment `0cc6f72014b75adb422d82b73179e56039913cc4`, Worker `5641712a-cfc4-4ce6-b94f-f0975de76c1b`; publication authority remains disabled |
| AI Work Accountability | Runtime source still unbound | No new exact application/runtime subject has been established in this reconciliation |

## Release boundary

DoneState no longer treats OpenAI or GitHub Marketplace as the only route to market. Controlled owned-domain access can proceed independently. Unrestricted owned-domain self-serve GA still requires real browser/disposable-account acceptance plus genuine publisher legal/operator decisions.

OpenAI review and GitHub Marketplace review remain active parallel distribution lanes. Their provider states must not be inferred from repository merges, owned-domain deployment, owner preview URLs, displayed install counts, or another channel's publication.

The earlier owner-side DoneState run `b4242932-0bc1-4876-a202-634d9c12d72a` remains historical `AWAITING_VERIFICATION`. It is not rewritten by the fresh independently verified successor. The open PR #115 is intentionally preserved as PR-only publication evidence and is not unfinished merge work.

## Remaining owner/external gates

1. Read back the production DoneState account console in a real browser and prove whole-account deletion with a disposable non-founder account.
2. Record a legitimate service address, ICO fee self-assessment, offered territories, and public support/privacy contact choices for unrestricted GA.
3. Exercise the three outstanding provider-controlled Marketplace development transitions without touching production review state.
4. Respond to OpenAI 0.3.0 and GitHub Marketplace provider review changes independently.
5. Name the second trusted human reviewer, explicitly decide reviewer repository access/CODEOWNERS, then protect Proof & State `main` using the prepared reviewed proposal.
6. Run a bounded owned-domain pilot and collect real cohort/support/conversion evidence without making external directory publication a prerequisite.
