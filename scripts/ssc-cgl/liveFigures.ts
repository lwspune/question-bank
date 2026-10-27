/**
 * A shipped SSC CGL figure row as its shift's rows.json describes it, and the content_hash it takes
 * with some of its pictures replaced. Shared by trim-stems.ts and refigure.ts, so a picture swapped
 * in place gives the row exactly the hash a fresh commit of the new picture would (rows.ts).
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { FIGURES, OUT } from "./config";
import { commitPayload, figureFiles, type CommitRow } from "./rows";

/** rows.json names pictures in the checkout it was built in; read them from THIS one. */
const here = (p: string) => join(FIGURES, ...p.split(/[\\/]/).slice(-2));

/** The row with its picture paths in this checkout, or null when rows.json has no figure row for it. */
export function figureRow(shift: string, n: number): CommitRow | null {
  const file = join(OUT, shift, "rows.json");
  if (!existsSync(file)) return null;
  const rows = (JSON.parse(readFileSync(file, "utf8")) as CommitRow[]).filter((r) => Number(r.questionNumber) === n);
  if (rows.length !== 1) return null;
  const r = rows[0];
  if (!r.figures.stem && !r.figures.options) return null;
  return { ...r, figures: { stem: r.figures.stem ? here(r.figures.stem) : null, options: r.figures.options?.map(here) ?? null } };
}

/** The row's content_hash with the pictures in `replace` (keyed by this checkout's path) swapped in. */
export function rowHash(r: CommitRow, replace: Map<string, Buffer> = new Map()): string {
  return commitPayload(r, figureFiles(r).map((f) => replace.get(f) ?? readFileSync(f))).contentHash;
}
