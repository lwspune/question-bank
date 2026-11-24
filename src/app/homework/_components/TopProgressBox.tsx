"use client";

/**
 * A signed-in student's progress through a plan's Top 10 PYQs (2026-11-24,
 * owner): the "Your progress" box on the plan's front page, naming the next
 * chapter to work on. The page is cached and shared, so this fills in from
 * /api/homework/progress?view=top in the browser; signed out, before anything
 * in the plan's Top 10s is marked, or on any failure it renders nothing and
 * the page is as it was. Rules: lib/homework/topProgress.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSignedIn } from "@/components/auth/useSignedIn";
import {
  topProgressAction,
  topProgressDetail,
  topProgressHeadline,
  type TopProgress,
} from "@/lib/homework/topProgress";
import { daysHref, topChapterHref } from "@/lib/homework/links";
import { drillHref } from "@/lib/drill/from";

export default function TopProgressBox({ planSlug }: { planSlug: string }) {
  const { signedIn } = useSignedIn();
  const [p, setP] = useState<TopProgress | null>(null);

  useEffect(() => {
    if (!signedIn) return;
    let active = true;
    fetch(`/api/homework/progress?plan=${encodeURIComponent(planSlug)}&view=top`, { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<{ top: TopProgress }>) : null))
      .then((body) => {
        if (active && body?.top.started) setP(body.top);
      })
      .catch(() => {
        /* progress is extra: the page works without it */
      });
    return () => {
      active = false;
    };
  }, [signedIn, planSlug]);

  if (!p) return null;
  const detail = topProgressDetail(p);
  const href = p.next ? topChapterHref(planSlug, p.next.slug) : daysHref(planSlug);

  return (
    <section
      aria-labelledby="top-progress"
      className="mt-6 rounded-lg border border-brand-accent bg-card p-4 motion-safe:animate-fade-in-up sm:p-5"
    >
      <h2 id="top-progress" className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
        Your progress
      </h2>
      <p className="mt-2 text-base font-semibold text-foreground">{topProgressHeadline(p)}</p>
      {detail && <p className="mt-1 text-sm text-muted-foreground">{detail}</p>}
      <Link
        href={href}
        prefetch={false}
        className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-brand-foreground hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
      >
        {topProgressAction(p)}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      {p.toReview > 0 && (
        <p className="mt-3 text-sm">
          <Link
            href={drillHref("homework")}
            prefetch={false}
            className="font-medium text-amber-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-amber-300"
          >
            {p.toReview} of these Top 10 {p.toReview === 1 ? "questions is" : "questions are"} waiting in Fix your
            mistakes
          </Link>
        </p>
      )}
    </section>
  );
}
