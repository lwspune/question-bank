"use client";

import { useState } from "react";
import { Check, ChevronDown, Globe, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import KatexRenderer from "@/components/math/KatexRenderer";
import type { AssembledQuiz } from "@/lib/quiz/admin";
import { setQuizPublicAction } from "./actions";

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  pushed: "bg-brand/10 text-brand-accent",
  published: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  archived: "bg-muted text-muted-foreground",
};
const LETTERS = ["A", "B", "C", "D"] as const;

type FilterKey = "exam" | "subject" | "chapter" | "theme" | "status";
const FILTER_DEFS: { key: FilterKey; all: string }[] = [
  { key: "exam", all: "All exams" },
  { key: "subject", all: "All subjects" },
  { key: "chapter", all: "All chapters" },
  { key: "theme", all: "All themes" },
  { key: "status", all: "Any status" },
];
const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export default function QuizBrowser({ quizzes }: { quizzes: AssembledQuiz[] }) {
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    exam: "",
    subject: "",
    chapter: "",
    theme: "",
    status: "",
  });

  if (quizzes.length === 0) {
    return (
      <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        No quizzes assembled yet. Use the Assemble control above, or run{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">npm run quiz:assemble nda-maths probability</code>.
      </p>
    );
  }

  // Cascade: a dropdown's options reflect the OTHER active filters, so e.g.
  // Subject=Maths lists only Maths chapters (not NDA Biology's Human Physiology).
  const optsGiven = (state: Record<FilterKey, string>, key: FilterKey) =>
    [
      ...new Set(
        quizzes
          .filter((q) => FILTER_DEFS.every((f) => f.key === key || !state[f.key] || q[f.key] === state[f.key]))
          .map((q) => q[key])
          .filter(Boolean)
      ),
    ].sort();
  const optionsFor = (key: FilterKey) => optsGiven(filters, key);
  // Setting a value can make another active filter an impossible combo (e.g.
  // Subject=Biology while Chapter=Vectors) — clear those so the UI never holds a
  // hidden contradiction and the count stays sane.
  const setFilter = (key: FilterKey, value: string) =>
    setFilters((cur) => {
      const next = { ...cur, [key]: value };
      if (value) {
        for (const f of FILTER_DEFS) {
          if (f.key !== key && next[f.key] && !optsGiven(next, f.key).includes(next[f.key])) {
            next[f.key] = "";
          }
        }
      }
      return next;
    });
  const filtered = quizzes.filter((q) =>
    FILTER_DEFS.every((f) => !filters[f.key] || q[f.key] === filters[f.key])
  );
  const anyFilter = Object.values(filters).some(Boolean);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {FILTER_DEFS.map((f) => {
          const opts = optionsFor(f.key);
          if (opts.length === 0) return null;
          return (
            <select
              key={f.key}
              value={filters[f.key]}
              onChange={(e) => setFilter(f.key, e.target.value)}
              className="h-9 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={f.all}
            >
              <option value="">{f.all}</option>
              {opts.map((o) => (
                <option key={o} value={o}>
                  {cap(o)}
                </option>
              ))}
            </select>
          );
        })}
        {anyFilter && (
          <button
            className="text-sm text-muted-foreground underline hover:text-foreground"
            onClick={() => setFilters({ exam: "", subject: "", chapter: "", theme: "", status: "" })}
          >
            Clear
          </button>
        )}
        <span className="ml-auto font-mono text-xs text-muted-foreground">
          {filtered.length} of {quizzes.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No quizzes match these filters.
        </p>
      ) : (
        filtered.map((quiz) => <QuizRow key={quiz.id} quiz={quiz} />)
      )}
    </div>
  );
}

function QuizRow({ quiz }: { quiz: AssembledQuiz }) {
  return (
    <details className="group rounded-lg border bg-card">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="truncate font-medium">{quiz.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {[quiz.exam, quiz.subject, quiz.chapter, cap(quiz.theme)].filter(Boolean).join(" · ")} ·{" "}
            {quiz.questions.length} questions{quiz.pushedAt ? " · pushed" : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              STATUS_STYLES[quiz.status] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {quiz.status}
          </span>
          <ChevronDown
            className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
            aria-hidden
          />
        </div>
      </summary>

      <PublishControls quiz={quiz} />

      <ol className="space-y-4 border-t px-4 py-4">
        {quiz.questions.map((q) => (
          <li key={q.position} className="space-y-2">
            <div className="flex gap-2 font-serif text-sm">
              <span className="shrink-0 font-mono text-xs text-muted-foreground">{q.position}.</span>
              <div className="min-w-0 flex-1 overflow-x-auto">
                <KatexRenderer text={q.stem} />
              </div>
            </div>
            <ul className="ml-6 grid gap-1 sm:grid-cols-2">
              {q.options
                ? LETTERS.map((L) => {
                    const correct = q.answer === L;
                    return (
                      <li
                        key={L}
                        className={`flex items-start gap-1.5 rounded px-2 py-1 text-sm ${
                          correct ? "bg-emerald-500/10 font-medium" : ""
                        }`}
                      >
                        <span className="font-mono text-xs text-muted-foreground">({L.toLowerCase()})</span>
                        <span className="min-w-0 flex-1 overflow-x-auto">
                          <KatexRenderer text={q.options![L]} />
                        </span>
                        {correct && <Check className="ml-auto h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />}
                      </li>
                    );
                  })
                : null}
            </ul>
            <p className="ml-6 text-xs text-muted-foreground">{q.conceptSlug}</p>
          </li>
        ))}
      </ol>
    </details>
  );
}

function PublishControls({ quiz }: { quiz: AssembledQuiz }) {
  const [publicSlug, setPublicSlug] = useState<string | null>(quiz.publicSlug);
  const [busy, setBusy] = useState(false);

  async function toggle(publish: boolean) {
    setBusy(true);
    try {
      const r = await setQuizPublicAction(quiz.id, publish);
      if (!r.ok) return toast.error(r.error);
      setPublicSlug(publish ? r.publicSlug : null);
      toast.success(publish ? "Published — public link is live." : "Unpublished.");
    } finally {
      setBusy(false);
    }
  }

  async function copyLink() {
    const url = `${window.location.origin}/quiz/${publicSlug}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Public link copied.");
    } catch {
      toast.error("Couldn't copy — the link is /quiz/" + publicSlug);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-t bg-muted/30 px-4 py-2.5">
      {publicSlug ? (
        <>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <Globe className="h-3.5 w-3.5" /> Public
          </span>
          <code className="rounded bg-background px-1.5 py-0.5 text-xs text-muted-foreground">/quiz/{publicSlug}</code>
          <button onClick={copyLink} className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium hover:bg-muted">
            <Copy className="h-3.5 w-3.5" /> Copy link
          </button>
          <button onClick={() => toggle(false)} disabled={busy} className="text-xs text-muted-foreground underline disabled:opacity-50">
            Unpublish
          </button>
        </>
      ) : (
        <button
          onClick={() => toggle(true)}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-medium text-brand-foreground disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Globe className="h-3.5 w-3.5" />}
          Publish to public
        </button>
      )}
    </div>
  );
}
