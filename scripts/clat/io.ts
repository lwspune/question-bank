/** File access for the CLAT lane: the extracted paper with its fixes applied, the key, derivations. */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { blindDir, dataDir, keyPath } from "./config";
import { applyFixes, type Adjudication, type ClatKey, type ClatPaper, type DerivedEntry, type Fix } from "./lib";

const read = <T>(p: string): T | undefined => (existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as T) : undefined);

/** data/<year>.questions.json (extract.py output) with data/<year>.fixes.json applied. */
export function loadPaper(year: number): ClatPaper {
  const paper = read<ClatPaper>(join(dataDir(), `${year}.questions.json`));
  if (!paper) throw new Error(`CLAT ${year}: no extraction; run python -P scripts/clat/extract.py ${year}`);
  const fixes = read<{ fixes: Fix[] }>(join(dataDir(), `${year}.fixes.json`))?.fixes ?? [];
  return applyFixes(paper, fixes);
}

export function loadKey(year: number): ClatKey {
  const k = read<{ answers: ClatKey }>(keyPath(year));
  if (!k) throw new Error(`CLAT ${year}: no key; run python -P scripts/clat/key.py ${year}`);
  return k.answers;
}

/**
 * Every derivation for a year: the committed copy (data/<year>.derived.json) when
 * there is one, else the solvers' slice files in the blind folder, merged.
 */
export function loadDerived(year: number): DerivedEntry[] {
  const committed = read<{ answers: DerivedEntry[] }>(join(dataDir(), `${year}.derived.json`));
  if (committed) return committed.answers;
  const dir = blindDir(year);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".derived.json"))
    .flatMap((f) => read<{ answers: DerivedEntry[] }>(join(dir, f))?.answers ?? []);
}

export function loadAdjudications(year: number): Adjudication[] {
  return read<{ adjudications: Adjudication[] }>(join(dataDir(), `${year}.adjudication.json`))?.adjudications ?? [];
}
