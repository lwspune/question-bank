/**
 * Reads for daily homework plans (migration 0143). RLS shows published plans
 * only, so every function here works with the anon client and a cached page.
 *
 * Items are paged with .range(): a plan holds one row per printed question,
 * and a CBSE subject runs past PostgREST's 1000-row cap.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { HomeworkDayItem } from "./dayExport";

export type HomeworkPlanSummary = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  perDay: number;
  examName: string;
  subjectName: string;
  days: number;
  questions: number;
};

export type HomeworkDay = { day: number; items: (HomeworkDayItem & { part: 1 | 2 | 3 })[] };

export type HomeworkPlan = HomeworkPlanSummary & { dayList: HomeworkDay[] };

type PlanRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  per_day: number;
  exam: { name: string } | null;
  subject: { name: string } | null;
};

type ItemRow = {
  day: number;
  position: number;
  part: 1 | 2 | 3;
  note: string;
  question_id: string;
  question: { chapter: { name: string } | null } | null;
};

const PLAN_COLS = "id, slug, title, summary, per_day, exam:exams(name), subject:subjects(name)";
const PAGE = 1000;

async function loadItems(client: SupabaseClient, planId: string, day?: number): Promise<ItemRow[]> {
  const out: ItemRow[] = [];
  for (let from = 0; ; from += PAGE) {
    let q = client
      .from("homework_plan_items")
      .select("day, position, part, note, question_id, question:questions(chapter:chapters(name))")
      .eq("plan_id", planId);
    if (day !== undefined) q = q.eq("day", day);
    const { data, error } = await q.order("day").order("position").range(from, from + PAGE - 1);
    if (error) throw new Error(`homework items: ${error.message}`);
    out.push(...((data ?? []) as unknown as ItemRow[]));
    if (!data || data.length < PAGE) return out;
  }
}

function toSummary(p: PlanRow, items: { day: number }[]): HomeworkPlanSummary {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    perDay: p.per_day,
    examName: p.exam?.name ?? "",
    subjectName: p.subject?.name ?? "",
    days: items.reduce((m, it) => Math.max(m, it.day), 0),
    questions: items.length,
  };
}

function toDays(items: ItemRow[]): HomeworkDay[] {
  const days = new Map<number, HomeworkDay>();
  for (const it of items) {
    const d = days.get(it.day) ?? { day: it.day, items: [] };
    d.items.push({
      position: it.position,
      questionId: it.question_id,
      chapter: it.question?.chapter?.name ?? "",
      note: it.note,
      part: it.part,
    });
    days.set(it.day, d);
  }
  return [...days.values()].sort((a, b) => a.day - b.day);
}

export async function listPublishedPlans(client: SupabaseClient): Promise<HomeworkPlanSummary[]> {
  const { data, error } = await client.from("homework_plans").select(PLAN_COLS).order("title");
  if (error) throw new Error(`homework plans: ${error.message}`);
  const plans = (data ?? []) as unknown as PlanRow[];
  return Promise.all(plans.map(async (p) => toSummary(p, await loadItems(client, p.id))));
}

export async function getPlanBySlug(client: SupabaseClient, slug: string): Promise<HomeworkPlan | null> {
  const { data, error } = await client.from("homework_plans").select(PLAN_COLS).eq("slug", slug).maybeSingle();
  if (error) throw new Error(`homework plan ${slug}: ${error.message}`);
  if (!data) return null;
  const plan = data as unknown as PlanRow;
  const items = await loadItems(client, plan.id);
  return { ...toSummary(plan, items), dayList: toDays(items) };
}

/** One day of a plan, for the download route. */
export async function getPlanDay(
  client: SupabaseClient,
  slug: string,
  day: number
): Promise<{ planId: string; title: string; items: HomeworkDayItem[] } | null> {
  const { data, error } = await client.from("homework_plans").select("id, title").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`homework plan ${slug}: ${error.message}`);
  if (!data) return null;
  const items = toDays(await loadItems(client, data.id as string, day))[0]?.items ?? [];
  return { planId: data.id as string, title: data.title as string, items };
}
