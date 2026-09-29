/**
 * The provenance line under a trends REPORT's hero: when it was last updated,
 * which sitting the data runs through, how many papers and questions it
 * counts, and where the underlying questions are.
 *
 * Every value is either passed by the page (which already computes its own
 * paper/question counts) or read from the committed content dates — nothing
 * here is typed twice. A missing date prints nothing rather than the build
 * date, because "Updated today" on every deploy is the lie this exists to
 * avoid.
 */
import Link from "next/link";
import { CalendarDays, FileText, Database } from "lucide-react";
import { reportUpdatedIso, trendsReportFor } from "@/lib/guide/trendsReports";

type Props = {
  route: string;
  /** e.g. "18" — as the page's own stat block prints it. */
  papers?: string;
  /** e.g. "2,280" */
  questions?: string;
};

function longDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export default function ReportProvenance({ route, papers, questions }: Props) {
  const report = trendsReportFor(route);
  if (!report) return null;
  const updated = reportUpdatedIso(route);

  const facts: string[] = [];
  if (report.dataThrough) facts.push(`Data through ${report.dataThrough}`);
  if (papers) facts.push(`${papers} papers`);
  if (questions) facts.push(`${questions} questions`);

  return (
    <aside
      aria-label="Report provenance"
      className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-md border bg-muted/30 px-3 py-2 text-xs text-muted-foreground"
    >
      <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
        <FileText className="h-3.5 w-3.5" aria-hidden />
        Report
      </span>
      {updated && (
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
          Updated {longDate(updated)}
        </span>
      )}
      {facts.map((f) => (
        <span key={f}>{f}</span>
      ))}
      <Link
        href="/questions"
        className="inline-flex items-center gap-1.5 text-brand-accent underline-offset-2 hover:underline"
      >
        <Database className="h-3.5 w-3.5" aria-hidden />
        Every count is a public question in the bank, tagged by chapter
      </Link>
    </aside>
  );
}
