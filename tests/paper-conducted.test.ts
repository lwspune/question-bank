/**
 * Exposure in the paper builder: has this question already been CONDUCTED for a
 * cohort, and was it THIS paper's cohort?
 *
 * The sibling of papers/usage.ts, and deliberately a separate fact. `usage.ts`
 * answers "is this question in another VAULT paper" — a question that may never
 * have been sat. This answers "did students actually sit it", which the vault
 * only learned when the nda-tracker export landed. A teacher needs both and
 * they are not interchangeable.
 */
import { describe, it, expect } from "vitest";
import {
  summarizeConducted,
  formatConductedLabel,
  type ConductedQueryRow,
} from "@/lib/papers/conducted";

const r = (over: Partial<ConductedQueryRow> = {}): ConductedQueryRow => ({
  question_id: "q1",
  source_ref: "exam_1",
  cohort_label: "APJ_NDA_12th_(26-27)",
  measured_at: "2026-09-07T00:00:00Z",
  ...over,
});

describe("summarizeConducted", () => {
  it("groups by question and splits the comma-separated cohort list", () => {
    const out = summarizeConducted([
      r({ cohort_label: "APJ_NDA_12th_(26-27), APJ_NDA_6M_(Sep26)" }),
    ]);
    expect(out.get("q1")).toHaveLength(1);
    expect(out.get("q1")![0].cohorts).toEqual([
      "APJ_NDA_12th_(26-27)",
      "APJ_NDA_6M_(Sep26)",
    ]);
  });

  it("sorts sittings most-recent first", () => {
    const out = summarizeConducted([
      r({ source_ref: "old", measured_at: "2026-01-01T00:00:00Z" }),
      r({ source_ref: "new", measured_at: "2026-09-07T00:00:00Z" }),
    ]);
    expect(out.get("q1")!.map((s) => s.sittingId)).toEqual(["new", "old"]);
  });

  it("dedupes a sitting so a count can never be inflated", () => {
    const out = summarizeConducted([r(), r()]);
    expect(out.get("q1")).toHaveLength(1);
  });

  it("drops a sitting that names no cohort — an online mock has none", () => {
    // Not the same as "nobody sat it": we simply do not record who.
    const out = summarizeConducted([r({ cohort_label: null }), r({ cohort_label: "  " })]);
    expect(out.size).toBe(0);
  });
});

describe("formatConductedLabel", () => {
  const sat = (cohorts: string[], id = "e1") => ({
    sittingId: id,
    cohorts,
    date: "2026-09-07T00:00:00Z",
  });

  it("is empty when nothing was conducted", () => {
    expect(formatConductedLabel([], { batchName: null })).toBe("");
  });

  it("names the cohorts when the paper targets no batch", () => {
    expect(formatConductedLabel([sat(["Batch A"])], { batchName: null })).toContain("Batch A");
  });

  it("warns hard when THIS paper's batch has already sat it", () => {
    const label = formatConductedLabel([sat(["Batch A", "Batch B"])], { batchName: "Batch B" });
    expect(label).toContain("this batch");
  });

  it("stays informational when a DIFFERENT batch sat it", () => {
    // A question may legitimately recur across cohorts — that is the same rule
    // the cross-paper warning follows.
    const label = formatConductedLabel([sat(["Batch A"])], { batchName: "Batch B" });
    expect(label).not.toContain("this batch");
    expect(label).toContain("Batch A");
  });

  it("counts the extra sittings rather than listing them all", () => {
    const label = formatConductedLabel(
      [sat(["Batch A"], "e1"), sat(["Batch B"], "e2"), sat(["Batch C"], "e3")],
      { batchName: null }
    );
    expect(label).toContain("+2");
  });

  it("matches the batch in ANY sitting, not just the most recent", () => {
    const label = formatConductedLabel(
      [sat(["Batch A"], "new"), sat(["Batch B"], "old")],
      { batchName: "Batch B" }
    );
    expect(label).toContain("this batch");
  });
});
