/**
 * Does a stem point at a figure the source supplied? Pure core behind
 * `npm run audit:figures`.
 *
 * WHY THIS IS SHARED RATHER THAN PER-PIPELINE. The rule was written twice
 * before this file existed — once in scripts/cbse-12-pyq/audit-figures.ts and
 * once in scripts/mh-hsc-12-pyq/audit-figure-refs.ts — each for the one corpus
 * its author was looking at, each wired to nothing, neither ever run bank-wide.
 * The exams with the worst miss rates measured on 2026-09-23 (MH SSC 10 at 55%,
 * MH State Board 11 at 77%) had no probe at all. Two copies of a rule is also
 * two calibrations that drift: the CBSE copy had learned `shows`, `network` and
 * the plural revert; the MH HSC copy had learned the bare `Fig. N` form. Neither
 * knew what the other knew. One core, one spec, every exam.
 *
 * WHAT IT IS FOR. A row whose stem reads "In figure 3.37, m(arc DGF) = 200°,
 * find m(arc DE)" with `image_url` NULL is UNANSWERABLE, renders as a complete
 * question, and is invisible to every existing gate: `board:lint` reads book
 * structure, `audit:text` reads text defects, `audit:keys` reads option
 * integrity, `notes:lint` reads editorial modules. None of them asks whether the
 * thing a stem points at exists.
 *
 * TRIAGE, NEVER A GATE. Some stems describe a figure in words on purpose, and
 * "draw a labelled diagram" asks the STUDENT for one. A hit is a question to
 * answer, not a verdict — the same posture as `audit:text`.
 */

/**
 * Phrases that point at a PRINTED figure rather than describing a curve in
 * words. Narrow on one axis by design: "the graph of y = sin x" is a function,
 * not a figure, and matching it would bury the real hits.
 *
 * Narrow is not the same as short, and both ancestors started BOTH. Each was
 * written from the rows it already flagged, so each learned only its own
 * corpus's phrasing. The discipline that fixed them, and the one to keep: check
 * a widening against the population the probe calls CLEAN, never against the
 * population it already flags.
 */
const FIGURE_REF = new RegExp(
  [
    // "in the given figure", "from the adjoining diagram", "see the figure below"
    String.raw`\b(?:in|from|given|shown|see|below|above)\s+(?:the\s+)?(?:adjoining\s+|following\s+|given\s+)?(?:figure|fig\.?|diagram)\b`,

    // "the following/adjoining/given figure|graph|diagram"
    String.raw`\bthe\s+(?:adjoining|following|given|above)\s+(?:figure|fig\.?|diagram|graph)\b`,

    // "figure below", "graph above", "diagram shown", "The figure shows".
    //
    // `shows` is not decoration on `shown`: "The figure shows ..." is the most
    // common opening CBSE gives a figure question, and the rule missed on that
    // one letter — 2025-55-6-1 Q1 was unanswerable with no image and was called
    // clean. `network|circuit|arrangement|set-up` are not decoration either:
    // CBSE routinely names a printed drawing by WHAT IT DEPICTS rather than by
    // the word "figure" — 2024-55-4-1 Q25 reads "Find the current in branch BM
    // in the network shown :" and names not one resistance or emf.
    //
    // An enumerated noun list under-matches in silence. That is the recurring
    // weakness of this whole rule and the reason for the self-test in the CLI.
    String.raw`\b(?:figure|fig\.?|diagram|graph|network|circuit|arrangement|set-?up)\s+(?:below|above|shown|shows)\b`,

    // "as shown below", "as shown in the Fig. a", "as shown here" — no noun at all.
    String.raw`\bas\s+shown\s+(?:below|above|here|in)\b`,

    // "... is shown below", "... are shown below" — the same idea without the
    // leading "as". Measured bank-wide: +17 on the recall check for 14 additions
    // to the serious list, of which ~9 are genuine and flatly unanswerable (four
    // test tubes, a part of the periodic table, four DNA bases, a charge-time
    // graph). The false ones are reactions written out in the stem itself.
    String.raw`\b(?:is|are|was|were)\s+shown\s+(?:below|above)\b`,

    // A printed CIRCUIT named by what it is rather than as "a figure".
    //
    // The two-word gap is load-bearing and was the MH HSC ancestor's hardest-won
    // lesson: the real stems read "the following SWITCHING circuit", and a rule
    // requiring the noun to follow the determiner immediately detected 1 of its
    // 5 known cases. Measured here: with the gap, +147 on the recall check for 7
    // additions; without it, +114 for 5. The extra 33 rows are worth two hits.
    //
    // The PREPOSITION is what keeps it honest. A reference to a printed circuit
    // is prepositional — "in the given circuit", "from the following logic
    // circuit", "for a given series LCR circuit". Without that anchor the rule
    // also swallows the VERB: "You are given three circuit elements X, Y and Z"
    // is a text-only CBSE question with no figure at all.
    String.raw`\b(?:in|from|for|across|of|through)\s+(?:the\s+|a\s+|an\s+)?(?:following|given|adjoining|above)\s+(?:\w+[\s-]+){0,2}(?:circuit|network)\b`,

    // A BARE figure number with no preposition in front of it: "(Fig. 4.23)",
    // "[Fig. 1.10(a)]", "Fig 3.4". Both ancestors' determiner-anchored patterns
    // walk straight past these, and they are the dominant form in the NCERT and
    // Balbharati textbook corpora — which is most of what this probe is for.
    //
    // `\bfig` cannot run into "configuration" (no word boundary) and cannot
    // swallow "figure of" (the char class needs a digit or an open paren, and
    // gets "u"), so "Draw figure of these circles touching each other" stays
    // silent. Both are pinned by tests.
    String.raw`\bfig(?:ure)?s?\.?\s*[\d(]`,
  ].join("|"),
  "i",
);

/**
 * PLURALS WERE TRIED AND REVERTED on the CBSE corpus, and the measurement is the
 * reason this rule stays singular. Allowing a trailing `s` on every noun moved
 * REFERENCES-NO-IMAGE from 42 to 47 over 5,022 rows and ALL FIVE additions were
 * false — "Which of the following graphs ..." rows whose options are carried as
 * descriptive text and that need no image at all. One genuine row shares that
 * exact phrasing, so no stem rule can separate them. The signal that does lives
 * in the OPTIONS — see `optionsDeferToFigure`.
 *
 * (The numbered form above is exempt: "Figures 3.4 and 3.5" names printed
 * figures whatever its plurality.)
 */
/** A GFM pipe-table's mandatory separator row — the same discriminator
 *  `parseTableBlocks` uses to tell a real table from inline `|x|` math. */
const PIPE_TABLE = /^\s*\|?[\s:-]*-{3,}[\s:|-]*\|/m;
/** An explicit figure NOUN, as opposed to a bare "shown below". */
const FIGURE_NOUN = /\b(?:figure|fig\.?|diagram)\b/i;

export function referencesFigure(text: string | null, context: string | null): boolean {
  const body = `${text ?? ""}\n${context ?? ""}`;
  if (!FIGURE_REF.test(body)) return false;

  // A TABLE IS NOT A FIGURE. "The distances they threw the javelin are shown
  // below in the table" followed by a real pipe-table is pointing at content the
  // row CARRIES. Those rows matched on the bare `shown below` branch, which has
  // no figure-noun in it, so nothing upstream could tell them apart — two
  // independent triage lanes hit the same class on 2026-09-23.
  //
  // Guarded on BOTH sides: the table only excuses the match when the text names
  // no figure at all. A question may legitimately print a table and also read a
  // printed figure, and a blanket table exemption would hide that row forever.
  if (PIPE_TABLE.test(body) && !FIGURE_NOUN.test(body)) return false;

  return true;
}

/**
 * The figure was written out in PROSE instead of attached.
 *
 * The state-board vision pipeline and the UPSC ingest both do this deliberately
 * — "[Figure: a velocity-time graph. The vertical axis is labelled "v m/s" ...]"
 * — so the row is answerable and is NOT the defect this probe hunts. It has to
 * be separable, or 29 correctly-handled rows sit in the serious list forever and
 * the list stops being read.
 */
// TWO PIPELINES, TWO BRACKET CONVENTIONS. The state-board and UPSC ingests write
// "[Figure: a velocity-time graph ...]"; the NCERT ingest writes "[Read from Fig.
// 2.8: ...]" and "[Fig. 2.29 shows the network as follows ...]". The original
// regex knew only the first, so four NCERT Physics rows that had been handled
// correctly sat in the serious list looking like defects. Anchored on the
// opening bracket so an ordinary aside ("[Note: take g = 9.8]") cannot match.
const DESCRIBED_IN_TEXT = /\[\s*(?:read\s+from\s+)?fig(?:ure)?\b/i;

export function describesFigureInText(text: string | null, context: string | null): boolean {
  return DESCRIBED_IN_TEXT.test(`${text ?? ""}\n${context ?? ""}`);
}

/**
 * The OPTIONS are the figure, not the stem.
 *
 * Some rows ask "which of the following figures ..." where the four choices are
 * DRAWINGS with nothing to transcribe, so the transcriber stored a placeholder
 * instead of a description. Such a row is unanswerable without its images even
 * though its stem says nothing a reference regex can catch.
 *
 * This keys on the transcription's OWN marker rather than on the exam board's
 * prose, which is what makes it precise: the rows that merely SOUND similar
 * ("Which of the following graphs shows the variation of photoelectric current")
 * carry real option descriptions and need no image at all.
 */
export function optionsDeferToFigure(options: { text: string | null }[] | null | undefined): boolean {
  if (!options?.length) return false;
  return options.some((o) => /see the attached figure|as printed/i.test(o.text ?? ""));
}

/**
 * Asks the STUDENT to produce a drawing.
 *
 * Reported as an ANNOTATION on a hit, never as a filter. A stem can both depend
 * on a printed figure and ask for another one back ("In Fig. 5.10, ... sketch
 * the resulting path"), so subtracting these would hide real defects. Suppress
 * at read time, not at detect time.
 */
const STUDENT_DRAWS = /\b(?:draw|sketch|plot|construct)\b/i;

export function studentDraws(text: string | null): boolean {
  return STUDENT_DRAWS.test(text ?? "");
}
