/**
 * The read behind /dashboard/exam-features. No `server-only`, so
 * `npm run exam-features:smoke` can drive the same loader against live data.
 * get_exam_feature_coverage (migration 0253) is SECURITY DEFINER and granted
 * to service_role only, so pass the service-role client.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/db";
import { buildCoverageRows, examFactsFromCode, parseCoverageSnapshot, type CoverageResult } from "./build";

export async function fetchExamFeatures(client: SupabaseClient<Database>): Promise<CoverageResult> {
  const { data, error } = await client.rpc("get_exam_feature_coverage");
  if (error) throw new Error(`get_exam_feature_coverage: ${error.message}`);
  return buildCoverageRows(parseCoverageSnapshot(data), examFactsFromCode());
}
