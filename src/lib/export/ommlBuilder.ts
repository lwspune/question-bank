import temml from "temml";
import { mml2omml } from "mathml2omml";
import { parseLatex } from "@/components/math/parseLatex";

export type OmmlSegment =
  | { type: "text"; content: string }
  | { type: "math"; content: string; display: boolean };

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
    return omml;
  } catch {
    return null;
  }
}

/**
 * Tokenize a question/option/solution text into a flat list of text and OMML
 * segments, ready to be emitted into a docx Paragraph.
 */
export function textWithMathToOmmlSegments(text: string): OmmlSegment[] {
  const parsed = parseLatex(text);
  const out: OmmlSegment[] = [];
  for (const seg of parsed) {
    if (seg.type === "text") {
      out.push({ type: "text", content: seg.content });
      continue;
    }
    const isBlock = seg.type === "block";
    const omml = latexToOmml(seg.content, isBlock);
    if (omml) {
      out.push({ type: "math", content: omml, display: isBlock });
    } else {
      // Fallback: keep the raw LaTeX as text so the question is still readable.
      const wrapped =
        seg.type === "inline"
          ? `\\(${seg.content}\\)`
          : `\\[${seg.content}\\]`;
      out.push({ type: "text", content: wrapped });
    }
  }
  return out;
}
