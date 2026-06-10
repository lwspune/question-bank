import type { ChapterNote } from "@/app/notes/_types";

export const FLUID_MECHANICS_CHAPTER: ChapterNote = {
  chapterName: "Fluid Mechanics and Properties of Matter",
  title: "Fluid Mechanics and Properties of Matter — NDA Physics",
  intro:
    "Fluid Mechanics is the toughest chapter in NDA Physics — about 23 PYQs across 2017–2026 and the bank's highest HARD share (~30%). " +
    "It rewards a clean grasp of two foundations and one famous principle. " +
    "It teaches in two movements that follow the physics: " +
    "(1) Pressure and Surface Tension — what pressure is (force per unit area), how it grows with depth in a liquid (P = rho g h), Pascal's transmission of pressure through an enclosed fluid (the hydraulic press), the difference between gauge and absolute pressure, and surface tension (the skin of a liquid, capillary rise, and how it falls as temperature rises); " +
    "(2) Buoyancy, Density and Flotation — density and relative density first (the make-or-break foundation), then Archimedes' principle (the upthrust equals the weight of displaced fluid), why things float or sink (compare densities), how to combine densities by mixing equal volumes versus equal masses, apparent weight loss when submerged, and the stability of a floating body (centre of gravity, centre of buoyancy, metacentre). " +
    "The single biggest pool is flotation and density (16 q) — nail the density comparison and Archimedes, and you own most of the chapter's hardest marks. " +
    "Drill the formula, re-derive every step, walk out with the marks.",
  subtopicOrder: ["flu-pressure-surface-tension", "flu-buoyancy-density-flotation"],
};
