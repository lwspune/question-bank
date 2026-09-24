import type { ChapterNote } from "@/app/notes/_types";

export const INDEFINITE_INTEGRATION_CHAPTER: ChapterNote = {
  chapterName: "Indefinite Integration",
  title: "Indefinite Integration — MHT-CET Maths",
  // Deliberately does NOT enumerate the six subtopics. They render as cards
  // directly below this hero, each with its own one-line definition and a LIVE
  // PYQ count — so a prose list of them is the same information twice, and the
  // prose copy is the one that goes stale (this intro read "121 PYQs" from
  // 2026-06-30 to 2026-09-20 while the card beneath it printed 159). Keep here
  // only what the cards cannot say: how dense the chapter is, what kind of work
  // it demands, and that the order matters. See NOTES_WORKFLOW.md step 1.
  intro:
    "Indefinite Integration is one of the densest MHT-CET Maths chapters — 162 PYQs across 2021–2025, " +
    "and among its hardest, with about half of them rated HARD. It is pure technique: there is no theory " +
    "to memorise, only a toolbox of methods and the judgement to pick the right one. " +
    "Work the six subtopics below in order — each one rests on the tools laid down before it, and the two " +
    "trigonometric blocks lean on the partial-fraction machinery that precedes them. " +
    "Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  subtopicOrder: [
    "fundamentals",
    "substitution",
    "trigonometric-integrals-powers",
    "rational-and-partial-fractions",
    "trigonometric-integrals-rational",
    "integration-by-parts",
  ],
};
