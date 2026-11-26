/**
 * GET /api/rooms: the rooms the signed-in student sees (migration 0289):
 * joined rooms with unread and the latest message, then the other exams on
 * their profile, each with Join, and whether the button is hidden (0290). Signed in only; the left bubble asks once a
 * visit for its badge and again when the window opens.
 */
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSessionUser } from "@/lib/auth";
import { loadRoomList } from "@/lib/rooms/server";
import { totalUnread } from "@/lib/rooms/list";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    const list = await loadRoomList(createSupabaseAdminClient(), user.id);
    return NextResponse.json(
      { ok: true, joined: list.joined, others: list.others, unread: totalUnread(list.joined), hiddenUntil: list.hiddenUntil },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch (err) {
    console.error("rooms list failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not load circles." }, { status: 500 });
  }
}
