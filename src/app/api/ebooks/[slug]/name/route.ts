import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { setEbookPrintName } from "@/lib/ebooks/printName";

/**
 * PUT /api/ebooks/<slug>/name { name }: the buyer chooses the name printed on
 * their copy's cover. Every rule (owns it, a name the cover can print) lives
 * in lib/ebooks/printName.ts.
 */
export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { name?: unknown } | null;
  const raw = typeof body?.name === "string" ? body.name.slice(0, 200) : "";
  const result = await setEbookPrintName(createSupabaseServerClient(), createSupabaseAdminClient(), user.id, params.slug, raw);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ name: result.name });
}
