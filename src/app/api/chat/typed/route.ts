/**
 * POST /api/chat/typed — a question a student TYPED to V (migration 0145).
 * No AI: the question is stored, with email addresses and phone numbers
 * masked, and V answers with the owner's fixed reply. The point is to learn
 * what students ask before paying for a model to answer it.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { getSessionUser } from "@/lib/auth";
import { recordChatInteraction } from "@/lib/chat/interactionsAdmin";
import { validateChatMessage } from "@/lib/chat/validate";
import { maskPersonal } from "@/lib/chat/maskPersonal";
import { TYPED_QUESTION_REPLY } from "@/lib/chat/typed";

export const maxDuration = 10;

const HOUR_MS = 60 * 60 * 1000;
const TYPED_LIMIT = 10; // per IP per hour: enough for a curious student, not for a flood of rows

export async function POST(request: NextRequest) {
  try {
    const admin = createSupabaseAdminClient();

    const rl = await checkAndIncrement(admin, `chat-typed:anon:${getClientIp(request)}`, {
      limit: TYPED_LIMIT,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many questions. Please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let raw: { message?: string };
    try {
      raw = (await request.json()) as { message?: string };
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const v = validateChatMessage({ message: typeof raw.message === "string" ? raw.message : "" });
    if (!v.ok) {
      return NextResponse.json({ error: v.message }, { status: 400 });
    }

    // Outside a request scope (route tests) the session read throws: treat as signed out.
    let userId: string | null = null;
    try {
      userId = (await getSessionUser())?.id ?? null;
    } catch {
      userId = null;
    }

    await recordChatInteraction(admin, {
      eventType: "typed_question",
      message: maskPersonal(v.value),
      userId,
    });

    return NextResponse.json({ ok: true, reply: TYPED_QUESTION_REPLY }, { status: 200 });
  } catch (err) {
    console.error("chat/typed route error", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
