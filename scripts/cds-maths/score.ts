/**
 * Score the blind derivation passes for a paper against its EXTERNAL answer key.
 *
 *   npx tsx scripts/cds-maths/score.ts 2020-1 passA passB   # two passes
 *   npx tsx scripts/cds-maths/score.ts 2026-2 passA         # one pass
 *
 * ONLY 2020-I, 2020-II and 2026-II can be scored — they are the only sittings
 * with a key on disk. Every other booklet in this corpus prints none.
 *
 * RUN THIS ONLY AFTER THE PASSES ARE WRITTEN. It reads the key, so running it
 * earlier — or showing its output to a deriver — un-blinds the thing being
 * measured.
 *
 * TWO MODES, because the two keys are not of equal standing.
 *
 * DUAL-PASS (2020, a PREP-HOUSE key). What it measures:
 *
 *  1. Each pass against the key. Raw accuracy of a single blind derivation.
 *  2. Accuracy per confidence band. On the sibling UPSC corpus HIGH ran 98.5%
 *     while nearly every error sat in MED — that is what makes `confidence` a
 *     usable router for review effort rather than decoration.
 *  3. ACCURACY WHERE THE TWO PASSES AGREE. Agreement is what every key-less
 *     paper in this corpus has to rely on, and on UPSC's dual-blind pilot the
 *     two passes agreed on 98.3% of items and were right on only 94.4% of those
 *     — agreement overstated accuracy by ~4 points.
 *
 *     But note what that mode CANNOT do: it compares against a prep-house key,
 *     so a row where both passes agree and the key differs is ambiguous between
 *     "correlated derivation error" and "the key is wrong". On 2020-I that row
 *     (Q87) turned out to be the KEY. This is the ceiling on the dual-pass mode.
 *
 * SINGLE-PASS (2026-II, an OFFICIAL UPSC key). Pass one pass name and the
 * agreement section is skipped — there is nothing to agree with. What replaces
 * it is better: a published key breaks exactly the ambiguity above, so a
 * disagreement is a near-clean read of a SINGLE blind pass's error rate. That
 * is the number the other 18 unkeyed papers have always rested on and which
 * this corpus could never measure directly.
 *
 * THE PRIOR INVERTS BETWEEN THE MODES, and getting this backwards would be
 * expensive. Against a PREP-HOUSE key a mismatch is more often the key's fault
 * (3 of 4 on 2020-II). Against an OFFICIAL key expect OUR pass to be the one at
 * fault. Neither is automatic: adjudicate every mismatch against the page, and
 * remember an official provisional key is still provisional.
 */
import { existsSync, readFileSync } from "node:fs";
import { QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";
import type { Derivation } from "./lib";

type SourceKey = {
  paper: string;
  source: string;
  /** Written by parse-key.ts. Says whether this key is prep-house or official. */
  provenance?: string;
  answers: Record<string, string>;
};

function load<T>(path: string, what: string): T {
  if (!existsSync(path)) throw new Error(`missing ${path} — ${what}`);
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

const pct = (n: number, d: number) => (d ? ((n / d) * 100).toFixed(1) : "n/a");

function scorePass(name: string, pass: Derivation[], key: Record<string, string>) {
  const bands = new Map<string, { n: number; right: number }>();
  const wrong: { n: number; got: string; want: string; conf: string }[] = [];
  let right = 0;

  for (const d of pass) {
    const want = key[String(d.number)];
    if (!want) continue;
    // A NULL answer is "no printed option is correct" -- a finding, not a guess.
    // Scoring it against a key would count a deliberate refusal as a wrong
    // answer and quietly depress the measured accuracy of the confidence bands.
    if (d.answer == null) continue;
    const got = d.answer.toUpperCase();
    const ok = got === want.toUpperCase();
    if (ok) right += 1;
    else wrong.push({ n: d.number, got, want: want.toUpperCase(), conf: d.confidence.toUpperCase() });

    const band = d.confidence.toUpperCase();
    const cur = bands.get(band) ?? { n: 0, right: 0 };
    cur.n += 1;
    if (ok) cur.right += 1;
    bands.set(band, cur);
  }

  console.log(`\n## ${name} vs key`);
  console.log(`  ${right}/${pass.length}  (${pct(right, pass.length)}%)`);
  for (const band of ["HIGH", "MED", "LOW"]) {
    const v = bands.get(band);
    if (!v) continue;
    console.log(`  ${band.padEnd(5)} ${String(v.right).padStart(3)}/${String(v.n).padEnd(3)} (${pct(v.right, v.n)}%)`);
  }
  if (wrong.length) {
    console.log(`  misses:`);
    for (const w of wrong.sort((x, y) => x.n - y.n)) {
      console.log(`    Q${String(w.n).padStart(3)}  derived ${w.got}  key ${w.want}  [${w.conf}]`);
    }
  }
  return { right, wrong };
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const passAName = process.argv[3] ?? "passA";
  // NO DEFAULT for pass B. It used to default to "passB", which on a
  // single-pass paper silently resolved to a missing file and failed with
  // `pass "passB" not found` — a message that reads like the deriver forgot to
  // write it rather than like the mode was never chosen.
  const passBName = process.argv[4];

  if (!paper.answerKey) {
    throw new Error(
      `${paper.id} has no external answer key, so it cannot be scored. Only 2020-1, ` +
        `2020-2 and 2026-2 can — every other booklet in this corpus prints no key anywhere.`
    );
  }

  const sourceKey = load<SourceKey>(
    dataPath(paper.id, "sourcekey"),
    "run parse-key.ts --apply first"
  );
  const key = sourceKey.answers;
  const a = load<Derivation[]>(dataPath(paper.id, passAName), `pass "${passAName}" not found`);
  const b = passBName
    ? load<Derivation[]>(dataPath(paper.id, passBName), `pass "${passBName}" not found`)
    : null;

  // Describe the key from the key FILE, never from a hardcoded adjective. This
  // line said "a PREP-HOUSE key" unconditionally, which became a false statement
  // the moment an official UPSC key entered the corpus — and a false one in the
  // most load-bearing place, since the whole point of the header is to tell the
  // reader how much the mismatches below are worth.
  const official = /official/i.test(sourceKey.provenance ?? "");
  console.log(
    `${paper.id} — scoring against ${official ? "an OFFICIAL UPSC" : "a PREP-HOUSE"} key ` +
      `(${Object.keys(key).length} answers)`
  );
  console.log(`  ${(sourceKey.provenance ?? "").trim()}`);
  console.log(
    official
      ? `  A mismatch is still a question, not a verdict — but expect OUR pass to be the one at fault.`
      : `  A mismatch is a question, not a verdict: the key can be wrong too.`
  );

  scorePass(passAName, a, key);
  if (b) scorePass(passBName!, b, key);

  if (!b) {
    // SINGLE-PASS MODE. There is no agreement to measure, and saying nothing
    // here would let a reader assume the section below was simply clean.
    const miss = a
      .filter((d) => d.answer != null && key[String(d.number)])
      .filter((d) => d.answer!.toUpperCase() !== key[String(d.number)].toUpperCase());
    console.log(`\n## Single blind pass vs an OFFICIAL key  (no second pass to agree with)`);
    console.log(
      `  This is the measurement the other 18 unkeyed papers have always rested on and`);
    console.log(
      `  which this corpus could not previously take: a near-direct read of ONE blind`);
    console.log(`  pass's error rate, with the key/derivation ambiguity broken by publication.`);
    console.log(`  disagreements to adjudicate: ${miss.length}`);
    if (miss.length) {
      console.log(`    ${miss.map((d) => `Q${d.number}`).join(", ")}`);
      console.log(`  Adjudicate EACH against the page before touching answers.json. An official`);
      console.log(`  key is strong evidence and still provisional — UPSC revises on representation.`);
    }
    const finalPath = dataPath(paper.id, "answers");
    if (existsSync(finalPath)) {
      const final = JSON.parse(readFileSync(finalPath, "utf8")) as { derivations: Derivation[] };
      scorePass("adjudicated (what would ship)", final.derivations, key);
    } else {
      console.log(`\n(no ${paper.id}.answers.json yet — adjudicate, then re-run to score what ships)`);
    }
    return;
  }

  // The headline: what agreement is actually worth.
  const byA = new Map(a.map((d) => [d.number, d]));
  const byB = new Map(b.map((d) => [d.number, d]));
  let agreed = 0;
  let agreedRight = 0;
  let disagreed = 0;
  let disagreedEitherRight = 0;
  const agreedWrong: number[] = [];

  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) {
    const da = byA.get(n);
    const db = byB.get(n);
    const want = key[String(n)];
    if (!da || !db || !want) continue;
    if (da.answer == null || db.answer == null) continue; // see note above
    const ga = da.answer.toUpperCase();
    const gb = db.answer.toUpperCase();
    if (ga === gb) {
      agreed += 1;
      if (ga === want.toUpperCase()) agreedRight += 1;
      else agreedWrong.push(n);
    } else {
      disagreed += 1;
      if (ga === want.toUpperCase() || gb === want.toUpperCase()) disagreedEitherRight += 1;
    }
  }

  console.log(`\n## What agreement is worth  (the number this pilot exists to produce)`);
  console.log(`  the two passes agreed on   ${agreed}/${agreed + disagreed}  (${pct(agreed, agreed + disagreed)}%)`);
  console.log(`  and where they agreed they were right  ${agreedRight}/${agreed}  (${pct(agreedRight, agreed)}%)`);
  const overstate = agreed ? (agreed / (agreed + disagreed)) * 100 - (agreedRight / agreed) * 100 : 0;
  console.log(`  => agreement OVERSTATES accuracy by ${overstate.toFixed(1)} points`);
  console.log(`  where they disagreed, one of them was right  ${disagreedEitherRight}/${disagreed}`);
  if (agreedWrong.length) {
    // NOT "correlated errors" — that would assert both passes were wrong, which
    // this script cannot know. It compares against a PREP-HOUSE key, and on this
    // very paper the one such row (Q87) was adjudicated and the KEY turned out to
    // be wrong. Each of these is a question for a human and the page.
    console.log(`\n  AGREED, BUT DISAGREE WITH THE KEY (${agreedWrong.length}) — adjudicate each by hand:`);
    console.log(`    ${agreedWrong.join(", ")}`);
    console.log(`    Either both passes made the SAME mistake — the correlated error no amount of`);
    console.log(`    agreement can catch — or the prep-house key is wrong. Only the page decides.`);
    console.log(`    Until each is adjudicated, the accuracy figures above are a LOWER bound.`);
  }

  // If the paper has been adjudicated, score that too — it is what actually ships.
  const finalPath = dataPath(paper.id, "answers");
  if (existsSync(finalPath)) {
    const final = JSON.parse(readFileSync(finalPath, "utf8")) as { derivations: Derivation[] };
    scorePass("adjudicated (what would ship)", final.derivations, key);
  } else {
    console.log(`\n(no ${paper.id}.answers.json yet — adjudicate the crosstab to score what would ship)`);
  }
}

main();
