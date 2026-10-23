"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import MathText from "./MathText";
import { cardQuery, type AskedCard } from "@/lib/chat/askVEvent";
import type { CardQuestion } from "@/lib/chat/questionCard";

/** Past this much text the question starts folded to a few lines (a phone screen is short). */
const FOLD_CHARS = 220;

/**
 * The question above an Ask V message (owner, 2026-10-23: "there should be
 * the question card above 'Explain this question'"), so the explanation under
 * it has its question in sight. Read-only: the question, its figure and
 * options, the student's pick marked. Never the answer: /api/chat/question
 * does not send one.
 */
export default function VAskedCard({ asked }: { asked: AskedCard }) {
  const [q, setQ] = useState<CardQuestion | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const query = cardQuery(asked);

  useEffect(() => {
    let live = true;
    fetch(`/api/chat/question?${query}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: { question: CardQuestion }) => live && setQ(j.question))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [query]);

  if (failed) return null;
  if (!q) return <div className="mb-1.5 ml-auto h-16 w-full max-w-[85%] animate-pulse rounded-xl border bg-muted/40" aria-hidden />;

  const chose = "questionId" in asked ? asked.chose : null;
  const long = (q.context?.length ?? 0) + q.text.length > FOLD_CHARS || !!q.imageUrl;
  const folded = long && !open;

  return (
    <div className="mb-1.5 ml-auto w-full max-w-[85%] space-y-2 rounded-xl border bg-card p-3 text-sm shadow-sm" aria-label="The question you asked about">
      <p className="text-xs font-medium text-muted-foreground">Your question · {q.where}</p>
      <div className={folded ? "line-clamp-4" : "space-y-2"}>
        {q.context && (
          <p className="whitespace-pre-wrap font-serif text-muted-foreground">
            <MathText text={q.context} />
          </p>
        )}
        <p className="whitespace-pre-wrap font-serif">
          <MathText text={q.text} />
        </p>
      </div>
      {q.imageUrl && !folded && (
        // A question figure from our own storage, the same file the card on the site shows.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={q.imageUrl} alt="Figure for this question" className="max-h-48 rounded border bg-white object-contain" />
      )}
      {long && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-1 rounded text-xs font-semibold text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {open ? <ChevronUp className="h-3.5 w-3.5" aria-hidden /> : <ChevronDown className="h-3.5 w-3.5" aria-hidden />}
          {open ? "Show less" : q.imageUrl ? "Show full question and figure" : "Show full question"}
        </button>
      )}
      {q.options.length > 0 && (
        <ul className="space-y-1" aria-label="Options">
          {q.options.map((o) => {
            const mine = o.label === chose;
            return (
              <li key={o.label} className={`flex items-start gap-2 rounded-lg border px-2.5 py-1.5 ${mine ? "border-brand/60 bg-accent" : "bg-background"}`}>
                <span className="font-semibold">({o.label})</span>
                <span className="font-serif">
                  <MathText text={o.text} />
                </span>
                {mine && <span className="ml-auto shrink-0 text-xs font-semibold text-brand-accent">Your pick</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
