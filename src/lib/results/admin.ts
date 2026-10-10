/**
 * The superadmin review of student results (/dashboard/results, migration
 * 0149): what students answered per announcement, the names waiting to be
 * shown, and publishing or declining them. Service role; the caller has
 * already checked requireSuperadmin.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getExamByName, getExamBySlug } from "@/lib/exam/examContext";
import type { StaffMark } from "./mark";
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

/** An announced result, as the "Mark result" form lists it. Newest first. */
export type AnnouncementOption = { id: string; label: string; examSlug: string };

export async function listAnnouncementOptions(): Promise<AnnouncementOption[]> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("result_announcements")
    .select("id, sitting, stage, announced_on, exams(name)")
    .order("announced_on", { ascending: false })
    .limit(200);
  if (error) throw new Error(`result announcements: ${error.message}`);
  return ((data ?? []) as unknown as RawAnnouncement[]).flatMap((a) => {
    const exam = getExamByName(a.exams?.name);
    if (!exam) return [];
    return [{ id: a.id, label: `${a.sitting} · ${STAGE_LABEL[a.stage]}`, examSlug: exam.slug }];
  });
}

/** One student's results, for their dashboard page. */
export type StudentResultRow = { id: string; label: string; name: string | null; published: boolean; source: "self" | "staff"; outcome: ResultOutcome };

export async function listStudentResults(userId: string): Promise<StudentResultRow[]> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("student_results")
    .select("id, outcome, display_name, published, source, result_announcements(sitting, stage, exams(name))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`student results: ${error.message}`);
  type Row = RawResult & { result_announcements: { sitting: string; stage: ResultStage } | null };
  return ((data ?? []) as unknown as Row[]).map((r) => ({
    id: r.id,
    label: r.result_announcements ? `${r.result_announcements.sitting} · ${STAGE_LABEL[r.result_announcements.stage]}` : "?",
    name: r.display_name,
    published: r.published,
    source: r.source,
    outcome: r.outcome,
  }));
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Publish a student's result in one step (staff know they cleared and have
 * their consent). A new result is created first, the same row
 * `results:announce` writes, so students who chose that exam are also asked
 * on /me for three weeks. Returns the exam's slug for the caller's refresh.
 */
export async function markStudentResult(mark: StaffMark, todayIso: string): Promise<string> {
  const db = createSupabaseAdminClient();
  let announcementId: string;
  let examSlug: string;

  if (mark.target.kind === "existing") {
    const { data, error } = await db
      .from("result_announcements")
      .select("id, exams(name)")
      .eq("id", mark.target.id)
      .single();
    if (error || !data) throw new Error("That result no longer exists.");
    const exam = getExamByName((data as unknown as { exams: { name: string } | null }).exams?.name);
    if (!exam) throw new Error("That result's exam is not on the site.");
    announcementId = data.id as string;
    examSlug = exam.slug;
  } else {
    const exam = getExamBySlug(mark.target.examSlug)!;
    const { data: examRow, error: examErr } = await db.from("exams").select("id").eq("name", exam.examName).single();
    if (examErr || !examRow) throw new Error(`No exam row named ${exam.examName}.`);
    // Find or create: typing a result that already exists must not reset its
    // ask window.
    const { data: found, error: findErr } = await db
      .from("result_announcements")
      .select("id")
      .eq("exam_id", examRow.id)
      .eq("sitting", mark.target.sitting)
      .eq("stage", mark.target.stage)
      .maybeSingle();
    if (findErr) throw new Error(`result announcement: ${findErr.message}`);
    if (found) {
      announcementId = found.id as string;
    } else {
      const { data: ann, error: annErr } = await db
        .from("result_announcements")
        .insert({
          exam_id: examRow.id,
          sitting: mark.target.sitting,
          stage: mark.target.stage,
          announced_on: todayIso,
          ask_until: addDays(todayIso, 21),
        })
        .select("id")
        .single();
      if (annErr || !ann) throw new Error(`result announcement: ${annErr?.message ?? "not saved"}`);
      announcementId = ann.id as string;
    }
    examSlug = exam.slug;
  }

  const { error } = await db.from("student_results").upsert(
    {
      announcement_id: announcementId,
      user_id: mark.userId,
      outcome: "cleared",
      display_name: mark.displayName,
      show_publicly: true,
      published: true,
      source: "staff",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "announcement_id,user_id" }
  );
  if (error) throw new Error(`student result: ${error.message}`);
  return examSlug;
}
