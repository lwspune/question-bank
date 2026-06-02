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

export type ContentBlock = TextBlock | TableBlock;

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
