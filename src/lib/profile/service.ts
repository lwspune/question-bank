/**
 * Student-profile reads/writes (server-only). Takes an RLS-bound Supabase client
 * + the acting userId; ownership is enforced by RLS on student_profiles (0045),
 * the explicit `.eq("user_id", …)` is belt-and-suspenders. Validation is the
 * pure helper in mobile.ts — this layer only does the DB round-trip.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

/** The student's stored contact mobile (canonical 91XXXXXXXXXX), or null if not
 *  yet captured. Used by the mock-result gate to decide whether to ask. */
export async function getOwnMobile(
  db: SupabaseClient,
  userId: string
): Promise<{ mobile: string | null }> {
  const { data } = await db
    .from("student_profiles")
    .select("mobile")
    .eq("user_id", userId)
    .maybeSingle();
  return { mobile: (data?.mobile as string | undefined) ?? null };
}

/** Upsert the student's own profile mobile + consent. `mobile` must already be
 *  the canonical form (validateMobileSubmission). Throws on DB error. */
export async function saveOwnMobile(
  db: SupabaseClient,
  userId: string,
  mobile: string,
  consent: boolean
): Promise<void> {
  const { error } = await db.from("student_profiles").upsert(
    {
      user_id: userId,
      mobile,
      consent,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
  if (error) throw new Error(error.message);
}
