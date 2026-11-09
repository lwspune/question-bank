import { describe, it, expect } from "vitest";
import { getExamBySlug, type ExamEntry } from "@/lib/exam/examContext";
import { groupExamFamilies } from "@/lib/exam/examFamily";
import type { ChapterLanding } from "@/lib/questions/landing";
import {
  wrapOffset,
  slotStyle,
  yearBarsFrom,
  mergeYearBars,
  buildShowcaseCards,
  MEMBER_LIMIT,
  type YearBars,
  examFactsFromLandings,
  showcaseItemsFromCatalog,
  type ShowcaseItem,
} from "@/lib/exam/examShowcase";
import type { ExamCatalogItem } from "@/lib/exam/allExamStats";

/**
 * The exam carousel in the homepage's navy panel (2026-11-09). The
 * position maths is pure so the server can place every card before any
 * JavaScript runs, and the client only changes which card is in front.
 */
describe("wrapOffset", () => {
  it("is 0 for the front card and counts steps either side", () => {
    expect(wrapOffset(3, 3, 9)).toBe(0);
    expect(wrapOffset(4, 3, 9)).toBe(1);
    expect(wrapOffset(1, 3, 9)).toBe(-2);
  });

  it("wraps round, so the last card sits just left of the first", () => {
    expect(wrapOffset(8, 0, 9)).toBe(-1);
    expect(wrapOffset(0, 8, 9)).toBe(1);
  });

  it("takes a fractional position while a card is dragged", () => {
    expect(wrapOffset(1, 0.25, 9)).toBeCloseTo(0.75);
    expect(wrapOffset(8, 0.5, 9)).toBeCloseTo(-1.5);
  });

  it("never offers an offset beyond half the ring", () => {
    for (let i = 0; i < 9; i++) expect(Math.abs(wrapOffset(i, 0, 9))).toBeLessThanOrEqual(4.5);
  });
});

describe("slotStyle", () => {
  it("shows the front card flat, full size and on top", () => {
    const s = slotStyle(0);
    expect(s).toMatchObject({ rotateY: 0, scale: 1, z: 0, hidden: false, shade: 0 });
    expect(s.zIndex).toBeGreaterThan(slotStyle(1).zIndex);
  });

  it("turns side cards towards the middle and pushes them back", () => {
    expect(slotStyle(1).rotateY).toBeLessThan(0);
    expect(slotStyle(-1).rotateY).toBeGreaterThan(0);
    expect(slotStyle(1).z).toBeLessThan(0);
    expect(slotStyle(2).scale).toBeLessThan(slotStyle(1).scale);
  });

  it("is the same either side of the front", () => {
    expect(slotStyle(-2).scale).toBe(slotStyle(2).scale);
    expect(slotStyle(-2).zIndex).toBe(slotStyle(2).zIndex);
    expect(slotStyle(-2).rotateY).toBe(-slotStyle(2).rotateY);
  });

  it("hides cards more than two places away", () => {
    expect(slotStyle(2).hidden).toBe(false);
    expect(slotStyle(3).hidden).toBe(true);
    expect(slotStyle(-4).hidden).toBe(true);
  });

  it("keeps the turn and the shade within bounds however far a card is dragged", () => {
    expect(Math.abs(slotStyle(9).rotateY)).toBeLessThanOrEqual(50);
    expect(slotStyle(9).shade).toBeLessThanOrEqual(0.6);
  });
});

const slugById = { "id-nda": "nda", "id-jee": "jee-mains" };

describe("yearBarsFrom", () => {
  it("gives one bar per year from first to last, with a missing year at 0", () => {
    const bars = yearBarsFrom(
      [
        { exam_id: "id-nda", pyq_year: 2022, questions: 50 },
        { exam_id: "id-nda", pyq_year: 2024, questions: 100 },
      ],
      slugById
    );
    expect(bars.nda.from).toBe(2022);
    expect(bars.nda.to).toBe(2024);
    expect(bars.nda.bars.map((b) => [b.year, b.count])).toEqual([[2022, 50], [2023, 0], [2024, 100]]);
  });

  it("sizes each bar against the exam's busiest year", () => {
    const bars = yearBarsFrom(
      [
        { exam_id: "id-nda", pyq_year: 2023, questions: 25 },
        { exam_id: "id-nda", pyq_year: 2024, questions: 100 },
      ],
      slugById
    );
    expect(bars.nda.bars.map((b) => b.height)).toEqual([0.25, 1]);
  });

  it("keeps only the latest years when there are many", () => {
    const rows = Array.from({ length: 13 }, (_, i) => ({ exam_id: "id-nda", pyq_year: 2014 + i, questions: 30 }));
    const bars = yearBarsFrom(rows, slugById, 10);
    expect(bars.nda.bars).toHaveLength(10);
    expect(bars.nda.from).toBe(2014);
    expect(bars.nda.bars[0].year).toBe(2017);
    expect(bars.nda.to).toBe(2026);
  });

  it("leaves out a year with only a few questions, so a card never claims papers it lacks", () => {
    // JEE Mains holds 9 real AIEEE / JEE Main questions from 2012 to 2020,
    // reprinted in a coaching module: true past-year questions, but not papers.
    const bars = yearBarsFrom(
      [
        { exam_id: "id-jee", pyq_year: 2012, questions: 1 },
        { exam_id: "id-jee", pyq_year: 2019, questions: 3 },
        { exam_id: "id-jee", pyq_year: 2021, questions: 1800 },
        { exam_id: "id-jee", pyq_year: 2022, questions: 2000 },
      ],
      slugById
    );
    expect([bars["jee-mains"].from, bars["jee-mains"].to]).toEqual([2021, 2022]);
    expect(bars["jee-mains"].bars.map((b) => b.year)).toEqual([2021, 2022]);
  });

  it("drops an exam whose every year is that thin", () => {
    expect(yearBarsFrom([{ exam_id: "id-nda", pyq_year: 2024, questions: 5 }], slugById)).toEqual({});
  });

  it("ignores an exam id it cannot name", () => {
    expect(yearBarsFrom([{ exam_id: "id-x", pyq_year: 2024, questions: 3 }], slugById)).toEqual({});
  });

  it("adds two rows for the same exam and year", () => {
    const bars = yearBarsFrom(
      [
        { exam_id: "id-jee", pyq_year: 2024, questions: 13 },
        { exam_id: "id-jee", pyq_year: 2024, questions: 14 },
      ],
      slugById
    );
    expect(bars["jee-mains"].bars).toEqual([{ year: 2024, count: 27, height: 1 }]);
  });
});

describe("mergeYearBars", () => {
  it("adds a family's members year by year", () => {
    const a: YearBars = { from: 2023, to: 2024, bars: [{ year: 2023, count: 10, height: 0.5 }, { year: 2024, count: 20, height: 1 }] };
    const b: YearBars = { from: 2024, to: 2025, bars: [{ year: 2024, count: 20, height: 1 }, { year: 2025, count: 10, height: 0.5 }] };
    const m = mergeYearBars([a, b])!;
    expect(m.bars.map((x) => [x.year, x.count, x.height])).toEqual([[2023, 10, 0.25], [2024, 40, 1], [2025, 10, 0.25]]);
    expect([m.from, m.to]).toEqual([2023, 2025]);
  });

  it("is null when no member has years", () => {
    expect(mergeYearBars([])).toBeNull();
  });
});

const starter = (slug: string, questionCount: number, kind: "pyq" | "practice" = "pyq"): ShowcaseItem => ({
  slug,
  displayName: getExamBySlug(slug)?.displayName ?? slug,
  questionCount,
  kind,
  href: `/browse?examId=${slug}`,
});
const resolve = (s: ShowcaseItem): ExamEntry | null => getExamBySlug(s.slug);

describe("buildShowcaseCards", () => {
  const nodes = groupExamFamilies(
    [starter("nda", 4860), starter("cbse-10", 100), starter("cbse-11", 200, "practice"), starter("cbse-12", 300), starter("jee-mains", 900)],
    resolve
  );
  const facts = {
    nda: { subjects: ["Mathematics", "English"], topChapter: { name: "Trigonometry", href: "/t", count: 400 } },
    "cbse-12": { subjects: ["Physics"], topChapter: { name: "Optics", href: "/o", count: 90 } },
    "cbse-10": { subjects: ["Science", "Physics"], topChapter: { name: "Light", href: "/l", count: 95 } },
  };
  const bars = { nda: { from: 2014, to: 2026, bars: [{ year: 2026, count: 300, height: 1 }] } };
  const cards = buildShowcaseCards(nodes, resolve, facts, bars, 9);

  it("makes one card per exam or family, in the given order", () => {
    expect(cards.map((c) => c.key)).toEqual(["nda", "CBSE", "jee-mains"]);
  });

  it("links a single exam's card to its filtered view", () => {
    expect(cards[0]).toMatchObject({ name: "NDA", goal: "defence", count: 4860, href: "/browse?examId=nda", members: [], rememberSlug: "nda" });
    expect(cards[0].subjects).toEqual(["Mathematics", "English"]);
    expect(cards[0].topChapter?.name).toBe("Trigonometry");
    expect(cards[0].years?.from).toBe(2014);
  });

  it("gives a family card its members as links instead of one link, and adds up the count", () => {
    const cbse = cards[1];
    expect(cbse).toMatchObject({ name: "CBSE", goal: "boards", count: 600, href: null, rememberSlug: null });
    expect(cbse.members.map((m) => [m.label, m.href])).toEqual([
      ["Class 10", "/browse?examId=cbse-10"],
      ["Class 11", "/browse?examId=cbse-11"],
      ["Class 12", "/browse?examId=cbse-12"],
    ]);
  });

  it("takes a family's top chapter from whichever member has the biggest one, and merges its subjects", () => {
    expect(cards[1].topChapter?.name).toBe("Light");
    expect(cards[1].subjects).toEqual(["Science", "Physics"]);
  });

  it("leaves out what it does not know rather than inventing it", () => {
    expect(cards[2]).toMatchObject({ subjects: [], topChapter: null, years: null });
  });

  it("says what kind of question the count is", () => {
    expect(cards[0].countKind).toBe("pyq");
    // CBSE Class 11 is practice-only, so the family's total mixes both kinds.
    expect(cards[1].countKind).toBe("mixed");
    const [ws] = buildShowcaseCards(groupExamFamilies([starter("worksheets-11-12", 70, "practice")], resolve), resolve, {}, {}, 9);
    expect(ws.countKind).toBe("practice");
  });

  it("stops at the limit", () => {
    expect(buildShowcaseCards(nodes, resolve, facts, bars, 2).map((c) => c.key)).toEqual(["nda", "CBSE"]);
  });

  it(`shows at most ${MEMBER_LIMIT} member links and counts the rest`, () => {
    const mpsc = groupExamFamilies(
      ["mpsc-group-b-c", "mpsc-state-services-prelims", "mpsc-state-services-mains", "mpsc-sti-mains", "mpsc-aso-mains", "mpsc-psi-mains"].map((s) => starter(s, 10)),
      resolve
    );
    const [card] = buildShowcaseCards(mpsc, resolve, {}, {}, 9);
    expect(card.members).toHaveLength(MEMBER_LIMIT);
    expect(card.moreMembers).toBe(6 - MEMBER_LIMIT);
  });

  it("skips a node the registry does not know", () => {
    const odd = groupExamFamilies([starter("not-an-exam", 5), starter("nda", 1)], resolve);
    expect(buildShowcaseCards(odd, resolve, {}, {}, 9).map((c) => c.key)).toEqual(["nda"]);
  });
});

describe("examFactsFromLandings", () => {
  const withSubject = (examSlug: string, subjectName: string, chapterName: string, n: number): ChapterLanding => ({
    ...landing(examSlug, chapterName, n),
    subjectName,
  });
  const facts = examFactsFromLandings([
    withSubject("nda", "English", "Spotting Errors", 300),
    withSubject("nda", "Mathematics", "Trigonometry", 400),
    withSubject("nda", "Mathematics", "Matrices", 350),
    withSubject("nda", "Physics", "Optics", 100),
    withSubject("nda", "Chemistry", "Acids", 90),
    withSubject("nda", "Biology", "Cells", 80),
    withSubject("cds", "English", "Cloze", 0),
  ]);

  it("lists an exam's subjects biggest first, by the questions their chapters hold", () => {
    expect(facts.nda.subjects).toEqual(["Mathematics", "English", "Physics", "Chemistry"]);
  });

  it("names the exam's biggest chapter, linked to its chapter page", () => {
    expect(facts.nda.topChapter).toEqual({
      name: "Trigonometry",
      count: 400,
      href: "/questions/nda/nda-sub/trigonometry",
    });
  });

  it("leaves out an exam whose chapters hold no questions", () => {
    expect(facts.cds).toBeUndefined();
  });
});

function landing(examSlug: string, chapterName: string, questionCount: number): ChapterLanding {
  return {
    examSlug,
    subjectSlug: `${examSlug}-sub`,
    chapterSlug: chapterName.toLowerCase(),
    examName: examSlug.toUpperCase(),
    subjectName: "Maths",
    chapterName,
    profile: null,
    examId: `exam-${examSlug}`,
    subjectId: `subject-${examSlug}`,
    chapterId: `chapter-${chapterName}`,
    questionCount,
    practiceOnly: false,
    lastAdded: null,
  };
}


describe("showcaseItemsFromCatalog", () => {
  const item = (slug: string, pyq: number, practice: number, practiceOnly = false): ExamCatalogItem => ({
    slug,
    displayName: slug.toUpperCase(),
    examName: slug,
    totalPublicQuestions: pyq + practice,
    counts: { pyq, practice },
    practiceOnly,
    boardExam: false,
    href: `/exams/${slug}`,
    examId: `id-${slug}`,
  });

  it("counts past-year questions, and links each exam to its own page", () => {
    expect(showcaseItemsFromCatalog([item("nda", 5000, 3000)])).toEqual([
      { slug: "nda", displayName: "NDA", questionCount: 5000, kind: "pyq", href: "/exams/nda" },
    ]);
  });

  it("counts practice questions for a practice-only exam", () => {
    expect(showcaseItemsFromCatalog([item("worksheets-11-12", 0, 7375, true)])[0]).toMatchObject({ questionCount: 7375, kind: "practice" });
  });

  it("leaves out an exam with nothing to show", () => {
    expect(showcaseItemsFromCatalog([item("cds", 0, 40), item("nda", 10, 0)]).map((x) => x.slug)).toEqual(["nda"]);
  });
});
