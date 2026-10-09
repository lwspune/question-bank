"use client";

/**
 * One board past paper page's body (2026-10-09): the paper as printed, set by
 * set, section by section, with each question's marks, "OR" between the two
 * halves of a choice, and a case study's passage printed once.
 *
 * Answers are attempt-first and spend the same free answers as /board
 * (useBoardReveal), the owner's call: paper pages are not a way round the
 * sign-in prompt.
 *
 * Sets are tabs held in React STATE, not a search param: useSearchParams would
 * bail this cached page out of static rendering. Every set stays mounted (the
 * others hidden) so its questions are in the HTML for search engines.
 */
import { useMemo, useState } from "react";
import BlockText from "@/components/math/BlockText";
import { PresentRegistry } from "@/components/present/PresentRegistry";
import { fromBoardQuestion } from "@/lib/present/viewModel";
import { cn } from "@/lib/utils";
import type { BoardQuestion } from "@/lib/board/query";
import type { PaperViewItem } from "@/lib/questionPapers/listing";
import BoardQuestionItem from "@/app/board/BoardQuestionItem";
import { useBoardReveal } from "@/app/board/useBoardReveal";
import PaperDownload from "@/app/mock/_components/PaperDownload";

export type PaperSet = {
  slug: string;
  setNumber: number | null;
  paperCode: string | null;
  title: string;
  sections: { key: string; title: string; note: string }[];
  /** Null when a question has gone since the paper was built. */
  items: PaperViewItem[] | null;
};

export default function PaperReader({
  sets,
  examName,
  examSlug,
  supabaseUrl,
}: {
  sets: PaperSet[];
  /** The DB exams.name, for the free-answer meter. */
  examName: string;
  /** The exam's URL slug ("cbse-12"): a download names its paper by it. */
  examSlug: string;
  supabaseUrl: string;
}) {
  const [active, setActive] = useState(0);
  const byId = useMemo(() => {
    const m = new Map<string, BoardQuestion>();
    for (const s of sets) for (const it of s.items ?? []) m.set(it.question.id, it.question);
    return m;
  }, [sets]);
  const { revealed, blocked, picks, lock, toggleOne, pickOne } = useBoardReveal(
    examName,
    sets[0]?.title ?? "Past paper",
    byId
  );

  return (
    <div className="space-y-6">
      {sets.length > 1 && (
        <div role="tablist" aria-label="Sets of this paper" className="flex flex-wrap gap-2">
          {sets.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              role="tab"
              id={`tab-${s.slug}`}
              aria-selected={active === i}
              aria-controls={`set-${s.slug}`}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                active === i
                  ? "border-brand bg-brand text-white"
                  : "bg-card text-foreground hover:border-brand-accent/60 hover:bg-accent"
              )}
            >
              Set {s.setNumber ?? i + 1}
              {s.paperCode && <span className="ml-1.5 font-normal opacity-80">{s.paperCode}</span>}
            </button>
          ))}
        </div>
      )}

      {sets.map((s, i) => (
        <div
          key={s.slug}
          id={`set-${s.slug}`}
          role={sets.length > 1 ? "tabpanel" : undefined}
          aria-labelledby={sets.length > 1 ? `tab-${s.slug}` : undefined}
          hidden={active !== i}
        >
          {s.items === null ? (
            <p className="rounded-lg border border-dashed bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
              This set is not available right now. Please try another set.
            </p>
          ) : (
            // One registry per set: classroom projection walks one paper, not into the next.
            <PresentRegistry>
              <div className="mb-6">
                <PaperDownload slug={s.slug} paperTitle={s.title} boardPaper={{ exam: examSlug }} />
              </div>
              <PaperSections
                set={s}
                items={s.items}
                supabaseUrl={supabaseUrl}
                revealed={revealed}
                blocked={blocked}
                lock={lock}
                picks={picks}
                onToggleReveal={toggleOne}
                onPick={pickOne}
              />
            </PresentRegistry>
          )}
        </div>
      ))}
    </div>
  );
}

function PaperSections({
  set,
  items,
  supabaseUrl,
  revealed,
  blocked,
  lock,
  picks,
  onToggleReveal,
  onPick,
}: {
  set: PaperSet;
  items: PaperViewItem[];
  supabaseUrl: string;
  revealed: Set<string>;
  blocked: Set<string>;
  lock: ReturnType<typeof useBoardReveal>["lock"];
  picks: Map<string, string>;
  onToggleReveal: (id: string) => void;
  onPick: (id: string, label: string) => void;
}) {
  const noteOf = new Map(set.sections.map((sec) => [sec.key, sec]));
  const sectionKeys = [...new Set(items.map((it) => it.section))];

  return (
    <div className="space-y-8">
      {sectionKeys.map((key) => {
        const sec = noteOf.get(key);
        const mine = items.filter((it) => it.section === key);
        return (
          <section key={key} aria-labelledby={`${set.slug}-sec-${key}`} className="space-y-3">
            <div className="border-b-2 border-brand-accent/30 pb-1.5">
              <h2 id={`${set.slug}-sec-${key}`} className="text-lg font-semibold tracking-tight text-foreground">
                {sec?.title ?? `Section ${key}`}
              </h2>
              {sec?.note && <p className="text-xs text-muted-foreground">{sec.note}</p>}
            </div>
            <ol className="space-y-3">
              {mine.map((it, idx) => {
                const prev = mine[idx - 1];
                // A passage (case study, or shared directions) prints once, above
                // the first question that carries it.
                const showContext = !!it.question.context && it.question.context !== prev?.question.context;
                const q = it.question;
                return (
                  <li key={it.position}>
                    {it.isAlternative && (
                      <p className="my-2 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        OR
                      </p>
                    )}
                    {showContext && (
                      <div className="mb-2 rounded-md border-l-2 border-brand-accent/40 bg-muted/30 px-3 py-2 font-serif text-sm text-muted-foreground">
                        <BlockText text={q.context as string} />
                      </div>
                    )}
                    <BoardQuestionItem
                      q={q}
                      supabaseUrl={supabaseUrl}
                      present={fromBoardQuestion(q, { chapter: set.title, sectionLabel: sec?.title ?? null })}
                      order={it.position}
                      revealed={revealed.has(q.id)}
                      blocked={blocked.has(q.id)}
                      lockedLink={lock.isLocked(q.id) ? lock.link : null}
                      onToggleReveal={() => onToggleReveal(q.id)}
                      pick={picks.get(q.id) ?? null}
                      onPick={(label) => onPick(q.id, label)}
                      marks={it.marks}
                    />
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
