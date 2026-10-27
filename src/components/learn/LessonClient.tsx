"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isReviewDue } from "@/lib/learn/engine/review";
import { type Home, type LearnerState, lessonView, type neighbours, type Pool } from "@/lib/learn/lessonState";
import { chapterHref, lessonHref } from "@/lib/learn/links";
import type { RenderedSlide } from "@/lib/learn/lesson/renderDeck";
import type { LessonItem } from "@/lib/learn/query";
import { LessonStage } from "./LessonStage";
import { type Attempt, QuestionPanel, type StartProgress } from "./QuestionPanel";

/**
 * A lesson page's live part. The page around it is cached and the same for everyone; this asks
 * /api/learn/progress who is looking. A guest (401) sees every lesson and is told what it builds
 * on; a signed-in student follows the unlock rule (decision, 2026-10-27), resumes at the questions
 * if they have answered here before, and has their answers saved.
 */

export type HomeWithScope = Home & {
  scope: string[];
  /** The concept's place in this course chapter, with the concepts either side. */
  place: ReturnType<typeof neighbours>;
};

type ProgressRow = {
  chapter: string;
  code: string;
  state: LearnerState;
  streak: number;
  to_retry: number;
  review_correct: number;
  next_review_at: string | null;
};

type Viewer =
  | { kind: "loading" }
  | { kind: "guest" }
  | { kind: "student"; userId: string; progress: ProgressRow[]; attempts: Attempt[] };

export function LessonClient({
  chapter,
  code,
  slug,
  title,
  slides,
  items,
  pool,
  homes,
}: {
  chapter: string;
  code: string;
  slug: string;
  title: string;
  slides: RenderedSlide[];
  items: LessonItem[];
  pool: Pool;
  homes: HomeWithScope[];
}) {
  // Read after mount, not with useSearchParams: that would leave the lesson out of the cached HTML
  // (the slides are what search engines index). The query only picks links and the refresher.
  const [query, setQuery] = useState<{ course: string | null; from: string | null }>({ course: null, from: null });
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setQuery({ course: q.get("course"), from: q.get("from") });
  }, []);
  const from = query.from;
  const home = homes.find((h) => h.course === query.course) ?? homes[0] ?? null;
  const course = home?.course ?? null;
  const [viewer, setViewer] = useState<Viewer>({ kind: "loading" });

  useEffect(() => {
    let active = true;
    const q = new URLSearchParams({ chapters: chapter, concept: `${chapter}/${slug}` });
    fetch(`/api/learn/progress?${q}`)
      .then(async (res) => {
        if (!active) return;
        if (res.status === 401) return setViewer({ kind: "guest" });
        const body = await res.json();
        if (!body.ok) throw new Error(body.error);
        setViewer({
          kind: "student",
          userId: body.data.userId,
          progress: body.data.progress,
          attempts: (body.data.attempts as { item_id: string; correct: boolean }[]).map((a) => ({ itemId: a.item_id, correct: a.correct })),
        });
      })
      .catch((e) => {
        // A failed read leaves the lesson usable as a guest would see it; answers still record if signed in.
        console.error("learn: loading progress failed", e);
        if (active) setViewer({ kind: "guest" });
      });
    return () => {
      active = false;
    };
  }, [chapter, slug]);

  const student = viewer.kind === "student" ? viewer : null;
  const learner = useMemo(
    () => new Map((student?.progress ?? []).filter((r) => r.chapter === chapter).map((r) => [r.code, r.state] as const)),
    [student, chapter],
  );
  const view = lessonView({ pool, scope: home ? new Set(home.scope) : undefined, code, learner, signedIn: student !== null, from });
  const own = student?.progress.find((r) => r.chapter === chapter && r.code === code);
  const mapHref = home ? chapterHref(home.course, home.chapter) : null;

  if (student && view.locked) {
    return (
      <div className="mx-auto mt-6 max-w-lg rounded-2xl border bg-card p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
          <Lock className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-2xl font-semibold">Not unlocked yet</h2>
        <p className="mt-2 text-muted-foreground">This concept builds on earlier ones. Master these first:</p>
        <ul className="mt-4 space-y-2">
          {view.buildsOn.map((b) => (
            <li key={b.slug}>
              <Link href={lessonHref(chapter, b.slug, { course })} className="font-medium text-brand-accent underline underline-offset-2">
                {b.title}
              </Link>
            </li>
          ))}
        </ul>
        {mapHref && (
          <Button asChild variant="outline" className="mt-6">
            <Link href={mapHref}>Back to the chapter</Link>
          </Button>
        )}
      </div>
    );
  }

  const answeredBefore = (student?.attempts.length ?? 0) > 0;
  const start: StartProgress = {
    streak: own?.streak ?? 0,
    toRetry: own?.to_retry ?? 0,
    mastered: own?.state === "mastered",
    reviewDue: own ? isReviewDue(own.state, own.next_review_at, Date.now()) : false,
    reviewCorrect: own?.review_correct ?? 0,
  };
  const questionsIndex = slides.findIndex((s) => s.kind === "questions");

  const place = home?.place ?? null;

  return (
    <>
      {place && home && (
        <p className="mb-3 text-sm text-muted-foreground">
          Concept {place.index} of {place.total} in{" "}
          <Link href={chapterHref(home.course, home.chapter)} className="font-medium text-brand-accent underline-offset-2 hover:underline">
            {home.chapterTitle}
          </Link>
        </p>
      )}
      {viewer.kind === "guest" && view.buildsOn.length > 0 && (
        <p className="mb-3 rounded-xl border bg-card px-4 py-3 text-sm">
          <span className="font-medium">Builds on: </span>
          {view.buildsOn.map((b, i) => (
            <span key={b.slug}>
              {i > 0 && ", "}
              <Link href={lessonHref(chapter, b.slug, { course })} className="text-brand-accent underline underline-offset-2">
                {b.title}
              </Link>
            </span>
          ))}
          . <span className="text-muted-foreground">Sign up to save progress and unlock concepts in order.</span>
        </p>
      )}
      <LessonStage
        slides={slides}
        label={`${title} lesson`}
        // A refresher always starts at the beginning: rereading is the point.
        startIndex={answeredBefore && !view.refresher ? questionsIndex : 0}
        banner={
          view.refresher && (
            <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-amber-50 px-5 py-2.5 text-sm dark:bg-amber-950/30">
              <span>
                <span className="font-semibold">Refresher</span> for {view.refresher.title}
              </span>
              <Link href={lessonHref(chapter, view.refresher.slug, { course })} className="font-medium text-brand-accent underline underline-offset-2">
                Back to {view.refresher.title}
              </Link>
            </div>
          )
        }
        questions={({ active, reread }) => (
          // Kept mounted so the current question and its feedback survive a trip back through the slides.
          <div hidden={!active} className="mx-auto mt-2 max-w-3xl md:text-lg">
            {viewer.kind === "loading" ? (
              <p className="text-muted-foreground">Loading…</p>
            ) : items.length === 0 ? (
              <p className="text-muted-foreground">Questions for this concept are on their way.</p>
            ) : (
              <QuestionPanel
                // A new viewer (progress loaded) starts the panel afresh.
                key={student ? student.userId : "guest"}
                title={title}
                chapter={chapter}
                conceptSlug={slug}
                course={course}
                mapHref={mapHref}
                items={items}
                signedIn={student !== null}
                userId={student?.userId ?? null}
                initialAttempts={student?.attempts ?? []}
                start={start}
                next={view.next}
                refresher={view.refresher}
                onReread={reread}
              />
            )}
          </div>
        )}
      />
      {place && (place.prev || place.next) && (
        <nav aria-label="Concepts in this chapter" className="mt-4 flex flex-wrap justify-between gap-3 text-sm">
          {place.prev ? (
            <Link
              href={lessonHref(place.prev.chapter, place.prev.slug, { course })}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {place.prev.title}
            </Link>
          ) : (
            <span />
          )}
          {place.next && (
            <Link
              href={lessonHref(place.next.chapter, place.next.slug, { course })}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-medium text-brand-accent hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {place.next.title}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
