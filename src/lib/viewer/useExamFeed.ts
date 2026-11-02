"use client";

import { useEffect, useMemo, useState } from "react";
import { PYQVAULT_EXAMS, type ExamSlug } from "@/lib/exam/examContext";
import { chosenExamFeed, resolveExamFeed, type ExamFeed } from "@/lib/exam/examFeed";
import { readExamSlugFromCookieString } from "@/lib/exam/examNav";
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
 * A signed-out visitor who picked an exam (the `qb_exam` cookie) gets that
 * exam first too (2026-11-02), read after the first render for the same
 * hydration reason. Before, they got the plain list whatever they chose.
 *
 * Built on useViewerSession, so it shares the one `/api/me/header` request per
 * page load; anon never issues it.
 */
export function useExamFeed(): { loading: boolean; signedIn: boolean; feed: ExamFeed } {
  const { session, loading } = useViewerSession();
  const [chosen, setChosen] = useState<ExamSlug | null>(null);
  useEffect(() => {
    if (!loading && !session) setChosen(readExamSlugFromCookieString(document.cookie));
  }, [loading, session]);
  const stage = session?.stage ?? null;
  const targets = session?.targetExams;
  const feed = useMemo(
    () =>
      session
        ? resolveExamFeed({ stage, targetExams: targets ?? [] }, PYQVAULT_EXAMS)
        : chosenExamFeed(chosen, PYQVAULT_EXAMS),
    // Keyed on the values, not the object, so a re-fetch with the same profile
    // does not reshuffle the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [!!session, stage, (targets ?? []).join(","), chosen]
  );
  return { loading, signedIn: !!session, feed };
}
