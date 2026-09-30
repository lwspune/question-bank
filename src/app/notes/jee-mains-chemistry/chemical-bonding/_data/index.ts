import type { SubtopicNote } from "@/app/notes/_types";
import { LEWIS_BOND_NOTE } from "./lewis";
import { IONIC_BOND_NOTE } from "./ionic";
import { PARAMS_BOND_NOTE } from "./params";
import { VSEPR_BOND_NOTE } from "./vsepr";
import { SHAPES_BOND_NOTE } from "./shapes";
import { HYBRID_BOND_NOTE } from "./hybrid";
import { MOT_BOND_NOTE } from "./mot";
import { DIPOLE_BOND_NOTE } from "./dipole";

export { JEE_CH_BOND_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/chemical-bonding/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-bond-` here and `jcbond-` on
 * concept slugs.
 */
export const JEE_CH_BOND_NOTES: Record<string, SubtopicNote> = {
  "jch-bond-lewis": LEWIS_BOND_NOTE,
  "jch-bond-ionic": IONIC_BOND_NOTE,
  "jch-bond-params": PARAMS_BOND_NOTE,
  "jch-bond-vsepr": VSEPR_BOND_NOTE,
  "jch-bond-shapes": SHAPES_BOND_NOTE,
  "jch-bond-hybrid": HYBRID_BOND_NOTE,
  "jch-bond-mot": MOT_BOND_NOTE,
  "jch-bond-dipole": DIPOLE_BOND_NOTE,
};

export const JEE_CH_BOND_SLUGS = Object.keys(JEE_CH_BOND_NOTES);
