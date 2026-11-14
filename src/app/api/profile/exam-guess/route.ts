/**
 * POST /api/profile/exam-guess: the Home exam-guess card's records (migration
 * 0254). `{ action: "seen" }` when the card first comes into view,
 * `{ action: "correct" | "change" }` on a tap. Saving the exam itself goes
 * through PATCH /api/profile; this only records what the card did, for the
 * `exam-guess-card` readout.
 *
 * Signed-in only: session → rate-limit (IP) → validate → (a sighting only
 * while the student has no exam chosen) → service-role write (students can only read the
 * table). A card showing a live guess (none stored yet) stores it here, worked
 * out again on the server rather than taken from the request.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { getSessionUser } from "@/lib/auth";
import { getOnboardingState } from "@/lib/profile/service";
import { sanitizeTargetExams } from "@/lib/profile/onboarding";
import { parseExamGuessBody } from "@/lib/profile/examGuess";
import { recordGuessCardAction } from "@/lib/profile/examGuessServer";
import { loadSuggestedExam } from "@/lib/profile/suggestExamServer";
import { getExamIdMap } from "@/lib/exam/examIdMap";

export const maxDuration = 15;

const HOUR_MS = 60 * 60 * 1000;
const LIMIT = 60; // per IP per hour: a sighting and a tap per student, many students per school wifi

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

    const admin = createSupabaseAdminClient();
    const rl = await checkAndIncrement(admin, `exam-guess:${getClientIp(request)}`, {
      limit: LIMIT,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const v = parseExamGuessBody(raw);
    if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });

    // The card shows only while no exam is chosen, so a sighting after that is
    // stale and dropped. A tap is not: Correct saves the exam at the same
    // moment, and the save may land before this record does.
    if (v.value.action === "seen") {
      const profile = await getOnboardingState(createSupabaseServerClient(), user.id);
      if (sanitizeTargetExams(profile.targetExams).length > 0) return NextResponse.json({ ok: true, recorded: false });
    }

    const recorded = await recordGuessCardAction(admin, user.id, v.value.action, new Date(), async () =>
      loadSuggestedExam(admin, user.id, await getExamIdMap())
    );
    return NextResponse.json({ ok: true, recorded });
  } catch (err) {
    console.error("exam guess record failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not record that." }, { status: 500 });
  }
}
