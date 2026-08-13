/**
 * The unfiltered-`/browse` landing decision.
 *
 * MEASURED, 24h of production traffic: 48% of `/browse` renders carry no
 * filters at all (683 of 1,415), and that exact shape is the one that runs the
 * ~2.1s unfiltered id-query — the source of 98% of every 500 this project's
 * database serves. Deep filtering, which is what `/browse` exists for, is 11%.
 *
 * So the bare page skips the question query entirely and renders a cached
 * starting panel instead. Two invariants carry the safety:
 *
 *   1. `isBareBrowse` must be TRUE only when the query really would be
 *      unnarrowed. `countActiveFilters` in the page is NOT usable for this —
 *      it ignores `extraIds` and `fit`, both of which narrow the result set.
 *      A false positive here would show a "here's the whole bank" panel to
 *      someone who asked for a subset, so the predicate compares against
 *      EMPTY_FILTERS wholesale and a new Filters field cannot slip past it.
 *
 *   2. Org members keep the live list. Their counts are RLS-scoped and include
 *      their own PRIVATE rows; a cached PUBLIC-only panel would under-report
 *      the bank to the only people who can see the difference.
 */
import { describe, it, expect } from "vitest";
import {
  isBareBrowse,
  shouldShowBrowseLanding,
  buildExamStarters,
  pickStarterChapters,
} from "../src/lib/questions/browseLanding";
import { EMPTY_FILTERS, type Filters } from "../src/lib/questions/filters";
import type { ExamCatalog } from "../src/lib/exam/allExamStats";
import type { ChapterLanding } from "../src/lib/questions/landing";

const bare: Filters = { ...EMPTY_FILTERS, page: 1 };

describe("isBareBrowse", () => {
  it("is true for the default filter set on page 1", () => {
    expect(isBareBrowse(bare)).toBe(true);
  });

  it("is false past page 1 — there is no list to paginate on the panel", () => {
    expect(isBareBrowse({ ...bare, page: 2 })).toBe(false);
  });

  it.each<[string, Partial<Filters>]>([
    ["examId", { examId: "11111111-1111-1111-1111-111111111111" }],
    ["subjectId", { subjectId: "22222222-2222-2222-2222-222222222222" }],
    ["chapterIds", { chapterIds: ["33333333-3333-3333-3333-333333333333"] }],
    ["subtopicIds", { subtopicIds: ["44444444-4444-4444-4444-444444444444"] }],
    ["difficulties", { difficulties: ["HARD"] }],
    ["pyqYears", { pyqYears: [2024] }],
    ["principleSlug", { principleSlug: "vieta-symmetric-roots" }],
    ["kind=practice", { kind: "practice" }],
    ["kind=all", { kind: "all" }],
    ["q", { q: "vectors" }],
    // The two the page's own countActiveFilters misses. Both narrow the query.
    ["extraIds", { extraIds: ["55555555-5555-5555-5555-555555555555"] }],
    ["fit=answerable", { fit: "answerable" }],
    ["fit=excluded", { fit: "excluded" }],
  ])("is false when %s narrows the result set", (_label, override) => {
    expect(isBareBrowse({ ...bare, ...override })).toBe(false);
  });

  it("covers every field of Filters — a new one cannot slip through", () => {
    // If someone adds a narrowing field to Filters, this fails until the
    // predicate is taught about it, rather than silently returning true.
    for (const key of Object.keys(EMPTY_FILTERS) as (keyof Filters)[]) {
      if (key === "page") continue;
      const current = EMPTY_FILTERS[key];
      const changed = Array.isArray(current)
        ? ["66666666-6666-6666-6666-666666666666"]
        : typeof current === "string"
          ? `${current}-changed`
          : typeof current === "number"
            ? (current as number) + 1
            : "changed";
      expect(
        isBareBrowse({ ...bare, [key]: changed } as Filters),
        `isBareBrowse ignored a non-default "${String(key)}"`
      ).toBe(false);
    }
  });
});

describe("shouldShowBrowseLanding", () => {
  it("shows the panel to an anonymous visitor on the bare page", () => {
    expect(shouldShowBrowseLanding({ filters: bare, isStaff: false })).toBe(true);
  });

  it("keeps the live list for org members — their counts include PRIVATE rows", () => {
    expect(shouldShowBrowseLanding({ filters: bare, isStaff: true })).toBe(false);
  });

  it("never replaces a filtered result set", () => {
    const filtered = { ...bare, examId: "77777777-7777-7777-7777-777777777777" };
    expect(shouldShowBrowseLanding({ filters: filtered, isStaff: false })).toBe(false);
  });
});

describe("buildExamStarters", () => {
  const catalog: ExamCatalog = {
    totalPublicQuestions: 19_000,
    exams: [
      item("nda", "NDA", "NDA", 8259),
      item("jee-mains", "JEE Mains", "JEE Mains", 10614),
      item("cds", "CDS", "CDS English", 0),
      item("ipmat", "IPMAT", "IPMAT", 500),
    ],
  };
  const ids = {
    nda: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    "jee-mains": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    cds: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    ipmat: null,
  };
  // The kind-scoped counts, i.e. what the pill's DESTINATION actually shows.
  const counts = { nda: 4860, "jee-mains": 10614, cds: 0 };

  it("links each exam to its own filtered view, in catalog order", () => {
    const out = buildExamStarters(catalog, ids, counts);
    expect(out.map((e) => e.slug)).toEqual(["nda", "jee-mains"]);
    expect(out[0]).toMatchObject({
      displayName: "NDA",
      href: `/browse?examId=${ids.nda}`,
    });
  });

  it("shows the count the DESTINATION will show, not the catalog's total", () => {
    // The catalog's per-exam number is total PUBLIC (pyq + practice); a bare
    // `?examId=` view defaults to PYQ only. Advertising 8,259 and landing on
    // 4,860 is a contradiction one click wide, so the pill carries the
    // kind-scoped figure.
    const [nda] = buildExamStarters(catalog, ids, counts);
    expect(nda.questionCount).toBe(4860);
    expect(nda.questionCount).not.toBe(8259);
  });

  it("drops an exam with no questions in the default view — a dead-end pill", () => {
    expect(buildExamStarters(catalog, ids, counts).map((e) => e.slug)).not.toContain(
      "cds"
    );
  });

  it("drops an exam absent from the counts entirely", () => {
    expect(buildExamStarters(catalog, ids, {}).map((e) => e.slug)).toEqual([]);
  });

  it("drops an exam with no resolved UUID — there is no filter to apply", () => {
    expect(buildExamStarters(catalog, ids, counts).map((e) => e.slug)).not.toContain(
      "ipmat"
    );
  });

  it("returns an empty list rather than throwing when the catalog is empty", () => {
    expect(buildExamStarters({ exams: [], totalPublicQuestions: 0 }, {}, {})).toEqual(
      []
    );
  });
});

describe("pickStarterChapters", () => {
  const landings = [
    landing("nda", "Vectors", 900),
    landing("nda", "Statistics", 800),
    landing("nda", "Probability", 700),
    landing("jee-mains", "Integration", 600),
    landing("jee-mains", "Matrices", 500),
    landing("jee-mains", "Circles", 400),
    landing("mht-cet", "Optics", 300),
    landing("cds", "Comprehension", 0),
  ];

  it("orders by question count, densest first", () => {
    const out = pickStarterChapters(landings, { perExam: 3, total: 10 });
    expect(out.map((c) => c.chapterName)).toEqual([
      "Vectors",
      "Statistics",
      "Probability",
      "Integration",
      "Matrices",
      "Circles",
      "Optics",
    ]);
  });

  it("caps per exam so one big exam cannot fill the panel", () => {
    const out = pickStarterChapters(landings, { perExam: 1, total: 10 });
    expect(out.map((c) => c.chapterName)).toEqual([
      "Vectors",
      "Integration",
      "Optics",
    ]);
  });

  it("caps the total", () => {
    expect(pickStarterChapters(landings, { perExam: 3, total: 2 })).toHaveLength(2);
  });

  it("drops chapters with no PUBLIC questions", () => {
    const names = pickStarterChapters(landings, { perExam: 5, total: 20 }).map(
      (c) => c.chapterName
    );
    expect(names).not.toContain("Comprehension");
  });

  it("links to a filtered browse, carrying exam + subject + chapter", () => {
    const [top] = pickStarterChapters(landings, { perExam: 1, total: 1 });
    expect(top.href).toBe(
      "/browse?examId=exam-nda&subjectId=subject-nda&chapterIds=chapter-Vectors"
    );
  });

  it("breaks ties by name so the cached panel is stable between builds", () => {
    const tied = [landing("nda", "Beta", 100), landing("nda", "Alpha", 100)];
    expect(
      pickStarterChapters(tied, { perExam: 5, total: 5 }).map((c) => c.chapterName)
    ).toEqual(["Alpha", "Beta"]);
  });
});

function landing(
  examSlug: string,
  chapterName: string,
  questionCount: number
): ChapterLanding {
  return {
    examSlug,
    subjectSlug: `${examSlug}-sub`,
    chapterSlug: chapterName.toLowerCase(),
    examName: examSlug.toUpperCase(),
    subjectName: "Maths",
    chapterName,
    examId: `exam-${examSlug}`,
    subjectId: `subject-${examSlug}`,
    chapterId: `chapter-${chapterName}`,
    questionCount,
    practiceOnly: false,
    lastAdded: null,
  };
}

function item(
  slug: string,
  displayName: string,
  examName: string,
  totalPublicQuestions: number
) {
  return {
    slug,
    displayName,
    examName,
    totalPublicQuestions,
    practiceOnly: false,
    boardExam: false,
    href: `/notes/${slug}`,
  };
}
