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
import { saveOnboarding, persistAcquisition } from "@/lib/profile/service";
import { readAcquisitionCookie } from "@/lib/acquisition/cookie";

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

    // First-touch attribution (0106). The channel was parked in a cookie by the
    // client island on the visitor's FIRST page load, possibly weeks ago; this
    // is the earliest point at which a profile row exists to hang it on. The
    // write is write-once at the query level, and its failure must never cost a
    // student their onboarding — hence the inner catch.
    try {
      const acq = readAcquisitionCookie(request.cookies.get("qb_acq")?.value ?? null);
      if (acq) await persistAcquisition(db, user.id, acq);
    } catch (e) {
      console.error("acquisition persist", e instanceof Error ? e.message : e);
    }

    return NextResponse.json({ ok: true, primaryExam: primaryExam(clean.targetExams) });
  } catch (err) {
    console.error("profile onboarding save error", err);
    return NextResponse.json(
      { error: "Could not save. Please try again." },
      { status: 500 }
    );
  }
}
