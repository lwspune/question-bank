/**
 * The one path from a shift's rows.json (build.ts) to the payload the bank stores, content_hash
 * included: the Excel upload's own validator, then figure bytes folded into the hash and
 * "[figure]" options stored as empty text. commit.ts writes new rows through it and repair.ts
 * corrects live rows through it, so a corrected row carries the fingerprint a re-commit would.
 */
import { readFileSync } from "node:fs";
import { validateRow, type ParsedRowPayload, type RawRow } from "../../src/lib/upload/validate";
import { figureAwareHash, optionTextForBank } from "./figures";

export type CommitRow = RawRow & { flawed: boolean; figures: { stem: string | null; options: string[] | null } };

export const figureFiles = (r: CommitRow): string[] =>
  [r.figures.stem, ...(r.figures.options ?? [])].filter((f): f is string => !!f);

export function parseCommitRows(rows: CommitRow[]): { parsed: ParsedRowPayload[]; errs: string[] } {
  const errs: string[] = [];
  const parsed: ParsedRowPayload[] = [];
  for (const r of rows) {
    try {
      parsed.push(commitPayload(r, figureFiles(r).map((f) => readFileSync(f))));
    } catch (e) {
      errs.push((e as Error).message);
    }
  }
  return { parsed, errs };
}

/**
 * One row's payload with its pictures given as BYTES, in figureFiles order (stem, then options A-D).
 * parseCommitRows reads the files and calls this; a tool replacing a shipped row's picture passes
 * the new bytes and gets the content_hash a fresh commit would.
 */
export function commitPayload(r: CommitRow, figures: Buffer[]): ParsedRowPayload {
  const expected = figureFiles(r).length;
  if (figures.length !== expected) throw new Error(`Q${r.questionNumber}: ${figures.length} picture(s) given, the row has ${expected}`);
  const { flawed: _f, figures: _g, ...raw } = r;
  const v = validateRow(raw);
  if (v.errors.length) throw new Error(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
  const p = v.parsed!;
  if (figures.length) {
    p.contentHash = figureAwareHash(p.contentHash, figures);
    p.options = p.options.map((o) => ({ ...o, text: optionTextForBank(o.text) }));
  }
  return p;
}
