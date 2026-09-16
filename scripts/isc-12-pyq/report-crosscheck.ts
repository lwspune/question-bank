/**
 * Diff a blind derivation against CISCE's official key and print the report.
 *
 *   npx tsx scripts/isc-12-pyq/report-crosscheck.ts 2025 Mathematics Q1
 *
 * Read-only. Decides nothing — a DISAGREE is a LEAD, not a verdict: it can mean
 * our derivation is wrong, the printed key is wrong, or the question is
 * defective. This project's own history says all three happen, and the third is
 * the one that gets mis-filed. Adjudicate by reading both.
 *
 * The rate it prints covers MCQ rows with a key and nothing else. That
 * denominator is printed alongside it, always, because a rate quoted without
 * its scope is how "99.4% of temp writes" ended up in this repo's docs wrong by
 * an order of magnitude.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  crossCheck,
  summarise,
  type DerivedAnswer,
  type OfficialAnswer,
} from "./crosscheck";

const BLIND_ROOT = "C:\\tmp\\PYQPs\\ISC\\XII\\blind";

function main() {
  const [year, subject, block] = process.argv.slice(2);
  if (!year || !subject || !block) {
    throw new Error(
      "usage: report-crosscheck.ts <year> <subject> <block>   e.g. 2025 Mathematics Q1"
    );
  }
  const stem = `${year}-${subject}-${block}`;

  const derivedPath = join(BLIND_ROOT, stem, "derived.json");
  const keyPath = join(
    process.cwd(),
    "scripts",
    "isc-12-pyq",
    "data",
    `${stem}.key.json`
  );

  if (!existsSync(derivedPath)) throw new Error(`no derivation yet: ${derivedPath}`);
  if (!existsSync(keyPath)) {
    console.log(`No official key held for ${stem}.`);
    console.log(
      "That is expected for 2026 — CISCE publishes its Analysis of Pupil " +
        "Performance in ~November. Those answers stand as DERIVED AND UNVERIFIED " +
        "until it lands."
    );
    return;
  }

  const derived = JSON.parse(readFileSync(derivedPath, "utf8")) as {
    derivedBy?: string;
    answers: DerivedAnswer[];
  };
  const key = JSON.parse(readFileSync(keyPath, "utf8")) as {
    answers: OfficialAnswer[];
  };

  const rows = crossCheck(derived.answers, key.answers);
  const s = summarise(rows);

  const order = {
    DISAGREE: 0,
    NEEDS_ADJUDICATION: 1,
    MISSING_DERIVATION: 2,
    NO_KEY: 3,
    AGREE: 4,
  } as const;
  const sorted = [...rows].sort((a, b) => order[a.verdict] - order[b.verdict]);

  console.log(`\nISC ${subject} ${year} ${block} — blind derivation vs official key`);
  console.log(`derivedBy: ${derived.derivedBy ?? "(unstated)"}\n`);

  for (const r of sorted) {
    const flag = r.grace ? " [grace]" : "";
    console.log(`${r.verdict.padEnd(19)} ${r.ref.padEnd(9)}${flag}`);
    if (r.verdict !== "AGREE") {
      if (r.derived) console.log(`    derived : ${r.derived}`);
      if (r.official) console.log(`    official: ${r.official}`);
      console.log(`    why     : ${r.reason}`);
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
