# DoneState Marketplace webhook live evidence — 2026-08-30

## Outcome

The DoneState GitHub Marketplace webhook is configured, deployed on the canonical owned domain, and accepting GitHub's signed listing ping.

| Evidence | Receipt |
| --- | --- |
| Repository secret binding | `DONE_STATE_GITHUB_MARKETPLACE_WEBHOOK_SECRET` maps to Worker binding `GITHUB_MARKETPLACE_WEBHOOK_SECRET` |
| Secret deployment PR | `AyobamiH/donestate#41` |
| Secret deployment merge | `da61779` |
| Secret deployment workflow | `33324111015`, success |
| Signed ping repair PR | `AyobamiH/donestate#42` |
| Signed ping repair merge | `2d6cb6c` |
| Repair deployment workflow | `33324975105`, success; 16 test files and 78 tests |
| GitHub delivery | `7e964cd0-a495-11f1-9c22-dc3366715a90`, `ping` redelivery |
| Canonical request URL | `https://donestate.proofandstate.com/webhooks/github-marketplace` |
| Live result | HTTP 200 in 0.29 seconds |
| DoneState evidence PR | `AyobamiH/donestate#43` |

The delivery was signed by GitHub and processed only after HMAC-SHA256 verification. The `ping` response creates no Marketplace entitlement, selects no repository, starts no work, and grants no execution authority. No secret value is recorded here.

## Remaining publication gates

- Complete the Marketplace contact record.
- Replace preview/operator legal templates with binding owner text.
- Complete the human final-review declaration and submit the draft for GitHub review.

The successful webhook delivery proves endpoint reachability and signature compatibility. It does not prove a purchase lifecycle event, GitHub review approval, listing publication, or any widening of the private maintenance App installation.

## Independent maintenance-canary boundary

The separate fresh maintenance run `b4242932-0bc1-4876-a202-634d9c12d72a` remains `AWAITING_VERIFICATION` with a trusted OpsTruth `uncertain` decision. A retry from the current ChatGPT connection was rejected with `BLOCKED_AUTHORITY` because that connection is the read-only OpenAI reviewer identity. The already verified historical canary was not rechecked.
