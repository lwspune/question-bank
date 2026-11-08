/**
 * The Review tab's "To fix" list (2026-11-08, step 2 of the Home · Review ·
 * Progress redesign). Pure core src/lib/review/fixList.ts.
 *
 * Every question waiting in Fix your mistakes, grouped by chapter, each with
 * WHY it is there: the miss that put it on the list. The list is the drill's
 * own due pool (lib/drill/compose loadOwnPool), so its total is the badge's
 * number by construction; this core only groups and labels it.
 */
import { describe, it, expect } from "vitest";
import {
  buildFixList,
  chapterQuestions,
  fixSubjects,
  latestMisses,
  parseReviewParams,
  reasonLabel,
  reasonOf,
  type MissRow,
} from "@/lib/review/fixList";
import type { DueQuestion } from "@/lib/drill/select";

const miss = (over: Partial<MissRow> = {}): MissRow => ({
  questionId: "q1",
  kind: "answer_wrong",
  at: "2026-11-08T10:00:00Z",
  surface: "bank",
  selfMark: null,
  mockId: null,
  ...over,
});

const due = (questionId: string, chapterId: string, chapter: string, lastWrongAt: string, subject = "Mathematics"): DueQuestion => ({
  questionId,
  chapter,
  chapterId,
  subject,
  place: `${subject} · NDA`,
  exam: "NDA",
  subtopic: "",
  lastWrongAt,
});

describe("reasonOf: why a question is on the list", () => {
  it("a No to V's explanation", () => {
    expect(reasonOf(miss({ kind: "v_not_understood", surface: "v" }))).toBe("v_unclear");
  });

  it("a Review later tap, on any page, even inside the drill", () => {
    expect(reasonOf(miss({ selfMark: "review", surface: "board" }))).toBe("review_later");
    expect(reasonOf(miss({ selfMark: "review", surface: "drill" }))).toBe("review_later");
  });

  it("a mock miss carries no surface", () => {
    expect(reasonOf(miss({ surface: null, mockId: "m1" }))).toBe("mock");
  });

  it("the drill, the question of the day and V's question card each say so", () => {
    expect(reasonOf(miss({ surface: "drill" }))).toBe("drill");
    expect(reasonOf(miss({ surface: "daily" }))).toBe("daily");
    expect(reasonOf(miss({ surface: "v" }))).toBe("v_question");
  });

  it("the bank, /board and anything else is practice", () => {
    expect(reasonOf(miss({ surface: "bank" }))).toBe("practice");
    expect(reasonOf(miss({ surface: "board" }))).toBe("practice");
    expect(reasonOf(miss({ surface: "something-new" }))).toBe("practice");
  });
});

describe("reasonLabel: what the student reads", () => {
  it("names the mock when its title is known, else says a mock", () => {
    expect(reasonLabel("mock", "NDA I 2024 Mathematics")).toBe("Wrong in NDA I 2024 Mathematics");
    expect(reasonLabel("mock", null)).toBe("Wrong in a mock");
  });

  it("speaks to the student about their own act", () => {
    expect(reasonLabel("v_unclear")).toBe("You told V you didn't understand");
    expect(reasonLabel("review_later")).toBe("You marked Review later");
    expect(reasonLabel("practice")).toBe("Wrong in practice");
    expect(reasonLabel("drill")).toBe("Wrong again in Fix your mistakes");
    expect(reasonLabel("daily")).toBe("Wrong in the question of the day");
    expect(reasonLabel("v_question")).toBe("Wrong in a question V asked");
  });
});

describe("latestMisses: the miss that put each question on the list", () => {
  it("keeps the newest miss per question, whatever order the rows come in", () => {
    const out = latestMisses([
      miss({ questionId: "a", at: "2026-11-08T12:00:00Z", kind: "v_not_understood", surface: "v" }),
      miss({ questionId: "a", at: "2026-11-01T12:00:00Z", surface: null, mockId: "m1" }),
      miss({ questionId: "b", at: "2026-11-02T12:00:00Z" }),
    ]);
    expect(out.get("a")?.kind).toBe("v_not_understood");
    expect(out.get("b")?.at).toBe("2026-11-02T12:00:00Z");
    expect(out.size).toBe(2);
  });
});

describe("buildFixList: the chapters, most to fix first", () => {
  const pool = [
    due("a", "c1", "Probability", "2026-11-01T00:00:00Z"),
    due("b", "c1", "Probability", "2026-11-05T00:00:00Z"),
    due("c", "c1", "Probability", "2026-11-06T00:00:00Z"),
    due("d", "c2", "Matrices", "2026-11-07T00:00:00Z"),
    due("e", "c3", "Vectors", "2026-11-02T00:00:00Z"),
  ];
  const misses = latestMisses([
    miss({ questionId: "a", surface: null, mockId: "m1" }),
    miss({ questionId: "b", selfMark: "review" }),
    miss({ questionId: "c", kind: "v_not_understood", surface: "v" }),
    miss({ questionId: "d" }),
    miss({ questionId: "e", surface: "drill" }),
  ]);
  const list = buildFixList(pool, misses, new Set(["a", "d"]));

  it("totals the whole pool, so it is the badge's number", () => {
    expect(list.total).toBe(5);
    expect(list.inPlan).toBe(2);
  });

  it("orders chapters by how many wait, then by the newest miss", () => {
    expect(list.chapters.map((c) => c.name)).toEqual(["Probability", "Matrices", "Vectors"]);
  });

  it("breaks each chapter down by reason: wrong, Review later, didn't understand V", () => {
    expect(list.chapters[0]).toMatchObject({ chapterId: "c1", count: 3, wrong: 1, reviewLater: 1, vUnclear: 1, inPlan: 1 });
    expect(list.chapters[2]).toMatchObject({ chapterId: "c3", count: 1, wrong: 1, reviewLater: 0, vUnclear: 0, inPlan: 0 });
  });

  it("counts a question with no recorded reason as wrong rather than losing it", () => {
    const l = buildFixList([due("z", "c9", "Limits", "2026-11-01T00:00:00Z")], new Map(), new Set());
    expect(l.chapters[0]).toMatchObject({ count: 1, wrong: 1 });
  });

  it("keeps a question with no chapter in the total, under no chapter row", () => {
    const noChapter: DueQuestion = { ...due("y", "", "", "2026-11-01T00:00:00Z"), chapterId: null };
    const l = buildFixList([...pool, noChapter], misses, new Set());
    expect(l.total).toBe(6);
    expect(l.chapters.reduce((n, c) => n + c.count, 0)).toBe(5);
  });
});

describe("chapterQuestions: one chapter's questions, newest miss first", () => {
  const pool = [
    due("a", "c1", "Probability", "2026-11-01T00:00:00Z"),
    due("b", "c1", "Probability", "2026-11-05T00:00:00Z"),
    due("d", "c2", "Matrices", "2026-11-07T00:00:00Z"),
  ];
  const misses = latestMisses([miss({ questionId: "a", surface: null, mockId: "m1" }), miss({ questionId: "b", selfMark: "review" })]);

  it("lists only that chapter, newest first, with each question's reason and plan mark", () => {
    expect(chapterQuestions(pool, "c1", misses, new Set(["a"]))).toEqual([
      { questionId: "b", reason: "review_later", mockId: null, at: "2026-11-05T00:00:00Z", inPlan: false },
      { questionId: "a", reason: "mock", mockId: "m1", at: "2026-11-01T00:00:00Z", inPlan: true },
    ]);
  });
});

describe("parseReviewParams: the page's address", () => {
  const C = "1f478ef1-4dcb-4cb2-a6d5-8b2a6e7b986b";

  it("opens To fix by default", () => {
    expect(parseReviewParams({})).toEqual({ list: "fix", chapterId: null, subject: null });
  });

  it("opens Saved with list=saved", () => {
    expect(parseReviewParams({ list: "saved" })).toEqual({ list: "saved", chapterId: null, subject: null });
  });

  it("opens one chapter's questions, and ignores a chapter that is not a uuid", () => {
    expect(parseReviewParams({ chapter: C.toUpperCase() })).toEqual({ list: "fix", chapterId: C, subject: null });
    expect(parseReviewParams({ chapter: "x' or 1=1" })).toEqual({ list: "fix", chapterId: null, subject: null });
  });

  it("ignores anything else, including a repeated parameter", () => {
    expect(parseReviewParams({ list: "nope" })).toEqual({ list: "fix", chapterId: null, subject: null });
    expect(parseReviewParams({ list: ["saved", "fix"] })).toEqual({ list: "fix", chapterId: null, subject: null });
  });
});

/**
 * Subject chips on To fix (2026-11-09, step 4): shown when the waiting
 * questions span more than one subject; a chip narrows the chapters, the total
 * and the lead button to that subject.
 */
describe("subject chips", () => {
  const pool = [
    due("a", "c1", "Probability", "2026-11-01T00:00:00Z"),
    due("b", "c1", "Probability", "2026-11-05T00:00:00Z"),
    due("c", "c2", "Motion", "2026-11-06T00:00:00Z", "Physics"),
  ];

  it("lists each subject with its count, most first", () => {
    expect(fixSubjects(pool)).toEqual([
      { subject: "Mathematics", count: 2 },
      { subject: "Physics", count: 1 },
    ]);
  });

  it("narrows the list to one subject", () => {
    const l = buildFixList(pool, new Map(), new Set(), "Physics");
    expect(l.total).toBe(1);
    expect(l.chapters.map((c) => c.name)).toEqual(["Motion"]);
  });

  it("reads a subject from the address, and ignores an overlong one", () => {
    expect(parseReviewParams({ subject: "Physics" })).toEqual({ list: "fix", chapterId: null, subject: "Physics" });
    expect(parseReviewParams({ subject: "x".repeat(200) })).toEqual({ list: "fix", chapterId: null, subject: null });
  });
});
