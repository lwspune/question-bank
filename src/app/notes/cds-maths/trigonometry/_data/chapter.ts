import type { ChapterNote } from "@/app/notes/_types";

export const CDS_TRIGONOMETRY_CHAPTER: ChapterNote = {
  chapterName: "Trigonometric Ratios and Identities",
  title: "Trigonometry — CDS Elementary Mathematics",
  intro:
    "Trigonometric Ratios and Identities is the largest chapter in CDS Elementary Mathematics: 227 past-year " +
    "questions across all twenty-one sittings from 2016 (II) to 2026 (II), close to eleven of every hundred. " +
    "It is also one of the cheapest, because four-fifths of it is MODERATE or EASY and almost all of it runs on " +
    "three Pythagorean identities used in different disguises. " +
    "The pages follow a teaching arc rather than the filter list: values and right triangles first, then the " +
    "identities, then the two recognitions CDS sets every year — the sec ± tan reciprocal pair and squaring a " +
    "given sum — and finally equations, bounds and elimination, where the HARD questions sit.",
  cardBlurb:
    "Standard values, right-triangle ratios, complementary angles, the Pythagorean identities, the sec ± tan reciprocal pair, squaring a given sum, equations, maxima and minima, and eliminating θ.",
  subtopicOrder: [
    "cds-tr-values",
    "cds-tr-right-triangle",
    "cds-tr-complementary",
    "cds-tr-identities",
    "cds-tr-reciprocal-pairs",
    "cds-tr-given-sums",
    "cds-tr-equations",
    "cds-tr-compound",
    "cds-tr-max-min",
    "cds-tr-elimination",
  ],
};
