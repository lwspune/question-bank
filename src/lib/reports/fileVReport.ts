/**
 * V files a slip it spotted in our solution as a question report (migration
 * 0183, 2026-10-23), for triage at /dashboard/reports beside the students'.
 * Category 'incorrect-solution', details starting "V, while explaining:", no
 * user named, in the question's org. One open V report per question is a
 * property of the TABLE (a unique index): a second call while one is open
 * comes back "already". Never throws: a report must not break V's answer.
 *
 * Takes the service-role client (V has no account, and the insert policy
 * needs one). Spec: tests/reports-v-solution.test.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export type VReportResult = "filed" | "already" | "failed";

const DETAILS_MAX = 2000;

export async function fileVSolutionReport(admin: SupabaseClient, questionId: string, issue: string): Promise<VReportResult> {
  try {
    const { data: q, error: qErr } = await admin.from("questions").select("org_id").eq("id", questionId).maybeSingle();
    if (qErr || !q) {
      if (qErr) console.error("fileVSolutionReport question:", qErr.message);
      return "failed";
    }
    const { error } = await admin.from("question_reports").insert({
      question_id: questionId,
      reported_by: null,
      org_id: q.org_id,
      category: "incorrect-solution",
      details: `V, while explaining: ${issue}`.slice(0, DETAILS_MAX),
      filed_by_v: true,
    });
    if (!error) return "filed";
    // 23505: the unique index one_open_v_report_per_question, a V report on it is already open.
    if (error.code === "23505") return "already";
    console.error("fileVSolutionReport:", error.message);
    return "failed";
  } catch (err) {
    console.error("fileVSolutionReport:", err);
    return "failed";
  }
}
