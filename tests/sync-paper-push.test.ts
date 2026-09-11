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
