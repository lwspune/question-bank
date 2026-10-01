import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_CH_EV_CHEMICALS_NOTE } from "./chemicals";
import { CDS_CH_EV_MEDICINES_NOTE } from "./medicines";

export { CDS_CH_EVERYDAY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-chemistry/everyday-life/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsch-ev-` here and `cdschev-` on concept slugs.
 *
 * Two pages, one per classification subtopic: the split already matched the teaching order,
 * so this chapter was not re-cut. Order matches `subtopicOrder`.
 */
export const CDS_CH_EVERYDAY_NOTES: Record<string, SubtopicNote> = {
  "cdsch-ev-chemicals": CDS_CH_EV_CHEMICALS_NOTE,
  "cdsch-ev-medicines": CDS_CH_EV_MEDICINES_NOTE,
};

export const CDS_CH_EVERYDAY_SLUGS = Object.keys(CDS_CH_EVERYDAY_NOTES);
