/**
 * V's exam_strategy tool (2026-10-19, study-partner Phase 2): the share of an
 * exam's past-year questions each chapter (or subject) carries, read from the
 * bank year by year, so "weightage?" and "what will come in 2027?" get real
 * numbers instead of "I don't have that data".
 */
import { describe, it, expect, vi } from "vitest";
import { examsNamed, type ChapterSearchRow } from "@/lib/chat/chapterSearch";
import { examStrategyTool, strategyText, type StrategyData } from "@/lib/chat/examStrategy";

function ch(id: string, name: string, subject: string, byYear: Record<string, number>) {
  return { id, name, subject, byYear };
}

// NDA-like: two subjects, five years, Maths heavier.
const NDA: StrategyData = {
  examName: "NDA",
  board: false,
  chapters: [
    ch("trig", "Trigonometry", "Mathematics", { 2022: 10, 2023: 12, 2024: 14, 2025: 12, 2026: 14 }),
    ch("mat", "Matrices", "Mathematics", { 2022: 8, 2023: 8, 2024: 6, 2025: 8, 2026: 6 }),
    ch("prob", "Probability", "Mathematics", { 2024: 4, 2026: 6 }),
    ch("old", "Old Topic", "Mathematics", { 2022: 5 }),
    ch("rc", "Reading Comprehension", "English", { 2022: 6, 2023: 6, 2024: 5, 2025: 5, 2026: 5 }),
  ],
};
const pathOf = (id: string) => (id === "old" ? null : `/questions/nda/x/${id}`);
const NDA_GUIDES = [
  { href: "/guide/nda-maths", label: "NDA Mathematics" },
  { href: "/guide/nda-english", label: "NDA English (GAT)" },
];

describe("strategyText for one subject", () => {
  const out = strategyText(NDA, { subject: "maths", guides: NDA_GUIDES, pathOf });

  it("gives each chapter's share of the last 3 years, biggest first, with its page", () => {
    // 2024-2026 Maths: trig 40, mat 20, prob 10 = 70.
    const lines = out.text.split("\n");
    const trig = lines.findIndex((l) => l.includes("Trigonometry"));
    const mat = lines.findIndex((l) => l.includes("Matrices"));
    expect(out.text).toContain("NDA Mathematics");
    expect(out.text).toContain("2024-2026");
    expect(lines[trig]).toContain("57%");
    expect(lines[trig]).toContain("/questions/nda/x/trig");
    expect(lines[mat]).toContain("29%");
    expect(trig).toBeLessThan(mat);
  });

  it("says in how many of the last five years each chapter was asked", () => {
    expect(out.text).toMatch(/Trigonometry[^\n]*5 of 5 years/);
    expect(out.text).toMatch(/Probability[^\n]*2 of 5 years/);
  });

  it("leaves out a chapter not asked in the last three years from the ranking", () => {
    expect(out.text).not.toMatch(/^- Old Topic/m);
  });

  it("names the chapters asked every year, for 'what will come next year'", () => {
    expect(out.text).toMatch(/every one of[^\n]*Trigonometry, Matrices/);
    expect(out.text).not.toMatch(/every one of[^\n]*Probability/);
  });

  it("links the subject's guide and returns every path it names", () => {
    expect(out.text).toContain("/guide/nda-maths");
    expect(out.text).not.toContain("/guide/nda-english");
    expect(out.paths).toEqual(expect.arrayContaining(["/questions/nda/x/trig", "/questions/nda/x/mat", "/guide/nda-maths"]));
  });

  it("says the numbers are shares of the bank's past papers, not an official weight", () => {
    expect(out.text).toMatch(/not an official/i);
  });
});

describe("strategyText without a subject", () => {
  it("gives each subject's share on a paper of several subjects and asks which to break down", () => {
    const out = strategyText(NDA, { guides: NDA_GUIDES, pathOf });
    // 2024-2026: Maths 70, English 15 = 85.
    expect(out.text).toMatch(/Mathematics 82%/);
    expect(out.text).toMatch(/English 18%/);
    expect(out.text).toMatch(/which subject/i);
    expect(out.paths).toEqual(expect.arrayContaining(["/guide/nda-maths", "/guide/nda-english"]));
  });

  it("goes straight to chapters when the exam has one subject", () => {
    const one: StrategyData = { ...NDA, chapters: NDA.chapters.filter((c) => c.subject === "Mathematics") };
    expect(strategyText(one, { guides: [], pathOf }).text).toMatch(/Trigonometry[^\n]*57%/);
  });

  it("on a board exam asks for the subject (each is its own paper) and gives no subject shares", () => {
    const board: StrategyData = { ...NDA, examName: "CBSE Class 12", board: true };
    const out = strategyText(board, { guides: [], pathOf });
    expect(out.text).toMatch(/which subject/i);
    expect(out.text).toContain("Mathematics, English");
    expect(out.text).not.toMatch(/\d+%/);
  });
});

describe("strategyText for NDA GAT", () => {
  // GAT is every NDA subject but Mathematics: shares are taken within it, not of the whole NDA bank.
  const gat: StrategyData = {
    ...NDA,
    chapters: [...NDA.chapters, ch("mech", "Mechanics", "Physics", { 2024: 5, 2025: 5, 2026: 5 })],
  };

  it("gives each GAT subject's share of GAT, leaving Mathematics out", () => {
    const out = strategyText(gat, { subject: "GAT", guides: NDA_GUIDES, pathOf });
    // 2024-2026: English 15, Physics 15 = 30.
    expect(out.text).toContain("NDA GAT");
    expect(out.text).toMatch(/English 50%/);
    expect(out.text).toMatch(/Physics 50%/);
    expect(out.text).not.toMatch(/Mathematics \d/);
    expect(out.paths).toContain("/guide/nda-english");
    expect(out.paths).not.toContain("/guide/nda-maths");
  });

  it("knows the paper by its full name too", () => {
    expect(strategyText(gat, { subject: "general ability test", guides: [], pathOf }).text).toMatch(/English 50%/);
  });
});

describe("strategyText edge cases", () => {
  it("lists the subjects when the one asked for has no past papers", () => {
    const out = strategyText(NDA, { subject: "biology", guides: [], pathOf });
    expect(out.text).toMatch(/no past-year questions for biology/i);
    expect(out.text).toContain("Mathematics, English");
  });

  it("asks which one when the subject words fit two subjects", () => {
    const two: StrategyData = {
      examName: "Maharashtra State Board Class 10",
      board: true,
      chapters: [
        ch("g", "Gravitation", "Science and Technology I", { 2025: 3 }),
        ch("h", "Heredity", "Science and Technology II", { 2025: 3 }),
      ],
    };
    const out = strategyText(two, { subject: "science", guides: [], pathOf });
    expect(out.text).toMatch(/Science and Technology I or Science and Technology II/);
    expect(strategyText(two, { subject: "science 2", guides: [], pathOf }).text).toContain("Heredity");
  });

  it("points board-exam chapters to the Top 10 PYQs on /board", () => {
    const board: StrategyData = { ...NDA, examName: "CBSE Class 12", board: true };
    expect(strategyText(board, { subject: "mathematics", guides: [], pathOf }).text).toContain("/board");
  });

  it("uses the subject's own latest years when it was added later than the others", () => {
    const late: StrategyData = {
      examName: "X",
      board: false,
      chapters: [
        ch("a", "A", "Maths", { 2014: 5, 2015: 5, 2016: 5 }),
        ch("b", "B", "Biology", { 2024: 3, 2026: 1 }),
      ],
    };
    const out = strategyText(late, { subject: "maths", guides: [], pathOf });
    expect(out.text).toContain("2014-2016");
  });

  it("names non-consecutive years one by one", () => {
    const gaps: StrategyData = { examName: "X", board: false, chapters: [ch("a", "A", "English", { 2011: 2, 2016: 2, 2017: 2 })] };
    expect(strategyText(gaps, { guides: [], pathOf }).text).toContain("2011, 2016, 2017");
  });

  it("says there is nothing to quote when the exam has no past-year questions", () => {
    const none: StrategyData = { examName: "Foundation Course", board: false, chapters: [] };
    expect(strategyText(none, { guides: [], pathOf }).text).toMatch(/no past-year questions/i);
  });
});

function row(examSlug: string, examName: string, subjectName: string, chapterName: string, chapterId: string): ChapterSearchRow {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    examSlug,
    examName,
    subjectSlug: slug(subjectName),
    subjectName,
    chapterSlug: slug(chapterName),
    chapterName,
    questionCount: 50,
    practiceOnly: false,
    chapterId,
  };
}

const ROWS: ChapterSearchRow[] = [
  row("nda", "NDA", "Mathematics", "Trigonometry", "trig"),
  row("ssc-cgl", "SSC CGL", "Reasoning", "Coding", "c1"),
  row("ssc-cgl-tier-2", "SSC CGL Tier II", "Reasoning", "Coding", "c2"),
  row("cbse-12", "CBSE Class 12", "Physics", "Atoms", "a1"),
  row("mh-hsc-12", "Maharashtra HSC Class 12", "Physics", "Atoms", "a2"),
  row("mht-cet", "MHT-CET", "Maths", "Limits", "l1"),
];

describe("examsNamed", () => {
  it("finds an exam by its name or a short form of it", () => {
    expect(examsNamed(ROWS, "nda").map((e) => e.slug)).toEqual(["nda"]);
    expect(examsNamed(ROWS, "cet").map((e) => e.slug)).toEqual(["mht-cet"]);
  });

  it("prefers the exam named exactly over a longer one holding the same words", () => {
    expect(examsNamed(ROWS, "SSC CGL").map((e) => e.slug)).toEqual(["ssc-cgl"]);
    expect(examsNamed(ROWS, "ssc cgl tier 2").map((e) => e.slug)).toEqual(["ssc-cgl-tier-2"]);
  });

  it("returns every exam a class alone fits, so V asks", () => {
    expect(examsNamed(ROWS, "class 12").map((e) => e.slug).sort()).toEqual(["cbse-12", "mh-hsc-12"]);
  });

  it("returns nothing for an exam we do not have", () => {
    expect(examsNamed(ROWS, "gate")).toEqual([]);
  });
});

describe("examStrategyTool", () => {
  function tool(data: StrategyData | null = NDA) {
    const loadStrategy = vi.fn(async () => data);
    const paths = new Set<string>();
    const t = examStrategyTool({
      loadChapters: async () => ROWS,
      loadStrategy,
      guidesFor: (slug) => (slug === "nda" ? NDA_GUIDES : []),
      onPaths: (p) => p.forEach((x) => paths.add(x)),
    });
    return { t, loadStrategy, paths };
  }

  it("reads the named exam's numbers and allows the pages it names", async () => {
    const { t, loadStrategy, paths } = tool();
    const text = await t.run({ exam: "NDA", subject: "Mathematics" });
    expect(loadStrategy).toHaveBeenCalledWith("nda");
    expect(text).toMatch(/Trigonometry[^\n]*57%/);
    // pathOf comes from the chapter list: trig is listed as an NDA Mathematics page.
    expect(paths.has("/questions/nda/mathematics/trigonometry")).toBe(true);
    expect(paths.has("/guide/nda-maths")).toBe(true);
    expect(t.logResult).toBe(true);
  });

  // 2026-10-19 replay: "NDA GAT weightage" was read as English alone; GAT is every subject but Maths.
  it("tells V to pass the paper's name for NDA GAT", () => {
    const { t } = tool();
    const props = t.input_schema.properties as Record<string, { description: string }>;
    expect(props.subject.description).toMatch(/'GAT'/);
  });

  it("asks which exam when the name fits several, without reading anything", async () => {
    const { t, loadStrategy } = tool();
    const text = await t.run({ exam: "class 12" });
    expect(text).toMatch(/CBSE Class 12 or Maharashtra HSC Class 12/);
    expect(loadStrategy).not.toHaveBeenCalled();
  });

  it("says so when no exam matched or none was given", async () => {
    const { t } = tool();
    expect(await t.run({ exam: "gate" })).toMatch(/ask which exam/i);
    expect(await t.run({})).toMatch(/ask which exam/i);
  });

  it("points to /guide when the numbers cannot be read", async () => {
    const { t } = tool(null);
    expect(await t.run({ exam: "NDA" })).toMatch(/unavailable/i);
  });
});
