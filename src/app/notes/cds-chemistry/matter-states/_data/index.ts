import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_CH_MS_STATES_NOTE } from "./states";
import { CDS_CH_MS_MIXTURES_NOTE } from "./mixtures";
import { CDS_CH_MS_SEPARATION_NOTE } from "./separation";
import { CDS_CH_MS_COLLOIDS_NOTE } from "./colloids";

export { CDS_CH_MATTER_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-chemistry/matter-states/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsch-ms-` here and `cdschms-` on concept slugs.
 *
 * Four pages, one per classification subtopic: the split already matched the teaching order,
 * so this chapter was not re-cut. Order matches `subtopicOrder`.
 */
export const CDS_CH_MATTER_NOTES: Record<string, SubtopicNote> = {
  "cdsch-ms-states": CDS_CH_MS_STATES_NOTE,
  "cdsch-ms-mixtures": CDS_CH_MS_MIXTURES_NOTE,
  "cdsch-ms-separation": CDS_CH_MS_SEPARATION_NOTE,
  "cdsch-ms-colloids": CDS_CH_MS_COLLOIDS_NOTE,
};

export const CDS_CH_MATTER_SLUGS = Object.keys(CDS_CH_MATTER_NOTES);
