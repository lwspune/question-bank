import { describe, expect, it } from "vitest";
import { isLanguageNeutral, mathZones, parseHindiDraft, relaxScriptFindings } from "../scripts/ssc-cgl/hindi";

describe("parseHindiDraft", () => {
  it("reads blocks of stem and four options, keyed by question number", () => {
    const draft = [
      "# 18 Sep S1, PART-A",
      "Q 3",
      "stem: A, B की पत्नी है। D का C से क्या संबंध है?",
      "A: पोती",
      "B: पुत्री",
      "C: बहन",
      "D: भतीजी",
      "",
      "Q 4",
      "stem: हल करें :",
      "",
      "LEAF : ? :: TIME : EMIT",
      "A: FEAL",
      "B: FAEL",
      "C: LFAE",
      "D: FELA",
      "note: the Hindi print repeats the analogy line",
    ].join("\n");
    expect(parseHindiDraft(draft)).toEqual([
      {
        ref: "3",
        stem: "A, B की पत्नी है। D का C से क्या संबंध है?",
        options: [
          { label: "A", text: "पोती" },
          { label: "B", text: "पुत्री" },
          { label: "C", text: "बहन" },
          { label: "D", text: "भतीजी" },
        ],
      },
      {
        ref: "4",
        stem: "हल करें :\n\nLEAF : ? :: TIME : EMIT",
        options: [
          { label: "A", text: "FEAL" },
          { label: "B", text: "FAEL" },
          { label: "C", text: "LFAE" },
          { label: "D", text: "FELA" },
        ],
        note: "the Hindi print repeats the analogy line",
      },
    ]);
  });

  it("keeps LaTeX backslashes and a passage", () => {
    const [q] = parseHindiDraft(
      ["Q 51", "context: निम्नलिखित तालिका देखें।", "stem: \\(x^2 = 4\\) का मान ज्ञात करें।", "A: \\(2\\)", "B: \\(-2\\)", "C: \\(\\pm 2\\)", "D: 0"].join("\n")
    );
    expect(q.context).toBe("निम्नलिखित तालिका देखें।");
    expect(q.stem).toBe("\\(x^2 = 4\\) का मान ज्ञात करें।");
    expect(q.options?.[2]).toEqual({ label: "C", text: "\\(\\pm 2\\)" });
  });

  it("refuses text before the first block and a field given twice", () => {
    expect(() => parseHindiDraft("stem: अनाथ")).toThrow(/before the first "Q n"/);
    expect(() => parseHindiDraft("Q 1\nstem: एक\nstem: दो")).toThrow(/Q 1: stem given twice/);
  });

  it("refuses a block with no stem", () => {
    expect(() => parseHindiDraft("Q 7\nA: एक")).toThrow(/Q 7: no stem/);
  });
});

describe("skeleton helpers (no English wording leaves them)", () => {
  it("lists a stem's maths zones and nothing else", () => {
    expect(mathZones("Simplify \\((\\sqrt{3}+2)^2\\) and add \\(4\\sqrt{3}\\).")).toEqual([
      "\\((\\sqrt{3}+2)^2\\)",
      "\\(4\\sqrt{3}\\)",
    ]);
    expect(mathZones("Find the odd one out.")).toEqual([]);
  });

  it("calls an option language-neutral only when it has no letters outside maths", () => {
    expect(isLanguageNeutral("7")).toBe(true);
    expect(isLanguageNeutral("₹542.36")).toBe(true);
    expect(isLanguageNeutral("\\(2\\sqrt{3}\\)")).toBe(true);
    expect(isLanguageNeutral("1 : 2")).toBe(true);
    expect(isLanguageNeutral("Only 1")).toBe(false);
    expect(isLanguageNeutral("FEAL")).toBe(false);
  });
});

describe("relaxScriptFindings", () => {
  const latin = { ref: "4", level: "error" as const, reason: "stem is mostly Latin letters (Devanagari 33%): read the Marathi print" };
  it("keeps the error when the stem carries no Devanagari at all (an English stem copied)", () => {
    const out = relaxScriptFindings([latin], [{ ref: "4", stem: "Solve: LEAF : ? :: TIME : EMIT" }]);
    expect(out).toEqual([latin]);
  });
  it("turns it into a warning when SSC printed a Hindi instruction over English words", () => {
    const out = relaxScriptFindings([latin], [{ ref: "4", stem: "हल करें :\n\nLEAF : ? :: TIME : EMIT" }]);
    expect(out).toEqual([{ ...latin, level: "warn" }]);
  });
  it("leaves every other finding alone", () => {
    const other = { ref: "5", level: "error" as const, reason: "empty stem" };
    expect(relaxScriptFindings([other], [{ ref: "5", stem: "" }])).toEqual([other]);
  });
});
