/**
 * POST /api/admin/institute-prospect: save the owner's status, note and
 * follow-up date on one institute (migration 0246). Superadmin only, the same
 * gate as /dashboard/institutes. The table is service-role only, so this check
 * is the only thing between a caller and the list: it runs first.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireSuperadmin, HttpError } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { validateProspectEdit } from "@/lib/institutes/prospects";

const BodySchema = z.object({
  id: z.uuid(),
  status: z.string().max(20),
  note: z.string().max(4000).nullable().optional(),
  followUp: z.string().max(20).nullable().optional(),
});

export async function POST(request: NextRequest) {
  try {
    await requireSuperadmin();
    const parsed = BodySchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: "Send an institute id and a status." }, { status: 400 });
    const edit = validateProspectEdit(parsed.data);
    if (!edit.ok) return NextResponse.json({ error: edit.error }, { status: 400 });

    const { data, error } = await createSupabaseAdminClient()
      .from("institute_prospects")
      .update({ ...edit.value, updated_at: new Date().toISOString() })
      .eq("id", parsed.data.id)
      .select("id");
    if (error) {
      console.error("institute prospect save failed", error.message);
      return NextResponse.json({ error: "Could not save." }, { status: 500 });
    }
    if (!data?.length) return NextResponse.json({ error: "That institute is not on the list." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("institute prospect route error", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
}
