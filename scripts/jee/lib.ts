// Pure helpers for the JEE Mains pandoc-markdown extractor.
// Unit-tested in tests/jee-extract.test.ts. No IO here.

export type JeeSubject = "Physics" | "Chemistry" | "Maths";

export type RawQuestion = {
  number: number;
  subject: JeeSubject;
  stem: string;
  options: string[] | null; // 4 cleaned option texts (a,b,c,d order), or null for numerical
  imageRefs: string[];
};

/** Strip `\mathbf{...}` wrappers (Word bolded everything), keeping the inner content. */
function stripMathbf(s: string): string {
  let prev: string;
  let out = s;
  do {
    prev = out;
    out = out.replace(/\\mathbf\{([^{}]*)\}/g, "$1");
  } while (out !== prev);
  return out;
}

// No-argument symbol macros that frequently glued into a following letter when
// pandoc emitted adjacent OMML runs (e.g. `\betat`, `\rightarrowH`). Each is
// chosen NOT to be a prefix of another macro it could be confused with
// (so `\in`/`\to`/`\le`/`\cdot` are deliberately excluded).
const SYMBOL_MACROS = [
  "alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota",
  "kappa", "lambda", "mu", "nu", "xi", "pi", "rho", "sigma", "tau", "phi", "chi",
  "psi", "omega", "Gamma", "Delta", "Theta", "Lambda", "Xi", "Pi", "Sigma", "Phi",
  "Psi", "Omega", "rightarrow", "leftarrow", "Rightarrow", "Leftarrow", "lbrack",
  "rbrack", "langle", "rangle", "infty", "times", "div", "neq", "leq", "geq",
  "approx", "equiv", "partial", "nabla",
];
const DEGLUE_RE = new RegExp(`\\\\(${SYMBOL_MACROS.join("|")})(?=[A-Za-z])`, "g");

/** Repair KaTeX-breaking artifacts: de-glue symbol macros, drop \mspace/\hspace. */
export function sanitizeLatex(s: string): string {
  return s
    .replace(/\\[mh]space\{[^}]*\}/g, " ")
    .replace(DEGLUE_RE, "\\$1 ");
}

// Bare math operators that render as italic variable products (l·o·g) unless
// upgraded to their upright macro (\log). Longest-first so `sinh` wins over `sin`.
// `sec` is deliberately EXCLUDED — it collides with the time unit "sec"/"m/sec",
// and source secants are already written `\sec`; the false-positive risk on units
// outweighs the rare bare-secant upgrade.
const MATH_FUNCS = "sinh|cosh|tanh|cosec|csc|sin|cos|tan|cot|log|ln|lim|exp";
const FUNC_RE = new RegExp("(?<![\\\\A-Za-z])(" + MATH_FUNCS + ")([A-Za-z]?)", "g");

function fixFuncsInZone(zone: string): string {
  return zone.replace(FUNC_RE, (_m, fn: string, next: string) => {
    const macro = fn === "cosec" ? "\\csc" : "\\" + fn;
    return next ? `${macro} ${next}` : macro; // re-space a function glued to a variable
  });
}

/**
 * Cosmetic LaTeX cleanup: upgrade bare function names (log, sin, cos, ...) to
 * their upright macros, ONLY inside `\(...\)` / `\[...\]` math zones (so prose
 * like "log table" is untouched). Idempotent; longer functions (sinh) protected.
 */
export function normalizeMathFunctions(text: string): string {
  return text.replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, (zone) => fixFuncsInZone(zone));
}

/**
 * Normalise one pandoc-markdown fragment to the bank's LaTeX convention.
 * Order matters: strip bold + \mathbf, unescape pandoc literal escapes,
 * THEN introduce `\(...\)` / `\[...\]` from `$...$` (so the unescape pass
 * can't corrupt the delimiters we create).
 */
export function cleanText(s: string): string {
  let out = s;
  out = out.replace(/\*\*/g, ""); // bold markers
  out = out.replace(/!\[[^\]]*\]\([^)]*\)(\s*\{[^}]*\})?/g, " "); // image markdown (+ attrs)
  out = out.replace(/<!--[\s\S]*?-->/g, " "); // pandoc list separators / html comments
  out = out.replace(/\\[mh]space\{[^}]*\}/g, " "); // drop spacing artifacts before \mathbf strip
  out = stripMathbf(out);
  // Unescape pandoc literal escapes (e.g. the `\(a\)` option markers, `Young\'s`).
  out = out
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\[/g, "[")
    .replace(/\\\]/g, "]")
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"');
  out = sanitizeLatex(out);
  // Math: display first (contains $), then inline.
  out = out.replace(/\$\$([\s\S]+?)\$\$/g, "\\[$1\\]");
  out = out.replace(/\$([^$]+?)\$/g, "\\($1\\)");
  out = out.replace(/\s+/g, " ").trim();
  return out;
}

const SOLUTION_START = /^(\d+)\.\s+\*\*\(([abcd])\)\*\*/gm;

/** number -> uppercase answer letter, from the soln doc's `N.  **(x)**` headers. */
export function parseAnswerKey(solnMd: string): Map<number, "A" | "B" | "C" | "D"> {
  const key = new Map<number, "A" | "B" | "C" | "D">();
  for (const m of solnMd.matchAll(SOLUTION_START)) {
    key.set(Number(m[1]), m[2].toUpperCase() as "A" | "B" | "C" | "D");
  }
  return key;
}

const ANSWER_TOKEN = /^(\d+)\.\s+\*\*\(([^)]+)\)\*\*/gm;

/** number -> raw answer token (a letter `a`..`d`, OR a value like `1625`). */
export function parseAnswerTokens(solnMd: string): Map<number, string> {
  const out = new Map<number, string>();
  for (const m of solnMd.matchAll(ANSWER_TOKEN)) out.set(Number(m[1]), m[2].trim());
  return out;
}

/**
 * Solution numbers that appear more than once — a source-doc typo (a block
 * mis-numbered as an earlier question) silently corrupts the answer key via
 * Map last-wins. Surface it so the affected keys get an answerOverride.
 */
export function findDuplicateSolutionNumbers(solnMd: string): number[] {
  const counts = new Map<number, number>();
  for (const m of solnMd.matchAll(ANSWER_TOKEN)) {
    const n = Number(m[1]);
    counts.set(n, (counts.get(n) ?? 0) + 1);
  }
  return [...counts.entries()].filter(([, c]) => c > 1).map(([n]) => n).sort((a, b) => a - b);
}

/**
 * JEE Mains 2021: each subject part is 30 questions — 20 MCQ (Section A)
 * then 10 numerical (Section B). Position is the reliable A/B discriminator;
 * stray `(a)..(d)` markers inside a "Number of ... among the following" count
 * question must NOT promote it to an MCQ.
 */
export function localSection(globalNumber: number): "A" | "B" {
  const local = ((globalNumber - 1) % 30) + 1;
  return local <= 20 ? "A" : "B";
}

const normForMatch = (s: string) =>
  s.replace(/\\[()[\]]/g, "").replace(/\s+/g, "").toLowerCase();

/** Map a value answer-token (e.g. "1625") to the option label whose text equals it. */
export function matchValueToOption(token: string, optionTexts: string[]): "A" | "B" | "C" | "D" | null {
  const t = normForMatch(token);
  const i = optionTexts.findIndex((o) => normForMatch(o) === t);
  return i === -1 ? null : (["A", "B", "C", "D"][i] as "A" | "B" | "C" | "D");
}

/**
 * number -> cleaned worked-solution text (everything after the `N. **(x)**` header).
 * Uses the broad token regex (not letter-only) so value-answer blocks like
 * `62. **(1625)**` also get their solution captured.
 */
export function splitSolutions(solnMd: string): Map<number, string> {
  const starts: { num: number; index: number; markerLen: number }[] = [];
  for (const m of solnMd.matchAll(ANSWER_TOKEN)) {
    starts.push({ num: Number(m[1]), index: m.index!, markerLen: m[0].length });
  }
  const sols = new Map<number, string>();
  for (let i = 0; i < starts.length; i++) {
    const cur = starts[i];
    const end = i + 1 < starts.length ? starts[i + 1].index : solnMd.length;
    const body = solnMd.slice(cur.index + cur.markerLen, end);
    sols.set(cur.num, cleanText(body));
  }
  return sols;
}

const MARKERS = ["(a)", "(b)", "(c)", "(d)"] as const;

/**
 * Split a cleaned question string into stem + 4 options.
 * Returns null when 4 ordered (a)(b)(c)(d) markers aren't present (numerical question).
 * Picks the LAST `(a)` that still has b,c,d after it, so a stray "(a)" in the stem
 * doesn't win over the real option marker.
 */
export function parseOptionsFromText(
  text: string
): { stem: string; options: string[] } | null {
  // Find `marker` at/after `from`, skipping match-list codes like `(a)-(ii)`
  // where the paren is immediately followed by a hyphen (not an option marker).
  const nextMarker = (marker: string, from: number): number => {
    let i = text.indexOf(marker, from);
    while (i !== -1 && text[i + 3] === "-") i = text.indexOf(marker, i + 1);
    return i;
  };

  const aIdxs: number[] = [];
  for (let i = nextMarker("(a)", 0); i !== -1; i = nextMarker("(a)", i + 1)) aIdxs.push(i);

  for (let k = aIdxs.length - 1; k >= 0; k--) {
    const idxA = aIdxs[k];
    const idxB = nextMarker("(b)", idxA + 3);
    if (idxB === -1) continue;
    const idxC = nextMarker("(c)", idxB + 3);
    if (idxC === -1) continue;
    const idxD = nextMarker("(d)", idxC + 3);
    if (idxD === -1) continue;

    const stem = text.slice(0, idxA).trim();
    const options = [
      text.slice(idxA + 3, idxB).trim(),
      text.slice(idxB + 3, idxC).trim(),
      text.slice(idxC + 3, idxD).trim(),
      text.slice(idxD + 3).trim(),
    ];
    return { stem, options };
  }
  return null;
}

const PART_SUBJECT: { re: RegExp; subject: JeeSubject }[] = [
  { re: /PART-?\s*I\b.*PHYSIC/i, subject: "Physics" },
  { re: /PART-?\s*II\b.*CHEMIST/i, subject: "Chemistry" },
  { re: /PART-?\s*III\b.*MATHEMATIC/i, subject: "Maths" },
];

const Q_START = /^(\d+)\.(\s|$)/; // `$` so a number alone on its line (stem after an image) still anchors
const SECTION_OR_PART = /PART-|SECTION/i;

/** Segment the whole question markdown into per-question blocks. */
export function segmentQuestions(md: string): RawQuestion[] {
  const lines = md.split(/\r?\n/);
  const out: RawQuestion[] = [];
  let subject: JeeSubject = "Physics";

  let cur: { number: number; subject: JeeSubject; textParts: string[] } | null = null;
  const flush = () => {
    if (!cur) return;
    const joined = cur.textParts.join(" ").replace(/^\d+\.\s+/, "");
    // Image markdown can wrap across lines as `![](path){width="..."  height="..."}`
    // once joined. Extract refs (path only), then strip the marker + attribute block
    // so option text isn't polluted by a stray `height="..."}` fragment.
    const imageRefs = [...joined.matchAll(/!\[\]\(([^)]+)\)/g)].map((m) => m[1]);
    const textOnly = joined.replace(/!\[\]\([^)]*\)(\s*\{[^}]*\})?/g, " ");
    const cleaned = cleanText(textOnly);
    const parsed = parseOptionsFromText(cleaned);
    out.push({
      number: cur.number,
      subject: cur.subject,
      stem: parsed ? parsed.stem : cleaned,
      options: parsed ? parsed.options : null,
      imageRefs,
    });
    cur = null;
  };

  for (const raw of lines) {
    const line = raw.replace(/^\s*>\s?/, "").trimEnd(); // drop leading blockquote prefix

    // PART markers update the running subject.
    const part = PART_SUBJECT.find((p) => p.re.test(line));
    if (part) {
      flush();
      subject = part.subject;
      continue;
    }

    const qm = line.match(Q_START);
    if (qm) {
      flush();
      cur = { number: Number(qm[1]), subject, textParts: [] };
    }

    if (!cur) continue;

    if (SECTION_OR_PART.test(line)) continue; // stray section headers
    if (line.trim() === "" || line.trim() === "<!-- -->") continue;

    cur.textParts.push(line.replace(/(?<!\\)\\$/, "").trim()); // drop a single pandoc hard-break `\`, but keep matrix `\\`
  }
  flush();
  return out;
}
