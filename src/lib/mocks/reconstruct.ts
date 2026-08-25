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
export function cdsMockSlug(year: number, edition: CdsEdition): string {
  return `cds-${year}-${edition.toLowerCase()}-english`;
}

/** CDS title, e.g. "CDS (I) 2026 — English" (the scripts/cds pyqNote form). */
export function cdsMockTitle(year: number, edition: CdsEdition): string {
  return `CDS (${edition}) ${year} — English`;
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
