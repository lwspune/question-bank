/**
 * The tutor interest check's numbers for /dashboard/growth (migration 0190).
 * Service-role: the table has no read policy. Paged past PostgREST's
 * 1,000-row cap.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { summariseTutorInterest, type TutorInterestRow, type TutorInterestSummary } from "./interest";

type StoredRow = Omit<TutorInterestRow, "signed_in"> & { user_id: string | null };

export async function loadTutorInterestReadout(admin: SupabaseClient): Promise<TutorInterestSummary> {
  const rows = await readAllPages<StoredRow>((from, to) =>
    admin.from("tutor_interest").select("role, wants, mode, exam_slug, user_id").order("id").range(from, to)
  );
  return summariseTutorInterest(rows.map((r) => ({ ...r, signed_in: r.user_id !== null })));
}
