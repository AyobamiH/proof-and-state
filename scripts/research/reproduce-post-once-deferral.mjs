import {createHash} from "node:crypto";
import {simulateCollection,simulateRetryAfterLockRelease} from "./post-once-lock-deferral.mjs";
const first=simulateCollection({busyIds:["vault-05","vault-06"]});
const next=simulateRetryAfterLockRelease(first);
const expected={totalEnabled:18,completed:5,actualRunnerBusyRefusals:2,unattemptedByTwoStrikePolicy:11,reportedLockDeferrals:13,attemptedVaults:7};
const valid=Object.entries(expected).every(([k,v])=>first[k]===v) && next.completed===18 && next.reportedLockDeferrals===0 && next.realProviderCalls===0;
const report={schemaVersion:1,result:valid?"PASS":"FAIL",type:"synthetic-lock-policy-mechanism-reproduction",baseline:"Post-Once PR #380 (28 October), not the private production record",historicalObserved:{"vaults_enabled":18,"actual_busy":2,"skipped_by_policy":11,"reported_lock_deferrals":13},modelFirstCycle:{...expected},modelNextCycle:{completed:next.completed,lockDeferrals:next.reportedLockDeferrals},externalEffectAttempted:false,productionAcceptanceVerified:false,limits:["Pure synthetic model; not a copy of private Post-Once code","Does not re-check October owner/observer ledger receipts","Second cycle demonstrates possible progress, not provider publication","No shared runtime or novel evidence protocol is implemented"]};
process.stdout.write(JSON.stringify(report,null,2)+"\n");
if(!valid)process.exitCode=1;
