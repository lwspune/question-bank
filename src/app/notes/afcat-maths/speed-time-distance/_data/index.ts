import type { SubtopicNote } from "@/app/notes/_types";
import { AF_STD_BASICS_NOTE } from "./basics";
import { AF_STD_AVERAGE_NOTE } from "./average";
import { AF_STD_INVERSE_NOTE } from "./inverse";
import { AF_STD_LATE_NOTE } from "./late";
import { AF_STD_RELATIVE_NOTE } from "./relative";
import { AF_STD_TRAINS_NOTE } from "./trains";
import { AF_STD_BOATS_NOTE } from "./boats";
import { AF_STD_RACES_NOTE } from "./races";
import { AF_STD_CIRCULAR_NOTE } from "./circular";

export { AF_STD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/speed-time-distance/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-std-` here and `afstd-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afstd-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_STD_NOTES: Record<string, SubtopicNote> = {
  "af-std-basics": AF_STD_BASICS_NOTE,
  "af-std-average": AF_STD_AVERAGE_NOTE,
  "af-std-inverse": AF_STD_INVERSE_NOTE,
  "af-std-late": AF_STD_LATE_NOTE,
  "af-std-relative": AF_STD_RELATIVE_NOTE,
  "af-std-trains": AF_STD_TRAINS_NOTE,
  "af-std-boats": AF_STD_BOATS_NOTE,
  "af-std-races": AF_STD_RACES_NOTE,
  "af-std-circular": AF_STD_CIRCULAR_NOTE,
};

export const AF_STD_SLUGS = Object.keys(AF_STD_NOTES);
