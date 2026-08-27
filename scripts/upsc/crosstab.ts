/**
 * Cross-tabulate the two independent blind derivation passes.
 *
 *   npx tsx scripts/upsc/crosstab.ts 2025-p1           # the agreement report
 *   npx tsx scripts/upsc/crosstab.ts 2025-p1 --apply   # write data/<id>.answers.json
 *
 * Reads   derived/<paperId>.a.p*.json   pass A
 *         derived/<paperId>.b.p*.json   pass B
 *         data/<paperId>.adjudicated.json   (optional) the hand-resolved disputes
 * Writes  data/<paperId>.answers.json
 *
 * `--apply` REFUSES while any row is unresolved. Every DISPUTE, TWIN and MISSING
 * has to be settled by a human against the page first, in
 * data/<paperId>.adjudicated.json:
 *
 *   { "12": { "answer": "C", "why": "page checked: option C is ..." },
 *     "47": { "answer": "A", "why": "twin - B repeats A verbatim; see note" } }
 *
 * WHAT THIS MEASURES, AND WHAT IT DOES NOT.
 *
 * Agreement between two blind passes bounds DISAGREEMENT risk. It does not bound
 * CORRELATED error: on a fact-recall question both passes can be confidently
 * wrong in the same direction, and nothing here can see that. There is no
 * external anchor for this corpus — UPSC publishes no key with the booklet.
 *
 * So treat the agreement rate as a FLOOR on quality, never as an accuracy
 * estimate. It is the reason this pipeline commits PRIVATE.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, DERIVED, dataPath, pattern, requirePaper } from "./config";
import { crosstab, type CrosstabRow, type Derivation, type TQ } from "./lib";

type Adjudication = { answer: string; why: string };

function loadPass(paperId: string, which: "a" | "b"): Derivation[] {
  const re = new RegExp(`^${paperId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.${which}\\.p\\d+\\.json$`);
  if (!existsSync(DERIVED)) throw new Error(`${DERIVED} does not exist`);
  const files = readdirSync(DERIVED).filter((f) => re.test(f)).sort();
  if (!files.length) throw new Error(`no pass-${which.toUpperCase()} files <${paperId}.${which}.pN.json> in ${DERIVED}`);

  const out: Derivation[] = [];
  const seen = new Map<number, string>();
  for (const f of files) {
    const raw = JSON.parse(readFileSync(join(DERIVED, f), "utf8"));
    const items: Derivation[] = Array.isArray(raw) ? raw : (raw.items ?? raw.derivations ?? []);
    for (const d of items) {
      // A number derived twice WITHIN one pass is that pass contradicting itself
      // (or a packet emitted twice). Either way a silent last-wins would hide it.
      if (seen.has(d.number) && seen.get(d.number) !== f) {
        throw new Error(`pass ${which.toUpperCase()}: Q${d.number} appears in both ${seen.get(d.number)} and ${f}`);
      }
      seen.set(d.number, f);
      out.push(d);
    }
  }
  return out;
}

function main() {
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const pat = pattern(paper);

  const questions: TQ[] = JSON.parse(readFileSync(dataPath(paper.id, "merged"), "utf8")).questions;
  const passA = loadPass(paper.id, "a");
  const passB = loadPass(paper.id, "b");
  const rows = crosstab(passA, passB, questions);

  const adjFile = dataPath(paper.id, "adjudicated");
  const adj: Record<string, Adjudication> = existsSync(adjFile)
    ? JSON.parse(readFileSync(adjFile, "utf8"))
    : {};

  const by = (v: CrosstabRow["verdict"]) => rows.filter((r) => r.verdict === v);
  const agree = by("AGREE");
  const unresolved = rows.filter((r) => r.verdict !== "AGREE" && !adj[String(r.number)]);

  console.log(`${paper.id}  Paper ${paper.paper}  ${rows.length} items  (pass A ${passA.length}, pass B ${passB.length})\n`);
  console.log(`  AGREE    ${String(agree.length).padStart(3)}  (${((agree.length / rows.length) * 100).toFixed(1)}%)`);
  for (const v of ["DISPUTE", "TWIN", "MISSING"] as const) {
    const n = by(v).length;
    if (n) console.log(`  ${v.padEnd(8)} ${String(n).padStart(3)}  ${by(v).map((r) => `Q${r.number}`).join(" ")}`);
  }

  // Agreement broken down by the WEAKER of the two confidences. This is the
  // calibration check: if the confidence field is honest, disagreement
  // concentrates in LOW, and a HIGH/HIGH agreement is the strongest evidence the
  // pipeline can produce. If disagreement is spread evenly across all three,
  // confidence is being inflated and is useless for routing review effort.
  const rank: Record<string, number> = { HIGH: 3, MED: 2, LOW: 1 };
  const buckets = new Map<string, { agree: number; total: number }>();
  for (const r of rows) {
    if (!r.a || !r.b) continue;
    const weaker =
      (rank[r.a.confidence?.toUpperCase()] ?? 0) <= (rank[r.b.confidence?.toUpperCase()] ?? 0)
        ? r.a.confidence
        : r.b.confidence;
    const k = (weaker || "?").toUpperCase();
    const cur = buckets.get(k) ?? { agree: 0, total: 0 };
    cur.total += 1;
    if (r.verdict === "AGREE") cur.agree += 1;
    buckets.set(k, cur);
  }
  console.log(`\nagreement by the WEAKER of the two confidences:`);
  for (const k of ["HIGH", "MED", "LOW", "?"]) {
    const b = buckets.get(k);
    if (b) console.log(`  ${k.padEnd(5)} ${String(b.agree).padStart(3)}/${String(b.total).padEnd(3)}`);
  }

  if (rows.length !== pat.questions) {
    console.log(`\n!! ${rows.length} items crosstabbed but Paper ${paper.paper} has ${pat.questions}.`);
  }

  // The detail a human needs to adjudicate, printed rather than buried in a file.
  const needs = rows.filter((r) => r.verdict !== "AGREE");
  if (needs.length) {
    console.log(`\n--- ${needs.length} row(s) needing a human ---`);
    for (const r of needs) {
      const done = adj[String(r.number)] ? `RESOLVED -> ${adj[String(r.number)].answer}` : "UNRESOLVED";
      console.log(`\nQ${r.number}  ${r.verdict}  [${done}]${r.note ? `\n  ${r.note}` : ""}`);
      if (r.a) console.log(`  A: ${r.a.answer} (${r.a.confidence})  value: ${r.a.value}`);
      if (r.b) console.log(`  B: ${r.b.answer} (${r.b.confidence})  value: ${r.b.value}`);
    }
  }

  if (!apply) {
    console.log(
      `\n[dry-run] ${unresolved.length} unresolved. ` +
        `Adjudicate them in ${adjFile}, then re-run with --apply.`
    );
    return;
  }

  if (unresolved.length) {
    console.error(
      `\nREFUSING to write answers: ${unresolved.length} row(s) unresolved ` +
        `(${unresolved.map((r) => `Q${r.number}`).join(" ")}).\n` +
        `Settle each against the page in ${adjFile}. An unadjudicated disagreement ` +
        `must not be resolved by picking a pass.`
    );
    process.exit(1);
  }

  const answers: Derivation[] = [];
  const reconciled: number[] = [];
  for (const r of rows) {
    if (r.verdict === "AGREE") {
      answers.push(r.a!);
      continue;
    }
    const a = adj[String(r.number)];
    reconciled.push(r.number);
    // Keep whichever pass's reasoning matches the adjudicated letter, so the
    // stored solution argues for the answer we actually shipped. If neither
    // does, the adjudicator's own `why` is the reasoning.
    const match = [r.a, r.b].find((d) => d && d.answer.toUpperCase() === a.answer.toUpperCase());
    answers.push({
      number: r.number,
      answer: a.answer.toUpperCase(),
      value: match?.value ?? a.why,
      confidence: "MED",
      reasoning: match?.reasoning ? `${match.reasoning} ${a.why}`.trim() : a.why,
    });
  }

  const out = dataPath(paper.id, "answers");
  writeFileSync(
    out,
    JSON.stringify({ paper: paper.id, reconciled, answers: answers.sort((x, y) => x.number - y.number) }, null, 2) + "\n"
  );
  console.log(`\nwrote ${out}  (${answers.length} answers, ${reconciled.length} reconciled by hand)`);
}

main();
