/**
 * POST /api/batches/invite — staff invite students to a batch, and revoke.
 *
 * Guard is requireEditor (ADMIN or TEACHER): building cohorts is paper-builder
 * work, not content editing, so it follows the batches/papers rule rather than
 * the superadmin content lockdown (0056).
 *
 * The guard is NECESSARY BUT NOT SUFFICIENT — it proves the caller is org staff,
 * not that they may touch THIS batch. The per-batch scope check lives in the
 * service, which reads the batch through the caller's own RLS client. A teacher
 * of another branch is stopped there, not here.
 */
import { NextResponse, type NextRequest } from "next/server";
import { requireEditor, HttpError } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import {
  inviteToBatch,
  revokeInvite,
  rotateJoinCode,
  setJoinOpen,
} from "@/lib/batches/invitesAdmin";

export const maxDuration = 60; // a full class is up to 200 sequential sends

const HOUR_MS = 60 * 60 * 1000;
const INVITE_LIMIT = 20; // requests per user per hour, not addresses

type Body =
  | { action: "invite"; batchId: string; emails: string }
  | { action: "revoke"; batchId: string; inviteId: string }
  | { action: "rotate_code"; batchId: string }
  | { action: "set_join_open"; batchId: string; open: boolean };

export async function POST(request: NextRequest) {
  try {
    const member = await requireEditor();
    const body = (await request.json().catch(() => null)) as Body | null;
    if (!body || typeof body !== "object" || !("action" in body)) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const db = createSupabaseServerClient();

    if (body.action === "revoke") {
      if (!body.batchId || !body.inviteId) {
        return NextResponse.json({ error: "batchId and inviteId are required" }, { status: 400 });
      }
      const res = await revokeInvite(db, body.batchId, body.inviteId);
      if (res.kind === "error") {
        return NextResponse.json({ error: res.message }, { status: 400 });
      }
      return NextResponse.json({ ok: true });
    }

    if (body.action === "rotate_code") {
      if (!body.batchId) {
        return NextResponse.json({ error: "batchId is required" }, { status: 400 });
      }
      const res = await rotateJoinCode(db, body.batchId);
      if (res.kind === "error") {
        return NextResponse.json({ error: res.message }, { status: 400 });
      }
      return NextResponse.json({ ok: true, code: res.code });
    }

    if (body.action === "set_join_open") {
      if (!body.batchId || typeof body.open !== "boolean") {
        return NextResponse.json({ error: "batchId and open are required" }, { status: 400 });
      }
      const res = await setJoinOpen(db, body.batchId, body.open);
      if (res.kind === "error") {
        return NextResponse.json({ error: res.message }, { status: 400 });
      }
      return NextResponse.json({ ok: true });
    }

    if (body.action !== "invite") {
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
    if (!body.batchId || typeof body.emails !== "string") {
      return NextResponse.json({ error: "batchId and emails are required" }, { status: 400 });
    }

    // Sending mail on someone else's behalf — rate-limit per user so a bug or a
    // bad actor cannot turn the invite box into a mail cannon.
    const rl = await checkAndIncrement(
      createSupabaseAdminClient(),
      `batch-invite:${member.user.id}`,
      { limit: INVITE_LIMIT, windowMs: HOUR_MS }
    );
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many invite requests. Try again later." },
        { status: 429 }
      );
    }

    const result = await inviteToBatch({
      client: db,
      batchId: body.batchId,
      invitedBy: member.user.id,
      raw: body.emails,
    });

    switch (result.kind) {
      case "ok":
        return NextResponse.json({ ok: true, ...result });
      case "no_valid_emails":
        return NextResponse.json(
          { error: "No valid email addresses found", invalid: result.invalid },
          { status: 400 }
        );
      case "batch_not_found":
        // Deliberately the same shape a genuinely missing batch returns: a
        // teacher probing another branch's batch id learns nothing from it.
        return NextResponse.json({ error: "Batch not found" }, { status: 404 });
      case "error":
        return NextResponse.json({ error: result.message }, { status: 500 });
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
