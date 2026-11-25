/**
 * POST /api/rooms/[slug]/membership { action: "join" | "leave" } (migration 0289).
 * Join only a room of an exam on the student's profile (lib/rooms/server joinRoom).
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { joinRoom, leaveRoom } from "@/lib/rooms/server";
import { readJson, roomRoute } from "@/lib/rooms/route";

const Body = z.object({ action: z.enum(["join", "leave"]) });

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  return roomRoute(params, { limitKey: "room-membership", perHour: 30 }, async ({ db, user, slug }) => {
    const parsed = Body.safeParse(await readJson(request));
    if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    if (parsed.data.action === "join") await joinRoom(db, user.id, slug, user.preferredName ?? user.name ?? null);
    else await leaveRoom(db, user.id, slug);
    return NextResponse.json({ ok: true });
  });
}
