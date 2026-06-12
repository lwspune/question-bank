import { describe, it, expect } from "vitest";
import {
  parseAnswerKey,
  missingNumbers,
  buildRecords,
  findLatexImbalance,
  type TranscribedQuestion,
  type BuildTopic,
} from "../scripts/practice/lib";

const TOPIC: BuildTopic = {
  chapterName: "Sequence & Series",
  qFrom: 406,
  qTo: 410,
  subtopics: ["Arithmetic Progressions", "Geometric Progressions"],
};

function q(number: number, over: Partial<TranscribedQuestion> = {}): TranscribedQuestion {
  return {
    number,
    subtopic: "Arithmetic Progressions",
    difficulty: "MODERATE",
    stem: `Question ${number}: find the \\(n\\)th term.`,
    options: [
      { label: "A", text: "1" },
      { label: "B", text: "2" },
      { label: "C", text: "3" },
      { label: "D", text: "4" },
    ],
    ...over,
  };
}

describe("parseAnswerKey", () => {
  it("parses 'N. x' pairs scoped to [from,to]", () => {
    const m = parseAnswerKey("405. a 406. b 407.\nc 408. d 409. a", 406, 408);
    expect(m.get(406)).toEqual(["B"]);
    expect(m.get(407)).toEqual(["C"]);
    expect(m.get(408)).toEqual(["D"]);
    expect(m.has(405)).toBe(false); // out of range
    expect(m.has(409)).toBe(false);
  });

  it("handles a missing dot ('936 d')", () => {
    expect(parseAnswerKey("936 d", 936, 936).get(936)).toEqual(["D"]);
  });

  it("captures multi-key answers", () => {
    const m = parseAnswerKey("972. b,c 987. a,b,c,d 988. b", 972, 988);
    expect(m.get(972)).toEqual(["B", "C"]);
    expect(m.get(987)).toEqual(["A", "B", "C", "D"]);
    expect(m.get(988)).toEqual(["B"]);
  });

  it("omits a number with no following letter (blank key)", () => {
    // 471 has no letter before the next number begins
    const m = parseAnswerKey("470. c 471. 472. a", 470, 472);
    expect(m.get(470)).toEqual(["C"]);
    expect(m.has(471)).toBe(false);
    expect(m.get(472)).toEqual(["A"]);
  });

  it("ignores header/non-key digits without a letter", () => {
    expect(parseAnswerKey("MATHEMATICS FOR N.D.A AND N.A 50 Answers 406. b", 406, 406).get(406)).toEqual(["B"]);
  });
});

describe("findLatexImbalance", () => {
  it("accepts balanced inline and display math", () => {
    expect(findLatexImbalance("find \\(x^2\\) and \\[\\sum k\\]")).toBeNull();
    expect(findLatexImbalance("no math here")).toBeNull();
  });
  it("flags an unclosed inline delimiter", () => {
    expect(findLatexImbalance("\\(x^2")).toBe("unclosed \\(");
  });
  it("flags a stray closing delimiter", () => {
    expect(findLatexImbalance("x^2\\)")).toBe("\\) without matching \\(");
  });
  it("flags nesting", () => {
    expect(findLatexImbalance("\\(a \\( b\\)\\)")).toBe("nested or unclosed \\(");
  });
});

describe("missingNumbers", () => {
  it("reports coverage gaps in range", () => {
    expect(missingNumbers([q(406), q(408)], 406, 409)).toEqual([407, 409]);
  });
});

describe("buildRecords", () => {
  const answers = new Map<number, string[]>([
    [406, ["B"]],
    [407, ["A"]],
    [408, ["B", "C"]],
  ]);

  it("builds a clean single-correct row with isCorrect set from the key", () => {
    const { rows, flags } = buildRecords(TOPIC, [q(406)], answers, new Map([[406, "Because AP."]]));
    expect(rows).toHaveLength(1);
    const r = rows[0];
    expect(r.questionNumber).toBe("406");
    expect(r.chapterName).toBe("Sequence & Series");
    expect(r.subtopicName).toBe("Arithmetic Progressions");
    expect(r.difficulty).toBe("MODERATE");
    expect(r.solution).toBe("Because AP.");
    expect(r.options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["B"]);
    expect(r.contentHash).toMatch(/^[0-9a-f]{64}$/);
    expect(flags).toHaveLength(0);
  });

  it("emits a multi-key row (multiple isCorrect) and flags it", () => {
    const { rows, flags } = buildRecords(TOPIC, [q(408, { subtopic: "Geometric Progressions" })], answers, new Map());
    expect(rows[0].options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["B", "C"]);
    expect(flags.some((f) => f.number === 408 && /multi-key/.test(f.reason))).toBe(true);
    expect(flags.some((f) => f.number === 408 && /no solution/.test(f.reason))).toBe(true);
  });

  it("skips + flags a question with no answer key, unless overridden", () => {
    const noKey = buildRecords(TOPIC, [q(409)], answers, new Map());
    expect(noKey.rows).toHaveLength(0);
    expect(noKey.flags.some((f) => f.number === 409 && /no answer key/.test(f.reason))).toBe(true);

    const overridden = buildRecords(TOPIC, [q(409)], answers, new Map(), { 409: ["D"] });
    expect(overridden.rows).toHaveLength(1);
    expect(overridden.rows[0].options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["D"]);
  });

  it("only includes questions within [qFrom,qTo]", () => {
    const { rows } = buildRecords(TOPIC, [q(405), q(406), q(490)], answers, new Map());
    expect(rows.map((r) => r.questionNumber)).toEqual(["406"]);
  });

  it("throws on an unknown subtopic", () => {
    expect(() => buildRecords(TOPIC, [q(406, { subtopic: "Calculus" })], answers, new Map())).toThrow(/subtopic/);
  });

  it("throws on a bad difficulty", () => {
    expect(() => buildRecords(TOPIC, [q(406, { difficulty: "TRICKY" })], answers, new Map())).toThrow(/difficulty/);
  });

  it("throws when options aren't exactly A,B,C,D", () => {
    const bad = q(406, { options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }] as TranscribedQuestion["options"] });
    expect(() => buildRecords(TOPIC, [bad], answers, new Map())).toThrow(/A,B,C,D/);
  });

  it("throws when the answer letter matches no option", () => {
    // key says B,C but if a transcription only had labels mapping... force via override of an out-of-set letter
    expect(() => buildRecords(TOPIC, [q(406)], answers, new Map(), { 406: ["E"] })).toThrow(/invalid/);
  });
});
