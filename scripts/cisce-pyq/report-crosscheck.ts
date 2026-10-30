/**
 * Diff a blind derivation against CISCE's official key and print the report.
 *
 *   npx tsx scripts/isc-12-pyq/report-crosscheck.ts 2025 Mathematics
 *   npx tsx scripts/isc-12-pyq/report-crosscheck.ts 2026 Physics      # vs second.json
 *
 * Read-only. Decides nothing — a DISAGREE is a LEAD, not a verdict: it can mean
 * our derivation is wrong, the printed key is wrong, or the question is
 * defective. This project's own history says all three happen, and the third is
 * the one that gets mis-filed. Adjudicate by reading both.
 *
 * For an unkeyed year (2026) there is nothing official to compare with, so it
 * compares the derivation with an independent SECOND derivation
 * (blind/<stem>/second.json, answers only). Two solvers agreeing is weaker than
 * a key, which is why 2025's measured rate is quoted beside it.
 *
 * The rate it prints covers MCQ rows and nothing else. That denominator is
 * printed alongside it, always, because a rate quoted without its scope is how
 * "99.4% of temp writes" ended up in this repo's docs wrong by an order of
 * magnitude.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { crossCheck, summarise, type DerivedAnswer, type OfficialAnswer } from "./crosscheck";
import { derivationPath } from "./config";

function main() {
  const [year, subject] = process.argv.slice(2);
  if (!year || !subject) {
    throw new Error("usage: report-crosscheck.ts <year> <subject>   e.g. 2025 Mathematics");
  }
  const stem = `${year}-${subject}`;
  const derivedPath = derivationPath(stem, "derived");
  const keyPath = join(process.cwd(), "scripts", "isc-12-pyq", "data", `${stem}.key.json`);
  const secondPath = derivationPath(stem, "second");
  if (!existsSync(derivedPath)) throw new Error(`no derivation yet: ${derivedPath}`);
  const derived = JSON.parse(readFileSync(derivedPath, "utf8")) as { derivedBy?: string; answers: DerivedAnswer[] };

  let against: OfficialAnswer[];
  let what: string;
  if (existsSync(keyPath)) {
    against = (JSON.parse(readFileSync(keyPath, "utf8")) as { answers: OfficialAnswer[] }).answers;
    what = "official key";
  } else if (existsSync(secondPath)) {
    // A second derivation stands in for a key: its letter is the "accepted" one.
    const second = JSON.parse(readFileSync(secondPath, "utf8")) as { answers: DerivedAnswer[] };
    against = second.answers.map((s) => ({ ref: s.ref, labels: s.label ? [s.label] : [], value: s.value }));
    what = "second independent derivation (NO official key exists for this year)";
  } else {
    console.log(`No key and no second derivation for ${stem}: nothing to compare.`);
    return;
  }

  const rows = crossCheck(derived.answers, against);
  const s = summarise(rows);
  const order = { DISAGREE: 0, NEEDS_ADJUDICATION: 1, MISSING_DERIVATION: 2, NO_KEY: 3, AGREE: 4 } as const;
  const sorted = [...rows].sort((a, b) => order[a.verdict] - order[b.verdict]);
  const verbose = process.argv.includes("--all");

  console.log(`\nISC ${subject} ${year} — blind derivation vs ${what}`);
  console.log(`derivedBy: ${derived.derivedBy ?? "(unstated)"}\n`);
  for (const r of sorted) {
    if (r.verdict === "AGREE" && !verbose) continue;
    const flag = r.grace ? " [grace]" : "";
    console.log(`${r.verdict.padEnd(19)} ${r.ref.padEnd(9)}${flag} [${r.confidence ?? "-"}]`);
    if (r.verdict !== "AGREE") {
      if (r.derived) console.log(`    derived : ${r.derived.slice(0, 220)}`);
      if (r.official) console.log(`    other   : ${r.official.slice(0, 220)}`);
    }
  }

  console.log("\n── summary ─────────────────────────────────────────────");
  const rate = s.mechanical.ratePct;
  console.log(
    `MCQ agreement : ${s.mechanical.agree}/${s.mechanical.total}` +
      (rate === null ? "  (no rate — nothing comparable)" : `  = ${rate.toFixed(1)}%`)
  );
  console.log(`disagreements : ${s.mechanical.disagree}   ← LEADS, not verdicts`);
  console.log(`to adjudicate : ${s.needsAdjudication}  (free response)`);
  console.log(`unkeyed       : ${s.noKey}`);
  console.log(`underived     : ${s.missingDerivation}`);
  console.log(`grace rows    : ${s.graceRows}`);
  console.log(`\n${s.scopeNote}`);
}

main();
