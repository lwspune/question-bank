import type { SubtopicNote } from "@/app/notes/_types";
import { CDSEN_CZ_SLOT_NOTE } from "./cz-slot";
import { CDSEN_CZ_VERBS_NOTE } from "./cz-verbs";
import { CDSEN_CZ_PREPOSITIONS_NOTE } from "./cz-prepositions";
import { CDSEN_CZ_COLLOCATIONS_NOTE } from "./cz-collocations";
import { CDSEN_CZ_LINKERS_NOTE } from "./cz-linkers";
import { CDSEN_CZ_MEANING_NOTE } from "./cz-meaning";

export { CDSEN_CLOZE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-english/cloze-test/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsen-` here and `cdsen-` on concept slugs.
 *
 * CDS English Cloze Test: 6 pages, re-cut by technique 2026-10-02.
 */
export const CDSEN_CLOZE_NOTES: Record<string, SubtopicNote> = {
  "cdsen-cz-slot": CDSEN_CZ_SLOT_NOTE,
  "cdsen-cz-verbs": CDSEN_CZ_VERBS_NOTE,
  "cdsen-cz-prepositions": CDSEN_CZ_PREPOSITIONS_NOTE,
  "cdsen-cz-collocations": CDSEN_CZ_COLLOCATIONS_NOTE,
  "cdsen-cz-linkers": CDSEN_CZ_LINKERS_NOTE,
  "cdsen-cz-meaning": CDSEN_CZ_MEANING_NOTE,
};

export const CDSEN_CLOZE_SLUGS = Object.keys(CDSEN_CLOZE_NOTES);
