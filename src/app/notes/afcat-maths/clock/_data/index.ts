import type { SubtopicNote } from "@/app/notes/_types";
import { AF_CL_SPEEDS_NOTE } from "./speeds";
import { AF_CL_ANGLE_NOTE } from "./angle";
import { AF_CL_GIVEN_NOTE } from "./given";
import { AF_CL_MIRROR_NOTE } from "./mirror";
import { AF_CL_FAULTY_NOTE } from "./faulty";

export { AF_CL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/clock/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-cl-` here and `afcl-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afcl-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_CL_NOTES: Record<string, SubtopicNote> = {
  "af-cl-speeds": AF_CL_SPEEDS_NOTE,
  "af-cl-angle": AF_CL_ANGLE_NOTE,
  "af-cl-given": AF_CL_GIVEN_NOTE,
  "af-cl-mirror": AF_CL_MIRROR_NOTE,
  "af-cl-faulty": AF_CL_FAULTY_NOTE,
};

export const AF_CL_SLUGS = Object.keys(AF_CL_NOTES);
