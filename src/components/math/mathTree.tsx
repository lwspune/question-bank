import { parseRichSegments, parseRichText, type RichInline } from "./parseLatex";
import { matchUnderlineBypass } from "./underlineBypass";
import { parseTableBlocks } from "./parseTableBlocks";

/**
 * The markup KatexRenderer, RichText and BlockText draw, with the equation
 * itself left to a pluggable `MathSet` (2026-10-16).
 *
 * The client components plug in react-katex; StaticMath plugs in KaTeX run on
 * the server, for pages a phone should not have to draw twice (the notes
 * print handout). Both build their tree here, so the two cannot drift apart:
 * tests/static-math.test.ts asserts they render byte-identical markup.
 *
 * No "use client" and no hooks, so it renders on either side.
 */
export type TexComponent = (props: { tex: string }) => JSX.Element;
export type MathSet = { Inline: TexComponent; Block: TexComponent };

export const renderMathError = (err: Error) => (
  <span className="text-destructive text-xs">{err.message}</span>
);

export function KatexTree({ text, className, math }: { text: string; className?: string; math: MathSet }) {
  if (!text) return null;
  const { Inline, Block } = math;
  // parseRichSegments (not parseLatex) so a **bold** span may CONTAIN math —
  // bold is resolved before the math split, and each run carries the flag.
  const segments = parseRichSegments(text);

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.type === "block") return <Block key={i} tex={seg.content} />;
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
            <Inline tex={seg.content} />
          );
        } else {
          node = <span style={{ whiteSpace: "pre-wrap" }}>{seg.content}</span>;
        }
        // *italic* wraps prose and inline math (block math returned above).
        if (seg.italic) node = <em>{node}</em>;
        return seg.bold ? <strong key={i}>{node}</strong> : <span key={i}>{node}</span>;
      })}
    </span>
  );
}

function renderRuns(runs: RichInline[], { Inline, Block }: MathSet) {
  return runs.map((r, i) => {
    // Block math is never wrapped in <strong>: it renders a block element
    // (invalid inside inline markup) and KaTeX sets its own font anyway, so
    // the bold flag would be visually inert.
    if (r.type === "block") return <Block key={i} tex={r.content} />;
    let node =
      r.type === "inline" ? (
        <Inline tex={r.content} />
      ) : (
        <span style={{ whiteSpace: "pre-wrap" }}>{r.content}</span>
      );
    if (r.italic) node = <em>{node}</em>;
    return r.bold ? <strong key={i}>{node}</strong> : <span key={i}>{node}</span>;
  });
}

export function RichTree({ text, className, math }: { text: string; className?: string; math: MathSet }) {
  if (!text) return null;
  const blocks = parseRichText(text);

  return (
    <div className={className}>
      {blocks.map((block, i) =>
        block.type === "list" ? (
          <ul key={i} className="ml-1 list-disc space-y-1 pl-5 [&:not(:first-child)]:mt-2">
            {block.items.map((item, j) => (
              <li key={j}>{renderRuns(item, math)}</li>
            ))}
          </ul>
        ) : (
          <p key={i} className="[&:not(:first-child)]:mt-2">
            {renderRuns(block.runs, math)}
          </p>
        )
      )}
    </div>
  );
}

/** The inline renderer a table cell or prose run is drawn with. */
export type KatexComponent = (props: { text: string; className?: string }) => JSX.Element | null;

export function BlockTree({
  text,
  className: base,
  solution,
  Katex,
}: {
  text: string;
  className?: string;
  solution?: boolean;
  Katex: KatexComponent;
}) {
  if (!text) return null;
  const className = solution ? [base, "solution-math"].filter(Boolean).join(" ") : base;
  const blocks = parseTableBlocks(text);

  // Fast path: no table → byte-for-byte the prior KatexRenderer behaviour.
  const only = blocks[0];
  if (blocks.length === 0) return <Katex text={text} className={className} />;
  if (blocks.length === 1 && only.kind === "text") {
    return <Katex text={only.text} className={className} />;
  }

  return (
    <div className={className}>
      {blocks.map((b, i) =>
        b.kind === "text" ? (
          <Katex key={i} text={b.text} />
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
                      <Katex text={h} />
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
                        <Katex text={cell} />
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
