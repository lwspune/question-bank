/**
 * GET /api/gallery/weak?subject=<route>: a signed-in student's chapters with
 * mistakes waiting on the Fix list, for one Visuals gallery subject
 * (2026-11-23). The gallery page is cached for everyone, so the browser asks
 * this afterwards and puts those chapters first.
 *
 * The pool is the Fix list's own (loadOwnPool), so a chapter's count is the
 * one /me's weak spots and the drill show. Read with the student's own login
 * (user_activity is own-row under RLS). Signed out: nothing waiting, no read.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loadOwnPool } from "@/lib/drill/compose";
import { weakChapterCounts } from "@/lib/gallery/gallery";
import { GALLERY_SUBJECTS } from "@/lib/gallery/galleryIndex.generated";

export const maxDuration = 15;

const NO_STORE = { "Cache-Control": "no-store, private" };

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ chapters: {} }, { headers: NO_STORE });

    const route = request.nextUrl.searchParams.get("subject") ?? "";
    const subject = GALLERY_SUBJECTS.find((s) => s.subjectRoute === route);
    if (!subject) return NextResponse.json({ error: "Unknown subject." }, { status: 400, headers: NO_STORE });

    const { drillable } = await loadOwnPool(createSupabaseServerClient(), user.id, new Date());
    const counts = weakChapterCounts(drillable, subject.examName, subject.subjectName);
    return NextResponse.json({ chapters: Object.fromEntries(counts) }, { headers: NO_STORE });
  } catch (err) {
    console.error("gallery weak chapters failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ chapters: {} }, { status: 500, headers: NO_STORE });
  }
}
