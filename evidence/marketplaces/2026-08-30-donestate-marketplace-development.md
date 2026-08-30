# DoneState Marketplace development evidence — 2026-08-30

DoneState has a Marketplace development lane structurally separated from the submitted production listing and private maintenance App. This record distinguishes exact external evidence, publisher report, and the recovered credential-target incident while keeping the remaining lifecycle proof gap open.

## Exact identities

| Surface | Subject |
|---|---|
| Development OAuth App | `DoneState Marketplace Development`, App `3826463` |
| Owner-only listing | Draft `donestate-marketplace-development`; never submitted for publication |
| Test plan | `Development Test`; zero cost |
| Runtime | `https://donestate-mcp-development.woeinvests.workers.dev` |
| Recovered development version | `69e76740-b9b6-48ea-a979-34e04acbc47b` |
| Production OAuth App and submitted listing | App `3822030`; configuration unchanged |
| Restored production Worker version | `fd8fe1b0-81bd-4ba6-aa84-b288ea9bc583` |

## Repository, CI and deployment

- DoneState PR #49 merged as `34145185aa8703fd60d76049ce4e87475a78c132` from tree `d6ae69a4d3b2a62407475316aa20df46ab7907a6` and deployed initial development version `be499906-19d4-4340-a968-e62aa5dc28d7` in run `33331882593` attempt 2.
- DoneState PR #51 recorded App, listing, ping, and purchase evidence and merged as `ecf2cb753ee9ccaaa0fe63ffb301d2633978cbe3`; PR CI `33337319451` and post-merge CI `33337369603` passed.
- A later unsigned development webhook probe returned HTTP 503. Run `33331882593` logged its generic secret uploader processing `donestate-mcp`, so the development target was missing its webhook secret and production Worker credentials required restoration.
- Recovery PR #52 merged as `f10fabc7501e8ed86b5136c465f00a3560d62f7a` from tree `83299fb9d55c7f2487a644d932eaf1b9d10c35ea`; PR CI `33337515371` and post-merge CI `33337554919` passed.
- Development run `33337554945`, job `99327095747`, explicitly processed secrets for `donestate-mcp-development`, published the recovered development version above, and passed root 200, MCP 404, unsigned-webhook 401, and OAuth-start 302 assertions.
- Production run `33337555133`, job `99327096294`, restored the production secret set to `donestate-mcp` and published the restored production version above.
- Closure PR #53 merged as `13b3bf36244e8dbb674a21bf88881a3cfb3a72c5` from tree `a0cd3c11b41c6f6e0e8ced1c9c1375390cd836c9`; post-merge CI `33337799892` passed and development deployment returned to manual-only.

No secret value or personal billing data belongs in this evidence.

## Live evidence

- GitHub signed ping delivery: `13cd1ca8-a4b8-11f1-888d-aba6875c1ba2`.
- GitHub signed `marketplace_purchase.purchased` delivery: `90c3e110-a4b8-11f1-8357-8b375ae56683`.
- Publisher report: the zero-cost test subscription was cancelled.
- Post-recovery development probes: root HTTP 200, `/mcp` HTTP 404, unsigned Marketplace webhook HTTP 401; the workflow also proved OAuth start HTTP 302 with the development callback.
- Post-restoration production probes: root HTTP 200 and unsigned Marketplace webhook HTTP 401.

The publisher report is not upgraded into signed-delivery evidence. Authenticated browser control failed before the exact `marketplace_purchase.cancelled` delivery ID and resulting isolated entitlement state were retrieved.

## Remaining gate

The DoneState and portfolio work items remain active. The next authenticated GitHub Marketplace session must:

1. record the exact signed cancelled delivery and isolated final entitlement;
2. exercise and record live `changed`, `pending_change`, and `pending_change_cancelled` deliveries;
3. keep the listing owner-only and draft;
4. leave the submitted production listing, production OAuth App configuration, and private maintenance GitHub App unchanged.

The 97 passing Worker tests prove deterministic handling of all five actions, duplicates, and out-of-order deliveries. They do not prove that GitHub emitted the missing live transitions.
