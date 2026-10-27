"use client";

import { useEffect, useState } from "react";
import type { ConceptProgress, LearnerState } from "@/lib/learn/lessonState";

/** One row of `learn_my_progress` (migration 0191). */
export type ProgressRow = {
  chapter: string;
  code: string;
  slug: string;
  title: string;
  state: LearnerState;
  streak: number;
  to_retry: number;
  review_correct: number;
  next_review_at: string | null;
  updated_at: string | null;
};

export type LearnProgress =
  | { kind: "loading" }
  | { kind: "guest" }
  | { kind: "error" }
  | { kind: "student"; rows: ProgressRow[]; learner: Map<string, ConceptProgress> };

/**
 * The signed-in student's own Learn progress for these lesson chapters (all of them when omitted),
 * read from /api/learn/progress after the cached page loads. A guest gets 401 and stays a guest.
 * `learner` is keyed `<lesson chapter>/<concept code>`, the key lessonState reads.
 */
export function useLearnProgress(chapters?: string[]): LearnProgress {
  const [state, setState] = useState<LearnProgress>({ kind: "loading" });
  const key = chapters?.join(",") ?? "";

  useEffect(() => {
    let active = true;
    const q = key ? `?${new URLSearchParams({ chapters: key })}` : "";
    fetch(`/api/learn/progress${q}`)
      .then(async (res) => {
        if (!active) return;
        if (res.status === 401) return setState({ kind: "guest" });
        const body = await res.json();
        if (!body.ok) throw new Error(body.error);
        const rows = body.data.progress as ProgressRow[];
        setState({
          kind: "student",
          rows,
          learner: new Map(rows.map((r) => [`${r.chapter}/${r.code}`, { state: r.state, nextReviewAt: r.next_review_at, updatedAt: r.updated_at }])),
        });
      })
      .catch((e) => {
        console.error("learn: loading progress failed", e);
        if (active) setState({ kind: "error" });
      });
    return () => {
      active = false;
    };
  }, [key]);

  return state;
}
