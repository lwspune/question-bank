/**
 * The pass offer on board past papers and homework names what THIS student is
 * missing (2026-10-14): "All 7 Physics past papers, 2023 to 2026" instead of
 * the generic perk list. Every recent sale came from these two boxes (8-14 Oct:
 * board papers 12 free -> 2 paid, homework 3 -> 1, /browse 61 -> 0), and the
 * need there repeats: next year's paper, tomorrow's homework.
 */
import { describe, it, expect } from "vitest";
import {
  alsoIncludedPerks,
  homeworkOfferFacts,
  homeworkOfferLead,
  paperOfferFacts,
  paperOfferLead,
} from "@/lib/billing/passOfferLead";

describe("paperOfferLead", () => {
  const physics = {
    subject: "Physics",
    papers: 7,
    fromYear: 2023,
    toYear: 2026,
    otherSubjects: ["Biology", "Chemistry", "Geography", "Mathematics"],
  };

  it("names the subject's paper count, its years and the exam's other subjects", () => {
    expect(paperOfferLead(physics)).toEqual({
      title: "Download all 7 Physics papers",
      lead: "All 7 Physics past papers, 2023 to 2026",
      body: "Each with its answer key, as PDF. Plus the past papers for Biology, Chemistry, Geography and Mathematics.",
    });
  });

  it("gives one year when every paper is from the same year", () => {
    expect(paperOfferLead({ ...physics, fromYear: 2026 })?.lead).toBe("All 7 Physics past papers, 2026");
  });

  it("joins one or two other subjects in plain English", () => {
    expect(paperOfferLead({ ...physics, otherSubjects: ["Chemistry"] })?.body).toBe(
      "Each with its answer key, as PDF. Plus the past papers for Chemistry."
    );
    expect(paperOfferLead({ ...physics, otherSubjects: ["Chemistry", "Biology"] })?.body).toBe(
      "Each with its answer key, as PDF. Plus the past papers for Chemistry and Biology."
    );
  });

  it("counts the other subjects instead of listing more than four", () => {
    const six = ["A", "B", "C", "D", "E", "F"];
    expect(paperOfferLead({ ...physics, otherSubjects: six })?.body).toBe(
      "Each with its answer key, as PDF. Plus the past papers for 6 other subjects."
    );
  });

  it("drops the other-subjects sentence when there are none", () => {
    expect(paperOfferLead({ ...physics, otherSubjects: [] })?.body).toBe("Each with its answer key, as PDF.");
  });

  // "All 1 paper" sells nothing: the generic offer stays.
  it("is null below two papers", () => {
    expect(paperOfferLead({ ...physics, papers: 1 })).toBeNull();
  });
});

describe("paperOfferFacts", () => {
  const row = (examId: string, subjectId: string, subjectName: string, year: number) => ({
    examId,
    subjectId,
    subjectName,
    year,
  });
  const listings = [
    row("hsc", "phy", "Physics", 2026),
    row("hsc", "phy", "Physics", 2023),
    row("hsc", "phy", "Physics", 2025),
    row("hsc", "chem", "Chemistry", 2026),
    row("hsc", "chem", "Chemistry", 2025),
    row("hsc", "bio", "Biology", 2024),
    row("cbse", "phy2", "Physics", 2026),
  ];

  it("counts this exam's papers in the subject (each set is a paper) and its year span", () => {
    const f = paperOfferFacts(listings, "hsc", "phy");
    expect(f).toMatchObject({ subject: "Physics", papers: 3, fromYear: 2023, toYear: 2026 });
  });

  it("lists the same exam's other subjects once each, alphabetically, never another exam's", () => {
    expect(paperOfferFacts(listings, "hsc", "phy")?.otherSubjects).toEqual(["Biology", "Chemistry"]);
  });

  it("is null when the subject has no listed paper", () => {
    expect(paperOfferFacts(listings, "hsc", "geo")).toBeNull();
  });
});

describe("homeworkOfferLead", () => {
  const maths = { subject: "Mathematics", days: 81, perDay: 5, otherSubjects: ["Biology", "Chemistry", "Physics"] };

  it("names the plan's days, its daily size and the exam's other plans", () => {
    expect(homeworkOfferLead(maths)).toEqual({
      title: "Download all 81 days of homework",
      lead: "All 81 days of Mathematics homework",
      body: "5 past board questions a day. Plus the plans for Biology, Chemistry and Physics.",
    });
  });

  it("is singular for one question a day", () => {
    expect(homeworkOfferLead({ ...maths, perDay: 1, otherSubjects: [] })?.body).toBe(
      "1 past board question a day."
    );
  });

  it("counts the other plans instead of listing more than four", () => {
    expect(homeworkOfferLead({ ...maths, otherSubjects: ["A", "B", "C", "D", "E"] })?.body).toBe(
      "5 past board questions a day. Plus the plans for 5 other subjects."
    );
  });

  it("is null below two days", () => {
    expect(homeworkOfferLead({ ...maths, days: 1 })).toBeNull();
  });
});

describe("homeworkOfferFacts", () => {
  const plan = { slug: "mh-hsc-12-maths", examName: "MH HSC 12", subjectName: "Mathematics", days: 81, perDay: 5 };
  const plans = [
    { slug: "mh-hsc-12-maths", examName: "MH HSC 12", subjectName: "Mathematics" },
    { slug: "mh-hsc-12-physics", examName: "MH HSC 12", subjectName: "Physics" },
    { slug: "mh-hsc-12-biology", examName: "MH HSC 12", subjectName: "Biology" },
    { slug: "cbse-12-physics", examName: "CBSE 12", subjectName: "Physics" },
  ];

  it("takes the plan's own size and the same exam's other plans, alphabetically", () => {
    expect(homeworkOfferFacts(plan, plans)).toEqual({
      subject: "Mathematics",
      days: 81,
      perDay: 5,
      otherSubjects: ["Biology", "Physics"],
    });
  });
});

describe("alsoIncludedPerks", () => {
  const perks = [
    "Unlimited answers in the question bank (free: 30 a day)",
    "All chapter tests and full mock tests (free: 5 and 3)",
    "Your projected score (free: 7 days)",
    "Unlimited saved questions",
    "PDF downloads: question papers with answer keys, whole past papers and chapter formula sheets",
  ];

  // The lead above them already says what downloading gets you, and the
  // "(free: ...)" counts are /pricing's job: here they only make the box longer.
  it("drops the download perk and the free-allowance brackets, keeping the order", () => {
    expect(alsoIncludedPerks(perks)).toEqual([
      "Unlimited answers in the question bank",
      "All chapter tests and full mock tests",
      "Your projected score",
      "Unlimited saved questions",
    ]);
  });
});
