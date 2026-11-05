/**
 * `tsx scripts/deploy/build-report.ts <build.log>`: print the build report (markdown) and one
 * GitHub `::warning::` per threshold passed. Never exits non-zero: a report, not a gate.
 * Used by .github/workflows/deploy.yml. Core: buildReportCore.ts.
 */
import fs from "node:fs";
import { buildReport, parseBuildLog } from "./buildReportCore";

try {
  const { markdown, warnings } = buildReport(parseBuildLog(fs.readFileSync(process.argv[2], "utf8")));
  console.log(markdown);
  for (const w of warnings) console.error(`::warning title=Build budget::${w}`);
} catch (e) {
  console.log(`Build report unavailable: ${e instanceof Error ? e.message : e}`);
}
