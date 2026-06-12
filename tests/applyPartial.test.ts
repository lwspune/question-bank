import { describe, it, expect } from "vitest";
import { applyPartial } from "@/lib/questions/applyPartial";
import { EMPTY_FILTERS, type Filters } from "@/lib/questions/filters";

const SEEDED: Filters = {
  examId: "exam-mht",
  subjectId: "subj-maths",
  chapterIds: ["ch-1", "ch-2"],
  subtopicIds: ["st-1"],
  difficulties: ["EASY", "MODERATE"],
  pyqYears: [2024, 2023],
  extraIds: [],
  principleSlug: null,
  kind: "pyq",
  q: "vectors",
  page: 4,
};

describe("applyPartial", () => {
  it("resets subject, chapters, subtopics when examId changes", () => {
    const next = applyPartial(SEEDED, { examId: "exam-nda" });
    expect(next.examId).toBe("exam-nda");
    expect(next.subjectId).toBeNull();
    expect(next.chapterIds).toEqual([]);
    expect(next.subtopicIds).toEqual([]);
    // non-cascading fields preserved
    expect(next.difficulties).toEqual(["EASY", "MODERATE"]);
    expect(next.pyqYears).toEqual([2024, 2023]);
    expect(next.q).toBe("vectors");
  });

  it("does NOT cascade when examId is set to the same value", () => {
    const next = applyPartial(SEEDED, { examId: "exam-mht" });
    expect(next.subjectId).toBe("subj-maths");
    expect(next.chapterIds).toEqual(["ch-1", "ch-2"]);
    expect(next.subtopicIds).toEqual(["st-1"]);
  });

  it("resets chapters + subtopics when subjectId changes", () => {
    const next = applyPartial(SEEDED, { subjectId: "subj-physics" });
    expect(next.subjectId).toBe("subj-physics");
    expect(next.chapterIds).toEqual([]);
    expect(next.subtopicIds).toEqual([]);
    // examId untouched, difficulties/pyqYears/q preserved
    expect(next.examId).toBe("exam-mht");
    expect(next.difficulties).toEqual(["EASY", "MODERATE"]);
  });

  it("resets subtopics when chapterIds changes", () => {
    const next = applyPartial(SEEDED, { chapterIds: ["ch-1"] });
    expect(next.chapterIds).toEqual(["ch-1"]);
    expect(next.subtopicIds).toEqual([]);
    // earlier cascade levels untouched
    expect(next.examId).toBe("exam-mht");
    expect(next.subjectId).toBe("subj-maths");
  });

  it("changing only difficulties / pyqYears / q does not reset hierarchy", () => {
    const next = applyPartial(SEEDED, {
      difficulties: ["HARD"],
      pyqYears: [2025],
      q: "circle",
    });
    expect(next.difficulties).toEqual(["HARD"]);
    expect(next.pyqYears).toEqual([2025]);
    expect(next.q).toBe("circle");
    expect(next.examId).toBe("exam-mht");
    expect(next.subjectId).toBe("subj-maths");
    expect(next.chapterIds).toEqual(["ch-1", "ch-2"]);
    expect(next.subtopicIds).toEqual(["st-1"]);
  });

  it("always resets page to 1, regardless of which field changed", () => {
    expect(applyPartial(SEEDED, { difficulties: ["HARD"] }).page).toBe(1);
    expect(applyPartial(SEEDED, { examId: "exam-nda" }).page).toBe(1);
    expect(applyPartial(SEEDED, { q: "vectors" }).page).toBe(1);
    // even an empty partial resets page (caller intent: "I changed something
    // related to filtering, send me to page 1")
    expect(applyPartial(SEEDED, {}).page).toBe(1);
  });

  it("compound partial: examId + difficulties — examId cascades, difficulties applied", () => {
    const next = applyPartial(SEEDED, {
      examId: "exam-nda",
      difficulties: ["HARD"],
    });
    expect(next.examId).toBe("exam-nda");
    expect(next.subjectId).toBeNull();
    expect(next.chapterIds).toEqual([]);
    expect(next.subtopicIds).toEqual([]);
    expect(next.difficulties).toEqual(["HARD"]);
  });

  it("does not mutate the input filters", () => {
    const snapshot = JSON.parse(JSON.stringify(SEEDED));
    applyPartial(SEEDED, { examId: "exam-nda" });
    expect(SEEDED).toEqual(snapshot);
  });

  it("clearing examId to null cascades like changing it", () => {
    const next = applyPartial(SEEDED, { examId: null });
    expect(next.examId).toBeNull();
    expect(next.subjectId).toBeNull();
    expect(next.chapterIds).toEqual([]);
    expect(next.subtopicIds).toEqual([]);
  });

  it("can be used to build EMPTY_FILTERS from a seeded state via field-by-field clear", () => {
    const cleared = applyPartial(SEEDED, {
      examId: null,
      difficulties: [],
      pyqYears: [],
      q: "",
    });
    expect(cleared).toEqual({ ...EMPTY_FILTERS, page: 1 });
  });
});
