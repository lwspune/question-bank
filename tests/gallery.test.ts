/**
 * The Visuals gallery (owner, 2026-11-23): every notes visual, by exam,
 * subject and chapter, in the header slot Classes left. Pure rules:
 * - buildGalleryIndex: which visuals, in which order, with which badge;
 * - the filters (chapter, Try it · 3D · Pictures), the chapter list with
 *   counts, and "your weak chapters first";
 * - the 3 practice questions a visual offers;
 * - where the header's Visuals link goes for a student's exam.
 */
import { describe, it, expect } from "vitest";
import {
  buildGalleryIndex,
  badgeOf,
  type GalleryChapterInput,
} from "@/lib/gallery/build";
import {
  chaptersOf,
  filterVisuals,
  orderChaptersByWeak,
  practiceIds,
  weakChapterCounts,
  notesHrefOf,
  galleryHrefFor,
  tileMarkupOf,
  type GalleryVisual,
} from "@/lib/gallery/gallery";

const concept = (slug: string, name: string, visual?: string, extra: Record<string, unknown> = {}) => ({
  slug,
  name,
  kind: "formula" as const,
  intuition: `Why ${name} works.`,
  definition: "",
  ...(visual ? { visualizationSlug: visual } : {}),
  ...extra,
});

const chapter = (over: Partial<GalleryChapterInput> & { chapterSlug: string; chapterName: string }): GalleryChapterInput => ({
  examName: "NDA",
  subjectName: "Mathematics",
  subjectRoute: "nda-maths",
  subjectDisplay: "NDA Maths",
  ...over,
  chapter: { chapterName: over.chapterName, subtopicOrder: ["b-topic", "a-topic"] } as never,
  notes: (over.notes ?? {
    "a-topic": { title: "A topic", concepts: [concept("a1", "A one", "viz-a1")] },
    "b-topic": {
      title: "B topic",
      concepts: [concept("b1", "B one", "viz-b1", { pyqExampleId: "q-ex" }), concept("b2", "B two"), concept("b3", "B three", "viz-3d")],
    },
  }) as never,
});

const opts = {
  clientSlugs: new Set(["viz-b1", "viz-3d"]),
  threeD: new Set(["viz-3d"]),
  examSlugOf: (n: string) => ({ NDA: "nda", "JEE Mains": "jee-mains" })[n] ?? null,
};

describe("buildGalleryIndex", () => {
  const out = buildGalleryIndex([chapter({ chapterSlug: "vectors", chapterName: "Vectors" })], opts);

  it("takes every concept that has a visual, in the notes' teaching order", () => {
    expect(out.map((v) => v.slug)).toEqual(["viz-b1", "viz-3d", "viz-a1"]);
  });

  it("carries where the visual lives and what the concept says", () => {
    expect(out[0]).toMatchObject({
      slug: "viz-b1",
      examSlug: "nda",
      examName: "NDA",
      subjectRoute: "nda-maths",
      subjectDisplay: "NDA Maths",
      chapterSlug: "vectors",
      chapterName: "Vectors",
      subtopicSlug: "b-topic",
      subtopicTitle: "B topic",
      conceptSlug: "b1",
      conceptName: "B one",
      line: "Why B one works.",
      pyqExampleId: "q-ex",
      badge: "try",
      interactive: true,
    });
  });

  it("marks whether a visual runs in the browser, apart from its badge", () => {
    expect(out.find((x) => x.slug === "viz-3d")).toMatchObject({ badge: "3d", interactive: true });
    expect(out.find((x) => x.slug === "viz-a1")).toMatchObject({ badge: "picture", interactive: false });
  });

  it("badges a 3D visual 3D, a browser-run one Try it, the rest Picture", () => {
    expect(badgeOf("viz-3d", opts)).toBe("3d");
    expect(badgeOf("viz-b1", opts)).toBe("try");
    expect(badgeOf("viz-a1", opts)).toBe("picture");
  });

  it("shows a visual once per subject even when two concepts share it", () => {
    const twice = chapter({
      chapterSlug: "c",
      chapterName: "C",
      notes: { "a-topic": { title: "A", concepts: [concept("x", "X", "viz-x"), concept("y", "Y", "viz-x")] } } as never,
    });
    expect(buildGalleryIndex([twice], opts).map((v) => v.conceptSlug)).toEqual(["x"]);
  });

  it("keeps a visual under each exam that uses it", () => {
    const jee = chapter({ chapterSlug: "vectors", chapterName: "Vectors", examName: "JEE Mains", subjectRoute: "jee-mains-maths", subjectDisplay: "JEE Maths" });
    const both = buildGalleryIndex([chapter({ chapterSlug: "vectors", chapterName: "Vectors" }), jee], opts);
    expect(both.filter((v) => v.slug === "viz-a1").map((v) => v.examSlug)).toEqual(["nda", "jee-mains"]);
  });

  it("leaves out an exam the site does not know", () => {
    expect(buildGalleryIndex([chapter({ chapterSlug: "v", chapterName: "V", examName: "Elsewhere" })], opts)).toEqual([]);
  });
});

const v = (slug: string, chapterName: string, badge: GalleryVisual["badge"], chapterSlug = chapterName.toLowerCase()): GalleryVisual => ({
  slug,
  examSlug: "nda",
  examName: "NDA",
  subjectName: "Mathematics",
  subjectRoute: "nda-maths",
  subjectDisplay: "NDA Maths",
  chapterSlug,
  chapterName,
  subtopicSlug: "t",
  subtopicTitle: "T",
  conceptSlug: slug,
  conceptName: slug,
  line: "",
  badge,
  interactive: badge !== "picture",
});

const list = [v("a", "Vectors", "try"), v("b", "Vectors", "picture"), v("c", "Probability", "3d"), v("d", "Statistics", "picture")];

describe("the filters", () => {
  it("lists chapters in order with their counts", () => {
    expect(chaptersOf(list)).toEqual([
      { chapterSlug: "vectors", chapterName: "Vectors", count: 2 },
      { chapterSlug: "probability", chapterName: "Probability", count: 1 },
      { chapterSlug: "statistics", chapterName: "Statistics", count: 1 },
    ]);
  });

  it("filters by chapter and by kind", () => {
    expect(filterVisuals(list, { chapter: null, kind: "all" }).map((x) => x.slug)).toEqual(["a", "b", "c", "d"]);
    expect(filterVisuals(list, { chapter: "vectors", kind: "all" }).map((x) => x.slug)).toEqual(["a", "b"]);
    expect(filterVisuals(list, { chapter: null, kind: "try" }).map((x) => x.slug)).toEqual(["a"]);
    expect(filterVisuals(list, { chapter: null, kind: "3d" }).map((x) => x.slug)).toEqual(["c"]);
    expect(filterVisuals(list, { chapter: null, kind: "picture" }).map((x) => x.slug)).toEqual(["b", "d"]);
    expect(filterVisuals(list, { chapter: "probability", kind: "picture" })).toEqual([]);
  });
});

describe("your weak chapters first", () => {
  it("puts chapters with waiting mistakes first, most first, then the rest in book order", () => {
    const weak = new Map([["Statistics", 2], ["Probability", 5]]);
    expect(orderChaptersByWeak(chaptersOf(list), weak).map((c) => c.chapterName)).toEqual(["Probability", "Statistics", "Vectors"]);
  });

  it("keeps book order when nothing is waiting", () => {
    expect(orderChaptersByWeak(chaptersOf(list), new Map()).map((c) => c.chapterName)).toEqual(["Vectors", "Probability", "Statistics"]);
  });

  it("counts waiting mistakes per chapter for this exam and subject only", () => {
    const due = [
      { chapter: "Vectors", exam: "NDA", subject: "Mathematics" },
      { chapter: "Vectors", exam: "NDA", subject: "Mathematics" },
      { chapter: "Vectors", exam: "MHT-CET", subject: "Maths" },
      { chapter: "Optics", exam: "NDA", subject: "Physics" },
      { chapter: "Probability", exam: "NDA", subject: "Mathematics" },
    ];
    expect(weakChapterCounts(due, "NDA", "Mathematics")).toEqual(new Map([["Vectors", 2], ["Probability", 1]]));
  });
});

describe("practise 3 questions", () => {
  it("offers up to 3 of the concept's tagged questions, never the notes' own featured one", () => {
    expect(practiceIds(["q1", "q-ex", "q2", "q3", "q4"], "q-ex")).toEqual(["q1", "q2", "q3"]);
    expect(practiceIds(["q1"], undefined)).toEqual(["q1"]);
    expect(practiceIds([], undefined)).toEqual([]);
  });
});

describe("links", () => {
  it("opens the concept on its notes page", () => {
    expect(notesHrefOf(v("a", "Vectors", "try"))).toBe("/notes/nda-maths/vectors/t#a");
  });

  it("sends the header's Visuals link to the exam's first subject with visuals", () => {
    const nav = { nda: "nda-maths", "jee-mains": "jee-mains-physics" };
    expect(galleryHrefFor("nda", nav)).toBe("/visuals/nda-maths");
    expect(galleryHrefFor("jee-mains", nav)).toBe("/visuals/jee-mains-physics");
    expect(galleryHrefFor("upsc-cse", nav)).toBe("/visuals");
    expect(galleryHrefFor(null, nav)).toBe("/visuals");
  });
});

describe("a tile shows only the diagram's picture", () => {
  it("takes the first svg, with any svg nested inside it", () => {
    const m = '<div class="box"><p>Caption</p><svg viewBox="0 0 10 10"><g><svg x="1"><circle/></svg></g></svg><div>MD = 2</div><svg id="second"/></div>';
    expect(tileMarkupOf(m)).toBe('<svg viewBox="0 0 10 10"><g><svg x="1"><circle/></svg></g></svg>');
  });

  it("keeps a self-closing svg whole", () => {
    expect(tileMarkupOf('<div><svg viewBox="0 0 1 1"/></div>')).toBe('<svg viewBox="0 0 1 1"/>');
  });

  it("falls back to the whole markup when there is no svg, or it never closes", () => {
    expect(tileMarkupOf("<table><tr><td>1</td></tr></table>")).toBe("<table><tr><td>1</td></tr></table>");
    expect(tileMarkupOf("<div><svg><g>")).toBe("<div><svg><g>");
  });
});
