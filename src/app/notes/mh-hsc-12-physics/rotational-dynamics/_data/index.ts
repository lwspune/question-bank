import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_RD_KINEMATICS_NOTE } from "./kinematics";
import { HSC_PH_RD_APPLICATIONS_NOTE } from "./applications";
import { HSC_PH_RD_VERTICAL_NOTE } from "./vertical";
import { HSC_PH_RD_MOI_NOTE } from "./moi";
import { HSC_PH_RD_AXES_NOTE } from "./axes";
import { HSC_PH_RD_TORQUE_NOTE } from "./torque";
import { HSC_PH_RD_CONSERVATION_NOTE } from "./conservation";
import { HSC_PH_RD_ROLLING_NOTE } from "./rolling";

export { HSC_PH_RD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/rotational-dynamics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-rd-` here and `hscprd-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_RD_NOTES: Record<string, SubtopicNote> = {
  "hscp-rd-kinematics": HSC_PH_RD_KINEMATICS_NOTE,
  "hscp-rd-applications": HSC_PH_RD_APPLICATIONS_NOTE,
  "hscp-rd-vertical": HSC_PH_RD_VERTICAL_NOTE,
  "hscp-rd-moi": HSC_PH_RD_MOI_NOTE,
  "hscp-rd-axes": HSC_PH_RD_AXES_NOTE,
  "hscp-rd-torque": HSC_PH_RD_TORQUE_NOTE,
  "hscp-rd-conservation": HSC_PH_RD_CONSERVATION_NOTE,
  "hscp-rd-rolling": HSC_PH_RD_ROLLING_NOTE,
};

export const HSC_PH_RD_SLUGS = Object.keys(HSC_PH_RD_NOTES);
