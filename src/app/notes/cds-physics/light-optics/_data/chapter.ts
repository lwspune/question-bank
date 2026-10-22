import type { ChapterNote } from "@/app/notes/_types";

export const CDS_PH_LIGHT_CHAPTER: ChapterNote = {
  chapterName: "Light and Optics",
  title: "Light and Optics: CDS Physics",
  intro:
    "Light and Optics has 42 past-year questions in CDS General Knowledge, from 2016 (II) to 2026 (II): 20 EASY, 20 MODERATE and 2 HARD. " +
    "Only Electricity and Magnetism has more in CDS Physics, and the two 2020 sittings alone asked 11 of these. " +
    "Most items test one rule: which way a ray bends, where a convex lens puts its image, which radiation has the shorter wavelength. " +
    "The few sums are one line with the mirror formula, the lens formula or n = c/v. " +
    "Learn the image table for the convex lens and the order of the spectrum by heart, and keep refraction (twinkling) apart from scattering (the red Sun).",
  cardBlurb:
    "Shadows and reflection, plane and curved mirrors, refraction and total internal reflection, lenses and power, the spectrum, rainbows and scattering, and the eye.",
  subtopicOrder: ["cdsph-li-mirrors", "cdsph-li-lenses", "cdsph-li-spectrum", "cdsph-li-eye"],
};
