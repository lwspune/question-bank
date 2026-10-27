/**
 * What a Chapter-wise PYQs book prints (2026-10-27): every board question,
 * chapter by chapter in textbook order, grouped by marks (1, 2, 3, ...), then
 * case studies and passages (a question in parts), then "Earlier years": the
 * older questions with no marks recorded (owner: keep them, in their own
 * section). Within a group, the order the slots came in (newest paper first
 * for CBSE, the homework plan's ranking for Maharashtra). A slot belongs to
 * the chapter of its first part and keeps every part.
 */
import { describe, it, expect } from "vitest";
import { chapterwiseChapters, groupLabel, type ChapterwiseSlot } from "@/lib/ebooks/chapterwise";

const slot = (
  order: number,
  marks: number | null,
  chapter: [string, number] = ["Optics", 2],
  parts: string[] = [`q${order}`],
  note = `note ${order}`
): ChapterwiseSlot => ({ order, marks, note, chapterId: chapter[0], chapterName: chapter[0], chapterOrder: chapter[1], parts });

describe("groupLabel", () => {
  it("names a marks group, a case study and the earlier years", () => {
    expect(groupLabel({ kind: "marks", marks: 1 })).toBe("1 mark");
    expect(groupLabel({ kind: "marks", marks: 3 })).toBe("3 marks");
    expect(groupLabel({ kind: "marks", marks: 0.5 })).toBe("0.5 marks");
    expect(groupLabel({ kind: "parts" })).toBe("Case studies and passages");
    expect(groupLabel({ kind: "earlier" })).toBe("Earlier years");
  });
});

describe("chapterwiseChapters", () => {
  const ELECTRO: [string, number] = ["Electrostatics", 1];
  const slots = [
    slot(1, 3),
    slot(2, 1),
    slot(3, null),
    slot(4, 4, ["Optics", 2], ["c1", "c2", "c3"]),
    slot(5, 1),
    slot(6, 2, ELECTRO),
    slot(7, 3),
  ];

  it("orders chapters by the textbook", () => {
    expect(chapterwiseChapters(slots).map((c) => c.chapterName)).toEqual(["Electrostatics", "Optics"]);
  });

  it("groups by marks, then case studies and passages, then earlier years", () => {
    const optics = chapterwiseChapters(slots).find((c) => c.chapterName === "Optics")!;
    expect(optics.groups.map((g) => groupLabel(g))).toEqual(["1 mark", "3 marks", "Case studies and passages", "Earlier years"]);
  });

  it("keeps the slots' own order within a group", () => {
    const optics = chapterwiseChapters(slots).find((c) => c.chapterName === "Optics")!;
    expect(optics.groups[0].slots.map((s) => s.parts[0].questionId)).toEqual(["q2", "q5"]);
    expect(optics.groups[1].slots.map((s) => s.parts[0].questionId)).toEqual(["q1", "q7"]);
  });

  it("numbers the chapter's questions 1..n down the page, a case study's parts (a) (b) (c)", () => {
    const optics = chapterwiseChapters(slots).find((c) => c.chapterName === "Optics")!;
    const labels = optics.groups.flatMap((g) => g.slots.flatMap((s) => s.parts.map((p) => p.label)));
    expect(labels).toEqual(["1", "2", "3", "4", "5 (a)", "5 (b)", "5 (c)", "6"]);
  });

  it("keeps each slot's note and marks for printing", () => {
    const optics = chapterwiseChapters(slots).find((c) => c.chapterName === "Optics")!;
    expect(optics.groups[3].slots[0]).toMatchObject({ note: "note 3", marks: null });
  });

  it("returns nothing for nothing", () => {
    expect(chapterwiseChapters([])).toEqual([]);
  });
});
