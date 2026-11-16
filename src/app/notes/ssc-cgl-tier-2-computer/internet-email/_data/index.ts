import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_CIE_NET_NOTE } from "./net";

export { SSC2_INTERNET_EMAIL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-computer/internet-email/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-cie-` here and `ssc2cie-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/internet-email.ts). Order matches `subtopicOrder`.
 */
export const SSC2_INTERNET_EMAIL_NOTES: Record<string, SubtopicNote> = {
  "ssc2-cie-net": SSC2_CIE_NET_NOTE,
};

export const SSC2_INTERNET_EMAIL_SLUGS = Object.keys(SSC2_INTERNET_EMAIL_NOTES);
