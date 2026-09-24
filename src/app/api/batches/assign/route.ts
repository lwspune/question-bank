/**
 * POST /api/batches/assign — staff assign a mock to a batch with a due date,
 * or remove an assignment. ENGAGEMENT_SPEC.md C1, migration 0115.
 *
 * Guard is requireEditor (ADMIN or TEACHER): assigning a paper to a cohort is
 * paper-builder work, the batches/papers rule, not the superadmin content
 * lockdown (0056).
 *
 * The guard is NECESSARY BUT NOT SUFFICIENT — it proves org staff, not that
 * they may touch THIS batch. The writes go through the caller's own RLS
 * client, so a teacher of another branch is stopped by the database (the
 * service maps the 42501 to a plain message). Same posture as /api/batches/invite.
 */
import { NextResponse, type NextRequest } from "next/server";
import { requireEditor, HttpError } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validateAssignmentInput } from "@/lib/assignments/core";
import { createAssignment, deleteAssignment } from "@/lib/assignments/service";

type Body =
  | { action: "create"; batchId: string; mockId: string; dueAt: string; note?: string | null }
  | { action: "delete"; assignmentId: string };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  try {
    const member = await requireEditor();
    const body = (await request.json().catch(() => null)) as Body | null;
    if (!body || typeof body !== "object" || !("action" in body)) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const db = createSupabaseServerClient();

    if (body.action === "delete") {
      if (!UUID_RE.test(String(body.assignmentId ?? ""))) {
        return NextResponse.json({ error: "assignmentId is required" }, { status: 400 });
      }
      const removed = await deleteAssignment(db, body.assignmentId);
      if (!removed) return NextResponse.json({ error: "Assignment not found." }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    if (body.action !== "create") {
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
    if (!UUID_RE.test(String(body.batchId ?? ""))) {
      return NextResponse.json({ error: "batchId is required" }, { status: 400 });
    }
    const parsed = validateAssignmentInput(
      { mockId: body.mockId, dueAt: body.dueAt, note: body.note ?? null },
      new Date()
    );
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

    const res = await createAssignment(db, {
      batchId: body.batchId,
      assignedBy: member.user.id,
      fields: parsed.value,
    });
    if (res.kind === "error") return NextResponse.json({ error: res.message }, { status: 400 });
    return NextResponse.json({ ok: true, id: res.id });
  } catch (e) {
    if (e instanceof HttpError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error("assign error", e);
    return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
  }
}
