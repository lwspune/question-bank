import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_BIO_GEN_CHAPTER: ChapterNote = {
  chapterName: "Genetics and Inheritance",
  title: "Genetics and Inheritance: Crosses, Sex Linkage and Pedigrees",
  intro:
    "Genetics and Inheritance has 30 past questions since 2011, and the ministry papers from 2023 on have asked 9 of them. " +
    "The ministry papers mostly ask for meanings and facts (what an allele is, what Mendel's laws say, how X-linked recessive conditions behave), while the older papers set multi-step reasoning on crosses, gene maps and family trees. " +
    "The hard part is probability: knowing when to multiply, when to add, and which children a question is really counting. " +
    "Sex linkage is the most tested idea across all the years, so learn its rules until you can apply them without a Punnett square.",
  subtopicOrder: [
    "imat-gen-basics",
    "imat-gen-crosses",
    "imat-gen-dominance",
    "imat-gen-sex-linkage",
    "imat-gen-linkage",
    "imat-gen-pedigrees",
  ],
};
