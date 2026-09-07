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

/** How a sentence's citation is written, from the appearance itself. */
export function citationOf(a: BankWord["appearances"][number]): string {
  if (a.exam === "CDS") {
    const edition = /_(\d)\.pdf$/.exec(a.sourceFile ?? "")?.[1];
    const roman = edition === "2" ? "II" : "I";
    return a.year ? `CDS ${a.year}-${roman}` : "CDS";
  }
  if (a.year && a.month) return `NDA ${a.year} (${a.month})`;
  if (a.year) return `NDA ${a.year}`;
  return "NDA";
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

    const chapter = chapterFor(CADET_VOCAB, "exam", a.word);
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

    // Cross-check against the exam's own cluster.
    const lower = (xs: string[]) => new Set(xs.map((x) => x.toLowerCase()));
    const ourSyn = lower(a.synonyms);
    const ourAnt = lower(a.antonyms);
    for (const app of w.appearances) {
      const key = app.key?.toLowerCase();
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
      part: "exam" as const,
      chapter_slug: chapter.slug,
      position: (i + 1) * 100,
      meaning: a.meaning,
      sentence: a.sentence ?? null,
      sentence_source: a.sentenceSource ?? null,
      synonyms: a.synonyms,
      antonyms: a.antonyms,
      exams,
      times_asked: w.timesAsked,
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
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
