import { describe, expect, it } from "vitest";
import { carryUsedNames } from "../scripts/ssc-cgl/catalogCarry";

// 2026-11-17 (SUGGESTIONS 2026-10-23): seed-catalog.ts copies CDS's CURRENT names,
// and the CDS GK notes pass re-cut subtopics SSC rows still use. A regenerated
// catalog would then reject those rows' transcripts on the next build.
const oldCat = {
  History: [{ chapter: "Medieval India", subtopics: ["Delhi Sultanate", "Mughals (old name)"] }],
  Polity: [{ chapter: "Parliament", subtopics: ["Lok Sabha"] }],
};
const newCat = {
  History: [{ chapter: "Medieval India", subtopics: ["Delhi Sultanate", "Mughal Empire"] }],
  Polity: [],
};

describe("carryUsedNames", () => {
  it("keeps a name a transcript still uses that the regenerated catalog dropped", () => {
    const used = new Set(["Medieval India\u0000Mughals (old name)", "Parliament\u0000Lok Sabha"]);
    const { catalog, carried } = carryUsedNames(newCat, oldCat, used);
    expect(catalog.History[0].subtopics).toEqual(["Delhi Sultanate", "Mughal Empire", "Mughals (old name)"]);
    expect(catalog.Polity).toEqual([{ chapter: "Parliament", subtopics: ["Lok Sabha"] }]);
    expect(carried).toEqual(["History / Medieval India / Mughals (old name)", "Polity / Parliament / Lok Sabha"]);
  });

  it("does not carry a dropped name nothing uses", () => {
    const { catalog, carried } = carryUsedNames(newCat, oldCat, new Set());
    expect(catalog.History[0].subtopics).toEqual(["Delhi Sultanate", "Mughal Empire"]);
    expect(carried).toEqual([]);
  });

  it("does not mutate its inputs", () => {
    const before = JSON.stringify(newCat);
    carryUsedNames(newCat, oldCat, new Set(["Parliament\u0000Lok Sabha"]));
    expect(JSON.stringify(newCat)).toBe(before);
  });
});
