import type { ChapterNote } from "@/app/notes/_types";

export const PLANT_BIOLOGY_CHAPTER: ChapterNote = {
  chapterName: "Plant Biology",
  title: "Plant Biology — NDA Biology",
  intro:
    "Plant Biology is a 29-PYQ chapter spanning 2017–2026 — mostly EASY and MODERATE, with one HARD transpiration experiment. " +
    "Unlike pure-recall chapters, it leans 'Apply': you trace mechanisms (how water splits in photosynthesis, why a shoot grows up, which embryo part becomes the root) as much as you memorise named facts. " +
    "The chapter teaches in five movements, building from the plant's raw building blocks up to how it grows and reproduces: " +
    "(1) Plant tissues and meristems — the dividing tissues that drive growth, the simple permanent tissues (parenchyma, collenchyma, sclerenchyma), and the conducting tissues (xylem, phloem); " +
    "(2) Photosynthesis — how a leaf turns light, water and CO₂ into food and releases oxygen, plus a few high-yield crop facts; " +
    "(3) Plant processes — the photosynthesis-respiration gas link, transpiration, and tropisms (the directional growth responses); " +
    "(4) Seed, fruit and embryo development — the radicle and plumule, true vs false fruit, and the parts of the ovule; " +
    "(5) Vegetative propagation — growing new plants without seeds. " +
    "Every PYQ is tagged. Watch the mechanism questions — a few statement items reward knowing the SEQUENCE, not just a single fact.",
  subtopicOrder: [
    "plant-tissues-meristems",
    "plant-photosynthesis",
    "plant-processes",
    "plant-seed-fruit-embryo",
    "plant-vegetative-propagation",
  ],
};
