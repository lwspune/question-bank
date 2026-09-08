/**
 * Choose the book's chapter bands, ONCE, against the final corpus.
 *
 *   npx tsx scripts/vocab/plan-chapters.ts [--cap=200]
 *
 * Emits a registry-shaped chapter list. Run it to DECIDE the bands, paste the
 * result into src/lib/vocab/registry.ts, and then leave it alone — chapter slugs
 * are URLs and must not move as the corpus grows.
 *
 * ═══ IT NEVER SPLITS A LETTER, and that is the whole design ═══
 *
 * A letter boundary is permanently stable: "C" means the same set of words
 * forever, however many are added. A COUNT boundary is not — "the first 200
 * C-words" moves every time a C-word is ingested, which would change the
 * chapter a word lives in and therefore its URL. That is the same reason the
 * bands are frozen against the final corpus rather than today's.
 *
 * The cost is honest: one chapter exceeds the cap. Part 1's C holds 229 words
 * and cannot be reduced without splitting the letter. Accepted, because inside
 * a chapter the entries are alphabetical anyway — a reader scanning for
 * "candid" does not care whether the chapter holds 200 or 229 — while a moving
 * boundary would cost real URLs.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { BankWord, OptionWord } from "./extract-bank";
import type { SchoolWord } from "./extract-docx";

const DATA = join(__dirname, "data");
const read = <T,>(f: string): T => JSON.parse(readFileSync(join(DATA, f), "utf8")) as T;
const CAP = Number(process.argv.find((a) => a.startsWith("--cap="))?.slice(6) ?? 200);
const AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export type PlannedBand = { label: string; letters: string[]; count: number };

/**
 * Pack consecutive letters into bands of at most `cap`, never splitting a letter.
 *
 * The tail fold is GUARDED: merging a small last band into its predecessor must
 * not push that predecessor over the cap. Unguarded it did exactly that — it
 * turned a clean O-S/T-Z pair into a single 224-word chapter, i.e. the fold
 * created the only overflow in the book.
 */
export function packLetters(counts: Map<string, number>, cap: number): PlannedBand[] {
  const out: { letters: string[]; count: number }[] = [];
  let cur: string[] = [];
  let run = 0;
  for (const c of AZ) {
    const n = counts.get(c) ?? 0;
    if (cur.length && run + n > cap) {
      out.push({ letters: cur, count: run });
      cur = [];
      run = 0;
    }
    cur.push(c);
    run += n;
  }
  if (cur.length) out.push({ letters: cur, count: run });

  if (out.length > 1) {
    const last = out[out.length - 1];
    const prev = out[out.length - 2];
    if (last.count < cap * 0.2 && prev.count + last.count <= cap) {
      prev.letters.push(...last.letters);
      prev.count += last.count;
      out.pop();
    }
  }

  return out.map((b) => ({
    label: b.letters.length > 1 ? `${b.letters[0]}-${b.letters[b.letters.length - 1]}` : b.letters[0],
    letters: b.letters,
    count: b.count,
  }));
}

function main() {
  const bank = read<BankWord[]>("bank-words.json");
  const school = read<SchoolWord[]>("school-words.json");
  const bankSet = new Set(bank.map((w) => w.word));

  // Sized on the FINAL corpus: target words + option-only words + school words.
  // Sizing on the 655 targets alone produced 3 chapters where the finished
  // Part 1 needs 14 — and the bands are frozen into URLs, so getting this wrong
  // is not something a later pass can quietly correct.
  const options = read<OptionWord[]>("option-words.json");
  const isPyq = (w: BankWord) => w.appearances.some((a) => a.kind === "pyq");
  const optIsPyq = (o: OptionWord) => o.kinds.includes("pyq");
  const optSet = new Set(options.map((o) => o.word));

  const pyqWords = [
    ...bank.filter(isPyq).map((w) => w.word),
    ...options.filter(optIsPyq).map((o) => o.word),
  ];
  const practiceWords = [
    ...bank.filter((w) => !isPyq(w)).map((w) => w.word),
    ...options.filter((o) => !optIsPyq(o)).map((o) => o.word),
  ];
  const schoolWords = school
    .filter((w) => !bankSet.has(w.word) && !optSet.has(w.word))
    .map((w) => w.word);

  const sets: [string, string, string[]][] = [
    ["pyq", "papers", pyqWords],
    ["practice", "practice", practiceWords],
    ["school", "school", schoolWords],
  ];

  let total = 0;
  let over = 0;
  for (const [part, prefix, words] of sets) {
    const counts = new Map<string, number>();
    for (const w of words) {
      const c = (w[0] ?? "?").toUpperCase();
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    const bands = packLetters(counts, CAP);
    total += bands.length;
    console.log(`\n// ${part}: ${words.length} words -> ${bands.length} chapters (cap ${CAP})`);
    for (const b of bands) {
      if (b.count > CAP) over++;
      const flag = b.count > CAP ? "   // OVER CAP — single letter, cannot split" : "";
      console.log(
        `{ slug: "${prefix}-${b.label.toLowerCase()}", label: "${b.label}", part: "${part}", ` +
          `letters: band("${b.letters[0]}", "${b.letters[b.letters.length - 1]}"), expected: ${b.count} },${flag}`
      );
    }
  }
  console.log(`\n// TOTAL ${total} chapters; ${over} over the ${CAP} cap`);
}

if (require.main === module) main();
