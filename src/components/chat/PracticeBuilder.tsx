"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, Loader2, Play, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import PaperDownload from "@/app/mock/_components/PaperDownload";
import SendToFriend from "@/components/practice/SendToFriend";
import { cn } from "@/lib/utils";
import { pricingHref } from "@/lib/billing/checkoutReturn";
import {
  BUILDER_STEPS,
  MAX_CHAPTERS,
  backFrom,
  currentStep,
  toggleChapter,
  type BuilderAnswers,
  type BuilderStep,
} from "@/lib/practiceTests/builder";
import { practiceLengths, type PracticeDifficulty } from "@/lib/practiceTests/pick";
import type { MockStartState } from "@/lib/mocks/quota";
import { practiceBuilderNote, practiceCardLine } from "@/lib/practiceTests/quotaCopy";
import type { BuilderStepId } from "@/lib/chat/builderSteps";
import { readStoredChat } from "@/lib/chat/localChat";
import { MESSAGE_IN, USER_BUBBLE, V_BUBBLE } from "./chatStyles";

type ExamOption = { slug: string; name: string };
type SubjectOption = { key: string; label: string };
type ChapterOption = { id: string; name: string; available: number; recentPyq: number };
type BuiltTest = {
  slug: string;
  title: string;
  questions: number;
  minutes: number;
  newToYou: number;
};

/** sessionStorage key: a signed-out student's answers, kept across sign-in. */
export const PENDING_BUILD_KEY = "v-practice-builder";

const PROMPTS: Record<BuilderStep, string> = {
  exam: "Let's build your practice test. Which exam is it for?",
  subject: "Which subject?",
  chapters: `Pick up to ${MAX_CHAPTERS} chapters, or let me choose the most-asked ones.`,
  length: "How many questions?",
  difficulty: "How hard should it be?",
  fresh: "Skip questions you've already answered in a test?",
  summary: "Here's your test. Shall I build it?",
};

const DIFFICULTY_LABELS: Record<PracticeDifficulty, string> = {
  mixed: "Mixed, like the real paper",
  easier: "Easier",
  harder: "Harder",
};

const MIN_QUESTIONS = 10;

export function logBuilderStep(step: Exclude<BuilderStepId, "built">) {
  void fetch("/api/chat/builder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Migration 0159: the step joins the conversation the chat window keeps.
    body: JSON.stringify({ step, conversationId: readStoredChat()?.conversationId ?? null }),
  }).catch(() => {});
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string } & T;
  if (!res.ok || !body.ok) throw new Error(body.error || "V couldn't load that. Please try again.");
  return body;
}

function readExamCookie(): string | null {
  try {
    const m = document.cookie.match(/(?:^|;\s*)qb_exam=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  } catch {
    return null;
  }
}

function chapterSummary(names: string[]): string {
  return names.length > 2 ? `${names.slice(0, 2).join(", ")} + ${names.length - 2} more` : names.join(", ");
}

/**
 * V's practice-test builder (2026-10-15): V asks one question at a time, the
 * student taps an answer, and the finished answers build a test they can
 * start or download. The steps and their order are pure data
 * (lib/practiceTests/builder.ts); this renders them and talks to the routes.
 */
export default function PracticeBuilder({
  initial,
  onExit,
  onClose,
}: {
  /** Answers restored after a sign-in. */
  initial?: BuilderAnswers;
  /** Back from the first step: return to V's questions. */
  onExit: () => void;
  /** Close V, before navigating to the test. */
  onClose: () => void;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<BuilderAnswers>(initial ?? {});
  const [picks, setPicks] = useState<string[]>(initial?.chapterIds ?? []);
  const [exams, setExams] = useState<ExamOption[] | null>(null);
  const [subjects, setSubjects] = useState<Record<string, SubjectOption[]>>({});
  const [chapters, setChapters] = useState<Record<string, { list: ChapterOption[]; mostAsked: string[] }>>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [building, setBuilding] = useState(false);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [built, setBuilt] = useState<{ test: BuiltTest; start: MockStartState } | null>(null);
  const [starting, setStarting] = useState(false);
  // Today's free practice tests, read when V opens so a student who has used
  // them hears it before the steps, not on each built card (2026-10-17).
  const [quota, setQuota] = useState<MockStartState | null>(null);
  const [here, setHere] = useState("/");
  const listRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  const step = currentStep(answers);
  const subjectKey = answers.exam && answers.subject ? `${answers.exam}/${answers.subject}` : null;
  const examSubjects = answers.exam ? subjects[answers.exam] : undefined;
  const subjectChapters = subjectKey ? chapters[subjectKey] : undefined;

  useEffect(() => setHere(window.location.pathname + window.location.search), []);

  useEffect(() => {
    let live = true;
    getJson<{ state: MockStartState | null }>("/api/practice-tests/quota")
      .then((b) => live && setQuota(b.state))
      .catch(() => {
        // No note is the safe default: the card and the start trigger still tell them.
      });
    return () => {
      live = false;
    };
  }, []);

  // Load what the current step needs, once per exam and per subject.
  useEffect(() => {
    let live = true;
    setLoadError(null);
    const fail = (e: unknown) => live && setLoadError(e instanceof Error ? e.message : "V couldn't load that.");
    if (!exams) {
      getJson<{ exams: ExamOption[] }>("/api/practice-tests/options")
        .then((b) => live && setExams(b.exams))
        .catch(fail);
    } else if (answers.exam && !examSubjects) {
      getJson<{ subjects: SubjectOption[] }>(`/api/practice-tests/options?exam=${encodeURIComponent(answers.exam)}`)
        .then((b) => live && setSubjects((s) => ({ ...s, [answers.exam!]: b.subjects })))
        .catch(fail);
    } else if (subjectKey && !subjectChapters) {
      getJson<{ chapters: ChapterOption[]; mostAsked: string[] }>(
        `/api/practice-tests/options?exam=${encodeURIComponent(answers.exam!)}&subject=${encodeURIComponent(answers.subject!)}`
      )
        .then((b) => live && setChapters((c) => ({ ...c, [subjectKey]: { list: b.chapters, mostAsked: b.mostAsked } })))
        .catch(fail);
    }
    return () => {
      live = false;
    };
  }, [exams, answers.exam, answers.subject, examSubjects, subjectKey, subjectChapters, reloadKey]);

  // Bring V's newest question to the top, so a long chapter list opens at its
  // start (with Most-asked) rather than at its end. A built test or a sign-in
  // ask sits below the question, so those scroll to the end.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const prompt = promptRef.current;
    list.scrollTop = prompt && !built && !needsSignIn ? Math.max(0, prompt.offsetTop - 12) : list.scrollHeight;
  }, [step, built, needsSignIn]);

  const chosen = useMemo(
    () => (subjectChapters?.list ?? []).filter((c) => (answers.chapterIds ?? []).includes(c.id)),
    [subjectChapters, answers.chapterIds]
  );
  const available = chosen.reduce((n, c) => n + c.available, 0);
  const picked = (subjectChapters?.list ?? []).filter((c) => picks.includes(c.id));
  const pickedAvailable = picked.reduce((n, c) => n + c.available, 0);

  // Exams with the student's own exam first.
  const orderedExams = useMemo(() => {
    if (!exams) return null;
    const mine = readExamCookie();
    return [...exams].sort((a, b) => Number(b.slug === mine) - Number(a.slug === mine));
  }, [exams]);

  function answer(patch: BuilderAnswers) {
    setNeedsSignIn(false);
    setAnswers((a) => ({ ...a, ...patch }));
  }

  function goBack() {
    setNeedsSignIn(false);
    if (built) {
      setBuilt(null);
      return;
    }
    if (step === "exam") {
      onExit();
      return;
    }
    const prev = backFrom(answers);
    if (currentStep(prev) === "chapters") setPicks(prev.chapterIds ?? answers.chapterIds ?? []);
    setAnswers(prev);
  }

  function restart() {
    setBuilt(null);
    setPicks([]);
    setAnswers(answers.exam ? { exam: answers.exam } : {});
  }

  async function build() {
    if (building) return;
    setBuilding(true);
    setNeedsSignIn(false);
    try {
      const res = await fetch("/api/practice-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, mostAsked: answers.mostAsked === true }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        signIn?: boolean;
        test?: BuiltTest;
        start?: MockStartState;
      };
      if (res.status === 401 && body.signIn) {
        try {
          sessionStorage.setItem(PENDING_BUILD_KEY, JSON.stringify(answers));
        } catch {
          // A private window may refuse storage; the student then picks again after signing in.
        }
        setNeedsSignIn(true);
        logBuilderStep("sign_in");
        return;
      }
      if (!res.ok || !body.ok || !body.test || !body.start) {
        toast.error(body.error || "V couldn't build your test. Please try again.");
        return;
      }
      setBuilt({ test: body.test, start: body.start });
      setQuota(body.start);
      toast.success("Your practice test is ready");
    } catch {
      toast.error("V is unavailable right now. Please try again.");
    } finally {
      setBuilding(false);
    }
  }

  async function start(slug: string) {
    if (starting) return;
    setStarting(true);
    logBuilderStep("start");
    try {
      const res = await fetch(`/api/mock/${encodeURIComponent(slug)}/start`, { method: "POST" });
      const body = (await res.json().catch(() => ({}))) as { attemptId?: string; error?: string };
      if (!res.ok || !body.attemptId) {
        toast.error(body.error || "Could not start the test. Please try again.");
        return;
      }
      onClose();
      router.push(`/mock/${encodeURIComponent(slug)}/attempt/${body.attemptId}`);
    } catch {
      toast.error("Could not start the test. Please try again.");
    } finally {
      setStarting(false);
    }
  }

  /** The student's answer to an earlier step, as their chat bubble. */
  function answerLabel(s: BuilderStep): string | null {
    switch (s) {
      case "exam":
        return exams?.find((e) => e.slug === answers.exam)?.name ?? answers.exam ?? null;
      case "subject":
        return examSubjects?.find((x) => x.key === answers.subject)?.label ?? answers.subject ?? null;
      case "chapters":
        if (answers.mostAsked) return "Most-asked chapters";
        return chosen.length ? chapterSummary(chosen.map((c) => c.name)) : `${answers.chapterIds?.length ?? 0} chapters`;
      case "length":
        return `${answers.length} questions`;
      case "difficulty":
        return answers.difficulty ? DIFFICULTY_LABELS[answers.difficulty] : null;
      case "fresh":
        return answers.fresh ? "Skip answered ones" : "Any questions";
      default:
        return null;
    }
  }

  const doneSteps = BUILDER_STEPS.slice(0, BUILDER_STEPS.indexOf(step));
  const optionClass =
    "w-full justify-start whitespace-normal text-left h-auto min-h-10 py-2";
  const note = built ? null : practiceBuilderNote(quota);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={listRef} className="relative min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4" aria-live="polite">
        {note?.kind === "usedUp" && (
          <div className="space-y-1.5">
            <VBubble text={note.text} />
            <Link href={pricingHref(null, here)} className="ml-9 inline-block text-sm font-medium text-brand-accent underline">
              See the Premium Pass
            </Link>
          </div>
        )}
        {note?.kind === "count" && <p className="text-xs text-muted-foreground">{note.text}</p>}
        {doneSteps.map((s) => (
          <div key={s} className="space-y-3">
            <VBubble text={PROMPTS[s]} />
            <div className={USER_BUBBLE}>
              {answerLabel(s)}
            </div>
          </div>
        ))}

        {!built && (
          <div ref={promptRef}>
            <VBubble text={PROMPTS[step]} />
          </div>
        )}

        {loadError ? (
          <div className="space-y-2">
            <VBubble text={loadError} />
            <Button variant="outline" size="sm" onClick={() => setReloadKey((k) => k + 1)}>
              Try again
            </Button>
          </div>
        ) : built ? (
          <BuiltCard
            built={built}
            fresh={answers.fresh === true}
            starting={starting}
            onStart={() => void start(built.test.slug)}
            here={here}
          />
        ) : step === "exam" ? (
          orderedExams ? (
            <Options>
              {orderedExams.map((e) => (
                <Button key={e.slug} variant="outline" className={optionClass} onClick={() => answer({ exam: e.slug })}>
                  {e.name}
                </Button>
              ))}
            </Options>
          ) : (
            <Thinking />
          )
        ) : step === "subject" ? (
          examSubjects ? (
            <Options>
              {examSubjects.map((s) => (
                <Button key={s.key} variant="outline" className={optionClass} onClick={() => answer({ subject: s.key })}>
                  {s.label}
                </Button>
              ))}
            </Options>
          ) : (
            <Thinking />
          )
        ) : step === "chapters" ? (
          subjectChapters ? (
            <div className="space-y-2">
              {subjectChapters.mostAsked.length > 0 && (
                <Button
                  variant="brandOutline"
                  className={optionClass}
                  onClick={() => {
                    setPicks(subjectChapters.mostAsked);
                    answer({ chapterIds: subjectChapters.mostAsked, mostAsked: true });
                  }}
                >
                  <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
                  Most-asked chapters (last 5 years)
                </Button>
              )}
              <ul className="space-y-1.5" aria-label="Chapters">
                {subjectChapters.list.map((c) => {
                  const on = picks.includes(c.id);
                  const full = !on && picks.length >= MAX_CHAPTERS;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        aria-pressed={on}
                        disabled={full}
                        onClick={() => setPicks((p) => toggleChapter(p, c.id))}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
                          on ? "border-brand bg-brand/10" : "border-input bg-background hover:bg-accent"
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                            on ? "border-brand bg-brand text-brand-foreground" : "border-input"
                          )}
                        >
                          {on && <Check className="h-3 w-3" />}
                        </span>
                        <span className="min-w-0 flex-1">{c.name}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">{c.available} q</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <Thinking />
          )
        ) : step === "length" ? (
          practiceLengths(available).length === 0 ? (
            <VBubble text={`These chapters have ${available} questions, and a test needs ${MIN_QUESTIONS}. Go back and pick more chapters.`} />
          ) : (
            <Options>
              {practiceLengths(available).map((n) => (
                <Button key={n} variant="outline" className={optionClass} onClick={() => answer({ length: n })}>
                  {n} questions
                </Button>
              ))}
            </Options>
          )
        ) : step === "difficulty" ? (
          <Options>
            {(Object.keys(DIFFICULTY_LABELS) as PracticeDifficulty[]).map((d) => (
              <Button key={d} variant="outline" className={optionClass} onClick={() => answer({ difficulty: d })}>
                {DIFFICULTY_LABELS[d]}
              </Button>
            ))}
          </Options>
        ) : step === "fresh" ? (
          <Options>
            <Button variant="outline" className={optionClass} onClick={() => answer({ fresh: true })}>
              Yes, skip answered ones
            </Button>
            <Button variant="outline" className={optionClass} onClick={() => answer({ fresh: false })}>
              No, any questions
            </Button>
          </Options>
        ) : needsSignIn ? (
          <div className="space-y-2">
            <VBubble text="Sign in to build your test. It's free, and I've kept your choices." />
            <Button asChild variant="brand" className="w-full">
              <Link href={`/login?next=${encodeURIComponent(here)}`}>Sign in to build it</Link>
            </Button>
          </div>
        ) : (
          <Button variant="brand" className="w-full" onClick={() => void build()} disabled={building}>
            {building ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Sparkles className="h-4 w-4" aria-hidden />}
            {building ? "Building…" : "Build my test"}
          </Button>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-border/70 bg-card px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_28px_-20px_rgb(15_29_74/0.35)] sm:pb-2">
        <Button variant="ghost" size="sm" onClick={goBack} aria-label={step === "exam" && !built ? "Back to V's questions" : "Back one step"}>
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Back
        </Button>
        {step === "chapters" && subjectChapters && !built && (
          <div className="ml-auto flex items-center gap-2">
            {picks.length > 0 && pickedAvailable < MIN_QUESTIONS && (
              <span className="text-xs text-muted-foreground">Needs {MIN_QUESTIONS}+ questions</span>
            )}
            <Button
              variant="brand"
              size="sm"
              disabled={picks.length === 0 || pickedAvailable < MIN_QUESTIONS}
              onClick={() => answer({ chapterIds: picks, mostAsked: false })}
            >
              Next{picks.length > 0 ? ` (${picks.length})` : ""}
            </Button>
          </div>
        )}
        {built && (
          <Button variant="ghost" size="sm" className="ml-auto" onClick={restart}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            Build another
          </Button>
        )}
      </div>
    </div>
  );
}

function VBubble({ text }: { text: string }) {
  return (
    <div className={`flex max-w-[90%] items-end gap-2 ${MESSAGE_IN}`}>
      <img src="/chat/v-talk.png" alt="" aria-hidden className="h-7 w-7 shrink-0 object-contain" loading="lazy" />
      <div className={V_BUBBLE}>{text}</div>
    </div>
  );
}

function Thinking() {
  return (
    <div className="flex items-center gap-2 px-1 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      Loading…
    </div>
  );
}

function Options({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-1.5 sm:grid-cols-2">{children}</div>;
}

function BuiltCard({
  built,
  fresh,
  starting,
  onStart,
  here,
}: {
  built: { test: BuiltTest; start: MockStartState };
  /** The student asked to skip answered questions, so "new to you" means something. */
  fresh: boolean;
  starting: boolean;
  onStart: () => void;
  here: string;
}) {
  const { test, start } = built;
  const locked = start.kind === "locked";
  const line = practiceCardLine(start);
  // The download box's clicks bubble here through its portal; count one per test.
  const downloadLogged = useRef(false);
  return (
    <div className="space-y-3 rounded-lg border bg-card p-4">
      <div>
        <p className="font-medium">{test.title}</p>
        <p className="text-sm text-muted-foreground">
          {test.questions} questions · {test.minutes} min
          {fresh ? ` · ${test.newToYou} new to you` : ""}
        </p>
      </div>
      {start.kind === "free" && line && <p className="text-sm text-muted-foreground">{line}</p>}
      {locked && (
        <p className="text-sm">
          {line} Come back tomorrow, or{" "}
          <Link href={pricingHref(null, here)} className="font-medium text-brand-accent underline">
            get the Premium Pass
          </Link>{" "}
          for unlimited tests.
        </p>
      )}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="brand" className="w-full sm:w-auto" disabled={locked || starting} onClick={onStart}>
          {starting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
          {starting ? "Starting…" : "Start now"}
        </Button>
        <div
          onClickCapture={() => {
            if (downloadLogged.current) return;
            downloadLogged.current = true;
            logBuilderStep("download");
          }}
        >
          <PaperDownload slug={test.slug} paperTitle={test.title} variant="inline" />
        </div>
      </div>
      <SendToFriend target={{ kind: "practice", code: test.slug }} title={test.title} questions={test.questions} minutes={test.minutes} />
    </div>
  );
}
