/**
 * "Understood / Review later" on a written answer (2026-10-28, the owner's
 * call): the student judges their own written answer against the model answer,
 * and that judgement feeds the drill. No grader exists for a written answer, so
 * the student's tap IS the verdict; these tests pin what each tap writes.
 */
import { describe, it, expect } from "vitest";
import {
  encodePendingSelfMark,
  parsePendingSelfMark,
  parseSelfMark,
  PENDING_SELF_MARK_TTL_MS,
  selfMarkDedupeKey,
  selfMarkEvents,
  selfMarkMessage,
} from "@/lib/questions/selfMark";

const Q = "3f2504e0-4f89-41d3-9a0c-0305e82c3301";
const USER = "11111111-1111-4111-8111-111111111111";
// 2026-10-28 10:00 IST
const NOW = new Date("2026-10-28T04:30:00.000Z");

describe("parseSelfMark", () => {
  it("accepts a uuid, a mark and a surface", () => {
    expect(parseSelfMark({ questionId: Q, mark: "review", surface: "board" })).toEqual({
      ok: true,
      questionId: Q,
      mark: "review",
      surface: "board",
    });
  });

  it("normalises the id's case", () => {
    expect(parseSelfMark({ questionId: Q.toUpperCase(), mark: "understood", surface: "bank" })).toMatchObject({
      ok: true,
      questionId: Q,
    });
  });

  it("rejects an unknown mark rather than defaulting it", () => {
    expect(parseSelfMark({ questionId: Q, mark: "maybe", surface: "bank" }).ok).toBe(false);
    expect(parseSelfMark({ questionId: Q, surface: "bank" }).ok).toBe(false);
  });

  it("rejects a surface the buttons are not on", () => {
    // The drill records its marks through /api/drill/answer, and a guide worked
    // example is a lesson, not an attempt.
    expect(parseSelfMark({ questionId: Q, mark: "review", surface: "drill" }).ok).toBe(false);
    expect(parseSelfMark({ questionId: Q, mark: "review", surface: "guide" }).ok).toBe(false);
    expect(parseSelfMark({ questionId: Q, mark: "review" }).ok).toBe(false);
  });

  it("rejects a non-uuid id and a non-object body", () => {
    expect(parseSelfMark({ questionId: "1; drop", mark: "review", surface: "bank" }).ok).toBe(false);
    expect(parseSelfMark(null).ok).toBe(false);
    expect(parseSelfMark([Q]).ok).toBe(false);
  });
});

describe("selfMarkEvents", () => {
  const base = { questionId: Q, surface: "board" as const, userId: USER, now: NOW };

  it("records every tap as a self_mark row, whatever the state", () => {
    for (const mark of ["review", "understood"] as const) {
      for (const stateBefore of ["due", "retired", "never-missed"] as const) {
        const { tap } = selfMarkEvents({ ...base, mark, stateBefore });
        expect(tap).toEqual({
          kind: "self_mark",
          refId: Q,
          refKind: "question",
          metadata: { surface: "board", mark },
          dedupeKey: selfMarkDedupeKey(mark, "board", USER, Q, NOW),
        });
      }
    }
  });

  it("Review later puts the question in the drill: an answer_wrong tagged as a self-mark", () => {
    const { ladder, outcome } = selfMarkEvents({ ...base, mark: "review", stateBefore: "never-missed" });
    expect(ladder).toEqual({
      kind: "answer_wrong",
      refId: Q,
      refKind: "question",
      metadata: { surface: "board", selfMark: "review" },
    });
    expect(outcome).toBe("saved");
  });

  it("Review later on a question already waiting keeps it waiting", () => {
    const { ladder, outcome } = selfMarkEvents({ ...base, mark: "review", stateBefore: "due" });
    expect(ladder?.kind).toBe("answer_wrong");
    expect(outcome).toBe("saved");
  });

  it("Understood on a waiting question fixes it: an answer_correct", () => {
    const { ladder, outcome } = selfMarkEvents({ ...base, mark: "understood", stateBefore: "due" });
    expect(ladder).toEqual({
      kind: "answer_correct",
      refId: Q,
      refKind: "question",
      metadata: { surface: "board", selfMark: "understood" },
    });
    expect(outcome).toBe("fixed");
  });

  it("Understood on a question never marked writes no ladder row", () => {
    // `answer_correct` means a recovery (lib/mocks/correctEvents.ts), and there
    // is nothing in the drill to recover.
    const { ladder, outcome } = selfMarkEvents({ ...base, mark: "understood", stateBefore: "never-missed" });
    expect(ladder).toBeNull();
    expect(outcome).toBe("understood");
  });

  it("Understood on a question fixed before writes no second recovery", () => {
    const { ladder, outcome } = selfMarkEvents({ ...base, mark: "understood", stateBefore: "retired" });
    expect(ladder).toBeNull();
    expect(outcome).toBe("understood");
  });
});

describe("selfMarkDedupeKey", () => {
  it("keeps one TAP row per question, button, surface and India day", () => {
    const k = selfMarkDedupeKey("review", "bank", USER, Q, NOW);
    expect(k).toBe(`self_mark:review:bank:${USER}:${Q}:2026-10-28`);
    // A tap of the OTHER button the same day is its own row.
    expect(selfMarkDedupeKey("understood", "bank", USER, Q, NOW)).not.toBe(k);
    // 23:59 IST is still the same day; 00:01 IST the next is not.
    expect(selfMarkDedupeKey("review", "bank", USER, Q, new Date("2026-10-28T18:29:00.000Z"))).toBe(k);
    expect(selfMarkDedupeKey("review", "bank", USER, Q, new Date("2026-10-28T18:31:00.000Z"))).not.toBe(k);
  });

  it("leaves the drill rows unkeyed, so the latest tap always takes effect", () => {
    // Review, Understood, Review again the same day must end DUE: the
    // student's judgement is the verdict, and a day key on the drill rows
    // would drop the third tap while the screen said "Saved".
    for (const mark of ["review", "understood"] as const) {
      const { ladder } = selfMarkEvents({ questionId: Q, surface: "bank", userId: USER, now: NOW, mark, stateBefore: "due" });
      expect(ladder?.dedupeKey).toBeUndefined();
    }
  });

  it("never collides with an MCQ pick's key", () => {
    expect(selfMarkDedupeKey("review", "bank", USER, Q, NOW).startsWith("answer:")).toBe(false);
  });
});

describe("pending self-mark (a signed-out tap, saved after sign-in)", () => {
  const T = NOW.getTime();

  it("round-trips a tap", () => {
    const raw = encodePendingSelfMark({ questionId: Q, mark: "review", surface: "board" }, T);
    expect(parsePendingSelfMark(raw, T + 60_000)).toEqual({ questionId: Q, mark: "review", surface: "board" });
  });

  it("drops a tap older than the sign-in window, so a stale one never saves days later", () => {
    const raw = encodePendingSelfMark({ questionId: Q, mark: "review", surface: "board" }, T);
    expect(parsePendingSelfMark(raw, T + PENDING_SELF_MARK_TTL_MS - 1)).not.toBeNull();
    expect(parsePendingSelfMark(raw, T + PENDING_SELF_MARK_TTL_MS + 1)).toBeNull();
  });

  it("ignores anything malformed: storage is the browser's, not ours", () => {
    for (const raw of [null, "", "not json", "{}", "[]", JSON.stringify({ questionId: Q, mark: "x", surface: "bank", at: T })]) {
      expect(parsePendingSelfMark(raw, T)).toBeNull();
    }
  });
});

describe("selfMarkMessage", () => {
  it("names where a saved question went, and never says 'wrong'", () => {
    expect(selfMarkMessage("saved")).toMatch(/Fix your mistakes/);
    expect(selfMarkMessage("fixed")).toMatch(/Fixed/);
    expect(selfMarkMessage("understood")).toMatch(/understood/i);
    for (const o of ["saved", "fixed", "understood"] as const) expect(selfMarkMessage(o)).not.toMatch(/wrong/i);
  });
});
