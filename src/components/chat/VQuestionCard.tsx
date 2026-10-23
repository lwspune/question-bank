"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import MathText from "./MathText";
import MathBlockText from "./MathBlockText";
import SignInLink from "@/components/reveal/SignInLink";
import { askVAbout } from "@/lib/chat/askVEvent";
import type { CardQuestion } from "@/lib/chat/questionCard";

type Result = { correct: boolean; answer: string } | { limit: number } | null;

const OPTION =
  "flex w-full items-start gap-2 rounded-lg border bg-background px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default disabled:hover:bg-background";
const ACTION =
  "inline-flex items-center rounded-lg border bg-card px-3 py-1.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * A bank question inside V (2026-10-19, study-partner Phase 1).
 * - "try": a similar question to answer here. The pick is checked on the
 *   server (POST /api/chat/question), where it is one of the day's free
 *   answers; then "Ask V why" explains it.
 * - "confirm": the closest match to a pasted question. The student says
 *   whether it is theirs, so V never explains the wrong one.
 */
export default function VQuestionCard({ id, kind }: { id: string; kind: "try" | "confirm" }) {
  const [q, setQ] = useState<CardQuestion | null>(null);
  const [failed, setFailed] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [dismissed, setDismissed] = useState(false);
  const [signIn, setSignIn] = useState(false);

  useEffect(() => {
    let live = true;
    fetch(`/api/chat/question?id=${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: { question: CardQuestion }) => live && setQ(j.question))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [id]);

  async function answer(label: string) {
    if (picked) return;
    setPicked(label);
    try {
      const res = await fetch("/api/chat/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, chose: label }),
      });
      if (res.status === 401) {
        setSignIn(true);
        setPicked(null);
        return;
      }
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; correct?: boolean; answer?: string; limit?: number; error?: string };
      if (typeof j.limit === "number") setResult({ limit: j.limit });
      else if (j.ok && typeof j.correct === "boolean" && j.answer) setResult({ correct: j.correct, answer: j.answer });
      else throw new Error(j.error ?? "not checked");
    } catch {
      setPicked(null);
      toast.error("Could not check that answer. Please try again.");
    }
  }

  if (failed || dismissed) return null;
  if (!q) return <div className="ml-9 mt-2 h-24 animate-pulse rounded-xl border bg-muted/40" aria-hidden />;

  return (
    <div className="ml-9 mt-2 space-y-2 rounded-xl border bg-card p-3 text-sm shadow-sm" aria-label={kind === "try" ? "A question to try" : "Is this your question?"}>
      <p className="text-xs font-medium text-muted-foreground">{kind === "try" ? `Try this one · ${q.where}` : `Is this your question? · ${q.where}`}</p>
      {q.context && (
        <div className="whitespace-pre-wrap font-serif text-muted-foreground">
          <MathBlockText text={q.context} />
        </div>
      )}
      <div className="whitespace-pre-wrap font-serif">
        <MathBlockText text={q.text} />
      </div>
      {q.imageUrl && (
        // A question figure from our own storage, the same file the card on the site shows.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={q.imageUrl} alt="Figure for this question" className="max-h-48 rounded border bg-white object-contain" />
      )}

      {kind === "try" && (
        <div className="space-y-1.5" role="group" aria-label="Options">
          {q.options.map((o) => {
            const graded = result && "correct" in result;
            const isKey = graded && o.label === result.answer;
            const isWrongPick = graded && o.label === picked && !result.correct;
            return (
              <button
                key={o.label}
                type="button"
                disabled={picked !== null}
                onClick={() => void answer(o.label)}
                aria-label={`Option ${o.label}`}
                className={`${OPTION} ${isKey ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" : ""} ${isWrongPick ? "border-red-600 bg-red-50 dark:bg-red-950/40" : ""}`}
              >
                <span className="font-semibold">({o.label})</span>
                <span className="font-serif">
                  <MathText text={o.text} />
                </span>
                {isKey && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" aria-label="Correct answer" />}
                {isWrongPick && <XCircle className="ml-auto h-4 w-4 shrink-0 text-red-700 dark:text-red-400" aria-label="Your pick" />}
              </button>
            );
          })}
        </div>
      )}

      {signIn && (
        <p>
          <SignInLink className="font-semibold text-brand-accent underline underline-offset-2">Sign in</SignInLink>{" "}
          to answer and get explanations.
        </p>
      )}
      {result && "limit" in result && (
        <p>
          You have used today&apos;s {result.limit} free answers.{" "}
          <Link href="/pricing" className="font-semibold text-brand-accent underline underline-offset-2">
            See the Premium Pass
          </Link>{" "}
          for unlimited answers.
        </p>
      )}
      {result && "correct" in result && (
        <div className="flex flex-wrap items-center gap-2" role="status">
          <span className="font-semibold">{result.correct ? "Right, well done." : `Not quite: the answer is (${result.answer}).`}</span>
          <button type="button" className={ACTION} onClick={() => askVAbout({ questionId: id, chose: picked })}>
            Ask V why
          </button>
        </div>
      )}

      {kind === "confirm" && (
        <div className="flex flex-wrap gap-2">
          <button type="button" className={ACTION} onClick={() => askVAbout({ questionId: id, chose: null })}>
            Yes, explain this one
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setDismissed(true)}
          >
            No, it is another one
          </button>
        </div>
      )}
    </div>
  );
}
