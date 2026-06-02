import type { SupabaseClient } from "@supabase/supabase-js";
import type { ConceptReportCategory } from "./types";
import type { ReportStatus } from "@/lib/reports/types";

export type ConceptReportRow = {
  id: string;
  subtopicSlug: string;
  conceptSlug: string;
  /** Denormalized breadcrumb — no join needed. */
  examName: string;
  subjectName: string;
  chapterName: string;
  subtopicName: string;
  conceptName: string;
  /** Route segments for the live concept anchor link. */
  subjectRoute: string;
  chapterSlug: string;
  reportedBy: string | null;
  category: ConceptReportCategory;
  details: string | null;
  status: ReportStatus;
  createdAt: string;
  resolvedAt: string | null;
  resolutionNote: string | null;
};

export type ListConceptReportsOpts = {
  /** Filter by status. Defaults to all statuses. */
  status?: ReportStatus | "all";
  /** Maximum rows to return. Default 50. */
  limit?: number;
};

const DEFAULT_LIMIT = 50;

/**
 * Lists concept reports visible to the caller. RLS scopes — ADMIN sees own-org
 * triage queue; reporter sees their own. Everything needed for the triage row
 * is denormalized on the row, so no joins.
 */
export async function listConceptReports(
  client: SupabaseClient,
  opts: ListConceptReportsOpts = {}
): Promise<ConceptReportRow[]> {
  const limit = opts.limit ?? DEFAULT_LIMIT;

  let q = client
    .from("concept_reports")
    .select(
      `
      id,
      subtopic_slug,
      concept_slug,
      exam_name,
      subject_name,
      chapter_name,
      subtopic_name,
      concept_name,
      subject_route,
      chapter_slug,
      reported_by,
      category,
      details,
      status,
      created_at,
      resolved_at,
      resolution_note
    `
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (opts.status && opts.status !== "all") {
    q = q.eq("status", opts.status);
  }

  const { data, error } = await q;
  if (error) {
    throw new Error(`listConceptReports: ${error.message}`);
  }

  type Raw = {
    id: string;
    subtopic_slug: string;
    concept_slug: string;
    exam_name: string;
    subject_name: string;
    chapter_name: string;
    subtopic_name: string;
    concept_name: string;
    subject_route: string;
    chapter_slug: string;
    reported_by: string | null;
    category: ConceptReportCategory;
    details: string | null;
    status: ReportStatus;
    created_at: string;
    resolved_at: string | null;
    resolution_note: string | null;
  };

  const rows = (data ?? []) as unknown as Raw[];

  return rows.map((r) => ({
    id: r.id,
    subtopicSlug: r.subtopic_slug,
    conceptSlug: r.concept_slug,
    examName: r.exam_name,
    subjectName: r.subject_name,
    chapterName: r.chapter_name,
    subtopicName: r.subtopic_name,
    conceptName: r.concept_name,
    subjectRoute: r.subject_route,
    chapterSlug: r.chapter_slug,
    reportedBy: r.reported_by,
    category: r.category,
    details: r.details,
    status: r.status,
    createdAt: r.created_at,
    resolvedAt: r.resolved_at,
    resolutionNote: r.resolution_note,
  }));
}
