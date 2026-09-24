import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_LIMITS_CHAPTER: ChapterNote = {
  chapterName: "Limits",
  title: "Limits and Continuity — MHT-CET Maths",
  intro:
    "Limits is the hardest chapter in MHT-CET Maths by rate — well over half its past-year questions are HARD — and unlike most chapters it has no cheap half: " +
    "the pure limits and the continuity problems sit at the same difficulty, and about two questions a paper come from here. " +
    "The work is recognition before computation. Almost every stem is one of a short list of standard forms in disguise, and the mark is won in the first " +
    "fifteen seconds by naming the form — factor, rationalise, a trigonometric or exponential standard limit, a 1 to the power infinity — and then executing a " +
    "routine you have drilled. The continuity half is the same toolkit in a different costume: every 'find k' problem is a limit you must evaluate, then set " +
    "equal to a value. Order matters here more than in most chapters, because the continuity pages assume the limit pages are already automatic — work the " +
    "subtopics below in sequence. Every PYQ is tagged, so each block ends in the exact questions it was built from.",
  cardBlurb:
    "The hardest MHT-CET Maths chapter by rate, taught as a recognition toolkit: standard forms first, then every continuity problem as a limit in disguise.",
  subtopicOrder: [
    "cetlim-existence-and-infinity",
    "cetlim-algebraic",
    "cetlim-trigonometric",
    "cetlim-exponential-log",
    "cetlim-continuity-at-a-point",
    "cetlim-piecewise-continuity",
    "cetlim-special-functions",
  ],
};
