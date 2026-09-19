/**
 * GENERATED FILE — do not edit by hand. Run `npm run mhtcet:matrix`.
 *
 * The MHT-CET Maths chapter x shift matrix behind /guide/mht-cet-maths/trends,
 * derived from the live bank by scripts/mhtcet/trends-matrix.ts. Re-run it
 * after any MHT-CET Maths ingest; `-- --check` fails if this file is stale.
 *
 * 45 papers · 27 chapters · 2228 PUBLIC PYQ questions.
 *
 * WHY THE COLUMNS ARE SHIFTS, NOT YEARS. MHT-CET runs wildly uneven shift
 * counts per year (2021=1 · 2022=1 · 2023=17 · 2024=12 · 2025=14), so a
 * raw count does not compare across years — the warning the trends page has
 * always carried. Per SHIFT it does compare: every column below is one
 * ~50-question paper, so any two cells in the grid can be read against
 * each other directly. YEAR_RATES holds the same data as questions-per-paper
 * for readers who want the summary, each year divided by its OWN shift count.
 *
 * A ZERO IS A MEASURED ZERO. A chapter absent from a paper scored nothing in
 * it; the cell is not missing data. That distinction is the page's headline —
 * Measures of Dispersion runs a question a paper for two years and then goes
 * to zero across every shift of 2025.
 *
 * 4 paper(s) carry NO date and are sorted last within their
 * year rather than placed at a guessed position:
 *   MHT_CET_2021_Question_Bank.xlsx (2021)
 *   MHT_CET_2022_Analysis.xlsx (2022)
 *   MHT_CET_2023_Analysis.xlsx (2023)
 *   MHT_CET_2025_PCM.xlsx (2025)
 *
 * Papers whose filename and pyq_note disagree about the shift number —
 * reported, deliberately NOT resolved, because nothing in the bank says which
 * label is right:
 *   MHT_CET_3rdMay2023_S1_QB.xlsx: filename says shift 1, pyq_note says 2 ("3rd May 2nd Shift")
 */

/** One column: a single sitting, ordered and named. */
export type ShiftPaper = {
  /** `questions.source_file` — the per-paper key the counts are grouped on. */
  id: string;
  year: number;
  /** 1-based index of this sitting within its year; the visible sub-header. */
  seq: number;
  label: string;
  /** Tooltip — the real date, or a plain statement that there is not one. */
  title: string;
  /** False when the bank records no day for this paper. */
  dated: boolean;
  /** True when the filename and pyq_note disagree about the shift number. */
  disputed: boolean;
};

/** One chapter across every paper. `counts` aligns 1:1 to SHIFT_PAPERS. */
export type ChapterMatrixRow = {
  chapter: string;
  total: number;
  counts: number[];
};

/** A year column in the rate table, carrying the divisor it was computed with. */
export type YearColumn = { year: number; shifts: number };

/** A chapter's questions-per-paper rate in each year. Always a measured number. */
export type YearRateRow = {
  chapter: string;
  total: number;
  /** Aligned 1:1 to YEAR_COLUMNS. Two decimal places. */
  rates: number[];
};

export const SHIFT_PAPERS: ShiftPaper[] = [
  { id: "MHT_CET_2021_Question_Bank.xlsx", year: 2021, seq: 1, label: "1", title: "2021 · Shift 1 · date not recorded", dated: false, disputed: false },
  { id: "MHT_CET_2022_Analysis.xlsx", year: 2022, seq: 1, label: "1", title: "2022 · Shift 1 · date not recorded", dated: false, disputed: false },
  { id: "MHT_CET_2ndMay2023_Shift1_QuestionBank.xlsx", year: 2023, seq: 1, label: "1", title: "2 May 2023 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2ndMay2023_Shift2.xlsx", year: 2023, seq: 2, label: "2", title: "2 May 2023 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_3rdMay2023_S1_QB.xlsx", year: 2023, seq: 3, label: "3", title: "3 May 2023 · Shift 2 · shift label disputed", dated: true, disputed: true },
  { id: "MHT_CET_3rdMay2023_Shift2_QuestionBank.xlsx", year: 2023, seq: 4, label: "4", title: "3 May 2023 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_4thMay2023_Shift1_QuestionBank.xlsx", year: 2023, seq: 5, label: "5", title: "4 May 2023 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_4thMay2023_Shift2.xlsx", year: 2023, seq: 6, label: "6", title: "4 May 2023 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_9thMay2023_Shift1_QuestionBank.xlsx", year: 2023, seq: 7, label: "7", title: "9 May 2023 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_9thMay2023_Shift2.xlsx", year: 2023, seq: 8, label: "8", title: "9 May 2023 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_10thMay2023_Shift1.xlsx", year: 2023, seq: 9, label: "9", title: "10 May 2023 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_10thMay2023_Shift2_QuestionBank.xlsx", year: 2023, seq: 10, label: "10", title: "10 May 2023 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_11thMay2023_Shift1_QuestionBank.xlsx", year: 2023, seq: 11, label: "11", title: "11 May 2023 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_11thMay2023_Shift2_QuestionBank.xlsx", year: 2023, seq: 12, label: "12", title: "11 May 2023 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_15thMay2023_Shift1_QuestionBank.xlsx", year: 2023, seq: 13, label: "13", title: "15 May 2023 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_15thMay2023_Shift2_QuestionBank.xlsx", year: 2023, seq: 14, label: "14", title: "15 May 2023 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_16thMay2023_Shift1_QuestionBank.xlsx", year: 2023, seq: 15, label: "15", title: "16 May 2023 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_16thMay2023_Shift2_QuestionBank.xlsx", year: 2023, seq: 16, label: "16", title: "16 May 2023 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2023_Analysis.xlsx", year: 2023, seq: 17, label: "17", title: "2023 · Shift 1 · date not recorded", dated: false, disputed: false },
  { id: "MHT_CET_9thMay2024_Shift1_QuestionBank.xlsx", year: 2024, seq: 1, label: "1", title: "9 May 2024 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_9thMay2024_Shift2_QuestionBank.xlsx", year: 2024, seq: 2, label: "2", title: "9 May 2024 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_10thMay2024_Shift1_QuestionBank.xlsx", year: 2024, seq: 3, label: "3", title: "10 May 2024 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_10thMay2024_Shift2_QuestionBank.xlsx", year: 2024, seq: 4, label: "4", title: "10 May 2024 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_11thMay2024_Shift1_QuestionBank.xlsx", year: 2024, seq: 5, label: "5", title: "11 May 2024 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_11thMay2024_Shift2_QuestionBank.xlsx", year: 2024, seq: 6, label: "6", title: "11 May 2024 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_12thMay2024_Shift1.xlsx", year: 2024, seq: 7, label: "7", title: "12 May 2024 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_12thMay2024_Shift2_QuestionBank.xlsx", year: 2024, seq: 8, label: "8", title: "12 May 2024 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_13thMay2024_Shift1_QuestionBank.xlsx", year: 2024, seq: 9, label: "9", title: "13 May 2024 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_13thMay2024_Shift2_Question_Bank.xlsx", year: 2024, seq: 10, label: "10", title: "13 May 2024 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_14thMay2024_Shift1_QuestionBank.xlsx", year: 2024, seq: 11, label: "11", title: "14 May 2024 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_14tthMay2024_Shift2.xlsx", year: 2024, seq: 12, label: "12", title: "14 May 2024 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_19_S1.docx", year: 2025, seq: 1, label: "1", title: "19 April 2025 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_19_S2.docx", year: 2025, seq: 2, label: "2", title: "19 April 2025 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_20_S1.docx", year: 2025, seq: 3, label: "3", title: "20 April 2025 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_20_S2.docx", year: 2025, seq: 4, label: "4", title: "20 April 2025 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_21_S1.docx", year: 2025, seq: 5, label: "5", title: "21 April 2025 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_21_S2.docx", year: 2025, seq: 6, label: "6", title: "21 April 2025 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_22_S1.docx", year: 2025, seq: 7, label: "7", title: "22 April 2025 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_22_S2.docx", year: 2025, seq: 8, label: "8", title: "22 April 2025 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_23_S1.docx", year: 2025, seq: 9, label: "9", title: "23 April 2025 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_25_S1.docx", year: 2025, seq: 10, label: "10", title: "25 April 2025 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_25_S2.docx", year: 2025, seq: 11, label: "11", title: "25 April 2025 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_26_S1.docx", year: 2025, seq: 12, label: "12", title: "26 April 2025 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2025_Apr_26_S2.docx", year: 2025, seq: 13, label: "13", title: "26 April 2025 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2025_PCM.xlsx", year: 2025, seq: 14, label: "14", title: "2025 · Shift 2 · date not recorded", dated: false, disputed: false },
];

export const YEAR_COLUMNS: YearColumn[] = [
  { year: 2021, shifts: 1 },
  { year: 2022, shifts: 1 },
  { year: 2023, shifts: 17 },
  { year: 2024, shifts: 12 },
  { year: 2025, shifts: 14 },
];

/** Heaviest chapter first. Column i is SHIFT_PAPERS[i]. */
export const CHAPTER_MATRIX: ChapterMatrixRow[] = [
  { chapter: "Vectors",                           total:  228, counts: [ 2,  4,  7,  6,  6,  5,  6,  4,  6,  6,  6,  7,  5,  6,  6,  4,  6,  5,  6,  5,  6,  6,  6,  6,  6,  4,  5,  5,  6,  5,  6,  3,  4,  5,  5,  4,  2,  4,  5,  5,  4,  5,  4,  5,  4] },
  { chapter: "Line and Plane",                    total:  205, counts: [ 1,  5,  4,  4,  4,  5,  4,  5,  4,  3,  4,  4,  4,  4,  4,  5,  4,  4,  4,  5,  4,  4,  3,  5,  4,  6,  5,  5,  4,  5,  4,  6,  6,  5,  4,  5,  8,  6,  5,  5,  5,  5,  5,  5,  5] },
  { chapter: "Applications of Derivative",        total:  183, counts: [ 2,  4,  4,  5,  6,  5,  5,  3,  5,  5,  5,  3,  5,  5,  4,  5,  4,  4,  5,  3,  5,  5,  5,  3,  5,  5,  4,  4,  3,  4,  4,  4,  2,  3,  4,  5,  4,  3,  4,  4,  3,  4,  3,  4,  2] },
  { chapter: "Trigonometric Functions",           total:  168, counts: [ 2,  3,  4,  2,  1,  1,  5,  1,  4,  1,  3,  4,  4,  4,  1,  5,  2,  4,  5,  4,  3,  3,  4,  5,  4,  3,  5,  4,  4,  4,  5,  5,  5,  4,  4,  5,  4,  4,  4,  5,  3,  4,  5,  6,  6] },
  { chapter: "Indefinite Integration",            total:  159, counts: [ 2,  3,  3,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  3,  4,  4,  4,  4,  3,  4,  4,  4,  4,  4,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3] },
  { chapter: "Differential Equations",            total:  144, counts: [ 3,  2,  3,  3,  3,  3,  3,  4,  3,  3,  3,  3,  3,  3,  3,  2,  3,  4,  3,  3,  2,  3,  3,  2,  2,  3,  3,  3,  3,  3,  3,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  3,  4,  3] },
  { chapter: "Differentiation",                   total:  141, counts: [ 2,  4,  4,  5,  2,  3,  3,  3,  3,  3,  3,  4,  3,  3,  3,  4,  4,  1,  2,  5,  3,  3,  4,  3,  3,  3,  3,  3,  5,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  2,  3] },
  { chapter: "Probability Distribution",          total:  115, counts: [ 3,  1,  2,  3,  2,  1,  3,  3,  3,  2,  3,  2,  1,  3,  3,  2,  3,  3,  3,  1,  2,  3,  2,  2,  1,  3,  3,  2,  3,  3,  3,  3,  3,  3,  3,  3,  2,  3,  3,  3,  3,  3,  3,  3,  3] },
  { chapter: "Limits",                            total:   93, counts: [ 4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2] },
  { chapter: "Mathematical Logic",                total:   88, counts: [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  1,  2,  2,  2,  2,  2,  1,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2] },
  { chapter: "Trigonometry - I",                  total:   77, counts: [ 3,  1,  2,  2,  4,  3,  1,  5,  1,  4,  2,  0,  1,  2,  5,  2,  3,  1,  1,  2,  1,  2,  0,  1,  1,  2,  0,  1,  2,  1,  1,  1,  0,  3,  2,  1,  2,  2,  2,  1,  3,  1,  1,  1,  0] },
  { chapter: "Definite Integration",              total:   73, counts: [ 1,  2,  2,  1,  1,  2,  1,  1,  1,  1,  1,  3,  1,  1,  1,  3,  1,  1,  0,  1,  1,  2,  3,  3,  2,  1,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  2,  2] },
  { chapter: "Binomial Distribution",             total:   60, counts: [ 2,  2,  1,  1,  2,  3,  1,  1,  1,  2,  1,  1,  3,  1,  1,  1,  1,  1,  1,  3,  2,  1,  2,  1,  3,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "Determinants and Matrices",         total:   50, counts: [ 2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1] },
  { chapter: "Applications of Definite Integral", total:   47, counts: [ 3,  2,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  2,  1,  1,  0,  1,  1,  2,  1,  1,  0,  1,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "Circle",                            total:   47, counts: [ 2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "Complex Numbers",                   total:   46, counts: [ 2,  2,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "Linear Programming",                total:   46, counts: [ 2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "Straight Line",                     total:   46, counts: [ 3,  1,  1,  0,  2,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1] },
  { chapter: "Pair of Straight Lines",            total:   45, counts: [ 0,  1,  1,  2,  0,  1,  1,  2,  1,  1,  1,  0,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "Permutations and Combinations",     total:   43, counts: [ 2,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  0,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1] },
  { chapter: "Sets, Relations and Functions",     total:   41, counts: [ 3,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  1,  0,  0,  0,  0,  1,  1,  1,  1,  1,  0,  1] },
  { chapter: "Measures of Dispersion",            total:   32, counts: [ 2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0] },
  { chapter: "Conic Sections",                    total:   19, counts: [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  0,  0,  0,  1,  2,  0,  0,  1,  1,  2,  1,  1,  1,  1,  2,  1,  2] },
  { chapter: "Trigonometry - II",                 total:   17, counts: [ 0,  0,  0,  1,  1,  0,  0,  1,  2,  1,  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  1,  1,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  0,  0,  1,  1,  0,  0,  0] },
  { chapter: "Sequences and Series",              total:   10, counts: [ 0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  1,  0,  1,  0,  1,  1,  0] },
  { chapter: "Quadratic Equations",               total:    5, counts: [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1] },
];

/** The same questions as questions-per-paper. Column i is YEAR_COLUMNS[i]. */
export const YEAR_RATES: YearRateRow[] = [
  { chapter: "Vectors",                           total:  228, rates: [ 2.00,  4.00,  5.71,  5.50,  4.21] },
  { chapter: "Line and Plane",                    total:  205, rates: [ 1.00,  5.00,  4.12,  4.50,  5.36] },
  { chapter: "Applications of Derivative",        total:  183, rates: [ 2.00,  4.00,  4.59,  4.17,  3.50] },
  { chapter: "Trigonometric Functions",           total:  168, rates: [ 2.00,  3.00,  3.00,  4.00,  4.57] },
  { chapter: "Indefinite Integration",            total:  159, rates: [ 2.00,  3.00,  3.94,  3.75,  3.00] },
  { chapter: "Differential Equations",            total:  144, rates: [ 3.00,  2.00,  3.06,  2.75,  3.86] },
  { chapter: "Differentiation",                   total:  141, rates: [ 2.00,  4.00,  3.12,  3.42,  2.93] },
  { chapter: "Probability Distribution",          total:  115, rates: [ 3.00,  1.00,  2.47,  2.33,  2.93] },
  { chapter: "Limits",                            total:   93, rates: [ 4.00,  2.00,  1.94,  2.17,  2.00] },
  { chapter: "Mathematical Logic",                total:   88, rates: [ 2.00,  2.00,  2.00,  1.83,  2.00] },
  { chapter: "Trigonometry - I",                  total:   77, rates: [ 3.00,  1.00,  2.29,  1.17,  1.43] },
  { chapter: "Definite Integration",              total:   73, rates: [ 1.00,  2.00,  1.29,  1.58,  2.07] },
  { chapter: "Binomial Distribution",             total:   60, rates: [ 2.00,  2.00,  1.35,  1.50,  1.07] },
  { chapter: "Determinants and Matrices",         total:   50, rates: [ 2.00,  2.00,  1.00,  1.17,  1.07] },
  { chapter: "Applications of Definite Integral", total:   47, rates: [ 3.00,  2.00,  0.94,  0.92,  1.07] },
  { chapter: "Circle",                            total:   47, rates: [ 2.00,  1.00,  1.00,  1.08,  1.00] },
  { chapter: "Complex Numbers",                   total:   46, rates: [ 2.00,  2.00,  0.94,  1.00,  1.00] },
  { chapter: "Linear Programming",                total:   46, rates: [ 2.00,  1.00,  1.00,  1.00,  1.00] },
  { chapter: "Straight Line",                     total:   46, rates: [ 3.00,  1.00,  1.00,  1.00,  0.93] },
  { chapter: "Pair of Straight Lines",            total:   45, rates: [ 0.00,  1.00,  1.06,  1.00,  1.00] },
  { chapter: "Permutations and Combinations",     total:   43, rates: [ 2.00,  1.00,  0.82,  1.00,  1.00] },
  { chapter: "Sets, Relations and Functions",     total:   41, rates: [ 3.00,  1.00,  1.06,  1.00,  0.50] },
  { chapter: "Measures of Dispersion",            total:   32, rates: [ 2.00,  1.00,  1.00,  1.00,  0.00] },
  { chapter: "Conic Sections",                    total:   19, rates: [ 0.00,  0.00,  0.06,  0.17,  1.14] },
  { chapter: "Trigonometry - II",                 total:   17, rates: [ 0.00,  0.00,  0.47,  0.42,  0.29] },
  { chapter: "Sequences and Series",              total:   10, rates: [ 0.00,  0.00,  0.12,  0.17,  0.43] },
  { chapter: "Quadratic Equations",               total:    5, rates: [ 0.00,  0.00,  0.06,  0.08,  0.21] },
];

/** Per-paper question totals — the matrix footer, and its completeness proof. */
export const PAPER_TOTALS: number[] = [50, 48, 50, 50, 50, 49, 50, 50, 50, 49, 50, 49, 50, 50, 50, 50, 50, 44, 49, 49, 50, 50, 50, 50, 50, 50, 50, 47, 50, 50, 50, 49, 50, 50, 48, 50, 50, 50, 50, 50, 49, 50, 50, 50, 48];

export const MATRIX_META = {
  papers: 45,
  chapters: 27,
  questions: 2228,
  undatedPapers: 4,
  labelConflicts: 1,
} as const;
