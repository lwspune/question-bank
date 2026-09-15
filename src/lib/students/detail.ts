/**
 * `server-only` wrapper for the /dashboard/students/[id] loader: supplies the
 * service-role client and nothing else. The logic lives in detailQuery.ts so
 * `npm run students:smoke` can drive it outside Next — the same split as
 * admin.ts ← rosterQuery.ts.
 *
 * Service-role because this reads across ALL students' own-row-RLS data
 * (profiles, attempts, activity) plus auth.users. The page is superadmin-gated.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchStudentDetail, type StudentDetail } from "./detailQuery";

export type {
  StudentDetail,
  StudentProfile,
  StudentPremium,
  StudentCapture,
  StudentEngagement,
  StudentActivityEntry,
  StudentAttemptSummary,
} from "./detailQuery";

export async function getStudentDetail(userId: string): Promise<StudentDetail | null> {
  return fetchStudentDetail(createSupabaseAdminClient(), userId);
}
