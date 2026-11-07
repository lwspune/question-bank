/**
 * The /me tutoring price card's server read (owner, 2026-11-07; migration
 * 0224): the account's price when its stored answer is a student Yes that owes
 * a price answer and no "Not now" is in force, else null. Service role, because
 * tutor_interest has no read policy (migration 0190); filtered on the user id.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { priceAskDue, priceForUser } from "./price";
import type { TutorRole } from "./interest";

export async function loadTutorPriceAsk(userId: string, now: Date): Promise<{ price: number } | null> {
  const { data, error } = await createSupabaseAdminClient()
    .from("tutor_interest")
    .select("role, wants, price_answer, price_snoozed_until")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  const row = data as {
    role: TutorRole;
    wants: boolean;
    price_answer: string | null;
    price_snoozed_until: string | null;
  } | null;
  return priceAskDue(row, now) ? { price: priceForUser(userId) } : null;
}
