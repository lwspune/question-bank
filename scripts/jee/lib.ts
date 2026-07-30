// Pure helpers for the JEE Mains pandoc-markdown extractor.
// Unit-tested in tests/jee-extract.test.ts. No IO here.
import katex from "katex";

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

// --- Shared LaTeX repair (used by cleanup-latex.ts + attach-solutions.ts) ---
// Strip pandoc hard-break / stray control chars sitting inside a math zone right
// before its closing delimiter, and drop a leading empty `\(\\)`. Safe: a legit
// matrix row-break `\\` is always followed by content or `\end{...}`, never a
// bare `)`/`]`.
export function preCleanLatex(s: string): string {
  return s
    .replace(/\\underset\{([^{}]+)\}\{\\overset\{([\s\S]*?)\}\{︸\}\}/g, "\\underbrace{$2}_{$1}")
    .replace(/[︷︸⏞⏟]/g, "")
    .replace(/^\\\(\s*\\+\s*\\?\)/, "")
    .replace(/\\\(\s*\\\\\s*\\\)/g, "")
    .replace(/\\\\\)/g, "\\)")
    .replace(/\\\\\]/g, "\\]")
    .replace(/\\\\+(\s*\\[)\]])/g, "$1")
    .replace(/\\ (\s*\\[)\]])/g, "$1");
}

// KaTeX-validated de-glue: when a macro ran into the next token (`\inR`, `\veeq`)
// it renders "Undefined control sequence". Split at the longest valid prefix.
function repairZone(inner: string): string {
  let s = inner;
  for (let i = 0; i < 15; i++) {
    try {
      katex.renderToString(s, { throwOnError: true, strict: false });
      return s;
    } catch (e) {
      const m = String((e as Error).message).match(/Undefined control sequence: \\([A-Za-z]+)/);
      if (!m) return s;
      const name = m[1];
      let k = 0;
      for (let j = name.length - 1; j >= 1; j--) {
        try {
          katex.renderToString("\\" + name.slice(0, j) + " x", { throwOnError: true, strict: false });
          k = j;
          break;
        } catch {
          /* try a shorter prefix */
        }
      }
      if (!k) return s;
      s = s.replace("\\" + name, "\\" + name.slice(0, k) + " " + name.slice(k));
    }
  }
  return s;
}

function repairGluedMacros(text: string): string {
  return text.replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, (zone) => {
    const open = zone.startsWith("\\[") ? "\\[" : "\\(";
    const close = open === "\\[" ? "\\]" : "\\)";
    return open + repairZone(zone.slice(2, -2)) + close;
  });
}

// Repair split `\(...\)` delimiters: pandoc breaks a field's math at the field
// boundary — drop a trailing dangling `\(`, prepend `\(` when the first delimiter
// seen is a `\)`.
function repairSplitDelimiters(s: string): string {
  let out = s.replace(/\s*\\\(\s*$/, "");
  const fo = out.indexOf("\\(");
  const fc = out.indexOf("\\)");
  if (fc !== -1 && (fo === -1 || fc < fo)) out = "\\(" + out;
  return out;
}

/** Full cosmetic + repair transform for one long-form field (stem/option/solution). */
export function repairLatex(s: string): string {
  return repairSplitDelimiters(
    repairGluedMacros(normalizeMathFunctions(preCleanLatex(s))).replace(/(?<!\\)\\\s*$/, "").trimEnd(),
  );
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
  out = out.replace(/(?<!\\)\\$/, "").trimEnd(); // strip a leaked trailing hard-break `\` (keeps `\\` and `\)`)
  return out;
}

// The closing `**` is sometimes preceded by a leaked hard-break `\` (pandoc
// renders `**(c)\**` when the source put a line break after the answer letter,
// common in the 2026 sittings). `\\?` accepts that variant; it's a strict
// superset, so blocks without the backslash (2021-2025) still match.
const SOLUTION_START = /^(\d+)\.\s+\*\*\(([abcd])\)\\?\*\*/gm;

/** number -> uppercase answer letter, from the soln doc's `N.  **(x)**` headers. */
export function parseAnswerKey(solnMd: string): Map<number, "A" | "B" | "C" | "D"> {
  const key = new Map<number, "A" | "B" | "C" | "D">();
  for (const m of solnMd.matchAll(SOLUTION_START)) {
    key.set(Number(m[1]), m[2].toUpperCase() as "A" | "B" | "C" | "D");
  }
  return key;
}

const ANSWER_TOKEN = /^(\d+)\.\s+\*\*\(([^)]+)\)\\?\*\*/gm;

/** number -> raw answer token (a letter `a`..`d`, OR a value like `1625`). */
export function parseAnswerTokens(solnMd: string): Map<number, string> {
  const out = new Map<number, string>();
  for (const m of solnMd.matchAll(ANSWER_TOKEN)) out.set(Number(m[1]), m[2].trim());
  return out;
}

/**
 * ORDERED answer tokens — the i-th `**(x)**` block's token, ignoring its (often
 * broken) printed number. For a soln doc whose pandoc numbering reset every block
 * to `1.` (the "all-1." case), position is the ONLY reliable key: the i-th soln
 * block answers the i-th question. `answerTokenAt(ordered, qNumber)` reads it 1-indexed.
 */
export function parseAnswerTokensOrdered(solnMd: string): string[] {
  const out: string[] = [];
  for (const m of solnMd.matchAll(ANSWER_TOKEN)) out.push(m[2].trim());
  return out;
}

/** ORDERED solution bodies, aligned 1:1 with parseAnswerTokensOrdered. */
export function splitSolutionsOrdered(solnMd: string): string[] {
  const starts: { index: number; markerLen: number }[] = [];
  for (const m of solnMd.matchAll(ANSWER_TOKEN)) starts.push({ index: m.index!, markerLen: m[0].length });
  return starts.map((s, i) => {
    const end = i + 1 < starts.length ? starts[i + 1].index : solnMd.length;
    return cleanText(solnMd.slice(s.index + s.markerLen, end));
  });
}

/**
 * True when the soln doc's block numbering is broken (pandoc reset most blocks
 * to `1.`), so a by-number key map collapses and positional mapping is required.
 * Heuristic: many answer blocks but very few DISTINCT printed numbers.
 */
export function solnNumberingIsBroken(solnMd: string): boolean {
  const nums = new Set<number>();
  let total = 0;
  for (const m of solnMd.matchAll(ANSWER_TOKEN)) {
    nums.add(Number(m[1]));
    total++;
  }
  return total >= 20 && nums.size <= Math.max(2, Math.floor(total * 0.15));
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
// Section A = the first 20 MCQ of each subject block; Section B = the remaining
// NAT. `subjectSize` is the per-subject block size: 30 for 2021-2024 (20 MCQ +
// 10 NAT), 25 for 2025 (20 MCQ + 5 NAT — the optional-NAT was dropped).
export function localSection(globalNumber: number, subjectSize = 30): "A" | "B" {
  const local = ((globalNumber - 1) % subjectSize) + 1;
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

/**
 * Subject from the global question number — the authoritative discriminator.
 * JEE Mains numbering is rigidly continuous: Physics 1-30, Chemistry 31-60,
 * Maths 61-90. This is more reliable than parsing PART headers, whose wording
 * varies per paper (e.g. Paper 6's Chemistry header didn't match PART_SUBJECT,
 * leaving Q31-60 mislabelled Physics until this override).
 */
export function subjectForNumber(n: number, shiftSize = 90): JeeSubject {
  // Two shifts concatenated in one file, each shift Physics/Chem/Maths in equal
  // blocks. `shiftSize` = questions per shift: 90 for 2021-2024 (30-block
  // subjects, 180-total two-shift or 90-total single-shift), 75 for 2025
  // (25-block subjects, 150-total). Wrap per shift so shift 2 maps identically.
  const sub = shiftSize / 3;
  const local = ((n - 1) % shiftSize) + 1;
  return local <= sub ? "Physics" : local <= 2 * sub ? "Chemistry" : "Maths";
}

/**
 * Single-subject commit filter (Maths-first pass). A row is kept when its
 * RESOLVED subject equals the target — resolved = the content-based
 * classification subject when present (needed for non-standard compilations,
 * where the position blocks don't hold), else the position-derived one.
 * No target ⇒ keep everything (backward-compatible full-paper commit).
 */
export function keepForSubject(
  target: string | undefined,
  positionSubject: string,
  classificationSubject?: string,
): boolean {
  if (!target) return true;
  return (classificationSubject ?? positionSubject) === target;
}

/** Read the `--subject=<name>` CLI flag; undefined when absent. */
export function parseSubjectArg(argv: string[]): string | undefined {
  const flag = argv.find((a) => a.startsWith("--subject="));
  return flag ? flag.slice("--subject=".length) : undefined;
}

/**
 * Parse a Section-B (Numerical Answer Type) answer token into a number.
 * The soln-doc token for a NAT question IS the answer value (e.g. "7744",
 * "1.50", "2,021"). Returns null for anything that isn't a single clean number
 * (ambiguous / ranged answers must be resolved with an answerOverride).
 */
export function parseNumericAnswer(token: string | undefined): number | null {
  if (!token) return null;
  const cleaned = token.replace(/,/g, "").trim();
  if (!/^-?\d+(?:\.\d+)?$/.test(cleaned)) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

const Q_START = /^(\d+)\.(\s|$)/; // `$` so a number alone on its line (stem after an image) still anchors
const SECTION_OR_PART = /PART-|SECTION/i;
// A bare subject banner (`**CHEMISTRY**`) separating subject blocks — the 2025/
// 2026 sittings print this instead of a `PART-II CHEMISTRY` header, so it slipped
// past SECTION_OR_PART and was absorbed into the PRECEDING question (into the stem
// when that question is a NAT, into option (d) when it's an MCQ).
// Anchored to the WHOLE line, so a stem that merely mentions the word is untouched.
const SUBJECT_BANNER = /^\W*(PHYSICS|CHEMISTRY|MATHEMATICS|MATHS)\W*$/i;

/** Segment the whole question markdown into per-question blocks. */
export function segmentQuestions(md: string, shiftSize = 90): RawQuestion[] {
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
      subject: subjectForNumber(cur.number, shiftSize),
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
    if (SUBJECT_BANNER.test(line)) continue; // bare `**CHEMISTRY**` subject banner
    if (line.trim() === "" || line.trim() === "<!-- -->") continue;

    cur.textParts.push(line.replace(/(?<!\\)\\$/, "").trim()); // drop a single pandoc hard-break `\`, but keep matrix `\\`
  }
  flush();
  return out;
}
