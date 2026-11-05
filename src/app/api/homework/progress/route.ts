/**
 * GET /api/homework/progress?plan=<slug>[&day=<n>] — the signed-in student's
 * progress through a homework plan (2026-11-05).
 *
 * Without `day`: every day's summary and where to continue, for the plan page.
 * With `day`: that day's question marks and the ones waiting in the drill, for
 * the day page. Both pages are cached and shared by every visitor, so the
 * personal part is fetched here by the browser, the /api/me/header pattern,
 * and only by a signed-in browser: a signed-out visitor gets 401 and the page
 * stays as it is.
 *
 * Read with the student's own JWT (RLS is the authorization). Rules:
 * lib/homework/progress; reads: lib/homework/progressService.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { parseProgressQuery } from "@/lib/homework/progress";
import { loadHomeworkDayMarks, loadHomeworkProgress } from "@/lib/homework/progressService";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" };

export async function GET(request: NextRequest) {
  const parsed = parseProgressQuery(request.nextUrl.searchParams);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400, headers: NO_STORE });

  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (!user) return NextResponse.json({ error: "Sign in to see your progress." }, { status: 401, headers: NO_STORE });

  try {
    const db = createSupabaseServerClient();
    const out =
      parsed.day === undefined
        ? await loadHomeworkProgress(db, user.id, parsed.slug)
        : await loadHomeworkDayMarks(db, user.id, parsed.slug, parsed.day);
    if (!out) return NextResponse.json({ error: "No such homework." }, { status: 404, headers: NO_STORE });
    return NextResponse.json(out, { headers: NO_STORE });
  } catch (e) {
    console.error("homework progress failed", e);
    return NextResponse.json({ error: "Couldn't load your progress." }, { status: 500, headers: NO_STORE });
  }
}
