import { describe, it, expect } from "vitest";
import { EXAM_CHIP_OPTIONS } from "@/lib/profile/examChoices";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

/**
 * The exam chips on /welcome and /account. Grouping here is PRESENTATION ONLY:
 * the stored values are still exam slugs written to
 * `student_profiles.target_exams`, so no existing profile row changes meaning.
 */
describe("EXAM_CHIP_OPTIONS", () => {
  // The load-bearing assertion. This is a multi-select whose values are
  // persisted; if grouping ever dropped or rewrote one, a student's saved
  // target exam would silently stop matching.
  //
  // Scoped to exams that HAVE content since 2026-09-24: an exam flagged
  // `noPublicContent` is withheld on purpose, because picking it would set a
  // target that resolves to nothing. The invariant that matters is unchanged —
  // grouping still never drops or rewrites a slug it was given. The guard's own
  // spec, including that it is the filter and not grouping doing the dropping,
  // is tests/exam-chips-guard.test.ts.
  it("carries every registry slug with content exactly once, unchanged", () => {
    expect(EXAM_CHIP_OPTIONS.map((o) => o.value).sort()).toEqual(
      EXAM_REGISTRY.filter((e) => !e.noPublicContent).map((e) => e.slug).sort()
    );
  });

  it("leaves non-board exams ungrouped, labelled by displayName", () => {
    const nda = EXAM_CHIP_OPTIONS.find((o) => o.value === "nda");
    expect(nda).toEqual({ value: "nda", label: "NDA" });
  });

  it("groups the board exams under their board, labelled by class", () => {
    expect(EXAM_CHIP_OPTIONS.find((o) => o.value === "cbse-11")).toEqual({
      value: "cbse-11",
      label: "Class 11",
      group: "CBSE",
    });
    expect(EXAM_CHIP_OPTIONS.find((o) => o.value === "mh-ssc-10")).toEqual({
      value: "mh-ssc-10",
      label: "Class 10 (SSC)",
      group: "Maharashtra State Board",
    });
  });

  it("orders each board's chips numerically by class", () => {
    const mh = EXAM_CHIP_OPTIONS.filter(
      (o) => o.group === "Maharashtra State Board"
    );
    expect(mh.map((o) => o.value)).toEqual([
      "mh-sb-9",
      "mh-ssc-10",
      "mh-sb-11",
      "mh-hsc-12",
    ]);
  });

  it("puts every ungrouped chip before the grouped ones", () => {
    // The chips render as an unlabelled first row followed by labelled board
    // rows; interleaving would split the entrance exams across two blocks.
    const firstGrouped = EXAM_CHIP_OPTIONS.findIndex((o) => o.group);
    const lastUngrouped = EXAM_CHIP_OPTIONS.map((o) => !o.group).lastIndexOf(true);
    expect(lastUngrouped).toBeLessThan(firstGrouped);
  });
});

import { examChipsForTier } from "@/lib/profile/examChoices";

// EXAM_TIER_SPEC.md §3.4 — the chips narrow to the student's tier, the rest sit
// behind "Show all exams". Run on the REAL registry: the family-degradation
// rule is about the real boards.
describe("examChipsForTier", () => {
  it("puts everything in shown when the tier is unknown", () => {
    const { shown, hidden } = examChipsForTier(null, [], EXAM_REGISTRY);
    expect(hidden).toEqual([]);
    expect(shown).toEqual(EXAM_CHIP_OPTIONS);
  });

  it("keeps a selected out-of-tier exam visible", () => {
    const { shown, hidden } = examChipsForTier("school", ["nda"], EXAM_REGISTRY);
    expect(shown.map((o) => o.value)).toContain("nda");
    expect(hidden.map((o) => o.value)).not.toContain("nda");
  });

  it("splits every public exam across shown and hidden exactly once", () => {
    const { shown, hidden } = examChipsForTier("senior", ["cds"], EXAM_REGISTRY);
    const all = [...shown, ...hidden].map((o) => o.value);
    expect(new Set(all).size).toBe(all.length);
    expect(all.sort()).toEqual(EXAM_CHIP_OPTIONS.map((o) => o.value).sort());
  });

  it("degrades a board left with one class in the tier to a flat chip", () => {
    // Filter BEFORE grouping: CBSE has only Class 10 in the school tier.
    const { shown } = examChipsForTier("school", [], EXAM_REGISTRY);
    expect(shown.find((o) => o.value === "cbse-10")).toEqual({
      value: "cbse-10",
      label: "CBSE Class 10",
    });
    // Maharashtra keeps two classes (9 and 10) in school, so it stays a group.
    expect(shown.find((o) => o.value === "mh-sb-9")?.group).toBe(
      "Maharashtra State Board"
    );
  });

  it("groups CBSE 11 + 12 in the senior tier", () => {
    const { shown } = examChipsForTier("senior", [], EXAM_REGISTRY);
    expect(shown.filter((o) => o.group === "CBSE").map((o) => o.value)).toEqual([
      "cbse-11",
      "cbse-12",
    ]);
  });
});
