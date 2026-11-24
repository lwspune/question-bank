import { describe, expect, it } from "vitest";
import {
  topProgress,
  topProgressAction,
  topProgressDetail,
  topProgressHeadline,
  type TopItem,
} from "@/lib/homework/topProgress";
import { parseProgressQuery, type ProgressEvent } from "@/lib/homework/progress";

const M = "mcq" as const;
const W = "subjective" as const;

type Ch = { id: string; name: string; orderIndex: number | null };
const ALG: Ch = { id: "c-alg", name: "Algebra", orderIndex: 1 };
const PROB: Ch = { id: "c-prob", name: "Probability", orderIndex: 2 };
const TRIG: Ch = { id: "c-trig", name: "Trigonometry", orderIndex: 3 };

/** One slot of the plan: its parts' ids, the chapter of each part (first part decides). */
function slot(day: number, position: number, chapter: Ch, ids: string[], format: TopItem["format"] = M, laterChapter?: Ch): TopItem[] {
  return ids.map((questionId, i) => ({
    day,
    position,
    sub: i + 1,
    questionId,
    format,
    chapter: i === 0 ? chapter : laterChapter ?? chapter,
  }));
}

/** n single-question slots of a chapter, from day `startDay`, ids `<prefix>1..n`. */
function chapterSlots(chapter: Ch, prefix: string, n: number, startDay = 1, format: TopItem["format"] = M): TopItem[] {
  return Array.from({ length: n }, (_, i) => slot(startDay + i, 1, chapter, [`${prefix}${i + 1}`], format)).flat();
}

function ev(questionId: string, kind: ProgressEvent["kind"], at: string, mark?: "understood" | "review"): ProgressEvent {
  return { questionId, kind, at, ...(mark ? { mark } : {}) };
}
const seen = (ids: string[], at = "2026-11-20T10:00:00Z") => ids.map((id) => ev(id, "question_practiced", at));
const range = (prefix: string, from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => `${prefix}${from + i}`);

describe("topProgress: which questions make a chapter's Top 10", () => {
  it("takes each chapter's first ten slots in plan order, in book order of chapters", () => {
    const items = [...chapterSlots(PROB, "p", 12, 1), ...chapterSlots(ALG, "a", 3, 20)];
    const p = topProgress(items, []);
    expect(p.chapters.map((c) => [c.name, c.total])).toEqual([
      ["Algebra", 3],
      ["Probability", 10],
    ]);
    expect(p.totalChapters).toBe(2);
  });

  it("does not count a question beyond the ten", () => {
    const items = chapterSlots(PROB, "p", 12);
    const p = topProgress(items, seen(["p11", "p12"]));
    expect(p.chapters[0]).toMatchObject({ done: 0, started: false });
    expect(p.started).toBe(false);
  });

  it("a case study is one question, filed under the chapter of its first part", () => {
    const items = [...slot(1, 1, ALG, ["cs1", "cs2", "cs3"], M, TRIG), ...slot(2, 1, TRIG, ["t1"])];
    const p = topProgress(items, seen(["cs1", "cs2"]));
    const alg = p.chapters.find((c) => c.name === "Algebra")!;
    const trig = p.chapters.find((c) => c.name === "Trigonometry")!;
    expect(alg).toMatchObject({ total: 1, done: 0, started: true });
    expect(trig).toMatchObject({ total: 1, done: 0, started: false });
    expect(topProgress(items, seen(["cs1", "cs2", "cs3"])).chapters[0]).toMatchObject({ done: 1, complete: true });
  });
});

describe("topProgress: done and started use the homework day rules", () => {
  it("a written question needs Understood or Review later, not a reveal", () => {
    const items = chapterSlots(ALG, "a", 2, 1, W);
    const revealed = topProgress(items, seen(["a1", "a2"]));
    expect(revealed.chapters[0]).toMatchObject({ done: 0, started: false });
    const marked = topProgress(items, [
      ev("a1", "self_mark", "2026-11-20T10:00:00Z", "understood"),
      ev("a2", "self_mark", "2026-11-20T10:01:00Z", "review"),
    ]);
    expect(marked.chapters[0]).toMatchObject({ done: 2, complete: true });
    expect(marked.doneChapters).toBe(1);
  });

  it("counts questions waiting in Fix your mistakes", () => {
    const items = chapterSlots(ALG, "a", 3);
    const p = topProgress(items, [ev("a1", "answer_wrong", "2026-11-20T10:00:00Z"), ev("a2", "answer_wrong", "2026-11-20T10:00:00Z")]);
    expect(p.chapters[0].toReview).toBe(2);
    expect(p.toReview).toBe(2);
  });
});

describe("topProgress: the next chapter", () => {
  const items = [...chapterSlots(ALG, "a", 10, 1), ...chapterSlots(PROB, "p", 10, 20), ...chapterSlots(TRIG, "t", 10, 40)];

  it("is the first chapter not done when nothing is half-done", () => {
    const p = topProgress(items, seen(range("a", 1, 10)));
    expect(p.next).toMatchObject({ name: "Probability", slug: "probability", done: 0, total: 10, started: false });
    expect(p.doneChapters).toBe(1);
  });

  it("continues the half-done chapter touched last", () => {
    const events = [...seen(["p1", "p2"], "2026-11-20T10:00:00Z"), ...seen(["t1"], "2026-11-21T10:00:00Z")];
    expect(topProgress(items, events).next).toMatchObject({ name: "Trigonometry", done: 1, started: true });
    const later = [...events, ...seen(["p3"], "2026-11-22T10:00:00Z")];
    expect(topProgress(items, later).next).toMatchObject({ name: "Probability", done: 3 });
  });

  it("is null when every chapter is done", () => {
    const p = topProgress(items, seen([...range("a", 1, 10), ...range("p", 1, 10), ...range("t", 1, 10)]));
    expect(p.next).toBeNull();
    expect(p.doneChapters).toBe(3);
  });

  it("ignores a No to V: it marks nothing", () => {
    const p = topProgress(items, [ev("p1", "v_not_understood", "2026-11-20T10:00:00Z")]);
    expect(p.started).toBe(false);
    expect(p.next).toMatchObject({ name: "Algebra", started: false });
  });
});

describe("the box's words", () => {
  const items = [...chapterSlots(ALG, "a", 10, 1), ...chapterSlots(PROB, "p", 10, 20), ...chapterSlots(TRIG, "t", 7, 40)];

  it("never opens with a zero", () => {
    const p = topProgress(items, seen(["p1"]));
    expect(topProgressHeadline(p)).toBe("Next up: Probability");
  });

  it("names chapters done and the next one", () => {
    const p = topProgress(items, seen([...range("a", 1, 10), "p1", "p2", "p3"]));
    expect(topProgressHeadline(p)).toBe("1 of 3 chapters done. Next up: Probability");
    expect(topProgressDetail(p)).toBe("You have marked 3 of its 10 questions.");
    expect(topProgressAction(p)).toBe("Continue: Probability");
  });

  it("says Start for a chapter not begun, with no detail line", () => {
    const p = topProgress(items, seen(range("a", 1, 10)));
    expect(topProgressAction(p)).toBe("Start: Probability");
    expect(topProgressDetail(p)).toBeNull();
  });

  it("uses the chapter's own count when it has fewer than ten", () => {
    const p = topProgress(items, seen([...range("a", 1, 10), ...range("p", 1, 10), "t1"]));
    expect(topProgressDetail(p)).toBe("You have marked 1 of its 7 questions.");
  });

  it("says when every chapter is done", () => {
    const p = topProgress(items, seen([...range("a", 1, 10), ...range("p", 1, 10), ...range("t", 1, 7)]));
    expect(topProgressHeadline(p)).toBe("You have done the Top 10 of all 3 chapters.");
    expect(topProgressAction(p)).toBe("Go to Daily homework");
    expect(topProgressDetail(p)).toBe("Next: the daily homework, five questions a day, the most asked first.");
  });

  it("says it plainly for a plan of one chapter", () => {
    const one = chapterSlots(ALG, "a", 2);
    expect(topProgressHeadline(topProgress(one, seen(["a1", "a2"])))).toBe("You have done the Top 10 of this chapter.");
  });
});

describe("parseProgressQuery: the Top 10 view", () => {
  it("accepts view=top", () => {
    expect(parseProgressQuery(new URLSearchParams("plan=nda-maths&view=top"))).toEqual({ ok: true, slug: "nda-maths", view: "top" });
  });

  it("refuses any other view, and a day with it", () => {
    expect(parseProgressQuery(new URLSearchParams("plan=nda-maths&view=all")).ok).toBe(false);
    expect(parseProgressQuery(new URLSearchParams("plan=nda-maths&view=top&day=2")).ok).toBe(false);
  });

  it("leaves the existing forms unchanged", () => {
    expect(parseProgressQuery(new URLSearchParams("plan=nda-maths"))).toEqual({ ok: true, slug: "nda-maths" });
    expect(parseProgressQuery(new URLSearchParams("plan=nda-maths&day=3"))).toEqual({ ok: true, slug: "nda-maths", day: 3 });
  });
});
