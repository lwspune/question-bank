/**
 * The CISCE exams this lane ingests, one profile each. Every script takes the
 * exam as its first argument and reads everything exam-specific from here:
 * the `exams` row name, where its source papers are unpacked, its subjects and
 * paper codes, its chapter + subtopic catalog, and which years carry CISCE's key.
 *
 *   isc-12   ISC, CISCE's Class 12 certificate (live 2026-10-30)
 *   icse-10  ICSE, CISCE's Class 10 certificate
 *
 * The two are different certificates with different papers, syllabi and
 * patterns; what they share is the SOURCE: CISCE prints one paper per subject
 * per year, and its "Analysis of Pupil Performance" reprints every question
 * with the official marking scheme. That is why one lane serves both.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ISC_12_SUBJECTS, ISC_12_TAXONOMY, ISC_12_SUBTOPICS } from "./taxonomy/isc-12";
import { ICSE_10_SUBJECTS, ICSE_10_TAXONOMY, ICSE_10_SUBTOPICS } from "./taxonomy/icse-10";

export type CisceChapter = {
  name: string;
  /** Unit (and sub-unit) of the syllabus this chapter comes from. */
  syllabusRef: string;
  /** ISC only: the paper section the chapter's questions are drawn from. */
  section?: "A" | "B" | "C" | "D";
};

/**
 * Which document a year is transcribed FROM, and whether CISCE's own answer
 * exists for it. The dump step hands a blind deriver the questions WITHOUT the
 * key for a keyed year.
 */
export type YearSource = {
  year: number;
  from: "question-paper" | "marking-scheme";
  keyed: boolean;
  note: string;
};

export type CisceSlug = "isc-12" | "icse-10";

export type CisceExam = {
  slug: CisceSlug;
  /** Must match the `exams` DB row and the registry entry's examName. */
  examName: string;
  certificate: "ISC" | "ICSE";
  /** Where the source papers are unpacked; nothing here is committed. */
  sourceRoot: string;
  subjects: readonly string[];
  paperCodes: Readonly<Record<string, string>>;
  taxonomy: Readonly<Record<string, readonly CisceChapter[]>>;
  subtopics: Readonly<Record<string, readonly string[]>>;
  years: readonly YearSource[];
};

const apup2025 = (cert: string): YearSource => ({
  year: 2025,
  from: "marking-scheme",
  keyed: true,
  note:
    `${cert} Analysis of Pupil Performance (published Oct-Nov 2025). Reprints every question ` +
    "plus CISCE's official marking scheme and step-wise working, so no separate 2025 paper is needed.",
});

const qp2026 = (cert: string): YearSource => ({
  year: 2026,
  from: "question-paper",
  keyed: false,
  note:
    `${cert} 2026 question papers only. NO KEY YET: on the 2025 edition's cadence the 2026 ` +
    "Analysis of Pupil Performance is expected around Nov 2026, when these answers get the same cross-check.",
});

export const CISCE_EXAMS: Readonly<Record<CisceSlug, CisceExam>> = {
  "isc-12": {
    slug: "isc-12",
    examName: "ISC Class 12",
    certificate: "ISC",
    sourceRoot: "C:\\tmp\\PYQPs\\ISC\\XII",
    subjects: ISC_12_SUBJECTS,
    paperCodes: { Mathematics: "860", Physics: "861A", Chemistry: "862A" },
    taxonomy: ISC_12_TAXONOMY,
    subtopics: ISC_12_SUBTOPICS,
    years: [apup2025("ISC"), qp2026("ISC")],
  },
  "icse-10": {
    slug: "icse-10",
    examName: "ICSE Class 10",
    certificate: "ICSE",
    sourceRoot: "C:\\tmp\\PYQPs\\ICSE\\X",
    subjects: ICSE_10_SUBJECTS,
    paperCodes: { Mathematics: "511", Physics: "521", Chemistry: "522", Biology: "523" },
    taxonomy: ICSE_10_TAXONOMY,
    subtopics: ICSE_10_SUBTOPICS,
    years: [apup2025("ICSE"), qp2026("ICSE")],
  },
};

/** A profile by slug (`icse-10`) or by its exams-row name (`ICSE Class 10`). */
export function cisceExam(slugOrName: string): CisceExam {
  const found = Object.values(CISCE_EXAMS).find((e) => e.slug === slugOrName || e.examName === slugOrName);
  if (!found) {
    throw new Error(
      `no CISCE exam "${slugOrName}". Known: ${Object.values(CISCE_EXAMS)
        .map((e) => `${e.slug} (${e.examName})`)
        .join(", ")}.`
    );
  }
  return found;
}

export function sourceForYear(exam: CisceExam, year: number): YearSource {
  const found = exam.years.find((s) => s.year === year);
  if (!found) {
    throw new Error(
      `${exam.examName} ${year}: no source document held. Years in hand: ${exam.years.map((s) => s.year).join(", ")}.`
    );
  }
  return found;
}

/** This exam's transcriptions, keys, derivations and adjudications. */
export const dataDir = (exam: CisceExam) => join(process.cwd(), "scripts", "cisce-pyq", "data", exam.slug);
/** Key-free payloads + in-progress derivations. Outside scripts/ so a deriver cannot walk into data/. */
export const blindRoot = (exam: CisceExam) => join(exam.sourceRoot, "blind");
/** Figure crops, `<stem>/<file>`; crop-figures.py writes them, commit.ts uploads them. */
export const figureRoot = (exam: CisceExam) => join(exam.sourceRoot, "figures");

/**
 * A finished derivation, `which` = "derived" (the published solutions) or
 * "second" (2026's independent control). Once a paper is settled its files are
 * copied into data/<exam>/ as `<stem>.<which>.json`, the copy of record; the
 * blind folder is scratch under C:\tmp. Reads data/ first.
 */
export function derivationPath(exam: CisceExam, stem: string, which: "derived" | "second"): string {
  const kept = join(dataDir(exam), `${stem}.${which}.json`);
  return existsSync(kept) ? kept : join(blindRoot(exam), stem, `${which}.json`);
}

/** `<exam> <year> <subject>` from argv, validated against the profile. */
export function parsePaperArgs(argv: readonly string[], usage: string) {
  const [slug, yearArg, subject] = argv.filter((a) => !a.startsWith("--"));
  if (!slug || !yearArg || !subject) throw new Error(`usage: ${usage}   e.g. icse-10 2025 Mathematics`);
  const exam = cisceExam(slug);
  const year = Number(yearArg);
  sourceForYear(exam, year);
  if (!exam.subjects.includes(subject)) {
    throw new Error(`${exam.examName} has no subject "${subject}". Subjects: ${exam.subjects.join(", ")}.`);
  }
  return { exam, year, subject, stem: `${year}-${subject}` };
}
