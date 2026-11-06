/**
 * Reads for /me's Continue card (2026-11-06). The rules are in the pure
 * lib/me/continue.ts; this fetches the student's last answers and their
 * chapters, and the homework plan they last opened.
 *
 * Read with the student's own JWT: `user_activity` is own-row by RLS, a
 * question resolves only when PUBLIC, and a homework plan only when published.
 * Best-effort: a failed read costs entries, never the page.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { landingHref, listChapterLandings } from "@/lib/questions/landing";
import { planHref } from "@/lib/homework/links";
import {
  pickContinue,
  planSlugOf,
  practiceContinue,
  type ChapterInfo,
  type ContinueItem,
  type PracticeRow,
} from "./continue";

/** Enough recent answers to find the last bank and /board chapter, even after
 *  a long run in one of them. */
const RECENT_ANSWERS = 60;

export type NotesRecent = {
  subjectRoute: string;
  chapterSlug: string;
  subtopicSlug: string;
  lastViewedAt: string;
  topic: string;
  chapter: string;
};

export async function loadContinue(
  db: SupabaseClient,
  userId: string,
  notes: readonly NotesRecent[],
  examIds: Record<string, string | null>
): Promise<ContinueItem[]> {
  const [practice, homework] = await Promise.all([
    loadPracticeItems(db, userId, examIds).catch((e) => {
      console.error("continue: practice read failed", e instanceof Error ? e.message : e);
      return [] as ContinueItem[];
    }),
    loadHomeworkItem(db, userId).catch((e) => {
      console.error("continue: homework read failed", e instanceof Error ? e.message : e);
      return null;
    }),
  ]);
  const notesItems: ContinueItem[] = notes.map((n) => ({
    key: `notes:${n.subtopicSlug}`,
    kind: "notes",
    title: n.topic,
    subtitle: n.chapter,
    href: `/notes/${n.subjectRoute}/${n.chapterSlug}/${n.subtopicSlug}`,
    at: n.lastViewedAt,
  }));
  return pickContinue([...practice, ...notesItems, ...(homework ? [homework] : [])]);
}

type QuestionChapterRow = {
  id: string;
  chapter_id: string | null;
  chapter: {
    name: string;
    subject: { id: string; name: string; exam_id: string; exam: { name: string } | null } | null;
  } | null;
};

async function loadPracticeItems(
  db: SupabaseClient,
  userId: string,
  examIds: Record<string, string | null>
): Promise<ContinueItem[]> {
  const { data, error } = await db
    .from("user_activity")
    .select("ref_id, created_at, surface:metadata->>surface")
    .eq("user_id", userId)
    .eq("kind", "question_practiced")
    .order("created_at", { ascending: false })
    .limit(RECENT_ANSWERS);
  if (error) throw new Error(error.message);
  const rows: PracticeRow[] = ((data ?? []) as { ref_id: string | null; created_at: string; surface: string | null }[])
    .filter((r) => r.ref_id)
    .map((r) => ({ questionId: r.ref_id as string, at: r.created_at, surface: r.surface }));
  const ids = [...new Set(rows.filter((r) => r.surface === "bank" || r.surface === "board").map((r) => r.questionId))];
  if (ids.length === 0) return [];

  // At most RECENT_ANSWERS ids: well under the ~200 a URL filter can carry.
  const [qs, landings] = await Promise.all([
    db
      .from("questions")
      .select("id, chapter_id, chapter:chapters!chapter_id(name, subject:subjects!subject_id(id, name, exam_id, exam:exams!exam_id(name)))")
      .in("id", ids),
    // Cached site-wide (the /questions pages' own index); a miss falls back to
    // a /browse link rather than costing the page.
    listChapterLandings().catch(() => []),
  ]);
  if (qs.error) throw new Error(qs.error.message);

  const slugById = new Map<string, string>();
  for (const [slug, id] of Object.entries(examIds)) if (id) slugById.set(id, slug);
  const landingByChapter = new Map(landings.map((l) => [l.chapterId, landingHref(l)]));
  const chapterOf = new Map<string, ChapterInfo>();
  for (const q of (qs.data ?? []) as unknown as QuestionChapterRow[]) {
    const s = q.chapter?.subject;
    if (!q.chapter_id || !q.chapter || !s) continue;
    chapterOf.set(q.id, {
      chapterId: q.chapter_id,
      chapterName: q.chapter.name,
      subjectId: s.id,
      subjectName: s.name,
      examId: s.exam_id,
      examName: s.exam?.name ?? "",
      examSlug: slugById.get(s.exam_id) ?? null,
      landingHref: landingByChapter.get(q.chapter_id) ?? null,
    });
  }
  const boardExams = new Set(EXAM_REGISTRY.filter((e) => e.boardExam).map((e) => e.slug));
  return practiceContinue(rows, chapterOf, boardExams);
}

/** The homework plan the student last opened, from the day's first homework
 *  view (lib/activity/views: one row per day, with the page's address). */
async function loadHomeworkItem(db: SupabaseClient, userId: string): Promise<ContinueItem | null> {
  const { data, error } = await db
    .from("user_activity")
    .select("created_at, path:metadata->>path")
    .eq("user_id", userId)
    .eq("kind", "surface_viewed")
    .eq("metadata->>surface", "homework")
    .order("created_at", { ascending: false })
    .limit(5);
  if (error) throw new Error(error.message);
  let slug: string | null = null;
  let at = "";
  for (const r of (data ?? []) as { created_at: string; path: string | null }[]) {
    slug = planSlugOf(r.path);
    if (slug) {
      at = r.created_at;
      break;
    }
  }
  if (!slug) return null;
  const plan = await db.from("homework_plans").select("slug, title").eq("slug", slug).maybeSingle();
  if (plan.error) throw new Error(plan.error.message);
  if (!plan.data) return null;
  return {
    key: `homework:${slug}`,
    kind: "homework",
    title: plan.data.title as string,
    subtitle: "Homework",
    href: planHref(slug),
    at,
    planSlug: slug,
  };
}
