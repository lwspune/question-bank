/**
 * Standing verification over every committed vocabulary entry.
 *
 *   npx tsx scripts/vocab/verify.ts
 *
 * It reads back FROM THE DATABASE rather than from the authored files,
 * because the authored files are the input and the question this answers is
 * what the book will actually print. Two of the checks exist because their
 * failure is SILENT: a chapter whose positions are not contiguous-alphabetical
 * still renders, in the wrong order, and alphabetical order is the only way a
 * reader finds anything in a dictionary; and a stray backslash renders as
 * literal markup on the page while passing every other check.
 *
 * A zero for "no antonyms" would be WRONG, not good — some words have no
 * natural opposite (bursar, commissary, eavesdropping), so that line reports a
 * count rather than asserting one.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB } from "../../src/lib/vocab/registry";

const DATA = join(__dirname, "data");

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

(async () => {
  const rows: any[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("vocab_entries")
      .select(
        // EVERY COLUMN A CHECK BELOW READS. An absent column arrives as
        // undefined, and a check on undefined quietly passes for every row —
        // `times_asked` was missing here while a check keyed on it reported a
        // reassuring 0 that it could never have failed to report.
        "word,part,chapter_slug,position,meaning,sentence,sentence_source,synonyms,antonyms,excluded,derived_model,times_asked,exams,school_class,school_source"
      )
      .eq("book_slug", CADET_VOCAB.slug)
      .order("word")
      .range(from, from + 999);
    if (error) throw error;
    rows.push(...(data ?? []));
    if ((data ?? []).length < 1000) break;
  }
  const ids = new Set(rows.map((r) => r.word));
  console.log(`total rows ${rows.length}, distinct words ${ids.size}`);
  const byPart: Record<string, number> = {};
  for (const r of rows) byPart[r.part] = (byPart[r.part] ?? 0) + 1;
  console.log("by part:", JSON.stringify(byPart));

  const bad = (name: string, n: number) => console.log(`${n === 0 ? "ok " : "!! "}${name}: ${n}`);
  bad("no meaning", rows.filter((r) => !r.meaning?.trim()).length);
  /**
   * PART 4 IS EXEMPT FROM BOTH OF THESE BY DESIGN, not by tolerance. An idiom
   * entry carries a meaning and nothing else: migration 0091 REFUSES one that
   * has a sentence, and an idiom's synonym would just restate its meaning. So
   * a zero here would mean the shape had been violated, not that all was well.
   *
   * Fourth newly-legitimate state this probe has had to learn — Part 3's bare
   * stems, then Part 2's option words, then their citations, now Part 4. The
   * pattern is that a check written for one shape of corpus reads a later shape
   * as a fault, and a red line on an expected state is how a probe teaches
   * people to skip it.
   */
  const vocabRows = rows.filter((r) => r.part !== "idiom");
  bad("no sentence", vocabRows.filter((r) => !r.sentence?.trim()).length);
  /**
   * AN UNCITED SENTENCE IS A DEFECT IN PART 2 AND NORMAL IN PART 3.
   *
   * A Part 2 word is there because a paper asked it, so a real sentence exists
   * and an authored one means the citation was dropped. Roughly half of Part 3
   * appears only in a bare stem ("Choose the word most similar to ABATE"), so
   * there is nothing to quote and authoring is the only option. Reporting them
   * together printed a red line on an expected state, which is how a probe
   * teaches people to skip it.
   */
  /**
   * `times_asked > 0` IDENTIFIES A TESTED WORD EXACTLY, and that is why the
   * check keys on it. A Part 2 word is there because a paper printed it, but
   * only a TARGET word was asked — and a target has at least one paper
   * appearance by definition of its placement, while an option word carries 0.
   * So an uncited sentence is a real defect on a tested word (the citation was
   * dropped) and the only possible state for an option word, which has no exam
   * sentence to quote.
   *
   * Third time this probe has had to learn a newly-legitimate state — Part 3's
   * bare stems, then the option words. The pattern is that a check written when
   * the corpus had one shape reads a later shape as a fault, and a red line on
   * an expected state is how a probe teaches people to skip it.
   */
  const uncited = rows.filter((r) => r.sentence && !r.sentence_source);
  bad(
    "tested word with no citation",
    uncited.filter((r) => r.part === "pyq" && (r.times_asked ?? 0) > 0).length
  );
  console.log(
    `   authored sentences (expected — no exam sentence exists): ` +
      `${uncited.filter((r) => r.part !== "pyq" || (r.times_asked ?? 0) === 0).length}` +
      ` (Part 3 bare stems + Part 2 option words)`
  );
  bad("no synonyms", vocabRows.filter((r) => !r.synonyms?.length).length);
  bad("no provenance", rows.filter((r) => !r.derived_model).length);
  bad("backslash anywhere", rows.filter((r) => JSON.stringify(r).includes("\\\\")).length);
  bad("meaning ends with a full stop", rows.filter((r) => /\.$/.test(r.meaning ?? "")).length);
  const idioms = rows.filter((r) => r.part === "idiom");
  bad("idiom carrying a sentence", idioms.filter((r) => r.sentence || r.sentence_source).length);
  bad("idiom with no exam tag", idioms.filter((r) => !r.exams?.length).length);
  console.log(`   excluded (withheld from print): ${rows.filter((r) => r.excluded).length}`);
  console.log(
    `   no antonyms (deliberate — no natural opposite): ${rows.filter((r) => !r.antonyms?.length).length}`
  );

  /**
   * PART 1 IS A CLASS LADDER, so a school row's rung must agree with the
   * chapter it sits in. The DB CHECK (0093) already refuses a school row with
   * no rung; what it CANNOT see is a row whose `school_class` says 9 while its
   * `chapter_slug` says `school-class-11` — both columns are individually
   * valid and the book would print the word on the wrong rung with nothing
   * anywhere reporting it.
   */
  const school = rows.filter((r) => r.part === "school");
  const rungOf = new Map(
    CADET_VOCAB.chapters
      .filter((c) => c.part === "school")
      .map((c) => [c.slug, c.schoolClass])
  );
  const mismatched = school.filter((r) => rungOf.get(r.chapter_slug) !== r.school_class);
  const cbse = school.filter((r) => r.school_source === "cbse").length;
  const authored = school.filter((r) => r.school_source === "authored").length;
  console.log(`
Part 1 ladder: ${school.length} words`);
  console.log(`   graded by CBSE: ${cbse}   authored to level: ${authored}`);
  console.log(
    `   class disagrees with its chapter: ${mismatched.length}` +
      (mismatched.length ? `  !! ${mismatched.slice(0, 5).map((r) => r.word).join(", ")}` : "")
  );
  // A non-school row carrying a rung is refused by the DB, so this is belt and
  // braces -- but it is one line and it is the check that would catch a future
  // part being added without thinking about these columns.
  const strays = rows.filter((r) => r.part !== "school" && r.school_class != null);
  console.log(`   non-school rows carrying a class: ${strays.length}`);

  /**
   * PART 5 NAMES WORDS IT DOES NOT DEFINE, which makes it the one place in this
   * book where a rot is possible and invisible. Every other part IS its entries;
   * the homonym list is a separate file pointing AT entries, so a word renamed
   * or withdrawn leaves a set pointing at nothing and the page still prints.
   */
  const hPath = join(DATA, "homonym-list.json");
  if (existsSync(hPath)) {
    const sets = JSON.parse(readFileSync(hPath, "utf8")) as { words: string[] }[];
    const have = new Set(rows.map((r) => r.word.toLowerCase()));
    const dangling: string[] = [];
    for (const set of sets) {
      for (const w of set.words) if (!have.has(w.toLowerCase())) dangling.push(w);
    }
    const slots = sets.reduce((n, x) => n + x.words.length, 0);
    console.log(
      `
Part 5: ${sets.length} sets, ${slots} word slots, ` +
        `${dangling.length} naming no entry` +
        (dangling.length ? `  !! ${dangling.slice(0, 8).join(", ")}` : "")
    );
  }

  // per chapter, and position must be contiguous alphabetical
  for (const ch of CADET_VOCAB.chapters) {
    const mine = rows.filter((r) => r.chapter_slug === ch.slug);
    if (!mine.length) continue;
    const sorted = [...mine].sort((a, b) => a.position - b.position);
    const alpha = [...mine].sort((a, b) => a.word.localeCompare(b.word));
    const ordered = sorted.every((r, i) => r.word === alpha[i].word);
    const contiguous = sorted.every((r, i) => r.position === (i + 1) * 100);
    console.log(
      `  ${ch.slug.padEnd(12)} ${String(mine.length).padStart(3)}  ` +
        `${ordered ? "alphabetical" : "!! OUT OF ORDER"}  ${contiguous ? "contiguous" : "!! GAPS"}`
    );
  }
})();
