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
  type MissExample,
  type NotesChapterRef,
  type NotesChapterParts,
  toMissExample,
  type TryArgs,
} from "@/lib/chat/chapterOverview";
import type { VLesson } from "@/lib/chat/lesson";
import type { LearnChapter } from "@/lib/chat/learnLesson";
import type { VQuestion } from "@/lib/chat/questionTools";
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

  it("tells V how to teach from it: the first part briefly, while a card under the reply carries the map and the buttons", async () => {
    const { tool } = setup();
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toMatch(/first part/i);
    expect(out).toMatch(/card under your reply/i);
    // 2026-11-21 (owner's phone): V wrote the map as a list, the notes as a raw path, and asked
    // "Shall we move on to part 2?" with nothing to tap. The card and buttons do those now.
    expect(out).toMatch(/do not list the parts/i);
    expect(out).toMatch(/do not write a notes or questions path/i);
    expect(out).toMatch(/do not ask whether to go on/i);
    expect(out).toContain("maths inside \\( \\)");
    // It had also called my_progress for nothing.
    expect(out).toMatch(/do not call my_progress/i);
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
 * Starting from the student's own mistakes (2026-11-21, owner-approved mockup B):
 * "You missed 2 dot-product questions, so we start there" rather than part 1. The
 * mistakes are the Fix list's waiting ones (lib/drill), so V and /me's "Your weak
 * spots" count the same thing. A notes part is matched to a mistake by the part's
 * bank subtopic name (SubtopicNote.subtopicName).
 */
describe("chapter_overview from the student's mistakes", () => {
  const PARTS: NotesChapterParts = {
    "magnitude-unit-vectors": { ...VECTORS_PARTS["magnitude-unit-vectors"], subtopicName: "Magnitude and Unit Vectors" },
    "dot-product": { ...VECTORS_PARTS["dot-product"], subtopicName: "Dot Product, Angle, and Perpendicularity" },
  };
  const miss = (subtopic: string, id: string, at: string): ChapterMiss => ({ subtopic, questionId: id, lastWrongAt: at });

  function withMisses(opts: {
    misses?: readonly ChapterMiss[] | Error | null;
    example?: MissExample | null;
    parts?: NotesChapterParts | null;
    /** undefined = no try reader (signed out); null = the reader finds none. */
    tryId?: string | null;
  }) {
    const asked: { hits: ChapterSearchRow[]; examples: string[]; tries: TryArgs[] } = { hits: [], examples: [], tries: [] };
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
      loadMissExample: async (id) => {
        asked.examples.push(id);
        return opts.example ?? null;
      },
      loadTryId:
        opts.tryId === undefined
          ? null
          : async (args) => {
              asked.tries.push(args);
              return opts.tryId ?? null;
            },
      onLesson: (l) => lessons.push(l),
    });
    return { tool, asked, lessons };
  }

  it("counts the waiting mistakes by part and starts at the part holding most, not part 1", async () => {
    const { tool, asked } = withMisses({
      misses: [
        miss("Dot Product, Angle, and Perpendicularity", "q1", "2026-11-20T10:00:00Z"),
        miss("Dot Product, Angle, and Perpendicularity", "q2", "2026-11-21T09:00:00Z"),
        miss("Magnitude and Unit Vectors", "q3", "2026-11-19T09:00:00Z"),
      ],
    });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(asked.hits.map((h) => h.examName)).toEqual(["MHT-CET"]);
    expect(out).toMatch(/3 mistakes waiting/i);
    expect(out).toContain("Dot Product, Angle, and Perpendicularity: 2");
    expect(out).toContain("Magnitude, Components, and Unit Vectors: 1");
    expect(out).toMatch(/start at part 2, Dot Product, Angle, and Perpendicularity/i);
    expect(out).toMatch(/not part 1/i);
  });

  it("a tie goes to the earlier part in teaching order", async () => {
    const { tool } = withMisses({
      misses: [
        miss("Dot Product, Angle, and Perpendicularity", "q1", "2026-11-21T10:00:00Z"),
        miss("Magnitude and Unit Vectors", "q2", "2026-11-20T10:00:00Z"),
      ],
    });
    expect(await tool.run({ chapter: "vectors", exam: "MHT-CET" })).toMatch(/start at part 1, Magnitude, Components, and Unit Vectors/i);
  });

  it("matches a mistake to its part whatever the case or spacing of the subtopic name", async () => {
    const { tool } = withMisses({ misses: [miss("  dot product, angle, and perpendicularity ", "q1", "2026-11-21T10:00:00Z")] });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toContain("Dot Product, Angle, and Perpendicularity: 1");
    // One mistake reads as one (the live smoke printed "1 mistakes").
    expect(out).toMatch(/has 1 mistake waiting/);
  });

  it("a mistake in a topic no part covers is counted, but never decides the start", async () => {
    const { tool } = withMisses({
      misses: [
        miss("Some Retired Subtopic", "q1", "2026-11-21T10:00:00Z"),
        miss("Some Retired Subtopic", "q2", "2026-11-21T11:00:00Z"),
        miss("Dot Product, Angle, and Perpendicularity", "q3", "2026-11-20T10:00:00Z"),
      ],
    });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toMatch(/3 mistakes waiting/i);
    expect(out).toMatch(/2 in other topics/i);
    expect(out).toMatch(/start at part 2, Dot Product/i);
  });

  it("no waiting mistakes in this chapter: says so, and starts at part 1", async () => {
    const { tool, asked } = withMisses({ misses: [] });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toMatch(/no mistakes waiting in this chapter/i);
    expect(out).toMatch(/first part/i);
    expect(asked.examples).toEqual([]);
  });

  it("signed out (no reader): says nothing about mistakes", async () => {
    const { tool } = withMisses({ misses: null });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).not.toMatch(/mistake/i);
  });

  it("a failed read claims nothing either way: never 'no mistakes'", async () => {
    const { tool } = withMisses({ misses: new Error("timeout") });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).not.toMatch(/mistake/i);
    expect(out).toContain("Dot Product, Angle, and Perpendicularity");
  });

  it("the latest mistake is the worked example: its question, their pick and the answer, and V names the slip", async () => {
    const { tool, asked } = withMisses({
      misses: [
        miss("Dot Product, Angle, and Perpendicularity", "older", "2026-11-20T10:00:00Z"),
        miss("Dot Product, Angle, and Perpendicularity", "latest", "2026-11-21T10:00:00Z"),
      ],
      example: {
        text: "If a = 2i - j + k and b = i + 3j - 2k, then a · b is",
        options: [
          { label: "A", text: "-3" },
          { label: "B", text: "3" },
          { label: "C", text: "1" },
          { label: "D", text: "-1" },
        ],
        chose: "C",
        answer: "A",
      },
    });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(asked.examples).toEqual(["latest"]);
    expect(out).toContain("If a = 2i - j + k and b = i + 3j - 2k, then a · b is");
    expect(out).toContain("(C) 1");
    expect(out).toMatch(/they picked \(C\)/i);
    expect(out).toMatch(/the answer is \(A\)/i);
    expect(out).toMatch(/slip/i);
  });

  it("a mock mistake records no pick: the example says so and V shows the right working instead", async () => {
    const { tool } = withMisses({
      misses: [miss("Dot Product, Angle, and Perpendicularity", "q1", "2026-11-21T10:00:00Z")],
      example: { text: "Find a · b.", options: [{ label: "A", text: "0" }, { label: "B", text: "1" }], chose: null, answer: "A" },
    });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toMatch(/pick was not recorded/i);
    expect(out).not.toMatch(/they picked/i);
  });

  it("no usable example (a figure, a written question, a failed read): teaches without one", async () => {
    const { tool } = withMisses({ misses: [miss("Dot Product, Angle, and Perpendicularity", "q1", "2026-11-21T10:00:00Z")], example: null });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toMatch(/start at part 2/i);
    expect(out).not.toMatch(/they picked/i);
  });

  it("the worked example is the latest mistake IN the starting part, not the latest anywhere", async () => {
    const { asked, tool } = withMisses({
      misses: [
        miss("Dot Product, Angle, and Perpendicularity", "dot-old", "2026-11-19T10:00:00Z"),
        miss("Dot Product, Angle, and Perpendicularity", "dot-new", "2026-11-20T10:00:00Z"),
        miss("Magnitude and Unit Vectors", "mag-latest", "2026-11-21T10:00:00Z"),
      ],
    });
    await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(asked.examples).toEqual(["dot-new"]);
  });

  it("if you cannot see the slip, V leaves it out rather than saying so", async () => {
    const { tool } = withMisses({
      misses: [miss("Dot Product, Angle, and Perpendicularity", "q1", "2026-11-21T10:00:00Z")],
      example: { text: "Find a · b.", options: [{ label: "A", text: "0" }, { label: "B", text: "1" }], chose: "B", answer: "A" },
    });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toMatch(/if you cannot see the slip, leave it out and do not mention it/i);
  });

  it("hands the window the lesson: each part with its mistakes and page, where it starts, what comes next, the map", async () => {
    const { tool, lessons } = withMisses({
      misses: [
        miss("Dot Product, Angle, and Perpendicularity", "q1", "2026-11-20T10:00:00Z"),
        miss("Dot Product, Angle, and Perpendicularity", "q2", "2026-11-21T09:00:00Z"),
        miss("Magnitude and Unit Vectors", "q3", "2026-11-19T09:00:00Z"),
        miss("Some Retired Subtopic", "q4", "2026-11-19T09:00:00Z"),
      ],
    });
    await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(lessons).toHaveLength(1);
    expect(lessons[0]).toEqual({
      kind: "notes",
      exam: "MHT-CET",
      chapter: "Vectors",
      notesHref: "/notes/mht-cet-maths/vectors",
      questionsHref: "/questions/mht-cet/maths/vectors",
      parts: [
        { n: 1, title: "Magnitude, Components, and Unit Vectors", href: "/notes/mht-cet-maths/vectors/magnitude-unit-vectors", missed: 1 },
        { n: 2, title: "Dot Product, Angle, and Perpendicularity", href: "/notes/mht-cet-maths/vectors/dot-product", missed: 2 },
      ],
      current: 2,
      order: [2, 1],
      next: 1,
      showMap: true,
      missed: 4,
      tryQuestionId: null,
      tryLearn: null,
    });
  });

  it("a question to try: one like their mistake in that part, none of their waiting mistakes, and V asks them to try it", async () => {
    const { tool, asked, lessons } = withMisses({
      misses: [
        miss("Dot Product, Angle, and Perpendicularity", "q1", "2026-11-20T10:00:00Z"),
        miss("Magnitude and Unit Vectors", "q3", "2026-11-19T09:00:00Z"),
        miss("Dot Product, Angle, and Perpendicularity", "q2", "2026-11-21T09:00:00Z"),
      ],
      example: { text: "Find a · b.", options: [{ label: "A", text: "0" }, { label: "B", text: "1" }], chose: "B", answer: "A" },
      tryId: "t1",
    });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(asked.tries).toEqual([
      { chapterId: null, subtopic: "Dot Product, Angle, and Perpendicularity", near: "q2", exclude: ["q1", "q3", "q2"] },
    ]);
    expect(lessons[0].tryQuestionId).toBe("t1");
    expect(out).toMatch(/question on this part is shown under your reply/i);
    // The card carries its own "Your turn" (2026-11-22): a line pointing at it dangles when it fails to load.
    expect(out).toMatch(/headed Your turn: do not mention it/i);
    expect(out).not.toMatch(/asking them to try it/i);
    // 2026-11-21 (real capture): V wrote "Try this one: a single fair die..." above the card's own
    // question, so the student had two questions to try, one made up.
    expect(out).toMatch(/do not write a question of your own/i);
  });

  it("no question to try: V does not promise one", async () => {
    const { tool, lessons } = withMisses({ misses: [], tryId: null });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(lessons[0].tryQuestionId).toBeNull();
    expect(out).not.toMatch(/question on this part is shown/i);
    expect(out).toMatch(/do not write a question of your own/i);
  });

  it("a part asked for by number (the Go on button): teaches that part, no second map, its own example", async () => {
    const { tool, asked, lessons } = withMisses({
      misses: [
        miss("Dot Product, Angle, and Perpendicularity", "q1", "2026-11-20T10:00:00Z"),
        miss("Dot Product, Angle, and Perpendicularity", "q2", "2026-11-21T09:00:00Z"),
        miss("Magnitude and Unit Vectors", "q3", "2026-11-19T09:00:00Z"),
      ],
    });
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET", part: 1 });
    expect(out).toMatch(/they asked for part 1, Magnitude, Components, and Unit Vectors/i);
    expect(out).not.toMatch(/card under your reply shows/i);
    expect(asked.examples).toEqual(["q3"]);
    expect(lessons[0].current).toBe(1);
    expect(lessons[0].next).toBeNull();
    expect(lessons[0].showMap).toBe(false);
  });

  it("a part asked for with no mistakes in it has no example", async () => {
    const { tool, asked } = withMisses({ misses: [miss("Dot Product, Angle, and Perpendicularity", "q1", "2026-11-20T10:00:00Z")] });
    await tool.run({ chapter: "vectors", exam: "MHT-CET", part: 1 });
    expect(asked.examples).toEqual([]);
  });

  it("a part number the chapter does not have is ignored: it starts where the mistakes are", async () => {
    const { tool, lessons } = withMisses({ misses: [miss("Dot Product, Angle, and Perpendicularity", "q1", "2026-11-20T10:00:00Z")] });
    await tool.run({ chapter: "vectors", exam: "MHT-CET", part: 7 });
    expect(lessons[0].current).toBe(2);
    expect(lessons[0].showMap).toBe(true);
  });

  it("signed out: still a map, nothing counted, no question to try", async () => {
    const { tool, lessons } = withMisses({ misses: null });
    await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(lessons[0].parts.map((p) => p.missed)).toEqual([0, 0]);
    expect(lessons[0].current).toBe(1);
    expect(lessons[0].tryQuestionId).toBeNull();
  });

  it("a chapter with no notes: its topics are the parts, with no pages", async () => {
    const { tool, lessons } = withMisses({
      misses: [miss("Packing Efficiency", "q1", "2026-11-21T10:00:00Z"), miss("Defects", "q3", "2026-11-20T10:00:00Z")],
    });
    await tool.run({ chapter: "solid state", exam: "MH HSC 12" });
    expect(lessons[0].notesHref).toBeNull();
    expect(lessons[0].parts).toEqual([
      { n: 1, title: "Unit Cells", href: null, missed: 0 },
      { n: 2, title: "Packing Efficiency", href: null, missed: 1 },
      { n: 3, title: "Defects", href: null, missed: 1 },
    ]);
    expect(lessons[0].current).toBe(2);
  });

  it("a chapter with no notes starts at the topic holding most mistakes", async () => {
    const { tool } = withMisses({
      misses: [miss("Packing Efficiency", "q1", "2026-11-21T10:00:00Z"), miss("Packing Efficiency", "q2", "2026-11-21T11:00:00Z"), miss("Defects", "q3", "2026-11-20T10:00:00Z")],
    });
    const out = await tool.run({ chapter: "solid state", exam: "MH HSC 12" });
    expect(out).toMatch(/no notes/i);
    expect(out).toContain("Packing Efficiency: 2");
    expect(out).toMatch(/start with Packing Efficiency/i);
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

describe("toMissExample", () => {
  const q = (over: Partial<VQuestion>): VQuestion => ({
    id: "q1",
    text: "Find a · b.",
    context: null,
    hasFigure: false,
    solution: null,
    format: "mcq",
    numericAnswer: null,
    options: [
      { label: "A", text: "0", isCorrect: true },
      { label: "B", text: "1", isCorrect: false },
    ],
    exam: "MHT-CET",
    subject: "Mathematics",
    chapter: "Vectors",
    subtopic: null,
    subtopicId: null,
    origin: null,
    ...over,
  });

  it("an MCQ: its stem, options, their pick and the key", () => {
    expect(toMissExample(q({}), "B")).toEqual({
      text: "Find a · b.",
      options: [
        { label: "A", text: "0" },
        { label: "B", text: "1" },
      ],
      chose: "B",
      answer: "A",
    });
  });

  it("keeps the shared passage with the stem", () => {
    expect(toMissExample(q({ context: "a = i + j, b = i - j." }), null)?.text).toBe("a = i + j, b = i - j.\nFind a · b.");
  });

  it("a pick that is not an option letter is no pick", () => {
    expect(toMissExample(q({}), "Z")?.chose).toBeNull();
  });

  it("no example from a figure V cannot see, a written or numeric question, or no question", () => {
    expect(toMissExample(q({ hasFigure: true }), "B")).toBeNull();
    expect(toMissExample(q({ format: "subjective" }), null)).toBeNull();
    expect(toMissExample(q({ format: "numeric" }), null)).toBeNull();
    expect(toMissExample(null, "B")).toBeNull();
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
      loadMissExample: async () => null,
      loadTryId: async () => "11111111-1111-4111-8111-111111111111",
      loadLearn: async () => {
        if (opts.learn instanceof Error) throw opts.learn;
        return opts.learn === undefined ? MATRICES : opts.learn;
      },
      onLesson: (l) => lessons.push(l),
    });
    return { tool, lessons, paths, notesLoaded };
  }

  it("hands the window Learn's lessons with progress, starting where the mistakes are, and a Learn question to try", async () => {
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
      tryLearn: { chapter: "matrices", concept: "matrix-multiplication" },
    });
    expect(lessons[0].parts.map((p) => [p.n, p.progress, p.missed])).toEqual([
      [1, "done", 0],
      [2, { right: 1, of: 3 }, 2],
      [3, "new", 0],
    ]);
    expect(paths).toContain("/learn/lesson/matrices/matrix-multiplication?course=cbse-12-maths");
  });

  it("tells V to teach the lesson from Learn's one-line summary, with no paths, no list and no question of its own", async () => {
    const { tool } = learnTool({ misses: [miss("Multiplication of Matrices", "q1", "2026-11-20T10:00:00Z")] });
    const out = await tool.run({ chapter: "matrices", exam: "CBSE Class 12" });
    expect(out).toContain("2. matrix multiplication: matrix-multiplication: the idea in one line");
    expect(out).toMatch(/START at lesson 2, matrix multiplication/);
    expect(out).toMatch(/do not list the lessons/i);
    expect(out).toMatch(/do not write a path/i);
    expect(out).toMatch(/headed Your turn: do not mention it/i);
    expect(out).toMatch(/do not write a question of your own/i);
    expect(out).not.toMatch(/\/learn\//);
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

  it("a lesson asked for by number: that lesson, no second map", async () => {
    const { tool, lessons } = learnTool({ misses: [miss("Multiplication of Matrices", "q1", "2026-11-20T10:00:00Z")] });
    const out = await tool.run({ chapter: "matrices", exam: "CBSE Class 12", part: 3 });
    expect(lessons[0]).toMatchObject({ current: 3, showMap: false, tryLearn: { chapter: "matrices", concept: "transpose" } });
    expect(out).toMatch(/They asked for lesson 3, transpose/);
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
