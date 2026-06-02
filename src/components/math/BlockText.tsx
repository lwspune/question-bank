import KatexRenderer from "./KatexRenderer";
import { parseTableBlocks } from "./parseTableBlocks";

interface Props {
  text: string;
  className?: string;
}

/**
 * Renders question/option content that MAY contain a GFM pipe-table, mixing
 * prose (KaTeX + **bold**, via KatexRenderer) with real `<table>` blocks.
 *
 * Fast path: when the text has no table (the overwhelming majority of bank
 * questions), it returns a bare <KatexRenderer> — byte-for-byte the prior
 * render behaviour, so existing questions are visually unchanged.
 */
export default function BlockText({ text, className }: Props) {
  if (!text) return null;
  const blocks = parseTableBlocks(text);

  // Fast path: no table → byte-for-byte the prior KatexRenderer behaviour.
  const only = blocks[0];
  if (blocks.length === 0) return <KatexRenderer text={text} className={className} />;
  if (blocks.length === 1 && only.kind === "text") {
    return <KatexRenderer text={only.text} className={className} />;
  }

  return (
    <div className={className}>
      {blocks.map((b, i) =>
        b.kind === "text" ? (
          <KatexRenderer key={i} text={b.text} />
        ) : (
          <div key={i} className="my-2 overflow-x-auto rounded-lg border bg-card">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-muted/50">
                <tr>
                  {b.headers.map((h, j) => (
                    <th
                      key={j}
                      className={`px-3 py-1.5 text-left font-semibold ${j > 0 ? "border-l" : ""}`}
                    >
                      <KatexRenderer text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, r) => (
                  <tr key={r} className="border-t">
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        className={`px-3 py-1.5 align-top ${c > 0 ? "border-l" : ""}`}
                      >
                        <KatexRenderer text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
