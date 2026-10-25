/**
 * The student's choice between the Animated and the Still solution (owner,
 * 2026-10-25: animated first wherever a scene exists; still mostly helps board
 * exams). Remembered on the device, and every solution on the page follows a
 * change at once. localStorage can be missing or throw (private windows), so
 * every read falls back to "animated".
 */
import { useSyncExternalStore } from "react";

export type SolutionView = "animated" | "still";

const KEY = "qb_solution_view";
const listeners = new Set<() => void>();

function read(): SolutionView {
  try {
    return window.localStorage.getItem(KEY) === "still" ? "still" : "animated";
  } catch {
    return "animated";
  }
}

export function setSolutionView(view: SolutionView): void {
  try {
    window.localStorage.setItem(KEY, view);
  } catch {
    // Not stored; the choice still applies to this page.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useSolutionView(): [SolutionView, (v: SolutionView) => void] {
  const view = useSyncExternalStore(subscribe, read, () => "animated" as const);
  return [view, setSolutionView];
}
