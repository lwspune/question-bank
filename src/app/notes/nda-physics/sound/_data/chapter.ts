import type { ChapterNote } from "@/app/notes/_types";

export const SOUND_CHAPTER: ChapterNote = {
  chapterName: "Sound",
  title: "Sound — NDA Physics",
  intro:
    "Sound is NDA Physics's lowest-HARD chapter — 34 PYQs across 2017–2025, almost entirely EASY and MODERATE. " +
    "The chapter teaches in four progressive movements: " +
    "(1) **Foundations** — what sound IS (mechanical, longitudinal, needs medium), how we PERCEIVE it (pitch, loudness, quality), and the ear chain that does the conversion (cochlea = biological mic); " +
    "(2) **Wave equation, speed, and bands** — v = fλ, why speed depends on the medium alone, and the named frequency bands (infrasonic, audible, ultrasonic) plus the Mach scale; " +
    "(3) **Sound behaviours** — reflection (echo + reverberation), interference (beats), and the canonical properties checklist with the polarization trap; " +
    "(4) **Applications** — SONAR + bats + medical imaging, electronic transducers (microphone, loudspeaker, piezoelectric), and musical instruments. " +
    "13 concepts, every PYQ tagged — drill the table, drill the formula, walk out with the marks.",
  subtopicOrder: [
    "foundations",
    "wave-equation-and-bands",
    "sound-behaviours",
    "applications",
  ],
};
