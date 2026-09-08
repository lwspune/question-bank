/**
 * Commit Part 4 — idioms and phrases.
 *
 *   npx tsx scripts/vocab/commit-idioms.ts            # dry run
 *   npx tsx scripts/vocab/commit-idioms.ts --apply
 *
 * NOTHING HERE IS AUTHORED. The idiom is what the paper printed and the meaning
 * is the option the paper keyed as correct, so this script EXTRACTS and tidies;
 * it never writes a definition. That is the point of the part: elsewhere in the
 * book we author a meaning and the exam merely confirms a synonym, whereas here
 * the exam publishes the definition itself.
 *
 * The only judgement is `MEANING_CHOICE` below, and it exists because two
 * papers sometimes key the same idiom differently.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB, chapterFor, examTagOf } from "../../src/lib/vocab/registry";
import type { IdiomWord } from "./extract-idioms";

const DATA = join(__dirname, "data");
const APPLY = process.argv.includes("--apply");
const MODEL = "claude-opus-5";

/**
 * ELEVEN IDIOMS CARRY TWO DIFFERENT KEYED MEANINGS, adjudicated by reading both
 * rather than by a rule. "Longest wins" is wrong here — for `a hot potato` the
 * longer key ("An issue which is disputed, and catching the attention of
 * people") is clumsier than the shorter one, while for `turn a blind eye` the
 * longer one is right only because the shorter is TRUNCATED mid-word ("wron").
 * Both are the paper's own words; the choice is which paper said it better.
 *
 * Keyed on the idiom as extracted. An entry matching nothing is REPORTED, so a
 * stale line cannot sit here looking like it still does something.
 */
const MEANING_CHOICE: Record<string, string> = {
  "A hot potato": "something that is difficult to deal with",
  "A paper tiger": "a person or thing that appears threatening but is ineffectual",
  "a white elephant": "a costly or troublesome possession with no useful purpose",
  "A wild goose chase": "a foolish and useless enterprise",
  "At the drop of a hat": "without any hesitation",
  "fair and square": "in an honest way",
  "French leave": "absence from work without permission",
  "Have the last laugh": "to succeed when others thought that you would not",
  "Sit on the fence": "to avoid taking sides, delaying a decision",
  "The gift of the gab": "the ability to speak easily and confidently",
  // The other key reads "...you know is wron" — truncated in the source.
  "Turn a blind eye": "to choose to ignore behaviour that you know is wrong",
};

/** House style: a lower-case clause with no closing full stop. */
const tidyMeaning = (s: string) =>
  s
    .trim()
    .replace(/\.$/, "")
    .replace(/^([A-Z])(?=[a-z])/, (m) => m.toLowerCase())
    .replace(/\s+/g, " ");

/** Printed as the paper printed it, but with sentence-case capitalisation. */
const tidyIdiom = (s: string) => s.trim().replace(/\s+/g, " ");

async function main() {
  const idioms = JSON.parse(readFileSync(join(DATA, "idiom-words.json"), "utf8")) as IdiomWord[];
  const usedChoice = new Set<string>();
  const warnings: string[] = [];

  const rows = idioms.map((w) => {
    const chapter = chapterFor(CADET_VOCAB, "idiom", w.idiom, null);
    if (!chapter) throw new Error(`${w.idiom}: no idiom chapter covers its first letter — REFUSING`);

    let meaning = MEANING_CHOICE[w.idiom];
    if (meaning) usedChoice.add(w.idiom);
    else {
      if (w.meanings.length > 1) {
        warnings.push(
          `${w.idiom}: ${w.meanings.length} keyed meanings and no adjudication — using the commonest`
        );
      }
      meaning = w.meanings[0];
    }
    meaning = tidyMeaning(meaning);
    if (meaning.length < 3) warnings.push(`${w.idiom}: meaning is only "${meaning}"`);

    return {
      book_slug: CADET_VOCAB.slug,
      word: tidyIdiom(w.idiom),
      part: "idiom" as const,
      chapter_slug: chapter.slug,
      position: 0, // renumbered alphabetically below
      meaning,
      // The DB refuses an idiom row carrying either of these (migration 0091),
      // because an authored sentence would read as evidence the paper never
      // gave. Passed explicitly so the intent is visible at the call site.
      sentence: null,
      sentence_source: null,
      synonyms: [] as string[],
      antonyms: [] as string[],
      exams: w.timesAsked > 0 ? w.pyqExams : w.allExams,
      times_asked: w.timesAsked,
      note: null,
      derived_model: MODEL,
      derived_at: new Date().toISOString(),
    };
  });

  const stale = Object.keys(MEANING_CHOICE).filter((k) => !usedChoice.has(k));
  if (stale.length) warnings.push(`MEANING_CHOICE matched nothing: ${stale.join(" | ")}`);

  const byChapter: Record<string, number> = {};
  const byTag: Record<string, number> = {};
  for (const r of rows) {
    byChapter[r.chapter_slug] = (byChapter[r.chapter_slug] ?? 0) + 1;
    const t = examTagOf(r.exams, r.times_asked);
    byTag[t] = (byTag[t] ?? 0) + 1;
  }
  console.log(`${rows.length} idiom(s) prepared`);
  for (const k of Object.keys(byChapter).sort()) console.log(`  ${k.padEnd(14)} ${byChapter[k]}`);
  console.log(`  exam tags: ${JSON.stringify(byTag)}`);
  console.log(`\n${warnings.length} warning(s)`);
  for (const w of warnings) console.log(`  ! ${w}`);

  if (!APPLY) {
    console.log("\n[dry-run] pass --apply to write.");
    return;
  }
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { error, count } = await db
    .from("vocab_entries")
    .upsert(rows, { onConflict: "book_slug,word", count: "exact" });
  if (error) throw error;
  console.log(`\nupserted ${count ?? rows.length} row(s).`);

  // Alphabetical, contiguous, over the whole chapter — the same rule the
  // vocabulary parts follow, and for the same reason: alphabetical order is the
  // only way a reader finds anything.
  for (const slug of Object.keys(byChapter)) {
    const { data: all, error: rErr } = await db
      .from("vocab_entries")
      .select("id,word,position")
      .eq("book_slug", CADET_VOCAB.slug)
      .eq("chapter_slug", slug)
      .order("word");
    if (rErr) throw rErr;
    let moved = 0;
    for (let i = 0; i < (all ?? []).length; i++) {
      const want = (i + 1) * 100;
      if (all![i].position === want) continue;
      const { error: uErr } = await db
        .from("vocab_entries")
        .update({ position: want })
        .eq("id", all![i].id);
      if (uErr) throw uErr;
      moved++;
    }
    console.log(`  ${slug}: ${all?.length ?? 0} entries, ${moved} repositioned`);
  }
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
