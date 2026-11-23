"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { FigureFrame } from "@/components/learn/FigureFrame";
import { FigureView } from "@/components/learn/FigureView";
import { RenderedInlineNodes, RenderedRichText } from "@/components/learn/RenderedRichText";
import { SolutionPanel } from "@/components/learn/SolutionReveal";
import SignInLink from "@/components/reveal/SignInLink";
import { sendActivity } from "@/lib/activity/clientBeacon";
import type { AnswerResult } from "@/lib/learn/answer";
import { displayOrder } from "@/lib/learn/engine/optionOrder";
import type { LessonItem } from "@/lib/learn/query";

type Loaded = { item: LessonItem; title: string; seed: string; needed: number; signedIn: boolean };

const ACTION =
  "inline-flex items-center rounded-lg border bg-card px-3 py-1.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const ok = "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40";
const bad = "border-red-600 bg-red-50 dark:bg-red-950/40";

/**
 * "Your turn" on a Learn lesson in V (2026-11-22, owner: "use Learn questions for
 * your turn: they are conceptual and relatively easy; Learn was designed for this").
 * One check question from the lesson V just taught, from GET /api/learn/item, answered
 * through POST /api/learn/answer: a signed-in student's answer counts towards the
 * lesson's mastery, a guest's is checked and not kept. No daily limit applies.
 *
 * Every case ends somewhere useful (the mockup's table): right shows one line of why
 * and the lesson's progress with "One more"; wrong shows the right option, Learn's
 * explanation of the slip and "Try another"; the worked solution is a tap away;
 * "Skip" closes it unanswered; a lesson with no questions, or a failed read, shows
 * nothing, and V's text never points at the card, so nothing is left dangling.
 */
/** The lesson's next check question; null when it has none or the read failed. */
async function fetchLearnItem(chapter: string, concept: string, answered: string[]): Promise<Loaded | null> {
  const params = new URLSearchParams({ chapter, concept });
  if (answered.length) params.set("session", answered.join(","));
  try {
    const res = await fetch(`/api/learn/item?${params}`);
    const j = (await res.json().catch(() => ({}))) as { ok?: boolean; data?: Loaded };
    return res.ok && j.ok && j.data ? j.data : null;
  } catch {
    return null;
  }
}

export default function VLearnQuestionCard({ chapter, concept, lessonN }: { chapter: string; concept: string; lessonN: number }) {
  const [q, setQ] = useState<Loaded | null>(null);
  const [gone, setGone] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [checking, setChecking] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  // A guest's answers live only here; the route picks the next question from them (lib/learn/vItem).
  const [session, setSession] = useState<string[]>([]);
  const solutionId = useId();

  // The effect only fetches; state is set in the promise's callback (the VQuestionCard pattern).
  useEffect(() => {
    let live = true;
    void fetchLearnItem(chapter, concept, []).then((d) => {
      if (live) (d ? setQ(d) : setGone(true));
    });
    return () => {
      live = false;
    };
  }, [chapter, concept]);

  async function another() {
    const d = await fetchLearnItem(chapter, concept, session);
    if (!d) {
      setGone(true);
      return;
    }
    setQ(d);
    setPicked(null);
    setResult(null);
    setSolutionOpen(false);
  }

  const options = useMemo(() => (q ? displayOrder(q.item.options, q.seed) : []), [q]);

  async function answer(key: string) {
    if (!q || picked || checking) return;
    setPicked(key);
    setChecking(true);
    try {
      const res = await fetch("/api/learn/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: q.item.id, key }),
      });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; data?: AnswerResult; error?: string };
      if (!res.ok || !j.ok || !j.data) throw new Error(j.error ?? "not checked");
      setResult(j.data);
      setSession((s) => [...s, `${q.item.id}:${j.data!.correct ? 1 : 0}`]);
      sendActivity({ kind: "surface_viewed", surface: "teach_chapter", action: "tap", from: "learn_try_answer" });
    } catch {
      setPicked(null);
      toast.error("Could not check that answer. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  if (gone) return null;
  if (!q) return <div className="ml-9 mt-2 h-24 animate-pulse rounded-xl border bg-muted/40" aria-hidden />;

  const right = result?.correct === true;
  const progress = result?.progress;
  const labelOf = (key: string) => options.find((o) => o.key === key)?.label ?? key;

  return (
    <div className="ml-9 mt-2 space-y-2 rounded-xl border bg-card p-3 text-sm shadow-sm" aria-label={`Your turn: a question from lesson ${lessonN}`}>
      <p className="text-xs text-muted-foreground">
        <span className="font-bold uppercase tracking-wide text-brand-accent">Your turn</span> · Lesson {lessonN}, {q.title}
      </p>
      <div className="font-serif">
        <RenderedRichText blocks={q.item.stem} />
      </div>
      {q.item.figure && (
        <FigureFrame>
          <FigureView figure={q.item.figure} className="h-auto w-full" />
        </FigureFrame>
      )}
      <div className="space-y-1.5" role="group" aria-label="Options">
        {options.map((o) => {
          const isKey = result?.correctKey === o.key;
          const isWrongPick = result && picked === o.key && !result.correct;
          return (
            <button
              key={o.key}
              type="button"
              disabled={picked !== null}
              onClick={() => void answer(o.key)}
              aria-label={`Option ${o.label}`}
              className={`flex w-full items-start gap-2 rounded-lg border bg-background px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default disabled:hover:bg-background ${isKey ? ok : ""} ${isWrongPick ? bad : ""}`}
            >
              <span className="font-semibold">({o.label})</span>
              <span className="min-w-0 flex-1 font-serif">
                <RenderedInlineNodes nodes={o.text} />
              </span>
              {isKey && <Check className="ml-auto h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" aria-label="Correct answer" />}
              {isWrongPick && <X className="ml-auto h-4 w-4 shrink-0 text-red-700 dark:text-red-400" aria-label="Your answer" />}
            </button>
          );
        })}
      </div>

      {!result && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">Free: it does not use today&apos;s answers.</p>
          <button
            type="button"
            disabled={checking}
            onClick={() => {
              sendActivity({ kind: "surface_viewed", surface: "teach_chapter", action: "tap", from: "learn_try_skip" });
              setGone(true);
            }}
            className="rounded px-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Skip
          </button>
        </div>
      )}

      {result && (
        <div className="space-y-2" role="status">
          <p className={right ? "font-semibold text-emerald-700 dark:text-emerald-400" : "font-semibold text-red-700 dark:text-red-400"}>
            {right ? "Right." : `Not this time. The answer is (${labelOf(result.correctKey)}).`}
            {/* Progress after a right answer only (2026-11-22 capture): "0 of 3 right" straight after a miss discourages. */}
            {progress && right && (
              <span className="font-normal text-foreground">
                {" "}
                {progress.masteredNow ? `Lesson ${lessonN} done.` : `Lesson ${lessonN}: ${Math.min(progress.streak, progress.needed)} of ${progress.needed} right.`}
              </span>
            )}
          </p>
          {!right && result.remediation && <RenderedRichText blocks={result.remediation} className="text-sm" />}
          {!result.saved && (
            <p className="text-xs text-muted-foreground">
              <SignInLink className="font-semibold text-brand-accent underline underline-offset-2">Sign in</SignInLink> to save your progress.
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <button type="button" className={ACTION} onClick={() => void another()}>
              {right ? "One more" : "Try another"}
            </button>
            <button type="button" className={ACTION} aria-expanded={solutionOpen} aria-controls={solutionId} onClick={() => setSolutionOpen((o) => !o)}>
              {solutionOpen ? "Hide the working" : "See the working"}
            </button>
          </div>
          {solutionOpen && <SolutionPanel solution={result.solution} panelId={solutionId} />}
        </div>
      )}
    </div>
  );
}
