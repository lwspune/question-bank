import { maskMathZones } from "./parseLatex";

/**
 * A run of non-table prose (still carrying inline math / **bold**; the renderer
 * pipes it through KatexRenderer just like before).
 */
export type TextBlock = { kind: "text"; text: string };

/**
 * A GFM pipe-table. `headers` is the first row; `rows` are the data rows,
 * each normalised to `headers.length` cells. Cell strings retain their
 * original `\(...\)` math and `**bold**` for the renderer / OMML exporter.
 */
export type TableBlock = { kind: "table"; headers: string[]; rows: string[][] };

/**
 * Fenced code (GATE CS, 2026-11-23): a line of three backticks, optionally with a language,
 * through a closing line of three backticks. The code is kept EXACTLY (indentation, `*`,
 * `$`, `|`): nothing inside a fence is maths, markdown or a table. Only whole-line fences
 * count; inline backticks stay text, since the bank already uses them as quote marks.
 * Spec: tests/code-blocks.test.ts.
 */
export type CodeBlock = { kind: "code"; lang: string | null; code: string };

export type ContentBlock = TextBlock | TableBlock | CodeBlock;

const FENCE_OPEN = /^\s*```([A-Za-z0-9_+#.-]*)\s*$/;
const FENCE_CLOSE = /^\s*```\s*$/;

/**
 * Each closed fence as {open, close} line numbers (0-based, inclusive), on the RAW lines:
 * found before maths masking, because code may hold a `$` that would otherwise open a maths
 * zone. An opening line with no closing line is not a fence (the text is left as it is).
 */
function codeFenceRanges(lines: string[]): { open: number; close: number; lang: string | null }[] {
  const out: { open: number; close: number; lang: string | null }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = FENCE_OPEN.exec(lines[i]);
    if (!m) continue;
    let j = i + 1;
    while (j < lines.length && !FENCE_CLOSE.test(lines[j])) j++;
    if (j >= lines.length) break;
    out.push({ open: i, close: j, lang: m[1] || null });
    i = j;
  }
  return out;
}

const rawLines = (input: string) => input.replace(/\r\n?/g, "\n").split("\n");

/** The text with its fence lines removed and the code kept: for a one-line preview. */
export function stripCodeFences(input: string): string {
  const lines = rawLines(input);
  const fenceLines = new Set(codeFenceRanges(lines).flatMap((f) => [f.open, f.close]));
  if (!fenceLines.size) return input;
  return lines.filter((_, i) => !fenceLines.has(i)).join("\n");
}

/** A separator row: only pipes / dashes / colons / spaces, with ≥1 dash and ≥1 pipe. */
function isSeparatorRow(line: string): boolean {
  const t = line.trim();
  if (!t.includes("-") || !t.includes("|")) return false;
  return /^[|\-:\s]+$/.test(t) && /-/.test(t);
}

/** A plausible table row carries at least one pipe (after math-masking). */
function isRowLike(line: string): boolean {
  return line.includes("|") && line.trim() !== "";
}

/** Split a masked row on unescaped pipes, dropping the empty edges from outer pipes. */
function splitCells(line: string): string[] {
  const cells = line.trim().split("|");
  if (cells.length && cells[0].trim() === "") cells.shift();
  if (cells.length && cells[cells.length - 1].trim() === "") cells.pop();
  return cells.map((c) => c.trim());
}

/**
 * Where the tables are, by line: [first, last] (0-based, inclusive) for each
 * run parseTableBlocks reads as a table, and how many lines the masked text
 * has. Same scan as parseTableBlocks, so the two cannot disagree. A caller
 * mapping lines back to the original text must check `lines` against its own
 * line count: a math zone spanning a line break makes them differ.
 */
export function tableLineRanges(input: string): { ranges: [number, number][]; lines: number } {
  if (!input) return { ranges: [], lines: 0 };
  // A fence's lines are blanked (never deleted, so line numbers hold): code is never a table.
  const raw = rawLines(input);
  for (const f of codeFenceRanges(raw)) for (let k = f.open; k <= f.close; k++) raw[k] = "";
  const lines = maskMathZones(raw.join("\n")).masked.split("\n");
  const ranges: [number, number][] = [];
  let i = 0;
  while (i < lines.length) {
    if (isRowLike(lines[i]) && lines[i + 1] !== undefined && isSeparatorRow(lines[i + 1])) {
      let j = i + 2;
      while (j < lines.length && isRowLike(lines[j]) && !isSeparatorRow(lines[j])) j++;
      ranges.push([i, j - 1]);
      i = j;
    } else {
      i++;
    }
  }
  return { ranges, lines: lines.length };
}

/**
 * Split question/option text into an ordered list of prose and table blocks.
 * A run of lines is a table ONLY when a row-like line is immediately followed
 * by a separator row (`|---|---|`) — that requirement is what stops inline
 * math like `\(|A|=2\)` or `P(A | B)` from being mistaken for a table.
 *
 * Pure + side-effect free. Math zones are masked before scanning so pipes
 * inside `\(...\)` never split a cell; cells are unmasked back to their
 * original LaTeX before returning.
 */
export function parseTableBlocks(input: string): ContentBlock[] {
  if (!input) return [];
  const lines = rawLines(input);
  const fences = codeFenceRanges(lines);
  if (!fences.length) return parseProse(input);

  const blocks: ContentBlock[] = [];
  let from = 0;
  for (const f of fences) {
    blocks.push(...parseProse(lines.slice(from, f.open).join("\n")));
    blocks.push({ kind: "code", lang: f.lang, code: lines.slice(f.open + 1, f.close).join("\n") });
    from = f.close + 1;
  }
  blocks.push(...parseProse(lines.slice(from).join("\n")));
  return blocks;
}

/** Prose and pipe-tables: all of parseTableBlocks before fences existed. */
function parseProse(input: string): ContentBlock[] {
  if (!input) return [];

  const { masked, unmask } = maskMathZones(input);
  const lines = masked.replace(/\r\n?/g, "\n").split("\n");

  const blocks: ContentBlock[] = [];
  let textBuf: string[] = [];
  const flushText = () => {
    if (textBuf.length) {
      const text = unmask(textBuf.join("\n")).trim();
      if (text !== "") blocks.push({ kind: "text", text });
      textBuf = [];
    }
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const next = lines[i + 1];
    if (isRowLike(line) && next !== undefined && isSeparatorRow(next)) {
      // Table start: header row + separator, then consume data rows.
      flushText();
      const headers = splitCells(line).map(unmask);
      const rows: string[][] = [];
      let j = i + 2;
      for (; j < lines.length && isRowLike(lines[j]) && !isSeparatorRow(lines[j]); j++) {
        const cells = splitCells(lines[j]).map(unmask);
        // normalise to header width
        while (cells.length < headers.length) cells.push("");
        if (cells.length > headers.length) cells.length = headers.length;
        rows.push(cells);
      }
      blocks.push({ kind: "table", headers, rows });
      i = j;
    } else {
      textBuf.push(line);
      i++;
    }
  }
  flushText();
  return blocks;
}
