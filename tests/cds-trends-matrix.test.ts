import { describe, expect, it } from "vitest";
import { parseCdsSitting, buildCdsMatrix, type CdsRow } from "../scripts/lib/cdsTrendsMatrix";

describe("parseCdsSitting", () => {
  it("reads CDS I and CDS II from the note", () => {
    expect(parseCdsSitting(2017, "CDS (I) 2017 — Elementary Mathematics")).toEqual({ year: 2017, sitting: 1 });
    expect(parseCdsSitting(2016, "CDS (II) 2016 — Elementary Mathematics")).toEqual({ year: 2016, sitting: 2 });
  });

  it("refuses a note that names no sitting", () => {
    expect(parseCdsSitting(2017, "Elementary Mathematics 2017")).toBeNull();
    expect(parseCdsSitting(2017, null)).toBeNull();
  });

  it("refuses a note whose year disagrees with pyq_year", () => {
    // A guessed column reads on the page exactly like a measured one.
    expect(parseCdsSitting(2018, "CDS (I) 2017 — Elementary Mathematics")).toBeNull();
  });

  it("does not read (III) as (I) or (II)", () => {
    expect(parseCdsSitting(2017, "CDS (III) 2017")).toBeNull();
  });
});

const row = (year: number, s: "I" | "II", chapter: string, difficulty = "MODERATE"): CdsRow => ({
  pyq_year: year,
  pyq_note: `CDS (${s}) ${year} — Elementary Mathematics`,
  chapter,
  difficulty,
});

describe("buildCdsMatrix", () => {
  const rows: CdsRow[] = [
    row(2017, "II", "Triangles", "HARD"),
    row(2017, "I", "Triangles"),
    row(2017, "I", "Circles"),
    row(2016, "II", "Circles", "HARD"),
    row(2016, "II", "Circles"),
  ];
  const built = buildCdsMatrix(rows);

  it("orders papers by year, then sitting", () => {
    expect(built.papers.map((p) => p.id)).toEqual(["2016-2", "2017-1", "2017-2"]);
    expect(built.papers[0]).toMatchObject({ year: 2016, label: "II", title: "CDS (II) 2016" });
  });

  it("counts each chapter per paper, with a measured zero where absent", () => {
    const circles = built.rows.find((r) => r.chapter === "Circles")!;
    expect(circles.counts).toEqual([2, 1, 0]);
    expect(circles.total).toBe(3);
  });

  it("puts the heaviest chapter first, ties by name", () => {
    expect(built.rows.map((r) => r.chapter)).toEqual(["Circles", "Triangles"]);
  });

  it("carries total and HARD per paper", () => {
    expect(built.byPaper).toEqual([
      { id: "2016-2", total: 2, hard: 1 },
      { id: "2017-1", total: 2, hard: 0 },
      { id: "2017-2", total: 1, hard: 1 },
    ]);
  });

  it("the column sums reconcile to the row count", () => {
    const sum = built.rows.reduce((s, r) => s + r.total, 0);
    expect(sum).toBe(rows.length);
    expect(built.unparsed).toEqual([]);
  });

  it("reports rows it cannot place instead of dropping them silently", () => {
    const bad = buildCdsMatrix([...rows, { pyq_year: 2017, pyq_note: "mystery", chapter: "Circles", difficulty: "EASY" }]);
    expect(bad.unparsed).toEqual([{ pyq_year: 2017, pyq_note: "mystery" }]);
  });
});
