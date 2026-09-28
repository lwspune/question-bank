import type { SubtopicNote } from "@/app/notes/_types";
import { MOVING_CHARGE_NOTE } from "./cetp-mag-moving-charge";
import { FORCE_ON_CONDUCTOR_NOTE } from "./cetp-mag-force-on-conductor";
import { MOMENT_NOTE } from "./cetp-mag-moment";
import { FIELD_OF_CURRENT_NOTE } from "./cetp-mag-field-of-current";

export { MHTCET_MAGFIELD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/magnetic-fields-due-to-electric-current/[subtopicSlug].
 * `cetp-mag-` prefix: concept-tag keys are global.
 */
export const MHTCET_MAGFIELD_NOTES: Record<string, SubtopicNote> = {
  "cetp-mag-moving-charge": MOVING_CHARGE_NOTE,
  "cetp-mag-force-on-conductor": FORCE_ON_CONDUCTOR_NOTE,
  "cetp-mag-moment": MOMENT_NOTE,
  "cetp-mag-field-of-current": FIELD_OF_CURRENT_NOTE,
};

export const MHTCET_MAGFIELD_SLUGS = Object.keys(MHTCET_MAGFIELD_NOTES);
