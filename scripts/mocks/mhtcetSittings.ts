/**
 * MHT-CET sittings for the mock builder — 45 shifts, up to TWO papers each.
 *
 * WHY source_file AND NOT year+month: `pyq_month` cannot separate these
 * sittings — 17 of the 45 share (2023, "May") — so the NDA year+month discovery
 * loop would emit ONE slug for all 17 and, since the mock id is
 * slugToUuid(slug), each upsert would SILENTLY overwrite the last, leaving 16
 * real sittings missing with no error. The CDS/NEET shape applies: pin by
 * `source_file`, identify by a registry key.
 *
 * WHY PART-DERIVED, PART-HAND-WRITTEN: `scripts/mhtcet/config.ts` is the source
 * of record for the 13 April-2025 shifts — it is what the ingestion pipeline
 * stamps into `questions.source_file` — so those are DERIVED, exactly as CDS
 * derives from scripts/cds/config.ts. A renamed booklet there must fail loudly
 * here rather than leave a mock silently empty. The other 32 shifts came in
 * through the generic /upload path years earlier; a repo-wide search finds no
 * config for them anywhere, so they can only be hand-written.
 *
 * WHY SOME PAPERS ARE HELD: a mock is the real paper or it is nothing. Both
 * blueprints declare HARD counts, so a short sitting throws in
 * validatePaperRows. That is deliberate — unlike NEET's 180-vs-200, a short
 * MHT-CET paper is not a layout variant, it is questions MISSING, and a soft
 * count would ship a fragment as "the real paper". 30 of the 90 papers cannot
 * reconstruct whole, so each carries an explicit `hold` naming the shortfall and
 * its cause. Two causes, and the distinction matters:
 *
 *   - "withheld PRIVATE"  a flawed question we deliberately took out of the
 *                         public bank. IRRECOVERABLE — the paper can never ship
 *                         whole without un-withdrawing a question we judged bad.
 *   - "absent"            rows that are not in the bank at all (never ingested,
 *                         or absorbed by cross-shift content_hash dedup).
 *                         CLOSABLE by a future ingest, at which point the hold
 *                         goes stale and the builder says so.
 *
 * A hold is an ASSERTION, not a mute: the builder attempts every paper and
 * flags a hold whose paper now reconstructs, so closing a corpus hole surfaces
 * as a prompt to delete the line rather than as silence.
 *
 * Pure — no I/O, no DB. Unit-tested in tests/mock-mhtcet-sittings.test.ts.
 */

import { SHIFTS } from "../mhtcet/config";

/** Which of a sitting's two papers is held, and why. */
export type MhtCetHold = { maths?: string; phyChem?: string };

export type MhtCetSitting = {
  /** Registry key AND slug stem — "2023-may-03-s1", or a bare year when the
   *  source carries no date. Doubles as the `--only` filter key. */
  key: string;
  /** `questions.source_file` for this sitting. */
  sourceFile: string;
  year: number;
  /** Human sitting label for the title; null when no date is established. */
  label: string | null;
  hold?: MhtCetHold;
};

/**
 * The 32 sittings with no ingestion config anywhere in the repo (2021-2024 plus
 * the one May-2025 paper). Hand-written, ordered newest first.
 *
 * LABELS ARE NOT TAKEN FROM `pyq_note`. The note is free text typed into the
 * uploaded spreadsheet and at least one is provably wrong:
 * `MHT_CET_3rdMay2023_S1_QB.xlsx` stores "3rd May 2nd Shift" while a separate
 * file legitimately claims that sitting. Settled 2026-09-01 against the local
 * source booklets: stems unique to that file ("watch glass", "coloured
 * compound") appear ONLY in "3 may shift 1 (ques).docx", and the Shift-2 file's
 * stems only in "3 may shift 2" — so the FILENAME is right and the note is a
 * typo. Both 3-May shifts exist; neither is missing. (The wrong note is still
 * live on those ~150 rows — a data repair for the backfill ledger, not for here.)
 */
export const MHT_CET_SITTINGS: MhtCetSitting[] = [
  // ── 2025 ──────────────────────────────────────────────────────────────────
  // The one 2025 source outside the April docx batch. Its note reads "Shift ||"
  // and it is stamped May, and the only May-2025 file on disk is
  // "MHT_CET_2025_14th_May_Shift_2_QP.pdf" — so the label is INFERRED from that
  // agreement, not verified against stems. It ships no mocks either way.
  {
    key: "2025-may-14-s2",
    sourceFile: "MHT_CET_2025_PCM.xlsx",
    year: 2025,
    label: "14 May Shift 2",
    hold: {
      maths: "48/50 — 2 questions withheld PRIVATE (flawed)",
      phyChem: "99/100 — 1 question absent from the bank",
    },
  },

  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    key: "2024-may-14-s2",
    sourceFile: "MHT_CET_14tthMay2024_Shift2.xlsx",
    year: 2024,
    label: "14 May Shift 2",
    hold: { phyChem: "99/100 — 1 question withheld PRIVATE (flawed)" },
  },
  {
    key: "2024-may-14-s1",
    sourceFile: "MHT_CET_14thMay2024_Shift1_QuestionBank.xlsx",
    year: 2024,
    label: "14 May Shift 1",
  },
  {
    key: "2024-may-13-s2",
    sourceFile: "MHT_CET_13thMay2024_Shift2_Question_Bank.xlsx",
    year: 2024,
    label: "13 May Shift 2",
  },
  // The worst-covered sitting in the corpus: less than half its Chemistry block
  // is in the bank.
  {
    key: "2024-may-13-s1",
    sourceFile: "MHT_CET_13thMay2024_Shift1_QuestionBank.xlsx",
    year: 2024,
    label: "13 May Shift 1",
    hold: {
      maths: "47/50 — 3 questions absent from the bank",
      phyChem: "62/100 — 38 questions absent from the bank",
    },
  },
  {
    key: "2024-may-12-s2",
    sourceFile: "MHT_CET_12thMay2024_Shift2_QuestionBank.xlsx",
    year: 2024,
    label: "12 May Shift 2",
    hold: { phyChem: "98/100 — 2 questions absent from the bank" },
  },
  {
    key: "2024-may-12-s1",
    sourceFile: "MHT_CET_12thMay2024_Shift1.xlsx",
    year: 2024,
    label: "12 May Shift 1",
  },
  {
    key: "2024-may-11-s2",
    sourceFile: "MHT_CET_11thMay2024_Shift2_QuestionBank.xlsx",
    year: 2024,
    label: "11 May Shift 2",
    hold: { phyChem: "99/100 — 1 question absent from the bank" },
  },
  {
    key: "2024-may-11-s1",
    sourceFile: "MHT_CET_11thMay2024_Shift1_QuestionBank.xlsx",
    year: 2024,
    label: "11 May Shift 1",
  },
  {
    key: "2024-may-10-s2",
    sourceFile: "MHT_CET_10thMay2024_Shift2_QuestionBank.xlsx",
    year: 2024,
    label: "10 May Shift 2",
  },
  {
    key: "2024-may-10-s1",
    sourceFile: "MHT_CET_10thMay2024_Shift1_QuestionBank.xlsx",
    year: 2024,
    label: "10 May Shift 1",
  },
  {
    key: "2024-may-09-s2",
    sourceFile: "MHT_CET_9thMay2024_Shift2_QuestionBank.xlsx",
    year: 2024,
    label: "9 May Shift 2",
  },
  {
    key: "2024-may-09-s1",
    sourceFile: "MHT_CET_9thMay2024_Shift1_QuestionBank.xlsx",
    year: 2024,
    label: "9 May Shift 1",
    hold: { maths: "49/50 — 1 question withheld PRIVATE (flawed)" },
  },

  // ── 2023 ──────────────────────────────────────────────────────────────────
  // Undated: the only 2023 source with no day or shift, matching the folder's
  // lone "MHT_CET_2023_QP.docx". Ships nothing, so the missing date costs
  // nothing — but a fabricated one would have.
  {
    key: "2023-analysis",
    sourceFile: "MHT_CET_2023_Analysis.xlsx",
    year: 2023,
    label: null,
    hold: {
      maths: "49/50 — 1 question withheld PRIVATE (flawed)",
      phyChem: "91/100 — 8 absent from the bank, 1 withheld PRIVATE (flawed)",
    },
  },
  {
    key: "2023-may-16-s2",
    sourceFile: "MHT_CET_16thMay2023_Shift2_QuestionBank.xlsx",
    year: 2023,
    label: "16 May Shift 2",
    hold: {
      maths: "44/50 — 6 questions absent from the bank",
      phyChem: "61/100 — 39 questions absent from the bank",
    },
  },
  {
    key: "2023-may-16-s1",
    sourceFile: "MHT_CET_16thMay2023_Shift1_QuestionBank.xlsx",
    year: 2023,
    label: "16 May Shift 1",
  },
  {
    key: "2023-may-15-s2",
    sourceFile: "MHT_CET_15thMay2023_Shift2_QuestionBank.xlsx",
    year: 2023,
    label: "15 May Shift 2",
    hold: { phyChem: "98/100 — 2 questions absent from the bank" },
  },
  {
    key: "2023-may-15-s1",
    sourceFile: "MHT_CET_15thMay2023_Shift1_QuestionBank.xlsx",
    year: 2023,
    label: "15 May Shift 1",
    hold: { phyChem: "98/100 — 2 questions withheld PRIVATE (flawed)" },
  },
  {
    key: "2023-may-11-s2",
    sourceFile: "MHT_CET_11thMay2023_Shift2_QuestionBank.xlsx",
    year: 2023,
    label: "11 May Shift 2",
  },
  {
    key: "2023-may-11-s1",
    sourceFile: "MHT_CET_11thMay2023_Shift1_QuestionBank.xlsx",
    year: 2023,
    label: "11 May Shift 1",
  },
  {
    key: "2023-may-10-s2",
    sourceFile: "MHT_CET_10thMay2023_Shift2_QuestionBank.xlsx",
    year: 2023,
    label: "10 May Shift 2",
    hold: { maths: "49/50 — 1 question absent from the bank" },
  },
  {
    key: "2023-may-10-s1",
    sourceFile: "MHT_CET_10thMay2023_Shift1.xlsx",
    year: 2023,
    label: "10 May Shift 1",
    hold: { phyChem: "98/100 — 2 questions absent from the bank" },
  },
  {
    key: "2023-may-09-s2",
    sourceFile: "MHT_CET_9thMay2023_Shift2.xlsx",
    year: 2023,
    label: "9 May Shift 2",
    hold: {
      maths: "49/50 — 1 question withheld PRIVATE (flawed)",
      phyChem: "99/100 — 1 question absent from the bank",
    },
  },
  {
    key: "2023-may-09-s1",
    sourceFile: "MHT_CET_9thMay2023_Shift1_QuestionBank.xlsx",
    year: 2023,
    label: "9 May Shift 1",
  },
  {
    key: "2023-may-04-s2",
    sourceFile: "MHT_CET_4thMay2023_Shift2.xlsx",
    year: 2023,
    label: "4 May Shift 2",
    hold: { phyChem: "99/100 — 1 question absent from the bank" },
  },
  {
    key: "2023-may-04-s1",
    sourceFile: "MHT_CET_4thMay2023_Shift1_QuestionBank.xlsx",
    year: 2023,
    label: "4 May Shift 1",
  },
  {
    key: "2023-may-03-s2",
    sourceFile: "MHT_CET_3rdMay2023_Shift2_QuestionBank.xlsx",
    year: 2023,
    label: "3 May Shift 2",
    hold: { maths: "49/50 — 1 question absent from the bank" },
  },
  // Its stored pyq_note says "3rd May 2nd Shift" and is WRONG — see the header.
  {
    key: "2023-may-03-s1",
    sourceFile: "MHT_CET_3rdMay2023_S1_QB.xlsx",
    year: 2023,
    label: "3 May Shift 1",
  },
  {
    key: "2023-may-02-s2",
    sourceFile: "MHT_CET_2ndMay2023_Shift2.xlsx",
    year: 2023,
    label: "2 May Shift 2",
    hold: { phyChem: "97/100 — 3 questions absent from the bank" },
  },
  {
    key: "2023-may-02-s1",
    sourceFile: "MHT_CET_2ndMay2023_Shift1_QuestionBank.xlsx",
    year: 2023,
    label: "2 May Shift 1",
  },

  // ── 2022 / 2021 ───────────────────────────────────────────────────────────
  // Both years hold exactly ONE paper on disk (MHT_CET_20NN_QP.docx) with no day
  // or shift recorded anywhere, so both title as a bare year. Their stored notes
  // say "Shift 1" / "May Shift 1", but nothing establishes which sitting that
  // was, and a label is a claim.
  {
    key: "2022",
    sourceFile: "MHT_CET_2022_Analysis.xlsx",
    year: 2022,
    label: null,
    hold: { maths: "48/50 — 2 questions absent from the bank" },
  },
  {
    key: "2021",
    sourceFile: "MHT_CET_2021_Question_Bank.xlsx",
    year: 2021,
    label: null,
  },
];

/**
 * The 13 April-2025 sittings, derived from the ingestion config so a rename
 * there cannot silently empty a mock here. The config key is already the shape
 * this registry wants ("2025-apr-19-s1"), and `pyqNote` is its own provenance
 * string ("19 April Shift I") — reproduced VERBATIM as the label rather than
 * normalised to the hand-written "9 May Shift 1" style, because rewriting a
 * source-of-record string here is precisely the drift being guarded against.
 * Roman numerals for 2025-April and Arabic elsewhere is therefore intentional:
 * each label matches its own source.
 *
 * These 13 carry no `hold` inline — see MHT_CET_2025_APRIL_HOLDS below.
 */
const APRIL_2025_HOLDS: Record<string, MhtCetHold> = {
  "2025-apr-19-s1": {
    maths: "49/50 — 1 question withheld PRIVATE (flawed)",
    phyChem: "99/100 — 1 question withheld PRIVATE (flawed)",
  },
  "2025-apr-19-s2": { phyChem: "93/100 — 7 questions absent from the bank" },
  "2025-apr-20-s1": { phyChem: "99/100 — 1 question absent from the bank" },
  "2025-apr-20-s2": { maths: "48/50 — 2 questions withheld PRIVATE (flawed)" },
  "2025-apr-22-s2": { phyChem: "98/100 — 2 questions absent from the bank" },
  "2025-apr-25-s1": {
    maths: "49/50 — 1 question withheld PRIVATE (flawed)",
    phyChem: "99/100 — 1 question absent from the bank",
  },
};

function derivedApril2025(): MhtCetSitting[] {
  return Object.entries(SHIFTS).map(([key, s]) => ({
    key,
    sourceFile: s.sourceFile,
    year: s.pyqYear,
    label: s.pyqNote,
    ...(APRIL_2025_HOLDS[key] ? { hold: APRIL_2025_HOLDS[key] } : {}),
  }));
}

/**
 * Every MHT-CET sitting, newest first. Refuses a duplicate key or source file
 * outright: two sittings on one key derive one slug, and slugToUuid would make
 * the second upsert silently overwrite the first.
 */
export function deriveMhtCetSittings(): MhtCetSitting[] {
  const all = [...derivedApril2025(), ...MHT_CET_SITTINGS];

  const byKey = new Map<string, string>();
  const byFile = new Map<string, string>();
  for (const s of all) {
    const prevKey = byKey.get(s.key);
    if (prevKey) {
      throw new Error(
        `MHT-CET sittings "${prevKey}" and "${s.sourceFile}" share the key ` +
          `"${s.key}" — one mock would silently overwrite the other`
      );
    }
    byKey.set(s.key, s.sourceFile);

    const prevFile = byFile.get(s.sourceFile);
    if (prevFile) {
      throw new Error(
        `MHT-CET source file "${s.sourceFile}" is claimed by both "${prevFile}" ` +
          `and "${s.key}" — one paper cannot be two sittings`
      );
    }
    byFile.set(s.sourceFile, s.key);

    // A hold keyed to a sitting that does not exist would silently do nothing.
    if (!s.key.startsWith(String(s.year))) {
      throw new Error(
        `MHT-CET sitting "${s.key}" disagrees with its own year ${s.year}`
      );
    }
  }

  // A stale hold in APRIL_2025_HOLDS is a silent no-op, so refuse it.
  const keys = new Set(all.map((s) => s.key));
  for (const k of Object.keys(APRIL_2025_HOLDS)) {
    if (!keys.has(k)) {
      throw new Error(`APRIL_2025_HOLDS names unknown sitting "${k}"`);
    }
  }

  return all.sort((a, b) => b.year - a.year || b.key.localeCompare(a.key));
}

export { mhtCetMockSlug, mhtCetMockTitle } from "../../src/lib/mocks/reconstruct";
