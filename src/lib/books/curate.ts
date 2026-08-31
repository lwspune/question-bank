/**
 * Pure curation moves for a book. No I/O — the caller loads the section and
 * writes the returned positions.
 *
 * THE UNIT OF MOVEMENT IS THE SET, not the question. 3,175 of the 3,180
 * questions share a `context` with their siblings, and in Reading Comprehension
 * one passage feeds five or more of them; a question moved on its own is
 * stranded from the passage that makes it answerable, and nothing downstream
 * would notice, because the question is still present. `positionForMove` in
 * `papers/sections.ts` moves ONE item and is the right tool there; a book needs
 * to move a contiguous block and keep it contiguous.
 *
 * Positions are fractional (see migration 0086), so a move rewrites only the
 * rows that actually moved rather than renumbering the section. The cost of
 * that is finite float precision: roughly 50 successive moves into the SAME gap
 * will exhaust it. Nothing renormalises today — if a section is ever reordered
 * that heavily, that is the moment to add it.
 */
import type { BookSectionKey } from "./order";

/** A set as it currently sits in its section: its questions and their positions. */
export type PositionedSet = {
  key: string;
  /** In render order; `position` ascending. */
  items: { questionId: string; position: number }[];
};

export type PositionMove = { questionId: string; position: number };
export type SectionMove = PositionMove & { sectionKey: BookSectionKey };

/**
 * Spread `count` strictly-increasing positions into the gap (`lower`, `upper`).
 *
 * A null bound means "open" — before the first set, or after the last — and the
 * block is placed a whole unit clear of the one real bound so it cannot collide
 * with it.
 */
function spread(lower: number | null, upper: number | null, count: number): number[] {
  if (count <= 0) return [];
  if (lower == null && upper == null) {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
  if (lower == null) {
    // Land the block immediately below `upper`, keeping ascending order.
    return Array.from({ length: count }, (_, i) => upper! - count + i);
  }
  if (upper == null) {
    return Array.from({ length: count }, (_, i) => lower + 1 + i);
  }
  // Evenly spaced strictly inside the gap, so the block fits however tight it
  // has become after earlier moves.
  const step = (upper - lower) / (count + 1);
  return Array.from({ length: count }, (_, i) => lower + step * (i + 1));
}

const firstPos = (s: PositionedSet) => s.items[0]?.position ?? 0;
const lastPos = (s: PositionedSet) => s.items[s.items.length - 1]?.position ?? 0;

/**
 * Move one set one step up or down within its section.
 *
 * Returns the new position for EVERY question in the moved set, and nothing
 * else — no other set is touched. Null when the move is impossible (unknown
 * set, or it is already at the end it is being moved toward), so the caller can
 * disable the control rather than write a no-op.
 */
export function planSetMove(
  sets: PositionedSet[],
  key: string,
  direction: "up" | "down"
): PositionMove[] | null {
  const i = sets.findIndex((s) => s.key === key);
  if (i === -1) return null;
  const moving = sets[i];
  if (moving.items.length === 0) return null;

  let lower: number | null;
  let upper: number | null;
  if (direction === "up") {
    if (i === 0) return null;
    // Clear the WHOLE previous set, not just its first question.
    lower = i >= 2 ? lastPos(sets[i - 2]) : null;
    upper = firstPos(sets[i - 1]);
  } else {
    if (i >= sets.length - 1) return null;
    lower = lastPos(sets[i + 1]);
    upper = i + 2 < sets.length ? firstPos(sets[i + 2]) : null;
  }

  const positions = spread(lower, upper, moving.items.length);
  return moving.items.map((item, n) => ({
    questionId: item.questionId,
    position: positions[n],
  }));
}

/**
 * Move a whole set into the other half of the chapter, appended at its end.
 *
 * Appended rather than slotted in by date: the target section's order may
 * already be curated, and guessing an insertion point would reshuffle someone's
 * arrangement. The mover can then step it up to where they want it.
 */
export function planSetToSection(
  sets: PositionedSet[],
  key: string,
  sectionKey: BookSectionKey,
  targetSets: PositionedSet[]
): SectionMove[] | null {
  const moving = sets.find((s) => s.key === key);
  if (!moving || moving.items.length === 0) return null;

  const max = targetSets.reduce((m, s) => Math.max(m, lastPos(s)), 0);
  return moving.items.map((item, n) => ({
    questionId: item.questionId,
    sectionKey,
    position: max + 1 + n,
  }));
}
