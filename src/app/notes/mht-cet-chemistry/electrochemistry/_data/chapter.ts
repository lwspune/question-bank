import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_ELECTROCHEMISTRY_CHAPTER: ChapterNote = {
  chapterName: "Electrochemistry",
  title: "Electrochemistry — MHT-CET Chemistry",
  intro:
    "Electrochemistry is about three questions a paper in MHT-CET Chemistry, and one in ten of its past-year questions is HARD — the highest share of any " +
    "physical-chemistry chapter here, all of it on the Nernst equation. The chapter runs on five relations: κ from the cell constant and resistance, Λ = 1000κ/c with " +
    "Kohlrausch's law, Faraday's W = ItM/nF, E°cell = E°cathode − E°anode with the Nernst correction, and ΔG° = −nFE° with its bridge to K. " +
    "The pages follow the book: conductance first, then electrolysis, then galvanic cells and their thermodynamics, then the named batteries. " +
    "The galvanic page is the largest and the one to drill until the sign of the Nernst term is automatic. Every PYQ is tagged.",
  cardBlurb:
    "Conductivity and the cell constant, molar conductivity and Kohlrausch's law, Faraday's laws, galvanic cells with the Nernst equation and ΔG°, and the named batteries — MHT-CET Electrochemistry with every past-year question tagged.",
  subtopicOrder: [
    "cetec-conductivity",
    "cetec-molar-conductivity",
    "cetec-electrolysis",
    "cetec-galvanic-cells",
    "cetec-batteries",
  ],
};
