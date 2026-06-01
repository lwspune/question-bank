import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type ReferenceEntry = {
  id: string;
  name: string;
  fact: string;
  context: string;
  notes?: string;
  playbookSlug?: string;
};

export type ReferenceCluster = {
  theme: string;
  blurb: string;
  columns: { name: string; fact: string; context: string };
  entries: ReadonlyArray<ReferenceEntry>;
};

type Props = {
  /** Guide path segment, e.g. "nda-biology". */
  guidePath: string;
  /** Multi-domain reference clusters (each carries its own column headers). */
  clusters: ReadonlyArray<ReferenceCluster>;
};

/**
 * Multi-domain reference-tables renderer for /guide/<guide>/reference-tables
 * (and /guide/nda-history/timeline-and-pairs). Each cluster carries its OWN
 * column headers because the named-fact domains differ per cluster.
 *
 * Generic over every guide: the call site passes its REFERENCE_CLUSTERS +
 * guidePath. Replaces the former four per-guide copies (Biology/Geography/
 * History/PolityReferenceTables) — they differed only by import path + href.
 *
 * Distinct from CommonCompoundsTable (chemistry, single-domain). Plain-text
 * strings only — no LaTeX pipeline, so the page stays a server component.
 */
export default function ReferenceTables({ guidePath, clusters }: Props) {
  return (
    <div className="mt-6 space-y-10">
      {clusters.map((cluster) => (
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
                  <th className="px-5 py-2 font-medium">{cluster.columns.name}</th>
                  <th className="px-5 py-2 font-medium">{cluster.columns.fact}</th>
                  <th className="px-5 py-2 font-medium">{cluster.columns.context}</th>
                  <th className="px-5 py-2 font-medium" aria-label="Playbook link" />
                </tr>
              </thead>
              <tbody>
                {cluster.entries.map((e) => (
                  <tr
                    key={e.id}
                    className="border-b last:border-b-0 align-top"
                  >
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground">{e.name}</p>
                      {e.notes && (
                        <p className="mt-1 rounded-md border-l-2 border-amber-500/40 bg-amber-50/40 px-2 py-1 font-serif text-xs leading-relaxed text-foreground/85 dark:bg-amber-950/15">
                          <span className="mr-1 font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                            Note:
                          </span>
                          {e.notes}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium text-foreground">
                      {e.fact}
                    </td>
                    <td className="px-5 py-3 font-serif text-muted-foreground">
                      {e.context}
                    </td>
                    <td className="px-5 py-3 text-right">
                      {e.playbookSlug && (
                        <Link
                          href={`/guide/${guidePath}/playbooks/${e.playbookSlug}`}
                          className="group inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                          aria-label={`Open the ${e.name} playbook`}
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
