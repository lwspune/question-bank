import type { ChapterNote } from "@/app/notes/_types";

export const BIOCHEMISTRY_CHAPTER: ChapterNote = {
  chapterName: "Biochemistry",
  title: "Biochemistry — NDA Biology",
  intro:
    "Biochemistry is a small chapter in NDA Biology — only a handful of EASY PYQs across 2017–2026, all pure recall about the chemistry of life. " +
    "Because the bank is thin, this chapter is built foundation-first: it teaches the topic from zero — the four classes of biomolecules, how proteins are built and folded, how cells release energy with and without oxygen, and why food goes bad — so a student (or a teacher using it as a lesson plan) gets the whole picture, not just the four questions asked. " +
    "The chapter teaches in three movements: " +
    "(1) Biomolecules and protein structure — the four building blocks of life and the four levels of protein structure; " +
    "(2) Respiration and fermentation — how cells make ATP, and what happens when oxygen runs out (alcoholic and lactic-acid fermentation); " +
    "(3) Food spoilage — rancidity of fats and enzymatic browning of cut fruit, and how to prevent both. " +
    "Learn the primary-structure definition, the yeast-fermentation products, and the oxidation behind rancidity and browning, and every PYQ here is free.",
  subtopicOrder: [
    "biochem-protein-structure",
    "biochem-respiration-fermentation",
    "biochem-food-spoilage",
  ],
};
