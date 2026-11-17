/**
 * Score BOTH blind passes against NTA's key, and write the answers to commit.
 *
 *   npx tsx scripts/milschool/keycheck.ts aissee-9-2025           # the report
 *   npx tsx scripts/milschool/keycheck.ts aissee-9-2025 --apply   # write data/<id>.answers.json
 *
 * Reads   data/<id>.key.json             NTA's key as printed (1-4, "DROP", "2,3"),
 *                                        read twice by hand and diffed
 *         derived/<id>.{a,b}.p*.json     the two blind passes
 *         data/<id>.hand.json            (optional) solutions written by hand
 *
 * The key's read stays OUTSIDE the repo until both passes are written, so no
 * solver can see it; then it is copied to data/<id>.key.json.
 *
 * The report measures each pass against the key (any accepted option counts),
 * by stated confidence, and where the two passes AGREED: the only number a
 * keyless paper (AISSEE 2020-21, RMS, RIMC) can ever have.
 *
 * --apply takes the LETTER from the key and the WORKING from whichever pass
 * reached it (capf `pickWorking`). An item NTA accepted two options for ships
 * the accepted letter a pass reached, a notice naming every accepted option,
 * and grace in mocks. A scored item no pass reached needs a hand solution in
 * data/<id>.hand.json; --apply refuses until each has one.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DERIVED, dataPath, pattern, requirePaper } from "./config";
import { parseOfficialKey, type Derivation } from "../upsc/lib";
import { pickWorking, type HandSolutions } from "../capf/lib";
import { normaliseNtaKey, resolveAccepted, scoreAccepted, type AcceptedScore } from "./lib";

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

function printScore(label: string, s: AcceptedScore) {
  console.log(`  ${label}  ${s.match}/${s.scored}  = ${pct(s.match, s.scored)}%${s.mismatched.length ? `   missed Q${s.mismatched.join(", Q")}` : ""}`);
  for (const c of ["HIGH", "MED", "LOW"]) {
    const b = s.byConfidence[c];
    if (b) console.log(`      ${c.padEnd(4)} ${b.ok}/${b.of}`);
  }
}

const optionNo = (letter: string) => `(${"ABCD".indexOf(letter) + 1})`;

function main() {
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const pat = pattern(paper);
  if (!paper.key) throw new Error(`${paper.id} has no NTA key: use crosstab.ts`);

  const keyFile = dataPath(paper.id, "key");
  if (!existsSync(keyFile)) throw new Error(`${keyFile} not found`);
  const nta = normaliseNtaKey(JSON.parse(readFileSync(keyFile, "utf8")), pat.questions);

  const passA = loadPass(paper.id, "a");
  const passB = loadPass(paper.id, "b");
  if (!passA.length && !passB.length) throw new Error(`no derivation files for ${paper.id} in ${DERIVED}`);

  // A two-answer item: settle the letter we ship BEFORE pickWorking, so the
  // working comes from the pass that reached it.
  const a = new Map(passA.map((d) => [d.number, d.answer]));
  const b = new Map(passB.map((d) => [d.number, d.answer]));
  const resolved: Record<string, string> = { ...nta.key };
  for (const [n, letters] of Object.entries(nta.multi)) {
    resolved[n] = resolveAccepted(letters, a.get(Number(n)), b.get(Number(n)));
  }

  // Hand rulings (data/<id>.notices.json). `answer` CORRECTS the key: owner
  // policy 2026-10-29 rule 2, for a source key that is wrong where the maths or
  // fact is certain. It must come with a notice saying the official key differs.
  const noticesFile = dataPath(paper.id, "notices");
  const handNotices: Record<string, { notice: string; grace?: boolean; answer?: string }> = existsSync(noticesFile)
    ? JSON.parse(readFileSync(noticesFile, "utf8"))
    : {};
  const corrected: number[] = [];
  for (const [n, h] of Object.entries(handNotices)) {
    if (!h.answer) continue;
    const letter = h.answer.trim().toUpperCase();
    if (!"ABCD".includes(letter) || letter.length !== 1) throw new Error(`notices.json Q${n}: answer ${h.answer} is not A-D`);
    if (!h.notice) throw new Error(`notices.json Q${n}: a corrected key needs a notice`);
    resolved[n] = letter;
    corrected.push(Number(n));
  }
  const key = parseOfficialKey(resolved, pat.questions);

  console.log(`${paper.id}  NTA ${paper.key.final ? "FINAL" : "PROVISIONAL"} key, booklet code ${paper.key.code}`);
  console.log(`  questions ${pat.questions}, dropped ${key.dropped.length}${key.dropped.length ? ` (Q${key.dropped.join(", Q")})` : ""}`);
  const multi = Object.entries(nta.multi);
  console.log(`  two answers accepted: ${multi.length ? multi.map(([n, l]) => `Q${n} ${l.join("/")}`).join(", ") : "none"}\n`);

  const sa = scoreAccepted(nta.key, nta.multi, passA);
  const sb = scoreAccepted(nta.key, nta.multi, passB);
  if (passA.length) printScore("pass A", sa);
  if (passB.length) printScore("pass B", sb);
  if (passA.length && passB.length) {
    const agreed = passA.filter((d) => b.get(d.number)?.trim().toUpperCase() === d.answer.trim().toUpperCase());
    const sAg = scoreAccepted(nta.key, nta.multi, agreed);
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

  // Two-answer items: a notice above the solution, and grace in mocks.
  const withNotice = answers.map((d) => {
    const letters = nta.multi[String(d.number)];
    if (!letters) return d;
    return {
      ...d,
      notice:
        `NTA's final answer key accepts more than one option for this question: ` +
        `${letters.map(optionNo).join(" and ")}. In PYQ Vault mocks it is awarded to every candidate.`,
      grace: true,
    };
  });

  // Items settled by hand (data/<id>.notices.json, read above):
  // {"73": {"notice": "...", "grace": true}} keeps the key's letter (rule 3);
  // {"2": {"notice": "...", "answer": "A"}} corrects it (rule 2). The notice goes
  // above the solution and `grace` puts it on the mock grace list.
  if (corrected.length) console.log(`  key CORRECTED by hand (notice on each): Q${corrected.join(", Q")}`);
  for (const n of Object.keys(handNotices)) {
    if (!withNotice.some((d) => d.number === Number(n))) throw new Error(`notices.json names Q${n}, which has no answer`);
  }
  const final = withNotice.map((d) => {
    const h = handNotices[String(d.number)];
    return h ? { ...d, notice: h.notice, ...(h.grace ? { grace: true } : {}) } : d;
  });

  const out = dataPath(paper.id, "answers");
  writeFileSync(
    out,
    JSON.stringify(
      {
        paper: paper.id,
        source: `NTA ${paper.key.final ? "final" : "provisional"} answer key, test booklet code ${paper.key.code}`,
        dropped: key.dropped,
        multi: nta.multi,
        handSolutions: Object.keys(hand).map(Number).sort((x, y) => x - y),
        answers: final,
      },
      null,
      2
    ) + "\n"
  );
  console.log(`\nwrote ${out}  (${answers.length} answers)`);
}

main();
