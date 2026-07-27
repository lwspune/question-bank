"use client";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { parseRichSegments } from "./parseLatex";
import { matchUnderlineBypass } from "./underlineBypass";

interface Props {
  text: string;
  className?: string;
}

const renderError = (err: Error) => (
  <span className="text-destructive text-xs">{err.message}</span>
);

export default function KatexRenderer({ text, className }: Props) {
  if (!text) return null;
  // parseRichSegments (not parseLatex) so a **bold** span may CONTAIN math —
  // bold is resolved before the math split, and each run carries the flag.
  const segments = parseRichSegments(text);

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.type === "block") {
          return (
            <BlockMath key={i} renderError={renderError}>
              {seg.content}
            </BlockMath>
          );
        }
        let node: JSX.Element;
        if (seg.type === "inline") {
          // Underlined English/Biology words are stored as a math zone
          // (\underline{\text{word}}); render them in the body font instead of
          // KaTeX so the typeface matches and line-clamp isn't broken. See
          // underlineBypass.ts (mirrors the docx UNDERLINE_BYPASS_RE).
          const u = matchUnderlineBypass(seg.content);
          node = u ? (
            <span>
              <span
                style={{
                  textDecoration: "underline",
                  fontStyle: u.italic ? "italic" : undefined,
                }}
              >
                {u.word}
              </span>
              {u.trailing}
            </span>
          ) : (
            <InlineMath renderError={renderError}>{seg.content}</InlineMath>
          );
        } else {
          node = <span style={{ whiteSpace: "pre-wrap" }}>{seg.content}</span>;
        }
        return seg.bold ? <strong key={i}>{node}</strong> : <span key={i}>{node}</span>;
      })}
    </span>
  );
}
