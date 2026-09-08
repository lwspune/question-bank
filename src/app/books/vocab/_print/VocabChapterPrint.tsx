import PrintButton from "@/app/notes/_components/print/PrintButton";
import type { VocabChapterView } from "@/lib/vocab/query";
import { VOCAB_SECTIONS } from "@/lib/vocab/registry";
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
  /**
   * The SECTION replaces the part in the running head where one exists.
   *
   * A reader holding a Part 2 chapter needs to know which exam it covers far
   * more than they need the part number, and printing both ("Part 2 - Asked in
   * the Papers - Asked in NDA Papers - F-K") buries the one fact they came for.
   * Parts 1 and 3 have no section and are unchanged.
   *
   * The BLURB follows the same rule, and here it is load-bearing rather than
   * cosmetic: a section blurb is the only place that says the other exam's
   * section is later work rather than optional.
   */
  const section = view.chapter.section
    ? VOCAB_SECTIONS.find((s) => s.key === view.chapter.section)
    : undefined;

  return (
    <div className="vdoc">
      <style dangerouslySetInnerHTML={{ __html: VOCAB_PRINT_CSS }} />

      <div className="vnoprint">
        <PrintButton />
      </div>

      <div className="vtitle">
        <h1>{view.book.title}</h1>
        <div className="vsub">
          {part.ordinal} — {section ? section.title : part.title} · {view.chapter.label}
        </div>
        <div className="vblurb">{section ? section.blurb : part.blurb}</div>
      </div>

      <div className="vcols">
        {entries.map((e) => (
          <div className="ventry" key={e.id}>
            <p className="vhead">
              <span className="vword">{e.word}</span>
              {/* A COLON, not a semicolon. The meaning itself often carries
                  semicolons between senses ("died down; became less intense"),
                  so a semicolon after the headword read as one more sense
                  rather than as the break between word and definition. */}
              <span className="vsemi">: </span>
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
            {/* `note` IS NOT PRINTED. An entry is four lines — word, sentence,
                synonyms, antonyms — and a trailing editorial aside broke that
                rhythm on the entries that had one and not on those that did
                not. The column survives for its documented purpose, which is
                recording a CURATION decision for whoever reads the book next,
                not commentary for the student. */}
          </div>
        ))}
      </div>

      {entries.length === 0 ? (
        <p className="vempty">No entries in this chapter yet.</p>
      ) : null}
    </div>
  );
}
