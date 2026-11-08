/**
 * Reads for daily homework plans (migration 0143). RLS shows published plans
 * only, so every function here works with the anon client and a cached page.
 *
 * Items are paged after the last row read (lib/supabase/keyset.ts): a plan
 * holds one row per printed question, and a CBSE subject runs past PostgREST's
 * 1000-row cap. Never with .range(): its OFFSET runs the chapter lookup for
 * every skipped row too (2026-11-08, 21% of all database reads).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { singleFlight } from "@/lib/cache/singleFlight";
import { buildFailureMemoMs } from "@/lib/cache/buildPhase";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { keysetAfter, readAllByKeyset } from "@/lib/supabase/keyset";
import type { HomeworkDayItem } from "./dayExport";
import type { HomeworkPlanLink } from "./links";
import { TOP_PYQS, pickTopSlots, topSlotKeys, type PlanChapterRow } from "./topPyqs";
import { planChapters, type PlanChapter } from "./chapters";

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
  /** Chapters the plan's questions are filed under. */
  chapters: number;
};

export type HomeworkDay = { day: number; items: (HomeworkDayItem & { part: 1 | 2 | 3 })[] };

export type HomeworkPlan = HomeworkPlanSummary & { dayList: HomeworkDay[] };

type PlanRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  per_day: number;
  /** Kept by triggers on the plan's items (migration 0235). */
  day_count: number;
  question_count: number;
  chapter_count: number;
  exam: { name: string } | null;
  subject: { name: string } | null;
};

type ItemRow = {
  day: number;
  position: number;
  sub: number;
  part: 1 | 2 | 3;
  note: string;
  question_id: string;
  group_n: number | null;
  question: { chapter: { name: string } | null } | null;
};

const COUNT_COLS = "day_count, question_count, chapter_count";
const PLAN_COLS = `id, slug, title, summary, per_day, ${COUNT_COLS}, exam:exams(name), subject:subjects(name)`;
const PAGE = 1000;

/** A plan's items in plan order, every page. Exported for its spec. */
export async function loadPlanItems(
  client: SupabaseClient,
  planId: string,
  opts: { day?: number; pageSize?: number } = {}
): Promise<ItemRow[]> {
  return readAllByKeyset<ItemRow>(async (last, limit) => {
    let q = client
      .from("homework_plan_items")
      .select("day, position, sub, part, note, question_id, group_n, question:questions(chapter:chapters(name))")
      .eq("plan_id", planId);
    if (opts.day !== undefined) q = q.eq("day", opts.day);
    if (last) q = q.or(keysetAfter(["day", "position", "sub"], last));
    const { data, error } = await q.order("day").order("position").order("sub").limit(limit);
    if (error) throw new Error(`homework items: ${error.message}`);
    return (data ?? []) as unknown as ItemRow[];
  }, opts.pageSize ?? PAGE);
}

function toSummary(p: PlanRow): HomeworkPlanSummary {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    perDay: p.per_day,
    examName: p.exam?.name ?? "",
    subjectName: p.subject?.name ?? "",
    // The last day; slots, a case study counted once; chapters (0235).
    days: p.day_count,
    questions: p.question_count,
    chapters: p.chapter_count,
  };
}

function toDays(items: ItemRow[]): HomeworkDay[] {
  const days = new Map<number, HomeworkDay>();
  for (const it of items) {
    const d = days.get(it.day) ?? { day: it.day, items: [] };
    d.items.push({
      position: it.position,
      sub: it.sub,
      questionId: it.question_id,
      chapter: it.question?.chapter?.name ?? "",
      note: it.note,
      part: it.part,
      group: it.group_n,
    });
    days.set(it.day, d);
  }
  return [...days.values()].sort((a, b) => a.day - b.day);
}

/**
 * Published plans with their counts, which live on the plan row (migration
 * 0235): no item is read. `examName` (the DB exams.name) narrows the list to
 * one exam, for its homework page.
 */
export async function listPublishedPlans(
  client: SupabaseClient,
  opts: { examName?: string } = {}
): Promise<HomeworkPlanSummary[]> {
  const query = opts.examName
    ? client
        .from("homework_plans")
        .select(`id, slug, title, summary, per_day, ${COUNT_COLS}, exam:exams!inner(name), subject:subjects(name)`)
        .eq("exam.name", opts.examName)
    : client.from("homework_plans").select(PLAN_COLS);
  const { data, error } = await query.order("title");
  if (error) throw new Error(`homework plans: ${error.message}`);
  return ((data ?? []) as unknown as PlanRow[]).map(toSummary);
}

type PlanChapterItemRow = {
  day: number;
  position: number;
  question: { chapter: { id: string; name: string; order_index: number | null } | null } | null;
};

/**
 * A plan and the chapters its questions are filed under, in book order, for
 * its Top 10 PYQs tab (2026-11-04). Only a slot's FIRST part counts, the rule
 * the Top 10 reads by, so every chapter listed has a list. Null for a plan the
 * reader cannot see.
 */
export async function getPlanChapters(
  client: SupabaseClient,
  slug: string
): Promise<{ plan: { id: string; slug: string; title: string; examName: string; subjectName: string }; chapters: PlanChapter[] } | null> {
  const { data, error } = await client.from("homework_plans").select(PLAN_COLS).eq("slug", slug).maybeSingle();
  if (error) throw new Error(`homework plan ${slug}: ${error.message}`);
  if (!data) return null;
  const plan = data as unknown as PlanRow;
  // Only sub 1 is read, so (day, position) is unique and is the key.
  const rows = await readAllByKeyset<PlanChapterItemRow>(async (last, limit) => {
    let q = client
      .from("homework_plan_items")
      .select("day, position, question:questions(chapter:chapters(id, name, order_index))")
      .eq("plan_id", plan.id)
      .eq("sub", 1);
    if (last) q = q.or(keysetAfter(["day", "position"], last));
    const page = await q.order("day").order("position").limit(limit);
    if (page.error) throw new Error(`homework plan ${slug} chapters: ${page.error.message}`);
    return (page.data ?? []) as unknown as PlanChapterItemRow[];
  }, PAGE);
  const chapters = planChapters(
    rows.flatMap((r) => {
      const c = r.question?.chapter;
      return c ? [{ id: c.id, name: c.name, orderIndex: c.order_index }] : [];
    })
  );
  return {
    plan: { id: plan.id, slug: plan.slug, title: plan.title, examName: plan.exam?.name ?? "", subjectName: plan.subject?.name ?? "" },
    chapters,
  };
}

export async function getPlanBySlug(client: SupabaseClient, slug: string): Promise<HomeworkPlan | null> {
  const { data, error } = await client.from("homework_plans").select(PLAN_COLS).eq("slug", slug).maybeSingle();
  if (error) throw new Error(`homework plan ${slug}: ${error.message}`);
  if (!data) return null;
  const plan = data as unknown as PlanRow;
  const items = await loadPlanItems(client, plan.id);
  return { ...toSummary(plan), dayList: toDays(items) };
}

type LinkRow = { slug: string; title: string; per_day: number; exam: { name: string } | null; subject: { name: string } | null };

async function loadPlanLinks(): Promise<HomeworkPlanLink[]> {
  const { data, error } = await createSupabaseAnonClient()
    .from("homework_plans")
    .select("slug, title, per_day, exam:exams(name), subject:subjects(name)")
    .order("title");
  if (error) throw new Error(`homework plan links: ${error.message}`);
  return ((data ?? []) as unknown as LinkRow[]).map((p) => ({
    slug: p.slug,
    title: p.title,
    perDay: p.per_day,
    examName: p.exam?.name ?? "",
    subjectName: p.subject?.name ?? "",
  }));
}

/**
 * The published plans, slug and subject only, for the links on the board hub
 * and the exam home. One small read, no items. Not in unstable_cache: those
 * pages are cached for a day themselves, and a stored list would outlive a
 * deploy and hide a new plan. THROWS on a failed read; callers drop the link.
 */
export function getPlanLinks(): Promise<HomeworkPlanLink[]> {
  return singleFlight("homework-plan-links", loadPlanLinks, { rememberFailureMs: buildFailureMemoMs() });
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
  const items = toDays(await loadPlanItems(client, data.id as string, { day }))[0]?.items ?? [];
  return { planId: data.id as string, title: data.title as string, items };
}

export type HomeworkDayPage = {
  plan: { slug: string; title: string; examName: string; subjectName: string; days: number };
  items: HomeworkDayItem[];
};

/**
 * One day of a plan for its page: the day's items plus what the page names
 * (exam, subject, how many days, for the next-day link). Null for an unknown
 * plan or a day past its end.
 */
export async function getPlanDayPage(client: SupabaseClient, slug: string, day: number): Promise<HomeworkDayPage | null> {
  const { data, error } = await client
    .from("homework_plans")
    .select("id, slug, title, exam:exams(name), subject:subjects(name)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`homework plan ${slug}: ${error.message}`);
  if (!data) return null;
  const plan = data as unknown as { id: string; slug: string; title: string } & Pick<PlanRow, "exam" | "subject">;
  const [items, last] = await Promise.all([
    loadPlanItems(client, plan.id, { day }),
    client.from("homework_plan_items").select("day").eq("plan_id", plan.id).order("day", { ascending: false }).limit(1),
  ]);
  if (last.error) throw new Error(`homework plan ${slug} days: ${last.error.message}`);
  const dayItems = toDays(items)[0]?.items ?? [];
  if (dayItems.length === 0) return null;
  return {
    plan: {
      slug: plan.slug,
      title: plan.title,
      examName: plan.exam?.name ?? "",
      subjectName: plan.subject?.name ?? "",
      days: (last.data?.[0]?.day as number | undefined) ?? day,
    },
    items: dayItems,
  };
}

export type PlanChapterTop = {
  planId: string;
  planSlug: string;
  planTitle: string;
  /** Empty when the plan holds no question of the chapter. */
  chapterName: string;
  /** The chapter's top PYQs, numbered 1..n (lib/homework/topPyqs.ts). */
  items: HomeworkDayItem[];
};

type PlanRef = { id: string; slug: string; title: string };

type ChapterItemRow = {
  day: number;
  position: number;
  sub: number;
  note: string;
  question_id: string;
  group_n: number | null;
  question: { chapter: { name: string } | null } | null;
};

/**
 * Two reads. First the slots the chapter owns: the first part of each slot
 * whose question is filed under the chapter, in plan order, cut at ten. Then
 * every part of those slots, since a case study can file a later part under
 * another chapter (lib/homework/topPyqs.ts topSlotKeys).
 */
async function loadChapterTop(client: SupabaseClient, plan: PlanRef, chapterId: string): Promise<PlanChapterTop> {
  const owned = await client
    .from("homework_plan_items")
    .select("day, position, sub, note, question_id, group_n, question:questions!inner(chapter_id, chapter:chapters(name))")
    .eq("plan_id", plan.id)
    .eq("sub", 1)
    .eq("question.chapter_id", chapterId)
    .order("day")
    .order("position")
    .limit(TOP_PYQS);
  if (owned.error) throw new Error(`homework top pyqs ${plan.slug}: ${owned.error.message}`);
  const firsts = (owned.data ?? []) as unknown as ChapterItemRow[];
  const chapterName = firsts[0]?.question?.chapter?.name ?? "";
  const toRow = (r: Omit<ChapterItemRow, "question">): PlanChapterRow => ({
    day: r.day,
    position: r.position,
    sub: r.sub,
    questionId: r.question_id,
    chapter: chapterName,
    note: r.note,
    group: r.group_n,
  });
  const keys = topSlotKeys(firsts.map(toRow));
  const base = { planId: plan.id, planSlug: plan.slug, planTitle: plan.title, chapterName };
  if (keys.length === 0) return { ...base, items: [] };

  const wanted = new Set(keys.map((k) => `${k.day}:${k.position}`));
  const all = await client
    .from("homework_plan_items")
    .select("day, position, sub, note, question_id, group_n")
    .eq("plan_id", plan.id)
    .in("day", [...new Set(keys.map((k) => k.day))])
    .order("day")
    .order("position")
    .order("sub");
  if (all.error) throw new Error(`homework top pyqs ${plan.slug} parts: ${all.error.message}`);
  const parts = ((all.data ?? []) as unknown as Omit<ChapterItemRow, "question">[])
    .filter((r) => wanted.has(`${r.day}:${r.position}`))
    .map(toRow);
  return { ...base, items: pickTopSlots(parts, keys.length) };
}

/** A chapter's top PYQs from a published plan named by slug, for the download route. Null for an unknown plan. */
export async function getPlanChapterTop(
  client: SupabaseClient,
  slug: string,
  chapterId: string
): Promise<PlanChapterTop | null> {
  const { data, error } = await client.from("homework_plans").select("id, slug, title").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`homework plan ${slug}: ${error.message}`);
  if (!data) return null;
  return loadChapterTop(client, data as PlanRef, chapterId);
}

/**
 * A chapter's top PYQs from its subject's published plan, for the /board
 * chapter page. Null when the subject has no published plan (CBSE
 * Biology and HSC Biology today). Each subject has one plan; were there two, the
 * first by slug is read, so the page is stable.
 */
export async function getSubjectChapterTop(
  client: SupabaseClient,
  opts: { examId: string; subjectId: string; chapterId: string }
): Promise<PlanChapterTop | null> {
  const { data, error } = await client
    .from("homework_plans")
    .select("id, slug, title")
    .eq("exam_id", opts.examId)
    .eq("subject_id", opts.subjectId)
    .order("slug")
    .limit(1);
  if (error) throw new Error(`homework plan for subject: ${error.message}`);
  const plan = (data ?? [])[0] as PlanRef | undefined;
  return plan ? loadChapterTop(client, plan, opts.chapterId) : null;
}

export type PlanGroupPage = {
  plan: { id: string; slug: string; title: string; examName: string; subjectName: string };
  group: { n: number; tier: "repeat" | "type"; label: string; sittings: string[] };
  /** Every question of the group in print order, a case study's parts numbered by `sub`. */
  members: { position: number; sub: number; questionId: string; sitting: string }[];
};

/**
 * One repeat or type of a plan with every question in it (2026-11-04), for its
 * "See all" page. Null for a plan or group the reader cannot see.
 */
export async function getPlanGroup(client: SupabaseClient, slug: string, n: number): Promise<PlanGroupPage | null> {
  const { data, error } = await client.from("homework_plans").select(PLAN_COLS).eq("slug", slug).maybeSingle();
  if (error) throw new Error(`homework plan ${slug}: ${error.message}`);
  if (!data) return null;
  const plan = data as unknown as PlanRow;
  const [g, m] = await Promise.all([
    client.from("homework_plan_groups").select("n, tier, label, sittings").eq("plan_id", plan.id).eq("n", n).maybeSingle(),
    client
      .from("homework_plan_group_questions")
      .select("position, sub, question_id, sitting")
      .eq("plan_id", plan.id)
      .eq("n", n)
      .order("position")
      .order("sub"),
  ]);
  if (g.error) throw new Error(`homework group ${slug}/${n}: ${g.error.message}`);
  if (m.error) throw new Error(`homework group ${slug}/${n} questions: ${m.error.message}`);
  if (!g.data) return null;
  return {
    plan: { id: plan.id, slug: plan.slug, title: plan.title, examName: plan.exam?.name ?? "", subjectName: plan.subject?.name ?? "" },
    group: g.data as PlanGroupPage["group"],
    members: ((m.data ?? []) as { position: number; sub: number; question_id: string; sitting: string }[]).map((r) => ({
      position: r.position,
      sub: r.sub,
      questionId: r.question_id,
      sitting: r.sitting,
    })),
  };
}
