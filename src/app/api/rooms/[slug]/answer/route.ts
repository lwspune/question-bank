/**
 * POST /api/rooms/[slug]/answer { messageId, optionId }: answer the room's
 * daily question (migration 0289). The database decides whether it is right
 * (exam_room_answer_guard); the key and the solution come back only now.
 * One answer per student per question: a second tap returns the first.
 */
import { NextResponse, type NextRequest } from "next/server";
import { answerDaily } from "@/lib/rooms/server";
import { parseRoomAnswer } from "@/lib/rooms/validate";
import { dbErrorResponse, readJson, roomRoute } from "@/lib/rooms/route";

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  return roomRoute(params, { limitKey: "room-answer", perHour: 60 }, async ({ db, user, slug }) => {
    const parsed = parseRoomAnswer(await readJson(request));
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const r = await answerDaily(db, user.id, slug, parsed.value.messageId, parsed.value.optionId);
    if ("dbError" in r) return dbErrorResponse("answer", r.dbError);
    return NextResponse.json({ ok: true, question: r.question });
  });
}
