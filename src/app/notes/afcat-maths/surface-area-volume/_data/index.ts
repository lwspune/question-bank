import type { SubtopicNote } from "@/app/notes/_types";
import { AF_SV_CUBOID_NOTE } from "./cuboid";
import { AF_SV_CYLINDER_NOTE } from "./cylinder";
import { AF_SV_CONE_NOTE } from "./cone";
import { AF_SV_SPHERE_NOTE } from "./sphere";
import { AF_SV_COMBINED_NOTE } from "./combined";
import { AF_SV_RECASTING_NOTE } from "./recasting";

export { AF_SV_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/surface-area-volume/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-sv-` here and `afsv-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afsv-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_SV_NOTES: Record<string, SubtopicNote> = {
  "af-sv-cuboid": AF_SV_CUBOID_NOTE,
  "af-sv-cylinder": AF_SV_CYLINDER_NOTE,
  "af-sv-cone": AF_SV_CONE_NOTE,
  "af-sv-sphere": AF_SV_SPHERE_NOTE,
  "af-sv-combined": AF_SV_COMBINED_NOTE,
  "af-sv-recasting": AF_SV_RECASTING_NOTE,
};

export const AF_SV_SLUGS = Object.keys(AF_SV_NOTES);
