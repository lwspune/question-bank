/**
 * How often the solver agrees with IISER's key (keyed year) or with a second
 * solver (no-key year). Read-only.
 *
 *   npx tsx scripts/iat/report.ts 2025 Biology
 *   npx tsx scripts/iat/report.ts 2025            # all four subjects
 *
 * Reads derived.json from the blind folder (and `<stem>-second\derived.json`
 * for a no-key year). Every row is listed that is not AGREE, with the
 * solver's confidence and flag, so a person reads each one.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { crosscheck, type DerivedEntry, type IatPaper } from "./lib";
import { SUBJECTS, blindDir, dataDir, iatYear } from "./config";

const read = <T>(p: string): T | undefined => (existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as T) : undefined);

function main() {
  const [yearArg, only] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const year = iatYear(Number(yearArg));
  let agree = 0;
  let total = 0;
  for (const subject of SUBJECTS.filter((s) => !only || s === only)) {
    const stem = `${year.year}-${subject}`;
    const paper = read<IatPaper>(join(dataDir(), `${stem}.questions.json`));
    const d = read<{ answers: DerivedEntry[] }>(join(blindDir(stem), "derived.json"));
    if (!paper || !d) {
      console.log(`${stem}: ${!paper ? "no transcription" : "no derivation"} yet`);
      continue;
    }
    const s = read<{ answers: DerivedEntry[] }>(join(blindDir(`${stem}-second`), "derived.json"));
    const res = crosscheck(paper, year, d.answers, s?.answers);
    agree += res.agree;
    total += res.total;
    console.log(`${stem}: ${res.agree}/${res.total} agree, ${res.disagree} disagree`);
    for (const r of res.rows.filter((x) => x.verdict !== "AGREE")) {
      console.log(`  ${r.ref}: ${r.verdict} solver=${r.derived ?? "-"} ${year.keyMode === "none" ? "second" : "key"}=${r.key ?? "-"} ${r.confidence ?? ""}${r.flag ? `  flag: ${r.flag}` : ""}`);
    }
  }
  if (total) console.log(`\nIAT ${year.year}: ${agree}/${total} (${((100 * agree) / total).toFixed(1)}%) against ${year.keyMode === "none" ? "a second solver" : "IISER's key"}`);
}

main();
