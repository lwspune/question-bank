"use client";

/**
 * A whole past paper to read (2026-10-15): every question in printed order,
 * section by section. Answers are attempt-first and spend the same free
 * answers as /board and /question-papers (useBoardReveal), the owner's call:
 * a reading page is not a way round the sign-in prompt.
 *
 * Every question is in the HTML, so search engines and ChatGPT can read the
 * paper. The answer opens on a tap, as on a board paper.
 */
import { useMemo } from "react";
import BoardPassage from "@/app/board/BoardPassage";
import BoardLangSwitch from "@/app/board/BoardLangSwitch";
import { PresentRegistry } from "@/components/present/PresentRegistry";
import { fromBoardQuestion } from "@/lib/present/viewModel";
import type { BoardQuestion } from "@/lib/board/query";
import type { PaperSectionView } from "@/lib/mocks/paperPage";
import BoardQuestionItem from "@/app/board/BoardQuestionItem";
import { useBoardReveal } from "@/app/board/useBoardReveal";

export default function MockPaperReader({
  sections,
  examName,
  paperName,
  supabaseUrl,
}: {
  sections: PaperSectionView[];
  /** The DB exams.name, for the free-answer meter. */
  examName: string;
  paperName: string;
  supabaseUrl: string;
}) {
  const byId = useMemo(() => {
    const m = new Map<string, BoardQuestion>();
    for (const s of sections) for (const it of s.items) m.set(it.question.id, it.question);
    return m;
  }, [sections]);
  const { revealed, blocked, picks, lock, toggleOne, pickOne } = useBoardReveal(examName, paperName, byId);
  const showHeadings = sections.length > 1;

  return (
    <PresentRegistry>
      <div className="space-y-8">
        <BoardLangSwitch questions={byId.values()} />
        {sections.map((sec) => (
          <section
            key={sec.key}
            aria-labelledby={showHeadings ? `sec-${sec.key}` : undefined}
            aria-label={showHeadings ? undefined : "Questions"}
            className="space-y-3"
          >
            {showHeadings && (
              <div className="border-b-2 border-brand-accent/30 pb-1.5">
                <h2 id={`sec-${sec.key}`} className="text-lg font-semibold tracking-tight text-foreground">
                  {sec.title}
                </h2>
                <p className="text-xs text-muted-foreground">{sec.items.length} questions</p>
              </div>
            )}
            <ol className="space-y-3">
              {sec.items.map((it, idx) => {
                const q = it.question;
                const prev = sec.items[idx - 1];
                // A shared passage or set of directions prints once, above the first question that carries it.
                const showContext = !!q.context && q.context !== prev?.question.context;
                return (
                  <li key={it.position}>
                    {showContext && (
                      <div className="mb-2 rounded-md border-l-2 border-brand-accent/40 bg-muted/30 px-3 py-2 font-serif text-sm text-muted-foreground">
                        <BoardPassage q={q} />
                      </div>
                    )}
                    <BoardQuestionItem
                      q={q}
                      supabaseUrl={supabaseUrl}
                      present={fromBoardQuestion(q, { chapter: paperName, sectionLabel: showHeadings ? sec.title : null })}
                      order={it.position}
                      revealed={revealed.has(q.id)}
                      blocked={blocked.has(q.id)}
                      lockedLink={lock.isLocked(q.id) ? lock.link : null}
                      onToggleReveal={() => toggleOne(q.id)}
                      pick={picks.get(q.id) ?? null}
                      onPick={(label) => pickOne(q.id, label)}
                    />
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </PresentRegistry>
  );
}
