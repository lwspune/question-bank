import type { ChapterNote } from "@/app/notes/_types";

export const SPI_LIGHT_OPTICS_CHAPTER: ChapterNote = {
  chapterName: "Light and Optics",
  title: "Light and Optics: SPI Physics",
  intro:
    "Light and Optics has 16 questions in the SPI bank, eleven EASY and five MODERATE, all from sample papers and mock tests. " +
    "Most ask one fact: which mirror a car uses, which lens fixes a defect of the eye, what a prism does to white light. " +
    "The MODERATE ones ask a reason instead, such as why a lens is weaker in water or where a convex lens gives an image as far away as the object. " +
    "These pages give the facts in short tables and the reasons in a few plain rules about how light bends.",
  cardBlurb:
    "What light is, the laws of reflection, mirrors and their uses, refractive index, lenses and power, defects of the eye, dispersion and twinkling stars, and optical instruments.",
  subtopicOrder: ["spi-lo-reflection", "spi-lo-refraction", "spi-lo-eye"],
};
