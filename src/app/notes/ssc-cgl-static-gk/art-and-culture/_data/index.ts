import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_SAC_CLASSICAL_NOTE } from "./classical";
import { SSC_SAC_DANCERS_NOTE } from "./dancers";
import { SSC_SAC_FOLK_NWS_NOTE } from "./folk-nws";
import { SSC_SAC_FOLK_CE_NOTE } from "./folk-ce";
import { SSC_SAC_MUSIC_NOTE } from "./music";
import { SSC_SAC_INSTRUMENTS_NOTE } from "./instruments";
import { SSC_SAC_HERITAGE_NOTE } from "./heritage";

export { SSC_ART_AND_CULTURE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-static-gk/art-and-culture/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-sac-` here and `sscsac-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/art-and-culture.ts). Order matches `subtopicOrder`.
 */
export const SSC_ART_AND_CULTURE_NOTES: Record<string, SubtopicNote> = {
  "ssc-sac-classical": SSC_SAC_CLASSICAL_NOTE,
  "ssc-sac-dancers": SSC_SAC_DANCERS_NOTE,
  "ssc-sac-folk-nws": SSC_SAC_FOLK_NWS_NOTE,
  "ssc-sac-folk-ce": SSC_SAC_FOLK_CE_NOTE,
  "ssc-sac-music": SSC_SAC_MUSIC_NOTE,
  "ssc-sac-instruments": SSC_SAC_INSTRUMENTS_NOTE,
  "ssc-sac-heritage": SSC_SAC_HERITAGE_NOTE,
};

export const SSC_ART_AND_CULTURE_SLUGS = Object.keys(SSC_ART_AND_CULTURE_NOTES);
