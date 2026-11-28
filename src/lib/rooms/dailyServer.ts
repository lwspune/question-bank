/**
 * The morning question for every open circle of an exam students have (owner,
 * 2026-11-25: automatic, the team can swap it; 2026-11-27: members or not, so
 * a student who has not joined sees it waiting, lib/rooms/alert). Candidates, in order: the exam's Most
 * Asked "asked again" questions (homework_plan_items part 1, published plans),
 * then its other PUBLIC past-year MCQs, newest sitting first. Only questions a
 * chat card can show whole: an MCQ with options, no figure on the stem or an
 * option. lib/rooms/daily picks one never posted in the room, else the oldest.
 * A room that already has today's (IST) pin is left alone, so a re-run is safe.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { getExamBySlug } from "@/lib/exam/examContext";
import { readInChunks } from "@/lib/supabase/readInChunks";
import { pickDailyQuestion, standsAlone } from "./daily";
import { dailyRooms } from "./alert";
import { roomName } from "./server";

export const DAILY_BODY = "Today's question. Answer first, then discuss.";
const MAX_STEM = 700;
const FALLBACK = 300;

const IST_DAY = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" });

export type DailyPlan = { slug: string; questionId: string | null; skipped: string | null };

async function examIdOf(db: SupabaseClient, slug: string): Promise<string | null> {
  const name = getExamBySlug(slug)?.examName;
  if (!name) return null;
  const { data } = await db.from("exams").select("id").eq("name", name).maybeSingle();
  return (data?.id as string | undefined) ?? null;
}

async function usable(db: SupabaseClient, ids: string[]): Promise<Set<string>> {
  const [qs, opts] = await Promise.all([
    readInChunks<{ id: string; text: string | null; context: string | null; image_url: string | null; visibility: string; question_format: string }>(ids, (part, from, to) =>
      db.from("questions").select("id, text, context, image_url, visibility, question_format").in("id", part).order("id").range(from, to)
    ),
    readInChunks<{ id: string; question_id: string; image_url: string | null }>(ids, (part, from, to) =>
      db.from("options").select("id, question_id, image_url").in("question_id", part).order("id").range(from, to)
    ),
  ]);
  const optCount = new Map<string, number>();
  const optImage = new Set<string>();
  for (const o of opts) {
    optCount.set(o.question_id, (optCount.get(o.question_id) ?? 0) + 1);
    if (o.image_url) optImage.add(o.question_id);
  }
  const ok = new Set<string>();
  for (const q of qs) {
    if (q.visibility !== "PUBLIC" || q.question_format !== "mcq" || q.image_url || optImage.has(q.id)) continue;
    if ((optCount.get(q.id) ?? 0) < 2 || String(q.text ?? "").length > MAX_STEM) continue;
    if (!standsAlone(q)) continue;
    ok.add(q.id);
  }
  return ok;
}

export async function dailyCandidates(db: SupabaseClient, examId: string): Promise<string[]> {
  const plans = await db.from("homework_plans").select("id").eq("exam_id", examId).eq("published", true);
  if (plans.error) throw new Error(`rooms daily plans: ${plans.error.message}`);
  const planIds = (plans.data ?? []).map((p) => p.id as string);
  let mostAsked: string[] = [];
  if (planIds.length) {
    const items = await db
      .from("homework_plan_items")
      .select("question_id")
      .in("plan_id", planIds)
      .eq("part", 1)
      .order("day")
      .order("position")
      .limit(1000);
    if (items.error) throw new Error(`rooms daily items: ${items.error.message}`);
    mostAsked = (items.data ?? []).map((r) => r.question_id as string);
  }
  const rest = await db
    .from("questions")
    .select("id")
    .eq("exam_id", examId)
    .eq("visibility", "PUBLIC")
    .eq("question_kind", "pyq")
    .eq("question_format", "mcq")
    .is("image_url", null)
    .order("pyq_year", { ascending: false, nullsFirst: false })
    .limit(FALLBACK);
  if (rest.error) throw new Error(`rooms daily fallback: ${rest.error.message}`);
  const ordered = [...new Set([...mostAsked, ...(rest.data ?? []).map((r) => r.id as string)])];
  const ok = await usable(db, ordered);
  return ordered.filter((id) => ok.has(id));
}

/** Which question one room gets today, or why none. Writes nothing. */
export async function planRoom(db: SupabaseClient, slug: string, now: Date): Promise<DailyPlan> {
  const pin = await db.from("exam_room_messages").select("created_at").eq("exam_slug", slug).eq("pinned", true).maybeSingle();
  if (pin.data && IST_DAY.format(new Date(pin.data.created_at as string)) === IST_DAY.format(now)) {
    return { slug, questionId: null, skipped: "already pinned today" };
  }
  const examId = await examIdOf(db, slug);
  if (!examId) return { slug, questionId: null, skipped: "exam not found" };
  const candidates = await dailyCandidates(db, examId);
  const posted = await db.from("exam_room_messages").select("question_id, created_at").eq("exam_slug", slug).not("question_id", "is", null);
  if (posted.error) throw new Error(`rooms daily posted: ${posted.error.message}`);
  const last = new Map<string, string>();
  for (const p of posted.data ?? []) {
    const id = p.question_id as string;
    const at = p.created_at as string;
    if ((last.get(id) ?? "") < at) last.set(id, at);
  }
  const questionId = pickDailyQuestion(candidates, last);
  return { slug, questionId, skipped: questionId ? null : "no usable question" };
}

/**
 * Which question each circle gets this morning: every exam students have
 * (exam_room_audience, 0292) and every open circle, never a closed one. A
 * circle nobody has joined may have no row yet: ensureRoom makes it before
 * the pin. Writes nothing.
 */
export async function planDaily(db: SupabaseClient, now: Date): Promise<DailyPlan[]> {
  const [audience, rooms] = await Promise.all([db.rpc("exam_room_audience"), db.from("exam_rooms").select("exam_slug, open")]);
  if (audience.error) throw new Error(`rooms daily audience: ${audience.error.message}`);
  if (rooms.error) throw new Error(`rooms daily rooms: ${rooms.error.message}`);
  const rows = (rooms.data ?? []) as { exam_slug: string; open: boolean }[];
  const slugs = dailyRooms({
    audience: ((audience.data ?? []) as { exam_slug: string }[]).map((r) => r.exam_slug),
    openRooms: rows.filter((r) => r.open).map((r) => r.exam_slug),
    closed: rows.filter((r) => !r.open).map((r) => r.exam_slug),
    nameOf: roomName,
  });
  const out: DailyPlan[] = [];
  for (const slug of slugs) out.push(await planRoom(db, slug, now));
  return out;
}

/** Make a circle's row if it has none (a circle nobody has joined). Never reopens a closed one. */
export async function ensureRoom(db: SupabaseClient, slug: string): Promise<void> {
  const { error } = await db.from("exam_rooms").upsert({ exam_slug: slug }, { onConflict: "exam_slug", ignoreDuplicates: true });
  if (error) throw new Error(`rooms daily create ${slug}: ${error.message}`);
}

/**
 * Pin a question unless the room already has today's (migration 0291: checked
 * under a lock in the database, so a join racing the morning run, or two joins
 * at once, never pin twice). The message id, or null when one was already there.
 */
export async function pinDailyIfMissing(db: SupabaseClient, slug: string, questionId: string): Promise<number | null> {
  const { data, error } = await db.rpc("post_exam_room_daily_if_missing", {
    p_exam_slug: slug,
    p_question_id: questionId,
    p_body: DAILY_BODY,
  });
  if (error) throw new Error(`rooms daily pin ${slug}: ${error.message}`);
  return data == null ? null : Number(data);
}

/**
 * A room's first student joined after the morning run (owner, 2026-11-26): give
 * the room today's question now, not tomorrow. Skips a room already pinned today.
 */
export async function pinTodayIfMissing(db: SupabaseClient, slug: string, now: Date): Promise<number | null> {
  const plan = await planRoom(db, slug, now);
  return plan.questionId ? pinDailyIfMissing(db, slug, plan.questionId) : null;
}

/** The team's swap: replaces the room's pin even when it is today's. */
export async function postDaily(db: SupabaseClient, slug: string, questionId: string, staffUserId: string | null = null): Promise<number> {
  const { data, error } = await db.rpc("post_exam_room_daily", {
    p_exam_slug: slug,
    p_question_id: questionId,
    p_body: DAILY_BODY,
    p_user_id: staffUserId,
  });
  if (error) throw new Error(`rooms daily post ${slug}: ${error.message}`);
  return Number(data);
}
