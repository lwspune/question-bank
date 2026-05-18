import type { SupabaseClient } from "@supabase/supabase-js";
import {
  REPORT_DETAILS_MAX,
  isReportCategory,
  type ReportCategory,
} from "./types";

export type CreateReportInput = {
  questionId: string;
  /** Must equal auth.uid() for the calling JWT — RLS enforces this. */
  reportedBy: string;
  category: ReportCategory;
  /** Optional free-text context. Capped at REPORT_DETAILS_MAX. */
  details: string | null;
};

export type CreateReportResult =
  | { kind: "ok"; id: string }
  | { kind: "duplicate_open_report" }
  | { kind: "question_not_found" }
  | { kind: "invalid_category" }
  | { kind: "invalid_details" }
  | { kind: "error"; message: string };

const UNIQUE_VIOLATION = "23505";

/**
 * Creates a question_reports row on behalf of the authenticated caller.
 * Resolves the question's org_id and denormalizes it onto the report so
 * the admin triage queue can read with a single indexed lookup.
 *
 * RLS enforces that `reported_by` matches the caller's auth.uid(). The
 * partial unique index on (reported_by, question_id) WHERE status='open'
 * blocks repeat reports while a previous one is unresolved.
 *
 * Must be called with a user-bound SupabaseClient (not service role), so
 * the question read respects PUBLIC/own-org-PRIVATE visibility.
 */
export async function createReport(
  client: SupabaseClient,
  input: CreateReportInput
): Promise<CreateReportResult> {
  if (!isReportCategory(input.category)) {
    return { kind: "invalid_category" };
  }
  if (input.details !== null && input.details.length > REPORT_DETAILS_MAX) {
    return { kind: "invalid_details" };
  }

  // Resolve the question's org. RLS scopes — if the caller can't see the
  // question, this returns null and we report "not found" (don't leak the
  // distinction between missing and forbidden).
  const { data: question, error: qErr } = await client
    .from("questions")
    .select("org_id")
    .eq("id", input.questionId)
    .maybeSingle();
  if (qErr) {
    return { kind: "error", message: `lookup failed: ${qErr.message}` };
  }
  if (!question) {
    return { kind: "question_not_found" };
  }

  const { data: inserted, error: insErr } = await client
    .from("question_reports")
    .insert({
      question_id: input.questionId,
      reported_by: input.reportedBy,
      org_id: (question as { org_id: string }).org_id,
      category: input.category,
      details: input.details ?? null,
    })
    .select("id")
    .single();

  if (insErr) {
    if (insErr.code === UNIQUE_VIOLATION) {
      return { kind: "duplicate_open_report" };
    }
    return { kind: "error", message: insErr.message };
  }

  return { kind: "ok", id: (inserted as { id: string }).id };
}
