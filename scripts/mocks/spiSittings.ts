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
 * Unit-tested in tests/mock-spi-sittings.test.ts.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PAPERS, TRANSCRIPTS, type Paper } from "../spi/config";
import { parseTranscript, type TranscriptQuestion } from "../ssc-cgl/lib";

export type SpiSitting = {
  key: string;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
  graceNumbers: number[];
};

export function deriveSpiSittings(papers: readonly Paper[], transcripts: Record<string, TranscriptQuestion[]>): SpiSitting[] {
  return papers
    .filter((p) => p.kind === "pyq" && p.pyqYear !== null && transcripts[p.id])
    .map((p) => ({
      key: p.id,
      sourceFile: p.sourceFile,
      year: p.pyqYear!,
      slug: `spi-${p.id}`,
      title: `SPI Entrance Examination ${p.pyqYear}`,
      graceNumbers: transcripts[p.id].filter((q) => q.flawed).map((q) => q.number),
    }));
}

/** The live registry: every past paper whose transcript is committed. */
export function spiSittings(): SpiSitting[] {
  const transcripts: Record<string, TranscriptQuestion[]> = {};
  for (const p of PAPERS) {
    const f = join(TRANSCRIPTS, `${p.id}.txt`);
    if (existsSync(f)) transcripts[p.id] = parseTranscript(readFileSync(f, "utf8"));
  }
  return deriveSpiSittings(PAPERS, transcripts);
}
