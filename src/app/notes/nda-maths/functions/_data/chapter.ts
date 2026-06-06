import type { ChapterNote } from "@/app/notes/_types";

export const FUNCTIONS_CHAPTER: ChapterNote = {
  chapterName: "Functions",
  title: "Functions — NDA Mathematics",
  intro:
    "Functions is a reliable scoring chapter in NDA Mathematics — around 109 past-year questions " +
    "across 2017–2026, roughly five or six marks on a typical paper, and only about one in ten is HARD. " +
    "Most of it is bread-and-butter: read off a domain, find a range, test even/odd or periodicity, " +
    "compose two functions, invert one. The marks are lost not to difficulty but to a handful of " +
    "standard traps — forgetting a denominator restriction, assuming f∘g = g∘f, or mishandling the " +
    "floor function near integers. Work the five notes below in order — first what a function is and " +
    "how to classify it, then domain/range and the standard properties, then composition and inverse, " +
    "then the greatest-integer function, and finally functional equations — and the bank turns into " +
    "careful rule-application.",
  subtopicOrder: [
    "funcs-definition-classification",
    "funcs-domain-range-properties",
    "funcs-composition-inverse",
    "funcs-greatest-integer",
    "funcs-functional-equations",
  ],
};
