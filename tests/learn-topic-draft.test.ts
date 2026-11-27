/**
 * The lesson-to-topic DRAFTER (scripts/lib/learnTopicDraft.ts, 2026-11-27): a first guess at
 * which bank topics each Learn lesson's mistakes are filed under, by text similarity inside one
 * chapter. Only a draft: every row is reviewed before it is committed. Its rules are the point:
 * a lesson that matches nothing well gets NO topic (a wrong row sends a student to the wrong
 * lesson), and a close second topic is offered as a second topic.
 */
import { describe, expect, it } from "vitest";
import { agreement, checkFinal, draftChapter, sourceTopics, tokens } from "../scripts/lib/learnTopicDraft";

describe("tokens", () => {
  it("keeps words and the letters inside maths, drops LaTeX commands, short words and stop words", () => {
    expect(tokens("The $\\ce{H2SO4}$ acid and the \\frac{1}{2} rate law")).toEqual(["h2so4", "acid", "rate", "law"]);
  });

  it("folds a plain plural onto its singular", () => {
    expect(tokens("Matrices vectors vector")).toEqual(["matrice", "vector", "vector"]);
  });
});

const topics = [
  { name: "Rate Law and Order of Reaction", text: "order of reaction rate law initial rates rate constant units" },
  { name: "Half-life", text: "half life first order radioactive decay time" },
  { name: "Arrhenius Equation", text: "activation energy arrhenius temperature rate constant" },
];

describe("draftChapter", () => {
  it("files a lesson under the topic its words match", () => {
    const [row] = draftChapter([{ slug: "rate-law", title: "Rate law and order", text: "rate law order experiment initial rates" }], topics);
    expect(row.chosen).toEqual(["Rate Law and Order of Reaction"]);
    expect(row.scores[0].topic).toBe("Rate Law and Order of Reaction");
  });

  it("gives a lesson that matches nothing well no topic, rather than a guess", () => {
    const [row] = draftChapter([{ slug: "lab-safety", title: "Lab safety", text: "goggles gloves fume cupboard" }], topics);
    expect(row.chosen).toEqual([]);
  });

  it("adds a second topic when it scores close to the first, and not when it is far behind", () => {
    const twins = [
      { name: "Kinetics A", text: "activation energy arrhenius temperature" },
      { name: "Kinetics B", text: "activation energy arrhenius temperature" },
      { name: "Half-life", text: "half life decay" },
    ];
    const [both] = draftChapter([{ slug: "arr", title: "Arrhenius", text: "activation energy temperature" }], twins);
    expect(both.chosen.sort()).toEqual(["Kinetics A", "Kinetics B"]);
    const [one] = draftChapter([{ slug: "rate-law", title: "Rate law and order", text: "rate law order experiment initial rates" }], topics);
    expect(one.chosen).toHaveLength(1);
  });

  it("never offers more than two topics, and with no topics offers none", () => {
    const rows = draftChapter([{ slug: "x", title: "x", text: "rate order half life arrhenius" }], topics);
    expect(rows[0].chosen.length).toBeLessThanOrEqual(2);
    expect(draftChapter([{ slug: "x", title: "x", text: "rate" }], [])[0].chosen).toEqual([]);
  });
});

describe("agreement: a draft against hand-checked rows", () => {
  it("counts lessons whose topics match exactly, overlap, differ, or were left empty", () => {
    const draft = { a: ["T1"], b: ["T1", "T2"], c: ["T3"], d: [] as string[] };
    const hand = { a: ["T1"], b: ["T2"], c: ["T4"], d: ["T5"] };
    expect(agreement(draft, hand)).toEqual({ lessons: 4, exact: 1, overlap: 1, wrong: 1, empty: 1 });
  });
});

describe("checkFinal: a reviewed file before it is committed", () => {
  const lessons = { kinetics: ["rate-law", "half-life"] };
  const topics = { kinetics: ["Rate Law", "Half-life", "Arrhenius Equation"] };

  it("passes a file that lists every lesson once with real topics (empty allowed)", () => {
    expect(checkFinal(lessons, topics, { kinetics: { "rate-law": ["Rate Law"], "half-life": [] } })).toEqual([]);
  });

  it("names a missing or extra lesson, an unknown topic, a missing chapter, and more than three topics", () => {
    const errors = checkFinal(lessons, topics, {
      kinetics: { "rate-law": ["Rate law"], "lab-safety": [], "half-life": ["Half-life", "Rate Law", "Arrhenius Equation", "Half-life"] },
      nope: {},
    });
    expect(errors.join("\n")).toMatch(/kinetics\/rate-law: no topic "Rate law"/);
    expect(errors.join("\n")).toMatch(/kinetics\/lab-safety: not a lesson/);
    expect(errors.join("\n")).toMatch(/kinetics\/half-life: 4 topics/);
    expect(errors.join("\n")).toMatch(/nope: not a chapter/);
    expect(checkFinal(lessons, topics, {}).join("\n")).toMatch(/kinetics: missing/);
    expect(checkFinal(lessons, topics, { kinetics: { "rate-law": [] } }).join("\n")).toMatch(/kinetics\/half-life: missing/);
  });
});

describe("sourceTopics: the bank topics a lesson was BUILT from (Concept Ladder's sources, 2026-11-27)", () => {
  const chapterTopics = ["Rate of Reaction and Reactant Concentration", "Integrated Rate Law", "Arrhenius Equation"];

  it("reads the topic after # in each source, keeping only topics of this chapter, in order, at most three", () => {
    expect(
      sourceTopics(
        ["mh-sb-12/kinetics-12-chem#Integrated Rate Law", "mh-sb-12/kinetics-12-chem#Rate of Reaction and Reactant Concentration", "mh-sb-12/kinetics-12-chem#Integrated Rate Law"],
        chapterTopics,
      ),
    ).toEqual(["Integrated Rate Law", "Rate of Reaction and Reactant Concentration"]);
  });

  it("ignores a source with no topic, a notes slug, or a topic of another chapter", () => {
    expect(sourceTopics(["cetcn-powers-of-i", "mh-sb-12/kinetics-12-chem", "mh-sb-12/solutions-12-chem#Raoult's Law"], chapterTopics)).toEqual([]);
  });
});
