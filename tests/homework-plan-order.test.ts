import { describe, expect, it } from "vitest";
import { buildPlanOrder, type PlanInput } from "@/lib/homework/plan";

// Sittings oldest first; questions carry their own sitting and chapter.
const SITTINGS = ["Mar 2015", "Mar 2016", "Mar 2017", "Mar 2018"];
const q = (id: string, sitting: string, chapter = "Vectors") => ({ id, sitting, chapter });

function input(over: Partial<PlanInput> = {}): PlanInput {
  return {
    perDay: 2,
    sittings: SITTINGS,
    questions: [
      q("a1", "Mar 2015"), q("a2", "Mar 2017"), q("a3", "Mar 2018"), // asked 3 times
      q("b1", "Mar 2016", "Matrices"), q("b2", "Mar 2018", "Matrices"), // asked twice
      q("t1", "Mar 2015", "Logic"), q("t2", "Mar 2017", "Logic"), q("t3", "Mar 2016", "Logic"), // a type
      q("s1", "Mar 2016", "Matrices"), q("s2", "Mar 2017"), // asked once, no type
    ],
    groups: [
      { tier: "repeat", label: "B", sittings: ["Mar 2016", "Mar 2018*"], questionIds: ["b1", "b2"] },
      { tier: "repeat", label: "A", sittings: ["Mar 2015", "Mar 2017", "Mar 2018"], questionIds: ["a1", "a2", "a3"] },
      { tier: "type", label: "T", sittings: ["Mar 2015", "Mar 2016", "Mar 2017"], questionIds: ["t1", "t2", "t3"] },
    ],
    ...over,
  };
}

describe("buildPlanOrder", () => {
  it("puts questions asked again first, highest count first, in their latest wording", () => {
    const items = buildPlanOrder(input());
    expect(items.slice(0, 2).map((i) => [i.questionId, i.part])).toEqual([["a3", 1], ["b2", 1]]);
    expect(items[0].note).toBe("Asked 3 times: Mar 2015, Mar 2017, Mar 2018");
    expect(items[1].note).toBe("Asked 2 times: Mar 2016, Mar 2018* (* = numbers changed that year)");
  });

  it("never prints another wording of a question already printed", () => {
    const ids = buildPlanOrder(input()).map((i) => i.questionId);
    for (const gone of ["a1", "a2", "b1"]) expect(ids).not.toContain(gone);
  });

  it("then gives one example of each type, the latest, with the type's count", () => {
    const part2 = buildPlanOrder(input()).filter((i) => i.part === 2);
    expect(part2).toHaveLength(1);
    expect(part2[0].questionId).toBe("t2");
    expect(part2[0].note).toBe("This type asked 3 times: Mar 2015, Mar 2016, Mar 2017. This one: Mar 2017");
  });

  it("then prints every remaining question once, each marked as asked once", () => {
    const part3 = buildPlanOrder(input()).filter((i) => i.part === 3);
    expect(part3.map((i) => i.questionId).sort()).toEqual(["s1", "s2", "t1", "t3"]);
    expect(part3.find((i) => i.questionId === "t3")!.note).toBe("Asked once: Mar 2016 (same type asked 3 times)");
    expect(part3.find((i) => i.questionId === "s1")!.note).toBe("Asked once: Mar 2016");
  });

  it("splits the order into days of perDay questions numbered from 1", () => {
    const items = buildPlanOrder(input());
    expect(items.map((i) => [i.day, i.position])).toEqual([
      [1, 1], [1, 2], [2, 1], [2, 2], [3, 1], [3, 2], [4, 1],
    ]);
  });

  it("covers every question: printed, or a wording of a printed repeat", () => {
    const inp = input();
    const printed = new Set(buildPlanOrder(inp).map((i) => i.questionId));
    const siblings = new Set(inp.groups.filter((g) => g.tier === "repeat").flatMap((g) => g.questionIds));
    for (const x of inp.questions) expect(printed.has(x.id) || siblings.has(x.id)).toBe(true);
  });

  it("skips a type whose questions were all printed as repeats", () => {
    const inp = input();
    inp.groups.push({ tier: "type", label: "U", sittings: ["Mar 2015", "Mar 2017"], questionIds: ["a1", "a2"] });
    expect(buildPlanOrder(inp).filter((i) => i.part === 2)).toHaveLength(1);
  });

  it("can be told not to print a wording that carries another question", () => {
    const inp = input();
    inp.groups[1].avoidAsExample = ["a3"];
    expect(buildPlanOrder(inp)[0].questionId).toBe("a2");
  });

  it("spreads asked-once questions across chapters rather than running one chapter", () => {
    const qs = [
      q("m1", "Mar 2015", "Matrices"), q("m2", "Mar 2016", "Matrices"), q("m3", "Mar 2017", "Matrices"),
      q("v1", "Mar 2015", "Vectors"), q("v2", "Mar 2016", "Vectors"),
    ];
    const chapters = buildPlanOrder({ perDay: 5, sittings: SITTINGS, questions: qs, groups: [] }).map(
      (i) => qs.find((x) => x.id === i.questionId)!.chapter
    );
    expect(chapters).toEqual(["Matrices", "Vectors", "Matrices", "Vectors", "Matrices"]);
  });

  it("carries a case study's parts in one slot, the lead first", () => {
    const qs = [{ id: "cs", sitting: "Mar 2016", chapter: "Optics", rows: ["cs", "cs2", "cs3"] }, q("x", "Mar 2015", "Optics")];
    const items = buildPlanOrder({ perDay: 5, sittings: SITTINGS, questions: qs, groups: [] });
    expect(items.map((i) => [i.questionId, i.rows, i.position])).toEqual([
      ["cs", ["cs", "cs2", "cs3"], 1],
      ["x", ["x"], 2],
    ]);
  });

  it("refuses a slot whose parts do not start with the slot's own id", () => {
    const qs = [{ id: "cs", sitting: "Mar 2016", chapter: "Optics", rows: ["cs2", "cs"] }];
    expect(() => buildPlanOrder({ perDay: 5, sittings: SITTINGS, questions: qs, groups: [] })).toThrow(/must start with cs/);
  });

  it("refuses a group naming a question or sitting it does not know", () => {
    const badQ = input();
    badQ.groups[0].questionIds.push("zz");
    expect(() => buildPlanOrder(badQ)).toThrow(/unknown question zz/);
    const badS = input();
    badS.groups[0].sittings.push("Jul 2099");
    expect(() => buildPlanOrder(badS)).toThrow(/unknown sitting Jul 2099/);
  });
});
