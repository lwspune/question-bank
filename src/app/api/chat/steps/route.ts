/**
 * POST /api/chat/steps: "Teach me step by step" under one of V's explanations
 * (V_SPEC.md section 0, step 1; owner 2026-11-12). Body: { questionId,
 * action, step } (lib/chat/stepByStep parseStepEvent).
 *
 * "open" returns the question's stored solution cut into steps
 * (lib/chat/solutionSteps), and the animated solution when the steps are its
 * own. Only for a question V explained to this student today
 * (explainedToday), so it shows nothing a free answer has not already opened,
 * and uses none: the explanation already did. "next", "lost" and "done" are
 * counted only. "lost" also sends the question to Fix your mistakes, like a
 * No (a v_not_understood row, one per question per day); the chat window
 * sends V the message itself.
 *
 * Every tap is one chat_interactions row (migration 0252). No AI call, so it
 * uses none of the hour's messages. Signed in only: explanations are.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getSessionUser } from "@/lib/auth";
import { recordChatInteraction } from "@/lib/chat/interactionsAdmin";
import { explainedToday } from "@/lib/chat/followUpServer";
import { parseStepEvent, stepEventCode } from "@/lib/chat/stepByStep";
import { loadSolutionSteps } from "@/lib/chat/solutionStepsServer";
import { logActivityOnce } from "@/lib/activity/service";
import { istDayKey } from "@/lib/email/dueNudge";

export const maxDuration = 10;

const HOUR_MS = 60 * 60 * 1000;
const STEPS_LIMIT = 200; // per student per hour: a dozen taps a solution, far above real use
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
    if (!userId) return fail("Sign in to go step by step.", 401);

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
    const event = parseStepEvent(body);
    if (!questionId || !event) return fail("Invalid step.", 400);

    const now = new Date();
    if (!(await explainedToday(admin, userId, questionId, now))) return fail("Ask V to explain this question first.", 403);

    if (event.action === "open") {
      const steps = await loadSolutionSteps(createSupabaseAnonClient(), questionId);
      if (!steps || event.step >= steps.steps.length) return fail("This solution has no steps to show.", 404);
      await recordChatInteraction(admin, { eventType: "step_by_step", code: stepEventCode(event), questionId, userId });
      return NextResponse.json({ ok: true, steps: steps.steps, ...(steps.visual ? { visual: steps.visual } : {}) }, { headers: NO_STORE });
    }

    await recordChatInteraction(admin, { eventType: "step_by_step", code: stepEventCode(event), questionId, userId });
    if (event.action === "lost") {
      await logActivityOnce(admin, userId, {
        kind: "v_not_understood",
        refId: questionId,
        refKind: "question",
        metadata: { surface: "v_steps", step: event.step + 1 },
        // One per question per day: a second "Lost me here" on it is the same miss.
        dedupeKey: `v_not_understood:steps:${userId}:${questionId}:${istDayKey(now)}`,
      });
    }
    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (err) {
    console.error("chat/steps route error", err);
    return fail("Something went wrong.", 500);
  }
}
