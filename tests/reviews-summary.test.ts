/**
 * Unit spec for the per-run review rollup (pure).
 *
 * The rollup deliberately splits "not confirmed" into three, because collapsing
 * them would erase the single most useful signal this table produces:
 *
 *   corrected     — WE were wrong (key_fixed / stem_fixed / solution_rewritten)
 *   defects       — THE SOURCE was wrong, our answer stood (defect_preserved)
 *   unverifiable  — nobody could tell
 *
 * The Decisions log states in prose that the Balbharati key is wrong ~4x as
 * often as our authored answers. `corrected` vs `defects` is that claim as data.
 * A single "% touched" number would merge the two and say nothing.
 *
 * The four buckets partition the verdict set exactly, which is asserted below so
 * a future verdict cannot be added without being counted somewhere.
 */
import { describe, it, expect } from "vitest";
import { summarizeRuns } from "@/lib/reviews/summary";
import { REVIEW_VERDICTS } from "@/lib/reviews/types";

const row = (run: string, verdict: string) => ({ run_label: run, verdict });

describe("summarizeRuns", () => {
  it("counts a single run into the four buckets", () => {
    const [summary] = summarizeRuns([
      row("run-a", "confirmed"),
      row("run-a", "confirmed"),
      row("run-a", "key_fixed"),
      row("run-a", "defect_preserved"),
      row("run-a", "unverifiable"),
    ]);
    expect(summary).toEqual({
      runLabel: "run-a",
      reviewed: 5,
      confirmed: 2,
      corrected: 1,
      defects: 1,
      unverifiable: 1,
      pctCorrected: 20,
    });
  });

  it("groups all three corrective verdicts together", () => {
    const [summary] = summarizeRuns([
      row("run-a", "key_fixed"),
      row("run-a", "stem_fixed"),
      row("run-a", "solution_rewritten"),
    ]);
    expect(summary.corrected).toBe(3);
    expect(summary.pctCorrected).toBe(100);
  });

  it("reports a clean run as 0% corrected rather than omitting it", () => {
    // A run that found nothing is a real, meaningful outcome — the NCERT
    // cross-check found 0 of our errors across ~256 questions. It must appear.
    const [summary] = summarizeRuns([row("clean", "confirmed"), row("clean", "confirmed")]);
    expect(summary).toMatchObject({ reviewed: 2, confirmed: 2, pctCorrected: 0 });
  });

  it("separates our errors from source defects", () => {
    const [summary] = summarizeRuns([
      ...Array.from({ length: 28 }, () => row("indef-int", "defect_preserved")),
      ...Array.from({ length: 220 }, () => row("indef-int", "confirmed")),
    ]);
    expect(summary.defects).toBe(28);
    expect(summary.corrected).toBe(0);
    expect(summary.pctCorrected).toBe(0);
  });

  it("splits multiple runs and sorts by pctCorrected descending", () => {
    const summaries = summarizeRuns([
      row("clean-run", "confirmed"),
      row("clean-run", "confirmed"),
      row("dirty-run", "key_fixed"),
      row("dirty-run", "confirmed"),
    ]);
    expect(summaries.map((s) => s.runLabel)).toEqual(["dirty-run", "clean-run"]);
    expect(summaries[0].pctCorrected).toBe(50);
  });

  it("rounds pctCorrected to one decimal place", () => {
    const [summary] = summarizeRuns([
      row("r", "key_fixed"),
      ...Array.from({ length: 2 }, () => row("r", "confirmed")),
    ]);
    expect(summary.pctCorrected).toBe(33.3);
  });

  it("returns an empty list for no rows", () => {
    expect(summarizeRuns([])).toEqual([]);
  });

  it("assigns every known verdict to exactly one bucket", () => {
    const [summary] = summarizeRuns(REVIEW_VERDICTS.map((v) => row("all", v)));
    expect(summary.confirmed + summary.corrected + summary.defects + summary.unverifiable).toBe(
      REVIEW_VERDICTS.length
    );
    expect(summary.reviewed).toBe(REVIEW_VERDICTS.length);
  });
});
