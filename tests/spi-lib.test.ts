import { describe, expect, it } from "vitest";
import { CATALOG, PAPERS, SUBJECTS, requirePaper, type Paper } from "../scripts/spi/config";
import { checkPaper, compareVerify, figurePaths, mergeDrafts, parseVerify, retagSubtopics, toRawRows, verifyPacket } from "../scripts/spi/lib";
import { parseTranscript } from "../scripts/ssc-cgl/lib";

// A two-part paper of 4 questions: Q1-2 maths, Q3-4 general ability.
const MINI: Paper = {
  id: "mini",
  pdf: "x.pdf",
  sourceFile: "SPI Mini",
  kind: "pyq",
  pyqYear: 2022,
  pyqNote: "SPI Mini",
  answerSource: "key",
  pages: [1],
  parts: [
    { from: 1, to: 2, title: "Part 1", subjects: ["Mathematics", "Reasoning"], defaultSubject: "Mathematics" },
    { from: 3, to: 4, title: "Part 2", subjects: ["English", "Geography", "Reasoning"] },
  ],
};

function block(n: number, head: string, opts = "A: 1\nB: 2\nC: 3\nD: 4", solution = "Because it is so.") {
  return `=== ${n}\n${head}\ndifficulty: EASY\nanswer: B\nstem:\nQuestion ${n}?\n${opts}\nsolution:\n${solution}\n`;
}

const GOOD = [
  block(1, "chapter: Number System\nsubtopic: Place Value"),
  block(2, "subject: Reasoning\nchapter: Calendar and Clock\nsubtopic: Clock Angles"),
  block(3, "subject: English\nchapter: Vocabulary\nsubtopic: Antonyms"),
  block(4, "subject: Geography\nchapter: Maharashtra Geography\nsubtopic: Rivers and Districts"),
].join("\n");

describe("SPI config", () => {
  it("every subject has a non-empty chapter list and no duplicate chapters", () => {
    for (const s of SUBJECTS) {
      expect(CATALOG[s]?.length, s).toBeGreaterThan(0);
      expect(new Set(CATALOG[s]).size, s).toBe(CATALOG[s].length);
    }
    expect(Object.keys(CATALOG).sort()).toEqual([...SUBJECTS].sort());
  });

  it("each paper's parts tile 1..N with no gap or overlap", () => {
    for (const p of PAPERS) {
      let next = 1;
      for (const part of p.parts) {
        expect(part.from, `${p.id} ${part.title}`).toBe(next);
        next = part.to + 1;
      }
      for (const part of p.parts) for (const s of part.subjects) expect(SUBJECTS).toContain(s);
    }
  });

  it("every practice paper carries no pyq year or note, and a keyed paper names its key", () => {
    for (const p of PAPERS) {
      if (p.kind === "practice") expect([p.pyqYear, p.pyqNote], p.id).toEqual([null, null]);
      expect(Boolean(p.keyFile), p.id).toBe(p.answerSource === "key");
    }
    expect(new Set(PAPERS.map((p) => p.sourceFile)).size).toBe(PAPERS.length);
    expect(PAPERS.map((p) => p.id)).toEqual(
      expect.arrayContaining(["sample-maths", "sample-gat", "qp1-maths", "qp1-gat", "mock-1", "mock-2", "mock-3", "mock-4", "mock-5", "mock-6"])
    );
  });

  it("the 2022 paper is the only pyq paper, 150 questions, with derived answers", () => {
    const p = requirePaper("2022");
    expect(p.kind).toBe("pyq");
    expect(p.answerSource).toBe("derived");
    expect(PAPERS.filter((x) => x.kind === "pyq").map((x) => x.id)).toEqual(["2022"]);
    for (const x of PAPERS) if (x.pyqNote) expect(x.pyqNote.length).toBeLessThan(48); // publicPyqNote's cap
    expect(p.parts.at(-1)!.to).toBe(150);
    expect(() => requirePaper("1999")).toThrow(/unknown paper/);
  });
});

describe("checkPaper", () => {
  it("passes a clean transcript", () => {
    const r = checkPaper(parseTranscript(GOOD), MINI);
    expect(r.problems).toEqual([]);
  });

  it("refuses a gap, an extra number and a short range", () => {
    const qs = parseTranscript(GOOD).filter((q) => q.number !== 3);
    expect(checkPaper(qs, MINI).problems.join("\n")).toMatch(/missing Q3/);
    // a slice check: only Q1-2 expected
    expect(checkPaper(parseTranscript(GOOD), MINI, { from: 1, to: 2 }).problems.join("\n")).toMatch(/outside 1-2: Q3, Q4/);
  });

  it("requires subject: where the part has no default, and refuses a subject from the other part", () => {
    const noSubject = GOOD.replace("subject: English\n", "");
    expect(checkPaper(parseTranscript(noSubject), MINI).problems.join("\n")).toMatch(/Q3: needs a subject: line/);
    const wrongPart = GOOD.replace("subject: Reasoning\nchapter: Calendar and Clock", "subject: English\nchapter: Vocabulary");
    expect(checkPaper(parseTranscript(wrongPart), MINI).problems.join("\n")).toMatch(/Q2: subject "English" is not in Part 1/);
  });

  it("refuses a chapter outside the subject's catalog", () => {
    const bad = GOOD.replace("chapter: Number System", "chapter: Number Systems");
    expect(checkPaper(parseTranscript(bad), MINI).problems.join("\n")).toMatch(/Q1: chapter "Number Systems" is not a Mathematics chapter/);
  });

  it("flags raw unicode maths, a bare dollar pair, a letter-named option and an em dash in our solution", () => {
    const qs = parseTranscript(
      [
        block(1, "chapter: Number System\nsubtopic: x", "A: 2 × 3\nB: 2\nC: 3\nD: 4"),
        block(2, "chapter: Number System\nsubtopic: x", "A: $5 and $6\nB: 2\nC: 3\nD: 4"),
        block(3, "subject: English\nchapter: Vocabulary\nsubtopic: x", undefined, "So option (b) is correct."),
        block(4, "subject: Geography\nchapter: Maharashtra Geography\nsubtopic: x", undefined, "It flows east — into the bay."),
      ].join("\n")
    );
    const p = checkPaper(qs, MINI).problems.join("\n");
    expect(p).toMatch(/Q1: raw symbol "×"/);
    expect(p).toMatch(/Q2: two bare dollar signs/);
    expect(p).toMatch(/Q3: the solution names an option by letter/);
    expect(p).toMatch(/Q4: em dash in the solution/);
  });

  it("refuses picture options that are not a run from A, or a figure: options block with no [figure] option", () => {
    const head = "chapter: Number System\nsubtopic: x";
    const qs = parseTranscript(
      [
        block(1, head, "A: 1\nB: [figure]\nC: [figure]\nD: [figure]").replace("answer: B\n", "answer: B\nfigure: options\n"),
        block(2, head).replace("answer: B\n", "answer: B\nfigure: stem+options\n"),
        block(3, "subject: English\nchapter: Vocabulary\nsubtopic: x"),
        block(4, "subject: Geography\nchapter: Maharashtra Geography\nsubtopic: x"),
      ].join("\n")
    );
    const p = checkPaper(qs, MINI).problems.join("\n");
    expect(p).toMatch(/Q1: picture options must run from A/);
    expect(p).toMatch(/Q2: figure: stem\+options but no \[figure\] option/);
  });

  it("flags a rupee sign inside a maths zone (KaTeX has no glyph for it) but not outside one", () => {
    const inside = GOOD.replace("Because it is so.", "Cost \\(= 4 \\times 56 = ₹224\\).");
    expect(checkPaper(parseTranscript(inside), MINI).problems.join("\n")).toMatch(/Q1: rupee sign inside \\\(\.\.\.\\\)/);
    const outside = GOOD.replace("Because it is so.", "Cost \\(= 4 \\times 56 = 224\\), that is ₹224.");
    expect(checkPaper(parseTranscript(outside), MINI).problems).toEqual([]);
  });

  it("requires a student notice on a flawed block in the whole-paper check, but not in a draft slice", () => {
    const text = GOOD.replace("answer: B\nstem:\nQuestion 1?", "answer: B\nflawed: yes\nnote: two options are right\nstem:\nQuestion 1?");
    expect(checkPaper(parseTranscript(text), MINI).problems.join("\n")).toMatch(/Q1: flawed without a notice:/);
    expect(checkPaper(parseTranscript(text), MINI, { from: 1, to: 4 }).problems).toEqual([]);
  });

  it("requires a note on a flawed block and lists figure blocks", () => {
    const flawed = GOOD.replace("chapter: Number System\nsubtopic: Place Value\ndifficulty: EASY\nanswer: B\n", "chapter: Number System\nsubtopic: Place Value\ndifficulty: EASY\nanswer: B\nflawed: yes\nfigure: stem\n");
    const r = checkPaper(parseTranscript(flawed), MINI);
    expect(r.problems.join("\n")).toMatch(/Q1: flawed without a note/);
    expect(r.figures).toEqual([1]);
    expect(r.flawed).toEqual([1]);
  });
});

describe("toRawRows", () => {
  it("fills the part's default subject and keeps context, answer and number", () => {
    const withContext = GOOD.replace(
      "subject: English\nchapter: Vocabulary\nsubtopic: Antonyms\ndifficulty: EASY\nanswer: B\nstem:",
      "subject: English\nchapter: Vocabulary\nsubtopic: Antonyms\ndifficulty: EASY\nanswer: B\ncontext:\nRead the passage.\nstem:"
    );
    const rows = toRawRows(parseTranscript(withContext), MINI);
    expect(rows).toHaveLength(4);
    expect(rows[0]).toMatchObject({ sourceRow: 1, questionNumber: "1", subject: "Mathematics", chapter: "Number System", answer: "B", optionA: "1" });
    expect(rows[2]).toMatchObject({ subject: "English", context: "Read the passage." });
    expect(rows[1].subject).toBe("Reasoning");
  });

  it("ends every solution of a derived-key paper with the disclosure, and leaves a keyed paper alone", () => {
    const derived = toRawRows(parseTranscript(GOOD), { ...MINI, answerSource: "derived" });
    for (const r of derived) expect(r.solution).toMatch(/Because it is so\.\n\n\*No official answer key is published for this paper\./);
    const keyed = toRawRows(parseTranscript(GOOD), { ...MINI, answerSource: "key" });
    expect(keyed[0].solution).toBe("Because it is so.");
  });

  it("puts a flawed question's notice above its solution", () => {
    const text = GOOD.replace("answer: B\nstem:\nQuestion 1?", "answer: B\nflawed: yes\nnote: two options are right\nnotice: Options B and C are both correct as printed.\nstem:\nQuestion 1?");
    const rows = toRawRows(parseTranscript(text), MINI);
    expect(rows[0].solution).toMatch(/^\*\*Note:\*\* Options B and C/);
  });
});

describe("mergeDrafts", () => {
  it("joins drafts under one header and drops each draft's own preamble, so it cannot land in a solution", () => {
    const a = block(1, "chapter: Number System\nsubtopic: x");
    const b = "SPI 2022, Q2. Pass-1 draft, no key.\nA second preamble line.\n\n" + block(2, "chapter: Number System\nsubtopic: x");
    const merged = mergeDrafts([a, b], "HEADER");
    expect(merged.startsWith("HEADER\n\n=== 1\n")).toBe(true);
    expect(merged).not.toMatch(/Pass-1 draft|second preamble/);
    expect(parseTranscript(merged).map((q) => [q.number, q.solution])).toEqual([
      [1, "Because it is so."],
      [2, "Because it is so."],
    ]);
  });

  it("refuses a draft with no question block", () => {
    expect(() => mergeDrafts(["just notes"], "H")).toThrow(/draft 1 has no "=== n" block/);
  });
});

describe("figurePaths", () => {
  it("names one stem picture and a picture per [figure] option, by zero-padded number", () => {
    const head = "chapter: Number System\nsubtopic: x";
    const [q] = parseTranscript(
      block(8, head, "A: [figure]\nB: [figure]\nC: [figure]\nD: None of these.").replace("answer: B\n", "answer: B\nfigure: stem+options\n")
    );
    expect(figurePaths(q, "F")).toEqual({ stem: "F/q008.png", options: ["F/q008-A.png", "F/q008-B.png", "F/q008-C.png"] });
    const [all] = parseTranscript(block(9, head, "A: [figure]\nB: [figure]\nC: [figure]\nD: [figure]").replace("answer: B\n", "answer: B\nfigure: options\n"));
    expect(figurePaths(all, "F")).toEqual({ stem: null, options: ["F/q009-A.png", "F/q009-B.png", "F/q009-C.png", "F/q009-D.png"] });
    const [plain] = parseTranscript(block(9, "chapter: Number System\nsubtopic: x"));
    expect(figurePaths(plain, "F")).toEqual({ stem: null, options: null });
  });
});

describe("verify lane", () => {
  it("the packet carries no answer, solution, note or classification", () => {
    const text = GOOD.replace("answer: B\nstem:\nQuestion 1?", "answer: B\nnote: secret\nstem:\nQuestion 1?");
    const packet = verifyPacket(parseTranscript(text));
    expect(packet).toMatch(/=== 1\nstem:\nQuestion 1\?\nA: 1/);
    expect(packet).not.toMatch(/answer:|solution|secret|Because|chapter:|difficulty:/);
  });

  it("parses verify lines and reports disagreements, fidelity issues and missing numbers", () => {
    const qs = parseTranscript(GOOD); // every answer B
    const verify = parseVerify(
      [
        "1 | B | ok",
        "2 | C | ok | clock angle is 75 not 105",
        "3 | B | fidelity: option D reads 'Precise' on the page",
        "# a comment line",
      ].join("\n")
    );
    const r = compareVerify(qs, verify);
    expect(r.agree).toEqual([1, 3]);
    expect(r.disagree).toEqual([{ n: 2, ours: "B", blind: "C", why: "clock angle is 75 not 105" }]);
    expect(r.fidelity).toEqual([{ n: 3, issue: "option D reads 'Precise' on the page" }]);
    expect(r.missing).toEqual([4]);
  });

  it("refuses a malformed verify line", () => {
    expect(() => parseVerify("7 | E | ok")).toThrow(/line 1/);
    expect(() => parseVerify("seven | A | ok")).toThrow(/line 1/);
  });
});

describe("retagSubtopics", () => {
  const T = [
    block(1, "chapter: Probability\nsubtopic: Playing Cards"),
    block(2, "chapter: Number System\nsubtopic: Place Value"),
    block(3, "chapter: Probability\nsubtopic: Two Dice"),
    block(4, "chapter: Probability\nsubtopic: Coins and a Single Die"),
  ].join("\n");
  const order = ["Coins and a Single Die", "Two Dice and Calendar Pairs", "Cards, Bags and Numbered Cards"];

  it("rewrites only the chapter's subtopic lines, by question number, and leaves every other byte alone", () => {
    const targets = new Map([[1, "Cards, Bags and Numbered Cards"], [3, "Two Dice and Calendar Pairs"]]);
    const r = retagSubtopics(T, "Probability", targets, order);
    expect(r.problems).toEqual([]);
    expect(r.changes).toBe(2);
    expect(r.text).toBe(
      T.replace("subtopic: Playing Cards", "subtopic: Cards, Bags and Numbered Cards").replace(
        "subtopic: Two Dice\n",
        "subtopic: Two Dice and Calendar Pairs\n",
      ),
    );
  });

  it("keeps a block already in a teaching subtopic, and reports one with no target", () => {
    const r = retagSubtopics(T, "Probability", new Map([[1, "Cards, Bags and Numbered Cards"]]), order);
    expect(r.changes).toBe(1);
    expect(r.problems).toEqual(['Q3: no target for subtopic "Two Dice"']);
  });

  it("keeps CRLF line endings", () => {
    const crlf = T.replace(/\n/g, "\r\n");
    const r = retagSubtopics(crlf, "Probability", new Map([[1, order[2]], [3, order[1]]]), order);
    expect(r.text).toContain("subtopic: Cards, Bags and Numbered Cards\r\n");
    expect(r.text.replace(/\r\n/g, "")).not.toMatch(/\n/);
  });

  it("refuses a target that is not in the teaching order", () => {
    const r = retagSubtopics(T, "Probability", new Map([[1, "Cards"], [3, order[1]]]), order);
    expect(r.problems).toEqual(['Q1: target "Cards" is not in the teaching order']);
  });
});
