import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { ebookStatus } from "@/lib/ebooks/status";

export const dynamic = "force-dynamic";

/** GET /api/ebooks/<slug>/status: the buy box's per-visitor state (lib/ebooks/status). */
export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const user = await getSessionUser();
  const status = await ebookStatus(
    createSupabaseServerClient(),
    createSupabaseAdminClient(),
    user?.id ?? null,
    params.slug,
    user?.name ?? null
  );
  if (!status) return NextResponse.json({ error: "No such book" }, { status: 404 });
  return NextResponse.json(status, { headers: { "Cache-Control": "private, no-store" } });
}
