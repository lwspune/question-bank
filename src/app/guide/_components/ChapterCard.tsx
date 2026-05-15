import { CheckCircle2, XCircle } from "lucide-react";
import BrowseLink from "./BrowseLink";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/lib/questions/filters";

export type ChapterCardSubtopic = {
  name: string;
  id?: string; // resolved at request time; absent → CTA falls back to chapter-only drill
};

type Props = {
  rank?: number;
  chapter: string;
  qCount: number;
  pctEasy?: number;
  pctHard?: number;
  expectedYieldPerPaper: string;
  studyHours: number;
  summary: string;
  drillSubtopics: ChapterCardSubtopic[];
  skipSubtopics?: string[];
  /** Resolved chapter id, used to build "Drill all X →" fallback CTA. */
  chapterId?: string;
  examId: string;
  subjectId: string;
  /** Optional difficulty filter applied to every CTA on the card. */
  defaultDifficulties?: Difficulty[];
};

/**
 * Card showing one chapter in the Strategy page. Renders:
 *   - title + chapter q-count + easy/hard percentage badges
 *   - 1-2 sentence summary
 *   - "Drill →" CTA per must-drill subtopic
 *   - Muted list of skip subtopics
 *   - Expected yield + hours footer
 */
export default function ChapterCard({
  rank,
  chapter,
  qCount,
  pctEasy,
  pctHard,
  expectedYieldPerPaper,
  studyHours,
  summary,
  drillSubtopics,
  skipSubtopics,
  chapterId,
  examId,
  subjectId,
  defaultDifficulties,
}: Props) {
  return (
    <article className="rounded-lg border bg-card p-5 shadow-sm">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            {rank != null && (
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground tabular-nums">
                #{rank}
              </span>
            )}
            <h3 className="truncate text-base font-semibold tracking-tight sm:text-lg">
              {chapter}
            </h3>
          </div>
          <p className="mt-1 text-xs tabular-nums text-muted-foreground">
            {qCount} questions
            {pctEasy != null && <> · {pctEasy}% easy</>}
            {pctHard != null && <> · {pctHard}% hard</>}
          </p>
        </div>
      </header>

      <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">
        {summary}
      </p>

      <div className="mt-4 space-y-2">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Drill
        </p>
        <ul className="space-y-1.5">
          {drillSubtopics.map((s) => (
            <li key={s.name} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <span className="text-sm">{s.name}</span>
              <BrowseLink
                examId={examId}
                subjectId={subjectId}
                chapterIds={chapterId ? [chapterId] : []}
                subtopicIds={s.id ? [s.id] : []}
                difficulties={defaultDifficulties}
                variant="outline"
                className="shrink-0 px-3 py-1 text-xs"
              >
                Drill
              </BrowseLink>
            </li>
          ))}
        </ul>
      </div>

      {skipSubtopics && skipSubtopics.length > 0 && (
        <div className="mt-4 space-y-1.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <XCircle className="h-3.5 w-3.5" aria-hidden /> Skip
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {skipSubtopics.map((s) => (
              <li key={s} className="line-through">{s}</li>
            ))}
          </ul>
        </div>
      )}

      <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-xs text-muted-foreground">
        <span>
          <span className="font-medium text-foreground">{expectedYieldPerPaper}</span>{" "}
          per paper
        </span>
        <span>
          <span className="font-medium text-foreground tabular-nums">{studyHours}h</span>{" "}
          study time
        </span>
      </footer>
    </article>
  );
}

/** Lighter card for the skip list — no CTAs, just chapter + reason. */
export function SkipChapterRow({
  chapter,
  qCount,
  reason,
}: {
  chapter: string;
  qCount: number;
  reason: string;
}) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-0.5 border-b py-2 last:border-b-0 sm:grid-cols-[14rem_1fr_auto]">
      <span className="text-sm font-medium">{chapter}</span>
      <span className={cn("hidden text-sm text-muted-foreground sm:block font-serif leading-snug")}>
        {reason}
      </span>
      <span className="text-xs tabular-nums text-muted-foreground">
        {qCount}q
      </span>
      <span className="text-xs text-muted-foreground sm:hidden font-serif">
        {reason}
      </span>
    </li>
  );
}
