import type { ChapterNote } from "@/app/notes/_types";

export const LOGARITHMS_CHAPTER: ChapterNote = {
  chapterName: "Logarithms",
  title: "Logarithms — NDA Maths",
  intro:
    "Logarithms is a small but reliable scorer: 27 PYQs span 2017–2026, mostly EASY/MODERATE, with a handful of HARD " +
    "that hinge on one clever identity rather than heavy algebra. Almost every question reduces to a tiny toolkit — the " +
    "three laws (product, quotient, power), the change-of-base rule and its reciprocal twin, and the discipline of " +
    "checking the domain. The notes teach in two movements, foundations first: " +
    "(1) Identities, Change of Base & Sums — what a logarithm IS, the laws that split and combine logs, the change-of-base " +
    "rule that powers the recurring 1/log_k N telescoping sums, the sign and minimum-value questions, and logs sitting inside " +
    "an AP/GP; " +
    "(2) Solving Logarithmic Equations & Applications — taking the log of an exponential equation, the substitution " +
    "t = aˣ that turns a log equation into a quadratic, the domain checks that decide how many solutions survive, the " +
    "GP / chain-rule / AM-GM 'can never equal' conditions, and the trailing-zeros application. " +
    "The single highest-yield idea is change of base — internalise log_b a = (log a)/(log b) and its consequence " +
    "1/log_a b = log_b a, and a third of the chapter becomes one-liners. Every PYQ is tagged.",
  subtopicOrder: ["log-identities-change-of-base-sums", "log-solving-equations-applications"],
};
