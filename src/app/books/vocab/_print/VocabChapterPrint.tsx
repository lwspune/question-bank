import PrintButton from "@/app/notes/_components/print/PrintButton";
import type { VocabChapterView } from "@/lib/vocab/query";
import { VOCAB_PRINT_CSS } from "./printStyles";

/**
 * A chapter of the vocab book as it will be printed.
 *
 * GEOMETRY MIRRORS THE WORD EXPORTER, like the /books print view: US Letter,
 * 0.5in margins, two columns, Cambria 10pt. See src/lib/export/docxBuilder.ts.
 *
 * THE ENTRY IS ONE PARAGRAPH, not a card. A dictionary is read by scanning down
 * a column for a bold headword, so the word carries the only weight on the page
 * and everything else hangs off it. Cards would halve the words per page and
 * make the A-Z scan slower, which is the one thing this book must be good at.
 *
 * `break-inside: avoid` IS ON THE ENTRY, and that is safe here in a way it was
 * not for the /books reader: an entry is at most a few lines, so it can never be
 * taller than the space left. (The /notes handout stranded ~80% of a page by
 * putting avoid-break on a block bigger than a page.)
 *
 * A CITED SENTENCE IS THE POINT OF THE BOOK, so the citation is printed and an
 * AUTHORED sentence is silently uncited rather than labelled. The distinction is
 * carried by presence, not by a word: "— NDA 2017 (Apr)" means a real paper
 * asked it in exactly those words.
 */
export default function VocabChapterPrint({ view }: { view: VocabChapterView }) {
  const entries = view.entries.filter((e) => !e.excluded);
  const part = view.book.parts.find((p) => p.key === view.chapter.part)!;

  return (
    <div className="vdoc">
      <style dangerouslySetInnerHTML={{ __html: VOCAB_PRINT_CSS }} />

      <div className="vnoprint">
        <PrintButton />
      </div>

      <div className="vtitle">
        <h1>{view.book.title}</h1>
        <div className="vsub">{part.title} · {view.chapter.label}</div>
        <div className="vblurb">{part.blurb}</div>
      </div>

      <div className="vcols">
        {entries.map((e) => (
          <div className="ventry" key={e.id}>
            <p className="vhead">
              <span className="vword">{e.word}</span>
              <span className="vsemi">; </span>
              <span className="vmeaning">{e.meaning}</span>
            </p>

            {e.sentence ? (
              <p className="vsent">
                <em>{e.sentence}</em>
                {e.sentenceSource ? <span className="vcite"> — {e.sentenceSource}</span> : null}
              </p>
            ) : null}

            {e.synonyms.length ? (
              <p className="vclust">
                <span className="vlab">Synonyms</span> {e.synonyms.join(", ")}
              </p>
            ) : null}
            {e.antonyms.length ? (
              <p className="vclust">
                <span className="vlab">Antonyms</span> {e.antonyms.join(", ")}
              </p>
            ) : null}
            {e.note ? <p className="vnote">{e.note}</p> : null}
          </div>
        ))}
      </div>

      {entries.length === 0 ? (
        <p className="vempty">No entries in this chapter yet.</p>
      ) : null}
    </div>
  );
}
