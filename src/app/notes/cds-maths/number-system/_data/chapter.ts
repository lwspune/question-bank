import type { ChapterNote } from "@/app/notes/_types";

export const CDS_NUMBER_SYSTEM_CHAPTER: ChapterNote = {
  chapterName: "Number System",
  title: "Number System — CDS Elementary Mathematics",
  intro:
    "Number System is the single biggest chapter in CDS Elementary Mathematics: 223 past-year " +
    "questions across all twenty-one sittings from 2016 (II) to 2026 (II), which is roughly eleven of " +
    "the hundred questions on every paper. Nothing else in the syllabus pays that well. " +
    "The paper gives you 100 questions in 120 minutes at plus one and minus one-third, so the " +
    "job here is not depth but SPEED with certainty — almost every question below is a " +
    "thirty-second question once you recognise the shape, and a three-minute question if you " +
    "do not. " +
    "The notes are sequenced as a teaching arc, not as a filter list: the primitives first " +
    "(division, parity, consecutive integers), then how a number is WRITTEN (place value, " +
    "divisibility rules, unit digits), then how it is BUILT (primes, divisors, HCF and LCM), " +
    "then the hard end where remainders and factorisation live. Difficulty follows that order " +
    "on its own — the two densest HARD units in the chapter sit at positions nine and ten. " +
    "Work them in order.",
  subtopicOrder: [
    "cds-ns-foundations",
    "cds-ns-place-value",
    "cds-ns-divisibility-rules",
    "cds-ns-unit-digit",
    "cds-ns-primes",
    "cds-ns-factors-divisors",
    "cds-ns-hcf-lcm-laws",
    "cds-ns-hcf-lcm-applications",
    "cds-ns-congruences",
    "cds-ns-factorisation",
    "cds-ns-squares-cubes",
    "cds-ns-rational-irrational",
  ],
};
