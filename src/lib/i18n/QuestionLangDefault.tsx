"use client";

import { createContext, type ReactNode } from "react";
import type { QuestionLang } from "./bilingual";

/**
 * The language this page's questions open in before the reader chooses one:
 * the exam's `defaultLang` (registry), passed down by a page that knows its
 * exam. Null (no provider) leaves the language rule in `defaultLangFor`.
 *
 * A context rather than a prop because the question components sit many
 * levels below the page (/browse cards, the /board reader, the mock runner and
 * review), and only the page knows the exam. It is a SERVER-known value, so
 * the server renders the same default the client starts from: no cookie, and
 * the page stays cacheable.
 */
export const QuestionLangDefaultContext = createContext<QuestionLang | null>(null);

export function QuestionLangDefaultProvider({ value, children }: { value: QuestionLang | null; children: ReactNode }) {
  return <QuestionLangDefaultContext.Provider value={value}>{children}</QuestionLangDefaultContext.Provider>;
}
