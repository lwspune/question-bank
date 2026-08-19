import KatexRenderer from "@/components/math/KatexRenderer";
import RichText from "@/components/math/RichText";
import BlockText from "@/components/math/BlockText";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { loadWorkedExamples, type WorkedExample } from "@/lib/guide/loadWorkedExamples";
import { deriveSummary } from "@/lib/notes/deriveSummary";
import { collectPyqIds, printDocStats } from "@/lib/notes/printDoc";
import type { NotesChapterRegistration } from "@/lib/notes/chapters";
import type { AuthoredExample, ConceptUnit } from "@/app/notes/_types";
import { renderVisualization } from "../ConceptUnitCard";
import PrintButton from "./PrintButton";
import { PRINT_CSS } from "./printStyles";

/**
 * Printable chapter handout for /notes — every subtopic of one chapter laid
 * out top-to-bottom as a static A4 document, ready for the browser's
 * "Save as PDF".
 *
 * WHY THIS IS NOT THE SUBTOPIC PAGE WITH PRINT CSS
 * The on-screen notes hide every answer behind a click (SelfCheckCard,
 * PracticeSet, WorkedExampleAuthored are all `"use client"` with a reveal),
 * and a print stylesheet cannot open React state. So the print document
 * re-composes the SAME editorial data with answers shown. Content therefore
 * cannot drift — both surfaces read one `_data` module — while the chrome
 * (reveals, drill links, report dialog, progress controls) is simply absent.
 *
 * Pure server component: no client state, no cookies. Reading cookies here
 * would make the route dynamic and de-cache it (see the shell-component
 * de-caching incident, 2026-07-29), and the notes are public anyway.
 */

type Props = { chapter: NotesChapterRegistration };

/** One reveal-free authored example (worked or self-check share this shape). */
function ExampleBlock({
  example,
  variant,
  heading,
}: {
  example: AuthoredExample;
  variant: "worked" | "self";
  heading: string;
}) {
  return (
    <div className={`pbox pbox--${variant}`}>
      <h4>{heading}</h4>
      <div className="pbody">
        <KatexRenderer text={example.prompt} />
      </div>
      <ol className="psteps">
        {example.steps.map((s, i) => (
          <li key={i}>
            <KatexRenderer text={s} />
          </li>
        ))}
      </ol>
      <div className="pans">
        <b>Answer</b>
        <KatexRenderer text={example.answer} />
      </div>
    </div>
  );
}

function ConceptBlock({
  concept,
  index,
  total,
  pyq,
}: {
  concept: ConceptUnit;
  index: number;
  total: number;
  pyq: WorkedExample | null;
}) {
  return (
    <section className="pcon">
      <header>
        <p className="cidx">
          Concept {index} of {total}
        </p>
        <h3>{concept.name}</h3>
      </header>

      <div>
        <p className="plabel">Intuition</p>
        <div className="pbody">
          <KatexRenderer text={concept.intuition} />
        </div>
      </div>

      <div className="pblock">
        <p className="plabel">Definition</p>
        <RichText text={concept.definition} className="pbody" />
      </div>

      {concept.kind === "formula" && concept.formula && (
        <div className="pbox pbox--formula">
          <p className="flabel">{concept.formula.label}</p>
          <KatexRenderer text={`\\[${concept.formula.latex}\\]`} />
          {concept.formula.symbols && concept.formula.symbols.length > 0 && (
            <ul className="psyms">
              {concept.formula.symbols.map((s, i) => (
                <li key={i}>
                  <KatexRenderer text={`\\(${s.symbol}\\)`} /> = {s.meaning}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {concept.visualizationSlug && (
        <div className="pfig">{renderVisualization(concept.visualizationSlug)}</div>
      )}

      {concept.kind === "formula" ? (
        <ExampleBlock
          example={concept.authoredExample}
          variant="worked"
          heading="Worked example"
        />
      ) : (
        <div className="pblock">
          <table>
            <thead>
              <tr>
                {concept.table.columns.map((c, i) => (
                  <th key={i}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {concept.table.rows.map((r, i) => (
                <tr key={i}>
                  {r.cells.map((cell, j) => (
                    <td key={j}>
                      <KatexRenderer text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {concept.table.caption && (
            <p className="plabel" style={{ marginTop: "1.5mm" }}>
              <KatexRenderer text={concept.table.caption} />
            </p>
          )}
        </div>
      )}

      {concept.selfCheckExample && (
        <ExampleBlock
          example={concept.selfCheckExample}
          variant="self"
          heading="Try it yourself"
        />
      )}

      {concept.practiceSet && concept.practiceSet.length > 0 && (
        <div className="pbox pbox--prac">
          <h4>Practice — Level 1 ({concept.practiceSet.length} reps)</h4>
          <ol className="preps">
            {concept.practiceSet.map((p, i) => (
              <li key={i}>
                <span className="n">{i + 1}.</span>
                <span className="q">
                  <KatexRenderer text={p.prompt} />
                </span>
                <span className="a">
                  <b>Ans</b>
                  <KatexRenderer text={p.answer} />
                </span>
                {p.method && (
                  <span className="m">
                    <KatexRenderer text={p.method} />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      {pyq && (
        <div className="pbox pbox--pyq">
          <h4>From the bank · past-year question</h4>
          {pyq.provenance && <p className="ppyq-meta">{pyq.provenance}</p>}
          {pyq.context && (
            <div className="ppyq-ctx">
              <BlockText text={pyq.context} />
            </div>
          )}
          <div className="ppyq-stem">
            <BlockText text={pyq.text} />
          </div>
          {pyq.options.length > 0 && (
            <ol className="popts">
              {pyq.options.map((o) => (
                <li key={o.label} className={o.isCorrect ? "ok" : undefined}>
                  ({o.label.toLowerCase()}) <KatexRenderer text={o.text} />
                  {o.isCorrect ? " ✓" : ""}
                </li>
              ))}
            </ol>
          )}
          {pyq.solution && (
            <div className="psoln">
              <BlockText text={pyq.solution} />
            </div>
          )}
        </div>
      )}

      {concept.traps && concept.traps.length > 0 && (
        <div className="pbox pbox--trap">
          <h4>Traps</h4>
          {concept.traps.map((t, i) => (
            <div className="ptrap" key={i}>
              <b>
                <KatexRenderer text={t.title} />
              </b>
              <span>
                <KatexRenderer text={t.body} />
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default async function NotesChapterPrint({ chapter }: Props) {
  const notes = chapter.slugs.map((s) => chapter.notes[s]).filter(Boolean);

  // One DB round trip for the whole chapter's featured PYQs (the on-screen
  // pages do this per subtopic). Guarded: a handout without bank questions is
  // still a useful handout, so a DB hiccup must not 500 the page.
  let pyqById = new Map<string, WorkedExample>();
  try {
    const rows = await loadWorkedExamples(createSupabaseAnonClient(), collectPyqIds(notes));
    pyqById = new Map(rows.map((r) => [r.id, r]));
  } catch {
    pyqById = new Map();
  }

  const stats = printDocStats(notes);
  const summaries = notes.map((n) => ({ note: n, summary: deriveSummary(n) }));
  const totalFormulas = summaries.reduce((a, s) => a + s.summary.formulas.length, 0);
  const totalTraps = summaries.reduce((a, s) => a + s.summary.traps.length, 0);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      {/* The print document renders light-only; drop a persisted dark theme so
          the handout is never white-on-black. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.remove("dark");`,
        }}
      />

      <div className="pdoc">
        <div className="pbar no-print">
          <span>
            Printable handout — {chapter.subjectDisplay} · {chapter.chapter.chapterName}
          </span>
          <PrintButton />
        </div>

        <header className="pcover">
          <p className="brand">PYQ Vault · {chapter.subjectDisplay} notes</p>
          <h1>{chapter.chapter.title}</h1>
          <p className="sub">
            {chapter.examName} · {chapter.subjectName} · {chapter.chapter.chapterName}
          </p>
          <p className="intro">{chapter.chapter.intro}</p>
          <div className="stats">
            <span>
              <b>{stats.subtopics}</b> subtopics
            </span>
            <span>
              <b>{stats.concepts}</b> concepts
            </span>
            <span>
              <b>{totalFormulas}</b> formulas
            </span>
            <span>
              <b>{stats.reps}</b> practice reps
            </span>
            <span>
              <b>{stats.figures}</b> figures
            </span>
          </div>
        </header>

        <nav className="ptoc">
          <h2>Contents</h2>
          <ol>
            {notes.map((n) => (
              <li key={n.subtopicName}>
                {n.title} <span className="cn">· {n.concepts.length} concepts</span>
              </li>
            ))}
          </ol>
        </nav>

        {notes.map((note, si) => (
          <section className={si === 0 ? "psub first" : "psub"} key={note.subtopicName}>
            <header>
              <p className="kicker">
                Subtopic {si + 1} of {notes.length}
              </p>
              <h2>{note.title}</h2>
              <p className="oneline">{note.oneLineDefinition}</p>
              {note.whyItMatters && <p className="why">{note.whyItMatters}</p>}
            </header>

            {note.concepts.map((c, ci) => (
              <ConceptBlock
                key={c.slug}
                concept={c}
                index={ci + 1}
                total={note.concepts.length}
                pyq={(c.pyqExampleId && pyqById.get(c.pyqExampleId)) || null}
              />
            ))}
          </section>
        ))}

        {(totalFormulas > 0 || totalTraps > 0) && (
          <section className="psheet">
            <h2>Formula &amp; revision sheet</h2>
            <p className="lead">
              Every formula and trap in {chapter.chapter.chapterName}, in one place —
              the exam-eve glance.
            </p>

            {totalFormulas > 0 && (
              <>
                <h3>Formulas ({totalFormulas})</h3>
                {summaries
                  .filter((s) => s.summary.formulas.length > 0)
                  .map((s) => (
                    <div key={s.note.subtopicName}>
                      <h4>{s.note.title}</h4>
                      {s.summary.formulas.map((f) => (
                        <div className="frow" key={`${f.slug}-${f.label}`}>
                          <span className="fl">{f.label}</span>
                          <span>
                            <KatexRenderer text={`\\(${f.latex}\\)`} />
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
              </>
            )}

            {totalTraps > 0 && (
              <>
                <h3>Traps ({totalTraps})</h3>
                {summaries
                  .filter((s) => s.summary.traps.length > 0)
                  .map((s) => (
                    <div key={s.note.subtopicName}>
                      <h4>{s.note.title}</h4>
                      <ul>
                        {s.summary.traps.map((t, i) => (
                          <li key={i}>
                            <KatexRenderer text={t.title} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </>
            )}
          </section>
        )}

        <p className="pfoot">
          PYQ Vault · www.pyqvault.com — {chapter.subjectDisplay}{" "}
          {chapter.chapter.chapterName} notes. Free to share with students.
        </p>
      </div>
    </>
  );
}
