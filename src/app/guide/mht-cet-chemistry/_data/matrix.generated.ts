/**
 * GENERATED FILE — do not edit by hand. Run `npm run mhtcet:matrix -- --subject=Chemistry`.
 *
 * The MHT-CET Chemistry chapter x shift matrix behind /guide/mht-cet-chemistry/trends,
 * derived from the live bank by scripts/mhtcet/trends-matrix.ts. Re-run it
 * after any MHT-CET Chemistry ingest; `-- --check` fails if this file is stale.
 *
 * 42 papers · 30 chapters · 2074 PUBLIC PYQ questions.
 *
 * WHY THE COLUMNS ARE SHIFTS, NOT YEARS. MHT-CET runs wildly uneven shift
 * counts per year (2021=1 · 2022=1 · 2023=16 · 2024=11 · 2025=13), so a
 * raw count does not compare across years — the warning the trends page has
 * always carried. Per SHIFT it does compare: every column below is one
 * ~50-question paper, so any two cells in the grid can be read against
 * each other directly. YEAR_RATES holds the same data as questions-per-paper
 * for readers who want the summary, each year divided by its OWN shift count.
 *
 * A ZERO IS A MEASURED ZERO. A chapter absent from a paper scored nothing in
 * it; the cell is not missing data. That distinction is the page's headline —
 * a chapter that stops being set shows as a run of zeros, not as a gap.
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
];

export const YEAR_COLUMNS: YearColumn[] = [
  { year: 2021, shifts: 1 },
  { year: 2022, shifts: 1 },
  { year: 2023, shifts: 16 },
  { year: 2024, shifts: 11 },
  { year: 2025, shifts: 13 },
];

/** Heaviest chapter first. Column i is SHIFT_PAPERS[i]. */
export const CHAPTER_MATRIX: ChapterMatrixRow[] = [
  { chapter: "Solutions and Colligative Properties",     total:  131, counts: [ 3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  4,  3,  3,  3,  3,  3,  4,  3,  3,  3,  3,  4,  3,  4,  3,  4,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3] },
  { chapter: "Solid State",                              total:  130, counts: [ 2,  3,  3,  4,  3,  3,  3,  3,  3,  3,  4,  3,  4,  4,  3,  3,  3,  3,  3,  4,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3] },
  { chapter: "Alcohols, Phenols and Ethers",             total:  126, counts: [ 4,  3,  3,  1,  2,  2,  3,  2,  4,  4,  3,  4,  3,  4,  3,  3,  2,  3,  2,  4,  2,  4,  4,  2,  3,  2,  3,  2,  3,  3,  3,  3,  3,  4,  3,  5,  1,  3,  5,  3,  2,  4] },
  { chapter: "Chemical Kinetics",                        total:  125, counts: [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  4,  2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3] },
  { chapter: "Electrochemistry",                         total:  122, counts: [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  4,  3,  3,  3,  2,  3,  3,  3,  3,  3,  3,  3,  3,  2,  3,  3,  3,  3,  2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  2,  3,  3,  3] },
  { chapter: "Ionic Equilibria",                         total:  122, counts: [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  2,  3,  3,  3,  2,  3,  3,  3,  3,  3,  2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3] },
  { chapter: "Chemical Thermodynamics and Energetics",   total:  121, counts: [ 2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  2,  3,  2,  3,  2,  3,  3,  2,  4,  3,  3,  3,  2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3] },
  { chapter: "Aldehydes, Ketones and Carboxylic Acids",  total:  109, counts: [ 4,  3,  4,  2,  4,  4,  3,  4,  3,  0,  1,  3,  3,  1,  2,  2,  3,  2,  3,  2,  3,  2,  3,  2,  3,  3,  3,  3,  3,  2,  2,  1,  4,  3,  2,  2,  3,  3,  1,  2,  4,  2] },
  { chapter: "Biomolecules",                             total:   88, counts: [ 2,  3,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  2,  3,  2,  3,  2,  2,  2,  2,  2,  3,  3,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2] },
  { chapter: "Coordination Compounds",                   total:   88, counts: [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  2,  2,  2] },
  { chapter: "Introduction to Polymer Chemistry",        total:   85, counts: [ 2,  3,  2,  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  3,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  3,  2,  2] },
  { chapter: "Amines",                                   total:   81, counts: [ 2,  1,  2,  2,  2,  2,  2,  3,  3,  1,  1,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  1,  2,  2,  2,  3,  1,  2,  1,  2,  2,  2,  2,  1,  2,  2,  3,  2,  2,  2,  2,  3] },
  { chapter: "Halogen Derivatives of Alkanes",           total:   79, counts: [ 1,  2,  1,  1,  2,  2,  3,  1,  2,  1,  1,  2,  3,  1,  4,  2,  2,  4,  1,  3,  3,  1,  1,  1,  1,  3,  2,  0,  1,  2,  3,  2,  3,  2,  1,  3,  4,  2,  1,  1,  2,  1] },
  { chapter: "Transition and Inner Transition Elements", total:   76, counts: [ 2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  3,  3,  2,  1,  1,  2,  1,  1,  2,  1,  2,  2,  1,  2,  2,  2,  2,  1,  2,  2,  1,  2,  2,  2] },
  { chapter: "Structure of Atom",                        total:   70, counts: [ 2,  1,  3,  2,  2,  2,  3,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0,  3,  2,  2,  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "Chemical Bonding and Molecular Structure", total:   64, counts: [ 2,  3,  1,  1,  2,  3,  2,  2,  3,  2,  1,  2,  2,  1,  1,  1,  2,  2,  1,  1,  2,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  3,  2,  1,  1,  1,  1,  1,  1,  2,  2,  1] },
  { chapter: "Some Basic Concepts of Chemistry",         total:   51, counts: [ 0,  0,  1,  2,  1,  1,  0,  1,  1,  1,  2,  1,  2,  1,  2,  1,  1,  1,  1,  2,  1,  2,  1,  1,  0,  1,  1,  1,  1,  2,  1,  1,  1,  2,  3,  1,  2,  1,  2,  1,  2,  1] },
  { chapter: "Elements of Group 16, 17 and 18",          total:   48, counts: [ 2,  1,  1,  1,  0,  1,  1,  1,  0,  0,  2,  1,  2,  1,  1,  1,  1,  0,  1,  2,  2,  1,  1,  1,  1,  0,  1,  2,  1,  1,  2,  1,  1,  2,  1,  1,  2,  2,  2,  0,  2,  1] },
  { chapter: "Redox Reactions",                          total:   44, counts: [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  2,  0,  0,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  0,  2,  1,  1,  1,  2,  2,  1,  2] },
  { chapter: "Surface Chemistry",                        total:   39, counts: [ 2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "Basic Principles of Organic Chemistry",    total:   38, counts: [ 2,  1,  0,  2,  2,  1,  0,  0,  0,  2,  1,  1,  0,  1,  2,  1,  0,  1,  1,  2,  0,  1,  0,  0,  1,  1,  1,  2,  1,  0,  2,  1,  1,  2,  1,  0,  0,  1,  0,  2,  1,  0] },
  { chapter: "Elements of Group 1 and 2",                total:   37, counts: [ 1,  1,  1,  1,  1,  1,  1,  0,  0,  1,  1,  1,  0,  1,  2,  1,  0,  1,  1,  1,  1,  1,  1,  0,  1,  2,  1,  1,  1,  1,  1,  0,  1,  1,  1,  2,  0,  1,  2,  1,  0,  0] },
  { chapter: "Alkanes",                                  total:   35, counts: [ 0,  0,  2,  2,  0,  1,  0,  0,  0,  1,  2,  1,  1,  1,  0,  0,  1,  1,  2,  0,  0,  2,  0,  1,  1,  1,  2,  1,  1,  1,  0,  2,  0,  1,  1,  1,  1,  2,  1,  0,  0,  1] },
  { chapter: "Alkenes",                                  total:   35, counts: [ 0,  2,  0,  1,  0,  0,  1,  2,  0,  2,  2,  0,  0,  2,  1,  1,  3,  0,  0,  0,  0,  1,  2,  0,  2,  0,  0,  2,  1,  1,  1,  0,  1,  1,  1,  1,  0,  0,  1,  1,  1,  1] },
  { chapter: "Aromatic Compounds",                       total:   35, counts: [ 1,  1,  1,  1,  0,  0,  1,  0,  2,  1,  1,  0,  1,  1,  0,  0,  0,  1,  1,  0,  3,  1,  2,  3,  1,  0,  1,  1,  0,  1,  0,  1,  0,  0,  2,  1,  0,  0,  2,  1,  0,  2] },
  { chapter: "Green Chemistry and Nanochemistry",        total:   33, counts: [ 2,  0,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  0,  0,  1,  1,  0,  0,  1,  1,  0,  0,  1,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1] },
  { chapter: "States of Matter",                         total:   31, counts: [ 2,  1,  1,  0,  1,  1,  1,  1,  0,  0,  1,  1,  0,  0,  1,  2,  2,  0,  1,  0,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  0,  0,  1,  0,  1,  0,  1,  1,  1] },
  { chapter: "Modern Periodic Table",                    total:   18, counts: [ 0,  0,  0,  0,  1,  0,  0,  1,  1,  1,  0,  1,  0,  1,  0,  1,  1,  0,  1,  0,  0,  0,  0,  1,  1,  2,  1,  0,  1,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1] },
  { chapter: "Alkynes",                                  total:   10, counts: [ 1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1,  1,  0] },
  { chapter: "Elements of Group 13, 14 and 15",          total:    3, counts: [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0] },
];

/** The same questions as questions-per-paper. Column i is YEAR_COLUMNS[i]. */
export const YEAR_RATES: YearRateRow[] = [
  { chapter: "Solutions and Colligative Properties",     total:  131, rates: [ 3.00,  3.00,  3.06,  3.36,  3.00] },
  { chapter: "Solid State",                              total:  130, rates: [ 2.00,  3.00,  3.25,  3.09,  3.00] },
  { chapter: "Alcohols, Phenols and Ethers",             total:  126, rates: [ 4.00,  3.00,  2.88,  2.82,  3.23] },
  { chapter: "Chemical Kinetics",                        total:  125, rates: [ 2.00,  3.00,  3.00,  3.00,  3.00] },
  { chapter: "Electrochemistry",                         total:  122, rates: [ 2.00,  3.00,  3.00,  2.82,  2.92] },
  { chapter: "Ionic Equilibria",                         total:  122, rates: [ 2.00,  3.00,  2.88,  2.91,  3.00] },
  { chapter: "Chemical Thermodynamics and Energetics",   total:  121, rates: [ 2.00,  3.00,  2.81,  2.91,  3.00] },
  { chapter: "Aldehydes, Ketones and Carboxylic Acids",  total:  109, rates: [ 4.00,  3.00,  2.56,  2.73,  2.38] },
  { chapter: "Biomolecules",                             total:   88, rates: [ 2.00,  3.00,  1.94,  2.18,  2.15] },
  { chapter: "Coordination Compounds",                   total:   88, rates: [ 2.00,  2.00,  2.06,  2.18,  2.08] },
  { chapter: "Introduction to Polymer Chemistry",        total:   85, rates: [ 2.00,  3.00,  1.94,  2.00,  2.08] },
  { chapter: "Amines",                                   total:   81, rates: [ 2.00,  1.00,  1.94,  1.82,  2.08] },
  { chapter: "Halogen Derivatives of Alkanes",           total:   79, rates: [ 1.00,  2.00,  2.00,  1.55,  2.08] },
  { chapter: "Transition and Inner Transition Elements", total:   76, rates: [ 2.00,  2.00,  1.88,  1.73,  1.77] },
  { chapter: "Structure of Atom",                        total:   70, rates: [ 2.00,  1.00,  2.06,  1.91,  1.00] },
  { chapter: "Chemical Bonding and Molecular Structure", total:   64, rates: [ 2.00,  3.00,  1.75,  1.18,  1.38] },
  { chapter: "Some Basic Concepts of Chemistry",         total:   51, rates: [ 0.00,  0.00,  1.19,  1.09,  1.54] },
  { chapter: "Elements of Group 16, 17 and 18",          total:   48, rates: [ 2.00,  1.00,  0.88,  1.18,  1.38] },
  { chapter: "Redox Reactions",                          total:   44, rates: [ 1.00,  1.00,  1.00,  0.91,  1.23] },
  { chapter: "Surface Chemistry",                        total:   39, rates: [ 2.00,  1.00,  0.88,  0.82,  1.00] },
  { chapter: "Basic Principles of Organic Chemistry",    total:   38, rates: [ 2.00,  1.00,  0.88,  0.91,  0.85] },
  { chapter: "Elements of Group 1 and 2",                total:   37, rates: [ 1.00,  1.00,  0.81,  1.00,  0.85] },
  { chapter: "Alkanes",                                  total:   35, rates: [ 0.00,  0.00,  0.81,  1.00,  0.85] },
  { chapter: "Alkenes",                                  total:   35, rates: [ 0.00,  2.00,  0.94,  0.73,  0.77] },
  { chapter: "Aromatic Compounds",                       total:   35, rates: [ 1.00,  1.00,  0.63,  1.18,  0.77] },
  { chapter: "Green Chemistry and Nanochemistry",        total:   33, rates: [ 2.00,  0.00,  0.81,  0.45,  1.00] },
  { chapter: "States of Matter",                         total:   31, rates: [ 2.00,  1.00,  0.75,  0.64,  0.69] },
  { chapter: "Modern Periodic Table",                    total:   18, rates: [ 0.00,  0.00,  0.50,  0.64,  0.23] },
  { chapter: "Alkynes",                                  total:   10, rates: [ 1.00,  0.00,  0.13,  0.36,  0.23] },
  { chapter: "Elements of Group 13, 14 and 15",          total:    3, rates: [ 0.00,  0.00,  0.06,  0.09,  0.08] },
];

/** Per-paper question totals — the matrix footer, and its completeness proof. */
export const PAPER_TOTALS: number[] = [50, 50, 50, 46, 50, 50, 50, 49, 50, 49, 48, 50, 50, 50, 47, 49, 50, 50, 50, 50, 50, 50, 50, 42, 50, 50, 50, 50, 49, 49, 50, 49, 50, 50, 50, 50, 48, 50, 49, 50, 50, 50];

export const MATRIX_META = {
  papers: 42,
  chapters: 30,
  questions: 2074,
  undatedPapers: 2,
  labelConflicts: 0,
} as const;
