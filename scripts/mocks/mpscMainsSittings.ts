/**
 * MPSC Mains (language paper) sittings for the mock builder — DERIVED from
 * scripts/mpsc-mains/config.ts, the registry the ingestion stamps into
 * `questions.source_file`, so the two cannot drift.
 *
 * THREE printed schemes, read off the booklet covers (2026-09-27):
 *   - the 200-question papers (2009-2012): 2 hours, "every 4 wrong answers cost
 *     one question" = -1/4;
 *   - the 100-question Group B papers (2013 on): 1 hour, -1/4;
 *   - State Services Mains: 1 hour, "every 3 wrong answers" = -1/3.
 * Every question carries 1 mark (100 q / 100 marks, 200 q / 200 marks).
 *
 * The blueprint is built PER PAPER, not a constant, because each Mains exam
 * row has its own slug and the question count differs by era. One section,
 * the CDS GK shape: the booklet prints the Marathi and English halves in
 * order, and that order is kept by question number.
 *
 * Grace = the `#` entries of the paper's final key (the same ones the rows
 * carry as CANCELLED). A derived key has none. Dropped papers are skipped;
 * a paper with a scan gap is refused, since it can never be a whole paper.
 *
 * Pure apart from the default key loader. Unit-tested in
 * tests/mock-mpsc-mains-sittings.test.ts.
 */

import { readFileSync } from "node:fs";
import type { MockPaperBlueprint } from "../../src/lib/mocks/blueprints";
import { dataPath, EXAMS, pyqNoteFor, sourceFileFor, type ExamKey, type Paper } from "../mpsc-mains/config";

export const MAINS_EXAM_SLUG: Record<ExamKey, string> = {
  ssm: "mpsc-state-services-mains",
  grpb: "mpsc-group-b-combined-mains",
  sti: "mpsc-sti-mains",
  aso: "mpsc-aso-mains",
  psi: "mpsc-psi-mains",
};

export type MainsScheme = { durationSecs: number; correct: number; wrong: number };

export function mainsScheme(paper: Paper, exam: ExamKey): MainsScheme {
  if (paper.questions === 200) return { durationSecs: 120 * 60, correct: 1, wrong: -0.25 };
  return { durationSecs: 60 * 60, correct: 1, wrong: exam === "ssm" ? -1 / 3 : -0.25 };
}

export function mainsBlueprint(paper: Paper, exam: ExamKey): MockPaperBlueprint {
  const { durationSecs, correct, wrong } = mainsScheme(paper, exam);
  const withGk = paper.exams.includes("grpb");
  const label = withGk ? "Marathi, English & General Knowledge" : "Marathi & English";
  return {
    code: "paper-1",
    examName: EXAMS[exam].name,
    examSlug: MAINS_EXAM_SLUG[exam],
    paperLabel: label,
    durationSecs,
    marking: { correct, wrong },
    sections: [
      {
        key: "language",
        label,
        subjects: withGk ? ["Marathi", "English", "General Knowledge"] : ["Marathi", "English"],
        count: paper.questions,
      },
    ],
  };
}

/**
 * The paper a Mains CHAPTER TEST is cut from (scripts/mocks/build-sectional.ts).
 * A chapter test has no sitting, so it takes the 100-question booklet's shape:
 * every printed scheme runs at 36 seconds a question, and the exam keeps its
 * own penalty. Marathi and English only: the Group B GK chapters are far too
 * small for a test.
 */
export function mainsChapterBlueprint(exam: ExamKey): MockPaperBlueprint {
  const bp = mainsBlueprint({ questions: 100, exams: [exam] } as Paper, exam);
  const label = "Marathi & English";
  return {
    ...bp,
    paperLabel: label,
    sections: [{ key: "language", label, subjects: ["Marathi", "English"], count: 100 }],
  };
}

export type MainsSitting = {
  /** "<paper id>:<exam>" — the `--only` key. */
  key: string;
  exam: ExamKey;
  paper: Paper;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
  graceNumbers: number[];
};

function readKey(id: string): Record<string, string> {
  return (JSON.parse(readFileSync(dataPath(id, "key"), "utf8")) as { key: Record<string, string> }).key;
}

export function deriveMainsSittings(
  papers: readonly Paper[],
  keyFor: (id: string) => Record<string | number, string> = readKey
): MainsSitting[] {
  const out: MainsSitting[] = [];
  for (const paper of papers) {
    if (paper.dropped) continue;
    if (paper.missingQuestions?.length) {
      throw new Error(`MPSC Mains ${paper.id}: scan gap at Q${paper.missingQuestions.join(",")} — not a whole paper`);
    }
    const key = keyFor(paper.id);
    const graceNumbers = Object.entries(key)
      .filter(([, v]) => v === "#")
      .map(([n]) => Number(n))
      .sort((a, b) => a - b);
    for (const exam of paper.exams) {
      const [, date] = pyqNoteFor(paper, exam).split(" · ");
      out.push({
        key: `${paper.id}:${exam}`,
        exam,
        paper,
        sourceFile: sourceFileFor(paper, exam),
        year: paper.pyqYear,
        slug: `mpsc-${exam}-mains-${paper.pyqYear}`,
        title: `MPSC ${EXAMS[exam].label} ${paper.pyqYear} — ${date}`,
        graceNumbers,
      });
    }
  }
  return out;
}
