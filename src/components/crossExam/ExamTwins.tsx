"use client";

/**
 * "Asked in NDA" (exam twins, migration 0220): the line under a board question
 * and the chapter's count, on /board and homework pages.
 *
 * The page loads the links on the server (it is cached for a day) and puts them
 * in ExamTwinsProvider once; ExamTwinLine reads them by question id wherever a
 * card is drawn, so the reader's panels need not pass them down. The student's
 * own exam (the qb_exam cookie) is read after mount, because a cached page is
 * one copy for everyone: the first paint names exams in the default order.
 *
 * The panel shows the past question and its options, never the answer: that
 * stays behind the practice link, where the free daily answer limit applies.
 */
import { createContext, useContext, useId, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Target } from "lucide-react";
import BlockText from "@/components/math/BlockText";
import KatexRenderer from "@/components/math/KatexRenderer";
import { ZoomableImage } from "@/app/board/BoardQuestionItem";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { cn } from "@/lib/utils";
import { getExamBySlug } from "@/lib/exam/examContext";
import { readExamSlugFromCookieString } from "@/lib/exam/examNav";
import { summariseTwins, tallyChapterTwins, type TwinKind, type TwinLink } from "@/lib/crossExam/summary";
import type { QuestionTwins } from "@/lib/crossExam/query";
import { reportTwinOpened } from "./twinBeacon";

type Ctx = { twins: QuestionTwins; supabaseUrl: string; preferred: string | null };

const ExamTwinsContext = createContext<Ctx | null>(null);

/** The cookie changes only on /welcome and /account, which navigate away: nothing to listen to. */
const noSubscribe = () => () => {};

export function ExamTwinsProvider({
  twins,
  supabaseUrl,
  children,
}: {
  twins: QuestionTwins;
  supabaseUrl: string;
  children: ReactNode;
}) {
  // The server render (and the cached page) has no cookie: null there, the
  // student's exam once in the browser.
  const preferred = useSyncExternalStore(
    noSubscribe,
    () => getExamBySlug(readExamSlugFromCookieString(document.cookie))?.examName ?? null,
    () => null
  );
  const value = useMemo(() => ({ twins, supabaseUrl, preferred }), [twins, supabaseUrl, preferred]);
  return <ExamTwinsContext.Provider value={value}>{children}</ExamTwinsContext.Provider>;
}

const KIND_WORD: Record<TwinKind, string> = {
  exact: "same question",
  numbers: "new numbers",
  similar: "similar question",
};

/** The one line under a board question, and the panel "See it" opens. Nothing when it has no twin. */
export function ExamTwinLine({ questionId }: { questionId: string }) {
  const ctx = useContext(ExamTwinsContext);
  const links = ctx?.twins.links[questionId];
  const summary = useMemo(() => (links ? summariseTwins(links, ctx?.preferred) : null), [links, ctx?.preferred]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const panelId = useId();
  if (!ctx || !summary) return null;

  const shown: TwinLink = summary.links[Math.min(selected, summary.links.length - 1)];
  const target = ctx.twins.targets[shown.targetId];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        {summary.tone === "asked" ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 font-semibold text-brand-accent">
            <Target className="h-3.5 w-3.5" aria-hidden />
            {summary.label}
          </span>
        ) : (
          <span className="text-muted-foreground">{summary.label}</span>
        )}
        {summary.detail && <span className="text-muted-foreground">{summary.detail}</span>}
        <button
          type="button"
          onClick={() => {
            if (!open) reportTwinOpened();
            setOpen(!open);
          }}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex items-center gap-0.5 rounded font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {open ? "Hide" : "See it"}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform motion-reduce:transition-none", open && "rotate-180")} aria-hidden />
        </button>
      </div>

      {open && target && (
        <div id={panelId} className="space-y-2.5 rounded-md border border-dashed bg-background p-3">
          <p className="text-xs font-semibold text-muted-foreground">
            {shown.paper} · {KIND_WORD[shown.kind]}
          </p>
          {target.context && (
            <div className="font-serif text-sm text-muted-foreground [&_.katex]:max-w-full">
              <BlockText text={target.context} />
            </div>
          )}
          <div className="font-serif text-[15px] leading-relaxed [&_.katex]:max-w-full">
            <BlockText text={target.text} />
          </div>
          {target.imageUrl && <ZoomableImage src={publicImageUrl(ctx.supabaseUrl, target.imageUrl)} alt={`${shown.paper} figure`} />}
          {target.options.length > 0 && (
            <ol className="grid gap-1.5 sm:grid-cols-2">
              {target.options.map((o) => (
                <li key={o.label} className="flex items-start gap-2 rounded-md border bg-card px-2.5 py-1.5">
                  <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-muted-foreground">{o.label}.</span>
                  <div className="min-w-0 flex-1 font-serif [&_.katex]:max-w-full">
                    <KatexRenderer text={o.text} />
                  </div>
                </li>
              ))}
            </ol>
          )}
          {summary.links.length > 1 && (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Papers that asked this">
              {summary.links.map((l, i) => (
                <button
                  key={l.targetId}
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-pressed={l === shown}
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    l === shown ? "border-brand bg-brand/10 text-brand-accent" : "bg-card text-foreground hover:bg-accent"
                  )}
                >
                  {l.paper}
                  {l.kind === "similar" && <span className="text-muted-foreground"> · similar</span>}
                </button>
              ))}
            </div>
          )}
          <Link
            href={target.practiseHref}
            prefetch={false}
            className="inline-flex items-center gap-1 rounded text-xs font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Practise {shown.examLabel} {target.chapterName} questions
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}

/**
 * The chapter's count. One exam: "52 of the 142 questions here were asked in
 * NDA, the same or with new numbers. 20 more are similar to NDA questions."
 * Several: one number per exam. "Similar" never counts as asked.
 */
export function ExamTwinChapterLine({
  questionIds,
  noun = "questions",
}: {
  questionIds: string[];
  /** What the count is out of, so it cannot be read against a different total
   *  on the page (the /board header counts the textbook alone). */
  noun?: string;
}) {
  const ctx = useContext(ExamTwinsContext);
  const tally = useMemo(
    () => (ctx ? tallyChapterTwins(questionIds.map((id) => ctx.twins.links[id] ?? []), ctx.preferred) : []),
    [ctx, questionIds]
  );
  if (tally.length === 0) return null;
  const total = questionIds.length;

  return (
    <div className="mb-6 rounded-lg border bg-brand/5 px-4 py-3 text-sm">
      <p className="flex items-center gap-1.5 font-semibold text-brand-accent">
        <Target className="h-4 w-4" aria-hidden />
        {tally.length === 1 ? `This chapter in ${tally[0].examLabel}` : "This chapter in other exams"}
      </p>
      {tally.length === 1 ? (
        <p className="mt-1 text-foreground">
          {tally[0].asked > 0 && (
            <>
              <b>{tally[0].asked}</b> of the {total} {noun} here were asked in {tally[0].examLabel}, the same or with new
              numbers.{" "}
            </>
          )}
          {tally[0].similar > 0 && (
            <>
              <b>{tally[0].similar}</b> {tally[0].asked > 0 ? "more are" : `of the ${total} ${noun} here are`} similar to{" "}
              {tally[0].examLabel} questions.
            </>
          )}
        </p>
      ) : (
        <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-foreground">
          {tally.map((t) => (
            <span key={t.examName}>
              {t.examLabel} <b>{t.asked}</b>
            </span>
          ))}
          <span className="text-muted-foreground">asked, of {total} {noun}</span>
        </p>
      )}
    </div>
  );
}
