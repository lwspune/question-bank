/**
 * Cross-check the blind derivations against the paper's printed answer key.
 *
 *   npx tsx scripts/nda-mock/adjudicate.ts m1
 *
 * Merges data/<id>.extract.json (stem + printed key + worked solution) with the
 * data/<id>.blind.*.json agent derivations and sorts every question into:
 *
 *   AGREE      — blind answer == printed key, no note. Committed.
 *   FLAGGED    — blind answer == printed key, but the agent recorded a defect
 *                note or low confidence. Committed (the letter is corroborated
 *                twice); the note is advisory and worth reading.
 *   DISAGREE   — they differ. NOT committed until ruled on. The printed key is a
 *                PEER, not an oracle: Mock 1 alone has four wrong keys, three of
 *                them contradicted by the paper's own worked solution.
 *   UNRESOLVED — the agent returned null. NOT committed until ruled on.
 *   RULED      — a human ruling in config.resolutions settled it. Committed.
 *   HELD       — a human ruling judged the printed question defective (no
 *                correct option / duplicate options / missing data). Deliberately
 *                kept OUT of the bank.
 *
 * Writes data/<id>.adjudication.json and prints a report. It resolves nothing on
 * its own beyond a clean AGREE — a DISAGREE is surfaced, never auto-decided.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { requirePaper, DATA, type Resolution } from "./config";
import type { ExtractedQuestion } from "./extract";

export type BlindAnswer = {
  number: number;
  answer: string | null;
  working: string;
  confidence: string;
  chapter: string;
  subtopic: string;
  difficulty: string;
  notes?: string;
};

export type Verdict = "AGREE" | "DISAGREE" | "UNRESOLVED" | "FLAGGED" | "RULED" | "HELD";

export type Adjudicated = {
  number: number;
  verdict: Verdict;
  printedKey: string | null;
  blindAnswer: string | null;
  confidence: string;
  chapter: string;
  subtopic: string;
  difficulty: string;
  working: string;
  notes: string;
  /** Final answer to commit. null until a DISAGREE/UNRESOLVED is settled. */
  resolved: string | null;
};

export function adjudicate(
  questions: ExtractedQuestion[],
  blind: Map<number, BlindAnswer>,
  resolutions: Record<number, Resolution> = {},
): Adjudicated[] {
  return questions.map((q) => {
    const b = blind.get(q.number);
    const printedKey = q.answer;
    const blindAnswer = b?.answer ?? null;
    const ruling = resolutions[q.number];

    let verdict: Verdict;
    if (ruling) verdict = "hold" in ruling ? "HELD" : "RULED";
    else if (!b) verdict = "UNRESOLVED";
    else if (blindAnswer === null) verdict = "UNRESOLVED";
    else if (printedKey && blindAnswer === printedKey) {
      // An agreed answer that still carries a defect note or low confidence is
      // surfaced rather than waved through — the letter is corroborated, but
      // the note may describe something worth fixing in the stem.
      verdict = b.notes?.trim() || b.confidence === "low" ? "FLAGGED" : "AGREE";
    } else verdict = "DISAGREE";

    return {
      number: q.number,
      verdict,
      printedKey,
      blindAnswer,
      confidence: b?.confidence ?? "none",
      chapter: b?.chapter ?? "",
      subtopic: b?.subtopic ?? "",
      difficulty: b?.difficulty ?? "MODERATE",
      working: b?.working ?? "",
      notes: ruling ? ruling.reason : (b?.notes ?? ""),
      // Auto-resolved only when the blind derivation and the printed key agree
      // cleanly, or when a human ruling settled it. A HELD question stays null
      // so it is skipped at commit; everything else waits for a call.
      resolved:
        verdict === "AGREE"
          ? printedKey
          : verdict === "RULED"
            ? (ruling as { answer: string }).answer
            : verdict === "FLAGGED"
              ? blindAnswer // corroborated by both sources; the note is advisory
              : null,
    };
  });
}

function main() {
  const id = process.argv[2];
  const paper = requirePaper(id);

  const questions: ExtractedQuestion[] = JSON.parse(
    readFileSync(join(DATA, `${paper.id}.extract.json`), "utf8"),
  );

  const blind = new Map<number, BlindAnswer>();
  const files = readdirSync(DATA).filter((f) => f.startsWith(`${paper.id}.blind.`) && f.endsWith(".json"));
  for (const f of files) {
    for (const b of JSON.parse(readFileSync(join(DATA, f), "utf8")) as BlindAnswer[]) {
      blind.set(b.number, b);
    }
  }
  console.log(`loaded ${blind.size} blind derivations from ${files.length} file(s)`);
  if (blind.size < questions.length) {
    const missing = questions.filter((q) => !blind.has(q.number)).map((q) => q.number);
    console.log(`!! no blind derivation for ${missing.length}: ${missing.join(", ")}`);
  }

  const rows = adjudicate(questions, blind, paper.resolutions ?? {});
  const by = (v: Verdict) => rows.filter((r) => r.verdict === v);

  console.log(`\n=== ${paper.label} — adjudication ===`);
  console.log(`  AGREE      ${by("AGREE").length}`);
  console.log(`  FLAGGED    ${by("FLAGGED").length}  (blind == key; note is advisory)`);
  console.log(`  RULED      ${by("RULED").length}  (settled by hand)`);
  console.log(`  HELD       ${by("HELD").length}  (defective — kept out of the bank)`);
  console.log(`  DISAGREE   ${by("DISAGREE").length}`);
  console.log(`  UNRESOLVED ${by("UNRESOLVED").length}`);

  const solutions = new Map(questions.map((q) => [q.number, q.solution ?? ""]));
  for (const r of [...by("DISAGREE"), ...by("UNRESOLVED"), ...by("HELD"), ...by("RULED")]) {
    console.log(
      `\n--- Q${r.number} [${r.verdict}] printedKey=${r.printedKey} blind=${r.blindAnswer} (${r.confidence})`,
    );
    if (r.working) console.log(`    working : ${r.working.slice(0, 220)}`);
    if (r.notes) console.log(`    notes   : ${r.notes.slice(0, 220)}`);
    const sol = solutions.get(r.number);
    if (sol) console.log(`    solution: ${sol.replace(/\s+/g, " ").slice(0, 220)}`);
  }

  const out = join(DATA, `${paper.id}.adjudication.json`);
  writeFileSync(out, JSON.stringify(rows, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${out}`);

  const open = by("DISAGREE").length + by("UNRESOLVED").length;
  if (open) console.log(`\n${open} question(s) need a human call before commit.`);
}

if (require.main === module) main();
