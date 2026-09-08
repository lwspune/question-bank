/**
 * Print the back-of-book index.
 *
 *   npx tsx scripts/vocab/print-index.ts            # what is authored today
 *   npx tsx scripts/vocab/print-index.ts --planned  # the full book, from the extracts
 *
 * `--planned` reads the extracts rather than the database, so the index can be
 * SIZED before 1,492 entries are authored — which is the only way to know
 * whether it fits the book it is meant to serve.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import {
  CADET_VOCAB,
  chapterFor,
  indexTagFor,
  type VocabPartKey,
  type VocabSectionKey,
} from "../../src/lib/vocab/registry";
import { buildIndex, formatIndexRow, type IndexRow } from "../../src/lib/vocab/index";
import { loadCorpus } from "./corpus";
import { placementOf } from "./commit-entries";
import type { SchoolWord } from "./extract-docx";

const DATA = join(__dirname, "data");
const PLANNED = process.argv.includes("--planned");
const read = <T,>(f: string): T => JSON.parse(readFileSync(join(DATA, f), "utf8")) as T;

function rowFor(
  word: string,
  part: VocabPartKey,
  section: VocabSectionKey | null,
  timesAsked: number
): IndexRow | null {
  if (!chapterFor(CADET_VOCAB, part, word, section)) return null;
  return { word, partTag: indexTagFor(CADET_VOCAB, part, section), timesAsked };
}

async function fromDb(): Promise<IndexRow[]> {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data, error } = await db
    .from("vocab_entries")
    .select("word,part,chapter_slug,times_asked,excluded")
    .eq("book_slug", CADET_VOCAB.slug)
    .eq("excluded", false)
    .order("word");
  if (error) throw error;
  return (data ?? []).map((r: any) => ({
    word: r.word,
    // The stored chapter slug carries the section, so the index tag is read
    // back from the registry rather than recomputed from the corpus — a row
    // must be indexed under the section it was actually filed in.
    partTag: indexTagFor(
      CADET_VOCAB,
      r.part as VocabPartKey,
      CADET_VOCAB.chapters.find((c) => c.slug === r.chapter_slug)?.section ?? null
    ),
    timesAsked: r.times_asked,
  }));
}

function fromExtracts(): IndexRow[] {
  const bank = loadCorpus();
  const school = read<SchoolWord[]>("school-words.json");
  const bankSet = new Set(bank.map((w) => w.word));
  const rows: IndexRow[] = [];
  for (const w of bank) {
    // Part and section are derived, never authored — a real paper decides.
    const { part, section } = placementOf(w);
    // TARGET appearances only: an option word was printed by the paper, never
    // asked by it, so it carries no recurrence count.
    const r = rowFor(
      w.word,
      part,
      section,
      w.appearances.filter((a) => a.kind === "pyq").length
    );
    if (r) rows.push(r);
  }
  for (const w of school) {
    if (bankSet.has(w.word)) continue; // lives in an exam part
    const r = rowFor(w.word, "school", null, 0);
    if (r) rows.push(r);
  }
  return rows;
}

async function main() {
  const rows = PLANNED ? fromExtracts() : await fromDb();
  const groups = buildIndex(rows);

  console.log(`INDEX — ${CADET_VOCAB.title}${PLANNED ? "  (planned, from the extracts)" : "  (authored so far)"}`);
  console.log(`${rows.length} words · ${groups.length} letter sections\n`);

  if (PLANNED) {
    // At full size the point is the SHAPE, not 1,492 lines of output.
    for (const g of groups) {
      const n = (t: string) => g.rows.filter((r) => r.partTag === t).length;
      console.log(
        `  ${g.letter}   ${String(g.rows.length).padStart(4)}   ` +
          `Papers ${String(n("Papers")).padStart(3)} · Practice ${String(n("Practice")).padStart(3)} · School ${String(n("School")).padStart(3)}`
      );
    }
    const repeats = rows.filter((r) => r.timesAsked > 1).length;
    console.log(`\n  words carrying an "asked Nx" marker: ${repeats}`);
    return;
  }

  for (const g of groups) {
    console.log(g.letter);
    for (const r of g.rows) console.log(`   ${formatIndexRow(r)}`);
    console.log();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
