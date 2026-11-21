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
  chapterOverviewTool,
  formatChapterOverview,
  notesChapterIndex,
  type NotesChapterRef,
  type NotesChapterParts,
} from "@/lib/chat/chapterOverview";
import type { ChapterSearchRow } from "@/lib/chat/chapterSearch";
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

  it("tells V how to teach from it: a map of the parts, then the first part, then one part at a time", async () => {
    const { tool } = setup();
    const out = await tool.run({ chapter: "vectors", exam: "MHT-CET" });
    expect(out).toMatch(/map/i);
    expect(out).toMatch(/first part/i);
    expect(out).toMatch(/one part at a time/i);
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
