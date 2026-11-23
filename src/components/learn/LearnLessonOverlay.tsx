"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Loader2, X } from "lucide-react";
import { lessonHref, parseLessonHref, type LessonTarget } from "@/lib/learn/links";
import type { RenderedSlide } from "@/lib/learn/lesson/renderDeck";
import type { Pool } from "@/lib/learn/lessonState";
import type { LessonItem } from "@/lib/learn/query";
import { type HomeWithScope, LessonClient } from "./LessonClient";

/**
 * A Learn lesson played full screen over the page (2026-11-22, owner: "open the relevant concept
 * and let Learn run as it is, full screen, in V"). V's chapter map opens one when a lesson is
 * tapped, and the stuck offer's "Teach me the idea" opens the lesson for the question's topic.
 * It is the lesson page's own LessonClient (slides, questions, progress saved), filling the
 * screen; Close (or Esc) returns to where the student was.
 *
 * Links inside the lesson stay inside it: another lesson (the next one, one it builds on) opens
 * here, a link to a chapter map closes it (V's map is the way back), any other link closes it
 * and navigates.
 */
type LessonData = {
  chapter: string;
  code: string;
  slug: string;
  title: string;
  slides: RenderedSlide[];
  items: LessonItem[];
  pool: Pool;
  homes: HomeWithScope[];
};

const loaded = new Map<string, LessonData>();
const keyOf = (t: LessonTarget) => `${t.chapter}/${t.concept}`;

export default function LearnLessonOverlay({ target: first, onClose }: { target: LessonTarget; onClose: () => void }) {
  const [target, setTarget] = useState(first);
  const key = keyOf(target);
  // A fetch's outcome, for the lesson it was for; a lesson read before comes from `loaded`.
  const [result, setResult] = useState<{ key: string; data: LessonData | null } | null>(null);
  const data = loaded.get(key) ?? (result?.key === key ? result.data : null);
  const failed = result?.key === key && result.data === null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (loaded.has(key)) return;
    let active = true;
    const [chapter, concept] = key.split("/");
    fetch(`/api/learn/lesson?${new URLSearchParams({ chapter, concept })}`)
      .then(async (res) => {
        const body = await res.json();
        if (!body.ok) throw new Error(body.error);
        loaded.set(key, body.data as LessonData);
        if (active) setResult({ key, data: body.data as LessonData });
      })
      .catch((e) => {
        console.error("learn: loading the lesson failed", key, e);
        if (active) setResult({ key, data: null });
      });
    return () => {
      active = false;
    };
  }, [key]);

  // The page behind must not scroll under the learner's swipes; focus starts on Close and goes back after.
  useEffect(() => {
    const before = document.documentElement.style.overflow;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCloseRef.current();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = before;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  function keepLinksInside(e: MouseEvent<HTMLDivElement>) {
    const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
    const href = a?.getAttribute("href");
    if (!href || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const lesson = parseLessonHref(href);
    // A lesson that did not load here goes to its own page.
    if (lesson && !failed) {
      e.preventDefault();
      setTarget({ ...lesson, course: lesson.course ?? target.course });
      return;
    }
    // A chapter map closes the lesson (V's map is the way back); anything else closes it and goes.
    if (href.startsWith("/learn") && !lesson) e.preventDefault();
    onClose();
  }

  const title = data?.title ?? "Lesson";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} lesson`}
      className="fixed inset-0 z-[80] flex h-[100dvh] w-full flex-col bg-card text-foreground"
      onClickCapture={keepLinksInside}
    >
      <div className="flex items-center gap-3 border-b px-4 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))]">
        <p className="min-w-0 flex-1 truncate font-semibold">{title}</p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Close the lesson"
        >
          <X className="h-4 w-4" aria-hidden />
          Close
        </button>
      </div>
      {!data && !failed && (
        <div className="grid flex-1 place-items-center" role="status">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-hidden />
          <span className="sr-only">Loading the lesson</span>
        </div>
      )}
      {failed && (
        <div className="grid flex-1 place-items-center px-6 text-center">
          <div>
            <p className="text-muted-foreground">This lesson did not load.</p>
            <Link href={lessonHref(target.chapter, target.concept, { course: target.course })} className="mt-2 inline-block font-medium text-brand-accent underline underline-offset-2">
              Open it on its own page
            </Link>
          </div>
        </div>
      )}
      {data && (
        <LessonClient
          // A new lesson starts afresh: its own slides, questions and progress.
          key={key}
          chapter={data.chapter}
          code={data.code}
          slug={data.slug}
          title={data.title}
          slides={data.slides}
          items={data.items}
          pool={data.pool}
          homes={data.homes}
          course={target.course}
          fill
        />
      )}
    </div>,
    document.body
  );
}
