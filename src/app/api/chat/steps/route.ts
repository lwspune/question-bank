/**
 * POST /api/chat/steps: the step chips under V's explanation (owner,
 * 2026-11-15; until then "Teach me step by step"). Body: { questionId,
 * action, step } (lib/chat/stepChips parseStepTap): "tap" (a step bubble was
 * tapped and its chips shown), "explain" and "reply" (a chip was tapped).
 *
 * Counted only: the chat window sends V the Explain or Reply message itself.
 * "explain" also sends the question to Fix your mistakes, like a No (a
 * v_not_understood row, one per question per day). Only for a question V
 * explained to this student today (explainedToday), so a stray id records
 * nothing.
 *
 * Every tap is one chat_interactions row (event step_by_step, migration 0252).
 * No AI call, so it uses none of the hour's messages. Signed in only:
 * the step chips are.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getSessionUser } from "@/lib/auth";
import { recordChatInteraction } from "@/lib/chat/interactionsAdmin";
import { planSiteForHost } from "@/lib/sites/intl";
import { readCountry } from "@/lib/acquisition/country";
import { explainedToday } from "@/lib/chat/followUpServer";
import { parseStepTap, stepTapCode } from "@/lib/chat/stepChips";
import { logActivityOnce } from "@/lib/activity/service";
import { istDayKey } from "@/lib/email/dueNudge";

export const maxDuration = 10;

const HOUR_MS = 60 * 60 * 1000;
const STEPS_LIMIT = 200; // per student per hour: a few taps an explanation, far above real use
const NO_STORE = { "Cache-Control": "no-store" };
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status, headers: NO_STORE });

export async function POST(request: NextRequest) {
  try {
    let userId: string | null = null;
    try {
      userId = (await getSessionUser())?.id ?? null;
    } catch {
      userId = null;
    }
    if (!userId) return fail("Sign in to ask about a step.", 401);

    const admin = createSupabaseAdminClient();
    const rl = await checkAndIncrement(admin, `chat-steps:${userId}`, { limit: STEPS_LIMIT, windowMs: HOUR_MS });
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests." },
        { status: 429, headers: { ...NO_STORE, "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = (await request.json().catch(() => null)) as { questionId?: unknown } | null;
    const questionId = typeof body?.questionId === "string" && UUID_RE.test(body.questionId) ? body.questionId.toLowerCase() : null;
    const event = parseStepTap(body);
    if (!questionId || !event) return fail("Invalid step.", 400);

    const now = new Date();
    if (!(await explainedToday(admin, userId, questionId, now))) return fail("Ask V to explain this question first.", 403);

    await recordChatInteraction(admin, { eventType: "step_by_step", code: stepTapCode(event), questionId, userId, site: planSiteForHost(request.headers.get("host")), country: readCountry(request.headers) });
    if (event.action === "explain") {
      await logActivityOnce(admin, userId, {
        kind: "v_not_understood",
        refId: questionId,
        refKind: "question",
        metadata: { surface: "v_step_chips", step: event.step + 1 },
        // One per question per day: a second Explain on it is the same miss. Same key as the
        // retired "Lost me here", so the two can never both count one question on one day.
        dedupeKey: `v_not_understood:steps:${userId}:${questionId}:${istDayKey(now)}`,
      });
    }
    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (err) {
    console.error("chat/steps route error", err);
    return fail("Something went wrong.", 500);
  }
}
