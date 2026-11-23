/**
 * Check a paper's Marathi reading against its English twin (marathi.ts).
 *
 *   npx tsx scripts/homi-bhabha/mr-check.ts <paperId>
 *
 * Reads data/<id>.mr.json, and data/<id>.mr-sol.json when present: then every
 * question must carry a Marathi solution ending on the key's letter, so the
 * English side is the built rows (answers file needed). Without solutions the
 * English side is the merged transcription. Exits 1 on any error. Read-only.
 */
import { existsSync, readFileSync } from "node:fs";
import { checkMarathiPaper, mergeSolutions, type MarathiQuestion } from "./marathi";
import { marathiJsonPath, marathiSolutionsPath, requirePaper } from "./config";
import { fromMerged, fromRows } from "./english";

const paper = requirePaper(process.argv[2]);
let marathi = JSON.parse(readFileSync(marathiJsonPath(paper.id), "utf8")) as MarathiQuestion[];
const withSolutions = existsSync(marathiSolutionsPath(paper.id));
if (withSolutions) marathi = mergeSolutions(marathi, JSON.parse(readFileSync(marathiSolutionsPath(paper.id), "utf8")));
const english = withSolutions ? fromRows(paper) : fromMerged(paper);

const findings = checkMarathiPaper(english, marathi, { requireSolution: withSolutions });
const errors = findings.filter((f) => f.level === "error");
const warns = findings.filter((f) => f.level === "warn");
console.log(
  `${paper.id}: ${marathi.length}/${english.length} questions · solutions ${withSolutions ? "checked" : "not yet"} · ` +
    `${errors.length} error(s), ${warns.length} warning(s)`,
);
for (const f of findings) console.log(`  ${f.level === "error" ? "ERROR" : "warn "} ${f.ref}: ${f.reason}`);
if (errors.length) process.exit(1);
