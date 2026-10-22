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
      { key: "cp-left", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: People Leaving Work", path: "08. Time & Work\\1)People-left-work.xls", subtopic: "Partial Work, Joining and Leaving", note: "AFCAT practice — Cadetprep AFCAT sheet, Time and Work. Every key blind re-derived." },
      { key: "cp-left-before", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: People Leaving Before Completion", path: "08. Time & Work\\2)People-Left-before-completing-work.xls", subtopic: "Partial Work, Joining and Leaving", note: "AFCAT practice — Cadetprep AFCAT sheet, Time and Work. Every key blind re-derived." },
      { key: "cp-alternate", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Alternate-Day Working", path: "08. Time & Work\\3)Alternate-Day-working.xls", subtopic: "Working on Alternate Days", note: "AFCAT practice — Cadetprep AFCAT sheet, Time and Work. Every key blind re-derived." },
      { key: "cp-efficiency", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Efficiency-Based Questions", path: "08. Time & Work\\4)Efficiency-based-Questions.xls", subtopic: "Work and Efficiency", note: "AFCAT practice — Cadetprep AFCAT sheet, Time and Work. Every key blind re-derived." },
      { key: "cp-mwc", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Men, Women and Children", path: "08. Time & Work\\5)Men-Women-Child.xls", subtopic: "Man-Days and Group Work", note: "AFCAT practice — Cadetprep AFCAT sheet, Time and Work. Every key blind re-derived." },
      { key: "cp-mdh", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: M1D1 = M2D2", path: "08. Time & Work\\6)M1D1-M2D2.xls", subtopic: "Man-Days and Group Work", note: "AFCAT practice — Cadetprep AFCAT sheet, Time and Work. Every key blind re-derived." },
      { key: "cp-combined", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Combined Work", path: "08. Time & Work\\7)Combined-People.xls", subtopic: "Combined Work", note: "AFCAT practice — Cadetprep AFCAT sheet, Time and Work. Every key blind re-derived." },
      { key: "cp-pipes", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Pipes and Cisterns", path: "08. Time & Work\\8)Pipes-Cisterns.xls", subtopic: "Pipes and Cisterns", note: "AFCAT practice — Cadetprep AFCAT sheet, Time and Work. Every key blind re-derived." },
      { key: "cp-interval", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Interval and Scheduled Work", path: "08. Time & Work\\9)Interval-ScehduledWork.xls", subtopic: "Working on Alternate Days", note: "AFCAT practice — Cadetprep AFCAT sheet, Time and Work. Every key blind re-derived." },
      { key: "cp-workpct", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Work as a Percentage", path: "08. Time & Work\\10)Percentaged-Work.xls", subtopic: "Work and Efficiency", note: "AFCAT practice — Cadetprep AFCAT sheet, Time and Work. Every key blind re-derived." },
    ],
  },
  percentage: {
    id: "percentage",
    chapterName: "Percentage",
    subtopics: [
      "Basic Percentage Calculations",
      "Percentage Change and Comparison",
      "Successive Change, Price and Consumption",
      "Population and Growth",
      "Budgets, Savings and Groups",
      "Marks and Elections",
      "Profit, Loss and Discount",
      "Mixtures and Solutions",
      "Interest, Work and Speed",
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
      { key: "cp-basics", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Percentage Fundamentals", path: "02. Percentages\\01.AFCAT-BasicsPercentageFundamentals.xls", subtopic: "Basic Percentage Calculations", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
      { key: "cp-change", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Percentage Change and Variation", path: "02. Percentages\\02.Percentages-Change &Variation.xls", subtopic: "Successive Change, Price and Consumption", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
      { key: "cp-mixture", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Concentration and Mixtures", path: "02. Percentages\\03.Concentration&Mixture Problems.xls", subtopic: "Applications in Other Topics", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
      { key: "cp-discount", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Discount and Pricing", path: "02. Percentages\\04.Discount and Pricing.xls", subtopic: "Applications in Other Topics", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
      { key: "cp-distrib", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Percentage Distribution", path: "02. Percentages\\05.Percentage-Distribution.xls", subtopic: "Marks and Elections", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
      { key: "cp-pl", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Profit and Loss with Percentages", path: "02. Percentages\\06.Percentages-Profit&LosswithPercentages.xls", subtopic: "Applications in Other Topics", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
      { key: "cp-interest", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Interest with Percentages", path: "02. Percentages\\07.SimpleandCompoundInterestPercentages.xls", subtopic: "Applications in Other Topics", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
      { key: "cp-distrib-2", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Percentage Distribution (2)", path: "02. Percentages\\08.Percentage Distribution.xlsx", subtopic: "Marks and Elections", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
      { key: "cp-work", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Work and Time with Percentages", path: "02. Percentages\\09.Work and Time with Percentages.xls", subtopic: "Applications in Other Topics", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
      { key: "cp-speed", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Speed, Time and Distance with Percentages", path: "02. Percentages\\10.Speed,Time, DistancewithPercentages.xls", subtopic: "Applications in Other Topics", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
      { key: "cp-population", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Population and Growth", path: "02. Percentages\\11.Population&GrowthProblems.xls", subtopic: "Population and Growth", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
      { key: "cp-salary", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Salary and Income", path: "02. Percentages\\12Salary and Income Problems.xls", subtopic: "Budgets, Savings and Groups", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
      { key: "cp-marks", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Examination and Marks", path: "02. Percentages\\13-Examination and Marks.xls", subtopic: "Marks and Elections", note: "AFCAT practice — Cadetprep AFCAT sheet, Percentages. Every key blind re-derived." },
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
      "Simple Interest: Changing the Rate, Time or Sum",
      "Simple Interest: Sum Becoming n Times",
      "Compound Interest: Annual",
      "Compound Interest: Sum Becoming n Times",
      "Difference Between CI and SI",
      "Compounding Half-Yearly or Quarterly",
      "Instalments",
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
      { key: "cp-si-ntimes", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Sum N Times in Years (SI)", path: "06. Simple Interest\\1)Sum-Ntimes-InYears.xls", subtopic: "Simple Interest: Finding Principal, Rate or Time", note: "AFCAT practice — Cadetprep AFCAT sheet, Simple Interest. Every key blind re-derived." },
      { key: "cp-si-diff", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Difference of Rate, Time, Interest (SI)", path: "06. Simple Interest\\2)Differenceof-Rate-Time-Interest.xls", subtopic: "Simple Interest: Finding Principal, Rate or Time", note: "AFCAT practice — Cadetprep AFCAT sheet, Simple Interest. Every key blind re-derived." },
      { key: "cp-si-amounts", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Sum and Amounts (SI)", path: "06. Simple Interest\\3)Sum-Amounts.xls", subtopic: "Simple Interest: Interest and Amount", note: "AFCAT practice — Cadetprep AFCAT sheet, Simple Interest. Every key blind re-derived." },
      { key: "cp-si-levels", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Rates at Different Levels (SI)", path: "06. Simple Interest\\4)Rates-At-Different-levels.xls", subtopic: "Simple Interest: Interest and Amount", note: "AFCAT practice — Cadetprep AFCAT sheet, Simple Interest. Every key blind re-derived." },
      { key: "cp-si-time", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Time Period Variations (SI)", path: "06. Simple Interest\\5)Time-period-Variations.xls", subtopic: "Simple Interest: Finding Principal, Rate or Time", note: "AFCAT practice — Cadetprep AFCAT sheet, Simple Interest. Every key blind re-derived." },
      { key: "cp-ci-diff", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Difference of SI and CI", path: "07. Compound Interest\\1)Difference-SI&CI.xls", subtopic: "Difference Between CI and SI", note: "AFCAT practice — Cadetprep AFCAT sheet, Compound Interest. Every key blind re-derived." },
      { key: "cp-ci-ntimes", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Sum Becomes N Times (CI)", path: "07. Compound Interest\\2)Sum-becomes-N-Times.xls", subtopic: "Compound Interest: Annual", note: "AFCAT practice — Cadetprep AFCAT sheet, Compound Interest. Every key blind re-derived." },
      { key: "cp-ci-change", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Change in Interest (CI)", path: "07. Compound Interest\\3)Change-in-Interest.xls", subtopic: "Compound Interest: Annual", note: "AFCAT practice — Cadetprep AFCAT sheet, Compound Interest. Every key blind re-derived." },
      { key: "cp-ci-instal", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Instalments (CI)", path: "07. Compound Interest\\4)Installment-based-CI.xls", subtopic: "Instalments", note: "AFCAT practice — Cadetprep AFCAT sheet, Compound Interest. Every key blind re-derived." },
      { key: "cp-ci-multi", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Multiple Investments (CI)", path: "07. Compound Interest\\5)Multiple-Investments.xls", subtopic: "Compound Interest: Annual", note: "AFCAT practice — Cadetprep AFCAT sheet, Compound Interest. Every key blind re-derived." },
      { key: "cp-ci-rate", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Rate Conversion (CI)", path: "07. Compound Interest\\6)Rate-Conversion.xls", subtopic: "Compounding Half-Yearly or Quarterly", note: "AFCAT practice — Cadetprep AFCAT sheet, Compound Interest. Every key blind re-derived." },
      { key: "cp-ci-adv", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Advanced Formulae (CI)", path: "07. Compound Interest\\7)Advanced-Formulae.xls", subtopic: "Compound Interest: Annual", note: "AFCAT practice — Cadetprep AFCAT sheet, Compound Interest. Every key blind re-derived." },
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
      "Finding Cost Price from Conditions",
      "Articles and Rates",
      "Marked Price and Discounts",
      "Combined Transactions",
      "Mixed Lots and Mixtures",
      "Dishonest Dealers and False Weights",
      "Partnership and Profit Sharing",
      "Instalments and Special Cases",
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
      { key: "cp-two", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Two Articles", path: "04. Profit&Loss\\1)Two-things.xls", subtopic: "Combined Transactions", note: "AFCAT practice — Cadetprep AFCAT sheet, Profit and Loss. Every key blind re-derived." },
      { key: "cp-respective", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Respective Profit and Loss", path: "04. Profit&Loss\\2) Respective-Profit&loss.xls", subtopic: "Profit and Loss Percentage", note: "AFCAT practice — Cadetprep AFCAT sheet, Profit and Loss. Every key blind re-derived." },
      { key: "cp-qtyprice", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Different Quantity and Price", path: "04. Profit&Loss\\3)Different-Quantity&Price.xls", subtopic: "Mixed Lots and Mixtures", note: "AFCAT practice — Cadetprep AFCAT sheet, Profit and Loss. Every key blind re-derived." },
      { key: "cp-dishonest", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Dishonest Seller", path: "04. Profit&Loss\\4)Dishonest-Seller.xls", subtopic: "Mixed Lots and Mixtures", note: "AFCAT practice — Cadetprep AFCAT sheet, Profit and Loss. Every key blind re-derived." },
      { key: "cp-oldnew", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Old and New Price", path: "04. Profit&Loss\\5)Old&New-Price.xls", subtopic: "Finding Cost Price from Conditions", note: "AFCAT practice — Cadetprep AFCAT sheet, Profit and Loss. Every key blind re-derived." },
      { key: "cp-equal", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Profit Equality", path: "04. Profit&Loss\\6)Profit-Equality.xls", subtopic: "Finding Cost Price from Conditions", note: "AFCAT practice — Cadetprep AFCAT sheet, Profit and Loss. Every key blind re-derived." },
      { key: "cp-cpsp", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: CP and SP Equality", path: "04. Profit&Loss\\7)CP-Sp-Equality.xls", subtopic: "Profit and Loss Percentage", note: "AFCAT practice — Cadetprep AFCAT sheet, Profit and Loss. Every key blind re-derived." },
      { key: "cp-partner", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Partnership and Profit Sharing", path: "04. Profit&Loss\\8)Partnership&Profit-Sharing.xls", subtopic: "Partnership and Profit Sharing", note: "AFCAT practice — Cadetprep AFCAT sheet, Profit and Loss. Every key blind re-derived." },
      { key: "cp-mixed", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Mixed Commodities", path: "04. Profit&Loss\\9)Mixed-Commodities.xls", subtopic: "Combined Transactions", note: "AFCAT practice — Cadetprep AFCAT sheet, Profit and Loss. Every key blind re-derived." },
      { key: "cp-instal", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Instalment Selling", path: "04. Profit&Loss\\10)Installment-based-Selling.xls", subtopic: "Mixed Lots and Mixtures", note: "AFCAT practice — Cadetprep AFCAT sheet, Profit and Loss. Every key blind re-derived." },
    ],
  },
  "speed-time-and-distance": {
    id: "speed-time-and-distance",
    chapterName: "Speed, Time and Distance",
    subtopics: [
      "Speed, Distance, Units and Journeys in Parts",
      "Average Speed",
      "Speed and Time in Inverse Proportion",
      "Late, Early and Changed Speed",
      "Relative Speed and Meeting",
      "Trains",
      "Boats and Streams",
      "Races",
      "Circular Tracks",
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
      { key: "cp-avg", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Average Speed", path: "05. Speed, Time, Distance\\1)Average-Speed.xls", subtopic: "Average Speed", note: "AFCAT practice — Cadetprep AFCAT sheet, Speed, Time and Distance. Every key blind re-derived." },
      { key: "cp-relative", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Relative Speed", path: "05. Speed, Time, Distance\\2)Relative-Speed.xls", subtopic: "Relative Speed and Meeting", note: "AFCAT practice — Cadetprep AFCAT sheet, Speed, Time and Distance. Every key blind re-derived." },
      { key: "cp-racing", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Racing", path: "05. Speed, Time, Distance\\3)Racing-Questions.xls", subtopic: "Races", note: "AFCAT practice — Cadetprep AFCAT sheet, Speed, Time and Distance. Every key blind re-derived." },
      { key: "cp-changed", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Increasing and Decreasing Speed", path: "05. Speed, Time, Distance\\4)Increasing-Decreasing Speed.xls", subtopic: "Late, Early and Changed Speed", note: "AFCAT practice — Cadetprep AFCAT sheet, Speed, Time and Distance. Every key blind re-derived." },
      { key: "cp-meeting", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Two People Meeting", path: "05. Speed, Time, Distance\\5)Two-People-Meeting-with-different-Speeds.xls", subtopic: "Relative Speed and Meeting", note: "AFCAT practice — Cadetprep AFCAT sheet, Speed, Time and Distance. Every key blind re-derived." },
      { key: "cp-late", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Being Late or Early", path: "05. Speed, Time, Distance\\6)Being-late_Early.xls", subtopic: "Late, Early and Changed Speed", note: "AFCAT practice — Cadetprep AFCAT sheet, Speed, Time and Distance. Every key blind re-derived." },
      { key: "cp-chasing", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Chasing", path: "05. Speed, Time, Distance\\7)Chasing-Questions.xls", subtopic: "Relative Speed and Meeting", note: "AFCAT practice — Cadetprep AFCAT sheet, Speed, Time and Distance. Every key blind re-derived." },
      { key: "cp-trains", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Trains", path: "05. Speed, Time, Distance\\8)Train-Questions.xls", subtopic: "Trains", note: "AFCAT practice — Cadetprep AFCAT sheet, Speed, Time and Distance. Every key blind re-derived." },
      { key: "cp-circular", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Races and Circular Motion", path: "05. Speed, Time, Distance\\9)Races&Circular-motion.xls", subtopic: "Races", note: "AFCAT practice — Cadetprep AFCAT sheet, Speed, Time and Distance. Every key blind re-derived." },
      { key: "cp-boats", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Boats and Streams", path: "05. Speed, Time, Distance\\10)Boats&Streams.xls", subtopic: "Boats and Streams", note: "AFCAT practice — Cadetprep AFCAT sheet, Speed, Time and Distance. Every key blind re-derived." },
    ],
  },
  "decimal-and-fractions": {
    id: "decimal-and-fractions",
    chapterName: "Decimal and Fractions",
    subtopics: [
      "Decimal and Fraction Conversion",
      "Recurring Decimals",
      "Comparing and Ordering",
      "Operations on Decimals",
      "Fractions and Simplification",
      "Squares, Cubes and Roots",
      "Decimals and Percentages",
    ],
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
      { key: "cp-basics", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Decimal Fractions Basics", path: "00. Decimal_Fractions\\01. Decimal Fractions Basics.xlsx", subtopic: "Operations on Decimals", note: "AFCAT practice — Cadetprep AFCAT sheet, Decimal and Fractions. Every key blind re-derived." },
      { key: "cp-conversion", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Conversion of Decimal Fractions", path: "00. Decimal_Fractions\\02. Conversion of Decimal Fractions.xlsx", subtopic: "Decimal and Fraction Conversion", note: "AFCAT practice — Cadetprep AFCAT sheet, Decimal and Fractions. Every key blind re-derived." },
      { key: "cp-operations", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Operations on Decimal Fractions", path: "00. Decimal_Fractions\\03. Operations on Decimal Fractions.xlsx", subtopic: "Operations on Decimals", note: "AFCAT practice — Cadetprep AFCAT sheet, Decimal and Fractions. Every key blind re-derived." },
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
  "indices-and-surds": {
    id: "indices-and-surds",
    chapterName: "Indices and Surds",
    subtopics: ["Laws of Exponents", "Radicals and Surds", "Applications of Indices"],
    files: [
      { key: "cp-laws", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Laws of Exponents", path: "13. Exponents, Radicals, Surds\\01. Laws of Exponents.xlsx", subtopic: "Laws of Exponents", note: "AFCAT practice — Cadetprep AFCAT sheet, Indices and Surds. Every key blind re-derived." },
      { key: "cp-surds", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Radicals and Surds", path: "13. Exponents, Radicals, Surds\\02. Radicals and Surds.xlsx", subtopic: "Radicals and Surds", note: "AFCAT practice — Cadetprep AFCAT sheet, Indices and Surds. Every key blind re-derived." },
      { key: "cp-apps", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Applications of Indices", path: "13. Exponents, Radicals, Surds\\03. Applications.xlsx", subtopic: "Applications of Indices", note: "AFCAT practice — Cadetprep AFCAT sheet, Indices and Surds. Every key blind re-derived." },
    ],
  },
  "number-system": {
    id: "number-system",
    chapterName: "Number System",
    subtopics: ["Types of Numbers", "Factors and Multiples", "Divisibility Rules", "Prime Factorization", "Remainders and Quotients"],
    files: [
      { key: "cp-types", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Types of Numbers", path: "15. Number System\\01. Types of Numbers.xlsx", subtopic: "Types of Numbers", note: "AFCAT practice — Cadetprep AFCAT sheet, Number System. Every key blind re-derived." },
      { key: "cp-factors", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Factors and Multiples", path: "15. Number System\\02. Factors and Multiples.xlsx", subtopic: "Factors and Multiples", note: "AFCAT practice — Cadetprep AFCAT sheet, Number System. Every key blind re-derived." },
      { key: "cp-divis", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Divisibility Rules", path: "15. Number System\\03. Divisibility Rules.xlsx", subtopic: "Divisibility Rules", note: "AFCAT practice — Cadetprep AFCAT sheet, Number System. Every key blind re-derived." },
      { key: "cp-primes", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Prime Factorization", path: "15. Number System\\04. Prime Factorization.xlsx", subtopic: "Prime Factorization", note: "AFCAT practice — Cadetprep AFCAT sheet, Number System. Every key blind re-derived." },
      { key: "cp-remain", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Remainders and Quotients", path: "15. Number System\\05. Remainder and Quotient.xlsx", subtopic: "Remainders and Quotients", note: "AFCAT practice — Cadetprep AFCAT sheet, Number System. Every key blind re-derived." },
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
      { key: "cp-ap", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Arithmetic Progression", path: "16. Number Series\\01. Arithmetic Progression.xlsx", subtopic: "Arithmetic Progression", note: "AFCAT practice — Cadetprep AFCAT sheet, Sequence and Series. Every key blind re-derived." },
      { key: "cp-gp", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Geometric Progression", path: "16. Number Series\\02. Geometric Progression.xlsx", subtopic: "Geometric Progression", note: "AFCAT practice — Cadetprep AFCAT sheet, Sequence and Series. Every key blind re-derived." },
      { key: "cp-hp", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Harmonic Progression", path: "16. Number Series\\03. Harmonic Progression.xlsx", subtopic: "Harmonic Progression and Means", note: "AFCAT practice — Cadetprep AFCAT sheet, Sequence and Series. Every key blind re-derived." },
    ],
  },
  "squares-and-roots": {
    id: "squares-and-roots",
    chapterName: "Squares, Cubes and Roots",
    subtopics: ["Squares and Square Roots", "Cubes and Cube Roots", "Surds and Indices", "Mixed Operations"],
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
      { key: "cp-squares", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Squares and Square Roots", path: "14. Square, Square Roots, Cube, Cube Roots\\01. Squares and Square Roots.xlsx", subtopic: "Squares and Square Roots", note: "AFCAT practice — Cadetprep AFCAT sheet, Squares, Cubes and Roots. Every key blind re-derived." },
      { key: "cp-sqprops", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Properties of Squares", path: "14. Square, Square Roots, Cube, Cube Roots\\02. Squares and Square Roots - Properties.xlsx", subtopic: "Squares and Square Roots", note: "AFCAT practice — Cadetprep AFCAT sheet, Squares, Cubes and Roots. Every key blind re-derived." },
      { key: "cp-cubes", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Cubes and Cube Roots", path: "14. Square, Square Roots, Cube, Cube Roots\\03. Cubes and Cube Roots.xlsx", subtopic: "Cubes and Cube Roots", note: "AFCAT practice — Cadetprep AFCAT sheet, Squares, Cubes and Roots. Every key blind re-derived." },
      { key: "cp-cuprops", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Properties of Cubes", path: "14. Square, Square Roots, Cube, Cube Roots\\04. Cubes and Cube Roots - Properties.xlsx", subtopic: "Cubes and Cube Roots", note: "AFCAT practice — Cadetprep AFCAT sheet, Squares, Cubes and Roots. Every key blind re-derived." },
      { key: "cp-mixed", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Mixed Operations", path: "14. Square, Square Roots, Cube, Cube Roots\\05. Mixed Operations.xlsx", subtopic: "Mixed Operations", note: "AFCAT practice — Cadetprep AFCAT sheet, Squares, Cubes and Roots. Every key blind re-derived." },
    ],
  },
  "heights-and-distances": {
    id: "heights-and-distances",
    chapterName: "Heights and Distances",
    subtopics: ["Angle of Elevation", "Angle of Depression", "Moving Objects and Speed", "Trigonometric Ratios"],
    files: [
      {
        key: "book",
        group: "C",
        label: "CDS Pathfinder: Height and Distance (practice exercise)",
        path: "19. Height_and_Distance\\21_Height_&_Distance.pdf",
        note: "AFCAT practice — CDS Pathfinder (book chapter), Heights and Distances. Every key blind re-derived.",
      },
      { key: "cp-ratios", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Trigonometric Ratios", path: "18. Height and Distance\\01. Trigonometric Ratios.xlsx", subtopic: "Trigonometric Ratios", note: "AFCAT practice — Cadetprep AFCAT sheet, Heights and Distances. Every key blind re-derived." },
      { key: "cp-problems", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Heights and Distances Problems", path: "18. Height and Distance\\02. Problems.xlsx", subtopic: "Angle of Elevation", note: "AFCAT practice — Cadetprep AFCAT sheet, Heights and Distances. Every key blind re-derived." },
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
    subtopics: ["Triangles and Quadrilaterals", "Circles and Sectors", "Combined Figures", "Change in Dimensions", "Regular Polygons"],
    files: [
      {
        key: "book",
        group: "C",
        label: "CDS Pathfinder: Area and Perimeter of Plane Figures (practice exercise)",
        path: "20. Mensuration\\26_Area_&_Perimeter_of_Plane_Figure.pdf",
        note: "AFCAT practice — CDS Pathfinder (book chapter), Area and Perimeter. Every key blind re-derived.",
      },
      { key: "cp-2d", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Mensuration 2D", path: "12. Mensuration\\01. Mensuration 2D.xlsx", subtopic: "Triangles and Quadrilaterals", note: "AFCAT practice — Cadetprep AFCAT sheet, Mensuration. Every key blind re-derived." },
    ],
  },
  "surface-area-and-volume": {
    id: "surface-area-and-volume",
    chapterName: "Surface Area and Volume",
    subtopics: ["Cube and Cuboid", "Cylinder", "Cone and Frustum", "Sphere and Hemisphere", "Combined Solids and Recasting", "Prisms and Pyramids"],
    files: [
      {
        key: "book",
        group: "C",
        label: "CDS Pathfinder: Surface Area and Volume of Solids (practice exercise)",
        path: "20. Mensuration\\27_Surface_Area_&_Volume_of_Solids.pdf",
        note: "AFCAT practice — CDS Pathfinder (book chapter), Surface Area and Volume. Every key blind re-derived.",
      },
      { key: "cp-3d", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Mensuration 3D", path: "12. Mensuration\\02. Mensuration 3D.xlsx", subtopic: "Cube and Cuboid", note: "AFCAT practice — Cadetprep AFCAT sheet, Mensuration. Every key blind re-derived." },
    ],
  },
  average: {
    id: "average",
    chapterName: "Average",
    subtopics: [
      "Basic and Simple Averages",
      "Consecutive Numbers",
      "Adding, Removing or Replacing a Value",
      "Combined and Group Averages",
      "Members Joining or Leaving",
      "Weighted Averages",
      "Highest and Lowest Values",
      "Cricket Scores",
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
      { key: "cp-basic", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Basic Average Concepts", path: "03. Averages\\1)Basic-Avg-Concepts.xls", subtopic: "Basic and Simple Averages", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-simple", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Simple Average Calculations", path: "03. Averages\\2)Simple-Average-Calculations.xls", subtopic: "Basic and Simple Averages", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-missing", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Missing Data", path: "03. Averages\\3)Missing-data-Problems.xls", subtopic: "Basic and Simple Averages", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-weighted", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Weighted Average", path: "03. Averages\\4)Weighted-Average.xls", subtopic: "Weighted Averages", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-group", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Group Average", path: "03. Averages\\5)Group-Average .xls", subtopic: "Combined and Group Averages", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-consecutive", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Consecutive Numbers", path: "03. Averages\\6)Consecutive-Numbers.xls", subtopic: "Consecutive Numbers", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-smallest", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Smallest and Largest", path: "03. Averages\\7)Smallest&Largest.xls", subtopic: "Highest and Lowest Values", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-teachers", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Students and Teachers", path: "03. Averages\\8)Students&Teachers.xls", subtopic: "Members Joining or Leaving", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-cricket", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Cricket", path: "03. Averages\\9)Cricket-Questions.xls", subtopic: "Cricket Scores", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-family", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Baby and Family", path: "03. Averages\\10)Baby&family.xls", subtopic: "Ages", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-maxmin", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Maximum, Minimum and Difference", path: "03. Averages\\11)Maximum-minimum-Difference.xls", subtopic: "Highest and Lowest Values", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-error", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Error and Changes", path: "03. Averages\\12)Error-Calculation-Changes.xls", subtopic: "Adding, Removing or Replacing a Value", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-firstn", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Average of N Numbers", path: "03. Averages\\13)Avg-N-Numbers.xls", subtopic: "Basic and Simple Averages", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-percent", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Percentages in Averages", path: "03. Averages\\14)Percentages-in-Averages.xls", subtopic: "Weighted Averages", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
      { key: "cp-real", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Real-World Problems", path: "03. Averages\\15)Real-Worl-Problems.xls", subtopic: "Basic and Simple Averages", note: "AFCAT practice — Cadetprep AFCAT sheet, Averages. Every key blind re-derived." },
    ],
  },
  clock: {
    id: "clock",
    chapterName: "Clock",
    subtopics: ["Angle Between the Hands", "Faulty Clocks", "Gain and Loss of Time", "Angle Covered by the Hands", "Time Reasoning", "Coinciding and Opposite Hands", "Mirror Images"],
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
      { key: "cp-angle", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Angle Between the Hands", path: "11. Clock\\01. Angle_Based_Problems.xlsx", subtopic: "Angle Between the Hands", note: "AFCAT practice — Cadetprep AFCAT sheet, Clock. Every key blind re-derived." },
      { key: "cp-coincide", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Hands Coinciding", path: "11. Clock\\02. HAND COINCIDENCE AND FREQUENCY PROBLEMS.xlsx", subtopic: "Coinciding and Opposite Hands", note: "AFCAT practice — Cadetprep AFCAT sheet, Clock. Every key blind re-derived." },
      { key: "cp-faulty", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Faulty Clocks", path: "11. Clock\\03. FAULTY_DEFECTIVE CLOCK PROBLEMS.xlsx", subtopic: "Faulty Clocks", note: "AFCAT practice — Cadetprep AFCAT sheet, Clock. Every key blind re-derived." },
      { key: "cp-mirror", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Mirror Images", path: "11. Clock\\04. MIRROR IMAGE_REFLECTION PROBLEMS.xlsx", subtopic: "Mirror Images", note: "AFCAT practice — Cadetprep AFCAT sheet, Clock. Every key blind re-derived." },
      { key: "cp-speed", group: "D", root: "cadetprep", label: "Cadetprep AFCAT: Speed of the Hands", path: "11. Clock\\05. HAND SPEED AND RELATIVE MOTION PROBLEMS.xlsx", subtopic: "Angle Covered by the Hands", note: "AFCAT practice — Cadetprep AFCAT sheet, Clock. Every key blind re-derived." },
    ],
  },
  "ratio-and-proportion": {
    id: "ratio-and-proportion",
    chapterName: "Ratio and Proportion",
    // Re-cut into the eight /notes teaching pages (2026-10-22): Duplicate/Triplicate
    // into Basics, Partnership into Dividing, Income/Expenditure into Change in Ratio.
    subtopics: [
      "Ratio Basics and Types of Ratio",
      "Combining Ratios",
      "Proportionals",
      "Algebraic Ratio Expressions",
      "Dividing in a Ratio and Partnership",
      "Change in Ratio, Ages and Income",
      "Mixtures and Coins",
      "Variation and Work",
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
        subtopic: "Ratio Basics and Types of Ratio",
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
