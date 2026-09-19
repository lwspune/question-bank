/**
 * Mock attempt lifecycle (server-only). Every function takes an RLS-bound
 * Supabase client + the acting userId; ownership is enforced by RLS on
 * mock_attempts / attempt_answers (0044), the explicit `.eq("user_id", …)` is
 * belt-and-suspenders. Grading (gradeMock) + timing (remainingSecs) are the pure
 * helpers in attempt.ts — this layer only does the DB reads/writes around them.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getMockBySlug,
  getMockById,
  loadMockQuestionViews,
  loadReviewQuestions,
  loadAnswerKey,
  type MockQuestionView,
  type ReviewOption,
} from "./query";
import { gradeMock, remainingSecs, type MockGradeQuestion } from "./attempt";
import { verdictFor, type OptionLabel, type SavedResponse } from "./answers";
import { logActivity, logActivityBatch } from "@/lib/activity/service";
import type { ActivityEvent } from "@/lib/activity/events";

export class MockError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/**
 * One saved response, mirroring the two `attempt_answers` response columns
 * (migration 0087). At most one is non-null; both null means unanswered.
 */
export type SavedAnswer = SavedResponse & {
  isFlagged: boolean;
  timeSpentSecs: number;
};

/** Create a fresh attempt, or return the live in-progress one (resume). */
export async function startOrResumeAttempt(
  db: SupabaseClient,
  userId: string,
  slug: string
): Promise<{ attemptId: string; expiresAt: string; resumed: boolean }> {
  const mock = await getMockBySlug(db, slug);
  if (!mock) throw new MockError(404, "Mock test not found");

  const { data: live } = await db
    .from("mock_attempts")
    .select("id, expires_at")
    .eq("mock_id", mock.id)
    .eq("user_id", userId)
    .eq("status", "in_progress")
    .maybeSingle();
  if (live) {
    return { attemptId: live.id as string, expiresAt: live.expires_at as string, resumed: true };
  }

  const now = Date.now();
  const expiresAt = new Date(now + mock.durationSecs * 1000).toISOString();
  const { data: created, error } = await db
    .from("mock_attempts")
    .insert({
      mock_id: mock.id,
      user_id: userId,
      started_at: new Date(now).toISOString(),
      expires_at: expiresAt,
      status: "in_progress",
    })
    .select("id, expires_at")
    .single();

  // Lost a race with a concurrent start (partial unique index) → resume theirs.
  if (error) {
    const { data: existing } = await db
      .from("mock_attempts")
      .select("id, expires_at")
      .eq("mock_id", mock.id)
      .eq("user_id", userId)
      .eq("status", "in_progress")
      .maybeSingle();
    if (existing) {
      return { attemptId: existing.id as string, expiresAt: existing.expires_at as string, resumed: true };
    }
    throw new MockError(500, `Could not start attempt: ${error.message}`);
  }

  // Engagement spine (0052 + 0105): record that a paper was OPENED. Reached only
  // on a genuinely new attempt — every resume path above returns before here, so
  // a student who reloads mid-paper cannot inflate their own history. Without
  // this, mock_submitted was the only mock signal and a student who opened a
  // paper and walked away left no trace at all (33 such students at the time
  // this shipped), which made the 26% abandonment rate invisible to the spine.
  // Best-effort — never blocks the start.
  await logActivity(db, userId, {
    kind: "mock_started",
    refId: created.id as string,
    refKind: "mock_attempt",
    metadata: { mockId: mock.id, slug },
  });

  return { attemptId: created.id as string, expiresAt: created.expires_at as string, resumed: false };
}

type AttemptRow = {
  id: string;
  mock_id: string;
  user_id: string;
  status: "in_progress" | "submitted" | "expired";
  started_at: string;
  expires_at: string;
};

/**
 * One attempt row.
 *
 * `userId` NULL means "do not filter by owner" — used only by the superadmin
 * review path, which hands in the service-role client. That is not a hole: the
 * security boundary is RLS plus WHICH CLIENT the caller supplies, and the
 * `.eq(user_id)` is defence in depth on top of it. With the anon client a null
 * here changes nothing, because own-row RLS still applies.
 */
async function loadAttemptRow(
  db: SupabaseClient,
  userId: string | null,
  attemptId: string
): Promise<AttemptRow> {
  let q = db
    .from("mock_attempts")
    .select("id, mock_id, user_id, status, started_at, expires_at")
    .eq("id", attemptId);
  if (userId !== null) q = q.eq("user_id", userId);
  const { data, error } = await q.maybeSingle();
  if (error) throw new MockError(500, error.message);
  if (!data) throw new MockError(404, "Attempt not found");
  return data as AttemptRow;
}

/** Persist one question's response. Rejects writes after the timer expired. */
export async function saveAnswer(
  db: SupabaseClient,
  userId: string,
  attemptId: string,
  patch: {
    questionId: string;
    selectedLabel: OptionLabel | null;
    /** JEE Section-B (NAT): the value the student typed. */
    numericResponse: number | null;
    isFlagged: boolean;
    timeSpentSecs: number;
  }
): Promise<{ ok: true } | { ok: false; expired: true }> {
  const attempt = await loadAttemptRow(db, userId, attemptId);
  if (attempt.status !== "in_progress" || remainingSecs(attempt.expires_at, Date.now()) <= 0) {
    return { ok: false, expired: true };
  }
  const { error } = await db.from("attempt_answers").upsert(
    {
      attempt_id: attemptId,
      question_id: patch.questionId,
      selected_label: patch.selectedLabel,
      numeric_response: patch.numericResponse,
      is_flagged: patch.isFlagged,
      time_spent_secs: Math.max(0, Math.floor(patch.timeSpentSecs)),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "attempt_id,question_id" }
  );
  if (error) throw new MockError(500, `saveAnswer: ${error.message}`);
  return { ok: true };
}

export type AttemptSummary = {
  attemptId: string;
  status: "submitted" | "expired";
  score: number;
  maxScore: number;
  correct: number;
  wrong: number;
  skipped: number;
  sectionScores: Record<string, { correct: number; wrong: number; skipped: number; score: number; maxScore: number }>;
};

/**
 * Grade + finalize an attempt. Idempotent: a second submit returns the stored
 * result. `reason` marks whether the timer ran out (status 'expired') or the
 * student submitted (status 'submitted') — both are terminal + graded.
 *
 * `at` is when the submit is recorded as having HAPPENED, and it defaults to
 * now so every live caller is unchanged. The expiry sweep passes the attempt's
 * own `expires_at` instead: grading a July attempt in September must not claim
 * it was sat in September, because `submitted_at` is what the report email
 * filters on and the activity rows' `created_at` is what the drill ladder sorts
 * by. See src/lib/mocks/sweep.ts.
 */
export async function submitAttempt(
  db: SupabaseClient,
  userId: string,
  attemptId: string,
  reason: "manual" | "expired" = "manual",
  at: Date = new Date()
): Promise<AttemptSummary> {
  const attempt = await loadAttemptRow(db, userId, attemptId);
  if (attempt.status !== "in_progress") {
    return readAttemptSummary(db, userId, attemptId);
  }
  const mock = await getMockById(db, attempt.mock_id);
  if (!mock) throw new MockError(404, "Mock test not found");

  const ids = mock.questions.map((q) => q.questionId);
  const [key, answers] = await Promise.all([
    loadAnswerKey(db, ids),
    loadSavedAnswers(db, attemptId),
  ]);

  const gradeQuestions: MockGradeQuestion[] = mock.questions.map((q) => ({
    questionId: q.questionId,
    sectionKey: q.sectionKey,
    marks: q.marks,
    negMarks: q.negMarks,
    // A key that is somehow missing stays NULL rather than defaulting to "A" —
    // that old fallback silently marked every A-picker correct. verdictFor
    // scores a null key as skipped, so our defect can never cost a student marks.
    answer: key[q.questionId] ?? null,
    ...(q.grace ? { grace: true } : {}),
  }));

  const result = gradeMock(gradeQuestions, answers);
  const status = reason === "expired" ? "expired" : "submitted";

  const { error } = await db
    .from("mock_attempts")
    .update({
      status,
      submitted_at: at.toISOString(),
      score: result.score,
      max_score: result.maxScore,
      correct_count: result.correct,
      wrong_count: result.wrong,
      skipped_count: result.skipped,
      section_scores: result.sectionScores,
      // NOT `at`. `submitted_at` is a claim about when the student stopped and
      // is backdated by the sweep; `updated_at` is a row-audit field and the row
      // is being touched NOW. Backdating it too erases the only trace of when
      // the sweep ran — which is exactly how a backfill becomes unauditable.
      updated_at: new Date().toISOString(),
    })
    .eq("id", attemptId)
    .eq("user_id", userId)
    .eq("status", "in_progress"); // guard: don't overwrite a concurrent submit
  if (error) throw new MockError(500, `submitAttempt: ${error.message}`);

  // Engagement spine (0052): log the graded submit + each missed question as
  // drill fuel. Reached ONLY on the first submit (the in_progress guard above),
  // so it's once-per-attempt. Best-effort — never blocks the result.
  const events: ActivityEvent[] = [
    {
      kind: "mock_submitted",
      refId: attemptId,
      refKind: "mock_attempt",
      metadata: {
        mockId: attempt.mock_id,
        score: result.score,
        maxScore: result.maxScore,
        correct: result.correct,
        wrong: result.wrong,
        skipped: result.skipped,
      },
    },
  ];
  for (const gq of gradeQuestions) {
    if (gq.grace) continue; // a grace question is never "wrong" (no drill fuel)
    // Read the verdict gradeMock already produced rather than re-deriving it.
    // Re-deriving was a second implementation of right-vs-wrong, and it silently
    // could not see a numeric (JEE Section-B) response at all.
    if (result.verdicts[gq.questionId] === -1) {
      events.push({
        kind: "answer_wrong",
        refId: gq.questionId,
        refKind: "question",
        metadata: { mockId: attempt.mock_id, sectionKey: gq.sectionKey },
      });
    }
  }
  await logActivityBatch(db, userId, events, at.getTime());

  return {
    attemptId,
    status,
    score: result.score,
    maxScore: result.maxScore,
    correct: result.correct,
    wrong: result.wrong,
    skipped: result.skipped,
    sectionScores: result.sectionScores,
  };
}

async function loadSavedAnswers(
  db: SupabaseClient,
  attemptId: string
): Promise<Record<string, SavedAnswer>> {
  const out: Record<string, SavedAnswer> = {};
  const { data, error } = await db
    .from("attempt_answers")
    .select("question_id, selected_label, numeric_response, is_flagged, time_spent_secs")
    .eq("attempt_id", attemptId);
  if (error) throw new MockError(500, `loadSavedAnswers: ${error.message}`);
  for (const r of (data ?? []) as Record<string, unknown>[]) {
    out[r.question_id as string] = {
      selectedLabel: (r.selected_label as OptionLabel | null) ?? null,
      numericResponse:
        r.numeric_response === null || r.numeric_response === undefined
          ? null
          : Number(r.numeric_response),
      isFlagged: Boolean(r.is_flagged),
      timeSpentSecs: (r.time_spent_secs as number) ?? 0,
    };
  }
  return out;
}

/** See loadAttemptRow for what a null `userId` means. */
async function readAttemptSummary(
  db: SupabaseClient,
  userId: string | null,
  attemptId: string
): Promise<AttemptSummary> {
  let q = db
    .from("mock_attempts")
    .select("status, score, max_score, correct_count, wrong_count, skipped_count, section_scores")
    .eq("id", attemptId);
  if (userId !== null) q = q.eq("user_id", userId);
  const { data, error } = await q.single();
  if (error || !data) throw new MockError(404, "Attempt not found");
  return {
    attemptId,
    status: (data.status as "submitted" | "expired") ?? "submitted",
    score: Number(data.score ?? 0),
    maxScore: Number(data.max_score ?? 0),
    correct: (data.correct_count as number) ?? 0,
    wrong: (data.wrong_count as number) ?? 0,
    skipped: (data.skipped_count as number) ?? 0,
    sectionScores: (data.section_scores as AttemptSummary["sectionScores"]) ?? {},
  };
}

export type RunnerState = {
  attempt: { id: string; status: "in_progress" | "submitted" | "expired"; startedAt: string; expiresAt: string };
  mock: {
    slug: string;
    title: string;
    durationSecs: number;
    sections: { key: string; label: string; count: number }[];
    marking: { correct: number; wrong: number };
    totalQuestions: number;
  };
  questions: MockQuestionView[];
  answers: Record<string, SavedAnswer>;
};

export type ReviewItem = {
  position: number;
  sectionKey: string;
  text: string;
  context: string | null;
  imageUrl: string | null;
  options: ReviewOption[];
  /** "numeric" is JEE Section-B: no options, a typed answer. */
  format: "mcq" | "numeric";
  selectedLabel: OptionLabel | null;
  correctLabel: OptionLabel | null;
  /** What the student typed, and the key, for a numeric question. */
  numericResponse: number | null;
  correctNumeric: number | null;
  verdict: 1 | -1 | 0;
  solution: string | null;
  solutionImageUrl: string | null;
  /** Officially dropped/bonus: awarded to all. The correct-answer highlight is
   *  suppressed and a disclosure badge shown (see the result review UI). */
  grace: boolean;
};

export type AttemptReview = {
  summary: AttemptSummary;
  mock: { slug: string; title: string; sections: { key: string; label: string; count: number }[] };
  items: ReviewItem[];
};

/** Post-submit result + per-question review (student pick vs key + solution). */
export async function getAttemptReview(
  db: SupabaseClient,
  userId: string | null,
  attemptId: string
): Promise<{ status: "in_progress" | "submitted" | "expired"; slug: string; review: AttemptReview | null }> {
  const attempt = await loadAttemptRow(db, userId, attemptId);
  const mock = await getMockById(db, attempt.mock_id);
  if (!mock) throw new MockError(404, "Mock test not found");
  if (attempt.status === "in_progress") return { status: "in_progress", slug: mock.slug, review: null };

  const [summary, content, answers] = await Promise.all([
    readAttemptSummary(db, userId, attemptId),
    loadReviewQuestions(db, mock.questions),
    loadSavedAnswers(db, attemptId),
  ]);

  const items: ReviewItem[] = mock.questions
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((s) => {
      const c = content.get(s.questionId);
      const grace = s.grace === true;
      const saved = answers[s.questionId];
      const selectedLabel = saved?.selectedLabel ?? null;
      const numericResponse = saved?.numericResponse ?? null;
      // Grace questions have no valid key (NTA awarded all): suppress the correct
      // highlight and count the row as awarded (verdict 1) for everyone.
      const correctLabel = grace ? null : c?.options.find((o) => o.isCorrect)?.label ?? null;
      const correctNumeric = grace ? null : c?.numericAnswer ?? null;
      const format = c?.format ?? "mcq";
      // The verdict comes from the SAME helper gradeMock uses. It used to be
      // recomputed here, which meant the score and this list were two separate
      // implementations of right-vs-wrong and free to disagree on screen.
      const verdict = verdictFor(
        format === "numeric"
          ? correctNumeric === null
            ? null
            : { kind: "numeric", value: correctNumeric }
          : correctLabel === null
            ? null
            : { kind: "mcq", label: correctLabel },
        saved ?? null,
        grace
      );
      return {
        position: s.position,
        sectionKey: s.sectionKey,
        text: c?.text ?? "",
        context: c?.context ?? null,
        imageUrl: c?.imageUrl ?? null,
        options: c?.options ?? [],
        format,
        selectedLabel,
        correctLabel,
        numericResponse,
        correctNumeric,
        verdict,
        solution: c?.solution ?? null,
        solutionImageUrl: c?.solutionImageUrl ?? null,
        grace,
      };
    });

  return {
    status: attempt.status,
    slug: mock.slug,
    review: {
      summary,
      mock: { slug: mock.slug, title: mock.title, sections: mock.sections },
      items,
    },
  };
}

/**
 * The same review, for a superadmin looking at ANOTHER student's attempt.
 *
 * Exists because the student path is own-row by construction — `.eq(user_id)`
 * plus own-row RLS — so every attempt row the admin dashboard rendered linked
 * to a page that 404'd and bounced the superadmin to /mock. This does not relax
 * the student path: it is a separate entry point that must be handed the
 * service-role client, and its ONLY route is superadmin-gated.
 */
export async function getAttemptReviewForAdmin(
  db: SupabaseClient,
  attemptId: string
) {
  return getAttemptReview(db, null, attemptId);
}

/** Everything the runner needs to render (or resume) an attempt. */
export async function getRunnerState(
  db: SupabaseClient,
  userId: string,
  attemptId: string
): Promise<RunnerState> {
  const attempt = await loadAttemptRow(db, userId, attemptId);
  const mock = await getMockById(db, attempt.mock_id);
  if (!mock) throw new MockError(404, "Mock test not found");
  const [questions, answers] = await Promise.all([
    loadMockQuestionViews(db, mock.questions),
    loadSavedAnswers(db, attemptId),
  ]);
  return {
    attempt: {
      id: attempt.id,
      status: attempt.status,
      startedAt: attempt.started_at,
      expiresAt: attempt.expires_at,
    },
    mock: {
      slug: mock.slug,
      title: mock.title,
      durationSecs: mock.durationSecs,
      sections: mock.sections,
      marking: mock.marking,
      totalQuestions: mock.totalQuestions,
    },
    questions,
    answers,
  };
}
