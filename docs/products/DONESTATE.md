# DoneState

## Purpose

DoneState is the authorised execution control plane. It converts a bounded objective into durable, reviewable repository actions and stops at independent verification.

## Owner-side configuration

- Implementation repository: [AyobamiH/donestate](https://github.com/AyobamiH/donestate)
- GitHub App: `donestate-maintenance-ayobamih` (private)
- App ID: `4761698`
- Installation ID: `157513439`
- Installation scope: Only select repositories
- Selected repository: only `AyobamiH/donestate`
- Maintenance mode: `pr_only`
- Required checks: `core (22)`, `core (24)`, `hosted-plugin`
- Automatic repair and scheduling: enabled for the selected repository

## GitHub authority

Read Actions, issues, and metadata; read and write code and pull requests. No administration, merge, deployment, release, workflow-write, environment, or secret-management authority.

## Completion model

A successful local implementation and green CI are execution evidence, not completion proof. DoneState reaches `VERIFIED` only after a complete matching `donestate.verification-contract.v2` response containing the report and signed attestation from a pinned independent verifier. Uncertain observations remain retryable in `AWAITING_VERIFICATION`.

## Current maintenance proof

Fresh successor `c4a07fa6-90b2-4597-a4c6-eae66de5a3e8` is independently `VERIFIED`. [PR #115](https://github.com/AyobamiH/donestate/pull/115) remains intentionally open at head `41f1ae3b0fed670e64bd99f1bcb1aea9c9e7e869`, with exact-head CI `33806832575`. Preserve this PR-only evidence rather than merging it as unfinished work.

## Historical maintenance canary

The earlier owner-side canary was run `b4242932-0bc1-4876-a202-634d9c12d72a`, branch `donestate/b4242932-0bc1-4876-a202-634d9c12d72a`, head `ffec48e6c5abd9cef840ab591896613769d3e779`, and [PR #22](https://github.com/AyobamiH/donestate/pull/22). The PR was later merged by the owner as `4543c4dcbc1f5f95d1d53ef0a1f8cbeafd8ead4a`; the automatic maintenance executor did not gain merge authority. The OpsTruth outcome was `uncertain`, and post-merge workflow `33474288066` failed its governance impact gate, so neither historical subject is independently verified. This does not invalidate the separately proven successor.

## OpenAI directory state

Current source E-061 records an owner-authorised reset and canonical `0.3.2` draft with 20 tools. It does not prove current submission, approval or publication. Read back the canonical publisher before acting; do not retain a deleted submission as current or create a duplicate product. The following earlier submission is historical evidence.

DoneState version `0.2.0` was submitted on 2026-08-30 and the OpenAI Platform reports status `Review`. The submitted surface includes the repository-hosted demo and icons, five positive cases, three non-trigger cases, 19 scanned MCP tools, 57 annotation justifications, and a dedicated server-enforced read-only reviewer account.

Final review-path source is `1588c0588dfcbfcefc70cda71e8197c1b14b7fed`; post-merge CI `33297909263` and deployment `33297909318` succeeded. See the [submission evidence](../../evidence/donestate/2026-08-30-openai-review-submission.md).

`Review` is not approval or publication. The historical canary remains `AWAITING_VERIFICATION`; the fresh successor has separate `VERIFIED` evidence.

## GitHub Marketplace review

The separate public-repository OAuth listing attached to OAuth App `3822030` was submitted on 30 August 2026. GitHub reports `Pending for publish` and under review; this is not approval or publication. The private maintenance GitHub App remains outside the listing and selected only for `AyobamiH/donestate`.

Review hardening merged in DoneState PR #47 as `ac54dcaa2df2b4211814a076036cc2b3f3ace8a6`. Post-merge CI `33330067769` passed, deployment `33330067776` published Cloudflare version `c3c3dd14-512d-4ee5-a25a-f44914c00654`, and live routing probes returned the expected HTTP 200 root and HTTP 405 webhook GET. Marketplace entitlement time is monotonic, all five lifecycle actions are tested, and the incident runbook is public. See the [submission and hardening evidence](../../evidence/marketplaces/2026-08-30-donestate-marketplace-submission-and-hardening.md).

## GitHub Marketplace development

The separate development OAuth App `3826463` and owner-only draft listing `donestate-marketplace-development` recorded a signed ping and purchase without changing the submitted production listing or private maintenance App. A secret-target defect was exposed by a live HTTP 503 and recovered in PR #52. Receipt PR #55 then passed PR and post-merge CI, deployed production version `774f0298-062f-4442-96d4-e2d52d7b1f94`, and separately deployed development version `b09b3849-eab3-4be4-a405-b61449e4801b` through the manual-only workflow. Cancellation `90b920c0-a4ba-11f1-852b-f37103c46ff2` returned HTTP 202 with a non-personal final `CANCELLED` receipt. Live `changed`, `pending_change`, and `pending_change_cancelled` transitions remain open.

See the [development lifecycle and recovery evidence](../../evidence/marketplaces/2026-08-30-donestate-marketplace-development.md).

## Project-state source

DoneState's canonical project ledger is `governance/project-ledger.json` at current-main commit `e24f543b58b69d861be1f2f5153903a654a9f5ea`; CI `37152045333` passed. Runtime source is separately recorded as `c984744c732f598db8859b5b9d4367d1f8da2aef`, deployed by `37143245994` to Worker `c80942ed-6854-4bfb-bdd2-b800df7b1464`.

CUST-001/CUST-002 are complete in PR #164: real disposable deletion, shared account layout and production generation-fence acceptance passed. RELEASE-001 remains blocked on a fresh full customer journey and remaining legitimate public address/contact details. Fresh continuation E-067 confirms the execution credential is connected, but objective admission stopped before execution; GitHub confirms the disposable account has only read access to the target. The temporary customer maintenance selection was removed and the key retained. No customer run, PR or verification is claimed. AgentProof and broader fleet authority remain deferred.

## Fresh dependency security follow-up

The inherited Worker lock failed the permanent high-severity audit gate in fresh PR #166 CI `37575211329` with eight high and one critical affected package records. Candidate head `dce8772122b50186bbdbece53bd9a3bc21d42da4` pins upstream patches without changing runtime packages, scopes or the gate. Local clean install/audit (zero vulnerabilities), 40 core tests, 142 Worker tests, plugin validation and Worker bundle dry-run passed. Exact-head CI `37576065787` passed all three required jobs on the same exact candidate head; hosted logs confirm zero vulnerabilities at the unchanged audit gate. The full local container build requires Docker, which is absent here; no deployment or production upgrade is claimed. Owner merge and deployment decisions remain separate.
