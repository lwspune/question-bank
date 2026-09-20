/**
 * Score a CDS General Knowledge paper's BLIND derivation against the OFFICIAL
 * published key.
 *
 *   npx tsx scripts/cds-gs/score.ts <paperId>
 *   npx tsx scripts/cds-gs/score.ts <paperId> --inject 7=A   # canary: force a disagreement
 *   npx tsx scripts/cds-gs/score.ts <paperId> --apply        # write data/<id>.answers.json
 *
 * It never writes the bank and never edits the transcription — a disagreement
 * is a finding to adjudicate by looking at the printed page, not an instruction
 * to flip an answer. `--apply` writes only the answers file, and only once every
 * disagreement carries a hand-written adjudication in
 * `data/<paperId>.adjudicated.json`.
 *
 * WHY --apply REFUSES WITHOUT AN ADJUDICATION. The answers file's `reasoning`
 * is what a student reads as the solution. Taking the key's letter while
 * keeping the blind pass's prose would ship, on every flipped row, a solution
 * arguing for a different answer than the one marked correct — which reads as a
 * bug to a student and trips this repo's own key audit as a false positive. So
 * a flip must supply new reasoning, and the tooling will not let it not.
 *
 * WHY THIS EXISTS IN A PIPELINE BUILT ON THE ABSENCE OF KEYS. Nineteen of the
 * twenty CDS GK papers have no published key; that absence is the premise the
 * whole pipeline rests on, and it is why every answer in those papers is
 * LLM-derived, carries a confidence, and is reconciled from two blind passes
 * whose AGREEMENT is the only number available. `2026-2` is the first sitting
 * UPSC published a key for, so it is the first paper here whose derivation can
 * be checked against something outside itself.
 *
 * ORDERING IS THE WHOLE CONTROL. This script is the only thing in the pipeline
 * that opens `Paper.answerKey`, and it must not be run until the derivation is
 * written and committed. A single agent cannot be two parties, so "blind" here
 * is enforced by that ordering and by the git history, which is weaker than the
 * dual-agent arrangement used for the other nineteen papers and is recorded as
 * such wherever this measurement is quoted.
 *
 * HOW TO READ A DISAGREEMENT, in priority order. The suspect is NOT the key
 * first. This corpus's documented defect class is a mis-slotted option — the
 * correct text copied into the wrong letter's slot — which a blind derivation
 * cannot detect on its own but which an official key makes visible, because the
 * key's letter is defined against the booklet's PRINTED option order. So:
 *   1. our OPTION ORDER for that question, checked against the printed page;
 *   2. our derivation;
 *   3. the key itself — last. For fact-recall items the key defines the answer
 *      for a mock even where another reading is arguable, so overruling it
 *      needs evidence from the page, not a second opinion.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { reconcileKeyReads, scoreAgainstKey, type KeyRead } from "../cds/keyLib";
import { QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";
import { normalizeQuestions, type Derivation, type TQ } from "./lib";
import { loadPass } from "./passes";

/** A hand-written decision on a row the official key overruled, or withdrew. */
type Adjudication = { number: number; answer: string; value: string; basis: string; reasoning: string };

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

  // Everything after the FIRST "=", because an injected value could contain one.
  const injectArg = process.argv.find((a, i) => process.argv[i - 1] === "--inject");
  const inject = injectArg ? { n: Number(injectArg.slice(0, injectArg.indexOf("="))), v: injectArg.slice(injectArg.indexOf("=") + 1) } : null;

  console.log(`\n${paper.id} — blind derivation vs the official published key`);
  console.log(`  key: ${paper.answerKey}`);
  console.log(`  booklet series: ${paper.series}\n`);

  const reads = loadReads(paper.id);
  const rec = reconcileKeyReads(reads, QUESTIONS_PER_PAPER);
  if (!rec.ok) {
    console.log(`\nKEY REFUSED: ${rec.error}`);
    for (const c of rec.conflicts ?? []) console.log(`  Q${c.number}: ${JSON.stringify(c.reads)}`);
    process.exit(1);
  }
  if (reads[0].series !== paper.series) {
    throw new Error(`the key reads are of series ${reads[0].series} but the booklet is series ${paper.series}`);
  }

  const questions: TQ[] = normalizeQuestions(JSON.parse(readFileSync(dataPath(paper.id, "questions"), "utf8")));
  const derived: Derivation[] = loadPass(paper.id, "a");
  const byNumber = new Map(derived.map((d) => [d.number, d]));

  // A WITHDRAWN question is excluded from the score EXPLICITLY, never silently:
  // it has no right answer, so counting it either way would misstate the number
  // this whole exercise exists to produce.
  const dropped = new Set(rec.dropped);
  if (dropped.size) {
    console.log(`\n  DROPPED BY UPSC (excluded from the score): ${[...dropped].sort((a, b) => a - b).map((n) => `Q${n}`).join(", ")}`);
    for (const n of dropped) {
      const d = byNumber.get(n);
      console.log(`    Q${n}: our blind pass answered ${d?.answer ?? "?"} at ${d?.confidence ?? "?"} confidence`);
    }
  }

  const scored = derived
    .filter((d) => !dropped.has(d.number))
    .map((d) => ({
      number: d.number,
      answer: d.number === inject?.n ? inject.v : d.answer,
      confidence: d.confidence.toUpperCase(),
    }));

  const s = scoreAgainstKey(scored, rec.key);
  const pct = ((s.agree / s.total) * 100).toFixed(1);
  console.log(`\n  AGREEMENT WITH THE OFFICIAL KEY: ${s.agree}/${s.total}  (${pct}%)\n`);
  for (const c of ["HIGH", "MED", "LOW"]) {
    const b = s.byConfidence[c];
    if (b) console.log(`    ${c.padEnd(5)} ${String(b.agree).padStart(3)}/${String(b.total).padEnd(3)}`);
  }

  if (s.disagree.length) {
    console.log(`\n  ${s.disagree.length} DISAGREEMENT(S) — adjudicate in this order: our OPTION ORDER on the page, then our derivation, then the key.\n`);
    for (const d of s.disagree) {
      const q = questions.find((x) => x.number === d.number);
      const der = byNumber.get(d.number);
      console.log(`  Q${d.number}  derived ${d.derived} (${d.confidence})  ·  key ${d.key}`);
      console.log(`    ${q?.subject} > ${q?.chapter}`);
      console.log(`    stem: ${(q?.stem ?? "").split("\n")[0].slice(0, 140)}`);
      for (const o of q?.options ?? []) {
        const mark = o.label === d.key ? "KEY " : o.label === d.derived ? "ours" : "    ";
        console.log(`      ${mark} (${o.label.toLowerCase()}) ${o.text.slice(0, 110)}`);
      }
      console.log(`    our reasoning: ${der?.reasoning ?? "?"}\n`);
    }
  } else {
    console.log(`\n  No disagreements.`);
  }

  if (!process.argv.includes("--apply")) {
    console.log(`\n[report only] pass --apply to write ${paper.id}.answers.json.`);
    return;
  }
  if (inject) throw new Error("refusing to --apply a run carrying --inject: the canary is a lie by construction.");

  const adjPath = dataPath(paper.id, "adjudicated");
  const adj: Adjudication[] = existsSync(adjPath) ? JSON.parse(readFileSync(adjPath, "utf8")) : [];
  const adjBy = new Map(adj.map((a) => [a.number, a]));

  // Every row the key overrules, and every row the key does not cover, needs a
  // hand-written adjudication. Otherwise the flipped answer would ship with the
  // blind pass's prose still arguing the answer that lost.
  const needing = [...s.disagree.map((d) => d.number), ...dropped];
  const unsettled = needing.filter((n) => !adjBy.has(n));
  if (unsettled.length) {
    throw new Error(
      `refusing to write: ${unsettled.length} row(s) have no adjudication (${unsettled.map((n) => `Q${n}`).join(", ")}).\n` +
        `  Add them to ${adjPath} with answer, value, basis and rewritten reasoning.`
    );
  }
  for (const a of adj) {
    if (!needing.includes(a.number)) {
      throw new Error(`${adjPath} adjudicates Q${a.number}, which the key did not overrule — remove it rather than silently overriding an agreed row.`);
    }
  }

  const out = derived.map((d) => {
    const a = adjBy.get(d.number);
    if (!a) return d;
    return { ...d, answer: a.answer, value: a.value, reasoning: a.reasoning };
  });
  const answersPath = dataPath(paper.id, "answers");
  writeFileSync(
    answersPath,
    JSON.stringify({ reconciled: needing.slice().sort((x, y) => x - y), derivations: out }, null, 2) + "\n",
    "utf8"
  );
  console.log(`\nwrote ${answersPath} (${out.length} answers, ${needing.length} key-corrected).`);
}

main();
