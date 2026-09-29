import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_CI_CHORDS_NOTE } from "./chords";
import { CDS_CI_ANGLES_NOTE } from "./angles";
import { CDS_CI_CIRCUM_NOTE } from "./circumcircle";
import { CDS_CI_TANGENTS_NOTE } from "./tangents";
import { CDS_CI_POWER_NOTE } from "./power";
import { CDS_CI_COMMON_NOTE } from "./common";
import { CDS_CI_TOUCHING_NOTE } from "./touching";

export { CDS_CIRCLES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/circles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-ci-` here and `cdsci-` on concept slugs.
 *
 * The seven pages were cut by reading all 69 solutions (scripts/cds-maths/reshape/circles.ts):
 * "Tangents and Secants" split into tangents and power of a point, and "Two Circles" into common tangents and touching circles.
 * Order matches `subtopicOrder`.
 */
export const CDS_CIRCLES_NOTES: Record<string, SubtopicNote> = {
  "cds-ci-chords": CDS_CI_CHORDS_NOTE,
  "cds-ci-angles": CDS_CI_ANGLES_NOTE,
  "cds-ci-circumcircle": CDS_CI_CIRCUM_NOTE,
  "cds-ci-tangents": CDS_CI_TANGENTS_NOTE,
  "cds-ci-power": CDS_CI_POWER_NOTE,
  "cds-ci-common": CDS_CI_COMMON_NOTE,
  "cds-ci-touching": CDS_CI_TOUCHING_NOTE,
};

export const CDS_CIRCLES_SLUGS = Object.keys(CDS_CIRCLES_NOTES);
