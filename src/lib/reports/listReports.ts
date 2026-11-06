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

  return toReportRows((data ?? []) as unknown as RawReportRow[]);
}

/** A PostgREST embed. A many-to-one embed (every one here) arrives as a single
 *  object or null. The array form is accepted too, so a client that returns one
 *  cannot blank the page again: until 2026-11-06 this file read ONLY the array
 *  form, and every report rendered as "(question deleted)" with no breadcrumb. */
type Embed<T> = T | T[] | null | undefined;

type NameEmbed = Embed<{ name: string | null }>;

export type RawReportRow = {
  id: string;
  question_id: string;
  reported_by: string | null;
  category: ReportCategory;
  details: string | null;
  status: ReportStatus;
  created_at: string;
  resolved_at: string | null;
  resolution_note: string | null;
  questions: Embed<{
    text: string | null;
    exam: NameEmbed;
    subject: NameEmbed;
    chapter: NameEmbed;
    subtopic: NameEmbed;
  }>;
};

function one<T>(embed: Embed<T>): T | null {
  if (Array.isArray(embed)) return embed[0] ?? null;
  return embed ?? null;
}

function nameOf(embed: NameEmbed): string | null {
  return one(embed)?.name ?? null;
}

/** Shapes raw `question_reports` rows (with the question embed) for the triage
 *  page. Pure, so the embed shape is pinned by a test. */
export function toReportRows(rows: readonly RawReportRow[]): ReportRow[] {
  return rows.map((r) => {
    const q = one(r.questions);
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
        examName: nameOf(q?.exam) ?? "",
        subjectName: nameOf(q?.subject) ?? "",
        chapterName: nameOf(q?.chapter) ?? "",
        subtopicName: nameOf(q?.subtopic),
      },
    };
  });
}
