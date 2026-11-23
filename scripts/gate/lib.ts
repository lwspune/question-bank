/**
 * The pure core of the GATE lane. Spec: tests/gate-lib.test.ts.
 *
 * A GATE paper is the UCEED shape (MCQ, MSQ and NAT, keyed by an IIT's final key), so a
 * paper is planned by the UCEED core (planPaper) with the organising institute as the key's
 * authority. This file adds what is GATE's own: reading the key table, the sitting a paper
 * id names, and the printed layout (65 questions, General Aptitude Q1-10, marks by number).
 */
import { GATE_CS_SUBJECTS, gateQuestionMarks } from "../../src/lib/mocks/blueprints";
import { planPaper, type KeyEntry, type Plan, type UceedKey, type UceedPaper, type UceedQuestion } from "../uceed/lib";
import { CATALOG, ORGANISER } from "./config";

const LETTER = /^[A-D]$/;
const MSQ_SET = /^[A-D](;[A-D])*$/;
const NUMBER = /^-?\d+(\.\d+)?$/;
const GA = "General Aptitude";

/**
 * The key from keyrows.py's rows: [n, session, type, section, ...key words, marks]. A row
 * the reader cannot make sense of is reported and left out of the key, so a bad cell can
 * never become an answer. `complete` (default) also requires Q1-65 exactly once.
 */
export function parseKeyRows(
  year: number,
  rows: string[][],
  opts: { complete?: boolean } = {},
): { key: UceedKey; issues: string[] } {
  const issues: string[] = [];
  const answers: KeyEntry[] = [];
  const seen = new Set<number>();
  for (const row of rows) {
    const n = Number(row[0]);
    const at = row.findIndex((w) => w === "MCQ" || w === "MSQ" || w === "NAT");
    if (at < 0) {
      issues.push(`Q${n}: no question type (MCQ, MSQ or NAT) in the row`);
      continue;
    }
    if (seen.has(n)) {
      issues.push(`Q${n}: appears twice in the key`);
      continue;
    }
    seen.add(n);
    const type = row[at] as "MCQ" | "MSQ" | "NAT";
    const section = row[at + 1] ?? "";
    const cell = row.slice(at + 2, -1);
    const marks = Number(row[row.length - 1]);
    const before = issues.length;

    if (n <= 10 && section !== "GA") issues.push(`Q${n}: section ${section}, expected GA`);
    if (n > 10 && !section.startsWith("CS")) issues.push(`Q${n}: section ${section}, expected CS`);
    if (marks !== gateQuestionMarks(n)) issues.push(`Q${n}: key prints ${row[row.length - 1]} mark(s), the paper's layout gives ${gateQuestionMarks(n)}`);

    const text = cell.join(" ");
    let entry: KeyEntry | null = null;
    if (type === "MCQ") {
      if (cell.length === 1 && LETTER.test(cell[0])) entry = { n, type, value: cell[0] };
      else issues.push(`Q${n}: MCQ key "${text}" is not one of A-D`);
    } else if (type === "MSQ") {
      if (cell.length === 1 && MSQ_SET.test(cell[0])) entry = { n, type, sets: [cell[0].split(";").sort()] };
      else issues.push(`Q${n}: MSQ key "${text}" must list A-D separated by ";"`);
    } else if (cell.length === 3 && cell[1] === "to" && NUMBER.test(cell[0]) && NUMBER.test(cell[2])) {
      const [lo, hi] = [Number(cell[0]), Number(cell[2])];
      if (lo > hi) issues.push(`Q${n}: NAT range "${text}" runs the wrong way`);
      else entry = lo === hi ? { n, type, value: lo } : { n, type, range: [lo, hi] };
    } else issues.push(`Q${n}: NAT key "${text}" is not "<low> to <high>"`);

    if (entry && issues.length === before) answers.push(entry);
  }
  if (opts.complete ?? true) {
    for (let n = 1; n <= 65; n++) if (!seen.has(n)) issues.push(`Q${n}: not in the key`);
  }
  return { key: { year, answers: answers.sort((a, b) => a.n - b.n) }, issues };
}

export type GateSitting = {
  paper: string;
  year: number;
  set: number;
  organiser: string;
  /** The card's credit line: "GATE CS · 2026 · Set 2 · IIT Guwahati · Q12". */
  pyqNote: string;
  sourceFile: string;
  /** The mock's paper code, so its slug reads gate-cs-2026-cs2. */
  mockCode: string;
};

/** "2026-cs2" -> its year, set and organising institute. Only the papers config knows. */
export function gateSitting(paper: string): GateSitting {
  const m = /^(\d{4})-cs([12])$/.exec(paper);
  const organiser = m ? ORGANISER[Number(m[1])] : undefined;
  if (!m || !organiser) throw new Error(`unknown GATE CS paper "${paper}" (expected e.g. 2026-cs1)`);
  const [year, set] = [Number(m[1]), Number(m[2])];
  return {
    paper,
    year,
    set,
    organiser,
    pyqNote: `Set ${set} · ${organiser}`,
    sourceFile: `GATE CS ${year} Set ${set} (${organiser})`,
    mockCode: `cs${set}`,
  };
}

/**
 * planPaper (the UCEED core) plus GATE's own rules: chapters come from the syllabus
 * CATALOG under the right subject, and General Aptitude is exactly Q1-10.
 */
export function planGatePaper(paper: string, transcription: UceedPaper, key: UceedKey): Plan {
  const sitting = gateSitting(paper);
  const plan = planPaper(transcription, key, sitting.organiser);
  const extra: string[] = [];
  for (const q of transcription.questions) {
    // Options render inline on every surface (KatexRenderer), which draws a fence as raw
    // backticks: an option holding code is written as plain lines instead.
    const fenced = q.options.find((o) => o.text.includes("```"));
    if (fenced) extra.push(`Q${q.n}: option ${fenced.label} holds a code fence; write its lines as plain text`);
    // The UCEED commit path carries no context column: shared data goes in the stem.
    if ((q as UceedQuestion & { context?: string | null }).context?.trim()) {
      extra.push(`Q${q.n}: has a context; put the shared data in the stem`);
    }
    const subject = q.subject?.trim();
    const chapter = q.chapter?.trim();
    if (!subject || !chapter) continue; // planPaper already reports the missing field
    if (q.n <= 10 && subject !== GA) extra.push(`Q${q.n}: Q1-10 are General Aptitude, not ${subject}`);
    if (q.n > 10 && subject === GA) extra.push(`Q${q.n}: General Aptitude is Q1-10 only`);
    if (!(GATE_CS_SUBJECTS as readonly string[]).includes(subject)) {
      extra.push(`Q${q.n}: "${subject}" is not a GATE CS subject`);
      continue;
    }
    if (!CATALOG[subject as keyof typeof CATALOG].includes(chapter)) {
      extra.push(`Q${q.n}: chapter "${chapter}" is not in ${subject}`);
    }
  }
  if (!extra.length) return plan;
  const bad = new Set(extra.map((e) => Number(/^Q(\d+)/.exec(e)![1])));
  return { ...plan, rows: plan.rows.filter((r) => !bad.has(r.n)), issues: [...plan.issues, ...extra] };
}
