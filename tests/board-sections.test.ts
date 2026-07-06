import { describe, it, expect } from "vitest";
import { groupBoardSections, slugify } from "../src/lib/board/query";

const q = (over: Partial<Parameters<typeof groupBoardSections>[0][number]>) => ({
  id: "id-" + Math.round(over.sectionSeq ?? 0) + "-" + (over.questionNumber ?? "x"),
  questionNumber: "Q",
  text: "stem",
  context: null,
  solution: null,
  imageUrl: null,
  solutionImageUrl: null,
  format: "subjective" as const,
  setId: null,
  options: [],
  sectionSeq: 1,
  sectionGroup: "2.1 Elementary Transformations",
  sectionLabel: "Solved Examples",
  sectionKind: "solved_example" as const,
  ...over,
});

describe("groupBoardSections", () => {
  it("folds section-ordered rows into group → block → questions", () => {
    // Matrices-shaped: 2.1 (solved seq1, exercise seq2) then Misc 2(B) MCQ seq3.
    const groups = groupBoardSections([
      q({ sectionSeq: 1, sectionGroup: "2.1", sectionLabel: "Solved Examples", sectionKind: "solved_example", questionNumber: "s1" }),
      q({ sectionSeq: 1, sectionGroup: "2.1", sectionLabel: "Solved Examples", sectionKind: "solved_example", questionNumber: "s2" }),
      q({ sectionSeq: 2, sectionGroup: "2.1", sectionLabel: "Exercise 2.1", sectionKind: "exercise", questionNumber: "e1" }),
      q({ sectionSeq: 3, sectionGroup: "Miscellaneous 2 (B)", sectionLabel: "Choose the correct alternative", sectionKind: "miscellaneous", format: "mcq", questionNumber: "m1" }),
    ]);

    expect(groups.map((g) => g.group)).toEqual(["2.1", "Miscellaneous 2 (B)"]);
    // 2.1 has two blocks; the first has both solved-example questions.
    expect(groups[0].blocks.map((b) => [b.label, b.kind, b.questions.length])).toEqual([
      ["Solved Examples", "solved_example", 2],
      ["Exercise 2.1", "exercise", 1],
    ]);
    expect(groups[0].blocks[0].seq).toBe(1);
    // Misc group carries its MCQ block.
    expect(groups[1].blocks).toHaveLength(1);
    expect(groups[1].blocks[0].questions[0].format).toBe("mcq");
  });

  it("starts a new block when section_seq changes even if group repeats", () => {
    const groups = groupBoardSections([
      q({ sectionSeq: 1, sectionGroup: "2.2", sectionLabel: "Solved Examples", sectionKind: "solved_example" }),
      q({ sectionSeq: 2, sectionGroup: "2.2", sectionLabel: "Exercise 2.2", sectionKind: "exercise" }),
    ]);
    expect(groups).toHaveLength(1);
    expect(groups[0].blocks).toHaveLength(2);
  });

  it("re-opens a group only on change, keeping a group's blocks together", () => {
    // Book order can interleave: 2.2 → Misc(A) → 2.3. Each distinct run is its own group.
    const groups = groupBoardSections([
      q({ sectionSeq: 4, sectionGroup: "2.2", sectionLabel: "Exercise 2.2", sectionKind: "exercise" }),
      q({ sectionSeq: 5, sectionGroup: "Misc 2 (A)", sectionLabel: "Misc 2 (A)", sectionKind: "miscellaneous" }),
      q({ sectionSeq: 6, sectionGroup: "2.3", sectionLabel: "Solved Examples", sectionKind: "solved_example" }),
    ]);
    expect(groups.map((g) => g.group)).toEqual(["2.2", "Misc 2 (A)", "2.3"]);
  });

  it("returns [] for no rows", () => {
    expect(groupBoardSections([])).toEqual([]);
  });
});

describe("slugify", () => {
  it("lowercases, hyphenates, and strips punctuation", () => {
    expect(slugify("Matrices")).toBe("matrices");
    expect(slugify("Pair of Straight Lines")).toBe("pair-of-straight-lines");
    expect(slugify("Mathematics")).toBe("mathematics");
    expect(slugify("  Linear  Programming  ")).toBe("linear-programming");
  });
});
