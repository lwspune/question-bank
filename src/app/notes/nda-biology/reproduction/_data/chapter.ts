import type { ChapterNote } from "@/app/notes/_types";

export const REPRODUCTION_CHAPTER: ChapterNote = {
  chapterName: "Reproduction",
  title: "Reproduction — NDA Biology",
  intro:
    "Reproduction is a compact but high-concept NDA Biology chapter — 13 PYQs across 2020–2026, weighted toward the 'Apply' style where you have to trace a sequence or reason about chromosome numbers, not just recall a fact. " +
    "The chapter teaches in four movements, building from why sexual reproduction exists up to the specific machinery of flowering plants and mammals: " +
    "(1) Sexual reproduction and genetic principles — why two parents and meiosis create variation, and why chromosome number stays constant across generations; " +
    "(2) Meiosis and DNA in flowering plants — where in the plant life cycle the DNA gets halved; " +
    "(3) Angiosperm reproduction — flower parts, the pollen-tube pathway, double fertilisation (the 2n + n = 3n endosperm trick), and what each flower part becomes after fertilisation; " +
    "(4) Animal and human reproduction — the male reproductive parts, the oestrus-vs-menstrual cycle, and how contraceptive pills work. " +
    "Most marks turn on two recurring shapes: getting a SEQUENCE in the right order (pollen tube; egg to seed), and reasoning about PLOIDY (haploid gametes, diploid zygote, triploid endosperm). Master those two and the chapter is yours.",
  subtopicOrder: [
    "repro-genetic-principles",
    "repro-meiosis-plants",
    "repro-angiosperm",
    "repro-animal-human",
  ],
};
