/**
 * Commit authored vocabulary entries into `vocab_entries`.
 *
 *   npx tsx scripts/vocab/commit-entries.ts <file.json>            # dry run
 *   npx tsx scripts/vocab/commit-entries.ts <file.json> --apply
 *
 * Input is an authored file under data/. The bank evidence (exams, times asked)
 * is NOT authored — it is joined from data/bank-words.json, so a hand-typed
 * "asked 3 times" can never disagree with the corpus.
 *
 * THE GATE THAT MATTERS: every authored entry is checked AGAINST THE EXAM'S OWN
 * CLUSTER. A synonym question's key is a synonym of the word and an antonym
 * question's key is its opposite, so if our `antonyms` omit every antonym the
 * papers keyed, one of the two is wrong and a human should look. It is a
 * WARNING, not a refusal: the papers' distractors are only usually synonyms
 * ("intimidation" is offered against wiles / conviction / persuasion), so a
 * disagreement is a question, not a verdict.
 *
 * `sentenceSource` MUST name a real appearance. An invented citation is worse
 * than no citation — the claim "this is the sentence the word was asked in" is
 * the one thing this book has that a bought word list does not, so it is
 * verified rather than trusted.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB, chapterFor } from "../../src/lib/vocab/registry";
import type { BankWord } from "./extract-bank";

const DATA = join(__dirname, "data");
const APPLY = process.argv.includes("--apply");
const FILE = process.argv[2];
const MODEL = "claude-opus-5";

type Authored = {
  word: string;
  meaning: string;
  sentence?: string;
  sentenceSource?: string;
  synonyms: string[];
  antonyms: string[];
  note?: string;
};

/**
 * How a sentence's citation is written, from the appearance itself.
 *
 * PRACTICE MATERIAL IS NAMED AS PRACTICE, and this is a correctness rule rather
 * than a style one. 145 of the 655 words (22%) appear ONLY in coaching material
 * — Oswaal books, weekly mocks — never in a UPSC paper. The first draft of this
 * function returned a bare "NDA" for those, because it fell through to the
 * no-year branch and practice rows carry no `pyq_year`. So "adroit" was cited
 * "— NDA" off `Oswaal_NDA_YWSP_English.pdf`, which asserts that the exam asked
 * a word the exam has never asked.
 *
 * That claim — "this is the sentence the paper asked it in" — is the one thing
 * this book has that a bought word list does not, so it cannot be allowed to be
 * ambiguous. A citation now either names a real sitting or says "practice".
 */
export function citationOf(a: BankWord["appearances"][number]): string {
  if (a.kind === "practice") return `${a.exam} practice`;
  if (a.exam === "CDS") {
    const edition = /_(\d)\.pdf$/.exec(a.sourceFile ?? "")?.[1];
    const roman = edition === "2" ? "II" : "I";
    return a.year ? `CDS ${a.year}-${roman}` : "CDS";
  }
  if (a.year && a.month) return `NDA ${a.year} (${a.month})`;
  if (a.year) return `NDA ${a.year}`;
  // A pyq row with no year at all. Never silently degrade to a bare exam name —
  // that is indistinguishable from the practice case this function exists to
  // separate.
  return `${a.exam} (year not recorded)`;
}

/**
 * Prefer a REAL PAPER for the printed sentence.
 *
 * 51 words appear in both a paper and a mock, often with the identical sentence
 * (the coaching books reprint PYQs). Where both exist the paper is the honest
 * citation, so the choice is made here rather than left to whoever authors.
 */
export function preferredAppearance(w: BankWord): BankWord["appearances"][number] | undefined {
  const usable = w.appearances.filter((a) => !a.bareStem);
  const pool = usable.length ? usable : w.appearances;
  return (
    pool.find((a) => a.kind === "pyq" && a.year) ??
    pool.find((a) => a.kind === "pyq") ??
    pool[0]
  );
}

async function main() {
  if (!FILE) throw new Error("usage: commit-entries.ts <data/file.json> [--apply]");
  const authored = JSON.parse(readFileSync(join(DATA, FILE), "utf8")) as Authored[];
  const bank = JSON.parse(readFileSync(join(DATA, "bank-words.json"), "utf8")) as BankWord[];
  const byWord = new Map(bank.map((w) => [w.word, w]));

  const warnings: string[] = [];
  const rows = authored.map((a, i) => {
    const w = byWord.get(a.word.toLowerCase());
    if (!w) throw new Error(`${a.word}: not an exam-tested word — REFUSING`);

    /**
     * PART IS DERIVED FROM THE CORPUS, never authored: a word is in `pyq` if a
     * REAL PAPER has asked it, otherwise `practice`. Letting the author choose
     * would put the book's central claim in the hands of whoever typed the
     * entry — which is how "adroit" was cited as an NDA question off an Oswaal
     * coaching book.
     */
    const part = w.appearances.some((x) => x.kind === "pyq") ? "pyq" : "practice";
    const chapter = chapterFor(CADET_VOCAB, part, a.word);
    if (!chapter) throw new Error(`${a.word}: no chapter covers its first letter — REFUSING`);

    // The citation must match a real appearance.
    if (a.sentenceSource) {
      const cites = w.appearances.map(citationOf);
      if (!cites.includes(a.sentenceSource)) {
        throw new Error(
          `${a.word}: sentenceSource ${JSON.stringify(a.sentenceSource)} matches no appearance ` +
            `(have: ${[...new Set(cites)].join(", ")}) — REFUSING`
        );
      }
    }
    if (a.sentence && !a.sentenceSource) {
      warnings.push(`${a.word}: sentence with no source — will read as AUTHORED`);
    }

    // If a real paper carries this sentence, cite the paper, not the mock.
    const preferred = preferredAppearance(w);
    if (a.sentenceSource && preferred && a.sentenceSource !== citationOf(preferred)) {
      const better = citationOf(preferred);
      if (!better.endsWith("practice") && a.sentenceSource.endsWith("practice")) {
        warnings.push(
          `${a.word}: cited "${a.sentenceSource}" but a REAL PAPER also carries it — prefer "${better}"`
        );
      }
    }

    /**
     * Cross-check against the exam's own cluster.
     *
     * MEMBERSHIP IS COMPARED ON LETTERS ONLY. The question being asked is "is
     * the paper's answer the same WORD as one of ours", and spacing and
     * hyphenation are not part of that: CDS 2021-I prints the adjective as
     * "straight forward", which is its typo for "straightforward", and the book
     * must print correct English rather than copy it. Same for
     * "even-handed"/"evenhanded".
     *
     * The printed text is untouched — this normalisation exists only for the
     * comparison. It costs a small risk (a genuine pair like "make up" vs
     * "makeup" would read as equal) which is acceptable because this is a
     * WARNING, not a gate: it points a human at a difference worth reading.
     */
    const fold = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
    const lower = (xs: string[]) => new Set(xs.map(fold));
    const ourSyn = lower(a.synonyms);
    const ourAnt = lower(a.antonyms);
    for (const app of w.appearances) {
      const key = app.key ? fold(app.key) : null;
      if (!key) continue;
      const want = app.role === "antonym" ? ourAnt : ourSyn;
      const other = app.role === "antonym" ? ourSyn : ourAnt;
      if (other.has(key)) {
        warnings.push(
          `${a.word}: the paper keys "${app.key}" as a ${app.role.toUpperCase()} but we list it as the OPPOSITE`
        );
      } else if (!want.has(key) && want.size) {
        warnings.push(`${a.word}: paper's ${app.role} "${app.key}" is not in our ${app.role}s`);
      }
    }

    const exams = [...new Set(w.appearances.map((x) => x.exam))].sort();
    return {
      book_slug: CADET_VOCAB.slug,
      word: a.word.toLowerCase(),
      part,
      chapter_slug: chapter.slug,
      position: (i + 1) * 100,
      meaning: a.meaning,
      sentence: a.sentence ?? null,
      sentence_source: a.sentenceSource ?? null,
      synonyms: a.synonyms,
      antonyms: a.antonyms,
      exams,
      // REAL PAPERS ONLY. w.timesAsked counts every appearance including mocks,
      // which would print "2x" beside a practice-only word and imply the exam
      // asked it twice — the same conflation the citation fix removed. A
      // practice word therefore carries 0 and shows no recurrence marker.
      times_asked: w.appearances.filter((x) => x.kind === "pyq").length,
      note: a.note ?? null,
      derived_model: MODEL,
      derived_at: new Date().toISOString(),
    };
  });

  console.log(`${rows.length} entr(ies) prepared for ${CADET_VOCAB.slug}`);
  for (const r of rows) {
    console.log(
      `  ${r.word.padEnd(14)} ${r.chapter_slug}  x${r.times_asked}  ${r.exams.join("+")}  ` +
        `${r.sentence_source ?? "(authored sentence)"}`
    );
  }
  console.log(`\ncluster cross-check: ${warnings.length} warning(s)`);
  for (const w of warnings) console.log(`  ! ${w}`);

  if (!APPLY) {
    console.log("\n[dry-run] pass --apply to write.");
    return;
  }
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { error, count } = await db
    .from("vocab_entries")
    .upsert(rows, { onConflict: "book_slug,word", count: "exact" });
  if (error) throw error;
  console.log(`\nupserted ${count ?? rows.length} row(s).`);

  /**
   * RENUMBER EACH TOUCHED CHAPTER ALPHABETICALLY.
   *
   * `position` was assigned per FILE, so every authored file restarted at 100
   * and a chapter built from two files INTERLEAVED them — "absurd, abated,
   * abatement, aghast, abolish, allegiance" down the page. In a dictionary that
   * is not a cosmetic fault: alphabetical order is the only way a reader finds
   * anything, and it is what the chapter bands and the index both promise.
   *
   * Renumbering over the WHOLE chapter, not just this file, is the point — the
   * defect is precisely that a file cannot see its neighbours. Idempotent, and
   * it leaves gaps of 100 so a deliberate manual move still has somewhere to go.
   */
  const touched = [...new Set(rows.map((r) => r.chapter_slug))];
  for (const slug of touched) {
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

// GUARDED. `citationOf` and `preferredAppearance` are imported by
// dump-authoring.ts, and an unguarded main() runs on IMPORT — it read that
// script's own argv as a filename and died on "no such file: papers-a". The
// same shape cost a CDS session earlier today, where importing a module for one
// constant executed its writer.
if (require.main === module) {
  main().catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  });
}
