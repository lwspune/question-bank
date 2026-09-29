/**
 * The quotable header on /questions/<exam>/<subject>/<chapter>.
 *
 * WHY THIS EXISTS. The landing page used to state ONE fact a reader (or an AI
 * search engine) could lift: the question count. Years covered, how many
 * papers, the difficulty split and the most-asked subtopics were all in the
 * bank and none of them on the page. These helpers turn the per-chapter
 * profile (migration 0126) into the sentences the page prints and the meta
 * description carries, so the two cannot disagree.
 *
 * Every sentence degrades to something TRUE when a field is missing: a
 * practice-only chapter has no papers or years, a chapter whose profile
 * lookup failed keeps the plain count sentence, and a zero never prints.
 */
import { describe, it, expect } from "vitest";
import {
  landingLead,
  difficultyLine,
  subtopicsLine,
  updatedLine,
  type ChapterProfile,
} from "../src/lib/questions/landingSummary";

const profile: ChapterProfile = {
  minYear: 2017,
  maxYear: 2026,
  sittings: 19,
  easy: 61,
  moderate: 84,
  hard: 31,
};

const base = {
  questionCount: 176,
  examName: "NDA",
  subjectName: "Mathematics",
  practiceOnly: false,
};

describe("landingLead", () => {
  it("states count, papers and the year range for a pyq chapter", () => {
    expect(landingLead({ ...base, profile })).toBe(
      "176 NDA Mathematics past-year questions from 19 papers, 2017 to 2026, with answers and worked solutions."
    );
  });

  it("collapses a single year", () => {
    expect(
      landingLead({ ...base, profile: { ...profile, minYear: 2026, maxYear: 2026, sittings: 2 } })
    ).toBe(
      "176 NDA Mathematics past-year questions from 2 papers in 2026, with answers and worked solutions."
    );
  });

  it("drops the paper count when there is only one, or none", () => {
    expect(landingLead({ ...base, profile: { ...profile, sittings: 1 } })).toBe(
      "176 NDA Mathematics past-year questions, 2017 to 2026, with answers and worked solutions."
    );
    expect(landingLead({ ...base, profile: { ...profile, sittings: 0 } })).toBe(
      "176 NDA Mathematics past-year questions, 2017 to 2026, with answers and worked solutions."
    );
  });

  it("falls back to the plain sentence when the profile is missing or has no years", () => {
    expect(landingLead({ ...base, profile: null })).toBe(
      "176 NDA Mathematics past-year questions with answers and worked solutions."
    );
    expect(
      landingLead({ ...base, profile: { ...profile, minYear: null, maxYear: null } })
    ).toBe("176 NDA Mathematics past-year questions with answers and worked solutions.");
  });

  it("never claims papers or years for a practice-only chapter", () => {
    expect(
      landingLead({
        ...base,
        examName: "CBSE Class 10",
        practiceOnly: true,
        profile: { ...profile, minYear: 2020, maxYear: 2020, sittings: 3 },
      })
    ).toBe(
      "176 CBSE Class 10 Mathematics practice questions with answers and worked solutions."
    );
  });

  it("formats large counts with Indian grouping", () => {
    expect(landingLead({ ...base, questionCount: 1234, profile })).toMatch(/^1,234 /);
  });
});

describe("difficultyLine", () => {
  it("prints the three-way split", () => {
    expect(difficultyLine(profile)).toBe("Difficulty: 61 easy · 84 moderate · 31 hard.");
  });

  it("omits a zero bucket rather than printing '0 hard'", () => {
    expect(difficultyLine({ ...profile, hard: 0 })).toBe("Difficulty: 61 easy · 84 moderate.");
  });

  it("is null when there is nothing to say", () => {
    expect(difficultyLine(null)).toBeNull();
    expect(difficultyLine({ ...profile, easy: 0, moderate: 0, hard: 0 })).toBeNull();
  });

  it("is null for a single populated bucket — an ungraded corpus has no split", () => {
    // JEE Mains Matrices on prod: 115 of 115 rows MODERATE. "Difficulty: 115
    // moderate" would read as a finding about the exam rather than about us.
    expect(difficultyLine({ ...profile, easy: 0, moderate: 115, hard: 0 })).toBeNull();
  });
});

describe("subtopicsLine", () => {
  const subs = [
    { name: "Conditional Probability", count: 48 },
    { name: "Bayes' Theorem", count: 31 },
    { name: "Binomial Distribution", count: 27 },
    { name: "Odds", count: 4 },
  ];

  it("names the top three by count, largest first", () => {
    expect(subtopicsLine(subs)).toBe(
      "Most-asked subtopics: Conditional Probability (48), Bayes' Theorem (31), Binomial Distribution (27)."
    );
  });

  it("sorts an unsorted input and honours the limit", () => {
    expect(subtopicsLine([...subs].reverse(), 2)).toBe(
      "Most-asked subtopics: Conditional Probability (48), Bayes' Theorem (31)."
    );
  });

  it("drops zero-count subtopics and is null when none remain", () => {
    expect(subtopicsLine([{ name: "Empty", count: 0 }])).toBeNull();
    expect(subtopicsLine([])).toBeNull();
  });

  it("says 'subtopic', singular, for one", () => {
    expect(subtopicsLine([subs[0]])).toBe("Most-asked subtopic: Conditional Probability (48).");
  });
});

describe("updatedLine", () => {
  it("prints the newest-question date in IST, long form", () => {
    // 2026-09-14T20:30:00Z is 02:00 IST on the 15th — the IST date is the one
    // a reader in India would expect.
    expect(updatedLine("2026-09-14T20:30:00Z")).toBe("Updated 15 September 2026.");
  });

  it("is null for a missing or unparseable date", () => {
    expect(updatedLine(null)).toBeNull();
    expect(updatedLine("not a date")).toBeNull();
  });
});
