/**
 * The practice-test picker (V's "Build a practice test", 2026-10-15).
 *
 * A practice test is built for one student from the chapters they choose, so
 * unlike a chapter test it is NOT frozen as data: two tests on the same chapter
 * should differ (a seed), and a student who asks to skip questions they have
 * already answered should get new ones while any are left.
 */
import { describe, it, expect } from "vitest";
import {
  difficultySeats,
  mostAskedChapters,
  pickPracticeQuestions,
  practiceLengths,
  type PracticeCandidate,
} from "@/lib/practiceTests/pick";

type D = PracticeCandidate["difficulty"];

function pool(
  chapterId: string,
  spec: { subtopic?: string; difficulty?: D; format?: "mcq" | "numeric"; n: number }[]
): PracticeCandidate[] {
  const out: PracticeCandidate[] = [];
  for (const s of spec) {
    for (let i = 0; i < s.n; i++) {
      out.push({
        id: `${chapterId}-${s.subtopic ?? "x"}-${s.difficulty ?? "MODERATE"}-${s.format ?? "mcq"}-${i}`,
        chapterId,
        subtopic: s.subtopic ?? null,
        difficulty: s.difficulty ?? "MODERATE",
        format: s.format ?? "mcq",
      });
    }
  }
  return out;
}

const RANK: Record<D, number> = { EASY: 0, MODERATE: 1, HARD: 2 };

describe("practiceLengths", () => {
  it("offers only the lengths the chosen chapters can fill", () => {
    expect(practiceLengths(9)).toEqual([]);
    expect(practiceLengths(10)).toEqual([10]);
    expect(practiceLengths(25)).toEqual([10, 20]);
    expect(practiceLengths(400)).toEqual([10, 20, 30]);
  });
});

describe("difficultySeats", () => {
  it("keeps the pool's own mix for Mixed", () => {
    expect(difficultySeats({ EASY: 10, MODERATE: 20, HARD: 10 }, 20, "mixed")).toEqual({
      EASY: 5,
      MODERATE: 10,
      HARD: 5,
    });
  });

  it("leans to easy questions for Easier, and a tie in the remainder goes to the easier level", () => {
    // weighted 30/40/10 of 80 -> 7.5 / 10 / 2.5
    expect(difficultySeats({ EASY: 10, MODERATE: 20, HARD: 10 }, 20, "easier")).toEqual({
      EASY: 8,
      MODERATE: 10,
      HARD: 2,
    });
  });

  it("leans to hard questions for Harder", () => {
    // weighted 20/40/6 of 66 -> 6.06 / 12.12 / 1.82
    expect(difficultySeats({ EASY: 20, MODERATE: 20, HARD: 2 }, 20, "harder")).toEqual({
      EASY: 6,
      MODERATE: 12,
      HARD: 2,
    });
  });

  it("never seats more of a level than the pool holds, and moves the overflow one level along", () => {
    // weighted 9/10/30 of 49 -> 3.67 / 4.08 / 12.24, so EASY rounds up to 4 but only 3 exist
    const seats = difficultySeats({ EASY: 3, MODERATE: 5, HARD: 30 }, 20, "easier");
    expect(seats).toEqual({ EASY: 3, MODERATE: 5, HARD: 12 });
  });

  it("always seats exactly n when the pool holds n", () => {
    const seats = difficultySeats({ EASY: 1, MODERATE: 1, HARD: 8 }, 10, "easier");
    expect(seats.EASY + seats.MODERATE + seats.HARD).toBe(10);
    expect(seats).toEqual({ EASY: 1, MODERATE: 1, HARD: 8 });
  });
});

describe("pickPracticeQuestions", () => {
  it("returns null when the chapters cannot fill the test", () => {
    expect(pickPracticeQuestions(pool("a", [{ n: 9 }]), 10, { difficulty: "mixed", seed: 1 })).toBeNull();
  });

  it("returns exactly n distinct questions", () => {
    const got = pickPracticeQuestions(pool("a", [{ n: 40 }]), 20, { difficulty: "mixed", seed: 1 })!;
    expect(got.ids).toHaveLength(20);
    expect(new Set(got.ids).size).toBe(20);
  });

  it("spreads the test evenly across the chosen chapters, and across each chapter's subtopics", () => {
    const p = [
      ...pool("a", [
        { subtopic: "a1", n: 5 },
        { subtopic: "a2", n: 5 },
      ]),
      ...pool("b", [{ subtopic: "b1", n: 10 }]),
    ];
    const got = pickPracticeQuestions(p, 10, { difficulty: "mixed", seed: 7 })!;
    const fromA = got.ids.filter((id) => id.startsWith("a-"));
    expect(fromA).toHaveLength(5);
    expect(fromA.filter((id) => id.startsWith("a-a1")).length).toBeGreaterThanOrEqual(2);
    expect(fromA.filter((id) => id.startsWith("a-a2")).length).toBeGreaterThanOrEqual(2);
  });

  it("sits easy before moderate before hard", () => {
    const p = pool("a", [
      { difficulty: "HARD", n: 10 },
      { difficulty: "EASY", n: 10 },
      { difficulty: "MODERATE", n: 10 },
    ]);
    const byId = new Map(p.map((c) => [c.id, c]));
    const got = pickPracticeQuestions(p, 15, { difficulty: "mixed", seed: 3 })!;
    const ranks = got.ids.map((id) => RANK[byId.get(id)!.difficulty]);
    expect(ranks).toEqual([...ranks].sort((x, y) => x - y));
  });

  it("puts numeric questions last, at the exam's share", () => {
    const p = pool("a", [
      { format: "mcq", n: 20 },
      { format: "numeric", n: 10 },
    ]);
    const got = pickPracticeQuestions(p, 10, { difficulty: "mixed", seed: 2, numericShare: 0.2 })!;
    const formats = got.ids.map((id) => (id.includes("-numeric-") ? "numeric" : "mcq"));
    expect(formats).toEqual([...Array(8).fill("mcq"), "numeric", "numeric"]);
  });

  it("builds a different test from a different seed, and the same test from the same seed", () => {
    const p = pool("a", [{ n: 60 }]);
    const one = pickPracticeQuestions(p, 10, { difficulty: "mixed", seed: 1 })!.ids;
    const again = pickPracticeQuestions(p, 10, { difficulty: "mixed", seed: 1 })!.ids;
    const two = pickPracticeQuestions(p, 10, { difficulty: "mixed", seed: 2 })!.ids;
    expect(again).toEqual(one);
    expect(two).not.toEqual(one);
  });

  it("uses only questions the student has not answered when there are enough of them", () => {
    const p = pool("a", [{ n: 30 }]);
    const seen = new Set(p.slice(0, 15).map((c) => c.id));
    const got = pickPracticeQuestions(p, 10, { difficulty: "mixed", seed: 4, seen })!;
    expect(got.ids.every((id) => !seen.has(id))).toBe(true);
    expect(got.newToYou).toBe(10);
  });

  it("takes every new question and tops up with answered ones when new ones run short", () => {
    const p = pool("a", [{ n: 20 }]);
    const seen = new Set(p.slice(0, 15).map((c) => c.id));
    const got = pickPracticeQuestions(p, 10, { difficulty: "mixed", seed: 4, seen })!;
    expect(got.ids).toHaveLength(10);
    expect(got.newToYou).toBe(5);
    for (const c of p.slice(15)) expect(got.ids).toContain(c.id);
  });
});

describe("mostAskedChapters", () => {
  it("picks the three chapters with the most recent past-year questions", () => {
    const got = mostAskedChapters([
      { id: "a", recentPyq: 5, available: 30 },
      { id: "b", recentPyq: 40, available: 30 },
      { id: "c", recentPyq: 12, available: 30 },
      { id: "d", recentPyq: 12, available: 50 },
      { id: "e", recentPyq: 0, available: 90 },
    ]);
    expect(got).toEqual(["b", "d", "c"]);
  });

  it("skips chapters never asked recently or with nothing to test", () => {
    expect(
      mostAskedChapters([
        { id: "a", recentPyq: 0, available: 30 },
        { id: "b", recentPyq: 9, available: 0 },
        { id: "c", recentPyq: 2, available: 12 },
      ])
    ).toEqual(["c"]);
  });
});
