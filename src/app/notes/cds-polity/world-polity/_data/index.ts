import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PO_WO_DEMOCRACY_NOTE } from "./democracy";
import { CDS_PO_WO_THINKERS_NOTE } from "./thinkers";
import { CDS_PO_WO_UN_NOTE } from "./un";
import { CDS_PO_WO_RIGHTS_NOTE } from "./rights";
import { CDS_PO_WO_REGIONAL_NOTE } from "./regional";

export { CDS_PO_WORLD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-polity/world-polity/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdspol-wo-` here and `cdspolwo-` on concept slugs.
 *
 * 5 pages cut by reading every solution (scripts/cds-gs/reshape/world-polity.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PO_WORLD_NOTES: Record<string, SubtopicNote> = {
  "cdspol-wo-democracy": CDS_PO_WO_DEMOCRACY_NOTE,
  "cdspol-wo-thinkers": CDS_PO_WO_THINKERS_NOTE,
  "cdspol-wo-un": CDS_PO_WO_UN_NOTE,
  "cdspol-wo-rights": CDS_PO_WO_RIGHTS_NOTE,
  "cdspol-wo-regional": CDS_PO_WO_REGIONAL_NOTE,
};

export const CDS_PO_WORLD_SLUGS = Object.keys(CDS_PO_WORLD_NOTES);
