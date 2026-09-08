/**
 * Cut Part 2 into its three exam sections and band each one alphabetically.
 *
 *   npx tsx scripts/vocab/plan-sections.ts [--cap=200]
 *
 * WHY THIS EXISTS RATHER THAN A HAND-WRITTEN TABLE: the section a word lands in
 * is derived from the corpus (which exams have asked it), and the corpus grows
 * with every sitting. A band table typed by hand is a measurement nobody can
 * re-check — and this book has already had one comment state a count that could
 * not be reproduced. Re-run this after an ingest and DIFF, rather than trusting
 * the registry's numbers.
 *
 * THE BANDS THEMSELVES ARE STILL FROZEN ONCE DECLARED. A letter boundary is
 * permanently stable ("C" means the same set of words forever) while a COUNT
 * boundary moves every time a C-word is ingested, changing which chapter a word
 * lives in and breaking its URL. So this script proposes; the registry decides.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { BankWord } from "./extract-bank";

const D = join(__dirname, "data");
const CAP = Number(/--cap=(\d+)/.exec(process.argv.join(" "))?.[1] ?? 200);

const bank = JSON.parse(readFileSync(join(D, "bank-words.json"), "utf8")) as BankWord[];
const opts = JSON.parse(readFileSync(join(D, "option-words.json"), "utf8")) as {
  word: string;
  exams: string[];
  kinds: string[];
  uses: number;
}[];

/** The FINAL corpus: target words plus the option-only words phase 3 will add. */
type Rec = { word: string; exams: Set<string>; pyq: boolean };
const merged = new Map<string, Rec>();
for (const w of bank) {
  const pyqApps = w.appearances.filter((a) => a.kind === "pyq");
  merged.set(w.word, {
    word: w.word,
    exams: new Set(pyqApps.map((a) => a.exam)),
    pyq: pyqApps.length > 0,
  });
}
for (const o of opts) {
  const isPyq = o.kinds.includes("pyq");
  const cur = merged.get(o.word);
  if (cur) {
    if (isPyq) for (const e of o.exams) cur.exams.add(e);
  } else {
    merged.set(o.word, { word: o.word, exams: new Set(isPyq ? o.exams : []), pyq: isPyq });
  }
}

export type ExamClass = "both" | "nda" | "cds";
export function examClassOf(exams: Iterable<string>): ExamClass {
  const s = new Set(exams);
  if (s.has("NDA") && s.has("CDS")) return "both";
  return s.has("CDS") && !s.has("NDA") ? "cds" : "nda";
}

const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Greedy left-to-right, never splitting a letter. */
function bandLetters(counts: Record<string, number>, cap: number) {
  const out: { from: string; to: string; n: number }[] = [];
  let from = "",
    to = "",
    n = 0;
  for (const L of A) {
    const c = counts[L] ?? 0;
    if (!from) {
      from = to = L;
      n = c;
      continue;
    }
    // Start a new band when adding this letter would break the cap AND the
    // current band is not empty. A single letter over the cap stays whole.
    if (n + c > cap && n > 0) {
      out.push({ from, to, n });
      from = to = L;
      n = c;
    } else {
      to = L;
      n += c;
    }
  }
  if (from) out.push({ from, to, n });
  return out.filter((b) => b.n > 0 || true);
}

const label = (b: { from: string; to: string }) => (b.from === b.to ? b.from : `${b.from}-${b.to}`);

console.log(`cap ${CAP}\n`);
const pyq = [...merged.values()].filter((r) => r.pyq);
const practice = [...merged.values()].filter((r) => !r.pyq);

for (const section of ["both", "nda", "cds"] as ExamClass[]) {
  const rows = pyq.filter((r) => examClassOf(r.exams) === section);
  const counts: Record<string, number> = {};
  for (const r of rows) {
    const L = (r.word.trim()[0] ?? "").toUpperCase();
    counts[L] = (counts[L] ?? 0) + 1;
  }
  const bands = bandLetters(counts, CAP);
  console.log(`// ${section.toUpperCase()} — ${rows.length} words, ${bands.length} chapters`);
  for (const b of bands) {
    const over = b.n > CAP ? `  // OVER CAP (${b.n}) — single letter, do not split` : "";
    console.log(
      `    { slug: "papers-${section}-${label(b).toLowerCase()}", label: ${JSON.stringify(
        label(b)
      )}, part: "pyq", section: "${section}", letters: band("${b.from}", "${b.to}"), expected: ${b.n} },${over}`
    );
  }
  console.log();
}

/* Does Part 3 need the same treatment? Measure rather than assume. */
const pc: Record<string, number> = {};
for (const r of practice) {
  const k = r.exams.size ? examClassOf(r.exams) : "(no pyq exam)";
  pc[k] = (pc[k] ?? 0) + 1;
}
console.log(`// PART 3 (practice, ${practice.length} words) by exam: ${JSON.stringify(pc)}`);
const pex: Record<string, number> = {};
for (const o of opts) {
  if (o.kinds.includes("pyq")) continue;
  const k = o.exams.sort().join("+") || "(none)";
  pex[k] = (pex[k] ?? 0) + 1;
}
for (const w of bank) {
  if (w.appearances.some((a) => a.kind === "pyq")) continue;
  const k = [...new Set(w.appearances.map((a) => a.exam))].sort().join("+") || "(none)";
  pex[k] = (pex[k] ?? 0) + 1;
}
console.log(`// PART 3 practice-source exams: ${JSON.stringify(pex)}`);
