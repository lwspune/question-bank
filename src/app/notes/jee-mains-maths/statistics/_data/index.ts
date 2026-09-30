import type { SubtopicNote } from "@/app/notes/_types";
import { SUMS_STAT_NOTE } from "./sums";
import { UNKNOWNS_STAT_NOTE } from "./unknowns";
import { CHANGES_STAT_NOTE } from "./changes";
import { DEVIATION_STAT_NOTE } from "./deviation";
import { FREQUENCY_STAT_NOTE } from "./frequency";

export { JEE_STATISTICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/statistics/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-stat-` here and `jstat-` on
 * concept slugs.
 */
export const JEE_STATISTICS_NOTES: Record<string, SubtopicNote> = {
  "jee-stat-sums": SUMS_STAT_NOTE,
  "jee-stat-unknowns": UNKNOWNS_STAT_NOTE,
  "jee-stat-changes": CHANGES_STAT_NOTE,
  "jee-stat-deviation": DEVIATION_STAT_NOTE,
  "jee-stat-frequency": FREQUENCY_STAT_NOTE,
};

export const JEE_STATISTICS_SLUGS = Object.keys(JEE_STATISTICS_NOTES);
