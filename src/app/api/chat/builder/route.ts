/**
 * POST /api/chat/builder — counts one step of V's practice-test builder for
 * /dashboard/chat (migration 0157). Pure telemetry: the widget fires it and
 * ignores the answer. "built" is recorded by the build route itself, so a
 * test counted as built is one that was actually stored.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { getSessionUser } from "@/lib/auth";
import { recordChatInteraction } from "@/lib/chat/interactionsAdmin";
import { isBuilderStep } from "@/lib/chat/builderSteps";

export const maxDuration = 10;

const HOUR_MS = 60 * 60 * 1000;
const STEP_LIMIT = 60; // per IP per hour: a student taps a handful per test

export async function POST(request: NextRequest) {
  try {
    const admin = createSupabaseAdminClient();
    const rl = await checkAndIncrement(admin, `chat-builder:anon:${getClientIp(request)}`, {
      limit: STEP_LIMIT,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = (await request.json().catch(() => null)) as { step?: unknown } | null;
    const step = body?.step;
    // "built" is the build route's to record, never the browser's.
    if (!isBuilderStep(step) || step === "built") {
      return NextResponse.json({ ok: false, error: "Unknown step." }, { status: 400 });
    }

    let userId: string | null = null;
    try {
      userId = (await getSessionUser())?.id ?? null;
    } catch {
      userId = null;
    }
    await recordChatInteraction(admin, { eventType: "builder_step", step, userId });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("chat/builder route error", err);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
