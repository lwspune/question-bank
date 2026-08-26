import { describe, it, expect } from "vitest";
import { askedWord, auditPaper, expectedInPassage } from "../scripts/cds/audit-passages";

const Q = (number: number, stem: string) => ({ number, stem });
const SEC = (over: Partial<{ setLabel: string; type: string; qFrom: number; qTo: number; passage: string }> = {}) => ({
  setLabel: "S1", type: "reading-comprehension", qFrom: 1, qTo: 2, passage: "x".repeat(400), ...over,
});

describe("askedWord — which word a stem sends the reader to find", () => {
  it("extracts a double-quoted single word", () => {
    expect(askedWord('What is the meaning of the word "dilettantes" in the passage?')).toBe("dilettantes");
  });

  it("extracts a single-quoted word", () => {
    expect(askedWord("The word 'gamut' as used in the passage means:")).toBe("gamut");
  });

  it("handles curly quotes, which is what the booklets actually print", () => {
    expect(askedWord("The word “repletion” in the passage means")).toBe("repletion");
  });

  // The load-bearing negative. This stem quotes a 16-word ASSERTION to be
  // paraphrased, not a word to locate verbatim; treating it as a lookup would
  // fail every correctly-transcribed passage.
  it("returns null for a long quoted assertion", () => {
    expect(askedWord(
      'Which word(s) from the passage can be substituted for the assertion that "all events and human actions are ultimately shaped by causes external to the will"?'
    )).toBeNull();
  });

  it("returns null when no word is quoted at all", () => {
    expect(askedWord("According to the passage, what is the primary purpose of a walking tour?")).toBeNull();
  });

  it("allows a two-word term but not a phrase", () => {
    expect(askedWord('The phrase "canting dilettantes" means')).toBe("canting dilettantes");
    expect(askedWord('The phrase "a pipe for any wind to play upon" means')).toBeNull();
  });
});

// The two shapes are OPPOSITE, and reading only the first made the gate fire on
// four correctly-transcribed passages. In "Which word in the passage means
// 'bias'?" the quoted word is the gloss and is deliberately NOT in the text —
// the keyed option ("prejudice") is what must appear.
describe("expectedInPassage — the two opposite vocabulary shapes", () => {
  it("shape A: the quoted word itself is expected in the passage", () => {
    expect(expectedInPassage('What is the meaning of the word "dilettantes" in the passage?', "aesthete"))
      .toEqual({ kind: "quoted", word: "dilettantes" });
  });

  it("shape B: the KEYED OPTION is expected, not the quoted gloss", () => {
    expect(expectedInPassage("Which word in the passage means 'bias'?", "prejudice"))
      .toEqual({ kind: "answer", word: "prejudice" });
  });

  it("shape B with no key available expects nothing rather than guessing", () => {
    expect(expectedInPassage("Which word in the passage means 'bias'?", undefined)).toBeNull();
  });

  it("shape B ignores a multi-word keyed option — a phrase is a paraphrase, not a token", () => {
    expect(expectedInPassage("Which word(s) from the passage can be substituted for X?", "Deterministic relationship"))
      .toBeNull();
  });

  it("shape B is matched BEFORE shape A, or its gloss is misread as a lookup word", () => {
    const e = expectedInPassage("Which word in the passage means 'changeover'?", "Transitioned");
    expect(e?.kind).toBe("answer");
    expect(e?.word).toBe("Transitioned");
  });
});

describe("auditPaper", () => {
  it("does not flag shape B when the keyed option is present, whatever the gloss", () => {
    const f = auditPaper("P",
      [SEC({ qFrom: 1, qTo: 1, passage: "without the prejudice of the right or of the left. ".repeat(9) })],
      [{ number: 1, stem: "Which word in the passage means 'bias'?", answer: "B",
         options: [{ label: "A", text: "contrary" }, { label: "B", text: "prejudice" }] }]);
    expect(f).toHaveLength(0);
  });

  it("DOES flag shape B when the keyed option is absent — a real wrong key or truncation", () => {
    const f = auditPaper("P",
      [SEC({ qFrom: 1, qTo: 1, passage: "nothing relevant here at all. ".repeat(15) })],
      [{ number: 1, stem: "Which word in the passage means 'bias'?", answer: "B",
         options: [{ label: "A", text: "contrary" }, { label: "B", text: "prejudice" }] }]);
    expect(f).toHaveLength(1);
    expect(f[0].detail).toContain("keyed answer is absent");
  });

  it("exempts cloze from the RC char-per-question ratio", () => {
    const cloze = SEC({ type: "cloze", qFrom: 1, qTo: 10, passage: "z".repeat(825) });
    expect(auditPaper("P", [cloze], [])).toHaveLength(0);
    const rc = SEC({ type: "reading-comprehension", qFrom: 1, qTo: 10, passage: "z".repeat(825) });
    expect(auditPaper("P", [rc], []).map((x) => x.rule)).toEqual(["P-THIN"]);
  });
});

describe("auditPaper", () => {
  it("flags a section still holding the placeholder", () => {
    const f = auditPaper("P", [SEC({ passage: "(Passages not stored — refer to the source booklet.)" })], []);
    expect(f.map((x) => x.rule)).toEqual(["P-PLACEHOLDER"]);
  });

  it("flags a passage that is merely short, without needing the stub wording", () => {
    expect(auditPaper("P", [SEC({ passage: "too short" })], [])[0].rule).toBe("P-PLACEHOLDER");
  });

  // The defect this whole gate exists for: a truncated passage reads perfectly
  // and is only detectable by asking whether the text a question depends on is
  // present. Caught for real on the 2024-2 pilot.
  it("flags a word the question asks about but the passage lacks", () => {
    const f = auditPaper("P",
      [SEC({ qFrom: 1, qTo: 1, passage: "A walking tour should be gone upon alone. ".repeat(12) })],
      [Q(1, 'What is the meaning of the word "dilettantes" in the passage?')]);
    expect(f).toHaveLength(1);
    expect(f[0].rule).toBe("P-WORD-MISSING");
    expect(f[0].detail).toContain("dilettantes");
  });

  it("passes when the word IS present, case-insensitively", () => {
    const f = auditPaper("P",
      [SEC({ qFrom: 1, qTo: 1, passage: "none more vivid, in spite of canting Dilettantes, than from a railway train. ".repeat(6) })],
      [Q(1, 'What is the meaning of the word "dilettantes" in the passage?')]);
    expect(f).toHaveLength(0);
  });

  it("ignores sections that have no passage field at all (grammar, antonyms, …)", () => {
    const noPassage = { setLabel: "S1", type: "antonyms", qFrom: 1, qTo: 5 };
    expect(auditPaper("P", [noPassage], [Q(1, 'the word "x" means')])).toHaveLength(0);
  });

  it("does not report P-THIN on top of P-PLACEHOLDER — one cause, one finding", () => {
    const f = auditPaper("P", [SEC({ qFrom: 1, qTo: 10, passage: "(Passages not stored.)" })], []);
    expect(f).toHaveLength(1);
  });

  it("flags a passage too short for the number of questions it serves", () => {
    const f = auditPaper("P", [SEC({ qFrom: 1, qTo: 10, passage: "y".repeat(400) })], []);
    expect(f.map((x) => x.rule)).toEqual(["P-THIN"]);
  });
});
