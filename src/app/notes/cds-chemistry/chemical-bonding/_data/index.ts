import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_CH_BO_BONDS_NOTE } from "./bonds";
import { CDS_CH_BO_STRUCTURE_NOTE } from "./structure";
import { CDS_CH_BO_OXIDATION_NOTE } from "./oxidation";

export { CDS_CH_BONDING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-chemistry/chemical-bonding/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsch-bo-` here and `cdschbo-` on concept slugs.
 *
 * Three pages, one per classification subtopic: the split already matched the teaching order,
 * so this chapter was not re-cut. Order matches `subtopicOrder`.
 */
export const CDS_CH_BONDING_NOTES: Record<string, SubtopicNote> = {
  "cdsch-bo-bonds": CDS_CH_BO_BONDS_NOTE,
  "cdsch-bo-structure": CDS_CH_BO_STRUCTURE_NOTE,
  "cdsch-bo-oxidation": CDS_CH_BO_OXIDATION_NOTE,
};

export const CDS_CH_BONDING_SLUGS = Object.keys(CDS_CH_BONDING_NOTES);
