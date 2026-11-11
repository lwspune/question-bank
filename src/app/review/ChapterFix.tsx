import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarCheck, CircleX, Clock, MessageCircleQuestion } from "lucide-react";
import QuestionCard from "../browse/QuestionCard";
import type { QuestionRow } from "@/lib/questions/query";
import { reasonLabel, type FixQuestion, type Reason } from "@/lib/review/fixList";
import type { ChapterTraps as Traps } from "@/lib/guide/chapterTraps";
import ChapterTraps from "./ChapterTraps";
import { drillChapterHref } from "@/lib/drill/from";

/** The most questions one chapter page shows; the drill serves the rest. */
export const CHAPTER_CAP = 50;

/**
 * One chapter's questions waiting in Fix your mistakes, newest miss first,
 * each under why it is here. The cards are the bank's own, so a student can
 * retry one right here: a right answer is checked against every kind of miss
 * (lib/drill/select MISS_KINDS) and takes it off the list.
 */
export default function ChapterFix({
  chapterId,
  name,
  place,
  total,
  items,
  cards,
  titles,
  canEdit,
  supabaseUrl,
  traps,
}: {
  chapterId: string;
  /** Null when nothing in this chapter is waiting (all fixed, or a stale link). */
  name: string | null;
  place: string;
  total: number;
  items: FixQuestion[];
  cards: QuestionRow[];
  titles: ReadonlyMap<string, string>;
  canEdit: boolean;
  supabaseUrl: string;
  /** The chapter's playbook traps from its strategy guide; null where it has none. */
  traps: Traps | null;
}) {
  const back = (
    <Link
      href="/review"
      prefetch={false}
      className="inline-flex items-center gap-1 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
      All chapters
    </Link>
  );

  if (!name || cards.length === 0) {
    return (
      <div className="space-y-4">
        {back}
        <section className="rounded-2xl border border-dashed p-8 text-center">
          <h2 className="font-semibold">Nothing left to fix here</h2>
          <p className="mt-1 text-sm text-muted-foreground">Every question from this chapter is fixed. Well done.</p>
        </section>
      </div>
    );
  }

  const byId = new Map(items.map((i) => [i.questionId, i]));
  return (
    <div className="space-y-5">
      {back}
      <section className="flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight">{name}</h2>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium tabular-nums text-foreground">{total.toLocaleString("en-IN")} to fix</span>
            {place && <> · {place}</>}
          </p>
        </div>
        <Link
          href={drillChapterHref("review_tab", chapterId)}
          prefetch={false}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Fix this chapter
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>

      {traps && <ChapterTraps chapterId={chapterId} traps={traps} />}

      <ol className="space-y-4">
        {cards.map((q, i) => {
          const item = byId.get(q.id);
          return (
            <li key={q.id} className="space-y-1.5">
              {item && <Why item={item} mockTitle={item.mockId ? (titles.get(item.mockId) ?? null) : null} />}
              <QuestionCard question={q} index={i + 1} canEdit={canEdit} isLoggedIn includeExam supabaseUrl={supabaseUrl} />
            </li>
          );
        })}
      </ol>

      {total > cards.length && (
        <p className="text-sm text-muted-foreground">
          {(total - cards.length).toLocaleString("en-IN")} more in this chapter.{" "}
          <Link
            href={drillChapterHref("review_tab", chapterId)}
            prefetch={false}
            className="font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Fix them five at a time
          </Link>
        </p>
      )}
    </div>
  );
}

const ICON: Record<Reason, typeof CircleX> = {
  mock: CircleX,
  practice: CircleX,
  drill: CircleX,
  daily: CircleX,
  v_question: CircleX,
  review_later: Clock,
  v_unclear: MessageCircleQuestion,
};

/** Why this question is here, and whether it is in today's plan. */
function Why({ item, mockTitle }: { item: FixQuestion; mockTitle: string | null }) {
  const Icon = ICON[item.reason];
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 px-1 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
        <Icon className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
        {reasonLabel(item.reason, mockTitle)}
      </span>
      {item.inPlan && (
        <span className="inline-flex items-center gap-1 font-medium text-emerald-700 dark:text-emerald-400">
          <CalendarCheck className="h-3.5 w-3.5" aria-hidden />
          In today&apos;s plan
        </span>
      )}
    </p>
  );
}
