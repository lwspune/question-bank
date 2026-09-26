import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_ROTATIONAL_CHAPTER: ChapterNote = {
  chapterName: "Rotational Dynamics",
  title: "Rotational Dynamics — MHT-CET Physics",
  intro:
    "Rotational Dynamics has 128 past-year questions in the MHT-CET bank, about one in five HARD, and nearly half of those HARD ones sit on a single page — the axis theorems, applied to bodies built from parts. " +
    "The chapter starts with circular motion: how a body moves on a circle, and what force keeps it there. " +
    "Then it turns to a rigid body that rotates — its moment of inertia, the two axis theorems, torque and angular momentum, and rolling. " +
    "Most answers here are ratios, so the standard results (MR², MR²/2, 2MR²/5, ML²/12) and the factor 1 + k²/R² are worth knowing without thinking. Every PYQ is tagged.",
  cardBlurb:
    "Circular motion (angular kinematics, banking, the vertical circle), moment of inertia and radius of gyration, the parallel and perpendicular axis theorems, torque and angular momentum, and rolling — MHT-CET Rotational Dynamics with every past-year question tagged.",
  subtopicOrder: [
    "cetp-circular-kinematics",
    "cetp-circular-dynamics",
    "cetp-moment-of-inertia",
    "cetp-axis-theorems",
    "cetp-angular-momentum",
    "cetp-rolling",
  ],
};
