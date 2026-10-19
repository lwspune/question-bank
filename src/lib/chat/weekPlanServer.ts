/**
 * Reads and writes for V's week plan (lib/chat/weekPlan.ts, migration 0169),
 * all with the student's OWN login: study_plans and user_activity are own-row
 * under RLS, so a wrong user id finds nothing rather than someone else's plan.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { parsePlanItems, planStartIst, type PlanActivity, type SavedPlan } from "./weekPlan";

const DAY_MS = 86_400_000;
const PAGE = 1000;
/** .in() puts ids in the URL: chunked well under its limit. */
const ID_CHUNK = 200;

export async function saveStudyPlan(db: SupabaseClient, userId: string, plan: SavedPlan): Promise<void> {
  const { error } = await db.from("study_plans").upsert(
    { user_id: userId, starts_on: plan.startsOn, exam_slug: plan.examSlug, subject: plan.subject, items: plan.items },
    { onConflict: "user_id,starts_on" }
  );
  if (error) throw new Error(`saveStudyPlan: ${error.message}`);
}

/** The latest plan whose seven days include today (India), or null. */
export async function loadCurrentPlan(db: SupabaseClient, userId: string, now: Date = new Date()): Promise<SavedPlan | null> {
  const earliest = planStartIst(new Date(now.getTime() - 6 * DAY_MS));
  const { data, error } = await db
    .from("study_plans")
    .select("starts_on, exam_slug, subject, items")
    .eq("user_id", userId)
    .gte("starts_on", earliest)
    .lte("starts_on", planStartIst(now))
    .order("starts_on", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(`loadCurrentPlan: ${error.message}`);
  if (!data) return null;
  const items = parsePlanItems(data.items);
  if (items.length === 0) return null;
  return { startsOn: data.starts_on as string, examSlug: data.exam_slug as string, subject: (data.subject as string | null) ?? null, items };
}

/** The plan's week as instants: its first day 00:00 in India to seven days on. */
export function planWindow(plan: Pick<SavedPlan, "startsOn">): { from: string; to: string } {
  const from = new Date(`${plan.startsOn}T00:00:00+05:30`);
  return { from: from.toISOString(), to: new Date(from.getTime() + 7 * DAY_MS).toISOString() };
}

async function countKind(db: SupabaseClient, userId: string, kind: string, w: { from: string; to: string }): Promise<number> {
  const { count, error } = await db
    .from("user_activity")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("kind", kind)
    .gte("created_at", w.from)
    .lt("created_at", w.to);
  if (error) throw new Error(`plan activity ${kind}: ${error.message}`);
  return count ?? 0;
}

/**
 * What the student did in the plan's week: drills finished, mocks submitted,
 * and per planned chapter the distinct questions ANSWERED in it (a
 * question_practiced row with a verdict; a revealed answer is not practice,
 * the 0165 split).
 */
export async function loadPlanActivity(db: SupabaseClient, userId: string, plan: SavedPlan): Promise<PlanActivity> {
  const w = planWindow(plan);
  const planned = new Set(plan.items.flatMap((i) => (i.kind === "chapter" ? [i.chapterId] : [])));
  const [drills, mocks, chapterQuestions] = await Promise.all([
    countKind(db, userId, "drill_completed", w),
    countKind(db, userId, "mock_submitted", w),
    planned.size === 0 ? Promise.resolve({}) : practisedByChapter(db, userId, w, planned),
  ]);
  return { drills, mocks, chapterQuestions };
}

async function practisedByChapter(
  db: SupabaseClient,
  userId: string,
  w: { from: string; to: string },
  planned: ReadonlySet<string>
): Promise<Record<string, number>> {
  // Paged: a busy student answers hundreds a day, past PostgREST's 1000-row cap.
  const ids = new Set<string>();
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("user_activity")
      .select("id, ref_id")
      .eq("user_id", userId)
      .eq("kind", "question_practiced")
      .not("metadata->correct", "is", null)
      .not("ref_id", "is", null)
      .gte("created_at", w.from)
      .lt("created_at", w.to)
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`plan activity practice: ${error.message}`);
    for (const r of data ?? []) ids.add(r.ref_id as string);
    if (!data || data.length < PAGE) break;
  }

  const out: Record<string, number> = {};
  const all = [...ids];
  for (let i = 0; i < all.length; i += ID_CHUNK) {
    const { data, error } = await db.from("questions").select("id, chapter_id").in("id", all.slice(i, i + ID_CHUNK));
    if (error) throw new Error(`plan activity chapters: ${error.message}`);
    for (const q of data ?? []) {
      const c = q.chapter_id as string | null;
      if (c && planned.has(c)) out[c] = (out[c] ?? 0) + 1;
    }
  }
  return out;
}
