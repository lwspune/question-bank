/**
 * ENEM lane, pure core (scripts/enem/lib.ts). ENEM prints five options A-E in
 * their own order and INEP's key names one letter, or "Anulado" when INEP
 * cancelled the question. The row keeps the printed order (no shuffle), so a
 * student sees what the paper showed.
 */
import { describe, it, expect } from "vitest";
import { buildRow, cancelledNoteFor, pyqNoteFor, SUBJECT_NAMES, CHAPTER_NAMES, type EnemQuestion } from "../scripts/enem/lib";

const base: EnemQuestion = {
  n: 94,
  area: "natureza",
  subject: "fisica",
  chapter: "eletricidade",
  text: "Uma régua suporta 20 A em 110 V. Quantas atividades ela realizou?",
  options: ["4", "3", "2", "1", "0"],
  credit: [],
  figure: null,
  option_figures: null,
  solution: "A potência máxima é \\(110 \\times 20 = 2\\,200\\) W; sobram 850 W; só a impressora cabe.",
};

describe("buildRow", () => {
  it("keeps the printed order and marks INEP's letter correct", () => {
    const row = buildRow(2025, base, "D", { day: 2 });
    expect(row.options.map((o) => o.label)).toEqual(["A", "B", "C", "D", "E"]);
    expect(row.options.map((o) => o.text)).toEqual(["4", "3", "2", "1", "0"]);
    expect(row.options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["D"]);
    expect(row.subjectName).toBe("Física");
    expect(row.chapterName).toBe(CHAPTER_NAMES.eletricidade);
    expect(row.questionNumber).toBe("94");
    expect(row.solution).toContain("850 W");
    expect(row.cancelledNote).toBeUndefined();
  });

  it("keeps a question INEP cancelled, with no option correct and a notice", () => {
    const row = buildRow(2025, base, "ANULADO", { day: 2 });
    expect(row.options.some((o) => o.isCorrect)).toBe(false);
    expect(row.cancelledNote).toBe(cancelledNoteFor(2025, 2));
    expect(row.cancelledNote).toMatch(/anulada pelo INEP/);
  });

  it("hashes a cancelled question apart from the same question keyed", () => {
    expect(buildRow(2025, base, "ANULADO", { day: 2 }).contentHash).not.toBe(buildRow(2025, base, "D", { day: 2 }).contentHash);
  });

  it("refuses anything but five non-empty, distinct options", () => {
    expect(() => buildRow(2025, { ...base, options: ["1", "2", "3", "4"] }, "A", { day: 2 })).toThrow(/five options/);
    expect(() => buildRow(2025, { ...base, options: ["1", "", "3", "4", "5"] }, "A", { day: 2 })).toThrow(/empty option/);
    expect(() => buildRow(2025, { ...base, options: ["1", "1", "3", "4", "5"] }, "A", { day: 2 })).toThrow(/duplicate/);
  });

  it("takes drawn options only with their figure", () => {
    const drawn = { ...base, options: ["Figura A", "Figura B", "Figura C", "Figura D", "Figura E"] };
    expect(() => buildRow(2025, drawn, "B", { day: 2 })).toThrow(/option_figures/);
    const ok = buildRow(2025, { ...drawn, option_figures: { page: 4, box: [1, 2, 3, 4] } }, "B", { day: 2 });
    expect(ok.options[1].isCorrect).toBe(true);
  });

  it("never loses a source credit: every credit line must be in the text as printed", () => {
    const credit = "CORRÊA, M. A. Cosmetologia: ciência e técnica. São Paulo: Medfarma, 2012 (adaptado).";
    expect(() => buildRow(2025, { ...base, credit: [credit] }, "D", { day: 2 })).toThrow(/credit/);
    const row = buildRow(2025, { ...base, credit: [credit], text: `${base.text}\n\n${credit}` }, "D", { day: 2 });
    expect(row.text).toContain(credit);
  });

  it("refuses a bare dollar sign, a literal backslash-n and an unknown subject or chapter", () => {
    expect(() => buildRow(2025, { ...base, text: "Custa $ 5 e $ 6" }, "D", { day: 2 })).toThrow(/\$/);
    expect(() => buildRow(2025, { ...base, text: "linha\\nlinha" }, "D", { day: 2 })).toThrow(/backslash-n/);
    expect(() => buildRow(2025, { ...base, subject: "historia" as never }, "D", { day: 2 })).toThrow(/subject/);
    expect(() => buildRow(2025, { ...base, chapter: "nada" }, "D", { day: 2 })).toThrow(/chapter/);
  });

  it("refuses a key letter that is not A-E or Anulado", () => {
    expect(() => buildRow(2025, base, "F" as never, { day: 2 })).toThrow(/key/);
  });
});

describe("a question defective as printed (owner's policy, 2026-10-29)", () => {
  it("keeps INEP's key and shows the notice above the solution, in bold", () => {
    const notice = "Como impressa, a questão não tem alternativa correta.";
    const row = buildRow(2022, { ...base, notice }, "E", { day: 2 });
    expect(row.options.find((o) => o.isCorrect)?.label).toBe("E");
    expect(row.solution).toBe(`**Nota:** ${notice}\n\n${base.solution}`);
  });

  it("leaves the hash alone: a notice added later changes no question id", () => {
    expect(buildRow(2022, { ...base, notice: "x" }, "E", { day: 2 }).contentHash).toBe(buildRow(2022, base, "E", { day: 2 }).contentHash);
  });
});

describe("notes", () => {
  it("fits the public provenance cap (under 48 characters)", () => {
    expect(pyqNoteFor(2025, 2)).toBe("ENEM 2025, 2º dia, caderno 7");
    expect(pyqNoteFor(2016, 1)).toBe("ENEM 2016, 1º dia, caderno 1");
    expect(pyqNoteFor(2025, 2).length).toBeLessThan(48);
  });

  it("names the four subjects in Portuguese", () => {
    expect(SUBJECT_NAMES).toEqual({ matematica: "Matemática", fisica: "Física", quimica: "Química", biologia: "Biologia" });
  });
});
