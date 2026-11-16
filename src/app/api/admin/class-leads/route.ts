/**
 * POST /api/admin/class-leads: tick (or untick) an offline-class lead as
 * called (migration 0265). Superadmin only, the same gate as
 * /dashboard/classes. The table is service-role only, so this check is the
 * only thing between a caller and the leads: it runs first.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireSuperadmin, HttpError } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const BodySchema = z.object({ id: z.uuid(), called: z.boolean() });

export async function POST(request: NextRequest) {
  try {
    await requireSuperadmin();
    const parsed = BodySchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: "Send a lead id and called: true or false." }, { status: 400 });

    const now = new Date().toISOString();
    const { data, error } = await createSupabaseAdminClient()
      .from("class_interest")
      .update({ called_at: parsed.data.called ? now : null, updated_at: now })
      .eq("id", parsed.data.id)
      .select("id");
    if (error) {
      console.error("class lead save failed", error.message);
      return NextResponse.json({ error: "Could not save." }, { status: 500 });
    }
    if (!data?.length) return NextResponse.json({ error: "That lead is not on the list." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("class lead route error", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
}
