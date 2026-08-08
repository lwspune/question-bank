/**
 * Pure parsers for the NDA Maths mock-test-series ingestion (pandoc lane).
 * Unit-tested in tests/nda-mock-parse.test.ts. No IO here.
 *
 * The ten papers come from three different authoring houses and their DOCX
 * conventions disagree on nearly everything — numbering (`1.  `, `1\. `,
 * `Q.1) `, `**1.**`), option labels (`(a)`, `(A)`, `a.`), where the answer key
 * lives (a tail ANSWER KEYS block, an inline `38.(c)` on the solution, or a
 * `**SOL. (a)**` line), and whether questions carry a shared "Direction" /
 * "Passage" context. Rather than one pipeline per house, these helpers accept
 * the union of the conventions and are exercised against a fixture from each.
 */

export type QuestionBlock = { number: number; body: string };
export type ParsedOption = { label: "A" | "B" | "C" | "D"; text: string };
export type DirectionSet = {
  from: number;
  to: number;
  context: string;
  /**
   * Present when the block itself prints the four answer codes (the
   * assertion-reason pattern), in which case the member questions carry no
   * options of their own and inherit these.
   */
  options?: ParsedOption[];
};

const LABELS = ["A", "B", "C", "D"] as const;

/**
 * A question start: optional bold/blockquote wrapper, optional `Q.`, the
 * number, an optional pandoc backslash-escape, then `.` or `)`.
 *
 * Two conventions, and the trailing punctuation rule differs between them:
 *  - `Q.84 ...`  — the `Q.` prefix already marks it, so `.`/`)` is OPTIONAL
 *    (Mock 6 writes `Q.84 ` and `Q.85. ` on consecutive lines);
 *  - `84. ...`   — a bare number, so `.`/`)` is REQUIRED, otherwise any line
 *    opening with a numeral would be read as a question start.
 * Deliberately NOT anchored on a following space — several papers write
 * `Q.2)The number` and `38.(c)` with none.
 */
// Leading context: optional blockquote markers, then AT MOST 3 spaces. The
// 3-space cap is load-bearing, not cosmetic: several papers write a question's
// internal sub-list ("1. AB is defined / 2. BA is defined") indented by four,
// and a permissive \s* would read those as new questions and truncate the paper.
const Q_LEAD = String.raw`(?:>[ \t]?)*[ \t]{0,3}`;
// NB: no `[ \t]*` between the bold marker and the number — that would re-admit
// the very 4th space Q_LEAD is capped to exclude, defeating the indent guard.
// The trailing `(?![0-9])` rejects a decimal: a frequency table's class interval
// ("5.5 - 10.5") is otherwise indistinguishable from a numbered start, and one
// such row inside a solution truncated the whole paper.
const Q_START_SRC =
  Q_LEAD +
  String.raw`\**(?:Q[ \t]*\.?[ \t]*(\d{1,3})[ \t]*\\?[ \t]*[.)]?|(\d{1,3})[ \t]*\\?[ \t]*[.)])(?![0-9])[ \t]*\**[ \t]*`;

/**
 * A Directions/Passage header. A question's body must be CUT here: the header
 * introduces the NEXT run of questions but is physically printed between two of
 * them, so it lands inside the preceding question's block — and when the block
 * carries answer codes (the assertion-reason pattern) those codes beat the real
 * options under "last chain wins", silently replacing them.
 *
 * How the range is introduced varies per paper, and every variant missed here
 * costs the same two things — the passage stays glued onto the PRECEDING
 * question's last option, and the questions it introduces get no context at all:
 *   `(Q. Nos. 84-85)`  most papers
 *   `(Ex. Nos. 9-10)`  Mock 7 — `Ex.`, not `Q.`
 *   `Q.(75-77) :`      Mock 8 — no `Nos.` at all, and the range's own paren
 *                      sits AFTER the `Q.` rather than before it
 * So `Nos.` is optional and a paren is allowed on either side. The enclosing
 * pattern still requires the word Direction/Passage AND a full `n-m` range, so
 * loosening this cannot make ordinary prose match.
 */
const NOS_RANGE = String.raw`\(?\s*(?:Q|Ex)\s*\.?\s*(?:Nos?\s*\.?)?\s*\(?`;
const DIRECTIONS_HEADER = new RegExp(
  String.raw`^[>\s]*\**\s*(?:Direction[s]?|Passage(?:\s+[IVXLC]+)?)[\s:*_—–-]*` + NOS_RANGE,
  "im",
);
const Q_START = new RegExp("^" + Q_START_SRC);

/** The number captured by Q_START, whichever alternative matched. */
function startNumber(m: RegExpExecArray): number {
  return Number(m[1] ?? m[2]);
}

/** The tail answer-key heading, in the several spellings the papers use. */
const KEY_HEADING = /^.*\bANSWER\s*KEYS?\b.*$/im;

/**
 * Recover a question whose whole text landed in an IMAGE ALT attribute.
 *
 * Mock 10 Q108 is emitted by pandoc as
 *   `![108. The perpendicular distance of A(1,4,-2) from BC ...](media/image28.emf)`
 * — the question was an embedded object whose caption carries the text, so the
 * numbering scan never saw it and the question vanished entirely.
 *
 * Deliberately narrow: only an alt that STARTS with a question number is
 * unwrapped. Decorative images carry a filesystem path as their alt (Mock 1's
 * banner is `C:\Users\...\WhatsApp Image...`), and unwrapping those would inject
 * junk into the question flow.
 */
export function unwrapNumberedImageAlt(md: string): string {
  return md.replace(/!\[((\d{1,3})\.\s[^\]]*)\]\([^)]*\)/g, (_m, alt: string) => alt);
}

/**
 * Split a paper's markdown into per-question blocks.
 *
 * Two hazards this guards against:
 *  - the boilerplate "Instructions" ordered list at the top restarts at 1 and
 *    would otherwise be read as questions 1-4;
 *  - the tail ANSWER KEYS block restarts at 1 and would otherwise overwrite
 *    every question body with a bare letter.
 * Both are handled by cutting the text at the key heading first, then keeping
 * only the LONGEST ascending run of numbers.
 */
export function splitQuestionBlocks(md: string): QuestionBlock[] {
  const src = unwrapNumberedImageAlt(md);
  const cut = src.search(KEY_HEADING);
  const body = cut >= 0 ? src.slice(0, cut) : src;

  const lines = body.split("\n");
  const starts: { number: number; line: number }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = Q_START.exec(lines[i]);
    if (!m) continue;
    const n = startNumber(m);
    if (n < 1 || n > 200) continue;
    starts.push({ number: n, line: i });
  }
  // A document with NO recognisable question start must return early: the
  // subsequence reconstruction below walks `prev` until it reads -1, and on an
  // empty array `prev[0]` is `undefined` — which is not -1, so the walk never
  // terminates and unshifts `undefined` forever. That is a HANG, not an
  // exception, and it is what Mock 8's solution supplement hit: its headings are
  // "Solution 8", which `Q_START` correctly declines to match.
  if (!starts.length) return [];

  // Choose the question run as the LONGEST INCREASING SUBSEQUENCE of the
  // numbers found. Two weaker rules were tried and both lost real questions:
  //  - "longest ascending RUN" treats interior noise as a boundary, so a stray
  //    number inside one solution split 1..120 into 1..113 and 114..120 and the
  //    tail was discarded;
  //  - a greedy forward scan takes the noise itself (1,2,9 beats 1,2,3,4).
  // A subsequence skips noise without ending the sequence. Ties are broken
  // towards LATER elements, so the boilerplate "Instructions" list (1..4) loses
  // to the question body that follows it.
  const dp = starts.map(() => 1);
  const prev = starts.map(() => -1);
  for (let i = 0; i < starts.length; i++) {
    for (let j = 0; j < i; j++) {
      // `>=` biases to the latest valid predecessor
      if (starts[j].number < starts[i].number && dp[j] + 1 >= dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
  }
  let best = 0;
  for (let i = 0; i < starts.length; i++) if (dp[i] >= dp[best]) best = i;
  const run: typeof starts = [];
  for (let i = best; i !== -1; i = prev[i]) run.unshift(starts[i]);

  return run.map((s, i) => {
    const end = i + 1 < run.length ? run[i + 1].line : lines.length;
    const first = lines[s.line].replace(Q_START, "");
    let rest = lines.slice(s.line + 1, end);
    // Stop at a Directions/Passage header — it belongs to the NEXT questions.
    const cutAt = rest.findIndex((l) => DIRECTIONS_HEADER.test(l));
    if (cutAt >= 0) rest = rest.slice(0, cutAt);
    return { number: s.number, body: [first, ...rest].join("\n").trim() };
  });
}

/**
 * An option label at a line start, or mid-line as the SECOND option of a
 * two-per-line pair.
 *
 * The label must be preceded by start-of-line, whitespace, or the close of the
 * previous option's math/bracket (`$` or `)`): the source frequently glues the
 * next label straight onto the previous option — "... + c$(d) $\frac{\pi}{2}"
 * — and requiring whitespace lost those questions entirely. `(` is deliberately
 * NOT allowed, so a function call like f(a) cannot open an option run.
 *
 * The parens may be backslash-escaped (`\(a\)`): pandoc escapes a line-initial
 * literal paren, so the first option of a block frequently arrives that way
 * while its siblings stay plain. The a->b->c->d chain requirement below is what
 * keeps this from mistaking a genuine one-letter math zone for a label.
 */
function optionLabelRe(permissive = false): RegExp {
  // NOTHING is consumed after the label. The boundary character is required
  // BEFORE a label, so anything eaten after one is stolen from the next label's
  // boundary — which silently truncated option runs twice: `**(a)** … **(b)**`
  // (trailing `*` eaten) and `(c) Only (A) and (B) (d) …` (trailing space
  // eaten, so `(d)` never matched). Leading whitespace/emphasis on the option
  // TEXT is trimmed downstream instead.
  // The bare `x.` form is restricted to LOWERCASE (Mock 10's "a. Zero b. One"),
  // because an uppercase "A." occurs constantly in assertion-reason prose
  // ("…and R explains A.") and matched there as a phantom label.
  // `([a-d])\\?[.)]` allows pandoc's escaped `a\.` — it escapes a line-initial
  // `a.` so it is not read as an ordered-list marker, which makes the FIRST
  // label of each option line escaped while its siblings stay plain (Mock 10) —
  // and a bare `a)` with NO opening paren (Mock 6: "a)  Only 1 b) Only II").
  //
  // `permissive` drops the required boundary, for a source that glues a label
  // straight onto the previous option's last word ("...negative(b) Have..."). It
  // is only ever used as a RETRY after the strict pass finds no option run, so
  // an ordinary `f(a)` in a stem cannot start a chain while a strict parse is
  // still possible.
  const lead = permissive ? String.raw`(^|[\s\S])` : String.raw`(^|[\s$)*_])`;
  return new RegExp(lead + String.raw`(?:\\?\(([a-dA-D])\\?\)|([a-d])\\?[.)](?=\s))`, "g");
}

/**
 * A Mock-10 solution marker, in the two spellings that paper uses:
 *   `**SOL. (a)**` / `SOL. (c)` / `Sol.(b)`, and
 *   a bare BOLDED letter `**(a)**` with the word SOL omitted entirely.
 * The second form is only safe because it is applied to COMBINED papers, whose
 * option labels are `a.`-style — a bolded parenthesised letter there cannot be
 * an option label. Applying it to the other papers would collide with Mock 2's
 * `**(a)** Both A and R…` assertion-reason codes.
 */
// Three forms, tried in this order. The first allows a short run of junk between
// `SOL` and the letter, because Mock 10 sometimes wraps the letter in a math
// zone: `SOL. \(\text{~(d)}\)`. The letter must sit ALONE inside its parens, so
// ordinary algebra like `(x - 13)` or `(a + b)` cannot be mistaken for it.
const SOL_WITH_LETTER = String.raw`\*{0,2}\s*SOL\s*\.?[\s\S]{0,40}?\(\s*([a-dA-D])\s*\)[}\s*\\)]*`;
const SOL_BOLD_LETTER = String.raw`\*\*\s*\(\s*([a-dA-D])\s*\)\s*\*\*`;
const SOL_BARE = String.raw`\*{0,2}\s*SOL\s*\.?\s*\*{0,2}`;
const SOL_MARKER = new RegExp(`${SOL_WITH_LETTER}|${SOL_BOLD_LETTER}|${SOL_BARE}`, "i");

/**
 * Parse a block from a COMBINED question+solution document (Mock 10).
 *
 * An option's text runs to the end of its block, so in a combined document the
 * whole worked solution is swallowed by the LAST option. The fix is to parse the
 * options first and then look for the solution marker INSIDE that last option's
 * text — never in the raw block. Searching the raw block instead truncated it
 * before the options entirely: Mock 10 switches from `a.`-style labels in its
 * first half to `(a)`-style in its second, and a bolded `**(a)**` option label
 * is indistinguishable from a bolded answer marker until the option run is known.
 */
export function parseCombinedBlock(body: string): {
  stem: string;
  options: ParsedOption[];
  solution: string | null;
  answer: string | null;
  /**
   * True when the raw block spans MORE THAN ONE question — the numbering scan over-extended it
   * because the source failed to number the next question (Mock 10 numbers two
   * questions "96", so one loses its number and is absorbed here).
   *
   * Reported rather than guessed at. `parseOptionsFromBlock` deliberately takes
   * the LAST option chain, so a fused block silently hands the FIRST question
   * its NEIGHBOUR's options, answer and worked solution — a wrong answer that
   * looks entirely well-formed. No heuristic can reliably find the seam (the
   * boundary between one solution's tail and the next stem is not marked), so
   * the honest move is to fail loudly and let an errata carry the repair.
   */
  fused: boolean;
} {
  const { stem, options } = parseOptionsFromBlock(body);
  // Fused test: does the STEM still contain a complete a->b->c->d run of its own?
  // `parseOptionsFromBlock` returns the LAST chain and everything before it as
  // the stem, so a stem that parses is proof the block held a second question.
  //
  // Two weaker tests were tried first. Counting solution markers with the full
  // SOL_MARKER reported 5 on EVERY block, because SOL_BOLD_LETTER is
  // character-identical to a bolded option label and each block has four.
  // Counting only the SOL-anchored forms still over-reported (6 blocks), because
  // SOL_WITH_LETTER tolerates 40 characters of junk before its letter and so
  // matches again inside a worked solution that happens to write "(a)".
  let fused = false;
  try {
    parseOptionsFromBlock(stem);
    fused = true;
  } catch {
    fused = false;
  }
  const last = options[options.length - 1];
  const m = SOL_MARKER.exec(last.text);
  if (!m) return { stem, options, solution: null, answer: null, fused };
  return {
    stem,
    options: [...options.slice(0, -1), { ...last, text: last.text.slice(0, m.index).trim() }],
    solution: last.text.slice(m.index + m[0].length).trim() || null,
    answer: ((m[1] ?? m[2] ?? "") as string).toUpperCase() || null,
    fused,
  };
}

/**
 * Split a question block into its stem and exactly four options.
 * Throws when four cannot be found — that means a real extraction defect
 * (a lost option, a merged block) that must be fixed at source, not guessed.
 */
export function parseOptionsFromBlock(block: string): {
  stem: string;
  options: ParsedOption[];
} {
  // Strip pandoc's hard-line-break marker (a lone trailing backslash) but NOT
  // a LaTeX row separator `\\`, which also sits at end of line inside every
  // matrix and determinant. The negative lookbehind is what distinguishes them.
  const flat = block.replace(/(?<!\\)\\$/gm, "").replace(/\r/g, "");

  type Hit = { idx: number; end: number; letter: string };

  const findChain = (permissive: boolean): Hit[] | null => {
    // Find the first label that begins the option run: the earliest `(a)`/`a.`
    // that is followed (later in the text) by b, c and d in order.
    const re = optionLabelRe(permissive);
    const hits: Hit[] = [];
    let m: RegExpExecArray | null;
    while ((m = re.exec(flat)) !== null) {
      const letter = (m[2] ?? m[3]).toLowerCase();
      // Start the label AFTER the boundary character: when the boundary is `$`
      // or `)` it is the last character of the PREVIOUS option and must stay
      // with it, otherwise "\(3\)" is truncated to "\(3\".
      hits.push({ idx: m.index + m[1].length, end: re.lastIndex, letter });
    }

    // Walk hits looking for a strict a→b→c→d chain; take the LAST such chain
    // start so a stray "(a)" earlier in the stem is skipped.
    let chain: Hit[] | null = null;
    for (let i = 0; i < hits.length; i++) {
      if (hits[i].letter !== "a") continue;
      const want = ["b", "c", "d"];
      const picked = [hits[i]];
      let w = 0;
      for (let j = i + 1; j < hits.length && w < want.length; j++) {
        if (hits[j].letter === want[w]) {
          picked.push(hits[j]);
          w++;
        }
      }
      if (w === want.length) chain = picked; // keep searching; later chain wins
    }
    return chain;
  };

  // Strict first; only fall back to the boundary-less scan when the strict pass
  // finds no run at all, so a permissive match can never displace a clean one.
  const chain = findChain(false) ?? findChain(true);
  if (!chain) {
    throw new Error(`block does not contain four options (a)-(d):\n${block.slice(0, 160)}`);
  }

  let stem = flat
    .slice(0, chain[0].idx)
    .replace(/\s*\\?\s*$/, "")
    .trim();
  // Drop an UNPAIRED trailing `**`. Where the source bolds its labels
  // (`**(a)** ... **(b)**`) the label regex consumes `(a)` but not the emphasis
  // that opened before it, so the opening `**` is left dangling on the stem and
  // renders as two literal asterisks (36 of Mock 10's questions, whose second
  // half switches to this style). Only removed when the count is ODD, so a stem
  // that legitimately ends in a closed bold span is untouched.
  if ((stem.match(/\*\*/g) ?? []).length % 2 === 1) {
    stem = stem.replace(/\s*\*\*\s*$/, "").trim();
  }
  const options: ParsedOption[] = chain.map((h, i) => {
    const end = i + 1 < chain!.length ? chain![i + 1].idx : flat.length;
    return {
      label: LABELS[i],
      // Trailing `**` is the closing half of the label's own emphasis
      // (`**(a)** text **(b)**`), not part of the option.
      text: flat
        .slice(h.end, end)
        .replace(/\s+/g, " ")
        .replace(/^[*_\s]+|[*_\s]+$/g, "")
        .trim(),
    };
  });
  return { stem, options };
}

/** Read the tail `ANSWER KEYS` block. Returns an empty map when absent. */
export function parseTailAnswerKey(md: string): Map<number, string> {
  const cut = md.search(KEY_HEADING);
  if (cut < 0) return new Map();
  const tail = md.slice(cut);
  const out = new Map<number, string>();
  const re = new RegExp(
    "^" +
      Q_LEAD +
      String.raw`\**[ \t]*(\d{1,3})[ \t]*\\?[ \t]*[.)][ \t]*\**[ \t]*\(?[ \t]*([a-dA-D])[ \t]*\)?[ \t]*\**[ \t]*$`,
    "gm",
  );
  let m: RegExpExecArray | null;
  while ((m = re.exec(tail)) !== null) {
    out.set(Number(m[1]), m[2].toUpperCase());
  }
  return out;
}

/**
 * Read answers stated inline on a solution: `38.(c)`, `39\. (b)`, or Mock 10's
 * `**SOL. (a)**` (which attaches to the most recent question number).
 */
export function parseInlineAnswers(md: string): Map<number, string> {
  const out = new Map<number, string>();
  const lines = md.split("\n");
  let last: number | null = null;

  const lead = new RegExp("^" + Q_START_SRC + String.raw`\s*\(\s*([a-dA-D])\s*\)`);
  const sol = /\*{0,2}SOL\s*\.?\s*\*{0,2}\s*\(\s*([a-dA-D])\s*\)/i;

  for (const ln of lines) {
    const l = lead.exec(ln);
    if (l) {
      const n = startNumber(l);
      out.set(n, l[3].toUpperCase());
      last = n;
      continue;
    }
    const n = Q_START.exec(ln);
    if (n) last = startNumber(n);
    const s = sol.exec(ln);
    if (s && last !== null && !out.has(last)) out.set(last, s[1].toUpperCase());
  }
  return out;
}

/**
 * Split a solution document into per-question bodies, dropping a leading
 * answer letter (that is captured separately by parseInlineAnswers, and
 * repeating it in the body would read oddly on the card).
 */
export function parseSolutionBlocks(md: string): Map<number, string> {
  const blocks = splitQuestionBlocks(md);
  const out = new Map<number, string>();
  for (const b of blocks) {
    out.set(b.number, b.body.replace(/^\s*\(\s*[a-dA-D]\s*\)\s*/, "").trim());
  }
  return out;
}

/**
 * Parse a SUPPLEMENT solution file, which is formatted nothing like a paper's
 * main solution document.
 *
 * Mock 8's supplement heads each entry `Solution 8` / `Solution -- 56` — prose,
 * not the `8.` numbering `Q_START` looks for — so `parseSolutionBlocks` finds no
 * candidate at all and returns nothing. It then closes with a small answer key
 * (`Answer key of 1 , 2 & 3` / `Q. 1 -- b`), which is the ONLY source for those
 * three questions' letters: the main solution document omits them.
 *
 * Kept as its own function rather than teaching `Q_START` about the word
 * "Solution": that pattern drives block splitting for all ten papers, and a
 * document whose bodies happen to contain the word would silently re-split.
 */
export function parseSupplementSolutions(md: string): {
  solutions: Map<number, string>;
  answers: Map<number, string>;
} {
  const solutions = new Map<number, string>();
  const answers = new Map<number, string>();
  const lines = md.split("\n");

  // `Solution 8`, `Solution -- 56`, `SOL. 38` — optionally emphasised, and the
  // dash run is pandoc's rendering of an en-dash separator.
  const head = /^[>\s]*\**\s*(?:Solutions?|SOL)\s*\**\s*[-–—:.]*\s*\**\s*(\d{1,3})\s*\**\s*\\?\s*$/i;
  // `Q. 1 -- b`, `Q. 2- b`, `Q. 3 - (c)`
  const keyLine =
    /^[>\s]*\**\s*Q\s*\.?\s*(\d{1,3})\s*\**\s*[-–—:.]*\s*\(?\s*([a-dA-D])\s*\)?\s*\**\s*\\?\s*$/;

  // The heading that introduces the tail key ("Answer key of 1 , 2 & 3"). It
  // closes the preceding solution: without this, Mock 8's Q56 body ended
  // "...Max. Volume = 4pi/(3 sqrt3) R^3 Answer key of 1 , 2 & 3".
  const keyHeading = /^[>\s]*\**\s*Answer\s*keys?\b/i;

  let current: number | null = null;
  let buf: string[] = [];
  const flush = () => {
    if (current !== null) solutions.set(current, buf.join("\n").trim());
    buf = [];
  };

  for (const ln of lines) {
    if (keyHeading.test(ln)) {
      flush();
      current = null;
      continue;
    }
    const h = head.exec(ln);
    if (h) {
      flush();
      current = Number(h[1]);
      continue;
    }
    const k = keyLine.exec(ln);
    if (k) {
      // An answer line closes the preceding solution; it is a key, not body.
      answers.set(Number(k[1]), k[2].toUpperCase());
      flush();
      current = null;
      continue;
    }
    if (current !== null) buf.push(ln);
  }
  flush();

  // A heading with an empty body carries no information and would overwrite
  // nothing usefully — drop it so `extract.ts` can still report the gap.
  for (const [n, body] of [...solutions]) if (!body) solutions.delete(n);
  return { solutions, answers };
}

/**
 * Drop LaTeX spacing commands KaTeX does not implement.
 *
 * Word's OMML emits explicit micro-spacing, which pandoc renders as
 * `\mspace{2mu}` — a command KaTeX rejects outright, taking the whole zone down
 * with it (83 zones across Mocks 6/7/10). It carries no meaning: 2mu is about
 * 1/9 em, so removing it is visually indistinguishable and cannot change what a
 * formula says. `\mspace` never occurs in prose, so a global replace is safe.
 */
export function stripKatexUnsupported(text: string): string {
  return text.replace(/\\mspace\s*\{[^{}]*\}/g, "");
}

/**
 * Drop pandoc INLINE MARKUP that carries no content and renders literally.
 *
 * Two forms, both observed reaching the page verbatim:
 *
 *  1. `` `<!-- -->`{=html} `` — pandoc's inter-token separator, emitted to stop
 *     two adjacent inline elements merging. It shows up mid-stem as
 *     `vertex (\(\pm\)`<!-- -->`{=html}5,0)`. Pure plumbing, zero meaning.
 *  2. `{width="1.55in" height="1.59in"}` — an image's layout attributes, left
 *     behind when the image itself is dropped, so a solution reads
 *     `Then,{width="1.5549..." height="1.596..."}  tan 60 = ...`.
 *
 * Deliberately LOCAL to this pipeline rather than added to the shared
 * `stripPandocArtifacts`: that helper is consumed by five other ingestion
 * pipelines and by the `audit:text` PANDOC_ARTIFACT probe, so widening it would
 * change what that probe reports across the whole bank. If these turn out to be
 * bank-wide, promoting them is a separate, deliberate change.
 */
export function stripPandocInlineMarkup(text: string): string {
  return text
    .replace(/`<!--[\s\S]*?-->`\{=html\}/g, "")
    .replace(/\{\s*width="[^"]*"(?:\s+height="[^"]*")?\s*\}/g, "")
    .replace(DEAD_IMAGE_LINK, "")
    // Tidy ONLY the gap the removal itself leaves, never whitespace generally: a
    // blanket `[ \t]{2,} -> " "` collapse rewrote 113 of Mock 1's already-committed
    // solutions for no reader-visible gain, since HTML collapses runs of spaces
    // anyway — and that churn would have buried the handful of real repairs.
    .replace(/^[ \t]+/, "")
    .replace(/[ \t]+$/, "");
}

/**
 * A markdown image whose target is a LOCAL EXTRACTION PATH.
 *
 * `--extract-media` writes the figure to `scripts/nda-mock/out/<paper>/q/media/`
 * and rewrites the link to point there — an absolute path on this machine, which
 * resolves for no reader and renders as a broken image. 33 solutions and 2 stems
 * carry one.
 *
 * Two reasons to remove rather than keep: the link is dead either way, and the
 * path itself is a hazard — `...\scripts\nda-mock\...` contains a literal `\n`,
 * which `normalizeNewlines` turns into a real line break at the write boundary,
 * so the stored text reads `scripts` / newline / `da-mock`.
 *
 * Removing the link does NOT make a figure question answerable; a stem that says
 * "as shown in the figure above" still needs the image attached properly. That is
 * flagged for a human, not papered over here.
 */
const DEAD_IMAGE_LINK = /!\[[^\]]*\]\([^)]*[/\\](?:media|out)[/\\][^)]*\)/g;

/**
 * Repair a large operator that Word stacked and pandoc read as a BINOMIAL.
 *
 * Word writes `lim` with its limit underneath as a 2-row stack; pandoc has no
 * way to tell that from a binomial coefficient and emits
 * `\binom{\lim}{x \rightarrow \pi/6}`. That is valid LaTeX, so no validator
 * complains — it simply renders as `(lim choose x->pi/6)` in parentheses, which
 * is not what the question says. 29 zones across Mock 10.
 *
 * The second group is brace-MATCHED rather than `[^}]*`, because the limit
 * expression almost always contains its own braces (`\frac{\pi}{6}`).
 */
export function fixStackedOperators(text: string): string {
  const OPS = ["lim", "max", "min", "sup", "inf", "limsup", "liminf"];
  let out = text;
  for (const op of OPS) {
    const open = `\\binom{\\${op}}{`;
    for (let i = out.indexOf(open); i !== -1; i = out.indexOf(open, i)) {
      let depth = 1;
      let j = i + open.length;
      for (; j < out.length && depth > 0; j++) {
        if (out[j] === "{") depth++;
        else if (out[j] === "}") depth--;
      }
      if (depth !== 0) break; // unbalanced — leave it alone rather than corrupt it
      const inner = out.slice(i + open.length, j - 1);
      out = out.slice(0, i) + `\\${op}_{${inner}}` + out.slice(j);
      i += op.length + 3;
    }
  }
  return out;
}

/**
 * Undo pandoc's escaping of literal square brackets (`\[from Eq. (i) \]`).
 *
 * MUST run before `normalizeMathDelimiters`. `\[...\]` is the bank's DISPLAY
 * math delimiter, so an escaped literal bracket is indistinguishable from one —
 * and when the bracketed text itself contains a math zone the result is an
 * illegal nested zone that KaTeX refuses outright (Mock 4 Q33:
 * `\[but $x \neq \log_2(-1)$\]`). This is safe because pandoc writes genuine
 * display math as `$$...$$`, never as `\[...\]`, so every `\[` it emits is a
 * literal.
 *
 * The lookbehind protects ONLY a matrix row break immediately followed by a
 * bracket (`\\[`), where the second backslash belongs to the `\\` and the
 * bracket is math content. It deliberately does NOT exclude a preceding LETTER:
 * `\left[` / `\right]` carry no backslash before the bracket, so they were never
 * at risk — while a letter guard silently refused to unescape the common prose
 * annotation `[ ... is in III Quadrant\]` (Mock 7 Q94), leaving a stray `\]`
 * that reads as an unclosed display-math zone.
 */
export function unescapePandocBrackets(text: string): string {
  return text.replace(/(?<!\\)\\([[\]])/g, "$1");
}

/**
 * Rewrite pandoc's `$...$` / `$$...$$` math zones as the bank's `\(...\)` /
 * `\[...\]`.
 *
 * Both renderers happen to accept `$...$` (they share `parseRichSegments`), so
 * this is not about rendering — it is about (a) not seeding a second convention
 * into a corpus that is uniformly `\(...\)`, and (b) making the commit-time
 * `findLatexImbalance` guard meaningful, since it only knows `\(`/`\[` and
 * would wave every dollar-delimited row through unchecked.
 *
 * An escaped `\$` is a literal currency sign and is left alone; an unpaired `$`
 * stays literal text rather than opening a zone that never closes.
 */
export function normalizeMathDelimiters(text: string): string {
  // Written as a left-to-right scanner rather than a regex because the two
  // rules interact in a way a single pattern gets wrong:
  //  * a zone MAY span newlines (matrices are the common case here), but
  //  * a `\` immediately before the closing `$` is math content, not an escape
  //    (pandoc emits a trailing backslash inside the zone).
  // A newline-forbidding regex skipped every matrix and then paired one zone's
  // CLOSING `$` with the next zone's OPENING `$`, converting the prose between
  // them into math. Scanning makes "am I inside a zone?" explicit.
  let out = "";
  let i = 0;
  while (i < text.length) {
    // Outside a zone, `\$` is a literal currency sign.
    if (text[i] === "\\" && text[i + 1] === "$") {
      out += "\\$";
      i += 2;
      continue;
    }
    if (text[i] !== "$") {
      out += text[i];
      i += 1;
      continue;
    }
    const block = text[i + 1] === "$";
    const openLen = block ? 2 : 1;
    const needle = block ? "$$" : "$";
    // A blank line is a paragraph boundary; never let a zone cross one, so an
    // unpaired `$` degrades to literal text instead of eating the document.
    // NB: matched by REGEX, not indexOf("\n\n") — these documents are CRLF, so
    // a literal "\n\n" never occurs and the guard silently never fired. An
    // unpaired `$$` then paired with the NEXT paragraph's opener and swallowed
    // everything between (Mock 6 Q90).
    const rest = text.slice(i + openLen);
    const para = /\r?\n[ \t]*\r?\n/.exec(rest);
    const limit = para ? i + openLen + para.index : text.length;
    const close = text.indexOf(needle, i + openLen);
    if (close === -1 || close > limit) {
      out += text[i];
      i += 1;
      continue;
    }
    // A LONE trailing backslash is pandoc's hard-break marker that ended up
    // inside the zone; KaTeX rejects it outright. A DOUBLED one is a matrix row
    // separator, so the lookbehind leaves it alone.
    //
    // Iterate to a fixed point: a zone can end `...\ \` (a control space then a
    // stray break), and removing one exposes the other. One pass left half of
    // them behind.
    let inner = text.slice(i + openLen, close);
    for (;;) {
      const next = inner.replace(/(?<!\\)\\[ \t]*$/gm, "").replace(/[ \t]+$/, "");
      if (next === inner) break;
      inner = next;
    }
    // A CONTENT-FREE zone is dropped, not emitted. `$$$$` (Mock 6 Q90) would
    // otherwise become `\[\]`, and the site's own math splitter requires at
    // least one character between delimiters — so that empty opener pairs with a
    // much LATER `\]`, swallowing the prose between and handing KaTeX a zone
    // that starts with `\]`. An empty zone renders nothing anyway.
    if (inner.trim() !== "") out += block ? `\\[${inner}\\]` : `\\(${inner}\\)`;
    i = close + openLen;
  }
  return out;
}

/**
 * Mock 9 compiles questions from other exams and prints the attribution as
 * `\[**Orissa JEE 2003**\]`. Strip it from the stem (it is provenance, not
 * part of the question) and hand it back so it can be recorded separately.
 */
export function stripSourceTag(text: string): {
  text: string;
  tag: string | null;
} {
  const re = /\s*\\\[\s*\*\*([^\]*]{3,60}?)\*\*\s*\\\]\s*/;
  const m = re.exec(text);
  if (!m) return { text, tag: null };
  return {
    text: (text.slice(0, m.index) + " " + text.slice(m.index + m[0].length)).trim(),
    tag: m[1].trim(),
  };
}

/**
 * Find shared-context runs: `Direction (Q. Nos. 84-85) …` (Mock 6) and
 * `Passage I (Q. Nos. 1-3) …` (Mock 8). The captured context becomes the
 * questions' shared `context` field and binds them into a set.
 */
export function detectDirectionSets(md: string): DirectionSet[] {
  const out: DirectionSet[] = [];
  const re = new RegExp(
    // Between the word and the "(Q. Nos. N-M)" the papers put any mix of
    // markdown emphasis, colons and dashes: "Direction:", "**Directions --**",
    // "Passage I". Allow that run rather than enumerate the spellings.
    String.raw`(?:Direction[s]?|Passage(?:\s+[IVXLC]+)?)[\s:*_—–-]*` +
      NOS_RANGE +
      // The two numbers are joined by a dash, "to", or "and" — Mock 1 writes
      // "(Q. Nos. 114 and 115)", and missing that left its Q113/114/115 (all of
      // which say "the above frequency distribution") with no table at all.
      String.raw`\s*(\d{1,3})\s*(?:[-–—]+|to|and)\s*(\d{1,3})\s*\)?\s*([\s\S]*?)(?=\n` +
      Q_START_SRC +
      ")",
    "g",
  );
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) {
    const raw = m[3]
      .split("\n")
      .map((l) =>
        l
          .replace(/^\s*>\s?/, "")
          .replace(/\\$/, "")
          .trim(),
      )
      .filter(Boolean)
      .join(" ")
      .trim();

    // An assertion-reason block prints the four codes once and its questions
    // repeat none of them. Where that shape is present, lift the codes out as
    // the set's options and leave only the instructions as context. A prose
    // data block (Mock 1's Q71-75) has no a->b->c->d chain, so this no-ops.
    let context = raw;
    let options: ParsedOption[] | undefined;
    try {
      const parsed = parseOptionsFromBlock(raw);
      if (parsed.stem.trim()) {
        options = parsed.options;
        context = parsed.stem.trim();
      }
    } catch {
      // no option chain in this block — a plain shared-data passage
    }

    out.push({
      from: Number(m[1]),
      to: Number(m[2]),
      context,
      ...(options ? { options } : {}),
    });
  }
  return out;
}
