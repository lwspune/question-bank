import { describe, it, expect } from "vitest";
import { groupResults, initialsOf, resultHeadline, type PublicResult } from "@/lib/results/summary";

const r = (name: string, over: Partial<PublicResult> = {}): PublicResult => ({
  examSlug: "nda",
  examName: "NDA",
  sitting: "NDA 2 2026",
  stage: "written",
  name,
  ...over,
});

describe("groupResults: one card per sitting and stage", () => {
  it("lists names alphabetically, never in any ranked order", () => {
    const [g] = groupResults([r("Ratnesh Garg"), r("Aayush Shankar"), r("Kushil Basumatary")]);
    expect(g.names).toEqual(["Aayush Shankar", "Kushil Basumatary", "Ratnesh Garg"]);
  });

  it("keeps different sittings and stages apart, in the order the loader gave them", () => {
    const groups = groupResults([
      r("A One", { sitting: "NDA 2 2026", stage: "ssb" }),
      r("B Two"),
      r("C Three", { sitting: "NDA 1 2026" }),
      r("D Four", { sitting: "NDA 2 2026", stage: "ssb" }),
    ]);
    expect(groups.map((g) => `${g.sitting}/${g.stage}/${g.names.length}`)).toEqual([
      "NDA 2 2026/ssb/2",
      "NDA 2 2026/written/1",
      "NDA 1 2026/written/1",
    ]);
  });

  it("is empty for no results", () => {
    expect(groupResults([])).toEqual([]);
  });
});

describe("resultHeadline: the one-line strip", () => {
  it("counts the students of the newest group", () => {
    const [g] = groupResults([r("A One"), r("B Two"), r("C Three")]);
    expect(resultHeadline(g)).toBe("3 PYQ Vault students cleared the NDA 2 2026 written exam");
  });

  it("says student, not students, for one", () => {
    const [g] = groupResults([r("A One")]);
    expect(resultHeadline(g)).toBe("1 PYQ Vault student cleared the NDA 2 2026 written exam");
  });

  it("words the later stages for what they are", () => {
    const [ssb] = groupResults([r("A One", { stage: "ssb" }), r("B Two", { stage: "ssb" })]);
    expect(resultHeadline(ssb)).toBe("2 PYQ Vault students were recommended at the NDA 2 2026 SSB");
    const [fin] = groupResults([r("A One", { stage: "final" })]);
    expect(resultHeadline(fin)).toBe("1 PYQ Vault student made the NDA 2 2026 final merit list");
  });
});

describe("initialsOf: the circle on a name card", () => {
  it("takes the first and last name's first letters", () => {
    expect(initialsOf("Kushil Basumatary")).toBe("KB");
    expect(initialsOf("Ratnesh  Kumar Garg")).toBe("RG");
  });
  it("takes one letter for one name, upper-cased", () => {
    expect(initialsOf("arnav")).toBe("A");
  });
});
