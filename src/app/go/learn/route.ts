import { NextResponse, type NextRequest } from "next/server";
import { buildChapterLearnPath, buildLearnPath } from "@/lib/notes/goLinks";

export const dynamic = "force-dynamic";

/**
 * GET /go/learn?subtopic=<slug-or-name>&concept=<concept-slug>&chapter=<name>
 *
 * The cross-app "Learn this" target. `subtopic` is resolved first as a notes
 * slug (the quiz path + tagged exam questions), then as a DB subtopic NAME when
 * `chapter` is supplied (the exam path, which carries names not slugs). When no
 * subtopic resolves but a `chapter` is given, degrades to the chapter-level
 * notes index (the "Where to focus" path). Degrades to the /notes index when
 * nothing resolves (e.g. an English subtopic with no
 * notes) — never a dead end.
 */
export function GET(request: NextRequest) {
  const url = new URL(request.url);
  const subtopic = url.searchParams.get("subtopic");
  const concept = url.searchParams.get("concept");
  const chapter = url.searchParams.get("chapter");

  const path =
    buildLearnPath(subtopic, concept, chapter) ??
    buildChapterLearnPath(chapter) ??
    "/notes";
  return NextResponse.redirect(new URL(path, url.origin));
}
