import type { ChapterNote } from "@/app/notes/_types";

export const CDS_PH_SOUND_CHAPTER: ChapterNote = {
  chapterName: "Sound",
  title: "Sound: CDS Physics",
  intro:
    "Sound has 18 past-year questions in CDS General Knowledge, from 2016 (II) to 2026 (I): 8 EASY, 10 MODERATE and none HARD. " +
    "The 2023 papers alone asked five of them. " +
    "Five are short sums on the wave equation or the echo rule, each two lines of working. " +
    "The rest ask what kind of wave sound is, what it travels fastest in, and what pitch depends on. " +
    "Start with waves in general, because sound is one case of them, then learn the speed table and the three characteristics of a sound.",
  cardBlurb:
    "Longitudinal and transverse waves, the wave equation, the speed of sound in different media, pitch and loudness, echoes, and ultrasound.",
  subtopicOrder: ["cdsph-so-waves", "cdsph-so-hearing"],
};
