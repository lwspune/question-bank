import { describe, it, expect } from "vitest";
import {
  hindiBandDisagreements,
  hindiStructureIssues,
  hindiParityIssues,
  printNoteSolution,
  solverVoice,
  type RasQuestion,
} from "../scripts/ras/lib";

const q = (over: Partial<RasQuestion> = {}): RasQuestion => ({
  number: 7,
  stem: "In the year 2021-22, the contribution of Rajasthan in total production of Bajra was",
  options: [
    { label: "A", text: "46.30" },
    { label: "B", text: "87.69" },
    { label: "C", text: "38.98" },
    { label: "D", text: "34.69" },
  ],
  subject: "Rajasthan Geography",
  chapter: "Agriculture and Animal Husbandry",
  difficulty: "MODERATE",
  hi: {
    stem: "वर्ष 2021-22 में, देश के कुल बाजरा उत्पादन में राजस्थान का योगदान था",
    options: ["46.30", "87.69", "38.98", "34.69"],
  },
  ...over,
});

describe("hindiStructureIssues", () => {
  it("passes a well-formed bilingual item", () => {
    expect(hindiStructureIssues(q())).toEqual([]);
  });

  it("fails an item with no Hindi version", () => {
    expect(hindiStructureIssues(q({ hi: undefined }))).toEqual(["Q7: no Hindi version (hi)"]);
  });

  it("fails a Hindi option count other than 4, and a blank Hindi option", () => {
    expect(hindiStructureIssues(q({ hi: { stem: "राजस्थान", options: ["1", "2", "3"] } }))).toContain(
      "Q7: hi has 3 options, expected 4"
    );
    expect(hindiStructureIssues(q({ hi: { stem: "राजस्थान", options: ["1", " ", "3", "4"] } }))).toContain(
      "Q7: hi option B is blank"
    );
  });

  it("fails a Hindi stem with no Devanagari at all (English pasted into hi)", () => {
    const issues = hindiStructureIssues(q({ hi: { stem: "Which district is the largest?", options: ["a", "b", "c", "d"] } }));
    expect(issues).toContain("Q7: hi stem carries no Devanagari");
  });

  it("allows a Devanagari-free Hindi stem when the English stem has no words either (a bare figure/number item)", () => {
    const bare = q({ stem: "\\(2 + 3 = ?\\)", hi: { stem: "\\(2 + 3 = ?\\)", options: ["1", "2", "3", "5"] } });
    expect(hindiStructureIssues(bare)).toEqual([]);
  });

  it("fails unbalanced maths and a pipe table without its separator, in Hindi", () => {
    const issues = hindiStructureIssues(
      q({ hi: { stem: "मान \\(x^2 बताइए\n\n| सूची-I | सूची-II |\n| A. उदयपुर | i. साबी |", options: ["1", "2", "3", "4"] } })
    );
    expect(issues.some((i) => i.includes("unbalanced"))).toBe(true);
    expect(issues.some((i) => i.includes("separator"))).toBe(true);
  });

  it("fails a context present in one language only", () => {
    expect(hindiStructureIssues(q({ context: "| a | b |\n|---|---|\n| 1 | 2 |" }))).toContain(
      "Q7: context present in English only"
    );
  });
});

describe("hindiParityIssues", () => {
  it("is empty when every number agrees", () => {
    expect(hindiParityIssues(q())).toEqual([]);
  });

  it("names an option whose numbers differ (a misread digit in either language)", () => {
    const issues = hindiParityIssues(q({ hi: { stem: q().hi!.stem, options: ["46.30", "87.96", "38.98", "34.69"] } }));
    expect(issues).toEqual(["Q7: option B numbers differ: en 87.69 hi 87.96"]);
  });

  it("names a stem whose numbers differ", () => {
    const issues = hindiParityIssues(q({ hi: { stem: "वर्ष 2020-22 में", options: q().hi!.options } }));
    expect(issues[0]).toMatch(/^Q7: stem numbers differ/);
  });
});

describe("hindiBandDisagreements", () => {
  const band = (name: string, qs: RasQuestion[]) => ({ band: name, questions: qs });

  it("is empty when an item in two bands has the same Hindi (whitespace aside)", () => {
    const a = q();
    const b = q({ hi: { stem: `${q().hi!.stem}  `, options: q().hi!.options } });
    expect(hindiBandDisagreements([band("b1", [a]), band("b2", [b])])).toEqual([]);
  });

  it("names an item whose Hindi two bands read differently, even when the English agrees", () => {
    const b = q({ hi: { stem: "वर्ष 2021-22 में राजस्थान", options: q().hi!.options } });
    expect(hindiBandDisagreements([band("b1", [q()]), band("b2", [b])])).toEqual([
      "Q7: bands b1 and b2 read the Hindi differently. Resolve against the page.",
    ]);
  });
});

describe("solverVoice", () => {
  it("passes a teacher's explanation", () => {
    expect(solverVoice("Article 94 says the Speaker stays in office until the new House meets. A and B are wrong.")).toEqual([]);
  });

  it("names the solver-notes phrases a student must never read", () => {
    expect(solverVoice("Jaipur hosted it. Runner-up: B (New Delhi).")).toEqual(["runner-up"]);
    expect(solverVoice("My recollection is a tally of 16 gold.")).toEqual(["first person"]);
    expect(solverVoice("I associate Sudhalkar with Marwar.")).toEqual(["first person"]);
    expect(solverVoice("Recall points to Aandhi.")).toEqual(["recall"]);
    expect(solverVoice("The policy is understood to run to 2029.")).toEqual(["hedge"]);
    expect(solverVoice("B is a guess; the deriver cannot recall it.")).toEqual(["guess", "deriver", "recall"]);
    expect(solverVoice("Bundi and Alwar are not recalled as having such laws.")).toEqual(["recall"]);
    expect(solverVoice("This is a current affairs recall;")).toEqual(["recall"]);
    expect(solverVoice("The split rests on recall of the list, which is uncertain.")).toEqual(["recall", "hedge"]);
    expect(solverVoice("So the figure in B appears wrong.")).toEqual(["hedge"]);
    expect(solverVoice("It turns on a notified date that cannot be derived.")).toEqual(["hedge"]);
  });

  it("does not trip on ordinary words that contain the patterns", () => {
    expect(solverVoice("India ranked 126th; Iran and Iraq are in West Asia. A recalled ambassador.")).toEqual([]);
    expect(solverVoice("Statement I is correct and statement II is not, so only I and III hold.")).toEqual([]);
  });
});

describe("printNoteSolution", () => {
  it("says the two printed versions differ, in English and Hindi", () => {
    const r = printNoteSolution("The Hindi version says 'Sikar' where the English says 'Jhunjhunu'.");
    expect(r!.en).toMatch(/^\*\*Note on the printed paper:\*\* the Hindi and English versions/);
    expect(r!.en).toContain("Jhunjhunu");
    expect(r!.hi).toMatch(/हिन्दी/);
  });

  it("is null without a note", () => {
    expect(printNoteSolution(undefined)).toBeNull();
  });
});
