/**
 * POST /api/study-circle: the Home study-circle card's writes (migration 0247).
 * `{ action: "shown" }` when the card first comes into view (recorded once),
 * `{ action: "answer", answer: "yes" | "no" }` when the student taps.
 *
 * Signed-in only: session → rate-limit (IP) → validate → test still running →
 * the student's stage and exams from their own profile → service-role upsert
 * on user_id. The table has no policies, so this route is its only writer.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { getSessionUser } from "@/lib/auth";
import { getOnboardingState } from "@/lib/profile/service";
import { isStage, sanitizeTargetExams } from "@/lib/profile/onboarding";
import { STUDY_CIRCLE_ENDS, parseStudyCircleBody } from "@/lib/studyCircle/core";

export const maxDuration = 15;

const HOUR_MS = 60 * 60 * 1000;
const LIMIT = 30; // per IP per hour: one sighting and one answer per student, many students per school wifi

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Sign in to answer." }, { status: 401 });

    const admin = createSupabaseAdminClient();
    const rl = await checkAndIncrement(admin, `study-circle:${getClientIp(request)}`, { limit: LIMIT, windowMs: HOUR_MS });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many answers. Please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const v = parseStudyCircleBody(raw);
    if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });

    const now = new Date();
    if (now.getTime() >= STUDY_CIRCLE_ENDS.getTime()) {
      return NextResponse.json({ error: "This question has closed." }, { status: 409 });
    }

    const profile = await getOnboardingState(createSupabaseServerClient(), user.id);
    const base = {
      user_id: user.id,
      stage: isStage(profile.stage) ? profile.stage : null,
      exams: sanitizeTargetExams(profile.targetExams),
    };
    const shown = v.value.action === "shown";
    const row =
      v.value.action === "shown" ? base : { ...base, answer: v.value.answer, answered_at: now.toISOString() };

    // A sighting never overwrites an existing row (it may hold an answer); an
    // answer creates the row if the sighting never arrived.
    const { error } = await admin
      .from("study_circle_interest")
      .upsert(row, { onConflict: "user_id", ignoreDuplicates: shown });
    if (error) {
      console.error("study circle write failed:", error.message);
      return NextResponse.json({ error: "Could not save your answer. Please try again." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("study circle failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save your answer. Please try again." }, { status: 500 });
  }
}
