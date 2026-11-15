import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_PI_MENDEL_NOTE } from "./mendel";
import { NEET_BO_PI_DEVIATIONS_NOTE } from "./deviations";
import { NEET_BO_PI_LINKAGE_NOTE } from "./linkage";
import { NEET_BO_PI_DISORDERS_NOTE } from "./disorders";

export { NEET_BO_PI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/inheritance/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-pi-` here and `nbopi-` on concept slugs.
 *
 * NCERT XII ch.4: Mendel, deviations, linkage, sex determination, disorders.
 */
export const NEET_BO_PI_NOTES: Record<string, SubtopicNote> = {
  "nbo-pi-mendel": NEET_BO_PI_MENDEL_NOTE,
  "nbo-pi-deviations": NEET_BO_PI_DEVIATIONS_NOTE,
  "nbo-pi-linkage": NEET_BO_PI_LINKAGE_NOTE,
  "nbo-pi-disorders": NEET_BO_PI_DISORDERS_NOTE,
};

export const NEET_BO_PI_SLUGS = Object.keys(NEET_BO_PI_NOTES);
