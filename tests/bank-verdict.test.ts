import { describe, it, expect } from "vitest";
import {
  gradePick,
  gradePicks,
  correctlyAnsweredIds,
  answerDedupeKey,
  practiceEvents,
  type AnswerKey,
  type PickVerdict,
} from "@/lib/questions/bankVerdict";

const uuid = (n: number) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const USER = "11111111-1111-4111-8111-111111111111";
// 2026-10-02 10:00 IST
const NOW = new Date("2026-10-02T04:30:00.000Z");

const keyed = (correct: string, extra: Partial<AnswerKey> = {}): AnswerKey => ({
  format: "mcq",
  cancelled: false,
  options: ["A", "B", "C", "D"].map((label) => ({ label, isCorrect: label === correct })),
  ...extra,
});

describe("gradePick — the server decides right or wrong", () => {
  it("marks the keyed option right and any other wrong", () => {
    expect(gradePick("B", keyed("B"))).toEqual({ chose: "B", correct: true });
    expect(gradePick("A", keyed("B"))).toEqual({ chose: "A", correct: false });
  });

  it("compares labels case-insensitively, since stored labels are upper-case by convention, not by constraint", () => {
    const key: AnswerKey = { ...keyed("B"), options: keyed("B").options.map((o) => ({ ...o, label: o.label.toLowerCase() })) };
    expect(gradePick("B", key)).toEqual({ chose: "B", correct: true });
  });

  it("treats a missing format as MCQ — the column defaults to mcq and the view-model omits it", () => {
    expect(gradePick("C", keyed("C", { format: null }))).toEqual({ chose: "C", correct: true });
  });

  // Every "not gradable" case returns null rather than `correct: false`: a row
  // the bank cannot grade must never put a question in the student's drill.
  it("refuses a question it could not find (not PUBLIC, or deleted since the page loaded)", () => {
    expect(gradePick("A", undefined)).toBeNull();
  });

  it("refuses a question with no keyed option — a data defect, not the student's miss", () => {
    const key: AnswerKey = { ...keyed("A"), options: keyed("A").options.map((o) => ({ ...o, isCorrect: false })) };
    expect(gradePick("A", key)).toBeNull();
  });

  it("refuses a question with two keyed options — there is no single verdict to give", () => {
    const key: AnswerKey = { ...keyed("A"), options: keyed("A").options.map((o) => ({ ...o, isCorrect: o.label <= "B" })) };
    expect(gradePick("A", key)).toBeNull();
  });

  it("refuses an officially cancelled question — no option is right (migration 0119)", () => {
    expect(gradePick("A", keyed("A", { cancelled: true }))).toBeNull();
  });

  it("refuses numeric and written questions — they have no options to tap", () => {
    expect(gradePick("A", keyed("A", { format: "numeric" }))).toBeNull();
    expect(gradePick("A", keyed("A", { format: "subjective" }))).toBeNull();
  });

  it("refuses a label the question does not carry", () => {
    const key: AnswerKey = { ...keyed("A"), options: keyed("A").options.filter((o) => o.label !== "D") };
    expect(gradePick("D", key)).toBeNull();
  });
});

describe("gradePicks — a batch", () => {
  it("keeps only the gradable picks", () => {
    const keys = new Map<string, AnswerKey>([
      [uuid(1), keyed("A")],
      [uuid(2), keyed("A", { cancelled: true })],
    ]);
    const verdicts = gradePicks({ [uuid(1)]: "B", [uuid(2)]: "A", [uuid(3)]: "A" }, keys);
    expect([...verdicts.entries()]).toEqual([[uuid(1), { chose: "B", correct: false }]]);
  });
});

describe("correctlyAnsweredIds — the only ids that need a prior-miss lookup", () => {
  it("returns the right answers alone", () => {
    const verdicts = new Map<string, PickVerdict>([
      [uuid(1), { chose: "A", correct: true }],
      [uuid(2), { chose: "B", correct: false }],
    ]);
    expect(correctlyAnsweredIds(verdicts)).toEqual([uuid(1)]);
  });
});

describe("answerDedupeKey — one ladder verdict per question per surface per IST day", () => {
  it("names the student, the question and the IST calendar day", () => {
    expect(answerDedupeKey("bank", USER, uuid(1), NOW)).toBe(`answer:bank:${USER}:${uuid(1)}:2026-10-02`);
  });

  it("rolls over at IST midnight, not UTC midnight", () => {
    // 23:59 IST on 1 Oct and 00:01 IST on 2 Oct are different student days,
    // although both fall on 1 Oct in UTC.
    const before = new Date("2026-10-01T18:29:00.000Z");
    const after = new Date("2026-10-01T18:31:00.000Z");
    expect(answerDedupeKey("bank", USER, uuid(1), before)).toMatch(/:2026-10-01$/);
    expect(answerDedupeKey("bank", USER, uuid(1), after)).toMatch(/:2026-10-02$/);
  });
});

describe("practiceEvents — the rows one batch writes", () => {
  const base = { surface: "bank" as const, userId: USER, now: NOW, priorWrongIds: new Set<string>() };

  it("writes a plain reveal row for a reveal with no pick, exactly as before verdicts existed", () => {
    const out = practiceEvents({ ...base, ids: [uuid(1)], verdicts: new Map() });
    expect(out.reveals).toEqual([
      { kind: "question_practiced", refId: uuid(1), refKind: "question", metadata: { surface: "bank" } },
    ]);
    expect(out.ladder).toEqual([]);
  });

  it("a WRONG pick: the reveal carries the verdict, and the miss enters the drill", () => {
    const out = practiceEvents({
      ...base,
      ids: [uuid(1)],
      verdicts: new Map([[uuid(1), { chose: "A", correct: false }]]),
    });
    expect(out.reveals).toEqual([
      {
        kind: "question_practiced",
        refId: uuid(1),
        refKind: "question",
        metadata: { surface: "bank", chose: "A", correct: false },
      },
    ]);
    expect(out.ladder).toEqual([
      {
        kind: "answer_wrong",
        refId: uuid(1),
        refKind: "question",
        metadata: { surface: "bank", chose: "A" },
        dedupeKey: answerDedupeKey("bank", USER, uuid(1), NOW),
      },
    ]);
  });

  it("a RIGHT pick on a question missed before is a recovery (answer_correct)", () => {
    const out = practiceEvents({
      ...base,
      ids: [uuid(1)],
      verdicts: new Map([[uuid(1), { chose: "C", correct: true }]]),
      priorWrongIds: new Set([uuid(1)]),
    });
    expect(out.ladder).toEqual([
      {
        kind: "answer_correct",
        refId: uuid(1),
        refKind: "question",
        metadata: { surface: "bank", chose: "C" },
        dedupeKey: answerDedupeKey("bank", USER, uuid(1), NOW),
      },
    ]);
  });

  it("a RIGHT pick on a question never missed writes no ladder row — answer_correct means a recovery", () => {
    // lib/mocks/correctEvents.ts: the symmetric version (every correct answer)
    // was measured and rejected. The verdict still lives on the reveal row.
    const out = practiceEvents({
      ...base,
      ids: [uuid(1)],
      verdicts: new Map([[uuid(1), { chose: "C", correct: true }]]),
    });
    expect(out.reveals[0].metadata).toEqual({ surface: "bank", chose: "C", correct: true });
    expect(out.ladder).toEqual([]);
  });

  it("writes one reveal per id, in batch order, mixing plain reveals and verdicts", () => {
    const out = practiceEvents({
      ...base,
      ids: [uuid(1), uuid(2), uuid(3)],
      verdicts: new Map([[uuid(2), { chose: "B", correct: false }]]),
    });
    expect(out.reveals.map((e) => e.refId)).toEqual([uuid(1), uuid(2), uuid(3)]);
    expect(out.ladder.map((e) => e.refId)).toEqual([uuid(2)]);
  });

  it("tags every row with the batch's surface", () => {
    const out = practiceEvents({
      ...base,
      surface: "guide",
      ids: [uuid(1)],
      verdicts: new Map([[uuid(1), { chose: "B", correct: false }]]),
    });
    expect(out.reveals[0].metadata?.surface).toBe("guide");
    expect(out.ladder[0].metadata?.surface).toBe("guide");
    expect(out.ladder[0].dedupeKey).toBe(answerDedupeKey("guide", USER, uuid(1), NOW));
  });
});
