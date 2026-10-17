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
import { DAYS, SECTION_SUBJECTS, SHIFTS, TRANSCRIPTS, type Shift } from "../ssc-cgl/config";
import { parseTranscript, type Label, type TranscriptQuestion } from "../ssc-cgl/lib";

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
