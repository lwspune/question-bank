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

import { examChipsForStage } from "@/lib/profile/examChoices";

/**
 * /welcome and /account (2026-10-05). The class question already says the
 * student's class, so the board chips stop asking it again ("Class 11 ·
 * Class 12" under each board): for Class 11/12 they show the BOARD only, in a
 * "Board exam" row. Entrance exams come first (IPMAT and MPSC rows included;
 * IPMAT used to sit below the boards), boards next, and worksheet banks
 * (registry `course`) in their own "Practice courses" list, not posing as exams.
 */
describe("examChipsForStage", () => {
  const values = (cs: { value: string }[]) => cs.map((c) => c.value);
  const groups = (cs: { group?: string }[]) => [...new Set(cs.map((c) => c.group ?? ""))];

  it("Class 12: that class's boards only, named by board, in a Board exam row", () => {
    const { shown } = examChipsForStage("class-12", [], EXAM_REGISTRY);
    const boards = shown.filter((c) => c.group === "Board exam");
    expect(values(boards).sort()).toEqual(["cbse-12", "mh-hsc-12"]);
    expect(boards.every((c) => !/Class \d/.test(c.label))).toBe(true);
    expect(values(shown)).not.toContain("cbse-11");
    expect(values(shown)).not.toContain("mh-sb-11");
  });

  it("Class 11: the Class 11 boards", () => {
    const { shown } = examChipsForStage("class-11", [], EXAM_REGISTRY);
    expect(values(shown.filter((c) => c.group === "Board exam")).sort()).toEqual(["cbse-11", "mh-sb-11"]);
  });

  it("repeating a year: no board chips, the entrance exams stay", () => {
    const { shown } = examChipsForStage("dropper", [], EXAM_REGISTRY);
    expect(shown.some((c) => c.group === "Board exam")).toBe(false);
    expect(values(shown)).toEqual(expect.arrayContaining(["nda", "jee-mains", "mht-cet", "neet"]));
  });

  it("Class 9-10 keeps the class on board chips (9 and 10 share one answer)", () => {
    const { shown } = examChipsForStage("class-9-10", [], EXAM_REGISTRY);
    const boardish = shown.filter((c) => /Class (9|10)/.test(c.label));
    expect(boardish.length).toBeGreaterThan(0);
  });

  it("entrance exams (IPMAT included) come before boards", () => {
    const { shown } = examChipsForStage("class-12", [], EXAM_REGISTRY);
    const order = groups(shown);
    const boardAt = order.indexOf("Board exam");
    const ipmatAt = order.findIndex((g) => g.startsWith("IPMAT"));
    expect(boardAt).toBeGreaterThan(-1);
    expect(ipmatAt).toBeGreaterThan(-1);
    expect(ipmatAt).toBeLessThan(boardAt);
  });

  it("worksheet banks are courses, never exam chips", () => {
    const r = examChipsForStage("class-12", [], EXAM_REGISTRY);
    expect(values(r.shown)).not.toContain("worksheets-11-12");
    expect(values(r.hidden)).not.toContain("worksheets-11-12");
    expect(values(r.courses)).toContain("worksheets-11-12");
    const school = examChipsForStage("class-9-10", [], EXAM_REGISTRY);
    expect(values(school.courses)).toContain("foundation-course");
  });

  it("every slug is offered exactly once across shown, hidden and courses", () => {
    for (const stage of [null, "class-9-10", "class-11", "class-12", "dropper", "college"] as const) {
      const r = examChipsForStage(stage, [], EXAM_REGISTRY);
      const all = [...values(r.shown), ...values(r.hidden), ...values(r.courses)].sort();
      expect(all).toEqual(EXAM_REGISTRY.filter((e) => !e.noPublicContent).map((e) => e.slug).sort());
    }
  });

  it("a pick outside the class stays visible", () => {
    const { shown, courses } = examChipsForStage("class-11", ["cbse-12", "foundation-course"], EXAM_REGISTRY);
    expect(values(shown)).toContain("cbse-12");
    expect(values(courses)).toContain("foundation-course");
  });
});
