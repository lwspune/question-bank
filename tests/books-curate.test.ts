/**
 * Curation moves: reordering a book without tearing a passage apart.
 *
 * The unit of movement is the SET, not the question. 3,175 of the 3,180
 * questions share a `context` with their siblings, and in Reading Comprehension
 * one passage feeds five or more — so moving a question on its own would strand
 * it from the passage that makes it answerable. `positionForMove` in
 * papers/sections.ts moves ONE item; these move a whole block and keep it
 * contiguous.
 *
 * Positions are fractional so a move rewrites only the rows that moved, never
 * renumbers the section.
 */
import { describe, it, expect } from "vitest";
import { planSetMove, planSetToSection, type PositionedSet } from "../src/lib/books/curate";

/** Three sets of 2, 1 and 2 questions at positions 1..5. */
const SETS: PositionedSet[] = [
  { key: "A", items: [{ questionId: "a1", position: 1 }, { questionId: "a2", position: 2 }] },
  { key: "B", items: [{ questionId: "b1", position: 3 }] },
  { key: "C", items: [{ questionId: "c1", position: 4 }, { questionId: "c2", position: 5 }] },
];

/** Re-sort the section after applying a move, to read off the resulting order. */
function orderAfter(sets: PositionedSet[], moves: { questionId: string; position: number }[]) {
  const byId = new Map(moves.map((m) => [m.questionId, m.position]));
  return sets
    .flatMap((s) => s.items)
    .map((i) => ({ id: i.questionId, position: byId.get(i.questionId) ?? i.position }))
    .sort((x, y) => x.position - y.position || x.id.localeCompare(y.id))
    .map((i) => i.id);
}

describe("planSetMove", () => {
  it("moves a set up past its whole neighbour, not just one question", () => {
    const moves = planSetMove(SETS, "C", "up")!;
    expect(moves.map((m) => m.questionId)).toEqual(["c1", "c2"]);
    // C must clear ALL of B, landing between A and B.
    expect(orderAfter(SETS, moves)).toEqual(["a1", "a2", "c1", "c2", "b1"]);
  });

  it("moves a set down past its whole neighbour", () => {
    const moves = planSetMove(SETS, "A", "down")!;
    expect(orderAfter(SETS, moves)).toEqual(["b1", "a1", "a2", "c1", "c2"]);
  });

  it("keeps a moved set contiguous and internally ordered", () => {
    const moves = planSetMove(SETS, "C", "up")!;
    const positions = moves.map((m) => m.position);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
    const order = orderAfter(SETS, moves);
    expect(order.indexOf("c2") - order.indexOf("c1")).toBe(1);
  });

  it("refuses a move that has nowhere to go", () => {
    expect(planSetMove(SETS, "A", "up")).toBeNull();
    expect(planSetMove(SETS, "C", "down")).toBeNull();
    expect(planSetMove(SETS, "nosuch", "up")).toBeNull();
  });

  it("moves a set to the very top without colliding", () => {
    const moves = planSetMove(SETS, "B", "up")!;
    expect(orderAfter(SETS, moves)).toEqual(["b1", "a1", "a2", "c1", "c2"]);
    for (const m of moves) expect(m.position).toBeLessThan(1);
  });

  it("moves a set to the very bottom without colliding", () => {
    const moves = planSetMove(SETS, "B", "down")!;
    expect(orderAfter(SETS, moves)).toEqual(["a1", "a2", "c1", "c2", "b1"]);
    for (const m of moves) expect(m.position).toBeGreaterThan(5);
  });

  it("survives a tight gap between neighbours", () => {
    // Positions left very close by earlier moves — the new ones must still fit
    // strictly between them and stay distinct.
    const tight: PositionedSet[] = [
      { key: "A", items: [{ questionId: "a1", position: 1 }] },
      { key: "B", items: [{ questionId: "b1", position: 1.0001 }] },
      {
        key: "C",
        items: [
          { questionId: "c1", position: 2 },
          { questionId: "c2", position: 3 },
        ],
      },
    ];
    const moves = planSetMove(tight, "C", "up")!;
    expect(orderAfter(tight, moves)).toEqual(["a1", "c1", "c2", "b1"]);
    expect(new Set(moves.map((m) => m.position)).size).toBe(2);
  });

  it("does not move any set other than the one asked for", () => {
    const moves = planSetMove(SETS, "C", "up")!;
    expect(new Set(moves.map((m) => m.questionId))).toEqual(new Set(["c1", "c2"]));
  });
});

describe("planSetToSection", () => {
  it("appends a whole set to the end of the target section", () => {
    const target: PositionedSet[] = [
      { key: "X", items: [{ questionId: "x1", position: 1 }, { questionId: "x2", position: 2 }] },
    ];
    const moves = planSetToSection(SETS, "C", "cds", target)!;
    expect(moves.map((m) => [m.questionId, m.sectionKey, m.position])).toEqual([
      ["c1", "cds", 3],
      ["c2", "cds", 4],
    ]);
  });

  it("starts at 1 when the target section is empty", () => {
    const moves = planSetToSection(SETS, "B", "cds", [])!;
    expect(moves).toEqual([{ questionId: "b1", sectionKey: "cds", position: 1 }]);
  });

  it("refuses to move a set that is not there", () => {
    expect(planSetToSection(SETS, "nosuch", "cds", [])).toBeNull();
  });
});
