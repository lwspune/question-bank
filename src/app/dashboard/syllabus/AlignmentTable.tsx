import { Fragment } from "react";
import type { AlignmentRow } from "@/lib/syllabus/summary";

/**
 * The three-book crosswalk: one State Board subtopic, one NCERT subtopic, one
 * JEE subtopic per row.
 *
 * A value repeating down a column is EXPECTED, not a bug — it is what lets a
 * many-to-many mapping stay in single-value cells instead of being crushed into
 * a list, and it is why no pairing has to be invented to fill a row.
 *
 * Server-rendered like the other tables here: the default view is the whole
 * answer, so there is nothing to filter client-side.
 */
export default function AlignmentTable({
  rows,
  ncertMapped,
}: {
  rows: AlignmentRow[];
  /**
   * Has the NCERT -> State Board edge been authored for this subject at all?
   *
   * Without this the empty cell claimed "not in NCERT" for a subject where
   * nobody had ever looked — the map's one cardinal sin, and it shipped: every
   * Physics row said "not in NCERT" including Dimensional Analysis, which NCERT
   * teaches across three sections. An unassessed blank must not read as a
   * verdict.
   */
  ncertMapped: boolean;
}) {
  let lastChapter = "";
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[56rem] text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th scope="col" className="p-3 text-left font-medium w-[30%]">
              State Board subtopic
            </th>
            <th scope="col" className="p-3 text-left font-medium w-[35%]">
              NCERT subtopic
            </th>
            <th scope="col" className="p-3 text-left font-medium">
              JEE Mains subtopic
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const chapter = `Std ${r.anchor.cls === 11 ? "XI" : "XII"} Ch.${r.anchor.chapterNo} ${r.anchor.chapterName}`;
            const band = chapter !== lastChapter ? ((lastChapter = chapter), chapter) : null;
            // The anchor repeats down consecutive rows by design; printing it
            // only once per run keeps the eye on what actually changes.
            const repeat =
              i > 0 &&
              rows[i - 1].anchor.id === r.anchor.id &&
              rows[i - 1].anchor.sectionNo === r.anchor.sectionNo;
            return (
              <Fragment key={`${r.anchor.id}-${r.ncert?.id ?? "x"}-${r.jee?.id ?? "x"}-${i}`}>
                {band && (
                  <tr className="border-t bg-muted/30">
                    <td colSpan={3} className="p-2 px-3 text-sm font-semibold">
                      {band}
                    </td>
                  </tr>
                )}
                <tr className="border-t align-top">
                  <td className="p-3">
                    {repeat ? (
                      <span className="text-muted-foreground/50">↳</span>
                    ) : (
                      <>
                        <span className="mr-1.5 tabular-nums text-muted-foreground">
                          {r.anchor.sectionNo}
                        </span>
                        {r.anchor.concept}
                      </>
                    )}
                  </td>
                  <td className="p-3">
                    {r.ncert ? (
                      <>
                        {r.ncert.label}
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {r.ncert.chapterLabel}
                        </span>
                      </>
                    ) : ncertMapped ? (
                      <span className="text-xs text-muted-foreground">not in NCERT</span>
                    ) : (
                      <span className="text-xs italic text-muted-foreground/70">not mapped yet</span>
                    )}
                  </td>
                  <td className="p-3">
                    {r.jee ? (
                      <>
                        {r.jee.label}
                        {r.jee.pyq ? (
                          <span className="ml-2 tabular-nums text-xs text-muted-foreground">
                            {r.jee.pyq} PYQ
                          </span>
                        ) : null}
                        {r.jee.oldSyllabus && (
                          <span className="ml-2 rounded-full border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                            old syllabus
                          </span>
                        )}
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {r.jee.chapterLabel}
                        </span>
                      </>
                    ) : (
                      // Deliberately NOT the same words as the NCERT blank. A
                      // missing NCERT section is a verified claim; a missing JEE
                      // row only means the question bank never sampled it.
                      <span className="text-xs text-muted-foreground">not asked in the bank</span>
                    )}
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
