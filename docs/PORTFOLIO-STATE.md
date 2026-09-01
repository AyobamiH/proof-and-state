# Portfolio state

<!-- Generated from governance/portfolio-ledger.json. Do not edit by hand. -->

Canonical state date: **2026-09-01**

Every consequential portfolio event must update this ledger and its generated state in the same change. Product repository, CI, deployment, runtime, credential, review, publication, and independent-verification states remain separate.

## Exact source ledgers

| Project | Repository | Commit | Ledger |
|---|---|---|---|
| DoneState | AyobamiH/donestate | [`895efab0cdd2ce18682dfec9f2b9361dcc3a2987`](https://github.com/AyobamiH/donestate/commit/895efab0cdd2ce18682dfec9f2b9361dcc3a2987) | [governance/project-ledger.json](https://github.com/AyobamiH/donestate/blob/895efab0cdd2ce18682dfec9f2b9361dcc3a2987/governance/project-ledger.json) |

## Recovery order

1. **P0 — Keep portfolio governance self-documenting.** Portfolio state is generated, stale work fails, and consequential changes require the ledger. (1 complete)
2. **P1 — Close remaining review and operator gates.** Review decisions and genuine operator contact, address, regulatory, and territory choices are recorded without exposing private data. (2 blocked)
3. **P2 — Separate development and prepare customers.** Development lifecycle tests are isolated from production and the first external-customer loop is supportable and measurable. (2 active, 2 planned)
4. **P3 — Close independent-verification gaps.** OpsTruth decides the exact maintenance head and AgentProof receipts remain consequence evidence rather than completion authority. (2 blocked, 1 planned)
5. **P4 — Advance releases and infrastructure through gates.** Release, governance-repository, domain-runtime, and fleet work advances only from exact authority and evidence. (2 deferred, 1 planned, 1 blocked)

## Work ledger

### P0 — Keep portfolio governance self-documenting

| ID | Status | Owner | Next action | Wait and re-entry | Stale |
|---|---|---|---|---|---|
| PF-GOV-001 — Enforce the portfolio Evidence Story Bank | complete | Proof & State maintainers | Keep the portfolio ledger pinned to exact product ledgers and record every later transition in the same change. | Wait: None. Re-entry: Reopen if a consequential portfolio change can bypass the ledger, generated state, impact gate, or freshness check. | 2026-12-01 |

### P1 — Close remaining review and operator gates

| ID | Status | Owner | Next action | Wait and re-entry | Stale |
|---|---|---|---|---|---|
| DS-LEGAL-001 — Complete DoneState public operator details | blocked | Publisher owner | Choose public support/privacy aliases, a legitimate service address, complete the ICO fee self-assessment, and record offered territories. | Wait: Requires genuine publisher decisions; do not publish the private contact inbox or invent an address. Re-entry: Resume when the publisher provides those decisions. | 2026-09-06 |
| OPENAI-REVIEW-001 — Close the DoneState OpenAI 0.2.0 review | blocked | Publisher owner | Record and respond to the reviewer decision, then retire legacy transport only when safe. | Wait: OpenAI status remains Review. Re-entry: Resume when OpenAI sends a decision. | 2026-09-15 |

### P2 — Separate development and prepare customers

| ID | Status | Owner | Next action | Wait and re-entry | Stale |
|---|---|---|---|---|---|
| DS-MKTDEV-001 — Create a separate Marketplace development listing | active | Publisher owner | Exercise and record live changed, pending_change, and pending_change_cancelled deliveries through the owner-only draft listing. | Wait: The isolated app, draft listing, ping, purchase, accepted cancellation receipt, final CANCELLED state, credential targets, and runtime probes are recorded; three live transition results remain. Re-entry: Resume in the owner-only draft listing without altering the submitted production listing or the private maintenance App. | 2026-09-12 |
| DS-CUSTOMER-001 — Complete first-customer account, deletion, alerts, and support | planned | DoneState maintainers | Add entitlement visibility, whole-account deletion, webhook alerts, and an exercised support path. | Wait: Lifecycle ordering is deployed; public legal details remain blocked. Re-entry: Begin after DS-MKTDEV-001 and DS-LEGAL-001. | 2026-09-20 |
| DS-GTM-001 — Measure the useful-result funnel | planned | Proof & State maintainers | Measure non-founder activation, PR creation, independent decision, repeat use, support load, and conversion without unnecessary personal data. | Wait: Customer account and deletion semantics must be stable. Re-entry: Begin before the first external cohort. | 2026-09-25 |
| GTM-ORCH-001 — Prove the API-only GTM orchestrator | active | Proof & State maintainers | Run the environment-bound canary at the exact credential-endpoint fix head and require D1, Queues, migrations, publishing-disabled Worker deployment and exact-commit health read-back to pass before advancing the infrastructure gate. | Wait: The corrected account-token verification route is locally tested, but Cloudflare resource access, deployment and runtime health remain unproven until exact-head CI completes. Re-entry: Resume from the first failed provider or deployment step; do not change credentials again unless provider read-back proves a credential-authority defect. | 2026-09-15 |

### P3 — Close independent-verification gaps

| ID | Status | Owner | Next action | Wait and re-entry | Stale |
|---|---|---|---|---|---|
| OT-EXACTHEAD-001 — Resolve OpsTruth exact-head issue 12 | blocked | OpsTruth maintainers | Correct and test the exact-head decision path in AyobamiH/opstruth#12. | Wait: DoneState cannot weaken or replace the independent verifier decision. Re-entry: Resume when the fix has exact public CI evidence. | 2026-09-07 |
| DS-CANARY-001 — Independently decide the open maintenance canary | blocked | OpsTruth maintainers | Re-evaluate DoneState PR 22 at ffec48e6c5abd9cef840ab591896613769d3e779. | Wait: Blocked on OT-EXACTHEAD-001; DoneState remains AWAITING_VERIFICATION. Re-entry: Resume after the verifier fix. | 2026-09-08 |
| AP-INTEGRATION-001 — Complete AgentProof consequence receipts | planned | AgentProof and DoneState maintainers | Define and prove the receipt boundary without converting a signature into completion authority. | Wait: The DoneState-to-OpsTruth live loop must close first. Re-entry: Begin after DS-CANARY-001. | 2026-09-25 |

### P4 — Advance releases and infrastructure through gates

| ID | Status | Owner | Next action | Wait and re-entry | Stale |
|---|---|---|---|---|---|
| DS-RELEASE-001 — Gate DoneState 0.2 release and publication | deferred | Publisher owner | Run exact package, secret, asset, CI, and verification gates before seeking publication authority. | Wait: No autonomous merge, deploy, release, or publication is authorised. Re-entry: Resume after live verification closes and explicit publication authority is granted. | 2026-10-01 |
| PF-REPO-001 — Close governance-repository hardening follow-ups | planned | Proof & State maintainers | Add the missing security policy and licence, then evaluate branch protection after CI exists. | Wait: The self-documenting CI workflow and PR template are being added first. Re-entry: Begin after PF-GOV-001. | 2026-10-01 |
| AIWA-RUNTIME-001 — Bind AI Work Accountability to an identified runtime | blocked | Proof & State maintainers | Identify canonical application source, bind the apex to its runtime, then collect deployment and live evidence. | Wait: The apex was observed at HTTP 502 and no application source was identified. Re-entry: Resume when the source repository and hosting target are known. | 2026-09-30 |
| PF-FLEET-001 — Keep multi-repository fleet authority last | deferred | Proof & State maintainers | Define policy inheritance, isolation, observability, and rollout only after single-repository customer and verifier gates. | Wait: Single-repository authority and verification remain the product invariant. Re-entry: Resume after private-repository, queue, managed-verifier, and customer-value evidence exists. | 2027-01-15 |

## Evidence Story Bank

### PF-E-001 — DoneState and Proof & State self-documenting governance

- **Date:** 2026-08-30
- **Situation:** Marketplace actions had outpaced manual product and portfolio records.
- **Verification:** DoneState PR 46 merged as 364cf86e48cc9715c149867cbe0a5f5ac3899753; PR CI 33329584126 and post-merge CI 33329629870 passed all three jobs. Proof & State PR 8 merged as 911949934fc9c6cb40cd24ffa4d594aa5ca0d44a from exact tree ccaf4931ac1c9dfa4fa3b8882b37c1b1e3f0cc85; PR CI 33330727848 and post-merge Governance run 33330807325 passed.
- **Accountability:** owner=Proof & State maintainers; status=complete; next=Keep exact product-ledger pins and portfolio evidence current.; wait=None.; stale=2026-12-01
- **Outcome:** Both repositories now have canonical ledgers, generated state, impact gates, and scheduled freshness checks.
- **Content:** Recovered backlog, accountability fields, evidence stories, exact cross-project pins, and separate-state rules.
- **Measurement:** Two governance merges and four exact workflow runs passed.

### PF-E-002 — DoneState GitHub Marketplace review request

- **Date:** 2026-08-30
- **Situation:** The free public-repository OAuth listing completed submission prerequisites.
- **Verification:** DoneState PR 45 merged as 37e049b9d6b6749c2085562ac84f433e40e404e4; GitHub reported Pending for publish and under review.
- **Accountability:** owner=Publisher owner; status=blocked; next=Respond to GitHub review and complete public operator-detail decisions.; wait=Reviewer response plus genuine publisher details.; stale=2026-09-15
- **Outcome:** The listing is submitted and under review, not approved or published.
- **Content:** OAuth App 3822030, free plan, legal policies, media, private contact record, agreement acceptance, and signed ping.
- **Measurement:** One review request accepted; no live purchased or cancelled event observed.

### PF-E-003 — DoneState Marketplace review hardening

- **Date:** 2026-08-30
- **Situation:** The submitted listing needed monotonic entitlements, complete lifecycle tests, accurate public state, and incident operations.
- **Verification:** PR 47 merged as ac54dcaa2df2b4211814a076036cc2b3f3ace8a6; PR CI 33330031280 and post-merge CI 33330067769 passed; deployment 33330067776 published Cloudflare version c3c3dd14-512d-4ee5-a25a-f44914c00654; root returned HTTP 200 and webhook GET returned HTTP 405. Closure PR 48 merged as b8caff89d3be82f3367e3a3ba039f0ce264045df; PR CI 33330344725 and post-merge CI 33330389312 passed all three jobs.
- **Accountability:** owner=DoneState maintainers; status=complete; next=Use a separate development listing for real lifecycle tests and monitor production.; wait=None.; stale=2026-12-01
- **Outcome:** Older lifecycle events cannot roll state backward; all five actions and incident response are documented and tested.
- **Content:** Atomic effectiveAt guard, 80 Worker tests, documentation closure, incident/support runbook, and exact ledger closure.
- **Measurement:** One deployment, two live routing probes, 80 passing Worker tests, and three exact CI runs across hardening and closure.

### PF-E-004 — DoneState OpenAI version 0.2.0

- **Date:** 2026-08-30
- **Situation:** The plugin was submitted under AYOBAMI JOHN HAASTRUP.
- **Verification:** The OpenAI status page reported Review.
- **Accountability:** owner=Publisher owner; status=blocked; next=Record and respond to the decision.; wait=OpenAI review response.; stale=2026-09-15
- **Outcome:** In review, not approved or published.
- **Content:** Review transport, assets, prompts, cases, annotations, and read-only reviewer account.
- **Measurement:** One version submitted; zero publication decisions.

### PF-E-005 — Owner-side maintenance canary

- **Date:** 2026-08-30
- **Situation:** The private App opened DoneState PR 22 at exact head ffec48e6c5abd9cef840ab591896613769d3e779.
- **Verification:** Workflow 33260424569 passed all three checks; OpsTruth returned uncertain and issue 12 tracks the defect.
- **Accountability:** owner=OpsTruth maintainers; status=blocked; next=Fix issue 12 and independently re-evaluate the head.; wait=Corrected exact-head decision path.; stale=2026-09-08
- **Outcome:** The run remains AWAITING_VERIFICATION and PR 22 remains open.
- **Content:** PR-only publication, exact-head evidence, and signed uncertain decisions.
- **Measurement:** Three checks passed; zero conclusive decisions.

### PF-E-006 — Portfolio infrastructure follow-ups

- **Date:** 2026-08-30
- **Situation:** Proof & State website verification and domain review exposed bounded governance and runtime gaps.
- **Verification:** Prior status recorded missing branch protection, PR template, security policy and licence; aiworkaccountability.com returned HTTP 502 without identified source.
- **Accountability:** owner=Proof & State maintainers; status=planned; next=Close repository controls and identify the missing domain runtime separately.; wait=Branch protection follows CI; domain binding requires a source and hosting target.; stale=2026-09-30
- **Outcome:** The gaps remain explicit and are not treated as website or runtime success.
- **Content:** Governance-repository controls and AI Work Accountability source/runtime identification.
- **Measurement:** Four repository follow-ups and one unbound apex recorded.

### PF-E-007 — DoneState Marketplace development isolation, recovery, and lifecycle receipt

- **Date:** 2026-08-30
- **Situation:** Real lifecycle evidence required a development app, listing, runtime, state, and credential target isolated from the submitted production listing and private maintenance App.
- **Verification:** DoneState PR 49 merged as 34145185aa8703fd60d76049ce4e87475a78c132 and created the development boundary. OAuth App 3826463, draft listing donestate-marketplace-development, signed ping 13cd1ca8-a4b8-11f1-888d-aba6875c1ba2, and signed purchase 90c3e110-a4b8-11f1-8357-8b375ae56683 were recorded. A live HTTP 503 exposed a secret-target defect. Recovery PR 52 merged as f10fabc7501e8ed86b5136c465f00a3560d62f7a; CI 33337515371 and 33337554919 passed. Development run 33337554945 explicitly targeted donestate-mcp-development, deployed version 69e76740-b9b6-48ea-a979-34e04acbc47b, and passed 200/404/401/302 assertions. Production run 33337555133 restored donestate-mcp and deployed version fd8fe1b0-81bd-4ba6-aa84-b288ea9bc583. DoneState PR 55 merged as 1d6f2144d2fd84b9f241834dabc6ba50466b7555 after PR CI 33339529661; post-merge CI 33339639434 passed. Production deployment 33339639417 published version 774f0298-062f-4442-96d4-e2d52d7b1f94. Manual development run 33339800955, job 99333252695, passed 98 Worker tests, the development dry run, explicit development-secret targeting, deployment version b09b3849-eab3-4be4-a405-b61449e4801b, and 200/404/401/302 assertions. Cancellation redelivery 90b920c0-a4ba-11f1-852b-f37103c46ff2 returned HTTP 202 in 1.14 seconds with action cancelled, duplicate false, stale false, currentState CANCELLED, and currentEffectiveAt 2026-08-30T00:00:00.000Z, without account or plan identity. DoneState evidence PR 56 merged as 895efab0cdd2ce18682dfec9f2b9361dcc3a2987 after PR CI 33340108583; post-merge CI 33340143030 passed all three jobs.
- **Accountability:** owner=Publisher owner; status=active; next=Record live changed, pending_change, and pending_change_cancelled receipts.; wait=Three live development transition results remain.; stale=2026-09-12
- **Outcome:** Development and production credential targets are recovered, the cancellation is accepted with final isolated CANCELLED state, and R3 stays active only for the remaining three live transitions.
- **Content:** Exact source, app, listing, delivery, incident, CI, deployment, version, target-name, live-route, and privacy-minimal response evidence without secret values or personal billing data.
- **Measurement:** One app, one draft listing, one ping, one purchase, one accepted cancellation receipt, one recovered isolation incident, four development/production deployments across recovery and receipt delivery, 98 passing Worker tests, and four current development route assertions; changed and pending-change results remain unrecorded.

### PF-E-008 — API-only GTM orchestrator contract baseline

- **Date:** 2026-08-31
- **Situation:** Browser publication required repeated operator intervention and produced ambiguous image-only or unverified states; an unapproved intermediary was rejected.
- **Verification:** The governed application was implemented under apps/gtm-orchestrator with direct Google, LinkedIn, Facebook, Instagram, Threads and Cloudinary boundaries. Sixteen synthetic validation, provider-contract, orchestration, fail-closed, ambiguous-mutation, submitted/read-back retry, and reconciliation tests passed locally on 2026-08-31. Credential custody now stages Cloudflare provisioning before provider OAuth so clients are bound only to the final callback URL.
- **Accountability:** owner=Proof & State maintainers; status=active; next=Provision Cloudflare resources, obtain direct provider permissions, run identity probes, and exercise one authorised Google canary.; wait=Provider OAuth, production permissions, runtime resources, live publication and read-back remain unproven.; stale=2026-09-15
- **Outcome:** The architecture, code boundary, state machine, credential custody, provider gates and recovery semantics are versioned without claiming live publication.
- **Content:** Direct API publishing, Cloudinary asset validation, durable queueing, idempotency, provider read-back, evidence receipts and explicit no-browser/no-intermediary failure policy.
- **Measurement:** Sixteen local tests passed; zero live provider credentials used; zero posts created.

### PF-E-009 — Cloudflare canary deployment gate

- **Date:** 2026-08-31
- **Situation:** The operator reported saving the Cloudflare API token, account identifier and orchestrator admin token in the gtm-production GitHub environment; their values cannot be treated as valid until used by CI.
- **Verification:** An idempotent provisioning path now verifies the token, validates secret shapes without printing values, creates or reuses one EU D1 database and primary/dead-letter Queues, writes ignored runtime configuration, applies migrations, deploys with publishing disabled, and requires /health to return the exact Git commit. Four additional provisioning and health contract tests passed, bringing the local total to twenty.
- **Accountability:** owner=Proof & State maintainers; status=active; next=Execute the environment-bound canary and record the exact workflow, Cloudflare deployment and health URL only if read-back succeeds.; wait=Secret validity, Cloudflare resources, deployment and runtime health are unproven until the environment-bound workflow completes; provider OAuth remains absent.; stale=2026-09-15
- **Outcome:** The deployment path is versioned and fail-closed; no provider credential is present, publishing remains disabled, and no post can be created by this canary.
- **Content:** Idempotent Cloudflare provisioning, pinned Wrangler, secret-safe runtime config, D1 migration, exact-commit health read-back and a publishing-disabled deployment gate.
- **Measurement:** Twenty local tests passed; zero Cloudflare runtime claims; zero provider credentials used; zero posts created.

### PF-E-010 — First Cloudflare canary attempt

- **Date:** 2026-08-31
- **Situation:** The gtm-production workflow exercised the saved environment secrets for the first time.
- **Verification:** GTM Orchestrator workflow 33384151654 passed contract-tests in job 99462867765 and failed provisioning in job 99462922716 with CLOUDFLARE_ACCOUNT_ID must be a 32-character hexadecimal identifier. The masked runner environment displayed an extra line after that value. The script failed during local shape validation before token verification, resource discovery, migration or deployment; all later steps were skipped.
- **Accountability:** owner=Proof & State maintainers; status=active; next=Trim copied secret whitespace in code, pin deployment identity to the exact PR head and rerun from the provisioning gate.; wait=Cloudflare has not yet accepted or rejected the credential because no Cloudflare request occurred.; stale=2026-09-15
- **Outcome:** The fail-closed gate prevented malformed configuration from reaching Cloudflare. No resource, deployment or post is claimed.
- **Content:** A useful accountability incident: secrets existed, but a shape check prevented an invalid deployment claim before the provider was contacted.
- **Measurement:** One failed canary workflow; one successful contract-test job; zero Cloudflare requests from provisioning; zero posts created.

### PF-E-011 — Cloudflare credential permission boundary

- **Date:** 2026-08-31
- **Situation:** Whitespace normalisation allowed the canary to test the saved Cloudflare credential against the provider.
- **Verification:** GTM Orchestrator workflow 33384417393 checked out exact PR head 6d95d3abf80cba9a6774f0698be0fcf93ebbb6af, passed contract-tests in job 99463696624, then job 99463757978 verified the token as active before Cloudflare denied GET /accounts/[masked]/d1/database with HTTP 401 code 10000 Authentication error. Migration, deployment and health steps were skipped.
- **Accountability:** owner=Proof & State maintainers; status=active; next=Probe account-read access before D1 so the workflow can distinguish account resource-scope mismatch from missing D1 Edit permission.; wait=The current token cannot yet list D1 for the saved account; exact cause is narrowed but not yet separated.; stale=2026-09-15
- **Outcome:** The provider rejected D1 access and the workflow stopped before creating resources. No deployment or post is claimed.
- **Content:** An active credential is not proof of resource authority; each product permission must pass its own provider probe.
- **Measurement:** One active-token result, one D1 HTTP 401, one successful contract-test job, zero migrations, zero deployments and zero posts.

### PF-E-012 — Cloudflare D1 permission diagnosis

- **Date:** 2026-08-31
- **Situation:** A third canary separated account scope from product-level D1 authority.
- **Verification:** GTM Orchestrator workflow 33384717078 checked out exact PR head 38c225e33bd4fb2524c4a505e56990c00b2ffc41. Contract-tests passed; job 99464696850 verified the token as active and successfully read the exact saved account before D1 list returned HTTP 401 code 10000 Authentication error. The workflow emitted the bounded diagnosis that D1: Edit is missing or ineffective for this account. Migration, deployment and health were skipped.
- **Accountability:** owner=Proof & State maintainers; status=blocked; next=Replace only CLOUDFLARE_API_TOKEN with one granting D1: Edit on the verified account, then rerun the failed job.; wait=A credential change in the gtm-production GitHub environment is required; code cannot grant provider authority.; stale=2026-09-15
- **Outcome:** Account identity is verified and the exact missing authority is isolated without exposing identifiers or creating resources. No deployment or post is claimed.
- **Content:** Account access and product permission are separate evidence: an active token that sees an account can still be correctly denied D1.
- **Measurement:** One account-scope success, one D1 HTTP 401, twenty-one local tests passing, zero migrations, zero deployments and zero posts.

### PF-E-013 — Cloudflare token-policy mismatch diagnosis

- **Date:** 2026-09-01
- **Situation:** The owner restored the valid credential and supplied dashboard evidence showing D1 Read and Edit on an account-owned token for the entire account, yet repeated canaries still failed at the first D1 read.
- **Verification:** Workflow 33384932882 attempt 8 job 99737053436 and delayed attempt 9 job 99737335992 both verified the token as active and read the saved account before GET /accounts/[masked]/d1/database returned HTTP 401 code 10000. Contract tests remained green. Migration, deployment and health were skipped in both attempts.
- **Accountability:** owner=Proof & State maintainers; status=blocked; next=Expose only the token credential family in CI, then distinguish a GitHub secret/token-object mismatch from a provider-side D1 authorization defect.; wait=The dashboard policy and provider response conflict; secret values and identifiers must remain undisclosed.; stale=2026-09-15
- **Outcome:** Blind retries and repeated permission edits are stopped. The next probe is bounded to non-secret credential identity before any further owner action.
- **Content:** A settings screenshot is policy evidence, not proof that CI presents the same credential object; provider read-back remains authoritative.
- **Measurement:** Two account-scope successes, two D1 HTTP 401 responses, zero migrations, zero deployments and zero posts.

### PF-E-014 — Cloudflare credential-object reconciliation

- **Date:** 2026-09-01
- **Situation:** Dashboard policy evidence and provider read-back conflicted after D1 Read and Edit were visibly enabled for an account-owned token.
- **Verification:** PR 13 head 935b3993f79252c1b767dd299c8a8397c05bc49a added a secret-safe credential-family probe. GTM Orchestrator run 33470199000 passed contract-tests in job 99738223665. Environment-bound job 99738260788 verified the token and account, then reported Non-secret credential type: user-or-legacy before D1 list returned HTTP 401 code 10000. The dashboard screenshot identifies the edited credential as an Account API token, whose modern value uses Cloudflare's cfat_ format.
- **Accountability:** owner=Proof & State maintainers; status=blocked; next=Save the account-owned token's actual secret value as gtm-production CLOUDFLARE_API_TOKEN, or roll/create it if the one-time value is unavailable.; wait=GitHub currently holds a different user-or-legacy token from the account-owned token whose D1 policy was edited.; stale=2026-09-15
- **Outcome:** The mismatch is directly verified without exposing any token, token ID or account ID. No further permission toggling is indicated.
- **Content:** Editing one credential cannot expand the authority of a different credential stored in CI; credential identity must be reconciled before provider permission claims.
- **Measurement:** Twenty-two local tests and exact-head contract CI passed; one credential family mismatch was proven; zero migrations, zero deployments and zero posts.

### PF-E-015 — Cloudflare account-token verification route

- **Date:** 2026-09-01
- **Situation:** After the owner reported saving the correct account-owned credential, the next canary stopped before D1 because the provisioner still sent every credential to Cloudflare's user-token verification endpoint.
- **Verification:** GTM Orchestrator run 33470313248 attempt 2 passed contract-tests in job 99741684867. Deployment job 99741667608 checked out exact head dd3f538ce9ef26fd2c18abb28ebd6220157e92c6, then GET /user/tokens/verify returned HTTP 401 code 1000 Invalid API Token. Cloudflare's account-token API specifies GET /accounts/{account_id}/tokens/verify. The provisioner now selects the account route for cfat_ credentials and preserves the user route for user or legacy credentials; twenty-three local tests pass.
- **Accountability:** owner=Proof & State maintainers; status=active; next=Run the exact-head publishing-disabled canary and require every Cloudflare and health gate to pass.; wait=The saved token and all runtime resources remain unproven until the corrected route is exercised in environment-bound CI.; stale=2026-09-15
- **Outcome:** The retry isolated a credential-family routing defect without touching the secret or creating resources. The fix is locally verified; no deployment or post is claimed.
- **Content:** A provider can expose different verification routes for different credential families; calling the wrong identity endpoint can make a valid credential look invalid.
- **Measurement:** Twenty-three local tests passed; one exact-head contract job passed; one account-token routing defect isolated; zero migrations, zero deployments and zero posts.
