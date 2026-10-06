/**
 * POST /api/batches/students: staff create student logins for a batch.
 *
 * Body: { batchId, lines } where `lines` is the pasted block (one student per
 * line: name, email, optional password). It is parsed HERE with the same pure
 * helper the card uses, so the browser's view never decides what gets created.
 *
 * Guard is requireEditor (ADMIN or TEACHER), like the invite route. It proves
 * the caller is org staff; the per-batch check is the service's read of the
 * batch through the caller's own RLS client.
 */
import { NextResponse, type NextRequest } from "next/server";
import { requireEditor, HttpError } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { parseStudentLines } from "@/lib/batches/studentLogins";
import { createStudentLogins } from "@/lib/batches/studentLoginsAdmin";

export const maxDuration = 60; // up to 100 sequential account creates

const HOUR_MS = 60 * 60 * 1000;
const REQUEST_LIMIT = 10; // requests per staff member per hour (100 students each)

export async function POST(request: NextRequest) {
  try {
    const member = await requireEditor();
    const body = (await request.json().catch(() => null)) as
      | { batchId?: unknown; lines?: unknown }
      | null;
    if (!body || typeof body.batchId !== "string" || typeof body.lines !== "string") {
      return NextResponse.json({ error: "batchId and lines are required" }, { status: 400 });
    }

    const parsed = parseStudentLines(body.lines);
    if (parsed.valid.length === 0) {
      return NextResponse.json(
        { error: "No valid students found", invalid: parsed.invalid },
        { status: 400 }
      );
    }

    const rl = await checkAndIncrement(
      createSupabaseAdminClient(),
      `student-logins:${member.user.id}`,
      { limit: REQUEST_LIMIT, windowMs: HOUR_MS }
    );
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests. Try again in an hour." },
        { status: 429 }
      );
    }

    const result = await createStudentLogins({
      client: createSupabaseServerClient(),
      batchId: body.batchId,
      createdBy: member.user.id,
      students: parsed.valid,
    });

    switch (result.kind) {
      case "ok": {
        const { kind: _kind, ...rest } = result;
        return NextResponse.json({
          ok: true,
          ...rest,
          invalid: parsed.invalid,
          overflow: parsed.overflow,
        });
      }
      case "batch_not_found":
        return NextResponse.json({ error: "Batch not found" }, { status: 404 });
      case "error":
        return NextResponse.json({ error: "Could not create the logins" }, { status: 500 });
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("POST /api/batches/students:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
