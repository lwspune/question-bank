/**
 * POST /api/rooms/[slug]/membership (migrations 0289, 0290).
 *   { action: "join", nickname }    join a room of an exam on the student's profile, under a room nickname
 *   { action: "rename", nickname }  a new nickname for new messages (old ones keep theirs)
 *   { action: "leave" }
 * A nickname is checked by lib/rooms/nickname and is unique per room (409 when taken).
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { joinRoom, leaveRoom, renameInRoom } from "@/lib/rooms/server";
import { readJson, roomRoute } from "@/lib/rooms/route";

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
    if (a.action === "join") await joinRoom(db, user.id, slug, a.nickname);
    else if (a.action === "rename") return NextResponse.json({ ok: true, nickname: await renameInRoom(db, user.id, slug, a.nickname) });
    else await leaveRoom(db, user.id, slug);
    return NextResponse.json({ ok: true });
  });
}
