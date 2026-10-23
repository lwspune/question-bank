import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_EID_TIME_NOTE } from "./time";
import { SSC_EID_TROUBLE_NOTE } from "./trouble";
import { SSC_EID_PEOPLE_NOTE } from "./people";
import { SSC_EID_WORK_NOTE } from "./work";
import { SSC_EID_SPEECH_NOTE } from "./speech";
import { SSC_EID_FEELINGS_NOTE } from "./feelings";

export { SSC_IDIOMS_AND_PHRASES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-english/idioms-and-phrases/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-eid-` here and `ssceid-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/idioms-and-phrases.ts). Order matches `subtopicOrder`.
 */
export const SSC_IDIOMS_AND_PHRASES_NOTES: Record<string, SubtopicNote> = {
  "ssc-eid-time": SSC_EID_TIME_NOTE,
  "ssc-eid-trouble": SSC_EID_TROUBLE_NOTE,
  "ssc-eid-people": SSC_EID_PEOPLE_NOTE,
  "ssc-eid-work": SSC_EID_WORK_NOTE,
  "ssc-eid-speech": SSC_EID_SPEECH_NOTE,
  "ssc-eid-feelings": SSC_EID_FEELINGS_NOTE,
};

export const SSC_IDIOMS_AND_PHRASES_SLUGS = Object.keys(SSC_IDIOMS_AND_PHRASES_NOTES);
