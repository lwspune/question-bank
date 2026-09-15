// Pure helpers for the JEE Mains pandoc-markdown extractor.
// Unit-tested in tests/jee-extract.test.ts. No IO here.
import katex from "katex";
import { stripPandocArtifacts } from "../lib/pandocArtifacts";

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

// Macros kept OUT of the list above because each is a prefix of a longer one
// (`\cdot`/`\cdots`, `\mid`/`\middot`, `\sim`/`\simeq`). Splitting them is
// unambiguous before an UPPERCASE letter, because the longer macro always
// continues in lowercase — so `\cdotAl` is glued while `\cdots` is not.
// Longest first, so a shorter entry cannot claim a prefix of a longer one.
const PREFIX_MACROS = [
  "rightleftharpoons", "longrightarrow", "propto", "perp", "circ", "cong",
  "odot", "cdot", "mid", "sim",
];
const DEGLUE_UPPER_RE = new RegExp(`\\\\(${PREFIX_MACROS.join("|")})(?=[A-Z])`, "g");

/** Repair KaTeX-breaking artifacts: de-glue symbol macros, drop \mspace/\hspace. */
export function sanitizeLatex(s: string): string {
  return s
    .replace(/\\[mh]space\{[^}]*\}/g, " ")
    .replace(DEGLUE_RE, "\\$1 ")
    .replace(DEGLUE_UPPER_RE, "\\$1 ");
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
  return stripPandocArtifacts(
    repairSplitDelimiters(
      repairGluedMacros(normalizeMathFunctions(preCleanLatex(s))).replace(/(?<!\\)\\\s*$/, "").trimEnd(),
    ),
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
  out = dropProseHardBreaks(out);
  out = out.replace(/(?<!\\)\\$/, "").trimEnd(); // strip a leaked trailing hard-break `\` (keeps `\\` and `\)`)
  return out;
}

/**
 * pandoc marks a line break as a trailing `\`. Once newlines are collapsed to
 * spaces that becomes a mid-sentence `\ `, which renders as a literal backslash
 * because prose segments are not passed through KaTeX.
 *
 * Math zones are masked first: inside `\(...\)` / `\[...\]` a `\ ` is a legal
 * thin-space macro and must survive. `\\` (a row separator) is protected by the
 * lookbehind, as is `\)` / `\]` by requiring a following space.
 */
export function dropProseHardBreaks(s: string): string {
  const zones: string[] = [];
  const masked = s.replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, (m) => {
    zones.push(m);
    return `\u0000${zones.length - 1}\u0000`;
  });
  const cleaned = masked.replace(/(?<!\\)\\ (?=\S)/g, " ").replace(/ {2,}/g, " ");
  return cleaned.replace(/\u0000(\d+)\u0000/g, (_m, i) => zones[Number(i)]);
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

    // pandoc leaves a hard-break `\` at the end of the stem's last line. When
    // cleanText ran, that backslash was still MID-string (the options followed
    // it), so cleanText's trailing-`\` strip did not see it — it only becomes
    // trailing here, after the split. Strip it on each piece. `\\` (a row
    // separator) and `\)` are preserved by the lookbehind, same as cleanText.
    const dropBreak = (s: string) => s.replace(/(?<!\\)\\$/, "").trimEnd();
    const stem = dropBreak(text.slice(0, idxA).trim());
    const options = [
      text.slice(idxA + 3, idxB),
      text.slice(idxB + 3, idxC),
      text.slice(idxC + 3, idxD),
      text.slice(idxD + 3),
    ].map((o) => dropBreak(o.trim()));
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
// Stray "PART-II" / "SECTION-A" banners sitting inside a question block.
// Matched against the WHOLE line, because the two looser forms both destroyed
// real content:
//   /PART-|SECTION/i        (unanchored) ate any line CONTAINING the word —
//                           "...area of cross-section", "the point of
//                           intersection of..." — 215 lines across 77 papers.
//   /^\W*(PART\b|SECTION\b)/i (line-start) still ate any line BEGINNING with
//                           the word — "part (B) and part (C), respectively...",
//                           "part of it submerged in water...".
// A genuine banner occupies its whole line and names a roman numeral (PART-II)
// or a section letter (SECTION-A), optionally followed by the subject.
// The separator is deliberately loose (`[\W]*`) because the corpus prints every
// variant — "SECTION-A", "SECTION: B", "Section -- B", "PART- I PHYSCIS" (sic) —
// while the ROMAN NUMERAL / SECTION LETTER plus the end-of-line anchor are what
// keep ordinary prose ("part of it submerged...", "part (B) and part (C)...")
// from matching.
const SECTION_OR_PART = /^\W*(PART[\W]*[IVX]+(\W+[A-Z]+)?|SECTION[\W]*[AB])\W*$/i;
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

const GRID_SEPARATOR = /\+(?:[-=:]{3,}\+)+/g;

/**
 * Convert a pandoc GRID table (`+---+---+`) into a GFM pipe table.
 *
 * Chemistry papers lean on data tables (thermodynamic constants, kinetics runs,
 * Column-I/Column-II matches) and pandoc renders those as grid tables, which
 * `parseTableBlocks` does NOT recognise — only a pipe table with a `|---|`
 * separator row builds a real table on /browse and in the Word export. Left
 * alone they render as raw `+====+` noise on both surfaces.
 *
 * The extractor flattens a stem to a single line, so this operates on a
 * one-line table and rebuilds the newlines GFM needs. A tall header cell that
 * pandoc split across physical rows is merged back into one cell per column.
 *
 * Math zones are masked before splitting on `|` so a determinant or absolute
 * value inside a cell can't be mistaken for a column boundary.
 */
export function gridTableToPipe(text: string): string {
  if (!text || !/\+[-=:]{3,}\+/.test(text)) return text;

  // Mask math so `\(|A|\)` can't be read as two column boundaries.
  const zones: string[] = [];
  const masked = text.replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, (m) => {
    zones.push(m);
    return `\u0000M${zones.length - 1}\u0000`;
  });
  const unmask = (s: string) => s.replace(/\u0000M(\d+)\u0000/g, (_, i) => zones[Number(i)]);

  GRID_SEPARATOR.lastIndex = 0;
  const seps: { start: number; end: number; cols: number; isHeaderRule: boolean }[] = [];
  for (let m = GRID_SEPARATOR.exec(masked); m; m = GRID_SEPARATOR.exec(masked)) {
    seps.push({
      start: m.index,
      end: m.index + m[0].length,
      cols: (m[0].match(/[-=:]{3,}/g) ?? []).length,
      isHeaderRule: m[0].includes("="),
    });
  }
  if (seps.length < 2) return text;

  // Chain separators that have only cell-row material between them.
  let last = 0;
  for (let i = 1; i < seps.length; i++) {
    const gap = masked.slice(seps[i - 1].end, seps[i].start).trim();
    if (!gap.startsWith("|") || !gap.endsWith("|")) break;
    last = i;
  }
  if (last === 0) return text;

  // Take the column count from the WIDEST separator in the chain, not the first.
  // A Match-List table opens with a 2-column banner rule spanning
  // `List-I | List-II` and only then splits into the real 4 columns
  // (`(A) | Simple distillation | (I) | Steam volatile compound`). Trusting the
  // first rule reads every body row at half width and interleaves the columns.
  const cols = Math.max(...seps.slice(0, last + 1).map((s) => s.cols));
  const before = masked.slice(0, seps[0].start).trim();
  const after = masked.slice(seps[last].end).trim();

  const rows: string[][] = [];
  let headerRows = 0;
  for (let i = 1; i <= last; i++) {
    const cells = masked
      .slice(seps[i - 1].end, seps[i].start)
      .trim()
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    if (!cells.length) continue;

    // A logical row may span several PHYSICAL rows, which the flattening ran
    // together. Adjacent physical rows leave one separator artifact between
    // them (row-1's closing `|` then row-2's opening `|`), so walk in blocks of
    // `cols` and step over that artifact — a plain `k % cols` drifts by one per
    // physical row and silently files a cell under the wrong column.
    const merged = Array.from({ length: cols }, () => [] as string[]);
    for (let k = 0; k < cells.length; k += cols + 1) {
      for (let c = 0; c < cols && k + c < cells.length; c++) {
        const v = cells[k + c];
        if (v) merged[c].push(v);
      }
    }
    rows.push(merged.map((parts) => parts.join(" ").trim()));
    if (seps[i].isHeaderRule) headerRows = rows.length;
  }
  if (!rows.length) return text;

  // No explicit `=` rule: treat the first logical row as the header.
  if (headerRows === 0) headerRows = 1;

  const head = rows.slice(0, headerRows);
  const body = rows.slice(headerRows);
  const line = (r: string[]) => `| ${r.join(" | ")} |`;
  const table = [
    ...head.map(line),
    `| ${Array.from({ length: cols }, () => "---").join(" | ")} |`,
    ...body.map(line),
  ].join("\n");

  return unmask([before, table, after].filter(Boolean).join("\n\n"));
}

/**
 * Reveal content that pandoc buried inside `\phantom{...}`.
 *
 * `\phantom{X}` renders as blank space the width of X — the text is present in
 * the markup but INVISIBLE to the reader. Word puts reaction conditions on top
 * of an arrow, and pandoc emits them this way, so the reagents, temperatures
 * and `h\nu` labels of an organic scheme silently vanish. A stem that reads
 * "A ——→ B" with an empty arrow is unanswerable.
 *
 * Every one of the 26 occurrences in the extracted JEE Chemistry corpus carries
 * real content (`LiAlH_{4}`, `H_{3}O^{+}`, `450\text{ }K`, `h\nu`,
 * `\text{~Hydrolysis~}`) and NONE is pure spacing, so unwrapping is a straight
 * repair here. An empty phantom IS just spacing, so that one is dropped.
 *
 * Brace-balanced: payloads routinely contain `{}` (`\text{~Oxidation~}`), which
 * a lazy regex would cut at the first inner brace, corrupting the stem.
 */
export function unwrapPhantom(text: string): string {
  if (!text || !text.includes("\\phantom{")) return text;
  const TAG = "\\phantom{";
  let out = "";
  let i = 0;
  for (;;) {
    const hit = text.indexOf(TAG, i);
    if (hit === -1) {
      out += text.slice(i);
      return out;
    }
    out += text.slice(i, hit);
    let depth = 1;
    let j = hit + TAG.length;
    while (j < text.length && depth > 0) {
      if (text[j] === "{") depth++;
      else if (text[j] === "}") depth--;
      j++;
    }
    // Unbalanced (truncated source): leave the rest verbatim rather than guess.
    if (depth !== 0) return out + text.slice(hit);
    const payload = text.slice(hit + TAG.length, j - 1);
    out += payload.trim() ? payload : "";
    i = j;
  }
}

/**
 * Pick the agent-output files that belong to the subject being assembled.
 *
 * Both assemblers used to glob `<paperId>_sol_*.json` and `Object.assign` the
 * lot. On a paper where two subjects have been ingested that silently merges
 * them — and because readdir is alphabetical, `_sol_physics.json` lands AFTER
 * `_sol_chem.json` and overwrites it for any shared question number.
 *
 * That is not hypothetical: the 2021 compilations were re-tagged so questions
 * the Physics pass had skipped (correctly — they are chemistry) became
 * Chemistry questions. The Physics file's `skip: true` then clobbered the
 * Chemistry agent's real answers, and 27 questions were dropped with a bare
 * "(skip)" that read like a deliberate call.
 *
 * A file whose suffix names a DIFFERENT subject is excluded. Anything else —
 * `_sol_1.json`, `_sol_a.json`, plain `_sol.json` — is kept, because the split
 * part-files of a single subject's run carry no subject token and dropping them
 * would lose real work.
 */
const SUBJECT_TOKENS: Record<string, string[]> = {
  Chemistry: ["chem", "chemistry"],
  Physics: ["phys", "physics"],
  Maths: ["math", "maths", "mathematics"],
};

export function solFilesForSubject(files: string[], paperId: string, subject: string): string[] {
  const mine = new Set(SUBJECT_TOKENS[subject] ?? []);
  const foreign = new Set(
    Object.entries(SUBJECT_TOKENS)
      .filter(([s]) => s !== subject)
      .flatMap(([, t]) => t),
  );
  const prefix = `${paperId}_sol_`;
  return files.filter((f) => {
    if (!f.startsWith(prefix) || !f.endsWith(".json")) return false;
    const token = f.slice(prefix.length, -".json".length).toLowerCase();
    if (mine.has(token)) return true;
    return !foreign.has(token);
  });
}

/**
 * Drop math zones whose payload is nothing but spacing.
 *
 * Pandoc emits `\(\ \)` where a fill-in blank or a layout gap stood. It looks
 * harmless but `parseLatex` trims the trailing space, handing KaTeX a bare
 * backslash — "Unexpected character: '\'" — so the WHOLE stem fails to render.
 * The zone carries no information either way, so removing it is lossless.
 *
 * The surrounding spaces are absorbed into a single space by the same pass.
 * That absorption is deliberately LOCAL: a blanket whitespace collapse once
 * removed the newline terminating a GFM pipe table and destroyed it, so nothing
 * outside the matched region is touched.
 *
 * A zone containing real content is never stripped, even when it also holds
 * spacing macros (`\(\quad x\)` stays).
 */
// A LONE backslash is listed LAST so the specific spacing macros above win the
// alternation (otherwise `\,` would match the backslash and strand the comma).
// It matters because `\(\\)` — what pandoc leaves where a NAT answer-blank stood
// — does NOT parse as a zone containing `\\`: the closing `\)` claims the second
// backslash, so the body is a single `\`. That is not valid LaTeX on its own,
// KaTeX rejects it, and the whole stem fails to render.
const SPACING_ONLY = /^(?:\s|~|\\[,;:!> ]|\\q?quad|\\hspace\{[^}]*\}|\\!|\\)*$/;

/**
 * Trim spacing macros stranded at the END of a math zone.
 *
 * `\(... 1.844\ \ \)` renders fine in principle, but `parseLatex` trims the
 * zone's trailing whitespace and leaves a bare `\`, which KaTeX rejects with
 * "Unexpected character: '\'" — taking the whole stem down. Same failure as an
 * all-spacing zone, except there is real content in front, so stripEmptyMath
 * does not see it.
 *
 * Only trailing spacing is removed; nothing that renders is touched.
 */
export function trimMathZoneSpacing(text: string): string {
  if (!text) return text;
  const SPACER = String.raw`(?:\s|~|\\[,;:!>]|\\ |\\q?quad)`;
  return text
    .replace(new RegExp(`(${SPACER})+(\\\\\\))`, "g"), "$2")
    .replace(new RegExp(`(${SPACER})+(\\\\\\])`, "g"), "$2");
}

export function stripEmptyMath(text: string): string {
  if (!text) return text;
  return trimMathZoneSpacing(text).replace(
    /[ \t]*\\(\(|\[)([\s\S]*?)\\(\)|\])[ \t]*/g,
    (whole, open: string, body: string, close: string) => {
      const paired = (open === "(" && close === ")") || (open === "[" && close === "]");
      if (!paired || !SPACING_ONLY.test(body)) return whole;
      // Absorbed a space on at least one side? Emit one back, so the words
      // either side do not fuse. At a line edge, emit nothing.
      const lead = /^[ \t]/.test(whole);
      const tail = /[ \t]$/.test(whole);
      return lead && tail ? " " : "";
    },
  );
}
