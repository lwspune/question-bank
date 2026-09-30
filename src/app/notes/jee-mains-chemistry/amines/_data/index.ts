import type { SubtopicNote } from "@/app/notes/_types";
import { BASIC_AMINE_NOTE } from "./basic";
import { PREP_AMINE_NOTE } from "./prep";
import { HOFMANN_AMINE_NOTE } from "./hofmann";
import { NREACT_AMINE_NOTE } from "./nreact";
import { TESTS_AMINE_NOTE } from "./tests";
import { EAS_AMINE_NOTE } from "./eas";
import { DIAZO_AMINE_NOTE } from "./diazo";
import { AZO_AMINE_NOTE } from "./azo";

export { JEE_CH_AMINE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/amines/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-amine-` here and `jcamine-` on
 * concept slugs.
 */
export const JEE_CH_AMINE_NOTES: Record<string, SubtopicNote> = {
  "jch-amine-basic": BASIC_AMINE_NOTE,
  "jch-amine-prep": PREP_AMINE_NOTE,
  "jch-amine-hofmann": HOFMANN_AMINE_NOTE,
  "jch-amine-nreact": NREACT_AMINE_NOTE,
  "jch-amine-tests": TESTS_AMINE_NOTE,
  "jch-amine-eas": EAS_AMINE_NOTE,
  "jch-amine-diazo": DIAZO_AMINE_NOTE,
  "jch-amine-azo": AZO_AMINE_NOTE,
};

export const JEE_CH_AMINE_SLUGS = Object.keys(JEE_CH_AMINE_NOTES);
