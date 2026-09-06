/**
 * Reconstruct a real past paper from the bank into an immutable mock snapshot.
 *
 * "Use PYQPs as is": a mock is exactly the PYQs of one sitting (exam, paper,
 * year, month), in original order — NOT a blueprint-sampled mix. This module is
 * the pure core: given the paper's rows (already fetched from the bank) + its
 * blueprint, it orders them, validates completeness against the blueprint, and
 * emits the snapshot the builder script upserts into `mock_tests`.
 *
 * The snapshot stores only ordered question REFS (+ per-question marking +
 * section) — question CONTENT is rendered live from `questions` at delivery via
 * the existing render path (PYQs are stable + PUBLIC), so math/tables/images
 * reuse the same pipeline as /browse. The answer key is graded live at submit.
 *
 * Pure — no I/O. Unit-tested in tests/mock-reconstruct.test.ts.
 */

import { slugToUuid } from "../quiz/quizPayload";
import {
  totalQuestions,
  totalMarks,
  type MockPaperBlueprint,
} from "./blueprints";

/** One PYQ row of a paper, as fetched from the bank (id + ordering + key). */
export type PaperQuestionRow = {
  id: string;
  /** Excel row of the source paper — the reliable NUMERIC ordering key
   *  (question_number is text and sorts "1,10,100"). */
  sourceRow: number | null;
  questionNumber: string | null;
  subjectName: string;
  /**
   * The `source_file` this row came from. Only needed when a sitting is MERGED
   * from two labels (see dedupeMergedRows) — every other path ignores it.
   */
  sourceFile?: string;
  /** The correct option label, or null when the key is missing (a defect). */
  answer: "A" | "B" | "C" | "D" | null;
  /**
   * Officially dropped / bonus question (e.g. NTA awarded full marks to all).
   * It appeared on the real paper, so a faithful mock includes it — but it has
   * no valid key, so it's graded as GRACE: full marks to everyone, no penalty.
   */
  grace?: boolean;
};

export type MockQuestionSnapshot = {
  position: number;
  questionId: string;
  sectionKey: string;
  marks: number;
  negMarks: number;
  /** Grace question — awarded to all at grade time (see PaperQuestionRow.grace). */
  grace?: boolean;
};

export type MockPaperSnapshot = {
  slug: string;
  id: string;
  examName: string;
  examSlug: string;
  paperCode: string;
  title: string;
  pyqYear: number;
  pyqMonth: string | null;
  durationSecs: number;
  marking: { correct: number; wrong: number };
  totalQuestions: number;
  totalMarks: number;
  sections: { key: string; label: string; count: number }[];
  questions: MockQuestionSnapshot[];
};

/** Numeric ordering key for a row: source_row, else parsed question_number. */
function orderKey(r: PaperQuestionRow): number {
  if (typeof r.sourceRow === "number") return r.sourceRow;
  const n = parseInt(String(r.questionNumber ?? ""), 10);
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
}

/** Sort a section's rows into original paper order (does not mutate input). */
export function orderPaperRows(rows: PaperQuestionRow[]): PaperQuestionRow[] {
  return [...rows].sort((a, b) => orderKey(a) - orderKey(b));
}

// ── Merging a sitting that exists under TWO source_file labels ──────────────
// Three MHT-CET papers were uploaded twice, independently typed. content_hash
// deduped only the rows whose typing matched, so each paper's 150 questions are
// SPLIT across both labels: neither reconstructs alone, the union is exactly 150.

/**
 * How far a file's `source_row` runs ahead of the paper's own question number.
 *
 * MEASURED, not assumed: every .xlsx upload runs Physics `source_row` 2..51 with
 * `question_number` 1..50 — the Excel header row — while the 2025 .docx sources
 * run 1..50 for the same questions. Anything else is treated as 0 rather than
 * guessed; a wrong offset would silently shift a whole paper by one.
 */
export function paperNumberOffset(sourceFile: string | undefined): number {
  return sourceFile?.toLowerCase().endsWith(".xlsx") ? 1 : 0;
}

/**
 * Rewrite each row's ordering key from its file's `source_row` to the PAPER's
 * question number, so rows from two files that number differently can be
 * compared and ordered as one paper.
 *
 * Without this, merging the 2025 pair (a .docx at 1..150 with an .xlsx at
 * 2..151) pairs docx q13 with xlsx q12 and produces TIES between adjacent
 * questions — leaving the paper's order arbitrary exactly where the two
 * conventions collide, with nothing downstream able to notice.
 */
export function normalisePaperRows(
  rows: PaperQuestionRow[]
): PaperQuestionRow[] {
  return rows.map((r) =>
    typeof r.sourceRow === "number"
      ? { ...r, sourceRow: r.sourceRow - paperNumberOffset(r.sourceFile) }
      : r
  );
}

/**
 * Collapse a merged sitting to one row per (section, position), preferring the
 * PRIMARY label's copy.
 *
 * Both labels usually hold the same question — they are two typings of one
 * paper — which is a duplicate ordering key, and validatePaperRows rejects those
 * (rightly: an ambiguous order is not a paper). So the merge must choose, and
 * choose deterministically regardless of the order rows arrive from PostgREST.
 *
 * The key includes the SUBJECT because collapsing two subjects that happen to
 * share a position would silently delete a real question.
 *
 * Which copy wins is a genuine editorial call and the caller owns it: for the
 * 2025 pair the .docx is the curated-pipeline transcription (derived + verified
 * answers) and is preferred over the older bulk .xlsx.
 */
export function dedupeMergedRows(
  rows: PaperQuestionRow[],
  primarySourceFile: string
): PaperQuestionRow[] {
  const best = new Map<string, PaperQuestionRow>();
  for (const r of rows) {
    const key = `${r.subjectName}#${orderKey(r)}`;
    const seen = best.get(key);
    if (!seen) { best.set(key, r); continue; }
    // Primary wins; otherwise keep what we had (first-seen), so the result does
    // not depend on row arrival order.
    if (seen.sourceFile !== primarySourceFile && r.sourceFile === primarySourceFile) {
      best.set(key, r);
    }
  }
  return [...best.values()];
}

/** The blueprint section a bank subject belongs to; null when it fits none. */
export function assignSection(
  bp: MockPaperBlueprint,
  subjectName: string
): string | null {
  const sec = bp.sections.find((s) => s.subjects.includes(subjectName));
  return sec ? sec.key : null;
}

/** NDA canonical: April = edition I, September = edition II. */
function ndaEdition(month: string | null): string | null {
  if (!month) return null;
  const m = month.slice(0, 3).toLowerCase();
  if (m === "apr") return "I";
  if (m === "sep") return "II";
  return null;
}

/** Stable slug for a mock: "nda-2024-sep-maths" (month omitted when absent). */
export function mockSlug(
  examSlug: string,
  year: number,
  month: string | null,
  code: string
): string {
  const parts = [examSlug, String(year)];
  if (month) parts.push(month.toLowerCase());
  parts.push(code);
  return parts.join("-");
}

/** Human title, e.g. "NDA 2024 (II) — Paper I — Mathematics". */
export function mockTitle(
  bp: MockPaperBlueprint,
  year: number,
  month: string | null
): string {
  const edition = bp.examSlug === "nda" ? ndaEdition(month) : null;
  const editionLabel = edition ? ` (${edition})` : "";
  return `${bp.examName} ${year}${editionLabel} — ${bp.paperLabel}`;
}

/**
 * NEET slug — no month (NEET has none) and a `-re` segment for a re-examination
 * so the two same-year sittings (NEET 2024 + Re-NEET 2024) get distinct slugs.
 * e.g. "neet-2024", "neet-2024-re", "neet-2021".
 */
export function neetMockSlug(year: number, isRe: boolean): string {
  return `neet-${year}${isRe ? "-re" : ""}`;
}

/** NEET title, e.g. "NEET (UG) 2024" / "Re-NEET (UG) 2024". */
export function neetMockTitle(year: number, isRe: boolean): string {
  return `${isRe ? "Re-NEET" : "NEET"} (UG) ${year}`;
}

/** A CDS sitting within a year: UPSC's own CDS (I) / CDS (II) labels. */
export type CdsEdition = "I" | "II";

/**
 * CDS slug — edition-aware, e.g. "cds-2026-i-english", "cds-2025-ii-english".
 *
 * THE REASON THIS EXISTS: `pyq_month` is NULL on every CDS row, so the generic
 * mockSlug() emits the SAME slug for the I and II sittings of one year — and
 * since the mock id is slugToUuid(slug), the second upsert would SILENTLY
 * OVERWRITE the first, leaving one sitting of that year missing with no error.
 * The edition segment is what keeps the two sittings distinct. (NEET solves the
 * same null-month problem with its `-re` segment.)
 */
export type CdsSubject = "english" | "gk" | "maths";

/** How each CDS subject is spelled in a mock title. */
const CDS_SUBJECT_LABEL: Record<CdsSubject, string> = {
  english: "English",
  gk: "General Knowledge",
  maths: "Elementary Mathematics",
};

/**
 * CDS slug, e.g. "cds-2026-i-english" / "cds-2026-i-gk" / "cds-2026-i-maths".
 *
 * `subject` is REQUIRED rather than defaulted to "english". A default would have
 * let a new caller silently emit an English slug for a Maths paper, and since the
 * mock id is slugToUuid(slug) that upsert would OVERWRITE the real English mock
 * with no error — the collision failure this helper exists to prevent. Making it
 * required means the typechecker enumerates every call site instead.
 *
 * The three existing subjects are a closed union for the same reason: an
 * arbitrary string would let a typo ("englsh") mint a slug that looks valid,
 * builds a mock nobody can find, and leaves the real one untouched.
 */
export function cdsMockSlug(
  year: number,
  edition: CdsEdition,
  subject: CdsSubject
): string {
  return `cds-${year}-${edition.toLowerCase()}-${subject}`;
}

/** CDS title, e.g. "CDS (I) 2026 — English" (the scripts/cds pyqNote form). */
export function cdsMockTitle(
  year: number,
  edition: CdsEdition,
  subject: CdsSubject
): string {
  return `CDS (${edition}) ${year} — ${CDS_SUBJECT_LABEL[subject]}`;
}

/**
 * MHT-CET slug — the sitting KEY carries the date and shift, e.g.
 * "mht-cet-2023-may-03-s1-maths" / "mht-cet-2021-phy-chem".
 *
 * THE REASON THIS EXISTS: the generic mockSlug() keys on (year, month), and 17
 * of the 45 MHT-CET sittings share (2023, "May") — so it would emit ONE slug for
 * all 17, and since the mock id is slugToUuid(slug) the upserts would silently
 * overwrite each other, leaving 16 real sittings missing with no error. The key
 * (see scripts/mocks/mhtcetSittings.ts) is the only per-sitting identity the
 * corpus has; undated sources carry a bare year, dated ones "YYYY-mon-DD-sN".
 */
export function mhtCetMockSlug(sittingKey: string, paperCode: string): string {
  return `mht-cet-${sittingKey}-${paperCode}`;
}

/**
 * MHT-CET title, e.g. "MHT-CET 2023 (3 May Shift 1) — Paper I — Mathematics".
 *
 * `label` is null for the three sources that carry no date on disk or in the
 * bank (the 2021 and 2022 single papers) — those title as a bare year rather
 * than claiming a sitting nobody has established.
 */
export function mhtCetMockTitle(
  year: number,
  label: string | null,
  bp: MockPaperBlueprint
): string {
  return `MHT-CET ${year}${label ? ` (${label})` : ""} — ${bp.paperLabel}`;
}

/**
 * Check reconstructed rows against the blueprint. Returns a list of issue
 * strings (empty = the paper faithfully reconstructs). Never throws.
 */
export function validatePaperRows(
  bp: MockPaperBlueprint,
  rows: PaperQuestionRow[]
): string[] {
  const issues: string[] = [];

  // Section membership + per-section counts.
  const perSection = new Map<string, number>();
  for (const r of rows) {
    const key = assignSection(bp, r.subjectName);
    if (!key) {
      issues.push(
        `Question ${r.id} (subject "${r.subjectName}") maps to no section in this paper`
      );
      continue;
    }
    perSection.set(key, (perSection.get(key) ?? 0) + 1);
    // A grace (officially-dropped/bonus) question legitimately has no valid key.
    if (!r.answer && !r.grace) issues.push(`Question ${r.id} has no correct answer (key)`);
  }
  // Per-section count is a HARD contract only where the blueprint declares one
  // (NDA). NEET's sections omit `count` (layout varies by sitting) → skipped.
  for (const s of bp.sections) {
    if (s.count == null) continue;
    const got = perSection.get(s.key) ?? 0;
    if (got !== s.count) {
      issues.push(
        `Section "${s.label}" expected ${s.count} questions, got ${got}`
      );
    }
  }

  // Total count — only when the blueprint declares section counts. NEET derives
  // its total from the actual rows (soft-count; the build script warns on a short
  // sitting from its per-sitting expected count instead).
  const expectedTotal = totalQuestions(bp);
  if (expectedTotal > 0 && rows.length !== expectedTotal) {
    issues.push(
      `Paper expected ${expectedTotal} questions, got ${rows.length}`
    );
  }

  // Duplicate ordering keys within a section would make the order ambiguous.
  const keys = new Map<string, Set<number>>();
  for (const r of rows) {
    const sec = assignSection(bp, r.subjectName) ?? "?";
    const set = keys.get(sec) ?? new Set<number>();
    const k = orderKey(r);
    if (set.has(k)) {
      issues.push(`Duplicate ordering key ${k} in section "${sec}"`);
    }
    set.add(k);
    keys.set(sec, set);
  }

  return issues;
}

/**
 * Build the immutable mock snapshot for one paper. Throws with the joined issue
 * list if the reconstruction is not faithful (fail fast — never ship a partial
 * paper as a "mock"). Questions are ordered by section (blueprint order), then
 * by original paper order within each section, and numbered 1..N globally.
 */
export function buildMockPaper(
  bp: MockPaperBlueprint,
  rows: PaperQuestionRow[],
  opts: {
    year: number;
    month: string | null;
    title?: string;
    /** Override the derived slug (NEET supplies its own edition-aware slug). */
    slug?: string;
    /** Override the blueprint's default duration (NEET's 200-q sittings). */
    durationSecs?: number;
  }
): MockPaperSnapshot {
  const slug =
    opts.slug ?? mockSlug(bp.examSlug, opts.year, opts.month, bp.code);
  const issues = validatePaperRows(bp, rows);
  if (issues.length > 0) {
    throw new Error(`Cannot build mock ${slug}:\n- ${issues.join("\n- ")}`);
  }

  const questions: MockQuestionSnapshot[] = [];
  let position = 0;
  for (const section of bp.sections) {
    const sectionRows = orderPaperRows(
      rows.filter((r) => assignSection(bp, r.subjectName) === section.key)
    );
    for (const r of sectionRows) {
      position += 1;
      questions.push({
        position,
        questionId: r.id,
        sectionKey: section.key,
        marks: bp.marking.correct,
        negMarks: bp.marking.wrong,
        ...(r.grace ? { grace: true } : {}),
      });
    }
  }

  // Totals + per-section counts are derived from the rows actually placed — so
  // the soft-count exams (NEET) report their true length, and NDA still reports
  // the blueprint count (placed === declared by its hard contract).
  const total = questions.length;
  const placedPerSection = new Map<string, number>();
  for (const q of questions)
    placedPerSection.set(q.sectionKey, (placedPerSection.get(q.sectionKey) ?? 0) + 1);
  return {
    slug,
    id: slugToUuid(slug),
    examName: bp.examName,
    examSlug: bp.examSlug,
    paperCode: bp.code,
    title: opts.title ?? mockTitle(bp, opts.year, opts.month),
    pyqYear: opts.year,
    pyqMonth: opts.month,
    durationSecs: opts.durationSecs ?? bp.durationSecs,
    marking: bp.marking,
    totalQuestions: total,
    totalMarks: Math.round(total * bp.marking.correct * 100) / 100,
    sections: bp.sections
      .map((s) => ({
        key: s.key,
        label: s.label,
        count: s.count ?? placedPerSection.get(s.key) ?? 0,
      }))
      .filter((s) => s.count > 0), // drop empty sections (defensive)
    questions,
  };
}
