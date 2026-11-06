/**
 * Incremental exam-twin runs: after an ingest, only the comparisons no run has
 * made yet are read. A comparison is one board question against one exam
 * question; a settled run covers every board question it read against every
 * exam question it read (its `reviewed` lists), matched or not.
 */
import { describe, it, expect } from "vitest";
import { isRunOf, nextRunName, pendingWork } from "@/lib/crossExam/pending";

const T = (n: number) => `t${n}`;
const B = (n: number) => `b${n}`;
const norm = (w: { targets: string[]; board: string[] }[]) =>
  w.map((g) => ({ targets: [...g.targets].sort(), board: [...g.board].sort() }));

describe("pendingWork", () => {
  const now = { targets: [T(1), T(2)], board: [B(1), B(2), B(3)] };

  it("a chapter never run: everything, in one part", () => {
    expect(norm(pendingWork(now, []))).toEqual([{ targets: [T(1), T(2)], board: [B(1), B(2), B(3)] }]);
  });

  it("nothing new: nothing to do", () => {
    expect(pendingWork(now, [{ targets: [T(1), T(2)], board: [B(1), B(2), B(3)] }])).toEqual([]);
  });

  it("a new exam paper: only the new exam questions, against every board question", () => {
    const done = [{ targets: [T(1)], board: [B(1), B(2), B(3)] }];
    expect(norm(pendingWork(now, done))).toEqual([{ targets: [T(2)], board: [B(1), B(2), B(3)] }]);
  });

  it("a new board paper: only the new board questions, against every exam question", () => {
    const done = [{ targets: [T(1), T(2)], board: [B(1), B(2)] }];
    expect(norm(pendingWork(now, done))).toEqual([{ targets: [T(1), T(2)], board: [B(3)] }]);
  });

  it("both sides new: two parts that never repeat a comparison", () => {
    const done = [{ targets: [T(1)], board: [B(1), B(2)] }];
    const work = norm(pendingWork(now, done));
    expect(work).toHaveLength(2);
    expect(work).toContainEqual({ targets: [T(2)], board: [B(1), B(2), B(3)] });
    expect(work).toContainEqual({ targets: [T(1)], board: [B(3)] });
    const pairs = work.flatMap((g) => g.targets.flatMap((t) => g.board.map((b) => `${b}>${t}`)));
    expect(new Set(pairs).size).toBe(pairs.length);
    expect(pairs.sort()).toEqual([`${B(1)}>${T(2)}`, `${B(2)}>${T(2)}`, `${B(3)}>${T(1)}`, `${B(3)}>${T(2)}`].sort());
  });

  it("adds up coverage across several runs", () => {
    const done = [
      { targets: [T(1)], board: [B(1), B(2), B(3)] },
      { targets: [T(2)], board: [B(1), B(2)] },
      { targets: [T(1), T(2)], board: [B(3)] },
    ];
    expect(pendingWork(now, done)).toEqual([]);
  });

  it("ignores read questions that are gone (deleted, made private, moved out)", () => {
    const done = [{ targets: [T(1), T(2), T(9)], board: [B(1), B(2), B(3), B(9)] }];
    expect(pendingWork(now, done)).toEqual([]);
  });

  it("a question moved INTO the chapter counts as new", () => {
    const moved = { targets: [T(1), T(2), T(3)], board: now.board };
    expect(norm(pendingWork(moved, [{ targets: [T(1), T(2)], board: now.board }]))).toEqual([{ targets: [T(3)], board: now.board }]);
  });

  it("puts the biggest part first", () => {
    const done = [{ targets: [T(1)], board: [B(1), B(2)] }];
    const [first, second] = pendingWork(now, done);
    expect(first.targets.length * first.board.length).toBeGreaterThanOrEqual(second.targets.length * second.board.length);
  });
});

describe("run names", () => {
  it("knows its own runs and no other run's", () => {
    expect(isRunOf("nda-maths-lines", "nda-maths-lines-2026-11-06.json")).toBe(true);
    expect(isRunOf("nda-maths-lines", "nda-maths-lines-2027-05-01-2.json")).toBe(true);
    expect(isRunOf("nda-maths-lines", "nda-maths-linear-inequalities-2026-11-06.json")).toBe(false);
    expect(isRunOf("nda-maths-differentiation", "nda-maths-differential-equations-2026-11-06.json")).toBe(false);
    expect(isRunOf("nda-maths-lines", "nda-maths-lines-extra-2026-11-06.json")).toBe(false);
  });

  it("numbers a second run on the same day", () => {
    expect(nextRunName("nda-maths-lines", "2027-05-01", [])).toBe("nda-maths-lines-2027-05-01");
    expect(nextRunName("nda-maths-lines", "2027-05-01", ["nda-maths-lines-2027-05-01.json"])).toBe("nda-maths-lines-2027-05-01-2");
    expect(
      nextRunName("nda-maths-lines", "2027-05-01", ["nda-maths-lines-2027-05-01.json", "nda-maths-lines-2027-05-01-2.json"])
    ).toBe("nda-maths-lines-2027-05-01-3");
  });
});
