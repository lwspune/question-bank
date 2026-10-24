/**
 * Loaders for /me/answer-sheets (migration 0153). The `Own` loaders take the
 * STUDENT'S client: row-level security is what limits them to the student's
 * own sheets, so a wrong id simply finds nothing.
 *
 * The `Student` loaders are for a superadmin reading one student's sheets
 * (the performance page and its report, 2026-10-22). The tables only let a
 * student read their own rows, so these take the SERVICE-ROLE client and
 * filter by the student's id themselves; the caller must have checked for a
 * superadmin first.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { slugify } from "@/lib/board/query";
import { getExamByName } from "@/lib/exam/examContext";
import type { GradeCause, GradeOutcome } from "./grade";
import type { ReportGrade } from "./report";

export type SubmissionStatus = "uploading" | "submitted" | "graded" | "rejected";

export type OwnSubmission = {
  id: string;
  status: SubmissionStatus;
  submittedAt: string | null;
  gradedAt: string | null;
  regradedAt: string | null;
  totalAwarded: number | null;
  totalMax: number | null;
  wentWell: string | null;
  nextSteps: string | null;
  rejectedReason: string | null;
  /** Pages with our marks on them (0175); null on a sheet graded before. */
  markedPages: number | null;
  /** The scans and marked pages were deleted 30 days after checking. */
  scansDeleted: boolean;
  paper: {
    title: string;
    examId: string;
    subjectId: string;
    /** /question-papers/<exam>/<subject>/<group>, or null if the paper is no longer published. */
    href: string | null;
  } | null;
};

type RawPaper = {
  title: string;
  exam_id: string;
  subject_id: string;
  group_slug: string;
  exams: { name: string } | { name: string }[] | null;
  subjects: { name: string } | { name: string }[] | null;
};

type RawSubmission = {
  id: string;
  status: SubmissionStatus;
  submitted_at: string | null;
  graded_at: string | null;
  regraded_at: string | null;
  total_awarded: number | null;
  total_max: number | null;
  went_well: string | null;
  next_steps: string | null;
  rejected_reason: string | null;
  marked_pages: number | null;
  scans_deleted_at: string | null;
  board_papers: RawPaper | RawPaper[] | null;
};

const COLUMNS =
  "id, status, submitted_at, graded_at, regraded_at, total_awarded, total_max, went_well, next_steps, rejected_reason, marked_pages, scans_deleted_at, board_papers(title, exam_id, subject_id, group_slug, exams(name), subjects(name))";

function one<T>(v: T | T[] | null): T | null {
  return Array.isArray(v) ? v[0] ?? null : v;
}

function toSubmission(r: RawSubmission): OwnSubmission {
  const p = one(r.board_papers);
  const examName = p ? one(p.exams)?.name ?? "" : "";
  const subjectName = p ? one(p.subjects)?.name ?? "" : "";
  const examSlug = getExamByName(examName)?.slug ?? null;
  return {
    id: r.id,
    status: r.status,
    submittedAt: r.submitted_at,
    gradedAt: r.graded_at,
    regradedAt: r.regraded_at,
    totalAwarded: r.total_awarded === null ? null : Number(r.total_awarded),
    totalMax: r.total_max === null ? null : Number(r.total_max),
    wentWell: r.went_well,
    nextSteps: r.next_steps,
    rejectedReason: r.rejected_reason,
    markedPages: r.marked_pages,
    scansDeleted: r.scans_deleted_at !== null,
    paper: p
      ? {
          title: p.title,
          examId: p.exam_id,
          subjectId: p.subject_id,
          href: examSlug ? `/question-papers/${examSlug}/${slugify(subjectName)}/${p.group_slug}` : null,
        }
      : null,
  };
}

/** The student's sent sheets, newest first (an unfinished upload is not listed). */
export async function listOwnSubmissions(db: SupabaseClient): Promise<OwnSubmission[]> {
  return listSubmissions(db, null);
}

/** One student's sent sheets, for a superadmin. `admin` is the service-role client. */
export async function listStudentSubmissions(admin: SupabaseClient, userId: string): Promise<OwnSubmission[]> {
  return listSubmissions(admin, userId);
}

async function listSubmissions(db: SupabaseClient, userId: string | null): Promise<OwnSubmission[]> {
  let q = db.from("answer_submissions").select(COLUMNS).neq("status", "uploading");
  if (userId) q = q.eq("user_id", userId);
  const { data, error } = await q.order("created_at", { ascending: false }).limit(200);
  if (error) throw new Error(`answer sheets: ${error.message}`);
  return ((data ?? []) as unknown as RawSubmission[]).map(toSubmission);
}

export type OwnReport = OwnSubmission & {
  grades: ReportGrade[];
  /** position -> the student's question about that grade, and our answer if any. */
  questions: Map<number, { message: string; resolution: string | null }>;
  /** questionId -> its chapter, for "practise this chapter" links. */
  chapters: Map<string, { id: string; name: string }>;
};

export async function getOwnReport(db: SupabaseClient, id: string): Promise<OwnReport | null> {
  return loadReport(db, id, null);
}

/**
 * One student's sheet, for a superadmin. Found by the sheet id AND the
 * student's id, so a sheet id under the wrong student's URL finds nothing.
 */
export async function getStudentReport(admin: SupabaseClient, userId: string, id: string): Promise<OwnReport | null> {
  return loadReport(admin, id, userId);
}

async function loadReport(db: SupabaseClient, id: string, userId: string | null): Promise<OwnReport | null> {
  let q = db.from("answer_submissions").select(COLUMNS).eq("id", id);
  if (userId) q = q.eq("user_id", userId);
  const { data, error } = await q.maybeSingle();
  if (error) throw new Error(`answer sheet: ${error.message}`);
  if (!data) return null;
  const sub = toSubmission(data as unknown as RawSubmission);

  const [{ data: grades, error: gErr }, { data: disputes, error: dErr }] = await Promise.all([
    db
      .from("answer_grades")
      .select("position, printed_number, question_id, max_marks, outcome, awarded, earned, missing, cause, topic")
      .eq("submission_id", id)
      .order("position"),
    db.from("answer_grade_disputes").select("position, message, resolution").eq("submission_id", id),
  ]);
  if (gErr) throw new Error(`answer grades: ${gErr.message}`);
  if (dErr) throw new Error(`answer grade questions: ${dErr.message}`);

  const rows: ReportGrade[] = (grades ?? []).map((g) => ({
    position: g.position as number,
    printedNumber: g.printed_number as string,
    questionId: (g.question_id as string | null) ?? null,
    maxMarks: Number(g.max_marks),
    outcome: g.outcome as GradeOutcome,
    awarded: g.awarded === null ? null : Number(g.awarded),
    earned: (g.earned as string | null) ?? null,
    missing: (g.missing as string | null) ?? null,
    cause: (g.cause as GradeCause | null) ?? null,
    topic: (g.topic as string | null) ?? null,
  }));

  const chapters = new Map<string, { id: string; name: string }>();
  const ids = [...new Set(rows.map((r) => r.questionId).filter((x): x is string => !!x))];
  for (let i = 0; i < ids.length; i += 150) {
    const { data: qs, error: qErr } = await db
      .from("questions")
      .select("id, chapters(id, name)")
      .in("id", ids.slice(i, i + 150));
    if (qErr) throw new Error(`answer sheet chapters: ${qErr.message}`);
    for (const q of (qs ?? []) as { id: string; chapters: { id: string; name: string } | { id: string; name: string }[] | null }[]) {
      const ch = one(q.chapters);
      if (ch) chapters.set(q.id, ch);
    }
  }

  return {
    ...sub,
    grades: rows,
    questions: new Map(
      (disputes ?? []).map((d) => [d.position as number, { message: d.message as string, resolution: (d.resolution as string | null) ?? null }])
    ),
    chapters,
  };
}
