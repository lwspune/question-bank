import { Fragment } from "react";
import type { CoveredRef, MappingRow } from "@/lib/syllabus/query";

/**
 * "Where does the other book cover this?"
 *
 * Rows are one spine (NCERT sections, or JEE bank subtopics); each `books`
 * column names where that topic lives in another syllabus. This is the inverse
 * of the coverage matrix above: a POINTER a teacher can act on, not a verdict.
 *
 * Server-rendered on purpose. The prototype's filters are client-side, but the
 * default view is what anyone answering a student actually needs, and shipping
 * it without JS keeps this page one render.
 */

export type BookColumn = {
  /** The exam column the ruling is stored under. */
  exam: string;
  /** Header shown above the chapter cell, e.g. "State Board". */
  label: string;
};

function RefCell({ refs }: { refs: CoveredRef[] }) {
  if (refs.length === 0) return null;
  return (
    <>
      {refs.map((r, i) => (
        <span key={`${r.cls}-${r.no}`}>
          {i > 0 ? " · " : ""}
          <span className="font-medium">{r.no}</span>
          {r.title ? ` ${r.title}` : ""}
        </span>
      ))}
    </>
  );
}

function chapterLabels(refs: CoveredRef[]): string {
  // De-duplicated, because a multi-section pointer usually sits in one chapter
  // and repeating it reads as though the topic is split when it is not.
  return [...new Set(refs.map((r) => r.chapterLabel))].join(" + ");
}

export default function MappingTable({
  rows,
  books,
  rowLabel,
  showPyq = false,
}: {
  rows: MappingRow[];
  books: BookColumn[];
  /** Header for the identifying column, e.g. "NCERT subtopic". */
  rowLabel: string;
  showPyq?: boolean;
}) {
  let lastChapter = "";
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[52rem] text-sm">
        <thead className="bg-muted/50">
          <tr>
            {showPyq ? (
              <th scope="col" className="p-3 text-right font-medium w-16">
                PYQ
              </th>
            ) : (
              <th scope="col" className="p-3 text-left font-medium w-20">
                Ref
              </th>
            )}
            <th scope="col" className="p-3 text-left font-medium">
              {rowLabel}
            </th>
            {books.map((b) => (
              <th key={b.exam} scope="col" className="p-3 text-left font-medium" colSpan={2}>
                {b.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const band =
              r.chapterName !== lastChapter ? ((lastChapter = r.chapterName), r.chapterName) : null;
            return (
              <Fragment key={r.id}>
                {band && (
                  <tr className="border-t bg-muted/30">
                    <td colSpan={2 + books.length * 2} className="p-2 px-3 text-sm font-semibold">
                      {band}
                      {r.oldSyllabus && (
                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                          — old syllabus, not examined since 2023
                        </span>
                      )}
                    </td>
                  </tr>
                )}
                <tr className={`border-t ${r.oldSyllabus ? "opacity-60" : ""}`}>
                  <td className="p-3 text-right tabular-nums text-muted-foreground">
                    {showPyq ? r.pyq : r.sectionNo}
                  </td>
                  <td className="p-3">
                    {r.concept}
                    {r.oldSyllabus && (
                      <span className="ml-2 rounded-full border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        old syllabus
                      </span>
                    )}
                  </td>
                  {books.map((b) => {
                    const cover = r.covers[b.exam];
                    const refs = cover?.refs ?? [];
                    return (
                      <Fragment key={`${r.id}-${b.exam}`}>
                        <td className="p-3 align-top text-xs text-muted-foreground">
                          {chapterLabels(refs)}
                        </td>
                        <td className="p-3 align-top">
                          {refs.length > 0 ? (
                            <RefCell refs={refs} />
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              {cover?.status === "not" ? (
                                <span className="rounded bg-rose-50 px-1.5 py-0.5 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200">
                                  not covered
                                </span>
                              ) : (
                                "no single section"
                              )}
                            </span>
                          )}
                          {cover?.status === "partial" && refs.length > 0 && (
                            <span className="ml-2 rounded bg-amber-50 px-1.5 py-0.5 text-[11px] text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                              partly
                            </span>
                          )}
                          {cover?.note && (
                            <p className="mt-1 text-xs text-muted-foreground">{cover.note}</p>
                          )}
                        </td>
                      </Fragment>
                    );
                  })}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
