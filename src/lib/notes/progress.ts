/**
 * Pure helpers for the /notes progress + bookmarks track layer (migration 0046
 * notes_progress). No I/O — validation of the write payload, mapping a semantic
 * patch to DB columns, and summarizing a user's rows for the "Your notes" strip.
 *
 * Progress rows key on the editorial notes slugs (subtopic/chapter) + a
 * denormalized subject_route — notes are TS modules, not DB rows, so there is no
 * FK to reference (same soft-reference model as question_concept_tags). The
 * denormalized chapter/subject let the strip group + link without a join.
 */

/** A user's notes_progress row, camelCased from the DB. */
export type NotesProgressRow = {
  subtopicSlug: string;
  chapterSlug: string;
  subjectRoute: string;
  bookmarked: boolean;
  masteredAt: string | null;
  checkpointScore: number | null;
  checkpointTotal: number | null;
  checkpointAt: string | null;
  lastViewedAt: string;
};

/** The semantic write a client sends. All patch fields optional (partial update). */
export type ProgressWrite = {
  subtopicSlug: string;
  chapterSlug: string;
  subjectRoute: string;
  bookmarked?: boolean;
  mastered?: boolean;
  checkpoint?: { score: number; total: number };
  touchViewed?: boolean;
};

// Editorial slugs are lowercase kebab (globally-unique per the notes convention).
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUG = 120;

function isSlug(v: unknown): v is string {
  return typeof v === "string" && v.length > 0 && v.length <= MAX_SLUG && SLUG_RE.test(v);
}

export type SanitizeResult =
  | { ok: true; value: ProgressWrite }
  | { ok: false; error: string };

/**
 * Validate + normalize an untrusted write body. Rejects malformed slugs and
 * incoherent checkpoint scores; requires at least one actual change so a no-op
 * write can't create an empty row. Pure — the route wires the session + DB.
 */
export function sanitizeProgressWrite(raw: unknown): SanitizeResult {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, error: "Invalid request." };
  }
  const b = raw as Record<string, unknown>;

  if (!isSlug(b.subtopicSlug)) return { ok: false, error: "Invalid subtopic." };
  if (!isSlug(b.chapterSlug)) return { ok: false, error: "Invalid chapter." };
  if (!isSlug(b.subjectRoute)) return { ok: false, error: "Invalid subject." };

  const out: ProgressWrite = {
    subtopicSlug: b.subtopicSlug,
    chapterSlug: b.chapterSlug,
    subjectRoute: b.subjectRoute,
  };
  let hasChange = false;

  if (b.bookmarked !== undefined) {
    if (typeof b.bookmarked !== "boolean") return { ok: false, error: "Invalid bookmark." };
    out.bookmarked = b.bookmarked;
    hasChange = true;
  }
  if (b.mastered !== undefined) {
    if (typeof b.mastered !== "boolean") return { ok: false, error: "Invalid mastered flag." };
    out.mastered = b.mastered;
    hasChange = true;
  }
  if (b.checkpoint !== undefined) {
    const c = b.checkpoint as Record<string, unknown>;
    const score = c?.score;
    const total = c?.total;
    if (
      typeof score !== "number" ||
      typeof total !== "number" ||
      !Number.isInteger(score) ||
      !Number.isInteger(total) ||
      total < 1 ||
      score < 0 ||
      score > total
    ) {
      return { ok: false, error: "Invalid checkpoint score." };
    }
    out.checkpoint = { score, total };
    hasChange = true;
  }
  if (b.touchViewed !== undefined) {
    if (typeof b.touchViewed !== "boolean") return { ok: false, error: "Invalid view flag." };
    // Only touchViewed:true is a change; false is a no-op (can't create a row).
    if (b.touchViewed) {
      out.touchViewed = true;
      hasChange = true;
    }
  }

  if (!hasChange) return { ok: false, error: "Nothing to update." };
  return { ok: true, value: out };
}

/** DB column patch (snake_case) for the mutable fields of a notes_progress row. */
export type ProgressColumnPatch = {
  bookmarked?: boolean;
  mastered_at?: string | null;
  checkpoint_score?: number;
  checkpoint_total?: number;
  checkpoint_at?: string;
  last_viewed_at?: string;
  updated_at: string;
};

/**
 * Map a validated semantic patch to the DB columns to upsert. `mastered:true`
 * stamps mastered_at (false clears it); a checkpoint stores the LATEST attempt
 * (not best — best would need a read-modify-write); touchViewed bumps
 * last_viewed_at. updated_at always moves.
 */
export function mergeProgressPatch(
  patch: ProgressWrite,
  nowIso: string
): ProgressColumnPatch {
  const cols: ProgressColumnPatch = { updated_at: nowIso };
  if (patch.bookmarked !== undefined) cols.bookmarked = patch.bookmarked;
  if (patch.mastered !== undefined) cols.mastered_at = patch.mastered ? nowIso : null;
  if (patch.checkpoint) {
    cols.checkpoint_score = patch.checkpoint.score;
    cols.checkpoint_total = patch.checkpoint.total;
    cols.checkpoint_at = nowIso;
  }
  if (patch.touchViewed) cols.last_viewed_at = nowIso;
  return cols;
}

/**
 * Human label from an editorial slug — the "Your notes" strip displays from the
 * denormalized row (no server title map needed). Approximate (title-cased words);
 * exact titles would need the registry, deliberately traded for a lean payload.
 */
export function prettifyNotesSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => (w.length <= 2 ? w : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

export type NotesProgressSummary = {
  bookmarked: NotesProgressRow[];
  /** Recently-viewed but not-yet-mastered — "continue where you left off". */
  recent: NotesProgressRow[];
  masteredCount: number;
  bookmarkedCount: number;
};

/**
 * Roll a user's progress rows into the "Your notes" strip: bookmarks (newest
 * activity first), a short continue-list (recently viewed, not mastered), and
 * counts. Pure — sorting is by lastViewedAt desc.
 */
export function summarizeNotesProgress(
  rows: readonly NotesProgressRow[],
  recentLimit = 5
): NotesProgressSummary {
  const byRecent = [...rows].sort((a, b) => b.lastViewedAt.localeCompare(a.lastViewedAt));
  const bookmarked = byRecent.filter((r) => r.bookmarked);
  const recent = byRecent.filter((r) => !r.masteredAt).slice(0, Math.max(0, recentLimit));
  const masteredCount = rows.filter((r) => r.masteredAt).length;
  return { bookmarked, recent, masteredCount, bookmarkedCount: bookmarked.length };
}
