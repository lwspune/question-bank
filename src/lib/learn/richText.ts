// Copied from Concept Ladder (src/lib/richText.ts, afca8bf).
import katex from "katex";
import type { RenderedBlock, RenderedInline } from "./renderedText";

/**
 * Minimal rich text for authored content: `$…$` inline math, `$$…$$` display
 * math, `**bold**`, `*italic*`, `- ` list lines, blank-line paragraphs.
 * Text stays text (React escapes it); only KaTeX output is HTML.
 */

export type Inline =
  | { type: "text"; text: string; bold: boolean; italic: boolean }
  | { type: "math"; tex: string; bold: boolean };

export type Block =
  | { type: "paragraph"; inline: Inline[] }
  | { type: "list"; items: Inline[][] }
  | { type: "math"; tex: string };

export function parseInline(src: string): Inline[] {
  const out: Inline[] = [];
  let bold = false;
  let italic = false;
  let buf = "";

  const flush = () => {
    if (buf) out.push({ type: "text", text: buf, bold, italic });
    buf = "";
  };

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === "$") {
      const end = src.indexOf("$", i + 1);
      if (end === -1) {
        buf += src.slice(i);
        break;
      }
      flush();
      out.push({ type: "math", tex: src.slice(i + 1, end), bold });
      i = end;
    } else if (ch === "*" && src[i + 1] === "*") {
      flush();
      bold = !bold;
      i++;
    } else if (ch === "*") {
      flush();
      italic = !italic;
    } else {
      buf += ch;
    }
  }
  flush();
  return out;
}

export function parseRichText(src: string): Block[] {
  const blocks: Block[] = [];
  const parts = src.split(/\$\$([\s\S]*?)\$\$/);
  parts.forEach((part, i) => {
    if (i % 2 === 1) {
      blocks.push({ type: "math", tex: part.trim() });
    } else {
      blocks.push(...parseTextBlocks(part));
    }
  });
  return blocks;
}

function parseTextBlocks(src: string): Block[] {
  const blocks: Block[] = [];
  let para: string[] = [];
  let list: string[] = [];

  const flushPara = () => {
    if (para.length) blocks.push({ type: "paragraph", inline: parseInline(para.join(" ")) });
    para = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type: "list", items: list.map(parseInline) });
    list = [];
  };

  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
    } else if (line.startsWith("- ")) {
      flushPara();
      list.push(line.slice(2));
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return blocks;
}

/** KaTeX HTML. `trust: false` blocks \href, \url and other link/HTML commands. */
export function renderMath(tex: string, display: boolean): string {
  return katex.renderToString(tex, { displayMode: display, throwOnError: false, trust: false, strict: "ignore" });
}

const CLOSING = /^[.,;:!?)\]]+/;
const OPENING = /[([]+$/;

/**
 * Renders math, and moves punctuation that touches it (a full stop after, a
 * bracket before) onto the math node, so the two wrap as one: a phone line
 * never starts with a stranded ".".
 */
function renderInline(nodes: Inline[]): RenderedInline[] {
  const out: RenderedInline[] = nodes.map((n) =>
    n.type === "math" ? { type: "math", html: renderMath(n.tex, false), bold: n.bold, before: "", after: "" } : { ...n },
  );
  out.forEach((n, i) => {
    if (n.type !== "math") return;
    const prev = out[i - 1];
    const next = out[i + 1];
    if (prev?.type === "text") {
      const m = prev.text.match(OPENING);
      if (m) {
        n.before = m[0];
        prev.text = prev.text.slice(0, -m[0].length);
      }
    }
    if (next?.type === "text") {
      const m = next.text.match(CLOSING);
      if (m) {
        n.after = m[0];
        next.text = next.text.slice(m[0].length);
      }
    }
  });
  return out.filter((n) => n.type === "math" || n.text !== "");
}

/** Parses and pre-renders math on the server; the result is safe to send to the client. */
export function renderRichText(src: string): RenderedBlock[] {
  return parseRichText(src).map((b) => {
    if (b.type === "math") return { type: "math", html: renderMath(b.tex, true) };
    if (b.type === "list") return { type: "list", items: b.items.map(renderInline) };
    return { type: "paragraph", inline: renderInline(b.inline) };
  });
}

/** Single line (no paragraphs), pre-rendered. */
export function renderInlineText(src: string): RenderedInline[] {
  return renderInline(parseInline(src));
}
