import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_PLANE_CHAPTER: ChapterNote = {
  chapterName: "Motion in a Plane",
  title: "Motion in a Plane — JEE Mains Physics",
  intro:
    "Motion in a Plane has 151 past-year questions from 2021 to 2026, and 36 of them ask for a number rather than an option. " +
    "Almost all of them come down to splitting a vector into two perpendicular parts: x and y for a projectile, across and along for a river, towards the centre and along the path for a circle. " +
    "Projectiles and circular motion each take about a third of the bank, and the circular third leans on forces as much as on kinematics, because friction, a string or a spring has to supply mv²/r. " +
    "Marks are lost on sin 2θ written for sin²θ, on an angle quoted against the wrong axis, and on a speed taken as zero at the top of a path where it is not.",
  subtopicOrder: [
    "jph-plane-vectors",
    "jph-plane-relative",
    "jph-plane-projectile",
    "jph-plane-trajectory",
    "jph-plane-ucm",
    "jph-plane-dynamics",
  ],
};
