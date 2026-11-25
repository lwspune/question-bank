import type { ChapterNote } from "@/app/notes/_types";

export const CB_PH_WO_CHAPTER: ChapterNote = {
  chapterName: "Wave Optics",
  title: "Wave Optics: CBSE Class 12 Physics",
  intro:
    "Wave Optics has 140 questions in this bank: every example and exercise in the NCERT chapter, and CBSE's board papers from 2022 to 2026. " +
    "One hundred and twenty-eight were set in board papers, and more than half of those are on Young's double-slit experiment. " +
    "Three derivations come back again and again: Snell's law and the law of reflection from Huygens' construction, and the resultant intensity of two coherent waves. " +
    "Around them come fringe-width numericals, the point where the fringes of two colours first coincide, single-slit minima and maxima, and two differences between interference and diffraction. " +
    "Marks go to the steps: a labelled wavefront diagram, the path-difference condition, the formula, the substitution in metres and the answer with its unit. " +
    "The rationalised NCERT book dropped some older material, so a few board questions go beyond it; each page says which, so you can give them less time. " +
    "Start with wavefronts, because every later page builds on them.",
  cardBlurb:
    "Wavefronts and Huygens' principle, Snell's law and the law of reflection from Huygens' construction, Young's double-slit fringes and their intensity, single-slit diffraction, and polaroids with Malus' law.",
  subtopicOrder: [
    "cbp-wo-huygens",
    "cbp-wo-refraction",
    "cbp-wo-interference",
    "cbp-wo-diffraction",
    "cbp-wo-polarisation",
  ],
};
