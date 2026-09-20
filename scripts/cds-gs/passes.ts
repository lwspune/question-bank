/**
 * Load one blind derivation pass for a paper from `derived/<id>.<pass>.p<N>.json`.
 *
 * Extracted from crosstab.ts so score.ts reads the passes the same way rather
 * than growing a second loader: the file-name anchoring below is the part that
 * matters, and two copies of it would be free to drift. The regex is ANCHORED
 * to `<paperId>.<pass>.p<digits>.json` on purpose — a loose glob would also
 * swallow the answers file, the adjudications and any scratch artifact that
 * lands in the directory.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Derivation } from "./lib";

export const DERIVED = join(__dirname, "derived");

export function loadPass(paperId: string, pass: "a" | "b"): Derivation[] {
  const re = new RegExp(`^${paperId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.${pass}\\.p\\d+\\.json$`);
  const files = readdirSync(DERIVED).filter((f) => re.test(f)).sort();
  if (!files.length) {
    throw new Error(`no pass-${pass.toUpperCase()} files matching ${paperId}.${pass}.p<N>.json in ${DERIVED}`);
  }
  const out: Derivation[] = [];
  for (const f of files) out.push(...(JSON.parse(readFileSync(join(DERIVED, f), "utf8")) as Derivation[]));
  return out.sort((x, y) => x.number - y.number);
}
