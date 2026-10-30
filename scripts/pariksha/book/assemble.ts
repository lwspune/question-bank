/**
 * Assemble one book chapter from its drafts (README.md in this folder, step 5):
 *
 *   npx tsx scripts/pariksha/book/assemble.ts <testId> <WORK>           # report only
 *   npx tsx scripts/pariksha/book/assemble.ts <testId> <WORK> --write   # + write the data files
 *
 * Reads <WORK>/drafts/<testId>*.A.json, *.keys.json, *.B.json and <testId>.settle.json, prints
 * each section's coverage (both ways), the held rows and every derived-vs-printed disagreement,
 * and with --write emits scripts/pariksha/data/<testId>.<subject>.json + <testId>.keys.json.
 * Refuses to write while any disagreement is unsettled: each one is a judgement for the main
 * session (settle it in <testId>.settle.json), never a default.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, dataPath, requireTest } from "../config";
import { assembleChapter, type KeysFile, type PassA, type PassB, type Settlement } from "./assemble-core";

function main() {
  const [testId, work] = process.argv.slice(2);
  const write = process.argv.includes("--write");
  const test = requireTest(testId);
  if (!work) throw new Error("usage: assemble.ts <testId> <WORK> [--write]");
  if (!test.chapterHint || test.subjects.length !== 1) throw new Error(`${test.id}: a book chapter needs one subject and a chapterHint in config.ts`);
  const drafts = join(work, "drafts");
  const load = <T>(re: RegExp): T[] =>
    readdirSync(drafts).filter((f) => f.startsWith(test.id) && re.test(f)).sort()
      .map((f) => JSON.parse(readFileSync(join(drafts, f), "utf8")) as T);
  const settleFile = join(drafts, `${test.id}.settle.json`);

  const r = assembleChapter({
    subject: test.subjects[0],
    chapter: test.chapterHint,
    A: load<PassA[]>(/\.A\.json$/),
    keys: load<KeysFile>(/\.keys\.json$/),
    B: load<PassB[]>(/\.B\.json$/),
    settle: existsSync(settleFile) ? (JSON.parse(readFileSync(settleFile, "utf8")) as Record<string, Settlement>) : {},
  });

  console.log(r.coverage.join("\n"));
  console.log(`\n${r.questions.length} assembled, ${r.held.length} held, ${r.disagreements.length} unsettled disagreements`);
  if (r.held.length) console.log("HELD:\n  " + r.held.join("\n  "));
  if (r.disagreements.length) console.log("DISAGREE:\n  " + r.disagreements.join("\n  "));
  if (!write) return;
  if (r.disagreements.length) { console.error("refusing to write: settle every disagreement first"); process.exit(1); }
  writeFileSync(dataPath(test.id, test.subjects[0]), JSON.stringify(r.questions, null, 2) + "\n");
  writeFileSync(join(DATA, `${test.id}.keys.json`), JSON.stringify(r.keys, null, 1) + "\n");
  console.log(`wrote ${r.questions.length} questions + keys for ${test.id}; set its questionCount in config.ts to ${r.questions.length}`);
}

main();
