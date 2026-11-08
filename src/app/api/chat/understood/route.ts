/**
 * POST /api/chat/understood: a student's Yes (true) or No (false) to "Did you
 * understand?" under one of V's explanations (migration 0182, 2026-10-23).
 * Ownership as for the thumbs (/api/chat/feedback): the conversation id the
 * device holds, and the same account when the reply was written signed in.
 * A No is also sent to V as a message by the chat window; this keeps it and,
 * for a signed-in student, sends the question V explained to Fix your mistakes
 * (owner, 2026-11-08): a `v_not_understood` row, which the drill reads as a
 * miss (lib/drill/select MISS_KINDS). One per reply, by its dedupe key.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { getSessionUser } from "@/lib/auth";
import { setReplyUnderstood } from "@/lib/chat/interactionsAdmin";
import { notUnderstoodQuestionId } from "@/lib/chat/understood";
import { logActivityOnce } from "@/lib/activity/service";
import { isConversationId } from "@/lib/chat/conversation";

export const maxDuration = 10;

const HOUR_MS = 60 * 60 * 1000;
const UNDERSTOOD_LIMIT = 60; // per connection per hour: one tap per explanation

const UUID_RE = /^[0-9a-f-]{36}$/i;

export async function POST(request: NextRequest) {
  try {
    const admin = createSupabaseAdminClient();
    const rl = await checkAndIncrement(admin, `chat-understood:anon:${getClientIp(request)}`, {
      limit: UNDERSTOOD_LIMIT,
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
    if (typeof id !== "string" || !UUID_RE.test(id) || !isConversationId(body?.conversationId) || typeof value !== "boolean") {
      return NextResponse.json({ error: "Invalid answer." }, { status: 400 });
    }

    let userId: string | null = null;
    try {
      userId = (await getSessionUser())?.id ?? null;
    } catch {
      userId = null;
    }

    const reply = await setReplyUnderstood(admin, { id, conversationId: body.conversationId as string, userId, value });
    if (!reply) return NextResponse.json({ error: "Reply not found." }, { status: 404 });

    // Signed out, nothing to come back to: the drill is per account.
    const questionId = !value && userId ? notUnderstoodQuestionId(reply) : null;
    if (userId && questionId) {
      await logActivityOnce(admin, userId, {
        kind: "v_not_understood",
        refId: questionId,
        refKind: "question",
        metadata: { surface: "v", interactionId: id },
        dedupeKey: `v_not_understood:${id}`,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("chat/understood route error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
