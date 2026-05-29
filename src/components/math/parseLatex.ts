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

export type RichInline =
  | { type: "text"; content: string }
  | { type: "bold"; content: string }
  | { type: "inline"; content: string }
  | { type: "block"; content: string };

export type RichBlock =
  | { type: "paragraph"; runs: RichInline[] }
  | { type: "list"; items: RichInline[][] };

/**
 * Parse a rich-text string into block structure for the notes renderer:
 * paragraphs and `- ` / `bullet` lists, each carrying inline runs of
 * text / bold / inline-math / block-math. Math zones are masked before the
 * line split so a multi-line block math can't be mistaken for separate lines.
 * Pure; the rendering lives in <RichText>.
 */
export function parseRichText(input: string): RichBlock[] {
  if (!input) return [];

  const zones: { type: "inline" | "block"; content: string }[] = [];
  const masked = input.replace(MATH_PATTERN, (raw) => {
    let type: "inline" | "block";
    let content: string;
    if (raw.startsWith("\\[") || raw.startsWith("$$")) {
      type = "block";
      content = raw.slice(2, -2).trim();
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

  const pushTextRuns = (runs: RichInline[], text: string) => {
    for (const seg of splitBold(text)) {
      if (seg.text === "") continue;
      runs.push(seg.bold ? { type: "bold", content: seg.text } : { type: "text", content: seg.text });
    }
  };

  const maskRe = new RegExp(MASK_OPEN + "(\\d+)" + MASK_CLOSE, "g");
  const toRuns = (content: string): RichInline[] => {
    const runs: RichInline[] = [];
    maskRe.lastIndex = 0;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = maskRe.exec(content)) !== null) {
      if (m.index > last) pushTextRuns(runs, content.slice(last, m.index));
      const z = zones[Number(m[1])];
      runs.push({ type: z.type, content: z.content });
      last = m.index + m[0].length;
    }
    if (last < content.length) pushTextRuns(runs, content.slice(last));
    return runs;
  };

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
