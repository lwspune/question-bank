import { describe, it, expect } from "vitest";
import { ASP_PAPERS, FSP_PAPERS, PAPERS, SSP_CHAPTERS, SSP_PAPERS, dataPath } from "../scripts/mpsc/config";
import { readFileSync } from "node:fs";
import { deriveMpscSittings, mpscMockSlug, mpscMockTitle, sspMockTitle } from "../scripts/mocks/mpscSittings";
import { MPSC_GBC_PAPER, MPSC_SSP_GS1_PAPER, sectionMarking } from "../src/lib/mocks/blueprints";
import { getExamBySlug } from "../src/lib/exam/examContext";

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

describe("MPSC_SSP_GS1_PAPER", () => {
  it("is the printed pattern: 100 questions, 2 hours, 200 marks, -1/4 of a question's marks", () => {
    expect(MPSC_SSP_GS1_PAPER.durationSecs).toBe(120 * 60);
    expect(MPSC_SSP_GS1_PAPER.marking).toEqual({ correct: 2, wrong: -0.5 });
    expect(MPSC_SSP_GS1_PAPER.sections).toHaveLength(1);
    expect(MPSC_SSP_GS1_PAPER.sections[0].count).toBe(100);
  });

  it("spans exactly the subjects the fixed chapter list allows", () => {
    expect([...MPSC_SSP_GS1_PAPER.sections[0].subjects].sort()).toEqual(Object.keys(SSP_CHAPTERS).sort());
  });

  it("points at a registered, bilingual exam with mocks", () => {
    const exam = getExamBySlug(MPSC_SSP_GS1_PAPER.examSlug);
    expect(exam?.examName).toBe(MPSC_SSP_GS1_PAPER.examName);
    expect(exam?.bilingual).toBe(true);
    expect(exam?.hasMocks).toBe(true);
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

  it("graces a noticed question too (owner 2026-11-02: notice + grace, key kept), once and in order", () => {
    const p = { ...papers[0], notices: { 7: { en: "e", mr: "m" }, 48: { en: "e", mr: "m" } } };
    expect(deriveMpscSittings([p], () => [28, 48])[0].graceNumbers).toEqual([7, 28, 48]);
  });

  it("bounds grace by the paper's own length, so a 200-question paper is accepted", () => {
    const long = { ...papers[0], questions: 200 };
    expect(deriveMpscSittings([long], () => [150])[0].graceNumbers).toEqual([150]);
    expect(() => deriveMpscSittings([long], () => [201])).toThrow(/201/);
  });

  it("titles a State Services paper by exam, year, paper and date", () => {
    expect(sspMockTitle(2020, "GS Paper I · 21 Mar 2021")).toBe("MPSC State Services Prelims 2020 — GS Paper I — 21 Mar 2021");
  });

  it("derives the ten State Services sittings, graced from their official keys", () => {
    const got = deriveMpscSittings(SSP_PAPERS, undefined, sspMockTitle);
    expect(got.map((s) => s.slug).sort()).toEqual(SSP_PAPERS.map((p) => `mpsc-ssp-${p.pyqYear}`).sort());
    expect(got.find((s) => s.key === "ssp-2022")?.graceNumbers).toEqual([42, 95, 96]);
    // Measured: 24 cancelled questions across the ten final keys.
    expect(got.reduce((n, s) => n + s.graceNumbers.length, 0)).toBe(24);
  });

  it("covers every configured paper with a distinct slug", () => {
    const got = deriveMpscSittings(PAPERS);
    expect(got).toHaveLength(PAPERS.length);
    expect(new Set(got.map((s) => s.slug)).size).toBe(PAPERS.length);
    // Measured: 35 cancelled questions across the 14 official keys.
    expect(got.reduce((n, s) => n + s.graceNumbers.length, 0)).toBe(35);
  });
});

describe("Forest + Agriculture key notices (owner 2026-11-02: notice + grace on every doubtful key)", () => {
  const all = [...FSP_PAPERS, ...ASP_PAPERS];
  const noticed = all.flatMap((p) => Object.keys(p.notices ?? {}).map((n) => `${p.id} Q${n}`));

  it("carries exactly the eleven questions the owner settled", () => {
    expect(noticed.sort()).toEqual(
      [
        "fsp-2014 Q55", "fsp-2014 Q63", "fsp-2014 Q67", "fsp-2014 Q74",
        "asp-2016 Q38", "asp-2016 Q75",
        "asp-2011 Q41", "asp-2011 Q42", "asp-2011 Q109",
        "asp-2012 Q117", "asp-2012 Q150",
      ].sort()
    );
  });

  it("gives every notice both languages, and never notices a question MPSC already cancelled", () => {
    for (const p of all) {
      const key = JSON.parse(readFileSync(dataPath(p.id, "key"), "utf8")).key as Record<string, string>;
      for (const [n, v] of Object.entries(p.notices ?? {})) {
        expect(v.en.length, `${p.id} Q${n} en`).toBeGreaterThan(40);
        expect(v.mr.length, `${p.id} Q${n} mr`).toBeGreaterThan(40);
        expect(key[n], `${p.id} Q${n} is cancelled already`).not.toBe("#");
        // A TS string drops the backslash of "\(" and turns "\t" into a TAB: maths must survive as written.
        for (const text of [v.en, v.mr]) {
          expect(text, `${p.id} Q${n}: control character`).not.toMatch(/[\t\r]/);
          expect(text.split("\(").length, `${p.id} Q${n}: unbalanced math delimiters`).toBe(text.split("\)").length);
        }
        if (n === "67") expect(v.en).toContain(String.raw`\(t = 48\tfrac{1}{3}\)`);
      }
    }
  });
});
