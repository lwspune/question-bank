/**
 * GET /api/chat/history: a signed-in student's latest conversation with V, so
 * it follows them to another device (migration 0159). Signed out: nothing.
 * The chat window keeps whichever is newer, this or its own copy
 * (lib/chat/localChat preferNewer). Never cached: it is one person's chat.
 */
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSessionUser } from "@/lib/auth";
import { readLatestConversation } from "@/lib/chat/interactionsAdmin";
import { historyTurns } from "@/lib/chat/conversation";

export const dynamic = "force-dynamic";
export const maxDuration = 10;

const NO_STORE = { "Cache-Control": "private, no-store" };

export async function GET() {
  try {
    let userId: string | null = null;
    try {
      userId = (await getSessionUser())?.id ?? null;
    } catch {
      userId = null;
    }
    if (!userId) return NextResponse.json({ ok: true, conversation: null }, { headers: NO_STORE });

    const rows = await readLatestConversation(createSupabaseAdminClient(), userId);
    const turns = historyTurns(rows);
    if (rows.length === 0 || turns.length === 0) {
      return NextResponse.json({ ok: true, conversation: null }, { headers: NO_STORE });
    }
    const lastAt = Math.max(...rows.map((r) => Date.parse(r.createdAt)));
    return NextResponse.json(
      { ok: true, conversation: { conversationId: rows[0].conversationId, lastAt, turns } },
      { headers: NO_STORE }
    );
  } catch (err) {
    console.error("chat/history route error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500, headers: NO_STORE });
  }
}
