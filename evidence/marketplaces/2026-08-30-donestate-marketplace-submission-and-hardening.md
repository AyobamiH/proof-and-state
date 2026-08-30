# DoneState Marketplace submission and hardening evidence — 2026-08-30

## Outcome

The DoneState free public-repository OAuth listing completed its owner gates, was submitted to GitHub, and is under review. GitHub reports **Pending for publish**. This proves receipt of the review request, not approval, publication, public availability, or any widening of the private maintenance GitHub App.

## Application boundary

| Surface | Exact state |
|---|---|
| Marketplace listing | Attached to OAuth App `3822030`; free public-repository plan; submitted and under review |
| Private maintenance App | App `4761698`; installation `157513439`; Only select repositories; only `AyobamiH/donestate`; PR-only; not reused for the public listing |
| OpenAI directory | Version `0.2.0` separately remains in `Review`; not approved or published |
| Maintenance canary | PR #22 at `ffec48e6…`; `AWAITING_VERIFICATION`; independent exact-head issue remains OpsTruth #12 |

## Submission chain

| Evidence | Exact subject |
|---|---|
| Binding operator documents | DoneState PR #44; merge `c791d7040637627f21b248cf76907796da61f816`; post-merge CI `33326065889` |
| Owner gates | Private publisher contact record complete; account prerequisites satisfied; Marketplace Developer Agreement v2.4 accepted on 30 August 2026 |
| Review request record | DoneState PR #45; merge `37e049b9d6b6749c2085562ac84f433e40e404e4` |
| GitHub state | `Pending for publish` and under review |
| Live purchase evidence | None; only the signed GitHub ping has been observed in production |

The private publisher contact value is intentionally absent from the repository. Public support/privacy aliases, a legitimate operator service address, the ICO fee self-assessment and offered-territory decisions remain recorded blockers; they are not invented from the private contact record.

## Self-documenting governance

DoneState PR #46 introduced the canonical project ledger and generated state:

| Evidence | Exact subject |
|---|---|
| Candidate commit | `06b5e2fa22af24c25774c542e9b9f01cd893fb06` |
| Candidate tree | `843bf3dce837010993d31f96d2c59ee15ac604c6` |
| PR CI | `33329584126`, all three jobs passed, including governance impact |
| Merge | `364cf86e48cc9715c149867cbe0a5f5ac3899753` |
| Post-merge CI | `33329629870`, all three jobs passed |

The ledger distinguishes repository, CI, deployment, runtime, credential, external review and independent verification states. Active, planned, blocked and deferred work retains an owner, next action, wait condition, re-entry condition and stale date.

## Review hardening and deployment

DoneState PR #47 removed stale reviewer-facing claims, published incident/support operations, made Marketplace entitlement time monotonic with an atomic SQLite predicate, and tested every lifecycle action plus duplicate and out-of-order delivery.

| Evidence | Exact subject |
|---|---|
| Candidate commit | `82fe3d6e9b4000b07c088158328409afa51dcf90` |
| Candidate tree | `aacf05144ff0edf2d460f6b9702a4454a35809ab` |
| PR CI | `33330031280`, all three jobs passed |
| Merge | `ac54dcaa2df2b4211814a076036cc2b3f3ace8a6` |
| Post-merge CI | `33330067769`, all three jobs passed |
| Deployment | `33330067776`, success |
| Cloudflare version | `c3c3dd14-512d-4ee5-a25a-f44914c00654` |
| Worker suite | 16 files, 80 tests passed |
| Live read-only probes | Service root HTTP 200; GET on POST-only Marketplace webhook HTTP 405 |

The webhook handles `purchased`, `changed`, `cancelled`, `pending_change` and `pending_change_cancelled`. An older `effective_date` is acknowledged but cannot overwrite newer entitlement state. Entitlement grants no repository selection, execution, push, pull-request, merge, deployment or verification authority.

## Closure record

DoneState PR #48 recorded the exact hardening deployment in the product ledger. Its merge is `b8caff89d3be82f3367e3a3ba039f0ce264045df`; PR CI `33330344725` and post-merge CI `33330389312` passed all three jobs. This is the DoneState source-ledger commit pinned by Proof & State.

## Remaining gates

- GitHub review response: blocked on GitHub; do not call the listing approved or published.
- Public operator aliases, service address, ICO fee assessment and offered territories: blocked on genuine publisher input.
- Real purchase lifecycle: use a separate development OAuth App and draft listing; do not alter the submitted production listing and do not reuse the private maintenance App.
- First external customer: account/entitlement visibility, whole-account deletion, webhook alerting, support exercise and useful-result measurement remain ordered work.
- Independent maintenance proof: OpsTruth issue #12 and DoneState PR #22 remain separate from Marketplace entitlement state.

## Trust boundary

DoneState executes bounded authorised work and does not prove itself. OpsTruth independently observes and signs decisions without mutating the target. Proof & State indexes exact evidence and unresolved gates without upgrading submission, CI, deployment, routing or signatures into a different claim.
