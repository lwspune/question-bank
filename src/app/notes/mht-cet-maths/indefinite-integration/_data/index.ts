import type { SubtopicNote } from "@/app/notes/_types";
import { FOUNDATIONS_NOTE } from "./foundations";
import { SUBSTITUTION_NOTE } from "./substitution";
import { TRIG_POWERS_NOTE } from "./trig-powers";
import { TRIG_RATIONAL_NOTE } from "./trig-rational";
import { PARTIAL_FRACTIONS_NOTE } from "./partial-fractions";
import { BY_PARTS_NOTE } from "./by-parts";

export { INDEFINITE_INTEGRATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-maths/indefinite-integration/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 */
export const INDEFINITE_INTEGRATION_NOTES: Record<string, SubtopicNote> = {
  "fundamentals": FOUNDATIONS_NOTE,
  "substitution": SUBSTITUTION_NOTE,
  "trigonometric-integrals-powers": TRIG_POWERS_NOTE,
  "trigonometric-integrals-rational": TRIG_RATIONAL_NOTE,
  "rational-and-partial-fractions": PARTIAL_FRACTIONS_NOTE,
  "integration-by-parts": BY_PARTS_NOTE,
};

export const INDEFINITE_INTEGRATION_SLUGS = Object.keys(
  INDEFINITE_INTEGRATION_NOTES
);
