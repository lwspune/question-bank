import { Plus, Flame } from "lucide-react";
import BrowseLink from "./BrowseLink";

type Subtopic = { id?: string; name: string };

type Props = {
  rank?: number;
  name: string;
  principleA: string;
  principleB: string;
  qCount: number;
  pctHard: number;
  bankPctHard: number;
  description: string;
  examples: string[];
  drillFilter: {
    chapterId?: string;
    subtopic?: Subtopic;
    note?: string;
  };
  soloA: {
    chapterId?: string;
    subtopic?: Subtopic;
    qCount: number;
  };
  soloB: {
    chapterId?: string;
    subtopic?: Subtopic;
    qCount: number;
  };
  examId: string;
  subjectId: string;
};

/**
 * Card for the Compound Tricks page. Visually:
 *   [Principle A] + [Principle B]
 *   N questions · X% HARD (vs Y% bank avg)
 *   --- description ---
 *   - example 1
 *   - example 2
 *   [Drill compound →] [Solo A →] [Solo B →]
 */
export default function CompoundCard({
  rank,
  name,
  principleA,
  principleB,
  qCount,
  pctHard,
  bankPctHard,
  description,
  examples,
  drillFilter,
  soloA,
  soloB,
  examId,
  subjectId,
}: Props) {
  const hardMultiplier = (pctHard / bankPctHard).toFixed(1);

  return (
    <article className="rounded-xl border-2 border-primary/20 bg-card p-6 shadow-sm">
      {/* Header: principle pair */}
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Flame className="h-3.5 w-3.5 text-orange-500" aria-hidden />
          Compound recipe {rank ?? ""}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <PrincipleBadge label={principleA} />
          <Plus className="h-4 w-4 text-muted-foreground" aria-hidden />
          <PrincipleBadge label={principleB} />
        </div>
        <h3 className="text-lg font-bold tracking-tight sm:text-xl">{name}</h3>
        <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm tabular-nums text-muted-foreground">
          <span>
            <span className="font-semibold text-foreground">{qCount}</span> compound questions
          </span>
          <span>·</span>
          <span>
            <span className="font-semibold text-foreground">{pctHard}%</span> HARD
          </span>
          <span>·</span>
          <span className="text-orange-700 dark:text-orange-400">
            {hardMultiplier}× the bank average
          </span>
        </p>
      </header>

      <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
        {description}
      </p>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          What it looks like
        </p>
        <ul className="mt-2 space-y-2 font-serif text-sm leading-relaxed">
          {examples.map((ex, i) => (
            <li
              key={i}
              className="border-l-2 border-primary/40 pl-3 italic text-foreground/90"
            >
              {ex}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 space-y-2 border-t pt-4">
        {drillFilter.note && (
          <p className="text-xs italic text-muted-foreground">
            {drillFilter.note}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <BrowseLink
            examId={examId}
            subjectId={subjectId}
            chapterIds={drillFilter.chapterId ? [drillFilter.chapterId] : []}
            subtopicIds={
              drillFilter.subtopic?.id ? [drillFilter.subtopic.id] : []
            }
          >
            Drill the compound
          </BrowseLink>
          <BrowseLink
            examId={examId}
            subjectId={subjectId}
            chapterIds={soloA.chapterId ? [soloA.chapterId] : []}
            subtopicIds={soloA.subtopic?.id ? [soloA.subtopic.id] : []}
            variant="outline"
          >
            {principleA} alone ({soloA.qCount})
          </BrowseLink>
          <BrowseLink
            examId={examId}
            subjectId={subjectId}
            chapterIds={soloB.chapterId ? [soloB.chapterId] : []}
            subtopicIds={soloB.subtopic?.id ? [soloB.subtopic.id] : []}
            variant="outline"
          >
            {principleB} alone ({soloB.qCount})
          </BrowseLink>
        </div>
      </div>
    </article>
  );
}

function PrincipleBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
      {label}
    </span>
  );
}
