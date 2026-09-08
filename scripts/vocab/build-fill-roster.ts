/**
 * Turn the authored `data/fill-class-<N>.json` files into the fill ROSTER that
 * `corpus.ts` reads — after re-checking, mechanically, everything the authoring
 * brief asked the author to check.
 *
 *   npx tsx scripts/vocab/build-fill-roster.ts
 *   npx tsx scripts/vocab/build-fill-roster.ts --write
 *
 * ═══ WHY THIS RE-CHECKS WORK THAT WAS ALREADY CHECKED ═══
 *
 * `FILL_BRIEF.md` tells the author to grep the taken list, count their entries
 * and reject internal duplicates. An instruction to check is not a check, and
 * this repo has the scar tissue: an agent once "verified" answer keys it could
 * not see because a field name was wrong, and reported them clean.
 *
 * Every rule below is therefore enforced here, and REFUSES the whole batch
 * rather than dropping the offending word — a roster silently short by six is
 * indistinguishable from a rung that was always meant to be smaller.
 *
 * ═══ WHAT THIS DELIBERATELY DOES NOT CHECK ═══
 *
 * Whether a word is genuinely at its rung's level. That is the judgement the
 * job consists of and no probe can make it; `school_source = 'authored'` exists
 * precisely because it cannot be verified mechanically. Do not let a clean run
 * here read as "the levelling was checked".
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB } from "../../src/lib/vocab/registry";

const DATA = join(__dirname, "data");
const WRITE = process.argv.includes("--write");
const CLASSES = [5, 6, 7, 8, 9, 10, 11, 12];

type Authored = {
  word: string;
  meaning: string;
  sentence?: string;
  sentenceSource?: string;
  synonyms: string[];
  antonyms: string[];
};

(async () => {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const taken = new Set<string>();
  const have = new Map<number, number>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("vocab_entries")
      .select("word,part,school_class")
      .eq("book_slug", CADET_VOCAB.slug)
      .order("word")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    for (const r of data ?? []) {
      taken.add((r.word as string).toLowerCase());
      if (r.part === "school" && r.school_class != null) {
        have.set(r.school_class as number, (have.get(r.school_class as number) ?? 0) + 1);
      }
    }
    if ((data ?? []).length < 1000) break;
  }

  const problems: string[] = [];
  const roster: { word: string; class: number }[] = [];
  const seen = new Map<string, number>();

  for (const cls of CLASSES) {
    const path = join(DATA, `fill-class-${cls}.json`);
    const rung = CADET_VOCAB.chapters.find((c) => c.part === "school" && c.schoolClass === cls);
    if (!rung) continue;
    const want = Math.max(0, rung.expected - (have.get(cls) ?? 0));

    if (!existsSync(path)) {
      if (want > 0) problems.push(`Class ${cls}: needs ${want} fill words but no file exists`);
      continue;
    }
    let rows: Authored[];
    try {
      rows = JSON.parse(readFileSync(path, "utf8"));
    } catch (e) {
      problems.push(`Class ${cls}: file is not valid JSON — ${(e as Error).message}`);
      continue;
    }
    if (!Array.isArray(rows)) {
      problems.push(`Class ${cls}: file is not a JSON array`);
      continue;
    }
    if (rows.length !== want) {
      problems.push(`Class ${cls}: ${rows.length} entries, the rung needs ${want}`);
    }

    for (const r of rows) {
      const w = (r.word ?? "").toLowerCase().trim();
      if (!w) {
        problems.push(`Class ${cls}: an entry has no word`);
        continue;
      }
      // The one rule that cannot be broken: a citation claims a real paper
      // asked the word, and no fill word has ever been in a paper.
      if (r.sentenceSource) {
        problems.push(`Class ${cls}: "${w}" carries a sentenceSource — a fill word has no citation`);
      }
      if (!r.meaning?.trim()) problems.push(`Class ${cls}: "${w}" has no meaning`);
      if (/\.$/.test(r.meaning ?? "")) problems.push(`Class ${cls}: "${w}" meaning ends in a full stop`);
      if (!Array.isArray(r.synonyms) || !r.synonyms.length) {
        problems.push(`Class ${cls}: "${w}" has no synonyms`);
      }
      if (!Array.isArray(r.antonyms)) problems.push(`Class ${cls}: "${w}" antonyms is not an array`);
      if (/\s/.test(w)) problems.push(`Class ${cls}: "${w}" is a phrase, not a single word`);

      if (taken.has(w)) {
        problems.push(`Class ${cls}: "${w}" is ALREADY IN THE BOOK — it belongs where it already is`);
      }
      const dupe = seen.get(w);
      if (dupe !== undefined) {
        problems.push(`Class ${cls}: "${w}" was already proposed for Class ${dupe}`);
      } else {
        seen.set(w, cls);
        roster.push({ word: w, class: cls });
      }
    }
    console.log(
      `  Class ${String(cls).padStart(2)}  proposed ${String(rows.length).padStart(3)}` +
        `   needed ${String(want).padStart(3)}`
    );
  }

  console.log(`\nroster: ${roster.length} fill words`);
  if (problems.length) {
    console.log(`\n${problems.length} PROBLEM(S) — refusing:`);
    for (const p of problems.slice(0, 40)) console.log(`  ! ${p}`);
    if (problems.length > 40) console.log(`  … and ${problems.length - 40} more`);
    process.exitCode = 1;
    return;
  }
  console.log("all checks passed: counts, collisions, duplicates, shape, no citations");

  if (!WRITE) {
    console.log("\n[dry-run] pass --write to build data/school-fill-words.json.");
    return;
  }
  const out = join(DATA, "school-fill-words.json");
  writeFileSync(out, JSON.stringify(roster.sort((a, b) => a.word.localeCompare(b.word)), null, 2) + "\n");
  console.log(`\nwrote ${out}`);
})();
