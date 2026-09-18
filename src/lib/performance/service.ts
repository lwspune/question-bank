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
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchStudentPerformance } from "./query";
import { EMPTY_PERFORMANCE, type StudentPerformancePayload } from "./types";

export async function getStudentPerformance(
  userId: string
): Promise<StudentPerformancePayload> {
  return fetchStudentPerformance(createSupabaseAdminClient(), userId);
}

/**
 * The STUDENT'S OWN payload, read with their own JWT through
 * get_own_performance() (migration 0110).
 *
 * No user id is passed and none can be: the RPC takes no argument and resolves
 * auth.uid() server-side, so there is no parameter for a caller to tamper with.
 * This is the whole reason the student route needed a new function rather than
 * a grant on the existing one.
 */
export async function getOwnPerformance(): Promise<StudentPerformancePayload | null> {
  const db = createSupabaseServerClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return null;
  const { data, error } = (await db.rpc("get_own_performance")) as unknown as {
    data: StudentPerformancePayload | null;
    error: { message: string } | null;
  };
  if (error) throw new Error(`getOwnPerformance: ${error.message}`);
  return data ?? { userId: user.id, ...EMPTY_PERFORMANCE };
}

/**
 * ONE student's payload for a staff viewer, gated IN THE DATABASE by
 * get_student_performance_for_staff (migration 0110): superadmin sees anyone,
 * an org admin sees their org's enrolled students, a teacher sees only the
 * students enrolled in a batch of a branch they are assigned to.
 *
 * Returns null on a refusal rather than throwing, so the route can answer 404 —
 * a "not authorized" that renders as a stack trace tells an unauthorized reader
 * that the student exists, which is itself a disclosure.
 */
export async function getStaffStudentPerformance(
  userId: string
): Promise<StudentPerformancePayload | null> {
  const db = createSupabaseServerClient();
  const { data, error } = (await db.rpc("get_student_performance_for_staff", {
    p_user_id: userId,
  })) as unknown as {
    data: StudentPerformancePayload | null;
    error: { message: string; code?: string } | null;
  };
  if (error) {
    // 42501 is the function's own "not authorized" — expected, not a fault.
    if (error.code === "42501" || /not authori/i.test(error.message)) return null;
    throw new Error(`getStaffStudentPerformance: ${error.message}`);
  }
  return data;
}
