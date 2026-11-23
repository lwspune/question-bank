import { describe, expect, it } from "vitest";
import { learnRows, pickTopicLesson, planLearn, type LearnChapter, type LearnLessonRow } from "@/lib/chat/learnLesson";
import type { Outline } from "@/lib/learn/lessonState";
import type { ChapterMiss } from "@/lib/chat/chapterOverview";

const row = (slug: string, topics: string[], state: LearnLessonRow["state"] = null, right = 0): LearnLessonRow => ({
  chapter: "matrices",
  slug,
  title: slug.replace(/-/g, " "),
  oneLiner: `${slug} in one line`,
  topics,
  state,
  right,
});

/** CBSE Matrices: 6 lessons over 5 topics (two lessons share "Multiplication"). */
const matrices = (states: Partial<Record<string, [LearnLessonRow["state"], number]>> = {}, signedIn = true): LearnChapter => ({
  course: "cbse-12-maths",
  courseChapter: "matrices",
  title: "Matrices",
  signedIn,
  needed: 3,
  lessons: [
    ["types", "Order and Types of Matrices"],
    ["adding", "Addition and Scalar Multiplication"],
    ["multiplying", "Multiplication of Matrices"],
    ["properties", "Multiplication of Matrices"],
    ["transpose", "Transpose of a Matrix"],
    ["symmetric", "Symmetric and Skew-Symmetric Matrices"],
  ].map(([slug, topic]) => row(slug, [topic], states[slug]?.[0] ?? null, states[slug]?.[1] ?? 0)),
});

const miss = (subtopic: string, day: number, id = `q-${subtopic}-${day}`): ChapterMiss => ({ questionId: id, subtopic, lastWrongAt: `2026-11-${String(day).padStart(2, "0")}T10:00:00Z` });

describe("planLearn: where the lesson starts", () => {
  it("at the first lesson not yet done in the topic holding most mistakes", () => {
    const p = planLearn(
      matrices({ multiplying: ["mastered", 3] }),
      [miss("Multiplication of Matrices", 1), miss("Multiplication of Matrices", 2), miss("Transpose of a Matrix", 3)],
      null
    );
    expect(p.current).toBe(4); // "properties": the multiplication topic's first lesson not done
    expect(p.parts.find((x) => x.n === 4)!.missed).toBe(2);
    // The count sits on the start row only, never spread over the topic's other lessons.
    expect(p.parts.filter((x) => x.missed > 0).map((x) => x.n)).toEqual([4]);
  });

  it("with every lesson of that topic done, at its first lesson", () => {
    const p = planLearn(matrices({ multiplying: ["mastered", 3], properties: ["mastered", 3] }), [miss("Multiplication of Matrices", 1)], null);
    expect(p.current).toBe(3);
  });

  it("with no mistakes (or none known), at the first lesson not yet done", () => {
    expect(planLearn(matrices({ types: ["mastered", 3] }), [], null).current).toBe(2);
    expect(planLearn(matrices({ types: ["mastered", 3] }), null, null).current).toBe(2);
  });

  it("a tie between topics goes to the earlier lesson", () => {
    const p = planLearn(matrices(), [miss("Transpose of a Matrix", 1), miss("Addition and Scalar Multiplication", 2)], null);
    expect(p.current).toBe(2);
  });

  it("mistakes in a topic no lesson covers start at the first lesson not done", () => {
    expect(planLearn(matrices(), [miss("Equality of Matrices", 1)], null).current).toBe(1);
  });

  it("a lesson asked for by number is taught, whatever the mistakes", () => {
    const p = planLearn(matrices(), [miss("Multiplication of Matrices", 1)], 5);
    expect(p.current).toBe(5);
    expect(p.asked).toBe(true);
  });

  it("an asked number past the end is ignored", () => {
    expect(planLearn(matrices(), [], 9).current).toBe(1);
  });
});

describe("planLearn: Go on's order", () => {
  it("walks on from the start, then wraps to the lessons before it, skipping lessons done", () => {
    const p = planLearn(matrices({ symmetric: ["mastered", 3], types: ["mastered", 3] }), [miss("Multiplication of Matrices", 1)], null);
    expect(p.current).toBe(3);
    expect(p.order).toEqual([3, 4, 5, 2]);
  });

  it("with every lesson done, every lesson in turn", () => {
    const all = Object.fromEntries(["types", "adding", "multiplying", "properties", "transpose", "symmetric"].map((s) => [s, ["mastered", 3]])) as Record<string, [LearnLessonRow["state"], number]>;
    expect(planLearn(matrices(all), [], null).order).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe("planLearn: progress on each row", () => {
  it("signed in: Done, n of 3, or New", () => {
    const p = planLearn(matrices({ types: ["mastered", 3], adding: ["learning", 1], multiplying: ["learning", 7] }), [], null);
    expect(p.parts.map((x) => x.progress)).toEqual(["done", { right: 1, of: 3 }, { right: 3, of: 3 }, "new", "new", "new"]);
  });

  it("signed out: none, since nothing is saved", () => {
    expect(planLearn(matrices({}, false), null, null).parts.every((x) => x.progress === null)).toBe(true);
  });

  it("each row links its Learn lesson, with the course", () => {
    expect(planLearn(matrices(), [], null).parts[2].href).toBe("/learn/lesson/matrices/multiplying?course=cbse-12-maths");
  });
});

describe("planLearn: the mistake worked as V's example", () => {
  it("the latest in the start lesson's topic", () => {
    const p = planLearn(matrices(), [miss("Multiplication of Matrices", 1, "a"), miss("Multiplication of Matrices", 5, "b"), miss("Transpose of a Matrix", 9, "c")], null);
    expect(p.exampleMiss?.questionId).toBe("b");
    expect(p.exampleInLesson).toBe(true);
  });

  it("with none in the lesson, the latest anywhere, unless a lesson was asked for", () => {
    expect(planLearn(matrices(), [miss("Equality of Matrices", 4, "e")], null).exampleMiss?.questionId).toBe("e");
    expect(planLearn(matrices(), [miss("Equality of Matrices", 4, "e")], 2).exampleMiss).toBeNull();
  });
});

describe("learnRows: a Learn chapter's lessons for V", () => {
  const outline: Outline = {
    slug: "cbse-12-maths",
    title: "CBSE Class 12 Maths",
    exam: "cbse-12",
    subject: "maths",
    standard: 12,
    chapters: [
      {
        slug: "integrals",
        title: "Integrals",
        standard: 12,
        pyqvault: null,
        parts: [
          { chapter: "integrals", concepts: ["C01", "C02"] },
          { chapter: "integrals", concepts: ["C03", "C04"] },
        ],
      },
    ],
    pools: {
      integrals: {
        title: "Integrals",
        concepts: [
          { code: "C01", slug: "antiderivatives", title: "Antiderivatives", one_liner: "a", grp: "g", tier: "core", prereqs: [], published: true },
          { code: "C02", slug: "draft-one", title: "Draft", one_liner: "b", grp: "g", tier: "core", prereqs: [], published: false },
          { code: "C03", slug: "fundamental-theorem", title: "Fundamental theorem", one_liner: "c", grp: "g", tier: "core", prereqs: [], published: true },
          { code: "C04", slug: "king-property", title: "King property", one_liner: "d", grp: "g", tier: "core", prereqs: [], published: true },
        ],
      },
    },
  };

  it("every published lesson in order, with its topics and the student's progress", () => {
    const rows = learnRows(outline, { course: "cbse-12-maths", chapter: "integrals" }, new Map([["integrals/fundamental-theorem", { state: "learning", streak: 2 }]]));
    expect(rows.map((r) => r.slug)).toEqual(["antiderivatives", "fundamental-theorem", "king-property"]);
    expect(rows[0].topics).toEqual(["Integration as the Inverse of Differentiation"]);
    expect(rows[1]).toMatchObject({ state: "learning", right: 2 });
  });

  it("a link naming parts keeps only those parts", () => {
    const rows = learnRows(outline, { course: "cbse-12-maths", chapter: "integrals", parts: [2] }, new Map());
    expect(rows.map((r) => r.slug)).toEqual(["fundamental-theorem", "king-property"]);
  });

  it("an unknown chapter gives no rows", () => {
    expect(learnRows(outline, { course: "cbse-12-maths", chapter: "nope" }, new Map())).toEqual([]);
  });
});

// The stuck offer's "Teach me the idea" opens ONE Learn lesson (2026-11-22, owner): the lesson
// filed under the question's topic, the first the student has not mastered.
describe("pickTopicLesson", () => {
  it("the topic's only lesson", () => {
    expect(pickTopicLesson(matrices().lessons, "Transpose of a Matrix")?.slug).toBe("transpose");
  });

  it("of a topic's several lessons, the first not mastered; all mastered, the first", () => {
    expect(pickTopicLesson(matrices().lessons, "Multiplication of Matrices")?.slug).toBe("multiplying");
    expect(pickTopicLesson(matrices({ multiplying: ["mastered", 3] }).lessons, "Multiplication of Matrices")?.slug).toBe("properties");
    expect(pickTopicLesson(matrices({ multiplying: ["mastered", 3], properties: ["mastered", 3] }).lessons, "Multiplication of Matrices")?.slug).toBe("multiplying");
  });

  it("matches the topic by letters and digits, and is null when no lesson is filed under it", () => {
    expect(pickTopicLesson(matrices().lessons, "transpose of a matrix ")?.slug).toBe("transpose");
    expect(pickTopicLesson(matrices().lessons, "Determinants")).toBeNull();
  });
});
