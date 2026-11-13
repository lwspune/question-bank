/**
 * Turn each scanned challenge-module file's geometry (challenge_extract.py) into questions, one
 * folder per shift (SSC CHSL 2025, PW's files).
 *
 *   python -P scripts/ssc-cgl/challenge_extract.py <dir> "<pdf>"     (each file challengeFiles() lists)
 *   npx tsx scripts/ssc-cgl/assemble-challenge.ts [<shiftId> ...]     (default: every extracted file)
 *
 * Writes out/<shiftId>/questions.json: each question's number, part, KEY (null where the sheet
 * shows none), the crop's regions and the option rows. Like every questions.json it holds the
 * key, so it is read only by build.ts and challenge_sheets.py, never by a drafting agent.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OUT, SHIFTS, challengeFiles, layoutOf } from "./config";
import { assembleChallenge, type ChallengePage } from "./challenge";

function main() {
  const only = new Set(process.argv.slice(2));
  for (const f of challengeFiles()) {
    if (only.size && !only.has(f.dir)) continue;
    const path = join(OUT, f.dir, "challenge.json");
    if (!existsSync(path)) {
      if (only.size) throw new Error(`${path} not found: run challenge_extract.py ${f.dir} "${f.file}" first`);
      continue;
    }
    if (!SHIFTS[f.dir]) throw new Error(`${f.dir} has no SHIFTS entry: register it in config.ts`);
    const g: { pdf: string; pages: ChallengePage[] } = JSON.parse(readFileSync(path, "utf8"));
    let questions;
    try {
      questions = assembleChallenge(g.pages, layoutOf(f.day), f.order).sort((a, b) => a.number - b.number);
    } catch (e) {
      throw new Error(`${f.dir}: ${(e as Error).message}`);
    }
    mkdirSync(join(OUT, f.dir), { recursive: true });
    writeFileSync(join(OUT, f.dir, "questions.json"), JSON.stringify({ shift: f.dir, format: "challenge", pdf: f.file, questions }, null, 1), "utf8");
    const spread: Record<string, number> = {};
    for (const q of questions) spread[q.key ?? "none"] = (spread[q.key ?? "none"] ?? 0) + 1;
    const unknown = questions.filter((q) => q.key === null).map((q) => q.number);
    console.log(`${f.dir}: ${questions.length} questions, key spread ${JSON.stringify(spread)}${unknown.length ? `, no key shown for ${unknown.join(",")}` : ""}`);
  }
}

main();
