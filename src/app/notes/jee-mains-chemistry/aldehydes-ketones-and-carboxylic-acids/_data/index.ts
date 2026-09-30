import type { SubtopicNote } from "@/app/notes/_types";
import { PREP_ALD_NOTE } from "./prep";
import { NUCLEO_ALD_NOTE } from "./nucleo";
import { GRIGNARD_ALD_NOTE } from "./grignard";
import { REDUCE_ALD_NOTE } from "./reduce";
import { TESTS_ALD_NOTE } from "./tests";
import { ALDOL_ALD_NOTE } from "./aldol";
import { CROSSED_ALD_NOTE } from "./crossed";
import { ACIDS_ALD_NOTE } from "./acids";

export { JEE_CH_ALD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/aldehydes-ketones-and-carboxylic-acids/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-ald-` here and `jcald-` on
 * concept slugs.
 */
export const JEE_CH_ALD_NOTES: Record<string, SubtopicNote> = {
  "jch-ald-prep": PREP_ALD_NOTE,
  "jch-ald-nucleo": NUCLEO_ALD_NOTE,
  "jch-ald-grignard": GRIGNARD_ALD_NOTE,
  "jch-ald-reduce": REDUCE_ALD_NOTE,
  "jch-ald-tests": TESTS_ALD_NOTE,
  "jch-ald-aldol": ALDOL_ALD_NOTE,
  "jch-ald-crossed": CROSSED_ALD_NOTE,
  "jch-ald-acids": ACIDS_ALD_NOTE,
};

export const JEE_CH_ALD_SLUGS = Object.keys(JEE_CH_ALD_NOTES);
