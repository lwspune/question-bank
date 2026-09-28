import type { SubtopicNote } from "@/app/notes/_types";
import { NEWTON_NOTE } from "./cetp-lm-newton";
import { MOMENTUM_NOTE } from "./cetp-lm-momentum";
import { EQUILIBRIUM_NOTE } from "./cetp-lm-equilibrium";

export { MHTCET_LAWS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/laws-of-motion/[subtopicSlug].
 * `cetp-lm-` prefix: concept-tag keys are global.
 */
export const MHTCET_LAWS_NOTES: Record<string, SubtopicNote> = {
  "cetp-lm-newton": NEWTON_NOTE,
  "cetp-lm-momentum": MOMENTUM_NOTE,
  "cetp-lm-equilibrium": EQUILIBRIUM_NOTE,
};

export const MHTCET_LAWS_SLUGS = Object.keys(MHTCET_LAWS_NOTES);
