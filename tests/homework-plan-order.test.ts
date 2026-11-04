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
  it("ranks repeats and types together by how often they were asked, an exact repeat first on a tie (2026-11-04)", () => {
    // A is a repeat asked 3 times, T a type asked 3 times, B a repeat asked twice.
    const items = buildPlanOrder(input());
    expect(items.slice(0, 3).map((i) => [i.questionId, i.part])).toEqual([["a3", 1], ["t2", 2], ["b2", 1]]);
    expect(items[0].note).toBe("Asked 3 times: Mar 2015, Mar 2017, Mar 2018");
    expect(items[2].note).toBe("Asked 2 times: Mar 2016, Mar 2018* (* = numbers or wording changed that year)");
  });

  it("puts a type asked more often ahead of a repeat asked less often", () => {
    // The NDA Matrices case: a type asked 8 times sat behind repeats asked twice.
    const inp = input();
    inp.groups[2].sittings = ["Mar 2015", "Mar 2016", "Mar 2017", "Mar 2018"];
    expect(buildPlanOrder(inp)[0].questionId).toBe("t2");
  });

  it("prints a repeat once, as its type's example, when the type is asked more often", () => {
    // Its other wordings are never printed, and it gets no slot of its own.
    const items = buildPlanOrder(
      input({
        questions: [q("m1", "Mar 2015"), q("r1", "Mar 2016"), q("m3", "Mar 2017"), q("r2", "Mar 2018")],
        groups: [
          { tier: "repeat", label: "R", sittings: ["Mar 2016", "Mar 2018*"], questionIds: ["r1", "r2"] },
          { tier: "type", label: "M", sittings: ["Mar 2015", "Mar 2016", "Mar 2017", "Mar 2018"], questionIds: ["m1", "r1", "m3", "r2"] },
        ],
      })
    );
    expect(items[0]).toMatchObject({ questionId: "r2", part: 2, note: "This type asked 4 times: Mar 2015, Mar 2016, Mar 2017, Mar 2018. This one: Mar 2018" });
    const ids = items.map((i) => i.questionId);
    expect(ids).not.toContain("r1");
    expect(items.filter((i) => i.part === 1)).toEqual([]);
    expect([...ids].sort()).toEqual(["m1", "m3", "r2"]);
  });

  it("records the group each slot stands for, by its place in the input", () => {
    // groups[0] = repeat B, groups[1] = repeat A, groups[2] = type T.
    const byId = new Map(buildPlanOrder(input()).map((i) => [i.questionId, i.group]));
    expect(byId.get("a3")).toBe(1);
    expect(byId.get("b2")).toBe(0);
    expect(byId.get("t2")).toBe(2);
    expect(byId.get("t1")).toBe(2); // asked once, of type T
    expect(byId.get("s1")).toBeUndefined(); // asked once, no type
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

  it("places each question once when two types in different chapters share a label", () => {
    const items = buildPlanOrder(
      input({
        questions: [
          q("x1", "Mar 2015", "Linear"), q("x2", "Mar 2016", "Linear"), q("x3", "Mar 2017", "Linear"),
          q("y1", "Mar 2015", "Quadratic"), q("y2", "Mar 2016", "Quadratic"), q("y3", "Mar 2018", "Quadratic"),
        ],
        groups: [
          { tier: "type", label: "Digits", sittings: ["Mar 2015", "Mar 2016", "Mar 2017"], questionIds: ["x1", "x2", "x3"] },
          { tier: "type", label: "Digits", sittings: ["Mar 2015", "Mar 2016", "Mar 2018"], questionIds: ["y1", "y2", "y3"] },
        ],
      })
    );
    const ids = items.map((i) => i.questionId);
    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort()).toEqual(["x1", "x2", "x3", "y1", "y2", "y3"]);
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

describe("buildPlanOrder notes for many papers (MHT-CET, 2026-11-04)", () => {
  // The database caps a note at 300 characters (migration 0143). MHT-CET has
  // 69 shifts, and a type asked in 19 of them listed every shift past the cap.
  const shifts = Array.from({ length: 20 }, (_, i) => `${i + 1} May ${2023 + Math.floor(i / 5)} S1`);
  const many = (n: number) => shifts.slice(0, n);

  it("summarises a long list of papers by year, keeping the count and the paper shown", () => {
    const qs = many(19).map((s, i) => q(`t${i}`, s));
    const items = buildPlanOrder({
      perDay: 5,
      sittings: shifts,
      questions: qs,
      groups: [{ tier: "type", label: "T", sittings: many(19), questionIds: qs.map((x) => x.id) }],
    });
    expect(items[0].note).toBe("This type asked 19 times: 5 in 2023, 5 in 2024, 5 in 2025, 4 in 2026. This one: 19 May 2026 S1");
  });

  it("summarises a long repeat the same way and says some papers changed it", () => {
    const qs = many(19).map((s, i) => q(`r${i}`, s));
    const items = buildPlanOrder({
      perDay: 5,
      sittings: shifts,
      questions: qs,
      groups: [{ tier: "repeat", label: "R", sittings: [...many(18).map((s) => `${s}*`), shifts[18]], questionIds: qs.map((x) => x.id) }],
    });
    expect(items[0].note).toBe("Asked 19 times: 5 in 2023, 5 in 2024, 5 in 2025, 4 in 2026 (numbers or wording changed in some)");
  });

  it("keeps every note within 300 characters, and a short list as it was", () => {
    const qs = many(3).map((s, i) => q(`s${i}`, s));
    const items = buildPlanOrder({
      perDay: 5,
      sittings: shifts,
      questions: qs,
      groups: [{ tier: "type", label: "T", sittings: many(3), questionIds: qs.map((x) => x.id) }],
    });
    expect(items[0].note).toBe("This type asked 3 times: 1 May 2023 S1, 2 May 2023 S1, 3 May 2023 S1. This one: 3 May 2023 S1");
    for (const it of items) expect(it.note.length).toBeLessThanOrEqual(300);
  });
});
