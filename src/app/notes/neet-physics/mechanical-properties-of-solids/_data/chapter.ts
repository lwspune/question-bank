import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_SO_CHAPTER: ChapterNote = {
  chapterName: "Mechanical Properties of Solids",
  title: "Mechanical Properties of Solids: NEET Physics",
  intro:
    "Mechanical Properties of Solids has 5 past-year questions in NEET Physics, from 2022 to 2026: 1 EASY and 4 MODERATE. " +
    "NEET 2022, 2023 and 2026 asked it once each and NEET 2024 twice; NEET 2021, 2025, Re-NEET 2024 and Re-NEET 2026 did not ask it. " +
    "Every question rests on one idea: a modulus is a stress divided by the strain it causes. " +
    "Three need a line of arithmetic (a stress, a stretch up to the elastic limit, the force in a heated bar that cannot expand) and two test the definitions themselves. " +
    "Marks are lost on small slips: an extension scaled by the diameter instead of its square, compressibility mixed up with the bulk modulus, or the area left out when a stress is turned into a force.",
  cardBlurb:
    "Stress, strain and Hooke's law, Young's modulus and the elastic limit, thermal stress, the shear and bulk moduli and Poisson's ratio, and the stress-strain curve of real materials.",
  subtopicOrder: ["nph-so-young", "nph-so-moduli"],
};
