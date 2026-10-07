export type Segment = { type: "text" | "inline" | "block"; content: string };

/** Math zone matcher, shared by parseLatex + parseRichText. */
const MATH_PATTERN =
  /(\\\[[\s\S]+?\\\]|\$\$[\s\S]+?\$\$|\\\([\s\S]+?\\\)|\$[^$\n]+?\$)/g;

/**
 * Sentinels wrapping a masked math-zone index. Private-Use-Area code points
 * never appear in question or notes content, so they can't collide; building
 * them with fromCharCode keeps the source pure ASCII.
 */
const MASK_OPEN = String.fromCharCode(0xe000);
const MASK_CLOSE = String.fromCharCode(0xe001);

/**
 * Split a plain-text run on Markdown bold (`**...**`) into alternating
 * bold / non-bold pieces. Empty pieces are dropped. A lone (unpaired) `**`
 * stays as literal text. Pure + side-effect free.
 */
export function splitBold(text: string): { bold: boolean; text: string }[] {
  const out: { bold: boolean; text: string }[] = [];
  const re = /\*\*([\s\S]+?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push({ bold: false, text: text.slice(last, m.index) });
    out.push({ bold: true, text: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ bold: false, text: text.slice(last) });
  return out;
}

/**
 * Single-asterisk `*italic*`, STRICT form: the opening star must follow the
 * start of a line, whitespace or opening punctuation and precede a non-space;
 * the closing star must follow a non-space and precede the end, whitespace or
 * punctuation; both on one line. Deliberately stricter than CommonMark, which
 * allows intra-word emphasis and would italicize `sigma_x*sigma_y*`.
 *
 * Measured 2026-10-07 over every row and the /notes + /guide sources: this
 * rule italicizes 1,716 intended spans and leaves all 904 other asterisks
 * (multiplication, inline bullets, footnote markers, broken bold) exactly as
 * they were. tests/render-italic-contract.test.ts pins both halves.
 */
const ITALIC_RE =
  /(^|[\s(\[{"'“‘/—–-])\*(?=[^\s*])([^*\n]*?[^\s*])\*(?=$|[\s)\]}"'”’.,;:!?/—–-])/gm;
/** A masked math zone, ignored when asking "does this span hold any text?". */
const MASKED_ZONE_RE = new RegExp(`${MASK_OPEN}\\d+${MASK_CLOSE}`, "g");

/**
 * Split a NON-bold run on `*italic*` into italic / plain pieces, verbatim
 * otherwise. A span must contain a letter or digit outside maths, so junk such
 * as the `*\*` a Word conversion left in some solutions stays literal. Run it on
 * text whose maths is already masked (as runsFromMasked does), so a `*` inside
 * \(...\) can never open or close italics. Pure.
 */
export function splitItalic(text: string): { italic: boolean; text: string }[] {
  const out: { italic: boolean; text: string }[] = [];
  const re = new RegExp(ITALIC_RE.source, "gm");
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (!/[\p{L}\p{N}]/u.test(m[2].replace(MASKED_ZONE_RE, ""))) continue;
    const open = m.index + m[1].length;
    if (open > last) out.push({ italic: false, text: text.slice(last, open) });
    out.push({ italic: true, text: m[2] });
    last = open + m[2].length + 2;
  }
  if (last < text.length) out.push({ italic: false, text: text.slice(last) });
  return out;
}

/**
 * Mask every math zone (`\(...\)`, `\[...\]`, `$...$`, `$$...$$`) to an opaque
 * Private-Use-Area sentinel and return the masked string plus an `unmask` that
 * restores the ORIGINAL math verbatim. Lets line/pipe/structure scanners (e.g.
 * the table parser) operate without mistaking a `|` inside `\(|A|\)` for a
 * column separator. Pure; additive — `parseRichText` keeps its own inline copy.
 */
export function maskMathZones(input: string): {
  masked: string;
  unmask: (s: string) => string;
} {
  const zones: string[] = [];
  const masked = input.replace(MATH_PATTERN, (raw) => {
    const i = zones.length;
    zones.push(raw);
    return MASK_OPEN + i + MASK_CLOSE;
  });
  const re = new RegExp(MASK_OPEN + "(\\d+)" + MASK_CLOSE, "g");
  const unmask = (s: string) => s.replace(re, (_, i) => zones[Number(i)] ?? "");
  return { masked, unmask };
}

/**
 * A run of rendered content: plain text or a math zone, optionally bold.
 *
 * Bold is a FLAG, not a segment type, because a `**...**` span may contain
 * math — `**order \(m \times n\)**` is one bold span spread over a text run
 * and a math run. (It used to be `{type:"bold"}`, which couldn't express that.)
 */
export type RichSegment = {
  type: "text" | "inline" | "block";
  content: string;
  bold?: true;
  /** `*italic*` (single asterisk, strict rule — see splitItalic). */
  italic?: true;
};

/** Alias kept for the notes renderer, which speaks in "runs". */
export type RichInline = RichSegment;

export type RichBlock =
  | { type: "paragraph"; runs: RichInline[] }
  | { type: "list"; items: RichInline[][] };

type Zone = { type: "inline" | "block"; content: string };

const MASK_RE = new RegExp(MASK_OPEN + "(\\d+)" + MASK_CLOSE, "g");

/**
 * Several lines of working stored as ONE display equation (2026-10-07).
 *
 * A source conversion packed multi-line solutions into `\[{line 1}{line 2}\]`:
 * one brace group per line, side by side, so KaTeX drew them on one line and
 * they ran together or off the page (~240 public rows, JEE and NDA solutions
 * mostly). When a display is NOTHING BUT two or more non-empty top-level
 * groups, they are stacked with `gathered`; anything else (a single group,
 * `{x}^{2}`, text between groups, unbalanced braces) is returned unchanged.
 * Pure; applied to display math only, by maskZones, so the site, the PDF and
 * the Word file all draw it the same way.
 */
export function stackGroupedLines(tex: string): string {
  const groups: string[] = [];
  let i = 0;
  const n = tex.length;
  while (i < n) {
    while (i < n && /\s/.test(tex[i])) i++;
    if (i >= n) break;
    if (tex[i] !== "{") return tex;
    let depth = 0;
    let j = i;
    for (; j < n; j++) {
      const c = tex[j];
      if (c === "\\") {
        j++;
        continue;
      }
      if (c === "{") depth++;
      else if (c === "}" && --depth === 0) break;
    }
    if (j >= n) return tex;
    groups.push(tex.slice(i + 1, j).trim());
    i = j + 1;
  }
  if (groups.length < 2 || groups.some((g) => g === "")) return tex;
  return `\\begin{gathered}${groups.join(" \\\\ ")}\\end{gathered}`;
}

/** Replace math zones with sentinels, returning the zones in mask order. */
function maskZones(input: string): { masked: string; zones: Zone[] } {
  const zones: Zone[] = [];
  const masked = input.replace(MATH_PATTERN, (raw) => {
    let type: "inline" | "block";
    let content: string;
    if (raw.startsWith("\\[") || raw.startsWith("$$")) {
      type = "block";
      content = stackGroupedLines(raw.slice(2, -2).trim());
    } else if (raw.startsWith("\\(")) {
      type = "inline";
      content = raw.slice(2, -2).trim();
    } else {
      type = "inline";
      content = raw.slice(1, -1).trim();
    }
    const i = zones.length;
    zones.push({ type, content });
    return MASK_OPEN + i + MASK_CLOSE;
  });
  return { masked, zones };
}

const seg = (
  type: RichSegment["type"],
  content: string,
  bold: boolean,
  italic = false
): RichSegment => ({
  type,
  content,
  ...(bold ? { bold: true as const } : {}),
  ...(italic ? { italic: true as const } : {}),
});

/**
 * Build runs from an ALREADY-MASKED string. Bold is resolved FIRST, on the
 * masked text, so a bold span can span math zones; only then is each bold /
 * non-bold piece split at the math sentinels. Doing it the other way round
 * (the original bug) left the opening and closing `**` in different strings,
 * so neither paired and both printed literally.
 */
function runsFromMasked(masked: string, zones: Zone[]): RichSegment[] {
  const out: RichSegment[] = [];
  const emit = (text: string, bold: boolean, italic: boolean) => {
    MASK_RE.lastIndex = 0;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = MASK_RE.exec(text)) !== null) {
      if (m.index > last) out.push(seg("text", text.slice(last, m.index), bold, italic));
      const z = zones[Number(m[1])];
      if (z) out.push(seg(z.type, z.content, bold, italic));
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push(seg("text", text.slice(last), bold, italic));
  };
  for (const piece of splitBold(masked)) {
    // Italic is resolved only OUTSIDE bold: a star inside a bold span renders
    // as it always has (literal), so no existing bold span changes.
    if (piece.bold) emit(piece.text, true, false);
    else for (const ip of splitItalic(piece.text)) emit(ip.text, false, ip.italic);
  }
  return out;
}

/**
 * Parse an inline string into text / math runs carrying a `bold` flag —
 * the flat counterpart of `parseRichText` (which adds paragraph + list
 * structure). Used by <KatexRenderer> and the docx exporter so all three
 * surfaces resolve `**bold**` and math identically.
 *
 * Note this is NOT `parseLatex` with extra fields: `parseLatex` keeps its
 * bold-blind contract because ~10 ingestion/audit scripts iterate its output
 * looking only for math zones.
 */
export function parseRichSegments(input: string): RichSegment[] {
  if (!input) return [];
  const { masked, zones } = maskZones(input);
  return runsFromMasked(masked, zones);
}

/**
 * Parse a rich-text string into block structure for the notes renderer:
 * paragraphs and `- ` / `bullet` lists, each carrying inline runs of
 * text / bold / inline-math / block-math. Math zones are masked before the
 * line split so a multi-line block math can't be mistaken for separate lines.
 * Pure; the rendering lives in <RichText>.
 */
export function parseRichText(input: string): RichBlock[] {
  if (!input) return [];

  // Mask BEFORE the line split so a multi-line block math can't be mistaken
  // for separate lines; each line is then turned into runs against the same
  // zone table.
  const { masked, zones } = maskZones(input);
  const toRuns = (content: string): RichInline[] => runsFromMasked(content, zones);

  const blocks: RichBlock[] = [];
  let paraBuf: string[] = [];
  let listBuf: string[] = [];
  const flushPara = () => {
    if (paraBuf.length) {
      blocks.push({ type: "paragraph", runs: toRuns(paraBuf.join("\n")) });
      paraBuf = [];
    }
  };
  const flushList = () => {
    if (listBuf.length) {
      blocks.push({ type: "list", items: listBuf.map((it) => toRuns(it)) });
      listBuf = [];
    }
  };

  for (const line of masked.split("\n")) {
    const bullet = /^\s*[-•]\s+(.*)$/.exec(line);
    if (bullet) {
      flushPara();
      listBuf.push(bullet[1]);
    } else {
      flushList();
      if (line.trim() === "") flushPara();
      else paraBuf.push(line);
    }
  }
  flushList();
  flushPara();
  return blocks;
}

export function parseLatex(input: string): Segment[] {
  if (!input) return [];

  // Order: block delimiters first so \[...\] beats \(...\) and $$...$$ beats $...$
  // when the regex engine has alternative matches at the same position.
  const pattern =
    /(\\\[[\s\S]+?\\\]|\$\$[\s\S]+?\$\$|\\\([\s\S]+?\\\)|\$[^$\n]+?\$)/g;

  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: "text",
        content: input.slice(lastIndex, match.index),
      });
    }
    const raw = match[0];
    if (raw.startsWith("\\[") || raw.startsWith("$$")) {
      segments.push({ type: "block", content: raw.slice(2, -2).trim() });
    } else if (raw.startsWith("\\(")) {
      segments.push({ type: "inline", content: raw.slice(2, -2).trim() });
    } else {
      segments.push({ type: "inline", content: raw.slice(1, -1).trim() });
    }
    lastIndex = match.index + raw.length;
  }

  if (lastIndex < input.length) {
    segments.push({ type: "text", content: input.slice(lastIndex) });
  }

  return segments;
}
