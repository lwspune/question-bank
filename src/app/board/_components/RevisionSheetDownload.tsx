"use client";

import { ListChecks } from "lucide-react";
import SheetDownload from "@/components/export/SheetDownload";

/**
 * A /board chapter's quick-revision sheet as a PDF (2026-11-03): a Premium
 * Pass download with no free first copy (owner). The tab it sits in shows the
 * same sheet free.
 */
export default function RevisionSheetDownload({
  examSlug,
  subjectRoute,
  chapterSlug,
  chapterName,
  summary,
}: {
  examSlug: string;
  subjectRoute: string;
  chapterSlug: string;
  chapterName: string;
  /** "8 most-asked questions · 13 key points · ...". */
  summary: string;
}) {
  return (
    <SheetDownload
      kind="revision"
      accessQuery=""
      endpoint="/api/export/revision-sheet"
      body={{ examSlug, subjectRoute, chapterSlug }}
      fallbackFilename={`Revision_${chapterSlug}.pdf`}
      buttonLabel="Revision sheet (PDF)"
      icon={ListChecks}
      readyTitle={`${chapterName} revision sheet`}
      lockedTitle="Download revision sheets"
      noPassLine="Downloading revision sheets needs a pass."
      summary={summary}
      readyLine={`One PDF: ${summary}.`}
      note="Everything in this tab, laid out to print or keep on your phone."
      noun="revision sheet"
      successToast="Revision sheet downloaded"
      surface="revision_sheet"
    />
  );
}
