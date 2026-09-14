/**
 * Published NDA & NA cut-off marks, both sittings, 2016-2025 (20 sittings, no
 * gaps), transcribed from the twenty UPSC cut-off PDFs. The extracted source
 * text for each -- with the SHA-256 of the PDF it came from -- lives in
 * `scripts/nda-cutoffs/sources.json`, and `tests/nda-cutoffs.test.ts` asserts
 * that every figure claimed here appears in its own source text.
 *
 * THREE THINGS THIS CORPUS GETS RIGHT that a summary table would not:
 *
 *  1. `subjectMinimumPct` is per-sitting. The "at least 25% in each subject"
 *     rule everyone quotes was 20% in four sittings (2016-II, 2022-II, 2023-II,
 *     2024-I). Hard-coding 25 would make a fifth of the corpus wrong.
 *  2. NDA II 2025 published SEPARATE male and female cut-offs, and decimals.
 *     Hence CutoffMark[] rather than a number -- see types.ts.
 *  3. Eight sittings published no recommendation table (UPSC adopted the
 *     "Recommendation Details" layout for the I-sitting in 2019 and for the
 *     II-sitting in 2021). Those carry null, not 0.
 *
 * The wing tables are deliberately written out per sitting rather than shared
 * from a constant: the figures drift in ways a shared default would erase --
 * Navy's female allocation alone runs 3 -> 12 -> 6 -> 5 across four
 * consecutive sittings, and the Naval Academy was male-only in four of them.
 *
 * Ordered NEWEST FIRST, matching how the rest of the project lists sittings.
 */

import type { NdaCutoffSitting } from "./types";

export type {
  CutoffAudience,
  CutoffMark,
  WingVacancy,
  AirForceShape,
  NdaCutoffSitting,
} from "./types";
export { cutoffFor, writtenCutoffRange } from "./types";

export const NDA_CUTOFFS: NdaCutoffSitting[] = [
  {
    slug: "nda-2025-ii",
    year: 2025,
    sitting: 2,
    // The first sitting in the corpus to publish separate figures per gender,
    // and the first with decimals. The female cut-off is 53.94 marks HIGHER at
    // the written stage and 71.39 higher at final stage -- a much larger
    // applicant field competing for ~15 reserved seats.
    writtenCutoff: [
      { audience: "male", marks: 304.9 },
      { audience: "female", marks: 358.84 },
    ],
    finalCutoff: [
      { audience: "male", marks: 666.01 },
      { audience: "female", marks: 737.4 },
    ],
    subjectMinimumPct: 25,
    recommended: { total: 742, male: 651, female: 91 },
    vacancies: 406,
    wings: [
      { name: "Army", vacancies: 208, female: 10 },
      { name: "Navy", vacancies: 42, female: 5 },
      { name: "Air Force (Flying)", vacancies: 92, female: 2 },
      { name: "Air Force (Ground duties - Tech)", vacancies: 18, female: 2 },
      { name: "Air Force (Ground duties - Non-Tech)", vacancies: 10, female: 2 },
      {
        name: "Naval Academy",
        vacancies: 36,
        female: 4,
        note: "10+2 Cadet Entry Scheme",
      },
    ],
    airForceShape: "split",
    sourceFile: "CutOffMarks-NDA-NA-II-2025-Engl-100426.pdf",
  },
  {
    slug: "nda-2025-i",
    year: 2025,
    sitting: 1,
    writtenCutoff: [{ audience: "all", marks: 334 }],
    finalCutoff: [{ audience: "all", marks: 699 }],
    subjectMinimumPct: 25,
    recommended: { total: 735, male: null, female: null },
    vacancies: 406,
    wings: [
      { name: "Army", vacancies: 208, female: 10 },
      { name: "Navy", vacancies: 42, female: 6 },
      { name: "Air Force (Flying)", vacancies: 92, female: 2 },
      { name: "Air Force (Ground duties - Tech)", vacancies: 18, female: 2 },
      { name: "Air Force (Ground duties - Non Tech)", vacancies: 10, female: 2 },
      { name: "Naval Academy", vacancies: 36, female: 5 },
    ],
    airForceShape: "split",
    sourceFile: "CutOff-NDANA-I-2025-Engl-131025.pdf",
  },
  {
    slug: "nda-2024-ii",
    year: 2024,
    sitting: 2,
    writtenCutoff: [{ audience: "all", marks: 305 }],
    finalCutoff: [{ audience: "all", marks: 673 }],
    subjectMinimumPct: 25,
    recommended: { total: 792, male: null, female: null },
    vacancies: 404,
    wings: [
      { name: "Army", vacancies: 208, female: 10 },
      { name: "Navy", vacancies: 42, female: 6 },
      { name: "Air Force (Flying)", vacancies: 92, female: 2 },
      { name: "Air Force (Ground duties - Tech)", vacancies: 18, female: 2 },
      { name: "Air Force (Ground duties - Non-Tech)", vacancies: 10, female: 2 },
      {
        name: "Naval Academy",
        vacancies: 34,
        female: 5,
        note: "10+2 Cadet Entry Scheme",
      },
    ],
    airForceShape: "split",
    sourceFile: "CutOff-NDA-NA-II-2024-Engl-170425.pdf",
  },
  {
    slug: "nda-2024-i",
    year: 2024,
    sitting: 1,
    writtenCutoff: [{ audience: "all", marks: 291 }],
    finalCutoff: [{ audience: "all", marks: 654 }],
    // 20%, not 25% -- and the lowest written cut-off since 2017-II.
    subjectMinimumPct: 20,
    recommended: { total: 641, male: null, female: null },
    vacancies: 400,
    wings: [
      { name: "Army", vacancies: 208, female: 10 },
      { name: "Navy", vacancies: 42, female: 6 },
      { name: "Air Force (Flying)", vacancies: 92, female: 2 },
      { name: "Air Force (Ground duties - Tech)", vacancies: 18, female: 2 },
      { name: "Air Force (Ground duties - Non Tech)", vacancies: 10, female: 2 },
      { name: "Naval Academy", vacancies: 30, female: 9 },
    ],
    airForceShape: "split",
    sourceFile: "CutOff-NDA-NA-I-2024-Engl-281024.pdf",
  },
  {
    slug: "nda-2023-ii",
    year: 2023,
    sitting: 2,
    writtenCutoff: [{ audience: "all", marks: 292 }],
    finalCutoff: [{ audience: "all", marks: 656 }],
    subjectMinimumPct: 20,
    recommended: { total: 699, male: null, female: null },
    vacancies: 395,
    wings: [
      { name: "Army", vacancies: 208, female: 10 },
      // Navy's female allocation spikes to 12 for this one sitting.
      { name: "Navy", vacancies: 42, female: 12 },
      { name: "Air Force (Flying)", vacancies: 92, female: 2 },
      { name: "Air Force (Ground duties - Tech)", vacancies: 18, female: 2 },
      { name: "Air Force (Ground duties - Non-Tech)", vacancies: 10, female: 2 },
      { name: "Naval Academy", vacancies: 25, female: 7 },
    ],
    airForceShape: "split",
    sourceFile: "CutOff-NDA-NA-II-Exam-2023-engl-090424.pdf",
  },
  {
    slug: "nda-2023-i",
    year: 2023,
    sitting: 1,
    writtenCutoff: [{ audience: "all", marks: 301 }],
    finalCutoff: [{ audience: "all", marks: 664 }],
    subjectMinimumPct: 25,
    recommended: { total: 628, male: null, female: null },
    vacancies: 395,
    wings: [
      { name: "Army", vacancies: 208, female: 10 },
      { name: "Navy", vacancies: 42, female: 3 },
      { name: "Air Force (Flying)", vacancies: 92, female: 2 },
      { name: "Air Force (Ground duties - Tech)", vacancies: 18, female: 2 },
      { name: "Air Force (Ground duties - Non Tech)", vacancies: 10, female: 2 },
      // Explicitly male-only: 0 reserved seats, not "unpublished".
      {
        name: "Naval Academy",
        vacancies: 25,
        female: 0,
        note: "For male candidates only",
      },
    ],
    airForceShape: "split",
    sourceFile: "CutOff-NDA-I-23-engl-301023.pdf",
  },
  {
    slug: "nda-2022-ii",
    year: 2022,
    sitting: 2,
    writtenCutoff: [{ audience: "all", marks: 316 }],
    finalCutoff: [{ audience: "all", marks: 678 }],
    subjectMinimumPct: 20,
    recommended: { total: 538, male: null, female: null },
    vacancies: 400,
    wings: [
      { name: "Army", vacancies: 208, female: 10 },
      { name: "Navy", vacancies: 42, female: 3 },
      { name: "Air Force (Flying)", vacancies: 92, female: 2 },
      { name: "Air Force (Ground duties - Tech)", vacancies: 18, female: 2 },
      { name: "Air Force (Ground duties - Non-Tech)", vacancies: 10, female: 2 },
      {
        name: "Naval Academy",
        vacancies: 30,
        female: 0,
        note: "For male candidates only",
      },
    ],
    airForceShape: "split",
    sourceFile: "NDA-NA-II-2022_Cut-off_Eng_21042023.pdf",
  },
  {
    slug: "nda-2022-i",
    year: 2022,
    sitting: 1,
    // The highest written cut-off in the corpus.
    writtenCutoff: [{ audience: "all", marks: 360 }],
    finalCutoff: [{ audience: "all", marks: 720 }],
    subjectMinimumPct: 25,
    recommended: { total: 519, male: null, female: null },
    vacancies: 400,
    wings: [
      { name: "Army", vacancies: 208, female: 10 },
      { name: "Navy", vacancies: 42, female: 3 },
      { name: "Air Force (Flying)", vacancies: 92, female: 2 },
      { name: "Air Force (Ground duties - Tech)", vacancies: 18, female: 2 },
      { name: "Air Force (Ground duties - Non Tech)", vacancies: 10, female: 2 },
      {
        name: "Naval Academy",
        vacancies: 30,
        female: 0,
        note: "For male candidates only",
      },
    ],
    airForceShape: "split",
    sourceFile: "CutOff-English-NDA-1-2022-011222.pdf",
  },
  {
    slug: "nda-2021-ii",
    year: 2021,
    sitting: 2,
    writtenCutoff: [{ audience: "all", marks: 355 }],
    finalCutoff: [{ audience: "all", marks: 726 }],
    subjectMinimumPct: 25,
    recommended: { total: 462, male: null, female: null },
    vacancies: 400,
    // The first sitting to split the Air Force line and to publish per-wing
    // female allocations -- women were admitted to the NDA from this sitting.
    wings: [
      { name: "Army", vacancies: 208, female: 10 },
      { name: "Navy", vacancies: 42, female: 3 },
      { name: "Air Force (Flying)", vacancies: 92, female: 2 },
      { name: "Air Force (Ground duties - Tech)", vacancies: 18, female: 2 },
      { name: "Air Force (Ground duties - Non-Tech)", vacancies: 10, female: 2 },
      {
        name: "Naval Academy",
        vacancies: 30,
        female: 0,
        note: "For male candidates only",
      },
    ],
    airForceShape: "split",
    sourceFile: "CUT-OFF-NDA-NA-II-2021-Engl-240622.pdf",
  },
  {
    slug: "nda-2021-i",
    year: 2021,
    sitting: 1,
    writtenCutoff: [{ audience: "all", marks: 343 }],
    finalCutoff: [{ audience: "all", marks: 709 }],
    subjectMinimumPct: 25,
    recommended: { total: 517, male: null, female: null },
    vacancies: 400,
    wings: [
      { name: "Army", vacancies: 208, female: null },
      { name: "Navy", vacancies: 42, female: null },
      {
        name: "Air Force",
        vacancies: 120,
        female: null,
        note: "Including 28 ground duties",
      },
      { name: "Naval Academy", vacancies: 30, female: null },
    ],
    airForceShape: "lumped",
    sourceFile: "NDA_NA_I_2021_CutOffMks_R_Eng_271221.pdf",
  },
  {
    slug: "nda-2020-ii",
    year: 2020,
    sitting: 2,
    writtenCutoff: [{ audience: "all", marks: 355 }],
    finalCutoff: [{ audience: "all", marks: 719 }],
    subjectMinimumPct: 25,
    recommended: null,
    vacancies: null,
    wings: null,
    airForceShape: null,
    sourceFile: "CutOff-NDA-II-2020-English-120721.pdf",
  },
  {
    slug: "nda-2020-i",
    year: 2020,
    sitting: 1,
    writtenCutoff: [{ audience: "all", marks: 355 }],
    finalCutoff: [{ audience: "all", marks: 723 }],
    subjectMinimumPct: 25,
    recommended: { total: 533, male: null, female: null },
    vacancies: 418,
    wings: [
      { name: "Army", vacancies: 208, female: null },
      { name: "Navy", vacancies: 42, female: null },
      {
        name: "Air Force",
        vacancies: 120,
        female: null,
        note: "Including 28 ground duties",
      },
      { name: "Naval Academy", vacancies: 48, female: null },
    ],
    airForceShape: "lumped",
    sourceFile: "NDA & NA Exam (I) 2020 - Cut-Off English.pdf",
  },
  {
    slug: "nda-2019-ii",
    year: 2019,
    sitting: 2,
    writtenCutoff: [{ audience: "all", marks: 346 }],
    finalCutoff: [{ audience: "all", marks: 709 }],
    subjectMinimumPct: 25,
    recommended: null,
    vacancies: null,
    wings: null,
    airForceShape: null,
    sourceFile: "NDA_NA_II_2019_CutOff_Eng_180920.pdf",
  },
  {
    slug: "nda-2019-i",
    year: 2019,
    sitting: 1,
    writtenCutoff: [{ audience: "all", marks: 342 }],
    finalCutoff: [{ audience: "all", marks: 704 }],
    subjectMinimumPct: 25,
    // The first sitting to publish a recommendation table at all.
    recommended: { total: 447, male: null, female: null },
    vacancies: 392,
    wings: [
      { name: "Army", vacancies: 208, female: null },
      { name: "Navy", vacancies: 42, female: null },
      { name: "Air Force", vacancies: 92, female: null },
      { name: "Naval Academy", vacancies: 50, female: null },
    ],
    airForceShape: "lumped",
    sourceFile: "Cut-Off-NDANA-I-19-English.pdf",
  },
  {
    slug: "nda-2018-ii",
    year: 2018,
    sitting: 2,
    writtenCutoff: [{ audience: "all", marks: 325 }],
    finalCutoff: [{ audience: "all", marks: 688 }],
    subjectMinimumPct: 25,
    recommended: null,
    vacancies: null,
    wings: null,
    airForceShape: null,
    sourceFile: "CutOff-NDA-II-18-Engl.pdf",
  },
  {
    slug: "nda-2018-i",
    year: 2018,
    sitting: 1,
    writtenCutoff: [{ audience: "all", marks: 338 }],
    finalCutoff: [{ audience: "all", marks: 705 }],
    subjectMinimumPct: 25,
    recommended: null,
    vacancies: null,
    wings: null,
    airForceShape: null,
    sourceFile: "CutOff-NDA-I-2018-Engl.pdf",
  },
  {
    slug: "nda-2017-ii",
    year: 2017,
    sitting: 2,
    writtenCutoff: [{ audience: "all", marks: 258 }],
    finalCutoff: [{ audience: "all", marks: 624 }],
    subjectMinimumPct: 25,
    recommended: null,
    vacancies: null,
    wings: null,
    airForceShape: null,
    sourceFile: "CutOff-NDA-II-2017-Engl.pdf",
  },
  {
    slug: "nda-2017-i",
    year: 2017,
    sitting: 1,
    writtenCutoff: [{ audience: "all", marks: 342 }],
    finalCutoff: [{ audience: "all", marks: 708 }],
    subjectMinimumPct: 25,
    recommended: null,
    vacancies: null,
    wings: null,
    airForceShape: null,
    sourceFile: "COM_NDANAI2017_Eng.pdf",
  },
  {
    slug: "nda-2016-ii",
    year: 2016,
    sitting: 2,
    // The lowest written cut-off in the corpus, and the earliest of the four
    // sittings that set the per-subject minimum at 20% rather than 25%.
    writtenCutoff: [{ audience: "all", marks: 229 }],
    finalCutoff: [{ audience: "all", marks: 602 }],
    subjectMinimumPct: 20,
    recommended: null,
    vacancies: null,
    wings: null,
    airForceShape: null,
    sourceFile: "Engl_CutOff_NDAII_2016_3.pdf",
  },
  {
    slug: "nda-2016-i",
    year: 2016,
    sitting: 1,
    writtenCutoff: [{ audience: "all", marks: 288 }],
    finalCutoff: [{ audience: "all", marks: 656 }],
    subjectMinimumPct: 25,
    recommended: null,
    vacancies: null,
    wings: null,
    airForceShape: null,
    sourceFile: "CutOffMks_NDA1_2016.pdf",
  },
];

/** One sitting by slug, e.g. `getSitting("nda-2025-ii")`. Null when unknown. */
export function getSitting(slug: string): NdaCutoffSitting | null {
  return NDA_CUTOFFS.find((s) => s.slug === slug) ?? null;
}

/** The most recent sitting in the corpus. */
export function latestSitting(): NdaCutoffSitting {
  return NDA_CUTOFFS[0];
}
