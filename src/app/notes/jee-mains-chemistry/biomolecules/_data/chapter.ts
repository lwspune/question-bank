import type { ChapterNote } from "@/app/notes/_types";

export const JEE_CH_BIO_CHAPTER: ChapterNote = {
  chapterName: "Biomolecules",
  title: "Biomolecules — JEE Mains Chemistry",
  intro:
    "Biomolecules has 135 past-year questions from 2021 to 2026, and 16 of them ask for a number rather than an option. " +
    "It is a recall chapter: most questions name a sugar, an amino acid, an enzyme or a vitamin and ask for one exact fact about it, often as a match-the-list where one swapped pair costs the mark. " +
    "The reasoning that remains is short and repeatable: read D or L from a Fischer projection, decide whether a sugar still has a free anomeric carbon, and count peptide bonds, sequences or hydrogen bonds. " +
    "Carbohydrates, amino acids and proteins carry nearly four questions in five. NCERT's text is the reference throughout, and where a key rests on a fact outside it, the page says so.",
  subtopicOrder: [
    "jch-bio-glucose",
    "jch-bio-cyclic",
    "jch-bio-disaccharides",
    "jch-bio-amino-acids",
    "jch-bio-proteins",
    "jch-bio-enzymes-vitamins",
    "jch-bio-nucleic-acids",
  ],
};
