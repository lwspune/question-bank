import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_SFD_FAITH_NOTE } from "./faith";
import { SSC_SFD_NORTH_NOTE } from "./north";
import { SSC_SFD_SOUTHWEST_NOTE } from "./southwest";
import { SSC_SFD_EASTCENTRAL_NOTE } from "./eastcentral";
import { SSC_SFD_NORTHEAST_NOTE } from "./northeast";
import { SSC_SFD_CULTURAL_NOTE } from "./cultural";

export { SSC_FESTIVALS_AND_DAYS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-static-gk/festivals-and-days/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-sfd-` here and `sscsfd-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/festivals-and-days.ts). Order matches `subtopicOrder`.
 */
export const SSC_FESTIVALS_AND_DAYS_NOTES: Record<string, SubtopicNote> = {
  "ssc-sfd-faith": SSC_SFD_FAITH_NOTE,
  "ssc-sfd-north": SSC_SFD_NORTH_NOTE,
  "ssc-sfd-southwest": SSC_SFD_SOUTHWEST_NOTE,
  "ssc-sfd-eastcentral": SSC_SFD_EASTCENTRAL_NOTE,
  "ssc-sfd-northeast": SSC_SFD_NORTHEAST_NOTE,
  "ssc-sfd-cultural": SSC_SFD_CULTURAL_NOTE,
};

export const SSC_FESTIVALS_AND_DAYS_SLUGS = Object.keys(SSC_FESTIVALS_AND_DAYS_NOTES);
