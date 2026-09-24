/**
 * GROUNDING AUDIT — the pure core. No IO, no DB, no config.
 *
 * Spec: tests/grounding-core.test.ts
 *
 * WHAT IT IS FOR. Several textbooks in this bank ship NO answer key anywhere —
 * MH State Board Class 9 (History/PolSci + Geography), Class 10 (Science +
 * History/PolSci), Class 12 Geography — so the step-6 book cross-check cannot
 * run and every answer is authored from the chapter's own prose. The failure
 * mode that replaces a wrong-key error is a FLUENT INVENTION: a real-sounding
 * date, person, organisation or statistic that the chapter never mentions and
 * that no reader would think to question. This is the mechanical half of
 * catching that.
 *
 * METHOD. Pull every distinctive token out of an authored answer — 4-digit
 * years, and proper nouns (capitalised words NOT at a sentence start, plus
 * capitalised runs anywhere) — and check each against the chapter's own text
 * layer. A token absent from the chapter is a CANDIDATE ungrounded claim.
 *
 * IT IS TRIAGE, NOT A VERDICT, and it is deliberately one-sided:
 *   - It cannot see an invention made in ordinary lowercase words ("the movement
 *     lasted three years"). A CLEAN RUN IS NOT PROOF OF GROUNDING.
 *   - It flags legitimate glue and legitimate rewordings of a name the book
 *     spells differently.
 * So a hit is a question, never a finding. Callers exit 0 regardless.
 *
 * ── WHY THIS FILE EXISTS (2026-09-24) ───────────────────────────────────────
 * Three pipelines had each grown their own copy of this function, and they had
 * DRIFTED. `scripts/mh-ssc-10-text/` carried five noise fixes that
 * `scripts/mh-sb-9/` did not — possessive stripping on BOTH sides, math and
 * emphasis stripping, pipe-table + paragraph sentence boundaries, trailing
 * connector trimming, and a case-insensitive stopword test. Every one was
 * earned from a real false-positive class named in the comments below.
 *
 * Adding a fourth copy for the Class 12 Geography lane would have meant
 * choosing which copy's blind spots to inherit, so the core was extracted here
 * instead, seeded from the NEWER implementation. Signal-to-noise is
 * load-bearing rather than cosmetic: each false positive is a hit a human must
 * read and dismiss, and a probe that cries wolf six times per chapter stops
 * being read at all — at which point the only check behind a keyless corpus is
 * gone.
 *
 * The two pre-existing copies are deliberately UNTOUCHED. Migrating them is a
 * logged backfill candidate in ROADMAP.md, not a silent rework of shipped
 * pipelines whose reports are already on the record.
 */

/** Words that start sentences or are generic enough to carry no factual load. */
const STOP = new Set(
  `A An The This That These Those It Its In On At To For From By With Without And But Or Not No So If When While Where Which What Who Why How
   He She They We You I Their There Then Thus Hence Also Both Each Every All Any Some Such Since Because After Before During Until
   Note True False Yes Its Is Are Was Were Be Been Being Has Have Had Do Does Did Can Could Will Would Shall Should May Might Must
   First Second Third Fourth Fifth Last Next Many Much More Most Other Others Another Same Different Chapter Textbook Answer Question
   Q Ex According Given Under Over Between Among Through Above Below Here However Therefore Although Though Even Only Just Still Yet
   One Two Three Four Five Six Seven Eight Nine Ten`
    .split(/\s+/)
    .filter(Boolean)
);

/** Lowercase words a capitalised run may legitimately contain but never END on. */
const CONNECTOR = new Set(["of", "the", "and", "for", "de"]);

/** Stopword test, CASE-INSENSITIVE: the connector allowance admits lowercase
 *  "the" into a run, which a case-sensitive `STOP.has` then failed to recognise
 *  as glue — that is how "So the" survived to be reported as a missing name. */
const isStop = (w: string) => STOP.has(w[0].toUpperCase() + w.slice(1).toLowerCase());

/** Normalise for containment testing: collapse all whitespace, unify quotes/dashes. */
function norm(s: string): string {
  return s
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‐-―−]/g, "-")
    .replace(/\s+/g, " ");
}

export type Hit = { ref: string; token: string; kind: "year" | "proper-noun" };

/**
 * Distinctive tokens in `solution` that do not occur in `chapterText`.
 * Both are normalised first. A capitalised word is skipped when it sits at a
 * sentence start (or opens the string), because that capital is grammatical
 * rather than a name — the single biggest source of false positives.
 */
export function ungroundedTokens(solution: string, chapterText: string): Hit[] {
  // The possessive is stripped from the CANDIDATE below, so it must be stripped
  // from the haystack too or the two can never meet. Left asymmetric, any
  // multi-word name whose chapter form carries a possessive is unmatchable however
  // plainly it is printed: the chapter says "Let's Discuss", the candidate becomes
  // "Let Discuss", and containment fails forever. Proved with a control pair by an
  // ingestion agent — the same phrase without the possessive matched cleanly.
  const stripPossessive = (s: string) => s.replace(/['’]s\b/g, "");
  const hay = stripPossessive(norm(chapterText));
  const hayLower = hay.toLowerCase();
  // Strip inline math and markdown emphasis BEFORE anything is extracted. A LaTeX
  // macro is not a claim about the world: \Rightarrow inside a math zone was
  // reported as an ungrounded name on four Gravitation answers, and with twenty
  // Science chapters to come that noise would swamp the real signal. Emphasis
  // markers matter for a different reason — "**Convert the distance …**" puts two
  // asterisks in front of a sentence-opening word, so the sentence-initial rule
  // below could no longer see that it WAS sentence-initial and reported "Convert".
  const plain = solution.replace(/\\\([\s\S]*?\\\)/g, " ").replace(/\*\*/g, "");
  const sol = norm(plain);
  const hits: Hit[] = [];
  const seen = new Set<string>();

  // 1. Years — the highest-value signal: a date is either in the book or invented.
  for (const m of sol.matchAll(/\b(1[6-9]\d{2}|20\d{2})\b/g)) {
    const y = m[0];
    if (seen.has(y) || hay.includes(y)) continue;
    seen.add(y);
    hits.push({ ref: "", token: y, kind: "year" });
  }

  // 2. Proper nouns — capitalised runs. Sentence-SPLIT first: a run must never
  //    span a full stop, or "Golden Temple. The army" becomes one bogus token and
  //    the real signal drowns. Within a sentence, the FIRST word's capital is
  //    grammatical, so it only counts when it joins a multi-word run.
  //    A GFM pipe-table cell is a sentence boundary too: concept-map answers are
  //    authored as tables and every cell opens with a capital, so without this
  //    one table contributes five bogus "names" ("Casts", "Prepares", …).
  //    A PARAGRAPH BREAK is a boundary too. A worked calculation routinely ends a
  //    paragraph with a closing math delimiter rather than a full stop, so the next
  //    paragraph's opening word ("Numerator:", "Denominator:") read as mid-sentence
  //    and was reported as a name. The split therefore runs on `plain`, BEFORE
  //    norm() collapses the newlines away — which is why norm() is applied per
  //    sentence here rather than once up front.
  const sentences = plain.split(/(?<=[.!?:;])\s+|\s*\|\s*|\n+/).map(norm);
  const re = /\b([A-Z][a-zA-Z'’-]*(?:\s+(?:of|the|and|for|de)\s+)?(?:\s*[A-Z][a-zA-Z'’-]*)*)/g;
  for (const sentence of sentences) {
    for (const m of sentence.matchAll(re)) {
      // Trailing punctuation, then a POSSESSIVE — "'s" is grammar, never part of
      // the name, but it defeats containment outright and turned every mention of
      // Savarkar's / Ambedkar's into a hit against a chapter that names them both.
      let token = m[1].trim().replace(/['’]s\b/g, "").replace(/[.,;:'"]+$/, "");
      const at = m.index ?? 0;
      // Drop a leading sentence-initial capital from a run ("True. At Yalta" →
      // handled by the split; "The League of Nations" → keep "League of Nations").
      let words = token.split(/\s+/);
      if (at === 0 && words.length > 1 && isStop(words[0])) {
        words = words.slice(1);
        token = words.join(" ");
      }
      // The connector allowance above lets a run END on "of"/"the"/"for"/… — and
      // a name never does. Left in place, "UNESCO for" gets tested against the
      // chapter as one unit and reported missing even though UNESCO is right
      // there, and "So the" / "Facilitate the" become hits made of pure glue.
      // Trimming a trailing connector is strictly noise-reducing: the part of a
      // name that carries the signal always precedes it.
      while (words.length && CONNECTOR.has(words[words.length - 1].toLowerCase())) words.pop();
      token = words.join(" ");
      if (!token || token.length < 4) continue;
      if (words.length === 1) {
        if (isStop(words[0])) continue;
        if (at === 0) continue; // bare sentence-initial capital carries no name
      }
      if (words.every(isStop)) continue;
      if (seen.has(token)) continue;
      seen.add(token);
      if (hayLower.includes(token.toLowerCase())) continue;
      hits.push({ ref: "", token, kind: "proper-noun" });
    }
  }
  return hits;
}
