"use client";

import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import type { VLesson } from "@/lib/chat/lesson";

/**
 * The map of a chapter V is teaching (2026-11-21, the owner's mockup B): each
 * part in teaching order with the student's waiting mistakes in it, and the
 * part V starts with marked. Drawn from the lesson chapter_overview hands the
 * window, never from V's text, so V writes one line about it instead of a list.
 */
export default function VChapterMapCard({
  lesson,
  onNavigate,
  placement = "below",
}: {
  lesson: VLesson;
  onNavigate?: () => void;
  /** Above V's reply (the lesson's first reply, mockup B order) or under it. */
  placement?: "above" | "below";
}) {
  const unit = lesson.notesHref ? "parts" : "topics";
  return (
    <section
      className={`ml-9 ${placement === "above" ? "mb-2" : "mt-2"} max-w-[calc(100%-2.25rem)] rounded-xl border bg-card p-3 text-sm shadow-sm`}
      aria-label={`${lesson.chapter} in ${lesson.parts.length} ${unit}`}
    >
      <div className="mb-2 flex items-start gap-2">
        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <div className="min-w-0">
          <p className="font-semibold">{lesson.chapter}</p>
          <p className="text-xs text-muted-foreground">
            {lesson.exam} · {lesson.parts.length} {unit}
            {lesson.missed > 0 ? ` · ${lesson.missed} ${lesson.missed === 1 ? "mistake" : "mistakes"} waiting` : ""}
          </p>
        </div>
      </div>
      <ol className="space-y-0.5">
        {lesson.parts.map((p) => {
          const current = p.n === lesson.current;
          const row = `flex items-start gap-2 rounded-lg px-2 py-1 text-xs ${current ? "bg-accent font-semibold" : ""}`;
          const body = (
            <>
              <span className={`w-4 shrink-0 tabular-nums ${current ? "text-brand-accent" : "text-muted-foreground"}`}>{p.n}</span>
              <span className="min-w-0 flex-1 break-words">{p.title}</span>
              {current && <span className="sr-only">(we start here)</span>}
              {p.missed > 0 && (
                <span className="shrink-0 rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-semibold text-destructive">
                  {p.missed} missed
                </span>
              )}
              {/* The whole row opens that part's notes; the arrow says so (owner's review of the sheet, 2026-11-21). */}
              {p.href && <ChevronRight className="mt-px h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />}
            </>
          );
          return (
            <li key={p.n} aria-current={current ? "step" : undefined}>
              {p.href ? (
                <Link
                  href={p.href}
                  onClick={onNavigate}
                  className={`${row} transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                >
                  {body}
                </Link>
              ) : (
                <div className={row}>{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
