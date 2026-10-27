import { describe, expect, it, vi } from "vitest";
import { chapterView, homesOf, lessonView, localProgress, type Outline } from "@/lib/learn/lessonState";

vi.mock("server-only", () => ({}));
const { toAnswerResult } = await import("@/lib/learn/answer");

// Pool "algebra": A ← B ← C, D standalone, E (draft) ← A.
const pool = {
  title: "Algebra",
  concepts: [
    { code: "A", slug: "a", title: "Concept A", one_liner: "a", grp: "g1", tier: "core", prereqs: [], published: true },
    { code: "B", slug: "b", title: "Concept B", one_liner: "b", grp: "g1", tier: "core", prereqs: ["A"], published: true },
    { code: "C", slug: "c", title: "Concept C", one_liner: "c", grp: "g2", tier: "adv", prereqs: ["B"], published: true },
    { code: "D", slug: "d", title: "Concept D", one_liner: "d", grp: "g2", tier: "core", prereqs: [], published: true },
    { code: "E", slug: "e", title: "Concept E", one_liner: "e", grp: "g2", tier: "core", prereqs: ["A"], published: false },
  ],
};

const outline = (slug: string, chapters: Outline["chapters"]): Outline => ({
  slug,
  title: slug,
  exam: slug.replace(/-maths$/, ""),
  subject: "maths",
  standard: 12,
  chapters,
  pools: { algebra: pool },
});

// Board X covers A, B, C in one chapter; board Y splits: "first" has A and D, "second" has C (not B).
const X = outline("x-maths", [{ slug: "algebra", title: "Algebra", standard: 12, pyqvault: null, parts: [{ chapter: "algebra", concepts: ["A", "B", "C"] }] }]);
const Y = outline("y-maths", [
  { slug: "first", title: "First", standard: 12, pyqvault: null, parts: [{ chapter: "algebra", concepts: ["A", "D"] }] },
  { slug: "second", title: "Second", standard: 12, pyqvault: "second-pyq", parts: [{ chapter: "algebra", concepts: ["C"] }] },
]);

describe("homesOf", () => {
  it("lists every course chapter that shows the concept, in course order", () => {
    expect(homesOf([X, Y], "algebra", "C")).toEqual([
      { course: "x-maths", courseTitle: "x-maths", chapter: "algebra", chapterTitle: "Algebra" },
      { course: "y-maths", courseTitle: "y-maths", chapter: "second", chapterTitle: "Second" },
    ]);
    expect(homesOf([X, Y], "algebra", "D")).toEqual([{ course: "y-maths", courseTitle: "y-maths", chapter: "first", chapterTitle: "First" }]);
    expect(homesOf([X, Y], "algebra", "E")).toEqual([]);
  });
});

describe("lessonView", () => {
  const scopeX = new Set(["A", "B", "C"]);

  it("opens everything for a guest, naming what the concept builds on", () => {
    const v = lessonView({ pool, scope: scopeX, code: "C", learner: new Map(), signedIn: false });
    expect(v.state).toBe("available");
    expect(v.locked).toBe(false);
    expect(v.buildsOn).toEqual([{ slug: "b", title: "Concept B" }]);
  });

  it("locks a concept for a signed-in student until its prerequisites in the course are mastered", () => {
    expect(lessonView({ pool, scope: scopeX, code: "C", learner: new Map(), signedIn: true }).locked).toBe(true);
    const ready = lessonView({ pool, scope: scopeX, code: "C", learner: new Map([["A", "mastered"], ["B", "mastered"]]), signedIn: true });
    expect(ready).toMatchObject({ state: "available", locked: false });
  });

  it("counts a prerequisite the course does not cover as known", () => {
    // Board Y shows C without B: only A, which Y covers, must be mastered.
    const scopeY = new Set(["A", "D", "C"]);
    expect(lessonView({ pool, scope: scopeY, code: "C", learner: new Map([["A", "mastered"]]), signedIn: true }).locked).toBe(false);
  });

  it("opens a locked concept as a refresher when it is a prerequisite of the concept the student came from", () => {
    const v = lessonView({ pool, scope: scopeX, code: "A", learner: new Map(), signedIn: true, from: "c" });
    expect(v.refresher).toEqual({ slug: "c", title: "Concept C" });
    const locked = lessonView({ pool, scope: scopeX, code: "B", learner: new Map(), signedIn: true, from: "c" });
    expect(locked).toMatchObject({ locked: false, refresher: { slug: "c", title: "Concept C" } });
  });

  it("ignores a refresher link that does not point back to a prerequisite", () => {
    const v = lessonView({ pool, scope: scopeX, code: "C", learner: new Map(), signedIn: true, from: "a" });
    expect(v).toMatchObject({ locked: true, refresher: null });
  });

  it("offers the next concept in the course once this one is mastered", () => {
    const v = lessonView({ pool, scope: scopeX, code: "A", learner: new Map(), signedIn: true });
    expect(v.next).toEqual({ slug: "b", title: "Concept B" });
    expect(lessonView({ pool, scope: scopeX, code: "C", learner: new Map([["A", "mastered"], ["B", "mastered"]]), signedIn: true }).next).toBeNull();
  });
});

describe("chapterView", () => {
  const NOW = Date.parse("2026-10-27T10:00:00Z");

  it("lists the course chapter's concepts in order with each one's state", () => {
    const rows = chapterView(Y, "first", new Map(), true, NOW)!;
    expect(rows.concepts.map((c) => [c.code, c.state])).toEqual([
      ["A", "available"],
      ["D", "available"],
    ]);
    expect(rows.title).toBe("First");
  });

  it("marks a mastered concept due for review when its time has come", () => {
    const learner = new Map([["algebra/A", { state: "mastered" as const, nextReviewAt: "2026-10-27T09:00:00Z" }]]);
    const rows = chapterView(X, "algebra", learner, true, NOW)!;
    expect(rows.concepts.map((c) => [c.code, c.state, c.due])).toEqual([
      ["A", "mastered", true],
      ["B", "available", false],
      ["C", "locked", false],
    ]);
  });

  it("is null for a chapter the course does not have", () => {
    expect(chapterView(X, "nope", new Map(), false, NOW)).toBeNull();
  });
});

describe("localProgress (a guest's answers, kept in the page)", () => {
  it("counts each question by its latest answer, like the database", () => {
    const a = (itemId: string, correct: boolean) => ({ itemId, correct });
    expect(localProgress([a("q1", true), a("q2", false)], 3)).toEqual({ streak: 1, toRetry: 1, mastered: false });
    expect(localProgress([a("q1", true), a("q2", false), a("q3", true), a("q2", true), a("q4", true)], 3)).toEqual({
      streak: 4,
      toRetry: 0,
      mastered: true,
    });
  });
});

describe("toAnswerResult", () => {
  const graded = {
    correct: false,
    correct_key: "B",
    misconception_code: "C01-M1",
    remediation: "Check $x$.",
    solution: { steps: ["Step $1$.", "Step 2."] },
  };

  it("renders a guest's checked answer with its explanation and solution, and says nothing was saved", () => {
    const r = toAnswerResult(graded, false);
    expect(r).toMatchObject({ correct: false, correctKey: "B", saved: false, progress: null, route: null });
    expect(r.remediation?.[0].type).toBe("paragraph");
    expect(r.solution.steps).toHaveLength(2);
    expect(r.solution.steps[0].some((n) => n.type === "math")).toBe(true);
  });

  it("carries a signed-in student's progress, review and route", () => {
    const r = toAnswerResult(
      {
        ...graded,
        streak: 2,
        to_retry: 1,
        needed: 3,
        state: "learning",
        mastered_now: false,
        reviewing: false,
        review_done: false,
        review_passed: false,
        review_correct: 0,
        review_needed: 2,
        next_review_at: null,
        route: { kind: "refresher", chapter: "algebra", concept: "a", title: "Concept A" },
      },
      true,
    );
    expect(r.saved).toBe(true);
    expect(r.progress).toEqual({
      streak: 2,
      toRetry: 1,
      needed: 3,
      mastered: false,
      masteredNow: false,
      review: { reviewing: false, done: false, passed: false, correct: 0, needed: 2, nextReviewAt: null },
    });
    expect(r.route).toEqual({ kind: "refresher", chapter: "algebra", concept: "a", title: "Concept A" });
  });

  it("has no explanation for a right answer", () => {
    expect(toAnswerResult({ ...graded, correct: true, misconception_code: null, remediation: null }, false).remediation).toBeNull();
  });
});
