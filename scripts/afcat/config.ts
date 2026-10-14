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

export const OUT = join(__dirname, "out"); // gitignored: packets, agent output
export const DATA = join(__dirname, "data"); // committed: transcriptions, verdicts, overrides

/**
 * A: LWS's own quizzes (.docx) — clean text, but the answer keys were written
 *    by an AI and are measurably wrong (the Mixtures key disagrees with its own
 *    options on 13 of 30 rows).
 * B: "Errorless" sheets (.pdf, clean text layer) — key letters only, no solutions.
 * C: published books and other institutes' sheets (.pdf) — transcribed from
 *    page images because stacked fractions break the text layer.
 */
export type Group = "A" | "B" | "C";

/** A literal repair to the source TEXT before parsing, kept here so it is reviewable. */
export type TextFix = { find: string; replace: string; reason: string };

export type FileEntry = {
  key: string; // names data/<chapter>/<key>.source.json
  group: Group;
  label: string; // what the file is, for reports
  path: string; // relative to SOURCE_ROOT
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
