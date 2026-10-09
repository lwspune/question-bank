import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_PHY_OSW_CHAPTER: ChapterNote = {
  chapterName: "Oscillations and Waves",
  title: "Oscillations and Waves: SHM, Sound and Light Waves",
  intro:
    "Oscillations and Waves has 6 past questions since 2011, and the ministry papers from 2023 on have asked 3 of them. " +
    "So far almost all of them are about simple harmonic motion and pendulums, either as a short calculation or as a statement to judge true or false. " +
    "Sound, the electromagnetic spectrum and interference are core syllabus that has barely been tested, and the newest question, on coherence, suggests that is changing. " +
    "The hard part is precision about what stays fixed: where the speed is zero, what friction does, and which quantity keeps its value when a wave changes medium.",
  subtopicOrder: ["imat-osw-shm", "imat-osw-waves-sound", "imat-osw-behaviour"],
};
