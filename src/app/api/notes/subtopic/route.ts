/**
 * GET /api/notes/subtopic?route=&chapter=&subtopic=[&concept=] (2026-11-15):
 * one notes subtopic's teaching content for the stuck offer's "Teach me the
 * idea" panel (components/reveal/TeachPanel), so the student learns the idea
 * without leaving their question.
 *
 * Reads the notes modules on the server, one chapter through its lazy loader
 * (lib/notes/chapterIndex), never the notes registry in the browser. Public
 * content, so the CDN keeps it for a day like the notes pages.
 */
import { NextResponse, type NextRequest } from "next/server";
import { loadNotesChapter } from "@/lib/notes/chapterIndex";
import { isNotesSlug, teachConcepts } from "@/lib/notes/teachPanel";

const CACHE = "public, s-maxage=86400, stale-while-revalidate=3600";

export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams;
  const route = p.get("route") ?? "";
  const chapter = p.get("chapter") ?? "";
  const subtopic = p.get("subtopic") ?? "";
  const concept = p.get("concept");
  if (!isNotesSlug(route) || !isNotesSlug(chapter) || !isNotesSlug(subtopic) || (concept !== null && !isNotesSlug(concept))) {
    return NextResponse.json({ error: "Give a notes subject, chapter and subtopic." }, { status: 400 });
  }

  let registration;
  try {
    registration = await loadNotesChapter(route, chapter);
  } catch (e) {
    console.error("notes subtopic read failed", route, chapter, e);
    return NextResponse.json({ error: "Could not load these notes." }, { status: 500 });
  }
  const note = registration?.notes[subtopic];
  if (!note) {
    return NextResponse.json({ error: "No notes for that subtopic." }, { status: 404, headers: { "Cache-Control": CACHE } });
  }

  return NextResponse.json(
    {
      title: note.title,
      oneLineDefinition: note.oneLineDefinition,
      href: `/notes/${route}/${chapter}/${subtopic}`,
      concepts: teachConcepts(note, concept),
    },
    { headers: { "Cache-Control": CACHE } }
  );
}
