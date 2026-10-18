/**
 * SSC CGL Tier I sittings for the mock builder: one mock per SHIFT, DERIVED from
 * scripts/ssc-cgl/config.ts SHIFTS (the source_file each shift is committed under)
 * and the shift's transcript, the source of record.
 *
 * Grace: every `flawed: yes` question. SSC cancelled none of them, but each is
 * defective as printed (Hindi only, cut off, two right options, no right option) or
 * carries a key we dispute; its note says so above the solution, and in a mock
 * everyone gets its marks, so a doubtful key can never cost a student.
 *
 * Repeats: SSC re-asks questions word for word, and the bank keeps one row per
 * content_hash, so a later shift's copy has no row under its own source_file.
 * scripts/ssc-cgl/repeats.json names the row it repeats; it is injected at its own
 * slot (the NEET include-override). content_hash sorts the options, so a repeat can
 * print A and B the other way round (26 Jul 2023 S4 Q92 vs 10 Sep 2024 S3 Q81, answer
 * C "weight" in both): the borrowed row's order is shown.
 *
 * Hold: a shift whose hosted file lacks questions (Day.missing) cannot be served
 * whole (16 Sep 2025 S3, 21 Sep 2025 S2).
 *
 * Unit-tested in tests/mock-ssc-sittings.test.ts.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { DAYS, HELD, LAYOUTS, QUANT_PAPER1, SECTION_SUBJECTS, SHIFTS, TRANSCRIPTS, layoutOf, type Shift } from "../ssc-cgl/config";
import { parseTranscript, type Label, type TranscriptQuestion } from "../ssc-cgl/lib";
import type { MockPaperBlueprint } from "../../src/lib/mocks/blueprints";
import type { PaperQuestionRow } from "../../src/lib/mocks/reconstruct";

export type SscOverride = { questionNumber: number; questionId: string; subjectName: string; answer: Label };
export type SscSitting = {
  key: string;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
  graceNumbers: number[];
  overrides: SscOverride[];
  hold?: string;
};
type Repeat = { number: number; questionId: string; first: string };

const PARTS = ["A", "B", "C", "D"] as const;

/** "51, 52, ..., 75" -> "Q51-75"; gaps become separate runs. */
function runs(numbers: number[]): string {
  const sorted = [...numbers].sort((a, b) => a - b);
  const out: string[] = [];
  for (let i = 0; i < sorted.length; ) {
    let j = i;
    while (j + 1 < sorted.length && sorted[j + 1] === sorted[j] + 1) j++;
    out.push(i === j ? `Q${sorted[i]}` : `Q${sorted[i]}-${sorted[j]}`);
    i = j + 1;
  }
  return out.join(", ");
}

export function deriveSscSittings(
  shifts: Record<string, Shift>,
  transcripts: Record<string, TranscriptQuestion[]>,
  repeats: Record<string, Repeat[]>,
  missing: Record<string, Record<number, number[]> | undefined>
): SscSitting[] {
  return Object.entries(shifts)
    // Tier II is its own exam (SSC CGL Tier II) with its own marking: never a Tier I mock.
    .filter(([id, s]) => transcripts[id] && s.day.startsWith("t1-"))
    .map(([id, s]) => {
      const blocks = transcripts[id];
      const byNumber = new Map(blocks.map((q) => [q.number, q]));
      const overrides = (repeats[id] ?? []).map((r) => {
        const q = byNumber.get(r.number);
        if (!q) throw new Error(`${id}: repeats.json names Q${r.number}, which its transcript does not hold`);
        const part = PARTS[Math.floor((r.number - 1) / 25)];
        return { questionNumber: r.number, questionId: r.questionId, subjectName: q.subject ?? SECTION_SUBJECTS[part][0], answer: q.answer };
      });
      const lacks = missing[s.day]?.[s.shift] ?? [];
      return {
        key: id,
        sourceFile: s.sourceFile,
        year: s.pyqYear,
        slug: `ssc-cgl-${id.slice(3)}`,
        title: `SSC CGL ${s.pyqNote}`,
        graceNumbers: blocks.filter((q) => q.flawed).map((q) => q.number),
        overrides,
        ...(lacks.length ? { hold: `${runs(lacks)} are not in the hosted file (${lacks.length} of 100)` } : {}),
      };
    });
}

/** The live registry: every committed shift, read from its transcript and repeats.json. */
export function sscSittings(): SscSitting[] {
  const transcripts: Record<string, TranscriptQuestion[]> = {};
  for (const id of Object.keys(SHIFTS)) {
    const f = join(TRANSCRIPTS, `${id}.txt`);
    if (existsSync(f)) transcripts[id] = parseTranscript(readFileSync(f, "utf8"));
  }
  const repeats: Record<string, Repeat[]> = JSON.parse(readFileSync(join(TRANSCRIPTS, "..", "repeats.json"), "utf8"));
  const missing = Object.fromEntries(Object.entries(DAYS).map(([day, d]) => [day, d.missing]));
  return deriveSscSittings(SHIFTS, transcripts, repeats, missing);
}

/**
 * SSC CGL Tier II Paper 1 sittings (owner, 2026-10-17): TWO mocks per sitting. The
 * ranked one is Sections I and II (SSC_CGL_T2_PAPER, 130 questions), the score SSC ranks
 * on; Computer Knowledge, qualifying only, is its own 15-minute mock.
 *
 * Before CGL 2022, Paper 1 was Quantitative Abilities alone (SSC_CGL_T2_QUANT_PAPER, 100
 * questions, +2/-0.5): one mock, no Computer Knowledge. `paperOf` says which paper a day
 * printed; a day no blueprint describes gets no mock.
 *
 * Held: a question config HELD keeps PRIVATE (unanswerable as printed) is not in the
 * bank's PUBLIC rows, so the mock serves the paper without it. `heldSubjects` names the
 * module of each, and withHeld() takes them off their section's count, so the count is
 * still a hard check that every OTHER question came back.
 */
export type T2Paper = "five-module" | "quant";

export type SscT2Sitting = {
  key: string;
  paper: T2Paper;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
  /** The five-module paper's qualifying Computer Knowledge mock; absent on a Quant-only paper. */
  computerSlug?: string;
  computerTitle?: string;
  graceNumbers: number[];
  heldSubjects: string[];
};

const QUANT = "Quantitative Aptitude";

/** The subject printed at a five-module question number (1-30 Maths, 31-60 Reasoning, ...). */
function t2SubjectAt(number: number, named?: string): string {
  let end = 0;
  for (const section of LAYOUTS[2]) {
    end += section.count;
    if (number <= end) return named ?? section.subjects[0];
  }
  throw new Error(`Q${number} is past the ${end} questions of Tier II Paper 1`);
}

export function deriveSscT2Sittings(
  shifts: Record<string, Shift>,
  transcripts: Record<string, TranscriptQuestion[]>,
  held: Record<string, number[]>,
  paperOf: (day: string) => T2Paper | null
): SscT2Sitting[] {
  return Object.entries(shifts)
    .filter(([id, s]) => transcripts[id] && s.day.startsWith("t2-") && paperOf(s.day))
    .map(([id, s]) => {
      const paper = paperOf(s.day)!;
      const blocks = transcripts[id];
      const byNumber = new Map(blocks.map((q) => [q.number, q]));
      const heldSubjects = (held[id] ?? []).map((n) => {
        const q = byNumber.get(n);
        if (!q) throw new Error(`${id}: HELD names Q${n}, which its transcript does not hold`);
        return paper === "quant" ? QUANT : t2SubjectAt(n, q.subject);
      });
      const date = s.day.slice(3);
      const slug = `ssc-cgl-tier-2-${date}`;
      const title = `SSC CGL ${s.pyqNote}`;
      return {
        key: id,
        paper,
        sourceFile: s.sourceFile,
        year: s.pyqYear,
        slug,
        title,
        ...(paper === "five-module"
          ? { computerSlug: `${slug}-computer`, computerTitle: `${title}: Computer Knowledge` }
          : {}),
        graceNumbers: blocks.filter((q) => q.flawed).map((q) => q.number),
        heldSubjects,
      };
    });
}

/** `bp` with one question off each section a held subject falls in; `bp` itself when none does. */
export function withHeld(bp: MockPaperBlueprint, heldSubjects: string[]): MockPaperBlueprint {
  const off = new Map<string, number>();
  for (const subject of heldSubjects) {
    const section = bp.sections.find((x) => x.subjects.includes(subject));
    if (section) off.set(section.key, (off.get(section.key) ?? 0) + 1);
  }
  if (!off.size) return bp;
  return {
    ...bp,
    sections: bp.sections.map((x) => (off.has(x.key) && x.count != null ? { ...x, count: x.count - off.get(x.key)! } : x)),
  };
}

const COMPUTER = "Computer Knowledge";

/** A sitting's rows for one of its two mocks: Computer Knowledge alone, or everything else. */
export function t2Rows(rows: PaperQuestionRow[], mock: "ranked" | "computer"): PaperQuestionRow[] {
  return rows.filter((r) => (r.subjectName === COMPUTER) === (mock === "computer"));
}

/** The live registry: every committed five-module Tier II shift, read from its transcript. */
export function sscT2Sittings(): SscT2Sitting[] {
  const transcripts: Record<string, TranscriptQuestion[]> = {};
  for (const [id, s] of Object.entries(SHIFTS)) {
    const f = join(TRANSCRIPTS, `${id}.txt`);
    if (s.day.startsWith("t2-") && existsSync(f)) transcripts[id] = parseTranscript(readFileSync(f, "utf8"));
  }
  return deriveSscT2Sittings(SHIFTS, transcripts, HELD, (day) => {
    const layout = layoutOf(DAYS[day]);
    return layout === LAYOUTS[2] ? "five-module" : layout === QUANT_PAPER1 ? "quant" : null;
  });
}
