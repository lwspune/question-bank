"use client";

/**
 * A notes chapter's Top 10 PYQs (2026-11-04): the first ten questions of the
 * chapter in its subject's homework plan, the same list the /board chapter tab
 * shows (lib/homework/chapterTop.ts). Also the body of the Homework tab's
 * chapter page (/homework/<plan>/top/<chapter>). Answers are attempt-first and spend the
 * same free answers as /board and the homework days (useBoardReveal), so this
 * list is not a way round the sign-in prompt.
 */
import { useMemo } from "react";
import { Flame } from "lucide-react";
import { PresentRegistry } from "@/components/present/PresentRegistry";
import type { BoardQuestion } from "@/lib/board/query";
import type { ChapterTopPyqs } from "@/lib/homework/chapterTop";
import { useBoardReveal } from "@/app/board/useBoardReveal";
import HomeworkSlotList from "@/app/homework/_components/HomeworkSlotList";
import PaperDownload from "@/app/mock/_components/PaperDownload";

export default function NotesTopPyqs({
  top,
  examName,
  chapterName,
  supabaseUrl,
  className = "mt-10",
}: {
  top: ChapterTopPyqs;
  /** The DB exams.name, for the free-answer meter. */
  examName: string;
  chapterName: string;
  supabaseUrl: string;
  /** Spacing above the section: a notes chapter sets it apart, the homework page leads with it. */
  className?: string;
}) {
  const byId = useMemo(() => {
    const m = new Map<string, BoardQuestion>();
    for (const s of top.slots) for (const q of s.questions) m.set(q.id, q);
    return m;
  }, [top.slots]);
  const { revealed, blocked, picks, lock, toggleOne, pickOne } = useBoardReveal(
    examName,
    `${chapterName} top PYQs`,
    byId
  );

  return (
    <section id="top-pyqs" aria-labelledby="top-pyqs-heading" className={`${className} space-y-4`}>
      <div className="space-y-3 rounded-lg border border-brand-accent/30 bg-brand-accent/5 p-4">
        <div>
          <h2
            id="top-pyqs-heading"
            className="flex items-center gap-2 text-base font-semibold text-brand-accent"
          >
            <Flame className="h-4 w-4" aria-hidden />
            Top {top.slots.length} {examName} PYQs to practise first
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Questions asked again come first, then the kinds of question asked most often. Each one
            says how often and in which papers.
          </p>
        </div>
        <PaperDownload
          slug={`top-pyqs-${top.planSlug}`}
          paperTitle={top.title}
          topPyqs={{ plan: top.planSlug, chapterId: top.chapterId }}
        />
      </div>
      <PresentRegistry>
        <HomeworkSlotList
          slots={top.slots}
          supabaseUrl={supabaseUrl}
          showChapter={false}
          idPrefix="top"
          revealed={revealed}
          blocked={blocked}
          lock={lock}
          onToggleReveal={toggleOne}
          picks={picks}
          onPick={pickOne}
        />
      </PresentRegistry>
    </section>
  );
}
