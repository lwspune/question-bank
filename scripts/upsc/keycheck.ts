/**
 * Score a blind derivation pass against the official UPSC answer key, and write
 * the answers to commit.
 *
 *   npx tsx scripts/upsc/keycheck.ts 2023-p1           # the report
 *   npx tsx scripts/upsc/keycheck.ts 2023-p1 --apply   # write data/<id>.answers.json
 *
 * Reads   data/<paperId>.key.json        the official key, vision-transcribed
 *         derived/<paperId>.a.p*.json    ONE blind derivation pass
 *         data/<paperId>.merged.json     for the coverage total
 *
 * THIS REPLACES crosstab.ts WHERE A KEY EXISTS, and it is strictly stronger.
 * Two blind passes agreeing bounds DISAGREEMENT risk; it says nothing about
 * CORRELATED error, and it is structurally blind to a MIS-SLOTTED OPTION — the
 * correct answer's text under the wrong letter, where a deriver reasons
 * correctly and confirms the wrong letter. An external key catches both, and for
 * half the derivation cost.
 *
 * So a MISMATCH is TWO hypotheses, not one:
 *   1. our reasoning was wrong  — the ordinary case;
 *   2. our OPTIONS are mis-transcribed — check the page before assuming (1).
 * The second is why this is also a transcription check, not only an answer check.
 *
 * The accuracy it prints is a REAL accuracy against ground truth, unlike the
 * agreement rate crosstab reports, which is only a floor.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DERIVED, PROVISIONAL_KEYS, dataPath, pattern, requirePaper } from "./config";
import {
  applyOfficialKey,
  compareToKey,
  parseOfficialKey,
  type Derivation,
  type KeyComparison,
} from "./lib";

function loadPass(paperId: string, which: "a" | "b"): Derivation[] {
  const re = new RegExp(`^${paperId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.${which}\\.p\\d+\\.json$`);
  if (!existsSync(DERIVED)) return [];
  const files = readdirSync(DERIVED).filter((f) => re.test(f)).sort();
  const out: Derivation[] = [];
  for (const f of files) {
    const raw = JSON.parse(readFileSync(join(DERIVED, f), "utf8"));
    out.push(...(Array.isArray(raw) ? raw : (raw.items ?? raw.derivations ?? [])));
  }
  return out;
}

function main() {
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const pat = pattern(paper);

  const keyFile = dataPath(paper.id, "key");
  if (!existsSync(keyFile)) {
    throw new Error(
      `${keyFile} not found.\n` +
        `  1. npx tsx scripts/upsc/fetch-keys.ts --apply\n` +
        `  2. npx tsx scripts/upsc/render-key.ts ${paper.id}\n` +
        `  3. transcribe out/${paper.id}/key-seriesA.png into that file`
    );
  }
  const key = parseOfficialKey(JSON.parse(readFileSync(keyFile, "utf8")), pat.questions);

  const passA = loadPass(paper.id, "a");
  const passB = loadPass(paper.id, "b");
  const derivations = passA.length ? passA : passB;
  if (!derivations.length) throw new Error(`no derivation files for ${paper.id} in ${DERIVED}`);

  const rows = compareToKey(key, derivations);
  const by = (v: KeyComparison["verdict"]) => rows.filter((r) => r.verdict === v);
  const match = by("MATCH");
  const mismatch = by("MISMATCH");
  const scored = match.length + mismatch.length;

  // Name WHICH kind of key. 2026 is scored against a PROVISIONAL key published
  // before its objection window closed; printing "official key" for it would
  // overstate the evidence in the one place a reader looks for the number.
  const provisional = PROVISIONAL_KEYS.has(paper.id);
  console.log(
    `${paper.id}  Paper ${paper.paper}  ${provisional ? "PROVISIONAL" : "official"} key, Series A\n`
  );
  if (provisional) {
    console.log(
      `!! Measured against a PROVISIONAL key, not a final one — a weaker\n` +
        `   measurement than every other paper in this corpus.\n`
    );
  }
  console.log(`  questions          ${pat.questions}`);
  console.log(`  dropped by UPSC    ${key.dropped.length}${key.dropped.length ? ` (Q${key.dropped.join(", Q")})` : ""}`);
  console.log(`  not derived        ${by("NOT_DERIVED").length}`);
  console.log(`  scored             ${scored}`);
  console.log(
    `\n  MATCH    ${String(match.length).padStart(3)}   ` +
      `ACCURACY vs the ${provisional ? "PROVISIONAL" : "official"} key: ` +
      `${scored ? ((match.length / scored) * 100).toFixed(1) : "0.0"}%`
  );
  console.log(`  MISMATCH ${String(mismatch.length).padStart(3)}`);

  // Accuracy by the derivation's own stated confidence — the calibration check.
  const rank = ["HIGH", "MED", "LOW"];
  console.log(`\n  accuracy by the blind pass's stated confidence:`);
  for (const c of rank) {
    const inBucket = [...match, ...mismatch].filter(
      (r) => (r.derivation?.confidence ?? "").toUpperCase() === c
    );
    if (!inBucket.length) continue;
    const ok = inBucket.filter((r) => r.verdict === "MATCH").length;
    console.log(`    ${c.padEnd(5)} ${String(ok).padStart(3)}/${String(inBucket.length).padEnd(3)}`);
  }

  if (mismatch.length) {
    console.log(`\n--- ${mismatch.length} MISMATCH(es) — adjudicate each ---`);
    console.log(
      `Two hypotheses per row: our reasoning was wrong (usual), OR the OPTIONS are\n` +
        `mis-transcribed and the key is pointing at text we put under another letter.\n` +
        `Check the page before assuming the first.\n`
    );
    for (const r of mismatch) {
      console.log(`Q${r.number}  official ${r.official}  vs derived ${r.derived} (${r.derivation?.confidence})`);
      console.log(`  derived value: ${r.derivation?.value}`);
    }
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write the answers file.`);
    return;
  }

  const answers = applyOfficialKey(key, derivations);
  const out = dataPath(paper.id, "answers");
  writeFileSync(
    out,
    JSON.stringify(
      {
        paper: paper.id,
        // The answers file is a COMMITTED artifact and is the record of what
        // these answers rest on. Calling a provisional key "official" here would
        // put the overstatement in the durable place rather than the console.
        source: provisional
          ? "UPSC PROVISIONAL answer key (Series A), released 2026-05-27 before the objection window closed — NOT the final post-cycle key"
          : "official UPSC answer key (Series A)",
        provisionalKey: provisional || undefined,
        dropped: key.dropped,
        correctedFromKey: mismatch.map((r) => r.number),
        answers,
      },
      null,
      2
    ) + "\n"
  );
  console.log(`\nwrote ${out}  (${answers.length} answers; ${mismatch.length} corrected from the key)`);
  if (key.dropped.length) {
    console.log(
      `EXCLUDED ${key.dropped.length} dropped question(s) — they have no correct answer.\n` +
        `The paper therefore commits ${answers.length}, not ${pat.questions}. Set the coverage\n` +
        `expectation accordingly, and consider the mocks 'grace' flag if this paper backs a mock.`
    );
  }
}

main();
