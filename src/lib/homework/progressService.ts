/**
 * Reads behind a student's homework progress (2026-11-05). The rules are the
 * pure progress.ts; this reads the plan's questions (with each one's format)
 * and the student's own activity rows.
 *
 * Takes the client as a PARAMETER (the lib/drill/query.ts precedent), called
 * with the student's own JWT: plans are published-readable, questions
 * PUBLIC-readable and user_activity own-row, so RLS is the authorization.
 *
 * The plan page reads every one of the student's mark rows (the four kinds,
 * ~3,000 for the heaviest student on 2026-11-05) rather than filtering by the
 * plan's ids: a plan holds up to ~2,700 questions, and an `.in()` of that many
 * ids overflows the request line (CLAUDE.md's PostgREST pitfall). The day page
 * holds five, so it filters by id.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  marksFor,
  planProgress,
  type PlanProgress,
  type ProgressEvent,
  type ProgressItem,
  type QuestionFormat,
  type QuestionMark,
} from "./progress";

const PAGE = 1000;
const KINDS: ProgressEvent["kind"][] = ["self_mark", "question_practiced", "answer_wrong", "answer_correct"];

type ItemRow = { day: number; position: number; question_id: string; question: { question_format: QuestionFormat } | null };
type EventRow = { ref_id: string; kind: ProgressEvent["kind"]; created_at: string; mark: string | null };

async function planIdOf(db: SupabaseClient, slug: string): Promise<string | null> {
  const { data, error } = await db.from("homework_plans").select("id").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`homework plan ${slug}: ${error.message}`);
  return (data?.id as string | undefined) ?? null;
}

async function loadProgressItems(db: SupabaseClient, planId: string, day?: number): Promise<ProgressItem[]> {
  const out: ProgressItem[] = [];
  for (let from = 0; ; from += PAGE) {
    let q = db
      .from("homework_plan_items")
      .select("day, position, question_id, question:questions(question_format)")
      .eq("plan_id", planId);
    if (day !== undefined) q = q.eq("day", day);
    const { data, error } = await q.order("day").order("position").order("sub").range(from, from + PAGE - 1);
    if (error) throw new Error(`homework progress items: ${error.message}`);
    const rows = (data ?? []) as unknown as ItemRow[];
    for (const r of rows) {
      out.push({ day: r.day, position: r.position, questionId: r.question_id, format: r.question?.question_format ?? "mcq" });
    }
    if (rows.length < PAGE) return out;
  }
}

function toEvent(r: EventRow): ProgressEvent {
  const mark = r.mark === "understood" || r.mark === "review" ? r.mark : undefined;
  return { questionId: r.ref_id, kind: r.kind, at: r.created_at, ...(mark ? { mark } : {}) };
}

async function loadEvents(db: SupabaseClient, userId: string, questionIds?: string[]): Promise<ProgressEvent[]> {
  const out: ProgressEvent[] = [];
  for (let from = 0; ; from += PAGE) {
    let q = db
      .from("user_activity")
      .select("ref_id, kind, created_at, mark:metadata->>mark")
      .eq("user_id", userId)
      .in("kind", KINDS)
      .not("ref_id", "is", null);
    if (questionIds) q = q.in("ref_id", questionIds);
    const { data, error } = await q.order("created_at").order("id").range(from, from + PAGE - 1);
    if (error) throw new Error(`homework progress events: ${error.message}`);
    const rows = (data ?? []) as unknown as EventRow[];
    out.push(...rows.map(toEvent));
    if (rows.length < PAGE) return out;
  }
}

/** The plan page: every day's summary and where to continue. Null for an unknown plan. */
export async function loadHomeworkProgress(
  db: SupabaseClient,
  userId: string,
  slug: string
): Promise<{ progress: PlanProgress } | null> {
  const planId = await planIdOf(db, slug);
  if (!planId) return null;
  const [items, events] = await Promise.all([loadProgressItems(db, planId), loadEvents(db, userId)]);
  return { progress: planProgress(items, events) };
}

/** One day page: each question's mark and those waiting in the drill. Null
 *  for an unknown plan or a day it does not have. */
export async function loadHomeworkDayMarks(
  db: SupabaseClient,
  userId: string,
  slug: string,
  day: number
): Promise<{ marks: Record<string, QuestionMark>; due: string[] } | null> {
  const planId = await planIdOf(db, slug);
  if (!planId) return null;
  const items = await loadProgressItems(db, planId, day);
  if (items.length === 0) return null;
  const events = await loadEvents(
    db,
    userId,
    items.map((it) => it.questionId)
  );
  const { marks, due } = marksFor(items, events);
  return { marks, due: items.map((it) => it.questionId).filter((id) => due.has(id)) };
}
