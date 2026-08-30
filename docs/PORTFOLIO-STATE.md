# Portfolio state

<!-- Generated from governance/portfolio-ledger.json. Do not edit by hand. -->

Canonical state date: **2026-08-30**

Every consequential portfolio event must update this ledger and its generated state in the same change. Product repository, CI, deployment, runtime, credential, review, publication, and independent-verification states remain separate.

## Exact source ledgers

| Project | Repository | Commit | Ledger |
|---|---|---|---|
| DoneState | AyobamiH/donestate | [`ecf2cb753ee9ccaaa0fe63ffb301d2633978cbe3`](https://github.com/AyobamiH/donestate/commit/ecf2cb753ee9ccaaa0fe63ffb301d2633978cbe3) | [governance/project-ledger.json](https://github.com/AyobamiH/donestate/blob/ecf2cb753ee9ccaaa0fe63ffb301d2633978cbe3/governance/project-ledger.json) |

## Recovery order

1. **P0 — Keep portfolio governance self-documenting.** Portfolio state is generated, stale work fails, and consequential changes require the ledger. (1 complete)
2. **P1 — Close remaining review and operator gates.** Review decisions and genuine operator contact, address, regulatory, and territory choices are recorded without exposing private data. (2 blocked)
3. **P2 — Separate development and prepare customers.** Development lifecycle tests are isolated from production and the first external-customer loop is supportable and measurable. (1 active, 2 planned)
4. **P3 — Close independent-verification gaps.** OpsTruth decides the exact maintenance head and AgentProof receipts remain consequence evidence rather than completion authority. (2 blocked, 1 planned)
5. **P4 — Advance releases and infrastructure through gates.** Release, governance-repository, domain-runtime, and fleet work advances only from exact authority and evidence. (2 deferred, 1 planned, 1 blocked)

## Work ledger

### P0 — Keep portfolio governance self-documenting

| ID | Status | Owner | Next action | Wait and re-entry | Stale |
|---|---|---|---|---|---|
| PF-GOV-001 — Enforce the portfolio Evidence Story Bank | complete | Proof & State maintainers | Keep the generated portfolio state, impact gate, and scheduled freshness check green. | Wait: None. Re-entry: Reopen if a consequential portfolio change can bypass the ledger or generated state. | 2026-12-01 |

### P1 — Close remaining review and operator gates

| ID | Status | Owner | Next action | Wait and re-entry | Stale |
|---|---|---|---|---|---|
| DS-LEGAL-001 — Complete DoneState public operator details | blocked | Publisher owner | Choose public support/privacy aliases, a legitimate service address, complete the ICO fee self-assessment, and record offered territories. | Wait: Requires genuine publisher decisions; do not publish the private contact inbox or invent an address. Re-entry: Resume when the publisher provides those decisions. | 2026-09-06 |
| OPENAI-REVIEW-001 — Close the DoneState OpenAI 0.2.0 review | blocked | Publisher owner | Record and respond to the reviewer decision, then retire legacy transport only when safe. | Wait: OpenAI status remains Review. Re-entry: Resume when OpenAI sends a decision. | 2026-09-15 |

### P2 — Separate development and prepare customers

| ID | Status | Owner | Next action | Wait and re-entry | Stale |
|---|---|---|---|---|---|
| DS-MKTDEV-001 — Create a separate Marketplace development listing | active | Publisher owner | Record the exact signed cancelled delivery and isolated final entitlement, then exercise changed, pending_change, and pending_change_cancelled in the owner-only draft. | Wait: The publisher reports the zero-cost test subscription cancelled, but authenticated browser control failed before the signed cancelled delivery and final isolated state could be recorded. Re-entry: Resume in authenticated GitHub Marketplace controls without altering either production app or the private maintenance App. | 2026-09-12 |
| DS-CUSTOMER-001 — Complete first-customer account, deletion, alerts, and support | planned | DoneState maintainers | Add entitlement visibility, whole-account deletion, webhook alerts, and an exercised support path. | Wait: Lifecycle ordering is deployed; public legal details remain blocked. Re-entry: Begin after DS-MKTDEV-001 and DS-LEGAL-001. | 2026-09-20 |
| DS-GTM-001 — Measure the useful-result funnel | planned | Proof & State maintainers | Measure non-founder activation, PR creation, independent decision, repeat use, support load, and conversion without unnecessary personal data. | Wait: Customer account and deletion semantics must be stable. Re-entry: Begin before the first external cohort. | 2026-09-25 |

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
- **Verification:** DoneState PR 46 merged as 364cf86e48cc9715c149867cbe0a5f5ac3899753; PR CI 33329584126 and post-merge CI 33329629870 passed all three jobs. Proof & State PR 8 merged as 911949934fc9c6cb40cd24ffa4d594aa5ca0d44a; PR CI 33330727848 and post-merge Governance 33330807325 passed.
- **Accountability:** owner=Proof & State maintainers; status=complete; next=Keep both generated-state and impact gates green.; wait=None.; stale=2026-12-01
- **Outcome:** Both repositories now have canonical ledgers, generated state, CI impact gates, and scheduled freshness checks.
- **Content:** Recovered backlog, accountability fields, evidence stories, exact source-ledger pinning, and separate-state rules.
- **Measurement:** Two governance PRs merged and four exact CI runs passed.

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

### PF-E-007 — DoneState Marketplace development OAuth App 3826463 and draft listing donestate-marketplace-development

- **Date:** 2026-08-30
- **Situation:** Real Marketplace lifecycle testing needed an owner-only app, listing, runtime, state, and credentials isolated from production and the private maintenance App.
- **Verification:** DoneState PR 49 merged as 34145185aa8703fd60d76049ce4e87475a78c132; post-merge CI 33331882626 passed; development deployment 33331882593 attempt 2, job 99322486219, published Cloudflare version be499906-19d4-4340-a968-e62aa5dc28d7. Signed ping 13cd1ca8-a4b8-11f1-888d-aba6875c1ba2 and purchased delivery 90c3e110-a4b8-11f1-8357-8b375ae56683 were recorded. The publisher reported cancelling the zero-cost subscription, but the signed cancelled delivery ID was not independently retrieved. DoneState PR 51 merged as ecf2cb753ee9ccaaa0fe63ffb301d2633978cbe3 after PR CI 33337319451; post-merge CI 33337369603 passed.
- **Accountability:** owner=Publisher owner; status=active; next=Record the signed cancelled delivery and isolated final entitlement, then complete live changed and pending-change coverage.; wait=Authenticated GitHub Marketplace delivery controls are temporarily unavailable to this session.; stale=2026-09-12
- **Outcome:** The isolated development lane is operational and production remained unchanged, but the live lifecycle exit criterion remains open.
- **Content:** Exact app, draft listing, source, CI, deployment, route isolation, signed ping and purchase, publisher-reported cancellation, and remaining proof gaps; no secret values or personal billing data.
- **Measurement:** Ninety-seven Worker tests, one development deployment, one signed ping and one signed purchase were recorded; zero signed cancelled delivery IDs and zero live changed or pending-change deliveries are recorded.
