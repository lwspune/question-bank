/**
 * Crosstab the two blind derivation passes for a paper.
 *
 *   npx tsx scripts/cds-gs/crosstab.ts <paperId>          # report only
 *   npx tsx scripts/cds-gs/crosstab.ts <paperId> --apply  # also write data/<id>.answers.json
 *
 * Reads derived/<paperId>.a.p*.json and derived/<paperId>.b.p*.json, compares them
 * question by question, and prints the pilot's headline number: how often two
 * independent derivations of a key-less paper agree.
 *
 * `--apply` writes the answers file ONLY when every question is settled — i.e.
 * every row is AGREE or TWIN, or carries a hand-adjudication in
 * `data/<paperId>.adjudicated.json`. A DISPUTE is a human decision, so this
 * refuses rather than picking a pass; picking one would silently convert "two
 * agents disagreed" into "the answer is X", which is the whole thing the second
 * pass exists to prevent.
 *
 * WHAT THIS MEASURES, AND WHAT IT DOES NOT. Agreement bounds DISAGREEMENT risk.
 * It does not bound CORRELATED error: on a fact-recall question both passes can
 * be confidently wrong in the same direction, and nothing here can see that.
 * Treat the agreement rate as a floor on quality, never as an accuracy estimate.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";
import { crosstab, type CrosstabRow, type Derivation, type TQ } from "./lib";

const DERIVED = join(__dirname, "derived");

function loadPass(paperId: string, pass: "a" | "b"): Derivation[] {
  const re = new RegExp(`^${paperId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.${pass}\\.p\\d+\\.json$`);
  const files = readdirSync(DERIVED).filter((f) => re.test(f)).sort();
  if (!files.length) throw new Error(`no pass-${pass.toUpperCase()} files matching ${paperId}.${pass}.p<N>.json in ${DERIVED}`);
  const out: Derivation[] = [];
  for (const f of files) out.push(...(JSON.parse(readFileSync(join(DERIVED, f), "utf8")) as Derivation[]));
  return out;
}

type Adjudication = { number: number; answer: string; value: string; reasoning: string; basis: string };

function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");

  const questions: TQ[] = JSON.parse(readFileSync(dataPath(paper.id, "questions"), "utf8"));
  const passA = loadPass(paper.id, "a");
  const passB = loadPass(paper.id, "b");

  // A pass that is short is a finding, not something to quietly work around.
  for (const [name, p] of [["A", passA], ["B", passB]] as const) {
    if (p.length !== questions.length) {
      console.log(`  ! pass ${name} has ${p.length} derivations for ${questions.length} questions`);
    }
  }

  const rows = crosstab(passA, passB, questions);
  const by = (v: CrosstabRow["verdict"]) => rows.filter((r) => r.verdict === v);
  const agree = by("AGREE");
  const twin = by("TWIN");
  const dispute = by("DISPUTE");
  const missing = by("MISSING");

  const pct = (n: number) => ((n / rows.length) * 100).toFixed(1);
  console.log(`\n${paper.id} — two blind passes over ${rows.length} questions\n`);
  console.log(`  AGREE    ${String(agree.length).padStart(3)}  ${pct(agree.length)}%`);
  console.log(`  TWIN     ${String(twin.length).padStart(3)}  ${pct(twin.length)}%   (different letters, same option text — repair the OPTION, not the answer)`);
  console.log(`  DISPUTE  ${String(dispute.length).padStart(3)}  ${pct(dispute.length)}%   (needs hand adjudication from the page)`);
  console.log(`  MISSING  ${String(missing.length).padStart(3)}  ${pct(missing.length)}%`);

  // Confidence is the honest signal on a fact-recall corpus, so report agreement
  // BROKEN DOWN by it: agreement among LOW-confidence rows is much weaker
  // evidence than agreement among HIGH ones, and a single blended percentage
  // hides exactly that.
  const conf = (r: CrosstabRow) => {
    const a = (r.a?.confidence ?? "").toUpperCase();
    const b = (r.b?.confidence ?? "").toUpperCase();
    const rank = (c: string) => (c === "HIGH" ? 3 : c === "MED" ? 2 : 1);
    return rank(a) <= rank(b) ? a || b : b || a; // the WEAKER of the two
  };
  const buckets = new Map<string, { n: number; agree: number }>();
  for (const r of rows) {
    const c = conf(r) || "UNKNOWN";
    const e = buckets.get(c) ?? { n: 0, agree: 0 };
    e.n++;
    if (r.verdict === "AGREE" || r.verdict === "TWIN") e.agree++;
    buckets.set(c, e);
  }
  console.log(`\n  agreement by the WEAKER of the two confidences:`);
  for (const c of ["HIGH", "MED", "LOW", "UNKNOWN"]) {
    const e = buckets.get(c);
    if (!e) continue;
    console.log(`    ${c.padEnd(8)} ${String(e.agree).padStart(3)}/${String(e.n).padEnd(3)}  ${((e.agree / e.n) * 100).toFixed(1)}%`);
  }

  if (twin.length) {
    console.log(`\nTWIN (${twin.length}):`);
    for (const r of twin) console.log(`  Q${r.number}: A=${r.a!.answer} B=${r.b!.answer} — ${r.note}`);
  }
  if (dispute.length) {
    console.log(`\nDISPUTE (${dispute.length}) — adjudicate each against the printed page:`);
    for (const r of dispute) {
      console.log(`  Q${r.number}:`);
      console.log(`     A ${r.a!.answer} (${r.a!.confidence}) "${r.a!.value}" — ${r.a!.reasoning}`);
      console.log(`     B ${r.b!.answer} (${r.b!.confidence}) "${r.b!.value}" — ${r.b!.reasoning}`);
    }
  }
  if (missing.length) {
    console.log(`\nMISSING (${missing.length}): ${missing.map((r) => `Q${r.number} (${r.note})`).join(", ")}`);
  }

  // Rows both passes agreed on but BOTH rated LOW — agreement here is the
  // weakest evidence the pipeline produces and is worth naming separately, since
  // it looks identical to a strong AGREE in the headline number.
  const weakAgree = agree.filter((r) => conf(r) === "LOW");
  if (weakAgree.length) {
    console.log(`\nAGREE but both passes LOW (${weakAgree.length}) — weakest rows in the paper: ${weakAgree.map((r) => `Q${r.number}`).join(", ")}`);
  }

  if (!apply) {
    console.log(`\n[report only] pass --apply to write ${paper.id}.answers.json.`);
    return;
  }

  const adjPath = join(DATA, `${paper.id}.adjudicated.json`);
  const adjudications: Adjudication[] = existsSync(adjPath) ? JSON.parse(readFileSync(adjPath, "utf8")) : [];
  const adjBy = new Map(adjudications.map((a) => [a.number, a]));

  const unsettled = [...dispute, ...missing].filter((r) => !adjBy.has(r.number));
  if (unsettled.length) {
    throw new Error(
      `refusing to write: ${unsettled.length} question(s) unsettled (${unsettled.map((r) => `Q${r.number}`).join(", ")}).\n` +
        `Adjudicate them from the page into ${adjPath}, then re-run.`
    );
  }

  const derivations: Derivation[] = rows.map((r) => {
    const adj = adjBy.get(r.number);
    if (adj) {
      return { number: r.number, answer: adj.answer, value: adj.value, confidence: "ADJUDICATED", reasoning: adj.reasoning };
    }
    // AGREE / TWIN: both passes concluded the same thing. Keep pass A's wording
    // and the WEAKER confidence — reporting the stronger of two would overstate.
    return { ...r.a!, confidence: conf(r) };
  });

  const reconciled = [...dispute, ...missing].map((r) => r.number).sort((a, b) => a - b);
  if (derivations.length !== QUESTIONS_PER_PAPER) {
    throw new Error(`expected ${QUESTIONS_PER_PAPER} derivations, built ${derivations.length}`);
  }

  writeFileSync(dataPath(paper.id, "answers"), JSON.stringify({ reconciled, derivations }, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${dataPath(paper.id, "answers")} (${derivations.length} answers, ${reconciled.length} hand-reconciled).`);
}

main();
