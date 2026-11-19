import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_LI_PLANE_NOTE } from "./plane";
import { HB9_LI_SPHERICAL_NOTE } from "./spherical";
import { HB9_LI_CONCAVE_NOTE } from "./concave";
import { HB9_LI_REFRACTION_NOTE } from "./refraction";

export { HB9_LIGHT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-physics/light/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-li-` here and `hb9li-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/light.ts). Order matches `subtopicOrder`.
 */
export const HB9_LIGHT_NOTES: Record<string, SubtopicNote> = {
  "hb9-li-plane": HB9_LI_PLANE_NOTE,
  "hb9-li-spherical": HB9_LI_SPHERICAL_NOTE,
  "hb9-li-concave": HB9_LI_CONCAVE_NOTE,
  "hb9-li-refraction": HB9_LI_REFRACTION_NOTE,
};

export const HB9_LIGHT_SLUGS = Object.keys(HB9_LIGHT_NOTES);
