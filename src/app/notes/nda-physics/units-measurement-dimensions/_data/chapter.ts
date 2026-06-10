import type { ChapterNote } from "@/app/notes/_types";

export const UNITS_MEASUREMENT_CHAPTER: ChapterNote = {
  chapterName: "Units, Measurement and Dimensions",
  title: "Units, Measurement and Dimensions — NDA Physics",
  intro:
    "Units, Measurement and Dimensions is NDA Physics's most reliable scoring chapter — about 14 PYQs across 2017–2025, and roughly three-quarters of them are EASY one-line recall. " +
    "Almost every question reduces to a fixed fact: a light year is a unit of DISTANCE (asked four separate times), 1 dyne = 10⁻⁵ N, H stands for Henry, 1 kWh = 3.6×10⁶ J, strain is dimensionless. " +
    "The handful of MODERATE/HARD items just apply one tool — the dimensional formula [M^a L^b T^c] — to find the dimension of G or to identify an unknown quantity (thrust/impulse turns out to be frequency). " +
    "The chapter teaches in one continuous arc, all inside a single subtopic: " +
    "first the foundations (physical quantity, unit, the seven SI base units, fundamental vs derived); " +
    "then the named SI derived units (Newton, Pascal, Joule, Watt, Henry — and the fact that stress and pressure share a unit); " +
    "the special units of length/distance (light year, ångström, nanometre) and of energy/power (joule, kWh, the force-vs-energy trap); " +
    "unit-system conversion (CGS ↔ SI, the dyne); " +
    "and finally the dimensional method itself — writing dimensional formulas, spotting dimensionless quantities, identifying a quantity from its dimensions, and reading least count / precision off an instrument. " +
    "Memorise the reference tables, learn the one dimensional-analysis recipe, and this chapter is near-free marks.",
  subtopicOrder: ["umd-units-and-dimensions"],
};
