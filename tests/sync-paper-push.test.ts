/**
 * Pure tests for the paper push payload (vault → nda-tracker).
 *
 * The load-bearing assertion is Q-NUMBER PARITY WITH THE TAGS SHEET. Both walk
 * `groupBySet`, and they must keep agreeing: the printed Word paper, the Evalbee
 * OMR scan, the tags sheet and now the pushed exam all number the same question
 * the same way. If the push ever drifts, a student's Q7 response lands on a
 * different question in the tracker than the one they read — and nothing
 * downstream can detect it, because both sides look internally consistent.
 *
 * So rather than assert a hand-written expected numbering, these tests diff the
 * push against `buildTagRows` itself. A change to either loop has to change both.
 */
import { describe, expect, it } from "vitest";
import type { QuestionRow } from "@/lib/questions/query";
import { buildTagRows } from "@/lib/export/tagsSheet";
import {
  buildPaperPushPayload,
  pushDisabledReason,
  trackerExamId,
  pushTitle,
  planPush,
  type PriorSitting,
} from "@/lib/sync/paperPush";

const SUPABASE_URL = "https://example.supabase.co";

function q(over: Partial<QuestionRow> & { id: string }): QuestionRow {
  return {
    id: over.id,
    text: over.text ?? `stem ${over.id}`,
    context: over.context ?? null,
    difficulty: over.difficulty ?? "EASY",
    solution: over.solution ?? null,
    imageUrl: over.imageUrl ?? null,
    solutionImageUrl: over.solutionImageUrl ?? null,
    setId: over.setId ?? null,
    questionFormat: over.questionFormat ?? "mcq",
    numericAnswer: over.numericAnswer ?? null,
    questionNumber: over.questionNumber ?? null,
    pyqYear: over.pyqYear ?? null,
    pyqMonth: over.pyqMonth ?? null,
    pyqNote: over.pyqNote ?? null,
    exam: over.exam ?? { id: "e1", name: "NDA" },
    subject: over.subject ?? { id: "s1", name: "Mathematics" },
    chapter: over.chapter ?? { id: "c1", name: "Vectors" },
    subtopic: over.subtopic ?? { id: "st1", name: "Dot Product" },
    options: over.options ?? [
      { label: "A", text: "a", isCorrect: false, imageUrl: null },
      { label: "B", text: "b", isCorrect: true, imageUrl: null },
      { label: "C", text: "c", isCorrect: false, imageUrl: null },
      { label: "D", text: "d", isCorrect: false, imageUrl: null },
    ],
  } as QuestionRow;
}

/** A single, then a 3-question set, then a single — the shape that breaks naive numbering. */
const MIXED: QuestionRow[] = [
  q({ id: "11111111-1111-4111-8111-111111111111" }),
  q({ id: "22222222-2222-4222-8222-222222222222", setId: "S1", context: "Read the passage." }),
  q({ id: "33333333-3333-4333-8333-333333333333", setId: "S1", context: null }),
  q({ id: "44444444-4444-4444-8444-444444444444", setId: "S1", context: null }),
  q({ id: "55555555-5555-4555-8555-555555555555" }),
];

describe("buildPaperPushPayload — Q-number parity with the tags sheet", () => {
  it("numbers every question exactly as buildTagRows does", () => {
    const push = buildPaperPushPayload({
      questions: MIXED,
      paperId: "p1",
      title: "NDA Mock 7",
      supabaseUrl: SUPABASE_URL,
    });
    const tags = buildTagRows(MIXED);

    expect(push.questions.map((p) => p.q)).toEqual(tags.map((t) => t.q));
    expect(push.questions.map((p) => p.questionId)).toEqual(tags.map((t) => t.questionId));
  });

  it("numbers 1..N contiguously across a set boundary", () => {
    const push = buildPaperPushPayload({
      questions: MIXED,
      paperId: "p1",
      title: "t",
      supabaseUrl: SUPABASE_URL,
    });
    expect(push.questions.map((p) => p.q)).toEqual([1, 2, 3, 4, 5]);
  });

  it("gives every sibling of a set the lead passage, even when its own context is null", () => {
    const push = buildPaperPushPayload({
      questions: MIXED,
      paperId: "p1",
      title: "t",
      supabaseUrl: SUPABASE_URL,
    });
    const setItems = push.questions.filter((p) => [2, 3, 4].includes(p.q));
    expect(setItems.map((p) => p.context)).toEqual([
      "Read the passage.",
      "Read the passage.",
      "Read the passage.",
    ]);
  });

  it("leaves a standalone question's context null rather than empty string", () => {
    const push = buildPaperPushPayload({
      questions: MIXED,
      paperId: "p1",
      title: "t",
      supabaseUrl: SUPABASE_URL,
    });
    expect(push.questions[0].context).toBeNull();
  });
});

describe("buildPaperPushPayload — envelope", () => {
  it("carries the kind discriminator, paperId and title", () => {
    const push = buildPaperPushPayload({
      questions: MIXED,
      paperId: "p1",
      title: "  NDA Mock 7  ",
      supabaseUrl: SUPABASE_URL,
    });
    expect(push.kind).toBe("paper");
    expect(push.paperId).toBe("p1");
    expect(push.title).toBe("NDA Mock 7");
  });

  it("sends the tracker's subject key, not the vault's subject name", () => {
    const push = buildPaperPushPayload({
      questions: MIXED,
      paperId: "p1",
      title: "t",
      supabaseUrl: SUPABASE_URL,
    });
    // Mathematics → Maths
    expect(push.subject).toBe("Maths");
  });

  it("sends NO date, marking or batch — those are tracker-side facts the vault cannot know", () => {
    const push = buildPaperPushPayload({
      questions: MIXED,
      paperId: "p1",
      title: "t",
      supabaseUrl: SUPABASE_URL,
    }) as Record<string, unknown>;
    expect(push).not.toHaveProperty("date");
    expect(push).not.toHaveProperty("marking");
    expect(push).not.toHaveProperty("batch");
    expect(push).not.toHaveProperty("maxMarks");
  });

  it("derives the subject from the dominant subject when a paper mixes them", () => {
    const mixedSubjects = [
      q({ id: "11111111-1111-4111-8111-111111111111", subject: { id: "s1", name: "Physics" } }),
      q({ id: "22222222-2222-4222-8222-222222222222", subject: { id: "s1", name: "Physics" } }),
      q({ id: "33333333-3333-4333-8333-333333333333", subject: { id: "s2", name: "Mathematics" } }),
    ];
    const push = buildPaperPushPayload({
      questions: mixedSubjects,
      paperId: "p1",
      title: "t",
      supabaseUrl: SUPABASE_URL,
    });
    expect(push.subject).toBe("Physics");
  });

  it("refuses to build from an empty paper", () => {
    expect(() =>
      buildPaperPushPayload({
        questions: [],
        paperId: "p1",
        title: "t",
        supabaseUrl: SUPABASE_URL,
      })
    ).toThrow(/no questions/i);
  });
});

describe("trackerExamId", () => {
  it("is deterministic, so a re-push updates rather than duplicating", () => {
    expect(trackerExamId("abc")).toBe(trackerExamId("abc"));
  });

  it("is namespaced, so it can never collide with a hand-made exam_<timestamp> id", () => {
    const id = trackerExamId("abc");
    expect(id.startsWith("exam_vault_")).toBe(true);
    expect(/^exam_\d+$/.test(id)).toBe(false);
  });

  it("distinguishes two papers", () => {
    expect(trackerExamId("abc")).not.toBe(trackerExamId("abd"));
  });
});

describe("pushDisabledReason — the button must say WHY, never sit dead", () => {
  it("is enabled when a target exists and the paper has questions", () => {
    expect(pushDisabledReason({ hasTarget: true, count: 5, cap: 200 })).toBeNull();
  });

  it("names the missing tracker rather than blaming the paper", () => {
    const r = pushDisabledReason({ hasTarget: false, count: 5, cap: 200 });
    expect(r).toMatch(/no tracker/i);
  });

  it("reports the empty paper", () => {
    expect(pushDisabledReason({ hasTarget: true, count: 0, cap: 200 })).toMatch(/no questions/i);
  });

  it("reports an over-cap paper with both numbers", () => {
    const r = pushDisabledReason({ hasTarget: true, count: 250, cap: 200 });
    expect(r).toContain("250");
    expect(r).toContain("200");
  });

  it("prefers the missing-tracker reason — it is the one the user cannot fix by editing", () => {
    expect(pushDisabledReason({ hasTarget: false, count: 0, cap: 200 })).toMatch(/no tracker/i);
  });
});

/**
 * ── SITTINGS ──────────────────────────────────────────────────────────────
 *
 * One paper is regularly conducted more than once — batch A on Monday, batch B
 * on Thursday. Until now `exam_vault_<paperId>` made that unreachable: the id is
 * derived from the paper, so a second push upserts the SAME tracker exam and,
 * once the first sitting has results, is refused outright (409).
 *
 * Two constraints shape everything below and neither is negotiable:
 *
 * 1. SITTING 1 MUST BE BYTE-IDENTICAL TO TODAY. Nine pushed drafts are live in
 *    production on `exam_vault_<paperId>` (RESULTS_REUPLOAD.md §1, measured
 *    2026-09-12). Only sitting 2+ may carry a suffix, or those exams orphan.
 *
 * 2. THE VAULT MUST DISTINGUISH SITTINGS IN THE TITLE, because nothing
 *    downstream can. The tracker's Update Results modal edits date, marking,
 *    subject, batch and branch — NOT name — and every push overwrites name from
 *    the vault. Two sittings would otherwise be two rows with the same name, the
 *    same (push-date) date and both batch null, indistinguishable at exactly the
 *    moment faculty must pick one to upload results into.
 */
describe("trackerExamId — sittings", () => {
  it("leaves sitting 1 byte-identical to the pre-sittings id", () => {
    // The nine live drafts depend on this exact string.
    expect(trackerExamId("abc", 1)).toBe("exam_vault_abc");
  });

  it("defaults to sitting 1, so every existing caller is unaffected", () => {
    expect(trackerExamId("abc")).toBe(trackerExamId("abc", 1));
  });

  it("gives a later sitting its own id, so it is a NEW exam not an overwrite", () => {
    expect(trackerExamId("abc", 2)).toBe("exam_vault_abc_s2");
    expect(trackerExamId("abc", 2)).not.toBe(trackerExamId("abc", 1));
  });

  it("stays namespaced at every sitting — never collides with a hand-made exam_<timestamp>", () => {
    expect(trackerExamId("abc", 7).startsWith("exam_vault_")).toBe(true);
  });

  it("refuses a nonsense sitting number rather than minting a junk exam id", () => {
    // A bad value here does not fail loudly downstream — it silently creates an
    // exam nobody can find. Throw at the boundary instead.
    expect(() => trackerExamId("abc", 0)).toThrow();
    expect(() => trackerExamId("abc", -1)).toThrow();
    expect(() => trackerExamId("abc", 1.5)).toThrow();
  });
});

describe("pushTitle — the only place a sitting can be told apart", () => {
  it("leaves an unlabelled sitting 1 exactly as the paper is titled", () => {
    expect(pushTitle("NDA Mock 7", 1, null)).toBe("NDA Mock 7");
  });

  it("falls back to a sitting number when no label is given", () => {
    expect(pushTitle("NDA Mock 7", 2, null)).toBe("NDA Mock 7 (sitting 2)");
  });

  it("prefers the teacher's label — the one moment a human knows what the sitting is for", () => {
    expect(pushTitle("NDA Mock 7", 2, "Batch B")).toBe("NDA Mock 7 — Batch B");
  });

  it("accepts a label on sitting 1 too, so the first sitting can be named up front", () => {
    expect(pushTitle("NDA Mock 7", 1, "Batch A")).toBe("NDA Mock 7 — Batch A");
  });

  it("treats a blank label as no label rather than emitting a dangling dash", () => {
    expect(pushTitle("NDA Mock 7", 2, "   ")).toBe("NDA Mock 7 (sitting 2)");
    expect(pushTitle("NDA Mock 7", 1, "")).toBe("NDA Mock 7");
  });

  it("trims the label", () => {
    expect(pushTitle("NDA Mock 7", 2, "  Batch B  ")).toBe("NDA Mock 7 — Batch B");
  });
});

describe("planPush — what a click should do", () => {
  const sitting = (n: number, over: Partial<PriorSitting> = {}): PriorSitting => ({
    sittingNo: n,
    examId: trackerExamId("abc", n),
    label: over.label ?? null,
    pushedAt: over.pushedAt ?? `2026-09-0${n}T00:00:00Z`,
  });

  it("pushes straight through the first time — no dialog for the common case", () => {
    expect(planPush([])).toEqual({ kind: "create", sittingNo: 1 });
  });

  /**
   * The trigger is "a sitting already exists", NOT "it has results", and that is
   * forced rather than chosen. The tracker cannot know a conduct happened until
   * the Evalbee sheet arrives days later: `date` defaults to the PUSH date (all
   * nine live drafts read 2026-09-12) and `batch` is only set at results upload.
   * So results are the sole real signal and they lag the conduct — a push in
   * that window would silently overwrite an exam students had already sat.
   */
  it("asks once any sitting exists, even with no results — the conduct is invisible until results land", () => {
    expect(planPush([sitting(1)])).toEqual({
      kind: "ask",
      latest: sitting(1),
      nextSittingNo: 2,
    });
  });

  it("offers the NEXT number after the highest sitting, not a count", () => {
    // Sitting 2 deleted tracker-side: reusing 2 would collide with a row that
    // may still exist there. Numbers are allocated, never recycled.
    const plan = planPush([sitting(1), sitting(3)]);
    expect(plan).toMatchObject({ kind: "ask", nextSittingNo: 4 });
  });

  it("reports the most recent sitting, whatever order the rows arrive in", () => {
    const plan = planPush([sitting(3), sitting(1), sitting(2)]);
    expect(plan).toMatchObject({ kind: "ask", latest: { sittingNo: 3 } });
  });
});

describe("buildPaperPushPayload — sittings", () => {
  it("defaults to sitting 1 and the bare title, so an existing caller is byte-identical", () => {
    const p = buildPaperPushPayload({
      questions: [q({ id: "a" })],
      paperId: "p1",
      title: "NDA Mock 7",
      supabaseUrl: SUPABASE_URL,
    });
    expect(p.sittingNo).toBe(1);
    expect(p.title).toBe("NDA Mock 7");
  });

  it("carries the sitting number so the tracker derives the SAME id we recorded", () => {
    const p = buildPaperPushPayload({
      questions: [q({ id: "a" })],
      paperId: "p1",
      title: "NDA Mock 7",
      supabaseUrl: SUPABASE_URL,
      sittingNo: 2,
      label: "Batch B",
    });
    expect(p.sittingNo).toBe(2);
    // The builder owns the title so it cannot drift from the id it belongs to.
    expect(p.title).toBe("NDA Mock 7 — Batch B");
  });

  it("still numbers questions from 1 on a later sitting — Q-parity is per paper, not per sitting", () => {
    const qs = [q({ id: "a" }), q({ id: "b" })];
    const first = buildPaperPushPayload({
      questions: qs, paperId: "p1", title: "T", supabaseUrl: SUPABASE_URL,
    });
    const second = buildPaperPushPayload({
      questions: qs, paperId: "p1", title: "T", supabaseUrl: SUPABASE_URL, sittingNo: 2,
    });
    expect(second.questions.map((x) => x.q)).toEqual(first.questions.map((x) => x.q));
  });
});
