import type { SubtopicNote } from "@/app/notes/_types";
import { CDSEN_POS_NOUNS_PRONOUNS_NOTE } from "./pos-nouns-pronouns";
import { CDSEN_POS_ADJECTIVES_NOTE } from "./pos-adjectives";
import { CDSEN_POS_VERBS_NOTE } from "./pos-verbs";
import { CDSEN_POS_ADVERBS_NOTE } from "./pos-adverbs";
import { CDSEN_POS_JOINING_WORDS_NOTE } from "./pos-joining-words";
import { CDSEN_POS_ARTICLES_NOTE } from "./pos-articles";
import { CDSEN_POS_QUANTIFIERS_NOTE } from "./pos-quantifiers";
import { CDSEN_PREP_TIME_PLACE_NOTE } from "./prep-time-place";
import { CDSEN_PREP_COLLOCATIONS_NOTE } from "./prep-collocations";
import { CDSEN_PREP_PHRASAL_NOTE } from "./prep-phrasal";
import { CDSEN_PREP_IDIOMS_NOTE } from "./prep-idioms";
import { CDSEN_PREP_CONNECTORS_NOTE } from "./prep-connectors";
import { CDSEN_PREP_VERB_BLANKS_NOTE } from "./prep-verb-blanks";
import { CDSEN_PREP_WORD_CHOICE_NOTE } from "./prep-word-choice";
import { CDSEN_SC_AGREEMENT_NOTE } from "./sc-agreement";
import { CDSEN_SC_CONDITIONALS_NOTE } from "./sc-conditionals";
import { CDSEN_SC_CONNECTORS_NOTE } from "./sc-connectors";
import { CDSEN_SC_VOICE_SPEECH_NOTE } from "./sc-voice-speech";
import { CDSEN_SC_WORD_USAGE_NOTE } from "./sc-word-usage";

export { CDSEN_GRAMMAR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-english/grammar/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsen-` here and `cdsen-` on concept slugs.
 *
 * CDS English Grammar: 19 pages, re-cut by technique 2026-10-02.
 */
export const CDSEN_GRAMMAR_NOTES: Record<string, SubtopicNote> = {
  "cdsen-pos-nouns-pronouns": CDSEN_POS_NOUNS_PRONOUNS_NOTE,
  "cdsen-pos-adjectives": CDSEN_POS_ADJECTIVES_NOTE,
  "cdsen-pos-verbs": CDSEN_POS_VERBS_NOTE,
  "cdsen-pos-adverbs": CDSEN_POS_ADVERBS_NOTE,
  "cdsen-pos-joining-words": CDSEN_POS_JOINING_WORDS_NOTE,
  "cdsen-pos-articles": CDSEN_POS_ARTICLES_NOTE,
  "cdsen-pos-quantifiers": CDSEN_POS_QUANTIFIERS_NOTE,
  "cdsen-prep-time-place": CDSEN_PREP_TIME_PLACE_NOTE,
  "cdsen-prep-collocations": CDSEN_PREP_COLLOCATIONS_NOTE,
  "cdsen-prep-phrasal": CDSEN_PREP_PHRASAL_NOTE,
  "cdsen-prep-idioms": CDSEN_PREP_IDIOMS_NOTE,
  "cdsen-prep-connectors": CDSEN_PREP_CONNECTORS_NOTE,
  "cdsen-prep-verb-blanks": CDSEN_PREP_VERB_BLANKS_NOTE,
  "cdsen-prep-word-choice": CDSEN_PREP_WORD_CHOICE_NOTE,
  "cdsen-sc-agreement": CDSEN_SC_AGREEMENT_NOTE,
  "cdsen-sc-conditionals": CDSEN_SC_CONDITIONALS_NOTE,
  "cdsen-sc-connectors": CDSEN_SC_CONNECTORS_NOTE,
  "cdsen-sc-voice-speech": CDSEN_SC_VOICE_SPEECH_NOTE,
  "cdsen-sc-word-usage": CDSEN_SC_WORD_USAGE_NOTE,
};

export const CDSEN_GRAMMAR_SLUGS = Object.keys(CDSEN_GRAMMAR_NOTES);
