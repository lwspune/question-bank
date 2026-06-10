import type { ChapterNote } from "@/app/notes/_types";

export const GRAVITATION_CHAPTER: ChapterNote = {
  chapterName: "Gravitation",
  title: "Gravitation — NDA Physics",
  intro:
    "Gravitation is the universal pull every mass exerts on every other mass — the force that holds you to the ground, keeps the Moon in orbit, and shapes the solar system. " +
    "For the NDA it is a compact, formula-driven earner that splits into three movements: " +
    "(1) Newton's Law of Gravitation — the inverse-square law F = Gm₁m₂/r², the universal constant G, and the action-reaction nature of the force; " +
    "(2) Gravitational Field and Potential — surface gravity g = GM/R², how g depends on a planet's mass, radius and density, the field-versus-potential distinction, and weightlessness in orbit; " +
    "(3) Orbits, Kepler and Escape — Kepler's third law T² ∝ a³, orbital and escape speeds, and what actually keeps a satellite up. " +
    "Almost every mark comes from one of a handful of formulas and from scaling them correctly when a planet's mass, radius or density is changed by a factor. Learn the formulas, track the powers, and the marks follow.",
  subtopicOrder: [
    "grav-newtons-law",
    "grav-field-and-potential",
    "grav-orbits-kepler-escape",
  ],
};
