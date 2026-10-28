import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { prepareEbookDownload } from "@/lib/ebooks/download";

/** Stamping a several-hundred-page master takes a few seconds; the first download of a version does it. */
export const maxDuration = 120;

/**
 * POST /api/ebooks/<slug>/download: a short-lived link to the buyer's own
 * stamped copy. Every rule (owns it, five downloads, stamped once per master)
 * lives in lib/ebooks/download.ts.
 */
export async function POST(_request: Request, { params }: { params: { slug: string } }) {
  const user = await getSessionUser();
  if (!user?.email) return NextResponse.json({ error: "Sign in to download your book" }, { status: 401 });
  const result = await prepareEbookDownload({
    db: createSupabaseServerClient(),
    admin: createSupabaseAdminClient(),
    user: { id: user.id, email: user.email, name: user.name ?? null },
    slug: params.slug,
  });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ url: result.url, left: result.left });
}
