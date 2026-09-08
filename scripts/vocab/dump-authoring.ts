/**
 * Emit one chapter's evidence as an authoring worksheet.
 *
 *   npx tsx scripts/vocab/dump-authoring.ts papers-a
 *   npx tsx scripts/vocab/dump-authoring.ts papers-a --json   # skeleton to fill in
 *
 * The worksheet carries everything an entry needs and NOTHING that would let it
 * be written without looking: the real exam sentences, the option cluster, and
 * the stored solution's own gloss.
 *
 * IT ALREADY EXCLUDES WHAT IS AUTHORED. Re-running after a partial pass emits
 * only what is left, so the job is finite and a second run cannot silently
 * overwrite finished work.
 *
 * WHAT THE WORKSHEET DELIBERATELY DOES NOT DO is pre-fill synonyms and antonyms
 * from the distractors. They are only USUALLY synonyms — "intimidation" is set
 * against wiles / conviction / persuasion, none of which is one — so a
 * pre-filled list would be accepted rather than checked, and the cross-check in
 * commit-entries would then be comparing the corpus against itself.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB, chapterFor, type VocabPartKey } from "../../src/lib/vocab/registry";
import { citationOf, preferredAppearance } from "./commit-entries";
import type { BankWord } from "./extract-bank";

const DATA = join(__dirname, "data");
const OUT = join(__dirname, "out");
const slug = process.argv[2];
const AS_JSON = process.argv.includes("--json");

async function main() {
  if (!slug) throw new Error("usage: dump-authoring.ts <chapterSlug> [--json]");
  const chapter = CADET_VOCAB.chapters.find((c) => c.slug === slug);
  if (!chapter) {
    throw new Error(`unknown chapter "${slug}" — have: ${CADET_VOCAB.chapters.map((c) => c.slug).join(", ")}`);
  }

  const bank = JSON.parse(readFileSync(join(DATA, "bank-words.json"), "utf8")) as BankWord[];

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: done, error } = await db
    .from("vocab_entries")
    .select("word")
    .eq("book_slug", CADET_VOCAB.slug);
  if (error) throw error;
  const already = new Set((done ?? []).map((r) => r.word as string));

  const mine = bank.filter((w) => {
    const part: VocabPartKey = w.appearances.some((a) => a.kind === "pyq") ? "pyq" : "practice";
    return chapterFor(CADET_VOCAB, part, w.word)?.slug === slug && !already.has(w.word);
  });

  mkdirSync(OUT, { recursive: true });

  if (AS_JSON) {
    const skeleton = mine.map((w) => {
      const p = preferredAppearance(w);
      return {
        word: w.word,
        meaning: "",
        sentence: p && !p.bareStem ? p.sentence : undefined,
        sentenceSource: p && !p.bareStem ? citationOf(p) : undefined,
        synonyms: [],
        antonyms: [],
      };
    });
    const f = join(OUT, `${slug}.skeleton.json`);
    writeFileSync(f, JSON.stringify(skeleton, null, 1) + "\n");
    console.log(`wrote ${f}  (${skeleton.length} words to author)`);
    return;
  }

  /**
   * `--compact` drops the stored gloss, which is roughly half the worksheet.
   *
   * The gloss is the bank's own explanation of the answer. It is genuinely
   * useful on a word whose sense is unobvious, and it is NOT evidence — it was
   * written by the same kind of pass that wrote the key, so an entry must never
   * rest on it. The word, its role, the paper's key and the distractors are the
   * evidence, and those are always printed.
   */
  const compact = process.argv.includes("--compact");

  const lines: string[] = [];
  lines.push(`# ${chapter.label} — ${CADET_VOCAB.parts.find((p) => p.key === chapter.part)!.title}`);
  lines.push(`${mine.length} words to author (${already.size} already done book-wide)\n`);

  for (const w of mine) {
    lines.push(`## ${w.word}`);
    for (const a of w.appearances) {
      lines.push(
        `- [${a.role}] ${citationOf(a)}${a.bareStem ? " (no usable sentence)" : ""}`
      );
      if (!a.bareStem) lines.push(`  > ${a.sentence}`);
      lines.push(`  key: ${a.key ?? "(none)"}   |   others: ${a.distractors.join(", ")}`);
      if (a.solution && !compact) {
        lines.push(`  stored gloss: ${a.solution.replace(/\s+/g, " ").slice(0, 200)}`);
      }
    }
    lines.push("");
  }

  const f = join(OUT, `${slug}.md`);
  writeFileSync(f, lines.join("\n"));
  console.log(`wrote ${f}  (${mine.length} words)`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
