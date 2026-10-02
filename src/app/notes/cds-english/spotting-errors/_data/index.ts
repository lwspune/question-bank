import type { SubtopicNote } from "@/app/notes/_types";
import { CDSEN_SEB_AGREEMENT_NOTE } from "./seb-agreement";
import { CDSEN_SEB_TENSES_NOTE } from "./seb-tenses";
import { CDSEN_SEB_VERB_FORMS_NOTE } from "./seb-verb-forms";
import { CDSEN_SEB_ARTICLES_NOTE } from "./seb-articles";
import { CDSEN_SEB_PRONOUNS_NOTE } from "./seb-pronouns";
import { CDSEN_SEA_FIXED_PREPOSITIONS_NOTE } from "./sea-fixed-prepositions";
import { CDSEN_SEA_EXTRA_PREPOSITIONS_NOTE } from "./sea-extra-prepositions";
import { CDSEN_SEA_WORD_CHOICE_NOTE } from "./sea-word-choice";
import { CDSEN_SEA_REDUNDANCY_CONNECTORS_NOTE } from "./sea-redundancy-connectors";
import { CDSEN_SEA_NO_ERROR_NOTE } from "./sea-no-error";
import { CDSEN_SEA_SENTENCE_IMPROVEMENT_NOTE } from "./sea-sentence-improvement";
import { CDSEN_SEA_WORD_IMPROVEMENT_NOTE } from "./sea-word-improvement";

export { CDSEN_ERRORS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-english/spotting-errors/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsen-` here and `cdsen-` on concept slugs.
 *
 * CDS English Spotting Errors: 12 pages, re-cut by technique 2026-10-02.
 */
export const CDSEN_ERRORS_NOTES: Record<string, SubtopicNote> = {
  "cdsen-seb-agreement": CDSEN_SEB_AGREEMENT_NOTE,
  "cdsen-seb-tenses": CDSEN_SEB_TENSES_NOTE,
  "cdsen-seb-verb-forms": CDSEN_SEB_VERB_FORMS_NOTE,
  "cdsen-seb-articles": CDSEN_SEB_ARTICLES_NOTE,
  "cdsen-seb-pronouns": CDSEN_SEB_PRONOUNS_NOTE,
  "cdsen-sea-fixed-prepositions": CDSEN_SEA_FIXED_PREPOSITIONS_NOTE,
  "cdsen-sea-extra-prepositions": CDSEN_SEA_EXTRA_PREPOSITIONS_NOTE,
  "cdsen-sea-word-choice": CDSEN_SEA_WORD_CHOICE_NOTE,
  "cdsen-sea-redundancy-connectors": CDSEN_SEA_REDUNDANCY_CONNECTORS_NOTE,
  "cdsen-sea-no-error": CDSEN_SEA_NO_ERROR_NOTE,
  "cdsen-sea-sentence-improvement": CDSEN_SEA_SENTENCE_IMPROVEMENT_NOTE,
  "cdsen-sea-word-improvement": CDSEN_SEA_WORD_IMPROVEMENT_NOTE,
};

export const CDSEN_ERRORS_SLUGS = Object.keys(CDSEN_ERRORS_NOTES);
