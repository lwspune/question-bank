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
