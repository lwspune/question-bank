/**
 * The study-circle test's numbers for /dashboard/growth and the growth smoke
 * (migration 0247). Service role: the table has no read policy. Paged past
 * PostgREST's 1,000-row cap; staff (org members, platform admins) left out.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { summariseStudyCircle, type StudyCircleRow, type StudyCircleSummary } from "./core";

/** Seen, Yes and No, with staff (org members, platform admins) left out. */
export async function loadStudyCircleReadout(admin: SupabaseClient): Promise<StudyCircleSummary> {
  const [rows, members, admins] = await Promise.all([
    readAllPages<StudyCircleRow & { user_id: string }>((from, to) =>
      admin.from("study_circle_interest").select("user_id, answer, stage").order("user_id").range(from, to)
    ),
    readAllPages<{ user_id: string }>((from, to) =>
      admin.from("org_members").select("user_id").order("user_id").order("org_id").range(from, to)
    ),
    readAllPages<{ user_id: string }>((from, to) =>
      admin.from("platform_admins").select("user_id").order("user_id").range(from, to)
    ),
  ]);
  const staff = new Set([...members, ...admins].map((r) => r.user_id));
  return summariseStudyCircle(rows.filter((r) => !staff.has(r.user_id)));
}
