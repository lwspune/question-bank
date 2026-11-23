import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_MG_CHARGE_NOTE } from "./charge";
import { HSC_PH_MG_CYCLOTRON_NOTE } from "./cyclotron";
import { HSC_PH_MG_WIRE_NOTE } from "./wire";
import { HSC_PH_MG_TORQUE_NOTE } from "./torque";
import { HSC_PH_MG_DIPOLE_NOTE } from "./dipole";
import { HSC_PH_MG_FIELD_NOTE } from "./field";
import { HSC_PH_MG_PARALLEL_NOTE } from "./parallel";
import { HSC_PH_MG_AMPERE_NOTE } from "./ampere";

export { HSC_PH_MG_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/magnetic-fields-due-to-electric-current/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-mg-` here and `hscpmg-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_MG_NOTES: Record<string, SubtopicNote> = {
  "hscp-mg-charge": HSC_PH_MG_CHARGE_NOTE,
  "hscp-mg-cyclotron": HSC_PH_MG_CYCLOTRON_NOTE,
  "hscp-mg-wire": HSC_PH_MG_WIRE_NOTE,
  "hscp-mg-torque": HSC_PH_MG_TORQUE_NOTE,
  "hscp-mg-dipole": HSC_PH_MG_DIPOLE_NOTE,
  "hscp-mg-field": HSC_PH_MG_FIELD_NOTE,
  "hscp-mg-parallel": HSC_PH_MG_PARALLEL_NOTE,
  "hscp-mg-ampere": HSC_PH_MG_AMPERE_NOTE,
};

export const HSC_PH_MG_SLUGS = Object.keys(HSC_PH_MG_NOTES);
