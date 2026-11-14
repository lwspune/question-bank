import { describe, expect, it } from "vitest";
import { NEET_CUT_CHAPTERS, neetSyllabusCut } from "@/lib/homework/neetSyllabus";

const row = (id: string, chapter: string, pyq_year: number) => ({ id, pyq_year, chapter: { name: chapter } });

describe("neetSyllabusCut (2026-11-14)", () => {
  it("leaves out a cut chapter's questions from before 2024, with a reason", () => {
    const { kept, leftOut } = neetSyllabusCut([row("a", "Solid State", 2022), row("b", "Ray Optics and Optical Instruments", 2022)]);
    expect(kept.map((r) => r.id)).toEqual(["b"]);
    expect(leftOut).toEqual([{ id: "a", reason: expect.stringMatching(/Solid State.*2024/) }]);
  });

  it("keeps a question from 2024 on, even in a cut chapter: it was on a current paper", () => {
    const { kept, leftOut } = neetSyllabusCut([row("c", "Hydrogen", 2026), row("d", "Hydrogen", 2023)]);
    expect(kept.map((r) => r.id)).toEqual(["c"]);
    expect(leftOut.map((l) => l.id)).toEqual(["d"]);
  });

  it("names the chapters NMC dropped in 2024 that the bank holds", () => {
    expect([...NEET_CUT_CHAPTERS].sort()).toEqual([
      "Chemistry in Everyday Life", "Digestion and Absorption", "Environmental Chemistry",
      "General Principles and Processes of Isolation of Elements", "Hydrogen", "Mineral Nutrition",
      "Polymers", "Solid State", "States of Matter", "Surface Chemistry", "The s-Block Elements", "Transport in Plants",
    ]);
  });
});
