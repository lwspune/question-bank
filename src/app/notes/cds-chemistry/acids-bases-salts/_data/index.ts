import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_CH_AB_THEORY_NOTE } from "./theory";
import { CDS_CH_AB_PH_NOTE } from "./ph";
import { CDS_CH_AB_ACIDS_NOTE } from "./acids";
import { CDS_CH_AB_SALTS_NOTE } from "./salts";

export { CDS_CH_ACIDS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-chemistry/acids-bases-salts/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsch-ab-` here and `cdschab-` on concept slugs.
 *
 * Four pages cut by reading all 40 solutions (scripts/cds-gs/reshape/acids-bases-salts.ts);
 * the one-row Water of Crystallization folds into the salts page. Order matches `subtopicOrder`.
 */
export const CDS_CH_ACIDS_NOTES: Record<string, SubtopicNote> = {
  "cdsch-ab-theory": CDS_CH_AB_THEORY_NOTE,
  "cdsch-ab-ph": CDS_CH_AB_PH_NOTE,
  "cdsch-ab-acids": CDS_CH_AB_ACIDS_NOTE,
  "cdsch-ab-salts": CDS_CH_AB_SALTS_NOTE,
};

export const CDS_CH_ACIDS_SLUGS = Object.keys(CDS_CH_ACIDS_NOTES);
