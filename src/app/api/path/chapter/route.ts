/**
 * GET /api/path/chapter?chapterId=<uuid> (MENTOR_SPEC.md Phase 2, D8): the
 * board path's line on a /board chapter page, for a student on the path.
 *
 * Asked by the browser (components/path/BoardPathLine) only when the shared
 * pulse says the student is on a path for this page's board, so the page stays
 * one cached copy for everyone. Answers this chapter's parts and today's part
 * of it, and any chapter newly done (said once, the milestone pattern), and
 * picks today if it was not picked yet, so the page's free answers work.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { parseChapterParam } from "@/lib/path/parse";
import { getBoardPathLine } from "@/lib/path/service";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" } as const;

export async function GET(request: NextRequest) {
  const chapterId = parseChapterParam(request.nextUrl.searchParams.get("chapterId"));
  if (!chapterId) return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: NO_STORE });

  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (!user) return NextResponse.json({ error: "Sign in to see your path." }, { status: 401, headers: NO_STORE });

  try {
    const db = createSupabaseServerClient();
    return NextResponse.json(await getBoardPathLine(db, user.id, chapterId), { headers: NO_STORE });
  } catch (e) {
    console.error("path chapter line failed", e);
    return NextResponse.json({ error: "Couldn't load your path." }, { status: 500, headers: NO_STORE });
  }
}
