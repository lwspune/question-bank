import { describe, it, expect } from "vitest";
import {
  buildPaperSections,
  downloadPageTitle,
  isReadablePaper,
  paperPageDescription,
  paperPageHref,
  paperPageTitle,
  paperYearRange,
  pastPaperHubLink,
  plainPaperTitle,
} from "@/lib/mocks/paperPage";
import type { MockSnapshotQuestion, ReviewQuestionContent } from "@/lib/mocks/query";
import { TITLE_MAX } from "@/lib/seo/title";

/**
 * The past paper reading page (2026-10-15): /mock/<slug>/paper prints a whole
 * past paper, every question in the order it was set, so a search engine or
 * ChatGPT has something to read. /mock/<slug> itself stays the thin start page.
 * Why: asked "best free website for MHT CET previous year questions", ChatGPT
 * named three sites that show their papers; ours were a title and a button.
 */

const snap = (position: number, sectionKey: string, over: Partial<MockSnapshotQuestion> = {}): MockSnapshotQuestion => ({
  position,
  questionId: `q${position}`,
  sectionKey,
  marks: 2,
  negMarks: 0,
  ...over,
});

const mcq = (over: Partial<ReviewQuestionContent> = {}): ReviewQuestionContent => ({
  text: "What is 2 + 2?",
  context: null,
  imageUrl: null,
  solution: "Add them.",
  solutionImageUrl: null,
  options: [
    { label: "A", text: "3", imageUrl: null, isCorrect: false },
    { label: "B", text: "4", imageUrl: null, isCorrect: true },
  ],
  format: "mcq",
  numericAnswer: null,
  ...over,
});

describe("isReadablePaper / paperPageHref", () => {
  it("reads only a whole past paper", () => {
    expect(isReadablePaper({ source: "pyq", scope: "full" })).toBe(true);
    expect(isReadablePaper({ source: "practice", scope: "full" })).toBe(false);
    expect(isReadablePaper({ source: "pyq", scope: "sectional" })).toBe(false);
  });

  it("lives under the mock's own slug", () => {
    expect(paperPageHref("mht-cet-2026-may-19-s1-maths")).toBe("/mock/mht-cet-2026-may-19-s1-maths/paper");
  });
});

describe("plainPaperTitle", () => {
  it("turns the stored dashes into commas (no em dashes in visible text)", () => {
    expect(plainPaperTitle("MHT-CET 2026 (19 May Shift I) — Paper I — Mathematics")).toBe(
      "MHT-CET 2026 (19 May Shift I), Paper I, Mathematics"
    );
    expect(plainPaperTitle("CDS (II) 2022 – Elementary Mathematics")).toBe("CDS (II) 2022, Elementary Mathematics");
    expect(plainPaperTitle("Re-NEET (UG) 2026")).toBe("Re-NEET (UG) 2026");
  });
});

describe("paperPageTitle", () => {
  it("names the paper as a question paper with answers when it fits", () => {
    expect(paperPageTitle("Re-NEET (UG) 2026")).toBe("Re-NEET (UG) 2026 question paper with answers · PYQ Vault");
    // 76 characters with the brand, so the brand is what goes.
    expect(paperPageTitle("CDS (II) 2022 — Elementary Mathematics")).toBe(
      "CDS (II) 2022, Elementary Mathematics question paper with answers"
    );
  });

  it("keeps 'question paper' by dropping a paper number its subject already names, within the limit", () => {
    // 57 MHT-CET Paper II titles are too long for "question paper" otherwise.
    const long = "MHT-CET 2025 (21 April Shift II) — Paper II — Physics & Chemistry";
    const t = paperPageTitle(long);
    expect(t.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(t).toBe("MHT-CET 2025 (21 April Shift II), Physics & Chemistry question paper");
    // A paper number that IS the name (no subject after it) is never dropped.
    expect(paperPageTitle("UPSC CSE Prelims 2018 — CSAT (Paper II)")).toContain("CSAT (Paper II)");
    const mid = paperPageTitle("MHT-CET 2026 (19 May Shift I) — Paper I — Mathematics");
    expect(mid).toBe("MHT-CET 2026 (19 May Shift I), Paper I, Mathematics question paper");
  });

  it("never carries an em dash", () => {
    expect(paperPageTitle("NDA 2020 (Combined I & II) — Paper II — General Ability Test")).not.toMatch(/—/);
  });
});

describe("paperPageDescription", () => {
  const paper = {
    title: "MHT-CET 2026 (19 May Shift I) — Paper I — Mathematics",
    totalQuestions: 50,
    totalMarks: 100,
    durationSecs: 5400,
  };

  it("says what is on the page and that it is free to read, without an em dash", () => {
    const d = paperPageDescription(paper, true);
    expect(d).toContain("all 50 questions");
    expect(d).toContain("with answers and worked solutions");
    expect(d).toContain("100 marks, 90 minutes");
    expect(d).toMatch(/free to read/i);
    expect(d).not.toMatch(/—/);
  });

  it("promises only answers when the paper has no worked solutions", () => {
    const d = paperPageDescription(paper, false);
    expect(d).toContain("with answers.");
    expect(d).not.toMatch(/solution/i);
  });
});

describe("buildPaperSections", () => {
  const sections = [
    { key: "phy", label: "Physics", count: 2 },
    { key: "chem", label: "Chemistry", count: 1 },
  ];

  it("prints questions in snapshot order, grouped by the paper's sections", () => {
    const content = new Map([
      ["q1", mcq()],
      ["q2", mcq({ text: "Second" })],
      ["q3", mcq({ text: "Third" })],
    ]);
    const out = buildPaperSections([snap(3, "chem"), snap(2, "phy"), snap(1, "phy")], content, sections);
    expect(out.sections.map((s) => s.title)).toEqual(["Physics", "Chemistry"]);
    expect(out.sections[0].items.map((i) => i.position)).toEqual([1, 2]);
    expect(out.sections[1].items[0].question.text).toBe("Third");
    expect(out.missing).toBe(0);
    expect(out.solved).toBe(3);
  });

  it("counts only questions that carry a worked solution as solved", () => {
    const content = new Map([
      ["q1", mcq()],
      ["q2", mcq({ solution: null })],
      ["q3", mcq({ solution: "   " })],
    ]);
    const out = buildPaperSections([snap(1, "phy"), snap(2, "phy"), snap(3, "phy")], content, sections);
    expect(out.solved).toBe(1);
  });

  it("explains a dropped question that has no notice of its own", () => {
    // 120 of the 30,240 past-paper questions have no correct option: every one
    // is a question the exam body dropped, scored for everyone.
    const dropped = mcq({ options: mcq().options.map((o) => ({ ...o, isCorrect: false })), solution: null });
    const out = buildPaperSections([snap(1, "phy", { grace: true })], new Map([["q1", dropped]]), sections);
    expect(out.sections[0].items[0].question.solution).toBe(
      "**Dropped:** this question was dropped from scoring, so every candidate got its marks."
    );
  });

  it("keeps the key and solution of an MCQ for the reveal", () => {
    const out = buildPaperSections([snap(1, "phy")], new Map([["q1", mcq()]]), sections);
    const q = out.sections[0].items[0].question;
    expect(q.format).toBe("mcq");
    expect(q.options.find((o) => o.isCorrect)?.label).toBe("B");
    expect(q.solution).toBe("Add them.");
    expect(q.questionNumber).toBe("1");
  });

  it("shows a numeric question as a written one whose answer is the value, then the solution", () => {
    const numeric = mcq({ format: "numeric", options: [], numericAnswer: 42, solution: "Because." });
    const out = buildPaperSections([snap(1, "phy")], new Map([["q1", numeric]]), sections);
    const q = out.sections[0].items[0].question;
    expect(q.format).toBe("subjective");
    expect(q.solution).toBe("**Answer: 42**\n\nBecause.");
  });

  it("puts a cancelled question's notice ahead of its solution", () => {
    const out = buildPaperSections(
      [snap(1, "phy")],
      new Map([["q1", mcq({ cancelledNote: "Dropped by the exam body." })]]),
      sections
    );
    expect(out.sections[0].items[0].question.solution).toBe("**Cancelled:** Dropped by the exam body.\n\nAdd them.");
  });

  it("carries a question's Marathi print to the reader, and adds nothing to an English-only one", () => {
    const mr = { text: "प्रश्न", context: null, options: { A: "पर्याय" } };
    const out = buildPaperSections([snap(1, "phy"), snap(2, "phy")], new Map([["q1", mcq({ translations: { mr } })], ["q2", mcq()]]), sections);
    expect(out.sections[0].items[0].question.translations?.mr?.text).toBe("प्रश्न");
    expect("translations" in out.sections[0].items[1].question).toBe(false);
  });

  it("counts a question whose content is gone instead of printing a blank", () => {
    const out = buildPaperSections([snap(1, "phy"), snap(2, "phy")], new Map([["q1", mcq()]]), sections);
    expect(out.sections[0].items).toHaveLength(1);
    expect(out.missing).toBe(1);
  });

  it("names a section the paper did not label by its key", () => {
    const out = buildPaperSections([snap(1, "bio")], new Map([["q1", mcq()]]), sections);
    expect(out.sections[0].title).toBe("bio");
  });
});

describe("paperYearRange", () => {
  it("spans the oldest to newest sitting, ignoring undated rows", () => {
    expect(paperYearRange([{ pyqYear: 2023 }, { pyqYear: 2026 }, { pyqYear: null }, { pyqYear: 2021 }])).toBe(
      "2021-2026"
    );
    expect(paperYearRange([{ pyqYear: 2026 }])).toBe("2026");
    expect(paperYearRange([{ pyqYear: null }])).toBeNull();
  });
});

describe("downloadPageTitle", () => {
  it("uses the words students search, within the limit", () => {
    expect(downloadPageTitle("MHT-CET", "2021-2026", true)).toBe(
      "MHT-CET Previous Year Question Papers with Solutions (2021-2026)"
    );
    for (const name of ["MPSC State Services Prelims", "MPSC Group B Combined Mains", "NEET", "UPSC CSE (Prelims)"]) {
      const t = downloadPageTitle(name, "2013-2022", true);
      expect(t.length).toBeLessThanOrEqual(TITLE_MAX);
      expect(t).toContain(`${name} Previous Year Question Papers`);
      expect(t).not.toMatch(/—/);
    }
  });

  it("leaves the range out when there are no dated papers", () => {
    expect(downloadPageTitle("NDA", null, true)).toBe("NDA Previous Year Question Papers with Solutions · PYQ Vault");
  });

  it("claims answers, not solutions, for an exam without worked solutions", () => {
    expect(downloadPageTitle("JIPMAT", "2019-2022", false)).toBe(
      "JIPMAT Previous Year Question Papers with Answers (2019-2022)"
    );
  });
});

describe("pastPaperHubLink", () => {
  const papers = [
    { examName: "MHT-CET", source: "pyq" as const, scope: "full" as const, pyqYear: 2021 },
    { examName: "MHT-CET", source: "pyq" as const, scope: "full" as const, pyqYear: 2026 },
    { examName: "MHT-CET", source: "practice" as const, scope: "full" as const, pyqYear: null },
    { examName: "NDA", source: "pyq" as const, scope: "sectional" as const, pyqYear: null },
  ];

  it("links an exam's past papers with their years", () => {
    expect(pastPaperHubLink("mht-cet", "MHT-CET", papers)).toEqual({
      href: "/mock/exam/mht-cet/download",
      label: "Previous year question papers (2021-2026), free to read",
    });
  });

  it("gives no link to an exam with no whole past paper", () => {
    expect(pastPaperHubLink("nda", "NDA", papers)).toBeNull();
  });
});
