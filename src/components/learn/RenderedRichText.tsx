// Copied from Concept Ladder (src/components/RenderedRichText.tsx, afca8bf).
import "katex/dist/katex.min.css";
import type { RenderedBlock, RenderedInline } from "@/lib/learn/renderedText";

/**
 * Displays server-rendered rich text. Usable from server and client components;
 * imports no KaTeX. Only `html` fields (KaTeX output, trust: false) reach innerHTML.
 */
export function RenderedInlineNodes({ nodes }: { nodes: RenderedInline[] }) {
  return nodes.map((n, i) => {
    if (n.type === "math") {
      const math = <span dangerouslySetInnerHTML={{ __html: n.html }} />;
      const inner = n.bold ? <strong>{math}</strong> : <span>{math}</span>;
      if (!n.before && !n.after) return <span key={i}>{inner}</span>;
      return (
        <span key={i} className="whitespace-nowrap">
          {n.before}
          {inner}
          {n.after}
        </span>
      );
    }
    let el: React.ReactNode = n.text;
    if (n.italic) el = <em>{el}</em>;
    if (n.bold) el = <strong>{el}</strong>;
    return <span key={i}>{el}</span>;
  });
}

export function RenderedRichText({ blocks, className }: { blocks: RenderedBlock[]; className?: string }) {
  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      {blocks.map((b, i) => {
        if (b.type === "math") return <div key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
        if (b.type === "list") {
          return (
            <ul key={i} className="list-disc space-y-1 pl-5">
              {b.items.map((item, j) => (
                <li key={j}>
                  <RenderedInlineNodes nodes={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            <RenderedInlineNodes nodes={b.inline} />
          </p>
        );
      })}
    </div>
  );
}
