/**
 * Score BOTH blind passes against RPSC's final key, and write the answers to commit.
 *
 *   npx tsx scripts/ras/keycheck.ts 2024           # the report
 *   npx tsx scripts/ras/keycheck.ts 2024 --apply   # write data/<id>.answers.json
 *
 * Reads   data/<id>.key.json             RPSC's key (keys.py, cross-checked two ways).
 *                                        Copied in from KEY_ROOT on the first run
 *                                        that finds BOTH passes on disk, never before:
 *                                        a deriver must never be able to read it.
 *         derived/<id>.{a,b}.p*.json     the two blind passes
 *         data/<id>.hand.json            (optional) solutions written by hand
 *
 * The report is the pilot's measurement: each pass's accuracy against the key,
 * accuracy by the pass's stated confidence, and accuracy where the two passes
 * AGREED (the only number a keyless year can ever have, so the gap between it and
 * 100% is what a derived-only year should expect).
 *
 * --apply takes the LETTER from the key and the WORKING from whichever pass
 * reached that letter (`pickWorking`). A scored question where neither did needs
 * a hand solution in data/<id>.hand.json; --apply refuses until each has one, so
 * no stored solution argues for a letter its row does not carry.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { copyFileSync } from "node:fs";
import { DERIVED, dataPath, keyJsonOutside, pattern, requirePaper } from "./config";
import { parseOfficialKey, type Derivation } from "../upsc/lib";
import { pickWorking, scorePass, solverVoice, type HandSolutions, type PassScore } from "./lib";

function loadPass(paperId: string, which: "a" | "b"): Derivation[] {
  const re = new RegExp(`^${paperId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.${which}\\.p\\d+\\.json$`);
  if (!existsSync(DERIVED)) return [];
  const out: Derivation[] = [];
  for (const f of readdirSync(DERIVED).filter((f) => re.test(f)).sort()) {
    const raw = JSON.parse(readFileSync(join(DERIVED, f), "utf8"));
    out.push(...(Array.isArray(raw) ? raw : (raw.items ?? raw.derivations ?? [])));
  }
  return out;
}

const pct = (ok: number, of: number) => (of ? ((ok / of) * 100).toFixed(1) : "0.0");

function printScore(label: string, s: PassScore) {
  console.log(`  ${label}  ${s.match}/${s.scored}  = ${pct(s.match, s.scored)}%`);
  for (const c of ["HIGH", "MED", "LOW"]) {
    const b = s.byConfidence[c];
    if (b) console.log(`      ${c.padEnd(4)} ${b.ok}/${b.of}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const pat = pattern(paper);
  const passA = loadPass(paper.id, "a");
  const passB = loadPass(paper.id, "b");
  const derivedNums = (p: Derivation[]) => new Set(p.map((d) => d.number)).size;
  if (derivedNums(passA) < pat.questions || derivedNums(passB) < pat.questions) {
    throw new Error(
      `both passes must be complete before the key is read: pass A has ${derivedNums(passA)}, ` +
        `pass B ${derivedNums(passB)} of ${pat.questions}`
    );
  }

  const keyFile = dataPath(paper.id, "key");
  if (!existsSync(keyFile)) {
    copyFileSync(keyJsonOutside(paper.id), keyFile);
    console.log(`copied RPSC's key into ${keyFile} (both passes are on disk)`);
  }
  const key = parseOfficialKey(JSON.parse(readFileSync(keyFile, "utf8")), pat.questions);

  console.log(`${paper.id}  RPSC final key`);
  console.log(`  questions ${pat.questions}, deleted by RPSC ${key.dropped.length}${key.dropped.length ? ` (Q${key.dropped.join(", Q")})` : ""}\n`);

  const sa = scorePass(key, passA);
  const sb = scorePass(key, passB);
  if (passA.length) printScore("pass A", sa);
  if (passB.length) printScore("pass B", sb);

  if (passA.length && passB.length) {
    const b = new Map(passB.map((d) => [d.number, d]));
    const agreed = passA.filter((d) => b.get(d.number)?.answer.trim().toUpperCase() === d.answer.trim().toUpperCase());
    const sAg = scorePass(key, agreed);
    console.log(`\n  passes AGREED on ${sAg.scored} scored item(s); right on ${sAg.match} = ${pct(sAg.match, sAg.scored)}%`);
    if (sAg.mismatched.length) console.log(`    both wrong the same way: Q${sAg.mismatched.join(", Q")}`);
    const both = sa.mismatched.filter((n) => sb.mismatched.includes(n));
    console.log(`  wrong in BOTH passes (needs a hand solution): ${both.length ? `Q${both.join(", Q")}` : "none"}`);
  }

  const handFile = dataPath(paper.id, "hand");
  const hand: HandSolutions = existsSync(handFile) ? JSON.parse(readFileSync(handFile, "utf8")) : {};
  const { answers, needHand } = pickWorking(key, passA, passB, hand);
  console.log(`\n  hand solutions on file: ${Object.keys(hand).length}`);

  // A notice (an item that reads as defective, or where the key departs from
  // standard sources) heads the solution; commit.ts reads `notice` off the answer.
  const noticeFile = dataPath(paper.id, "notices");
  const notices: Record<string, string> = existsSync(noticeFile) ? JSON.parse(readFileSync(noticeFile, "utf8")) : {};
  for (const a of answers) {
    const n = notices[String(a.number)];
    if (n) (a as Derivation & { notice?: string }).notice = n;
  }
  console.log(`  notices on file: ${Object.keys(notices).length}`);

  // Editorial rewrites of a pass's WORKING (same letter, same facts), for a
  // reasoning that reads as a solver's notes rather than a teacher's. Then a
  // gate: no stored solution may carry those phrases (lib.solverVoice).
  const editFile = dataPath(paper.id, "edits");
  const edits: Record<string, string> = existsSync(editFile) ? JSON.parse(readFileSync(editFile, "utf8")) : {};
  for (const a of answers) {
    const e = edits[String(a.number)];
    if (e) a.reasoning = e;
  }
  const voiced = answers.filter((a) => solverVoice(a.reasoning).length);
  console.log(`  edits on file: ${Object.keys(edits).length}; solutions in solver voice: ${voiced.length}`);
  for (const a of voiced) console.log(`    Q${a.number} [${solverVoice(a.reasoning).join(", ")}]`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write the answers file.`);
    return;
  }
  if (voiced.length) {
    console.log(`\nREFUSED: ${voiced.length} solution(s) read as a solver's notes (listed above).`);
    console.log(`Rewrite each in ${editFile} as {"<n>": "the working, as a teacher would write it"}.`);
    process.exit(1);
  }
  if (needHand.length) {
    console.log(`\nREFUSED: no working reaches the key's letter for Q${needHand.join(", Q")}.`);
    console.log(`Write each in ${handFile} as {"<n>": {"value": "...", "reasoning": "..."}}.`);
    process.exit(1);
  }
  const out = dataPath(paper.id, "answers");
  writeFileSync(
    out,
    JSON.stringify(
      {
        paper: paper.id,
        source: "RPSC final answer key",
        dropped: key.dropped,
        handSolutions: Object.keys(hand).map(Number).sort((x, y) => x - y),
        answers,
      },
      null,
      2
    ) + "\n"
  );
  console.log(`\nwrote ${out}  (${answers.length} answers)`);
}

main();
