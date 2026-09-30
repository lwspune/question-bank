import type { SubtopicNote } from "@/app/notes/_types";
import { ADDITIONS_ORM_NOTE } from "./additions";
import { CARBONYL_ORM_NOTE } from "./carbonyl";
import { ROADMAPS_ORM_NOTE } from "./roadmaps";
import { NAMED_ORM_NOTE } from "./named";
import { TESTS_ORM_NOTE } from "./tests";

export { JEE_CH_ORM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/organic-reaction-mechanisms/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-orm-` here and `jcorm-` on
 * concept slugs.
 */
export const JEE_CH_ORM_NOTES: Record<string, SubtopicNote> = {
  "jch-orm-additions": ADDITIONS_ORM_NOTE,
  "jch-orm-carbonyl": CARBONYL_ORM_NOTE,
  "jch-orm-roadmaps": ROADMAPS_ORM_NOTE,
  "jch-orm-named": NAMED_ORM_NOTE,
  "jch-orm-tests": TESTS_ORM_NOTE,
};

export const JEE_CH_ORM_SLUGS = Object.keys(JEE_CH_ORM_NOTES);
