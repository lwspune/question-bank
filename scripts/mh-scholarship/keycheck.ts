/**
 * Score the blind pass against MSCE's final key, and write the answers to commit.
 *
 *   npx tsx scripts/mh-scholarship/keycheck.ts ms8-2026-p1           # the report
 *   npx tsx scripts/mh-scholarship/keycheck.ts ms8-2026-p1 --apply   # write data/<id>.answers.json
 *
 * Reads   data/<id>.key.json             MSCE's final key, the SET A column as
 *                                        printed: "3", "2&4", or "X" for a
 *                                        cancelled item; read by the main session
 *                                        from KEY_ROOT/<id>.key.pdf AFTER the
 *                                        blind pass exists, twice, and diffed
 *         derived/<id>.a.p*.json         the ONE blind pass (owner, 2026-11-20)
 *         data/<id>.hand.json            (optional) solutions written by hand
 *         data/<id>.notices.json         (optional) hand rulings
 *
 * The report measures the pass against the key by stated confidence; a
 * two-answer item counts as right only when BOTH letters match.
 *
 * --apply takes the LETTER from the key and the WORKING from the pass when it
 * reached that letter (capf `pickWorking`). A scored item the pass missed needs
 * a hand solution in data/<id>.hand.json; --apply refuses until each has one.
 *
 * TWO-ANSWER items are HELD (lib.ts heldForKey): written to `heldTwoAnswer` with
 * the key's pair and the pass's working, and listed in `held`, so rows.ts leaves
 * them out of the commit until a "select two" format exists.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DERIVED, dataPath, pattern, requirePaper } from "./config";
import { parseOfficialKey, type Derivation } from "../upsc/lib";
import { pickWorking, type HandSolutions } from "../capf/lib";
import { heldForKey, keyReadDiff, normaliseMsceKey, scoreMsce } from "./lib";

function loadPass(paperId: string): Derivation[] {
  const re = new RegExp(`^${paperId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.a\\.p\\d+\\.json$`);
  if (!existsSync(DERIVED)) return [];
  const out: Derivation[] = [];
  for (const f of readdirSync(DERIVED).filter((f) => re.test(f)).sort()) {
    const raw = JSON.parse(readFileSync(join(DERIVED, f), "utf8"));
    out.push(...(Array.isArray(raw) ? raw : (raw.items ?? raw.derivations ?? [])));
  }
  return out;
}

const pct = (ok: number, of: number) => (of ? ((ok / of) * 100).toFixed(1) : "0.0");

function main() {
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const pat = pattern(paper);

  const keyFile = dataPath(paper.id, "key");
  const key2File = dataPath(paper.id, "key2");
  if (!existsSync(keyFile)) throw new Error(`${keyFile} not found`);
  // Two INDEPENDENT reads of the scanned key, written separately (the second
  // from column crops, never from memory of the first), must agree cell for cell.
  if (!existsSync(key2File)) throw new Error(`${key2File} not found: write a second, independent read of the key first`);
  const keyRaw = JSON.parse(readFileSync(keyFile, "utf8"));
  const readDiff = keyReadDiff(keyRaw, JSON.parse(readFileSync(key2File, "utf8")));
  if (readDiff.length) {
    console.log(`REFUSED: the two key reads disagree on ${readDiff.length} cell(s); settle each against the scan:`);
    for (const d of readDiff) console.log(`  ${d}`);
    process.exit(1);
  }
  const configHeld = paper.held?.numbers ?? [];
  const msce = normaliseMsceKey(keyRaw, pat.questions, configHeld);

  const pass = loadPass(paper.id);
  if (!pass.length) throw new Error(`no derivation files for ${paper.id} in ${DERIVED}`);

  // Hand rulings (data/<id>.notices.json). `answer` CORRECTS the key: owner
  // policy 2026-10-29 rule 2, for a source key that is wrong where the maths or
  // fact is certain. It must come with a notice saying the official key differs.
  // `hold` (with `why`): the key and the paper cannot be reconciled and a
  // correction would not be certain either, so the item is NOT committed; it is
  // listed in the answers file's `heldDisputed` for the owner.
  const noticesFile = dataPath(paper.id, "notices");
  const handNotices: Record<string, { notice?: string; grace?: boolean; answer?: string; hold?: boolean; why?: string }> =
    existsSync(noticesFile) ? JSON.parse(readFileSync(noticesFile, "utf8")) : {};
  const disputedHolds = Object.entries(handNotices)
    .filter(([, h]) => h.hold)
    .map(([n, h]) => {
      if (!h.why) throw new Error(`notices.json Q${n}: a hold needs a "why"`);
      if (h.answer) throw new Error(`notices.json Q${n}: a hold cannot also correct the key`);
      return Number(n);
    });
  const held = heldForKey(msce, [...configHeld, ...disputedHolds]);
  const resolved: Record<string, string> = { ...msce.key };
  for (const n of disputedHolds) delete resolved[String(n)];
  // An either-answer item ("1OR2"): ship the accepted letter the blind pass
  // reached, so its working is the solution; otherwise the first.
  const blindOf = new Map(pass.map((d) => [d.number, d.answer.trim().toUpperCase()]));
  for (const [n, letters] of Object.entries(msce.either)) {
    const b = blindOf.get(Number(n));
    if (b && letters.includes(b)) resolved[n] = b;
  }
  const corrected: number[] = [];
  for (const [n, h] of Object.entries(handNotices)) {
    if (!h.answer) continue;
    const letter = h.answer.trim().toUpperCase();
    if (!/^[ABCD]$/.test(letter)) throw new Error(`notices.json Q${n}: answer ${h.answer} is not A-D`);
    if (!h.notice) throw new Error(`notices.json Q${n}: a corrected key needs a notice`);
    if (!(n in resolved)) throw new Error(`notices.json Q${n}: not a single-answer item of the key`);
    resolved[n] = letter;
    corrected.push(Number(n));
  }
  const key = parseOfficialKey(resolved, pat.questions, { skip: held });

  console.log(`${paper.id}  ${paper.key.label}`);
  console.log(`  questions ${pat.questions}, cancelled ${key.dropped.length}${key.dropped.length ? ` (Q${key.dropped.join(", Q")})` : ""}`);
  const pairs = Object.entries(msce.pairs);
  console.log(
    `  two-answer items HELD: ${pairs.length}${pairs.length ? ` (${pairs.map(([n, l]) => `Q${n} ${l.join("&")}`).join(", ")})` : ""}\n`,
  );

  const s = scoreMsce(msce, pass);
  console.log(`  blind pass  ${s.match}/${s.scored}  = ${pct(s.match, s.scored)}%${s.mismatched.length ? `   missed Q${s.mismatched.join(", Q")}` : ""}`);
  for (const c of ["HIGH", "MED", "LOW"]) {
    const b = s.byConfidence[c];
    if (b) console.log(`      ${c.padEnd(4)} ${b.ok}/${b.of}`);
  }

  const handFile = dataPath(paper.id, "hand");
  const hand: HandSolutions = existsSync(handFile) ? JSON.parse(readFileSync(handFile, "utf8")) : {};
  const { answers, needHand } = pickWorking(key, pass, [], hand);
  console.log(`\n  hand solutions on file: ${Object.keys(hand).length}; still needed: ${needHand.length ? `Q${needHand.join(", Q")}` : "none"}`);
  if (corrected.length) console.log(`  key CORRECTED by hand (notice on each): Q${corrected.join(", Q")}`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write the answers file.`);
    return;
  }
  if (needHand.length) {
    console.log(`\nREFUSED: no working reaches the key's letter for Q${needHand.join(", Q")}.`);
    console.log(`Write each in ${handFile} as {"<n>": {"value": "...", "reasoning": "..."}}.`);
    process.exit(1);
  }

  for (const [n, h] of Object.entries(handNotices)) {
    if (h.hold) continue;
    if (!answers.some((d) => d.number === Number(n))) throw new Error(`notices.json names Q${n}, which has no answer`);
  }
  // Either-answer items: a notice naming both accepted options, and grace in
  // mocks (a mock records one letter, so either one must score).
  const optionNo = (letter: string) => `(${letter})`;
  const withEither = answers.map((d) => {
    const letters = msce.either[String(d.number)];
    if (!letters) return d;
    return {
      ...d,
      notice:
        `MSCE's final answer key accepts either ${letters.map(optionNo).join(" or ")} for this question. ` +
        `In PYQ Vault mocks it is awarded to every candidate.`,
      grace: true,
    };
  });
  const final = withEither.map((d) => {
    const h = handNotices[String(d.number)];
    return h ? { ...d, notice: h.notice, ...(h.grace ? { grace: true } : {}) } : d;
  });

  const byNumber = new Map(pass.map((d) => [d.number, d]));
  const heldTwoAnswer = pairs.map(([n, letters]) => {
    const d = byNumber.get(Number(n));
    return { number: Number(n), key: letters, blind: d?.answer ?? null, value: d?.value ?? null, reasoning: d?.reasoning ?? null };
  });

  const out = dataPath(paper.id, "answers");
  writeFileSync(
    out,
    JSON.stringify(
      {
        paper: paper.id,
        source: paper.key.label,
        dropped: key.dropped,
        held,
        heldTwoAnswer,
        heldDisputed: disputedHolds.map((n) => ({
          number: n,
          key: msce.either[String(n)] ?? msce.key[String(n)],
          blind: byNumber.get(n)?.answer ?? null,
          why: handNotices[String(n)].why,
        })),
        handSolutions: Object.keys(hand).map(Number).sort((x, y) => x - y),
        answers: final,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`\nwrote ${out}  (${final.length} answers; ${held.length} held)`);
}

main();
