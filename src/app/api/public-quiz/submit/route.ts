/**
 * POST /api/public-quiz/submit — grade a public quiz.
 *
 * Two paths, chosen by whether the caller is signed in:
 *   - ANON: rate-limit (IP) → validate (zod) → normalise/validate mobile +
 *     require consent → grade → record the lead (retake-aware). The lead capture
 *     IS the price of the score for an anonymous visitor.
 *   - SIGNED-IN: a known account, so we skip capture entirely — validate only
 *     slug + answers, grade, and return, writing NO lead. (Signed-in students
 *     deliberately never appear in the /dashboard/leads funnel.)
 *
 * Either way the answer key is fetched SERVER-SIDE (getGradingBySlug, gated on
 * public_slug) and revealed ONLY in this response — never shipped to the static
 * page.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSessionUser } from "@/lib/auth";
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

/** Signed-in grade-only path — no identity capture, no consent, no lead. */
const AuthedSchema = z.object({
  slug: z.string().min(1).max(120),
  answers: z.record(z.string(), z.string()),
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

    // getSessionUser reads next/headers cookies; outside a real request scope
    // (unit tests) that throws — treat the throw as anon, mirroring /api/export.
    let signedIn = false;
    try {
      signedIn = !!(await getSessionUser());
    } catch {
      signedIn = false;
    }

    // Signed-in student: grade only, capture nothing.
    if (signedIn) {
      const authed = AuthedSchema.safeParse(raw);
      if (!authed.success) {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
      }
      const grading = await getGradingBySlug(admin, authed.data.slug);
      if (!grading) {
        return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
      }
      const result = buildSubmitResult(grading, authed.data.answers, isBillingConfigured());
      return NextResponse.json(result, { status: 200 });
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
