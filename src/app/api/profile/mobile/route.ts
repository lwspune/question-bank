/**
 * POST /api/profile/mobile — a signed-in student saves their own contact mobile
 * (the "gate the reward" capture at the mock result page). Writes their OWN
 * student_profiles row through the user's JWT (RLS own-row upsert, 0045).
 *
 * Flow: require session → validate mobile + consent (pure) → upsert canonical
 * mobile. Idempotent: a re-submit just overwrites (e.g. correcting a typo).
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validateMobileSubmission } from "@/lib/profile/mobile";
import { saveOwnMobile } from "@/lib/profile/service";

const BodySchema = z.object({
  mobile: z.string().min(1).max(20),
  consent: z.literal(true), // must affirmatively consent (DPDP)
});

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid mobile number and accept the consent." },
      { status: 400 }
    );
  }

  const validation = validateMobileSubmission(parsed.data);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message, field: validation.field }, { status: 400 });
  }

  try {
    const db = createSupabaseServerClient();
    await saveOwnMobile(db, user.id, validation.mobile, true);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("profile mobile save error", err);
    return NextResponse.json({ error: "Could not save your number. Please try again." }, { status: 500 });
  }
}
