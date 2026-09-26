import { describe, it, expect } from "vitest";
import { UPSC_CSAT_PAPER, UPSC_GS1_PAPER, getBlueprint, totalMarks, totalQuestions } from "../src/lib/mocks/blueprints";
import { deriveUpscSittings } from "../scripts/mocks/upscSittings";
import { PAPERS } from "../scripts/upsc/config";

describe("UPSC blueprints", () => {
  it("GS Paper I: 100 items, 200 marks, 2 hours, +2 / -1/3 of 2", () => {
    expect(getBlueprint("upsc-cse", "gs1")).toBe(UPSC_GS1_PAPER);
    expect(totalQuestions(UPSC_GS1_PAPER)).toBe(100);
    expect(totalMarks(UPSC_GS1_PAPER)).toBe(200);
    expect(UPSC_GS1_PAPER.durationSecs).toBe(120 * 60);
    expect(UPSC_GS1_PAPER.marking).toEqual({ correct: 2, wrong: -0.6667 });
  });

  it("CSAT Paper II: 80 items, 200 marks, 2 hours, +2.5 / -1/3 of 2.5", () => {
    expect(getBlueprint("upsc-cse", "csat")).toBe(UPSC_CSAT_PAPER);
    expect(totalQuestions(UPSC_CSAT_PAPER)).toBe(80);
    expect(totalMarks(UPSC_CSAT_PAPER)).toBe(200);
    expect(UPSC_CSAT_PAPER.durationSecs).toBe(120 * 60);
    expect(UPSC_CSAT_PAPER.marking).toEqual({ correct: 2.5, wrong: -0.8333 });
  });

  it("covers every subject the bank files each paper under", () => {
    expect([...UPSC_GS1_PAPER.sections[0].subjects].sort()).toEqual(
      ["Biology", "Chemistry", "Current Affairs and IR", "Economy", "Environment and Ecology", "Geography", "History", "Physics", "Polity and Governance"]
    );
    expect([...UPSC_CSAT_PAPER.sections[0].subjects].sort()).toEqual(
      ["Basic Numeracy", "Comprehension", "Data Interpretation and Data Sufficiency", "General Mental Ability", "Logical Reasoning and Analytical Ability"]
    );
  });
});

describe("deriveUpscSittings", () => {
  const all = deriveUpscSittings(Object.values(PAPERS));
  const by = (id: string) => all.find((s) => s.key === id)!;

  it("covers both papers of every sitting with a key, 2017-2026, and not 2016", () => {
    expect(all).toHaveLength(20);
    expect(all.some((s) => s.key.startsWith("2016"))).toBe(false);
    expect(new Set(all.map((s) => s.slug)).size).toBe(20);
  });

  it("names and slugs each paper by year and paper", () => {
    expect(by("2019-p1")).toMatchObject({ paper: 1, year: 2019, slug: "upsc-cse-2019-gs1", title: "UPSC CSE Prelims 2019 — GS Paper I" });
    expect(by("2019-p2")).toMatchObject({ paper: 2, slug: "upsc-cse-2019-csat", title: "UPSC CSE Prelims 2019 — CSAT (Paper II)" });
  });

  it("graces exactly the items UPSC withdrew", () => {
    expect(by("2024-p1").graceNumbers).toEqual([20, 52, 57]);
    expect(by("2026-p1").graceNumbers).toEqual([64]);
    expect(by("2019-p1").graceNumbers).toEqual([]);
    expect(all.reduce((n, s) => n + s.graceNumbers.length, 0)).toBe(10);
  });

  it("holds 2021 CSAT, whose Q39 accepted two answers, instead of gracing it", () => {
    expect(by("2021-p2").graceNumbers).toEqual([]);
    expect(by("2021-p2").hold).toMatch(/Q39/);
    expect(all.filter((s) => s.hold).map((s) => s.key)).toEqual(["2021-p2"]);
  });
});
