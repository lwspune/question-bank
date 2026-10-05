/**
 * POST /api/me/projection-trial — the student taps "Reveal my projected score",
 * which starts its free days (migration 0134, owner 2026-10-05).
 *
 * Once ever is the TABLE's rule, not this route's: premium_trials is keyed on
 * (user, feature) and start_premium_trial inserts with ON CONFLICT DO NOTHING,
 * so a second tap, a second tab or a direct call returns the first start time.
 * The function can only stamp "now", so a start cannot be backdated.
 */
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const { data, error } = await createSupabaseServerClient().rpc("start_premium_trial", {
    p_feature: "projection",
  });
  if (error) {
    console.error("start_premium_trial failed", error.message);
    return NextResponse.json({ error: "Could not start it." }, { status: 500 });
  }
  return NextResponse.json({ startedAt: data as string });
}
