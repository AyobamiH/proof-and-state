# Current Status

Observed 2026-10-07. Repository/runtime facts were freshly read back; external channel records retain their historical scope until a new provider readback exists.

The canonical ordered portfolio backlog, source-ledger commit, owners, wait conditions, stale dates, product/channel matrix, and Evidence Story Bank are generated from `governance/portfolio-ledger.json` into [Portfolio state](PORTFOLIO-STATE.md).

## Current portfolio truth

| Area | Status | Evidence |
| --- | --- | --- |
| DoneState owned service | Deployed at approved rollout source; later governance-only main differs | Source `5b18fefcaa4c186782a2c14e5e4d16c2f93e11e4`; deploy `37577391829`; Worker `98d66425-8a2c-4caf-a2a4-dced459bdd40`; sandbox `sha256:89239658656b1fe3cef2db45058fb8c7fa02e01ee4d5ecc04c8fa7e6ada9a74e` |
| DoneState current main | Protected; governance-only AgentProof activation merged | `6fb1f4960d22d351902fe0eefa22f21d249dcd7f`; CI `37583831139` passed; PR #167 changes only ledger/generated state. Exact-current-main deployment is unproven; runtime remains `5b18fefcaa4c186782a2c14e5e4d16c2f93e11e4` |
| DoneState Worker security refresh | Merged and deployed after audit gates passed | Approved PR #166; exact-head CI `37576065787`, post-merge CI `37577391832` and actual deployment/container build `37577391829` succeeded; permanent audit gate retained |
| DoneState independent verification | Fresh successor VERIFIED | Run `c4a07fa6-90b2-4597-a4c6-eae66de5a3e8`; open PR #115 at head `41f1ae3b0fed670e64bd99f1bcb1aea9c9e7e869`; exact-head CI `33806832575`; complete OpsTruth v2 response accepted |
| DoneState account controls | Complete, scoped acceptance passed | CUST-001/CUST-002 closed in PR #164; E-064 real disposable deletion and E-065 shared-layout/production generation-fence evidence; rehearsal `37143489929` passed |
| DoneState fresh customer outcome | OAuth/checkout succeeded; implementation FAILED_SAFE | Run `257bbf51-66d2-4cd0-838d-01bbe66e2608`; one verified exit-code-1 receipt; no customer branch/PR/verifier request. E-070/PF-E-031 preserve the result; the cause is unknown because its log was discarded |
| DoneState failure diagnostics | Tested repair candidate; open and undeployed | PR #168 at `81821640c1ef1633878553c51747e94b6ff9a913`; 40 core/149 Worker tests and zero audit locally; exact-head CI `37585518215` passed. Owner merge and deployment remain separate gates |
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
| Proof & State parent governance | Approved reconciliation merged; protection still open | Main `da9f01d7a5ad255920a2e99a3243976b509f3a6e`; Governance `37577384348` and GTM contracts `37577384282` passed; parent main remains unprotected pending the second trusted human reviewer and explicit repository-admin decision |
| Proof & State GTM orchestrator | Publishing disabled; exact-current-main deployment unproven | PR-head deployment `0cc6f72014b75adb422d82b73179e56039913cc4`, Worker `5641712a-cfc4-4ce6-b94f-f0975de76c1b`; publication authority remains disabled |
| AI Work Accountability | Runtime source still unbound | No new exact application/runtime subject has been established in this reconciliation |

## Release boundary

Controlled DoneState owned-domain access can proceed independently of external directories. Account-layout and deletion/fencing controls are complete. Unrestricted self-serve GA still requires one fresh complete customer outcome and the remaining legitimate public address/support/privacy contact decisions. Worldwide availability where legally permitted is already decided; the recorded pre-trading ICO assessment must be revisited when business activity begins.

OpenAI review and GitHub Marketplace review remain active parallel distribution lanes. Their provider states must not be inferred from repository merges, owned-domain deployment, owner preview URLs, displayed install counts, or another channel's publication.

The earlier owner-side DoneState run `b4242932-0bc1-4876-a202-634d9c12d72a` remains historical `AWAITING_VERIFICATION`. It is not rewritten by the fresh independently verified successor. The open PR #115 is intentionally preserved as PR-only publication evidence and is not unfinished merge work.

## Remaining owner/external gates

1. Review the tested failure-diagnostics repair at DoneState PR #168 after exact-head CI, then authorise merge/deployment before a fresh bounded customer objective. OAuth admission and checkout now work; implementation ended `FAILED_SAFE` without a recoverable log. Continue through unmerged PR, independent VERIFIED and post-result inspection/deletion, remove the exact temporary grant, and record fresh signup separately. The account, connected key and grant remain available for authorised recovery; preserve App/verifier scope and completed control prerequisites.
2. Supply the remaining legitimate public geographic business/service address and branded support/privacy routes; preserve existing territory and pre-trading assessment decisions.
3. Exercise the three outstanding provider-controlled Marketplace development transitions without touching production review state.
4. Read back the canonical OpenAI draft/provider state and production Marketplace state, then respond to actual findings independently.
5. Name the second trusted human reviewer, explicitly decide reviewer repository access/CODEOWNERS, then protect Proof & State `main` using the prepared reviewed proposal.
6. Run a bounded owned-domain pilot and collect real cohort/support/conversion evidence without making external directory publication a prerequisite.


## Machine-discovery estate audit

Fresh live audits on 2026-10-07 establish the following public-surface state.

| Surface | Current result | Next action |
|---|---|---|
| Agent Shop at `agents.proofandstate.com` | 21/21 HTML pages indexable; live audit 0 issues; sitemap submitted; IndexNow key-validated | Monitor provider indexing separately from crawlability |
| `tailwaggingwebdesign.com` | Indexable; robots/llms/sitemap already present; title, image-alt and Organisation-logo cleanup identified | Land agent subcontract surface and SEO cleanup |
| `proofandstate.com` | Indexable; one low meta-description length issue | Trim description without changing product claims |
| `opstruth.io` | Indexable; missing root canonical | Add canonical and outside-in verify |
| `poststeward.com` | Indexable; one image-alt issue and no root structured data | Add truthful structured data and alt text |
| `oneclickpostfactory.com` | Indexable; redirects to www; long title/meta and Organisation-logo gap | Reconcile canonical host and metadata/schema |
| `oneclickwebsitedesignfactory.com` | Indexable but missing canonical, H1, internal links and structured data; thin root content | Highest-priority discovery repair |
| `aiworkaccountability.com` | Current audit path could not fetch the root | Re-observe runtime before making discoverability claims |
| `aiaccountabilitywork.com` | Search Console property exists but is not verified | Verify or retire before using as evidence |

These are discovery observations, not product-success or indexing claims. Search-provider state remains independent.
