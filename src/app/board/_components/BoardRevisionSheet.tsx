import { ChevronRight, Flame, ListChecks, PenLine, Shapes } from "lucide-react";
// mhchem: the sheets write chemistry as \ce{...}, as the checker and the PDF
// allow. Loaded here, on the server, so only this tab gets it and no phone
// downloads it (the bank's own questions still never use \ce).
import "katex/contrib/mhchem";
import { StaticKatexRenderer } from "@/components/math/StaticMath";
import FormulaBlock from "@/app/notes/_components/FormulaBlock";
import TrapCallout from "@/app/notes/_components/TrapCallout";
import type { RevisionSheet } from "@/lib/board/revision/types";
import type { FormulaSpec } from "@/app/notes/_types";
import { splitFormulaLines } from "@/lib/export/pdf/formulaSheetHtml";
import { revisionSummary } from "@/lib/board/revision/summary";
import RevisionSheetDownload from "./RevisionSheetDownload";

/**
 * A /board chapter's quick-revision sheet, the Revision tab's content
 * (2026-11-03). A server component handed to the client reader as a node, so
 * the sheet's text is in the page (crawlable) and none of it ships as JS.
 *
 * Most asked comes first: it is what to revise first. Derivations fold into
 * native <details>, so a student can try one before opening its outline and
 * the tab stays a page, not a wall. The PDF (Premium Pass) is the same sheet.
 *
 * Its maths is drawn here on the server (2026-11-09), with mhchem loaded: the
 * client KatexRenderer has no mhchem, so every \ce{} on the tab showed
 * "KaTeX parse error" while the checker, which loads it, passed the sheet.
 * tests/board-revision-sheet-render.test.ts draws every sheet through this
 * component.
 */
export default function BoardRevisionSheet({ sheet }: { sheet: RevisionSheet }) {
  const summary = revisionSummary(sheet);
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-3 rounded-lg border bg-card p-4">
        <div className="min-w-0 flex-1 basis-60 space-y-1">
          <p className="text-sm font-semibold text-foreground">Quick revision</p>
          <p className="text-xs text-muted-foreground">{summary}</p>
          <p className="text-xs text-muted-foreground">Checked against {sheet.source}.</p>
        </div>
        <RevisionSheetDownload
          examSlug={sheet.examSlug}
          subjectRoute={sheet.subjectRoute}
          chapterSlug={sheet.chapterSlug}
          chapterName={sheet.chapterName}
          summary={summary}
        />
      </div>

      <Section icon={<Flame className="h-4 w-4" aria-hidden />} title="Most asked in board papers">
        <ol className="space-y-2">
          {sheet.mostAsked.map((m, i) => (
            <li key={i} className="flex gap-3 rounded-md border bg-card p-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand-accent">
                {i + 1}
              </span>
              <div className="min-w-0 space-y-1">
                <Tex text={m.topic} className="font-serif text-[15px] leading-snug text-foreground" />
                <p className="text-xs text-muted-foreground">
                  Asked {m.years.length === 1 ? "in" : `${m.years.length} times:`} {m.years.join(", ")}
                  {m.marks ? ` · ${m.marks} mark${m.marks === 1 ? "" : "s"}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section icon={<ListChecks className="h-4 w-4" aria-hidden />} title="Must-know points">
        <dl className="space-y-3">
          {sheet.keyPoints.map((k, i) => (
            <div key={i} className="rounded-md border-l-2 border-brand/40 pl-3">
              <dt className="text-sm font-semibold text-foreground">
                <Tex text={k.term} />
              </dt>
              <dd className="mt-0.5">
                <Tex text={k.text} className="font-serif text-[15px] leading-relaxed text-foreground" />
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {sheet.formulas.length > 0 && (
        <Section title="Formulas">
          <div className="grid gap-3 sm:grid-cols-2">
            {sheet.formulas.map((f, i) => (
              <FormulaBlock key={i} formula={stacked(f)} Katex={Tex} />
            ))}
          </div>
        </Section>
      )}

      {sheet.derivations.length > 0 && (
        <Section icon={<PenLine className="h-4 w-4" aria-hidden />} title="Derivations">
          <p className="mb-3 text-xs text-muted-foreground">Try each one first, then open its outline.</p>
          <div className="space-y-2">
            {sheet.derivations.map((d, i) => (
              <details key={i} className="group rounded-md border bg-card">
                <summary className="flex cursor-pointer list-none items-start gap-2 p-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  <ChevronRight
                    className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                    aria-hidden
                  />
                  <Tex text={d.title} />
                </summary>
                <ol className="list-decimal space-y-1.5 border-t px-3 py-3 pl-9 font-serif text-[15px] leading-relaxed">
                  {d.steps.map((s, j) => (
                    <li key={j}>
                      <Tex text={s} />
                    </li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
        </Section>
      )}

      {sheet.diagrams.length > 0 && (
        <Section icon={<Shapes className="h-4 w-4" aria-hidden />} title="Diagrams to practise">
          <ul className="space-y-2">
            {sheet.diagrams.map((d, i) => (
              <li key={i} className="text-sm">
                <span className="font-semibold text-foreground">
                  <Tex text={d.title} />
                </span>
                <span className="text-muted-foreground">: label </span>
                <span className="text-foreground">{d.labels.join(" · ")}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Mistakes that cost marks">
        <div className="space-y-3">
          {sheet.mistakes.map((m, i) => (
            <TrapCallout key={i} title={m.title} body={m.body} Katex={Tex} />
          ))}
        </div>
      </Section>
    </div>
  );
}

/** Server-drawn maths, keeping KaTeX's MathML copy for screen readers. */
function Tex({ text, className }: { text: string; className?: string }) {
  return <StaticKatexRenderer text={text} className={className} mathml />;
}

/**
 * Several formulas joined by `\qquad` in one box ran off a half-width card
 * behind a scrollbar; stack them one a line, by the PDF's own split rule, so
 * the page and the file break a box the same way.
 */
function stacked(f: FormulaSpec): FormulaSpec {
  const lines = splitFormulaLines(f.latex);
  return lines.length > 1 ? { ...f, latex: `\\begin{gathered}${lines.join(" \\\\ ")}\\end{gathered}` } : f;
}

function Section({ icon, title, children }: { icon?: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-foreground">
        {icon && <span className="text-brand-accent">{icon}</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}
