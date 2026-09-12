/**
 * Commit Part 4 — idioms and phrases.
 *
 *   npx tsx scripts/vocab/commit-idioms.ts            # dry run
 *   npx tsx scripts/vocab/commit-idioms.ts --apply
 *
 * TWO LANES, AND THE DIFFERENCE BETWEEN THEM IS THE PART'S INTEGRITY CLAIM.
 *
 * BANK LANE (`idiom-words.json`) — the idiom is what a question printed and the
 * meaning is the option it keyed as correct. Nothing is authored: the exam
 * publishes the definition itself, which is what makes Part 4 unlike every other
 * part of this book.
 *
 * ROSTER LANE (`idiom-coaching.json` + `idioms-<band>.json`) — an idiom a
 * commercial prep deck teaches. No question printed it, so there is no key and
 * NOTHING TO EXTRACT; the meaning is authored by us, exactly as Part 3's
 * coaching words are. The deck's own wording is never copied.
 *
 * The two are distinguishable in the data, not just here: a roster idiom carries
 * `timesAsked: 0`, so `idiomSectionOf` files it under "Practice Material",
 * whose blurb already says "set only in mocks and coaching books, never yet in a
 * paper". The book therefore makes the weaker claim on the page, in the place a
 * reader sees it.
 *
 * ONE WRITER FOR THIS TABLE, deliberately. A second script committing authored
 * idioms would duplicate the row shaping, the 0091 rules and the renumbering,
 * and the two would drift.
 *
 * The only judgement is `MEANING_CHOICE` below, and it exists because two
 * papers sometimes key the same idiom differently.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB, chapterFor, idiomSectionOf } from "../../src/lib/vocab/registry";
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

/**
 * House style: a lower-case clause with no closing full stop.
 *
 * THE FIRST RULE MISSED THE ARTICLE. It required a lower-case letter to follow
 * the capital, so "A bad person" kept its capital while "Absence from work"
 * lost it — visible only on the rendered page. Measured across all 296: the
 * only capitalised first words are "A" and "I".
 *
 * "I" MUST KEEP ITS CAPITAL — it is the pronoun, and lower-casing it would be
 * wrong English rather than a style choice. A multi-letter all-caps word is an
 * acronym and is left alone for the same reason.
 */
const tidyMeaning = (s: string) => {
  const t = s.trim().replace(/\.$/, "").replace(/\s+/g, " ");
  const first = t.split(" ")[0];
  if (first === "I" || (first.length > 1 && first === first.toUpperCase())) return t;
  return t.charAt(0).toLowerCase() + t.slice(1);
};

/** Printed as the paper printed it, but with sentence-case capitalisation. */
const tidyIdiom = (s: string) => s.trim().replace(/\s+/g, " ");

/** One line of the coaching roster: an idiom only a prep deck teaches. */
type CoachingIdiom = { idiom: string; decks: string[]; pages: number[] };
/** One authored chapter file: the meaning WE wrote for a roster idiom. */
type AuthoredIdiom = { idiom: string; meaning: string };

/**
 * Fold the bank idioms and the roster idioms into ONE list before anything is
 * shaped, so every rule below applies to both by construction rather than by
 * being remembered twice.
 */
function loadAll(): IdiomWord[] {
  const bank = JSON.parse(readFileSync(join(DATA, "idiom-words.json"), "utf8")) as IdiomWord[];
  const rosterPath = join(DATA, "idiom-coaching.json");
  if (!existsSync(rosterPath)) return bank;

  const roster = JSON.parse(readFileSync(rosterPath, "utf8")) as CoachingIdiom[];
  const held = new Map(bank.map((b) => [b.idiom.toLowerCase(), b]));

  // Authored meanings live in one file per chapter, written by an agent against
  // IDIOM_BRIEF.md. Picked up by shape, so a new band needs no edit here.
  const meanings = new Map<string, string>();
  for (const f of readdirSync(DATA).filter((f) => /^idioms-.+\.json$/.test(f))) {
    for (const a of JSON.parse(readFileSync(join(DATA, f), "utf8")) as AuthoredIdiom[]) {
      const k = a.idiom.toLowerCase();
      if (meanings.has(k)) throw new Error(`${a.idiom}: authored twice across chapter files — REFUSING`);
      meanings.set(k, a.meaning);
    }
  }

  const out = [...bank];
  let unauthored = 0;
  const rosterKeys = new Set<string>();
  for (const c of roster) {
    const k = c.idiom.toLowerCase();
    rosterKeys.add(k);
    /**
     * REFUSED ON COLLISION, like the vocabulary roster. An idiom a real question
     * printed carries the paper's own keyed meaning; letting a deck entry
     * overwrite it would replace evidence with an authored guess.
     */
    if (held.has(k)) {
      throw new Error(
        `${c.idiom}: in the coaching roster but a question already keyed it — ` +
          `REFUSING (it belongs where the evidence is)`
      );
    }
    const meaning = meanings.get(k);
    if (!meaning) { unauthored++; continue; }   // not yet written; not an error
    out.push({
      idiom: c.idiom,
      meanings: [meaning],
      // EMPTY BY CONSTRUCTION, and it is what files the idiom under "Practice
      // Material": no paper has printed it, so it cannot claim the papers section.
      pyqExams: [],
      // The DECK'S stated scope, never a per-idiom claim -- the same reading as
      // `exams` on a Part 3 coaching word.
      allExams: ["NDA", "CDS"],
      timesAsked: 0,
      uses: 0,
    });
  }

  // A stale authored line is a silent no-op otherwise: the meaning would sit in
  // a file doing nothing while the book prints without it.
  const orphan = [...meanings.keys()].filter((k) => !rosterKeys.has(k));
  if (orphan.length) {
    throw new Error(
      `${orphan.length} authored idiom(s) are not in the roster — REFUSING: ` +
        orphan.slice(0, 8).join(" | ")
    );
  }
  console.log(
    `roster: ${roster.length} coaching idiom(s), ${roster.length - unauthored} authored, ` +
      `${unauthored} still to write`
  );
  return out;
}

async function main() {
  const idioms = loadAll();
  const usedChoice = new Set<string>();
  const warnings: string[] = [];

  const rows = idioms.map((w) => {
    // Section is DERIVED from the corpus, never authored — a paper set it, or
    // only a mock did, and that is the one claim Part 4's structure makes.
    const section = idiomSectionOf(w.timesAsked);
    const chapter = // Part 4 is not a class ladder, so it carries no rung.
    chapterFor(CADET_VOCAB, "idiom", w.idiom, section, null);
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
    // DIAGNOSTIC ONLY. The book no longer prints a per-entry exam tag (the
    // section heading carries the papers-vs-practice claim), but the committer
    // still needs to see the shape of what it is about to write — a run where
    // every idiom lands under one exam is a signal worth catching here.
    const t = `${[...r.exams].sort().join(" + ")}${r.times_asked > 0 ? "" : " (practice)"}`;
    byTag[t] = (byTag[t] ?? 0) + 1;
  }
  console.log(`${rows.length} idiom(s) prepared`);
  for (const k of Object.keys(byChapter).sort()) console.log(`  ${k.padEnd(14)} ${byChapter[k]}`);
  console.log(`  by exam (not printed in the book): ${JSON.stringify(byTag)}`);
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
