import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_HI_ME_KINGDOMS_NOTE } from "./kingdoms";
import { CDS_HI_ME_SULTANATE_NOTE } from "./sultanate";
import { CDS_HI_ME_VIJAYANAGARA_NOTE } from "./vijayanagara";
import { CDS_HI_ME_MUGHALS_NOTE } from "./mughals";
import { CDS_HI_ME_BHAKTI_NOTE } from "./bhakti";
import { CDS_HI_ME_SUFIS_NOTE } from "./sufis";
import { CDS_HI_ME_ECONOMY_NOTE } from "./economy";
import { CDS_HI_ME_ART_NOTE } from "./art";

export { CDS_HI_MEDIEVAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-history/medieval-india/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdshi-me-` here and `cdshime-` on concept slugs.
 *
 * 8 pages cut by reading every solution (scripts/cds-gs/reshape/medieval-india.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_HI_MEDIEVAL_NOTES: Record<string, SubtopicNote> = {
  "cdshi-me-kingdoms": CDS_HI_ME_KINGDOMS_NOTE,
  "cdshi-me-sultanate": CDS_HI_ME_SULTANATE_NOTE,
  "cdshi-me-vijayanagara": CDS_HI_ME_VIJAYANAGARA_NOTE,
  "cdshi-me-mughals": CDS_HI_ME_MUGHALS_NOTE,
  "cdshi-me-bhakti": CDS_HI_ME_BHAKTI_NOTE,
  "cdshi-me-sufis": CDS_HI_ME_SUFIS_NOTE,
  "cdshi-me-economy": CDS_HI_ME_ECONOMY_NOTE,
  "cdshi-me-art": CDS_HI_ME_ART_NOTE,
};

export const CDS_HI_MEDIEVAL_SLUGS = Object.keys(CDS_HI_MEDIEVAL_NOTES);
