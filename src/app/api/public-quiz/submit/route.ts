/**
 * POST /api/public-quiz/submit — the public quiz funnel's one anon write.
 *
 * Flow: rate-limit (IP) → validate (zod) → normalise/validate mobile + require
 * consent → fetch the answer key SERVER-SIDE (getGradingBySlug, gated on
 * public_slug) → grade → record the lead (retake-aware) → return score + the
 * key + /notes links + the billingLive flag. The answer key is revealed ONLY in
 * this response, after the visitor is captured.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { isBillingConfigured } from "@/lib/billing/razorpay";
import { getGradingBySlug, recordLead } from "@/lib/quiz/publicQuiz";
import { buildSubmitResult } from "@/lib/quiz/submit";
import { normalizeMobile } from "@/lib/quiz/leads";

export const maxDuration = 30;

const HOUR_MS = 60 * 60 * 1000;
const SUBMIT_LIMIT = 30; // per IP per hour — generous for genuine retakes

const BodySchema = z.object({
  slug: z.string().min(1).max(120),
  name: z.string().trim().min(1).max(80),
  mobile: z.string().min(1).max(20),
  consent: z.literal(true), // must affirmatively consent (DPDP)
  answers: z.record(z.string(), z.string()),
  utmSource: z.string().max(120).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const admin = createSupabaseAdminClient();

    // Rate-limit BEFORE parsing so junk still counts toward the bucket.
    const rl = await checkAndIncrement(admin, `public-quiz:anon:${getClientIp(request)}`, {
      limit: SUBMIT_LIMIT,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many submissions — try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please enter your name, a valid mobile, and accept the consent." },
        { status: 400 }
      );
    }
    const body = parsed.data;

    const mobile = normalizeMobile(body.mobile);
    if (!mobile) {
      return NextResponse.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
    }

    const grading = await getGradingBySlug(admin, body.slug);
    if (!grading) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    const result = buildSubmitResult(grading, body.answers, isBillingConfigured());

    await recordLead(admin, {
      quizId: grading.quizId,
      name: body.name.trim(),
      mobile,
      score: result.score,
      correct: result.correct,
      incorrect: result.incorrect,
      notAttempted: result.notAttempted,
      total: result.total,
      answers: body.answers,
      utmSource: body.utmSource ?? null,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("public-quiz submit error", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
