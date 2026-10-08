import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_PHY_OPT_CHAPTER: ChapterNote = {
  chapterName: "Optics",
  title: "Optics: Mirrors, Refraction, Lenses and the Eye",
  intro:
    "Optics has a single past question since 2011, on a concave mirror, and the ministry papers from 2023 on have not asked about it at all. " +
    "That makes it one of the least tested chapters, but the syllabus still lists it, and the eye, the endoscope and corrective lenses make it natural material for a medical admission test. " +
    "Expect either a fact to recall (which lens corrects short sight, when light is totally reflected) or a short calculation with Snell's law or the thin lens equation. " +
    "The traps are in the conventions: angles from the normal, focal lengths in metres for dioptres, and the sign that marks an image as virtual.",
  subtopicOrder: ["imat-opt-reflection-refraction", "imat-opt-lenses-eye"],
};
