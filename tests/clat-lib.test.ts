import { describe, expect, it } from "vitest";
import {
  applyFixes,
  assembleYear,
  blindPayload,
  crosscheck,
  derivedIssues,
  keyNoticeIssues,
  paperIssues,
  type ClatPaper,
  type DerivedEntry,
} from "../scripts/clat/lib";

const SECTIONS: [string, number, number][] = [
  ["English Language", 1, 2],
  ["Legal Reasoning", 3, 4],
];

function paper(): ClatPaper {
  return {
    year: 2026,
    passages: [
      { id: "P01", printed: "I", page: 5, text: "The first passage.\n\nIts second paragraph." },
      { id: "P02", printed: "II", page: 6, text: "Principle: a promise needs consideration." },
    ],
    directions: [{ beforeRef: "3", text: "Assume that the statements in the passages are the applicable law." }],
    rows: [
      { ref: "1", section: "English Language", page: 5, passage: "P01", text: "The main idea is", options: ["one", "two", "three", "four"] },
      { ref: "2", section: "English Language", page: 5, passage: "P01", text: "The word 'x' means", options: ["a", "b", "c", "d"] },
      { ref: "3", section: "Legal Reasoning", page: 6, passage: "P02", text: "Is the promise binding?", options: ["Yes", "No", "Only if written", "Only if registered"] },
      { ref: "4", section: "Legal Reasoning", page: 6, passage: "P02", text: "Which is right?", options: ["p", "q", "r", "s"] },
    ],
  };
}

const d = (ref: string, label: string, chapter: string, subtopic: string, extra: Partial<DerivedEntry> = {}): DerivedEntry => ({
  ref,
  label,
  working: `Reasoning for ${ref}. So the answer is option (${label}).`,
  difficulty: "Moderate",
  confidence: "HIGH",
  chapter,
  subtopic,
  ...extra,
});

const DERIVED: DerivedEntry[] = [
  d("1", "A", "Main Idea and Purpose", "Central idea"),
  d("2", "C", "Vocabulary and Usage", "Word meaning in context"),
  d("3", "B", "Law of Contract", "Offer, acceptance and consideration"),
  d("4", "D", "Law of Contract", "Breach and remedies"),
];

describe("keyNoticeIssues", () => {
  const notice = { withdrawn: ["100"], either: { "62": ["C", "D"] }, changed: { "14": "C" }, source: "test" };
  it("passes a key table that agrees with the notification", () => {
    expect(keyNoticeIssues({ "14": "C", "62": "C/D", "100": "W", "1": "A" }, notice)).toEqual([]);
  });
  it("names every way the table and the notice can disagree", () => {
    const issues = keyNoticeIssues({ "14": "D", "62": "C", "100": "A", "7": "W" }, notice);
    expect(issues).toEqual([
      "Q100: the notice withdraws it, the key table reads A",
      "Q7: the key table reads Withdrawn, the notice does not list it",
      "Q62: the notice accepts C or D, the key table reads C",
      "Q14: the notice sets C, the key table reads D",
    ]);
  });
});

describe("paperIssues", () => {
  it("passes a whole paper", () => {
    expect(paperIssues(paper(), SECTIONS)).toEqual([]);
  });
  it("refuses gaps, missing passages, short or duplicate options and a wrong section", () => {
    const p = paper();
    p.rows[1].options = ["a", "a", "c", "d"];
    p.rows[2].passage = "P09";
    p.rows[3].options = ["p", "q", "r"];
    p.rows[0].section = "Legal Reasoning";
    p.rows.splice(1, 0, { ...p.rows[0], ref: "9" });
    expect(paperIssues(p, SECTIONS)).toEqual([
      "Q1: section Legal Reasoning, years.json puts it in English Language",
      "rows run 1, 9, 2, 3, 4; expected 1..4 in order",
      "Q2: duplicate option text",
      "Q3: passage P09 does not exist",
      "Q4: needs 4 options, has 3",
    ]);
  });
});

describe("applyFixes", () => {
  it("replaces text that occurs exactly once in the named field", () => {
    const fixed = applyFixes(paper(), [
      { target: "P01", find: "second", replace: "next", why: "OCR" },
      { target: "Q3", field: "B", find: "No", replace: "No, never", why: "source" },
      { target: "Q2", find: "'x'", replace: "‘x’", why: "quotes" },
    ]);
    expect(fixed.passages[0].text).toBe("The first passage.\n\nIts next paragraph.");
    expect(fixed.rows[2].options[1]).toBe("No, never");
    expect(fixed.rows[1].text).toBe("The word ‘x’ means");
  });
  it("refuses a find that is missing or ambiguous, so a re-extract cannot misapply it", () => {
    expect(() => applyFixes(paper(), [{ target: "P01", find: "nowhere", replace: "x", why: "" }])).toThrow(/P01 text: "nowhere" occurs 0 times/);
    expect(() => applyFixes(paper(), [{ target: "Q1", field: "A", find: "z", replace: "x", why: "" }])).toThrow(/Q1 A: "z" occurs 0 times/);
    expect(() => applyFixes(paper(), [{ target: "P01", find: "passage", replace: "x", why: "" }])).not.toThrow();
    expect(() => applyFixes(paper(), [{ target: "P01", find: "p", replace: "x", why: "" }])).toThrow(/occurs 3 times/);
  });
});

describe("derivedIssues", () => {
  it("passes chapters and subtopics taken verbatim from the subject's taxonomy", () => {
    expect(derivedIssues(paper(), DERIVED)).toEqual([]);
  });
  it("refuses a chapter from another subject, an unknown subtopic, a bad label and a missing row", () => {
    const bad = [
      d("1", "A", "Law of Contract", "Breach and remedies"),
      d("2", "E", "Vocabulary and Usage", "Word meaning in context"),
      d("3", "B", "Law of Contract", "Contracts in general"),
    ];
    expect(derivedIssues(paper(), bad)).toEqual([
      'Q1: chapter "Law of Contract" is not a English Language chapter',
      'Q2: label "E" is not A-D',
      'Q3: subtopic "Contracts in general" is not one of Law of Contract\'s',
      "Q4: no derivation",
    ]);
  });
});

describe("blindPayload", () => {
  it("carries passages and questions and nothing that leads to the key", () => {
    const b = blindPayload(paper());
    expect(Object.keys(b.rows[0]).sort()).toEqual(["options", "passage", "ref", "section", "text"]);
    expect(b.passages.map((p) => p.id)).toEqual(["P01", "P02"]);
    expect(b.directions).toHaveLength(1);
    expect(JSON.stringify(b)).not.toMatch(/answer|correct|key/i);
  });
});

describe("crosscheck", () => {
  it("scores the solver against the key and sets withdrawn and either-answer questions apart", () => {
    const key = { "1": "A", "2": "B", "3": "W", "4": "C/D" };
    const c = crosscheck(paper(), key, DERIVED);
    expect(c.rows.map((r) => r.verdict)).toEqual(["AGREE", "DISAGREE", "WITHDRAWN", "EITHER"]);
    expect([c.agree, c.disagree, c.scored]).toEqual([1, 1, 2]);
  });
});

describe("assembleYear", () => {
  const KEY = { "1": "A", "2": "C", "3": "B", "4": "D" };

  it("builds rows: the key's answer, the passage (with any directions) as context, the solver's taxonomy and working", () => {
    const { rows, issues } = assembleYear({ paper: paper(), key: KEY, derived: DERIVED });
    expect(issues).toEqual([]);
    expect(rows.map((r) => [r.ref, r.subject, r.chapter, r.answer])).toEqual([
      ["1", "English Language", "Main Idea and Purpose", "A"],
      ["2", "English Language", "Vocabulary and Usage", "C"],
      ["3", "Legal Reasoning", "Law of Contract", "B"],
      ["4", "Legal Reasoning", "Law of Contract", "D"],
    ]);
    expect(rows[0].context).toBe("The first passage.\n\nIts second paragraph.");
    expect(rows[2].context).toBe(
      "Assume that the statements in the passages are the applicable law.\n\nPrinciple: a promise needs consideration."
    );
    expect(rows[2].options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["B"]);
    expect(rows.some((r) => r.grace)).toBe(false);
  });

  it("refuses an unread disagreement, and takes the key with a rewritten solution", () => {
    const derived = DERIVED.map((x) => (x.ref === "2" ? { ...x, label: "B" } : x));
    expect(assembleYear({ paper: paper(), key: KEY, derived }).issues).toEqual([
      "Q2: solver B and the Consortium's key C disagree; adjudicate",
    ]);
    const ok = assembleYear({
      paper: paper(),
      key: KEY,
      derived,
      adjudications: [{ ref: "2", solution: "Read again, (C) is right. So the answer is option (C)." }],
    });
    expect(ok.issues).toEqual([]);
    expect(ok.rows[1].answer).toBe("C");
    expect(ok.rows[1].solution).toBe("Read again, (C) is right. So the answer is option (C).");
  });

  it("corrects a key only with a notice", () => {
    const derived = DERIVED.map((x) => (x.ref === "2" ? { ...x, label: "B" } : x));
    expect(assembleYear({ paper: paper(), key: KEY, derived, adjudications: [{ ref: "2", correctKey: "B" }] }).issues).toEqual([
      "Q2: correcting the Consortium's key (C -> B) needs a notice",
    ]);
    const ok = assembleYear({ paper: paper(), key: KEY, derived, adjudications: [{ ref: "2", correctKey: "B", notice: "The key printed (C)." }] });
    expect(ok.rows[1].answer).toBe("B");
    expect(ok.rows[1].solution.startsWith("**Note:** The key printed (C).\n\n")).toBe(true);
  });

  it("keeps a withdrawn question on the solver's answer, with a notice and grace", () => {
    const { rows, issues } = assembleYear({ paper: paper(), key: { ...KEY, "3": "W" }, derived: DERIVED });
    expect(issues).toEqual([]);
    expect(rows[2].answer).toBe("B");
    expect(rows[2].grace).toBe(true);
    expect(rows[2].solution).toMatch(/^\*\*Note:\*\* The Consortium withdrew this question/);
  });

  it("keeps an either-answer question on an accepted option, with a notice and grace", () => {
    const ok = assembleYear({ paper: paper(), key: { ...KEY, "4": "C/D" }, derived: DERIVED });
    expect(ok.issues).toEqual([]);
    expect(ok.rows[3].answer).toBe("D");
    expect(ok.rows[3].grace).toBe(true);
    expect(ok.rows[3].solution).toMatch(/accepted both \(C\) and \(D\)/);
    const bad = assembleYear({ paper: paper(), key: { ...KEY, "4": "A/B" }, derived: DERIVED });
    expect(bad.issues).toEqual(["Q4: the Consortium accepted A and B; the kept answer (D) must be one of them"]);
  });

  it("refuses a solution with an em dash or an option named by number", () => {
    const derived = DERIVED.map((x) => (x.ref === "1" ? { ...x, working: "It is clear — option 2 fails." } : x));
    const { issues } = assembleYear({ paper: paper(), key: KEY, derived });
    expect(issues.join("\n")).toMatch(/em dash/);
    expect(issues.join("\n")).toMatch(/names an option by number/);
  });
});
