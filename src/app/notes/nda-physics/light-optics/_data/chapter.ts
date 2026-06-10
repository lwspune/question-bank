import type { ChapterNote } from "@/app/notes/_types";

export const LIGHT_OPTICS_CHAPTER: ChapterNote = {
  chapterName: "Light and Optics",
  title: "Light and Optics — NDA Physics",
  intro:
    "Light and Optics is the biggest and most diagram-heavy chapter in NDA Physics — 97 PYQs across 2017–2026, and the chapter where a single sign convention makes or breaks a numeric answer. " +
    "It teaches in six movements that follow the way light behaves when it meets a surface: " +
    "(1) Reflection and mirrors — light bouncing back: the laws of reflection, plane mirrors, and the spherical-mirror formula with its image-formation rules for concave and convex mirrors; " +
    "(2) Refraction, speed of light, and total internal reflection — light bending as it changes medium: Snell's law, refractive index as n = c/v, the critical angle, and the everyday effects (mirage, optical fibre, raised pool bottom); " +
    "(3) Lenses and the lens formula — refraction through a curved piece of glass: the lens formula, power in dioptres, the lens maker's equation, magnification, and lenses in combination; " +
    "(4) Prisms and dispersion — splitting white light: deviation through a prism and why violet bends most while red bends least, plus the rainbow; " +
    "(5) The human eye and optical instruments — the recall layer: accommodation, the defects (myopia, hypermetropia, presbyopia, cataract) and their corrections, and the microscope and telescope; " +
    "(6) Light phenomena and the spectrum — the wave layer: scattering (why the sky is blue and sunsets red), the electromagnetic spectrum ordered by wavelength, polarization, and the speed of light. " +
    "The marquee subtopic is Light Phenomena and Spectrum (29 q) — mostly recall — but the marks that separate students live in the sign-convention numerics of mirrors and lenses. " +
    "Get the sign convention right, drill the formula, learn the table, walk out with the marks.",
  subtopicOrder: [
    "opt-reflection-and-mirrors",
    "opt-refraction-and-tir",
    "opt-lenses-and-lens-formula",
    "opt-prisms-and-dispersion",
    "opt-eye-and-instruments",
    "opt-light-phenomena-and-spectrum",
  ],
};
