import type { SubtopicNote } from "@/app/notes/_types";
import { ARITHMETIC_PROGRESSIONS_NOTE } from "./arithmetic-progressions";
import { GEOMETRIC_PROGRESSIONS_NOTE } from "./geometric-progressions";
import { HARMONIC_MEANS_NOTE } from "./harmonic-means";
import { INTERRELATING_PROGRESSIONS_NOTE } from "./interrelating-progressions";
import { SPECIAL_SERIES_NOTE } from "./special-series";

export { SEQUENCE_SERIES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/sequence-series/[subtopicSlug].
 * Keys must match the URL slug AND the subtopic_slug used in
 * question_concept_tags (globally unique across all chapters — hence the
 * `seq-` prefix).
 */
export const SEQUENCE_SERIES_NOTES: Record<string, SubtopicNote> = {
  "seq-arithmetic-progressions": ARITHMETIC_PROGRESSIONS_NOTE,
  "seq-geometric-progressions": GEOMETRIC_PROGRESSIONS_NOTE,
  "seq-harmonic-means": HARMONIC_MEANS_NOTE,
  "seq-interrelating-progressions": INTERRELATING_PROGRESSIONS_NOTE,
  "seq-special-series": SPECIAL_SERIES_NOTE,
};

export const SEQUENCE_SERIES_SLUGS = Object.keys(SEQUENCE_SERIES_NOTES);
