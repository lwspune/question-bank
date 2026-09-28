import type { SubtopicNote } from "@/app/notes/_types";
import { NEWTON_LAW_NOTE } from "./cetp-gr-newton-law";
import { VARIATION_OF_G_NOTE } from "./cetp-gr-variation-of-g";
import { ENERGY_ESCAPE_NOTE } from "./cetp-gr-energy-escape";
import { SATELLITES_NOTE } from "./cetp-gr-satellites";

export { MHTCET_GRAV_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/gravitation/[subtopicSlug].
 * `cetp-gr-` prefix: concept-tag keys are global.
 */
export const MHTCET_GRAV_NOTES: Record<string, SubtopicNote> = {
  "cetp-gr-newton-law": NEWTON_LAW_NOTE,
  "cetp-gr-variation-of-g": VARIATION_OF_G_NOTE,
  "cetp-gr-energy-escape": ENERGY_ESCAPE_NOTE,
  "cetp-gr-satellites": SATELLITES_NOTE,
};

export const MHTCET_GRAV_SLUGS = Object.keys(MHTCET_GRAV_NOTES);
