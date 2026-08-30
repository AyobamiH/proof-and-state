# DoneState Marketplace development evidence — 2026-08-30

DoneState has a Marketplace development lane structurally separated from the submitted production listing and private maintenance App. This record distinguishes exact external evidence, publisher report, and the recovered credential-target incident while keeping the remaining lifecycle proof gap open.

## Exact identities

| Surface | Subject |
|---|---|
| Development OAuth App | `DoneState Marketplace Development`, App `3826463` |
| Owner-only listing | Draft `donestate-marketplace-development`; never submitted for publication |
| Test plan | `Development Test`; zero cost |
| Runtime | `https://donestate-mcp-development.woeinvests.workers.dev` |
| Current development version | `b09b3849-eab3-4be4-a405-b61449e4801b` |
| Production OAuth App and submitted listing | App `3822030`; configuration unchanged |
| Current production Worker version | `774f0298-062f-4442-96d4-e2d52d7b1f94` |

## Repository, CI and deployment

- DoneState PR #49 merged as `34145185aa8703fd60d76049ce4e87475a78c132` from tree `d6ae69a4d3b2a62407475316aa20df46ab7907a6` and deployed initial development version `be499906-19d4-4340-a968-e62aa5dc28d7` in run `33331882593` attempt 2.
- DoneState PR #51 recorded App, listing, ping, and purchase evidence and merged as `ecf2cb753ee9ccaaa0fe63ffb301d2633978cbe3`; PR CI `33337319451` and post-merge CI `33337369603` passed.
- A later unsigned development webhook probe returned HTTP 503. Run `33331882593` logged its generic secret uploader processing `donestate-mcp`, so the development target was missing its webhook secret and production Worker credentials required restoration.
- Recovery PR #52 merged as `f10fabc7501e8ed86b5136c465f00a3560d62f7a` from tree `83299fb9d55c7f2487a644d932eaf1b9d10c35ea`; PR CI `33337515371` and post-merge CI `33337554919` passed.
- Development run `33337554945`, job `99327095747`, explicitly processed secrets for `donestate-mcp-development`, published recovery version `69e76740-b9b6-48ea-a979-34e04acbc47b`, and passed root 200, MCP 404, unsigned-webhook 401, and OAuth-start 302 assertions.
- Production run `33337555133`, job `99327096294`, restored the production secret set to `donestate-mcp` and published restoration version `fd8fe1b0-81bd-4ba6-aa84-b288ea9bc583`.
- Closure PR #53 merged as `13b3bf36244e8dbb674a21bf88881a3cfb3a72c5` from tree `a0cd3c11b41c6f6e0e8ced1c9c1375390cd836c9`; post-merge CI `33337799892` passed and development deployment returned to manual-only.
- Lifecycle receipt PR #55 merged as `1d6f2144d2fd84b9f241834dabc6ba50466b7555`; PR CI `33339529661` and post-merge CI `33339639434` passed all three required jobs.
- Production run `33339639417` published version `774f0298-062f-4442-96d4-e2d52d7b1f94`. Separate manual development run `33339800955`, job `99333252695`, passed all 98 Worker tests, the Wrangler dry run, explicit development-secret targeting, deployment version `b09b3849-eab3-4be4-a405-b61449e4801b`, and root 200, MCP 404, unsigned-webhook 401, and OAuth-start 302 assertions.
- Evidence PR #56 merged as `895efab0cdd2ce18682dfec9f2b9361dcc3a2987`; PR CI `33340108583` and post-merge CI `33340143030` passed all three required jobs. This exact commit is the portfolio-pinned DoneState ledger source.

No secret value or personal billing data belongs in this evidence.

## Live evidence

- GitHub signed ping delivery: `13cd1ca8-a4b8-11f1-888d-aba6875c1ba2`.
- GitHub signed `marketplace_purchase.purchased` delivery: `90c3e110-a4b8-11f1-8357-8b375ae56683`.
- Accepted `marketplace_purchase.cancelled` delivery: `90b920c0-a4ba-11f1-852b-f37103c46ff2`.
- Post-recovery development probes: root HTTP 200, `/mcp` HTTP 404, unsigned Marketplace webhook HTTP 401; the workflow also proved OAuth start HTTP 302 with the development callback.
- Post-restoration production probes: root HTTP 200 and unsigned Marketplace webhook HTTP 401.

The cancellation originally returned HTTP 503 while the development credential target was defective. One controlled redelivery at `2026-08-30T22:43:17Z` returned HTTP 202 in 1.14 seconds. Its non-personal `donestate.marketplace-webhook-receipt.v1` body reported `action=cancelled`, `duplicate=false`, `stale=false`, `currentState=CANCELLED`, and `currentEffectiveAt=2026-08-30T00:00:00.000Z`; it exposed no account or plan identity.

## Remaining gate

The DoneState and portfolio work items remain active. The next authenticated GitHub Marketplace session must:

1. exercise and record live `changed`, `pending_change`, and `pending_change_cancelled` deliveries;
2. keep the listing owner-only and draft;
3. leave the submitted production listing, production OAuth App configuration, and private maintenance GitHub App unchanged.

The 98 passing Worker tests prove deterministic handling of all five actions, duplicates, out-of-order deliveries, and receipt privacy. They do not prove that GitHub emitted the three missing live transitions.
