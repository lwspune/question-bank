"use client";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { parseRichText, type RichInline } from "./parseLatex";

/**
 * Block-aware renderer for authored prose fields (notes definitions):
 * paragraphs + `- ` bullet lists, with inline **bold** and \(math\).
 * Returns block elements, so use it inside a block container (a <div>),
 * never inline. For inline content (options, breadcrumbs) use KatexRenderer.
 */

interface Props {
  text: string;
  className?: string;
}

const renderError = (err: Error) => (
  <span className="text-destructive text-xs">{err.message}</span>
);

function renderRuns(runs: RichInline[]) {
  return runs.map((r, i) => {
    // Block math is never wrapped in <strong>: it renders a block element
    // (invalid inside inline markup) and KaTeX sets its own font anyway, so
    // the bold flag would be visually inert.
    if (r.type === "block") {
      return (
        <BlockMath key={i} renderError={renderError}>
          {r.content}
        </BlockMath>
      );
    }
    const node =
      r.type === "inline" ? (
        <InlineMath renderError={renderError}>{r.content}</InlineMath>
      ) : (
        <span style={{ whiteSpace: "pre-wrap" }}>{r.content}</span>
      );
    return r.bold ? <strong key={i}>{node}</strong> : <span key={i}>{node}</span>;
  });
}

export default function RichText({ text, className }: Props) {
  if (!text) return null;
  const blocks = parseRichText(text);

  return (
    <div className={className}>
      {blocks.map((block, i) =>
        block.type === "list" ? (
          <ul key={i} className="ml-1 list-disc space-y-1 pl-5 [&:not(:first-child)]:mt-2">
            {block.items.map((item, j) => (
              <li key={j}>{renderRuns(item)}</li>
            ))}
          </ul>
        ) : (
          <p key={i} className="[&:not(:first-child)]:mt-2">
            {renderRuns(block.runs)}
          </p>
        )
      )}
    </div>
  );
}
