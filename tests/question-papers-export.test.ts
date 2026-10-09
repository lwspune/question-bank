import { describe, it, expect } from "vitest";
import { boardPaperExport, parseBoardPaperTarget } from "@/lib/questionPapers/exportPlan";
import type { PaperItemRow } from "@/lib/questionPapers/listing";

const item = (position: number, questionId: string, over: Partial<PaperItemRow> = {}): PaperItemRow => ({
  position,
  printedNumber: String(position),
  section: "A",
  marks: 1,
  alternativeTo: null,
  caseKey: null,
  questionId,
  ...over,
});

const PAPER = {
  title: "CBSE Class 12 Physics 2025 (55/1/1)",
  sections: [
    { key: "A", title: "Section A", note: "1 mark each" },
    { key: "B", title: "Section B", note: "" },
  ],
};

describe("boardPaperExport — a stored board paper as a download", () => {
  const items = [
    item(1, "q1"),
    item(2, "q2", { printedNumber: "2" }),
    item(3, "q3", { printedNumber: "3" }),
    item(4, "q4", { printedNumber: "4 (a)", section: "B", marks: 2 }),
    item(5, "q5", { printedNumber: "4 (b)", section: "B", marks: 2, alternativeTo: 4 }),
    item(6, "q6", { printedNumber: "5 (i)", section: "B", caseKey: "CS1" }),
    item(7, "q7", { printedNumber: "5 (ii)", section: "B", caseKey: "CS1" }),
  ];
  const contextOf = new Map<string, string | null>([
    ["q1", null],
    ["q2", "Directions: Assertion and Reason."],
    ["q3", "Directions: Assertion and Reason."],
    ["q4", null],
    ["q5", null],
    ["q6", "case passage"],
    ["q7", "case passage"],
  ]);
  const r = boardPaperExport(PAPER, items, contextOf);

  it("keeps the printed order and titles the file by the paper", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.title).toBe(PAPER.title);
    expect(r.questionIds).toEqual(["q1", "q2", "q3", "q4", "q5", "q6", "q7"]);
  });

  it("heads each question with its section and the section's marks rule", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.sectionOf.get("q1")).toBe("Section A · 1 mark each");
    expect(r.sectionOf.get("q4")).toBe("Section B");
  });

  it("carries each question's printed number, marks and OR", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.printedOf.get("q4")).toEqual({ number: "4 (a)", marks: 2, orBefore: false });
    expect(r.printedOf.get("q5")).toEqual({ number: "4 (b)", marks: 2, orBefore: true });
  });

  it("groups a case study's parts, so its passage prints once", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.setOf.get("q6")).toBeDefined();
    expect(r.setOf.get("q6")).toBe(r.setOf.get("q7"));
  });

  it("groups consecutive questions sharing directions, so they print once", () => {
    if (!r.ok) throw new Error(r.reason);
    expect(r.setOf.get("q2")).toBeDefined();
    expect(r.setOf.get("q2")).toBe(r.setOf.get("q3"));
    expect(r.setOf.get("q2")).not.toBe(r.setOf.get("q6"));
    expect(r.setOf.has("q1")).toBe(false);
  });

  it("refuses a paper with a gap in its positions", () => {
    const bad = boardPaperExport(PAPER, [item(1, "q1"), item(3, "q3")], contextOf);
    expect(bad.ok).toBe(false);
  });

  it("refuses a paper holding the same question twice", () => {
    const bad = boardPaperExport(PAPER, [item(1, "q1"), item(2, "q1")], contextOf);
    expect(bad.ok).toBe(false);
  });

  it("refuses an empty paper", () => {
    expect(boardPaperExport(PAPER, [], contextOf).ok).toBe(false);
  });
});

describe("parseBoardPaperTarget — the request body's board paper", () => {
  it("accepts an exam slug and a paper slug", () => {
    expect(parseBoardPaperTarget({ exam: "cbse-12", slug: "2025-55-1-2" })).toEqual({
      exam: "cbse-12",
      slug: "2025-55-1-2",
    });
  });

  it("refuses anything else", () => {
    expect(parseBoardPaperTarget(null)).toBeNull();
    expect(parseBoardPaperTarget({ exam: "cbse-12" })).toBeNull();
    expect(parseBoardPaperTarget({ exam: "CBSE 12", slug: "x" })).toBeNull();
    expect(parseBoardPaperTarget({ exam: "cbse-12", slug: "../x" })).toBeNull();
    expect(parseBoardPaperTarget({ exam: "cbse-12", slug: "a".repeat(81) })).toBeNull();
  });
});

describe("boardPaperExport — a question in parts (Maharashtra, 0147)", () => {
  it("prints the marks once, on the question, and none on its parts", () => {
    const r = boardPaperExport(
      { title: "Physics June 2026", sections: [{ key: "D", title: "Section D", note: "4 marks each" }] },
      [
        item(1, "a", { printedNumber: "31 (i)", section: "D", marks: 4 }),
        item(2, "b", { printedNumber: "31 (ii)", section: "D", marks: null, partOf: 1 }),
      ],
      new Map([["a", null], ["b", null]])
    );
    if (!r.ok) throw new Error(r.reason);
    expect(r.printedOf.get("a")).toEqual({ number: "31 (i)", marks: 4, orBefore: false });
    expect(r.printedOf.get("b")).toEqual({ number: "31 (ii)", marks: null, orBefore: false });
  });
});
