/**
 * Pure core of the weekly `npm audit` report (TECH_DEBT_SPEC.md Phase 5). Spec: tests/npm-audit-report.test.ts.
 */
type Severity = "info" | "low" | "moderate" | "high" | "critical";
type Fix = boolean | { name: string; version: string; isSemVerMajor?: boolean };
export type AuditJson = {
  metadata: { vulnerabilities: Record<Severity | "total", number> };
  vulnerabilities: Record<string, { severity: Severity; fixAvailable: Fix }>;
};

export function auditReport(a: AuditJson): { markdown: string; hasHighOrCritical: boolean } {
  const v = a.metadata.vulnerabilities;
  const serious = Object.entries(a.vulnerabilities)
    .filter(([, x]) => x.severity === "high" || x.severity === "critical")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, x]) => {
      const fix =
        x.fixAvailable === true
          ? "`npm audit fix`"
          : x.fixAvailable
            ? `${x.fixAvailable.name}@${x.fixAvailable.version}${x.fixAvailable.isSemVerMajor ? " (major)" : ""}`
            : "no fix yet";
      return `- **${name}** (${x.severity}): ${fix}`;
    });
  const markdown = [
    "### Weekly npm audit",
    "",
    "| critical | high | moderate | low | total |",
    "|---|---|---|---|---|",
    `| ${v.critical} | ${v.high} | ${v.moderate} | ${v.low} | ${v.total} |`,
    "",
    serious.length ? serious.join("\n") : "No high or critical advisories.",
    "",
  ].join("\n");
  return { markdown, hasHighOrCritical: serious.length > 0 };
}
