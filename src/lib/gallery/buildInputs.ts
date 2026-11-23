/**
 * What the Visuals gallery is built from (2026-11-23): the notes registry in
 * book order, the browser-run diagrams and the 3D hand list. It imports the
 * WHOLE notes corpus, so only the generator (scripts/gallery/gen-index.ts)
 * and the drift test may import it, never a page.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { NOTES_CHAPTERS, getNotesChaptersForSubject } from "@/lib/notes/chapters";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import type { GalleryBuildOptions, GalleryChapterInput } from "./build";
import type { GallerySubject, GalleryVisual } from "./gallery";
import { THREE_D_VISUALS } from "./threeD";

/** The browser-run diagrams, read from the generated split (src/lib/notes/diagramSplit.ts). */
function clientDiagramSlugs(): Set<string> {
  const src = readFileSync(path.join(process.cwd(), "src/app/notes/_components/ClientDiagram.generated.tsx"), "utf8");
  return new Set([...src.matchAll(/^\s+"([a-z0-9-]+)": dynamic\(/gm)].map((m) => m[1]));
}

/** www's exams by their notes name; the international site's are left out. */
function examSlugOf(examName: string): string | null {
  const e = EXAM_REGISTRY.find((x) => x.examName === examName);
  return e && e.site !== "intl" ? e.slug : null;
}

export function galleryBuildInputs(): { chapters: GalleryChapterInput[]; opts: GalleryBuildOptions } {
  const subjects = [...new Set(NOTES_CHAPTERS.map((c) => c.subjectRoute))];
  return {
    chapters: subjects.flatMap((s) => getNotesChaptersForSubject(s)),
    opts: { clientSlugs: clientDiagramSlugs(), threeD: new Set(THREE_D_VISUALS), examSlugOf },
  };
}

/** The subjects with visuals, in the order the list holds them. */
export function gallerySubjectsOf(visuals: readonly GalleryVisual[]): GallerySubject[] {
  const by = new Map<string, GallerySubject>();
  for (const v of visuals) {
    const s = by.get(v.subjectRoute);
    if (s) s.count++;
    else
      by.set(v.subjectRoute, {
        examSlug: v.examSlug,
        examName: v.examName,
        subjectName: v.subjectName,
        subjectRoute: v.subjectRoute,
        subjectDisplay: v.subjectDisplay,
        count: 1,
      });
  }
  return [...by.values()];
}

/** Each exam's first subject with visuals: all the header needs. */
export function galleryNavOf(visuals: readonly GalleryVisual[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const v of visuals) if (!(v.examSlug in out)) out[v.examSlug] = v.subjectRoute;
  return out;
}
