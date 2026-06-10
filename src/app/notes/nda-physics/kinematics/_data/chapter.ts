import type { ChapterNote } from "@/app/notes/_types";

export const KINEMATICS_CHAPTER: ChapterNote = {
  chapterName: "Kinematics and Motion",
  title: "Kinematics and Motion — NDA Physics",
  intro:
    "Kinematics is the description of motion — position, displacement, velocity, and acceleration — without yet asking what causes it. " +
    "It is a steady NDA earner (about a quarter of its questions are HARD), and the marks split cleanly into four movements: " +
    "(1) Foundations — the scalar/vector distinction, distance versus displacement, speed versus velocity, and the position-vector form r(t); " +
    "(2) Equations of motion and graphs — the three uniform-acceleration equations (v = u + at, s = ut + ½at², v² = u² + 2as), the distance-in-the-nth-second rule, and how to read a motion graph (slope = acceleration, area = displacement); " +
    "(3) Projectile and vertical motion — straight-up throws and horizontal projectiles, treating the vertical and horizontal motions independently; " +
    "(4) Circular motion — constant speed but changing velocity, and centripetal acceleration v²/r. " +
    "Most marks come from plugging numbers into the three equations correctly and from not confusing a vector with its magnitude. Drill the formulas, watch the signs, walk out with the marks.",
  subtopicOrder: [
    "kin-foundations",
    "kin-equations-and-graphs",
    "kin-projectile",
    "kin-circular",
  ],
};
