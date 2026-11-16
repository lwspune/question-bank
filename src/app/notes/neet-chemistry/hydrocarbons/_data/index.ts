import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_HC_ALKANES_NOTE } from "./alkanes";
import { NEET_CH_HC_ALKENES_NOTE } from "./alkenes";
import { NEET_CH_HC_AROMATIC_NOTE } from "./aromatic";

export { NEET_CH_HC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/hydrocarbons/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-hc-` here and `nchhc-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_HC_NOTES: Record<string, SubtopicNote> = {
  "nch-hc-alkanes": NEET_CH_HC_ALKANES_NOTE,
  "nch-hc-alkenes": NEET_CH_HC_ALKENES_NOTE,
  "nch-hc-aromatic": NEET_CH_HC_AROMATIC_NOTE,
};

export const NEET_CH_HC_SLUGS = Object.keys(NEET_CH_HC_NOTES);
