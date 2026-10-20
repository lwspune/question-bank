import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { recordPrintInterest } from "@/lib/ebooks/printInterest";

/**
 * POST /api/ebooks/print-interest { slug, pincode? }: a buyer says they want
 * the printed book. Written with the buyer's own client, so the database's
 * policy decides who may (only someone who owns the ebook).
 */
export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { slug?: unknown; pincode?: unknown } | null;
  const slug = typeof body?.slug === "string" ? body.slug.slice(0, 80) : "";
  const pincode = typeof body?.pincode === "string" ? body.pincode.slice(0, 12) : null;
  if (!slug) return NextResponse.json({ error: "Which book?" }, { status: 400 });

  const result = await recordPrintInterest(createSupabaseServerClient(), user.id, slug, pincode);
  if (result.ok) return NextResponse.json({ ok: true });
  if (result.reason === "bad_pincode") return NextResponse.json({ error: "A pincode is 6 digits" }, { status: 400 });
  if (result.reason === "not_bought") return NextResponse.json({ error: "Buy the ebook first" }, { status: 403 });
  return NextResponse.json({ error: "Could not save that. Try again." }, { status: 500 });
}
