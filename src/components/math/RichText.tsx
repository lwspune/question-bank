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
    if (r.type === "inline") {
      return (
        <InlineMath key={i} renderError={renderError}>
          {r.content}
        </InlineMath>
      );
    }
    if (r.type === "block") {
      return (
        <BlockMath key={i} renderError={renderError}>
          {r.content}
        </BlockMath>
      );
    }
    if (r.type === "bold") {
      return <strong key={i}>{r.content}</strong>;
    }
    return (
      <span key={i} style={{ whiteSpace: "pre-wrap" }}>
        {r.content}
      </span>
    );
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
