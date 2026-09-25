import { describe, expect, it } from "vitest";
import { applyExportLanguage, parseExportLang } from "../src/lib/export/exportLanguage";
import type { QuestionRow } from "../src/lib/questions/query";

const base = (over: Partial<QuestionRow> = {}): QuestionRow => ({
  id: "q1",
  text: "Who wrote it ?",
  context: null,
  difficulty: "EASY",
  solution: null,
  imageUrl: null,
  setId: null,
  questionNumber: "1",
  pyqYear: 2024,
  pyqMonth: null,
  pyqNote: null,
  exam: { id: "e", name: "MPSC Group B & C Prelims" },
  subject: { id: "s", name: "History" },
  chapter: { id: "c", name: "Modern India" },
  subtopic: null,
  options: [
    { label: "A", text: "One", isCorrect: true, imageUrl: null },
    { label: "B", text: "Two", isCorrect: false, imageUrl: null },
  ],
  translations: { mr: { text: "कोणी लिहिले ?", context: null, options: { A: "एक", B: "दोन" } } },
  ...over,
});

describe("parseExportLang", () => {
  it("defaults to English for anything unrecognised, so old clients export exactly as before", () => {
    expect(parseExportLang(undefined)).toBe("en");
    expect(parseExportLang("fr")).toBe("en");
    expect(parseExportLang("mr")).toBe("mr");
    expect(parseExportLang("both")).toBe("both");
  });
});

describe("applyExportLanguage", () => {
  it("English returns the rows untouched", () => {
    const rows = [base()];
    expect(applyExportLanguage(rows, "en")).toBe(rows);
  });

  it("Marathi swaps the stem and every option, keeping the key", () => {
    const [q] = applyExportLanguage([base()], "mr");
    expect(q.text).toBe("कोणी लिहिले ?");
    expect(q.options.map((o) => [o.text, o.isCorrect])).toEqual([
      ["एक", true],
      ["दोन", false],
    ]);
  });

  it("both prints Marathi then English, stem and options alike", () => {
    const [q] = applyExportLanguage([base()], "both");
    expect(q.text).toBe("कोणी लिहिले ?\n\nWho wrote it ?");
    expect(q.options[0].text).toBe("एक / One");
  });

  it("both joins contexts only where each version has one", () => {
    const withCtx = base({
      context: "Passage",
      translations: { mr: { text: "प्रश्न", context: "उतारा", options: {} } },
    });
    expect(applyExportLanguage([withCtx], "both")[0].context).toBe("उतारा\n\nPassage");
  });

  it("an English-only question prints in English whatever was asked", () => {
    const en = base({ translations: undefined });
    expect(applyExportLanguage([en], "mr")[0].text).toBe("Who wrote it ?");
  });
});
