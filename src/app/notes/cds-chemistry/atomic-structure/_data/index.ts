import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_CH_AT_MODELS_NOTE } from "./models";
import { CDS_CH_AT_PARTICLES_NOTE } from "./particles";
import { CDS_CH_AT_PERIODIC_NOTE } from "./periodic";

export { CDS_CH_ATOMIC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-chemistry/atomic-structure/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsch-at-` here and `cdschat-` on concept slugs.
 *
 * Three pages cut by reading all 26 solutions (scripts/cds-gs/reshape/atomic-structure.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_CH_ATOMIC_NOTES: Record<string, SubtopicNote> = {
  "cdsch-at-models": CDS_CH_AT_MODELS_NOTE,
  "cdsch-at-particles": CDS_CH_AT_PARTICLES_NOTE,
  "cdsch-at-periodic": CDS_CH_AT_PERIODIC_NOTE,
};

export const CDS_CH_ATOMIC_SLUGS = Object.keys(CDS_CH_ATOMIC_NOTES);
