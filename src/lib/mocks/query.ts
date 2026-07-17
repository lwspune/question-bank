/**
 * Reads for the mock-test surface. Mock CONTENT is the live PYQ rows referenced
 * by the immutable `mock_tests.questions` snapshot — rendered through the same
 * fields /browse uses (KatexRenderer / BlockText / publicImageUrl), so math,
 * tables, and images just work. The answer key is loaded by a SEPARATE
 * server-only helper and never folded into the client-facing question view.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export type MockSnapshotQuestion = {
  position: number;
  questionId: string;
  sectionKey: string;
  marks: number;
  negMarks: number;
  /** Grace question — awarded to all at grade time (officially dropped/bonus). */
  grace?: boolean;
};

export type MockSection = { key: string; label: string; count: number };

export type MockRow = {
  id: string;
  slug: string;
  paperCode: string;
  pyqYear: number;
  pyqMonth: string | null;
  title: string;
  durationSecs: number;
  marking: { correct: number; wrong: number };
  sections: MockSection[];
  questions: MockSnapshotQuestion[];
  totalQuestions: number;
  totalMarks: number;
  examName: string;
};

export type MockListItem = Omit<MockRow, "questions" | "marking"> & {
  marking: { correct: number; wrong: number };
};

const MOCK_SELECT =
  "id, slug, paper_code, pyq_year, pyq_month, title, duration_secs, marking, sections, questions, total_questions, total_marks, exam:exams(name)";

function mapMock(r: Record<string, unknown>): MockRow {
  const exam = (Array.isArray(r.exam) ? r.exam[0] : r.exam) as { name: string } | null;
  return {
    id: r.id as string,
    slug: r.slug as string,
    paperCode: r.paper_code as string,
    pyqYear: r.pyq_year as number,
    pyqMonth: (r.pyq_month as string | null) ?? null,
    title: r.title as string,
    durationSecs: r.duration_secs as number,
    marking: r.marking as { correct: number; wrong: number },
    sections: (r.sections as MockSection[]) ?? [],
    questions: (r.questions as MockSnapshotQuestion[]) ?? [],
    totalQuestions: r.total_questions as number,
    totalMarks: Number(r.total_marks),
    examName: exam?.name ?? "",
  };
}

/** Published mocks for the catalogue, newest sitting first. */
export async function getPublishedMocks(db: SupabaseClient): Promise<MockListItem[]> {
  const { data, error } = await db
    .from("mock_tests")
    .select(MOCK_SELECT)
    .eq("status", "published")
    .order("pyq_year", { ascending: false })
    .order("pyq_month", { ascending: true });
  if (error) throw new Error(`getPublishedMocks: ${error.message}`);
  return (data ?? []).map((r) => {
    const { questions: _q, ...rest } = mapMock(r as Record<string, unknown>);
    return rest;
  });
}

/** One published mock by slug (includes the ordered snapshot). Null when absent. */
export async function getMockBySlug(db: SupabaseClient, slug: string): Promise<MockRow | null> {
  const { data, error } = await db
    .from("mock_tests")
    .select(MOCK_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw new Error(`getMockBySlug: ${error.message}`);
  return data ? mapMock(data as Record<string, unknown>) : null;
}

/** One published mock by id (for mid-attempt loads). Null when absent. */
export async function getMockById(db: SupabaseClient, id: string): Promise<MockRow | null> {
  const { data, error } = await db
    .from("mock_tests")
    .select(MOCK_SELECT)
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw new Error(`getMockById: ${error.message}`);
  return data ? mapMock(data as Record<string, unknown>) : null;
}

export type MockOptionView = {
  label: "A" | "B" | "C" | "D";
  text: string;
  imageUrl: string | null;
};

export type MockQuestionView = {
  position: number;
  questionId: string;
  sectionKey: string;
  marks: number;
  negMarks: number;
  text: string;
  context: string | null;
  imageUrl: string | null;
  options: MockOptionView[];
};

/**
 * Load ordered, key-STRIPPED question views for a snapshot. Fetches PUBLIC
 * question content by id, then re-orders to the snapshot's positions (a single
 * `.in()` returns rows in arbitrary order). `is_correct` is dropped here.
 */
export async function loadMockQuestionViews(
  db: SupabaseClient,
  snapshot: MockSnapshotQuestion[]
): Promise<MockQuestionView[]> {
  const ids = snapshot.map((s) => s.questionId);
  const byId = new Map<string, { text: string; context: string | null; imageUrl: string | null; options: MockOptionView[] }>();
  const PAGE = 300;
  for (let i = 0; i < ids.length; i += PAGE) {
    const chunk = ids.slice(i, i + PAGE);
    const { data, error } = await db
      .from("questions")
      .select("id, text, context, image_url, options(label, text, image_url)")
      .in("id", chunk);
    if (error) throw new Error(`loadMockQuestionViews: ${error.message}`);
    for (const row of (data ?? []) as Record<string, unknown>[]) {
      const opts = ((row.options as Record<string, unknown>[]) ?? [])
        .map((o) => ({
          label: o.label as "A" | "B" | "C" | "D",
          text: (o.text as string) ?? "",
          imageUrl: (o.image_url as string | null) ?? null,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
      byId.set(row.id as string, {
        text: (row.text as string) ?? "",
        context: (row.context as string | null) ?? null,
        imageUrl: (row.image_url as string | null) ?? null,
        options: opts,
      });
    }
  }
  return snapshot
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((s) => {
      const content = byId.get(s.questionId);
      return {
        position: s.position,
        questionId: s.questionId,
        sectionKey: s.sectionKey,
        marks: s.marks,
        negMarks: s.negMarks,
        text: content?.text ?? "",
        context: content?.context ?? null,
        imageUrl: content?.imageUrl ?? null,
        options: content?.options ?? [],
      };
    });
}

export type UserAttempt = {
  attemptId: string;
  mockSlug: string;
  mockTitle: string;
  pyqYear: number;
  status: "in_progress" | "submitted" | "expired";
  score: number | null;
  maxScore: number | null;
  correct: number | null;
  wrong: number | null;
  skipped: number | null;
  startedAt: string;
  submittedAt: string | null;
};

/** A signed-in student's own attempts (RLS own-row), newest first. Optionally
 *  scoped to one mock (for the "Your attempts" section on a mock page). */
export async function getUserAttempts(
  db: SupabaseClient,
  userId: string,
  mockId?: string
): Promise<UserAttempt[]> {
  let q = db
    .from("mock_attempts")
    .select(
      "id, mock_id, status, score, max_score, correct_count, wrong_count, skipped_count, started_at, submitted_at, mock:mock_tests(slug, title, pyq_year)"
    )
    .eq("user_id", userId)
    .order("started_at", { ascending: false });
  if (mockId) q = q.eq("mock_id", mockId);
  const { data, error } = await q;
  if (error) throw new Error(`getUserAttempts: ${error.message}`);
  return (data ?? []).map((r) => {
    const row = r as Record<string, unknown>;
    const mock = (Array.isArray(row.mock) ? row.mock[0] : row.mock) as
      | { slug: string; title: string; pyq_year: number }
      | null;
    return {
      attemptId: row.id as string,
      mockSlug: mock?.slug ?? "",
      mockTitle: mock?.title ?? "",
      pyqYear: mock?.pyq_year ?? 0,
      status: row.status as UserAttempt["status"],
      score: row.score == null ? null : Number(row.score),
      maxScore: row.max_score == null ? null : Number(row.max_score),
      correct: (row.correct_count as number | null) ?? null,
      wrong: (row.wrong_count as number | null) ?? null,
      skipped: (row.skipped_count as number | null) ?? null,
      startedAt: row.started_at as string,
      submittedAt: (row.submitted_at as string | null) ?? null,
    };
  });
}

export type ReviewOption = MockOptionView & { isCorrect: boolean };

export type ReviewQuestionContent = {
  text: string;
  context: string | null;
  imageUrl: string | null;
  solution: string | null;
  solutionImageUrl: string | null;
  options: ReviewOption[];
};

/** Post-submit review content: full question + the CORRECT option + solution.
 *  Keyed by question id (order is applied by the caller from the snapshot). */
export async function loadReviewQuestions(
  db: SupabaseClient,
  snapshot: MockSnapshotQuestion[]
): Promise<Map<string, ReviewQuestionContent>> {
  const ids = snapshot.map((s) => s.questionId);
  const byId = new Map<string, ReviewQuestionContent>();
  const PAGE = 300;
  for (let i = 0; i < ids.length; i += PAGE) {
    const chunk = ids.slice(i, i + PAGE);
    const { data, error } = await db
      .from("questions")
      .select("id, text, context, image_url, solution, solution_image_url, options(label, text, image_url, is_correct)")
      .in("id", chunk);
    if (error) throw new Error(`loadReviewQuestions: ${error.message}`);
    for (const row of (data ?? []) as Record<string, unknown>[]) {
      const opts = ((row.options as Record<string, unknown>[]) ?? [])
        .map((o) => ({
          label: o.label as "A" | "B" | "C" | "D",
          text: (o.text as string) ?? "",
          imageUrl: (o.image_url as string | null) ?? null,
          isCorrect: Boolean(o.is_correct),
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
      byId.set(row.id as string, {
        text: (row.text as string) ?? "",
        context: (row.context as string | null) ?? null,
        imageUrl: (row.image_url as string | null) ?? null,
        solution: (row.solution as string | null) ?? null,
        solutionImageUrl: (row.solution_image_url as string | null) ?? null,
        options: opts,
      });
    }
  }
  return byId;
}

/** Server-only: the correct-option label per question id, for grading. */
export async function loadAnswerKey(
  db: SupabaseClient,
  questionIds: string[]
): Promise<Record<string, "A" | "B" | "C" | "D">> {
  const key: Record<string, "A" | "B" | "C" | "D"> = {};
  const PAGE = 300;
  for (let i = 0; i < questionIds.length; i += PAGE) {
    const chunk = questionIds.slice(i, i + PAGE);
    const { data, error } = await db
      .from("options")
      .select("question_id, label, is_correct")
      .in("question_id", chunk)
      .eq("is_correct", true);
    if (error) throw new Error(`loadAnswerKey: ${error.message}`);
    for (const o of (data ?? []) as Record<string, unknown>[]) {
      key[o.question_id as string] = o.label as "A" | "B" | "C" | "D";
    }
  }
  return key;
}
