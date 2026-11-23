/**
 * Turn a run of bare "left | right" pair lines into a GFM pipe table (2026-11-19,
 * SUGGESTIONS.md ledger: NDA I 2026 GAT lost the separator row on all 12 of its
 * pair questions, so they rendered as raw pipes on /browse and in Word).
 *
 * GAT_RULES.md rule 3: a List I / List II or any two-column pair list is a table,
 * with a header row AND a `|---|---|` separator, or the renderer reads it as prose.
 * The header is the first pair line when that line is not itself an item (no
 * "I." / "A." / "1." label); otherwise it must be supplied, and the helper refuses
 * rather than promote the first item to a heading (the 2026-07-27 Pariksha lesson).
 */

const ITEM = /^(?:[IVX]+|[A-Z]|\d+)\.\s/;

export function pairsToTable(text: string, header?: [string, string] | string[]): string {
  const lines = text.split("\n");
  const isPair = (l: string) => / \| /.test(l) && !/^\s*\|/.test(l);
  const start = lines.findIndex(isPair);
  if (start < 0) throw new Error("no pair lines");
  let end = start;
  while (end + 1 < lines.length && isPair(lines[end + 1])) end++;
  const pairs = lines.slice(start, end + 1).map((l) => {
    const cells = l.split(" | ").map((c) => c.trim());
    if (cells.length !== 2) throw new Error(`not a two-column pair: ${l}`);
    return cells;
  });

  let head: string[];
  if (!ITEM.test(pairs[0][0])) head = pairs.shift()!;
  else if (header) head = [...header];
  else throw new Error("every pair line is an item and no header was given");

  const row = (c: string[]) => `| ${c.join(" | ")} |`;
  const table = [row(head), "|---|---|", ...pairs.map(row)];
  const before = lines.slice(0, start);
  const after = lines.slice(end + 1);
  if (before.length && before[before.length - 1].trim() !== "") before.push("");
  if (after.length && after[0].trim() !== "") after.unshift("");
  return [...before, ...table, ...after].join("\n");
}
