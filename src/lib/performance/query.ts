/**
 * The `get_student_performance` read, with the Supabase client INJECTED so
 * `npm run perf:smoke` can drive this exact code path outside Next. The
 * `server-only` wrapper that supplies the service-role client is service.ts —
 * the same split as rosterQuery.ts <- admin.ts and detailQuery.ts <- detail.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  EMPTY_PERFORMANCE,
  type StudentPerformancePayload,
} from "./types";

/**
 * One round trip for a student's whole performance payload.
 *
 * The RPC returns jsonb, so this is ONE row and the PostgREST 1000-row cap
 * never applies — which is the point, since the heaviest student carries 4,500
 * facts. See the migration header for why that matters.
 *
 * A user with no attempts gets a well-formed empty payload from the RPC itself,
 * so `null` here means the call FAILED, never "nothing to show". The two must
 * stay distinguishable: an empty page is a fact about the student, a failed read
 * is a fact about us.
 */
export async function fetchStudentPerformance(
  db: SupabaseClient,
  userId: string
): Promise<StudentPerformancePayload> {
  // Cast: the generated DB types don't carry this RPC's signature, so
  // supabase-js can't infer the jsonb shape. It is asserted by the migration's
  // jsonb_build_object and exercised by `npm run perf:smoke` against live data.
  const { data, error } = (await db.rpc("get_student_performance", {
    p_user_id: userId,
  })) as unknown as { data: StudentPerformancePayload | null; error: { message: string } | null };

  if (error) throw new Error(`fetchStudentPerformance: ${error.message}`);
  // A missing `data` would mean the function returned SQL NULL, which it cannot
  // (jsonb_build_object with coalesced arrays always builds an object). Treat it
  // as empty rather than throwing: the page still renders the student.
  if (!data) return { userId, ...EMPTY_PERFORMANCE };
  return data;
}
