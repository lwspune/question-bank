/**
 * The student's choice between the Animated and the Still solution (owner,
 * 2026-10-25: animated first wherever a scene exists; still mostly helps board
 * exams). Each solution keeps its OWN choice (owner, 2026-10-26: a page-wide
 * switch flipped every other open solution too). The device remembers the last
 * choice only as the starting view of a solution opened later. localStorage
 * can be missing or throw (private windows), so every read falls back to
 * "animated".
 */
import { useEffect, useState } from "react";

export type SolutionView = "animated" | "still";

const KEY = "qb_solution_view";

export function readSolutionView(): SolutionView {
  try {
    return window.localStorage.getItem(KEY) === "still" ? "still" : "animated";
  } catch {
    return "animated";
  }
}

export function rememberSolutionView(view: SolutionView): void {
  try {
    window.localStorage.setItem(KEY, view);
  } catch {
    // Not stored; the choice still applies to this solution.
  }
}

export function useSolutionView(): [SolutionView, (v: SolutionView) => void] {
  // "animated" on the server and the first client render, so hydration matches;
  // the remembered choice is applied once mounted.
  const [view, setView] = useState<SolutionView>("animated");
  useEffect(() => setView(readSolutionView()), []);
  const choose = (v: SolutionView) => {
    setView(v);
    rememberSolutionView(v);
  };
  return [view, choose];
}
