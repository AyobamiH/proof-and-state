# AgentProof

## Purpose

AgentProof is the downstream evidence and receipt layer for actions that happen after a reviewable change exists: merge, deployment, package publication, release, and other externally observable consequences.

## Boundary

AgentProof may verify receipt integrity, signer trust, subject identity, and fresh outcome evidence. It must not:

- execute or repeat the underlying action merely because a receipt exists;
- infer deployment, release, or reachability from a commit or signature alone;
- collapse DoneState execution records and OpsTruth observation into one self-attested claim.

## Minimum indexed fields

- subject repository, ref, and exact commit;
- pull-request number and merge commit when applicable;
- workflow, job, deployment, package, or release identifier;
- observation time and evidence source;
- receipt or report digest;
- signer identity and trust decision;
- explicit outcome and uncertainty.

## Sequencing

DoneState owner-side PR-only maintenance and OpsTruth verification are the first completed integration. AgentProof merge, deploy, and release receipts are the next independent evidence layer; fleet automation remains later.
