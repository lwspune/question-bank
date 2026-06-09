"use client";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { parseLatex, splitBold } from "./parseLatex";
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
  const segments = parseLatex(text);

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
        if (seg.type === "inline") {
          // Underlined English/Biology words are stored as a math zone
          // (\underline{\text{word}}); render them in the body font instead of
          // KaTeX so the typeface matches and line-clamp isn't broken. See
          // underlineBypass.ts (mirrors the docx UNDERLINE_BYPASS_RE).
          const u = matchUnderlineBypass(seg.content);
          if (u) {
            return (
              <span key={i}>
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
            );
          }
          return (
            <InlineMath key={i} renderError={renderError}>
              {seg.content}
            </InlineMath>
          );
        }
        return (
          <span key={i} style={{ whiteSpace: "pre-wrap" }}>
            {splitBold(seg.content).map((b, j) =>
              b.bold ? <strong key={j}>{b.text}</strong> : <span key={j}>{b.text}</span>
            )}
          </span>
        );
      })}
    </span>
  );
}
