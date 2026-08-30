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

A successful local implementation and green CI are execution evidence, not completion proof. DoneState reaches `VERIFIED` only after a matching signed attestation from a pinned independent verifier. Uncertain observations remain retryable in `AWAITING_VERIFICATION`.

## Maintenance canary

The canonical fresh owner-side canary is run `b4242932-0bc1-4876-a202-634d9c12d72a`, branch `donestate/b4242932-0bc1-4876-a202-634d9c12d72a`, head `ffec48e6c5abd9cef840ab591896613769d3e779`, and [PR #22](https://github.com/AyobamiH/donestate/pull/22). It is intentionally unmerged and preserves the PR-only authority boundary.

## OpenAI directory review

DoneState version `0.2.0` was submitted on 2026-08-30 and the OpenAI Platform reports status `Review`. The submitted surface includes the repository-hosted demo and icons, five positive cases, three non-trigger cases, 19 scanned MCP tools, 57 annotation justifications, and a dedicated server-enforced read-only reviewer account.

Final review-path source is `1588c0588dfcbfcefc70cda71e8197c1b14b7fed`; post-merge CI `33297909263` and deployment `33297909318` succeeded. See the [submission evidence](../../evidence/donestate/2026-08-30-openai-review-submission.md).

`Review` is not approval or publication and does not change the fresh maintenance canary's `AWAITING_VERIFICATION` state.
