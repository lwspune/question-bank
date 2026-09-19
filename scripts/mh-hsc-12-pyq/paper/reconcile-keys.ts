/**
 * Reconcile the two independent MCQ key derivations, and apply the agreed ones.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/reconcile-keys.ts <paperId>            # report
 *   npx tsx scripts/mh-hsc-12-pyq/paper/reconcile-keys.ts <paperId> --apply    # write agreed keys
 *
 * Reads out/<id>/authoring-keys.md (pass 1) and out/<id>/blind-keys.md (pass 2)
 * and writes agreed answers onto data/<id>.questions.json.
 *
 * WHAT IT REFUSES TO DO:
 *  - resolve a disagreement (both answers are reported; a human adjudicates
 *    against the printed page)
 *  - apply anything while a disagreement is outstanding, because a partially
 *    keyed file is indistinguishable from a finished one two sessions later
 *  - apply a LOW-confidence agreement without `--include-low`, since two unsure
 *    passes agreeing is a coincidence, not a verification
 *
 * A disagreement here is the most valuable output this pipeline produces: it is
 * the only signal that a derived key might be wrong, and there is no answer key
 * anywhere to fall back on.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PAPERS, requirePaper, questionsJsonPath, pagesDir } from "./config";
import { parseKeyLines, reconcileKeys } from "./keys";
import type { PaperQuestion } from "../../mh-ssc-10/lib";

function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const includeLow = process.argv.includes("--include-low");
  if (!id) {
    console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/reconcile-keys.ts <paperId> [--apply] [--include-low]`);
    console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
    process.exit(1);
  }
  const paper = requirePaper(id);
  const dir = pagesDir(id);
  const files = { a: join(dir, "authoring-keys.md"), b: join(dir, "blind-keys.md") };
  for (const [name, f] of Object.entries(files)) {
    if (!existsSync(f)) throw new Error(`${id}: missing pass ${name} at ${f}`);
  }

  const a = parseKeyLines(readFileSync(files.a, "utf8"));
  const b = parseKeyLines(readFileSync(files.b, "utf8"));
  const rec = reconcileKeys(a, b);

  const qs = JSON.parse(readFileSync(questionsJsonPath(id), "utf8")) as PaperQuestion[];
  const mcqRefs = qs.filter((q) => q.format === "mcq").map((q) => q.ref);

  console.log(`${paper.id}  ${paper.month} ${paper.year}`);
  console.log(`  pass 1 (authoring): ${a.length} keys · pass 2 (blind): ${b.length} keys · paper has ${mcqRefs.length} MCQs`);
  console.log(`  AGREE ${rec.agree.length} · DISAGREE ${rec.disagree.length}`);

  for (const r of rec.agree) console.log(`    = ${r.ref.padEnd(13)} ${r.answer}   (${r.confidence})`);
  for (const d of rec.disagree) {
    console.log(`    ! ${d.ref.padEnd(13)} pass1=${d.a}  pass2=${d.b}`);
    console.log(`        pass1: ${d.aNote}`);
    console.log(`        pass2: ${d.bNote}`);
  }

  const problems: string[] = [];
  for (const ref of rec.onlyA) problems.push(`${ref}: derived by the authoring pass only — the blind pass skipped it`);
  for (const ref of rec.onlyB) problems.push(`${ref}: derived by the blind pass only — the authoring pass skipped it`);
  // "Seen by at least one pass" — onlyA/onlyB included, or a ref that one pass
  // skipped gets reported twice: once correctly as one-pass-only, and once
  // wrongly as "no key from either pass".
  const seen = new Set([
    ...rec.agree.map((r) => r.ref),
    ...rec.disagree.map((d) => d.ref),
    ...rec.onlyA,
    ...rec.onlyB,
  ]);
  for (const ref of mcqRefs) if (!seen.has(ref)) problems.push(`${ref}: no key from EITHER pass`);
  for (const ref of rec.lowConfidenceAgreements) {
    problems.push(`${ref}: both passes agree but at LOW confidence — re-derive before trusting`);
  }
  const none = rec.agree.filter((r) => r.answer === "NONE");
  for (const r of none) problems.push(`${r.ref}: both passes derived a value matching NO printed option — adjudicate against the page`);

  for (const p of problems) console.log(`    ⚠ ${p}`);

  if (!apply) {
    console.log(`\n[report only] pass --apply to write the ${rec.agree.length} agreed key(s).`);
    return;
  }
  if (rec.disagree.length) {
    throw new Error(
      `refusing to apply: ${rec.disagree.length} disagreement(s) outstanding.\n` +
        `  Adjudicate each against ${dir}/p-NN.png, correct the losing pass's file, and re-run.\n` +
        `  Applying the agreed subset now would leave a file that looks finished and is not.`,
    );
  }

  let written = 0;
  for (const q of qs) {
    const hit = rec.agree.find((r) => r.ref === q.ref);
    if (!hit) continue;
    if (hit.answer === "NONE") continue; // keep unkeyed; commit leaves no option correct
    if (hit.confidence === "low" && !includeLow) continue;
    q.answer = hit.answer;
    q.reviewFlag = true; // derived, never an official key — see ../SOLUTION_BRIEF.md
    written++;
  }
  writeFileSync(questionsJsonPath(id), JSON.stringify(qs, null, 2) + "\n", "utf8");
  console.log(`\napplied ${written} key(s) to ${questionsJsonPath(id)} (all REVIEW-flagged — derived, not official)`);
}

main();
