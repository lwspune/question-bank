import { describe, expect, it } from "vitest";
import { RAS_PRELIMS, getBlueprint, totalMarks, totalQuestions } from "@/lib/mocks/blueprints";
import { RAS_MOCK_YEARS, deriveRasSittings, rasSittings } from "../scripts/mocks/rasSittings";
import { PAPERS, SUBJECTS } from "../scripts/ras/config";

/**
 * RPSC RAS/RTS Prelims mocks: one per year, the paper as RPSC sets it: 150
 * questions in one section (the booklet prints no subject headings, so the mock
 * keeps the printed order), 3 hours, 200 marks: +4/3 for a right answer and
 * -1/3 of that (-4/9) for a wrong one. An item RPSC deleted rides as grace, so
 * every mock is 150 questions.
 */
describe("RAS Prelims blueprint", () => {
  it("is 150 questions, 200 marks, 180 minutes, +4/3 / -4/9", () => {
    expect(totalQuestions(RAS_PRELIMS)).toBe(150);
    expect(totalMarks(RAS_PRELIMS)).toBe(200);
    expect(RAS_PRELIMS.durationSecs).toBe(180 * 60);
    expect(RAS_PRELIMS.marking).toEqual({ correct: 4 / 3, wrong: -4 / 9 });
  });

  it("is ONE section carrying every catalog subject, so the mock keeps RPSC's printed order", () => {
    expect(RAS_PRELIMS.sections).toHaveLength(1);
    expect(RAS_PRELIMS.sections[0].count).toBe(150);
    expect([...RAS_PRELIMS.sections[0].subjects].sort()).toEqual([...SUBJECTS()].sort());
  });

  it("resolves through getBlueprint", () => {
    expect(getBlueprint("rpsc-ras", "prelims")).toBe(RAS_PRELIMS);
  });
});

describe("RAS sittings: one mock per committed year", () => {
  it("lists all six committed years", () => {
    expect([...RAS_MOCK_YEARS].sort()).toEqual(["2013", "2016", "2018", "2021", "2023", "2024"]);
    expect(rasSittings()).toHaveLength(6);
  });

  it("names a year's paper by its source file, slug and title", () => {
    expect(deriveRasSittings([PAPERS["2018"]], () => [])).toEqual([
      {
        key: "2018",
        year: 2018,
        sourceFile: "RAS_Pre_2018.pdf",
        slug: "rpsc-ras-prelims-2018",
        title: "RPSC RAS Prelims 2018: General Knowledge and General Science",
      },
    ]);
  });

  it("says when a cycle's paper was sat in another year (2013 was re-held in 2015)", () => {
    const [s] = deriveRasSittings([PAPERS["2013"]], () => []);
    expect(s.title).toBe("RPSC RAS Prelims 2013 (held 2015): General Knowledge and General Science");
  });

  it("graces every item RPSC deleted, so the paper still builds whole", () => {
    const [s] = deriveRasSittings([PAPERS["2023"]], () => [2, 6]);
    const rows = [{ questionNumber: "1" }, { questionNumber: "2" }, { questionNumber: "6" }] as unknown as Parameters<
      NonNullable<typeof s.prepare>
    >[0];
    const out = s.prepare!(rows) as unknown as { questionNumber: string; grace?: boolean }[];
    expect(out.map((r) => Boolean(r.grace))).toEqual([false, true, true]);
  });

  it("orders years oldest first", () => {
    const years = rasSittings().map((s) => s.year);
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });
});
