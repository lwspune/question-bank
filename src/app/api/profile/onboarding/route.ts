/**
 * POST /api/profile/onboarding — a signed-in student saves their intent capture
 * (target exam(s) + stage) shown once right after sign-up. Writes their OWN
 * student_profiles row through their JWT (RLS own-row upsert, 0045/0048).
 *
 * Skippable by design: an empty body is a valid skip — it still stamps
 * onboarded_at so we never ask again. Returns the primary exam so the client can
 * set the qb_exam cookie and personalise immediately.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validateOnboardingSubmission, primaryExam } from "@/lib/profile/onboarding";
import { saveOnboarding } from "@/lib/profile/service";

const BodySchema = z.object({
  targetExams: z.array(z.string()).max(20).optional().default([]),
  stage: z.string().nullable().optional().default(null),
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
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Pure sanitiser — drops unknown exams, nulls an unknown stage, tolerates empty.
  const clean = validateOnboardingSubmission(parsed.data);

  try {
    const db = createSupabaseServerClient();
    await saveOnboarding(db, user.id, clean);
    return NextResponse.json({ ok: true, primaryExam: primaryExam(clean.targetExams) });
  } catch (err) {
    console.error("profile onboarding save error", err);
    return NextResponse.json(
      { error: "Could not save. Please try again." },
      { status: 500 }
    );
  }
}
