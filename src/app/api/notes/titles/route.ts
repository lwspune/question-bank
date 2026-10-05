import { NextResponse, type NextRequest } from "next/server";
import { parseTitleKeys, titlesForKeys } from "@/lib/notes/titleLookup";

/**
 * GET /api/notes/titles?k=<subjectRoute>/<chapterSlug>/<subtopicSlug>&k=...
 *
 * The real names of a few notes topics, for the /notes "Your notes" strip,
 * which only holds slugs and printed "Jch Sbc Mole". Titles are public, so no
 * sign-in; keys are validated and capped (lib/notes/titleLookup.ts).
 */
export async function GET(request: NextRequest) {
  const keys = parseTitleKeys(request.nextUrl.searchParams.getAll("k"));
  if (keys.length === 0) {
    return NextResponse.json({ ok: false, error: "No valid topics." }, { status: 400 });
  }
  return NextResponse.json(
    { ok: true, titles: titlesForKeys(keys) },
    { headers: { "Cache-Control": "public, max-age=86400" } }
  );
}
