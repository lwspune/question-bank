/**
 * V's chapter_overview tool (2026-11-21): a student asked V "bro can you teach a
 * certain chapter i am really bad at vectors", then "teach each type and at which
 * it is applied". V had no tool for a whole chapter: find_chapters linked 334
 * questions, explain_concept searched "vectors types and their applications",
 * found nothing, and V said our notes did not match, while the MHT-CET Vectors
 * notes chapter (6 parts, 59 cards) was live. This tool returns the chapter's
 * parts in teaching order, from its notes, so V can map the chapter and start.
 * Pure core: src/lib/chat/chapterOverview.ts.
 */
import { describe, it, expect } from "vitest";
import {
  chapterMissesOf,
  chapterOverviewTool,
  formatChapterOverview,
  notesChapterIndex,
  type ChapterMiss,
  type NotesChapterRef,
  type NotesChapterParts,
  type TryArgs,
} from "@/lib/chat/chapterOverview";
import type { VLesson } from "@/lib/chat/lesson";
import type { LearnChapter } from "@/lib/chat/learnLesson";
import type { ChapterSearchRow } from "@/lib/chat/chapterSearch";
import type { DueQuestion } from "@/lib/drill/select";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { NOTES_CHAPTER_INDEX } from "@/lib/chat/notesChapters.generated";

const row = (over: Partial<ChapterSearchRow>): ChapterSearchRow => ({
  examSlug: "mht-cet",
  examName: "MHT-CET",
  subjectSlug: "maths",
  subjectName: "Mathematics",
  chapterSlug: "vectors",
  chapterName: "Vectors",
  questionCount: 334,
  practiceOnly: false,
  subtopicNames: ["Dot Product, Angle, and Perpendicularity", "Cross Product, Angle, and Area"],
  ...over,
});

const ROWS: ChapterSearchRow[] = [
  row({}),
  row({ examSlug: "nda", examName: "NDA", questionCount: 410 }),
  row({
    examSlug: "mh-hsc-12",
    examName: "Maharashtra HSC Class 12",
    subjectSlug: "chemistry",
    subjectName: "Chemistry",
    chapterSlug: "solid-state",
    chapterName: "Solid State",
    questionCount: 120,
    subtopicNames: ["Unit Cells", "Packing Efficiency", "Defects"],
  }),
];

const VECTORS_REF: NotesChapterRef = {
  key: "mht-cet-maths/vectors",
  examName: "MHT-CET",
  chapterName: "Vectors",
  slugs: ["magnitude-unit-vectors", "dot-product"],
};

const VECTORS_PARTS: NotesChapterParts = {
  "dot-product": { title: "Dot Product, Angle, and Perpendicularity", oneLineDefinition: "a·b gives the angle; zero means perpendicular." },
  "magnitude-unit-vectors": { title: "Magnitude, Components, and Unit Vectors", oneLineDefinition: "Length of a vector and its direction." },
};

function setup(opts: { page?: { examName: string; subjectName?: string } | null; parts?: NotesChapterParts | null } = {}) {
  const paths: string[] = [];
  const loaded: string[] = [];
  const tool = chapterOverviewTool({
    loadChapters: async () => ROWS,
    notesIndex: [VECTORS_REF],
    loadNotesChapter: async (key) => {
      loaded.push(key);
      return opts.parts === undefined ? VECTORS_PARTS : opts.parts;
    },
    page: opts.page === undefined ? null : opts.page,
    onPaths: (p) => paths.push(...p),
  });
  return { tool, paths, loaded };
}

describe("chapterOverviewTool", () => {
  it("gives the chapter's notes parts in TEACHING order, each with what it is and its page", async () => {
    const { tool, paths } = setup();
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toContain("MHT-CET | Mathematics | Vectors (334 q)");
    expect(out).toContain("/notes/mht-cet-maths/vectors");
    // slugs order, not the loaded object's key order
    const first = out.indexOf("Magnitude, Components, and Unit Vectors");
    const second = out.indexOf("Dot Product, Angle, and Perpendicularity");
    expect(first).toBeGreaterThan(-1);
    expect(second).toBeGreaterThan(first);
    expect(out).toContain("zero means perpendicular");
    expect(paths).toEqual(
      expect.arrayContaining([
        "/notes/mht-cet-maths/vectors",
        "/notes/mht-cet-maths/vectors/magnitude-unit-vectors",
        "/notes/mht-cet-maths/vectors/dot-product",
        "/questions/mht-cet/maths/vectors",
      ])
    );
  });

  // 2026-11-27 (owner, from a screenshot of V choosing part 4 and teaching it): a notes chapter works
  // the way a Learn chapter does. The map is the reply, the student taps a part, its notes open in a
  // panel over V. V writes one line and teaches nothing: the notes teach.
  it("a notes chapter: the map is the reply, the student picks a part, V writes one line and teaches nothing", async () => {
    const { tool } = setup();
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toMatch(/card ABOVE your reply/);
    expect(out).toMatch(/tapping a part on the card opens its notes/i);
    expect(out).toMatch(/write one short line only/i);
    expect(out).toMatch(/part 1, Magnitude, Components, and Unit Vectors, is the one to begin with/i);
    expect(out).toMatch(/do not teach the part or work an example/i);
    // 2026-11-21 (owner's phone): V wrote the map as a list, the notes as a raw path, and asked
    // "Shall we move on to part 2?" with nothing to tap.
    expect(out).toMatch(/do not list the parts/i);
    expect(out).toMatch(/do not write a path/i);
    expect(out).toMatch(/do not write a question/i);
    // It had also called my_progress for nothing.
    expect(out).toMatch(/do not call my_progress/i);
    expect(out).not.toMatch(/card under your reply/i);
    expect(out).not.toMatch(/two or three short lines|example of your own/i);
  });

  it("uses the page's exam when V names none", async () => {
    const { tool, loaded } = setup({ page: { examName: "MHT-CET", subjectName: "Mathematics" } });
    const out = await tool.run({ chapter: "vectors" });
    expect(out).toContain("MHT-CET | Mathematics | Vectors");
    expect(loaded).toEqual(["mht-cet-maths/vectors"]);
  });

  it("with no exam and the chapter in several exams, asks V to ask which exam, naming them", async () => {
    const { tool, paths, loaded } = setup();
    const out = await tool.run({ chapter: "vectors" });
    expect(out).toMatch(/ask which exam/i);
    expect(out).toContain("MHT-CET");
    expect(out).toContain("NDA");
    expect(loaded).toEqual([]);
    expect(paths).toEqual([]);
  });

  it("a chapter with no notes gives its topics and the questions page, and lets V outline them from what it knows", async () => {
    const { tool, paths } = setup();
    const out = await tool.run({ chapter: "solid state", exam: "MH HSC 12" });
    expect(out).toContain("Maharashtra HSC Class 12 | Chemistry | Solid State");
    expect(out).toMatch(/no notes/i);
    expect(out).toContain("Unit Cells");
    expect(out).toContain("Packing Efficiency");
    expect(out).toMatch(/general/i);
    // No notes to open: V still teaches the topic itself, as before 2026-11-27.
    expect(out).toMatch(/two or three short lines/i);
    expect(out).toMatch(/card under your reply/i);
    expect(paths).toEqual(["/questions/mh-hsc-12/chemistry/solid-state"]);
  });

  it("a notes chapter that cannot be read falls back to the chapter's topics, never to 'not found'", async () => {
    const { tool, paths } = setup({ parts: null });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toContain("Dot Product, Angle, and Perpendicularity");
    expect(out).not.toMatch(/no chapter matched/i);
    // The notes exist: still linked, never called missing.
    expect(out).toContain("/notes/mht-cet-maths/vectors");
    expect(out).not.toMatch(/no notes/i);
    expect(paths).toContain("/notes/mht-cet-maths/vectors");
  });

  it("nothing matched: says so and points V at find_chapters' advice", async () => {
    const { tool } = setup();
    expect(await tool.run({ chapter: "quantum chromodynamics", exam: "MHT-CET" })).toMatch(/no chapter matched/i);
  });

  it("no chapter words: asks V to ask which chapter", async () => {
    const { tool } = setup();
    expect(await tool.run({ chapter: "  " })).toMatch(/which chapter/i);
  });
});

/**
 * Starting from the student's own mistakes (2026-11-21, owner-approved mockup B): the
 * mistakes are the Fix list's waiting ones (lib/drill), so V and /me's "Your weak spots"
 * count the same thing. A notes part is matched to a mistake by the part's bank subtopic
 * name (SubtopicNote.subtopicName).
 *
 * 2026-11-27 (owner): on a notes chapter the STUDENT picks the part, as on a Learn
 * chapter. The mistakes mark the map and suggest a part; V no longer starts teaching
 * one. Each part carries its own Your turn, shown after its notes panel closes.
 */
describe("chapter_overview from the student's mistakes", () => {
  const PARTS: NotesChapterParts = {
    "magnitude-unit-vectors": { ...VECTORS_PARTS["magnitude-unit-vectors"], subtopicName: "Magnitude and Unit Vectors" },
    "dot-product": { ...VECTORS_PARTS["dot-product"], subtopicName: "Dot Product, Angle, and Perpendicularity" },
  };
  const miss = (subtopic: string, id: string, at: string): ChapterMiss => ({ subtopic, questionId: id, lastWrongAt: at });

  function withMisses(opts: {
    misses?: readonly ChapterMiss[] | Error | null;
    /** What the own-mistake reader returns for a list of ids: the first the card can grade; null = none can. */
    own?: string | null | ((ids: readonly string[]) => string | null);
    parts?: NotesChapterParts | null;
    /** undefined = no try reader (signed out); null = the reader finds none. */
    tryId?: string | null | ((args: TryArgs) => string | null);
  }) {
    const asked: { hits: ChapterSearchRow[]; own: string[][]; tries: TryArgs[] } = { hits: [], own: [], tries: [] };
    const lessons: VLesson[] = [];
    const tool = chapterOverviewTool({
      loadChapters: async () => ROWS,
      notesIndex: [VECTORS_REF],
      loadNotesChapter: async () => (opts.parts === undefined ? PARTS : opts.parts),
      page: null,
      onPaths: () => {},
      loadMisses:
        opts.misses === null
          ? null
          : async (hit) => {
              asked.hits.push(hit);
              if (opts.misses instanceof Error) throw opts.misses;
              return opts.misses ?? [];
            },
      loadOwnTry: async (ids) => {
        asked.own.push([...ids]);
        return typeof opts.own === "function" ? opts.own(ids) : (opts.own ?? null);
      },
      loadTryId:
        opts.tryId === undefined
          ? null
          : async (args) => {
              asked.tries.push(args);
              return typeof opts.tryId === "function" ? opts.tryId(args) : (opts.tryId ?? null);
            },
      onLesson: (l) => lessons.push(l),
    });
    return { tool, asked, lessons };
  }

  const DOT = "Dot Product, Angle, and Perpendicularity";
  const MAG = "Magnitude and Unit Vectors";

  it("counts the waiting mistakes and points V at the part holding most, not part 1", async () => {
    const { tool, asked } = withMisses({
      misses: [miss(DOT, "q1", "2026-11-20T10:00:00Z"), miss(DOT, "q2", "2026-11-21T09:00:00Z"), miss(MAG, "q3", "2026-11-19T09:00:00Z")],
    });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(asked.hits.map((h) => h.examName)).toEqual(["MHT-CET"]);
    expect(out).toMatch(/has 3 mistakes waiting in this chapter \(their Fix list\), 2 of them in part 2/);
    expect(out).toMatch(/say that part 2, Dot Product, Angle, and Perpendicularity, has 2 of their mistakes/);
  });

  it("a tie goes to the earlier part in teaching order", async () => {
    const { tool } = withMisses({ misses: [miss(DOT, "q1", "2026-11-21T10:00:00Z"), miss(MAG, "q2", "2026-11-20T10:00:00Z")] });
    expect(await tool.run({ chapter: "vectors", exam: "MHT-CET" })).toMatch(/part 1, Magnitude, Components, and Unit Vectors, has 1 of their mistakes/);
  });

  it("matches a mistake to its part whatever the case or spacing of the subtopic name", async () => {
    const { tool } = withMisses({ misses: [miss("  dot product, angle, and perpendicularity ", "q1", "2026-11-21T10:00:00Z")] });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    // One mistake reads as one (the live smoke printed "1 mistakes").
    expect(out).toMatch(/has 1 mistake waiting in this chapter \(their Fix list\), 1 of them in part 2/);
  });

  it("a mistake in a topic no part covers is counted, but never decides the part", async () => {
    const { tool } = withMisses({
      misses: [miss("Some Retired Subtopic", "q1", "2026-11-21T10:00:00Z"), miss("Some Retired Subtopic", "q2", "2026-11-21T11:00:00Z"), miss(DOT, "q3", "2026-11-20T10:00:00Z")],
    });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toMatch(/has 3 mistakes waiting/);
    expect(out).toMatch(/part 2, Dot Product, Angle, and Perpendicularity, has 1 of their mistakes/);
  });

  it("no waiting mistakes in this chapter: says so, and suggests part 1", async () => {
    const { tool, asked } = withMisses({ misses: [] });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toMatch(/no mistakes waiting in this chapter/i);
    expect(out).toMatch(/part 1, Magnitude, Components, and Unit Vectors, is the one to begin with/);
    expect(asked.own).toEqual([]);
  });

  it("signed out (no reader): says nothing about mistakes", async () => {
    const { tool } = withMisses({ misses: null });
    expect(await tool.run({ chapter: "vectors", exam: "MHT-CET" })).not.toMatch(/mistake/i);
  });

  it("a failed read claims nothing either way: never 'no mistakes'", async () => {
    const { tool } = withMisses({ misses: new Error("timeout") });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).not.toMatch(/mistake/i);
    expect(out).toContain("Dot Product, Angle, and Perpendicularity");
  });

  // 2026-11-23 (owner, from Vedu's and Abha's chats): the mistake is never V's worked example; it is the
  // Your turn card, and V never sees its text. 2026-11-27: each part has its own, for whichever part is read.
  it("each part carries its own Your turn: their latest mistake there the card can show, else a fresh one like it", async () => {
    const { tool, asked, lessons } = withMisses({
      misses: [miss(DOT, "older", "2026-11-20T10:00:00Z"), miss(MAG, "mag", "2026-11-22T10:00:00Z"), miss(DOT, "latest", "2026-11-21T10:00:00Z")],
      // "mag" is written (the card cannot grade it); "latest" can be shown.
      own: (ids) => (ids.includes("latest") ? "latest" : null),
      tryId: (args) => `fresh:${args.subtopic}`,
    });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    // Each part's own mistakes, newest first.
    expect(asked.own).toContainEqual(["mag"]);
    expect(asked.own).toContainEqual(["latest", "older"]);
    // A fresh question only where none of theirs fits: like their latest there, none of their waiting mistakes.
    expect(asked.tries).toEqual([{ chapterId: null, subtopic: MAG, near: "mag", exclude: ["older", "mag", "latest"] }]);
    expect(lessons[0].parts.map((p) => [p.n, p.tryId, p.tryOwn])).toEqual([
      [1, `fresh:${MAG}`, false],
      [2, "latest", true],
    ]);
    // Nothing waits under the first reply: the card shows after a part's notes close.
    expect(lessons[0].tryQuestionId).toBeNull();
    expect(out).toMatch(/after they close a part's notes, a question on it shows under your reply, headed Your turn: do not mention it/i);
    expect(out).toMatch(/do not write a question/i);
    expect(out).not.toMatch(/worked example|work their mistake|they picked/i);
  });

  it("a part with no question found has no Your turn; a failed read is none too", async () => {
    const { tool, lessons } = withMisses({
      misses: [miss(DOT, "q1", "2026-11-20T10:00:00Z")],
      own: () => {
        throw new Error("down");
      },
      tryId: null,
    });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(lessons[0].parts.map((p) => p.tryId)).toEqual([null, null]);
    expect(out).not.toMatch(/headed Your turn/i);
  });

  it("hands the window the lesson: each part with its mistakes and page, the part suggested, the map, no buttons", async () => {
    const { tool, lessons } = withMisses({
      misses: [miss(DOT, "q1", "2026-11-20T10:00:00Z"), miss(DOT, "q2", "2026-11-21T09:00:00Z"), miss(MAG, "q3", "2026-11-19T09:00:00Z"), miss("Some Retired Subtopic", "q4", "2026-11-19T09:00:00Z")],
    });
    await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(lessons).toHaveLength(1);
    expect(lessons[0]).toEqual({
      kind: "notes",
      pick: true,
      exam: "MHT-CET",
      chapter: "Vectors",
      notesHref: "/notes/mht-cet-maths/vectors",
      questionsHref: "/questions/mht-cet/maths/vectors",
      parts: [
        { n: 1, title: "Magnitude, Components, and Unit Vectors", href: "/notes/mht-cet-maths/vectors/magnitude-unit-vectors", missed: 1, tryId: null, tryOwn: false },
        { n: 2, title: "Dot Product, Angle, and Perpendicularity", href: "/notes/mht-cet-maths/vectors/dot-product", missed: 2, tryId: null, tryOwn: false },
      ],
      current: 2,
      order: [2, 1],
      next: null,
      showMap: true,
      missed: 4,
      tryQuestionId: null,
      tryOwn: false,
      tryLearn: null,
    });
  });

  it("a part asked for by number (typed, or an old Go on): that part marked on the map, which shows again", async () => {
    const { tool, lessons } = withMisses({ misses: [miss(DOT, "q1", "2026-11-20T10:00:00Z")] });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET", part: 1 });
    expect(out).toMatch(/part 1, Magnitude, Components, and Unit Vectors, is the one they asked for/);
    expect(lessons[0]).toMatchObject({ current: 1, showMap: true, pick: true, next: null });
  });

  it("a part number the chapter does not have is ignored: the part with their mistakes is suggested", async () => {
    const { tool, lessons } = withMisses({ misses: [miss(DOT, "q1", "2026-11-20T10:00:00Z")] });
    await tool.run({ chapter: "vectors", exam: "MHT-CET", part: 7 });
    expect(lessons[0].current).toBe(2);
    expect(lessons[0].showMap).toBe(true);
  });

  it("signed out: still a map, nothing counted, no Your turn", async () => {
    const { tool, lessons } = withMisses({ misses: null });
    await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(lessons[0].parts.map((p) => [p.missed, p.tryId])).toEqual([
      [0, null],
      [0, null],
    ]);
    expect(lessons[0].current).toBe(1);
  });

  it("a chapter with no notes: its topics are the parts, with no pages, and V teaches as before", async () => {
    const { tool, lessons, asked } = withMisses({
      misses: [miss("Packing Efficiency", "q1", "2026-11-21T10:00:00Z"), miss("Defects", "q3", "2026-11-20T10:00:00Z")],
      own: "q1",
    });
    await tool.run({ chapter: "solid state", exam: "MH HSC 12" });
    expect(lessons[0].notesHref).toBeNull();
    expect(lessons[0].pick).toBeUndefined();
    expect(lessons[0].parts).toEqual([
      { n: 1, title: "Unit Cells", href: null, missed: 0 },
      { n: 2, title: "Packing Efficiency", href: null, missed: 1 },
      { n: 3, title: "Defects", href: null, missed: 1 },
    ]);
    expect(lessons[0].current).toBe(2);
    // Their own mistake in the topic taught is the Your turn under V's reply (2026-11-23).
    expect(asked.own).toEqual([["q1"]]);
    expect(lessons[0].tryQuestionId).toBe("q1");
    expect(lessons[0].tryOwn).toBe(true);
    expect(lessons[0].next).toBe(3);
  });

  it("a chapter with no notes starts at the topic holding most mistakes, and V teaches it", async () => {
    const { tool } = withMisses({
      misses: [miss("Packing Efficiency", "q1", "2026-11-21T10:00:00Z"), miss("Packing Efficiency", "q2", "2026-11-21T11:00:00Z"), miss("Defects", "q3", "2026-11-20T10:00:00Z")],
      own: "q2",
    });
    const out = await tool.run({ chapter: "solid state", exam: "MH HSC 12" });
    expect(out).toMatch(/no notes/i);
    expect(out).toContain("Packing Efficiency: 2");
    expect(out).toMatch(/start with Packing Efficiency/i);
    expect(out).toMatch(/one of their own mistakes in this topic is shown under your reply, headed Your turn/i);
    expect(out).toMatch(/do not mention it, solve it or give its answer/i);
    expect(out).toMatch(/one small example of your own/i);
  });
});

describe("chapterMissesOf", () => {
  const due = (over: Partial<DueQuestion>): DueQuestion => ({
    questionId: "q",
    chapter: "Vectors",
    chapterId: "c1",
    place: "Mathematics · MHT-CET",
    exam: "MHT-CET",
    subtopic: "Dot Product, Angle, and Perpendicularity",
    lastWrongAt: "2026-11-21T10:00:00Z",
    ...over,
  });

  it("keeps the waiting mistakes of THIS exam's chapter only: NDA's Vectors is another chapter", () => {
    const out = chapterMissesOf(
      [due({ questionId: "a" }), due({ questionId: "b", exam: "NDA" }), due({ questionId: "c", chapter: "Matrices" })],
      ROWS[0]
    );
    expect(out).toEqual([{ questionId: "a", subtopic: "Dot Product, Angle, and Perpendicularity", lastWrongAt: "2026-11-21T10:00:00Z" }]);
  });

  it("prefers the chapter id when the row carries one", () => {
    const out = chapterMissesOf([due({ questionId: "a", chapterId: "c1" }), due({ questionId: "b", chapterId: "c2" })], { ...ROWS[0], chapterId: "c2" });
    expect(out.map((m) => m.questionId)).toEqual(["b"]);
  });
});

describe("formatChapterOverview", () => {
  it("skips a slug the notes do not carry rather than printing an empty line", () => {
    const out = formatChapterOverview(ROWS[0], { ref: VECTORS_REF, parts: { "dot-product": VECTORS_PARTS["dot-product"] } });
    expect(out).toContain("1. Dot Product");
    expect(out).not.toContain("undefined");
  });
});

describe("notes chapter index", () => {
  it("is current: one entry per notes chapter with its DB exam and chapter name and its teaching order", () => {
    expect(NOTES_CHAPTER_INDEX).toEqual(notesChapterIndex(NOTES_CHAPTERS));
  });

  it("carries the MHT-CET Vectors chapter the student was never shown", () => {
    const ref = NOTES_CHAPTER_INDEX.find((r) => r.key === "mht-cet-maths/vectors");
    expect(ref?.examName).toBe("MHT-CET");
    expect(ref?.chapterName).toBe("Vectors");
    expect(ref?.slugs.length).toBe(6);
  });
});

describe("chapter_overview from Learn (2026-11-22: Learn first wherever it teaches the chapter)", () => {
  const CBSE_MATRICES = row({
    examSlug: "cbse-12",
    examName: "CBSE Class 12",
    subjectSlug: "mathematics",
    subjectName: "Mathematics",
    chapterSlug: "matrices",
    chapterName: "Matrices",
    questionCount: 232,
    subtopicNames: ["Order and Types of Matrices", "Multiplication of Matrices", "Transpose of a Matrix"],
  });
  const lessonRow = (slug: string, topic: string, state: "learning" | "mastered" | null = null, right = 0) => ({
    chapter: "matrices",
    slug,
    title: slug.replace(/-/g, " "),
    oneLiner: `${slug}: the idea in one line`,
    topics: [topic],
    state,
    right,
  });
  const MATRICES: LearnChapter = {
    course: "cbse-12-maths",
    courseChapter: "matrices",
    title: "Matrices",
    signedIn: true,
    needed: 3,
    lessons: [
      lessonRow("types-of-matrices", "Order and Types of Matrices", "mastered", 3),
      lessonRow("matrix-multiplication", "Multiplication of Matrices", "learning", 1),
      lessonRow("transpose", "Transpose of a Matrix"),
    ],
  };
  const miss = (subtopic: string, id: string, at: string): ChapterMiss => ({ subtopic, questionId: id, lastWrongAt: at });

  function learnTool(opts: { learn?: LearnChapter | null | Error; misses?: ChapterMiss[]; rows?: ChapterSearchRow[] } = {}) {
    const lessons: VLesson[] = [];
    const paths: string[] = [];
    const notesLoaded: string[] = [];
    const tool = chapterOverviewTool({
      loadChapters: async () => opts.rows ?? [CBSE_MATRICES, ...ROWS],
      notesIndex: [VECTORS_REF],
      loadNotesChapter: async (key) => {
        notesLoaded.push(key);
        return VECTORS_PARTS;
      },
      page: null,
      onPaths: (p) => paths.push(...p),
      loadMisses: async () => opts.misses ?? [],
      loadOwnTry: async () => null,
      loadTryId: async () => "11111111-1111-4111-8111-111111111111",
      loadLearn: async () => {
        if (opts.learn instanceof Error) throw opts.learn;
        return opts.learn === undefined ? MATRICES : opts.learn;
      },
      onLesson: (l) => lessons.push(l),
    });
    return { tool, lessons, paths, notesLoaded };
  }

  it("hands the window Learn's lessons with progress, starting where the mistakes are, and no question to try (the student picks a lesson)", async () => {
    const { tool, lessons, paths } = learnTool({
      misses: [miss("Multiplication of Matrices", "q1", "2026-11-20T10:00:00Z"), miss("Multiplication of Matrices", "q2", "2026-11-21T10:00:00Z")],
    });
    await tool.run({ chapter: "matrices", exam: "CBSE Class 12" });
    expect(lessons[0]).toMatchObject({
      kind: "learn",
      exam: "CBSE Class 12",
      chapter: "Matrices",
      notesHref: null,
      current: 2,
      order: [2, 3],
      next: 3,
      showMap: true,
      missed: 2,
      tryQuestionId: null,
      tryOwn: false,
      tryLearn: null,
    });
    expect(lessons[0].parts.map((p) => [p.n, p.progress, p.missed])).toEqual([
      [1, "done", 0],
      [2, { right: 1, of: 3 }, 2],
      [3, "new", 0],
    ]);
    expect(paths).toContain("/learn/lesson/matrices/matrix-multiplication?course=cbse-12-maths");
  });

  // 2026-11-22 (owner, third iteration): the map IS the reply. The student taps a lesson and Learn's
  // own lesson plays full screen in V; V writes one line and teaches nothing itself.
  it("tells V to write one line pointing at the card, and to teach nothing, list nothing, write no path or question", async () => {
    const { tool } = learnTool({ misses: [miss("Multiplication of Matrices", "q1", "2026-11-20T10:00:00Z")] });
    const out = await tool.run({ chapter: "matrices", exam: "CBSE Class 12" });
    expect(out).toMatch(/one short line/i);
    expect(out).toMatch(/lesson 2, matrix multiplication/);
    expect(out).toMatch(/tapping a lesson on the card opens it/i);
    // The map is drawn above V's text (mockup B); V once wrote "the card below" (2026-11-22 capture).
    expect(out).toMatch(/card ABOVE your reply/);
    expect(out).toMatch(/do not teach/i);
    expect(out).toMatch(/do not list the lessons/i);
    expect(out).toMatch(/do not write a path/i);
    expect(out).toMatch(/do not write a question/i);
    expect(out).not.toMatch(/Your turn/);
    expect(out).not.toMatch(/\/learn\//);
  });

  it("reads none of their mistakes for a Learn chapter: the student picks a lesson, so a turn would go unused", async () => {
    const examples: string[][] = [];
    const tool = chapterOverviewTool({
      loadChapters: async () => [CBSE_MATRICES],
      notesIndex: [],
      loadNotesChapter: async () => null,
      page: null,
      onPaths: () => {},
      loadMisses: async () => [miss("Multiplication of Matrices", "q1", "2026-11-20T10:00:00Z")],
      loadOwnTry: async (ids) => {
        examples.push([...ids]);
        return null;
      },
      loadLearn: async () => MATRICES,
    });
    const out = await tool.run({ chapter: "matrices", exam: "CBSE Class 12" });
    expect(examples).toEqual([]);
    expect(out).not.toMatch(/work their mistake/i);
  });

  it("where the exam has notes too, Learn comes first and the notes are the second link, never read", async () => {
    const VECTORS_LEARN: LearnChapter = { ...MATRICES, courseChapter: "vectors", title: "Vectors", lessons: [lessonRow("dot-product", "x")] };
    const { tool, lessons, notesLoaded } = learnTool({ learn: VECTORS_LEARN });
    await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(lessons[0].kind).toBe("learn");
    expect(lessons[0].notesHref).toBe("/notes/mht-cet-maths/vectors");
    expect(notesLoaded).toEqual([]);
  });

  it("no Learn for the chapter, or a failed Learn read: the notes lesson as before", async () => {
    for (const learn of [null, new Error("outline down")]) {
      const { tool, lessons, notesLoaded } = learnTool({ learn });
      await tool.run({ chapter: "vectors", exam: "MHT-CET" });
      expect(lessons[0].kind).toBe("notes");
      expect(notesLoaded).toEqual(["mht-cet-maths/vectors"]);
    }
  });

  it("a lesson asked for by number: that lesson marked on the map, which shows again (it is how the student opens it)", async () => {
    const { tool, lessons } = learnTool({ misses: [miss("Multiplication of Matrices", "q1", "2026-11-20T10:00:00Z")] });
    const out = await tool.run({ chapter: "matrices", exam: "CBSE Class 12", part: 3 });
    expect(lessons[0]).toMatchObject({ current: 3, showMap: true, tryLearn: null });
    expect(out).toMatch(/lesson 3, transpose is the one they asked for/);
  });
});

describe("chapter_overview from Learn, signed out (2026-11-22 capture: V wrote 'Sign in at /performance')", () => {
  it("tells V the mistakes are unknown, to say signing in lets it start from them, and to write no path", async () => {
    const tool = chapterOverviewTool({
      loadChapters: async () => [
        row({ examSlug: "cbse-12", examName: "CBSE Class 12", subjectSlug: "mathematics", subjectName: "Mathematics", chapterSlug: "matrices", chapterName: "Matrices" }),
      ],
      notesIndex: [],
      loadNotesChapter: async () => null,
      page: null,
      onPaths: () => {},
      loadMisses: null,
      loadLearn: async () => ({
        course: "cbse-12-maths",
        courseChapter: "matrices",
        title: "Matrices",
        signedIn: false,
        needed: 3,
        lessons: [{ chapter: "determinants-and-matrices", slug: "types-of-matrices", title: "Types of matrices", oneLiner: "x", topics: [], state: null, right: 0 }],
      }),
    });
    const out = await tool.run({ chapter: "matrices", exam: "CBSE Class 12" });
    expect(out).toMatch(/signed out/i);
    expect(out).toMatch(/signing in lets you start from their mistakes/i);
    expect(out).toMatch(/no link or path/i);
  });
});
