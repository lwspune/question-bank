import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_DEFINITE_INTEGRATION_CHAPTER: ChapterNote = {
  chapterName: "Definite Integration",
  title: "Definite Integration — MHT-CET Maths",
  intro:
    "Definite Integration in MHT-CET Maths is two chapters wearing one name. The first is a grind: evaluate the integral, which means every technique from " +
    "Indefinite Integration with limits attached, and it is where the HARD questions live. The second is recognition: nearly two-thirds of the past-year " +
    "questions are built so that the direct antiderivative is long or impossible, and the whole mark is won by spotting a property — an odd integrand over " +
    "symmetric limits, King's substitution, a modulus or greatest-integer function that must be split — in the first fifteen seconds. Work the pages below " +
    "in order: the two evaluation pages first, because the property pages assume you can finish an integral once the property has reduced it, and the " +
    "property pages last, because they are where the time is saved. Every PYQ is tagged.",
  cardBlurb:
    "Evaluation with limits, then the three properties — symmetry, King's substitution, modulus and greatest-integer splitting — that turn a long MHT-CET integral into a two-line answer.",
  subtopicOrder: [
    "cetdi-evaluation-and-substitution",
    "cetdi-trigonometric-integrals",
    "cetdi-odd-even-symmetry",
    "cetdi-kings-property",
    "cetdi-modulus-and-greatest-integer",
  ],
};
