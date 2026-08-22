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
  it("carries every registry slug exactly once, unchanged", () => {
    expect(EXAM_CHIP_OPTIONS.map((o) => o.value).sort()).toEqual(
      EXAM_REGISTRY.map((e) => e.slug).sort()
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
