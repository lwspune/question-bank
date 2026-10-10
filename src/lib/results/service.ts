/**
 * Server-only reads and writes for the "did you clear it?" card (migration
 * 0149). Service role on purpose: students have no grant on student_results,
 * so they can never set `published`. The caller passes the SESSION user's id,
 * never one taken from the request.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getExamByName } from "@/lib/exam/examContext";
import { pendingChecks, suggestDisplayName, type OpenAnnouncement, type ResultAnswer } from "./check";
import type { ResultStage } from "./summary";

type RawAnnouncement = {
  id: string;
  sitting: string;
  stage: ResultStage;
  announced_on: string;
  ask_until: string;
  exams: { name: string } | null;
};

async function openAnnouncements(todayIso: string): Promise<OpenAnnouncement[]> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("result_announcements")
    .select("id, sitting, stage, announced_on, ask_until, exams(name)")
    .lte("announced_on", todayIso)
    .gte("ask_until", todayIso);
  if (error) throw new Error(`result announcements: ${error.message}`);
  return ((data ?? []) as unknown as RawAnnouncement[]).flatMap((a) => {
    const exam = getExamByName(a.exams?.name);
    if (!exam) return [];
    return [{
      id: a.id,
      examSlug: exam.slug,
      examName: exam.displayName,
      sitting: a.sitting,
      stage: a.stage,
      announcedOn: a.announced_on,
      askUntil: a.ask_until,
    }];
  });
}

/** The results to ask this student about today (usually none). */
export async function loadPendingResultChecks(
  userId: string,
  targetExams: readonly string[],
  todayIso: string
): Promise<OpenAnnouncement[]> {
  if (targetExams.length === 0) return [];
  const open = await openAnnouncements(todayIso);
  if (open.length === 0) return [];
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("student_results")
    .select("announcement_id")
    .eq("user_id", userId)
    .in("announcement_id", open.map((a) => a.id));
  if (error) throw new Error(`student results: ${error.message}`);
  const answered = new Set((data ?? []).map((r) => r.announcement_id as string));
  return pendingChecks(open, targetExams, answered, todayIso);
}

/**
 * Store a student's answer, always unpublished. A row staff have already
 * published is left as it is: answering again must never take a name down.
 */
export async function saveResultAnswer(
  userId: string,
  answer: ResultAnswer,
  todayIso: string
): Promise<"saved" | "closed" | "unchanged"> {
  const open = await openAnnouncements(todayIso);
  if (!open.some((a) => a.id === answer.announcementId)) return "closed";
  const db = createSupabaseAdminClient();
  const { data: existing, error: readErr } = await db
    .from("student_results")
    .select("published")
    .eq("announcement_id", answer.announcementId)
    .eq("user_id", userId)
    .maybeSingle();
  if (readErr) throw new Error(`student results: ${readErr.message}`);
  if (existing?.published) return "unchanged";
  const { error } = await db.from("student_results").upsert(
    {
      announcement_id: answer.announcementId,
      user_id: userId,
      outcome: answer.outcome,
      display_name: answer.displayName,
      show_publicly: answer.showPublicly,
      published: false,
      source: "self",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "announcement_id,user_id" }
  );
  if (error) throw new Error(`student results save: ${error.message}`);
  return "saved";
}

/** The account's name to fill in on the card, or "" when it looks like a handle. */
export async function loadSuggestedName(userId: string): Promise<string> {
  const { data } = await createSupabaseAdminClient().auth.admin.getUserById(userId);
  return suggestDisplayName(data.user?.user_metadata ?? null);
}
