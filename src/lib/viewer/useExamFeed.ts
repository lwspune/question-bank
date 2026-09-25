"use client";

import { useMemo } from "react";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { ANON_FEED, resolveExamFeed, type ExamFeed } from "@/lib/exam/examFeed";
import { useViewerSession } from "@/lib/viewer/useViewerSession";

/**
 * The viewer's exam feed, resolved in the browser (EXAM_TIER_SPEC.md §3.5).
 *
 * Returns ANON_FEED while loading and for anon. That is the load-bearing
 * property: the FIRST client render equals the server render of the cached
 * index pages (which read no identity), so hydration matches and an anonymous
 * visitor sees exactly today's page. Personalisation applies only after the
 * session arrives — the same way HeaderBar applies the exam cookie.
 *
 * Built on useViewerSession, so it shares the one `/api/me/header` request per
 * page load; anon never issues it.
 */
export function useExamFeed(): { loading: boolean; signedIn: boolean; feed: ExamFeed } {
  const { session, loading } = useViewerSession();
  const stage = session?.stage ?? null;
  const targets = session?.targetExams;
  const feed = useMemo(
    () =>
      session
        ? resolveExamFeed({ stage, targetExams: targets ?? [] }, EXAM_REGISTRY)
        : ANON_FEED,
    // Keyed on the values, not the object, so a re-fetch with the same profile
    // does not reshuffle the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [!!session, stage, (targets ?? []).join(",")]
  );
  return { loading, signedIn: !!session, feed };
}
