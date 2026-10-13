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
