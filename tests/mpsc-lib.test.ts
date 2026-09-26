import { describe, expect, it } from "vitest";
import {
  devanagariDigitsToAscii,
  numberBag,
  buildRecords,
  parseKeyLines,
  parseKeyTokens,
  parityIssues,
  printNoteSolution,
  type BilingualQuestion,
} from "../scripts/mpsc/lib";

describe("devanagariDigitsToAscii", () => {
  it("maps every Devanagari digit to its ASCII twin", () => {
    expect(devanagariDigitsToAscii("३१ जुलै १८५७")).toBe("31 जुलै 1857");
    expect(devanagariDigitsToAscii("०१२३४५६७८९")).toBe("0123456789");
  });

  it("leaves Devanagari letters and ASCII untouched", () => {
    expect(devanagariDigitsToAscii("कलम 370 व ३५अ")).toBe("कलम 370 व 35अ");
  });
});

describe("numberBag", () => {
  it("collects numbers across scripts as one sorted multiset", () => {
    expect(numberBag("१८५७ चे बंड, २७ वी पलटण")).toEqual(["1857", "27"].sort());
  });

  it("drops thousands separators so 1,000 and 1000 agree", () => {
    expect(numberBag("१,०००")).toEqual(numberBag("1000"));
  });

  it("keeps decimals whole", () => {
    expect(numberBag("6.6 per cent")).toEqual(["6.6"]);
  });
});

describe("parseKeyTokens", () => {
  // Rows are `q, setA, setB, setC, setD`; the two columns of a key page
  // interleave in the text stream, so row order is not question order.
  const toks = ["1", "4", "3", "3", "3", "26", "2", "3", "2", "1", "2", "#", "2", "3", "3"];

  it("reads groups of five and maps 1-4 to A-D per booklet set", () => {
    const r = parseKeyTokens(toks);
    expect(r.errors).toEqual([]);
    expect(r.rows.get(1)).toEqual(["D", "C", "C", "C"]);
    expect(r.rows.get(26)).toEqual(["B", "C", "B", "A"]);
  });

  it("keeps a cancelled question as '#', never as a letter", () => {
    expect(parseKeyTokens(toks).rows.get(2)).toEqual(["#", "B", "C", "C"]);
  });

  it("ignores blank tokens between groups", () => {
    expect(parseKeyTokens(["", " ", ...toks.slice(0, 5)]).rows.get(1)).toEqual(["D", "C", "C", "C"]);
  });

  it("reports an unreadable answer token instead of guessing", () => {
    const r = parseKeyTokens(["7", "1", "x", "3", "4"]);
    expect(r.errors).toEqual(["Q7: unreadable answer token(s) x"]);
    expect(r.rows.has(7)).toBe(false);
  });

  it("reports a trailing partial group", () => {
    expect(parseKeyTokens(["7", "1", "2"]).errors).toEqual(["trailing partial group: 7 1 2"]);
  });

  it("reports a duplicate question number", () => {
    const r = parseKeyTokens(["7", "1", "2", "3", "4", "7", "1", "2", "3", "4"]);
    expect(r.errors).toEqual(["Q7: appears twice"]);
  });
});

describe("parseKeyLines", () => {
  it("reads each printed line as whole groups of five, left column then right", () => {
    const r = parseKeyLines([
      ["1", "4", "3", "3", "3", "26", "2", "3", "2", "1"],
      ["2", "#", "2", "3", "3", "27", "3", "3", "3", "3"],
    ]);
    expect(r.errors).toEqual([]);
    expect(r.rows.get(26)).toEqual(["B", "C", "B", "A"]);
    expect(r.rows.get(2)).toEqual(["#", "B", "C", "C"]);
  });

  it("sets a lone footer marker aside, visibly, rather than reading it as key", () => {
    const r = parseKeyLines([["1", "4", "3", "3", "3"], ["2"]]);
    expect(r.errors).toEqual([]);
    expect(r.ignored).toEqual([["2"]]);
    expect(r.rows.size).toBe(1);
  });

  it("refuses a line with a missing cell — it would shift every answer after it", () => {
    const r = parseKeyLines([["1", "4", "3", "3", "26", "2", "3", "2", "1"]]);
    expect(r.errors).toEqual(["line 1 has 9 tokens (not a multiple of 5): 1 4 3 3 26 2 3 2 1"]);
    expect(r.rows.size).toBe(0);
  });
});

describe("parityIssues", () => {
  const base = (): BilingualQuestion => ({
    n: 2,
    subject: "History",
    chapter: "Modern India",
    subtopic: "Revolt of 1857",
    difficulty: "MODERATE",
    en: {
      stem: "Under whose leadership did the 27th regiment at Kolhapur revolt on 31 July 1857?",
      options: ["Ramji Shirsath", "Nanasaheb Peshwe", "Rango Bapuji", "Chimasaheb"],
    },
    mr: {
      stem: "कोल्हापूर येथील २७ व्या पलटणीतील हिंदी शिपायांनी कोणाच्या नेतृत्वाखाली ३१ जुलै १८५७ चे बंड केले होते ?",
      options: ["रामजी शिरसाठ", "नानासाहेब पेशवे", "रंगो बापूजी", "चिमासाहेब"],
    },
  });

  it("passes a faithful pair", () => {
    expect(parityIssues(base())).toEqual([]);
  });

  it("flags a number that differs between the two versions", () => {
    const q = base();
    q.mr.stem = q.mr.stem.replace("१८५७", "१८५८");
    expect(parityIssues(q)).toEqual(["stem numbers differ: en [1857,27,31] mr [1858,27,31]"]);
  });

  it("flags a per-option number mismatch by option letter", () => {
    const q = base();
    q.en.options = ["1947", "1950", "1952", "1956"];
    q.mr.options = ["१९४७", "१९५०", "१९५३", "१९५६"];
    expect(parityIssues(q)).toEqual(["option C numbers differ: en [1952] mr [1953]"]);
  });

  it("flags a missing option on either side", () => {
    const q = base();
    q.mr.options = q.mr.options.slice(0, 3);
    expect(parityIssues(q)).toContain("mr has 3 options, expected 4");
  });

  it("flags a different number of stem lines (a dropped statement)", () => {
    const q = base();
    q.en.stem = "Consider:\na. one\nb. two\nc. three";
    q.mr.stem = "विचार करा:\nअ. एक\nब. दोन";
    expect(parityIssues(q)).toContain("stem line count differs: en 4, mr 3");
  });

  it("flags a context present in only one version", () => {
    const q = base();
    q.en.context = "Read the passage.";
    expect(parityIssues(q)).toContain("context present in en only");
  });
});

describe("buildRecords", () => {
  const q = (n: number): BilingualQuestion => ({
    n,
    subject: "Polity",
    chapter: "Indian Constitution",
    subtopic: "Schedules",
    difficulty: "EASY",
    en: { stem: `Question ${n}`, options: ["one", "two", "three", "four"] },
    mr: { stem: `प्रश्न ${n}`, options: ["एक", "दोन", "तीन", "चार"] },
  });

  it("builds an English row keyed from the Set-A letter", () => {
    const { rows, errors } = buildRecords([q(1)], { 1: "C" });
    expect(errors).toEqual([]);
    expect(rows[0]).toMatchObject({
      sourceRow: 1,
      questionNumber: "1",
      question: "Question 1",
      optionC: "three",
      answer: "C",
      subject: "Polity",
    });
  });

  it("keeps a cancelled question, with no key and the paper's notice, rather than inventing one", () => {
    const note = "Cancelled by MPSC in the final answer key.";
    const { rows, cancelled, errors } = buildRecords([q(1), q(2)], { 1: "#", 2: "A" }, note);
    expect(errors).toEqual([]);
    expect(cancelled).toEqual([1]);
    expect(rows.map((r) => [r.questionNumber, r.answer, r.cancelledNote])).toEqual([
      ["1", "CANCELLED", note],
      ["2", "A", undefined],
    ]);
  });

  it("refuses a question the key does not cover", () => {
    expect(buildRecords([q(3)], {}).errors).toEqual(["Q3: no key entry"]);
  });

  it("carries a context through when the paper prints one", () => {
    const withCtx = { ...q(4), en: { ...q(4).en, context: "Passage" } };
    expect(buildRecords([withCtx], { 4: "B" }).rows[0].context).toBe("Passage");
  });
});

describe("printNoteSolution", () => {
  it("turns a print note into a labelled remark in both languages", () => {
    const s = printNoteSolution("Marathi says south-west; English says North-Western.")!;
    expect(s.en).toBe(
      "**Note on the printed paper:** the Marathi and English versions of this question differ. Marathi says south-west; English says North-Western."
    );
    expect(s.mr).toBe(
      "**मुद्रित प्रश्नपत्रिकेबाबत टीप:** या प्रश्नाच्या मराठी व इंग्रजी आवृत्तीत फरक आहे. Marathi says south-west; English says North-Western."
    );
  });

  it("gives nothing for a question without a note", () => {
    expect(printNoteSolution(undefined)).toBeNull();
  });
});
