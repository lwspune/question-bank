import type { SubtopicNote } from "@/app/notes/_types";
import { CURRENT_CE_NOTE } from "./current";
import { RESISTANCE_CE_NOTE } from "./resistance";
import { NETWORKS_CE_NOTE } from "./networks";
import { KIRCHHOFF_CE_NOTE } from "./kirchhoff";
import { CELLS_CE_NOTE } from "./cells";
import { INSTRUMENTS_CE_NOTE } from "./instruments";
import { POWER_CE_NOTE } from "./power";
import { RC_LR_CE_NOTE } from "./rc-lr";

export { JEE_PH_CE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/current-electricity/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-ce-` here and `jpce-` on
 * concept slugs.
 */
export const JEE_PH_CE_NOTES: Record<string, SubtopicNote> = {
  "jph-ce-current": CURRENT_CE_NOTE,
  "jph-ce-resistance": RESISTANCE_CE_NOTE,
  "jph-ce-networks": NETWORKS_CE_NOTE,
  "jph-ce-kirchhoff": KIRCHHOFF_CE_NOTE,
  "jph-ce-cells": CELLS_CE_NOTE,
  "jph-ce-instruments": INSTRUMENTS_CE_NOTE,
  "jph-ce-power": POWER_CE_NOTE,
  "jph-ce-rc-lr": RC_LR_CE_NOTE,
};

export const JEE_PH_CE_SLUGS = Object.keys(JEE_PH_CE_NOTES);
