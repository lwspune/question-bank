import type { SubtopicNote } from "@/app/notes/_types";
import { G13_PB_NOTE } from "./g13";
import { BORON_PB_NOTE } from "./boron";
import { G14_PB_NOTE } from "./g14";
import { G15_PB_NOTE } from "./g15";
import { NITROGEN_PB_NOTE } from "./nitrogen";
import { PHOSPHORUS_PB_NOTE } from "./phosphorus";
import { G16_PB_NOTE } from "./g16";
import { G17_PB_NOTE } from "./g17";

export { JEE_CH_PB_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/p-block-elements/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-pb-` here and `jcpb-` on
 * concept slugs.
 */
export const JEE_CH_PB_NOTES: Record<string, SubtopicNote> = {
  "jch-pb-g13": G13_PB_NOTE,
  "jch-pb-boron": BORON_PB_NOTE,
  "jch-pb-g14": G14_PB_NOTE,
  "jch-pb-g15": G15_PB_NOTE,
  "jch-pb-nitrogen": NITROGEN_PB_NOTE,
  "jch-pb-phosphorus": PHOSPHORUS_PB_NOTE,
  "jch-pb-g16": G16_PB_NOTE,
  "jch-pb-g17": G17_PB_NOTE,
};

export const JEE_CH_PB_SLUGS = Object.keys(JEE_CH_PB_NOTES);
