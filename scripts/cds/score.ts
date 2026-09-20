/**
 * Score a CDS English paper's BLIND derivation against the OFFICIAL published key.
 *
 *   npx tsx scripts/cds/score.ts <paperId>
 *   npx tsx scripts/cds/score.ts <paperId> --inject 7=A   # canary: force a disagreement
 *
 * Read-only. It never writes the bank and never edits the transcription — a
 * disagreement is a finding to adjudicate by looking at the printed page, not
 * an instruction to flip an answer.
 *
 * ORDERING IS THE WHOLE CONTROL. This script is the only thing in the pipeline
 * that opens `Paper.answerKey`, and it must not be run until the derivation is
 * written and committed. A single agent cannot be two parties, so "blind" here
 * is enforced by that ordering and by the git history, which is weaker than the
 * dual-reader arrangement used for CDS Maths and is recorded as such wherever
 * this measurement is quoted.
 *
 * How to read a disagreement, in priority order. The suspect is NOT the key
 * first. This corpus's documented defect class is a mis-slotted option — the
 * correct text copied into the wrong letter — which a blind derivation cannot
 * detect on its own but which an official key makes visible, because the key's
 * letter is defined against the booklet's printed option order. So:
 *   1. our OPTION ORDER for that question, checked against the printed page;
 *   2. our derivation;
 *   3. the key itself — last, and for English rarely, since on judgement items
 *      (idiom shades, S1/S2 relationships, rearrangements) the key defines the
 *      right answer for a mock even where another reading is defensible.
 */
import { existsSync, readFileSync } from "node:fs";
import { dataPath, requirePaper } from "./config";
import { reconcileKeyReads, scoreAgainstKey, type KeyRead } from "./keyLib";
import { normalizeQuestions, type TQ } from "./lib";

const QUESTIONS_PER_PAPER = 120;

function loadReads(paperId: string): KeyRead[] {
  const reads: KeyRead[] = [];
  for (let n = 1; n <= 4; n += 1) {
    const f = dataPath(paperId, `keyread${n}`);
    if (!existsSync(f)) continue;
    const raw = JSON.parse(readFileSync(f, "utf8"));
    reads.push({ readerId: raw.readerId ?? `keyread${n}`, series: raw.series, answers: raw.answers ?? {} });
    const hdr = raw.report?.headerRead ?? {};
    console.log(
      `  ${raw.readerId ?? `keyread${n}`}: series=${raw.series ?? "?"} page=${raw.pageIndex} ` +
        `total=${hdr.totalQuestions} dropped=${hdr.questionsDropped} scored=${hdr.questionsScored}` +
        (raw.method ? `\n      method: ${raw.method}` : "")
    );
    const low = raw.report?.lowConfidenceCells ?? [];
    if (low.length) console.log(`      ${low.length} low-confidence cell(s): ${JSON.stringify(low)}`);
  }
  return reads;
}

function main() {
  const paper = requirePaper(process.argv[2]);
  if (!paper.answerKey) throw new Error(`${paper.id} has no answerKey in config — there is nothing to score against.`);
  if (!paper.series) throw new Error(`${paper.id} has an answerKey but no series; the key is per-series, so this is unscoreable.`);

  // Everything after the FIRST "=", because the value itself contains one
  // (--inject=7=A). Splitting on every "=" and taking [1] silently yields the
  // question number with no letter, which is how this canary first "passed"
  // by doing nothing at all.
  const injectArg = process.argv.find((a) => a.startsWith("--inject="));
  const inject = injectArg?.slice("--inject=".length);

  console.log(`\n${paper.id} — ${paper.pyqNote}`);
  console.log(`booklet series: ${paper.series}   key: ${paper.answerKey.split(/[\\/]/).pop()}`);
  console.log(`\nkey reads:`);
  const reads = loadReads(paper.id);
  if (!reads.length) throw new Error(`no data/${paper.id}.keyread*.json found.`);

  const rec = reconcileKeyReads(reads, QUESTIONS_PER_PAPER);
  if (!rec.ok) {
    console.error(`\nRECONCILIATION FAILED: ${rec.error}`);
    for (const c of rec.conflicts ?? []) console.error(`  Q${c.number}: ${JSON.stringify(c.reads)}`);
    process.exit(1);
  }
  if (reads[0].series !== paper.series) {
    console.error(`\nSERIES MISMATCH: booklet is ${paper.series}, key reads are ${reads[0].series}. Refusing to score.`);
    process.exit(1);
  }
  console.log(`\n${reads.length} reads agree on all ${QUESTIONS_PER_PAPER} cells; series ${reads[0].series} matches the booklet.`);

  const key = { ...rec.key };
  if (inject) {
    const [n, v] = inject.split("=");
    console.log(`\n[canary] forcing key Q${n} to ${v} (was ${key[n]})`);
    key[n] = v;
  }

  const questions = normalizeQuestions(JSON.parse(readFileSync(dataPath(paper.id, "questions"), "utf8"))) as TQ[];
  const score = scoreAgainstKey(
    questions.map((q) => ({ number: q.number, answer: q.answer, confidence: q.confidence })),
    key
  );

  const pct = ((100 * score.agree) / score.total).toFixed(1);
  console.log(`\nBLIND DERIVATION vs OFFICIAL KEY: ${score.agree} / ${score.total}  (${pct}%)`);
  console.log(`\nby confidence:`);
  for (const [c, b] of Object.entries(score.byConfidence).sort()) {
    console.log(`  ${c.padEnd(5)} ${String(b.agree).padStart(3)} / ${String(b.total).padStart(3)} agree`);
  }

  if (!score.disagree.length) {
    console.log(`\nNo disagreements.`);
    return;
  }

  console.log(`\n${score.disagree.length} DISAGREEMENT(S) — adjudicate each from the printed page.`);
  console.log(`Suspect order: (1) our option ORDER, (2) our derivation, (3) the key.\n`);
  const byNum = new Map(questions.map((q) => [q.number, q]));
  for (const d of score.disagree) {
    const q = byNum.get(d.number)!;
    console.log(`Q${d.number}  derived ${d.derived}  key ${d.key}   [${d.confidence}]`);
    const stem = (q.stem || "(stem built from the option parts)").replace(/\n/g, " / ");
    console.log(`   stem: ${stem.slice(0, 160)}${stem.length > 160 ? "…" : ""}`);
    for (const o of q.options) {
      const mark = o.label === d.derived ? "ours>" : o.label === d.key ? " key>" : "     ";
      console.log(`   ${mark} ${o.label}. ${o.text.slice(0, 110)}`);
    }
    console.log(`   why we said ${d.derived}: ${(q.reasoning || "").slice(0, 240)}\n`);
  }
}

main();
