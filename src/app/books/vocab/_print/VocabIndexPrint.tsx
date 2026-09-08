import { buildIndex, formatIndexRow, type IndexRow } from "@/lib/vocab/index";
import { VOCAB_PRINT_CSS, VOCAB_INDEX_CSS } from "./printStyles";

/**
 * The back-of-book index, as printed.
 *
 * THREE COLUMNS, not the book's two. An index line is short — a word, a leader
 * and one tag — so at two columns most of each line is leader dots, and the
 * index would run to roughly half again as many pages for no gain in legibility.
 * The body text stays at two columns because a definition is a paragraph.
 *
 * The leader dots are drawn in CSS rather than typed into the string, so they
 * stretch to the column rather than assuming a monospace width.
 */
export default function VocabIndexPrint({
  rows,
  title,
}: {
  rows: IndexRow[];
  title: string;
}) {
  const groups = buildIndex(rows);

  return (
    <div className="vdoc">
      <style dangerouslySetInnerHTML={{ __html: VOCAB_PRINT_CSS + VOCAB_INDEX_CSS }} />

      <div className="vtitle">
        <h1>{title}</h1>
        <div className="vsub">Index</div>
        <div className="vblurb">
          Every word in the book, A–Z. The tag says which part to turn to.
        </div>
      </div>

      <div className="vixcols">
        {groups.map((g) => (
          <div className="vixgroup" key={g.letter}>
            <div className="vixletter">{g.letter}</div>
            {g.rows.map((r) => (
              <p className="vixrow" key={r.word}>
                <span className="vixword">{r.word}</span>
                <span className="vixdots" aria-hidden="true" />
                <span className="vixtag">
                  {r.partTag}
                  {r.timesAsked > 1 ? ` ${r.timesAsked}x` : ""}
                </span>
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Exported for the render harness, which needs the same formatter for plain text. */
export { formatIndexRow };
