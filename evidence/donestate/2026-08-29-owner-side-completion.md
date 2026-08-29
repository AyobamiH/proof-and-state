# DoneState owner-side completion evidence — 2026-08-29

## Scope

This record covers the fresh owner-side GitHub App and PR-only maintenance path. The already verified historical hosted canary `631d8a08-d337-4bae-bd18-b55c31f48a8b` was not rechecked.

## Governance and installation

- Canonical governance repository: [AyobamiH/proof-and-state](https://github.com/AyobamiH/proof-and-state)
- Initial governance commit: `70216ea38037ace3891b048d7bd5df03013d9913`
- GitHub App: `donestate-maintenance-ayobamih`
- App ID: `4761698`
- Installation ID: `157513439`
- Visibility: private App
- Installation choice: Only select repositories
- Authorized repository: only `AyobamiH/donestate`
- Mode: `pr_only`
- Required checks: `core (22)`, `core (24)`, `hosted-plugin`
- Enabled: automatic repair and scheduling
- Authority: read Actions, issues, and metadata; read/write code and pull requests
- Excluded authority: administration, merge, deployments, releases, environments, secret management, and workflow write

No private key, installation token, webhook secret, OpenAI credential, or single-use setup link is indexed here.

## Supporting DoneState repairs

| PR | Purpose | Merge commit | Main CI | Deployment |
| --- | --- | --- | --- | --- |
| [#12](https://github.com/AyobamiH/donestate/pull/12) | GitHub App manifest redirect and state | `d71e2ae62c4dd4df8a8544d695f4ce607f0fbc54` | `33256419955` | `33256419973` |
| [#13](https://github.com/AyobamiH/donestate/pull/13) | Remove unsupported default events | `d55251fe3d093fa4a8c4f2c27560be58e687877d` | `33257438733` | `33257438735` |
| [#14](https://github.com/AyobamiH/donestate/pull/14) | Accept PKCS1 manifest private keys | `371dcee8936ea0e610f98fa45fa64089ab8b2d4c` | `33258044196` | `33258044204` |
| [#16](https://github.com/AyobamiH/donestate/pull/16) | Use installation-token permissions for maintenance branches | `bd54d919f149df4007b3f64e61594a7c406dc683` | `33258708383` | `33258708407` |
| [#19](https://github.com/AyobamiH/donestate/pull/19) | Keep pending-CI uncertain decisions retryable | `cb6f34a4b02fc542c9b93bdb0193864e44a455ea` | `33259676084` | `33259676106` |
| [#24](https://github.com/AyobamiH/donestate/pull/24) | Redacted owner-visible verifier summaries | `cb4509377ed1738ad7eb141f1f1051854b6a37a5` | `33261815561` | `33261815551` |

Each source branch is preserved.

## Canary provenance

1. Issue [#15](https://github.com/AyobamiH/donestate/issues/15), run `781565b0-1768-4408-bbb0-c38d492d3cf9`: repository clone succeeded; implementation service returned HTTP 500 before branch, commit, or PR.
2. Issue [#17](https://github.com/AyobamiH/donestate/issues/17), run `186d9439-4352-4ffe-a5f2-725ab0f6550a`: App-authored [PR #18](https://github.com/AyobamiH/donestate/pull/18), head `3673ca26984ec747934255221828a339b819d7a3`, and green CI proved publication. A pre-CI OpsTruth observation exposed the terminal-state defect repaired by #19.
3. Issue [#20](https://github.com/AyobamiH/donestate/issues/20), run `9f25e531-2b1b-4daa-817a-c3e9dc39f5be`: clone succeeded; the implementation service returned HTTP 500 before mutation.
4. Issue [#21](https://github.com/AyobamiH/donestate/issues/21), run `b4242932-0bc1-4876-a202-634d9c12d72a`: current canonical final canary.

## Canonical final canary

- Pinned base: `cb6f34a4b02fc542c9b93bdb0193864e44a455ea`
- App branch: `donestate/b4242932-0bc1-4876-a202-634d9c12d72a`
- Head: `ffec48e6c5abd9cef840ab591896613769d3e779`
- Pull request: [#22](https://github.com/AyobamiH/donestate/pull/22)
- Diff: one file, `docs/MAINTENANCE-CANARY.md`, 15 additions
- Local validation: dependency install succeeded with zero vulnerabilities; 22 Node tests passed
- GitHub Actions run: [33260424569](https://github.com/AyobamiH/donestate/actions/runs/33260424569)
- `core (22)`: job `99121301970`, completed successfully
- `core (24)`: job `99121301934`, completed successfully
- `hosted-plugin`: job `99121301886`, completed successfully
- Objective digest: `02d157cf145cfe7ecf45a1091ee0deeb6cf87f04db7ebc9676827effd1b3561b`
- Execution snapshot digest: `ccf2d19d07e4cdbed8d513c8eb625d85360765e7f37aa8bf8944f28d79ed40f7`
- Current event-chain head: `4f7746596f18368bcaff6bb9faf662119c5f7ba2e04e278096bd07fc667f7c4d`
- Current handoff digest: `b5d32f22a64e16e90ee0c6b5b3d3ae18a62b061f8c322044f33b76e76d361ab0`
- Publication state: open and intentionally unmerged

## Independent verification status

OpsTruth accepted and signed repeated v2 attestations with pinned signer fingerprint `09544c3ede70b832a114918bb439960004655faf9d36981e1402587af9429c86`. The latest decision is `uncertain`, so DoneState correctly remains `AWAITING_VERIFICATION`.

Latest observed summary:

- issued by: `urn:opstruth:service:public-verifier`
- verification report digest: `02b4b3d0a1226876a81c22da519168b1c29737f217aa85d125595e3a81ec8705`
- evidence references: all three required job URLs, the exact head commit, and the exact base-to-head comparison
- verifier defect: [AyobamiH/opstruth#12](https://github.com/AyobamiH/opstruth/issues/12)

Public GitHub evidence verifies the exact-head CI claim. A terminal independent `verified` decision is not yet available, so this index does not claim the whole canary is verified.
