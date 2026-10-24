import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_EGR_VOICE_NOTE } from "./voice";
import { SSC_EGR_SPEECH_NOTE } from "./speech";
import { SSC_EGR_SENTENCE_NOTE } from "./sentence";

export { SSC_GRAMMAR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-english/grammar/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-egr-` here and `sscegr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/grammar.ts). Order matches `subtopicOrder`.
 */
export const SSC_GRAMMAR_NOTES: Record<string, SubtopicNote> = {
  "ssc-egr-voice": SSC_EGR_VOICE_NOTE,
  "ssc-egr-speech": SSC_EGR_SPEECH_NOTE,
  "ssc-egr-sentence": SSC_EGR_SENTENCE_NOTE,
};

export const SSC_GRAMMAR_SLUGS = Object.keys(SSC_GRAMMAR_NOTES);
