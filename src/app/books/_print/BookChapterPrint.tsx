import BlockText from "@/components/math/BlockText";
import PrintButton from "@/app/notes/_components/print/PrintButton";
import { chapterContents, numberChapter } from "@/lib/books/print";
import { BOOK_PRINT_CSS } from "./printStyles";
import type { ContentsRange } from "@/lib/books/print";
import type { BookSet } from "@/lib/books/order";
import type { BookChapterView } from "@/lib/books/query";
import type { QuestionRow } from "@/lib/questions/query";

/**
 * The chapter as it will appear in the Word file: US Letter, two columns,
 * Cambria 10pt, one section per exam, with an answers-only key on its own page
 * at the END OF THE CHAPTER — so a chapter shared on its own carries everything
 * needed to use it.
 *
 * NUMBERING IS CONTINUOUS ACROSS THE WHOLE CHAPTER, every section included, and
 * that is load-bearing: the key at the back refers to these numbers, so a
 * per-section restart would make "42" ambiguous. It follows the RENDERED order,
 * which is the subtopic blocks where a chapter groups by them.
 *
 * EXCLUDED QUESTIONS ARE ABSENT, not struck through. The on-screen editor shows
 * them struck through so the decision stays visible and reversible; this view
 * is the book, and a question curated OUT of the book is not in it. It is also
 * skipped by the numbering, so the printed sequence has no holes.
 *
 * A CONTENTS TABLE opens the chapter, putting each subtopic's range under BOTH
 * exams side by side — the one comparison this book exists to make, and the one
 * a reader cannot make by flipping pages. Each subtopic heading then repeats
 * its own range in place, so orientation mid-chapter needs no trip back to
 * page 1.
 */
export default function BookChapterPrint({ view }: { view: BookChapterView }) {
  const excluded = new Set(view.excludedIds);

  // ONE pass produces the paper's numbers, the key's rows AND the contents
  // ranges, so the three cannot disagree. Pure + tested — see
  // tests/books-print.test.ts.
  const numbering = numberChapter(
    view.sections,
    view.excludedIds,
    (id) => view.questionsById.get(id)?.options.find((o) => o.isCorrect)?.label ?? null
  );
  const { numberOf, keyRows, total } = numbering;
  const contents = chapterContents(view.sections, numbering);

  /** A subtopic's range under one exam, read back out of the contents table. */
  const blockRange = (sectionKey: string, blockName: string): ContentsRange | null => {
    const column = contents.columns.findIndex((c) => c.key === sectionKey);
    return contents.rows.find((r) => r.name === blockName)?.cells[column] ?? null;
  };

  const liveIds = (sets: BookSet[]) =>
    sets.flatMap((s) => s.questionIds).filter((id) => !excluded.has(id));

  /** One passage/Directions group and its questions. */
  const renderSet = (set: BookSet, blockHasDirections: boolean) => {
    const ids = set.questionIds.filter((id) => !excluded.has(id));
    if (ids.length === 0) return null;
    const first = view.questionsById.get(ids[0]);
    const from = numberOf.get(ids[0]);
    const to = numberOf.get(ids[ids.length - 1]);

    return (
      <div className="bset" key={set.key}>
        {/* When the block carries ONE authored line for every set in it, the
            per-set Directions would be a repeat — print only the provenance. */}
        {first?.context && !blockHasDirections ? (
          <>
            <p className="bdir">
              {ids.length > 1
                ? `Directions (Q. ${from}–${to}) · ${set.label}`
                : `Directions (Q. ${from}) · ${set.label}`}
            </p>
            <div className="bpassage">
              <BlockText text={first.context} />
            </div>
          </>
        ) : null}
        {blockHasDirections ? (
          <p className="bprov">
            {ids.length > 1 ? `Q. ${from}–${to}` : `Q. ${from}`} · {set.label}
          </p>
        ) : null}

        {ids.map((id) => {
          const q = view.questionsById.get(id);
          if (!q) return null;
          return <Question key={id} q={q} n={numberOf.get(id)!} />;
        })}
      </div>
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BOOK_PRINT_CSS }} />

      <div className="bbar">
        <PrintButton />
        <span className="bnote">
          Approximate pagination — the Word file is authoritative. Letter · 2
          columns · Cambria 10pt, matching the exporter.
        </span>
      </div>

      <div className="bdoc">
        <div className="btitle">
          <h1>{view.chapter.name}</h1>
          <div className="bsub">
            {view.book.title} · {total.toLocaleString()} questions
            {view.excluded > 0 ? ` · ${view.excluded} excluded` : ""}
          </div>
        </div>

        {total > 0 ? (
          <div className="bcontents">
            <h2 className="bcontentshead">Contents</h2>
            <table className="bctable">
              <thead>
                <tr>
                  <th scope="col" className="bcname" />
                  {contents.columns.map((c) => (
                    <th scope="col" key={c.key}>
                      {c.title}
                    </th>
                  ))}
                </tr>
              </thead>
              {/* Omitted entirely for a flat chapter, which has no honest
                  per-subtopic range — the section totals below still stand. */}
              {contents.rows.length > 0 ? (
                <tbody>
                  {contents.rows.map((row) => (
                    <tr key={row.name}>
                      <th scope="row" className="bcname">
                        {row.name}
                      </th>
                      {row.cells.map((cell, i) => (
                        <td key={contents.columns[i].key}>
                          <ContentsCell range={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ) : null}
              <tfoot>
                <tr>
                  <th scope="row" className="bcname">
                    All questions
                  </th>
                  {contents.columns.map((c) => (
                    <td key={c.key}>
                      <ContentsCell range={c.range} />
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        ) : null}

        <div className="bflow">
          {view.sections.map((section) => {
            const live = liveIds(section.sets);
            // A chapter that does not group by subtopic renders one unnamed
            // block, so there is a single rendering path rather than two.
            const blocks =
              section.blocks ??
              [{ name: null as string | null, directions: undefined, sets: section.sets }];

            return (
              <section key={section.key}>
                <h2 className="bsec">
                  {section.title}
                  <span className="bcount">{live.length} questions</span>
                </h2>

                {live.length === 0 ? (
                  <p className="bdir">No {section.exam} questions in this chapter.</p>
                ) : (
                  blocks.map((block, bi) => {
                    const blockLive = liveIds(block.sets);
                    if (blockLive.length === 0) return null;
                    const range = block.name ? blockRange(section.key, block.name) : null;
                    return (
                      <div className="bblock" key={block.name ?? `flat-${bi}`}>
                        {block.name ? (
                          <h3 className="bsub2">
                            {block.name}
                            <span className="bcount">
                              {range ? `${rangeText(range)} · ` : ""}
                              {blockLive.length}
                            </span>
                          </h3>
                        ) : null}
                        {block.directions ? (
                          <p className="bdir">Directions: {block.directions}</p>
                        ) : null}
                        {block.sets.map((set) => renderSet(set, !!block.directions))}
                      </div>
                    );
                  })
                )}
              </section>
            );
          })}

          <h2 className="bsec bkeyhead">
            Answer Key
            <span className="bcount">{view.chapter.name}</span>
          </h2>
          <ol className="bkey">
            {keyRows.map((a) => (
              <li key={a.n}>
                <span className="bn">{a.n}.</span>{" "}
                {a.letter ? (
                  `(${a.letter})`
                ) : (
                  // A missing key is stated, never blank — a gap in the column
                  // would read as a typesetting slip rather than missing data.
                  <span className="bmissing">no key</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

/** "Q.5" for a lone question, "Q.1–150" for a run. */
function rangeText(r: ContentsRange): string {
  return r.from === r.to ? `Q.${r.from}` : `Q.${r.from}–${r.to}`;
}

/**
 * One contents cell. A blank is REAL INFORMATION — that exam does not ask this
 * subtopic in this chapter — so it prints a dash rather than nothing, which
 * would read as an unfinished table.
 *
 * The count is the range's own span, shown because it is the fact a reader
 * usually wants ("how much Antonyms practice is in here?") while the range is
 * the one they navigate by. The two are computed together and cannot disagree.
 */
function ContentsCell({ range }: { range: ContentsRange | null }) {
  if (!range) return <span className="bcnone">—</span>;
  if (range.from === range.to) return <>{rangeText(range)}</>;
  return (
    <>
      {rangeText(range)} <span className="bccount">· {range.count}</span>
    </>
  );
}

function Question({ q, n }: { q: QuestionRow; n: number }) {
  return (
    <div className="bq">
      <span className="bnum">{n}. </span>
      <span className="bstem">
        <BlockText text={q.text} />
      </span>
      {q.options.length > 0 ? (
        <ul className="bopts">
          {q.options.map((o) => (
            <li key={o.label}>
              <span className="bl">({o.label.toLowerCase()})</span>{" "}
              <BlockText text={o.text} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
