import { NextResponse, type NextRequest } from "next/server";
import { getChapterLanding, landingHref } from "@/lib/questions/landing";
import { listShortChapters } from "@/lib/questions/shortChaptersServer";
import { goChapterTarget } from "@/lib/questions/shortChapters";

export const dynamic = "force-dynamic";

/**
 * GET /go/chapter/<exam>/<subject>/<chapter> (2026-11-24): where V links a
 * chapter too small for a /questions landing page (lib/questions/shortChapters.ts).
 * V's links carry no query string, so this short address opens the chapter on
 * /browse. A chapter that has since grown a landing page goes there; an address
 * nobody knows opens /browse. Never a dead end.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ exam: string; subject: string; chapter: string }> }) {
  const { exam, subject, chapter } = await params;
  const origin = new URL(request.url).origin;
  const landing = await getChapterLanding(exam, subject, chapter).catch(() => null);
  if (landing) return NextResponse.redirect(new URL(landingHref(landing), origin));
  const rows = await listShortChapters().catch((e: unknown) => {
    console.error("/go/chapter: small chapters unavailable", e instanceof Error ? e.message : e);
    return [];
  });
  return NextResponse.redirect(new URL(goChapterTarget(rows, exam, subject, chapter), origin));
}
