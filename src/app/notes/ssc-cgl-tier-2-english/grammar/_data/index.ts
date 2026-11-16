import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_EGR_VOICE_NOTE } from "./voice";
import { SSC2_EGR_SPEECH_NOTE } from "./speech";
import { SSC2_EGR_BLANKS_NOTE } from "./blanks";

export { SSC2_GRAMMAR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-english/grammar/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-egr-` here and `ssc2egr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/grammar.ts). Order matches `subtopicOrder`.
 */
export const SSC2_GRAMMAR_NOTES: Record<string, SubtopicNote> = {
  "ssc2-egr-voice": SSC2_EGR_VOICE_NOTE,
  "ssc2-egr-speech": SSC2_EGR_SPEECH_NOTE,
  "ssc2-egr-blanks": SSC2_EGR_BLANKS_NOTE,
};

export const SSC2_GRAMMAR_SLUGS = Object.keys(SSC2_GRAMMAR_NOTES);
