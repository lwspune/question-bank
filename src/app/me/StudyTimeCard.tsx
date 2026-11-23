"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { formatDuration, type Split, type StudyCard, type StudyNext, type Summary } from "@/lib/studyTime/report";
import type { StudyExam } from "@/lib/studyTime/reportServer";
import { sendActivity, sendActivityOnce } from "@/lib/activity/clientBeacon";
import { cn } from "@/lib/utils";

/**
 * Home's Study time card (2026-11-21, owner; mockup approved the same day):
 * today and the last 7 days, by kind, subject and chapter, and the time beside
 * the paper. Numbers from lib/studyTime/report, shared with V. Rendered only
 * when the week holds 15 minutes or more (the card is null below that).
 *
 * The one suggestion is fetched when This week is first opened
 * (/api/me/study-next): it needs the student's whole mock record to skip
 * chapters already strong. The staff view fetches nothing (the route answers
 * for the signed-in viewer) and says what is there instead.
 */
type Tab = "today" | "week";
type Next = StudyNext & { href: string };

const KINDS: { key: keyof Split; label: string; swatch: string }[] = [
  { key: "practice", label: "Practice", swatch: "bg-brand" },
  { key: "mock", label: "Mocks", swatch: "bg-foreground" },
  { key: "reading", label: "Reading", swatch: "bg-brand/40 dark:bg-brand-accent/70" },
];

export default function StudyTimeCard({
  card,
  exam,
  readOnly = false,
}: {
  card: StudyCard;
  exam: StudyExam | null;
  readOnly?: boolean;
}) {
  const [tab, setTab] = useState<Tab>(card.today ? "today" : "week");
  const [next, setNext] = useState<Next | null | undefined>(undefined);

  useEffect(() => {
    if (!readOnly) sendActivityOnce("study_time:seen", { kind: "surface_viewed", surface: "study_time", action: "seen" });
  }, [readOnly]);

  // The suggestion, once, when This week first opens.
  const wantsNext = tab === "week" && !readOnly && !!exam && !!card.paper && next === undefined;
  useEffect(() => {
    if (!wantsNext || !exam) return;
    let live = true;
    sendActivityOnce("study_time:week", { kind: "surface_viewed", surface: "study_time", action: "week" });
    fetch(`/api/me/study-next?exam=${encodeURIComponent(exam.slug)}`, { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<{ next: Next | null }>) : { next: null }))
      .then((d) => {
        if (!live) return;
        setNext(d.next);
        if (d.next) {
          sendActivityOnce(`study_time:next_shown:${d.next.chapterId}`, {
            kind: "surface_viewed",
            surface: "study_time",
            action: "next_shown",
            chapterId: d.next.chapterId,
          });
        }
      })
      .catch(() => live && setNext(null));
    return () => {
      live = false;
    };
  }, [wantsNext, exam]);

  return (
    <section aria-labelledby="study-time-heading" className="rounded-2xl border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 id="study-time-heading" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Clock className="h-4 w-4 text-brand-accent" aria-hidden />
          Study time
        </h2>
        {card.today && (
          <div role="group" aria-label="Period" className="flex rounded-full bg-muted p-0.5">
            {(["today", "week"] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "min-h-8 rounded-full px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  tab === t ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t === "today" ? "Today" : "This week"}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab === "today" && card.today ? <TodayView view={card.today} /> : <WeekView card={card} />}

      {tab === "week" && card.paper && (
        <Suggestion next={next} readOnly={readOnly} examLabel={card.examLabel} />
      )}
    </section>
  );
}

/* ------------------------------------------------------------ today */

function TodayView({ view }: { view: NonNullable<StudyCard["today"]> }) {
  const s = view.summary;
  const when = view.label === "Today" ? "today" : view.label === "Yesterday" ? "yesterday" : `on ${view.label}`;
  const top = s.chapters[0];
  return (
    <div className="mt-3 space-y-4">
      <div>
        <p className="text-2xl font-bold tracking-tight tabular-nums">
          {formatDuration(s.secs)} <span className="text-sm font-medium text-muted-foreground">{when}</span>
        </p>
        {top && (
          <p className="mt-0.5 text-sm text-muted-foreground">
            Most on {top.chapter} ({formatDuration(top.secs)})
          </p>
        )}
      </div>
      <SplitBar summary={s} />
      <ChapterBars chapters={s.chapters.slice(0, 3)} />
      {view.usualSecs !== null && (
        <p className="text-sm text-muted-foreground">More than your usual day ({formatDuration(view.usualSecs)}).</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ week */

function WeekView({ card }: { card: StudyCard }) {
  const w = card.week;
  const max = Math.max(...w.days.map((d) => d.secs), 1);
  const context = [
    w.since ? `Since ${w.since}` : "Last 7 days",
    card.examLabel,
    w.lastWeekSecs !== null ? `last week ${formatDuration(w.lastWeekSecs)}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const label = w.days.map((d) => `${d.label} ${d.secs >= 60 ? formatDuration(d.secs) : "none"}`).join(", ");
  return (
    <div className="mt-3 space-y-4">
      <div>
        <p className="text-2xl font-bold tracking-tight tabular-nums">{formatDuration(w.summary.secs)}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{context}</p>
        {w.allExamsSecs !== null && (
          <p className="mt-0.5 text-xs text-muted-foreground">All your exams: {formatDuration(w.allExamsSecs)}</p>
        )}
      </div>

      <div role="img" aria-label={`Time per day: ${label}`} className="grid h-24 grid-cols-7 items-end gap-1.5">
        {w.days.map((d) => {
          const today = d.label === "Today";
          return (
            <div key={d.day} className="flex h-full flex-col items-center justify-end gap-1">
              {d.secs >= 60 ? (
                <>
                  <span className={cn("text-[10px] tabular-nums", today ? "font-semibold text-foreground" : "text-muted-foreground")}>
                    {Math.round(d.secs / 60)}
                  </span>
                  <div
                    className={cn("w-full rounded-md", today ? "bg-foreground" : "bg-brand")}
                    style={{ height: `${Math.max(6, Math.round((d.secs / max) * 64))}px` }}
                  />
                </>
              ) : (
                <div className="mb-0.5 h-1.5 w-1.5 rounded-full bg-border" />
              )}
              <span className={cn("text-[11px]", today ? "font-semibold text-foreground" : "text-muted-foreground")}>{d.label}</span>
            </div>
          );
        })}
      </div>
      <p className="-mt-2 text-[11px] text-muted-foreground">Minutes a day</p>

      <SplitBar summary={w.summary} />

      {w.summary.subjects.length > 1 && (
        <div className="border-t pt-3">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">By subject</p>
          <ul className="space-y-1.5 text-sm">
            {w.summary.subjects.slice(0, 5).map((s) => (
              <li key={s.subject} className="flex justify-between gap-3">
                <span className="font-medium">{s.subject}</span>
                <span className="shrink-0 tabular-nums text-muted-foreground">{formatDuration(s.secs)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {card.paper ? (
        <PaperBars paper={card.paper} />
      ) : (
        card.paperSoon && (
          <p className="border-t pt-3 text-xs text-muted-foreground">
            Your time vs the paper shows once you have 1 hour in a subject in a week.
          </p>
        )
      )}
    </div>
  );
}

function PaperBars({ paper }: { paper: NonNullable<StudyCard["paper"]> }) {
  const [all, setAll] = useState(false);
  const rows = all ? paper.rows : paper.rows.slice(0, 3);
  const top = Math.max(...paper.rows.map((r) => Math.max(r.timePct, r.paperPct)), 1);
  return (
    <div className="border-t pt-3">
      <p className="text-xs font-semibold text-muted-foreground">{paper.subject}: your time vs the paper</p>
      <div className="mt-1.5 mb-3 flex gap-4 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 rounded-full bg-brand" aria-hidden />
          Your time
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 rounded-full bg-muted-foreground/40" aria-hidden />
          Share of the marks
        </span>
      </div>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.chapterId}>
            <div className="flex justify-between gap-3 text-sm">
              <span className="font-medium">{r.chapter}</span>
              <span className="shrink-0 tabular-nums text-muted-foreground">{r.secs >= 60 ? formatDuration(r.secs) : "none"}</span>
            </div>
            <div aria-hidden className="mt-1 space-y-0.5">
              <div className="h-1.5 rounded-full bg-muted">
                <div className="h-1.5 rounded-full bg-brand" style={{ width: `${(100 * r.timePct) / top}%` }} />
              </div>
              <div className="h-1.5 rounded-full bg-muted">
                <div className="h-1.5 rounded-full bg-muted-foreground/40" style={{ width: `${(100 * r.paperPct) / top}%` }} />
              </div>
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {r.secs > 0 ? `${r.timePct}% of your ${paper.subject} time` : "No time this week"} · {r.paperPct}% of its marks
            </p>
          </li>
        ))}
      </ul>
      {paper.rows.length > 3 && (
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          aria-expanded={all}
          className="mt-2 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {all ? "Show fewer" : `Show all ${paper.rows.length} chapters`}
        </button>
      )}
    </div>
  );
}

function Suggestion({ next, readOnly, examLabel }: { next: Next | null | undefined; readOnly: boolean; examLabel: string }) {
  if (readOnly) {
    return (
      <p className="mt-4 rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground">
        Here they also see one chapter to study next: worth the most in the papers, no time this week, not strong yet.
      </p>
    );
  }
  if (!next) return null;
  return (
    <div className="mt-4 space-y-2 rounded-xl bg-brand/10 p-3">
      <p className="text-sm leading-relaxed">
        {next.praise && (
          <>
            Good week on <strong>{next.praise}</strong>.{" "}
          </>
        )}
        Next, <strong>{next.chapter}</strong>: about {next.paperPct}% of the {examLabel} {next.subject} marks, and no time
        on it this week.
      </p>
      <Link
        href={next.href}
        prefetch={false}
        onClick={() => sendActivity({ kind: "surface_viewed", surface: "study_time", action: "next_tap", chapterId: next.chapterId })}
        className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-brand px-4 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Start {next.chapter}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------ shared */

function SplitBar({ summary }: { summary: Summary }) {
  const parts = KINDS.filter((k) => summary.split[k.key] >= 60);
  if (parts.length === 0) return null;
  return (
    <div>
      <div aria-hidden className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
        {parts.map((k) => (
          <div key={k.key} className={k.swatch} style={{ width: `${(100 * summary.split[k.key]) / summary.secs}%` }} />
        ))}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {parts.map((k) => (
          <li key={k.key} className="flex items-center gap-1.5">
            <span className={cn("h-2 w-2 rounded-sm", k.swatch)} aria-hidden />
            {k.label} {formatDuration(summary.split[k.key])}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChapterBars({ chapters }: { chapters: Summary["chapters"] }) {
  if (chapters.length === 0) return null;
  const max = chapters[0].secs;
  return (
    <ul className="space-y-2.5">
      {chapters.map((c) => (
        <li key={c.chapterId}>
          <div className="flex justify-between gap-3 text-sm">
            <span className="font-medium">{c.chapter}</span>
            <span className="shrink-0 tabular-nums text-muted-foreground">{formatDuration(c.secs)}</span>
          </div>
          <div aria-hidden className="mt-1 h-1.5 rounded-full bg-muted">
            <div className="h-1.5 rounded-full bg-brand" style={{ width: `${(100 * c.secs) / max}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
