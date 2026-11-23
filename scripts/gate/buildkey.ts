/**
 * GATE lane, step 2b: the organising IIT's final key -> scripts/gate/data/<paper>.key.json.
 *
 *   python -P -E scripts/gate/keyrows.py 2026-cs1     # the key's rows, read by word position
 *   npx tsx scripts/gate/buildkey.ts 2026-cs1          # -> data/2026-cs1.key.json
 *
 * Refuses on any row parseKeyRows cannot read, or that disagrees with the printed layout
 * (GA Q1-10, marks by number). The written key is then checked against the rendered key
 * page by a person before anything is committed on it (README).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, ROOT } from "./config";
import { gateSitting, parseKeyRows } from "./lib";

const paper = process.argv[2];
if (!paper) throw new Error("usage: buildkey.ts <year>-cs<set>");
const { year } = gateSitting(paper);
const rows: string[][] = JSON.parse(readFileSync(join(ROOT, "work", "keys", `${paper}.keyrows.json`), "utf8"));
const { key, issues } = parseKeyRows(year, rows);
if (issues.length) {
  console.error(`REFUSING ${paper}: ${issues.length} issue(s):\n  ${issues.join("\n  ")}`);
  process.exit(1);
}
mkdirSync(DATA, { recursive: true });
writeFileSync(join(DATA, `${paper}.key.json`), JSON.stringify(key, null, 1) + "\n");
const count = (t: string) => key.answers.filter((a) => a.type === t).length;
const ranges = key.answers.filter((a) => "range" in a).length;
console.log(`${paper}: ${key.answers.length} answers (MCQ ${count("MCQ")}, MSQ ${count("MSQ")}, NAT ${count("NAT")} of which ${ranges} ranges) -> data/${paper}.key.json`);
