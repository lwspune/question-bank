import type { ChapterNote } from "@/app/notes/_types";

export const CDS_PH_MODERN_CHAPTER: ChapterNote = {
  chapterName: "Modern Physics",
  title: "Modern Physics: CDS Physics",
  intro:
    "Modern Physics has 15 past-year questions in CDS General Knowledge, from 2016 (II) to 2026 (II): 4 EASY, 10 MODERATE and 1 HARD. " +
    "Almost all of them are recall: what X-rays are and what they do, what each kind of decay changes, how fission differs from fusion. " +
    "One fact has been asked three times: X-rays carry no charge, so neither an electric nor a magnetic field bends them. " +
    "Learn the particle table and the decay table exactly; the only sum asked so far turns a photon's momentum into its energy.",
  cardBlurb:
    "Photon energy and momentum, the atomic clock, X-rays and their uses, subatomic particles, radioactive decay and fallout, and fission and fusion.",
  subtopicOrder: ["cdsph-mo-photons", "cdsph-mo-nuclei"],
};
