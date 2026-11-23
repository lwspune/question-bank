"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * A localStorage value as an external store, for the /play games (2026-11-17).
 * The server snapshot is `undefined`, so every cached page is the same HTML for
 * everyone and the saved progress appears once the browser has read it.
 * Storage that throws (a private window, blocked site data) reads as nothing
 * and a write is dropped: the game still plays, it just does not remember.
 */
const listeners = new Map<string, Set<() => void>>();

export function readLocal(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeLocal(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* blocked storage: nothing is remembered, the game still plays */
  }
  listeners.get(key)?.forEach((cb) => cb());
}

/** The raw saved string: undefined until the browser has read it, null when nothing is saved. */
export function useLocalStore(key: string): string | null | undefined {
  const subscribe = useCallback(
    (cb: () => void) => {
      const set = listeners.get(key) ?? new Set();
      set.add(cb);
      listeners.set(key, set);
      window.addEventListener("storage", cb);
      return () => {
        set.delete(cb);
        window.removeEventListener("storage", cb);
      };
    },
    [key]
  );
  return useSyncExternalStore(
    subscribe,
    () => readLocal(key),
    () => undefined
  );
}
