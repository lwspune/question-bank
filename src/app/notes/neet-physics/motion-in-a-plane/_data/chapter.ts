import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_MP_CHAPTER: ChapterNote = {
  chapterName: "Motion in a Plane",
  title: "Motion in a Plane: NEET Physics",
  intro:
    "Motion in a Plane has 6 past-year questions in NEET Physics, from 2021 to 2024: 2 EASY, 3 MODERATE and 1 HARD. " +
    "NEET 2021 asked it twice and NEET 2022, 2023, 2024 and Re-NEET 2024 once each; NEET 2025, NEET 2026 and Re-NEET 2026 did not ask it. " +
    "None of the six has a figure. Four are about projectiles and two about circles, and every one turns on the same idea: a velocity is a vector, so split it into parts and handle each part on its own. " +
    "Marks are lost on small slips: taking the speed at the top of the path as zero, using an angle given from the vertical as if it were from the horizontal, or pointing the acceleration on a circle outward. " +
    "Work through the pages in order, from adding vectors to going round a circle.",
  cardBlurb:
    "Adding and resolving vectors, dot and cross products, relative velocity, projectile motion with its height, range and time of flight, and uniform circular motion with angular speed and centripetal acceleration.",
  subtopicOrder: ["nph-mp-projectile", "nph-mp-circular"],
};
