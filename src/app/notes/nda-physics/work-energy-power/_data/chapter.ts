import type { ChapterNote } from "@/app/notes/_types";

export const WORK_ENERGY_POWER_CHAPTER: ChapterNote = {
  chapterName: "Work, Energy and Power",
  title: "Work, Energy and Power — NDA Physics",
  intro:
    "Work, Energy and Power is a steady, formula-light scorer in NDA Physics — 23 PYQs across 2017–2026, almost all EASY and MODERATE with only a couple of HARD outliers. " +
    "The chapter teaches in four progressive movements that follow the physics itself: " +
    "(1) Work — the foundation: work is force times displacement times the cosine of the angle between them, which is why pushing perpendicular to motion does zero work and pulling against motion does negative work; " +
    "(2) Energy and conservation — kinetic energy (½mv²), gravitational potential energy (mgh), and the conservation law that lets a falling body trade one for the other; " +
    "(3) Work-energy theorem and power — net work equals the change in kinetic energy, plus power as the rate of doing work (P = W/t = Fv) and its commercial unit, the kilowatt-hour; " +
    "(4) Simple machines — the levers, where the mechanical advantage trick is the second-class-lever recall question the NDA recycles. " +
    "The recurring traps are sign-of-work (perpendicular = zero, anti-parallel = negative), the watt-vs-joule unit confusion, and conservative-vs-non-conservative forces. " +
    "Drill the formula, drill the sign rule, walk out with the marks.",
  subtopicOrder: [
    "wep-work-and-work-done",
    "wep-energy-and-conservation",
    "wep-work-energy-theorem-and-power",
    "wep-simple-machines",
  ],
};
