import type { SupabaseClient } from "@supabase/supabase-js";
import {
  REPORT_RESOLUTION_NOTE_MAX,
  isReportStatus,
  type ReportStatus,
} from "./types";

export type UpdateReportInput = {
  reportId: string;
  /** Admin user UUID. Stamped onto resolved_by when status transitions to a terminal state. */
  actorUserId: string;
  /** New status. */
  status: ReportStatus;
  /** Optional resolution note when status is resolved/wont-fix/duplicate. */
  resolutionNote?: string | null;
};

export type UpdateReportResult =
  | { kind: "ok" }
  | { kind: "not_found" }
  | { kind: "invalid_status" }
  | { kind: "invalid_resolution_note" }
  | { kind: "forbidden" }
  | { kind: "error"; message: string };

const TERMINAL_STATUSES: ReadonlySet<ReportStatus> = new Set([
  "resolved",
  "wont-fix",
  "duplicate",
]);

/**
 * Update the status (and optionally the resolution note) of a report.
 * RLS-enforced: only ADMIN of the report's owning org can update.
 *
 * Stamps resolved_at + resolved_by automatically when transitioning to a
 * terminal status. Reverting to open clears those fields.
 *
 * Returns a discriminated union for the route handler to map to HTTP.
 */
export async function updateReport(
  client: SupabaseClient,
  input: UpdateReportInput
): Promise<UpdateReportResult> {
  if (!isReportStatus(input.status)) {
    return { kind: "invalid_status" };
  }
  if (
    input.resolutionNote != null &&
    input.resolutionNote.length > REPORT_RESOLUTION_NOTE_MAX
  ) {
    return { kind: "invalid_resolution_note" };
  }

  const patch: Record<string, unknown> = {
    status: input.status,
  };
  if (input.resolutionNote !== undefined) {
    patch.resolution_note = input.resolutionNote;
  }
  if (TERMINAL_STATUSES.has(input.status)) {
    patch.resolved_at = new Date().toISOString();
    patch.resolved_by = input.actorUserId;
  } else {
    // Reverting to open / in-review clears resolution stamps.
    patch.resolved_at = null;
    patch.resolved_by = null;
  }

  const { data, error } = await client
    .from("question_reports")
    .update(patch)
    .eq("id", input.reportId)
    .select("id")
    .maybeSingle();

  if (error) {
    return { kind: "error", message: error.message };
  }
  if (!data) {
    // No row updated — either non-existent or RLS blocked it. Don't leak
    // the distinction; the route handler maps this to 404.
    return { kind: "not_found" };
  }
  return { kind: "ok" };
}
