/**
 * Sample data for the homepage's product previews (2026-11-09): the product's
 * own screens (a mock result, Review, the map, Home) rendered with a made-up
 * student, never a real one. Typed with the real data types, so a screen that
 * changes shape breaks the build here instead of drifting on the homepage.
 * The numbers agree across screens (23 waiting on Review is 23 on Home);
 * tests/home-previews.test.ts holds that.
 */
import { buildResultHeadline } from "@/lib/mocks/resultHeadline";
import { labelFor, type Band, type BandCounts, type MapDot, type MapTile } from "@/lib/performance/masteryMap";
import type { FixList } from "@/lib/review/fixList";
import type { Pulse } from "@/lib/pulse/cache";

/**
 * A JEE Main paper: 75 questions, +4 / -1, three subjects of 100 marks. Every
 * question answered, so the result prints no "left unanswered" line (its live
 * copy carries an em dash, which the homepage must not show).
 */
const score = { questions: 75, correct: 50, wrong: 25, skipped: 0, score: 175, maxScore: 300 };
export const SCORE_SAMPLE = {
  ...score,
  headline: buildResultHeadline(score),
  sections: [
    { key: "physics", label: "Physics", score: 68, maxScore: 100 },
    { key: "chemistry", label: "Chemistry", score: 60, maxScore: 100 },
    { key: "mathematics", label: "Mathematics", score: 47, maxScore: 100 },
  ],
  delta: 18,
  elapsed: "2 h 41 m of 3 h",
};

const fixChapter = (name: string, place: string, wrong: number, reviewLater: number, vUnclear: number) => ({
  chapterId: `sample-${name.toLowerCase().replace(/[^a-z]+/g, "-")}`,
  name,
  place,
  count: wrong + reviewLater + vUnclear,
  wrong,
  reviewLater,
  vUnclear,
  inPlan: 0,
});

/** Review's To fix list: 23 waiting, most first. */
export const FIX_SAMPLE: FixList = {
  total: 23,
  inPlan: 0,
  chapters: [
    fixChapter("Trigonometry", "Mathematics · NDA", 4, 2, 0),
    fixChapter("Probability", "Mathematics · NDA", 3, 0, 2),
    fixChapter("Matrices and Determinants", "Mathematics · NDA", 4, 0, 0),
    fixChapter("Electrostatics", "Physics · NDA", 2, 1, 0),
    fixChapter("Spotting Errors", "English · NDA", 3, 0, 0),
    fixChapter("Vocabulary", "English · NDA", 0, 2, 0),
  ],
};

const ACCURACY: Record<Band, number | null> = { mastered: 82, mid: 61, weak: 38, unknown: null };

function tile(chapter: string, subtopics: [string, Band][], fromPapers: number, fromPractice: number): MapTile {
  const dots: MapDot[] = subtopics.map(([subtopic, band]) => ({
    subtopic,
    band,
    accuracy: ACCURACY[band],
    judged: band === "unknown" ? 0 : 6,
    href: "/browse",
  }));
  const counts: BandCounts = { weak: 0, mid: 0, mastered: 0, unknown: 0 };
  for (const d of dots) counts[d.band] += 1;
  return { chapter, dots, counts, label: labelFor(counts), href: "/browse", fromPapers, fromPractice };
}

/** NDA Mathematics on the mastery map, weakest chapters first. */
export const MAP_SAMPLE: MapTile[] = [
  tile("Probability", [["Classical probability", "weak"], ["Conditional probability", "weak"], ["Bayes' theorem", "mid"], ["Binomial distribution", "unknown"]], 14, 9),
  tile("Trigonometry", [["Ratios and identities", "mastered"], ["Compound angles", "mid"], ["Heights and distances", "weak"], ["Trigonometric equations", "mastered"], ["Inverse functions", "unknown"]], 22, 11),
  tile("Matrices and Determinants", [["Types of matrices", "mastered"], ["Determinants", "mid"], ["Inverse of a matrix", "weak"], ["Systems of equations", "unknown"]], 12, 4),
  tile("Calculus", [["Limits", "mastered"], ["Derivatives", "mid"], ["Integrals", "mid"], ["Area under curves", "unknown"]], 18, 6),
  tile("Algebra", [["Quadratic equations", "mastered"], ["Sequences and series", "mastered"], ["Binomial theorem", "mastered"], ["Complex numbers", "mid"]], 26, 15),
  tile("Vectors", [["Dot product", "mastered"], ["Cross product", "mastered"], ["Lines in 3D", "unknown"]], 9, 3),
];

/** Home's pulse: the same 23 waiting, the same three weakest chapters. */
export const PULSE_SAMPLE: Pulse = {
  due: FIX_SAMPLE.total,
  week: { done: 3, goal: 5 },
  exam: null,
  totals: null,
  weak: FIX_SAMPLE.chapters.slice(0, 3).map((c) => ({ chapterId: c.chapterId, name: c.name, place: c.place, due: c.count })),
};
