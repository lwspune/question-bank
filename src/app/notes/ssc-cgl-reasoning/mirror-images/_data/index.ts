import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RMI_LETTERS_NOTE } from "./letters";
import { SSC_RMI_FIGURES_NOTE } from "./figures";

export { SSC_MIRROR_IMAGES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/mirror-images/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rmi-` here and `sscrmi-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/mirror-images.ts). Order matches `subtopicOrder`.
 */
export const SSC_MIRROR_IMAGES_NOTES: Record<string, SubtopicNote> = {
  "ssc-rmi-letters": SSC_RMI_LETTERS_NOTE,
  "ssc-rmi-figures": SSC_RMI_FIGURES_NOTE,
};

export const SSC_MIRROR_IMAGES_SLUGS = Object.keys(SSC_MIRROR_IMAGES_NOTES);
