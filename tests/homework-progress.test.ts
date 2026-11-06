import { describe, expect, it } from "vitest";
import {
  markOf,
  parseProgressQuery,
  planProgress,
  summarizeDay,
  type ProgressEvent,
  type ProgressItem,
} from "@/lib/homework/progress";

const W = "subjective" as const;
const M = "mcq" as const;

function ev(questionId: string, kind: ProgressEvent["kind"], at: string, mark?: "understood" | "review"): ProgressEvent {
  return { questionId, kind, at, ...(mark ? { mark } : {}) };
}

describe("markOf: one question's mark", () => {
  it("a written question that was only revealed is not marked", () => {
    expect(markOf(W, [ev("q", "question_practiced", "2026-11-05T10:00:00Z")])).toBeNull();
  });

  it("a written question takes its latest self-mark", () => {
    expect(markOf(W, [ev("q", "self_mark", "2026-11-05T10:00:00Z", "understood")])).toBe("understood");
    expect(
      markOf(W, [
        ev("q", "self_mark", "2026-11-05T10:00:00Z", "understood"),
        ev("q", "self_mark", "2026-11-05T11:00:00Z", "review"),
      ])
    ).toBe("review");
  });

  it("reads drill rows on a written question as marks too, latest first", () => {
    expect(markOf(W, [ev("q", "answer_wrong", "2026-11-05T10:00:00Z")])).toBe("review");
    expect(
      markOf(W, [ev("q", "answer_wrong", "2026-11-05T10:00:00Z"), ev("q", "answer_correct", "2026-11-05T12:00:00Z")])
    ).toBe("understood");
  });

  it("an MCQ counts as answered once it is revealed or picked anywhere", () => {
    expect(markOf(M, [])).toBeNull();
    expect(markOf(M, [ev("q", "question_practiced", "2026-11-05T10:00:00Z")])).toBe("answered");
    expect(markOf(M, [ev("q", "answer_wrong", "2026-11-05T10:00:00Z")])).toBe("answered");
  });

  // JEE Mains homework (2026-11-06): a numeric question is shown as written (no
  // number input), with Understood / Review later, so it is marked like one; a
  // reveal alone would let the plan page call a day done that the day page does not.
  it("a numeric question is marked like a written one", () => {
    expect(markOf("numeric", [ev("q", "question_practiced", "2026-11-05T10:00:00Z")])).toBeNull();
    expect(markOf("numeric", [ev("q", "self_mark", "2026-11-05T10:00:00Z", "review")])).toBe("review");
  });
});

describe("summarizeDay", () => {
  it("counts slots, not parts: a case study is done only when every part is", () => {
    const slots = [
      [{ id: "a", format: W }],
      [
        { id: "b1", format: M },
        { id: "b2", format: M },
      ],
    ];
    expect(summarizeDay(slots, { a: "understood", b1: "answered" }, new Set())).toEqual({
      total: 2,
      done: 1,
      toReview: 0,
      complete: false,
    });
    expect(summarizeDay(slots, { a: "understood", b1: "answered", b2: "answered" }, new Set())).toMatchObject({
      done: 2,
      complete: true,
    });
  });

  it("counts questions waiting in the drill as to review", () => {
    const slots = [[{ id: "a", format: W }], [{ id: "b", format: W }]];
    expect(summarizeDay(slots, { a: "review", b: "understood" }, new Set(["a"]))).toMatchObject({
      done: 2,
      toReview: 1,
      complete: true,
    });
  });
});

describe("planProgress", () => {
  // Three days of two questions each; day 2 has a two-part case study.
  const items: ProgressItem[] = [
    { day: 1, position: 1, questionId: "d1a", format: W },
    { day: 1, position: 2, questionId: "d1b", format: M },
    { day: 2, position: 1, questionId: "d2a", format: W },
    { day: 2, position: 2, questionId: "d2b1", format: M },
    { day: 2, position: 2, questionId: "d2b2", format: M },
    { day: 3, position: 1, questionId: "d3a", format: W },
    { day: 3, position: 2, questionId: "d3b", format: W },
  ];

  it("nothing marked: not started, next day is day 1", () => {
    const p = planProgress(items, []);
    expect(p.started).toBe(false);
    expect(p.doneDays).toBe(0);
    expect(p.nextDay).toBe(1);
    expect(p.days.map((d) => d.total)).toEqual([2, 2, 2]);
  });

  it("days done, partial day and review counts", () => {
    const events = [
      ev("d1a", "self_mark", "2026-11-01T10:00:00Z", "review"),
      ev("d1a", "answer_wrong", "2026-11-01T10:00:00Z"),
      ev("d1b", "question_practiced", "2026-11-01T10:01:00Z"),
      ev("d2a", "self_mark", "2026-11-02T10:00:00Z", "understood"),
      ev("d2b1", "question_practiced", "2026-11-02T10:01:00Z"),
    ];
    const p = planProgress(items, events);
    expect(p.started).toBe(true);
    expect(p.doneDays).toBe(1);
    expect(p.toReview).toBe(1);
    expect(p.days[0]).toEqual({ day: 1, total: 2, done: 2, toReview: 1, complete: true });
    // The case study has one of two parts answered, so day 2 is 1 of 2.
    expect(p.days[1]).toMatchObject({ day: 2, done: 1, complete: false });
    expect(p.nextDay).toBe(2);
  });

  it("a day the student has started comes before an earlier day never opened", () => {
    const events = [ev("d3a", "self_mark", "2026-11-03T10:00:00Z", "understood")];
    expect(planProgress(items, events).nextDay).toBe(3);
  });

  it("with no day started, next is the first day not done", () => {
    const events = [
      ev("d1a", "self_mark", "2026-11-01T10:00:00Z", "understood"),
      ev("d1b", "question_practiced", "2026-11-01T10:01:00Z"),
    ];
    expect(planProgress(items, events).nextDay).toBe(2);
  });

  it("a question fixed in the drill is no longer to review", () => {
    const events = [
      ev("d1a", "answer_wrong", "2026-11-01T10:00:00Z"),
      ev("d1a", "answer_correct", "2026-11-04T10:00:00Z"),
    ];
    expect(planProgress(items, events).toReview).toBe(0);
  });

  it("every day done: no next day", () => {
    const all = items.map((it) =>
      it.format === W ? ev(it.questionId, "self_mark", "2026-11-01T10:00:00Z", "understood") : ev(it.questionId, "question_practiced", "2026-11-01T10:00:00Z")
    );
    const p = planProgress(items, all);
    expect(p.doneDays).toBe(3);
    expect(p.nextDay).toBeNull();
  });

  it("ignores events for questions outside the plan", () => {
    const p = planProgress(items, [ev("other", "self_mark", "2026-11-01T10:00:00Z", "understood")]);
    expect(p.started).toBe(false);
  });
});

describe("parseProgressQuery: the route's input", () => {
  const q = (s: string) => parseProgressQuery(new URLSearchParams(s));

  it("takes a plan slug, and a day for one day page", () => {
    expect(q("plan=mh-hsc-12-physics")).toEqual({ ok: true, slug: "mh-hsc-12-physics" });
    expect(q("plan=mh-hsc-12-physics&day=6")).toEqual({ ok: true, slug: "mh-hsc-12-physics", day: 6 });
  });

  it("refuses a missing or malformed slug and a bad day", () => {
    expect(q("").ok).toBe(false);
    expect(q("plan=Bad%20Slug").ok).toBe(false);
    expect(q(`plan=${"a".repeat(81)}`).ok).toBe(false);
    for (const d of ["0", "-1", "1.5", "abc", "10001"]) expect(q(`plan=cbse-12-physics&day=${d}`).ok).toBe(false);
  });
});
