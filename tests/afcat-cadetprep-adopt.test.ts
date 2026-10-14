import { describe, expect, it } from "vitest";
import { adoptVerdicts, sourceSolutionProblem } from "../scripts/afcat/lib";

const rec = (id: string, key: string, keySolution: string, difficulty = "Medium") => ({ id, key, keySolution, difficulty });

describe("sourceSolutionProblem", () => {
  it("accepts a clean worked solution", () => {
    expect(sourceSolutionProblem("Sum \\(= 30 \\times 75 = 2250\\), so the mark is \\(104\\).")).toBeNull();
  });
  it("rejects an empty solution", () => {
    expect(sourceSolutionProblem("  ")).toMatch(/empty/);
  });
  it("rejects a solution that names an option letter (the letters move when options are rebalanced)", () => {
    expect(sourceSolutionProblem("Hence the answer is option B.")).toMatch(/option letter/);
    expect(sourceSolutionProblem("So the correct choice is (c).")).toMatch(/option letter/);
  });
  it("does not mistake the article 'a' or a variable A for a letter reference", () => {
    expect(sourceSolutionProblem("Let A be the work done in a day; then A = 1/12.")).toBeNull();
  });
  it("rejects self-talk", () => {
    expect(sourceSolutionProblem("This gives 24. Wait, recheck: it is 25.")).toMatch(/self-talk/);
  });
  it("rejects a solution that settles for the closest option (the key was picked, not computed)", () => {
    expect(sourceSolutionProblem("Ratio = 32:8 = 4:1 (closest given is 17:3).")).toMatch(/closest/);
    expect(sourceSolutionProblem("113:67, about 59:41 (nearest simple ratio).")).toMatch(/closest/);
    expect(sourceSolutionProblem("The ratio is 1:1; as per distribution requirement, keep the key.")).toMatch(/closest/);
    expect(sourceSolutionProblem("Cheap : dear = 4:3 as per option pattern.")).toMatch(/closest/);
  });
  it("does not flag 'approximately' in an honest rounding", () => {
    expect(sourceSolutionProblem("\\(\\pi r^2 = 154\\), using \\(\\pi = \\frac{22}{7}\\).")).toBeNull();
  });
  it("rejects a broken unit (a stray LaTeX italic correction where the rupee sign was)", () => {
    expect(sourceSolutionProblem("Cost per kg = \\( 27.6 \\/kg \\).")).toMatch(/broken unit/);
  });
  it("rejects an em dash and a control character", () => {
    expect(sourceSolutionProblem("Net change — none.")).toMatch(/em dash/);
    expect(sourceSolutionProblem("Ratio \x0crac{1}{2}")).toMatch(/control/);
  });
});

describe("adoptVerdicts", () => {
  const base = { subtopic: "Basics", authored: {} };

  it("adopts the source solution where the blind letter agrees with the key", () => {
    const r = adoptVerdicts({ ...base, blind: { "01-2": ["B", "2:1"] }, records: [rec("01-2", "B", "Ratio is \\(2:1\\).", "Easy")] });
    expect(r.todo).toEqual([]);
    expect(r.derived).toEqual([
      { id: "01-2", derived: "B", value: "2:1", confidence: "high", note: "blind agrees with key; source solution adopted", subtopic: "Basics", difficulty: "EASY", solution: "Ratio is \\(2:1\\)." },
    ]);
  });

  it("sends a disagreement to the to-do list until a solution is authored", () => {
    const r = adoptVerdicts({ ...base, blind: { "01-3": ["A", "4.5"] }, records: [rec("01-3", "B", "Total = 4 hours.")] });
    expect(r.derived).toEqual([]);
    expect(r.todo).toEqual([{ id: "01-3", reason: "dispute: blind A vs key B" }]);
  });

  it("uses an authored solution, with its own difficulty and subtopic when given", () => {
    const r = adoptVerdicts({
      ...base,
      blind: { "01-3": ["A", "4.5"] },
      records: [rec("01-3", "B", "Total = 4 hours.", "Hard")],
      authored: { "01-3": { solution: "Upstream 3 h, downstream 1.5 h: 4.5 h.", subtopic: "Boats" } },
    });
    expect(r.todo).toEqual([]);
    expect(r.derived[0]).toMatchObject({ id: "01-3", derived: "A", solution: "Upstream 3 h, downstream 1.5 h: 4.5 h.", subtopic: "Boats", difficulty: "HARD" });
  });

  it("lists an agreeing row whose source solution breaks the rules", () => {
    const r = adoptVerdicts({ ...base, blind: { "01-4": ["C", "6"] }, records: [rec("01-4", "C", "So option C.")] });
    expect(r.todo).toEqual([{ id: "01-4", reason: "source solution unusable: names an option letter" }]);
  });

  it("lists a row with no blind verdict and a blind X", () => {
    const r = adoptVerdicts({ ...base, blind: { "01-6": ["X", "none fits"] }, records: [rec("01-5", "A", "s"), rec("01-6", "A", "s")] });
    expect(r.todo).toEqual([
      { id: "01-5", reason: "no blind verdict" },
      { id: "01-6", reason: "dispute: blind X vs key A" },
    ]);
  });

  it("takes a per-row subtopic from the blind verdict's third field", () => {
    const r = adoptVerdicts({ ...base, blind: { "01-2": ["B", "2:1", "Combining Ratios"] }, records: [rec("01-2", "B", "Ratio is \\(2:1\\).")] });
    expect(r.derived[0].subtopic).toBe("Combining Ratios");
  });

  it("refuses a blind verdict for a row that is not in the file", () => {
    expect(() => adoptVerdicts({ ...base, blind: { "01-9": ["A", "1"] }, records: [rec("01-2", "A", "s")] })).toThrow(/01-9/);
  });
});
