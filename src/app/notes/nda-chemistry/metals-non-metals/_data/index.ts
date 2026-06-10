import type { SubtopicNote } from "@/app/notes/_types";
import { REACTIVITY_SERIES_NOTE } from "./reactivity-series";
import { EXTRACTION_NOTE } from "./extraction";
import { CORROSION_NOTE } from "./corrosion";
import { ALLOYS_NOTE } from "./alloys";

export { METALS_NON_METALS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-chemistry/metals-non-metals/[subtopicSlug].
 * Keys are GLOBALLY-unique (`met-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const METALS_NON_METALS_NOTES: Record<string, SubtopicNote> = {
  "met-reactivity-series": REACTIVITY_SERIES_NOTE,
  "met-extraction": EXTRACTION_NOTE,
  "met-corrosion": CORROSION_NOTE,
  "met-alloys": ALLOYS_NOTE,
};

export const METALS_NON_METALS_SLUGS = Object.keys(METALS_NON_METALS_NOTES);
