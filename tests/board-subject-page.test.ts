import { describe, it, expect } from "vitest";
import type { PaperListing } from "@/lib/questionPapers/listing";
import {
  boardFacts,
  boardPapersFaq,
  boardYearHeading,
  chapterMarks,
  hoursLabel,
  newestBoardSitting,
  setOverlap,
  yearCountLabel,
  type SubjectStats,
} from "@/lib/questionPapers/subjectPage";

let n = 0;
function paper(over: Partial<PaperListing>): PaperListing {
  n++;
  return {
    id: `p${n}`,
    examId: "e",
    subjectId: "s",
    subjectName: "Chemistry",
    slug: `slug-${n}`,
    groupSlug: "2026-56-1",
    setNumber: 1,
    year: 2026,
    sitting: null,
    paperCode: "56/1/1",
    title: "Chemistry 56/1/1",
    totalMarks: 70,
    durationMinutes: 180,
    ...over,
  };
}

/** Items for a paper: one per [chapter, marks] pair; `or` adds an OR alternative. */
function items(paperId: string, rows: [string, number][], or = 0, idBase = paperId) {
  const out: SubjectStats["items"] = rows.map(([chapter, marks], i) => ({
    paperId,
    marks,
    alternativeTo: null,
    questionId: `${idBase}-q${i}`,
    chapter,
    section: null,
    caseKey: null,
  }));
  for (let i = 0; i < or; i++) out.push({ paperId, marks: rows[i][1], alternativeTo: i + 1, questionId: `${paperId}-or${i}`, chapter: rows[i][0], section: null, caseKey: null });
  return out;
}

const NO_DASH = /[—–]/;

describe("year headings and counts", () => {
  it("names the exam, the subject and the year, never a bare year", () => {
    expect(boardYearHeading("CBSE Class 12", "Chemistry", 2026)).toBe("CBSE Class 12 Chemistry 2026 papers");
  });

  it("counts papers, and sets when the board prints more than one", () => {
    expect(yearCountLabel([{ sets: [1, 2, 3] }, { sets: [1, 2, 3] }])).toBe("2 papers, 6 sets");
    expect(yearCountLabel([{ sets: [1] }])).toBe("1 paper");
    expect(yearCountLabel([{ sets: [1] }, { sets: [1] }])).toBe("2 papers");
  });

  it("says a time in hours when it is whole hours", () => {
    expect(hoursLabel(180)).toBe("3 hours");
    expect(hoursLabel(60)).toBe("1 hour");
    expect(hoursLabel(90)).toBe("90 minutes");
  });
});

describe("newestBoardSitting", () => {
  it("names the month for a Maharashtra sitting and the year for CBSE", () => {
    const mh = [paper({ sitting: "February", groupSlug: "2026-february" }), paper({ sitting: "June", groupSlug: "2026-june" })];
    expect(newestBoardSitting(mh)).toBe("June 2026");
    expect(newestBoardSitting([paper({}), paper({ year: 2025 })])).toBe("2026");
    expect(newestBoardSitting([])).toBeNull();
  });
});

describe("boardFacts", () => {
  const newest = paper({ id: "new" });
  const old = paper({ id: "old", year: 2022, totalMarks: 35, durationMinutes: 120, groupSlug: "2022-56-1" });
  const stats: SubjectStats = {
    items: [...items("new", [["Solutions", 1], ["Electrochemistry", 3], ["Kinetics", 5]], 2), ...items("old", [["Solutions", 2]])],
    sections: {
      new: [
        { key: "A", title: "Section A", note: "1 mark each" },
        { key: "D", title: "Section D", note: "" },
      ],
    },
    chapterHrefs: {},
  };
  const facts = boardFacts([old, newest], stats, { casesAreQuestions: true })!;

  it("reads marks, time, questions and choices from the newest paper", () => {
    expect(facts).toMatchObject({ label: "2026 paper", marks: 70, minutes: 180, questions: 3, choices: 2 });
  });

  it("lists the sections as printed, with their marks note when there is one", () => {
    // Section D has no note and no items in section D here, so it stays a bare title.
    expect(facts.sections).toEqual(["Section A: 1 mark each", "Section D"]);
  });

  it("says when earlier papers had a different total (CBSE 2022 term papers)", () => {
    expect(facts.earlierText).toBe("Earlier papers had 35 marks.");
  });

  it("still gives marks and time when the items could not be read", () => {
    const f = boardFacts([newest], { items: [], sections: {}, chapterHrefs: {} }, { casesAreQuestions: true })!;
    expect(f).toMatchObject({ marks: 70, minutes: 180, questions: null, choices: null, sections: [] });
  });

  it("is null without papers", () => {
    expect(boardFacts([], stats, { casesAreQuestions: true })).toBeNull();
  });
});

describe("boardFacts with case-study questions (CBSE Section D)", () => {
  // As stored for CBSE 12 Chemistry 2026 56/1/1: each case-study PART is its own
  // item, sharing a case key, and Section D's stored note is "".
  const newest = paper({ id: "cs" });
  const CBSE = { casesAreQuestions: true };
  const it_ = (over: Partial<SubjectStats["items"][number]>): SubjectStats["items"][number] => ({
    paperId: "cs", marks: 1, alternativeTo: null, questionId: `q${++n}`, chapter: "Solutions",
    section: "A", caseKey: null, ...over,
  });
  const stats: SubjectStats = {
    items: [
      it_({ section: "A" }),
      it_({ section: "A" }),
      it_({ section: "C", marks: 3 }),
      it_({ section: "C", marks: 3, alternativeTo: 3 }),
      it_({ section: "D", marks: 2, caseKey: "CS1" }),
      it_({ section: "D", marks: 1, caseKey: "CS1" }),
      it_({ section: "D", marks: 1, caseKey: "CS1", alternativeTo: 6 }),
      it_({ section: "D", marks: 1, caseKey: "CS1" }),
      it_({ section: "D", marks: 2, caseKey: "CS2" }),
      it_({ section: "D", marks: 1, caseKey: "CS2" }),
      it_({ section: "D", marks: 1, caseKey: "CS2" }),
      it_({ section: "D", marks: 1, caseKey: "CS2", alternativeTo: 11 }),
    ],
    sections: {
      cs: [
        { key: "A", title: "Section A", note: "1 mark each" },
        { key: "C", title: "Section C", note: "3 marks each" },
        { key: "D", title: "Section D", note: "" },
      ],
    },
    chapterHrefs: {},
  };
  const facts = boardFacts([newest], stats, { casesAreQuestions: true })!;

  it("counts a case study as ONE question, not one per part", () => {
    // 2 in A + 1 in C + 2 case studies = 5 (parts counted singly would say 9).
    expect(facts.questions).toBe(5);
  });

  it("counts questions that offer an OR, a case study once", () => {
    expect(facts.choices).toBe(3);
  });

  it("works out a section's marks from its items when the stored note is empty", () => {
    expect(facts.sections).toEqual(["Section A: 1 mark each", "Section C: 3 marks each", "Section D: 4 marks each"]);
  });

  it("gives questions and marks when a section's questions differ (CBSE 10 Science sections)", () => {
    const mixed: SubjectStats = {
      ...stats,
      items: [
        it_({ section: "A", marks: 1 }),
        it_({ section: "A", marks: 3 }),
        it_({ section: "A", marks: 3, alternativeTo: 2 }),
        it_({ section: "A", marks: 2, caseKey: "X" }),
        it_({ section: "A", marks: 2, caseKey: "X" }),
      ],
      sections: { cs: [{ key: "A", title: "Section A", note: "" }] },
    };
    expect(boardFacts([newest], mixed, CBSE)!.sections).toEqual(["Section A: 3 questions, 8 marks"]);
  });

  it("works a case-study section out from its items even over a per-part stored note (CBSE 12 Physics)", () => {
    // Physics stores "1 mark each" on Section D: true of each part, not of a 4-mark case study.
    const physics: SubjectStats = {
      ...stats,
      items: [
        ...[1, 2, 3, 4].map(() => it_({ section: "D", marks: 1, caseKey: "CS1" })),
        ...[1, 2, 3, 4].map(() => it_({ section: "D", marks: 1, caseKey: "CS2" })),
      ],
      sections: { cs: [{ key: "D", title: "Section D", note: "1 mark each" }] },
    };
    expect(boardFacts([newest], physics, CBSE)!.sections).toEqual(["Section D: 4 marks each"]);
  });

  it("keeps the bare title when a section has no note and no items to read", () => {
    const none: SubjectStats = { ...stats, items: [], sections: { cs: [{ key: "D", title: "Section D", note: "" }] } };
    expect(boardFacts([newest], none, CBSE)!.sections).toEqual(["Section D"]);
  });
});

describe("boardFacts on Maharashtra papers (a case key groups a block of questions)", () => {
  // As stored for HSC 12 Geography June 2026: Q.1 (A) is five 1-mark questions
  // sharing case key "Q1(A)", and the stored note "1 mark each" is right.
  const newest = paper({ id: "mh", groupSlug: "2026-june" });
  const stats: SubjectStats = {
    items: [1, 2, 3, 4, 5].map((k) => ({
      paperId: "mh", marks: 1, alternativeTo: null, questionId: `mh${k}`, chapter: null, section: "1 (A)", caseKey: "Q1(A)",
    })),
    sections: { mh: [{ key: "1 (A)", title: "Q.1 (A)", note: "1 mark each" }] },
    chapterHrefs: {},
  };
  const facts = boardFacts([newest], stats, { casesAreQuestions: false })!;

  it("counts every item as a question", () => {
    expect(facts.questions).toBe(5);
  });

  it("keeps the stored note", () => {
    expect(facts.sections).toEqual(["Q.1 (A): 1 mark each"]);
  });
});

describe("chapterMarks", () => {
  // Four 70-mark papers (three sets of the first), one 35-mark term paper.
  const g1 = [1, 2, 3].map((s) => paper({ id: `g1s${s}`, setNumber: s, groupSlug: "2026-56-1" }));
  const others = ["2026-56-2", "2025-56-1", "2024-56-1"].map((g, i) =>
    paper({ id: `o${i}`, groupSlug: g, year: Number(g.slice(0, 4)) })
  );
  const term = paper({ id: "term", year: 2022, totalMarks: 35, groupSlug: "2022-56-1" });
  const papers = [...g1, ...others, term];
  const stats: SubjectStats = {
    items: [
      ...items("g1s1", [["Electrochemistry", 10], ["Solutions", 4]]),
      // Sets 2 and 3 lean hard on Solutions: counted, they would skew the average.
      ...items("g1s2", [["Solutions", 30]]),
      ...items("g1s3", [["Solutions", 30]]),
      ...items("o0", [["Electrochemistry", 6], ["Solutions", 4]], 1),
      ...items("o1", [["Electrochemistry", 8], ["Kinetics", 2]]),
      ...items("o2", [["Electrochemistry", 4], ["Kinetics", 2]]),
      ...items("term", [["Solutions", 35]]),
    ],
    sections: {},
    chapterHrefs: { Electrochemistry: "/board/cbse-12/chemistry/electrochemistry" },
  };
  const result = chapterMarks(papers, stats, 70)!;

  it("averages one set per paper, on the current pattern only", () => {
    expect(result.papers).toBe(4);
    expect(result.total).toBe(70);
    // Electrochemistry (10+6+8+4)/4 = 7; Solutions (4+4)/4 = 2; Kinetics (2+2)/4 = 1.
    expect(result.rows.map((r) => [r.name, r.marks])).toEqual([
      ["Electrochemistry", 7],
      ["Solutions", 2],
      ["Kinetics", 1],
    ]);
  });

  it("does not count an OR alternative as extra marks", () => {
    // o0's OR repeats Electrochemistry 6: counted, the average would be 8.5.
    expect(result.rows[0].marks).toBe(7);
  });

  it("links a chapter only when the board reader has a page for it", () => {
    expect(result.rows[0].href).toBe("/board/cbse-12/chemistry/electrochemistry");
    expect(result.rows[1].href).toBeUndefined();
  });

  it("is null with fewer than four papers on the pattern", () => {
    expect(chapterMarks([...g1, others[0], term], stats, 70)).toBeNull();
  });

  it("leaves out a paper whose items could not be read", () => {
    const thin = { ...stats, items: stats.items.filter((i) => i.paperId !== "o2") };
    expect(chapterMarks(papers, thin, 70)).toBeNull();
  });
});

describe("setOverlap", () => {
  it("averages the share of questions the sets of one paper have in common", () => {
    const a = paper({ id: "a", setNumber: 1 });
    const b = paper({ id: "b", setNumber: 2 });
    const stats: SubjectStats = {
      // a: q0 q1 q2 q3; b shares q0 q1 q2 and has its own fourth.
      items: [...items("a", [["X", 1], ["X", 1], ["X", 1], ["X", 1]], 0, "s"), ...items("b", [["X", 1], ["X", 1], ["X", 1]], 0, "s"), { paperId: "b", marks: 1, alternativeTo: null, questionId: "own", chapter: "X", section: null, caseKey: null }],
      sections: {},
      chapterHrefs: {},
    };
    expect(setOverlap([a, b], stats)).toBe(75);
  });

  it("is null when no paper has more than one set (Maharashtra)", () => {
    expect(setOverlap([paper({ setNumber: null, groupSlug: "2026-june" })], { items: [], sections: {}, chapterHrefs: {} })).toBeNull();
  });
});

describe("boardPapersFaq", () => {
  const facts = {
    label: "June 2026 paper",
    marks: 70,
    minutes: 180,
    questions: 26,
    choices: 4,
    sections: [],
    earlierText: null,
  };
  const base = {
    exam: "Maharashtra HSC Class 12",
    subject: "Physics",
    facts,
    years: [2026, 2025, 2023],
    paperCount: 7,
    setCount: 7,
    overlap: null,
  };
  const faq = boardPapersFaq(base);
  const answer = (q: RegExp) => faq.find((f) => q.test(f.q))?.a;

  it("answers marks, time and questions from the newest paper", () => {
    expect(answer(/How long/)).toBe("The June 2026 paper is 70 marks in 3 hours, with 26 questions.");
  });

  it("says how many questions offer a choice, only when some do", () => {
    expect(answer(/choice/)).toBe("Yes. In the June 2026 paper, 4 questions have an OR: you answer one of the two.");
    expect(boardPapersFaq({ ...base, facts: { ...facts, choices: 0 } }).some((f) => /choice/.test(f.q))).toBe(false);
  });

  it("names the years covered and the years missing", () => {
    expect(answer(/Which .* papers are here/)).toBe("7 papers from 2023 to 2026. Not here: 2024.");
  });

  it("counts sets beside papers and explains them only for a board that prints sets", () => {
    const cbse = boardPapersFaq({ ...base, exam: "CBSE Class 12", subject: "Chemistry", paperCount: 26, setCount: 78, overlap: 64 });
    expect(cbse.find((f) => /papers are here/.test(f.q))?.a).toMatch(/^26 papers \(78 sets\) from 2023 to 2026\./);
    expect(cbse.find((f) => /sets/.test(f.q))?.a).toBe(
      "No. The board prints several sets of each paper, and here the sets of one paper share about 64% of their questions, so each set is worth reading."
    );
    expect(faq.some((f) => /sets/.test(f.q))).toBe(false);
  });

  it("does not promise a free PDF", () => {
    expect(answer(/download/)).toBe("Every paper is free to read online, and each one downloads as a PDF with its answers.");
    expect(answer(/download/)).not.toMatch(/first PDF|PDF[^.]*\bfree\b|free PDF/);
  });

  it("puts no em or en dash in any question or answer", () => {
    expect(JSON.stringify(faq)).not.toMatch(NO_DASH);
  });
});
