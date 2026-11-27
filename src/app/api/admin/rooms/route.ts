/**
 * POST /api/admin/rooms: the owner's moderation actions on /dashboard/rooms
 * (migration 0289). Superadmin only; the tables are service-role only, so this
 * check is the only thing between a caller and them: it runs first.
 *
 *   review  { id, verdict: keep | hide }   a reported message: keep (unhide, earlier reports stop counting) or hide
 *   mute    { slug, userId, days }          0 days lifts a mute
 *   open    { slug, open }                  switch a room on or off
 *   post    { slug, body, imagePath?, imageAlt? }  a message as "PYQ Vault team", with an
 *                                          optional picture uploaded first (POST /api/admin/rooms/image, 0295)
 *   swap    { slug, questionId }            replace today's pinned question
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireSuperadmin, HttpError } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { muteStudent, reviewMessage, setRoomOpen, swapDaily, teamPost } from "@/lib/rooms/admin";
import { parseTeamPost } from "@/lib/rooms/teamImage";

const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/).max(60);

const Body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("review"), id: z.number().int().positive(), verdict: z.enum(["keep", "hide"]) }),
  z.object({ action: z.literal("mute"), slug, userId: z.uuid(), days: z.number().int().min(0).max(365) }),
  z.object({ action: z.literal("open"), slug, open: z.boolean() }),
  z.object({ action: z.literal("post"), slug, body: z.string().min(1).max(1500), imagePath: z.string().optional(), imageAlt: z.string().optional() }),
  z.object({ action: z.literal("swap"), slug, questionId: z.uuid() }),
]);

export async function POST(request: NextRequest) {
  try {
    const staff = await requireSuperadmin();
    const parsed = Body.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const db = createSupabaseAdminClient();
    const a = parsed.data;
    if (a.action === "review") await reviewMessage(db, a.id, a.verdict);
    else if (a.action === "mute") await muteStudent(db, a.slug, a.userId, a.days);
    else if (a.action === "open") await setRoomOpen(db, a.slug, a.open);
    else {
      let r: { error: string } | { ok: true };
      if (a.action === "post") {
        const post = parseTeamPost({ body: a.body, imagePath: a.imagePath || undefined, imageAlt: a.imageAlt || undefined });
        if (!post.ok) return NextResponse.json({ error: post.error }, { status: 400 });
        r = await teamPost(db, a.slug, staff.id, a.body, post.value.image);
      } else r = await swapDaily(db, a.slug, a.questionId, staff.id);
      if ("error" in r) return NextResponse.json({ error: r.error }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("rooms admin failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
}
