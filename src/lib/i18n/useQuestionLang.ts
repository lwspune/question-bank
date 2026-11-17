"use client";

import { useCallback, useContext, useSyncExternalStore } from "react";
import { defaultLangFor, parseLangPref, type AltLang, type QuestionLang } from "./bilingual";
import { QuestionLangDefaultContext } from "./QuestionLangDefault";

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
 * `alt` is the page's (or question's) second language: until the viewer
 * chooses, it decides the default (defaultLangFor: Hindi pages open in
 * English, Marathi pages in both), unless the page's exam names its own
 * (QuestionLangDefaultProvider: UP Board opens in Hindi).
 */
const KEY = "pv_question_lang";
const EVENT = "pv-question-lang";

// Fallback when storage throws, so a choice still holds for this page view.
let memory: QuestionLang | null = null;

function stored(): QuestionLang | null {
  try {
    return parseLangPref(window.localStorage.getItem(KEY)) ?? memory;
  } catch {
    return memory;
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

export function useQuestionLang(alt?: AltLang | null): [QuestionLang, (lang: QuestionLang) => void] {
  const fallback = defaultLangFor(alt, useContext(QuestionLangDefaultContext));
  const read = useCallback(() => stored() ?? fallback, [fallback]);
  const lang = useSyncExternalStore(subscribe, read, () => fallback);
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
