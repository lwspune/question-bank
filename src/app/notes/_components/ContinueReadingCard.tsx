"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { pickContinueTarget, type ContinueTarget } from "@/lib/notes/examHub";
import { fetchAllOwnProgress } from "./progressClient";

/**
 * "Continue reading" on an exam's notes hub: the subtopic this reader opened
 * last, among this exam's chapters, with how far through that chapter they are.
 *
 * A client island so the hub stays cached: it reads the reader's own rows
 * through RLS, the same way the /notes "Your notes" strip does, and asks
 * /api/notes/titles for the real names. Anonymous visitors and readers with
 * nothing to continue see nothing, not an empty card.
 */
type Titles = Record<string, { topic: string; chapter: string }>;

export default function ContinueReadingCard({
  totals,
  subjectLabels,
}: {
  /** `<subjectRoute>/<chapterSlug>` -> subtopic count, for this exam only. */
  totals: Record<string, number>;
  /** subjectRoute -> display label, e.g. "NDA Maths". */
  subjectLabels: Record<string, string>;
}) {
  const { signedIn, loading } = useSignedIn();
  const [target, setTarget] = useState<ContinueTarget | null>(null);
  const [names, setNames] = useState<{ topic: string; chapter: string } | null>(null);

  useEffect(() => {
    if (loading || !signedIn) return;
    let active = true;
    fetchAllOwnProgress()
      .then(async (rows) => {
        const t = pickContinueTarget(rows, totals);
        if (!t) return;
        const key = `${t.subjectRoute}/${t.chapterSlug}/${t.subtopicSlug}`;
        let n: { topic: string; chapter: string } | null = null;
        try {
          const res = await fetch(`/api/notes/titles?k=${encodeURIComponent(key)}`);
          const data = (await res.json()) as { ok?: boolean; titles?: Titles };
          n = data.ok ? data.titles?.[key] ?? null : null;
        } catch {
          n = null;
        }
        // No name means the subtopic is gone (renamed or retired): a card
        // pointing at it would 404, so show nothing.
        if (!active || !n) return;
        setNames(n);
        setTarget(t);
      })
      .catch(() => {
        /* the hub works without the card */
      });
    return () => {
      active = false;
    };
  }, [loading, signedIn, totals]);

  if (!target || !names) return null;
  const pct = Math.round((target.readCount / target.total) * 100);

  return (
    <section
      aria-label="Continue reading"
      className="mb-6 rounded-xl border-2 border-brand/70 bg-card p-4 shadow-sm sm:p-5"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-accent">Continue reading</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {subjectLabels[target.subjectRoute] ?? ""} · {names.chapter}
      </p>
      <p className="mt-0.5 text-base font-semibold tracking-tight sm:text-lg">{names.topic}</p>
      <div
        role="progressbar"
        aria-label={`${names.chapter}: subtopics read`}
        aria-valuemin={0}
        aria-valuemax={target.total}
        aria-valuenow={target.readCount}
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"
      >
        <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Link
          href={target.href}
          className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Continue
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <span className="text-xs text-muted-foreground">
          {target.readCount} of {target.total} subtopics read
        </span>
      </div>
    </section>
  );
}
