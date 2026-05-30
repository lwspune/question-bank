import { ExternalLink } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import type { ReferenceTable } from "@/app/notes/_types";

type Props = {
  table: ReferenceTable;
  /**
   * Compact mode shrinks padding + type size for revision-sheet
   * disclosures. Full mode (default) sits inside a ConceptUnitCard as
   * the core teaching slot.
   */
  compact?: boolean;
};

/**
 * Bordered reference table — the core teaching slot for the reference
 * variant of `ConceptUnit`. Renders N columns of cells with optional
 * amber per-row notes and optional `[Q]` chips that anchor to the bank
 * via the row's `pyqExampleId`.
 *
 * Cell + caption + noteAmber content goes through KatexRenderer so
 * authors can drop inline math (`\(v = 340 \text{ m/s}\)`) and bold
 * key terms (`**audible**`) directly in the data. Column headers stay
 * plain text — `notes-latex-audit` enforces no LaTeX leaks there.
 */
export default function ReferenceTableBlock({ table, compact = false }: Props) {
  const cellClass = compact
    ? "px-3 py-1.5 text-sm font-serif text-foreground"
    : "px-4 py-2.5 font-serif text-foreground";
  const headerClass = compact
    ? "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
    : "px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground";

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-muted/50">
            <tr>
              {table.columns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`${headerClass} text-left ${i > 0 ? "border-l" : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rIdx) => {
              const isAmber = Boolean(row.noteAmber);
              return (
                <tr
                  key={rIdx}
                  className={`border-t ${
                    isAmber
                      ? "bg-amber-50/60 dark:bg-amber-950/20"
                      : rIdx % 2 === 1
                      ? "bg-muted/20"
                      : ""
                  }`}
                >
                  {row.cells.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`${cellClass} align-top ${cIdx > 0 ? "border-l" : ""}`}
                    >
                      <KatexRenderer text={cell} />
                      {cIdx === row.cells.length - 1 && row.pyqExampleId && (
                        <a
                          href={`/browse?ids=${row.pyqExampleId}`}
                          className="ml-2 inline-flex items-center gap-0.5 rounded-md border border-primary/30 bg-primary/5 px-1.5 py-0.5 align-middle text-[10px] font-medium text-primary hover:bg-primary/10"
                          aria-label="Featured PYQ for this row"
                          title="Open the past-year question that tests this row"
                        >
                          <ExternalLink className="h-2.5 w-2.5" aria-hidden />
                          Q
                        </a>
                      )}
                      {cIdx === row.cells.length - 1 && row.noteAmber && (
                        <div className="mt-1 text-xs italic text-amber-800 dark:text-amber-200">
                          <KatexRenderer text={row.noteAmber} />
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {table.caption && (
        <div className="border-t bg-muted/30 px-4 py-2 text-xs italic text-muted-foreground">
          <KatexRenderer text={table.caption} />
        </div>
      )}
    </div>
  );
}
