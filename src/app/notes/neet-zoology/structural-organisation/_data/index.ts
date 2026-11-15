import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_SO_TISSUES_NOTE } from "./tissues";
import { NEET_ZO_SO_COCKROACH_NOTE } from "./cockroach";
import { NEET_ZO_SO_FROG_NOTE } from "./frog";

export { NEET_ZO_SO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/structural-organisation/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-so-` here and `nzoso-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_SO_NOTES: Record<string, SubtopicNote> = {
  "nzo-so-tissues": NEET_ZO_SO_TISSUES_NOTE,
  "nzo-so-cockroach": NEET_ZO_SO_COCKROACH_NOTE,
  "nzo-so-frog": NEET_ZO_SO_FROG_NOTE,
};

export const NEET_ZO_SO_SLUGS = Object.keys(NEET_ZO_SO_NOTES);
