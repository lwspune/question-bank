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
    const { flawed: _f, figures: _g, ...raw } = r;
    const v = validateRow(raw);
    if (v.errors.length) {
      errs.push(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
      continue;
    }
    const p = v.parsed!;
    const files = figureFiles(r);
    if (files.length) {
      p.contentHash = figureAwareHash(p.contentHash, files.map((f) => readFileSync(f)));
      p.options = p.options.map((o) => ({ ...o, text: optionTextForBank(o.text) }));
    }
    parsed.push(p);
  }
  return { parsed, errs };
}
