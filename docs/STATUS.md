# Current Status

Observed 2026-10-07. Repository/runtime facts were freshly read back; external channel records retain their historical scope until a new provider readback exists.

The canonical ordered portfolio backlog, source-ledger commit, owners, wait conditions, stale dates, product/channel matrix, and Evidence Story Bank are generated from `governance/portfolio-ledger.json` into [Portfolio state](PORTFOLIO-STATE.md).

## Current portfolio truth

| Area | Status | Evidence |
| --- | --- | --- |
| DoneState owned service | Deployed; controlled access | Runtime source `c984744c732f598db8859b5b9d4367d1f8da2aef`; deploy `37143245994`; Worker `c80942ed-6854-4bfb-bdd2-b800df7b1464`; sandbox `sha256:6e914052632064f8d611df8107ccb43bab2c63c4f292a97134593771fd9209c1`. Current main is a separate, later subject |
| DoneState current main | Protected, CI-verified and dependency-audit gated | `e24f543b58b69d861be1f2f5153903a654a9f5ea`; CI `37152045333` passed; current release reconciliation is PR #165 |
| DoneState independent verification | Fresh successor VERIFIED | Run `c4a07fa6-90b2-4597-a4c6-eae66de5a3e8`; open PR #115 at head `41f1ae3b0fed670e64bd99f1bcb1aea9c9e7e869`; exact-head CI `33806832575`; complete OpsTruth v2 response accepted |
| DoneState account controls | Complete, scoped acceptance passed | CUST-001/CUST-002 closed in PR #164; E-064 real disposable deletion and E-065 shared-layout/production generation-fence evidence; rehearsal `37143489929` passed |
| DoneState fresh customer outcome | Blocked at execution credential | E-066 and fresh connected-service readback show an empty disposable account without execution credential or selected repository. Fresh signup/OAuth, execution, unmerged PR, independent VERIFIED and post-result deletion remain unproven |
| DoneState Marketplace webhook health | Deployed | PR #127; merge `6964e2118c77d35e1e2abdbc69bcdaa05fe0c997`; deploy `37011174983`; bounded 5xx operational failure receipts and hourly escalation |
| DoneState aggregate funnel | Deployed | PR #129; merge `7b25b6ae288d02ab9a6354a740ec06681d3ffc49`; privacy-minimal daily counters, 90-day retention, no customer identifiers |
| DoneState OpenAI channel | Current provider readback required | The 0.3.0 Review record is historical. Current source E-061 records the owner-authorised reset and canonical 0.3.2 draft with 20 tools; it does not establish current submission, approval or publication |
| DoneState GitHub Marketplace | Pending for publish / unpublished, last explicitly observed | Owner preview is not public-availability evidence; development listing remains isolated and still lacks `changed`, `pending_change`, and `pending_change_cancelled` provider receipts |
| OpsTruth current main | Protected | `0ff048499da218c63707de178306c4d2329dad8f`; active ruleset `22247265`; fresh contract-drift run `37557747143` passed |
| OpsTruth production verifier | Fresh live smoke passed | Runtime `0.4.1` at `cbe833dce0646314c189568be6acc21348895ed8`; deploy `33868337668`; final Worker `100719fa-a23c-4395-aeaa-844e0a9684e1`; fresh checks cover 21 read-only tools, signed Evidence Graph and selected-repository App reads |
| OpsTruth OpenAI channel | Public 0.4.0 release baseline | Repository package is 0.4.1, but the established directory-release evidence remains 0.4.0; clean-account install/use remains separate evidence |
| OpsTruth GitHub Action | Published | `opstruth-evidence`; immutable `v1.0.0` and stable `v1` references remain tied to source `45f4debbd3fbe8217599ab697b8f6c855b372e0b` |
| AgentProof development prereleases | RC5 GitHub/npm verified; RC6 GitHub published | RC5 tarballs match exactly and a clean development consumer passed; RC6 source `a0ee17a70d05bc3c339c0c15be6bb38b4517771a`, release run `37572076728`. RC6 npm publication, independent adoption and production integration remain separate gates |
| Public website RC6 closeout | Deployed and live checks passed | PRs #22/#23 in `proof-and-state-website`; exact merge `16b4e253a84f04847fe4afb08c1a5d673740ff0d`; deploy `37572879415`; Worker `0b87b482-b55d-45f4-afd5-5bfe3b5cc54d`; routes, branding/SSR, owned bundles and desktop/mobile browser checks passed |
| Proof & State parent governance | Reconciled; protection still open | Observed main `bf5da722c7df0af781c677b685624098ba02b749`; Governance `37028126231` and GTM contracts `37028125832` passed; parent main remains unprotected pending the second trusted human reviewer and explicit repository-admin decision |
| Proof & State GTM orchestrator | Publishing disabled; exact-current-main deployment unproven | PR-head deployment `0cc6f72014b75adb422d82b73179e56039913cc4`, Worker `5641712a-cfc4-4ce6-b94f-f0975de76c1b`; publication authority remains disabled |
| AI Work Accountability | Runtime source still unbound | No new exact application/runtime subject has been established in this reconciliation |

## Release boundary

Controlled DoneState owned-domain access can proceed independently of external directories. Account-layout and deletion/fencing controls are complete. Unrestricted self-serve GA still requires one fresh complete customer outcome and the remaining legitimate public address/support/privacy contact decisions. Worldwide availability where legally permitted is already decided; the recorded pre-trading ICO assessment must be revisited when business activity begins.

OpenAI review and GitHub Marketplace review remain active parallel distribution lanes. Their provider states must not be inferred from repository merges, owned-domain deployment, owner preview URLs, displayed install counts, or another channel's publication.

The earlier owner-side DoneState run `b4242932-0bc1-4876-a202-634d9c12d72a` remains historical `AWAITING_VERIFICATION`. It is not rewritten by the fresh independently verified successor. The open PR #115 is intentionally preserved as PR-only publication evidence and is not unfinished merge work.

## Remaining owner/external gates

1. Reconnect the disposable customer's execution credential securely, confirm repository/verifier scope, then prove the fresh full journey through independent VERIFIED and post-result deletion. Retain completed control tests as prerequisites.
2. Supply the remaining legitimate public geographic business/service address and branded support/privacy routes; preserve existing territory and pre-trading assessment decisions.
3. Exercise the three outstanding provider-controlled Marketplace development transitions without touching production review state.
4. Read back the canonical OpenAI draft/provider state and production Marketplace state, then respond to actual findings independently.
5. Name the second trusted human reviewer, explicitly decide reviewer repository access/CODEOWNERS, then protect Proof & State `main` using the prepared reviewed proposal.
6. Run a bounded owned-domain pilot and collect real cohort/support/conversion evidence without making external directory publication a prerequisite.
