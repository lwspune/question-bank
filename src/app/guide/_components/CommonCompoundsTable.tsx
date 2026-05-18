import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPOUND_CLUSTERS } from "@/app/guide/nda-chemistry/_data/common-compounds";

/**
 * Single-page common-compounds renderer for /guide/nda-chemistry/common-compounds.
 *
 * Plain-text + unicode for chemical formulas (subscripts, dots, charges) — no
 * KaTeX in this component, so the page stays a server component and formulas
 * are screen-reader-friendly. Each cluster header sits above a 3-column table
 * (name | formula | use) with optional row-level trap notes underneath.
 */
export default function CommonCompoundsTable() {
  return (
    <div className="mt-6 space-y-10">
      {COMPOUND_CLUSTERS.map((cluster) => (
        <section key={cluster.theme} className="rounded-lg border bg-card">
          <header className="border-b bg-muted/30 px-5 py-3">
            <h2 className="text-base font-semibold tracking-tight sm:text-lg">
              {cluster.theme}
            </h2>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              {cluster.blurb}
            </p>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="border-b text-xs uppercase tracking-wide text-muted-foreground">
                <tr className="text-left">
                  <th className="px-5 py-2 font-medium">Name</th>
                  <th className="px-5 py-2 font-medium">Formula</th>
                  <th className="px-5 py-2 font-medium">Use / context</th>
                  <th className="px-5 py-2 font-medium" aria-label="Playbook link" />
                </tr>
              </thead>
              <tbody>
                {cluster.compounds.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b last:border-b-0 align-top"
                  >
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground">{c.name}</p>
                      {c.notes && (
                        <p className="mt-1 rounded-md border-l-2 border-amber-500/40 bg-amber-50/40 px-2 py-1 font-serif text-xs leading-relaxed text-foreground/85 dark:bg-amber-950/15">
                          <span className="mr-1 font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                            Note:
                          </span>
                          {c.notes}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3 font-mono text-foreground tabular-nums">
                      {c.formula}
                    </td>
                    <td className="px-5 py-3 font-serif text-muted-foreground">
                      {c.use}
                    </td>
                    <td className="px-5 py-3 text-right">
                      {c.playbookSlug && (
                        <Link
                          href={`/guide/nda-chemistry/playbooks/${c.playbookSlug}`}
                          className="group inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                          aria-label={`Open the ${c.name} playbook`}
                        >
                          Playbook
                          <ArrowRight
                            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
