/**
 * SPI sittings for the mock builder: one mock per past paper (`kind: "pyq"` in
 * scripts/spi/config.ts PAPERS), read from that paper's transcript, the source of record.
 * Practice papers (the sample papers, QP_1, the LWS mocks) are not sittings.
 *
 * Grace: every `flawed: yes` question. SPI publishes no key, so each answer is our own
 * derivation; a question defective as printed (no right option, two right options,
 * missing data) carries a notice above its solution, and in a mock everyone gets its
 * marks, so a doubtful key can never cost a student.
 *
 * Repeats: a question SPI re-asked word for word from an earlier paper (2026 Q141 and Q149
 * are the sample paper's) keeps ONE bank row, since content_hash is unique per exam.
 * scripts/spi/repeats.json names that row, and the sitting serves it at its own slot with
 * this transcript's subject and answer (the SSC CGL way).
 *
 * Unit-tested in tests/mock-spi-sittings.test.ts.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PAPERS, TRANSCRIPTS, type Paper } from "../spi/config";
import { parseTranscript, type Label, type TranscriptQuestion } from "../ssc-cgl/lib";

export type SpiOverride = { questionNumber: number; questionId: string; subjectName: string; answer: Label };
export type SpiSitting = {
  key: string;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
  graceNumbers: number[];
  overrides: SpiOverride[];
};
/** One entry of repeats.json: this paper's number, the bank row it repeats, and where that row came from. */
export type SpiRepeat = { number: number; questionId: string; first: string };

export function deriveSpiSittings(
  papers: readonly Paper[],
  transcripts: Record<string, TranscriptQuestion[]>,
  repeats: Record<string, SpiRepeat[]> = {}
): SpiSitting[] {
  return papers
    .filter((p) => p.kind === "pyq" && p.pyqYear !== null && transcripts[p.id])
    .map((p) => {
      const byNumber = new Map(transcripts[p.id].map((q) => [q.number, q]));
      const overrides = (repeats[p.id] ?? []).map((r) => {
        const q = byNumber.get(r.number);
        if (!q) throw new Error(`${p.id}: repeats.json names Q${r.number}, which its transcript does not hold`);
        const part = p.parts.find((pt) => r.number >= pt.from && r.number <= pt.to);
        return { questionNumber: r.number, questionId: r.questionId, subjectName: q.subject ?? part?.defaultSubject ?? "Mathematics", answer: q.answer };
      });
      return {
        key: p.id,
        sourceFile: p.sourceFile,
        year: p.pyqYear!,
        slug: `spi-${p.id}`,
        title: `SPI Entrance Examination ${p.pyqYear}`,
        graceNumbers: transcripts[p.id].filter((q) => q.flawed).map((q) => q.number),
        overrides,
      };
    });
}

/** The live registry: every past paper whose transcript is committed, with repeats.json. */
export function spiSittings(): SpiSitting[] {
  const transcripts: Record<string, TranscriptQuestion[]> = {};
  for (const p of PAPERS) {
    const f = join(TRANSCRIPTS, `${p.id}.txt`);
    if (existsSync(f)) transcripts[p.id] = parseTranscript(readFileSync(f, "utf8"));
  }
  const repeatsFile = join(TRANSCRIPTS, "..", "repeats.json");
  const repeats: Record<string, SpiRepeat[]> = existsSync(repeatsFile) ? JSON.parse(readFileSync(repeatsFile, "utf8")) : {};
  return deriveSpiSittings(PAPERS, transcripts, repeats);
}
