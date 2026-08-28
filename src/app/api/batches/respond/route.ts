/**
 * POST /api/batches/respond — a student accepts or declines a batch invite,
 * or leaves a batch they are in.
 *
 * NO org/staff guard here on purpose: the caller is a STUDENT, who by
 * definition has no org_members row. The authorization is that the invite names
 * their own VERIFIED email, and that check lives in respondToInvite.
 *
 * THE EMAIL COMES FROM THE SESSION, NEVER THE REQUEST BODY. A client-supplied
 * address would let anyone claim any invite, which is the entire attack this
 * flow has to stop.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { respondToInvite } from "@/lib/batches/invitesAdmin";

export const maxDuration = 15;

type Body =
  | { action: "accept" | "decline"; inviteId: string }
  | { action: "leave"; batchId: string };

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (!user.email) {
    return NextResponse.json({ error: "Account has no email address" }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as Body | null;
  if (!body || typeof body !== "object" || !("action" in body)) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.action === "leave") {
    if (!body.batchId) {
      return NextResponse.json({ error: "batchId is required" }, { status: 400 });
    }
    // Through the caller's RLS client: batch_enrollments_delete_own_or_staff
    // (0083) restricts this to their own row, so no ownership check is needed
    // here and none can be forgotten.
    const db = createSupabaseServerClient();
    const { error } = await db
      .from("batch_enrollments")
      .delete()
      .eq("batch_id", body.batchId)
      .eq("user_id", user.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  if (body.action !== "accept" && body.action !== "decline") {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
  if (!body.inviteId) {
    return NextResponse.json({ error: "inviteId is required" }, { status: 400 });
  }

  const result = await respondToInvite({
    userId: user.id,
    userEmail: user.email,
    inviteId: body.inviteId,
    action: body.action,
  });

  switch (result.kind) {
    case "ok":
      return NextResponse.json({ ok: true, action: result.action });
    case "not_found":
      // Also what a wrong-recipient attempt returns — the response must not
      // confirm that an invite id exists for somebody else.
      return NextResponse.json({ error: "Invite not found" }, { status: 404 });
    case "not_pending":
      return NextResponse.json(
        { error: "This invitation is no longer active." },
        { status: 409 }
      );
    case "error":
      return NextResponse.json({ error: result.message }, { status: 500 });
  }
}
