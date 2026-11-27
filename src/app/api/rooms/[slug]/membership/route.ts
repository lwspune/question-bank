/**
 * POST /api/rooms/[slug]/membership (migrations 0289, 0290).
 *   { action: "join", nickname }    join a room of an exam on the student's profile (or, with none chosen,
 *                                   their guessed exam, which then becomes chosen: `promoted`), under a room nickname
 *   { action: "rename", nickname }  a new nickname for new messages (old ones keep theirs)
 *   { action: "leave" }
 * A nickname is checked by lib/rooms/nickname and is unique per room (409 when taken).
 * A join also pins today's question when the room has none yet (migration 0291),
 * so a room whose first student arrives after 07:00 is never empty until tomorrow.
 * That pin is best effort: a failure is logged and the join still succeeds.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { joinRoom, leaveRoom, renameInRoom } from "@/lib/rooms/server";
import { readJson, roomRoute } from "@/lib/rooms/route";
import { pinTodayIfMissing } from "@/lib/rooms/dailyServer";

const Body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("join"), nickname: z.string().max(100) }),
  z.object({ action: z.literal("rename"), nickname: z.string().max(100) }),
  z.object({ action: z.literal("leave") }),
]);

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  return roomRoute(params, { limitKey: "room-membership", perHour: 30 }, async ({ db, user, slug }) => {
    const parsed = Body.safeParse(await readJson(request));
    if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const a = parsed.data;
    if (a.action === "join") {
      const { promoted } = await joinRoom(db, user.id, slug, a.nickname);
      try {
        await pinTodayIfMissing(db, slug, new Date());
      } catch (err) {
        console.error("rooms pin on join failed:", err instanceof Error ? err.message : err);
      }
      return NextResponse.json({ ok: true, promoted });
    } else if (a.action === "rename") return NextResponse.json({ ok: true, nickname: await renameInRoom(db, user.id, slug, a.nickname) });
    else await leaveRoom(db, user.id, slug);
    return NextResponse.json({ ok: true });
  });
}
