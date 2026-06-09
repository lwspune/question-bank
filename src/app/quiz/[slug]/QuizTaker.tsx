"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Check, X, Minus, BookOpen, Share2, Sparkles, Loader2 } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import { isValidIndianMobile } from "@/lib/quiz/leads";
import type { PublicQuiz } from "@/lib/quiz/publicQuiz";
import type { SubmitResult } from "@/lib/quiz/submit";

const LETTERS = ["A", "B", "C", "D"] as const;
type Letter = (typeof LETTERS)[number];
const STORE_KEY = "qb:lead:v1";

type StoredIdentity = { name: string; mobile: string };

export default function QuizTaker({ slug, quiz }: { slug: string; quiz: PublicQuiz }) {
  const [answers, setAnswers] = useState<Record<string, Letter>>({});
  const [phase, setPhase] = useState<"taking" | "gating" | "results">("taking");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [stored, setStored] = useState<StoredIdentity | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setStored(JSON.parse(raw) as StoredIdentity);
    } catch {
      /* ignore */
    }
  }, []);

  const answeredCount = Object.keys(answers).length;

  if (phase === "results" && result) {
    return <Results slug={slug} quiz={quiz} answers={answers} result={result} />;
  }

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-accent">
          {[quiz.exam, quiz.subject, quiz.chapter].filter(Boolean).join(" · ")}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">{quiz.title}</h1>
        <p className="text-sm text-muted-foreground">
          {quiz.questions.length} questions · pick your answers, then see your score instantly.
        </p>
      </header>

      <ol className="space-y-5">
        {quiz.questions.map((q) => (
          <li key={q.q} className="rounded-lg border bg-card p-4">
            <div className="flex gap-2 font-serif">
              <span className="shrink-0 font-mono text-xs text-muted-foreground">{q.q}.</span>
              <KatexRenderer text={q.stem} />
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {LETTERS.map((L) => {
                const picked = answers[String(q.q)] === L;
                return (
                  <button
                    key={L}
                    type="button"
                    onClick={() => setAnswers((s) => ({ ...s, [String(q.q)]: L }))}
                    aria-pressed={picked}
                    className={`flex items-start gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      picked ? "border-brand bg-brand/10" : "hover:bg-muted"
                    }`}
                  >
                    <span className="font-mono text-xs text-muted-foreground">({L.toLowerCase()})</span>
                    <KatexRenderer text={q.options[L]} />
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      {phase === "taking" ? (
        <div className="sticky bottom-4 flex items-center justify-between gap-3 rounded-lg border bg-card/95 p-3 shadow-sm backdrop-blur">
          <span className="text-sm text-muted-foreground">
            {answeredCount} of {quiz.questions.length} answered
          </span>
          <button
            type="button"
            onClick={() => setPhase("gating")}
            disabled={answeredCount === 0}
            className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground disabled:opacity-50"
          >
            See my score →
          </button>
        </div>
      ) : (
        <Gate
          slug={slug}
          answers={answers}
          stored={stored}
          onCancel={() => setPhase("taking")}
          onDone={(r, identity) => {
            try {
              localStorage.setItem(STORE_KEY, JSON.stringify(identity));
            } catch {
              /* ignore */
            }
            setResult(r);
            setPhase("results");
          }}
        />
      )}
    </div>
  );
}

function Gate({
  slug,
  answers,
  stored,
  onDone,
  onCancel,
}: {
  slug: string;
  answers: Record<string, string>;
  stored: StoredIdentity | null;
  onDone: (r: SubmitResult, identity: StoredIdentity) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(stored?.name ?? "");
  const [mobile, setMobile] = useState(stored?.mobile ?? "");
  const [consent, setConsent] = useState(false);
  const [editing, setEditing] = useState(!stored);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!name.trim()) return toast.error("Please enter your name.");
    if (!isValidIndianMobile(mobile)) return toast.error("Enter a valid 10-digit mobile number.");
    if (!consent) return toast.error("Please accept the consent to see your score.");
    setBusy(true);
    try {
      const utm = new URLSearchParams(window.location.search).get("utm_source") ?? undefined;
      const res = await fetch("/api/public-quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name: name.trim(), mobile, consent: true, answers, utmSource: utm }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      onDone(json as SubmitResult, { name: name.trim(), mobile });
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  // Returning visitor: one-tap with the stored number (consent still required, visible).
  if (stored && !editing) {
    return (
      <div className="space-y-3 rounded-lg border bg-card p-4">
        <p className="text-sm">
          Continue as <span className="font-medium">{stored.name}</span> · {stored.mobile}
        </p>
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
          <span>
            I agree to be contacted about NDA prep and accept the{" "}
            <Link href="/privacy" className="underline" target="_blank">privacy policy</Link>.
          </span>
        </label>
        <div className="flex items-center gap-3">
          <button onClick={submit} disabled={busy} className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground disabled:opacity-50">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue →"}
          </button>
          <button onClick={() => setEditing(true)} className="text-sm text-muted-foreground underline">
            Use a different number
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border bg-card p-4">
      <p className="text-sm font-medium">Where should we send your result?</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="h-10 w-full rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Your name"
      />
      <input
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        inputMode="numeric"
        placeholder="Mobile number"
        className="h-10 w-full rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Mobile number"
      />
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
        <span>
          I agree to be contacted about NDA prep and accept the{" "}
          <Link href="/privacy" className="underline" target="_blank">privacy policy</Link>.
        </span>
      </label>
      <div className="flex items-center gap-3">
        <button onClick={submit} disabled={busy} className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground disabled:opacity-50">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} See my score →
        </button>
        <button onClick={onCancel} className="text-sm text-muted-foreground underline">
          Back
        </button>
      </div>
    </div>
  );
}

function Results({
  slug,
  quiz,
  answers,
  result,
}: {
  slug: string;
  quiz: PublicQuiz;
  answers: Record<string, string>;
  result: SubmitResult;
}) {
  const url = useMemo(
    () => (typeof window !== "undefined" ? `${window.location.origin}/quiz/${slug}` : `/quiz/${slug}`),
    [slug]
  );

  async function share() {
    const text = `I scored ${result.score}/${result.total} on this ${[quiz.exam, quiz.subject].filter(Boolean).join(" ")} quiz — try it:`;
    try {
      if (navigator.share) {
        await navigator.share({ title: quiz.title, text, url });
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        toast.success("Link copied — share it!");
      }
    } catch {
      /* user cancelled share — ignore */
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">You scored</p>
        <p className="my-1 text-4xl font-bold text-brand-accent">
          {result.score}
          <span className="text-2xl text-muted-foreground">/{result.total}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          {result.correct} correct · {result.incorrect} wrong · {result.notAttempted} skipped
        </p>
        <button
          onClick={share}
          className="mt-4 inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          <Share2 className="h-4 w-4" /> Share — &ldquo;I scored {result.score}/{result.total}&rdquo;
        </button>
      </div>

      <ol className="space-y-4">
        {quiz.questions.map((q) => {
          const k = String(q.q);
          const verdict = result.responses[k];
          const correct = result.key[k] as Letter;
          const mine = answers[k] as Letter | undefined;
          const notes = result.notesLinks[k];
          return (
            <li key={q.q} className="rounded-lg border bg-card p-4">
              <div className="flex items-start gap-2">
                <VerdictIcon verdict={verdict} />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex gap-2 font-serif text-sm">
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">{q.q}.</span>
                    <KatexRenderer text={q.stem} />
                  </div>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {LETTERS.map((L) => {
                      const isCorrect = correct === L;
                      const isMine = mine === L;
                      return (
                        <div
                          key={L}
                          className={`flex items-start gap-1.5 rounded px-2 py-1 text-sm ${
                            isCorrect
                              ? "bg-emerald-500/10 font-medium"
                              : isMine
                                ? "bg-red-500/10"
                                : ""
                          }`}
                        >
                          <span className="font-mono text-xs text-muted-foreground">({L.toLowerCase()})</span>
                          <KatexRenderer text={q.options[L]} />
                        </div>
                      );
                    })}
                  </div>
                  {verdict !== 1 && notes && (
                    <Link
                      href={notes}
                      className="inline-flex items-center gap-1 text-xs font-medium text-brand-accent hover:underline"
                    >
                      <BookOpen className="h-3.5 w-3.5" /> Master this — read the notes
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <ConversionCta billingLive={result.billingLive} />
    </div>
  );
}

function VerdictIcon({ verdict }: { verdict: number }) {
  if (verdict === 1) return <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-label="correct" />;
  if (verdict === -1) return <X className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-label="wrong" />;
  return <Minus className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-label="skipped" />;
}

function ConversionCta({ billingLive }: { billingLive: boolean }) {
  return (
    <div className="rounded-lg border bg-brand/5 p-5 text-center">
      <Sparkles className="mx-auto h-5 w-5 text-brand-accent" aria-hidden />
      {billingLive ? (
        <>
          <p className="mt-2 font-medium">Want the full NDA prep?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Notes, PYQ banks and daily quizzes for every chapter.
          </p>
          <Link
            href="/signup?next=/pricing&utm_source=quiz"
            className="mt-3 inline-block rounded-md bg-brand px-5 py-2 text-sm font-medium text-brand-foreground"
          >
            Go premium →
          </Link>
        </>
      ) : (
        <>
          <p className="mt-2 font-medium">Keep going — it&rsquo;s free</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse the PYQ bank and self-study notes for every NDA chapter.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Link href="/browse" className="rounded-md bg-brand px-5 py-2 text-sm font-medium text-brand-foreground">
              Explore the question bank →
            </Link>
            <Link href="/signup?next=/browse&utm_source=quiz" className="rounded-md border px-5 py-2 text-sm font-medium hover:bg-muted">
              Create a free account
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
