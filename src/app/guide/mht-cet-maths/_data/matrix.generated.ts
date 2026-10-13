/**
 * GENERATED FILE — do not edit by hand. Run `npm run mhtcet:matrix`.
 *
 * The MHT-CET Maths chapter x shift matrix behind /guide/mht-cet-maths/trends,
 * derived from the live bank by scripts/mhtcet/trends-matrix.ts. Re-run it
 * after any MHT-CET Maths ingest; `-- --check` fails if this file is stale.
 *
 * 68 papers · 26 chapters · 3388 PUBLIC PYQ questions.
 *
 * WHY THE COLUMNS ARE SHIFTS, NOT YEARS. MHT-CET runs wildly uneven shift
 * counts per year (2021=1 · 2022=1 · 2023=16 · 2024=11 · 2025=13 · 2026=26), so a
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
 * 2 paper(s) carry NO date and are sorted last within their
 * year rather than placed at a guessed position:
 *   MHT_CET_2021_Question_Bank.xlsx (2021)
 *   MHT_CET_2022_Analysis.xlsx (2022)
 *
 * Papers whose filename and pyq_note disagree about the shift number —
 * reported, deliberately NOT resolved, because nothing in the bank says which
 * label is right:
 *   none
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
  { id: "MHT_CET_3rdMay2023_S1_QB.xlsx", year: 2023, seq: 3, label: "3", title: "3 May 2023 · Shift 1", dated: true, disputed: false },
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
  { id: "MHT_CET_9thMay2024_Shift1_QuestionBank.xlsx", year: 2024, seq: 1, label: "1", title: "9 May 2024 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_9thMay2024_Shift2_QuestionBank.xlsx", year: 2024, seq: 2, label: "2", title: "9 May 2024 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_10thMay2024_Shift1_QuestionBank.xlsx", year: 2024, seq: 3, label: "3", title: "10 May 2024 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_10thMay2024_Shift2_QuestionBank.xlsx", year: 2024, seq: 4, label: "4", title: "10 May 2024 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_11thMay2024_Shift1_QuestionBank.xlsx", year: 2024, seq: 5, label: "5", title: "11 May 2024 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_11thMay2024_Shift2_QuestionBank.xlsx", year: 2024, seq: 6, label: "6", title: "11 May 2024 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_12thMay2024_Shift1.xlsx", year: 2024, seq: 7, label: "7", title: "12 May 2024 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_12thMay2024_Shift2_QuestionBank.xlsx", year: 2024, seq: 8, label: "8", title: "12 May 2024 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_13thMay2024_Shift2_Question_Bank.xlsx", year: 2024, seq: 9, label: "9", title: "13 May 2024 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_14thMay2024_Shift1_QuestionBank.xlsx", year: 2024, seq: 10, label: "10", title: "14 May 2024 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_14tthMay2024_Shift2.xlsx", year: 2024, seq: 11, label: "11", title: "14 May 2024 · Shift 2", dated: true, disputed: false },
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
  { id: "MHT_CET_2026_Apr_11_S1.pdf", year: 2026, seq: 1, label: "1", title: "11 April 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_11_S2.pdf", year: 2026, seq: 2, label: "2", title: "11 April 2026 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_13_S1.pdf", year: 2026, seq: 3, label: "3", title: "13 April 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_13_S2.pdf", year: 2026, seq: 4, label: "4", title: "13 April 2026 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_15_S1.pdf", year: 2026, seq: 5, label: "5", title: "15 April 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_15_S2.pdf", year: 2026, seq: 6, label: "6", title: "15 April 2026 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_16_S1.pdf", year: 2026, seq: 7, label: "7", title: "16 April 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_16_S2.pdf", year: 2026, seq: 8, label: "8", title: "16 April 2026 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_17_S1.pdf", year: 2026, seq: 9, label: "9", title: "17 April 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_17_S2.pdf", year: 2026, seq: 10, label: "10", title: "17 April 2026 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_18_S1.pdf", year: 2026, seq: 11, label: "11", title: "18 April 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_18_S2.pdf", year: 2026, seq: 12, label: "12", title: "18 April 2026 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_19_S1.pdf", year: 2026, seq: 13, label: "13", title: "19 April 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_19_S2.pdf", year: 2026, seq: 14, label: "14", title: "19 April 2026 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_20_S1.pdf", year: 2026, seq: 15, label: "15", title: "20 April 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_Apr_20_S2.pdf", year: 2026, seq: 16, label: "16", title: "20 April 2026 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2026_May_12_S1.pdf", year: 2026, seq: 17, label: "17", title: "12 May 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_May_12_S2.pdf", year: 2026, seq: 18, label: "18", title: "12 May 2026 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2026_May_13_S1.pdf", year: 2026, seq: 19, label: "19", title: "13 May 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_May_13_S2.pdf", year: 2026, seq: 20, label: "20", title: "13 May 2026 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2026_May_14_S1.pdf", year: 2026, seq: 21, label: "21", title: "14 May 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_May_14_S2.pdf", year: 2026, seq: 22, label: "22", title: "14 May 2026 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2026_May_15_S1.pdf", year: 2026, seq: 23, label: "23", title: "15 May 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_May_15_S2.pdf", year: 2026, seq: 24, label: "24", title: "15 May 2026 · Shift 2", dated: true, disputed: false },
  { id: "MHT_CET_2026_May_19_S1.pdf", year: 2026, seq: 25, label: "25", title: "19 May 2026 · Shift 1", dated: true, disputed: false },
  { id: "MHT_CET_2026_May_19_S2.pdf", year: 2026, seq: 26, label: "26", title: "19 May 2026 · Shift 2", dated: true, disputed: false },
];

export const YEAR_COLUMNS: YearColumn[] = [
  { year: 2021, shifts: 1 },
  { year: 2022, shifts: 1 },
  { year: 2023, shifts: 16 },
  { year: 2024, shifts: 11 },
  { year: 2025, shifts: 13 },
  { year: 2026, shifts: 26 },
];

/** Heaviest chapter first. Column i is SHIFT_PAPERS[i]. */
export const CHAPTER_MATRIX: ChapterMatrixRow[] = [
  { chapter: "Vectors",                           total:  334, counts: [ 2,  4,  7,  6,  6,  5,  6,  4,  6,  6,  6,  7,  5,  6,  6,  4,  6,  6,  5,  6,  6,  6,  6,  6,  4,  5,  6,  5,  6,  3,  4,  5,  5,  4,  2,  4,  5,  5,  4,  5,  4,  5,  5,  5,  5,  5,  5,  5,  4,  4,  4,  4,  4,  5,  5,  4,  4,  6,  6,  5,  4,  3,  5,  4,  5,  4,  5,  5] },
  { chapter: "Trigonometric Functions",           total:  312, counts: [ 2,  3,  6,  4,  5,  4,  5,  5,  6,  5,  5,  4,  5,  6,  5,  6,  4,  5,  5,  3,  5,  4,  5,  5,  5,  5,  5,  5,  6,  5,  5,  5,  6,  5,  5,  5,  5,  5,  5,  5,  6,  7,  4,  4,  5,  4,  4,  4,  5,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  3,  3,  3,  4,  4,  4,  5,  4,  5] },
  { chapter: "Line and Plane",                    total:  304, counts: [ 1,  5,  4,  4,  4,  5,  4,  5,  4,  3,  4,  4,  4,  4,  4,  5,  4,  4,  5,  4,  4,  3,  5,  4,  6,  5,  4,  5,  4,  6,  6,  5,  4,  5,  8,  6,  5,  5,  5,  5,  5,  5,  4,  4,  5,  4,  4,  5,  6,  5,  4,  5,  5,  4,  4,  5,  5,  3,  3,  4,  5,  5,  4,  4,  4,  4,  4,  4] },
  { chapter: "Applications of Derivative",        total:  253, counts: [ 2,  4,  4,  5,  6,  5,  5,  4,  5,  5,  5,  3,  5,  5,  4,  5,  4,  5,  3,  5,  5,  5,  3,  5,  5,  4,  3,  4,  4,  4,  2,  3,  4,  5,  4,  3,  4,  4,  3,  4,  3,  4,  4,  3,  4,  3,  2,  4,  4,  3,  4,  3,  3,  3,  3,  2,  3,  3,  3,  3,  3,  3,  3,  3,  2,  2,  3,  3] },
  { chapter: "Indefinite Integration",            total:  249, counts: [ 2,  3,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  3,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  4,  3,  4,  5,  3,  3,  4,  4,  5,  4,  3,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  3,  4,  4] },
  { chapter: "Differentiation",                   total:  237, counts: [ 2,  4,  4,  5,  2,  3,  3,  3,  3,  3,  3,  4,  3,  3,  3,  4,  4,  2,  5,  3,  3,  4,  4,  3,  3,  3,  5,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  2,  5,  4,  3,  4,  4,  3,  3,  3,  3,  4,  4,  4,  4,  4,  4,  5,  4,  4,  4,  5,  4,  4,  4,  4,  4,  4] },
  { chapter: "Differential Equations",            total:  216, counts: [ 3,  2,  3,  3,  3,  3,  3,  4,  3,  3,  3,  3,  3,  3,  3,  2,  3,  4,  3,  2,  3,  3,  2,  2,  3,  3,  3,  3,  3,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  3,  4,  3,  2,  3,  3,  3,  4,  4,  4,  3,  3,  3,  5,  2,  3,  3,  2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  4] },
  { chapter: "Probability Distribution",          total:  159, counts: [ 3,  1,  2,  3,  2,  1,  3,  3,  3,  2,  3,  2,  1,  3,  3,  2,  3,  3,  1,  2,  3,  2,  2,  1,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  2,  3,  3,  3,  3,  3,  3,  3,  2,  2,  2,  2,  1,  2,  4,  2,  1,  2,  2,  2,  3,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2] },
  { chapter: "Mathematical Logic",                total:  151, counts: [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  1,  2,  2,  3,  2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  2,  3] },
  { chapter: "Limits",                            total:  137, counts: [ 4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  2,  2,  2,  3,  2,  2] },
  { chapter: "Definite Integration",              total:  132, counts: [ 2,  3,  1,  1,  1,  1,  1,  1,  1,  1,  1,  3,  1,  1,  1,  3,  1,  1,  1,  1,  1,  3,  3,  1,  1,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  3,  2,  3,  2,  3,  3,  3,  3,  3,  3,  3,  4,  3] },
  { chapter: "Determinants and Matrices",         total:  102, counts: [ 2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  2,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  2,  3,  4,  2] },
  { chapter: "Binomial Distribution",             total:   86, counts: [ 2,  2,  1,  1,  2,  3,  1,  1,  1,  2,  1,  1,  3,  1,  1,  1,  1,  1,  3,  2,  1,  2,  1,  3,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  2,  2,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "Applications of Definite Integral", total:   78, counts: [ 2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  2,  1,  2,  2,  1,  0,  2,  2,  1,  1,  1,  2,  2,  2,  1,  2,  1,  1,  1,  1,  1,  1,  1,  0,  1] },
  { chapter: "Straight Line",                     total:   75, counts: [ 3,  1,  1,  0,  2,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  2,  1,  1,  3,  1,  3,  1,  1,  1,  1] },
  { chapter: "Pair of Straight Lines",            total:   73, counts: [ 0,  1,  1,  2,  0,  1,  1,  2,  1,  1,  1,  0,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  2,  2,  1,  1,  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "Circle",                            total:   71, counts: [ 2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  2,  1,  1,  1,  1,  2,  1,  1,  0,  1,  2,  1,  0] },
  { chapter: "Linear Programming",                total:   69, counts: [ 2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0] },
  { chapter: "Complex Numbers",                   total:   67, counts: [ 2,  2,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1] },
  { chapter: "Sets, Relations and Functions",     total:   66, counts: [ 3,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  1,  0,  0,  0,  0,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1,  1,  2,  2,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "Permutations and Combinations",     total:   65, counts: [ 2,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  0,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  0,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "Trigonometry - II",                 total:   61, counts: [ 3,  1,  0,  1,  1,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  0,  1,  1,  2,  0,  2,  1,  1,  1,  1,  2,  1,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  0,  2,  1,  1,  1,  1,  1,  0,  1,  0] },
  { chapter: "Conic Sections",                    total:   44, counts: [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  2,  1,  0,  1,  1,  2,  1,  1,  1,  1,  2,  1,  0,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  2,  1,  1,  2] },
  { chapter: "Measures of Dispersion",            total:   30, counts: [ 2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0] },
  { chapter: "Sequences and Series",              total:   11, counts: [ 0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  1,  0,  1,  0,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0] },
  { chapter: "Quadratic Equations",               total:    6, counts: [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0] },
];

/** The same questions as questions-per-paper. Column i is YEAR_COLUMNS[i]. */
export const YEAR_RATES: YearRateRow[] = [
  { chapter: "Vectors",                           total:  334, rates: [ 2.00,  4.00,  5.75,  5.55,  4.23,  4.62] },
  { chapter: "Trigonometric Functions",           total:  312, rates: [ 2.00,  3.00,  5.00,  4.82,  5.31,  4.04] },
  { chapter: "Line and Plane",                    total:  304, rates: [ 1.00,  5.00,  4.13,  4.45,  5.38,  4.35] },
  { chapter: "Applications of Derivative",        total:  253, rates: [ 2.00,  4.00,  4.69,  4.18,  3.62,  3.04] },
  { chapter: "Indefinite Integration",            total:  249, rates: [ 2.00,  3.00,  4.00,  3.91,  3.00,  3.77] },
  { chapter: "Differentiation",                   total:  237, rates: [ 2.00,  4.00,  3.25,  3.55,  2.92,  3.92] },
  { chapter: "Differential Equations",            total:  216, rates: [ 3.00,  2.00,  3.06,  2.73,  3.92,  3.12] },
  { chapter: "Probability Distribution",          total:  159, rates: [ 3.00,  1.00,  2.44,  2.36,  2.92,  2.00] },
  { chapter: "Mathematical Logic",                total:  151, rates: [ 2.00,  2.00,  2.06,  1.91,  2.00,  2.58] },
  { chapter: "Limits",                            total:  137, rates: [ 4.00,  2.00,  1.94,  2.09,  2.00,  1.96] },
  { chapter: "Definite Integration",              total:  132, rates: [ 2.00,  3.00,  1.25,  1.36,  2.08,  2.50] },
  { chapter: "Determinants and Matrices",         total:  102, rates: [ 2.00,  2.00,  1.00,  1.18,  1.08,  2.12] },
  { chapter: "Binomial Distribution",             total:   86, rates: [ 2.00,  2.00,  1.38,  1.55,  1.08,  1.12] },
  { chapter: "Applications of Definite Integral", total:   78, rates: [ 2.00,  1.00,  1.00,  1.09,  1.00,  1.31] },
  { chapter: "Straight Line",                     total:   75, rates: [ 3.00,  1.00,  1.00,  1.00,  0.92,  1.23] },
  { chapter: "Pair of Straight Lines",            total:   73, rates: [ 0.00,  1.00,  1.06,  1.00,  1.00,  1.19] },
  { chapter: "Circle",                            total:   71, rates: [ 2.00,  1.00,  1.00,  1.00,  1.00,  1.08] },
  { chapter: "Linear Programming",                total:   69, rates: [ 2.00,  1.00,  1.00,  1.00,  1.00,  1.00] },
  { chapter: "Complex Numbers",                   total:   67, rates: [ 2.00,  2.00,  0.94,  1.00,  1.00,  0.92] },
  { chapter: "Sets, Relations and Functions",     total:   66, rates: [ 3.00,  1.00,  1.06,  1.00,  0.46,  1.08] },
  { chapter: "Permutations and Combinations",     total:   65, rates: [ 2.00,  1.00,  0.81,  1.00,  1.00,  0.96] },
  { chapter: "Trigonometry - II",                 total:   61, rates: [ 3.00,  1.00,  0.75,  0.82,  1.00,  0.88] },
  { chapter: "Conic Sections",                    total:   44, rates: [ 0.00,  0.00,  0.06,  0.09,  1.15,  1.04] },
  { chapter: "Measures of Dispersion",            total:   30, rates: [ 2.00,  1.00,  1.00,  1.00,  0.00,  0.00] },
  { chapter: "Sequences and Series",              total:   11, rates: [ 0.00,  0.00,  0.13,  0.18,  0.46,  0.04] },
  { chapter: "Quadratic Equations",               total:    6, rates: [ 0.00,  0.00,  0.06,  0.09,  0.15,  0.08] },
];

/** Per-paper question totals — the matrix footer, and its completeness proof. */
export const PAPER_TOTALS: number[] = [50, 48, 50, 50, 50, 49, 50, 50, 50, 49, 50, 49, 50, 50, 50, 50, 50, 50, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 50, 50, 48, 50, 50, 50, 50, 50, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 50, 50, 50, 50, 50, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50];

export const MATRIX_META = {
  papers: 68,
  chapters: 26,
  questions: 3388,
  undatedPapers: 2,
  labelConflicts: 0,
} as const;
