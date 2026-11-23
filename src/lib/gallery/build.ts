/**
 * Builds the Visuals gallery's list from the notes (2026-11-23). Pure: the
 * generator (scripts/gallery/gen-index.ts) and the drift test feed it the
 * notes registry. Spec: tests/gallery.test.ts.
 *
 * One entry per concept that shows a visual, in the notes' teaching order
 * (chapters as given, topics by the chapter's subtopicOrder, concepts as
 * written). A visual two concepts of one subject share is listed once; one
 * shared by two exams is listed under each, since a JEE student browses JEE.
 */
import type { NotesChapterRegistration } from "@/lib/notes/chapters";
import type { GalleryBadge, GalleryVisual } from "./gallery";

export type GalleryChapterInput = Pick<
  NotesChapterRegistration,
  "examName" | "subjectName" | "subjectRoute" | "subjectDisplay" | "chapterSlug" | "chapter" | "notes"
>;

export type GalleryBuildOptions = {
  /** Diagrams that run in the browser (ClientDiagram.generated.tsx): a slider, a drag. */
  clientSlugs: ReadonlySet<string>;
  /** The hand list of 3D scenes (threeD.ts). */
  threeD: ReadonlySet<string>;
  /** The site's exam slug for a notes exam name, or null (unknown, or the international site). */
  examSlugOf: (examName: string) => string | null;
};

export function badgeOf(slug: string, opts: Pick<GalleryBuildOptions, "clientSlugs" | "threeD">): GalleryBadge {
  if (opts.threeD.has(slug)) return "3d";
  return opts.clientSlugs.has(slug) ? "try" : "picture";
}

type ConceptLike = { slug: string; name: string; intuition?: string; pyqExampleId?: string; visualizationSlug?: string };
type TopicLike = { title: string; concepts: ConceptLike[] };

export function buildGalleryIndex(chapters: readonly GalleryChapterInput[], opts: GalleryBuildOptions): GalleryVisual[] {
  const out: GalleryVisual[] = [];
  const seen = new Set<string>();
  for (const c of chapters) {
    const examSlug = opts.examSlugOf(c.examName);
    if (!examSlug) continue;
    const notes = c.notes as unknown as Record<string, TopicLike>;
    const order = c.chapter.subtopicOrder?.length ? c.chapter.subtopicOrder : Object.keys(notes);
    for (const subtopicSlug of order) {
      const topic = notes[subtopicSlug];
      if (!topic) continue;
      for (const k of topic.concepts) {
        if (!k.visualizationSlug) continue;
        const key = `${c.subjectRoute}|${k.visualizationSlug}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({
          slug: k.visualizationSlug,
          examSlug,
          examName: c.examName,
          subjectName: c.subjectName,
          subjectRoute: c.subjectRoute,
          subjectDisplay: c.subjectDisplay,
          chapterSlug: c.chapterSlug,
          chapterName: c.chapter.chapterName,
          subtopicSlug,
          subtopicTitle: topic.title,
          conceptSlug: k.slug,
          conceptName: k.name,
          line: k.intuition ?? "",
          ...(k.pyqExampleId ? { pyqExampleId: k.pyqExampleId } : {}),
          badge: badgeOf(k.visualizationSlug, opts),
          interactive: opts.clientSlugs.has(k.visualizationSlug),
        });
      }
    }
  }
  return out;
}
