/**
 * The generated Visuals gallery files agree with the notes (2026-11-23).
 * Run `npm run gallery:index` after shipping or changing a notes chapter or a
 * notes diagram: this fails until you do.
 *
 * Three generated files, so no page carries more than it shows:
 * - galleryIndex.generated.ts: the subjects (for the dropdowns) and one lazy
 *   loader per subject;
 * - galleryNav.generated.ts: exam -> first subject, all the header reads;
 * - subjects/<route>.generated.ts: that subject's visuals and their tile
 *   pictures (the diagram drawn as static markup, as the ebooks draw it).
 */
import { describe, it, expect } from "vitest";
import { renderDiagramMarkup } from "@/lib/ebooks/diagrams";
import { buildGalleryIndex } from "@/lib/gallery/build";
import { galleryBuildInputs, gallerySubjectsOf, galleryNavOf } from "@/lib/gallery/buildInputs";
import { GALLERY_SUBJECTS, GALLERY_LOADERS } from "@/lib/gallery/galleryIndex.generated";
import { GALLERY_NAV } from "@/lib/gallery/galleryNav.generated";
import type { VisualizationSlug } from "@/app/notes/_types";

const { chapters, opts } = galleryBuildInputs();
const built = buildGalleryIndex(chapters, opts);

describe("the generated gallery files", () => {
  it("list the right subjects, and the header map matches", () => {
    expect(GALLERY_SUBJECTS).toEqual(gallerySubjectsOf(built));
    expect(GALLERY_NAV).toEqual(galleryNavOf(built));
    expect(Object.keys(GALLERY_LOADERS).sort()).toEqual(GALLERY_SUBJECTS.map((s) => s.subjectRoute).sort());
  });

  it("hold every visual of each subject, in order", async () => {
    for (const s of GALLERY_SUBJECTS) {
      const { VISUALS } = await GALLERY_LOADERS[s.subjectRoute]();
      expect(VISUALS, s.subjectRoute).toEqual(built.filter((v) => v.subjectRoute === s.subjectRoute));
    }
  });

  it("draw each tile exactly as the diagram draws today", async () => {
    for (const s of GALLERY_SUBJECTS) {
      const { VISUALS, THUMBS } = await GALLERY_LOADERS[s.subjectRoute]();
      expect(Object.keys(THUMBS).sort(), s.subjectRoute).toEqual([...new Set(VISUALS.map((v) => v.slug))].sort());
      for (const slug of Object.keys(THUMBS)) {
        expect(THUMBS[slug], `${s.subjectRoute} ${slug}`).toBe(renderDiagramMarkup(slug as VisualizationSlug));
      }
    }
  }, 120_000);

  it("leave out the international site's exams", () => {
    expect(GALLERY_SUBJECTS.some((s) => s.examSlug === "imat" || s.examSlug === "enem")).toBe(false);
  });

  it("badge every listed 3D visual, and only real visuals are listed as 3D", () => {
    const slugs = new Set(built.map((v) => v.slug));
    for (const s of opts.threeD) expect(slugs.has(s), s).toBe(true);
  });
});
