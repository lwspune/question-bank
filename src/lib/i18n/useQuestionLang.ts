"use client";

import { useCallback, useSyncExternalStore } from "react";
import { parseLangPref, type QuestionLang } from "./bilingual";

/**
 * The viewer's question-language choice, shared by every card on the page.
 *
 * Client-only on purpose: a language COOKIE read during server render would
 * de-cache every page that renders a question (the shell-cookie pitfall in
 * CLAUDE.md). Instead the server renders the default and the stored choice
 * applies after hydration. localStorage is a per-viewer convenience here, and
 * every read/write is guarded — private windows can throw.
 *
 * One store + a window event, so switching on one card switches them all.
 */
const KEY = "pv_question_lang";
const EVENT = "pv-question-lang";
export const DEFAULT_QUESTION_LANG: QuestionLang = "both";

// Fallback when storage throws, so a choice still holds for this page view.
let memory: QuestionLang | null = null;

function read(): QuestionLang {
  try {
    return parseLangPref(window.localStorage.getItem(KEY)) ?? memory ?? DEFAULT_QUESTION_LANG;
  } catch {
    return memory ?? DEFAULT_QUESTION_LANG;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useQuestionLang(): [QuestionLang, (lang: QuestionLang) => void] {
  const lang = useSyncExternalStore(subscribe, read, () => DEFAULT_QUESTION_LANG);
  const set = useCallback((next: QuestionLang) => {
    memory = next;
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      // Storage blocked: `memory` carries the choice for this page view.
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [lang, set];
}
