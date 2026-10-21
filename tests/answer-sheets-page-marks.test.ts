/**
 * Marks on a student's pages (answer-sheet grading, migration 0175): ticks,
 * crosses, circles, short notes and each question's score, placed by the
 * grader as percent of the prepared page. The student sees where every mark
 * went, so the page must agree with the grade: one score per scored question,
 * a loss shown where it happened, nothing red beside full marks.
 * Ported from nda-tracker's homework marks (src/lib/assignments/pageMarks.js).
 */
import { describe, it, expect } from "vitest";
import {
  validateMarks,
  scoreText,
  drawingPayload,
  MAX_NOTE_CHARS,
  MAX_MARKS,
} from "@/lib/answerSheets/pageMarks";
import type { GradeRow } from "@/lib/answerSheets/grade";

const row = (position: number, maxMarks: number, outcome: GradeRow["outcome"], awarded: number | null): GradeRow => ({
  position,
  printedNumber: String(position + 10),
  questionId: `q-${position}`,
  maxMarks,
  outcome,
  awarded,
  earned: null,
  missing: null,
  cause: null,
  topic: null,
});

// Q.11 full marks, Q.12 lost half, Q.13 not attempted, Q.14 an OR side not counted.
const rows = [row(1, 1, "scored", 1), row(2, 3, "scored", 2.5), row(3, 5, "not_attempted", null), row(4, 3, "not_counted", null)];

type M = Record<string, unknown>;
const score = (position: number, page = 1, x = 80, y = 20): M => ({ page, position, kind: "score", x, y });
const sound = (): M[] => [
  { page: 1, position: 1, kind: "tick", x: 60, y: 18 },
  score(1),
  { page: 2, position: 2, kind: "note", x: 70, y: 40, text: "Should be 5", to: { x: 50, y: 42 } },
  { page: 2, position: 2, kind: "circle", x: 48, y: 42, w: 10, h: 4 },
  score(2, 2),
];
const check = (marks: unknown, pageCount = 3) => validateMarks({ marks, pageCount, rows });
const errorsOf = (marks: unknown, pageCount = 3) => {
  const r = check(marks, pageCount);
  return r.ok ? "" : r.errors.join(" | ");
};

describe("validateMarks: a sound set of marks", () => {
  it("passes and numbers the marks in file order", () => {
    const r = check(sound());
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.marks.map((m) => [m.seq, m.position, m.kind])).toEqual([
      [1, 1, "tick"],
      [2, 1, "score"],
      [3, 2, "note"],
      [4, 2, "circle"],
      [5, 2, "score"],
    ]);
  });

  it("keeps only the fields each kind uses, coordinates rounded to 0.1", () => {
    const r = check([
      { page: 1, position: 1, kind: "tick", x: 60.04, y: 18.06 },
      score(1),
      { page: 2, position: 2, kind: "note", x: 70, y: 40, text: "  Should be 5 ", to: { x: 50.26, y: 42 } },
      { page: 2, position: 2, kind: "circle", x: 48, y: 42, w: 10.04, h: 4 },
      score(2, 2),
    ]);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.marks[0]).toEqual({ seq: 1, page: 1, position: 1, kind: "tick", x: 60, y: 18.1, w: null, h: null, text: null, toX: null, toY: null });
    expect(r.marks[2]).toMatchObject({ text: "Should be 5", toX: 50.3, toY: 42 });
    expect(r.marks[3]).toMatchObject({ w: 10, h: 4 });
  });

  it("allows a note on an answer that was not counted, explaining why", () => {
    expect(check([...sound(), { page: 3, position: 4, kind: "note", x: 10, y: 10, text: "Not counted: Q.12 came first" }]).ok).toBe(true);
  });
});

describe("validateMarks: every question is accounted for on the page", () => {
  it("needs exactly one score mark per scored question", () => {
    const none = sound().filter((m) => !(m.position === 1 && m.kind === "score"));
    expect(errorsOf(none)).toMatch(/Q\.11: place one score mark/);
    expect(errorsOf([...sound(), score(2, 3)])).toMatch(/Q\.12 has 2 score marks/);
  });

  it("needs a cross, circle or note on a question that lost marks", () => {
    const bare = sound().filter((m) => !(m.position === 2 && (m.kind === "note" || m.kind === "circle")));
    expect(errorsOf(bare)).toMatch(/Q\.12: marks were lost, so show where/);
    for (const kind of ["cross", "circle", "note"]) {
      const one = { page: 2, position: 2, kind, x: 40, y: 40, ...(kind === "circle" ? { w: 5, h: 5 } : {}), ...(kind === "note" ? { text: "x" } : {}) };
      expect(check([...bare, one]).ok, kind).toBe(true);
    }
  });

  // A red cross or note beside full marks reads as a lost mark: the same
  // reason the grade checker refuses `missing` on full marks.
  it("allows only ticks and the score on a full-marks question", () => {
    for (const extra of [
      { page: 1, position: 1, kind: "cross", x: 1, y: 1 },
      { page: 1, position: 1, kind: "note", x: 1, y: 1, text: "Neat" },
      { page: 1, position: 1, kind: "circle", x: 5, y: 5, w: 2, h: 2 },
    ]) {
      expect(errorsOf([...sound(), extra]), extra.kind).toMatch(/Q\.11: full marks, so only ticks and the score/);
    }
  });

  it("puts nothing on a question not attempted", () => {
    expect(errorsOf([...sound(), score(3)])).toMatch(/Q\.13: not attempted, so nothing goes on the page for it/);
    expect(errorsOf([...sound(), { page: 1, position: 3, kind: "tick", x: 1, y: 1 }])).toMatch(/Q\.13: not attempted/);
  });

  it("allows only a note on an answer that was not counted", () => {
    expect(errorsOf([...sound(), score(4)])).toMatch(/Q\.14: not counted, so only a note/);
    expect(errorsOf([...sound(), { page: 1, position: 4, kind: "cross", x: 1, y: 1 }])).toMatch(/Q\.14: not counted, so only a note/);
  });

  it("refuses a mark for a question that is not graded", () => {
    expect(errorsOf([...sound(), score(9)])).toMatch(/Mark 6: position 9 is not a graded question/);
  });
});

describe("validateMarks: each mark is well formed", () => {
  it("refuses a missing marks list", () => {
    expect(errorsOf(undefined)).toMatch(/needs a `marks` list/);
  });

  it("refuses an unknown kind", () => {
    expect(errorsOf([...sound(), { page: 1, position: 2, kind: "star", x: 1, y: 1 }])).toMatch(/kind must be one of/);
  });

  it("refuses a page that does not exist", () => {
    for (const page of [0, 4, 1.5, "1"]) {
      expect(errorsOf([...sound(), { page, position: 2, kind: "cross", x: 1, y: 1 }]), String(page)).toMatch(/page must be a whole number from 1 to 3/);
    }
  });

  it("refuses coordinates off the page", () => {
    for (const [x, y] of [[-1, 5], [5, 101], [NaN, 5], ["5", 5]]) {
      expect(errorsOf([...sound(), { page: 1, position: 2, kind: "cross", x, y }]), `${x},${y}`).toMatch(/x and y must be numbers from 0 to 100/);
    }
  });

  it("needs a size on a circle and nowhere else", () => {
    expect(errorsOf([...sound(), { page: 1, position: 2, kind: "circle", x: 5, y: 5 }])).toMatch(/a circle needs w and h/);
    expect(errorsOf([...sound(), { page: 1, position: 2, kind: "circle", x: 5, y: 5, w: 0, h: 3 }])).toMatch(/a circle needs w and h/);
    expect(errorsOf([...sound(), { page: 1, position: 2, kind: "cross", x: 5, y: 5, w: 3, h: 3 }])).toMatch(/only a circle has w and h/);
  });

  it("needs text on a note, at most the limit, and on no other kind", () => {
    expect(errorsOf([...sound(), { page: 1, position: 2, kind: "note", x: 5, y: 5, text: " " }])).toMatch(/a note needs text/);
    expect(errorsOf([...sound(), { page: 1, position: 2, kind: "note", x: 5, y: 5, text: "x".repeat(MAX_NOTE_CHARS + 1) }])).toMatch(
      new RegExp(`over ${MAX_NOTE_CHARS} characters`)
    );
    // The score's text is worked out from the grade, never typed.
    expect(errorsOf([...sound(), { page: 1, position: 2, kind: "cross", x: 5, y: 5, text: "2/3" }])).toMatch(/only a note has text/);
  });

  it("lets only a note point somewhere, at a spot on the page", () => {
    expect(errorsOf([...sound(), { page: 1, position: 2, kind: "cross", x: 5, y: 5, to: { x: 1, y: 1 } }])).toMatch(/only a note has `to`/);
    expect(errorsOf([...sound(), { page: 1, position: 2, kind: "note", x: 5, y: 5, text: "x", to: { x: 1, y: 140 } }])).toMatch(
      /`to` must be a point from 0 to 100/
    );
  });

  it("caps the number of marks", () => {
    const many = Array.from({ length: MAX_MARKS }, () => ({ page: 1, position: 2, kind: "cross", x: 1, y: 1 }));
    expect(errorsOf([...sound(), ...many])).toMatch(new RegExp(`at most ${MAX_MARKS} marks`));
  });

  it("names every problem at once", () => {
    const r = check([{ page: 9, position: 2, kind: "cross", x: 500, y: 1 }]);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.errors.length).toBeGreaterThanOrEqual(4); // page, coordinates, Q.11 score, Q.12 score
  });
});

describe("scoreText", () => {
  it("prints awarded over max without trailing zeros", () => {
    expect(scoreText(row(1, 3, "scored", 2.5))).toBe("2.5/3");
    expect(scoreText(row(1, 2, "scored", 0))).toBe("0/2");
    expect(scoreText(row(1, 5, "scored", 5))).toBe("5/5");
  });
});

// What the drawing script receives. The score text comes from the grade row,
// so a page can never show a number the grade does not hold; and the payload
// is deterministic, so its hash (the preview stamp) changes with any mark.
describe("drawingPayload", () => {
  it("fills each score from its grade row and leaves other marks as placed", () => {
    const r = check(sound());
    if (!r.ok) throw new Error(r.errors.join("\n"));
    const p = drawingPayload({ marks: r.marks, rows });
    expect(p.marks.filter((m) => m.kind === "score").map((m) => [m.text, m.state])).toEqual([
      ["1/1", "full"],
      ["2.5/3", "partial"],
    ]);
    expect(p.marks[2]).toMatchObject({ kind: "note", text: "Should be 5", state: null });
  });

  it("changes when a grade changes even if no mark moved", () => {
    const r = check(sound());
    if (!r.ok) throw new Error(r.errors.join("\n"));
    const before = JSON.stringify(drawingPayload({ marks: r.marks, rows }));
    const regraded = rows.map((x) => (x.position === 2 ? { ...x, awarded: 2 } : x));
    expect(JSON.stringify(drawingPayload({ marks: r.marks, rows: regraded }))).not.toBe(before);
  });
});
