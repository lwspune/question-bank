/**
 * /api/rooms/[slug]/messages (migration 0289).
 *
 * GET  ?after=<id>   new messages since the last one the window has (polling,
 *                    only while a room is open and the tab is visible)
 *      ?before=<id>  an older page
 *      (none)        the latest page, with the pinned question
 * POST { body, replyTo? }  a student's message: lib/rooms/text refuses phone
 *                    numbers, emails, links and abuse before the database's
 *                    guard checks membership, mute, rate and length.
 */
import { NextResponse, type NextRequest } from "next/server";
import { loadMessages, postMessage } from "@/lib/rooms/server";
import { checkRoomText } from "@/lib/rooms/text";
import { parseRoomPost } from "@/lib/rooms/validate";
import { dbErrorResponse, readJson, roomRoute } from "@/lib/rooms/route";

export const dynamic = "force-dynamic";

function cursor(v: string | null): number | null {
  if (!v || !/^\d{1,15}$/.test(v)) return null;
  return Number(v);
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  // Polling every few seconds while open: a generous hourly cap.
  return roomRoute(params, { limitKey: "room-read", perHour: 1500 }, async ({ db, user, slug }) => {
    const sp = request.nextUrl.searchParams;
    const page = await loadMessages(db, user.id, slug, { after: cursor(sp.get("after")), before: cursor(sp.get("before")) });
    return NextResponse.json({ ok: true, ...page }, { headers: { "Cache-Control": "private, no-store" } });
  });
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  return roomRoute(params, { limitKey: "room-post", perHour: 120 }, async ({ db, user, slug }) => {
    const parsed = parseRoomPost(await readJson(request));
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const text = checkRoomText(parsed.value.body);
    if (!text.ok) return NextResponse.json({ error: text.error }, { status: 400 });
    const r = await postMessage(db, user.id, slug, text.body, parsed.value.replyTo);
    if ("dbError" in r) return dbErrorResponse("post", r.dbError);
    return NextResponse.json({ ok: true, message: r.view });
  });
}
