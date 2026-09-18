/**
 * The quiz funnel's activity spine — both directions.
 *
 * WHY THIS MODULE EXISTS AT ALL: `quiz_taken` was in ACTIVITY_KINDS and in the
 * 0052 DB CHECK from day one, and carried a label in three separate surfaces
 * (activity/shape.ts, pmf/snapshot.ts, students/profileView.ts) — with ZERO
 * emitters anywhere in the codebase. Prod confirmed it: 0 rows, ever, while
 * /dashboard/pmf rendered "Daily quiz — 0 users" as though that were measured.
 *
 * The read side is tested as defensively as the write side because
 * user_activity.metadata is a schemaless jsonb column: nothing in the database
 * stops a row from arriving without a title or with a score of null, and the
 * student-facing history page must degrade rather than throw.
 */
import { describe, it, expect } from "vitest";
import { ACTIVITY_KINDS, sanitizeActivityEvent } from "@/lib/activity/events";
import { buildQuizTakenEvent, parseQuizAttempt, QUIZ_REF_KIND } from "@/lib/quiz/activity";

const input = {
  quizId: "11111111-2222-3333-4444-555555555555",
  slug: "nda-maths-quadratics-01",
  title: "NDA Maths · Quadratic Equations",
  score: 7,
  total: 10,
  correct: 7,
  incorrect: 2,
  notAttempted: 1,
};

describe("buildQuizTakenEvent — the emitter that was missing", () => {
  it("emits the kind the allowlist and the DB CHECK already reserved", () => {
    const ev = buildQuizTakenEvent(input);
    expect(ev.kind).toBe("quiz_taken");
    expect(ACTIVITY_KINDS).toContain(ev.kind);
  });

  it("refs the PUBLIC SLUG, not the quiz uuid, so history can link back to /quiz/<slug>", () => {
    // The uuid is unresolvable from a student surface: `quizzes` is admin-RLS,
    // so a history page holding only a uuid could not build a working link.
    const ev = buildQuizTakenEvent(input);
    expect(ev.refId).toBe("nda-maths-quadratics-01");
    expect(ev.refKind).toBe(QUIZ_REF_KIND);
  });

  it("DENORMALISES the title into metadata, because the student cannot join to quizzes", () => {
    // Same reason as above. Without this, every row in a history list would
    // read "Quiz" and the page would be useless.
    const ev = buildQuizTakenEvent(input);
    expect(ev.metadata?.title).toBe("NDA Maths · Quadratic Equations");
  });

  it("carries the whole score breakdown, so history needs no second source", () => {
    const ev = buildQuizTakenEvent(input);
    expect(ev.metadata).toMatchObject({
      quizId: input.quizId,
      score: 7,
      total: 10,
      correct: 7,
      incorrect: 2,
      notAttempted: 1,
    });
  });

  it("caps a long title — the row is an append-only log, and title is unbounded in the DB", () => {
    const ev = buildQuizTakenEvent({ ...input, title: "x".repeat(500) });
    expect((ev.metadata?.title as string).length).toBeLessThanOrEqual(200);
  });

  it("produces an event that survives the shared hardening path", () => {
    // sanitizeActivityEvent REJECTS an over-long refId rather than truncating,
    // so anything this builder emits must already be within its bounds.
    const res = sanitizeActivityEvent(buildQuizTakenEvent({ ...input, slug: "s".repeat(400) }));
    expect(res.ok).toBe(true);
  });

  it("sets no dedupeKey — a retake is legitimate history, not a duplicate", () => {
    expect(buildQuizTakenEvent(input).dedupeKey).toBeUndefined();
  });
});

const row = (over: Record<string, unknown> = {}) => ({
  ref_id: "nda-maths-quadratics-01",
  created_at: "2026-09-18T10:00:00.000Z",
  metadata: { title: "NDA Maths · Quadratic Equations", score: 7, total: 10, correct: 7, incorrect: 2, notAttempted: 1 },
  ...over,
});

describe("parseQuizAttempt — the read side degrades, never throws", () => {
  it("round-trips what the emitter wrote", () => {
    const ev = buildQuizTakenEvent(input);
    const view = parseQuizAttempt({
      ref_id: ev.refId ?? null,
      metadata: ev.metadata ?? {},
      created_at: "2026-09-18T10:00:00.000Z",
    });
    expect(view).toMatchObject({
      slug: "nda-maths-quadratics-01",
      title: "NDA Maths · Quadratic Equations",
      score: 7,
      total: 10,
    });
  });

  it("falls back to a generic title rather than rendering blank", () => {
    expect(parseQuizAttempt(row({ metadata: {} })).title).toBe("Quiz");
  });

  it("returns a null slug when ref_id is missing, so the caller can skip the link", () => {
    // Not hypothetical: ref_id is nullable in 0052, and a hand-inserted or
    // backfilled row may carry none.
    expect(parseQuizAttempt(row({ ref_id: null })).slug).toBeNull();
  });

  it("nulls a non-numeric score instead of rendering NaN", () => {
    // jsonb has no schema — a string here is a real possibility, and
    // `Number("seven")` renders as NaN on the page.
    const view = parseQuizAttempt(row({ metadata: { title: "Q", score: "seven", total: 10 } }));
    expect(view.score).toBeNull();
    expect(view.total).toBe(10);
  });

  it("survives metadata that is not an object at all", () => {
    expect(() => parseQuizAttempt(row({ metadata: null }))).not.toThrow();
    expect(parseQuizAttempt(row({ metadata: null })).title).toBe("Quiz");
  });

  it("keeps the timestamp verbatim — formatting is the render layer's job", () => {
    expect(parseQuizAttempt(row()).takenAt).toBe("2026-09-18T10:00:00.000Z");
  });
});
