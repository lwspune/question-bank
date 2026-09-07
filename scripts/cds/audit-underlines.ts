/**
 * Standing probe: every recorded underline must actually apply to its stem.
 *
 * WHY THIS EXISTS. `undFirst` (lib.ts) marks the target word with a word-boundary
 * regex and, when the word is not found, RETURNS THE STEM UNCHANGED — silently.
 * The question then ships with a Directions line saying "the underlined word"
 * and nothing underlined, which is unanswerable for a student and invisible to
 * every other gate: the row commits, the counts reconcile, `audit:keys` sees a
 * well-formed MCQ, and `board:lint` has no opinion.
 *
 * It is not hypothetical — six live PUBLIC questions were found this way
 * (2026-09-07), and one of them had ALSO taken a wrong answer key, because the
 * recorded word was an OPTION rather than the target so the deriver was solving
 * for the wrong word.
 *
 * A mismatch is reported, never repaired: which side is wrong is a question only
 * the printed page can settle, and it has gone BOTH ways — sometimes the record
 * is wrong (`discard` for a stem that reads `discord`), sometimes the stem is
 * wrong (`nimulism` for a page that prints `simulism`).
 *
 * Triage, exit 0 — a paper still being transcribed will legitimately have holes.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { DATA, PAPERS } from "./config";
import { undPattern, type TQ, type Underlines } from "./lib";

type Row = { paper: string; n: number; recorded: string; stem: string; why: string };

function load<T>(paper: string, kind: string): T | null {
  const p = join(DATA, `${paper}.${kind}.json`);
  return existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as T) : null;
}

const only = process.argv[2];
const bad: Row[] = [];
let checked = 0;
let papers = 0;

for (const id of Object.keys(PAPERS)) {
  if (only && id !== only) continue;
  const qs = load<TQ[]>(id, "questions");
  const un = load<Underlines>(id, "underlines");
  if (!qs || !un) continue;
  papers++;
  const byNum = new Map(qs.map((q) => [String(q.number), q]));

  for (const [n, word] of Object.entries(un.single ?? {})) {
    checked++;
    const q = byNum.get(n);
    if (!q) {
      bad.push({ paper: id, n: Number(n), recorded: word, stem: "(no such question)", why: "ORPHAN RECORD" });
      continue;
    }
    if (!undPattern(word).test(q.stem)) {
      bad.push({ paper: id, n: Number(n), recorded: word, stem: q.stem, why: "NO MATCH IN STEM" });
    }
  }

  for (const [n, parts] of Object.entries(un.triple ?? {})) {
    const q = byNum.get(n);
    if (!q) continue;
    for (const word of Object.values(parts)) {
      if (!word) continue;
      checked++;
      if (!undPattern(word).test(q.stem)) {
        bad.push({ paper: id, n: Number(n), recorded: word, stem: q.stem, why: "NO MATCH IN STEM (triple)" });
      }
    }
  }
}

console.log(`Papers scanned: ${papers}   underline records checked: ${checked}`);
console.log(`Records that DO NOT apply: ${bad.length}\n`);
for (const r of bad) {
  console.log(`  ${r.paper}  Q${r.n}  [${r.why}]`);
  console.log(`     recorded : ${JSON.stringify(r.recorded)}`);
  console.log(`     stem     : ${r.stem.slice(0, 120)}`);
  console.log();
}
if (bad.length) {
  console.log("Adjudicate each against the PRINTED PAGE — the record and the stem");
  console.log("have each been the wrong one before. Do not repair mechanically.");
}
