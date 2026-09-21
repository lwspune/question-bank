/**
 * Phase 1 of the IPMAT pipeline: pure core turning the source's markup into ours.
 *
 * The source writes question content as raw HTML with TeX dollar delimiters. We
 * store GFM pipe-tables with `\(...\)` math. Every rule here was written against
 * a shape counted by `scripts/ipmat/survey.ts` on the real corpus.
 *
 * THE TRAP THAT SHAPES THIS FILE: in this corpus a `<` is far more often a
 * less-than sign than a tag. A naive tag scan over data/raw reports tags named
 * <x>, <c>, <a>, <b>, <d>, <q>, <l>, <v> and <s> — every one a false positive
 * from maths like `$$D<C<A<B$` and `$A < P = C >= D$`. Stripping "anything in
 * angle brackets" DELETES MATHEMATICS. Two independent defences, used together:
 *
 *   1. Math zones are masked first, with the RENDERER'S OWN matcher
 *      (`maskMathZones`), so masking cannot disagree with what renders.
 *   2. Tag handling is restricted to an allowlist of real HTML tag names, so an
 *      unmasked `a<x<b` in prose still survives.
 *
 * WHAT THE DOLLARS COST. Both surfaces — web (`parseRichSegments`) and Word
 * (`ommlBuilder`, via the same module) — already accept `$...$` and `$$...$$`,
 * so converting to `\(...\)` is a CONVENTION choice, not a correctness fix; it
 * is done because 72k existing rows use `\(...\)` and every probe and audit in
 * the repo is written around that. What IS a correctness fix is the systematic
 * `$$...$` shape (621 fields): it leaves a stray literal `$` in the rendered
 * prose on both surfaces.
 *
 * Spec: tests/ipmat-normalise.test.ts.
 */
import { maskMathZones } from "../../src/components/math/parseLatex";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";

const BS = String.fromCharCode(92);

export type FigureRef = { src: string | null; width: string | null };

export type NormaliseWarning = { kind: string; detail: string };

export type NormalisedText = {
  text: string;
  figures: FigureRef[];
  /** Editorial provenance notes lifted out of the prose. */
  disclaimers: string[];
  /** True when the source says this row's data was rebuilt from student recall. */
  reconstructed: boolean;
  warnings: NormaliseWarning[];
};

// --------------------------------------------------------------- entities

/**
 * The entities this corpus uses, plus the small standard set.
 *
 * Deliberately a fixed map, not a general HTML decoder: a bare `&` must survive
 * untouched because it separates LaTeX matrix columns (`\begin{bmatrix} 1 & 2`).
 * An unrecognised `&word;` is left alone rather than guessed at.
 */
const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ldquo: '"',
  rdquo: '"',
  lsquo: "'",
  rsquo: "'",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  minus: "−",
  times: "×",
  divide: "÷",
  deg: "°",
  le: "≤",
  ge: "≥",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  theta: "θ",
  pi: "π",
  rupee: "₹",
};

export function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d{2,5});/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&([a-zA-Z]{2,10});/g, (whole, name: string) => {
      const hit = ENTITIES[name] ?? ENTITIES[name.toLowerCase()];
      return hit ?? whole;
    });
}

// ------------------------------------------------------------ style blocks

/** Remove `<style>` elements and their CSS body (32 sites, all JIPMAT LR). */
export function stripStyleBlocks(text: string): string {
  return text.replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, "");
}

// ------------------------------------------------------------- disclaimers

/**
 * Lift the source's own provenance notes out of the prose.
 *
 * THE MOST CONSEQUENTIAL RULE IN THIS FILE. afterboards states, honestly, that
 * the shared data for some JIPMAT 2026 sets was rebuilt from student recall
 * because NTA never printed it: 15 rows, LR Q25-33 and VA Q23-25 + Q29-31. Such
 * a row is not a verifiable past-year question, so the note becomes structured
 * provenance and the row is marked. It must never be quietly deleted, and it
 * must never be left in the stem where it would read as part of the question.
 *
 * Matching is on the note's OWN distinctive wording, not on the word "we": 87
 * rows say "we" inside an RC passage or a sentence-completion stem, and
 * stripping those would delete real question text.
 */
const DISCLAIMER_SENTENCE =
  /(?:<span[^>]*>\s*)?Disclaimer\s*:[\s\S]*?(?:<\/span\s*>|(?=\n\n)|$)/gi;
const RECONSTRUCTED_HINT = /reverse[-\s]?engineer|student memory|not the original|forgot to print/i;

export function extractDisclaimers(text: string): {
  text: string;
  disclaimers: string[];
  reconstructed: boolean;
} {
  const disclaimers: string[] = [];
  let out = text.replace(DISCLAIMER_SENTENCE, (whole) => {
    disclaimers.push(whole.replace(/<\/?[a-zA-Z][^>]*>/g, "").trim());
    return "";
  });

  // A note that carries the hint but not the word "Disclaimer".
  if (disclaimers.length === 0 && RECONSTRUCTED_HINT.test(out)) {
    out = out.replace(/[^.\n]*(?:reverse[-\s]?engineer|student memory)[^.\n]*\.?/gi, (whole) => {
      disclaimers.push(whole.trim());
      return "";
    });
  }

  const reconstructed = disclaimers.some((d) => RECONSTRUCTED_HINT.test(d));
  return { text: out, disclaimers, reconstructed };
}

// ----------------------------------------------------------------- images

const IMG_TAG = /<img\b[^>]*>/gi;

/** Pull every `<img>` out as structured data and remove the tag from the prose. */
export function extractImages(text: string): { text: string; images: FigureRef[] } {
  const images: FigureRef[] = [];
  const out = text.replace(IMG_TAG, (tag) => {
    const src = /\bsrc\s*=\s*["']?([^"'\s>]+)/i.exec(tag)?.[1] ?? null;
    const width = /\bwidth\s*=\s*["']?([^"'\s>/]+)/i.exec(tag)?.[1] ?? null;
    images.push({ src, width });
    return " ";
  });
  return { text: out, images };
}

// ----------------------------------------------------------------- tables

/**
 * Convert an HTML `<table>` to a GFM pipe-table.
 *
 * The separator row is mandatory: `parseTableBlocks` treats a run of pipes with
 * no separator as prose, which is exactly how a real table would silently
 * degrade to raw `| a | b |` text on the site and in the Word export.
 *
 * A `<br>` inside a cell flattens to a space — a newline there would end the
 * row and shatter the table. An empty cell stays an empty column, because
 * Indore 2023 MCQ Q26-30 turn on a deliberately INCOMPLETE table.
 */
function cellText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?(?:p|div|span|strong|b|em|i|u)\b[^>]*>/gi, "")
    .replace(/\s+/g, " ")
    .replace(/\|/g, BS + "|")
    .trim();
}

export function htmlTablesToPipe(text: string): string {
  return text.replace(/<table\b[^>]*>([\s\S]*?)<\/table\s*>/gi, (_, body: string) => {
    const rows: { cells: string[]; header: boolean }[] = [];
    for (const rowMatch of body.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr\s*>/gi)) {
      const cells: string[] = [];
      let header = false;
      for (const cellMatch of rowMatch[1].matchAll(
        /<(t[dh])\b[^>]*>([\s\S]*?)<\/\1\s*>/gi
      )) {
        if (cellMatch[1].toLowerCase() === "th") header = true;
        cells.push(cellText(cellMatch[2]));
      }
      if (cells.length) rows.push({ cells, header });
    }
    if (rows.length === 0) return "";

    const width = Math.max(...rows.map((r) => r.cells.length));
    const pad = (cells: string[]) => {
      const c = [...cells];
      while (c.length < width) c.push("");
      return "| " + c.join(" | ") + " |";
    };

    const headerRow = rows[0].header ? rows[0] : null;
    const bodyRows = headerRow ? rows.slice(1) : rows;
    const lines: string[] = [];
    // GFM needs a header; a table whose first row is <td> gets an empty one
    // rather than having a data row promoted out of the body.
    lines.push(headerRow ? pad(headerRow.cells) : "|" + " |".repeat(width));
    lines.push("|" + " --- |".repeat(width));
    for (const r of bodyRows) lines.push(pad(r.cells));
    return "\n" + lines.join("\n") + "\n";
  });
}

// ------------------------------------------------------------ inline HTML

/**
 * Tag names we will act on. Everything else in angle brackets is left alone,
 * which is what keeps `a<x<b` and `<notatag>` intact.
 */
const KNOWN_TAGS =
  "p|br|hr|u|strong|b|em|i|span|a|sup|sub|ol|ul|li|table|thead|tbody|tfoot|tr|td|th|div|style|img|font|small|big";

/** Convert the structural + inline HTML this corpus uses to our conventions. */
export function convertHtmlInline(text: string): string {
  const { masked, unmask } = maskMathZones(text);
  let s = masked;

  // lists first, so <li> is consumed before the generic tag sweep
  s = s.replace(/<ol\b[^>]*>([\s\S]*?)<\/ol\s*>/gi, (_, body: string) => {
    const items = [...body.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li\s*>/gi)].map((m) => m[1].trim());
    return "\n" + items.map((t, i) => `${i + 1}. ${stripLeadingMarker(t)}`).join("\n") + "\n";
  });
  s = s.replace(/<ul\b[^>]*>([\s\S]*?)<\/ul\s*>/gi, (_, body: string) => {
    const items = [...body.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li\s*>/gi)].map((m) => m[1].trim());
    // Indore 2022 VA Q41 writes its own "1." inside each <li>; adding a bullet
    // in front would double the marker.
    return (
      "\n" +
      items.map((t) => (hasOwnMarker(t) ? t : `- ${t}`)).join("\n") +
      "\n"
    );
  });

  // superscript -> math with an EMPTY base. 4 of the 15 sites are units
  // (`cm<sup>2</sup>`), where absorbing the base would render "cm" as two
  // italic variables, so the base is deliberately left as prose.
  s = s.replace(/<sup\b[^>]*>([\s\S]*?)<\/sup\s*>/gi, (_, inner: string) =>
    `${BS}(${"{}^{"}${inner.trim()}}${BS})`
  );
  s = s.replace(/<sub\b[^>]*>([\s\S]*?)<\/sub\s*>/gi, (_, inner: string) =>
    `${BS}(${"{}_{"}${inner.trim()}}${BS})`
  );

  // underline -> the exact shape UNDERLINE_BYPASS_RE in ommlBuilder.ts anchors
  // on. Any other shape loses its underline in the .docx without complaint.
  s = s.replace(/<u\b[^>]*>([\s\S]*?)<\/u\s*>/gi, (_, inner: string) =>
    `${BS}(${BS}underline{${BS}text{${inner.trim()}}}${BS})`
  );

  s = s.replace(/<(?:strong|b)\b[^>]*>([\s\S]*?)<\/(?:strong|b)\s*>/gi, (_, i: string) => `**${i.trim()}**`);
  s = s.replace(/<(?:em|i)\b[^>]*>([\s\S]*?)<\/(?:em|i)\s*>/gi, (_, i: string) => i);

  // A <br> on a PIPE-TABLE ROW flattens to a space; anywhere else it becomes a
  // newline. jipmat 2026 LR Q18/Q22 arrive as GFM tables already, so they never
  // pass through htmlTablesToPipe where cell <br> is handled — and a newline
  // inside `| LIST-I<br>(Series) |` splits one row into two and destroys the
  // table. Caught by the build gate, not by the unit tests.
  s = s
    .split("\n")
    .map((line) =>
      (line.match(/(?<!\\)\|/g) ?? []).length >= 2
        ? line.replace(/<br\s*\/?>/gi, " ")
        : line.replace(/<br\s*\/?>/gi, "\n")
    )
    .join("\n");
  s = s.replace(/<hr\s*\/?>/gi, "\n\n");
  s = s.replace(/<\/p\s*>/gi, "\n\n").replace(/<p\b[^>]*>/gi, "");
  s = s.replace(/<\/?div\b[^>]*>/gi, "\n");

  // unwrap the purely presentational containers
  s = s.replace(/<\/?(?:span|a|font|small|big)\b[^>]*>/gi, "");

  // anything left from the allowlist (stray <td>, <li>, <tbody> …)
  s = s.replace(new RegExp(`</?(?:${KNOWN_TAGS})\\b[^>]*>`, "gi"), "");

  return unmask(s);
}

const OWN_MARKER = /^\s*(?:\(?\d{1,2}[.)]|[A-Za-z][.)])\s/;
const hasOwnMarker = (t: string) => OWN_MARKER.test(t);
const stripLeadingMarker = (t: string) => t.replace(/^\s*\(?\d{1,2}[.)]\s*/, "");

// -------------------------------------------------------------- delimiters

/**
 * Repair the systematic `$$...$` shape — opens display, closes inline.
 *
 * 621 fields. Its symptom on both surfaces is a stray literal `$` printed in
 * the prose beside correctly-rendered maths, because the renderer pairs the
 * SECOND dollar with the closing one and leaves the first as text.
 *
 * A correct `$$...$$` is untouched: the negative lookahead refuses to treat the
 * first of a closing pair as a lone terminator.
 */
export function repairDollarImbalance(text: string): string {
  return text.replace(/\$\$([^$]*)\$(?!\$)/g, (_, inner: string) => `$${inner}$`);
}

/**
 * Rewrite dollar math to the repo's `\(...\)` / `\[...\]` convention.
 *
 * Zone detection reuses the renderer's own matcher via `maskMathZones`, so this
 * can never disagree with what actually renders — a hand-rolled dollar scanner
 * would, on the first `costs $500` in prose. Idempotent: text already using
 * `\(...\)` is masked as math and re-emitted unchanged.
 */
export function dollarsToTexDelims(text: string): string {
  const { masked, unmask } = maskMathZones(text);
  const restored = unmask(masked);
  if (restored !== text) return text; // defensive: masking must round-trip
  // Re-mask, then rewrite each zone as it is restored.
  const zones: string[] = [];
  const stashed = text.replace(
    /\\\[[\s\S]+?\\\]|\$\$[\s\S]+?\$\$|\\\([\s\S]+?\\\)|\$[^$\n]+?\$/g,
    (raw) => {
      zones.push(raw);
      return `\u0000Z${zones.length - 1}\u0000`;
    }
  );
  return stashed.replace(/\u0000Z(\d+)\u0000/g, (_, i: string) => {
    const raw = zones[Number(i)];
    if (raw.startsWith("$$") && raw.endsWith("$$")) return `${BS}[${raw.slice(2, -2)}${BS}]`;
    if (raw.startsWith("$") && raw.endsWith("$")) return `${BS}(${raw.slice(1, -1)}${BS})`;
    return raw; // already \(...\) or \[...\]
  });
}

// ------------------------------------------------------------ math unicode

/**
 * Unicode symbols that are unambiguous as LaTeX commands.
 *
 * `√` (radical) is deliberately ABSENT: `\sqrt` needs an operand, and
 * guessing how far the radicand extends is how a silent maths error ships. It
 * warns instead.
 */
const MATH_UNICODE: Record<string, string> = {
  "≤": `${BS}leq `,
  "≥": `${BS}geq `,
  "×": `${BS}times `,
  "÷": `${BS}div `,
  "∈": `${BS}in `,
  "∉": `${BS}notin `,
  "∪": `${BS}cup `,
  "∩": `${BS}cap `,
  "≠": `${BS}neq `,
  "±": `${BS}pm `,
  "∠": `${BS}angle `,
  "°": `^${BS}circ`,
  "−": "-",
  "–": "-",
  "—": "-",
  "α": `${BS}alpha `,
  "β": `${BS}beta `,
  "γ": `${BS}gamma `,
  "δ": `${BS}delta `,
  "θ": `${BS}theta `,
  "π": `${BS}pi `,
  "λ": `${BS}lambda `,
  "μ": `${BS}mu `,
  "σ": `${BS}sigma `,
  "Ω": `${BS}Omega `,
  "∞": `${BS}infty `,
  "…": `${BS}ldots `,
  "′": "'",
};

/** Non-ASCII we refuse to rewrite, because the right rewrite needs judgement. */
const RISKY_MATH_UNICODE = /[√∫∑∏₹✔]/;

/**
 * Rewrite unicode inside MATH ZONES ONLY, and turn `\newline` into `\\`.
 *
 * Prose unicode is left alone: 215 curly apostrophes, 94 rupee signs and 43 en
 * dashes live in prose and are correct there.
 */
export function fixMathUnicode(text: string): { text: string; warnings: NormaliseWarning[] } {
  const warnings: NormaliseWarning[] = [];
  const out = text.replace(
    /\\\[[\s\S]+?\\\]|\$\$[\s\S]+?\$\$|\\\([\s\S]+?\\\)|\$[^$\n]+?\$/g,
    (zone) => {
      let z = zone;
      for (const [ch, tex] of Object.entries(MATH_UNICODE)) {
        if (z.includes(ch)) z = z.split(ch).join(tex);
      }
      // `\newline` inside a matrix should be the row separator `\\`.
      z = z.replace(new RegExp(BS + BS + "newline", "g"), BS + BS);

      // A tilde opening a braced unit (`\mathrm{~cm}`) is an OCR artefact for a
      // thin space — 30 zones, all JIPMAT. temml keeps it and mathml2omml then
      // splits the braced text around it, so Word prints `1 c m` for `1 cm`.
      // The web renderer is unaffected, which is why this only showed up once
      // BOTH renderers were driven over the corpus.
      z = z.replace(/\{~/g, "{");
      // Any other tilde in maths is a space; make it an explicit thin space.
      z = z.replace(/~/g, BS + ",");
      const risky = z.match(RISKY_MATH_UNICODE);
      if (risky) {
        warnings.push({
          kind: "unmapped-math-unicode",
          detail: `${JSON.stringify(risky[0])} in ${JSON.stringify(zone.slice(0, 60))}`,
        });
      }
      // Each mapped command carries a trailing space so it cannot fuse with the
      // next token (`\leqx`). Where the source already had a space that makes
      // two — invisible in rendered maths, but noise in a diff — so collapse.
      return z
        .replace(/ {2,}/g, " ")
        .replace(/\s+\\\)/g, `${BS})`)
        .replace(/\s+\\\]/g, `${BS}]`);
    }
  );
  return { text: out, warnings };
}

// ------------------------------------------------------------ math spacers

/**
 * A math zone whose whole content is whitespace or a line-break command is a
 * FORMATTING HACK, not maths — turn it into a real line break.
 *
 * Two shapes in this corpus. `$  \n $` (jipmat 2024 VA Q8, Q10) was written to
 * force a line break; inline `$...$` forbids a newline, so it never became
 * maths and both dollars printed raw. `$$\newline$$` (jipmat 2022 VA Q34) does
 * parse, and renders a stray KaTeX line break where a paragraph break belongs.
 */
export function stripMathSpacers(text: string): string {
  const EMPTYISH = new RegExp(
    "^\\s*(?:" + BS + BS + "newline|" + BS + BS + BS + BS + ")?\\s*$"
  );

  // TWO PASSES, and the order is the whole trick.
  //
  // Pass A works on REAL zones only, found with the renderer's own matcher, and
  // collapses one whose content is empty-ish (`$$\newline$$`).
  //
  // Pass B then looks for a spacer-shaped `$ ... $` in what is LEFT, which by
  // construction is not a zone. Doing pass B first, or without masking, joins
  // two adjacent legitimate formulas: in `the $det$ $2AB^{-1}$ is`, the gap
  // between a CLOSING and an OPENING dollar is indistinguishable from a
  // whitespace-only spacer by local shape alone. That fault survived the unit
  // tests and was caught by the build gate on Indore 2019 SA Q4.
  const zones: string[] = [];
  let out = text.replace(
    /\\\[[\s\S]+?\\\]|\$\$[\s\S]+?\$\$|\\\([\s\S]+?\\\)|\$[^$\n]+?\$/g,
    (raw) => {
      const inner = raw.startsWith("$$")
        ? raw.slice(2, -2)
        : raw.startsWith("$")
          ? raw.slice(1, -1)
          : raw.slice(2, -2);
      if (EMPTYISH.test(inner)) return "\n";
      zones.push(raw);
      return `\u0000S${zones.length - 1}\u0000`;
    }
  );

  const content = "(?:\\s+|\\s*(?:" + BS + BS + "newline|" + BS + BS + BS + BS + ")\\s*)";
  out = out.replace(new RegExp("(?<!" + BS + BS + ")\\$" + content + "\\$", "g"), "\n");

  return out
    .replace(/\u0000S(\d+)\u0000/g, (_, i: string) => zones[Number(i)])
    .replace(/[ \t]*\n[ \t]*/g, "\n");
}

/**
 * True when a figure was pulled out of a pipe-table CELL.
 *
 * jipmat 2026 LR Q22 and two siblings match a list of groups against a list of
 * Venn diagrams: the diagrams ARE the answer set. Extracting them leaves
 * `| I. | |` — a table of empty cells that still reads as a complete question
 * and cannot be answered. Flagged, never silently repaired.
 */
export function figuresInsideTable(text: string): boolean {
  // Shape 1: an HTML cell holding a figure. Checked FIRST and separately,
  // because an HTML table sits on a single line with no pipes — so the
  // pipe-row test below cannot see it, and jipmat 2025 LR Q6 and Q13 lost
  // their answer set while the gate called them clean.
  if (/<t[dh]\b[^>]*>(?:(?!<\/t[dh]\s*>)[\s\S])*?<img\b/i.test(text)) return true;

  // Shape 2: a GFM pipe row holding a figure (jipmat 2026 LR Q22).
  return text
    .split("\n")
    .some((line) => (line.match(/(?<!\\)\|/g) ?? []).length >= 2 && /<img\b/i.test(line));
}

// ----------------------------------------------------------- gate predicates

/**
 * A `$` the renderer will print as prose because it never paired.
 *
 * Requires TWO unescaped dollars in one text run. A single one is ordinary
 * content — `Million USD ($)` — and `\$250 billion` is correctly escaped. The
 * first version of this flagged any `$` at all and so reported 7 false hits
 * against 2 real ones.
 */
export function hasStrayDollar(text: string): boolean {
  for (const seg of splitMathZones(text)) {
    if (seg.isMath) continue;
    const unescaped = seg.value.match(/(?<!\\)\$/g) ?? [];
    if (unescaped.length >= 2) return true;
  }
  return false;
}

/**
 * A pipe row that would render as raw `| a | b |` because it has no separator.
 *
 * Pipes are counted only OUTSIDE math zones. Counting them raw flagged every
 * absolute value in the corpus — `\(2|x| + 3|y| = 6\)` is four pipes and no
 * table — for 23 false hits and no real ones.
 */
export function hasUnseparatedPipeTable(text: string): boolean {
  const { masked } = maskMathZones(text);
  const lines = masked.split("\n");
  const isSep = (s: string) => /^[|\-:\s]*-{2,}[|\-:\s]*$/.test(s.trim());
  const pipes = (s: string) => (s.match(/(?<!\\)\|/g) ?? []).length;

  // TWO OR MORE CONSECUTIVE pipe-bearing lines is the table signal, not the
  // pipe count on one line. A 2-column row written without outer pipes
  // ("Head | Amount") carries a single pipe, so a >=2-per-line threshold
  // misses it entirely; meanwhile one prose line saying "choose a | b" is not
  // a table however many pipes it has.
  let run = 0;
  for (const line of lines) {
    if (isSep(line)) return false; // a separator anywhere means it is a real table
    if (pipes(line) >= 1 && line.trim() !== "") {
      run++;
      if (run >= 2) return true;
    } else {
      run = 0;
    }
  }
  return false;
}

/** Split into alternating prose / math runs, using the renderer's own matcher. */
function splitMathZones(text: string): { value: string; isMath: boolean }[] {
  const re = /\\\[[\s\S]+?\\\]|\$\$[\s\S]+?\$\$|\\\([\s\S]+?\\\)|\$[^$\n]+?\$/g;
  const out: { value: string; isMath: boolean }[] = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index! > last) out.push({ value: text.slice(last, m.index), isMath: false });
    out.push({ value: m[0], isMath: true });
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push({ value: text.slice(last), isMath: false });
  return out;
}

// ---------------------------------------------------------------- pipeline

/**
 * The whole conversion, in the one order that works.
 *
 * Order notes: the dollar imbalance is repaired BEFORE any math-zone masking,
 * because an unrepaired `$$X$` masks as a stray `$` plus a zone and the stray
 * would survive every later step. Style blocks go before table conversion so
 * their CSS never reaches a cell. Images and disclaimers come out before tag
 * handling so their attributes are still intact.
 */
export function normaliseText(input: string): NormalisedText {
  const warnings: NormaliseWarning[] = [];

  let s = decodeEntities(input);
  s = stripStyleBlocks(s);

  const dis = extractDisclaimers(s);
  s = dis.text;

  const img = extractImages(s);
  s = img.text;

  s = htmlTablesToPipe(s);
  // Spacers before the imbalance repair: `$  \n $` is whitespace-only and must
  // become a line break, not be "repaired" into a maths zone wrapping nothing.
  s = stripMathSpacers(s);
  s = repairDollarImbalance(s);
  s = convertHtmlInline(s);
  s = dollarsToTexDelims(s);

  const uni = fixMathUnicode(s);
  s = uni.text;
  warnings.push(...uni.warnings);

  s = normalizeNewlines(s);
  // tidy: trailing spaces, runs of blank lines, outer whitespace
  s = s
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  return {
    text: s,
    figures: img.images,
    disclaimers: dis.disclaimers,
    reconstructed: dis.reconstructed,
    warnings,
  };
}
