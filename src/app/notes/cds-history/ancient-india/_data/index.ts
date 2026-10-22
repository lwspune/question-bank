import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_HI_AN_STONE_NOTE } from "./stone";
import { CDS_HI_AN_INDUS_NOTE } from "./indus";
import { CDS_HI_AN_VEDIC_NOTE } from "./vedic";
import { CDS_HI_AN_RELIGIONS_NOTE } from "./religions";
import { CDS_HI_AN_MAURYAS_NOTE } from "./mauryas";
import { CDS_HI_AN_GUPTAS_NOTE } from "./guptas";
import { CDS_HI_AN_SANGAM_NOTE } from "./sangam";
import { CDS_HI_AN_TEXTS_NOTE } from "./texts";
import { CDS_HI_AN_ART_NOTE } from "./art";
import { CDS_HI_AN_SOCIETY_NOTE } from "./society";

export { CDS_HI_ANCIENT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-history/ancient-india/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdshi-an-` here and `cdshian-` on concept slugs.
 *
 * 10 pages cut by reading every solution (scripts/cds-gs/reshape/ancient-india.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_HI_ANCIENT_NOTES: Record<string, SubtopicNote> = {
  "cdshi-an-stone": CDS_HI_AN_STONE_NOTE,
  "cdshi-an-indus": CDS_HI_AN_INDUS_NOTE,
  "cdshi-an-vedic": CDS_HI_AN_VEDIC_NOTE,
  "cdshi-an-religions": CDS_HI_AN_RELIGIONS_NOTE,
  "cdshi-an-mauryas": CDS_HI_AN_MAURYAS_NOTE,
  "cdshi-an-guptas": CDS_HI_AN_GUPTAS_NOTE,
  "cdshi-an-sangam": CDS_HI_AN_SANGAM_NOTE,
  "cdshi-an-texts": CDS_HI_AN_TEXTS_NOTE,
  "cdshi-an-art": CDS_HI_AN_ART_NOTE,
  "cdshi-an-society": CDS_HI_AN_SOCIETY_NOTE,
};

export const CDS_HI_ANCIENT_SLUGS = Object.keys(CDS_HI_ANCIENT_NOTES);
