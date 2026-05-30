import {
  AlertTriangle,
  BookCheck,
  ChevronRight,
  Sigma,
  TableProperties,
} from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import type { SubtopicNote } from "@/app/notes/_types";
import { deriveSummary } from "@/lib/notes/deriveSummary";
import ReferenceTableBlock from "./ReferenceTableBlock";

type Props = {
  note: SubtopicNote;
};

/**
 * End-of-subtopic recap. Auto-derived from `note.concepts` — walks each
 * concept and pulls out its formula (if any), its reference table (if
 * any), and trap titles, no separate editorial field, no manual sync.
 * Reads as a cheat-sheet: every formula in one place, every reference
 * table behind a per-concept disclosure (revision IS the table), plus
 * the most common gotchas in headline form.
 *
 * Concept name is rendered as a small caption above each formula so the
 * student can jump back to the full explanation via the anchor (#slug).
 *
 * Returns null when the subtopic has neither formulas, references, nor
 * traps, so the section silently collapses for subtopics that are
 * intuition-only.
 */
export default function SubtopicSummary({ note }: Props) {
  const { formulas, traps, references } = deriveSummary(note);

  if (formulas.length === 0 && traps.length === 0 && references.length === 0)
    return null;

  return (
    <section className="mt-12 rounded-lg border bg-card p-6">
      <header className="mb-5 flex items-start gap-2">
        <BookCheck
          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          aria-hidden
        />
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Summary — formulas & gotchas at a glance
          </h2>
          <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
            A revision cheat-sheet for the formulas and gotchas above. Click any
            concept name to jump back to its full explanation.
          </p>
        </div>
      </header>

      {formulas.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            <Sigma className="h-3.5 w-3.5" aria-hidden />
            Formulas ({formulas.length})
          </p>
          <ul className="space-y-3">
            {formulas.map((f, i) => (
              <li
                key={`${f.slug}-${i}`}
                className="rounded-md border-l-4 border-primary/60 bg-primary/5 px-4 py-2"
              >
                <a
                  href={`#${f.slug}`}
                  className="text-xs font-medium text-muted-foreground hover:text-primary"
                >
                  {f.conceptName}
                </a>
                <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground/80">
                  {f.label}
                </p>
                <div className="mt-1 overflow-x-auto leading-tight [&_.katex]:max-w-full">
                  <KatexRenderer text={`\\[${f.latex}\\]`} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {references.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            <TableProperties className="h-3.5 w-3.5" aria-hidden />
            Reference tables ({references.length})
          </p>
          <div className="space-y-2">
            {references.map((r, i) => (
              <details
                key={`${r.slug}-${i}`}
                className="group rounded-md border bg-card"
              >
                <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2 hover:bg-accent/40">
                  <a
                    href={`#${r.slug}`}
                    className="text-xs font-medium text-muted-foreground hover:text-primary"
                  >
                    {r.conceptName}
                  </a>
                  <span className="ml-1 text-[11px] uppercase tracking-wide text-muted-foreground/70">
                    {r.table.rows.length} rows
                  </span>
                  <ChevronRight
                    className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                    aria-hidden
                  />
                </summary>
                <div className="border-t p-3">
                  <ReferenceTableBlock table={r.table} compact />
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {traps.length > 0 && (
        <div>
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
            Watch out for ({traps.length})
          </p>
          <ul className="space-y-1.5">
            {traps.map((t, i) => (
              <li
                key={`${t.slug}-${i}`}
                className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 rounded-md border-l-4 border-amber-500/70 bg-amber-50/50 dark:bg-amber-950/20 px-3 py-1.5 text-sm"
              >
                <div className="font-serif text-foreground">
                  <KatexRenderer text={t.title} />
                </div>
                <a
                  href={`#${t.slug}`}
                  className="ml-auto text-[11px] text-muted-foreground hover:text-amber-700 dark:hover:text-amber-300 whitespace-nowrap"
                >
                  → {t.conceptName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
