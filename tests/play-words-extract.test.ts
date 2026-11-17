import { describe, it, expect } from "vitest";
import {
  extractHeadword,
  wordKind,
  examGroup,
  promptSentence,
  toWordEntry,
  dedupeWords,
  parseWordFile,
  type BankWordRow,
} from "@/lib/play/words/extract";

const row = (over: Partial<BankWordRow> = {}): BankWordRow => ({
  id: "q1",
  text: "Select the most appropriate synonym of the given word: **TRENCHANT**",
  context: null,
  subtopic: "Synonyms",
  exam: "SSC CGL",
  pyqYear: 2025,
  pyqNote: "Tier I, 21 Sep 2025, Shift 2",
  solution: "Trenchant means sharp and direct. Incisive matches.",
  options: [
    { label: "A", text: "Blurry", isCorrect: false },
    { label: "B", text: "Weak", isCorrect: false },
    { label: "C", text: "Incisive", isCorrect: true },
    { label: "D", text: "Vague", isCorrect: false },
  ],
  ...over,
});

describe("extractHeadword: the word a synonym/antonym question asks about", () => {
  it("reads an underlined word inside a sentence", () => {
    expect(extractHeadword("Mohan has \\(\\underline{\\text{mercurial}}\\) temperament.")).toBe("mercurial");
  });

  it("reads a bold word", () => {
    expect(extractHeadword("Select the most appropriate antonym of the given word. **Incandescent**")).toBe("Incandescent");
  });

  it("reads a word alone on the last line", () => {
    expect(extractHeadword("Select the most appropriate ANTONYM of the given word.\nTriumph")).toBe("Triumph");
    expect(extractHeadword("Choose one word that is most closely opposite in meaning to the capitalized word :\nADMONITION")).toBe(
      "ADMONITION"
    );
  });

  it("reads the word before an [underlined] marker", () => {
    expect(extractHeadword("The police department's image was tarnished [underlined] after the case")).toBe("tarnished");
  });

  it("refuses a phrase, a blank, or a stem with no marked word", () => {
    expect(extractHeadword("He \\(\\underline{\\text{gave up}}\\) smoking.")).toBeNull();
    expect(extractHeadword("He is always \\(\\underline{\\text{ }}\\) late.")).toBeNull();
    expect(extractHeadword("Which of the following words is spelt correctly?")).toBeNull();
  });

  it("refuses a stem that marks two different words", () => {
    expect(extractHeadword("Both **brave** and **bold** are used here.")).toBeNull();
  });
});

describe("wordKind: synonym or antonym", () => {
  it("trusts the stem first", () => {
    expect(wordKind("Select the most appropriate ANTONYM of the underlined word.", null, "Synonyms")).toBe("antonym");
    expect(wordKind("Select the most appropriate synonym of the given word.", null, "Antonyms")).toBe("synonym");
    expect(wordKind("Choose one word that is most closely opposite in meaning", null, "x")).toBe("antonym");
  });

  it("falls back to the directions, then the subtopic", () => {
    expect(wordKind("Mohan has a temper.", "Directions: nearest in meaning to the underlined word", "x")).toBe("synonym");
    expect(wordKind("Mohan has a temper.", "Directions: opposite in meaning to the underlined word", "x")).toBe("antonym");
    expect(wordKind("Planets move.", "Directions : Each item consists of a sentence", "Antonyms")).toBe("antonym");
    expect(wordKind("Planets move.", null, "Synonyms: Character and Temperament")).toBe("synonym");
  });

  it("returns null when nothing decides it", () => {
    expect(wordKind("Planets move.", null, "Synonyms, Antonyms and Word Meaning")).toBeNull();
  });
});

describe("examGroup: the chip a word sits under", () => {
  it("puts every SSC paper together and NDA and CDS on their own", () => {
    expect(examGroup("SSC CGL")).toBe("ssc");
    expect(examGroup("SSC CGL Tier II")).toBe("ssc");
    expect(examGroup("SSC CHSL")).toBe("ssc");
    expect(examGroup("SSC CPO")).toBe("ssc");
    expect(examGroup("NDA")).toBe("nda");
    expect(examGroup("CDS")).toBe("cds");
    expect(examGroup("MPSC State Services Mains")).toBe("other");
  });
});

describe("promptSentence: the sentence shown under the word", () => {
  it("drops the instruction line and keeps the sentence", () => {
    expect(
      promptSentence("Select the most appropriate ANTONYM of the underlined word.\n\nThose streets are very \\(\\underline{\\text{lonely}}\\).")
    ).toBe("Those streets are very \\(\\underline{\\text{lonely}}\\).");
  });

  it("keeps a sentence-only stem as it is", () => {
    expect(promptSentence("Mohan has \\(\\underline{\\text{mercurial}}\\) temperament.")).toBe(
      "Mohan has \\(\\underline{\\text{mercurial}}\\) temperament."
    );
  });

  it("turns a 'word [underlined]' marker into a real underline", () => {
    expect(promptSentence("Sages have cautioned [underlined] that the path is long")).toBe(
      "Sages have \\(\\underline{\\text{cautioned}}\\) that the path is long"
    );
  });

  it("is null when the stem is only an instruction and the word", () => {
    expect(promptSentence("Select the most appropriate synonym of the given word: **TRENCHANT**")).toBeNull();
    expect(promptSentence("Select the most appropriate ANTONYM of the given word.\nTriumph")).toBeNull();
    expect(promptSentence("Select the most appropriate synonym of the given word.\n**Compulsory**")).toBeNull();
  });
});

describe("toWordEntry: one playable word", () => {
  it("builds the entry with the answer's index and the source line", () => {
    expect(toWordEntry(row())).toEqual({
      id: "q1",
      word: "trenchant",
      kind: "synonym",
      group: "ssc",
      exam: "SSC CGL",
      year: 2025,
      note: "Tier I, 21 Sep 2025, Shift 2",
      sentence: null,
      options: ["Blurry", "Weak", "Incisive", "Vague"],
      answer: 2,
      solution: "Trenchant means sharp and direct. Incisive matches.",
    });
  });

  it("refuses a row that is not exactly one right answer among 4 or 5 options", () => {
    const two = row().options.map((o) => ({ ...o, isCorrect: o.label !== "A" ? o.isCorrect : true }));
    expect(toWordEntry(row({ options: two }))).toBeNull();
    expect(toWordEntry(row({ options: row().options.slice(0, 3) }))).toBeNull();
    expect(toWordEntry(row({ options: row().options.map((o) => ({ ...o, isCorrect: false })) }))).toBeNull();
  });

  it("refuses a row with no headword, no kind or no explanation", () => {
    expect(toWordEntry(row({ text: "Which word is spelt correctly?" }))).toBeNull();
    expect(toWordEntry(row({ text: "Planets **move**.", subtopic: "Synonyms, Antonyms and Word Meaning" }))).toBeNull();
    expect(toWordEntry(row({ solution: "  " }))).toBeNull();
    expect(toWordEntry(row({ solution: null }))).toBeNull();
  });

  it("refuses options that are blank", () => {
    const blank = row().options.map((o, i) => (i === 1 ? { ...o, text: " " } : o));
    expect(toWordEntry(row({ options: blank }))).toBeNull();
  });

  it("orders options by label, whatever order they arrive in", () => {
    const e = toWordEntry(row({ options: [...row().options].reverse() }));
    expect(e?.options).toEqual(["Blurry", "Weak", "Incisive", "Vague"]);
    expect(e?.answer).toBe(2);
  });
});

describe("dedupeWords: one entry per word", () => {
  it("keeps the most recent paper's question, then the lowest id, and sorts by word", () => {
    const a = toWordEntry(row({ id: "b", pyqYear: 2023 }))!;
    const b = toWordEntry(row({ id: "c", pyqYear: 2025 }))!;
    const c = toWordEntry(row({ id: "a", pyqYear: 2025 }))!;
    const d = toWordEntry(row({ id: "z", text: "Select the synonym of the given word.\n**Abate**" }))!;
    const out = dedupeWords([a, b, c, d]);
    expect(out.map((e) => e.id)).toEqual(["z", "a"]);
  });
});

describe("parseWordFile: the file the games download", () => {
  const good = toWordEntry(row())!;

  it("reads a v1 file", () => {
    expect(parseWordFile({ v: 1, words: [good] })).toEqual([good]);
  });

  it("drops malformed entries and keeps the rest", () => {
    const bad = [{ ...good, answer: 7 }, { ...good, options: "x" }, { ...good, word: "" }, null, { ...good, kind: "verb" }];
    expect(parseWordFile({ v: 1, words: [good, ...bad] })).toEqual([good]);
  });

  it("is null for anything that is not a v1 file", () => {
    for (const f of [null, [], { v: 2, words: [] }, { v: 1 }, { v: 1, words: {} }, "x"]) expect(parseWordFile(f)).toBeNull();
  });
});
