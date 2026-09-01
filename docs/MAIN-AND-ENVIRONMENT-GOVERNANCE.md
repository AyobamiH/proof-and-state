# Main and environment governance proposal

Proof & State `main` and `gtm-production` are provider-observed unprotected. The files under `governance/` are disabled proposals for owner review. They do not change GitHub settings, authorize a deployment, or prove that a control is active.

## Required checks

The proposed `main` ruleset requires exactly these GitHub Actions contexts:

| Context | Purpose | Always emitted | Consequence |
|---|---|---|---|
| `portfolio-state` | Validate the canonical ledger, generated state, and governance impact | Every pull request and push to `main` | Read-only validation |
| `contract-tests` | Run the GTM orchestrator contract and safety suite | Every pull request and push to `main` | Read-only validation |

Both contexts are pinned to GitHub Actions integration ID `15368`. The workflows have no changed-path filters, so a documentation-only pull request still receives both contexts. Action dependencies are pinned to reviewed commit SHAs.

`deploy-cloudflare-canary` is not a required check. Deployment is a separate consequence. It now runs only for a manual workflow dispatch from `refs/heads/main`, after `contract-tests`, and through `gtm-production`. Pull requests and ordinary pushes cannot satisfy its condition. `PUBLISHING_ENABLED=false` remains mandatory.

GitHub commit-message skip directives would prevent required workflows from starting. They are prohibited for governed changes. Before activation, the owner must use a test pull request to verify both exact check contexts and verify that any skip attempt blocks merge rather than bypassing validation.

## Proposed branch control

The disabled ruleset proposes:

- pull requests for `refs/heads/main`;
- one real human approval from a code owner;
- dismissal of stale approvals and approval after the last push;
- resolved review threads;
- strict exact required checks;
- blocked deletion and non-fast-forward updates;
- one explicit owner emergency path.

The current CODEOWNERS file names only `@AyobamiH`. No second reviewer is invented. Activation remains blocked until a second trusted human accepts the role and is added through a separately reviewed change. Automated review and green CI are not human approval.

Emergency recovery remains owner-only. The owner may bypass only to contain an active incident when the normal PR path cannot safely recover. Every use requires a tracked incident, exact commit, reason, effects, rollback or follow-up PR, provider read-back, and post-event review. Convenience, schedule pressure, or a failing check is not an emergency.

## Proposed environment control

Authenticated provider inspection found exactly three secret names in `gtm-production`: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, and `ORCHESTRATOR_ADMIN_TOKEN`. It also found no required reviewers, no wait timer, administrator bypass enabled, and unrestricted deployment refs. Secret values were neither read nor recorded.

The disabled environment proposal requires:

- one named human reviewer who is not the deployment initiator;
- no administrator bypass;
- protected branches only;
- the same three secret names and no additional production secret;
- a manual main-branch dispatch after an exact reviewed merge.

The named reviewer field remains null until the owner supplies a real person. Do not apply a partial configuration that relaxes one control while another prerequisite is missing.

## Activation and verification

Activation is an owner action and follows this order:

1. Name and confirm the second trusted human reviewer.
2. Obtain that review on the exact final PR stack and record every changed head.
3. Verify `portfolio-state` and `contract-tests` on an unrelated documentation-only test PR.
4. Apply the main ruleset with enforcement enabled, then read it back from GitHub.
5. Apply `gtm-production` reviewer, bypass, and branch restrictions, then read them back from GitHub.
6. Merge an approved exact head and record exact post-merge checks.
7. Manually authorize one publishing-disabled dispatch from exact `main`.
8. Require Cloudflare control-plane identity, one 100-percent active version, exact commit bindings, `PUBLISHING_ENABLED=false`, and independent health read-back.
9. Exercise the documented rollback before making a release-readiness claim.

Until all steps pass, branch protection, environment protection, exact-main deployment, rollback, and release readiness remain `UNPROVEN`.
