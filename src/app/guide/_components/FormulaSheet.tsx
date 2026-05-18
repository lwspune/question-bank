import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FORMULA_GROUPS } from "@/app/guide/nda-physics/_data/formulas";

/**
 * Single-page formula compendium renderer for /guide/nda-physics/formulas.
 *
 * Plain-text + unicode for formulas (no KaTeX in this component — the page
 * stays a server component, avoids the client-island overhead, and formulas
 * are short enough to read in plain text). Each chapter's group cards link
 * to the chapter's playbook deep-dive for the "this is where I use it"
 * context.
 */
export default function FormulaSheet() {
  return (
    <div className="mt-6 space-y-10">
      {FORMULA_GROUPS.map((group) => (
        <section key={group.chapter} className="rounded-lg border bg-card">
          <header className="flex items-baseline justify-between gap-3 border-b bg-muted/30 px-5 py-3">
            <h2 className="text-base font-semibold tracking-tight sm:text-lg">
              {group.chapter}
            </h2>
            <Link
              href={`/guide/nda-physics/playbooks/${group.playbookSlug}`}
              className="group inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              Playbook
              <ArrowRight
                className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </header>
          <ul className="divide-y">
            {group.formulas.map((f) => (
              <li key={f.id} className="px-5 py-4">
                <h3 className="text-sm font-semibold tracking-tight">
                  {f.name}
                </h3>
                <p className="mt-2 break-words rounded-md border bg-muted/30 px-3 py-2 font-mono text-sm text-foreground">
                  {f.formula}
                </p>
                <dl className="mt-2 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
                  {f.legend.map((line) => (
                    <dt
                      key={line}
                      className="font-serif leading-relaxed before:mr-1.5 before:text-primary/60 before:content-['·']"
                    >
                      {line}
                    </dt>
                  ))}
                </dl>
                {f.notes && (
                  <p className="mt-2 rounded-md border-l-2 border-amber-500/40 bg-amber-50/40 px-3 py-1.5 font-serif text-xs leading-relaxed text-foreground/85 dark:bg-amber-950/15">
                    <span className="mr-1 font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                      Note:
                    </span>
                    {f.notes}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
