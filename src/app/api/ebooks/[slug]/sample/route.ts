import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * GET /api/ebooks/<slug>/sample: the free sample (cover, contents and one
 * whole chapter), open to everyone, so a student can judge the book before
 * paying. Sent as a redirect to a short-lived link into the private bucket.
 */
export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const admin = createSupabaseAdminClient();
  const { data: book } = await admin
    .from("ebooks")
    .select("sample_path")
    .eq("slug", params.slug)
    .eq("active", true)
    .maybeSingle();
  if (!book?.sample_path) return NextResponse.json({ error: "No sample for this book" }, { status: 404 });
  const signed = await admin.storage
    .from("ebooks")
    .createSignedUrl(book.sample_path as string, 5 * 60, { download: `PYQ-Vault-${params.slug}-sample.pdf` });
  if (signed.error || !signed.data) {
    console.error("ebook sample link failed:", signed.error?.message);
    return NextResponse.json({ error: "Could not open the sample" }, { status: 500 });
  }
  return NextResponse.redirect(signed.data.signedUrl, 302);
}
