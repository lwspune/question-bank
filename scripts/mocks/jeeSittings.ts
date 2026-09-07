/**
 * JEE Mains sittings for the mock builder.
 *
 * THREE THINGS MAKE JEE UNLIKE EVERY OTHER EXAM HERE.
 *
 * 1. A `source_file` IS NOT A SITTING. For 2025 one file holds a whole DATE —
 *    150 rows = TWO 75-question shifts back to back (rows 1-75 then 76-150),
 *    measured, not assumed. NDA splits sittings by `pyq_month`; CDS, NEET and
 *    MHT-CET split by `source_file`; JEE needs a third rule — a split WITHIN a
 *    file, by `source_row` block. 2026 is already one file per shift, so its
 *    files carry a single block.
 *
 * 2. ONLY 2025+ IS BUILDABLE. A 2021-2024 shift printed 90 questions of which a
 *    candidate attempted 75 — all 60 MCQ plus ANY 5 OF 10 numeric per subject.
 *    gradeMock has no "attempt at most N" concept, so those sittings would score
 *    out of 360 instead of 300 and let a student answer all ten. From 2025
 *    Section B is 5 compulsory questions and the paper is simply its 75. The
 *    2021-2024 corpus is ingested and deliberately NOT built here.
 *
 * 3. THE 2025 SHIFT LABELS ARE INFERRED, NOT VERIFIED — see SHIFT_INFERRED.
 *
 * The sitting list is DERIVED from scripts/jee/papers/*.json (the source of
 * record for `source_file`) rather than hand-written, so a newly ingested paper
 * appears here on its own. Only the holds are hand-maintained, because "which
 * questions the bank is missing" is a measurement, not a naming convention.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** One shift: a 75-question block within a source file. */
export type JeeSitting = {
  /** Sitting key, e.g. "2026-jan-21-s1" — the slug and title are built from it. */
  key: string;
  year: number;
  /** Human sitting label WITHOUT the year, e.g. "21 Jan, Shift 1" — the title
   *  supplies the year, so carrying it here too prints it twice. */
  label: string;
  sourceFile: string;
  /**
   * WHICH 75-row block of that source file, 1-based. 1 for every 2026 file
   * (already one shift per file); 1 and 2 for a 2025 file (a whole date).
   * NOT the shift number — see `shiftNo`.
   */
  block: 1 | 2;
  /** The shift this paper actually is, as printed or inferred. */
  shiftNo: 1 | 2;
  /** True when the shift number is an inference, not stated by the source. */
  shiftInferred: boolean;
  /** Set when the paper is deliberately not shipped; the text is the reason. */
  hold?: string;
};

/** Questions per shift on the 2025-onward pattern: 3 subjects x (20 MCQ + 5 NAT). */
export const JEE_SHIFT_SIZE = 75;

/**
 * THE 2025 SHIFT ORDER IS AN INFERENCE. 2026 states its shift twice — in the
 * filename (`JEE_2026_Jan21_S1.docx`) and in the paper config's own pyqNote
 * ("21 Jan 2026 Shift 1"). 2025 states it NOWHERE: its pyqNote is the bare date
 * ("23 January 2025") and the extracted markdown carries only "Physics /
 * Section - A" headers, with no shift, session, morning or afternoon marker on
 * any page.
 *
 * So calling rows 1-75 "Shift 1" is convention, not evidence. It is recorded as
 * inferred rather than asserted silently — the MHT_CET_2025_PCM precedent, where
 * a sitting label was likewise reasoned rather than read, and where writing that
 * down at the time is what let a later session correct it. A distinctive-stem
 * check against a published copy of either shift would settle it; until then the
 * builder prints the inference on every affected paper.
 */
const SHIFT_INFERRED_YEARS = new Set([2025]);

/**
 * Papers that cannot reconstruct whole, with the shortfall measured against the
 * bank. A mock is the real paper or it is nothing — a soft count would relabel a
 * 72-question fragment as "JEE Mains 2025 (3 Apr, Shift 1)".
 *
 * A hold is an ASSERTION, not a mute: the builder still attempts every paper and
 * FAILS on a held one that now reconstructs, so closing a corpus hole surfaces
 * as a prompt to delete the line rather than as silence.
 *
 * Keyed by sitting key. Every entry is "short N" — questions absent from the
 * bank, closable by a future ingest — not a deliberate withdrawal.
 */
const HOLDS: Record<string, string> = {
  "2025-jan-22-s1": "short 1 — 1 Chemistry question absent from the bank",
  "2025-jan-28-s2": "short 1 — 1 Chemistry question absent from the bank",
  "2025-apr-03-s1": "short 3 — 1 Physics + 2 Chemistry questions absent from the bank",
  "2025-apr-04-s1": "short 2 — 1 Physics + 1 Chemistry question absent from the bank",
  "2025-apr-04-s2": "short 2 — 1 Physics + 1 Chemistry question absent from the bank",
  "2025-apr-07-s1": "short 2 — 2 Physics questions absent from the bank",
  "2025-apr-07-s2": "short 2 — 1 Physics + 1 Chemistry question absent from the bank",
  "2026-jan-22-s2": "short 1 — 1 Physics question absent from the bank",
  "2026-jan-24-s2": "short 1 — 1 Physics question absent from the bank",
  "2026-jan-28-s2": "short 1 — 1 Physics question absent from the bank",
  "2026-apr-02-s1": "short 1 — 1 Physics question absent from the bank",
  "2026-apr-02-s2": "short 1 — 1 Chemistry question absent from the bank",
  "2026-apr-04-s2": "short 2 — 2 Chemistry questions absent from the bank",
};

const MONTHS: Record<string, string> = {
  jan: "Jan", feb: "Feb", mar: "Mar", apr: "Apr", may: "May", jun: "Jun",
  jul: "Jul", aug: "Aug", sep: "Sep", oct: "Oct", nov: "Nov", dec: "Dec",
};

/**
 * `JEE_2026_Jan21_S1.docx` / `JEE_2025_Jan23.docx`. The trailing `_SN` is what
 * distinguishes a per-shift file from a whole-date one.
 */
const SOURCE_FILE_RE = /^JEE_(\d{4})_([A-Za-z]{3})(\d{2})(?:_S(\d))?\.docx$/;

type PaperConfig = { sourceFile: string; pyqYear: number };

/** Read every committed paper config (the source of record for source_file). */
function loadPaperConfigs(papersDir: string): PaperConfig[] {
  return readdirSync(papersDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = JSON.parse(readFileSync(join(papersDir, f), "utf8"));
      if (typeof raw.sourceFile !== "string" || typeof raw.pyqYear !== "number") {
        throw new Error(`jeeSittings: ${f} has no sourceFile/pyqYear`);
      }
      return { sourceFile: raw.sourceFile as string, pyqYear: raw.pyqYear as number };
    });
}

/**
 * Every buildable JEE sitting (2025+), newest first.
 *
 * A 2025+ file whose name does not match SOURCE_FILE_RE THROWS rather than being
 * skipped: a new naming convention must fail loudly, because a silently skipped
 * file is a real sitting that simply never ships and says nothing about it.
 */
export function deriveJeeSittings(
  papersDir = join(__dirname, "..", "jee", "papers"),
  /** Injectable so a fixture-dir test is not judged against the real registry. */
  holds: Record<string, string> = HOLDS
): JeeSitting[] {
  const out: JeeSitting[] = [];

  for (const cfg of loadPaperConfigs(papersDir)) {
    // 2021-2024 carry the optional-Section-B pattern gradeMock cannot express.
    if (cfg.pyqYear < 2025) continue;

    const m = SOURCE_FILE_RE.exec(cfg.sourceFile);
    if (!m) {
      throw new Error(
        `jeeSittings: unrecognised source file "${cfg.sourceFile}". ` +
          `Expected JEE_<year>_<Mon><DD>[_S<n>].docx — add the new convention ` +
          `rather than letting the sitting be skipped.`
      );
    }
    const [, yearStr, monRaw, dayStr, shiftStr] = m;
    const year = Number(yearStr);
    if (year !== cfg.pyqYear) {
      throw new Error(
        `jeeSittings: ${cfg.sourceFile} names ${year} but its config says ${cfg.pyqYear}`
      );
    }
    const mon = MONTHS[monRaw.toLowerCase()];
    if (!mon) throw new Error(`jeeSittings: bad month in ${cfg.sourceFile}`);
    const day = Number(dayStr);
    const monKey = mon.toLowerCase();

    // A file naming its own shift holds ONE block; a whole-date file holds two.
    const blocks: { block: 1 | 2; shiftNo: 1 | 2 }[] = shiftStr
      ? [{ block: 1, shiftNo: Number(shiftStr) === 2 ? 2 : 1 }]
      : [
          { block: 1, shiftNo: 1 },
          { block: 2, shiftNo: 2 },
        ];

    for (const b of blocks) {
      const key = `${year}-${monKey}-${dayStr}-s${b.shiftNo}`;
      out.push({
        key,
        year,
        label: `${day} ${mon}, Shift ${b.shiftNo}`,
        sourceFile: cfg.sourceFile,
        block: b.block,
        shiftNo: b.shiftNo,
        shiftInferred: SHIFT_INFERRED_YEARS.has(year),
        ...(holds[key] ? { hold: holds[key] } : {}),
      });
    }
  }

  // A hold naming a sitting that does not exist is a stale line — it would sit
  // there forever suppressing nothing while reading as a known gap.
  const keys = new Set(out.map((s) => s.key));
  const orphan = Object.keys(holds).filter((k) => !keys.has(k));
  if (orphan.length) {
    throw new Error(`jeeSittings: HOLDS names unknown sitting(s): ${orphan.join(", ")}`);
  }

  return out.sort((a, b) => b.key.localeCompare(a.key));
}
