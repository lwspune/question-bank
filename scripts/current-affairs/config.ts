/**
 * The sittings a Current-Affairs pool is authored FOR.
 *
 * One entry per NDA sitting we either have a pool for or intend to build one
 * for. `examMonth` is month precision on purpose: the bank records `pyq_month`
 * as 'Apr' / 'Sep' (the NDA I = April, NDA II = September convention), and the
 * window arithmetic needs nothing finer.
 *
 * `poolSourceFile` is the SAME string `scripts/bank-paper/build.ts` pins its
 * Current-Affairs picks to. Keeping one spelling in one place is the point: the
 * blueprint §8b note in NDA_GAT_BLUEPRINT.md exists because a comment naming the
 * pool asserted an intent the code could not enforce, and a second literal is
 * how that happens again.
 */

/** NDA. Matches `scripts/nda-gat/config.ts`. */
export const EXAM_ID = "e4e753d1-c84a-45a8-93ad-6f0bf9733c95";

/** The subject whose taxonomy the pool is built against. */
export const SUBJECT_NAME = "Current Affairs";

export interface Sitting {
  slug: string;
  label: string;
  /** "YYYY-MM". The month the paper was (or will be) sat. */
  examMonth: string;
  /** The authored pool for this sitting, as ingested. Absent until one exists. */
  poolSourceFile?: string;
  /** The real paper, once ingested. Absent until the sitting happens. */
  paperSourceFile?: string;
  notes?: string;
}

export const SITTINGS: Record<string, Sitting> = {
  "nda-1-2026": {
    slug: "nda-1-2026",
    label: "NDA I 2026 (April)",
    examMonth: "2026-04",
    paperSourceFile: "GAT_NDA1_2026_QuestionBank.xlsx",
    notes:
      "No authored pool — this sitting predates the pool practice. Registered so its " +
      "9 Current-Affairs PYQs feed the blueprint and the exclusion list.",
  },
  "nda-2-2026": {
    slug: "nda-2-2026",
    label: "NDA II 2026 (September)",
    examMonth: "2026-09",
    poolSourceFile: "Current Affairs_Sep26.docx",
    paperSourceFile: "NDA2_2026_GAT_SetA.pdf",
    notes:
      "The sitting that motivated this pipeline. Scored ZERO real topic hits against the 11 " +
      "Current-Affairs questions actually set — run `hindsight.ts nda-2-2026` to reproduce it. " +
      "The source docx held 100 questions and 88 were committed. The 12 held back are NOT " +
      "dedup skips: per scripts/practice-paper/config.ts they were marked `flawed` and never " +
      "written. THREE are genuinely defective (a Match List whose List II repeats a value). " +
      "The other NINE are dated Feb-May 2026 — the freshest and best-targeted material in the " +
      "whole pool — and were withheld ONLY because they are single-source and nobody " +
      "cross-checked them against PIB / MEA / ISRO / padmaawards.gov.in. So the pool's " +
      "on-window fraction is under-stated by its own quarantine, and SOURCING, not the " +
      "window, is what actually bound it.",
  },
  "nda-1-2027": {
    slug: "nda-1-2027",
    label: "NDA I 2027 (April)",
    examMonth: "2027-04",
    notes:
      "PLANNING ASSUMPTION: April, from the NDA I convention, not from a published " +
      "UPSC calendar. Correct it when the notification lands — the window shifts with it.",
  },
};

export function requireSitting(slug: string | undefined): Sitting {
  if (!slug) {
    throw new Error(
      `Name a sitting. Known: ${Object.keys(SITTINGS).join(", ")}`
    );
  }
  const hit = SITTINGS[slug];
  if (!hit) {
    throw new Error(
      `Unknown sitting ${JSON.stringify(slug)}. Known: ${Object.keys(SITTINGS).join(", ")}`
    );
  }
  return hit;
}

/** Sittings strictly before this one, newest first — the exclusion-list source. */
export function priorSittings(of: Sitting): Sitting[] {
  return Object.values(SITTINGS)
    .filter((s) => s.examMonth < of.examMonth)
    .sort((a, b) => b.examMonth.localeCompare(a.examMonth));
}
