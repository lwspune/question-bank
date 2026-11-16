import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_RM_CHAPTER: ChapterNote = {
  chapterName: "System of Particles and Rotational Motion",
  title: "System of Particles and Rotational Motion: NEET Physics",
  intro:
    "System of Particles and Rotational Motion has 19 past-year questions in NEET Physics, from 2021 to 2026: 5 EASY, 9 MODERATE and 5 HARD. " +
    "Every one of the eight papers asked it, one to four times each. " +
    "Moment of inertia is the heart of the chapter: eight of the 19 questions use it, at least one every year, and four of those need the parallel axis theorem. " +
    "Eight come with a figure, so read the figure for the axis before you pick a formula. " +
    "The steps are short, so marks go on small slips: rpm left unconverted, the ratio of moments of inertia given where the ratio of radii of gyration was asked, or the parallel axis theorem used from an axis that does not pass through the centre of mass. " +
    "Work through the pages in order, from the centre of mass to a wheel rolling down a slope.",
  cardBlurb:
    "Centre of mass and momentum, torque and the balance of a rigid body, moment of inertia with the radius of gyration and the axis theorems, rotational kinematics, angular momentum and rolling.",
  subtopicOrder: ["nph-rm-com", "nph-rm-torque", "nph-rm-inertia", "nph-rm-rotation"],
};
