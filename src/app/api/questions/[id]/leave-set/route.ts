import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin, HttpError } from "@/lib/auth";

/**
 * Detach this question from its set: clears set_id on this row only,
 * leaving siblings intact. The question's context becomes editable
 * independently after this.
 *
 * Admin-only; org-scoped via the existing RLS UPDATE policy on questions.
 * Idempotent — clearing a NULL set_id is a no-op.
 */
export async function POST(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const member = await requireAdmin();
    const supabase = createSupabaseServerClient();

    const { data: existing } = await supabase
      .from("questions")
      .select("id, org_id, set_id")
      .eq("id", params.id)
      .maybeSingle();
    if (!existing) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }
    if (existing.org_id !== member.orgId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { error: updErr } = await supabase
      .from("questions")
      .update({ set_id: null })
      .eq("id", params.id);
    if (updErr) {
      console.error("leave-set update error", updErr);
      return NextResponse.json({ error: "internal error" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("leave-set route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
