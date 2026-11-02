// Public, stdlib-only behavioural model of the historic Post-Once two-busy-strike policy.
// NOT the private Post-Once implementation or a reproduction of its production provider state.
const VAULT_ID = /^vault-[0-9]{2}$/;
export function simulateCollection({
  vaults = Array.from({length:18}, (_,i)=>"vault-"+String(i).padStart(2,"0")),
  busyIds = [],
  budgetStopBefore = null
} = {}) {
  if (!Array.isArray(vaults) || vaults.length===0 || new Set(vaults).size!==vaults.length ||
      !vaults.every(v=>typeof v==="string"&&VAULT_ID.test(v))) {
    throw new TypeError("invalid_or_duplicate_vault_ids");
  }
  if (!Array.isArray(busyIds) || busyIds.some(v=>!vaults.includes(v)) || new Set(busyIds).size!==busyIds.length) {
    throw new TypeError("invalid_or_duplicate_busy_ids");
  }
  if (budgetStopBefore!==null && (!Number.isInteger(budgetStopBefore)||budgetStopBefore<0||budgetStopBefore>vaults.length)) {
    throw new TypeError("invalid_budget_boundary");
  }
  const rows = [];
  const busy = new Set(busyIds);
  let consecutiveBusy=0;
  for (let i=0;i<vaults.length;i++) {
    const vaultId=vaults[i];
    if (budgetStopBefore!==null && i>=budgetStopBefore) {
      rows.push({vaultId,attempted:false,state:"deferred_budget",reason:"collection_window_exhausted"});
      continue;
    }
    if (consecutiveBusy>=2) {
      rows.push({vaultId,attempted:false,state:"deferred_policy",reason:"publisher_state_lock_backoff"});
      continue;
    }
    if (busy.has(vaultId)) {
      consecutiveBusy++;
      rows.push({vaultId,attempted:true,state:"busy",reason:"publisher_state_lock_busy"});
    } else {
      consecutiveBusy=0;
      rows.push({vaultId,attempted:true,state:"completed",reason:null});
    }
  }
  const count=s=>rows.filter(r=>r.state===s).length;
  const report={
    schemaVersion:1,
    subject:"Synthetic owner-published fixture of the 2026-10-28 Post-Once collector deferral mechanism",
    realProviderCalls:0,
    actualPublicationEffects:0,
    totalEnabled:vaults.length,
    completed:count("completed"),
    actualRunnerBusyRefusals:count("busy"),
    unattemptedByTwoStrikePolicy:count("deferred_policy"),
    unattemptedByBudget:count("deferred_budget"),
    reportedLockDeferrals:count("busy")+count("deferred_policy"),
    attemptedVaults:rows.filter(r=>r.attempted).length,
    pendingVaultIds:rows.filter(r=>r.state!=="completed").map(r=>r.vaultId),
    rows
  };
  if(report.completed+report.reportedLockDeferrals+report.unattemptedByBudget!==report.totalEnabled)throw Error("classification_integrity_failure");
  return report;
}
export function simulateRetryAfterLockRelease(firstReport) {
  if (!firstReport || firstReport.schemaVersion!==1 || !Array.isArray(firstReport.rows) ||
      firstReport.rows.length!==firstReport.totalEnabled || new Set(firstReport.rows.map(r=>r.vaultId)).size!==firstReport.totalEnabled) {
    throw new TypeError("invalid_prior_collection_observation");
  }
  // A successful subsequent natural collection of all selected vaults, not an external-provider publish retry.
  return simulateCollection({vaults:firstReport.rows.map(r=>r.vaultId),busyIds:[]});
}
