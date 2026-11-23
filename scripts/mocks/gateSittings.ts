/**
 * GATE CS sittings for the mock builder: one mock per paper in the bank (both CS sets of
 * 2024, 2025 and 2026), all on gatePaper (src/lib/mocks/blueprints.ts).
 *
 * No penalty on MSQ and NAT: GATE marks a wrong answer down only on an MCQ, and every
 * section mixes the three types, so the no-penalty flag rides on each row by its format
 * (gateNoPenalty). Grace: a question the main session found defective as printed carries a
 * notice and is listed in src/lib/mocks/flawed.json, which every builder applies.
 *
 * Unit-tested in tests/gate-mock.test.ts.
 */
import type { PaperQuestionRow } from "../../src/lib/mocks/reconstruct";
import { gateSitting } from "../gate/lib";

export type GateSitting = { key: string; year: number; sourceFile: string; slug: string; title: string };

/** The papers whose rows are in the bank. */
export const GATE_MOCK_PAPERS = ["2024-cs1", "2024-cs2", "2025-cs1", "2025-cs2", "2026-cs1", "2026-cs2"] as const;

export function deriveGateSittings(papers: readonly string[]): GateSitting[] {
  return [...papers].sort().map((paper) => {
    const s = gateSitting(paper);
    return { key: paper, year: s.year, sourceFile: s.sourceFile, slug: `gate-cs-${s.year}-${s.mockCode}`, title: `GATE CS ${s.year} Set ${s.set}` };
  });
}

/** MSQ and NAT rows cost nothing when wrong; MCQ rows keep their section's penalty. */
export function gateNoPenalty(rows: PaperQuestionRow[]): PaperQuestionRow[] {
  return rows.map((r) => {
    const format = r.format ?? r.answer?.kind;
    return format === "msq" || format === "numeric" ? { ...r, noPenalty: true } : r;
  });
}

export function gateSittings(): GateSitting[] {
  return deriveGateSittings(GATE_MOCK_PAPERS);
}
