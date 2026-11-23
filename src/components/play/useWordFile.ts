"use client";

import { useEffect, useState } from "react";
import { parseWordFile, type WordEntry } from "@/lib/play/words/extract";

/**
 * Daily Word's word file (built by `npm run play:words`, served from
 * public/data), fetched once per page view and shared by every component that
 * asks for it.
 */
export const DAILY_WORDS_URL = "/data/play-daily-words.json";

type State = { status: "loading" } | { status: "ready"; words: WordEntry[] } | { status: "error" };

const cache = new Map<string, Promise<WordEntry[]>>();

function load(url: string): Promise<WordEntry[]> {
  let p = cache.get(url);
  if (!p) {
    p = fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`word file ${r.status}`);
        return r.json();
      })
      .then((json: unknown) => {
        const words = parseWordFile(json);
        if (!words || words.length === 0) throw new Error("word file unreadable");
        return words;
      });
    // A failed load is retried on the next mount, not cached.
    p.catch(() => cache.delete(url));
    cache.set(url, p);
  }
  return p;
}

export function useWordFile(url: string): State {
  const [state, setState] = useState<State>({ status: "loading" });
  useEffect(() => {
    let live = true;
    load(url).then(
      (words) => live && setState({ status: "ready", words }),
      (e: unknown) => {
        console.error("play word file", e);
        if (live) setState({ status: "error" });
      }
    );
    return () => {
      live = false;
    };
  }, [url]);
  return state;
}
