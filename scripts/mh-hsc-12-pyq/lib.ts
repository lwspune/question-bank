/**
 * Pure core for the MH HSC Class-12 board-PYQ ingestion.
 *
 * The compilation is born-digital .docx read through pandoc, so extraction is a
 * TEXT transform, not vision — but pandoc's output carries a specific and
 * MEASURED set of quirks (Phase 0 analysis, 2026-08-12), and every rule here
 * exists because of one of them. Nothing is defensive-in-general; each case in
 * tests/mh-hsc-12-pyq-normalise.test.ts is a real string from the source.
 */

export type Provenance = {
  /** questions.question_number — the board's own label, best-effort. */
  questionNumber: string;
  /** "March" | "February" | null. NULL when the tag records none. */
  month: string | null;
  year: number;
};

// e.g. "[Q. 1. (A) i., March 2015]" / "[Q. 27, 2025]" / "[Q. 30 (OR), March 2019\]"
// pandoc escapes the closing bracket, hence the optional backslash.
/** The board sits in Feb/March; Jan and Apr are kept from the original rule. */
const MONTH = "January|February|March|April";

/**
 * The provenance tag, across all THREE subjects on this pipeline.
 *
 * Maths and Physics write one shape: `[Q. 4, March 2018]` — comma separator,
 * month before year. CHEMISTRY writes neither consistently:
 *
 *   separator   comma OR period — `[Q.7.i. March 2017]` — and sometimes NEITHER,
 *               where the number ends in a bracket: `[Q.27.A.(OR) March 2019]`.
 *   date order  BOTH ways round, near 50/50 across its 399 tags: 180 read
 *               "March 2017" and 179 read "2016 March".
 *
 * So the separator is optional and the date has two alternatives. The question
 * number stays LAZY and the date is what anchors the match — that is what makes
 * `Q.20. March 2019` yield `Q.20` rather than swallowing the period, and stops
 * the number eating into the month.
 *
 * An unparsed tag makes the extractor DROP the item, so a rule too narrow here
 * loses questions silently. Chemistry would have lost ~390 of 430.
 */
const TAG = new RegExp(
  "\\[\\s*(Q\\.?[^\\]]*?)\\s*[,.]?\\s*(?:" +
    `(?:(${MONTH})\\s+(\\d{4}))` + //  month year
    `|(?:(\\d{4})(?:\\s+(${MONTH}))?)` + //  year [month]
    ")\\s*\\\\?\\]",
);

/**
 * Read the `[Q. n, Month Year]` provenance tag.
 *
 * ⚠ The RESULT IS NOT A UNIQUE KEY and its questionNumber half is unreliable:
 * 20 tags in the source label DIFFERENT questions, and several duplicate pairs
 * disagree with each other on the number for the same question (Q.4(B)v vs
 * Q.5(A)v, March 2015). Year and month agree everywhere and are the parts to
 * trust. Never reconcile against a raw paper on questionNumber alone.
 *
 * month is null rather than guessed when absent: the 2024 and 2025 tags record
 * no month, and although the board sits in Feb/March, which one is not stated.
 */
export function parseProvenanceTag(text: string): Provenance | null {
  const m = TAG.exec(text);
  if (!m) return null;
  // Two date alternatives: groups 2/3 are month-then-year, groups 4/5 are
  // year-then-month (month optional — 14 Chemistry tags carry a bare year).
  const month = m[2] ?? m[5] ?? null;
  const year = Number(m[3] ?? m[4]);
  return {
    questionNumber: m[1].trim().replace(/\s+/g, " "),
    month,
    year,
  };
}

/**
 * Is this the content of a `\text{}` zone that is really PROSE?
 *
 * Deliberately conservative — when in doubt the zone is kept, because unwrapping
 * a formula loses the upright styling that distinguishes it from a variable,
 * whereas keeping a prose word merely leaves it looking as it already does.
 *
 * Rejected: anything with a digit (`Nylon-6`), an all-caps run of 2+ (`KOH`,
 * `DNA`, `IUPAC`), or an internal capital (`NaCl`, `Buna-S`). A leading capital
 * is fine — that is just a sentence opening.
 *
 * Accepted deliberately: a token carrying an option label or item number, such as
 * `(A) Benzaldehyde` or `22. Why`. Those are exactly what must be released back
 * into the text for the item scan and the option split to see them.
 */
const isProseToken = (t: string): boolean => {
  const s = t.trim();
  if (!s) return false;
  if (/\d/.test(s) && !/^\s*\(?[A-Da-d]\)?[.)]?\s|^\s*\d{1,3}\.\s/.test(s)) return false;
  const words = s.split(/\s+/);
  return words.every((w) => {
    const core = w.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "");
    if (!core) return true;
    if (/^\d{1,3}$/.test(core)) return true; // a released item number
    if (/\d/.test(core)) return false;
    if (core.length > 1 && core === core.toUpperCase()) return false; // KOH, DNA
    if (/[A-Z]/.test(core.slice(1))) return false; // NaCl, Buna-S
    return /^[A-Za-z]/.test(core);
  });
};

/**
 * Is a LONE `\text{}` zone safe to release back into prose?
 *
 * Stricter than `isProseToken`, and it has to be: that predicate accepts `K` and
 * `Kc`, both of which must stay wrapped — they are an equilibrium constant, not
 * English. The extra condition is that EVERY word runs to at least three letters.
 *
 * That threshold is measured, not chosen. Across the Chemistry corpus the tokens
 * it holds back are `Fe`, `Cu`, `Hg`, `Sc`, `At`, `Z`, `L atm`, `i`, `ii`, `a`,
 * `b` — and EVERY chemical element symbol is one or two letters, so three is
 * exactly the line between a symbol and a word. The price is ~20 short glue words
 * ("of", "is", "in") that stay wrapped, which is the side of the trade that
 * cannot corrupt a formula.
 *
 * Length alone is NOT enough, and the shipped Physics corpus is what proved it:
 * `\(\text{mgr}\)` is an option of a Rotational Dynamics question — mass times
 * gravity times radius — and it clears any length test. So a word must also
 * contain a VOWEL. A formula is juxtaposed single-letter variables (`mgr`, `mgh`,
 * `mvr`), which does not spell a pronounceable token; a word does. Conservative
 * in the safe direction: it can only ever keep a zone wrapped.
 */
const isLoneProse = (t: string): boolean => {
  if (!isProseToken(t)) return false;
  const words = t.trim().split(/\s+/);
  if (!words.length) return false;
  return words.every((w) => {
    const core = w.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "");
    if (!core) return true;
    return core.length >= 3 && /[aeiouAEIOU]/.test(core);
  });
};

/**
 * Unwrap per-word `\text{}` zones back into prose.
 *
 * TWO passes, and they are separate because they answer different questions:
 *
 *   1. a RUN of two or more adjacent zones is prose by construction — the source
 *      typed a whole sentence one word at a time — so each token is judged only
 *      on whether it is a formula.
 *   2. a LONE zone carries no such evidence, so it must clear the stricter
 *      `isLoneProse` bar. Isolated zones are common (`Gabriel phthalimide
 *      \(\text{synthesis}\)`, 236 of them in Chemistry plus 3 in shipped
 *      Physics), and left wrapped they render as a font shift mid-sentence and,
 *      because a math zone never breaks across lines, as an unbreakable unit.
 *
 * Handles BOTH delimiter forms, because this runs at two different points: on the
 * whole pandoc document BEFORE items are split (where zones are still `$...$` and
 * releasing a swallowed item number is the whole point), and again per item after
 * `normaliseMath` has converted them to `\(...\)`. Idempotent, so running twice is
 * the same as running once.
 */
export function unwrapProseRuns(text: string): string {
  const FORMS = [
    String.raw`\\\(\\text\{([^{}\\]*)\}\\\)`, //  \(\text{x}\)
    String.raw`\$\\text\{([^{}$]*)\}\$`, //       $\text{x}$
  ];
  let out = text;
  for (const ZONE of FORMS) {
    const RUN = new RegExp(`(?:${ZONE}(?:[ ,]+|$)){2,}`, "g");
    const ONE = new RegExp(ZONE, "g");
    out = out.replace(RUN, (run) => {
      const parts: string[] = [];
      let last = 0;
      for (const m of run.matchAll(ONE)) {
        parts.push(run.slice(last, m.index)); // the separator that preceded it
        parts.push(isProseToken(m[1]) ? m[1] : m[0]);
        last = (m.index ?? 0) + m[0].length;
      }
      parts.push(run.slice(last));
      return parts.join("");
    });
    // Second pass: whatever survived the run pass is, by definition, alone.
    out = out.replace(new RegExp(ZONE, "g"), (whole, inner: string) =>
      isLoneProse(inner) ? inner : whole,
    );
  }
  return out;
}

/** Unicode → LaTeX. Only glyphs actually present in the source are listed. */
const UNICODE: [RegExp, string][] = [
  [/∠/g, "\\angle"], // ∠
  [/∞/g, "\\infty"], // ∞
  [/≠/g, "\\neq"], // ≠
  [/±/g, "\\pm"], // ±
];

/**
 * Convert the source's math conventions to the project's.
 *
 * - `$...$` → `\(...\)` (project convention; 948 zones in the source).
 * - `vmatrix` → `bmatrix`. All 20 occurrences denote a MATRIX, not a
 *   determinant — verified against the stems ("the inverse of the matrix",
 *   "adjoint of matrix A", "is a non singular matrix") and against the March
 *   2023 paper, which prints its counterpart with brackets. One stem even
 *   writes `|A|I` with genuine bars alongside a vmatrix for the matrix itself.
 * - U+1F86A (a wide arrow) is used as a SEPARATOR MEANING "for" in piecewise
 *   p.d.f. definitions — `f(x) = x^2/3 [arrow] -1 < x < 2`. Rendering it as
 *   \rightarrow would read as a limit and change the meaning, so it becomes the
 *   word "for".
 * - Loose unicode operators outside a math zone are wrapped in one, since a
 *   bare `\neq` in plain text renders as literal backslash-n-e-q.
 *
 * Idempotent: applying twice equals applying once.
 */
export function normaliseMath(text: string): string {
  let out = text;

  // $...$ -> \(...\). Skip if already converted (idempotence).
  out = out.replace(/\$([^$]+)\$/g, (_, inner) => `\\(${inner}\\)`);

  // PROSE TYPESET AS PER-WORD MATH — unwrap it.
  //
  // The Chemistry compilation's ORGANIC chapters wrap every word of ordinary
  // prose in its own zone: `\(\text{Write}\) \(\text{the}\) \(\text{structure}\)`.
  // 138 of its 430 items (32%) carry such a run; chapters 01-08 carry none, so
  // the organic half was typed by a different hand. Maths and Physics have zero.
  //
  // It is not merely ugly. Option labels and ITEM NUMBERS get swallowed into the
  // run — real examples are `\text{(A) Benzaldehyde}` and `\text{22. Why}` — so
  // 14 MCQs failed to split and shipped as free-response, and 6 questions were
  // never recognised as items at all. Unwrapping releases both.
  //
  // A RUN means two or more adjacent zones: a LONE `\text{}` is usually a real
  // label inside a formula, not prose. Within a run a token that is not plain
  // English keeps its zone, because a chemical formula is not prose — `KOH` and
  // `Nylon-6` stay wrapped while `reaction` and `with` do not.
  out = unwrapProseRuns(out);

  // AN OPTION LABEL TRAPPED IN A LONE `\text{}` ZONE.
  //
  // The run-unwrap above needs two adjacent zones. Chemistry also produces a
  // SINGLE zone carrying the first option label with its text —
  // `\(\text{ (A)Finkelstein}\) reaction (B) Swarts reaction (C) … (D) …` — where
  // the other three labels are already prose. The option list is complete on the
  // page and invisible to splitOptions, so the A-D run never matches and the row
  // ships as free-response with its options glued into the stem.
  //
  // 10 of the 13 Chemistry rows that failed to split are exactly this shape, so it
  // earns a rule rather than ten hand-written recoveries. Safe because an option
  // label is never legitimately inside math: releasing one cannot damage a
  // formula, and a zone with no label is left untouched.
  out = out.replace(/\\\(\\text\{([^{}]*\(\s*[A-Da-d]\s*\)[^{}]*)\}\\\)/g, "$1");

  // The same defect one variant wider: the label sits in a `\text{}` that OPENS a
  // LARGER zone, so it is welded to the formula that follows it —
  //
  //     \(\text{ (A) Na}\left\lbrack \text{Fe}\left( \text{CN} \right)_{6} \right\rbrack\)
  //
  // The rule above cannot see it, because that one requires the whole zone to be
  // a single `\text{}`. Lift the label into prose and REOPEN the zone, so the
  // formula stays math rather than being flattened.
  //
  // Measured: 1 row corpus-wide (Coordination #12), 0 in the shipped chapters —
  // and it surfaced ONLY because commit.ts refuses to ship a known MCQ as
  // free-response. Nothing upstream sees it; the four options are plainly on the
  // page throughout. Same justification as above, which is why it lives here
  // rather than as a hand-written repair: an option label is never legitimately
  // inside math, and a single A-D letter is what distinguishes it from a state
  // symbol such as `(aq)`.
  out = out.replace(
    /\\\(\\text\{\s*(\(\s*[A-Da-d]\s*\))\s*/g,
    "$1 \\(\\text{",
  );

  out = out.replace(/\\begin\{vmatrix\}/g, "\\begin{bmatrix}");
  out = out.replace(/\\end\{vmatrix\}/g, "\\end{bmatrix}");

  out = out.replace(/\u{1F86A}/gu, " for ");
  out = out.replace(/ /g, " ");

  for (const [re, latex] of UNICODE) {
    out = out.replace(re, (glyph, ...rest) => {
      const offset = rest[rest.length - 2] as number;
      return inMathZone(out, offset) ? latex : `\\(${latex}\\)`;
    });
  }

  // pandoc's line-continuation backslash sometimes lands INSIDE a math zone.
  // A zone ending in a lone backslash is a KaTeX parse error that takes the
  // whole stem down with it — the JEE lesson. Strip it, but only when it is
  // genuinely alone: `\\` is a legitimate LaTeX line break.
  out = out.replace(/([^\\])\\\\\)/g, "$1\\)");

  // A bare symbol command butted against a letter is CORRECT — `\(\angle\)B` is
  // the angle named B, and inserting a space to get "∠ B" would be a
  // regression. Pull the letter into the zone instead. Must run BEFORE the
  // general de-gluing below, which would otherwise separate them.
  out = out.replace(/\\\((\\(?:angle|triangle|Delta))\\\)([A-Z])/g, "\\($1 $2\\)");

  // Any other math zone butted straight against the next word renders glued
  // ("]³respectively"). Insert the missing space.
  out = out.replace(/\\\)(?=[A-Za-z])/g, "\\) ");
  out = out.replace(/(?<=[A-Za-z])\\\(/g, " \\(");

  return collapseSpaces(out);
}

/** True when `offset` sits inside a `\(...\)` zone. */
function inMathZone(text: string, offset: number): boolean {
  const before = text.slice(0, offset);
  const open = before.lastIndexOf("\\(");
  const close = before.lastIndexOf("\\)");
  return open > close;
}

const EDITORIAL = /\s*\((?:Note|note):[^)]*\)/g;

/**
 * Remove the compilation's own artifacts from a stem.
 *
 * - a trailing "Options:" label (the compilation's marker for an option list,
 *   not part of the printed question);
 * - pandoc's escaped fill-in blanks `\_\_\_\_`, which render as literal
 *   backslash-underscores outside a math zone;
 * - pandoc's escaped `\^` before a superscript;
 * - `<!-- -->` block separators pandoc emits between a stem and its sub-items;
 * - LWS's own bracketed editorial annotations, which are commentary added by
 *   the compiler and were never on the board's paper.
 */
export function stripArtifacts(text: string): string {
  let out = text;
  // "Options:" is NOT always trailing — when pandoc puts the option list in a
  // following block the label sits mid-string, so this cannot be anchored to $.
  out = out.replace(/\s*\bOptions:\s*/g, " ");
  // The comment separator can be split across lines by pandoc's hard wrap, so
  // match it tolerantly rather than as the literal "<!-- -->".
  out = out.replace(/<!--[\s\S]*?-->/g, " ");
  out = out.replace(/<!--[-\s>]*/g, " ");
  out = out.replace(EDITORIAL, "");
  // The compilation's own "#### **A. Negation, Dual, ...**" section banners. A
  // question block runs to the next NUMBERED item, so any banner between two
  // questions is absorbed by the one BEFORE it — three stems shipped with one
  // glued on in the first extraction run.
  //
  // ONE global rule, not a banner rule plus a trailing-marker rule. The two-rule
  // version left a gap: the compilation emits a BARE "####" line immediately
  // before a titled banner, so an end-anchored cleanup ran while the banner was
  // still there, and the banner rule then removed the banner and left the bare
  // marker stranded at the end. Nine stems shipped with a trailing "####".
  // The heading text is optional here precisely so both forms are covered.
  //
  // The label is a LETTER or a NUMBER: Maths banners are "**A. Negation...**",
  // the Physics compilation numbers them "### 1. Kinematics and Dynamics". The
  // lettered-only rule consumed the "### " marker and left the title glued to
  // the stem — 59 of 379 Physics rows, one per section boundary. Adding the
  // numeric alternative is inert for Maths, which has no numbered banner.
  out = out.replace(/#{2,}[ \t]*(?:\*{0,2}(?:[A-Z]|\d+)\.[^\n]*)?/g, " ");
  out = out.replace(/\\_/g, "_");
  out = out.replace(/\\\^/g, "^");
  // The tag-removal step deliberately leaves the tag's opening backslash behind
  // (see extract.ts — it is what forms the "\:" fill-in-blank token). Where the
  // compilation puts a full stop AFTER the tag rather than a colon, that
  // leftover instead lands as " \." — 272 Physics stems, and none in Maths,
  // which has no full stop in that position.
  //
  // Four shapes, one rule, each observed in the corpus:
  //   "track \."            tag mid-sentence, no punctuation of its own
  //   "diameter\ \."        the item WRAPS, so pandoc's line-continuation
  //                         backslash meets the tag's escape once the newline
  //                         collapses — a single-backslash rule leaves "\."
  //                         behind, since replace() does not rescan its output
  //   "________. \."        the stem ALREADY ends in a full stop and the tag
  //                         carries another; naively substituting gives ".."
  //   "_______ . \."        the same with the stop spaced off
  // Any sentence-final punctuation already present wins; otherwise a full stop
  // is supplied. Runs BEFORE the "\:" rule below so the two cannot compete for
  // the same backslash.
  out = out.replace(/\s*([.?!])?[\s\\]*\\\./g, (_m, prev) => prev ?? ".");
  // pandoc escapes < and > outside a math zone. Left alone they ship as literal
  // backslashes — every p.d.f. support interval in the corpus reads "0\<x\<8".
  out = out.replace(/\\([<>])/g, "$1");
  // A trailing "\:" is the compilation's flattening of the printed fill-in
  // blank, confirmed against the 2019 page (the item ends "______."). Where a
  // blank is ALREADY present the artifact is pure noise; otherwise restore it,
  // since a question ending "the differential equation is" reads as truncated.
  out = out.replace(/\s*\\:\s*$/, (m, ...r) => "");
  if (/\\:\s*$/.test(text) && !/_{3,}\s*\.?\s*$/.test(out)) out = `${out} ______.`;
  // pandoc sometimes closes a math zone one token early, stranding the closing
  // bracket outside it (item 21: "...\vee \sim p$\]."). A literal "\]" then
  // ships in the stem. The reading is unambiguous — a \lbrack is open inside the
  // zone — so move the delimiter back in rather than deleting it.
  out = out.replace(/\\\)\\\]/g, " \\rbrack\\)");
  // The MIRROR of the case above, and the commoner one in Physics: the board
  // states its constants in a PROSE bracket — "[Given: g = 9.8 m/s^2]" — and
  // pandoc leaves the opener escaped OUTSIDE the zone while the closer ends up
  // inside it as \rbrack. Pull the bracket back out so the pair is prose again.
  // Anchored on "\[" immediately followed by a math zone, so a genuine
  // \lbrack...\rbrack pair sitting wholly inside a zone is never touched.
  out = out.replace(/\\\[(\s*\\\([\s\S]*?)\s*\\rbrack\\\)/g, "[$1\\)]");
  // pandoc escapes [ and ] in prose exactly as it escapes _ ^ < > above. Left
  // alone they are worse than cosmetic: "\[...\]" is this project's DISPLAY-MATH
  // delimiter, so "\[Assume all terms in SI unit\]" renders as typeset maths,
  // and an unmatched "\[" ships as a literal backslash-bracket on the card.
  out = out.replace(/\\([[\]])/g, "$1");
  // pandoc's hard-wrap line-continuation backslash. Strip only at a line end or
  // string end, so a genuine LaTeX command is never touched.
  // Allow trailing spaces before the newline: earlier substitutions above
  // (Options:, comment separators) replace with a space, so by this point the
  // backslash is often followed by " \n" rather than "\n" directly.
  //
  // Matched as a RUN. Where an item wraps, the hard-wrap backslash ending the
  // first line meets the tag's own escape opening the second, so once the
  // newline collapses the text ends "________.\ \". A single-backslash rule
  // strips the last one and cannot rescan, leaving "________.\" — 22 Physics
  // fields, and none in Maths, where the tag never sits on its own line.
  out = out.replace(/(?:\\[ \t]*)+(?=\n|$)/g, "");
  // The same continuation backslash can also land MID-string — before the
  // board's internal-choice "OR" marker — where it ships as a literal backslash
  // between two sentences. Matched only as a STANDALONE token (space, backslash,
  // space), which leaves `\ ` inside a math zone alone: that is a real LaTeX
  // spacing command and is how this corpus lays out its piecewise p.d.f.
  // definitions, e.g. `\(\ \ \ \ = 0\)`.
  out = out.replace(/(^|[^\\(])\s\\\s(?=[^\\)])/g, "$1 ");
  // ...and it also lands with NO space before it, where the item simply wrapped
  // mid-sentence: "charged conductor.\ [Given: ...]" — 11 Physics stems, none in
  // Maths. The rule above cannot see those because it requires a leading space.
  //
  // The discriminator is MATH-ZONE MEMBERSHIP, not the surrounding characters:
  // `\ ` inside a zone is a real LaTeX thin space (this corpus lays out its
  // piecewise p.d.f. definitions with runs of them) and is byte-identical to the
  // artifact outside one. Anything cheaper than checking the zone would have to
  // choose between keeping the artifact and destroying the spacing.
  out = out.replace(/\\(?=[ \t])/g, (m, offset: number) =>
    inMathZone(out, offset) ? m : "",
  );

  // A thin space at the very END of a math zone is dead — nothing follows it to
  // be spaced from — and it is UNCONVERTIBLE to OMML. That combination is what
  // makes it worth removing: KaTeX ignores it, so the web page looks right and
  // the defect surfaces only as raw LaTeX in a teacher's downloaded Word answer
  // key, which `audit:omml` is the only gate to see. Seven zones across four
  // Physics rows were shaped this way.
  //
  // Deliberately NOT the same as the rule above, which keeps `\ ` inside a zone:
  // a LEADING or INTERIOR thin space is real layout this corpus depends on (the
  // piecewise p.d.f. definitions are laid out with runs of them) and converts
  // fine. Only the trailing position is both useless and harmful.
  out = out.replace(/(?:\\[ \t])+(?=\\\))/g, "");

  // A FILL-IN-THE-BLANK TYPESET AS A MATH ZONE — `\(_____\)`.
  //
  // Inside math `_` is the SUBSCRIPT operator, so a run of them is not meaningful
  // LaTeX. KaTeX tolerates it and the OMML converter does not, so it renders fine
  // on the card and ships as raw LaTeX in a teacher's downloaded Word answer key
  // — the same invisible-until-Word shape as the trailing thin space.
  //
  // 15 stems across 7 Chemistry chapters; ZERO in the shipped Maths and Physics
  // corpora, which write the blank as plain underscores in prose. This restores
  // that form. Keyed on a zone that is ONLY underscores (escaped or not), so a
  // genuine subscript such as `\(\Delta n_{g}\)` is untouched.
  out = out.replace(/\\\(\s*((?:\\?_)+)\s*\\\)/g, "$1");

  // A COMPILATION SECTION HEADING SWALLOWED BY THE STEM BEFORE IT.
  //
  // The Chemistry compilation groups its questions under its own bold headings
  // ("**II. Colligative Property Calculations**"). Where one follows the previous
  // section's last question with no blank line, pandoc keeps it in that
  // paragraph and it lands at the END of that question's stem — 14 rows across 6
  // chapters, all Chemistry. No board paper prints an LWS heading, so this is
  // definitively ours; and no gate can see it, because the fragment is perfectly
  // well-formed markdown and is wrong only in that it is not the question.
  //
  // Reported independently by three authoring agents on three different chapters
  // before it was measured, which is what makes it a rule rather than fourteen
  // hand-written repairs.
  //
  // Matches to the END OF THE STRING rather than to the heading's own closing
  // `**`, because a heading CONTAINING MATH has its bold broken into several runs
  // by pandoc — an end-anchored `[^*]` pattern reported one such chapter clean
  // while an agent that had read the row reported the defect. The discriminators
  // are an UPPERCASE roman numeral (sub-items in this source are lowercase and
  // parenthesised) followed by a Title Case word, and at least THREE characters
  // of real content ahead of it — so a field that is ONLY a heading is left
  // intact, since that is a different defect and emptying it would hide it.
  //
  // Three, not more, because this also runs on OPTION text, where the real
  // content is naturally short: a Solid State option is `\(\text{NiO}\)` with a
  // heading glued after it, and any floor above 14 leaves it broken. And three,
  // not one, because a floor of 1 lets the prefix absorb a LEADING SPACE and a
  // heading-only field then matches after all — which I had reasoned was
  // impossible at every floor, and is not. Measured across all five real shapes.
  out = out.replace(/^([\s\S]{3,}?)\s*\*\*\s*[IVX]{1,5}\.\s+[A-Z][\s\S]*$/, "$1");

  return collapseSpaces(out);
}

/**
 * Strip pandoc's blockquote markers.
 *
 * pandoc renders the compilation's indented option lists as BLOCKQUOTES, so
 * every wrapped line inside one begins "> ". Left alone these leak into the
 * content — and in a matrix they land INSIDE `\begin{bmatrix}`, where they
 * break it outright (four options of one Matrices row carried them).
 *
 * ⚠ MUST run on the RAW multi-line block, before any newline collapsing. The
 * marker is only identifiable by sitting at the START OF A LINE; once the lines
 * are joined it is indistinguishable from a genuine `x > 3`, and a rule loose
 * enough to catch it there eats real inequalities. That is not hypothetical —
 * the first attempt at this did exactly that.
 */
export function stripBlockquote(text: string): string {
  return text.replace(/^[ \t]*>[ \t]?/gm, "");
}

/**
 * Cut a leaked option run off the end of a stem.
 *
 * Applied ONLY when a question's real options are supplied from the adjudicated
 * defects ledger. Such a question is there precisely because its printed option
 * block failed to parse — e.g. one carries the labels (a)(b)(b)(c), a duplicated
 * "b" and no "d" — so the run stays glued to the stem and renders in full on the
 * card. Restricted to that case rather than run everywhere: a lone "(a)" is
 * ordinary prose, and a stem that DID parse has nothing left to strip.
 */
export function stripLeakedOptionRun(stem: string): string {
  const labels = [...stem.matchAll(/\\?\(\s*([a-d])\s*\\?\)/g)];
  if (labels.length < 3) return stem;
  const start = labels.find((m) => m[1] === "a");
  if (!start) return stem;
  const after = labels.filter((m) => m.index! > start.index!).map((m) => m[1]);
  if (new Set(after).size < 2) return stem;
  return collapseSpaces(stem.slice(0, start.index!).replace(/[\s\\>]+$/, ""));
}

/** pandoc renders an embedded picture as `![](media/imageN.png){width=... }`. */
const IMAGE = /!\[[^\]]*\]\(media\/([^)]+)\)(?:\{[^}]*\})?/;

/**
 * The compilation's own prose description of a diagram, e.g.
 * "(Circuit diagram depicting S1 and S2 in parallel, connected to S3 in series)".
 */
// The `(?:\\\)|[^)])*` body is load-bearing: these descriptions CONTAIN math
// zones, so a plain `[^)]*` stops at the `\)` closing "\(S_{1}\)" and leaves the
// tail of the description behind.
const DIAGRAM_DESCRIPTION =
  /\s*\((?:Circuit|circuit|Diagram|diagram|Graph|graph|Figure|figure)(?:\\\)|[^)])*\)\s*\.?/g;

/**
 * Separate an embedded image from a stem.
 *
 * ⚠ When an image IS present the compilation's prose description of it is
 * DROPPED, because every one that could be checked is WRONG. All four circuit
 * descriptions in the pilot chapter were compared against the extracted PNGs on
 * 2026-08-13 and none survived — one calls a series pair parallel, one is
 * self-contradictory, and two describe a different topology from the one drawn
 * (data/defects.json → circuitDescriptionsWrong). They are the compiler's
 * reading of the diagram, never the board's printed text, so shipping one
 * alongside the real figure would put a false claim next to the truth.
 *
 * When there is NO image the description is KEPT: it is then the only thing
 * making the question answerable, and a suspect description beats none.
 */
export function splitImage(block: string): { text: string; image?: string } {
  const m = IMAGE.exec(block);
  if (!m) return { text: block };
  const text = block.replace(IMAGE, " ").replace(DIAGRAM_DESCRIPTION, " ");
  return { text: collapseSpaces(text), image: m[1] };
}

/**
 * Join a question onto one line — EXCEPT across a GFM pipe table.
 *
 * Everything else in this corpus is a single paragraph, so collapsing is right.
 * But a pipe table IS its line structure: flattened onto one line the `|---|`
 * row stops being a separator, GFM refuses to build a table, and the whole thing
 * ships as raw pipes. Five probability-distribution tables were doing exactly
 * that — and the defect was invisible until the extractor was switched to emit
 * pipe tables at all, because before that they were a dashed grid.
 *
 * Lines are therefore collapsed in RUNS: a line starting with `|` is a table row
 * and keeps its own newline, fenced off from the prose either side of it.
 */
function collapseSpaces(s: string): string {
  const isRow = (l: string) => l.trim().startsWith("|");
  const out: string[] = [];
  let prose: string[] = [];
  const flushProse = () => {
    // Trim each line BEFORE joining, and drop the blanks. The rule this replaced
    // was `/\s*\n\s*/ -> " "`, which consumed the whitespace either side of the
    // break; joining raw lines instead leaves a double space wherever a line had
    // a trailing one, and that silently invalidated every adjudicated stem.
    const t = prose.map((l) => l.trim()).filter(Boolean).join(" ").replace(/[ \t]{2,}/g, " ").trim();
    if (t) out.push(t);
    prose = [];
  };
  for (const line of s.split("\n")) {
    if (isRow(line)) {
      flushProse();
      out.push(line.trim());
    } else {
      prose.push(line);
    }
  }
  flushProse();
  return out.join("\n").replace(/\n{2,}/g, "\n").replace(/[ \t]{2,}/g, " ").trim();
}

// ───────────────────────────── record building ─────────────────────────────
//
// Deliberately NOT reusing scripts/stateboard/lib.ts's buildRecords. That one
// requires a `bucket` ("solved" | "exercise-mcq" | "exercise-subjective") which
// drives the /board reader's `section_*` book-structure axis — and a board PYQ
// has no place in the book's structure at all. Forcing a bucket onto these rows
// would put them inside a textbook section they were never printed in, which is
// exactly the axis confusion CLAUDE.md's "content-organisation axis" wall warns
// about. PYQ rows carry the CONCEPTUAL axis (subtopic) only.

import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";
import type { ParsedRowPayload, OptionLabel } from "../../src/lib/upload/validate";

const DIFFICULTIES = ["EASY", "MODERATE", "HARD"] as const;
type Difficulty = (typeof DIFFICULTIES)[number];

export type PyqQuestion = {
  /** Stable provenance ref, e.g. "logic-12-pyq#5". Unique within the chapter. */
  ref: string;
  /** The board's own label → questions.question_number, e.g. "Q. 1. (A) i.". */
  questionNumber: string;
  pyqYear: number;
  /** null when the tag records no month — 2024 and 2025 do not. Never guessed. */
  pyqMonth: string | null;
  format: "mcq" | "subjective";
  subtopic: string;
  difficulty: string;
  stem: string;
  options?: { label: string; text: string }[];
  /** The DERIVED key. Absent is a real state: a board paper ships no key, so an
   *  MCQ nobody has answered yet must stay unanswered rather than be guessed. */
  answer?: string;
  /** MCQ: the worked derivation. Subjective: the model answer itself. */
  solution?: string;
  /** Filename in the docx's word/media/, attached separately after commit. */
  image?: string;
  /** A KNOWN MCQ whose option list the compilation lost. It reads as
   *  free-response, which is the wrong format, so the build REFUSES it. */
  pendingMcq?: string;
  /** The chapter this question actually belongs to, when the compilation filed
   *  it elsewhere. Both known cases were CAUSED by a transcription defect. */
  chapterOverride?: string;
};

export type PyqChapter = { chapterName: string; subjectName: string; subtopics: string[] };
export type Flag = { ref: string; reason: string };

export function buildPyqRecords(
  chapter: PyqChapter,
  questions: PyqQuestion[],
  /** Chapters a row may be RELOCATED into, by the id its `chapterOverride` names.
   *  A relocated row commits under that chapter's name and is validated against
   *  ITS axis — the compilation files a question by the section it was typed
   *  into, so a stem that acquired an integral sign from its neighbour acquired
   *  that neighbour's chapter too. */
  relocationTargets: Record<string, PyqChapter> = {},
): { rows: ParsedRowPayload[]; flags: Flag[] } {
  const rows: ParsedRowPayload[] = [];
  const flags: Flag[] = [];
  const seen = new Set<string>();
  let sourceRow = 0;

  for (const q of questions) {
    sourceRow++;
    if (seen.has(q.ref)) throw new Error(`duplicate ref "${q.ref}"`);
    seen.add(q.ref);
    const home = q.chapterOverride ? relocationTargets[q.chapterOverride] : chapter;
    if (!home) {
      throw new Error(`${q.ref}: relocated to "${q.chapterOverride}", which was not supplied`);
    }
    if (!home.subtopics.includes(q.subtopic)) {
      throw new Error(`${q.ref}: subtopic "${q.subtopic}" not one of [${home.subtopics.join(", ")}]`);
    }
    const difficulty = q.difficulty.trim().toUpperCase() as Difficulty;
    if (!DIFFICULTIES.includes(difficulty)) {
      throw new Error(`${q.ref}: difficulty "${q.difficulty}" not EASY|MODERATE|HARD`);
    }
    // Shipping a known MCQ as free-response is a silent format downgrade: the
    // student is asked to write an answer to a question that was set with four
    // options, and nothing in the row records that anything is missing.
    if (q.pendingMcq) {
      throw new Error(
        `${q.ref}: known MCQ ${q.pendingMcq} whose options are still lost — repair it in ` +
          `data/defects.json (mcqOptionsLost) or drop the row. Refusing to ship it as subjective.`,
      );
    }

    const base = {
      sourceRow,
      questionNumber: q.questionNumber,
      subjectName: home.subjectName,
      chapterName: home.chapterName,
      subtopicName: q.subtopic,
      text: q.stem,
      difficulty,
      ...(q.solution ? { solution: q.solution } : {}),
    };

    if (q.format === "subjective") {
      rows.push({
        ...base,
        questionFormat: "subjective",
        options: [],
        // Namespaced so a subjective row can never collide with an MCQ carrying
        // the same stem, and computed WITHOUT the solution so backfilling an
        // answer does not move the row's identity.
        contentHash: subjectiveContentHash(q.stem, null),
      });
      continue;
    }

    const opts = q.options ?? [];
    if (opts.length !== 4) throw new Error(`${q.ref}: mcq needs exactly 4 options, has ${opts.length}`);
    if (q.answer && !opts.some((o) => o.label === q.answer)) {
      throw new Error(`${q.ref}: answer "${q.answer}" names no option`);
    }
    if (!q.answer) flags.push({ ref: q.ref, reason: "no derived key — row commits with no correct option" });

    rows.push({
      ...base,
      questionFormat: "mcq",
      options: opts.map((o) => ({
        label: o.label as OptionLabel,
        text: o.text,
        isCorrect: o.label === q.answer,
      })),
      // The project's MCQ hash INCLUDES the answer, by design and bank-wide. So
      // correcting a key later orphans the row on re-commit (delete by
      // source_file first) — but the property is worth the cost here: two boards
      // that set the same question with DIFFERENT keys stay two rows, and the
      // conflict is visible instead of being silently deduped into one.
      // An unanswered MCQ hashes with "" and re-hashes once a key is derived.
      contentHash: contentHash(q.stem, opts.map((o) => o.text), q.answer ?? ""),
    });
  }
  return { rows, flags };
}

/**
 * Split a chapter's questions by SITTING.
 *
 * `pyq_year` / `pyq_month` are set per commitStaged CALL, not per row, and this
 * corpus spans ten sittings — so the commit runs once per group. One call for
 * the whole chapter would stamp every question with a single year.
 */
export function groupBySitting(
  questions: PyqQuestion[],
): { year: number; month: string | null; questions: PyqQuestion[] }[] {
  const groups = new Map<string, { year: number; month: string | null; questions: PyqQuestion[] }>();
  for (const q of questions) {
    // A null month is its OWN group, not folded into a named one: the 2024 and
    // 2025 tags record no month and inventing Feb-or-March would be a fabrication.
    const key = `${q.pyqYear}|${q.pyqMonth ?? ""}`;
    let g = groups.get(key);
    if (!g) groups.set(key, (g = { year: q.pyqYear, month: q.pyqMonth, questions: [] }));
    g.questions.push(q);
  }
  return [...groups.values()].sort(
    (a, b) => a.year - b.year || (a.month ?? "").localeCompare(b.month ?? ""),
  );
}
