/**
 * The superadmin review of student results (/dashboard/results, migration
 * 0149): what students answered per announcement, the names waiting to be
 * shown, and publishing or declining them. Service role; the caller has
 * already checked requireSuperadmin.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getExamByName } from "@/lib/exam/examContext";
import { tallyOutcomes, type ResultOutcome } from "./check";
import { STAGE_LABEL, type ResultStage } from "./summary";

export type ReviewName = { id: string; name: string; source: "self" | "staff" };

export type ReviewAnnouncement = {
  id: string;
  label: string;
  askUntil: string;
  counts: Record<ResultOutcome, number>;
  /** Asked to be shown, not published yet. */
  waiting: ReviewName[];
  published: ReviewName[];
};

type RawAnnouncement = {
  id: string;
  sitting: string;
  stage: ResultStage;
  announced_on: string;
  ask_until: string;
  exams: { name: string } | null;
};

type RawResult = {
  id: string;
  announcement_id: string;
  outcome: ResultOutcome;
  display_name: string | null;
  show_publicly: boolean;
  published: boolean;
  source: "self" | "staff";
};

export async function listResultsForReview(): Promise<ReviewAnnouncement[]> {
  const db = createSupabaseAdminClient();
  const { data: anns, error: aErr } = await db
    .from("result_announcements")
    .select("id, sitting, stage, announced_on, ask_until, exams(name)")
    .order("announced_on", { ascending: false })
    .limit(200);
  if (aErr) throw new Error(`result announcements: ${aErr.message}`);

  const rows: RawResult[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("student_results")
      .select("id, announcement_id, outcome, display_name, show_publicly, published, source")
      .order("created_at")
      .range(from, from + 999);
    if (error) throw new Error(`student results: ${error.message}`);
    rows.push(...((data ?? []) as RawResult[]));
    if (!data || data.length < 1000) break;
  }

  return ((anns ?? []) as unknown as RawAnnouncement[]).map((a) => {
    const mine = rows.filter((r) => r.announcement_id === a.id);
    const named = (r: RawResult): ReviewName => ({ id: r.id, name: r.display_name ?? "", source: r.source });
    return {
      id: a.id,
      label: `${a.exams?.name ?? "?"} · ${a.sitting} · ${STAGE_LABEL[a.stage]}`,
      askUntil: a.ask_until,
      counts: tallyOutcomes(mine.map((r) => r.outcome)),
      waiting: mine.filter((r) => r.show_publicly && !r.published).map(named),
      published: mine.filter((r) => r.published).map(named),
    };
  });
}

/**
 * publish: show the name. unpublish: take it down, keeping the student's
 * consent (it can go back up). decline: take it down and drop the request,
 * so it leaves the waiting list; the answer itself is kept for the counts.
 * Returns the exam's slug, so the caller can refresh that exam's pages.
 */
export async function reviewResult(id: string, action: "publish" | "unpublish" | "decline"): Promise<string | null> {
  const db = createSupabaseAdminClient();
  const patch =
    action === "publish"
      ? { published: true }
      : action === "unpublish"
        ? { published: false }
        : { published: false, show_publicly: false };
  const { data, error } = await db
    .from("student_results")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("result_announcements(exams(name))")
    .single();
  if (error) throw new Error(`student results review: ${error.message}`);
  const name = (data as unknown as { result_announcements: { exams: { name: string } | null } | null })
    .result_announcements?.exams?.name;
  return getExamByName(name)?.slug ?? null;
}
