import { describe, it, expect } from "vitest";
import { groupLabel, subjectListing, assemblePaper, type PaperListing } from "@/lib/questionPapers/listing";
import type { BoardQuestion } from "@/lib/board/query";

const paper = (over: Partial<PaperListing>): PaperListing => ({
  id: "p",
  examId: "e",
  subjectId: "s",
  subjectName: "Physics",
  slug: "2025-55-1-1",
  groupSlug: "2025-55-1",
  setNumber: 1,
  year: 2025,
  sitting: null,
  paperCode: "55/1/1",
  title: "CBSE Class 12 Physics 2025 (55/1/1)",
  totalMarks: 70,
  durationMinutes: 180,
  ...over,
});

describe("groupLabel — how a paper group is named on a list", () => {
  it("drops the set number from a CBSE code", () => {
    expect(groupLabel(paper({}))).toBe("55/1");
  });
  it("uses the sitting for a paper without a set", () => {
    expect(groupLabel(paper({ paperCode: null, setNumber: null, sitting: "June 2026" }))).toBe("June 2026");
  });
});

describe("subjectListing — one subject's papers, newest year first", () => {
  const list = subjectListing([
    paper({ id: "a", slug: "2024-55-2-2", groupSlug: "2024-55-2", setNumber: 2, year: 2024, paperCode: "55/2/2" }),
    paper({ id: "b", slug: "2025-55-1-2", groupSlug: "2025-55-1", setNumber: 2, paperCode: "55/1/2" }),
    paper({ id: "c", slug: "2025-55-1-1", groupSlug: "2025-55-1", setNumber: 1, paperCode: "55/1/1" }),
    paper({ id: "d", slug: "2024-55-2-1", groupSlug: "2024-55-2", setNumber: 1, year: 2024, paperCode: "55/2/1" }),
    paper({ id: "e", slug: "2025-55-3-1", groupSlug: "2025-55-3", setNumber: 1, paperCode: "55/3/1" }),
  ]);

  it("orders years newest first and groups within a year by code", () => {
    expect(list.map((y) => y.year)).toEqual([2025, 2024]);
    expect(list[0].groups.map((g) => g.groupSlug)).toEqual(["2025-55-1", "2025-55-3"]);
  });

  it("lists a group's sets in order", () => {
    expect(list[0].groups[0].sets.map((s) => s.setNumber)).toEqual([1, 2]);
    expect(list[1].groups[0].sets.map((s) => s.slug)).toEqual(["2024-55-2-1", "2024-55-2-2"]);
  });

  it("labels each group", () => {
    expect(list[0].groups[0].label).toBe("55/1");
  });
});

const q = (id: string): BoardQuestion => ({
  id,
  questionNumber: null,
  text: `stem ${id}`,
  context: null,
  solution: "ans",
  imageUrl: null,
  solutionImageUrl: null,
  format: "subjective",
  setId: null,
  options: [],
});

describe("assemblePaper — a paper's items with their questions", () => {
  const items = [
    { position: 2, printedNumber: "2 (a)", section: "B", marks: 2, alternativeTo: null, caseKey: null, questionId: "y" },
    { position: 1, printedNumber: "1", section: "A", marks: 1, alternativeTo: null, caseKey: null, questionId: "x" },
    { position: 3, printedNumber: "2 (b)", section: "B", marks: 2, alternativeTo: 2, caseKey: null, questionId: "z" },
  ];

  it("puts items in printed order, each with its question, numbered as printed", () => {
    const r = assemblePaper(items, [q("x"), q("y"), q("z")]);
    expect(r).not.toBeNull();
    expect(r!.map((i) => i.question.id)).toEqual(["x", "y", "z"]);
    expect(r!.map((i) => i.question.questionNumber)).toEqual(["Q.1", "Q.2 (a)", "Q.2 (b)"]);
  });

  it("flags each OR alternative, so the page can print OR before it", () => {
    const r = assemblePaper(items, [q("x"), q("y"), q("z")])!;
    expect(r.map((i) => i.isAlternative)).toEqual([false, false, true]);
  });

  it("returns null when a question is no longer available, rather than a short paper", () => {
    expect(assemblePaper(items, [q("x"), q("y")])).toBeNull();
  });
});
