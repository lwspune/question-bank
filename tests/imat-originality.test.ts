/**
 * IMAT originality check: our own questions must not be copies or close
 * rewrites of past papers. 2011-2022 belong to Cambridge and stay private, so
 * anything we publish is written from scratch; this is the machine check that
 * holds the line, instead of a sentence in a brief.
 *
 * The fixtures are invented (no real paper text): each one isolates one way a
 * rewrite can still be a copy, and the last two pin what must NOT be flagged.
 */
import { describe, it, expect } from "vitest";
import {
  buildOriginalityIndex,
  checkOriginality,
  notesCandidates,
  tokens,
  unreviewed,
  wordingKey,
} from "@/lib/sites/imat/originality";

const SOURCES = [
  {
    id: "2015 Q4",
    text:
      "A cyclist rides from Farley to Brookton at a steady 18 km per hour, rests for 25 minutes at the bridge, " +
      "then returns along the canal path at 12 km per hour. The whole trip takes 4 hours 35 minutes. " +
      "How far is Brookton from Farley by road?",
    options: ["27 km", "30 km", "33 km", "36 km", "39 km"],
  },
  {
    id: "2017 Q30",
    text:
      "Which of the following statements about the enzyme lactase in the small intestine is/are correct? " +
      "1 It hydrolyses a disaccharide. 2 It is denatured at body temperature. 3 It is secreted by the liver.",
    options: ["1 only", "2 only", "1 and 2 only", "1 and 3 only", "2 and 3 only"],
  },
  {
    id: "2018 Q31",
    text:
      "Which of the following statements about mitochondria is/are correct? " +
      "1 They contain circular DNA. 2 They are absent from red blood cells in mammals. 3 They make glucose.",
    options: ["1 only", "2 only", "1 and 2 only", "1 and 3 only", "2 and 3 only"],
  },
  {
    id: "2019 Q32",
    text:
      "Which of the following statements about ribosomes is/are correct? " +
      "1 They are made of RNA and protein. 2 They are found in prokaryotes. 3 They have a double membrane.",
    options: ["1 only", "2 only", "1 and 2 only", "1 and 3 only", "2 and 3 only"],
  },
  {
    id: "2020 Q45",
    text: "A sample of 3.6 g of water is electrolysed completely. What volume of hydrogen gas is produced at 273 K and 101 kPa?",
    options: ["2.24 dm3", "4.48 dm3", "0.448 dm3", "8.96 dm3", "1.12 dm3"],
  },
  {
    id: "2012 Q19",
    text:
      "Farmers say hedgerows protect birds, so councils should pay to plant more of them. " +
      "Which one of the following, if true, most weakens the argument above?",
  },
  {
    id: "2013 Q20",
    text:
      "Cycle lanes cut accidents in Leiden, so every Dutch town should build them. " +
      "Which one of the following, if true, most weakens the argument above?",
  },
  {
    id: "2014 Q18",
    text: "Libraries lend e-books, so printed books will disappear. Which of these, if true, would most weaken the argument above?",
  },
  {
    id: "2012 Q35",
    text: "A student starts with 120 euros and lends out 45 euros, then 25 euros, then 18 euros. How much is left?",
  },
  {
    id: "2021 Q12",
    text:
      "Trains leave Ostend at 15, 35 and 55 minutes past each hour and take 40 minutes to reach Ghent. " +
      "The last one leaves at 22:55, the first at 06:15, and a ticket costs 17 euros or 29 euros return.",
    options: ["16", "20", "24", "28", "32"],
  },
];

const INDEX = buildOriginalityIndex(SOURCES);
const kinds = (c: { id: string; text: string; options?: string[] }) =>
  checkOriginality(INDEX, c).map((f) => `${f.kind}:${f.sourceId}`);

describe("tokens", () => {
  it("drops LaTeX commands but keeps their arguments, and normalises numbers", () => {
    expect(tokens("\\(\\frac{0.30}{2}\\) mol \\text{dm}^{3}")).toEqual(["0.3", "2", "mol", "dm", "3"]);
  });
});

describe("checkOriginality flags copies", () => {
  it("a verbatim stem", () => {
    expect(kinds({ id: "c", text: SOURCES[0].text })).toContain("shared-run:2015 Q4");
  });

  it("the same puzzle with the names changed (a rewrite, not a new question)", () => {
    const text =
      "A runner jogs from Ashby to Kelton at a steady 18 km per hour, rests for 25 minutes at the gate, " +
      "then returns along the river path at 12 km per hour. The whole trip takes 4 hours 35 minutes. " +
      "How far is Kelton from Ashby by road?";
    expect(kinds({ id: "c", text })).toContain("word-overlap:2015 Q4");
  });

  it("the same numbers in reworded prose", () => {
    const text =
      "Starting at 18 km/h and coming back at 12 km/h with a 25-minute stop, a trip lasts 4 h 35 min in total. Find the one-way distance.";
    expect(kinds({ id: "c", text })).toContain("same-numbers:2015 Q4");
  });

  it("a new stem keeping the source's own answer options", () => {
    const text = "Electrolysis of a small water sample gives hydrogen. How much hydrogen forms under standard conditions?";
    expect(kinds({ id: "c", text, options: ["2.24 dm3", "4.48 dm3", "0.448 dm3", "8.96 dm3", "1.12 dm3"] })).toContain(
      "same-options:2020 Q45"
    );
  });
});

describe("checkOriginality leaves originals alone", () => {
  it("the exam's own boilerplate is not a copy (stem frame and statement-style options)", () => {
    const text =
      "Which of the following statements about chloroplasts is/are correct? " +
      "1 They contain chlorophyll in the thylakoids. 2 They occur in root hair cells. 3 They store starch grains.";
    expect(kinds({ id: "c", text, options: ["1 only", "2 only", "1 and 2 only", "1 and 3 only", "2 and 3 only"] })).toEqual([]);
  });

  it("a question frame used in only two papers is not a copy", () => {
    const text =
      "Night buses reduce drink-driving, so the city should run them all week. " +
      "Which one of the following, if true, most weakens the argument above?";
    expect(kinds({ id: "c", text })).toEqual([]);
  });

  it("bare numbers or single words as options are not a copy, even when three match", () => {
    const text = "A tank is filled at a steady rate. After how many minutes is it a third full?";
    expect(kinds({ id: "c", text, options: ["16", "20", "24", "28", "32"] })).toEqual([]);
  });

  it("a few numbers in common with a number-heavy past question are not a copy", () => {
    // 15, 35 and 40 are 3 of the timetable's 7 numbers: a coincidence, not a reused calculation.
    const text = "A bus leaves at 15 past and arrives 35 minutes later; a second bus takes 40 minutes. Which arrives first?";
    expect(kinds({ id: "c", text })).toEqual([]);
  });

  it("three numbers in common are coincidence, even with a short past question", () => {
    // 25, 120 and 45 are all of the loan question's numbers but one: still not a reused calculation.
    const text = "A child pulls a 25 kg sledge with a horizontal force of 120 N against 45 N of friction. Find its acceleration.";
    expect(kinds({ id: "c", text })).toEqual([]);
  });

  it("an original question on the same topic", () => {
    const text =
      "A ferry crosses a lake at 15 km per hour and comes back against the wind at 10 km per hour. " +
      "The round trip takes 2 hours 30 minutes. How wide is the lake?";
    expect(kinds({ id: "c", text, options: ["12 km", "15 km", "18 km", "20 km", "25 km"] })).toEqual([]);
  });
});

describe("notesCandidates", () => {
  it("collects every question a chapter asks: worked example, self-check with options, practice reps", () => {
    const notes = {
      "imat-gas-laws": {
        concepts: [
          {
            slug: "imat-boyle",
            authoredExample: { prompt: "Worked prompt", steps: ["s"], answer: "a" },
            selfCheckExample: { prompt: "Self-check prompt", steps: ["s"], answer: "(B) 2", options: ["1", "2", "3", "4", "5"] },
            practiceSet: [{ prompt: "Rep one", answer: "x" }, { prompt: "Rep two", answer: "y" }],
          },
          { slug: "imat-table-only", table: { columns: [], rows: [] } },
        ],
      },
    };
    expect(notesCandidates("gases", notes as never)).toEqual([
      { id: "gases/imat-gas-laws#imat-boyle worked example", text: "Worked prompt", options: undefined },
      { id: "gases/imat-gas-laws#imat-boyle self-check", text: "Self-check prompt", options: ["1", "2", "3", "4", "5"] },
      { id: "gases/imat-gas-laws#imat-boyle practice 1", text: "Rep one" },
      { id: "gases/imat-gas-laws#imat-boyle practice 2", text: "Rep two" },
    ]);
  });
});

describe("unreviewed", () => {
  const cand = { id: "gases/p#k self-check", text: "Which of these elements has the highest first ionisation energy?", options: ["C", "N"] };
  const finding = { kind: "shared-run" as const, candidateId: cand.id, sourceId: "2023 Q43", detail: "" };
  const review = { candidate: cand.id, source: "2023 Q43", wording: wordingKey(cand), reason: "the plain way to ask" };

  it("drops a finding a person has reviewed for this exact wording", () => {
    expect(unreviewed([finding], [cand], [review])).toEqual([]);
  });

  it("keeps it once the wording changes, so an edit is looked at again", () => {
    const edited = { ...cand, options: ["C", "O"] };
    expect(unreviewed([finding], [edited], [review])).toEqual([finding]);
  });

  it("keeps a finding against a different past question", () => {
    expect(unreviewed([{ ...finding, sourceId: "2019 Q40" }], [cand], [review])).toHaveLength(1);
  });
});
