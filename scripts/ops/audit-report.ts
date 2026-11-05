/**
 * `npm audit --json | tsx scripts/ops/audit-report.ts`: the weekly audit summary (markdown) and a
 * `::warning::` when a high or critical advisory is open. Never exits non-zero: a report only.
 * Used by .github/workflows/prod-contract.yml on Mondays. Core: auditReportCore.ts.
 */
import { auditReport, type AuditJson } from "./auditReportCore";

let raw = "";
process.stdin.on("data", (d) => (raw += d));
process.stdin.on("end", () => {
  try {
    const { markdown, hasHighOrCritical } = auditReport(JSON.parse(raw) as AuditJson);
    console.log(markdown);
    if (hasHighOrCritical) console.error("::warning title=npm audit::high or critical advisories are open (see the job summary)");
  } catch (e) {
    console.log(`npm audit report unavailable: ${e instanceof Error ? e.message : e}`);
  }
});
