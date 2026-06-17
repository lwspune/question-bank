/**
 * Build a 120-question NDA practice paper (Vectors 50 + Probability 50 +
 * Binomial Distribution 20) into two .docx files using the SAME export
 * pipeline the website UI uses — so the output is format-identical to a
 * "download Question Paper / Answer Key" from /browse.
 *
 *   npx tsx scripts/practice-paper/build.ts
 *
 * Authoring data lives in ./data/*.ts. This script:
 *   1. concatenates the specs (Vectors -> Probability -> Binomial),
 *   2. assigns each correct answer to an A/B/C/D label via a seeded balanced
 *      shuffle (~30 of each, so the answer key has no positional bias),
 *   3. constructs QuestionRow objects and feeds them to buildQuestionPaper /
 *      buildAnswerKey (includeSolutions: true),
 *   4. writes QP_*.docx + Answers_*.docx into ./generated-papers/.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import * as XLSX from "xlsx";
import { buildQuestionPaper, buildAnswerKey } from "@/lib/export/docxBuilder";
import { buildTagRows, tagRowsToAoa } from "@/lib/export/tagsSheet";
import type { QuestionRow, OptionRow } from "@/lib/questions/query";
import type { Spec } from "./types";
import { VECTORS } from "./data/vectors";
import { PROBABILITY } from "./data/probability";
import { BINOMIAL } from "./data/binomial";

const TITLE = "NDA Mathematics — Vectors, Probability & Binomial Distribution";
const LABELS: OptionRow["label"][] = ["A", "B", "C", "D"];

// Deterministic PRNG so re-runs are stable (mulberry32).
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** A balanced multiset of labels (as even as possible across n), shuffled. */
function balancedLabels(n: number, rng: () => number): OptionRow["label"][] {
  const out: OptionRow["label"][] = [];
  for (let i = 0; i < n; i++) out.push(LABELS[i % 4]);
  return shuffle(out, rng);
}

function specToRow(
  spec: Spec,
  index: number,
  correctLabel: OptionRow["label"],
  rng: () => number
): QuestionRow {
  // Place the correct answer at correctLabel; fill the remaining three labels
  // with the (shuffled) distractors.
  const others = LABELS.filter((l) => l !== correctLabel);
  const distractors = shuffle(spec.distractors, rng);
  const options: OptionRow[] = LABELS.map((label) => {
    if (label === correctLabel) {
      return { label, text: spec.correct, isCorrect: true, imageUrl: null };
    }
    const di = others.indexOf(label);
    return { label, text: distractors[di], isCorrect: false, imageUrl: null };
  });

  return {
    id: `pp-${index + 1}`,
    text: spec.stem,
    context: null,
    difficulty: spec.difficulty,
    solution: spec.solution,
    imageUrl: null,
    setId: null,
    questionNumber: null,
    pyqYear: null,
    pyqMonth: null,
    pyqNote: null,
    exam: { id: "nda", name: "NDA" },
    subject: { id: "maths", name: "Mathematics" },
    chapter: { id: spec.chapter, name: spec.chapter },
    subtopic: { id: spec.subtopic, name: spec.subtopic },
    options,
  };
}

async function main() {
  const specs: Spec[] = [...VECTORS, ...PROBABILITY, ...BINOMIAL];

  // Loud sanity checks before we spend time rendering.
  const counts = {
    Vectors: VECTORS.length,
    Probability: PROBABILITY.length,
    "Binomial Distribution": BINOMIAL.length,
  };
  console.log("Question counts:", counts);
  if (VECTORS.length !== 50) throw new Error(`Vectors must be 50, got ${VECTORS.length}`);
  if (PROBABILITY.length !== 50) throw new Error(`Probability must be 50, got ${PROBABILITY.length}`);
  if (BINOMIAL.length !== 20) throw new Error(`Binomial must be 20, got ${BINOMIAL.length}`);
  for (const s of specs) {
    if (s.distractors.length !== 3) throw new Error(`Need exactly 3 distractors: ${s.stem.slice(0, 60)}`);
    const all = [s.correct, ...s.distractors].map((t) => t.trim());
    if (new Set(all).size !== 4) throw new Error(`Duplicate option text: ${s.stem.slice(0, 60)}`);
  }

  const rng = mulberry32(20260611);
  const labels = balancedLabels(specs.length, rng);

  const rows = specs.map((s, i) => specToRow(s, i, labels[i], rng));

  // Report the realised A/B/C/D distribution.
  const dist = { A: 0, B: 0, C: 0, D: 0 } as Record<string, number>;
  for (const r of rows) {
    const c = r.options.find((o) => o.isCorrect)!;
    dist[c.label]++;
  }
  console.log("Answer distribution:", dist);

  const outDir = join(process.cwd(), "generated-papers");
  mkdirSync(outDir, { recursive: true });

  const paper = await buildQuestionPaper({ title: TITLE, questions: rows });
  const key = await buildAnswerKey({ title: TITLE, questions: rows, includeSolutions: true });

  // nda-tracker enrichment "tagged sheet" — SAME helper + Q-numbering the UI
  // uses (kind:"tags" in /api/export), so Q-numbers match the printed paper.
  const aoa = tagRowsToAoa(buildTagRows(rows));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), "Tags");
  const tagsBuf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;

  const qpPath = join(outDir, "QP_NDA_Vectors_Probability_Binomial.docx");
  const akPath = join(outDir, "Answers_NDA_Vectors_Probability_Binomial.docx");
  const tagsPath = join(outDir, "Tags_NDA_Vectors_Probability_Binomial.xlsx");
  writeFileSync(qpPath, paper);
  writeFileSync(akPath, key);
  writeFileSync(tagsPath, tagsBuf);

  // Report the nda-tracker subject keys the tags map to (sanity for the upload).
  const subjects = [...new Set(buildTagRows(rows).map((r) => r.subject))];
  console.log("Tagged-sheet subject keys:", subjects.join(", "));

  console.log("\nWrote:");
  console.log("  " + qpPath);
  console.log("  " + akPath);
  console.log("  " + tagsPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
