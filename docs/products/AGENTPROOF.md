# AgentProof

## Supported capability

AgentProof provides transaction-bound approval, separate execution, durable exactly-once state, independent postcondition verification and immutable signed receipts for `agentproof.repository_patch.v1`. Its local development lifecycle includes compensation as an append-only successor. Other consequence profiles are candidates, not supported runtime actions.

## Exact prerelease evidence

Observed 7 October 2026:

| Subject | Evidence | Limit |
| --- | --- | --- |
| RC5 GitHub and npm | Public `@oneclicksystems/agentproof@0.1.0-rc.5`; both tarballs have SHA-256 `a7e085a9202e88db02511309b2ee5f9c62cd4bbb69cb00c4c609b8116eee2a7a`; 81 identical entries; registry signature verifies | Existing publication, not a newly authorised release |
| RC5 clean consumer | Fresh registry install imports public exports and completes prepare, approval, execute, offline verify, identical retry receipt and compensation | Owner-side development test; not independent adoption or production signing |
| RC6 GitHub | Source `a0ee17a70d05bc3c339c0c15be6bb38b4517771a`; release run `37572076728`; asset SHA-256 `f9dd7eb65f5809c69584624272c0c7dc13a84209c4a2daee338dfee43f5050ca` | RC6 npm publication remains unproven; fresh registry list contains RC5 only |

The owner-approved [AgentProof PR #7](https://github.com/AyobamiH/agentproof/pull/7) merged as `104b793e256c7f8f7f682891da2fa3817d3fc199`, correcting the stale RC5 npm claim and preserving the exact artifact/consumer evidence. Post-merge CI `37577387142` passed; release workflow `37577387146` skipped publication steps. Existing RC5/RC6 tags, source pins and asset digests remain unchanged; no new release or package publication is claimed.

## Trust boundary

The proposer, approval authority, executor, receipt signer and offline verifier retain separate responsibilities. Receipt integrity, explicit signer trust and signed transaction claims are distinct from fresh observation of an external outcome. A signature never proves merge, deployment, registry publication or live reachability by itself.

OpsTruth independently observes the named evidence. DoneState reaches `VERIFIED` only through the matching complete independent verification contract. AgentProof receipts cannot certify that outcome or expand executor authority.

## Candidate portfolio integration

The DoneState lifecycle-adapter and merge/deploy/package/release profiles are gated documentation. Production integration requires measured independent adoption, a production approval/signing provider, explicit action and threat-model contracts, and a separately reviewed consequence authority. No portfolio runtime integration is enabled here.

The DoneState-to-OpsTruth v2 successor is already independently `VERIFIED` without AgentProof. Its PR #115 remains deliberately unmerged. AgentProof is a separately selected future requirement; broader fleet authority remains later.
