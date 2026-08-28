/**
 * POST /api/batches/remove — staff remove a student from a batch.
 *
 * The delete runs through the CALLER's RLS client, so
 * batch_enrollments_delete_own_or_staff (0083) is what decides whether it is
 * allowed. There is deliberately no hand-written branch/org check here: this
 * route cannot be more permissive than the policy, and a check written here
 * could drift from it.
 *
 * Removing revokes the teacher's read of that student's results immediately —
 * the mock_attempts policy is an EXISTS over this very table.
 */
import { NextResponse, type NextRequest } from "next/server";
import { requireEditor, HttpError } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const maxDuration = 15;

type Body = { batchId: string; userId: string };

export async function POST(request: NextRequest) {
  try {
    await requireEditor();
    const body = (await request.json().catch(() => null)) as Body | null;
    if (!body?.batchId || !body?.userId) {
      return NextResponse.json({ error: "batchId and userId are required" }, { status: 400 });
    }

    const db = createSupabaseServerClient();
    const { error } = await db
      .from("batch_enrollments")
      .delete()
      .eq("batch_id", body.batchId)
      .eq("user_id", body.userId);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
