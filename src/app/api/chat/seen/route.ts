/**
 * POST /api/chat/seen: a signed-in student opened V with a late answer
 * (migration 0160) waiting. Marks it read, which clears the badge on their
 * other devices too and tells /dashboard/chat the answer was read. Signed
 * out: nothing to mark (late answers only go to signed-in students).
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSessionUser } from "@/lib/auth";
import { markFollowupsSeen } from "@/lib/chat/interactionsAdmin";
import { isConversationId } from "@/lib/chat/conversation";

export const maxDuration = 10;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as { conversationId?: unknown } | null;
    if (!isConversationId(body?.conversationId)) {
      return NextResponse.json({ error: "Invalid conversation." }, { status: 400 });
    }

    let userId: string | null = null;
    try {
      userId = (await getSessionUser())?.id ?? null;
    } catch {
      userId = null;
    }
    if (!userId) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

    const marked = await markFollowupsSeen(createSupabaseAdminClient(), {
      userId,
      conversationId: body.conversationId as string,
    });
    return NextResponse.json({ ok: true, marked });
  } catch (err) {
    console.error("chat/seen route error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
