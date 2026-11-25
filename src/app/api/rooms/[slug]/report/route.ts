/**
 * POST /api/rooms/[slug]/report { messageId, reason } (migration 0289). Three
 * reports from different members hide the message until the owner looks; the
 * database counts them (exam_room_report_hide), not this route.
 */
import { NextResponse, type NextRequest } from "next/server";
import { reportMessage } from "@/lib/rooms/server";
import { parseRoomReport } from "@/lib/rooms/validate";
import { dbErrorResponse, readJson, roomRoute } from "@/lib/rooms/route";

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  return roomRoute(params, { limitKey: "room-report", perHour: 30 }, async ({ db, user, slug }) => {
    const parsed = parseRoomReport(await readJson(request));
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const r = await reportMessage(db, user.id, slug, parsed.value.messageId, parsed.value.reason);
    if ("dbError" in r) return dbErrorResponse("report", r.dbError);
    return NextResponse.json({ ok: true });
  });
}
