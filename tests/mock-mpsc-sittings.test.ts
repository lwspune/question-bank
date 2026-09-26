import { describe, it, expect } from "vitest";
import { PAPERS } from "../scripts/mpsc/config";
import { deriveMpscSittings, mpscMockSlug, mpscMockTitle } from "../scripts/mocks/mpscSittings";
import { MPSC_GBC_PAPER, sectionMarking } from "../src/lib/mocks/blueprints";

/** Only the fields the derivation reads. */
function paper(id: string, pyqYear: number, pyqNote: string) {
  return { id, pyqYear, pyqNote, sourceFile: `MPSC-${id}-X00` };
}

describe("MPSC_GBC_PAPER", () => {
  it("is the printed pattern: 100 questions, 60 minutes, +1 / -1/4", () => {
    expect(MPSC_GBC_PAPER.durationSecs).toBe(60 * 60);
    expect(MPSC_GBC_PAPER.marking).toEqual({ correct: 1, wrong: -0.25 });
    expect(MPSC_GBC_PAPER.sections).toHaveLength(1);
    expect(MPSC_GBC_PAPER.sections[0].count).toBe(100);
    expect(sectionMarking(MPSC_GBC_PAPER, MPSC_GBC_PAPER.sections[0])).toEqual({ correct: 1, wrong: -0.25 });
  });

  it("spans every subject the ingest files rows under, so no row falls outside the paper", () => {
    expect([...MPSC_GBC_PAPER.sections[0].subjects].sort()).toEqual(
      ["Current Affairs", "Economics", "General Science", "Geography", "History", "Polity", "Reasoning and Aptitude"].sort()
    );
  });
});

describe("mpscMockSlug / mpscMockTitle", () => {
  it("keys the slug on the paper id, which is unique per sitting", () => {
    expect(mpscMockSlug("2019-b")).toBe("mpsc-2019-b");
    expect(mpscMockSlug("2023-bc")).toBe("mpsc-2023-bc");
  });

  it("titles the paper by group and year, and names the sitting date", () => {
    expect(mpscMockTitle(2019, "Group B · 24 Mar 2019")).toBe("MPSC Group B Prelims 2019 — 24 Mar 2019");
    // 2020's paper was sat in 2021; the date says so rather than hiding it.
    expect(mpscMockTitle(2020, "Group B · 4 Sep 2021")).toBe("MPSC Group B Prelims 2020 — 4 Sep 2021");
  });
});

describe("deriveMpscSittings", () => {
  const papers = [paper("2019-b", 2019, "Group B · 24 Mar 2019"), paper("2023-bc", 2023, "Group B & C · 30 Apr 2023")];

  it("maps each paper onto one sitting, with the cancelled questions as grace", () => {
    const keys: Record<string, number[]> = { "2019-b": [28, 48, 53], "2023-bc": [] };
    const got = deriveMpscSittings(papers, (id) => keys[id]);
    expect(got).toEqual([
      {
        key: "2019-b",
        sourceFile: "MPSC-2019-b-X00",
        year: 2019,
        slug: "mpsc-2019-b",
        title: "MPSC Group B Prelims 2019 — 24 Mar 2019",
        graceNumbers: [28, 48, 53],
      },
      {
        key: "2023-bc",
        sourceFile: "MPSC-2023-bc-X00",
        year: 2023,
        slug: "mpsc-2023-bc",
        title: "MPSC Group B & C Prelims 2023 — 30 Apr 2023",
        graceNumbers: [],
      },
    ]);
  });

  it("refuses a cancelled number outside 1-100 rather than gracing nothing", () => {
    expect(() => deriveMpscSittings([papers[0]], () => [101])).toThrow(/2019-b.*101/);
  });

  it("covers every configured paper with a distinct slug", () => {
    const got = deriveMpscSittings(PAPERS);
    expect(got).toHaveLength(PAPERS.length);
    expect(new Set(got.map((s) => s.slug)).size).toBe(PAPERS.length);
    // Measured: 35 cancelled questions across the 14 official keys.
    expect(got.reduce((n, s) => n + s.graceNumbers.length, 0)).toBe(35);
  });
});
