/**
 * `server-only` wrapper for the performance read: supplies the service-role
 * client and nothing else. The logic lives in query.ts so `npm run perf:smoke`
 * can drive it outside Next — the same split as detail.ts <- detailQuery.ts.
 *
 * SERVICE-ROLE because this reads ANOTHER user's own-row-RLS data (their
 * attempts and every answer). The route that calls it is superadmin-gated.
 *
 * AUTHORIZATION IS THE ROUTE'S JOB, NOT THIS FILE'S, and not compute.ts's. That
 * is what makes the later student-facing version a new page rather than a
 * refactor: it will call fetchStudentPerformance with the ANON client and the
 * viewer's own id, letting own-row RLS do the gating, and reuse the whole pure
 * core untouched. (It will also need an auth.uid()-scoped grant or sibling
 * function — the 0099 grant is service_role only by design.)
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchStudentPerformance } from "./query";
import type { StudentPerformancePayload } from "./types";

export async function getStudentPerformance(
  userId: string
): Promise<StudentPerformancePayload> {
  return fetchStudentPerformance(createSupabaseAdminClient(), userId);
}
