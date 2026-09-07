/**
 * Extract the exam-tested vocabulary from the NDA + CDS banks.
 *
 *   npx tsx scripts/vocab/extract-bank.ts            # report
 *   npx tsx scripts/vocab/extract-bank.ts --write    # write data/bank-words.json
 *
 * WHY THIS IS THE VALUABLE HALF OF THE BOOK. A synonym/antonym question is
 * already a word cluster: the stem is a REAL sentence the word was tested in,
 * the correct option is a synonym or an antonym depending on the task, and the
 * distractors are near-misses drawn from the same semantic field. So for these
 * words the meaning, the example sentence, the synonyms and the antonyms are
 * mostly already in the bank — which no bought word list can say.
 *
 * IT IS EVIDENCE, NOT TRUTH. Distractors are USUALLY but not always synonyms
 * ("intimidation" is offered against wiles / conviction / persuasion, none of
 * which is a synonym), so every field here is a CANDIDATE for the authoring
 * pass to confirm, never a finished entry. `role` records which way round the
 * question ran so a later pass cannot mistake an antonym for a synonym.
 *
 * CDS ANSWERS ARE DERIVED, NOT KEYED. The CDS booklets carry no official answer
 * key, so a CDS "correct option" is an LLM derivation that a 2026-08-25 pass
 * showed can be wrong (19 keys were corrected after mis-slotted option text).
 * `keyTrust` carries that per appearance so the authoring contract can weigh an
 * NDA cluster above a CDS one rather than treating them alike.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";

const DATA = join(__dirname, "data");
const WRITE = process.argv.includes("--write");

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const UNDERLINE = /\\underline\{\\text\{([^}]+)\}\}/;
const CAPS = /\b([A-Z]{3,}(?:\s+[A-Z]{3,})*)\b/g;

/**
 * Words that appear in ALL CAPS as part of the INSTRUCTION, not as the target.
 *
 * Without this, "Choose the word most OPPOSITE in meaning to the highlighted
 * word: ..." yields "opposite" as the headword — it did, 13 times, in the first
 * measurement of this corpus.
 */
const INSTRUCTION_CAPS = new Set([
  "OPPOSITE", "NEAREST", "CLOSEST", "SIMILAR", "MEANING", "SAME", "WORD", "WORDS",
  "CHOOSE", "SELECT", "THE", "AND", "NOT", "ONE", "ALL", "ANY", "MOST", "GIVEN",
  "ANSWER", "SENTENCE", "ABOVE", "WHICH", "THAT", "FOR", "BUT", "LIST", "PART",
  "II", "III", "IV", "NOTE", "DIRECTIONS",
]);

export type Appearance = {
  questionId: string;
  exam: string;
  kind: string;
  subtopic: string;
  /** "synonym" — the key is a synonym of the word; "antonym" — the key opposes it. */
  role: "synonym" | "antonym";
  year: number | null;
  month: string | null;
  sourceFile: string | null;
  questionNumber: string | null;
  /** The stem with the underline markup removed — a real exam sentence. */
  sentence: string;
  /** True when the stem is a bare instruction rather than a usable sentence. */
  bareStem: boolean;
  key: string | null;
  distractors: string[];
  solution: string | null;
  /** "keyed" = an official key exists; "derived" = LLM-derived, CDS has no key. */
  keyTrust: "keyed" | "derived";
};

export type BankWord = { word: string; timesAsked: number; appearances: Appearance[] };

/** Strip the underline markup so the sentence reads as printed. */
export function plainSentence(stem: string): string {
  return stem
    .replace(/\\\(\\underline\{\\text\{([^}]+)\}\}\\\)/g, "$1")
    .replace(/\\underline\{\\text\{([^}]+)\}\}/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** The word the question is about, or null when the stem carries no marking. */
export function targetOf(stem: string): string | null {
  const u = UNDERLINE.exec(stem);
  if (u) return u[1].trim().toLowerCase();
  CAPS.lastIndex = 0;
  for (let m = CAPS.exec(stem); m; m = CAPS.exec(stem)) {
    const tok = m[1].trim();
    if (tok.split(/\s+/).every((p) => INSTRUCTION_CAPS.has(p))) continue;
    return tok.toLowerCase();
  }
  return null;
}

/**
 * A stem that is only an instruction ("Choose the word nearest in meaning to:
 * ADULATION") gives the book no usage sentence. Recorded rather than dropped —
 * the cluster is still good, only the example is missing.
 */
export function isBareStem(sentence: string, word: string): boolean {
  const withoutWord = sentence.toLowerCase().replace(word, "").replace(/[^a-z]/g, "");
  return withoutWord.length < 18 || /^(choose|select|pick)\b/i.test(sentence);
}

/**
 * Paged fetch. THE CALLER MUST ORDER BY A UNIQUE KEY.
 *
 * LIMIT/OFFSET without an ORDER BY has no stability guarantee, so consecutive
 * pages can repeat and skip rows. Unordered, this very function reported 932
 * synonym/antonym questions where the corpus holds 819 — the same defect the
 * syllabus-map loaders hit on 2026-08-03, where two "identical" runs rendered
 * 410 and 438 rows.
 *
 * The duplicate count is asserted rather than trusted, because the symptom is
 * silent: every row returned is real, there are just too many of them.
 */
async function page<T extends { id: string }>(
  q: (from: number, to: number) => any
): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await q(from, from + 999);
    if (error) throw error;
    out.push(...((data ?? []) as T[]));
    if (!data || data.length < 1000) break;
  }
  const unique = new Set(out.map((r) => r.id));
  if (unique.size !== out.length) {
    throw new Error(
      `paged fetch returned ${out.length} rows but only ${unique.size} distinct ids — ` +
        `the query is missing a stable ORDER BY`
    );
  }
  return out;
}

async function main() {
  const rows = await page<any>((f, t) =>
    db
      .from("questions")
      .select(
        "id,text,solution,question_kind,pyq_year,pyq_month,source_file,question_number," +
          "exams!inner(name),subjects!inner(name),chapters!inner(name),subtopics!inner(name)," +
          "options(label,text,is_correct)"
      )
      .eq("visibility", "PUBLIC")
      .order("id")
      .range(f, t)
  );

  const inScope = rows.filter(
    (r) =>
      r.subjects?.name === "English" &&
      ["NDA", "CDS"].includes(r.exams?.name) &&
      r.chapters?.name === "Vocabulary" &&
      ["Synonyms", "Antonyms"].includes(r.subtopics?.name)
  );

  const byWord = new Map<string, BankWord>();
  let noTarget = 0;

  for (const r of inScope) {
    const word = targetOf(r.text);
    if (!word) {
      noTarget++;
      continue;
    }
    const sentence = plainSentence(r.text);
    const opts = (r.options ?? []) as { label: string; text: string; is_correct: boolean }[];
    const key = opts.find((o) => o.is_correct)?.text?.trim() ?? null;

    const app: Appearance = {
      questionId: r.id,
      exam: r.exams.name,
      kind: r.question_kind,
      subtopic: r.subtopics.name,
      role: r.subtopics.name === "Antonyms" ? "antonym" : "synonym",
      year: r.pyq_year ?? null,
      month: r.pyq_month ?? null,
      sourceFile: r.source_file ?? null,
      questionNumber: r.question_number ?? null,
      sentence,
      bareStem: isBareStem(sentence, word),
      key,
      distractors: opts.filter((o) => !o.is_correct).map((o) => o.text.trim()),
      solution: r.solution ?? null,
      keyTrust: r.exams.name === "CDS" ? "derived" : "keyed",
    };

    const entry = byWord.get(word) ?? { word, timesAsked: 0, appearances: [] };
    entry.timesAsked++;
    entry.appearances.push(app);
    byWord.set(word, entry);
  }

  const words = [...byWord.values()].sort((a, b) => a.word.localeCompare(b.word));

  const usableSentence = words.filter((w) => w.appearances.some((a) => !a.bareStem)).length;
  const bothExams = words.filter(
    (w) => new Set(w.appearances.map((a) => a.exam)).size > 1
  ).length;
  const repeated = words.filter((w) => w.timesAsked > 1).length;

  console.log(`synonym/antonym questions scanned : ${inScope.length}`);
  console.log(`  with no extractable target      : ${noTarget}`);
  console.log(`distinct target words             : ${words.length}`);
  console.log(`  with a usable exam sentence     : ${usableSentence}`);
  console.log(`  asked more than once            : ${repeated}`);
  console.log(`  asked by BOTH exams             : ${bothExams}`);
  console.log(
    `appearances                       : ${words.reduce((n, w) => n + w.timesAsked, 0)}`
  );

  if (!WRITE) {
    console.log("\n[report only] pass --write to emit data/bank-words.json");
    return;
  }
  mkdirSync(DATA, { recursive: true });
  writeFileSync(join(DATA, "bank-words.json"), JSON.stringify(words, null, 1) + "\n");
  console.log(`\nwrote data/bank-words.json (${words.length} words)`);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
