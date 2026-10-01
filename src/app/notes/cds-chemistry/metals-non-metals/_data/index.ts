import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_CH_MN_PROPERTIES_NOTE } from "./properties";
import { CDS_CH_MN_REACTIVITY_NOTE } from "./reactivity";
import { CDS_CH_MN_EXTRACTION_NOTE } from "./extraction";
import { CDS_CH_MN_CORROSION_NOTE } from "./corrosion";

export { CDS_CH_METALS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-chemistry/metals-non-metals/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsch-mn-` here and `cdschmn-` on concept slugs.
 *
 * Four pages cut by reading all 22 solutions (scripts/cds-gs/reshape/metals-non-metals.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_CH_METALS_NOTES: Record<string, SubtopicNote> = {
  "cdsch-mn-properties": CDS_CH_MN_PROPERTIES_NOTE,
  "cdsch-mn-reactivity": CDS_CH_MN_REACTIVITY_NOTE,
  "cdsch-mn-extraction": CDS_CH_MN_EXTRACTION_NOTE,
  "cdsch-mn-corrosion": CDS_CH_MN_CORROSION_NOTE,
};

export const CDS_CH_METALS_SLUGS = Object.keys(CDS_CH_METALS_NOTES);
