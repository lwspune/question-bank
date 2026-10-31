import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_HME_KINGDOMS_NOTE } from "./kingdoms";
import { SSC_HME_SULTANATE_NOTE } from "./sultanate";
import { SSC_HME_VIJAYANAGARA_NOTE } from "./vijayanagara";
import { SSC_HME_MUGHALS_NOTE } from "./mughals";
import { SSC_HME_LITERATURE_NOTE } from "./literature";
import { SSC_HME_ARCHITECTURE_NOTE } from "./architecture";

export { SSC_MEDIEVAL_INDIA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-history/medieval-india/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-hme-` here and `sschme-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/medieval-india.ts). Order matches `subtopicOrder`.
 */
export const SSC_MEDIEVAL_INDIA_NOTES: Record<string, SubtopicNote> = {
  "ssc-hme-kingdoms": SSC_HME_KINGDOMS_NOTE,
  "ssc-hme-sultanate": SSC_HME_SULTANATE_NOTE,
  "ssc-hme-vijayanagara": SSC_HME_VIJAYANAGARA_NOTE,
  "ssc-hme-mughals": SSC_HME_MUGHALS_NOTE,
  "ssc-hme-literature": SSC_HME_LITERATURE_NOTE,
  "ssc-hme-architecture": SSC_HME_ARCHITECTURE_NOTE,
};

export const SSC_MEDIEVAL_INDIA_SLUGS = Object.keys(SSC_MEDIEVAL_INDIA_NOTES);
