import { describe, expect, it } from "vitest";
import {
  buildRows,
  keyFit,
  questionIssues,
  derivedKey,
  resolveContextRefs,
  type MainsQuestion,
} from "../scripts/mpsc-mains/lib";

const mr = (n: number, extra: Partial<MainsQuestion> = {}): MainsQuestion => ({
  n,
  subject: "Marathi",
  chapter: "प्रयोग (Voice)",
  subtopic: "प्रयोग ओळखणे",
  difficulty: "EASY",
  lang: "mr",
  stem: "'सर्वांना समज दिली जाईल' या वाक्याचा प्रयोग ओळखा.",
  options: ["शक्यकर्मणी", "कर्मकर्तरी", "पुरुषकर्मणी", "भावकर्तरी"],
  mine: "A",
  ...extra,
});

const en = (n: number, extra: Partial<MainsQuestion> = {}): MainsQuestion => ({
  n,
  subject: "English",
  chapter: "Idioms and Phrases",
  subtopic: "Idioms",
  difficulty: "EASY",
  lang: "en",
  stem: "Choose the correct expression out of the alternatives :",
  options: ["Bury the hatchet", "Bury the hatch", "Bury under the hatchet", "Bury over the hatch"],
  mine: "A",
  ...extra,
});

describe("questionIssues", () => {
  it("passes a well-formed question in either language", () => {
    expect(questionIssues(mr(1))).toEqual([]);
    expect(questionIssues(en(2))).toEqual([]);
  });

  it("refuses a declared language that is not the stem's script", () => {
    // The tag becomes the row's canonical language; a Marathi stem tagged en
    // would be filed and read as English.
    expect(questionIssues(mr(1, { lang: "en" }))).toEqual(["Q1: lang en but the stem reads mr"]);
  });

  it("refuses a chapter outside the subject's fixed list", () => {
    // Chapters auto-create in the DB, so a typo would fork the taxonomy of
    // five exams at once. The list is closed here instead.
    expect(questionIssues(en(3, { chapter: "Idioms & Phrase" }))).toEqual([
      'Q3: chapter "Idioms & Phrase" is not one of the English chapters',
    ]);
  });

  it("refuses a question without exactly four non-empty options", () => {
    expect(questionIssues(en(4, { options: ["a", "b", "c"] }))).toEqual(["Q4: 3 options, expected 4"]);
    expect(questionIssues(en(5, { options: ["a", "", "c", "d"] }))).toEqual(["Q5: option B is empty"]);
  });

  it("requires an English canonical row when a translation is carried", () => {
    const q = en(6, { translation: { stem: "पर्याय निवडा", options: ["अ", "ब", "क", "ड"] } });
    expect(questionIssues(q)).toEqual([]);
    expect(questionIssues({ ...mr(7), translation: q.translation })).toEqual([
      "Q7: a translation needs an English canonical row",
    ]);
  });
});

describe("keyFit", () => {
  it("measures agreement between my answers and the key, skipping cancelled and unanswered", () => {
    const qs = [en(1, { mine: "A" }), en(2, { mine: "B" }), en(3, { mine: "C" }), en(4, { mine: undefined }), en(5)];
    const fit = keyFit(qs, { 1: "A", 2: "B", 3: "D", 4: "A", 5: "#" });
    expect(fit).toEqual({ compared: 3, agree: 2, disagreements: [3] });
  });
});

describe("derivedKey", () => {
  it("builds a key from my answers and refuses a gap", () => {
    expect(derivedKey([en(1, { mine: "B" }), mr(2, { mine: "D" })])).toEqual({ key: { 1: "B", 2: "D" }, missing: [] });
    expect(derivedKey([en(1, { mine: undefined })]).missing).toEqual([1]);
  });
});

describe("buildRows", () => {
  it("writes the canonical text in its own language and keys it", () => {
    const { rows, errors } = buildRows([mr(1), en(2)], { 1: "C", 2: "A" }, "note");
    expect(errors).toEqual([]);
    expect(rows.map((r) => [r.question.split(" ")[0], r.answer])).toEqual([
      ["'सर्वांना", "C"],
      ["Choose", "A"],
    ]);
  });

  it("keeps a cancelled question with its notice and no key", () => {
    const { rows } = buildRows([en(1)], { 1: "#" }, "Cancelled by MPSC.");
    expect(rows[0]).toMatchObject({ answer: "CANCELLED", cancelledNote: "Cancelled by MPSC." });
  });

  it("reports a question the key does not cover", () => {
    expect(buildRows([en(9)], {}, "n").errors).toEqual(["Q9: no key entry"]);
  });
});

describe("resolveContextRefs", () => {
  it("copies a passage from the question it points at", () => {
    const qs = [en(26, { context: "The passage." }), en(27, { context: "@26" }), en(28)];
    const { questions, errors } = resolveContextRefs(qs);
    expect(errors).toEqual([]);
    expect(questions.map((q) => q.context)).toEqual(["The passage.", "The passage.", undefined]);
  });

  it("reports a reference to a question with no passage", () => {
    expect(resolveContextRefs([en(1), en(2, { context: "@1" })]).errors).toEqual([
      "Q2: context @1 points at a question with no passage",
    ]);
  });
});

describe("dropped papers", () => {
  it("records the four papers set aside, each with a reason", async () => {
    const { PAPERS } = await import("../scripts/mpsc-mains/config");
    const dropped = PAPERS.filter((p) => p.dropped).map((p) => p.id).sort();
    expect(dropped).toEqual(["aso-2011", "psi-2012", "psi-2014", "sti-2012"]);
    for (const p of PAPERS.filter((x) => x.dropped)) expect(p.dropped!.length).toBeGreaterThan(10);
  });

  it("requirePaper refuses a dropped paper, so merge/commit cannot ingest it", async () => {
    const { requirePaper } = await import("../scripts/mpsc-mains/config");
    expect(() => requirePaper("psi-2012")).toThrow(/dropped/);
    expect(requirePaper("psi-2011").id).toBe("psi-2011");
  });
});
