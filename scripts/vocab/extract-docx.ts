/**
 * Extract the school vocabulary list (CBSE Class 5-12) from the source .docx.
 *
 *   npx tsx scripts/vocab/extract-docx.ts            # report
 *   npx tsx scripts/vocab/extract-docx.ts --write    # write data/school-words.json
 *
 * Needs pandoc on PATH. The .docx lives outside the repo and is not tracked, so
 * the emitted JSON is the SOURCE OF RECORD for this half of the book — the same
 * arrangement the CDS pipeline uses for its untracked booklets.
 *
 * THREE PROPERTIES OF THIS SOURCE, all measured rather than assumed:
 *
 * 1. IT COVERS CLASS 5-12, not the 5-10 the brief described.
 *
 * 2. THE CLASS LABELS ARE NOT A DIFFICULTY AXIS. Class 7 and Class 9 share 165
 *    of 200 words; 11 and 12 share 152; 5 and 11 share NONE. Classes 7/9/10 are
 *    effectively one advanced list printed under three headings. So `classes`
 *    is recorded as provenance and must NOT be used to order or grade the book.
 *
 * 3. ONE CLASS 7 BLOCK IS PRINTED TWICE (199 of 200 words identical). Dedup by
 *    headword handles it; the second copy contributes nothing.
 *
 * 1,799 printed entries collapse to ~924 distinct words.
 */
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const SOURCE =
  "C:/Vilas/LWS_Pune/NDA_Subjects_Content/Subjects/English/Akash/Vocab/English Vocab Words.docx";
const DATA = join(__dirname, "data");
const WRITE = process.argv.includes("--write");

export type SchoolWord = {
  word: string;
  /** The book's own gloss, verbatim. Short — "To complete successfully". */
  meaning: string;
  /** Which class lists print it. Provenance only — see note 2 above. */
  classes: number[];
};

const CLASS_HEADING = /CBSE Class (\d+) English/;
const ITEM = /^\s*(\d+)\.\s+(.*)$/;
/** The book uses an em-dash pair for most entries and a single hyphen for one class. */
const SPLIT = /\s+--\s+|\s+[-–—]\s+/;

export function parseVocabMarkdown(md: string): SchoolWord[] {
  const byWord = new Map<string, SchoolWord>();
  let cls: number | null = null;

  // Split on CRLF *or* LF: pandoc emits CRLF here, and a trailing "\r" makes
  // `(.*)$` fail to match, because `.` will not consume a line terminator and
  // `$` is then not at the end. Silently yielded ZERO entries.
  for (const line of md.split(/\r?\n/)) {
    const h = CLASS_HEADING.exec(line);
    if (h) {
      cls = Number(h[1]);
      continue;
    }
    if (cls === null) continue;
    const it = ITEM.exec(line);
    if (!it) continue;

    const parts = it[2].split(SPLIT);
    if (parts.length < 2) continue;
    const word = parts[0].trim().replace(/\*+/g, "");
    const meaning = parts.slice(1).join(" - ").trim();
    if (!word || !meaning) continue;

    const key = word.toLowerCase();
    const cur = byWord.get(key);
    if (cur) {
      if (!cur.classes.includes(cls)) cur.classes.push(cls);
      // Keep the FIRST gloss. Later classes repeat the word with a near-identical
      // definition; picking one and saying so beats silently concatenating both.
    } else {
      byWord.set(key, { word: key, meaning, classes: [cls] });
    }
  }

  return [...byWord.values()].sort((a, b) => a.word.localeCompare(b.word));
}

function main() {
  let md: string;
  try {
    md = execFileSync("pandoc", ["-f", "docx", "-t", "markdown", "--wrap=none", SOURCE], {
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
    });
  } catch (e) {
    throw new Error(
      `pandoc failed on ${SOURCE} — is pandoc on PATH and the file present?\n${String(e)}`
    );
  }

  const words = parseVocabMarkdown(md);
  const printed = md.split(/\r?\n/).filter((l) => ITEM.test(l)).length;
  const byClass = new Map<number, number>();
  for (const w of words) for (const c of w.classes) byClass.set(c, (byClass.get(c) ?? 0) + 1);

  console.log(`printed entries : ${printed}`);
  console.log(`distinct words  : ${words.length}`);
  console.log(`redundancy      : ${printed - words.length} repeats across class lists`);
  console.log(
    "per class       : " +
      [...byClass.entries()].sort((a, b) => a[0] - b[0]).map(([c, n]) => `${c}:${n}`).join("  ")
  );
  const multi = words.filter((w) => w.classes.length > 1).length;
  console.log(`in 2+ classes   : ${multi}`);
  const noMeaning = words.filter((w) => w.meaning.length < 3).length;
  if (noMeaning) console.log(`WARNING: ${noMeaning} word(s) with an empty gloss`);

  if (!WRITE) {
    console.log("\n[report only] pass --write to emit data/school-words.json");
    return;
  }
  mkdirSync(DATA, { recursive: true });
  writeFileSync(join(DATA, "school-words.json"), JSON.stringify(words, null, 1) + "\n");
  console.log(`\nwrote data/school-words.json (${words.length} words)`);
}

if (require.main === module) main();
