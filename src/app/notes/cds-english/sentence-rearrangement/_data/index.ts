import type { SubtopicNote } from "@/app/notes/_types";
import { CDSEN_PQ_SUBJECT_VERB_NOTE } from "./pq-subject-verb";
import { CDSEN_PQ_VERB_PATTERNS_NOTE } from "./pq-verb-patterns";
import { CDSEN_PQ_PREPOSITIONS_NOTE } from "./pq-prepositions";
import { CDSEN_PQ_NOUN_PHRASES_NOTE } from "./pq-noun-phrases";
import { CDSEN_PQ_MODIFIERS_NOTE } from "./pq-modifiers";
import { CDSEN_PQ_LINKERS_NOTE } from "./pq-linkers";
import { CDSEN_PQ_OPENING_NOTE } from "./pq-opening";
import { CDSEN_PS_FRAME_NOTE } from "./ps-frame";
import { CDSEN_PS_PRONOUNS_NOTE } from "./ps-pronouns";
import { CDSEN_PS_THIS_THESE_NOTE } from "./ps-this-these";
import { CDSEN_PS_LINKERS_NOTE } from "./ps-linkers";
import { CDSEN_PS_ORDER_NOTE } from "./ps-order";
import { CDSEN_PS_ARGUMENT_NOTE } from "./ps-argument";
import { CDSEN_PS_PAIRS_NOTE } from "./ps-pairs";

export { CDSEN_REARR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-english/sentence-rearrangement/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsen-` here and `cdsen-` on concept slugs.
 *
 * CDS English Sentence Rearrangement: 14 pages, re-cut by technique 2026-10-02.
 */
export const CDSEN_REARR_NOTES: Record<string, SubtopicNote> = {
  "cdsen-pq-subject-verb": CDSEN_PQ_SUBJECT_VERB_NOTE,
  "cdsen-pq-verb-patterns": CDSEN_PQ_VERB_PATTERNS_NOTE,
  "cdsen-pq-prepositions": CDSEN_PQ_PREPOSITIONS_NOTE,
  "cdsen-pq-noun-phrases": CDSEN_PQ_NOUN_PHRASES_NOTE,
  "cdsen-pq-modifiers": CDSEN_PQ_MODIFIERS_NOTE,
  "cdsen-pq-linkers": CDSEN_PQ_LINKERS_NOTE,
  "cdsen-pq-opening": CDSEN_PQ_OPENING_NOTE,
  "cdsen-ps-frame": CDSEN_PS_FRAME_NOTE,
  "cdsen-ps-pronouns": CDSEN_PS_PRONOUNS_NOTE,
  "cdsen-ps-this-these": CDSEN_PS_THIS_THESE_NOTE,
  "cdsen-ps-linkers": CDSEN_PS_LINKERS_NOTE,
  "cdsen-ps-order": CDSEN_PS_ORDER_NOTE,
  "cdsen-ps-argument": CDSEN_PS_ARGUMENT_NOTE,
  "cdsen-ps-pairs": CDSEN_PS_PAIRS_NOTE,
};

export const CDSEN_REARR_SLUGS = Object.keys(CDSEN_REARR_NOTES);
