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
import { CADET_VOCAB, chapterFor } from "../../src/lib/vocab/registry";
import { citationOf, placementOf, preferredAppearance } from "./commit-entries";
import { loadCorpus } from "./corpus";

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

  // The WHOLE exam corpus, targets and option-only words alike — the latter are
  // three quarters of Part 2 and would otherwise never reach a worksheet.
  const bank = loadCorpus();

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  /**
   * PAGED, AND THIS ONE IS DANGEROUS UNPAGED.
   *
   * PostgREST truncates a raw `.select()` at 1000 rows with no error. This set
   * is what stops an already-authored word being offered again — so once the
   * book passed 1,000 entries the worksheet began listing finished TARGET words
   * as if they were unwritten. Authoring one as an option word (no sentence, no
   * citation) and upserting it would REPLACE the real exam sentence and its
   * paper citation, which is the one thing this book has that a bought word
   * list does not. Silent, and invisible to every count.
   *
   * `.order("word")` is required for the paging to be stable: LIMIT/OFFSET
   * without an ORDER BY can repeat and skip rows between pages.
   */
  const already = new Set<string>();
  for (let from = 0; ; from += 1000) {
    const { data: done, error } = await db
      .from("vocab_entries")
      .select("word")
      .eq("book_slug", CADET_VOCAB.slug)
      .order("word")
      .range(from, from + 999);
    if (error) throw error;
    for (const r of done ?? []) already.add(r.word as string);
    if ((done ?? []).length < 1000) break;
  }

  // Placement is taken from `commit-entries`, never re-derived here: a second
  // copy of the part/section rule would drift, and the drift is silent — the
  // worksheet would offer a word under one chapter and the commit file it under
  // another.
  const mine = bank.filter((w) => {
    const { part, section, schoolClass } = placementOf(w);
    return chapterFor(CADET_VOCAB, part, w.word, section, schoolClass)?.slug === slug && !already.has(w.word);
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
    /**
     * An OPTION word has no appearances, so without this it prints as a bare
     * headword and the worksheet looks broken rather than honest. What evidence
     * exists is still worth stating: which papers printed it, and how often —
     * a word offered in eight questions is commoner than one offered in one,
     * and that is the only signal available for these.
     */
    if (w.source === "school") {
      /**
       * The docx's OWN gloss is printed, because Part 1 is not a
       * definition-writing job — all 924 school words already carry one. It is
       * offered as a STARTING POINT, not as text to copy: the docx writes
       * "To give up completely or leave behind", and the book's house style is
       * a lower-case clause with no closing full stop.
       */
      lines.push(`- [school] Class 5-12 list — never yet set by either exam`);
      lines.push(`  docx gloss: ${w.schoolMeaning ?? "(none)"}`);
    } else if (w.coaching) {
      /**
       * A COACHING WORD IS NOT AN OPTION WORD, and saying so matters. No paper
       * has printed it at all -- it comes from a commercial prep deck -- so the
       * exams named here are the DECK'S stated scope, never a per-word finding.
       * The line below used to read "offered among the choices in NDA + CDS",
       * which asserted a paper appearance that never happened.
       */
      lines.push(
        `- [coaching] taught by a ${w.allExams.join("/")} prep deck — no paper has printed it`
      );
      lines.push(`  no sentence and no key: the meaning must be authored`);
    } else if (!w.tested) {
      const where = w.pyqExams.length ? w.pyqExams.join(" + ") : w.allExams.join(" + ");
      lines.push(`- [option] offered among the choices in ${where} — never the target`);
      lines.push(`  no sentence and no key: the meaning must be authored`);
    }
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
