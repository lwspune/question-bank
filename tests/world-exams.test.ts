/**
 * /dashboard/world-exams (migration 0260): the pure core in src/lib/worldExams.
 * What is locked:
 *
 * - a row from the database is checked before the page shows it: rights and
 *   verdict from the fixed lists, https sources only, a shortlisted row carries
 *   its reason, risk and next step;
 * - the loader's file is checked the same way, and duplicate ids or shortlist
 *   ranks are refused;
 * - the page groups by region in a fixed order, filters by region, verdict and
 *   rights, ignores an unknown filter value, and sums revenue per country.
 */
import { describe, it, expect } from "vitest";
import { parseExamRow, parseNoteRow, parseLoadFile, RIGHTS, VERDICTS } from "@/lib/worldExams/model";
import {
  filterExams,
  groupByRegion,
  parseFilters,
  revenueByCountry,
  shortlist,
  verdictCounts,
} from "@/lib/worldExams/view";

const row = (over: Record<string, unknown> = {}) => ({
  id: "spain-mir",
  region: "europe",
  country: "Spain",
  exam: "MIR",
  category: "licensing",
  format: "200 MCQ",
  candidates: "16,763 admitted (2026)",
  candidates_n: 16763,
  papers_released: "Yes",
  rights: "free",
  rights_note: "",
  language: "Spanish",
  verdict: "lead",
  note: "",
  approximate: false,
  shortlist_rank: null,
  why_passes: null,
  main_risk: null,
  next_step: null,
  revenue: null,
  sources: [{ label: "Legal notice", url: "https://www.sanidad.gob.es/avisoLegal/home.htm" }],
  updated_at: "2026-11-15T10:00:00Z",
  ...over,
});

describe("parseExamRow", () => {
  it("maps a database row to the page's shape", () => {
    const e = parseExamRow(row());
    expect(e.id).toBe("spain-mir");
    expect(e.candidatesN).toBe(16763);
    expect(e.shortlistRank).toBeNull();
    expect(e.sources[0].url).toMatch(/^https:/);
  });

  it("refuses a rights value outside the list", () => {
    expect(() => parseExamRow(row({ rights: "maybe" }))).toThrow(/rights/);
  });

  it("refuses a verdict outside the list", () => {
    expect(() => parseExamRow(row({ verdict: "great" }))).toThrow(/verdict/);
  });

  it("refuses a source that is not https", () => {
    expect(() => parseExamRow(row({ sources: [{ label: "x", url: "http://example.com" }] }))).toThrow(/url/);
  });

  it("refuses a shortlisted row without its reason, risk and next step", () => {
    expect(() => parseExamRow(row({ shortlist_rank: 1 }))).toThrow(/shortlist/);
    const ok = parseExamRow(row({ shortlist_rank: 1, why_passes: "a", main_risk: "b", next_step: "c" }));
    expect(ok.shortlistRank).toBe(1);
  });

  it("accepts a revenue block and refuses a share above 1", () => {
    const revenue = {
      currency: "EUR",
      low: { share: 0.005, price: 49, usd: 4500 },
      mid: { share: 0.02, price: 79, usd: 29000 },
      high: { share: 0.05, price: 99, usd: 91000 },
    };
    expect(parseExamRow(row({ revenue })).revenue?.mid.usd).toBe(29000);
    expect(() => parseExamRow(row({ revenue: { ...revenue, low: { share: 5, price: 49, usd: 1 } } }))).toThrow(/share/);
  });
});

describe("parseNoteRow", () => {
  it("keeps paragraphs and bullets in order", () => {
    const n = parseNoteRow({
      id: "spain-deep-dive",
      title: "Deep dive: Spain",
      sort: 2,
      paragraphs: ["First.", "Second."],
      bullets: ["One", "Two"],
      sources: [],
      updated_at: "2026-11-15T10:00:00Z",
    });
    expect(n.paragraphs).toEqual(["First.", "Second."]);
    expect(n.bullets).toEqual(["One", "Two"]);
  });
});

describe("parseLoadFile", () => {
  const file = (exams: unknown[]) => ({ exams, notes: [] });

  it("accepts a valid file", () => {
    expect(parseLoadFile(file([row()])).exams).toHaveLength(1);
  });

  it("refuses duplicate ids", () => {
    expect(() => parseLoadFile(file([row(), row()]))).toThrow(/duplicate id/i);
  });

  it("refuses a row with no source unless it is marked approximate", () => {
    expect(() => parseLoadFile(file([row({ sources: [] })]))).toThrow(/source/i);
    expect(parseLoadFile(file([row({ sources: [], approximate: true })])).exams).toHaveLength(1);
  });

  it("refuses two rows with the same shortlist rank", () => {
    const a = row({ id: "a-a", shortlist_rank: 1, why_passes: "a", main_risk: "b", next_step: "c" });
    const b = row({ id: "b-b", shortlist_rank: 1, why_passes: "a", main_risk: "b", next_step: "c" });
    expect(() => parseLoadFile(file([a, b]))).toThrow(/rank/i);
  });
});

describe("view", () => {
  const exams = [
    parseExamRow(row({ id: "korea-agent", region: "asia", country: "Korea", exam: "Agent", verdict: "park", rights: "free", revenue: rev(8500, 51000, 204000) })),
    parseExamRow(row({ id: "korea-tax", region: "asia", country: "Korea", exam: "Tax", verdict: "park", rights: "free", revenue: rev(4500, 27000, 108000) })),
    parseExamRow(row({ id: "spain-mir", shortlist_rank: 1, why_passes: "a", main_risk: "b", next_step: "c", revenue: rev(4500, 29000, 91000) })),
    parseExamRow(row({ id: "turkey", region: "europe", country: "Turkey", exam: "YKS", verdict: "skip", rights: "reject" })),
    parseExamRow(row({ id: "gre", region: "global", country: "Global", exam: "GRE", verdict: "lead", rights: "original_only" })),
  ];

  it("lists the shortlist by rank", () => {
    expect(shortlist(exams).map((e) => e.id)).toEqual(["spain-mir"]);
  });

  it("groups by region in a fixed order, countries alphabetically", () => {
    const groups = groupByRegion(exams);
    expect(groups.map((g) => g.region)).toEqual(["asia", "europe", "global"]);
    expect(groups[1].countries.map((c) => c.country)).toEqual(["Spain", "Turkey"]);
  });

  it("filters by region, verdict and rights together", () => {
    expect(filterExams(exams, { region: "asia" }).map((e) => e.id)).toEqual(["korea-agent", "korea-tax"]);
    expect(filterExams(exams, { rights: "reject" }).map((e) => e.id)).toEqual(["turkey"]);
    expect(filterExams(exams, { region: "europe", verdict: "skip" }).map((e) => e.id)).toEqual(["turkey"]);
  });

  it("ignores filter values it does not know", () => {
    expect(parseFilters({ region: "mars", verdict: "park", rights: "x" })).toEqual({ verdict: "park" });
  });

  it("sums revenue per country", () => {
    const totals = revenueByCountry(exams);
    expect(totals).toEqual([
      { country: "Korea", low: 13000, mid: 78000, high: 312000 },
      { country: "Spain", low: 4500, mid: 29000, high: 91000 },
    ]);
  });

  it("counts rows per verdict", () => {
    expect(verdictCounts(exams)).toMatchObject({ park: 2, shortlist: 0, lead: 2, skip: 1 });
  });

  it("names every rights and verdict value it accepts", () => {
    expect(RIGHTS.map((r) => r.id)).toEqual(["free", "same_as_india", "licensable", "original_only", "reject", "not_checked"]);
    expect(VERDICTS.map((v) => v.id)).toEqual(["live", "in_progress", "shortlist", "lead", "park", "skip", "declined"]);
  });
});

function rev(low: number, mid: number, high: number) {
  return {
    currency: "USD",
    low: { share: 0.0025, price: 22, usd: low },
    mid: { share: 0.01, price: 33, usd: mid },
    high: { share: 0.03, price: 44, usd: high },
  };
}
