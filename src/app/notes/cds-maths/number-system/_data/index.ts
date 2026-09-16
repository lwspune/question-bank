import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_NS_FOUNDATIONS_NOTE } from "./foundations";
import { CDS_NS_PLACE_VALUE_NOTE } from "./place-value";
import { CDS_NS_DIVISIBILITY_RULES_NOTE } from "./divisibility-rules";
import { CDS_NS_UNIT_DIGIT_NOTE } from "./unit-digit";
import { CDS_NS_PRIMES_NOTE } from "./primes";
import { CDS_NS_FACTORS_DIVISORS_NOTE } from "./factors-divisors";
import { CDS_NS_HCF_LCM_LAWS_NOTE } from "./hcf-lcm-laws";
import { CDS_NS_HCF_LCM_APPLICATIONS_NOTE } from "./hcf-lcm-applications";
import { CDS_NS_CONGRUENCES_NOTE } from "./congruences";
import { CDS_NS_FACTORISATION_NOTE } from "./factorisation";
import { CDS_NS_SQUARES_CUBES_NOTE } from "./squares-cubes";
import { CDS_NS_RATIONAL_IRRATIONAL_NOTE } from "./rational-irrational";

export { CDS_NUMBER_SYSTEM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/number-system/[subtopicSlug].
 *
 * Keys must match the URL slug AND the subtopic_slug used in
 * question_concept_tags, which is GLOBALLY unique across every chapter in
 * NOTES_CHAPTERS — hence the `cds-ns-` prefix on the subtopic slugs and
 * `cdsns-` on concept slugs. Several of this exam's chapter names (Statistics,
 * Circles, Logarithms, Quadratic Equations) also exist as NDA Maths chapters,
 * so an unprefixed slug here would collide with a shipped one.
 *
 * Order matches `subtopicOrder` in chapter.ts, which is the teaching arc:
 * primitives, then how a number is WRITTEN, then how it is BUILT, then the
 * hard end where remainders and factorisation live.
 */
export const CDS_NUMBER_SYSTEM_NOTES: Record<string, SubtopicNote> = {
  "cds-ns-foundations": CDS_NS_FOUNDATIONS_NOTE,
  "cds-ns-place-value": CDS_NS_PLACE_VALUE_NOTE,
  "cds-ns-divisibility-rules": CDS_NS_DIVISIBILITY_RULES_NOTE,
  "cds-ns-unit-digit": CDS_NS_UNIT_DIGIT_NOTE,
  "cds-ns-primes": CDS_NS_PRIMES_NOTE,
  "cds-ns-factors-divisors": CDS_NS_FACTORS_DIVISORS_NOTE,
  "cds-ns-hcf-lcm-laws": CDS_NS_HCF_LCM_LAWS_NOTE,
  "cds-ns-hcf-lcm-applications": CDS_NS_HCF_LCM_APPLICATIONS_NOTE,
  "cds-ns-congruences": CDS_NS_CONGRUENCES_NOTE,
  "cds-ns-factorisation": CDS_NS_FACTORISATION_NOTE,
  "cds-ns-squares-cubes": CDS_NS_SQUARES_CUBES_NOTE,
  "cds-ns-rational-irrational": CDS_NS_RATIONAL_IRRATIONAL_NOTE,
};

export const CDS_NUMBER_SYSTEM_SLUGS = Object.keys(CDS_NUMBER_SYSTEM_NOTES);
