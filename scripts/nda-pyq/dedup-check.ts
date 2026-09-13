/**
 * Check a transcribed paper against the whole NDA Mathematics corpus BEFORE the
 * derivation pass.
 *
 *   npx tsx scripts/nda-pyq/dedup-check.ts 2026-2
 *
 * WHY IT RUNS BEFORE DERIVING, not after. Two different things are at stake and
 * both are cheaper to learn now:
 *
 *  1. A question already in the bank will be SILENTLY SKIPPED by `commitStaged`
 *     (`content_hash` is per org+exam), so the paper would commit short and the
 *     /mock hard count would fail with no explanation. `commit.ts` names any
 *     skip, but by then a derivation has been paid for.
 *  2. A match is a FREE KEY. The existing row already carries an adjudicated
 *     answer, so a genuine repeat is the one case where an external check is
 *     available before the external key arrives.
 *
 * IT REPORTS, IT NEVER ACTS. A high-similarity pair is a question for a human —
 * UPSC does reuse item SHAPES with changed numbers, and the changed number is
 * usually the point, so a near-match is at least as likely to be a distinct
 * question as a repeat.
 *
 * ## TWO CHECKS, AND ONLY ONE OF THEM IS TRUSTWORTHY
 *
 * 1. **EXACT normalised-stem match** — decisive. It over-approximates what
 *    `content_hash` does (stem only, ignoring options and answer), so it cannot
 *    miss a collision. A hit here means the paper WILL commit short.
 *
 * 2. **Weighted fuzzy similarity** — a reading list, and a weak one. Measured on
 *    this corpus it does NOT reliably discriminate, and that is a property of
 *    NDA Maths rather than a bug left unfixed: the stems are short, heavily
 *    templated ("Consider the following statements ... Which of the statements
 *    given above is/are correct?") and their real content is mathematical
 *    structure that tokenises poorly. Three successive fixes — keeping numbers,
 *    including the options, weighting by inverse document frequency, and keeping
 *    LaTeX command names as tokens — each improved it and none made it decisive:
 *    `lim sin^2 x/(x|x|)` still scores 0.99 against `lim f(x)/g(x)`.
 *
 *    So read its output as "questions of a similar SHAPE", never as "probable
 *    duplicates", and do not tighten the threshold to make the list look clean.
 */
import { config as loadEnv } from "dotenv";
import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { SUBJECT_ID, dataPath, requirePaper } from "./config";
import { normalizeQuestions, type TQ } from "./lib";

loadEnv({ path: ".env.local", override: true });

/**
 * Tokens for comparison: words of 3+ letters AND every number, from the stem
 * PLUS all four options.
 *
 * Both halves of that are corrections to a first version that flagged 86 of 120.
 *
 *  - NUMBERS ARE KEPT. They are the discriminator this probe most needs: UPSC
 *    reuses a question's SHAPE with changed numbers, and the changed number is
 *    the point. Dropping them makes "sum is neither 5 nor 7" and "sum is
 *    neither 8 nor 9" identical, which is the opposite of what we are asking.
 *  - OPTIONS ARE INCLUDED. A set-member stem is often four words long ("What is
 *    \(G\) equal to?"), so on the stem alone two unrelated questions score 1.00
 *    — which they did. The options carry the actual content.
 */
function words(s: string): string[] {
  return (
    s
      .replace(/\\\(|\\\)/g, " ")
      // LATEX COMMANDS ARE KEPT AS TOKENS, not stripped. Stripping them was the
      // third and worst bug in this probe: on a MATHS paper the commands ARE the
      // content, so deleting them turned every "Consider the following
      // statements" question into the same bag of boilerplate — which is how a
      // d/dx question scored 0.98 against a vector-triple-product one. `vec`,
      // `times` and `cdot` against `frac` and `ln` is precisely the difference
      // that matters.
      .replace(/\\([a-zA-Z]+)/g, " cmd$1 ")
      .replace(/[^A-Za-z0-9 ]/g, " ")
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length >= 3 || /^\d+$/.test(w))
  );
}

/** Stem + options. See `words`: a bare stem is too thin to compare. */
function tokensOf(stem: string, options: { text: string }[]): Set<string> {
  return new Set(words([stem, ...options.map((o) => o.text)].join(" ")));
}

/**
 * Below this many tokens the metric is noise, so the row is REPORTED AS
 * UNCOMPARABLE rather than scored. Silently scoring it is how the first version
 * produced a wall of 1.00s between unrelated questions.
 */
const MIN_TOKENS = 10;

/**
 * Jaccard weighted by how DISTINCTIVE each token is across the corpus.
 *
 * Plain Jaccard does not work on this corpus, measured: it scored 0.94 between
 * a `d/dx ln|x|` question and a vector-triple-product one. NDA stems are heavily
 * templated — "Consider the following statements", "Which of the statements
 * given above is/are correct", "What is ... equal to" — so once LaTeX is
 * stripped the BOILERPLATE is most of the token set and the metric measures
 * scaffolding rather than content.
 *
 * So each token is weighted by inverse document frequency over the bank: a word
 * in half the corpus contributes almost nothing, a word in three rows dominates.
 * That is what makes "the changed number is the point" detectable, because a
 * specific number is exactly a rare token.
 */
function weightedJaccard(a: Set<string>, b: Set<string>, idf: Map<string, number>): number {
  const w = (t: string) => idf.get(t) ?? Math.log(1e6); // unseen token = maximally rare
  let inter = 0;
  let union = 0;
  for (const t of a) {
    union += w(t);
    if (b.has(t)) inter += w(t);
  }
  for (const t of b) if (!a.has(t)) union += w(t);
  return union ? inter / union : 0;
}

async function main() {
  const paper = requirePaper(process.argv[2]);
  const qPath = dataPath(paper.id, "questions");
  if (!existsSync(qPath)) throw new Error(`missing ${qPath} — run merge.ts first`);
  const questions: TQ[] = normalizeQuestions(JSON.parse(readFileSync(qPath, "utf8")));

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Paged — a bare select is capped at 1000 and would silently compare against
  // 14% of the corpus while looking like a clean run.
  const bank: {
    id: string;
    text: string;
    n: string | null;
    src: string | null;
    options: { text: string }[];
  }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb
      .from("questions")
      .select("id, text, question_number, source_file, options(text)")
      .eq("subject_id", SUBJECT_ID)
      .range(from, from + 999);
    if (error) throw error;
    for (const r of data ?? []) {
      bank.push({
        id: r.id as string,
        text: (r.text as string) ?? "",
        n: r.question_number as string | null,
        src: r.source_file as string | null,
        options: (r.options as { text: string }[] | null) ?? [],
      });
    }
    if (!data || data.length < 1000) break;
  }

  // POSITIVE CONTROL. A probe that resolves to the wrong subject returns zero
  // for everything and is indistinguishable from a clean run — this repo has
  // been caught by exactly that. Prove the corpus is reachable and non-trivial
  // before reporting any absence.
  const control = bank.filter((b) => /eccentricity/i.test(b.text)).length;
  console.log(`corpus: ${bank.length} NDA Mathematics rows`);
  console.log(`control: ${control} contain "eccentricity" (must be > 0, else the probe is broken)`);
  if (!bank.length || !control) {
    console.log(`\nPROBE IS BROKEN — refusing to report an absence it cannot establish.`);
    process.exit(1);
  }

  const bankSets = bank.map((b) => ({ ...b, w: tokensOf(b.text, b.options) }));

  // Document frequency over the bank, which is what makes a token's weight
  // meaningful. Built from the BANK rather than the paper: 120 rows cannot tell
  // you that "statements" is boilerplate and "210" is not.
  const df = new Map<string, number>();
  for (const b of bankSets) for (const t of b.w) df.set(t, (df.get(t) ?? 0) + 1);
  const N = bankSets.length;
  const idf = new Map<string, number>();
  for (const [t, n] of df) idf.set(t, Math.log(N / n));

  const commonest = [...df.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  console.log(
    `most common tokens (these are the boilerplate the weighting suppresses): ` +
      commonest.map(([t, n]) => `${t}:${n}`).join(" ")
  );

  // ── The EXACT check, which is the one that answers the operational question ──
  // `content_hash` is sha256 over normalised stem + sorted options + answer, so
  // only an (almost) exact repeat dedups and makes the paper commit short. This
  // is a deliberate OVER-approximation of it — stem alone, ignoring options and
  // answer — so it cannot miss a collision, only over-report one.
  //
  // It is reported separately from the fuzzy score below because the two answer
  // different questions and have wildly different trustworthiness. This one is
  // decisive; the fuzzy one is a reading list.
  const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();
  const bankByStem = new Map<string, { src: string | null; n: string | null }>();
  for (const b of bank) bankByStem.set(norm(b.text), { src: b.src, n: b.n });
  const exact = questions
    .map((q) => ({ q, hit: bankByStem.get(norm(q.stem)) }))
    .filter((x) => x.hit);
  console.log(
    `\nEXACT normalised-stem matches: ${exact.length}` +
      (exact.length ? "  <-- these WILL dedup at commit and shorten the paper" : "  (none)")
  );
  for (const { q, hit } of exact) {
    console.log(`  Q${q.number} == ${hit!.src ?? "?"} Q${hit!.n ?? "?"}`);
  }

  let flagged = 0;
  const tooShort: number[] = [];
  const scores: number[] = [];
  for (const q of questions) {
    const qw = tokensOf(q.stem, q.options);
    if (qw.size < MIN_TOKENS) {
      tooShort.push(q.number);
      continue;
    }
    let best = { score: 0, row: bankSets[0] };
    for (const b of bankSets) {
      if (b.w.size < MIN_TOKENS) continue;
      const s = weightedJaccard(qw, b.w, idf);
      if (s > best.score) best = { score: s, row: b };
    }
    scores.push(best.score);
    if (best.score >= 0.55) {
      flagged += 1;
      console.log(
        `\nQ${q.number}  similarity ${best.score.toFixed(2)}  -> ${best.row.src ?? "?"} Q${best.row.n ?? "?"}`
      );
      console.log(`  new:  ${q.stem.replace(/\s+/g, " ").slice(0, 150)}`);
      console.log(`  bank: ${best.row.text.replace(/\s+/g, " ").slice(0, 150)}`);
    }
  }

  const sorted = [...scores].sort((a, b) => a - b);
  const pct = (p: number) => (sorted[Math.floor(sorted.length * p)] ?? 0).toFixed(2);
  console.log(
    `\nbest-match distribution over ${scores.length} comparable question(s): ` +
      `median ${pct(0.5)}  p90 ${pct(0.9)}  max ${(sorted[sorted.length - 1] ?? 0).toFixed(2)}`
  );
  if (tooShort.length) {
    console.log(
      `${tooShort.length} question(s) NOT scored (< ${MIN_TOKENS} tokens, too thin to compare): ` +
        `Q${tooShort.join(", Q")}`
    );
  }
  console.log(
    `${flagged} of ${questions.length} question(s) at similarity >= 0.55.` +
      (flagged
        ? ` READ EACH ONE — a shared shape with changed numbers is a DIFFERENT question.`
        : ` No candidate repeat.`)
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
