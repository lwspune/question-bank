import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Read-only admin views over the Quiz Factory (quiz_atoms + quizzes). Used by
 * /dashboard/quizzes. Service-role reads (the page is admin-guarded); counts use
 * the exact-count head form so they never hit the PostgREST 1000-row cap.
 */

export type QuizPoolStats = {
  total: number;
  auto: number;
  verified: number;
  needsReview: number;
  ready: number; // auto + verified
};

export type QuizQuestionView = {
  position: number;
  stem: string;
  options: { A: string; B: string; C: string; D: string } | null;
  answer: string | null;
  conceptSlug: string;
};

export type AssembledQuiz = {
  id: string;
  slug: string;
  title: string;
  exam: string;
  subject: string;
  chapter: string;
  theme: string;
  status: string;
  pushedAt: string | null;
  /** Set when the quiz is published to the public funnel (/quiz/<publicSlug>). */
  publicSlug: string | null;
  questions: QuizQuestionView[];
};


/** Distinct (route, chapter) pairs that have at least one READY atom — drives
 *  the dashboard's assemble dropdown. NOTE: reads ready rows then dedups; fine
 *  while the ready-atom count stays < 1000, switch to an RPC aggregate if it ever
 *  exceeds that (PostgREST row cap). */
export async function getPoolChapters(): Promise<{ subjectRoute: string; chapterSlug: string }[]> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("quiz_atoms")
    .select("subject_route, chapter_slug")
    .in("status", ["auto", "verified"])
    .limit(1000);
  if (error) throw new Error(`pool chapters failed: ${error.message}`);
  const seen = new Set<string>();
  const out: { subjectRoute: string; chapterSlug: string }[] = [];
  for (const r of data ?? []) {
    const key = `${r.subject_route}/${r.chapter_slug}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push({ subjectRoute: r.subject_route as string, chapterSlug: r.chapter_slug as string });
    }
  }
  return out.sort((a, b) => `${a.subjectRoute}/${a.chapterSlug}`.localeCompare(`${b.subjectRoute}/${b.chapterSlug}`));
}

export async function getQuizPoolStats(): Promise<QuizPoolStats> {
  const db = createSupabaseAdminClient();
  const countFor = async (status?: string) => {
    let q = db.from("quiz_atoms").select("id", { count: "exact", head: true });
    if (status) q = q.eq("status", status);
    const { count, error } = await q;
    if (error) throw new Error(`pool count failed: ${error.message}`);
    return count ?? 0;
  };
  const [total, auto, verified, needsReview] = await Promise.all([
    countFor(),
    countFor("auto"),
    countFor("verified"),
    countFor("needs_review"),
  ]);
  return { total, auto, verified, needsReview, ready: auto + verified };
}

/** Most-recent assembled quizzes with their questions. Reads the IMMUTABLE
 *  question SNAPSHOT stored on the quiz row (migration 0035) — decoupled from the
 *  live atom pool, so a later atom change can't break a recorded quiz. Quizzes
 *  assembled BEFORE 0035 have an empty snapshot and fall back to the live
 *  map→atoms join. */
export async function listAssembledQuizzes(limit = 60): Promise<AssembledQuiz[]> {
  const db = createSupabaseAdminClient();
  const { data: quizzes, error } = await db
    .from("quizzes")
    .select("id, slug, title, exam, subject, chapter, status, pushed_at, public_slug, theme, questions, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`list quizzes failed: ${error.message}`);
  const rows = quizzes ?? [];
  if (rows.length === 0) return [];

  const hasSnapshot = (q: { questions: unknown }) =>
    Array.isArray(q.questions) && (q.questions as unknown[]).length > 0;

  // Live-join fallback ONLY for legacy (pre-0035) quizzes without a snapshot.
  const legacyIds = rows.filter((q) => !hasSnapshot(q)).map((q) => q.id);
  const byQuiz = new Map<string, QuizQuestionView[]>();
  const themesByQuiz = new Map<string, Set<string>>();
  if (legacyIds.length > 0) {
    const { data: maps, error: mErr } = await db
      .from("quiz_atoms_map")
      .select("quiz_id, position, quiz_atoms(stem, options, answer, concept_slug, theme)")
      .in("quiz_id", legacyIds)
      .order("position");
    if (mErr) throw new Error(`list quiz questions failed: ${mErr.message}`);
    for (const m of (maps ?? []) as unknown as Array<{
      quiz_id: string;
      position: number;
      quiz_atoms: {
        stem: string;
        options: QuizQuestionView["options"];
        answer: string | null;
        concept_slug: string;
        theme: string | null;
      } | null;
    }>) {
      if (!m.quiz_atoms) continue;
      const list = byQuiz.get(m.quiz_id) ?? [];
      list.push({
        position: m.position,
        stem: m.quiz_atoms.stem,
        options: m.quiz_atoms.options,
        answer: m.quiz_atoms.answer,
        conceptSlug: m.quiz_atoms.concept_slug,
      });
      byQuiz.set(m.quiz_id, list);
      if (m.quiz_atoms.theme) {
        const set = themesByQuiz.get(m.quiz_id) ?? new Set<string>();
        set.add(m.quiz_atoms.theme);
        themesByQuiz.set(m.quiz_id, set);
      }
    }
  }

  return rows.map((q) => {
    const base = {
      id: q.id,
      slug: q.slug,
      title: q.title,
      exam: q.exam,
      subject: q.subject,
      chapter: q.chapter,
      status: q.status,
      pushedAt: q.pushed_at,
      publicSlug: (q as { public_slug: string | null }).public_slug ?? null,
    };
    if (hasSnapshot(q)) {
      const snapshot = (q.questions as QuizQuestionView[]).slice().sort((a, b) => a.position - b.position);
      return { ...base, theme: ((q as { theme: string | null }).theme as string) ?? "mixed", questions: snapshot };
    }
    // legacy fallback
    const themes = themesByQuiz.get(q.id);
    return {
      ...base,
      theme: themes && themes.size === 1 ? [...themes][0] : "mixed",
      questions: (byQuiz.get(q.id) ?? []).sort((a, b) => a.position - b.position),
    };
  });
}
