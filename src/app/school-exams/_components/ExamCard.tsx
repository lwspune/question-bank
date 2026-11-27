import Link from "next/link";
import { ArrowRight, CalendarDays, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SchoolExam } from "@/lib/schoolExams/catalog";

const FOCUS = "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** One exam: what it is for, who can sit, when, who runs it, and where to read more. */
export default function ExamCard({
  exam,
  ourLink,
  nextLine,
}: {
  exam: SchoolExam;
  ourLink: string | null;
  nextLine: string | null;
}) {
  const rows: { label: string; value: string }[] = [
    { label: "For", value: exam.forWhat },
    { label: "Who can sit", value: exam.whoCanSit },
    { label: "When", value: exam.when },
    { label: "Run by", value: exam.body },
  ];
  return (
    <article className="rounded-xl border bg-card p-4 sm:p-5" aria-labelledby={`exam-${exam.id}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 id={`exam-${exam.id}`} className="text-base font-semibold leading-snug">
          {exam.name}
        </h3>
        <Badge variant={exam.region === "india" ? "secondary" : "outline"} className="shrink-0">
          {exam.region === "india" ? "All India" : "Maharashtra"}
        </Badge>
      </div>

      {nextLine && (
        <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-brand-accent">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
          {nextLine}
        </p>
      )}

      <dl className="mt-3 space-y-2 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-3">
            <dt className="font-medium text-muted-foreground">{r.label}</dt>
            <dd className="mt-0.5 leading-relaxed sm:mt-0">{r.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a
          href={exam.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Official site for ${exam.name} (opens in a new tab)`}
          className={`inline-flex items-center gap-1 font-medium text-brand-accent underline-offset-4 hover:underline ${FOCUS}`}
        >
          Official site
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
        {ourLink && (
          <Link
            href={ourLink}
            className={`inline-flex items-center gap-1 font-medium text-brand-accent underline-offset-4 hover:underline ${FOCUS}`}
          >
            Past papers on PYQ Vault
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        )}
      </div>
    </article>
  );
}
