/**
 * Per-run rollup over review rows. Pure — no I/O.
 *
 * `corrected` (we were wrong) is kept separate from `defects` (the source was
 * wrong) on purpose: merging them into one "% touched" would destroy the most
 * useful thing the table measures. See tests/reviews-summary.test.ts.
 */
import { CORRECTIVE_VERDICTS, type ReviewVerdict } from "./types";

export type RunSummary = {
  runLabel: string;
  reviewed: number;
  /** Re-derivation agreed with the bank. */
  confirmed: number;
  /** OUR data was wrong and was changed. */
  corrected: number;
  /** The SOURCE was wrong; our answer stood and the defect was flagged. */
  defects: number;
  unverifiable: number;
  /** corrected / reviewed, one decimal place. */
  pctCorrected: number;
};

export function summarizeRuns(
  rows: readonly { run_label: string; verdict: string }[]
): RunSummary[] {
  const byRun = new Map<string, RunSummary>();

  for (const row of rows) {
    let summary = byRun.get(row.run_label);
    if (!summary) {
      summary = {
        runLabel: row.run_label,
        reviewed: 0,
        confirmed: 0,
        corrected: 0,
        defects: 0,
        unverifiable: 0,
        pctCorrected: 0,
      };
      byRun.set(row.run_label, summary);
    }
    summary.reviewed += 1;
    if (row.verdict === "confirmed") summary.confirmed += 1;
    else if (CORRECTIVE_VERDICTS.has(row.verdict as ReviewVerdict)) summary.corrected += 1;
    else if (row.verdict === "defect_preserved") summary.defects += 1;
    else if (row.verdict === "unverifiable") summary.unverifiable += 1;
  }

  const summaries = [...byRun.values()];
  for (const summary of summaries) {
    summary.pctCorrected =
      summary.reviewed === 0
        ? 0
        : Math.round((1000 * summary.corrected) / summary.reviewed) / 10;
  }

  return summaries.sort(
    (a, b) => b.pctCorrected - a.pctCorrected || a.runLabel.localeCompare(b.runLabel)
  );
}
