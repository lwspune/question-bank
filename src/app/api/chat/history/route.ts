/**
 * GET /api/chat/history: a signed-in student's latest conversation with V, so
 * it follows them to another device (migration 0159). Signed out: nothing.
 * The chat window keeps whichever is newer, this or its own copy
 * (lib/chat/localChat preferNewer). `unread` counts late answers (0160) not yet
 * opened: the window shows a badge for them. Never cached: one person's chat.
 */
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSessionUser } from "@/lib/auth";
import { readLatestConversation, readUnreadFollowupConversation } from "@/lib/chat/interactionsAdmin";
import { currentSession, historyTurns, unreadFollowups } from "@/lib/chat/conversation";

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

    // An unread late answer wins over a newer chat, or the student would never see it.
    const db = createSupabaseAdminClient();
    const unreadRows = await readUnreadFollowupConversation(db, userId);
    const lateAnswer = unreadRows.length > 0;
    const rows = lateAnswer ? unreadRows : await readLatestConversation(db, userId);
    // Only the current session (2026-10-21): an hour with no messages ends one. A late answer is
    // shown however long ago it came, with the session it ends.
    const session = currentSession(rows, lateAnswer ? undefined : Date.now());
    const turns = historyTurns(session);
    if (session.length === 0 || turns.length === 0) {
      return NextResponse.json({ ok: true, conversation: null }, { headers: NO_STORE });
    }
    const lastAt = Math.max(...session.map((r) => Date.parse(r.createdAt)));
    return NextResponse.json(
      { ok: true, conversation: { conversationId: rows[0].conversationId, lastAt, turns, unread: unreadFollowups(rows) } },
      { headers: NO_STORE }
    );
  } catch (err) {
    console.error("chat/history route error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500, headers: NO_STORE });
  }
}
