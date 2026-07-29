import { describe, it, expect } from "vitest";
import {
  orderChapterQuestions,
  CHAPTER_TARGETS,
  chapterDocBaseName,
  type OrderableQuestion,
} from "../scripts/mh-ssc-10/chapter-pyq";

const q = (over: Partial<OrderableQuestion> & { id: string }): OrderableQuestion => ({
  setId: null,
  pyqYear: 2020,
  questionNumber: "Q1",
  subtopic: { id: "st-a", name: "Alpha" },
  ...over,
});

const st = (name: string) => ({ id: `st-${name.toLowerCase()}`, name });
const names = (rows: OrderableQuestion[]) => rows.map((r) => r.id);
const labels = (rows: OrderableQuestion[]) => rows.map((r) => r.subtopic?.name ?? "Other");

describe("orderChapterQuestions — grouping", () => {
  it("keeps each subtopic's questions contiguous", () => {
    const out = orderChapterQuestions([
      q({ id: "a1", subtopic: st("Alpha") }),
      q({ id: "b1", subtopic: st("Beta") }),
      q({ id: "a2", subtopic: st("Alpha") }),
      q({ id: "b2", subtopic: st("Beta") }),
    ]);
    // Alpha run then Beta run (or vice versa) — never interleaved.
    expect(labels(out)).toEqual(["Alpha", "Alpha", "Beta", "Beta"]);
  });

  it("orders groups by size descending, then name ascending on a tie", () => {
    const out = orderChapterQuestions([
      q({ id: "z1", subtopic: st("Zeta") }),
      q({ id: "z2", subtopic: st("Zeta") }),
      q({ id: "b1", subtopic: st("Beta") }),
      q({ id: "b2", subtopic: st("Beta") }),
      q({ id: "m1", subtopic: st("Mu") }),
      q({ id: "m2", subtopic: st("Mu") }),
      q({ id: "m3", subtopic: st("Mu") }),
    ]);
    expect(labels(out)).toEqual(["Mu", "Mu", "Mu", "Beta", "Beta", "Zeta", "Zeta"]);
  });

  it("sorts newest PYQ year first inside a group, questionNumber breaking ties", () => {
    const out = orderChapterQuestions([
      q({ id: "old", pyqYear: 2016 }),
      q({ id: "new", pyqYear: 2026 }),
      q({ id: "mid-b", pyqYear: 2020, questionNumber: "Q4(B)" }),
      q({ id: "mid-a", pyqYear: 2020, questionNumber: "Q2(A)" }),
    ]);
    expect(names(out)).toEqual(["new", "mid-a", "mid-b", "old"]);
  });

  it("puts a null pyqYear last within its group", () => {
    const out = orderChapterQuestions([
      q({ id: "unknown", pyqYear: null }),
      q({ id: "dated", pyqYear: 2016 }),
    ]);
    expect(names(out)).toEqual(["dated", "unknown"]);
  });
});

describe("orderChapterQuestions — singleton folding", () => {
  it("folds a 1-question subtopic into a nulled 'Other' tail group", () => {
    const out = orderChapterQuestions([
      q({ id: "solo", subtopic: st("Rare") }),
      q({ id: "a1", subtopic: st("Alpha") }),
      q({ id: "a2", subtopic: st("Alpha") }),
    ]);
    expect(names(out)).toEqual(["a1", "a2", "solo"]);
    // Nulling the subtopic is what makes docxBuilder print its "Other" heading.
    expect(out[2].subtopic).toBeNull();
  });

  it("keeps the tail last even when it outgrows every named group", () => {
    const out = orderChapterQuestions([
      q({ id: "s1", subtopic: st("R1") }),
      q({ id: "s2", subtopic: st("R2") }),
      q({ id: "s3", subtopic: st("R3") }),
      q({ id: "a1", subtopic: st("Alpha") }),
      q({ id: "a2", subtopic: st("Alpha") }),
    ]);
    expect(labels(out)).toEqual(["Alpha", "Alpha", "Other", "Other", "Other"]);
  });

  it("honours minGroup=1 by folding nothing", () => {
    const out = orderChapterQuestions(
      [q({ id: "solo", subtopic: st("Rare") }), q({ id: "a1", subtopic: st("Alpha") })],
      { minGroup: 1 }
    );
    expect(out.every((r) => r.subtopic !== null)).toBe(true);
  });

  it("treats an already-null subtopic as part of the tail", () => {
    const out = orderChapterQuestions([
      q({ id: "none", subtopic: null }),
      q({ id: "a1", subtopic: st("Alpha") }),
      q({ id: "a2", subtopic: st("Alpha") }),
    ]);
    expect(names(out)).toEqual(["a1", "a2", "none"]);
  });

  it("does not mutate the input rows", () => {
    const solo = q({ id: "solo", subtopic: st("Rare") });
    orderChapterQuestions([solo, q({ id: "a1" }), q({ id: "a2" })]);
    expect(solo.subtopic).not.toBeNull();
  });
});

describe("orderChapterQuestions — set siblings", () => {
  it("keeps set siblings adjacent so the shared passage prints once", () => {
    const out = orderChapterQuestions([
      q({ id: "s-1", setId: "SET", pyqYear: 2026, questionNumber: "Q2(i)", subtopic: st("Alpha") }),
      q({ id: "loner", pyqYear: 2024, subtopic: st("Alpha") }),
      q({ id: "s-2", setId: "SET", pyqYear: 2026, questionNumber: "Q2(ii)", subtopic: st("Alpha") }),
    ]);
    const i1 = out.findIndex((r) => r.id === "s-1");
    const i2 = out.findIndex((r) => r.id === "s-2");
    expect(Math.abs(i1 - i2)).toBe(1);
  });

  it("assigns a cross-subtopic set to its modal subtopic, normalising every sibling", () => {
    const out = orderChapterQuestions(
      [
        q({ id: "s-1", setId: "SET", subtopic: st("Alpha"), questionNumber: "Q1(i)" }),
        q({ id: "s-2", setId: "SET", subtopic: st("Alpha"), questionNumber: "Q1(ii)" }),
        q({ id: "s-3", setId: "SET", subtopic: st("Beta"), questionNumber: "Q1(iii)" }),
      ],
      { minGroup: 1 }
    );
    expect(labels(out)).toEqual(["Alpha", "Alpha", "Alpha"]);
  });

  it("never splits a set when folding — a 1-question subtopic held by a set stays whole", () => {
    const out = orderChapterQuestions([
      q({ id: "s-1", setId: "SET", subtopic: st("Rare"), questionNumber: "Q1(i)" }),
      q({ id: "s-2", setId: "SET", subtopic: st("Rare"), questionNumber: "Q1(ii)" }),
      q({ id: "a1", subtopic: st("Alpha") }),
      q({ id: "a2", subtopic: st("Alpha") }),
    ]);
    const i1 = out.findIndex((r) => r.id === "s-1");
    const i2 = out.findIndex((r) => r.id === "s-2");
    expect(Math.abs(i1 - i2)).toBe(1);
    // A 2-question set is one unit but two questions, so "Rare" clears minGroup=2.
    expect(labels(out).filter((l) => l === "Rare")).toHaveLength(2);
  });

  it("orders a set by its newest member's year", () => {
    const out = orderChapterQuestions([
      q({ id: "solo", pyqYear: 2022 }),
      q({ id: "s-1", setId: "SET", pyqYear: 2016, questionNumber: "Q1(i)" }),
      q({ id: "s-2", setId: "SET", pyqYear: 2026, questionNumber: "Q1(ii)" }),
    ]);
    expect(names(out)).toEqual(["s-1", "s-2", "solo"]);
  });

  it("preserves printed sub-question order inside a set", () => {
    const out = orderChapterQuestions([
      q({ id: "s-3", setId: "SET", questionNumber: "Q1(iii)" }),
      q({ id: "s-1", setId: "SET", questionNumber: "Q1(i)" }),
      q({ id: "s-2", setId: "SET", questionNumber: "Q1(ii)" }),
    ]);
    expect(names(out)).toEqual(["s-1", "s-2", "s-3"]);
  });
});

describe("orderChapterQuestions — invariants", () => {
  it("returns every input question exactly once", () => {
    const input = [
      q({ id: "a", subtopic: st("Alpha") }),
      q({ id: "b", subtopic: st("Beta") }),
      q({ id: "c", setId: "S", subtopic: st("Beta") }),
      q({ id: "d", setId: "S", subtopic: st("Gamma") }),
      q({ id: "e", subtopic: null }),
    ];
    const out = orderChapterQuestions(input);
    expect(out).toHaveLength(input.length);
    expect(new Set(names(out))).toEqual(new Set(input.map((r) => r.id)));
  });

  it("is stable — the same input yields the same order", () => {
    const input = [
      q({ id: "a", subtopic: st("Alpha"), pyqYear: 2020, questionNumber: "Q1" }),
      q({ id: "b", subtopic: st("Beta"), pyqYear: 2020, questionNumber: "Q1" }),
      q({ id: "c", subtopic: st("Alpha"), pyqYear: 2020, questionNumber: "Q2" }),
      q({ id: "d", subtopic: st("Beta"), pyqYear: 2020, questionNumber: "Q2" }),
    ];
    expect(names(orderChapterQuestions(input))).toEqual(names(orderChapterQuestions(input)));
  });

  it("handles an empty chapter", () => {
    expect(orderChapterQuestions([])).toEqual([]);
  });
});

describe("CHAPTER_TARGETS registry", () => {
  it("covers the 56 current-syllabus chapter folders", () => {
    expect(CHAPTER_TARGETS).toHaveLength(56);
  });

  it("has a unique (subject, chapter) key and a unique output directory", () => {
    const keys = CHAPTER_TARGETS.map((t) => `${t.subject}|${t.chapter}`);
    expect(new Set(keys).size).toBe(CHAPTER_TARGETS.length);
    const dirs = CHAPTER_TARGETS.map((t) => t.dir);
    expect(new Set(dirs).size).toBe(CHAPTER_TARGETS.length);
  });

  it("carries the expected per-subject chapter counts", () => {
    const per = (s: string) => CHAPTER_TARGETS.filter((t) => t.subject === s).length;
    expect(per("Algebra")).toBe(6);
    expect(per("Geometry")).toBe(7);
    expect(per("Science and Technology I")).toBe(10);
    expect(per("Science and Technology II")).toBe(10);
    expect(per("Geography")).toBe(9);
    expect(per("History")).toBe(9);
    expect(per("Political Science")).toBe(5);
  });

  // History and Political Science are two separate BANK SUBJECTS that share one
  // parent folder on disk, because the board prints them as a single paper. The
  // dir prefix is what keeps their output directories distinct.
  it("routes History and Political Science into the shared paper folder", () => {
    const hist = CHAPTER_TARGETS.filter((t) => t.subject === "History");
    const pol = CHAPTER_TARGETS.filter((t) => t.subject === "Political Science");
    for (const t of hist) expect(t.dir.startsWith("History_and_Political_Science/History/")).toBe(true);
    for (const t of pol) expect(t.dir.startsWith("History_and_Political_Science/Political_Science/")).toBe(true);
    // Both number their chapters from 01, so only the prefix separates them.
    expect(hist[0].dir).not.toBe(pol[0].dir);
  });

  it("prefixes every directory with its zero-padded chapter number", () => {
    for (const t of CHAPTER_TARGETS) {
      const leaf = t.dir.split("/").pop()!;
      expect(leaf).toMatch(/^\d{2}_/);
    }
  });

  it("derives the doc base name from the folder leaf so it sits beside the Quiz pair", () => {
    const linEq = CHAPTER_TARGETS.find((t) => t.chapter === "Linear Equations in Two Variables")!;
    expect(chapterDocBaseName(linEq)).toBe("01_Linear_Equations_in_Two_Variables");
  });
});
