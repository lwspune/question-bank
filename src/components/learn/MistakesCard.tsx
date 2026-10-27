"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Target } from "lucide-react";
import { chapterHref } from "@/lib/learn/links";

type Miss = { slug: string; title: string; misses: number };

/**
 * "From your mistakes" (migration 0192): the course chapters where the signed-in student has
 * questions still wrong anywhere in PYQ Vault, most first, each leading to its lessons. The one
 * thing Learn can do only because it lives inside PYQ Vault. Renders nothing for a guest or a
 * student with no open mistakes in this course.
 *
 * `chapter` narrows it to one chapter (the chapter page's line).
 */
export function MistakesCard({ course, chapter }: { course: string; chapter?: string }) {
  const [misses, setMisses] = useState<Miss[] | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/learn/misses?${new URLSearchParams({ course })}`)
      .then(async (res) => {
        if (!active || res.status === 401) return;
        const body = await res.json();
        if (!body.ok) throw new Error(body.error);
        setMisses(body.data as Miss[]);
      })
      .catch((e) => console.error("learn: loading mistakes failed", e));
    return () => {
      active = false;
    };
  }, [course]);

  if (!misses) return null;
  if (chapter) {
    const here = misses.find((m) => m.slug === chapter);
    if (!here) return null;
    return (
      <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
        <Target className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          You have <strong>{here.misses}</strong> {here.misses === 1 ? "question" : "questions"} in {here.title} still wrong from your practice and
          tests. These lessons teach the ideas behind them.
        </span>
      </p>
    );
  }
  if (misses.length === 0) return null;
  return (
    <section aria-label="From your mistakes" className="mt-5 rounded-2xl border bg-card p-5">
      <h2 className="flex items-center gap-2 font-semibold text-foreground">
        <Target className="h-4 w-4 text-amber-600" aria-hidden="true" />
        From your mistakes
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Chapters where questions you practised or sat in tests are still wrong. Learn the ideas behind them.
      </p>
      <ul className="mt-3 divide-y">
        {misses.slice(0, 3).map((m) => (
          <li key={m.slug}>
            <Link
              href={chapterHref(course, m.slug)}
              className="group flex items-center gap-3 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="min-w-0 flex-1 font-medium text-foreground">{m.title}</span>
              <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-amber-900 dark:bg-amber-900/50 dark:text-amber-100">
                {m.misses} still wrong
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
