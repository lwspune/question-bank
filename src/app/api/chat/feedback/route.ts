/**
 * POST /api/chat/feedback: a student's thumbs up (1) or down (-1) on one of
 * V's AI replies, or null to take it back (migration 0159). The conversation
 * id the device holds is the proof the reply was theirs; a reply written while
 * signed in also needs the same account.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { getSessionUser } from "@/lib/auth";
import { setReplyFeedback } from "@/lib/chat/interactionsAdmin";
import { isConversationId } from "@/lib/chat/conversation";

export const maxDuration = 10;

const HOUR_MS = 60 * 60 * 1000;
const FEEDBACK_LIMIT = 60; // per connection per hour: a tap per reply, changed now and then

const UUID_RE = /^[0-9a-f-]{36}$/i;

export async function POST(request: NextRequest) {
  try {
    const admin = createSupabaseAdminClient();
    const rl = await checkAndIncrement(admin, `chat-feedback:anon:${getClientIp(request)}`, {
      limit: FEEDBACK_LIMIT,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = (await request.json().catch(() => null)) as {
      id?: unknown;
      conversationId?: unknown;
      value?: unknown;
    } | null;
    const id = body?.id;
    const value = body?.value;
    if (
      typeof id !== "string" ||
      !UUID_RE.test(id) ||
      !isConversationId(body?.conversationId) ||
      !(value === 1 || value === -1 || value === null)
    ) {
      return NextResponse.json({ error: "Invalid feedback." }, { status: 400 });
    }

    let userId: string | null = null;
    try {
      userId = (await getSessionUser())?.id ?? null;
    } catch {
      userId = null;
    }

    const ok = await setReplyFeedback(admin, { id, conversationId: body.conversationId as string, userId, value });
    if (!ok) return NextResponse.json({ error: "Reply not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("chat/feedback route error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
