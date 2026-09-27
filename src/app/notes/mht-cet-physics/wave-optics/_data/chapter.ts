import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_WAVE_OPTICS_CHAPTER: ChapterNote = {
  chapterName: "Wave Optics",
  title: "Wave Optics — MHT-CET Physics",
  intro:
    "Wave Optics has 117 past-year questions in the MHT-CET bank, about one in five HARD, and more than half of them are Young's double-slit experiment in one form or another. " +
    "The chapter rests on a few relations: the fringe width λD/d, the fringe positions nβ and (n − ½)β, the intensity 4I₀cos²(φ/2) with φ = 2πΔx/λ, the single-slit minima a sin θ = nλ, and Malus' and Brewster's laws. " +
    "The pages start with wavefronts and coherence, spend two pages on the double slit — where the fringes are, then how bright they are — and finish with single-slit diffraction and polarisation. Every PYQ is tagged.",
  cardBlurb:
    "Wavefronts and coherent sources, Young's double slit (fringe width, fringe positions, sheet shifts), interference intensity, single-slit diffraction and resolving power, and polarisation — MHT-CET Wave Optics with every past-year question tagged.",
  subtopicOrder: [
    "cetp-wavefronts",
    "cetp-ydse-fringes",
    "cetp-interference-intensity",
    "cetp-diffraction",
    "cetp-polarisation",
  ],
};
