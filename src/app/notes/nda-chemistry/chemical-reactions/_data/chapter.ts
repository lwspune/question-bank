import type { ChapterNote } from "@/app/notes/_types";

export const CHEMICAL_REACTIONS_CHAPTER: ChapterNote = {
  chapterName: "Chemical Reactions",
  title: "Chemical Reactions — NDA Chemistry",
  intro:
    "Chemical Reactions is the most reasoning-heavy chapter in NDA Chemistry — 30 PYQs across 2017–2026 with the highest share of HARD questions, almost all of them carried by redox. " +
    "The bank rarely asks you to balance an equation; it asks you to CLASSIFY a reaction (combination / decomposition / displacement), to track oxidation numbers up and down, or to spot the one statement that is false. " +
    "The chapter teaches in six movements, building from what a reaction even is up to the redox reasoning that earns the hard marks: " +
    "(1) Physical vs chemical changes — the line between melting ice and burning magnesium, the test the bank uses; " +
    "(2) Types of reactions — combination, decomposition, displacement and double displacement, with the match-list questions the bank loves; " +
    "(3) Thermal and photochemical decomposition — which oxides break on heating, which salts break in sunlight, and the states of the products; " +
    "(4) Redox — oxidation numbers, oxidising and reducing agents, the activity series, and the 'which is NOT a redox reaction' trap (this is the HARD pocket — read it twice); " +
    "(5) Specific reactions of daily life — lime water, tarnishing silver, electrolytic refining, hydrogen evolution; " +
    "(6) Endothermic and exothermic reactions — which way the heat flows and how to tell from the equation. " +
    "16 concepts, every PYQ tagged. The win is reasoning, not memorisation: learn to assign an oxidation number and the redox marks fall out.",
  subtopicOrder: [
    "rxn-physical-chemical",
    "rxn-types",
    "rxn-decomposition",
    "rxn-redox",
    "rxn-specific",
    "rxn-thermochemistry",
  ],
};
