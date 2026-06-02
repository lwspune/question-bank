import type { SupabaseClient } from "@supabase/supabase-js";
import {
  REPORT_RESOLUTION_NOTE_MAX,
  isReportStatus,
  type ReportStatus,
} from "@/lib/reports/types";

export type UpdateConceptReportInput = {
  reportId: string;
  /** Admin user UUID. Stamped onto resolved_by on terminal transitions. */
  actorUserId: string;
  status: ReportStatus;
  /** Optional resolution note when status is resolved/wont-fix/duplicate. */
  resolutionNote?: string | null;
};

export type UpdateConceptReportResult =
  | { kind: "ok" }
  | { kind: "not_found" }
  | { kind: "invalid_status" }
  | { kind: "invalid_resolution_note" }
  | { kind: "error"; message: string };

const TERMINAL_STATUSES: ReadonlySet<ReportStatus> = new Set([
  "resolved",
  "wont-fix",
  "duplicate",
]);

/**
 * Update the status (and optionally the resolution note) of a concept report.
 * RLS-enforced: only ADMIN of the report's owning org can update — a blocked
 * or non-existent row both return `not_found` (don't leak the distinction).
 *
 * Stamps resolved_at + resolved_by on terminal transitions; reverting to
 * open / in-review clears them. Parallels updateReport for question reports.
 */
export async function updateConceptReport(
  client: SupabaseClient,
  input: UpdateConceptReportInput
): Promise<UpdateConceptReportResult> {
  if (!isReportStatus(input.status)) {
    return { kind: "invalid_status" };
  }
  if (
    input.resolutionNote != null &&
    input.resolutionNote.length > REPORT_RESOLUTION_NOTE_MAX
  ) {
    return { kind: "invalid_resolution_note" };
  }

  const patch: Record<string, unknown> = { status: input.status };
  if (input.resolutionNote !== undefined) {
    patch.resolution_note = input.resolutionNote;
  }
  if (TERMINAL_STATUSES.has(input.status)) {
    patch.resolved_at = new Date().toISOString();
    patch.resolved_by = input.actorUserId;
  } else {
    patch.resolved_at = null;
    patch.resolved_by = null;
  }

  const { data, error } = await client
    .from("concept_reports")
    .update(patch)
    .eq("id", input.reportId)
    .select("id")
    .maybeSingle();

  if (error) {
    return { kind: "error", message: error.message };
  }
  if (!data) {
    return { kind: "not_found" };
  }
  return { kind: "ok" };
}
