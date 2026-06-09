/**
 * Web-renderer counterpart to `UNDERLINE_BYPASS_RE` in
 * `src/lib/export/ommlBuilder.ts` — KEEP THE TWO PATTERNS IN SYNC.
 *
 * The bank stores an underlined word (NDA English vocab/idioms, NDA Biology
 * taxonomy) as a KaTeX math zone: `\(\underline{\text{absently}}\)` or
 * `\(\underline{\textit{Homo sapiens}}\)`. Routing that through KaTeX typesets the
 * word in KaTeX_Main (a different typeface mid-sentence) AND wraps it in a
 * `.katex` inline-block that breaks `-webkit-line-clamp` on /browse collapsed
 * cards. So when an inline-math segment is EXACTLY this pattern, the renderer
 * emits a native underlined `<span>` in the surrounding body font instead.
 *
 * Anything else — genuine math (`x^2`, matrices), chained `\text{}\text{}`,
 * `\textbf`/`\textbf` variants, or an underline embedded in a larger expression —
 * does NOT match and falls through to KaTeX unchanged.
 */
export const UNDERLINE_BYPASS_RE =
  /^\s*\\underline\{\s*\\(text|textit)\{([^{}]+)\}\s*\}\s*([.,;:!?]?)\s*$/;

export type UnderlineBypass = { word: string; italic: boolean; trailing: string };

/** Returns the underlined word + flags if `content` (an inline-math segment, sans
 * `\(...\)` delimiters) is exactly the bypass pattern; otherwise null. */
export function matchUnderlineBypass(content: string): UnderlineBypass | null {
  const m = UNDERLINE_BYPASS_RE.exec(content);
  if (!m) return null;
  return { word: m[2], italic: m[1] === "textit", trailing: m[3] ?? "" };
}
