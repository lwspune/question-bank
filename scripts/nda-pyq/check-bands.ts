/**
 * Structural probe over one paper's raw band files, BEFORE merge.
 *
 *   npx tsx scripts/nda-pyq/check-bands.ts 2026-2
 *   npx tsx scripts/nda-pyq/check-bands.ts 2026-2 --strict   # warnings fail too
 *
 * The rules live in `checkBand`, imported from scripts/cds-maths — a pure
 * function driven by deliberately-broken fixtures in
 * tests/cds-maths-check-bands.test.ts. It exists as a shipped helper because on
 * a State Board run five agents each hand-rolled this checker and five shipped
 * the SAME bug in it. Ship the helper instead of having every agent rebuild it.
 *
 * A CLEAN RUN HERE DOES NOT MEAN THE PAPER IS COVERED. Each band is checked
 * against its OWN bandReport, so two bands that both stop short of their own
 * last page are each internally consistent and both pass. `merge.ts` is the gate
 * for that — it reconciles the union against 1..120 and REFUSES on a gap.
 */
import { readdirSync, readFileSync } from "node:fs";
// checkBand lives in the sibling script, which guards its own main() behind
// `require.main === module`, so importing it runs nothing.
import { checkBand } from "../cds-maths/check-bands";
import type { Band } from "../cds-maths/lib";
import { DATA, catalog, requirePaper } from "./config";

type Finding = { level: "ERROR" | "WARN"; where: string; msg: string };

function main() {
  const paper = requirePaper(process.argv[2]);
  const strict = process.argv.includes("--strict");
  const chapters = new Set(Object.keys(catalog()));

  const bandRe = new RegExp(
    `^${paper.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.b[A-Za-z0-9]+\\.json$`
  );
  const files = readdirSync(DATA)
    .filter((f) => bandRe.test(f))
    .sort();
  if (!files.length) throw new Error(`no band files matching ${paper.id}.b<name>.json in ${DATA}`);

  const findings: Finding[] = [];
  for (const f of files) {
    let band: Band;
    try {
      band = JSON.parse(readFileSync(`${DATA}/${f}`, "utf8"));
    } catch (e) {
      findings.push({ level: "ERROR", where: f, msg: `does not parse: ${(e as Error).message}` });
      continue;
    }
    const got = checkBand(band, chapters) as Finding[];
    findings.push(...got);
    const errs = got.filter((x) => x.level === "ERROR").length;
    console.log(
      `  ${f.padEnd(26)} ${String(band.questions?.length ?? 0).padStart(3)} q   ${errs} error(s), ${got.length - errs} warning(s)`
    );
  }

  const errors = findings.filter((f) => f.level === "ERROR");
  const warns = findings.filter((f) => f.level === "WARN");
  for (const list of [errors, warns]) {
    if (!list.length) continue;
    console.log(`\n${list[0].level}S (${list.length}):`);
    for (const f of list) console.log(`  ${f.where}: ${f.msg}`);
  }
  if (!findings.length) console.log(`\nclean: ${files.length} band file(s), no findings.`);

  if (errors.length || (strict && warns.length)) process.exit(1);
}

main();
