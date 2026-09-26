/**
 * UPSC CSE (Prelims) sittings for the mock builder — DERIVED from
 * scripts/upsc/config.ts PAPERS, the registry the ingestion stamps into
 * `questions.source_file`. One entry per PAPER (GS I and CSAT are separate
 * mocks, the NDA two-paper shape), source_file-keyed because `pyq_month` is
 * NULL on every row and both papers share a year.
 *
 * Grace: the items UPSC withdrew (`withdrawnFor`, the key's `X` entries), loaded
 * keyless by scripts/upsc/load-withdrawn.ts. Hold: 2021 CSAT — its Q39 carries a
 * DUAL key (C or D both scored). The grader holds one key, and grace would also
 * credit A and B, so no mock can score that paper as UPSC did.
 *
 * 2016 is skipped: it is in PAPERS but out of scope, with no key and no rows.
 *
 * Unit-tested in tests/mock-upsc-sittings.test.ts.
 */
import { existsSync } from "node:fs";
import { dataPath, NOT_WITHDRAWN, withdrawnFor, type Paper } from "../upsc/config";

export type UpscSitting = {
  key: string;
  paper: 1 | 2;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
  graceNumbers: number[];
  hold?: string;
};

const PAPER_SLUG = { 1: "gs1", 2: "csat" } as const;
const PAPER_LABEL = { 1: "GS Paper I", 2: "CSAT (Paper II)" } as const;

export function deriveUpscSittings(papers: readonly Paper[]): UpscSitting[] {
  return papers
    .filter((p) => existsSync(dataPath(p.id, "key")))
    .map((p) => {
      const dual = NOT_WITHDRAWN[p.id] ?? [];
      return {
        key: p.id,
        paper: p.paper,
        sourceFile: p.sourceFile,
        year: p.pyqYear,
        slug: `upsc-cse-${p.pyqYear}-${PAPER_SLUG[p.paper]}`,
        title: `UPSC CSE Prelims ${p.pyqYear} — ${PAPER_LABEL[p.paper]}`,
        graceNumbers: withdrawnFor(p.id),
        ...(dual.length
          ? {
              hold: `${dual.length === 1 ? "Q" : "Qs "}${dual.join(", ")} accepted two answers (UPSC scored C or D) — the grader holds one key, and grace would credit every choice`,
            }
          : {}),
      };
    })
    .sort((a, b) => a.year - b.year || a.paper - b.paper);
}
