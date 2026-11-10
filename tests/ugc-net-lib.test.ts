import { describe, expect, it } from "vitest";
import {
  assemblePaper,
  keyFor,
  paperIssues,
  parseNtaKey,
  type DerivedEntry,
  type UgcPaper,
  type UgcRow,
} from "../scripts/ugc-net/lib";

// Two real NTA key layouts, trimmed. 2024: subject, shift and date on one line.
const KEY_2024 = `
                                   NATIONAL TESTING AGENCY
Subject: 8 - Commerce                           Shift: SHIFT 1                 Exam Date: 03.09.2024
Question ID   Correct Option ID    Question ID   Correct Option ID
34212315762  2                   34212315800  D
34212315763  3                   34212315801  2, 4
Subject: 8 - Commerce                           Shift: SHIFT 2                 Exam Date: 03.09.2024
53307217130  1                  53307217169  2
`;

// 2025: date and shift first, subject below, three columns, "D" for a dropped question.
const KEY_2025 = `
                                 UGC - NET JUNE 2025
                                Exam Date : 27.06.2025  Exam Shift : Second
Subject: (030) English
Question ID  Correct Option No.  Question ID            Correct Option No.  Question ID   Correct Option No.
4255898780      3                 4255898831                2                 4255898881       4
4255898800      D                 4255898851                2                 4255898901       1
4255898828      2, 4              4255898878                1                 4255898930       2
'D' indicates dropped question                                               Page: 1 of 1
`;

describe("parseNtaKey", () => {
  it("reads the 2024 layout: one section per subject and shift", () => {
    const keys = parseNtaKey(KEY_2024);
    expect(keys.map((k) => [k.code, k.subject, k.date, k.shift])).toEqual([
      [8, "Commerce", "2024-09-03", 1],
      [8, "Commerce", "2024-09-03", 2],
    ]);
    expect(keys[0].answers.get("34212315762")).toEqual({ kind: "single", option: 2 });
    expect(keys[0].answers.get("34212315800")).toEqual({ kind: "dropped" });
    expect(keys[0].answers.get("34212315801")).toEqual({ kind: "multi", options: [2, 4] });
    expect(keys[0].answers.size).toBe(4);
    expect(keys[1].answers.get("53307217169")).toEqual({ kind: "single", option: 2 });
  });

  it("reads the 2025 layout, including a multi-answer cell between columns", () => {
    const [k] = parseNtaKey(KEY_2025);
    expect([k.code, k.subject, k.date, k.shift]).toEqual([30, "English", "2025-06-27", 2]);
    expect(k.answers.size).toBe(9);
    expect(k.answers.get("4255898828")).toEqual({ kind: "multi", options: [2, 4] });
    expect(k.answers.get("4255898878")).toEqual({ kind: "single", option: 1 });
    expect(k.answers.get("4255898800")).toEqual({ kind: "dropped" });
  });

  it("refuses an id that appears twice with different answers", () => {
    expect(() => parseNtaKey(KEY_2024 + "\n34212315762  4\n")).toThrow(/34212315762/);
  });
});

describe("keyFor", () => {
  const [k] = parseNtaKey(KEY_2024);
  it("finds the section holding a question id", () => {
    expect(keyFor([k], "34212315763")).toEqual({ kind: "single", option: 3 });
    expect(keyFor([k], "99999999999")).toBeUndefined();
  });
});

const row = (ref: string, qid: string, extra: Partial<UgcRow> = {}): UgcRow => ({
  ref,
  qid,
  chapter: "Teaching Aptitude",
  subtopic: "Methods of teaching",
  text: `Question ${ref}?`,
  options: ["one", "two", "three", "four"],
  ...extra,
});
const paper = (rows: UgcRow[]): UgcPaper => ({ shift: "2024-09-03-1", rows });
const derived = (ref: string, label: string): DerivedEntry => ({
  ref, label, value: "x", working: `Working for ${ref}.`, difficulty: "Easy", confidence: "HIGH",
});

describe("paperIssues", () => {
  it("passes a clean paper", () => {
    expect(paperIssues(paper([row("1", "34212315762")]))).toEqual([]);
  });
  it("names a missing question id, an unknown chapter and an answer-shaped field", () => {
    const bad = { ...row("1", ""), chapter: "Astrology", answer: "A" } as unknown as UgcRow;
    const issues = paperIssues(paper([bad]));
    expect(issues.join("\n")).toMatch(/question id/);
    expect(issues.join("\n")).toMatch(/Astrology/);
    expect(issues.join("\n")).toMatch(/answer-shaped/);
  });
  it("refuses a question id used twice", () => {
    expect(paperIssues(paper([row("1", "34212315762"), row("2", "34212315762")])).join()).toMatch(/twice/);
  });
});

describe("assemblePaper", () => {
  const keys = parseNtaKey(KEY_2024);

  it("takes NTA's answer when the solver agrees", () => {
    const res = assemblePaper({ paper: paper([row("1", "34212315762")]), keys, derived: [derived("1", "B")] });
    expect(res.issues).toEqual([]);
    expect(res.rows[0].answer).toBe("B");
    expect(res.rows[0].options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["B"]);
    expect(res.rows[0].grace).toBeUndefined();
  });

  it("refuses an unread disagreement, and keeps NTA's key once the solution is rewritten", () => {
    const p = paper([row("1", "34212315762")]);
    expect(assemblePaper({ paper: p, keys, derived: [derived("1", "C")] }).issues.join()).toMatch(/disagree/);
    const ok = assemblePaper({
      paper: p, keys, derived: [derived("1", "C")],
      adjudications: [{ ref: "1", solution: "Why B is right." }],
    });
    expect(ok.issues).toEqual([]);
    expect(ok.rows[0].answer).toBe("B");
    expect(ok.rows[0].solution).toBe("Why B is right.");
  });

  it("corrects a key only with a notice", () => {
    const p = paper([row("1", "34212315762")]);
    expect(
      assemblePaper({ paper: p, keys, derived: [derived("1", "C")], adjudications: [{ ref: "1", correctKey: "C" }] }).issues.join()
    ).toMatch(/notice/);
    const ok = assemblePaper({
      paper: p, keys, derived: [derived("1", "C")],
      adjudications: [{ ref: "1", correctKey: "C", notice: "NTA's final key gives (2); the working shows (3)." }],
    });
    expect(ok.rows[0].answer).toBe("C");
    expect(ok.rows[0].solution).toMatch(/^\*\*Note:\*\* NTA's final key gives \(2\)/);
  });

  it("graces a question NTA dropped, keeps the solver's answer and says why", () => {
    const res = assemblePaper({ paper: paper([row("7", "34212315800")]), keys, derived: [derived("7", "D")] });
    expect(res.issues).toEqual([]);
    expect(res.rows[0].grace).toBe(true);
    expect(res.rows[0].answer).toBe("D");
    expect(res.rows[0].solution).toMatch(/^\*\*Note:\*\* NTA dropped this question/);
  });

  it("graces a question with two accepted answers and keeps the one the solver chose", () => {
    const res = assemblePaper({ paper: paper([row("8", "34212315801")]), keys, derived: [derived("8", "D")] });
    expect(res.issues).toEqual([]);
    expect(res.rows[0].answer).toBe("D");
    expect(res.rows[0].grace).toBe(true);
    expect(res.rows[0].solution).toMatch(/accepted both \(2\) and \(4\)/);
  });

  it("refuses a two-answer question where the solver picked neither accepted option", () => {
    const res = assemblePaper({ paper: paper([row("8", "34212315801")]), keys, derived: [derived("8", "A")] });
    expect(res.issues.join()).toMatch(/accepted/);
  });

  it("refuses a question whose id is in no key", () => {
    const res = assemblePaper({ paper: paper([row("1", "11111111111")]), keys, derived: [derived("1", "A")] });
    expect(res.issues.join()).toMatch(/no NTA key/);
  });
});
