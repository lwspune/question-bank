/**
 * The free download is ONE PAPER: the Question Paper and its Answer Key for the
 * same questions (2026-10-07). It was one FILE (migration 0131), and 7 of 8
 * students took the paper, then met the pass offer the moment they asked for
 * its key; none opened checkout. Free sample ended on its most frustrating
 * page: questions with no answers.
 *
 * "Same paper" has to be known BEFORE the questions are fetched (the gate runs
 * first, so a refused request costs nothing), so the paper is named by what the
 * request names: a past paper's slug, a selection's question ids, or the
 * filters. Server-only (node:crypto). Spec: tests/free-paper.test.ts.
 */
import { createHash } from "node:crypto";

const sha = (s: string) => createHash("sha256").update(s).digest("hex").slice(0, 32);

/** A value with object keys sorted and string/number lists sorted, so the same
 *  filters always print the same way. */
function canonical(v: unknown): unknown {
  if (Array.isArray(v)) {
    const items = v.map(canonical);
    return items.every((x) => typeof x === "string" || typeof x === "number")
      ? [...items].sort((a, b) => String(a).localeCompare(String(b)))
      : items;
  }
  if (v && typeof v === "object") {
    return Object.fromEntries(
      Object.keys(v as Record<string, unknown>)
        .sort()
        .map((k) => [k, canonical((v as Record<string, unknown>)[k])])
    );
  }
  return v;
}

/**
 * The paper a download request names, or null when it names none.
 * `page` is left out of a filtered paper: an export is the whole result (at
 * most 200 questions) whichever page of the list the student was looking at.
 */
export function paperKey(req: {
  mockSlug?: string | null;
  /** One day of a homework plan: each day is its own paper. */
  homework?: { slug: string; day: number } | null;
  /** A board past paper (/question-papers): each set is its own paper. */
  boardPaper?: { exam: string; slug: string } | null;
  questionIds?: readonly string[] | null;
  filters?: Record<string, unknown> | null;
}): string | null {
  if (req.mockSlug) return `mock:${req.mockSlug.trim()}`;
  if (req.homework) return `homework:${req.homework.slug}:${req.homework.day}`;
  if (req.boardPaper) return `board:${req.boardPaper.exam}:${req.boardPaper.slug}`;
  if (req.questionIds && req.questionIds.length > 0) {
    return `ids:${sha([...new Set(req.questionIds)].sort().join(","))}`;
  }
  if (req.filters) {
    const { page: _page, ...rest } = req.filters;
    void _page;
    return `filters:${sha(JSON.stringify(canonical(rest)))}`;
  }
  return null;
}

/**
 * Whether this paper is free for an account. `used` is its free_downloads row
 * (null = never used). Free when unused, or when the row is for THIS paper, so
 * its other file and a re-download stay free. A row with no key is the old
 * one-file download (before 2026-10-07): those accounts keep the rule they had.
 */
export function freeForPaper(used: { setKey: string | null } | null, key: string | null): boolean {
  if (!used) return true;
  return key !== null && used.setKey !== null && used.setKey === key;
}
