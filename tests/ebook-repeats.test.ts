/**
 * What a Repeated PYQs book prints (2026-10-26): from a subject's homework
 * plan, every slot whose note says the board asked it again ("Asked N times")
 * or that its type keeps coming back ("This type asked N times"), chapter by
 * chapter in textbook order, in the plan's own order within a chapter (the
 * plan's order IS the ranking, as on the Top 10 tab). A slot belongs to the
 * chapter of its FIRST part, and a case study keeps every part, whatever
 * chapter a later part is filed under (the Top 10 rule, lib/homework/topPyqs).
 */
import { describe, it, expect } from "vitest";
import { isRepeatNote, pinChapterOrder, repeatChapters, repeatChaptersOfSubjects, type RepeatPlanRow } from "@/lib/ebooks/repeats";

const row = (
  day: number,
  position: number,
  note: string,
  chapter: [string, number] = ["Optics", 2],
  sub = 1,
  questionId = `q${day}-${position}-${sub}`
): RepeatPlanRow => ({ day, position, sub, note, questionId, chapterId: chapter[0], chapterName: chapter[0], chapterOrder: chapter[1] });

describe("isRepeatNote", () => {
  it("takes a question asked again and a recurring type", () => {
    expect(isRepeatNote("Asked 2 times: 2022, 2023")).toBe(true);
    expect(isRepeatNote("Asked 11 times: Mar 2015, Feb 2026")).toBe(true);
    expect(isRepeatNote("This type asked 2 times: 2022, 2024. This one: 2024")).toBe(true);
  });

  it("leaves out a question asked once", () => {
    expect(isRepeatNote("Asked once: Feb 2026")).toBe(false);
    expect(isRepeatNote("")).toBe(false);
  });
});

describe("repeatChapters", () => {
  const ELECTRO: [string, number] = ["Electrostatics", 1];
  const rows = [
    row(1, 1, "Asked 3 times: 2022, 2024, 2026"),
    row(1, 2, "Asked once: 2025"),
    row(1, 3, "Asked 2 times: 2023, 2025", ELECTRO),
    row(2, 1, "This type asked 2 times: 2022, 2024. This one: 2024"),
    // A case study: three parts, the third filed under another chapter.
    row(2, 2, "Asked 2 times: 2022, 2023", ["Optics", 2], 1),
    row(2, 2, "Asked 2 times: 2022, 2023", ["Optics", 2], 2),
    row(2, 2, "Asked 2 times: 2022, 2023", ELECTRO, 3),
    // A case study whose FIRST part is a once-asked question stays out whole.
    row(3, 1, "Asked once: 2024", ["Optics", 2], 1),
    row(3, 1, "Asked once: 2024", ["Optics", 2], 2),
  ];

  it("keeps only repeats and recurring types, chapters in textbook order", () => {
    const chapters = repeatChapters(rows);
    expect(chapters.map((c) => c.chapterName)).toEqual(["Electrostatics", "Optics"]);
    expect(chapters.flatMap((c) => c.slots.map((s) => s.note))).not.toContain("Asked once: 2025");
  });

  it("keeps the plan's order within a chapter and numbers the slots 1..n", () => {
    const optics = repeatChapters(rows).find((c) => c.chapterName === "Optics")!;
    expect(optics.slots.map((s) => s.number)).toEqual([1, 2, 3]);
    expect(optics.slots.map((s) => s.parts[0].questionId)).toEqual(["q1-1-1", "q2-1-1", "q2-2-1"]);
  });

  it("files a case study under its first part's chapter, every part kept, labelled (a) (b) (c)", () => {
    const chapters = repeatChapters(rows);
    const caseStudy = chapters.find((c) => c.chapterName === "Optics")!.slots[2];
    expect(caseStudy.parts.map((p) => p.label)).toEqual(["3 (a)", "3 (b)", "3 (c)"]);
    expect(caseStudy.parts.map((p) => p.questionId)).toEqual(["q2-2-1", "q2-2-2", "q2-2-3"]);
    const electro = chapters.find((c) => c.chapterName === "Electrostatics")!;
    expect(electro.slots.flatMap((s) => s.parts.map((p) => p.questionId))).toEqual(["q1-3-1"]);
  });

  it("labels a single question by its number alone", () => {
    expect(repeatChapters(rows)[0].slots[0].parts).toEqual([{ questionId: "q1-3-1", label: "1" }]);
  });

  it("counts questions asked again apart from recurring types", () => {
    const optics = repeatChapters(rows).find((c) => c.chapterName === "Optics")!;
    expect(optics.slots.map((s) => s.kind)).toEqual(["repeat", "type", "repeat"]);
  });

  it("returns nothing for a plan with no repeats", () => {
    expect(repeatChapters([row(1, 1, "Asked once: 2024")])).toEqual([]);
  });
});

// Competitive-exam books (2026-11-16): JEE and SSC chapters share order_index
// values (JEE Maths: 27 chapters, 7 values), so their books pin the order by
// chapter name, and a chapter the list does not name stops the build rather
// than landing somewhere by accident.
describe("pinChapterOrder", () => {
  const rows = [
    row(1, 1, "Asked 2 times: 2023, 2024", ["Vectors", 0]),
    row(1, 2, "Asked 2 times: 2023, 2024", ["Limits", 0]),
    row(1, 3, "Asked 2 times: 2023, 2024", ["Matrices", 0]),
  ];

  it("orders chapters by their place in the pinned list", () => {
    const pinned = pinChapterOrder(rows, ["Matrices", "Limits", "Vectors"]);
    expect(repeatChapters(pinned).map((c) => c.chapterName)).toEqual(["Matrices", "Limits", "Vectors"]);
  });

  it("refuses a chapter the list does not name", () => {
    expect(() => pinChapterOrder(rows, ["Matrices", "Limits"])).toThrow(/Vectors/);
  });

  it("leaves the rows it was given unchanged", () => {
    pinChapterOrder(rows, ["Matrices", "Limits", "Vectors"]);
    expect(rows.map((r) => r.chapterOrder)).toEqual([0, 0, 0]);
  });
});

// SSC CGL General Awareness (2026-11-16): one book from seven subjects' plans,
// one chapter per SUBJECT. Its first build gave each subject's chapters their
// own (34 chapters, many of 1-2 questions, each on two near-empty pages).
// Inside a subject, its chapters' order, then the plan's. Two plans share day
// and position numbers, so each is grouped on its own.
describe("repeatChaptersOfSubjects", () => {
  const history = [
    row(1, 1, "Asked 2 times: 2023, 2024", ["Modern India", 1]),
    row(1, 2, "Asked 2 times: 2023, 2024", ["Ancient India", 0]),
    row(2, 1, "This type asked 2 times: 2023, 2024. This one: 2024", ["Modern India", 1]),
  ];
  const polity = [row(1, 1, "Asked 3 times: 2023, 2024, 2025", ["Fundamental Rights", 0], 1, "p1")];
  const both = () =>
    repeatChaptersOfSubjects([
      { subject: "History", rows: history },
      { subject: "Polity", rows: polity },
    ]);

  it("prints one chapter per subject, in turn", () => {
    expect(both().map((c) => c.chapterName)).toEqual(["History", "Polity"]);
  });

  it("keeps a subject's chapters in order, then the plan's order, numbered 1..n", () => {
    const historyCh = both()[0];
    expect(historyCh.slots.map((s) => s.parts[0].questionId)).toEqual(["q1-2-1", "q1-1-1", "q2-1-1"]);
    expect(historyCh.slots.map((s) => s.number)).toEqual([1, 2, 3]);
    expect(historyCh.slots.map((s) => s.parts[0].label)).toEqual(["1", "2", "3"]);
    expect(historyCh.slots.map((s) => s.kind)).toEqual(["repeat", "repeat", "type"]);
  });

  it("keeps a slot from one plan apart from the same day and position in another", () => {
    expect(both()[1].slots[0].parts).toEqual([{ questionId: "p1", label: "1" }]);
  });

  it("relabels a case study's parts under its new number", () => {
    const withCase = [
      ...history,
      row(3, 1, "Asked 2 times: 2023, 2025", ["Modern India", 1], 1, "c1"),
      row(3, 1, "Asked 2 times: 2023, 2025", ["Modern India", 1], 2, "c2"),
    ];
    const ch = repeatChaptersOfSubjects([
      { subject: "History", rows: withCase },
      { subject: "Polity", rows: polity },
    ])[0];
    expect(ch.slots[3].parts).toEqual([
      { questionId: "c1", label: "4 (a)" },
      { questionId: "c2", label: "4 (b)" },
    ]);
  });

  it("drops a subject with no repeats", () => {
    const chapters = repeatChaptersOfSubjects([
      { subject: "History", rows: history },
      { subject: "Physics", rows: [row(1, 1, "Asked once: 2024")] },
    ]);
    expect(chapters.map((c) => c.chapterName)).toEqual(["History"]);
  });

  it("names a one-subject book's chapters plainly", () => {
    expect(repeatChaptersOfSubjects([{ subject: "History", rows: history }]).map((c) => c.chapterName)).toEqual([
      "Ancient India",
      "Modern India",
    ]);
  });
});
