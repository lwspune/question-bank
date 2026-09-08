/**
 * Pull every idiom and phrase the NDA and CDS papers have set.
 *
 *   npx tsx scripts/vocab/extract-idioms.ts            # report only
 *   npx tsx scripts/vocab/extract-idioms.ts --write    # emit data/idiom-words.json
 *
 * ═══ THE MEANING IS THE PAPER'S OWN KEYED OPTION, NOT AUTHORED ═══
 *
 * That is what makes this section different from the vocabulary parts, and it
 * is a stronger provenance claim than anything in them: for a word, we author a
 * definition and the exam only confirms a synonym; for an idiom, the exam
 * publishes the definition itself as the correct answer. So the meaning is
 * EXTRACTED and only tidied — never rewritten from a dictionary, because the
 * moment it is rewritten the entry stops being what the paper said and becomes
 * what we think.
 *
 * ═══ NO SENTENCE, AND THAT IS THE CORPUS'S DECISION ═══
 *
 * Measured over the 350 idiom questions: 318 stems are the bare idiom
 * ("Through thick and thin") with four meanings under them, and only ~32 embed
 * it in a sentence. There is nothing to quote for ~91% of them, and an authored
 * sentence would be our invention dressed as evidence — which is exactly what
 * the vocabulary book's citation rule exists to prevent. Synonyms are dropped
 * for a different reason: an idiom's synonym IS its meaning, so the list would
 * restate the definition on the next line.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";

const DATA = join(__dirname, "data");
const WRITE = process.argv.includes("--write");

export type IdiomWord = {
  /** As printed, with the paper's own capitalisation folded to sentence case. */
  idiom: string;
  /** Every meaning a paper has keyed for it, most-frequent first. */
  meanings: string[];
  /** Exams whose papers set it. */
  pyqExams: string[];
  /** Exams that set it anywhere, papers or mocks. */
  allExams: string[];
  /** Times a REAL PAPER asked it. Practice-only idioms carry 0. */
  timesAsked: number;
  uses: number;
};

/** Strip the LaTeX the bank stores markup in, leaving plain text. */
export function plain(s: string): string {
  return (s ?? "")
    .replace(/\\\(\\underline\{\\text\{([^}]*)\}\}\\\)/g, "$1")
    .replace(/\\\(\\text\{([^}]*)\}\\\)/g, "$1")
    .replace(/\\underline\{\\text\{([^}]*)\}\}/g, "$1")
    .replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\\\(|\\\)|\\underline\{|\\textit\{|\}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * The idiom itself. Where the paper underlined it inside a sentence, that
 * markup names it exactly; otherwise the whole stem IS the idiom.
 *
 * The instruction line is stripped when a paper prints one before the sentence
 * — several CDS stems open "Choose the alternative which best expresses the
 * meaning of the Idiom/Phrase in bold:" and then give the sentence.
 */
export function idiomOf(text: string): string | null {
  // THE WORD-COUNT GUARD BELOW MUST COVER BOTH PATHS. A first version applied
  // it only to the bare-stem branch, so `at` — a one-word underline record
  // keyed "quite perplexed" — walked through the underline branch untouched
  // and into the output. The rule is about what an idiom IS, not about which
  // branch happened to find it.
  const und = /\\underline\{\\text\{([^}]*)\}\}/.exec(text ?? "")?.[1];
  let t: string;
  if (und) {
    t = tidy(und);
  } else {
    t = tidy(plain(text).replace(/^(choose|select|find|pick)\b[^:]{0,120}:\s*/i, ""));
  }
  /**
   * TWO SHAPES ARE REJECTED RATHER THAN GUESSED AT, both found by reading the
   * first run's output rather than predicted:
   *
   *  - A SENTENCE. "All his ventures went to the winds" is a stem containing
   *    an idiom, not an idiom; the real entry is "go to the winds" and only a
   *    human can say where the phrase starts. Terminal punctuation alone did
   *    not catch it, because the paper printed no full stop.
   *  - A SINGLE WORD. "at", keyed as "quite perplexed", is a broken underline
   *    record — the same class of defect as the CDS row that underlines
   *    `licence` while keying a vendor. An idiom is a phrase by definition, so
   *    one word means the markup, not the idiom.
   */
  if (OVERRIDES[t]) {
    usedOverrides.add(t);
    return OVERRIDES[t];
  }
  const n = t.split(/\s+/).length;
  if (n < 2 || n > 8) return null;
  return t;
}

/** Which overrides actually matched, so a stale one can be reported. */
const usedOverrides = new Set<string>();

/**
 * Stems the paper printed as a SENTENCE rather than as the idiom, adjudicated
 * by reading them. Two of 297, both surfaced by the length-review list rather
 * than predicted — a word-count rule cannot separate "He makes decision on the
 * fly" (a sentence around `on the fly`) from "A stitch in time saves nine" (a
 * proverb that IS the entry), because both are six words with a finite verb.
 *
 * Keyed on the stem as extracted, so a stale entry that matches nothing is
 * reported rather than silently doing nothing.
 */
const OVERRIDES: Record<string, string> = {
  "All his ventures went to the winds": "Go to the winds",
  "He makes decision on the fly": "On the fly",
};

const tidy = (s: string) =>
  s
    .replace(/^['"‘’“”]+|['"‘’“”.]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** Compare idioms ignoring case, quoting and trailing punctuation. */
const fold = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, "").replace(/\s+/g, " ").trim();

(async () => {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const rows: any[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select(
        "id,text,question_kind,chapters!inner(name),exams!inner(name),options(text,is_correct)"
      )
      .ilike("chapters.name", "%idiom%")
      .order("id")
      .range(from, from + 999);
    if (error) throw error;
    rows.push(...(data ?? []));
    if ((data ?? []).length < 1000) break;
  }
  console.log(`idiom-chapter questions: ${rows.length}`);

  const agg = new Map<
    string,
    { idiom: string; meanings: Map<string, number>; pyq: Set<string>; all: Set<string>; asked: number; uses: number }
  >();
  let noIdiom = 0,
    noKey = 0;
  for (const r of rows) {
    const idiom = idiomOf(r.text);
    if (!idiom) {
      noIdiom++;
      continue;
    }
    const correct = (r.options ?? []).filter((o: any) => o.is_correct);
    // Exactly one correct option, or we cannot say what the paper keyed.
    if (correct.length !== 1) {
      noKey++;
      continue;
    }
    const meaning = tidy(plain(correct[0].text));
    const k = fold(idiom);
    if (!k) continue;
    const e =
      agg.get(k) ??
      { idiom, meanings: new Map<string, number>(), pyq: new Set<string>(), all: new Set<string>(), asked: 0, uses: 0 };
    e.meanings.set(meaning, (e.meanings.get(meaning) ?? 0) + 1);
    e.all.add(r.exams.name);
    if (r.question_kind === "pyq") {
      e.pyq.add(r.exams.name);
      e.asked++;
    }
    e.uses++;
    agg.set(k, e);
  }

  const out: IdiomWord[] = [...agg.values()]
    .map((e) => ({
      idiom: e.idiom,
      meanings: [...e.meanings.entries()].sort((a, b) => b[1] - a[1]).map(([m]) => m),
      pyqExams: [...e.pyq].sort(),
      allExams: [...e.all].sort(),
      timesAsked: e.asked,
      uses: e.uses,
    }))
    .sort((a, b) => a.idiom.toLowerCase().localeCompare(b.idiom.toLowerCase()));

  console.log(`  stems rejected (a sentence, or a 1-word underline): ${noIdiom}`);
  console.log(`  stems with no single keyed answer: ${noKey}`);
  console.log(`\ndistinct idioms                   : ${out.length}`);
  console.log(`  asked by a REAL PAPER            : ${out.filter((o) => o.timesAsked > 0).length}`);
  console.log(`  practice material only           : ${out.filter((o) => o.timesAsked === 0).length}`);
  console.log(`  set by BOTH papers               : ${out.filter((o) => o.pyqExams.length > 1).length}`);
  console.log(`  asked more than once             : ${out.filter((o) => o.timesAsked > 1).length}`);

  /**
   * MORE THAN ONE KEYED MEANING IS A FINDING, not noise: two papers keyed the
   * same idiom differently, so either the phrasings agree and the longer one is
   * simply fuller, or they genuinely disagree and one of them is wrong. Both
   * need a human eye, so they are counted here rather than silently merged.
   */
  const multi = out.filter((o) => o.meanings.length > 1);
  console.log(`\nidioms with more than one keyed meaning: ${multi.length}`);
  for (const m of multi.slice(0, 12)) {
    console.log(`  ${m.idiom}`);
    for (const x of m.meanings) console.log(`      - ${x}`);
  }

  /**
   * A 6-8 word survivor may still be a SENTENCE rather than an idiom — "All his
   * ventures went to the winds" passes any word-count rule, and only a reader
   * can say the entry should be "go to the winds". Listed for review rather
   * than guessed at, and rather than silently kept.
   */
  // A stale override matches nothing and would otherwise sit in the file
  // looking like it still does something.
  const stale = Object.keys(OVERRIDES).filter((k) => !usedOverrides.has(k));
  if (stale.length) {
    console.log(`\n!! ${stale.length} override(s) matched no stem: ${stale.join(" | ")}`);
  }

  const longish = out.filter((o) => o.idiom.split(/\s+/).length >= 6);
  console.log(`\nlong enough to be a sentence — review by hand: ${longish.length}`);
  for (const l of longish) console.log(`   ${l.idiom}`);

  const short = out.filter((o) => o.meanings[0].split(/\s+/).length <= 2);
  console.log(`\nmeanings of two words or fewer (may need widening): ${short.length}`);
  for (const s of short.slice(0, 8)) console.log(`   ${s.idiom.padEnd(34)} ${s.meanings[0]}`);

  if (!WRITE) {
    console.log("\n[report only] pass --write to emit data/idiom-words.json");
    return;
  }
  writeFileSync(join(DATA, "idiom-words.json"), JSON.stringify(out, null, 1) + "\n");
  console.log(`\nwrote data/idiom-words.json (${out.length} idioms)`);
})();
