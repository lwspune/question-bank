/**
 * The weekly `npm audit` report (TECH_DEBT_SPEC.md Phase 5): a summary, never a failure.
 *
 * WHY: on 2026-11-05 the tree had 28 advisories (3 critical) and nothing reported them; the
 * tech-debt pass brought it to 11 with no high or critical. This keeps the count in front of
 * someone weekly so it does not drift back unseen.
 */
import { describe, it, expect } from "vitest";
import { auditReport, type AuditJson } from "../scripts/ops/auditReportCore";

const AUDIT: AuditJson = {
  metadata: { vulnerabilities: { info: 0, low: 3, moderate: 8, high: 1, critical: 0, total: 12 } },
  vulnerabilities: {
    "brace-expansion": { severity: "high", fixAvailable: true },
    minimatch: { severity: "moderate", fixAvailable: true },
    next: { severity: "high", fixAvailable: { name: "next", version: "16.5.0", isSemVerMajor: false } },
  },
};

describe("auditReport", () => {
  it("counts by severity and lists high and critical packages with their fix", () => {
    const r = auditReport(AUDIT);
    expect(r.markdown).toContain("| 0 | 1 | 8 | 3 | 12 |");
    expect(r.markdown).toContain("- **brace-expansion** (high): `npm audit fix`");
    expect(r.markdown).toContain("- **next** (high): next@16.5.0");
    expect(r.markdown).not.toContain("minimatch");
    expect(r.hasHighOrCritical).toBe(true);
  });

  it("reports a clean tree plainly", () => {
    const r = auditReport({ metadata: { vulnerabilities: { info: 0, low: 0, moderate: 0, high: 0, critical: 0, total: 0 } }, vulnerabilities: {} });
    expect(r.hasHighOrCritical).toBe(false);
    expect(r.markdown).toContain("No high or critical advisories.");
  });
});
