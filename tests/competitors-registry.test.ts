import { describe, it, expect } from "vitest";
import {
  ideaScore,
  rankIdeas,
  validateAudience,
  type Audience,
  type Idea,
} from "@/lib/competitors/model";
import { AUDIENCES } from "@/lib/competitors";

/**
 * The competitor analysis (2026-10-15): competitors, a feature checklist,
 * where we stand on each feature and a ranked shortlist, written as data and
 * read by /dashboard/competitors. These rules keep the data honest: a "yes"
 * about a competitor needs a link, a "have" about us needs a route, and the
 * shortlist order comes from the score, never from typing.
 */

const idea = (over: Partial<Idea> = {}): Idea => ({
  id: "i",
  title: "An idea",
  featureIds: ["f"],
  demand: 3,
  fit: 3,
  cost: 3,
  why: "Because.",
  demandEvidence: ["Seen somewhere."],
  next: "Plan it.",
  status: "proposed",
  ...over,
});

const base = (): Audience => ({
  id: "a",
  name: "An audience",
  exams: ["mht-cet"],
  whyPicked: "Most signups.",
  checkedOn: "2026-10-15",
  competitors: [
    {
      id: "c1",
      name: "Rival",
      url: "https://rival.example",
      kind: "app",
      price: "Free",
      summary: "A rival.",
    },
  ],
  features: [
    {
      id: "f",
      group: "practice",
      name: "A feature",
      ours: "have",
      oursWhere: "/browse",
      marks: { c1: { mark: "yes", evidence: "https://rival.example/f" } },
    },
  ],
  ideas: [idea()],
  decidedAgainst: [],
  takeaways: ["Something learned."],
  toCheckByHand: [],
});

describe("ideaScore / rankIdeas", () => {
  it("is demand x fit / cost", () => {
    expect(ideaScore(idea({ demand: 4, fit: 5, cost: 2 }))).toBe(10);
    expect(ideaScore(idea({ demand: 3, fit: 1, cost: 5 }))).toBeCloseTo(0.6);
  });

  it("ranks highest score first, ties by id, without mutating the input", () => {
    const ideas = [
      idea({ id: "b", demand: 2, fit: 2, cost: 2 }),
      idea({ id: "c", demand: 5, fit: 5, cost: 1 }),
      idea({ id: "a", demand: 2, fit: 2, cost: 2 }),
    ];
    expect(rankIdeas(ideas).map((i) => i.id)).toEqual(["c", "a", "b"]);
    expect(ideas.map((i) => i.id)).toEqual(["b", "c", "a"]);
  });

  it("puts declined and shipped ideas after the open ones", () => {
    const ideas = [
      idea({ id: "done", demand: 5, fit: 5, cost: 1, status: "shipped" }),
      idea({ id: "open", demand: 1, fit: 1, cost: 5 }),
    ];
    expect(rankIdeas(ideas).map((i) => i.id)).toEqual(["open", "done"]);
  });
});

describe("validateAudience", () => {
  it("passes a well-formed audience", () => {
    expect(validateAudience(base())).toEqual([]);
  });

  it("needs a link for every yes or partial about a competitor", () => {
    const a = base();
    a.features[0].marks.c1 = { mark: "partial" };
    expect(validateAudience(a).join("\n")).toMatch(/f.*c1.*link/);
  });

  it("needs a mark for every competitor on every feature (unknown is allowed)", () => {
    const a = base();
    a.features[0].marks = {};
    expect(validateAudience(a).join("\n")).toMatch(/f.*c1/);
    a.features[0].marks = { c1: { mark: "unknown" } };
    expect(validateAudience(a)).toEqual([]);
  });

  it("rejects a mark for a competitor that is not listed", () => {
    const a = base();
    a.features[0].marks.ghost = { mark: "no" };
    expect(validateAudience(a).join("\n")).toMatch(/ghost/);
  });

  it("needs a route for anything we have, or have but students cannot find", () => {
    for (const ours of ["have", "hidden", "partial"] as const) {
      const a = base();
      a.features[0].ours = ours;
      a.features[0].oursWhere = undefined;
      expect(validateAudience(a).join("\n")).toMatch(/where/);
    }
  });

  it("needs ideas to point at real features and scores in 1..5", () => {
    const a = base();
    a.ideas = [idea({ featureIds: ["nope"] }), idea({ id: "j", cost: 0 })];
    const problems = validateAudience(a).join("\n");
    expect(problems).toMatch(/nope/);
    expect(problems).toMatch(/j.*cost/);
  });

  it("keeps a feature we decided against out of the shortlist", () => {
    const a = base();
    a.decidedAgainst = [{ featureId: "f", reason: "No." }];
    expect(validateAudience(a).join("\n")).toMatch(/decided against/);
  });

  it("rejects duplicate ids and a non-ISO date", () => {
    const a = base();
    a.checkedOn = "15 Oct";
    a.competitors.push({ ...a.competitors[0] });
    const problems = validateAudience(a).join("\n");
    expect(problems).toMatch(/checkedOn/);
    expect(problems).toMatch(/duplicate.*c1/);
  });

  it("rejects links that are not https", () => {
    const a = base();
    a.features[0].marks.c1 = { mark: "yes", evidence: "rival.example/f" };
    expect(validateAudience(a).join("\n")).toMatch(/https/);
  });
});

describe("AUDIENCES (the real data)", () => {
  it("has at least one audience, with unique ids", () => {
    expect(AUDIENCES.length).toBeGreaterThan(0);
    const ids = AUDIENCES.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  for (const a of AUDIENCES) {
    it(`${a.id} passes every rule`, () => {
      expect(validateAudience(a)).toEqual([]);
    });

    it(`${a.id} compares 5 to 6 competitors`, () => {
      expect(a.competitors.length).toBeGreaterThanOrEqual(5);
      expect(a.competitors.length).toBeLessThanOrEqual(6);
    });
  }
});
