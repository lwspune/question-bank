import type { SubtopicNote } from "@/app/notes/_types";
import { PHOTOELECTRIC_NOTE } from "./cetp-dn-photoelectric";
import { DE_BROGLIE_NOTE } from "./cetp-dn-de-broglie";

export { MHTCET_DUAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/dual-nature-of-radiation-and-matter/[subtopicSlug].
 * `cetp-dn-` prefix: concept-tag keys are global.
 */
export const MHTCET_DUAL_NOTES: Record<string, SubtopicNote> = {
  "cetp-dn-photoelectric": PHOTOELECTRIC_NOTE,
  "cetp-dn-de-broglie": DE_BROGLIE_NOTE,
};

export const MHTCET_DUAL_SLUGS = Object.keys(MHTCET_DUAL_NOTES);
