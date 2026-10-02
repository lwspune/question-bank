import type { SubtopicNote } from "@/app/notes/_types";
import { CDSEN_RCA_LOCATING_NOTE } from "./rca-locating";
import { CDSEN_RCA_DEFINITIONS_REASONS_NOTE } from "./rca-definitions-reasons";
import { CDSEN_RCA_OPTION_TRAPS_NOTE } from "./rca-option-traps";
import { CDSEN_RCA_WORD_MEANING_NOTE } from "./rca-word-meaning";
import { CDSEN_RCA_WORD_HUNTS_NOTE } from "./rca-word-hunts";
import { CDSEN_RCB_PHRASES_NOTE } from "./rcb-phrases";
import { CDSEN_RCB_INFERENCE_NOTE } from "./rcb-inference";
import { CDSEN_RCB_REASONS_NOTE } from "./rcb-reasons";
import { CDSEN_RCB_MAIN_IDEA_NOTE } from "./rcb-main-idea";
import { CDSEN_RCB_PAIRS_CORE_NOTE } from "./rcb-pairs-core";
import { CDSEN_RCB_PAIRS_WIDER_NOTE } from "./rcb-pairs-wider";

export { CDSEN_RC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-english/reading-comprehension/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsen-` here and `cdsen-` on concept slugs.
 *
 * CDS English Reading Comprehension: 11 pages, re-cut by technique 2026-10-02.
 */
export const CDSEN_RC_NOTES: Record<string, SubtopicNote> = {
  "cdsen-rca-locating": CDSEN_RCA_LOCATING_NOTE,
  "cdsen-rca-definitions-reasons": CDSEN_RCA_DEFINITIONS_REASONS_NOTE,
  "cdsen-rca-option-traps": CDSEN_RCA_OPTION_TRAPS_NOTE,
  "cdsen-rca-word-meaning": CDSEN_RCA_WORD_MEANING_NOTE,
  "cdsen-rca-word-hunts": CDSEN_RCA_WORD_HUNTS_NOTE,
  "cdsen-rcb-phrases": CDSEN_RCB_PHRASES_NOTE,
  "cdsen-rcb-inference": CDSEN_RCB_INFERENCE_NOTE,
  "cdsen-rcb-reasons": CDSEN_RCB_REASONS_NOTE,
  "cdsen-rcb-main-idea": CDSEN_RCB_MAIN_IDEA_NOTE,
  "cdsen-rcb-pairs-core": CDSEN_RCB_PAIRS_CORE_NOTE,
  "cdsen-rcb-pairs-wider": CDSEN_RCB_PAIRS_WIDER_NOTE,
};

export const CDSEN_RC_SLUGS = Object.keys(CDSEN_RC_NOTES);
