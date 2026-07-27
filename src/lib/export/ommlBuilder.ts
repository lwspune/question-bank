import temml from "temml";
import { mml2omml } from "mathml2omml";
import { parseRichSegments } from "@/components/math/parseLatex";

export type OmmlSegment =
  | { type: "text"; content: string; bold?: true }
  | { type: "math"; content: string; display: boolean }
  | { type: "underlined-text"; content: string; italic: boolean };

// Word's <m:borderBox> with three sides hidden (the OMML mathml2omml
// emits for \underline{\text{x}}) does not render visibly under the
// <m:mathPr defJc="left" wrapIndent="0" lMargin="0" rMargin="0">
// defaults we inject for fraction alignment. Bypass the math pipeline
// for the documented underline patterns and emit a marker the docx
// builder turns into a native Word run with <w:u w:val="single"/>.
// Anchored to the whole inline segment + flat brace contents — any
// other shape falls through to the OMML pipeline (broken but unchanged).
//
// Trailing-punctuation capture covers the real-bank pattern where
// authors put sentence-ending punctuation inside the math delimiters
// (e.g. `\(\underline{\text{insidious}}.\)`). When matched it's split
// off into a separate text segment so it renders after the underline.
export const UNDERLINE_BYPASS_RE =
  /^\s*\\underline\{\s*\\(text|textit)\{([^{}]+)\}\s*\}\s*([.,;:!?]?)\s*$/;

/**
 * Convert a LaTeX string to OMML XML. Returns null if the LaTeX cannot be parsed.
 * Caller should fall back to rendering the raw text so the document stays readable.
 */
export function latexToOmml(
  latex: string,
  displayMode: boolean = false
): string | null {
  try {
    const mathml = temml.renderToString(latex, {
      displayMode,
      throwOnError: true,
    });
    if (!mathml) return null;
    const omml = mml2omml(mathml);
    if (!omml || typeof omml !== "string" || !omml.includes("m:oMath")) {
      return null;
    }
    return wrapAccents(wrapMatrixDelimiters(sanitizeOmmlForXml(omml)));
  } catch {
    return null;
  }
}

/**
 * Defensive XML-escape pass over <m:t>...</m:t> text content. mml2omml
 * (and temml upstream) sometimes emit raw `<` / `>` / `&` inside math text
 * — for example a LaTeX comparator like `0 < \alpha < 90` produces
 * `<m:t>0<α<90</m:t>` which Word's strict XML parser rejects.
 *
 * Only operates inside m:t bodies; pre-existing entities are left alone.
 * Self-closing `<m:t/>` is unaffected (no content to fix).
 */
export function sanitizeOmmlForXml(omml: string): string {
  return omml.replace(
    /<m:t(\s[^>]*)?>([\s\S]*?)<\/m:t>/g,
    (_, attrs, content) => `<m:t${attrs ?? ""}>${escapeXmlText(content)}</m:t>`
  );
}

// mml2omml converts a LaTeX matrix environment's grid to a proper OMML
// matrix (<m:m>), but renders the surrounding stretchy fence operators
// (the (), [], or || from pmatrix/bmatrix/vmatrix) as plain single-line
// text runs flanking the grid — so Word draws tiny, detached brackets
// that don't enclose the matrix. Rewrite the `fence-run + <m:m> + fence-run`
// shape into a real OMML delimiter object (<m:d>) whose begChr/endChr Word
// stretches to the matrix height — turning vmatrix into a proper
// determinant and pmatrix/bmatrix into proper bracketed matrices.
//
// Only a fence run IMMEDIATELY adjacent to <m:m> is consumed, so ordinary
// parenthesised math (f(x)) and a fence-less \begin{matrix} are untouched.
const MATRIX_FENCE_CLOSE: Record<string, string> = {
  "(": ")",
  "[": "]",
  "|": "|",
  "{": "}",
  "‖": "‖",
};

const MATRIX_DELIM_RE = new RegExp(
  // opening fence run, immediately before the matrix
  "<m:r>(?:<m:rPr>[\\s\\S]*?</m:rPr>)?<m:t[^>]*>([(\\[|{‖])</m:t></m:r>" +
    // the matrix grid (matrices don't nest in this bank)
    "(<m:m>[\\s\\S]*?</m:m>)" +
    // closing fence run, immediately after
    "<m:r>(?:<m:rPr>[\\s\\S]*?</m:rPr>)?<m:t[^>]*>([)\\]|}‖])</m:t></m:r>",
  "g"
);

export function wrapMatrixDelimiters(omml: string): string {
  return omml.replace(MATRIX_DELIM_RE, (whole, open, matrix, close) => {
    // Only wrap when the captured chars form a recognised fence pair; a
    // mismatched open/close is left untouched (defensive — shouldn't occur
    // for temml-emitted matrices).
    if (MATRIX_FENCE_CLOSE[open] !== close) return whole;
    return (
      "<m:d><m:dPr>" +
      `<m:begChr m:val="${open}"/>` +
      `<m:endChr m:val="${close}"/>` +
      "<m:ctrlPr/></m:dPr>" +
      `<m:e>${matrix}</m:e></m:d>`
    );
  });
}

// mml2omml maps temml's single-base accents (\bar \hat \vec \dot \tilde) to an
// over-LIMIT <m:limUpp> whose <m:lim> is the accent character. Word renders a
// limit at reduced size, detached above the base — so x-bar shows as a tiny
// floating dash instead of a proper bar. Rewrite a limUpp whose lim is exactly
// one recognised accent char into <m:acc> with the matching COMBINING char,
// which Word draws as a full-size accent bound to the base. A limUpp with any
// other lim content (real \lim / \overset / \overbrace) is left untouched.
const ACCENT_COMBINING: Record<string, string> = {
  "‾": "̅", // ‾ overline       → combining overline   (\bar)
  "¯": "̅", // ¯ macron         → combining overline
  "^": "̂", //       circumflex      → combining circumflex  (\hat)
  "ˆ": "̂", // ˆ modifier hat   → combining circumflex
  "→": "⃗", // → right arrow    → combining arrow above (\vec)
  "˙": "̇", // ˙ dot above      → combining dot above   (\dot)
  "~": "̃", //       tilde           → combining tilde       (\tilde)
  "˜": "̃", // ˜ small tilde    → combining tilde
};

const LIMUPP_ACCENT_RE = new RegExp(
  "<m:limUpp><m:e>([\\s\\S]*?)</m:e>" +
    "<m:lim><m:r>(?:<m:rPr>[\\s\\S]*?</m:rPr>)?<m:t[^>]*>([\\s\\S])</m:t></m:r></m:lim>" +
    "</m:limUpp>",
  "g"
);

// \overline in math mode maps to a <m:borderBox> with bottom+left+right hidden
// (a top-only border) that does NOT render under our injected math defaults.
// Rewrite that top-only box → <m:bar pos=top> (overline), which Word draws
// reliably. A bottom-only box (\underline in math) is LEFT as a borderBox — the
// \underline text bypass (native <w:u>) already covers the common case, and the
// borderBox fallback for rare bare-\underline shapes is intentionally preserved
// (see tests/underline-roundtrip.test.ts).
const BORDERBOX_RE = new RegExp(
  "<m:borderBox><m:borderBoxPr>([\\s\\S]*?)</m:borderBoxPr><m:e>([\\s\\S]*?)</m:e></m:borderBox>",
  "g"
);

export function wrapAccents(omml: string): string {
  let out = omml.replace(LIMUPP_ACCENT_RE, (whole, base, chr) => {
    const combining = ACCENT_COMBINING[chr];
    if (!combining) return whole; // not an accent (real limit) — leave alone
    return (
      `<m:acc><m:accPr><m:chr m:val="${combining}"/><m:ctrlPr/></m:accPr>` +
      `<m:e>${base}</m:e></m:acc>`
    );
  });
  out = out.replace(BORDERBOX_RE, (whole, pr, base) => {
    const hideTop = pr.includes("m:hideTop");
    const hideBot = pr.includes("m:hideBot");
    const hideLeft = pr.includes("m:hideLeft");
    const hideRight = pr.includes("m:hideRight");
    // overline: only the top border is drawn (bot+left+right hidden)
    if (hideBot && hideLeft && hideRight && !hideTop)
      return `<m:bar><m:barPr><m:pos m:val="top"/><m:ctrlPr/></m:barPr><m:e>${base}</m:e></m:bar>`;
    // underline (bottom-only) and any other box are LEFT alone — see note above.
    return whole;
  });
  return out;
}

function escapeXmlText(s: string): string {
  return s
    .replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const OVERLINE = "̅"; // combining overline (drawn after a base char)

// LaTeX macro → Unicode symbol. Negative lookahead (?![a-zA-Z]) matches a whole
// control word (\cup but not \cupfoo), independent of what follows — a plain
// \b breaks when the next char is a letter (e.g. \cap\bar → \cap∩bar).
const PRETTIFY_TOKENS: [RegExp, string][] = [
  [/\\cup(?![a-zA-Z])/g, "∪"],
  [/\\cap(?![a-zA-Z])/g, "∩"],
  [/\\subseteq(?![a-zA-Z])/g, "⊆"],
  [/\\subsetneq(?![a-zA-Z])/g, "⊊"],
  [/\\subset(?![a-zA-Z])/g, "⊂"],
  [/\\supseteq(?![a-zA-Z])/g, "⊇"],
  [/\\supset(?![a-zA-Z])/g, "⊃"],
  [/\\setminus(?![a-zA-Z])/g, "∖"],
  [/\\triangle(?![a-zA-Z])/g, "△"],
  [/\\notin(?![a-zA-Z])/g, "∉"],
  [/\\in(?![a-zA-Z])/g, "∈"],
  [/\\varnothing(?![a-zA-Z])/g, "∅"],
  [/\\emptyset(?![a-zA-Z])/g, "∅"],
  [/\\times(?![a-zA-Z])/g, "×"],
  [/\\cdot(?![a-zA-Z])/g, "·"],
  [/\\leq(?![a-zA-Z])/g, "≤"],
  [/\\geq(?![a-zA-Z])/g, "≥"],
  [/\\neq(?![a-zA-Z])/g, "≠"],
  [/\\ne(?![a-zA-Z])/g, "≠"],
];

// Single-char superscripts we can render as a real Unicode glyph: set
// complement (c) and small powers. `n` covers the common cardinality exponent.
const PRETTIFY_SUP: Record<string, string> = {
  c: "ᶜ",
  C: "ᶜ",
  "1": "¹",
  "2": "²",
  "3": "³",
  n: "ⁿ",
};

/**
 * Best-effort LaTeX → readable-Unicode rendering for a math zone the OMML
 * pipeline could NOT convert (temml/mml2omml failed → null). Used ONLY on the
 * fallback path, so it never touches convertible math; the goal is that a Word
 * paper shows `(A ∪ B)ᶜ` instead of raw `\((A \cup B)^c\)` markup.
 *
 * It deliberately does NOT restructure math (no complement-vs-derivative
 * guessing, no re-parenthesising) — worst case an unmapped macro is left
 * verbatim, which is never worse than today's raw fallback. Export-path only;
 * the website (KaTeX) is unaffected. Pure.
 */
export function prettifyMathFallback(latex: string): string {
  let s = latex;
  // Token macros first, while every macro's leading `\` boundary is intact.
  for (const [re, ch] of PRETTIFY_TOKENS) s = s.replace(re, ch);
  // \overline{…}/\bar{…}: overline each base char (skip spaces).
  s = s.replace(/\\(?:overline|bar)\s*\{([^{}]*)\}/g, (_, inner: string) =>
    [...inner].map((c) => (c === " " ? c : c + OVERLINE)).join("")
  );
  // Single-level fractions.
  s = s.replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "$1/$2");
  // Complement/power superscripts (\^c, \^{c}, \^2, …); leave others as `^x`.
  s = s.replace(
    /\^\{([cC123n])\}|\^([cC123n])/g,
    (_, a: string, b: string) => PRETTIFY_SUP[a ?? b] ?? `^${a ?? b}`
  );
  // Spacing/delimiter cleanup, then prime.
  s = s
    .replace(/\\left(?![a-zA-Z])|\\right(?![a-zA-Z])/g, "")
    .replace(/\\([{}])/g, "$1")
    .replace(/\\[,;!]/g, " ")
    .replace(/\\ /g, " ")
    .replace(/\\[()[\]]/g, "")
    .replace(/'/g, "′");
  return s.replace(/[ \t]{2,}/g, " ").trim();
}

/**
 * Tokenize a question/option/solution text into a flat list of text and OMML
 * segments, ready to be emitted into a docx Paragraph.
 */
export function textWithMathToOmmlSegments(text: string): OmmlSegment[] {
  // parseRichSegments (not parseLatex) so Markdown `**bold**` is resolved —
  // it used to pass straight through and print as literal ** in every
  // downloaded paper — and so a bold span may CONTAIN math.
  const parsed = parseRichSegments(text);
  const out: OmmlSegment[] = [];
  for (const seg of parsed) {
    if (seg.type === "text") {
      out.push(
        seg.bold
          ? { type: "text", content: seg.content, bold: true }
          : { type: "text", content: seg.content }
      );
      continue;
    }
    if (seg.type === "inline") {
      const match = UNDERLINE_BYPASS_RE.exec(seg.content);
      if (match) {
        out.push({
          type: "underlined-text",
          content: match[2],
          italic: match[1] === "textit",
        });
        if (match[3]) out.push({ type: "text", content: match[3] });
        continue;
      }
    }
    const isBlock = seg.type === "block";
    const omml = latexToOmml(seg.content, isBlock);
    if (omml) {
      out.push({ type: "math", content: omml, display: isBlock });
    } else {
      // Fallback: OMML conversion failed (temml/mml2omml). Emit readable
      // Unicode instead of raw \(...\) markup so the Word paper stays legible.
      // See prettifyMathFallback — this is the construct-agnostic safety net
      // that catches the mml2omml superscript-on-\cap/\cup-group crash and any
      // future conversion failure. Surfaced by `npm run audit:omml`.
      const fallback = prettifyMathFallback(seg.content);
      out.push(
        seg.bold
          ? { type: "text", content: fallback, bold: true }
          : { type: "text", content: fallback }
      );
    }
  }
  return out;
}
