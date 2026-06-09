"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Check, X, Minus, BookOpen, Share2, Sparkles, Loader2, ChevronLeft, ArrowRight } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import { isValidIndianMobile } from "@/lib/quiz/leads";
import { scoreVerdict, type VerdictTone } from "@/lib/quiz/verdict";
import type { PublicQuiz } from "@/lib/quiz/publicQuiz";
import type { SubmitResult } from "@/lib/quiz/submit";

const LETTERS = ["A", "B", "C", "D"] as const;
type Letter = (typeof LETTERS)[number];
const STORE_KEY = "qb:lead:v1";
type StoredIdentity = { name: string; mobile: string };
type Phase = "taking" | "review" | "gating" | "results";

const TONE: Record<VerdictTone, { stroke: string; text: string; soft: string }> = {
  gold: { stroke: "stroke-amber-400", text: "text-amber-500", soft: "bg-amber-400/10" },
  emerald: { stroke: "stroke-emerald-500", text: "text-emerald-600", soft: "bg-emerald-500/10" },
  brand: { stroke: "stroke-indigo-500", text: "text-brand-accent", soft: "bg-brand/10" },
  amber: { stroke: "stroke-orange-500", text: "text-orange-600", soft: "bg-orange-500/10" },
  slate: { stroke: "stroke-slate-400", text: "text-slate-500", soft: "bg-slate-400/10" },
};

export default function QuizTaker({ slug, quiz }: { slug: string; quiz: PublicQuiz }) {
  const [answers, setAnswers] = useState<Record<string, Letter>>({});
  const [phase, setPhase] = useState<Phase>("taking");
  const [index, setIndex] = useState(0);
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

  const total = quiz.questions.length;
  const answeredCount = Object.keys(answers).length;

  if (phase === "results" && result) {
    return <Results slug={slug} quiz={quiz} answers={answers} result={result} />;
  }

  return (
    <div className="space-y-5">
      <Header quiz={quiz} answeredCount={answeredCount} total={total} index={index} phase={phase} />

      {phase === "taking" ? (
        <TakingView
          quiz={quiz}
          index={index}
          answers={answers}
          onPick={(L) => setAnswers((s) => ({ ...s, [String(quiz.questions[index].q)]: L }))}
          onAdvance={() => (index + 1 < total ? setIndex(index + 1) : setPhase("review"))}
          onBack={() => setIndex(Math.max(0, index - 1))}
        />
      ) : phase === "review" ? (
        <ReviewView
          quiz={quiz}
          answers={answers}
          onJump={(i) => {
            setIndex(i);
            setPhase("taking");
          }}
          onSubmit={() => setPhase("gating")}
        />
      ) : (
        <Gate
          slug={slug}
          answers={answers}
          stored={stored}
          onCancel={() => setPhase("review")}
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

/* ─────────────────────────  Header + progress  ───────────────────────── */

function Header({
  quiz,
  answeredCount,
  total,
  index,
  phase,
}: {
  quiz: PublicQuiz;
  answeredCount: number;
  total: number;
  index: number;
  phase: Phase;
}) {
  const tag = [quiz.exam, quiz.subject, quiz.chapter].filter(Boolean).join(" · ");
  const pct = total > 0 ? Math.round((answeredCount / total) * 100) : 0;
  return (
    <header className="space-y-3">
      <div className="space-y-1">
        {tag && <p className="text-xs font-medium uppercase tracking-wide text-brand-accent">{tag}</p>}
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{quiz.title}</h1>
      </div>
      <div className="space-y-1.5">
        <div
          className="h-2 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Quiz progress"
        >
          <div
            className="h-full rounded-full bg-brand transition-all duration-500 ease-out"
            style={{ width: `${Math.max(pct, phase === "taking" ? (index / Math.max(total, 1)) * 100 : pct)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {phase === "taking" ? (
            <>
              Question <span className="font-medium text-foreground">{index + 1}</span> of {total}
            </>
          ) : (
            <>
              <span className="font-medium text-foreground">{answeredCount}</span> of {total} answered
            </>
          )}
        </p>
      </div>
    </header>
  );
}

/* ─────────────────────────  Taking (one at a time)  ───────────────────────── */

function TakingView({
  quiz,
  index,
  answers,
  onPick,
  onAdvance,
  onBack,
}: {
  quiz: PublicQuiz;
  index: number;
  answers: Record<string, Letter>;
  onPick: (L: Letter) => void;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const q = quiz.questions[index];
  const key = String(q.q);
  const picked = answers[key];
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLast = index + 1 >= quiz.questions.length;

  const choose = useCallback(
    (L: Letter) => {
      onPick(L);
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(onAdvance, 280); // let the selection register, then glide on
    },
    [onPick, onAdvance]
  );

  // Keyboard: 1–4 pick, ←/→ move.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "4") choose(LETTERS[Number(e.key) - 1]);
      else if (e.key === "ArrowLeft") onBack();
      else if (e.key === "ArrowRight") onAdvance();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, onBack, onAdvance]);

  useEffect(() => () => void (advanceTimer.current && clearTimeout(advanceTimer.current)), []);

  return (
    <div key={index} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex gap-3 font-serif text-[17px] leading-relaxed">
          <span className="mt-0.5 shrink-0 font-sans text-sm font-medium text-muted-foreground">{q.q}.</span>
          <div className="min-w-0 flex-1 overflow-x-auto">
            <KatexRenderer text={q.stem} />
          </div>
        </div>
        <div className="mt-5 space-y-2.5">
          {LETTERS.map((L) => {
            const on = picked === L;
            return (
              <button
                key={L}
                type="button"
                onClick={() => choose(L)}
                aria-pressed={on}
                className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99] ${
                  on ? "border-brand bg-brand/5 ring-1 ring-brand" : "hover:border-foreground/20 hover:bg-muted/60"
                }`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-bold transition-colors ${
                    on ? "border-brand bg-brand text-brand-foreground" : "text-muted-foreground group-hover:border-foreground/30"
                  }`}
                >
                  {on ? <Check className="h-4 w-4" /> : L}
                </span>
                <span className="min-w-0 flex-1 overflow-x-auto font-serif text-[15px]">
                  <KatexRenderer text={q.options[L]} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={index === 0}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:invisible"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={onAdvance}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {picked ? (isLast ? "Review →" : "Next →") : "Skip"}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────  Review summary  ───────────────────────── */

function ReviewView({
  quiz,
  answers,
  onJump,
  onSubmit,
}: {
  quiz: PublicQuiz;
  answers: Record<string, Letter>;
  onJump: (i: number) => void;
  onSubmit: () => void;
}) {
  const total = quiz.questions.length;
  const answered = Object.keys(answers).length;
  const allDone = answered === total;
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-5">
      <div className="rounded-2xl border bg-card p-5 sm:p-6">
        <p className="text-sm font-medium">
          {allDone ? "All answered — nice." : `${total - answered} question${total - answered > 1 ? "s" : ""} still blank.`}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Tap any number to revisit it, or reveal your score.</p>
        <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-8">
          {quiz.questions.map((q, i) => {
            const done = answers[String(q.q)] !== undefined;
            return (
              <button
                key={q.q}
                type="button"
                onClick={() => onJump(i)}
                className={`grid h-10 place-items-center rounded-lg border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  done ? "border-brand bg-brand/10 text-brand-accent" : "text-muted-foreground hover:bg-muted"
                }`}
                aria-label={`Question ${q.q}${done ? ", answered" : ", not answered"}`}
              >
                {q.q}
              </button>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={answered === 0}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3.5 text-base font-semibold text-brand-foreground shadow-sm transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
      >
        See my score <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ─────────────────────────  Gate (bottom sheet)  ───────────────────────── */

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

  // Lock scroll + Escape to cancel while the sheet is up.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onCancel]);

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

  const consentField = (
    <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[hsl(var(--brand))]" />
      <span>
        I agree to be contacted about NDA prep and accept the{" "}
        <Link href="/privacy" className="underline" target="_blank">
          privacy policy
        </Link>
        .
      </span>
    </label>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Reveal your score"
    >
      <button type="button" className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in" aria-label="Close" onClick={onCancel} />
      <div className="relative w-full max-w-md animate-in slide-in-from-bottom-4 duration-300 rounded-t-2xl border bg-card p-6 shadow-xl sm:rounded-2xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted sm:hidden" />
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand/10 text-brand-accent">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold leading-tight">Your score is ready</p>
            <p className="text-xs text-muted-foreground">Where should we send it? Instant — we never spam.</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {stored && !editing ? (
            <>
              <p className="text-sm">
                Continue as <span className="font-medium">{stored.name}</span> · {stored.mobile}
              </p>
              {consentField}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={submit}
                  disabled={busy}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 font-semibold text-brand-foreground transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
                >
                  {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Reveal my score <ArrowRight className="h-4 w-4" /></>}
                </button>
              </div>
              <button onClick={() => setEditing(true)} className="text-xs text-muted-foreground underline">
                Use a different number
              </button>
            </>
          ) : (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoFocus
                className="h-12 w-full rounded-xl border bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Your name"
              />
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                inputMode="numeric"
                placeholder="Mobile number"
                className="h-12 w-full rounded-xl border bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Mobile number"
              />
              {consentField}
              <button
                onClick={submit}
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3.5 text-base font-semibold text-brand-foreground transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
              >
                {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <>See my score <ArrowRight className="h-5 w-5" /></>}
              </button>
              <button onClick={onCancel} className="block w-full text-center text-xs text-muted-foreground underline">
                Back to questions
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────  Results  ───────────────────────── */

function useCountUp(target: number, ms = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / ms);
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * target)); // easeOutCubic
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return val;
}

function ScoreRing({ score, total, tone, celebrate }: { score: number; total: number; tone: VerdictTone; celebrate: boolean }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = total > 0 ? c * (1 - score / total) : c;
  const [dash, setDash] = useState(c);
  const count = useCountUp(score);
  useEffect(() => {
    const t = setTimeout(() => setDash(offset), 80);
    return () => clearTimeout(t);
  }, [offset]);

  return (
    <div className="relative mx-auto h-36 w-36">
      {celebrate && <span className={`absolute inset-2 rounded-full ${TONE[tone].soft} animate-ping`} aria-hidden />}
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} className="fill-none stroke-muted" strokeWidth="9" />
        <circle
          cx="60"
          cy="60"
          r={r}
          className={`fill-none ${TONE[tone].stroke} transition-[stroke-dashoffset] duration-1000 ease-out`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={dash}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold tabular-nums ${TONE[tone].text}`}>{count}</span>
        <span className="text-sm text-muted-foreground">/ {total}</span>
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
  const verdict = scoreVerdict(result.score, result.total);
  const [showAll, setShowAll] = useState(false);
  const url = useMemo(
    () => (typeof window !== "undefined" ? `${window.location.origin}/quiz/${slug}` : `/quiz/${slug}`),
    [slug]
  );

  async function share() {
    const text = `I scored ${result.score}/${result.total} on this ${[quiz.exam, quiz.subject].filter(Boolean).join(" ")} quiz — try it:`;
    try {
      if (navigator.share) await navigator.share({ title: quiz.title, text, url });
      else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        toast.success("Link copied — share it!");
      }
    } catch {
      /* user cancelled — ignore */
    }
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="animate-in fade-in zoom-in-95 duration-500 rounded-2xl border bg-card p-6 text-center shadow-sm">
        <ScoreRing score={result.score} total={result.total} tone={verdict.tone} celebrate={verdict.celebrate} />
        <h2 className="mt-4 text-2xl font-bold tracking-tight">{verdict.headline}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{verdict.blurb}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Stat label="correct" value={result.correct} className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" />
          <Stat label="wrong" value={result.incorrect} className="bg-red-500/10 text-red-700 dark:text-red-400" />
          <Stat label="skipped" value={result.notAttempted} className="bg-slate-400/10 text-slate-600 dark:text-slate-300" />
        </div>
        <button
          onClick={share}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          <Share2 className="h-4 w-4" /> Share your score
        </button>
      </div>

      {/* Review */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Review your answers</h3>
          <button onClick={() => setShowAll((s) => !s)} className="text-xs font-medium text-brand-accent hover:underline">
            {showAll ? "Show only misses" : "Show all"}
          </button>
        </div>
        <ol className="space-y-3">
          {quiz.questions.map((q) => {
            const k = String(q.q);
            const v = result.responses[k];
            if (!showAll && v === 1) return null; // default: focus on what to fix
            const correct = result.key[k] as Letter;
            const mine = answers[k] as Letter | undefined;
            const notes = result.notesLinks[k];
            return (
              <li key={q.q} className="rounded-2xl border bg-card p-4">
                <div className="flex items-start gap-2.5">
                  <VerdictIcon verdict={v} />
                  <div className="min-w-0 flex-1 space-y-2.5">
                    <div className="flex gap-2 font-serif text-sm">
                      <span className="shrink-0 font-sans text-xs font-medium text-muted-foreground">{q.q}.</span>
                      <div className="min-w-0 flex-1 overflow-x-auto">
                        <KatexRenderer text={q.stem} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {LETTERS.map((L) => {
                        const isCorrect = correct === L;
                        const isMine = mine === L;
                        return (
                          <div
                            key={L}
                            className={`flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-sm ${
                              isCorrect
                                ? "bg-emerald-500/10 font-medium ring-1 ring-emerald-500/30"
                                : isMine
                                  ? "bg-red-500/10 ring-1 ring-red-500/30"
                                  : ""
                            }`}
                          >
                            <span className="font-sans text-xs text-muted-foreground">({L.toLowerCase()})</span>
                            <span className="min-w-0 flex-1 overflow-x-auto">
                              <KatexRenderer text={q.options[L]} />
                            </span>
                            {isCorrect && <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-label="correct answer" />}
                            {isMine && !isCorrect && <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600" aria-label="your answer" />}
                          </div>
                        );
                      })}
                    </div>
                    {v !== 1 && notes && (
                      <Link href={notes} className="inline-flex items-center gap-1 text-xs font-medium text-brand-accent hover:underline">
                        <BookOpen className="h-3.5 w-3.5" /> Master this — read the notes
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        {!showAll && result.correct === result.total && (
          <p className="rounded-2xl border border-dashed bg-card p-4 text-center text-sm text-muted-foreground">
            Perfect — nothing to review. 🎯
          </p>
        )}
      </div>

      <ConversionCta billingLive={result.billingLive} />
    </div>
  );
}

function Stat({ label, value, className }: { label: string; value: number; className: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${className}`}>
      <span className="tabular-nums">{value}</span>
      <span className="text-xs font-normal opacity-80">{label}</span>
    </span>
  );
}

function VerdictIcon({ verdict }: { verdict: number }) {
  if (verdict === 1)
    return (
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
        <Check className="h-4 w-4" aria-label="correct" />
      </span>
    );
  if (verdict === -1)
    return (
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-500/15 text-red-600">
        <X className="h-4 w-4" aria-label="wrong" />
      </span>
    );
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-400/15 text-muted-foreground">
      <Minus className="h-4 w-4" aria-label="skipped" />
    </span>
  );
}

function ConversionCta({ billingLive }: { billingLive: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-gradient-to-br from-brand/10 via-card to-card p-6 text-center">
      <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-brand/15 text-brand-accent">
        <Sparkles className="h-5 w-5" aria-hidden />
      </span>
      {billingLive ? (
        <>
          <p className="mt-3 font-semibold">Want the full NDA prep?</p>
          <p className="mt-1 text-sm text-muted-foreground">Notes, PYQ banks and daily quizzes for every chapter.</p>
          <Link
            href="/signup?next=/pricing&utm_source=quiz"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:brightness-110"
          >
            Go premium <ArrowRight className="h-4 w-4" />
          </Link>
        </>
      ) : (
        <>
          <p className="mt-3 font-semibold">Keep going — it&rsquo;s free</p>
          <p className="mt-1 text-sm text-muted-foreground">Browse the PYQ bank and self-study notes for every NDA chapter.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link
              href="/browse"
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:brightness-110"
            >
              Explore the question bank <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/signup?next=/browse&utm_source=quiz" className="rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
              Create a free account
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
