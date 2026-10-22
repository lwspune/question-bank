import type { ChapterNote } from "@/app/notes/_types";

export const SPI_FLUIDS_MATTER_CHAPTER: ChapterNote = {
  chapterName: "Fluid Mechanics and Properties of Matter",
  title: "Fluids and Properties of Matter: SPI Physics",
  intro:
    "Fluid Mechanics and Properties of Matter has 7 questions in the SPI bank, one of them from the 2022 paper. " +
    "Two are EASY, four MODERATE and one HARD. " +
    "Nearly every question uses one of two ideas: pressure is force over area, and a liquid pushes up with the weight of the liquid a body displaces. " +
    "The marks are lost on units (g/cm³ against kg/m³) and on forgetting a load, so the worked examples carry every unit through.",
  cardBlurb:
    "Thrust and pressure, pressure under a liquid and at a depth, density and relative density, Archimedes' principle and how much a floating raft can carry.",
  subtopicOrder: ["spi-fl-pressure", "spi-fl-buoyancy"],
};
