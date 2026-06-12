import type { ChapterNote } from "@/app/notes/_types";

export const MICROBIOLOGY_CHAPTER: ChapterNote = {
  chapterName: "Microbiology and Disease",
  title: "Microbiology and Disease — NDA Biology",
  intro:
    "Microbiology and Disease is pure named-fact recall — 21 PYQs across 2017–2025, every one EASY or MODERATE, zero derivation. " +
    "The whole chapter rests on one skill: matching a disease to the exact organism that causes it, and knowing what KIND of organism that is (virus, bacterium, protozoan, fungus or worm). " +
    "The bank's favourite trap is the swapped pair — Malaria with Mycobacterium, TB with Plasmodium — so the pairings have to be exactly right. " +
    "The chapter teaches in three movements: " +
    "(1) Pathogens and Diseases — the master disease↔pathogen↔type table that carries most of the marks, plus how diseases spread (waterborne, viral genetic material, the platelet drop in dengue); " +
    "(2) Disease Vectors — the malaria transmission cycle and the vector-vs-pathogen distinction (female Anopheles carries, Plasmodium causes); " +
    "(3) Antibiotics and Useful Microbes — Fleming and penicillin, why antibiotics miss viruses, β-lactamase resistance, and the friendly microbes (Lactobacillus, probiotics). " +
    "13 concepts, every PYQ tagged. Most are reference tables: memorise the table, win the marks.",
  subtopicOrder: [
    "micro-pathogens-and-diseases",
    "micro-disease-vectors-malaria",
    "micro-antibiotics-discovery",
  ],
};
