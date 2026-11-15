import { ExternalLink } from "lucide-react";
import { RIGHTS, VERDICTS, type RightsId, type Source, type VerdictId } from "@/lib/worldExams/model";

/** Small pieces of /dashboard/world-exams. Server components. */

export const linkClass =
  "rounded underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

// Text colours as on /dashboard/competitors: the 700 shade in light mode and
// 400 in dark mode both pass WCAG AA on a card.
const RIGHTS_TONE: Record<RightsId, string> = {
  free: "border-emerald-600/40 text-emerald-700 dark:text-emerald-400",
  same_as_india: "border-sky-600/40 text-sky-700 dark:text-sky-400",
  licensable: "border-amber-600/40 text-amber-700 dark:text-amber-400",
  original_only: "border-violet-600/40 text-violet-700 dark:text-violet-400",
  reject: "border-red-600/40 text-red-700 dark:text-red-400",
  not_checked: "border-border text-muted-foreground",
};

const VERDICT_TONE: Record<VerdictId, string> = {
  live: "border-emerald-600/40 text-emerald-700 dark:text-emerald-400",
  in_progress: "border-emerald-600/40 text-emerald-700 dark:text-emerald-400",
  shortlist: "border-brand bg-brand text-brand-foreground",
  lead: "border-sky-600/40 text-sky-700 dark:text-sky-400",
  park: "border-amber-600/40 text-amber-700 dark:text-amber-400",
  skip: "border-border text-muted-foreground",
  declined: "border-red-600/40 text-red-700 dark:text-red-400",
};

const badge = "inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium";

export function RightsBadge({ rights }: { rights: RightsId }) {
  const label = RIGHTS.find((r) => r.id === rights)?.label ?? rights;
  return <span className={`${badge} ${RIGHTS_TONE[rights]}`}>{label}</span>;
}

export function VerdictBadge({ verdict }: { verdict: VerdictId }) {
  const label = VERDICTS.find((v) => v.id === verdict)?.label ?? verdict;
  return <span className={`${badge} ${VERDICT_TONE[verdict]}`}>{label}</span>;
}

export function SourceLinks({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null;
  return (
    <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs font-normal text-muted-foreground">
      {sources.map((s) => (
        <li key={s.url}>
          <a href={s.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${linkClass}`}>
            {s.label}
            <ExternalLink className="h-3 w-3" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
