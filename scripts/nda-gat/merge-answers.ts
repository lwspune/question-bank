/**
 * Combine the blind derivation range files into `data/<id>.answers.json`.
 *
 *   npx tsx scripts/nda-gat/merge-answers.ts <paperId>
 *   npx tsx scripts/nda-gat/merge-answers.ts <paperId> --apply
 *
 * Reads `data/<id>.d<N>.json` — the output of the blind pass, split into ranges
 * purely for throughput.
 *
 * ## An overlap here is a DISPATCH ERROR, not a disagreement to reconcile
 *
 * This is ONE pass split into ranges, not several independent passes. So a
 * question appearing in two range files means two agents were handed the same
 * range, and the right response is to fix the dispatch — not to crosstab the
 * two answers as though they were independent evidence, which would overstate
 * what this pipeline measures.
 *
 * Contrast `merge.ts` on the transcription side, where an overlap between page
 * bands is EXPECTED and only a disagreement is a finding.
 *
 * ## Why the confidence split is printed per SECTION
 *
 * On Part A (English) an answer is derivable from the page; on Part B it is
 * mostly recall, where a single blind pass measures ~94% in this repo. The two
 * halves therefore deserve different scepticism, and a single blended
 * HIGH/MED/LOW figure hides that. The GK line below is the one to read.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { DATA, QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";
import { normalizeDerivations, PART_A_LAST, type Derivation } from "./lib";

function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");

  // ANCHORED to `<id>.d<N>.json`. A loose `<id>.*.json` would also swallow
  // `<id>.derive.json` — "d" followed by "erive" — which is exactly how a
  // sibling pipeline once read its own blind PACKET back as a set of
  // derivations and found every question answered twice.
  const re = new RegExp(`^${paper.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.d\\d+\\.json$`);
  const files = readdirSync(DATA).filter((f) => re.test(f)).sort();
  if (!files.length) throw new Error(`no derivation files matching ${paper.id}.d<N>.json in ${DATA}`);

  const byNumber = new Map<number, { d: Derivation; file: string }>();
  const duplicates: string[] = [];
  const shapeErrors: string[] = [];

  for (const f of files) {
    const rows = normalizeDerivations(
      JSON.parse(readFileSync(`${DATA}/${f}`, "utf8")) as Derivation[]
    );
    console.log(`  ${f.padEnd(24)} ${String(rows.length).padStart(3)} derivation(s)`);
    for (const d of rows) {
      if (typeof d.number !== "number") {
        shapeErrors.push(`${f}: a row has no question number`);
        continue;
      }
      // `value` is mandatory by the brief and is what lets a reviewer tell a
      // genuine disagreement from two labels sitting on the same fact.
      if (d.answer != null && !String(d.value ?? "").trim()) {
        shapeErrors.push(`Q${d.number} (${f}): no \`value\` — the brief requires it`);
      }
      if (!String(d.reasoning ?? "").trim()) {
        shapeErrors.push(`Q${d.number} (${f}): no \`reasoning\``);
      }
      if (d.answer != null && !["A", "B", "C", "D"].includes(String(d.answer).toUpperCase())) {
        shapeErrors.push(`Q${d.number} (${f}): bad answer "${d.answer}"`);
      }
      const prev = byNumber.get(d.number);
      if (prev) {
        duplicates.push(
          `Q${d.number}: derived in BOTH ${prev.file} and ${f} — a dispatch error, ` +
            `not independent evidence. Fix the ranges rather than crosstabbing.`
        );
        continue;
      }
      byNumber.set(d.number, { d, file: f });
    }
  }

  const derivations = [...byNumber.values()].map((x) => x.d).sort((a, b) => a.number - b.number);

  const missing: number[] = [];
  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!byNumber.has(n)) missing.push(n);

  const conf = (from: number, to: number) => {
    const m = new Map<string, number>();
    for (const d of derivations) {
      if (d.number < from || d.number > to) continue;
      const k = (d.confidence ?? "?").toUpperCase();
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return [...m.entries()].sort().map(([k, v]) => `${k} ${v}`).join(" · ");
  };

  console.log(`\n${paper.id}: ${derivations.length} of ${QUESTIONS_PER_PAPER} derived`);
  console.log(`  Part A (English, 1-${PART_A_LAST}):  ${conf(1, PART_A_LAST)}`);
  console.log(`  Part B (GK, ${PART_A_LAST + 1}-${QUESTIONS_PER_PAPER}):      ${conf(PART_A_LAST + 1, QUESTIONS_PER_PAPER)}`);

  const nulls = derivations.filter((d) => d.answer == null);
  if (nulls.length) {
    console.log(`\nNO CORRECT OPTION (${nulls.length}) — a finding, not a gap:`);
    for (const d of nulls) console.log(`  Q${d.number}: ${d.value || d.reasoning?.slice(0, 120)}`);
  }

  // The MED rows are the review queue. The brief requires each to name its
  // runner-up, and on the sibling paper every MED disagreement with the real key
  // landed on exactly the named alternative.
  const med = derivations.filter((d) => (d.confidence ?? "").toUpperCase() === "MED");
  const low = derivations.filter((d) => (d.confidence ?? "").toUpperCase() === "LOW");
  if (med.length || low.length) {
    console.log(
      `\nREVIEW QUEUE: ${med.length} MED, ${low.length} LOW — ` +
        `read these first when the key arrives.`
    );
    console.log(`  MED: ${med.map((d) => `Q${d.number}`).join(", ") || "(none)"}`);
    console.log(`  LOW: ${low.map((d) => `Q${d.number}`).join(", ") || "(none)"}`);
  }

  const errors = [
    ...shapeErrors,
    ...duplicates,
    ...(missing.length ? [`missing derivation(s): ${missing.join(", ")}`] : []),
  ];
  if (errors.length) {
    console.log(`\nERRORS (${errors.length}):`);
    for (const e of errors) console.log(`  ${e}`);
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write ${paper.id}.answers.json. Nothing written.`);
    return;
  }
  if (errors.length) throw new Error("refusing to write — fix the derivation files first.");

  writeFileSync(
    dataPath(paper.id, "answers"),
    JSON.stringify({ derivations }, null, 2) + "\n",
    "utf8"
  );
  console.log(`\nwrote ${dataPath(paper.id, "answers")} (${derivations.length} derivations).`);
}

if (require.main === module) main();
