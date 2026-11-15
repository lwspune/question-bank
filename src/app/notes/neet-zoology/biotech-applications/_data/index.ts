import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_BA_AGRICULTURE_NOTE } from "./agriculture";
import { NEET_ZO_BA_MEDICINE_NOTE } from "./medicine";
import { NEET_ZO_BA_TRANSGENIC_NOTE } from "./transgenic";

export { NEET_ZO_BA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/biotech-applications/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-ba-` here and `nzoba-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_BA_NOTES: Record<string, SubtopicNote> = {
  "nzo-ba-agriculture": NEET_ZO_BA_AGRICULTURE_NOTE,
  "nzo-ba-medicine": NEET_ZO_BA_MEDICINE_NOTE,
  "nzo-ba-transgenic": NEET_ZO_BA_TRANSGENIC_NOTE,
};

export const NEET_ZO_BA_SLUGS = Object.keys(NEET_ZO_BA_NOTES);
