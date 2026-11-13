/**
 * Score BOTH blind passes against UPSC's key, and write the answers to commit.
 *
 *   npx tsx scripts/capf/keycheck.ts 2026           # the report
 *   npx tsx scripts/capf/keycheck.ts 2026 --apply   # write data/<id>.answers.json
 *
 * Reads   data/<id>.key.json             UPSC's key, read twice by hand and diffed
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
import { DERIVED, PROVISIONAL_KEYS, dataPath, pattern, requirePaper } from "./config";
import { parseOfficialKey, type Derivation } from "../upsc/lib";
import { pickWorking, scorePass, type HandSolutions, type PassScore } from "./lib";

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
  const provisional = PROVISIONAL_KEYS.has(paper.id);

  const keyFile = dataPath(paper.id, "key");
  if (!existsSync(keyFile)) throw new Error(`${keyFile} not found`);
  const key = parseOfficialKey(JSON.parse(readFileSync(keyFile, "utf8")), pat.questions);
  const passA = loadPass(paper.id, "a");
  const passB = loadPass(paper.id, "b");
  if (!passA.length && !passB.length) throw new Error(`no derivation files for ${paper.id} in ${DERIVED}`);

  console.log(`${paper.id}  ${provisional ? "PROVISIONAL" : "official"} key, Series A`);
  console.log(`  questions ${pat.questions}, dropped by UPSC ${key.dropped.length}${key.dropped.length ? ` (Q${key.dropped.join(", Q")})` : ""}\n`);

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

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write the answers file.`);
    return;
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
        source: provisional
          ? "UPSC PROVISIONAL answer key (Series A), released 2026-07-22; not a final key"
          : "UPSC answer key (Series A)",
        provisionalKey: provisional || undefined,
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
