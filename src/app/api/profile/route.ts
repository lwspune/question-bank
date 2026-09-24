/**
 * PATCH /api/profile — a signed-in student edits their own profile on /account
 * (Phase 2). Any subset of the self-serve fields (target exams, stage, medium,
 * stream, city, goal) plus mobile + consent. Own-row upsert via their JWT; only
 * the provided fields change, and onboarded_at is never touched.
 *
 * Never a hard gate: unknown enums null out, free text is trimmed/capped. Mobile
 * is the one field that DOES validate strictly (needs consent, DPDP) when set.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sanitizeProfileDetails } from "@/lib/profile/fields";
import { validateMobileSubmission } from "@/lib/profile/mobile";
import { updateOwnProfile, type ProfileUpdate } from "@/lib/profile/service";
import { sanitizeWeeklyGoal } from "@/lib/goals/weekly";

const BodySchema = z.object({
  targetExams: z.array(z.string()).max(20).optional(),
  stage: z.string().nullable().optional(),
  medium: z.string().nullable().optional(),
  stream: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  goal: z.string().nullable().optional(),
  mobile: z.string().max(20).optional(),
  consent: z.boolean().optional(),
  whatsappOptIn: z.boolean().optional(),
  /** Weekly sittings goal (ENGAGEMENT_SPEC.md §A3): 1..14, or null to clear. */
  weeklyGoal: z.union([z.number(), z.string(), z.null()]).optional(),
});

const DETAIL_KEYS = ["targetExams", "stage", "medium", "stream", "city", "goal"] as const;

export async function PATCH(request: NextRequest) {
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
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const body = parsed.data;

  // Only sanitise the detail keys the caller actually sent (partial patch).
  const detailInput: Record<string, unknown> = {};
  for (const k of DETAIL_KEYS) {
    if (k in body && body[k] !== undefined) detailInput[k] = body[k];
  }
  const patch: ProfileUpdate = sanitizeProfileDetails(detailInput);

  // Mobile is only written when a non-empty number is supplied — and then it
  // must carry affirmative consent (same rule as the mock-result gate).
  if (typeof body.mobile === "string" && body.mobile.trim() !== "") {
    const v = validateMobileSubmission({ mobile: body.mobile, consent: body.consent === true });
    if (!v.ok) {
      return NextResponse.json({ error: v.message, field: v.field }, { status: 400 });
    }
    patch.mobile = v.mobile;
    patch.consent = true;
  }

  // WhatsApp opt-in (capture-only): true = opt in, false = decline — both stamp
  // the ask-once gate in updateOwnProfile.
  if (body.whatsappOptIn !== undefined) patch.whatsappOptIn = body.whatsappOptIn;

  // Weekly goal: an explicit null clears it; anything that does not sanitize
  // is rejected rather than silently nulled, because "clear my goal" and "I
  // typed junk" are different requests.
  if (body.weeklyGoal !== undefined) {
    if (body.weeklyGoal === null) patch.weeklyGoal = null;
    else {
      const g = sanitizeWeeklyGoal(body.weeklyGoal);
      if (g === null) return NextResponse.json({ error: "Pick a goal between 1 and 14." }, { status: 400 });
      patch.weeklyGoal = g;
    }
  }

  try {
    const db = createSupabaseServerClient();
    await updateOwnProfile(db, user.id, patch);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("profile update error", err);
    return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
  }
}
