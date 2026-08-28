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
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { respondToInvite, joinByCode } from "@/lib/batches/invitesAdmin";

export const maxDuration = 15;

type Body =
  | { action: "accept" | "decline"; inviteId: string }
  | { action: "leave"; batchId: string }
  | { action: "join_code"; code: string };

const HOUR_MS = 60 * 60 * 1000;
/** Codes are guessable in principle; 10 tries an hour makes that useless in
 *  practice while leaving room for a student fat-fingering it a few times. */
const JOIN_ATTEMPT_LIMIT = 10;

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

  if (body.action === "join_code") {
    if (typeof body.code !== "string") {
      return NextResponse.json({ error: "code is required" }, { status: 400 });
    }
    // Rate-limit BEFORE resolving, so a wrong guess still costs a try.
    const rl = await checkAndIncrement(
      createSupabaseAdminClient(),
      `batch-join:${user.id}`,
      { limit: JOIN_ATTEMPT_LIMIT, windowMs: HOUR_MS }
    );
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    const res = await joinByCode({ userId: user.id, rawCode: body.code });
    switch (res.kind) {
      case "ok":
        return NextResponse.json({ ok: true, batchName: res.batchName, orgName: res.orgName });
      case "already_member":
        return NextResponse.json({ ok: true, batchName: res.batchName, already: true });
      case "invalid_code":
        return NextResponse.json(
          { error: "That code doesn't match any class. Check it with your teacher." },
          { status: 404 }
        );
      case "closed":
        return NextResponse.json(
          { error: "That class isn't accepting new students right now." },
          { status: 409 }
        );
      case "error":
        return NextResponse.json({ error: res.message }, { status: 500 });
    }
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
