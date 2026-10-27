"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isReviewDue } from "@/lib/learn/engine/review";
import { lessonHref } from "@/lib/learn/links";

type Row = { chapter: string; code: string; slug: string; title: string; state: string; next_review_at: string | null };

/** A signed-in student's concepts due for spaced review (learn_my_progress, migration 0191). */
export function ReviewList() {
  const [state, setState] = useState<{ kind: "loading" } | { kind: "guest" } | { kind: "error" } | { kind: "ready"; due: Row[]; mastered: number }>({
    kind: "loading",
  });

  useEffect(() => {
    let active = true;
    fetch("/api/learn/progress")
      .then(async (res) => {
        if (!active) return;
        if (res.status === 401) return setState({ kind: "guest" });
        const body = await res.json();
        if (!body.ok) throw new Error(body.error);
        const rows = body.data.progress as Row[];
        const now = Date.now();
        setState({
          kind: "ready",
          due: rows.filter((r) => isReviewDue(r.state, r.next_review_at, now)),
          mastered: rows.filter((r) => r.state === "mastered").length,
        });
      })
      .catch((e) => {
        console.error("learn: loading reviews failed", e);
        if (active) setState({ kind: "error" });
      });
    return () => {
      active = false;
    };
  }, []);

  if (state.kind === "loading") return <p className="text-muted-foreground">Loading…</p>;
  if (state.kind === "error") return <p className="text-muted-foreground">Your reviews didn&apos;t load. Reload the page to try again.</p>;
  if (state.kind === "guest") {
    return (
      <div className="rounded-2xl border bg-card p-6">
        <p className="font-semibold">Reviews are for saved progress</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign up free and every concept you master comes back for a short review after 1, 3, 7, 14 and 30 days.
        </p>
        <Button asChild variant="brand" className="mt-4">
          <Link href={`/signup?next=${encodeURIComponent("/learn/review")}`}>Sign up</Link>
        </Button>
      </div>
    );
  }
  if (state.due.length === 0) {
    return (
      <p className="rounded-2xl border bg-card p-6 text-muted-foreground">
        {state.mastered === 0
          ? "Nothing to review yet. Master a concept and it comes back here for a short review the next day."
          : "Nothing is due today. Each concept you've mastered comes back when its review is due."}
      </p>
    );
  }
  return (
    <ul className="space-y-3">
      {state.due.map((r) => (
        <li key={`${r.chapter}/${r.code}`}>
          <Link
            href={lessonHref(r.chapter, r.slug)}
            className="flex items-center gap-4 rounded-2xl border bg-card p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200" aria-hidden="true">
              <RotateCcw className="h-4 w-4" />
            </span>
            <span className="font-semibold text-foreground">{r.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
