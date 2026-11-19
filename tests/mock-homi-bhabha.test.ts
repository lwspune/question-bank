import { describe, expect, it } from "vitest";
import { getBlueprint, HOMI_BHABHA_9_PAPER, totalMarks, totalQuestions } from "../src/lib/mocks/blueprints";
import { PAPERS } from "../scripts/homi-bhabha/config";
import { deriveHomiBhabhaSittings } from "../scripts/mocks/homiBhabhaSittings";

describe("Homi Bhabha mocks", () => {
  it("Std IX: 100 one-mark questions, no penalty, 90 minutes, one section over the four subjects (as MSTA prints it)", () => {
    expect(totalQuestions(HOMI_BHABHA_9_PAPER)).toBe(100);
    expect(totalMarks(HOMI_BHABHA_9_PAPER)).toBe(100);
    expect(HOMI_BHABHA_9_PAPER.marking).toEqual({ correct: 1, wrong: 0 });
    expect(HOMI_BHABHA_9_PAPER.durationSecs).toBe(90 * 60);
    expect(HOMI_BHABHA_9_PAPER.sections).toHaveLength(1);
    expect([...HOMI_BHABHA_9_PAPER.sections[0].subjects].sort()).toEqual(["Biology", "Chemistry", "General Science", "Physics"]);
    expect(getBlueprint("homi-bhabha-9", HOMI_BHABHA_9_PAPER.code)).toBe(HOMI_BHABHA_9_PAPER);
  });

  it("one sitting per published Std IX paper, oldest first; a paper with a question held out is held, never shipped short", () => {
    const s = deriveHomiBhabhaSittings(Object.values(PAPERS));
    expect(s.map((x) => x.key)).toEqual([
      "hb-9-2010",
      "hb-9-2017",
      "hb-9-2018",
      "hb-9-2021-jan",
      "hb-9-2021-nov",
      "hb-9-2021-dec",
      "hb-9-2023",
      "hb-9-2024",
    ]);
    expect(s.filter((x) => x.hold).map((x) => x.key)).toEqual(["hb-9-2018", "hb-9-2021-jan", "hb-9-2023"]);
    for (const x of s) {
      expect(x.sourceFile).toBe(`homi-bhabha/${x.key}`);
      expect(x.slug).toBe(x.key);
    }
  });

  it("titles name the sitting: the year, or the month for the three online papers of 2021", () => {
    const byKey = Object.fromEntries(deriveHomiBhabhaSittings(Object.values(PAPERS)).map((x) => [x.key, x.title]));
    expect(byKey["hb-9-2024"]).toBe("Homi Bhabha 2024 Class 9");
    expect(byKey["hb-9-2021-nov"]).toBe("Homi Bhabha November 2021 Class 9");
    expect(byKey["hb-9-2021-jan"]).toBe("Homi Bhabha January 2021 Class 9");
    expect(new Set(Object.values(byKey)).size).toBe(Object.keys(byKey).length);
  });

  it("Std VI papers are not mocked until they are ingested and published", () => {
    expect(deriveHomiBhabhaSittings(Object.values(PAPERS)).some((x) => x.key.startsWith("hb-6-"))).toBe(false);
  });
});
