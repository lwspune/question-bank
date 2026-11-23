/**
 * Homi Bhabha sittings for the mock builder: one mock per published Std IX paper
 * in scripts/homi-bhabha/config.ts PAPERS (Std VI joins when its papers are
 * ingested and published).
 *
 * A paper with any question held out of the bank (config `held`: a print that
 * cuts half a question, two identical options, a figure the only copy lacks) is
 * HELD here too, with the same reason, rather than shipped short. The builder
 * reports it on every run, and fails if the paper ever builds whole while still
 * held, so a closed hole cannot stay hidden.
 *
 * Questions the lane flagged as defective, and the one MSTA dropped (2021 Jan
 * Q82), ride as grace through src/lib/mocks/flawed.json (commit.ts writes it).
 *
 * Unit-tested in tests/mock-homi-bhabha.test.ts.
 */
import type { MockPaperBlueprint } from "../../src/lib/mocks/blueprints";
import { HOMI_BHABHA_9_PAPER } from "../../src/lib/mocks/blueprints";
import type { Paper } from "../homi-bhabha/config";
import { PAPERS } from "../homi-bhabha/config";

/** Exams whose papers are PUBLIC (the builder reads PUBLIC rows only). */
const PUBLISHED: Record<string, MockPaperBlueprint> = { "homi-bhabha-9": HOMI_BHABHA_9_PAPER };

const MONTH: Record<string, string> = { jan: "January", nov: "November", dec: "December" };

export type HomiBhabhaSitting = {
  key: string;
  sourceFile: string;
  year: number;
  slug: string;
  title: string;
  blueprint: MockPaperBlueprint;
  /** Why this paper is not built: it is missing a question. */
  hold?: string;
};

/** "hb-9-2021-nov" -> "November 2021"; "hb-9-2024" -> "2024". */
function sittingLabel(p: Paper): string {
  const m = /-(jan|nov|dec)$/.exec(p.id);
  return m ? `${MONTH[m[1]]} ${p.pyqYear}` : String(p.pyqYear);
}

export function deriveHomiBhabhaSittings(papers: readonly Paper[]): HomiBhabhaSitting[] {
  return papers
    .filter((p) => PUBLISHED[p.exam])
    .sort((a, b) => a.exam.localeCompare(b.exam) || a.pyqYear - b.pyqYear || 0)
    .map((p) => ({
      key: p.id,
      sourceFile: p.sourceFile,
      year: p.pyqYear,
      slug: p.id,
      title: `Homi Bhabha ${sittingLabel(p)} Class ${p.exam.endsWith("6") ? 6 : 9}`,
      blueprint: PUBLISHED[p.exam],
      ...(p.held?.numbers.length
        ? { hold: `${p.held.numbers.length} question(s) not in the bank: ${p.held.why}` }
        : {}),
    }));
}

export function homiBhabhaSittings(): HomiBhabhaSitting[] {
  return deriveHomiBhabhaSittings(Object.values(PAPERS));
}
