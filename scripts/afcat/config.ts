// Registry for the AFCAT practice ingestion pipeline (exam "AFCAT", subject
// "Numerical Ability"). Runbook: scripts/afcat/README.md.
//
// Source: C:\Vilas\LWS_Pune\AFCAT_CDS\Subject_Content\Maths\Class_Notes\02. Arithmetic_Maths
// — one folder per topic, mixing three kinds of question source (see `Group`).
// Every row is question_kind='practice', committed PRIVATE until its key has
// been blind re-derived and reviewed. Questions a source tags as a CDS past-year
// question are NOT ingested here (owner's call, 2026-10-09).
//
// One chapter = one AFCAT topic. A chapter's files are numbered by their
// position in `files` (1-based): question ids are "<NN>-<printed number>", so an
// id points straight back to the file and the question as printed.
import { join } from "node:path";

export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f"; // LWS Pune
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_NAME = "AFCAT"; // resolved to its id at run time: the row is created by seed.ts
export const SUBJECT_NAME = "Numerical Ability"; // AFCAT's own name for the section

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\AFCAT_CDS\\Subject_Content\\Maths\\Class_Notes\\02. Arithmetic_Maths";
export const CADETPREP_ROOT = "C:\\Vilas\\LWS_Pune\\Cadetprep\\AFCAT\\Maths"; // Group D

/** The file on disk, whichever root it lives under. */
export function sourcePathOf(file: { path: string; root?: "cadetprep" }): string {
  return join(file.root === "cadetprep" ? CADETPREP_ROOT : SOURCE_ROOT, file.path);
}

export const OUT = join(__dirname, "out"); // gitignored: packets, agent output
export const DATA = join(__dirname, "data"); // committed: transcriptions, verdicts, overrides

/**
 * A: LWS's own quizzes (.docx) — clean text, but the answer keys were written
 *    by an AI and are measurably wrong (the Mixtures key disagrees with its own
 *    options on 13 of 30 rows).
 * B: "Errorless" sheets (.pdf, clean text layer) — key letters only, no solutions.
 * C: published books and other institutes' sheets (.pdf) — transcribed from
 *    page images because stacked fractions break the text layer.
 * D: Cadetprep AFCAT Excel sheets (CADETPREP_ROOT) — the LMS-export template
 *    the NDA worksheets use; one file is one subtopic, each row has an
 *    AI-written key and worked solution.
 */
export type Group = "A" | "B" | "C" | "D";

/** A literal repair to the source TEXT before parsing, kept here so it is reviewable. */
export type TextFix = { find: string; replace: string; reason: string };

export type FileEntry = {
  key: string; // names data/<chapter>/<key>.source.json
  group: Group;
  label: string; // what the file is, for reports
  path: string; // relative to SOURCE_ROOT (CADETPREP_ROOT when root is "cadetprep")
  root?: "cadetprep";
  /** Group D: the subtopic every row of the file carries (one file, one subtopic). */
  subtopic?: string;
  /** Group A: where the answer key is. A path (a separate _AK.docx), "embedded"
   *  (printed after an ANSWER KEY heading in the quiz), or "inline" ("Answer: X)"
   *  after each question). */
  answerKey?: string | "embedded" | "inline";
  textFixes?: TextFix[];
  note: string; // questions.pyq_note provenance (not published for practice rows)
};

export type Chapter = {
  id: string;
  chapterName: string; // canonical DB chapter (auto-created on first commit)
  subtopics: string[]; // the only subtopic names a row may carry
  files: FileEntry[]; // IN ORDER: index+1 is the NN in question ids
};

export const CHAPTERS: Record<string, Chapter> = {
  "time-and-work": {
    id: "time-and-work",
    chapterName: "Time and Work",
    subtopics: [
      "Work and Efficiency",
      "Combined Work",
      "Partial Work, Joining and Leaving",
      "Man-Days and Group Work",
      "Wages and Share of Work",
      "Pipes and Cisterns",
      "Working on Alternate Days",
    ],
    files: [
      {
        key: "lws-quiz",
        group: "A",
        label: "LWS Time and Work quiz (50 Q)",
        path: "12. Time and Work\\Quiz\\Time and Work_Quiz.docx",
        answerKey: "12. Time and Work\\Quiz\\Time and Work_Quiz_AK.docx",
        note: "AFCAT practice — LWS Pune quiz, Time and Work. Source key AI-written; every key blind re-derived.",
      },
      {
        key: "errorless",
        group: "B",
        label: "Time and Work Errorless sheet (6 types)",
        path: "12. Time and Work\\01. TIME & WORK ERRORLESS.pdf",
        textFixes: [
          { find: "A can finish a work in 36 days, and B can", replace: "11. A can finish a work in 36 days, and B can", reason: "Section 3: question 11 is printed without its number." },
        ],
        note: "AFCAT practice — Errorless sheet, Time and Work. Key letters only (four keys are pictures); every key blind re-derived.",
      },
      {
        // Work_and_Time_HW.pdf is pages 2-4 of this file.
        key: "book",
        group: "C",
        label: "Conquer the Sky AFCAT: Time and Work (model practice + AFCAT past years)",
        path: "12. Time and Work\\Work_and_Time_Arihant.pdf",
        note: "AFCAT practice — Conquer the Sky AFCAT (book chapter), Time and Work. Every key blind re-derived.",
      },
    ],
  },
  percentage: {
    id: "percentage",
    chapterName: "Percentage",
    subtopics: [
      "Basic Percentage Calculations",
      "Successive Percentage Change",
      "Comparing Two Quantities",
      "Income, Expenditure and Savings",
      "Price and Consumption",
      "Marks, Groups and Other Applications",
    ],
    files: [
      {
        key: "lws-quiz",
        group: "A",
        label: "LWS Percentage quiz (50 Q)",
        path: "04. Percentage\\Quiz\\Percentage_Quiz.docx",
        answerKey: "04. Percentage\\Quiz\\Percentage_Quiz_AK.docx",
        note: "AFCAT practice — LWS Pune quiz, Percentage. Source key AI-written; every key blind re-derived.",
      },
      {
        key: "pathfinder",
        group: "C",
        label: "CDS Pathfinder: Percentage (practice exercise)",
        path: "04. Percentage\\Percentages_Practice_Questions_CDS.pdf",
        note: "AFCAT practice — CDS Pathfinder (book chapter), Percentage. Every key blind re-derived.",
      },
      {
        key: "book",
        group: "C",
        label: "Conquer the Sky AFCAT: Percentage (model practice + AFCAT past years)",
        path: "04. Percentage\\Percentages_AFCAT.pdf",
        note: "AFCAT practice — Conquer the Sky AFCAT (book chapter), Percentage. Every key blind re-derived.",
      },
    ],
  },
  "mixture-and-alligation": {
    id: "mixture-and-alligation",
    chapterName: "Mixture and Alligation",
    subtopics: [
      "Mean Price and Mean Concentration",
      "Rule of Alligation",
      "Adding to a Mixture",
      "Removal and Replacement",
      "Profit and Loss on Mixtures",
    ],
    files: [
      {
        key: "lws-quiz",
        group: "A",
        label: "LWS Mixture and Alligation quiz (30 Q)",
        path: "11. Mixture and Alligations\\Quiz\\Mixture_and_Alligations_30Q.docx",
        answerKey: "11. Mixture and Alligations\\Quiz\\Mixture_and_Alligations_30Q_ak.docx",
        note: "AFCAT practice — LWS Pune quiz, Mixture and Alligation. Source key AI-written; every key blind re-derived.",
      },
      {
        key: "errorless",
        group: "B",
        label: "Mixture and Alligation Errorless sheet (3 types)",
        path: "11. Mixture and Alligations\\Mixture & Alligation Errorless.pdf",
        note: "AFCAT practice — Errorless sheet, Mixture and Alligation. Key letters only; every key blind re-derived.",
      },
      {
        // The only copy of this Conquer the Sky chapter in the folder is the _HW file.
        key: "book",
        group: "C",
        label: "Conquer the Sky AFCAT: Mixture and Alligation (model practice + AFCAT past years)",
        path: "11. Mixture and Alligations\\AFCAT_Mixture and Alligations_HW.pdf",
        note: "AFCAT practice — Conquer the Sky AFCAT (book chapter), Mixture and Alligation. Every key blind re-derived.",
      },
      {
        key: "cp-adding",
        group: "D",
        root: "cadetprep",
        label: "Cadetprep AFCAT: Adding One Component, Ratio Change",
        path: "09. Mixture&Alligation\\Adding1component&ratiochange.xls",
        subtopic: "Adding to a Mixture",
        note: "AFCAT practice — Cadetprep AFCAT sheet, Mixture and Alligation. Every key blind re-derived.",
      },
      {
        key: "cp-other",
        group: "D",
        root: "cadetprep",
        label: "Cadetprep AFCAT: Change in Ratio after Adding Other Things",
        path: "09. Mixture&Alligation\\Change in Ratio after Adding Other things.xls",
        subtopic: "Adding to a Mixture",
        note: "AFCAT practice — Cadetprep AFCAT sheet, Mixture and Alligation. Every key blind re-derived.",
      },
      {
        key: "cp-mixing",
        group: "D",
        root: "cadetprep",
        label: "Cadetprep AFCAT: Mixing Mixtures",
        path: "09. Mixture&Alligation\\MixingtoMixtures.xls",
        subtopic: "Mean Price and Mean Concentration",
        note: "AFCAT practice — Cadetprep AFCAT sheet, Mixture and Alligation. Every key blind re-derived.",
      },
    ],
  },
  "simple-and-compound-interest": {
    id: "simple-and-compound-interest",
    chapterName: "Simple and Compound Interest",
    subtopics: [
      "Simple Interest: Interest and Amount",
      "Simple Interest: Finding Principal, Rate or Time",
      "Compound Interest: Annual",
      "Compounding Half-Yearly or Quarterly",
      "Difference Between CI and SI",
    ],
    files: [
      {
        key: "lws-quiz",
        group: "A",
        label: "LWS Simple and Compound Interest quiz (30 Q, v2)",
        path: "08. Simple Interest\\Quiz\\SI_CI_Quiz_30Q_v2.docx",
        answerKey: "08. Simple Interest\\Quiz\\SI_CI_Quiz_30Q_v2_ak.docx",
        note: "AFCAT practice — LWS Pune quiz, Simple and Compound Interest. Source key AI-written; every key blind re-derived.",
      },
      {
        key: "si-errorless",
        group: "B",
        label: "Simple Interest Errorless sheet (4 types)",
        path: "08. Simple Interest\\SI Errorless.pdf",
        note: "AFCAT practice — Errorless sheet, Simple Interest. Key letters only; every key blind re-derived.",
      },
      {
        key: "ci-errorless",
        group: "B",
        label: "Compound Interest Errorless sheet (3 types)",
        path: "09. Compound Interest\\CI Final Errorless.pdf",
        note: "AFCAT practice — Errorless sheet, Compound Interest. Key letters only; every key blind re-derived.",
      },
      {
        // SI_CI_HW.pdf is pages 3-5 of this file.
        key: "book",
        group: "C",
        label: "Conquer the Sky AFCAT: Simple and Compound Interest (model practice + AFCAT past years)",
        path: "08. Simple Interest\\SI_CI_Arihant.pdf",
        note: "AFCAT practice — Conquer the Sky AFCAT (book chapter), Simple and Compound Interest. Every key blind re-derived.",
      },
    ],
  },
  probability: {
    id: "probability",
    chapterName: "Probability",
    subtopics: [
      "Coin Tosses",
      "Dice",
      "Playing Cards",
      "Drawing from a Bag",
      "Numbers and Spinners",
      "Probability Rules",
    ],
    files: [
      {
        key: "lws-quiz",
        group: "A",
        label: "LWS Probability quiz (30 Q)",
        path: "13. Probability\\Quiz\\Probability_30Q.docx",
        answerKey: "13. Probability\\Quiz\\Probability_30Q_ak.docx",
        note: "AFCAT practice — LWS Pune quiz, Probability. Source key AI-written; every key blind re-derived.",
      },
      // The *_old.xls siblings are earlier versions of these four sheets; not used.
      { key: "cp-cards", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Cards", path: "10. Probability\\1)Cards.xlsx", subtopic: "Playing Cards", note: "AFCAT practice — Cadetprep AFCAT sheet, Probability. Every key blind re-derived." },
      { key: "cp-coins", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Coins", path: "10. Probability\\2)Coins.xlsx", subtopic: "Coin Tosses", note: "AFCAT practice — Cadetprep AFCAT sheet, Probability. Every key blind re-derived." },
      { key: "cp-dice", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Dice", path: "10. Probability\\3)Dice .xlsx", subtopic: "Dice", note: "AFCAT practice — Cadetprep AFCAT sheet, Probability. Every key blind re-derived." },
      { key: "cp-balls", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Balls", path: "10. Probability\\4)Ball.xlsx", subtopic: "Drawing from a Bag", note: "AFCAT practice — Cadetprep AFCAT sheet, Probability. Every key blind re-derived." },
    ],
  },
  "profit-and-loss": {
    id: "profit-and-loss",
    chapterName: "Profit and Loss",
    subtopics: [
      "Profit and Loss Percentage",
      "Discount and Successive Discounts",
      "Marked Price with Discount and Profit",
      "Finding Cost Price from Conditions",
      "Combined Transactions",
      "Rates, Weights and Special Cases",
    ],
    files: [
      {
        // document (9).docx in the same folder is an earlier draft of this quiz
        // with answers inline; v1 + its _ak table is the finished pair.
        key: "lws-quiz",
        group: "A",
        label: "LWS Profit and Loss quiz (50 Q, v1)",
        path: "06. Profit and Loss\\Quiz\\Profti_and_Loss_Quiz_v1.docx",
        answerKey: "06. Profit and Loss\\Quiz\\Profti_and_Loss_Quiz_v1_ak.docx",
        textFixes: [
          { find: "(b) 2.2 kg", replace: "(c) 2.2 kg", reason: "Q22 printed the label (b) twice; the third option is (c)." },
        ],
        note: "AFCAT practice — LWS Pune quiz, Profit and Loss. Source key AI-written; every key blind re-derived.",
      },
      {
        key: "book",
        group: "C",
        label: "Conquer the Sky AFCAT: Profit and Loss (model practice + AFCAT past years)",
        path: "06. Profit and Loss\\Profit_n_Loss.pdf",
        note: "AFCAT practice — Conquer the Sky AFCAT (book chapter), Profit and Loss. Every key blind re-derived.",
      },
    ],
  },
  "speed-time-and-distance": {
    id: "speed-time-and-distance",
    chapterName: "Speed, Time and Distance",
    subtopics: [
      "Speed, Distance and Unit Conversion",
      "Average Speed",
      "Trains",
      "Boats and Streams",
      "Relative Speed and Meeting",
      "Late, Early and Changed Speed",
      "Races",
      "Journeys in Parts",
    ],
    files: [
      {
        // SDT_Quiz_v2.docx is the same 50 questions re-laid-out without a key
        // (text identical, checked 2026-10-14); SDT_Quiz_Soln.docx has no text.
        key: "lws-quiz",
        group: "A",
        label: "LWS Speed, Time and Distance quiz (50 Q)",
        path: "07. Speed, Time and Distance\\Quiz\\SDT_Quiz.docx",
        answerKey: "embedded",
        note: "AFCAT practice — LWS Pune quiz, Speed, Time and Distance. Source key AI-written; every key blind re-derived.",
      },
      {
        // Named "BOAT" but its two sections are races and late/early arrival.
        key: "errorless",
        group: "B",
        label: "Speed, Time and Distance Errorless sheet (races, late and early)",
        path: "BOAT ERRORLESS.pdf",
        note: "AFCAT practice — Errorless sheet, Speed, Time and Distance. Key letters only; every key blind re-derived.",
      },
      {
        key: "errorless-2",
        group: "B",
        label: "Speed, Distance and Time Errorless sheet (second)",
        path: "07. Speed, Time and Distance\\SPEED,DISTANCE AND TIME err.pdf",
        note: "AFCAT practice — Errorless sheet (second), Speed, Time and Distance. Key letters only; every key blind re-derived.",
      },
      {
        // The only copy of this Conquer the Sky chapter in the folder is the _HW file.
        key: "book",
        group: "C",
        label: "Conquer the Sky AFCAT: Speed, Time and Distance (model practice + AFCAT past years)",
        path: "07. Speed, Time and Distance\\SDT_AFCAT_HW.pdf",
        note: "AFCAT practice — Conquer the Sky AFCAT (book chapter), Speed, Time and Distance. Every key blind re-derived.",
      },
    ],
  },
  "decimal-and-fractions": {
    id: "decimal-and-fractions",
    chapterName: "Decimal and Fractions",
    subtopics: ["Fractions", "Decimals", "Simplification", "Squares, Cubes and Roots", "Decimal and Fraction Conversion", "Comparing and Ordering", "Decimals and Percentages"],
    files: [
      {
        // A chapter of the published book "Conquer the Sky AFCAT"; transcribed
        // from page images (stacked fractions break the text layer).
        key: "book",
        group: "C",
        label: "Conquer the Sky AFCAT: Decimal and Fractions (model practice + AFCAT past years)",
        path: "01. Decimal and Fractions\\Decimal and Fractions_AFCAT.pdf",
        note: "AFCAT practice — Conquer the Sky AFCAT (book chapter), Decimal and Fractions. Every key blind re-derived.",
      },
      { key: "cp-basics", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Decimal Fractions Basics", path: "00. Decimal_Fractions\\01. Decimal Fractions Basics.xlsx", subtopic: "Decimals", note: "AFCAT practice — Cadetprep AFCAT sheet, Decimal and Fractions. Every key blind re-derived." },
      { key: "cp-conversion", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Conversion of Decimal Fractions", path: "00. Decimal_Fractions\\02. Conversion of Decimal Fractions.xlsx", subtopic: "Decimal and Fraction Conversion", note: "AFCAT practice — Cadetprep AFCAT sheet, Decimal and Fractions. Every key blind re-derived." },
      { key: "cp-operations", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Operations on Decimal Fractions", path: "00. Decimal_Fractions\\03. Operations on Decimal Fractions.xlsx", subtopic: "Decimals", note: "AFCAT practice — Cadetprep AFCAT sheet, Decimal and Fractions. Every key blind re-derived." },
      { key: "cp-comparing", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Comparing and Ordering", path: "00. Decimal_Fractions\\04. Comparing and Ordering.xlsx", subtopic: "Comparing and Ordering", note: "AFCAT practice — Cadetprep AFCAT sheet, Decimal and Fractions. Every key blind re-derived." },
      { key: "cp-percent", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Decimals and Percentages", path: "00. Decimal_Fractions\\05. Decimal and Percentages.xlsx", subtopic: "Decimals and Percentages", note: "AFCAT practice — Cadetprep AFCAT sheet, Decimal and Fractions. Every key blind re-derived." },
    ],
  },
  "lcm-and-hcf": {
    id: "lcm-and-hcf",
    chapterName: "LCM and HCF",
    subtopics: ["HCF", "LCM", "HCF and LCM Together"],
    files: [
      {
        key: "book",
        group: "C",
        label: "Conquer the Sky AFCAT: HCF and LCM (model practice + AFCAT past years)",
        path: "02. LCM and HCF\\HCF and LCM.pdf",
        note: "AFCAT practice — Conquer the Sky AFCAT (book chapter), LCM and HCF. Every key blind re-derived.",
      },
    ],
  },
  "sequence-and-series": {
    id: "sequence-and-series",
    chapterName: "Sequence and Series",
    subtopics: ["Arithmetic Progression", "Geometric Progression", "Harmonic Progression and Means", "Special Series"],
    files: [
      {
        // CDS Pathfinder chapter; the same file sits in 14. Number_System and
        // 17. Number Series. Practice exercise only: its "Previous Years
        // Questions" are CDS papers, left out (owner, 2026-10-14).
        key: "book",
        group: "C",
        label: "CDS Pathfinder: Sequence and Series (practice exercise)",
        path: "14. Number_System\\02_Sequence_and_Series.pdf",
        note: "AFCAT practice — CDS Pathfinder (book chapter), Sequence and Series. Every key blind re-derived.",
      },
    ],
  },
  "squares-and-roots": {
    id: "squares-and-roots",
    chapterName: "Squares, Cubes and Roots",
    subtopics: ["Squares and Square Roots", "Cubes and Cube Roots", "Surds and Indices"],
    files: [
      {
        // CDS Pathfinder chapter; practice exercise only (its CDS past-year
        // section is left out). The _HW file in the same folder is a copy of
        // these exercise pages.
        key: "book",
        group: "C",
        label: "CDS Pathfinder: Square Roots and Cube Roots (practice exercise)",
        path: "16. Square_Square_Roots_Cube_Cube_Roots\\05_Square_roots_cube_roots.pdf",
        note: "AFCAT practice — CDS Pathfinder (book chapter), Squares, Cubes and Roots. Every key blind re-derived.",
      },
    ],
  },
  "heights-and-distances": {
    id: "heights-and-distances",
    chapterName: "Heights and Distances",
    subtopics: ["Angle of Elevation", "Angle of Depression", "Moving Objects and Speed"],
    files: [
      {
        key: "book",
        group: "C",
        label: "CDS Pathfinder: Height and Distance (practice exercise)",
        path: "19. Height_and_Distance\\21_Height_&_Distance.pdf",
        note: "AFCAT practice — CDS Pathfinder (book chapter), Heights and Distances. Every key blind re-derived.",
      },
    ],
  },
  statistics: {
    id: "statistics",
    chapterName: "Statistics",
    subtopics: ["Data and Classification", "Graphs and Diagrams", "Mean", "Median and Mode", "Standard Deviation"],
    files: [
      {
        key: "book",
        group: "C",
        label: "CDS Pathfinder: Statistics (practice exercise)",
        path: "18. Statistics (Mean, Mode, Median)\\28_Statistics.pdf",
        note: "AFCAT practice — CDS Pathfinder (book chapter), Statistics. Every key blind re-derived.",
      },
    ],
  },
  "area-and-perimeter": {
    id: "area-and-perimeter",
    chapterName: "Area and Perimeter",
    subtopics: ["Triangles and Quadrilaterals", "Circles and Sectors", "Combined Figures", "Change in Dimensions"],
    files: [
      {
        key: "book",
        group: "C",
        label: "CDS Pathfinder: Area and Perimeter of Plane Figures (practice exercise)",
        path: "20. Mensuration\\26_Area_&_Perimeter_of_Plane_Figure.pdf",
        note: "AFCAT practice — CDS Pathfinder (book chapter), Area and Perimeter. Every key blind re-derived.",
      },
    ],
  },
  "surface-area-and-volume": {
    id: "surface-area-and-volume",
    chapterName: "Surface Area and Volume",
    subtopics: ["Cube and Cuboid", "Cylinder", "Cone and Frustum", "Sphere and Hemisphere", "Combined Solids and Recasting"],
    files: [
      {
        key: "book",
        group: "C",
        label: "CDS Pathfinder: Surface Area and Volume of Solids (practice exercise)",
        path: "20. Mensuration\\27_Surface_Area_&_Volume_of_Solids.pdf",
        note: "AFCAT practice — CDS Pathfinder (book chapter), Surface Area and Volume. Every key blind re-derived.",
      },
    ],
  },
  average: {
    id: "average",
    chapterName: "Average",
    subtopics: [
      "Consecutive Numbers",
      "Largest and Smallest Numbers",
      "Members Joining or Leaving",
      "Cricket Scores",
      "Highest and Lowest Scores",
      "Correcting an Error",
      "Average of First or Last N Numbers",
      "Combined and Group Averages",
      "Replacing a Member",
      "Ages",
    ],
    files: [
      {
        key: "errorless",
        group: "B",
        label: "Average Errorless sheet",
        path: "05. Average\\04. AVERAGE ERR.pdf",
        note: "AFCAT practice — Errorless sheet, Average. Key letters only; every key blind re-derived.",
      },
      {
        key: "book",
        group: "C",
        label: "Conquer the Sky AFCAT: Averages (model practice + AFCAT past years)",
        path: "05. Average\\Averages_AFCAT.pdf",
        note: "AFCAT practice — Conquer the Sky AFCAT (book chapter), Average. Every key blind re-derived.",
      },
    ],
  },
  clock: {
    id: "clock",
    chapterName: "Clock",
    subtopics: ["Angle Between the Hands", "Faulty Clocks", "Gain and Loss of Time", "Angle Covered by the Hands", "Time Reasoning"],
    files: [
      {
        key: "errorless",
        group: "B",
        label: "Clock Errorless sheet (4 types)",
        path: "02. CLOCK ERRORLESS.pdf",
        note: "AFCAT practice — Errorless sheet, Clock. Key letters only; every key blind re-derived.",
      },
      {
        // Clock_HW.pdf is pages 2-3 of this file. Its Calendar questions (Q7-15) and
        // all its AFCAT past-year questions (Calendar, Reasoning section) are not taken:
        // AFCAT asks Calendar under Reasoning, and this bank's AFCAT subject is
        // Numerical Ability.
        key: "book",
        group: "C",
        label: "Conquer the Sky AFCAT: Clock (model practice, Clock part only)",
        path: "10. Clock\\Arihant_Clock.pdf",
        note: "AFCAT practice — Conquer the Sky AFCAT (book chapter), Clock. Every key blind re-derived.",
      },
    ],
  },
  "ratio-and-proportion": {
    id: "ratio-and-proportion",
    chapterName: "Ratio and Proportion",
    subtopics: [
      "Dividing in a Given Ratio",
      "Duplicate, Triplicate and Other Ratios",
      "Combining Ratios",
      "Proportionals",
      "Algebraic Ratio Expressions",
      "Change in Ratio and Ages",
      "Partnership",
      "Variation and Work",
      "Mixtures and Coins",
      "Income, Expenditure and Savings",
      "Ratio Basics and Simplification",
    ],
    files: [
      {
        // Quiz\R&P_cds_afcat.docx (2025-11-06) carries the same 50 questions;
        // its key differs on one line. This copy (2025-11-12) is the newer.
        key: "lws-quiz",
        group: "A",
        label: "LWS Ratio and Proportion test (50 Q)",
        path: "03. Ratio\\R&P_Quiz.docx",
        answerKey: "embedded",
        note: "AFCAT practice — LWS Pune quiz, Ratio and Proportion. Source key AI-written; every key blind re-derived.",
      },
      {
        key: "errorless",
        group: "B",
        label: "Ratio Errorless sheet (4 types)",
        path: "03. Ratio\\Ratio Errorless_AFCAT_HW.pdf",
        textFixes: [{ find: "a)₹320", replace: "a) ₹320", reason: "Section 1 Q12: no space after the option marker, which the parser does not accept." }],
        note: "AFCAT practice — Errorless sheet, Ratio. Key letters only; every key blind re-derived.",
      },
      {
        key: "pathfinder",
        group: "C",
        label: "CDS Pathfinder: Ratio and Proportion (practice exercise)",
        path: "03. Ratio\\12_Ratio_&_Proportions_CDS.pdf",
        note: "AFCAT practice — CDS Pathfinder (book chapter), Ratio and Proportion. Every key blind re-derived.",
      },
      {
        // Ratio_and_Proportion_AFCAT_HW.pdf is pages 2-4 of this file.
        key: "book",
        group: "C",
        label: "Conquer the Sky AFCAT: Ratio and Proportion (model practice + AFCAT past years)",
        path: "03. Ratio\\Ratio_and_Proportion_AFCAT.pdf",
        note: "AFCAT practice — Conquer the Sky AFCAT (book chapter), Ratio and Proportion. Every key re-derived.",
      },
      {
        key: "cp-basics",
        group: "D",
        root: "cadetprep",
        label: "Cadetprep AFCAT: Ratio Basics",
        path: "01. Ratio and Proportion\\01. Basics.xlsx",
        subtopic: "Ratio Basics and Simplification",
        note: "AFCAT practice — Cadetprep AFCAT sheet, Ratio and Proportion. Every key blind re-derived.",
      },
      {
        key: "cp-proportion",
        group: "D",
        root: "cadetprep",
        label: "Cadetprep AFCAT: Proportion Fundamentals",
        path: "01. Ratio and Proportion\\02. Proportion Fundamentals.xlsx",
        subtopic: "Proportionals",
        note: "AFCAT practice — Cadetprep AFCAT sheet, Ratio and Proportion. Every key blind re-derived.",
      },
      {
        key: "cp-compound",
        group: "D",
        root: "cadetprep",
        label: "Cadetprep AFCAT: Compound Ratios",
        path: "01. Ratio and Proportion\\03. Compound Ratios.xlsx",
        subtopic: "Combining Ratios",
        note: "AFCAT practice — Cadetprep AFCAT sheet, Ratio and Proportion. Every key blind re-derived.",
      },
    ],
  },
};

export function requireChapter(id: string | undefined): Chapter {
  const c = id ? CHAPTERS[id] : undefined;
  if (!c) throw new Error(`unknown chapter "${id}". Known: ${Object.keys(CHAPTERS).join(", ")}`);
  return c;
}

/** questions.source_file + upload_jobs.filename: one per FILE, so a file rolls back alone. */
export function sourceFileOf(chapter: Chapter, file: FileEntry): string {
  return `AFCAT_${chapter.chapterName.replace(/[^A-Za-z0-9]+/g, "_")}__${file.key}`;
}

export function fileIndexOf(chapter: Chapter, file: FileEntry): number {
  return chapter.files.indexOf(file) + 1;
}
