"use client";

import { useCallback, useEffect, useRef } from "react";
import { sendActivity } from "@/lib/activity/clientBeacon";
import { type Visit, hide, moveTo, newVisitId, show, startVisit, takeSend } from "@/lib/learn/visit";

/**
 * Records one visit to a lesson (2026-11-25, lib/learn/visit): how far through the slides, the
 * slide left from and the time on it. A row goes when the lesson is hidden (another app or tab,
 * the phone locked: the signal phones reliably send), when the page is left, and when the lesson
 * closes (V's full-screen lesson, or another lesson opened in its place). Signed-in students only;
 * a visit while the viewer is still loading sends nothing.
 *
 * Returns the stage's `onSlide`.
 */
export function useLessonVisit({
  path,
  slides,
  questionsIndex,
  place,
  signedIn,
}: {
  path: string;
  slides: number;
  questionsIndex: number;
  place: "page" | "v";
  signedIn: boolean;
}): (index: number, begun: boolean) => void {
  const visitRef = useRef<Visit | null>(null);
  // The stage reports its first slide before this hook's effect runs (a child's effects run first).
  const lastSlide = useRef<{ index: number; begun: boolean } | null>(null);
  const signedInRef = useRef(signedIn);
  useEffect(() => {
    signedInRef.current = signedIn;
  }, [signedIn]);

  useEffect(() => {
    const visit = startVisit({ slides, questionsIndex, now: Date.now(), visible: document.visibilityState === "visible" });
    if (lastSlide.current) moveTo(visit, lastSlide.current.index, Date.now(), lastSlide.current.begun);
    visitRef.current = visit;
    const id = newVisitId();

    const send = () => {
      if (!signedInRef.current) return;
      const r = takeSend(visit, Date.now());
      if (r) sendActivity({ kind: "learn_visit", path, visit: id, place, ...r });
    };
    const leave = () => {
      hide(visit, Date.now());
      send();
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") leave();
      else show(visit, Date.now());
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", leave);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", leave);
      leave();
      visitRef.current = null;
    };
  }, [path, slides, questionsIndex, place]);

  return useCallback((index: number, begun: boolean) => {
    lastSlide.current = { index, begun };
    if (visitRef.current) moveTo(visitRef.current, index, Date.now(), begun);
  }, []);
}
