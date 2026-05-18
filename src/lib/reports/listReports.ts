import type { SupabaseClient } from "@supabase/supabase-js";
import type { ReportCategory, ReportStatus } from "./types";

export type ReportRow = {
  id: string;
  questionId: string;
  reportedBy: string | null;
  /** Email of the reporter — null when the auth user has been deleted. */
  reporterEmail: string | null;
  category: ReportCategory;
  details: string | null;
  status: ReportStatus;
  createdAt: string;
  resolvedAt: string | null;
  resolutionNote: string | null;
  /** Question metadata for the triage row breadcrumb. */
  question: {
    text: string;
    examName: string;
    subjectName: string;
    chapterName: string;
    subtopicName: string | null;
  };
};

export type ListReportsOpts = {
  /** Filter by status. Defaults to all statuses. */
  status?: ReportStatus | "all";
  /** Maximum rows to return. Default 50. */
  limit?: number;
};

const DEFAULT_LIMIT = 50;

/**
 * Lists reports visible to the caller. RLS scopes — ADMIN sees own-org
 * triage queue; TEACHER sees their own reports. The admin dashboard uses
 * this; the API filters by status server-side.
 *
 * Joined question metadata comes from a nested select so the triage row
 * can render the breadcrumb without an N+1 lookup.
 */
export async function listReports(
  client: SupabaseClient,
  opts: ListReportsOpts = {}
): Promise<ReportRow[]> {
  const limit = opts.limit ?? DEFAULT_LIMIT;

  let q = client
    .from("question_reports")
    .select(
      `
      id,
      question_id,
      reported_by,
      category,
      details,
      status,
      created_at,
      resolved_at,
      resolution_note,
      questions:question_id (
        text,
        exam:exam_id (name),
        subject:subject_id (name),
        chapter:chapter_id (name),
        subtopic:subtopic_id (name)
      )
    `
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (opts.status && opts.status !== "all") {
    q = q.eq("status", opts.status);
  }

  const { data, error } = await q;
  if (error) {
    throw new Error(`listReports: ${error.message}`);
  }

  // PostgREST returns nested relations as ARRAYS even for many-to-one FKs,
  // so the embedded `questions` / `exam` / etc. arrive as `T[]`. Flatten
  // by taking the first element (always 0 or 1 for these FK joins).
  type NestedName = { name: string }[] | null;
  type Raw = {
    id: string;
    question_id: string;
    reported_by: string | null;
    category: ReportCategory;
    details: string | null;
    status: ReportStatus;
    created_at: string;
    resolved_at: string | null;
    resolution_note: string | null;
    questions:
      | {
          text: string;
          exam: NestedName;
          subject: NestedName;
          chapter: NestedName;
          subtopic: NestedName;
        }[]
      | null;
  };

  const rows = (data ?? []) as unknown as Raw[];

  function pickName(rel: NestedName): string {
    if (!rel || rel.length === 0) return "";
    return rel[0].name ?? "";
  }

  return rows.map((r) => {
    const q = Array.isArray(r.questions) && r.questions.length > 0 ? r.questions[0] : null;
    return {
      id: r.id,
      questionId: r.question_id,
      reportedBy: r.reported_by,
      reporterEmail: null,
      category: r.category,
      details: r.details,
      status: r.status,
      createdAt: r.created_at,
      resolvedAt: r.resolved_at,
      resolutionNote: r.resolution_note,
      question: {
        text: q?.text ?? "",
        examName: pickName(q?.exam ?? null),
        subjectName: pickName(q?.subject ?? null),
        chapterName: pickName(q?.chapter ?? null),
        subtopicName: q?.subtopic && q.subtopic.length > 0 ? q.subtopic[0].name : null,
      },
    };
  });
}
