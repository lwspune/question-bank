/**
 * The tutor interest check's numbers for /dashboard/growth (migration 0190).
 * Service-role: the table has no read policy. Paged past PostgREST's
 * 1,000-row cap.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { readAllPages } from "@/lib/supabase/readAllPages";
import {
  buildTutorContacts,
  summariseTutorInterest,
  type TutorAnswerRow,
  type TutorContact,
  type TutorInterestRow,
  type TutorInterestSummary,
} from "./interest";

type StoredRow = Omit<TutorInterestRow, "signed_in"> & { user_id: string | null };

export async function loadTutorInterestReadout(admin: SupabaseClient): Promise<TutorInterestSummary> {
  const rows = await readAllPages<StoredRow>((from, to) =>
    admin.from("tutor_interest").select("role, wants, mode, exam_slug, user_id").order("id").range(from, to)
  );
  return summariseTutorInterest(rows.map((r) => ({ ...r, signed_in: r.user_id !== null })));
}

const IN_CHUNK = 200; // ids per .in() filter: the list rides in the URL

/**
 * The people who said Yes, with the name and email on their account and the
 * mobile on their profile, for the owner to reach (2026-10-28).
 */
export async function loadTutorContacts(
  admin: SupabaseClient
): Promise<{ contacts: TutorContact[]; unreachableYes: number }> {
  const rows = await readAllPages<TutorAnswerRow>((from, to) =>
    admin
      .from("tutor_interest")
      .select("user_id, role, wants, mode, exam_slug, created_at")
      .eq("wants", true)
      .order("id")
      .range(from, to)
  );
  const ids = Array.from(new Set(rows.map((r) => r.user_id).filter((id): id is string => id !== null)));

  const people = new Map<string, { name: string | null; email: string | null }>();
  await Promise.all(
    ids.map(async (id) => {
      const { data } = await admin.auth.admin.getUserById(id);
      const meta = (data.user?.user_metadata ?? {}) as { full_name?: string; name?: string };
      people.set(id, { name: meta.full_name ?? meta.name ?? null, email: data.user?.email ?? null });
    })
  );

  const mobiles = new Map<string, string>();
  for (let i = 0; i < ids.length; i += IN_CHUNK) {
    const { data, error } = await admin
      .from("student_profiles")
      .select("user_id, mobile")
      .in("user_id", ids.slice(i, i + IN_CHUNK));
    if (error) throw new Error(error.message);
    for (const p of data ?? []) if (p.mobile) mobiles.set(p.user_id as string, p.mobile as string);
  }

  return buildTutorContacts(rows, people, mobiles);
}
