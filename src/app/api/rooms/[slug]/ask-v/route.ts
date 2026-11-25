/**
 * POST /api/rooms/[slug]/ask-v { messageId }: V answers a student's doubt in
 * the room (owner, 2026-11-25; migration 0289). The database caps it at 5
 * replies per student per IST day and one per message; this route's own
 * hourly cap also bounds the calls that end in SKIP (no reply posted, but the
 * model was still paid for).
 */
import { NextResponse, type NextRequest } from "next/server";
import { askV } from "@/lib/chat/anthropic";
import { loadAskVContext, postVReply, roomName } from "@/lib/rooms/server";
import { parseRoomAskV } from "@/lib/rooms/validate";
import { cleanRoomVReply, roomVMessage, ROOM_V_SYSTEM } from "@/lib/rooms/vReply";
import { dbErrorResponse, readJson, roomRoute } from "@/lib/rooms/route";

export const maxDuration = 30;

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  return roomRoute(params, { limitKey: "room-ask-v", perHour: 8 }, async ({ db, user, slug }) => {
    const parsed = parseRoomAskV(await readJson(request));
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const ctx = await loadAskVContext(db, user.id, slug, parsed.value.messageId);

    const result = await askV({
      system: ROOM_V_SYSTEM,
      message: roomVMessage({ examName: roomName(slug) ?? slug, doubt: ctx.doubt.body, repliesTo: ctx.repliesTo, question: ctx.question }),
      tools: [],
    });
    if (!result.ok) {
      console.error("rooms ask-v model failed:", result.error);
      return NextResponse.json({ error: "V couldn't answer just now. Please try again." }, { status: 502 });
    }
    const reply = cleanRoomVReply(result.reply);
    if (!reply) return NextResponse.json({ ok: true, skipped: true, error: "V answers study doubts only." });

    const r = await postVReply(db, user.id, slug, ctx.doubt.id, reply);
    if ("dbError" in r) return dbErrorResponse("ask-v", r.dbError);
    return NextResponse.json({ ok: true, message: r.view });
  });
}
