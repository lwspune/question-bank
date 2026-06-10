import type { SubtopicNote } from "@/app/notes/_types";
import { GASES_NOTE } from "./gases";
import { FERTILIZERS_NOTE } from "./fertilizers";
import { CEMENT_GLASS_NOTE } from "./cement-glass";
import { PAINTS_NOTE } from "./paints";
import { ALLOYS_NOTE } from "./alloys";

export { INDUSTRIAL_CHEMISTRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-chemistry/industrial-chemistry/[subtopicSlug].
 * Keys are GLOBALLY-unique (`ind-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const INDUSTRIAL_CHEMISTRY_NOTES: Record<string, SubtopicNote> = {
  "ind-gases": GASES_NOTE,
  "ind-fertilizers": FERTILIZERS_NOTE,
  "ind-cement-glass": CEMENT_GLASS_NOTE,
  "ind-paints": PAINTS_NOTE,
  "ind-alloys": ALLOYS_NOTE,
};

export const INDUSTRIAL_CHEMISTRY_SLUGS = Object.keys(INDUSTRIAL_CHEMISTRY_NOTES);
