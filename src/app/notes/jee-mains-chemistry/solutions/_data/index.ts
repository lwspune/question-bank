import type { SubtopicNote } from "@/app/notes/_types";
import { HENRY_SOL_NOTE } from "./henry";
import { RAOULT_SOL_NOTE } from "./raoult";
import { RLVP_SOL_NOTE } from "./rlvp";
import { BPFP_SOL_NOTE } from "./bpfp";
import { OSMOTIC_SOL_NOTE } from "./osmotic";
import { VANTHOFF_SOL_NOTE } from "./vanthoff";

export { JEE_CH_SOL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/solutions/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-sol-` here and `jcsol-` on
 * concept slugs.
 */
export const JEE_CH_SOL_NOTES: Record<string, SubtopicNote> = {
  "jch-sol-henry": HENRY_SOL_NOTE,
  "jch-sol-raoult": RAOULT_SOL_NOTE,
  "jch-sol-rlvp": RLVP_SOL_NOTE,
  "jch-sol-bpfp": BPFP_SOL_NOTE,
  "jch-sol-osmotic": OSMOTIC_SOL_NOTE,
  "jch-sol-vanthoff": VANTHOFF_SOL_NOTE,
};

export const JEE_CH_SOL_SLUGS = Object.keys(JEE_CH_SOL_NOTES);
