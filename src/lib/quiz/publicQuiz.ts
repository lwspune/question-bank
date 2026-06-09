/**
 * Server-only reads + writes for the PUBLIC quiz funnel. The answer key lives
 * here and NEVER leaves the server before submit:
 *   - getPublicQuizBySlug  → the page payload (stem + options, NO key)
 *   - getGradingBySlug     → the submit endpoint's key + concept links (server)
 *   - recordLead           → retake-aware lead upsert (RPC, migration 0034)
 *
 * All three gate on `quizzes.public_slug` (NULL = private), so an un-published
 * quiz is unreachable. Callers pass a service-role client (quiz_atoms is
 * ADMIN-only RLS); the stripping happens here, not in the DB policy.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { DEFAULT_MARKING, type GradedQuestion, type Marking } from "./grade";

export type PublicOptions = { A: string; B: string; C: string; D: string };
export type PublicQuestion = { q: number; stem: string; options: PublicOptions };
export type PublicQuiz = {
  id: string;
  title: string;
  exam: string | null;
  subject: string | null;
  chapter: string | null;
  marking: Marking;
  questions: PublicQuestion[];
};

/** The page payload: questions WITHOUT the answer key. Null if not public. */
export async function getPublicQuizBySlug(
  db: SupabaseClient,
  publicSlug: string
): Promise<PublicQuiz | null> {
  const { data: quiz } = await db
    .from("quizzes")
    .select("id, title, exam, subject, chapter, marking, public_slug")
    .eq("public_slug", publicSlug)
    .maybeSingle();
  if (!quiz) return null;

  const { data: rows } = await db
    .from("quiz_atoms_map")
    .select("position, quiz_atoms(stem, options)")
    .eq("quiz_id", quiz.id)
    .order("position");

  const questions: PublicQuestion[] = (rows ?? []).map((r: Record<string, unknown>) => {
    const atom = r.quiz_atoms as { stem: string; options: PublicOptions };
    return { q: r.position as number, stem: atom.stem, options: atom.options };
  });

  return {
    id: quiz.id as string,
    title: quiz.title as string,
    exam: (quiz.exam as string) ?? null,
    subject: (quiz.subject as string) ?? null,
    chapter: (quiz.chapter as string) ?? null,
    marking: (quiz.marking as Marking) ?? DEFAULT_MARKING,
    questions,
  };
}

export type GradingQuestion = GradedQuestion & {
  conceptSlug: string | null;
  subjectRoute: string | null;
  chapterSlug: string | null;
  subtopicSlug: string | null;
};

export type GradingData = {
  quizId: string;
  marking: Marking;
  questions: GradingQuestion[];
};

/** Server-only: the answer key + per-question concept links, for grading a
 *  submission and building the "learn this" /notes deep-links. Null if not public. */
export async function getGradingBySlug(
  db: SupabaseClient,
  publicSlug: string
): Promise<GradingData | null> {
  const { data: quiz } = await db
    .from("quizzes")
    .select("id, marking, public_slug")
    .eq("public_slug", publicSlug)
    .maybeSingle();
  if (!quiz) return null;

  const { data: rows } = await db
    .from("quiz_atoms_map")
    .select("position, quiz_atoms(answer, concept_slug, subject_route, chapter_slug, subtopic_slug)")
    .eq("quiz_id", quiz.id)
    .order("position");

  const questions: GradingQuestion[] = (rows ?? []).map((r: Record<string, unknown>) => {
    const atom = r.quiz_atoms as {
      answer: string;
      concept_slug: string | null;
      subject_route: string | null;
      chapter_slug: string | null;
      subtopic_slug: string | null;
    };
    return {
      q: r.position as number,
      answer: atom.answer,
      conceptSlug: atom.concept_slug,
      subjectRoute: atom.subject_route,
      chapterSlug: atom.chapter_slug,
      subtopicSlug: atom.subtopic_slug,
    };
  });

  return {
    quizId: quiz.id as string,
    marking: (quiz.marking as Marking) ?? DEFAULT_MARKING,
    questions,
  };
}

export type RecordLeadInput = {
  quizId: string;
  name: string;
  mobile: string;
  score: number;
  correct: number;
  incorrect: number;
  notAttempted: number;
  total: number;
  answers: Record<string, string>;
  utmSource?: string | null;
};

/** Retake-aware lead upsert via the record_quiz_lead RPC (atomic — bumps
 *  attempts, keeps best_score, refreshes latest score/answers). */
export async function recordLead(db: SupabaseClient, p: RecordLeadInput): Promise<void> {
  const { error } = await db.rpc("record_quiz_lead", {
    p_quiz_id: p.quizId,
    p_name: p.name,
    p_mobile: p.mobile,
    p_score: p.score,
    p_correct: p.correct,
    p_incorrect: p.incorrect,
    p_not_attempted: p.notAttempted,
    p_total: p.total,
    p_answers: p.answers,
    p_utm_source: p.utmSource ?? null,
  });
  if (error) throw new Error(`recordLead failed: ${error.message}`);
}
