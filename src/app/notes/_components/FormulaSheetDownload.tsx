"use client";

import { Sigma } from "lucide-react";
import SheetDownload from "@/components/export/SheetDownload";

/**
 * Download a chapter's formula sheet as a PDF (2026-10-10): every formula,
 * reference table and trap of the chapter on one A4 sheet, the same content
 * as the on-screen revision sheet below, which stays free. One free sheet per
 * account, then the pass. The box itself is SheetDownload, shared with the
 * /board revision sheet (2026-11-03).
 */
export default function FormulaSheetDownload({
  subjectRoute,
  chapterSlug,
  chapterName,
  /** What the sheet holds, for the box's description: "10 formulas · 2 tables · 14 traps". */
  summary,
}: {
  subjectRoute: string;
  chapterSlug: string;
  chapterName: string;
  summary: string;
}) {
  return (
    <SheetDownload
      kind="formula"
      accessQuery={`?formula=${encodeURIComponent(`${subjectRoute}/${chapterSlug}`)}`}
      endpoint="/api/export/formula-sheet"
      body={{ subjectRoute, chapterSlug }}
      fallbackFilename={`Formulas_${chapterSlug}.pdf`}
      buttonLabel="Formula sheet (PDF)"
      icon={Sigma}
      readyTitle={`${chapterName} formula sheet`}
      lockedTitle="Download formula sheets"
      noPassLine="Downloading formula sheets needs a pass."
      summary={summary}
      readyLine={`One A4 PDF: ${summary}, grouped by subtopic.`}
      note="The same formulas and traps as the revision sheet on this page, laid out to print or keep on your phone."
      noun="formula sheet"
      successToast="Formula sheet downloaded"
      surface="formula_sheet"
    />
  );
}
