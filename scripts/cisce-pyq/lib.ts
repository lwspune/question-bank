/**
 * The ISC lane's pure core: checks on a transcription, and the assembly of
 * transcription + blind derivation (+ CISCE's key, + a human adjudication) into
 * the rows commit.ts writes. Spec: tests/isc-12-lib.test.ts.
 *
 * ── WHERE EACH PART OF A ROW COMES FROM ──────────────────────────────────────
 *   stem, options, chapter, subtopic   the transcription (data/<stem>.questions.json)
 *   answer                             2025: CISCE's key (data/<stem>.key.json)
 *                                      2026: the blind derivation (no key exists)
 *   solution, difficulty               the blind derivation (blind/<stem>/derived.json)
 *   any override                       data/<stem>.adjudication.json
 *
 * The 2025 answer is CISCE's even where we think CISCE is wrong (FINDINGS.md
 * 1(ix)): candidates were marked against that key, so the bank keeps it and the
 * solution carries the note. An override exists for the case where a reading of
 * both says the TRANSCRIPTION of the key was wrong, never to overrule CISCE.
 *
 * ── WHAT BLOCKS ASSEMBLY ─────────────────────────────────────────────────────
 * Every disagreement, until a human has read it: an MCQ whose derived letter is
 * not one CISCE accepted (2025), two independent derivations that differ
 * (2026), and every keyed free-response row, because CISCE prints several
 * equivalent forms and no string match is honest. `agree: true` records that
 * the reading was done.
 */
import { cisceExam, sourceForYear, type CisceExam } from "./exams";
import type { OfficialAnswer, Confidence } from "./crosscheck";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";

export type IscFigure = {
  /** The page of `region`/`regions`; for `parts`, the first part's page. */
  page?: string;
  region?: [number, number, number, number];
  /** Several boxes on the same page, stacked into one image (crop-figures.py). */
  regions?: [number, number, number, number][];
  /** Boxes on DIFFERENT pages (a figure printed across a page break), stacked. */
  parts?: { page: string; region: [number, number, number, number] }[];
  /** Boxes whited out before cropping: question text printed inside a figure's box. */
  mask?: { page: string; region: [number, number, number, number] }[];
  /** "none": a person looked at a figure the watermark check flagged and saw no watermark. */
  watermark?: "none";
  note?: string;
  required?: boolean;
};

export type IscRow = {
  ref: string;
  questionNumber: string;
  section: string;
  marks: number;
  format: "mcq" | "subjective";
  chapter: string;
  subtopic: string;
  instruction?: string;
  context?: string;
  text: string;
  options?: string[];
  choice?: string;
  figure?: IscFigure;
  _flag?: string;
};

export type CiscePaper = {
  /** The exams-row name, "ISC Class 12" or "ICSE Class 10": picks the taxonomy. */
  exam: string;
  subject: string;
  year: number;
  paperCode: string;
  source: string;
  _transcription?: string;
  rows: IscRow[];
};

/** The pre-2026-10-30 name, from when the lane was ISC-only. */
export type IscPaper = CiscePaper;

export type DerivedEntry = {
  ref: string;
  label?: string;
  value: string;
  working: string;
  difficulty: string;
  confidence: Confidence;
  flag?: string;
};

export type Adjudication = {
  ref: string;
  /** The letter to key, where the reading settled on one. */
  answer?: string;
  /** Replaces the derived working wholesale. */
  solution?: string;
  /** Appended to the solution as its own paragraph. */
  solutionNote?: string;
  /** A free-response row read side by side and found equivalent. */
  agree?: boolean;
  /** Leave the row out of the commit, with the reason. */
  hold?: string;
  /** Free text: why. Shown to nobody; for the next reader of the file. */
  why?: string;
};

export type AssembledRow = {
  ref: string;
  questionNumber: string;
  format: "mcq" | "subjective";
  chapter: string;
  subtopic: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  text: string;
  context?: string;
  solution: string;
  answer?: string;
  options?: { label: "A" | "B" | "C" | "D"; text: string; isCorrect: boolean }[];
  figure?: IscFigure;
};

const LABELS = ["A", "B", "C", "D"] as const;
const DIFFICULTIES = ["Easy", "Moderate", "Hard"] as const;

/** `\(` / `\)` and `\[` / `\]` must pair up, in order, never nested. */
function delimitersBalanced(s: string): boolean {
  let open: string | null = null;
  const re = /\\([()[\]])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    const c = m[1];
    if (c === "(" || c === "[") {
      if (open) return false;
      open = c;
    } else {
      if (open !== (c === ")" ? "(" : "[")) return false;
      open = null;
    }
  }
  return open === null;
}


function textIssues(where: string, s: string | undefined): string[] {
  if (!s) return [];
  const out: string[] = [];
  if (!delimitersBalanced(s)) out.push(`${where}: unbalanced math delimiter`);
  // The normaliser itself is the detector (as in upload/textGuard.ts), so this
  // check can never disagree with the commitStaged guard that rejects the row.
  if (normalizeNewlines(s) !== s) out.push(`${where}: literal backslash-n (use a real newline)`);
  // Any control character but a newline is what a shell-eaten backslash leaves:
  // "\times" through a heredoc arrives as TAB + "imes". Bit this lane 2026-10-30.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u0009\u000b-\u001f]/.test(s)) out.push(`${where}: control character (a backslash eaten by a shell?)`);
  return out;
}

export function paperIssues(paper: CiscePaper): string[] {
  const issues: string[] = [];
  let exam: CisceExam;
  try {
    exam = cisceExam(paper.exam);
  } catch (e) {
    return [(e as Error).message];
  }
  const chapters = new Set((exam.taxonomy[paper.subject] ?? []).map((c) => c.name));
  const refs = new Set<string>();
  const choices = new Map<string, number>();

  for (const r of paper.rows) {
    const at = r.ref;
    if (refs.has(r.ref)) issues.push(`${at}: duplicate ref`);
    refs.add(r.ref);
    if (!chapters.has(r.chapter)) issues.push(`${at}: chapter "${r.chapter}" is not in the ${exam.examName} ${paper.subject} taxonomy`);
    else if (!(exam.subtopics[r.chapter] ?? []).includes(r.subtopic)) {
      issues.push(`${at}: subtopic "${r.subtopic}" is not one of ${r.chapter}'s`);
    }
    const leaked = Object.keys(r).filter((k) => /answer|correct|key|solution/i.test(k));
    if (leaked.length) issues.push(`${at}: answer-shaped field (${leaked.join(", ")}) in the questions file`);
    if (r.format === "mcq") {
      if (r.options?.length !== 4) issues.push(`${at}: an MCQ needs 4 options, has ${r.options?.length ?? 0}`);
    } else if (r.format === "subjective") {
      if (r.options?.length) issues.push(`${at}: a subjective row carries options`);
    } else {
      issues.push(`${at}: unknown format "${String(r.format)}"`);
    }
    if (!r.text?.trim()) issues.push(`${at}: empty text`);
    if (!(r.marks > 0)) issues.push(`${at}: marks missing`);
    issues.push(
      ...textIssues(`${at} text`, r.text),
      ...textIssues(`${at} context`, r.context),
      ...textIssues(`${at} instruction`, r.instruction)
    );
    for (const [i, o] of (r.options ?? []).entries()) issues.push(...textIssues(`${at} option ${LABELS[i]}`, o));
    if (r.choice) choices.set(r.choice, (choices.get(r.choice) ?? 0) + 1);
  }
  for (const [c, n] of choices) {
    if (n < 2) issues.push(`choice "${c}" has ${n} alternative; an OR group needs at least 2`);
  }
  return issues;
}

export function assemblePaper(input: {
  paper: CiscePaper;
  derived: readonly DerivedEntry[];
  /** CISCE's key. Present for a keyed year only. */
  key?: readonly OfficialAnswer[];
  /** An independent second derivation (2026's control). */
  second?: readonly DerivedEntry[];
  adjudications?: readonly Adjudication[];
}): { rows: AssembledRow[]; issues: string[] } {
  const { paper } = input;
  const issues: string[] = [];
  const rows: AssembledRow[] = [];
  const byRef = <T extends { ref: string }>(xs: readonly T[] | undefined) =>
    new Map((xs ?? []).map((x) => [x.ref, x]));
  const derived = byRef(input.derived);
  const key = byRef(input.key);
  const second = byRef(input.second);
  const adj = byRef(input.adjudications);
  const keyed = input.key !== undefined;

  for (const r of paper.rows) {
    const at = r.ref;
    const a = adj.get(r.ref);
    if (a?.hold) continue;
    const d = derived.get(r.ref);
    if (!d) {
      issues.push(`${at}: no derivation`);
      continue;
    }
    const k = key.get(r.ref);
    if (keyed && !k) {
      issues.push(`${at}: no key entry`);
      continue;
    }
    if (!DIFFICULTIES.includes(d.difficulty as (typeof DIFFICULTIES)[number])) {
      issues.push(`${at}: difficulty "${d.difficulty}" is not Easy / Moderate / Hard`);
      continue;
    }

    let answer: string | undefined;
    if (r.format === "mcq") {
      const derivedLetter = d.label?.trim().toUpperCase();
      if (keyed) {
        const accepted = k!.labels.map((l) => l.trim().toUpperCase());
        if (!accepted.length) {
          issues.push(`${at}: the key gives no letter for an MCQ`);
          continue;
        }
        if (!a?.answer && !accepted.includes(derivedLetter ?? "")) {
          issues.push(`${at}: derived ${derivedLetter ?? "(none)"} and key ${accepted.join("/")} disagree; adjudicate`);
          continue;
        }
        answer = a?.answer ?? accepted[0];
      } else {
        const s = second.get(r.ref)?.label?.trim().toUpperCase();
        if (s && s !== derivedLetter && !a?.answer) {
          issues.push(`${at}: derived ${derivedLetter} but the second derivation says ${s}; adjudicate`);
          continue;
        }
        answer = a?.answer ?? derivedLetter;
      }
      if (!answer || !LABELS.includes(answer as (typeof LABELS)[number])) {
        issues.push(`${at}: answer "${answer ?? ""}" names no option`);
        continue;
      }
    } else if (keyed && !a?.agree && !a?.solution) {
      issues.push(`${at}: free-response row not yet adjudicated against the key`);
      continue;
    }

    let solution = a?.solution ?? d.working;
    if (a?.solutionNote) solution = `${solution}\n\n${a.solutionNote}`;
    if (!solution?.trim()) {
      issues.push(`${at}: empty solution`);
      continue;
    }
    const bad = textIssues(`${at} solution`, solution);
    if (bad.length) {
      issues.push(...bad);
      continue;
    }

    rows.push({
      ref: r.ref,
      questionNumber: r.questionNumber,
      format: r.format,
      chapter: r.chapter,
      subtopic: r.subtopic,
      difficulty: d.difficulty as AssembledRow["difficulty"],
      text: r.text,
      ...(r.context ? { context: r.context } : {}),
      solution,
      ...(r.format === "mcq"
        ? {
            answer,
            options: r.options!.map((text, i) => ({ label: LABELS[i], text, isCorrect: LABELS[i] === answer })),
          }
        : {}),
      ...(r.figure ? { figure: r.figure } : {}),
    });
  }
  return { rows, issues };
}

export const sourceFileFor = (exam: CisceExam, year: number, subject: string) =>
  `${exam.slug}-pyq-${year}-${subject.toLowerCase()}`;

export function pyqNoteFor(exam: CisceExam, year: number, subject: string, paperCode: string): string {
  const head = `${exam.examName} ${subject} (${paperCode}) board examination ${year}. Official CISCE question paper; `;
  return sourceForYear(exam, year).keyed
    ? `${head}answers cross-checked against CISCE's published marking scheme (Analysis of Pupil Performance).`
    : `${head}answers worked out independently, as CISCE has not yet published its marking scheme for ${year}.`;
}
