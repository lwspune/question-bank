import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_SSP_OLYMPICS_NOTE } from "./olympics";
import { SSC_SSP_INDIA_NOTE } from "./india";
import { SSC_SSP_BODIES_NOTE } from "./bodies";
import { SSC_SSP_CRICKET_NOTE } from "./cricket";
import { SSC_SSP_TEAMGAMES_NOTE } from "./teamgames";
import { SSC_SSP_RACKET_NOTE } from "./racket";
import { SSC_SSP_ATHLETICS_NOTE } from "./athletics";

export { SSC_SPORTS_AND_GAMES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-static-gk/sports-and-games/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ssp-` here and `sscssp-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/sports-and-games.ts). Order matches `subtopicOrder`.
 */
export const SSC_SPORTS_AND_GAMES_NOTES: Record<string, SubtopicNote> = {
  "ssc-ssp-olympics": SSC_SSP_OLYMPICS_NOTE,
  "ssc-ssp-india": SSC_SSP_INDIA_NOTE,
  "ssc-ssp-bodies": SSC_SSP_BODIES_NOTE,
  "ssc-ssp-cricket": SSC_SSP_CRICKET_NOTE,
  "ssc-ssp-teamgames": SSC_SSP_TEAMGAMES_NOTE,
  "ssc-ssp-racket": SSC_SSP_RACKET_NOTE,
  "ssc-ssp-athletics": SSC_SSP_ATHLETICS_NOTE,
};

export const SSC_SPORTS_AND_GAMES_SLUGS = Object.keys(SSC_SPORTS_AND_GAMES_NOTES);
