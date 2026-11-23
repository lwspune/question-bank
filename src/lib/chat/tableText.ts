/**
 * Does this question text hold a GFM pipe-table (2026-10-23)? V's question
 * cards load the table renderer (BlockText) only when it does, since V is on
 * every page. A table is a pipe row followed by its |---| line, the same rule
 * parseTableBlocks uses; a lone row or maths bars (|x - 2|) are not one. A
 * false alarm only loads BlockText, which draws text with no table as before.
 *
 * Pure. Spec: tests/chat-card-tables.test.ts.
 */
const TABLE_RE = /^[ \t]*\|.*\|[ \t]*\r?\n[ \t]*\|?[ \t]*:?-{3,}:?[ \t]*(\|[ \t]*:?-{3,}:?[ \t]*)*\|?[ \t]*$/m;

export function hasPipeTable(text: string): boolean {
  return TABLE_RE.test(text);
}

/** A whole-line code fence (```), the block kind parseTableBlocks reads as code (2026-11-23). */
const FENCE_RE = /^[ \t]*```[A-Za-z0-9_+#.-]*[ \t]*\r?\n[\s\S]*?\n[ \t]*```[ \t]*$/m;

/**
 * Does this text need BlockText (a table, or fenced code)? V loads that renderer only then;
 * a false alarm only loads it, and it draws plain text as before.
 */
export function hasBlockContent(text: string): boolean {
  return TABLE_RE.test(text) || FENCE_RE.test(text);
}
