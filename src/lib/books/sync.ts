/**
 * Pure diff between what the bank says a book should hold and what the book
 * currently holds. No I/O — `scripts/books/sync.ts` supplies both sides and
 * applies the plan.
 *
 * Everything here is shaped by one rule: A SYNC MUST NEVER DESTROY A CURATION
 * DECISION. The book is materialised precisely so it can be curated, and the
 * bank keeps moving underneath it (ingests, key fixes, questions withdrawn to
 * PRIVATE). So the plan only ever ADDS, and reports the rest for a human.
 *
 *   - new in the bank      -> APPENDED to the end of its section, never
 *                             inserted mid-order, which would reshuffle a
 *                             sequence someone arranged by hand.
 *   - gone from the bank   -> REPORTED. Deleting the row would delete the
 *                             `excluded` decision on it, and the next sync
 *                             would re-add the question as if it were new.
 *   - re-chaptered in the bank -> REPORTED. The book's `chapter_slug` is
 *                             ALLOWED to diverge from the bank's; that
 *                             divergence is the "move this question" feature,
 *                             so an auto-move would undo it every run.
 */
/** What the bank says: one row per in-scope question, in derived book order. */
export type DerivedRow = {
  questionId: string;
  chapterSlug: string;
  sectionKey: string;
  /** 0-based index within its (chapter, section) in the derived order. */
  order: number;
};

/** What the book currently holds — a `book_questions` row. */
export type StoredRow = {
  questionId: string;
  chapterSlug: string;
  sectionKey: string;
  position: number;
  excluded: boolean;
};

export type BookInsert = {
  questionId: string;
  chapterSlug: string;
  sectionKey: string;
  position: number;
};

export type SyncPlan = {
  /** Questions to add, already carrying their append position. */
  inserts: BookInsert[];
  /** In the book, no longer in the bank's scope. Reported, never deleted. */
  orphans: StoredRow[];
  /** The bank moved these to another chapter. Reported, never applied. */
  rechaptered: { questionId: string; from: string; to: string }[];
  /** Rows already present and left untouched. */
  unchanged: number;
};

const sectionOf = (chapterSlug: string, sectionKey: string) =>
  `${chapterSlug}\u0000${sectionKey}`;

/**
 * Diff the derived order against the stored one.
 *
 * Deterministic: the output depends only on the CONTENT of both sides, never
 * on the order the rows arrive in — inserts are emitted in derived order, and
 * orphans and re-chapterings are sorted.
 */
export function planBookSync(derived: DerivedRow[], stored: StoredRow[]): SyncPlan {
  const storedById = new Map(stored.map((r) => [r.questionId, r]));

  // Where each section's append cursor starts: after everything already in it.
  // A curated position can be fractional (7.5), so this reads the real max
  // rather than assuming positions are 1..N.
  const nextPosition = new Map<string, number>();
  for (const row of stored) {
    const key = sectionOf(row.chapterSlug, row.sectionKey);
    nextPosition.set(key, Math.max(nextPosition.get(key) ?? 0, row.position));
  }

  const inserts: BookInsert[] = [];
  const rechaptered: SyncPlan["rechaptered"] = [];
  let unchanged = 0;

  const inDerivedOrder = [...derived].sort(
    (a, b) =>
      a.chapterSlug.localeCompare(b.chapterSlug) ||
      a.sectionKey.localeCompare(b.sectionKey) ||
      a.order - b.order ||
      a.questionId.localeCompare(b.questionId)
  );

  for (const row of inDerivedOrder) {
    const existing = storedById.get(row.questionId);
    if (existing) {
      unchanged += 1;
      // A section change is the book's own doing and is never reported; a
      // CHAPTER change means the bank re-filed the question, which is worth
      // a human's attention even though we leave it where it is.
      if (existing.chapterSlug !== row.chapterSlug) {
        rechaptered.push({
          questionId: row.questionId,
          from: existing.chapterSlug,
          to: row.chapterSlug,
        });
      }
      continue;
    }
    const key = sectionOf(row.chapterSlug, row.sectionKey);
    const position = (nextPosition.get(key) ?? 0) + 1;
    nextPosition.set(key, position);
    inserts.push({
      questionId: row.questionId,
      chapterSlug: row.chapterSlug,
      sectionKey: row.sectionKey,
      position,
    });
  }

  const derivedIds = new Set(derived.map((r) => r.questionId));
  const orphans = stored
    .filter((r) => !derivedIds.has(r.questionId))
    .sort((a, b) => a.questionId.localeCompare(b.questionId));

  rechaptered.sort((a, b) => a.questionId.localeCompare(b.questionId));

  return { inserts, orphans, rechaptered, unchanged };
}
