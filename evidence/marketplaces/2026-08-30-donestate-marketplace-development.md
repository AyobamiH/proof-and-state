# DoneState Marketplace development evidence — 2026-08-30

DoneState now has a Marketplace development lane that is structurally and operationally separate from both production apps. This record distinguishes exact external evidence from publisher report and keeps the remaining lifecycle proof gap open.

## Exact identities

| Surface | Subject |
|---|---|
| Development OAuth App | `DoneState Marketplace Development`, App `3826463` |
| Owner-only listing | Draft `donestate-marketplace-development`; never submitted for publication |
| Test plan | `Development Test`; zero cost |
| Runtime | `https://donestate-mcp-development.woeinvests.workers.dev` |
| Worker version | `be499906-19d4-4340-a968-e62aa5dc28d7` |
| Production OAuth App | `3822030`; unchanged |

## Repository, CI and deployment

- DoneState PR #49 merged as `34145185aa8703fd60d76049ce4e87475a78c132` from exact tree `d6ae69a4d3b2a62407475316aa20df46ab7907a6`.
- Post-merge CI `33331882626` passed all three required jobs.
- Development deployment `33331882593`, attempt 2, successful job `99322486219`, validated the isolated secret names and published the Worker version above.
- DoneState PR #51 recorded the external evidence and merged as `ecf2cb753ee9ccaaa0fe63ffb301d2633978cbe3`; PR CI `33337319451` and post-merge CI `33337369603` passed all three jobs.

No secret value or personal billing data belongs in this evidence.

## Live evidence

- GitHub signed ping delivery: `13cd1ca8-a4b8-11f1-888d-aba6875c1ba2`.
- GitHub signed `marketplace_purchase.purchased` delivery: `90c3e110-a4b8-11f1-8357-8b375ae56683`.
- Public development root: HTTP 200 with the explicit isolated-environment notice.
- MCP, OAuth-provider, OpenAI-review, GitHub-App settings, and webhook GET routes: HTTP 404.
- Publisher report: the zero-cost test subscription was cancelled.

The publisher report is not upgraded into signed-delivery evidence. Authenticated browser control failed before the exact `marketplace_purchase.cancelled` delivery ID and resulting isolated entitlement state were retrieved.

## Remaining gate

The DoneState and portfolio work items remain active. The next authenticated GitHub Marketplace session must:

1. record the exact signed cancelled delivery and isolated final entitlement;
2. exercise and record live `changed`, `pending_change`, and `pending_change_cancelled` deliveries;
3. keep the listing owner-only and draft;
4. leave the submitted production listing, production OAuth App and secrets, and private maintenance GitHub App unchanged.

The 97 passing Worker tests prove deterministic handling of all five actions, duplicates, and out-of-order deliveries. They do not prove that GitHub emitted the missing live transitions.
