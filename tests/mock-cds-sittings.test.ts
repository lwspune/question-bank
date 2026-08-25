import { describe, it, expect } from "vitest";
import { PAPERS } from "../scripts/cds/config";
import {
  deriveCdsSittings,
  parseCdsPaperId,
  type CdsSitting,
} from "../scripts/mocks/cdsSittings";

/** A minimal PAPERS-shaped fixture (only the fields the derivation reads). */
function paper(id: string, over: Partial<{ sourceFile: string; pyqYear: number }> = {}) {
  const [year] = id.split("-");
  return {
    id,
    sourceFile: over.sourceFile ?? `Eng_CDS_${id.replace("-", "_")}.pdf`,
    pdf: `/tmp/${id}.pdf`,
    pyqYear: over.pyqYear ?? Number(year),
    pyqNote: `CDS ${id}`,
  };
}

function fixture(...ids: string[]) {
  return Object.fromEntries(ids.map((id) => [id, paper(id)]));
}

describe("parseCdsPaperId", () => {
  it("maps trailing 1 to edition I and 2 to edition II", () => {
    expect(parseCdsPaperId("2026-1")).toEqual({ year: 2026, edition: "I" });
    expect(parseCdsPaperId("2017-2")).toEqual({ year: 2017, edition: "II" });
  });

  it("throws rather than guessing an edition for an unrecognised id", () => {
    // Guessing would either mislabel the paper or collide two sittings onto one
    // slug — and a slug collision SILENTLY overwrites (the id is slugToUuid).
    for (const bad of ["2026", "2026-3", "2026-0", "26-1", "2026-1-extra", "", "2026_1"]) {
      expect(() => parseCdsPaperId(bad)).toThrow(/not of the form YYYY-N/);
    }
  });
});

describe("deriveCdsSittings", () => {
  it("gives the two sittings of one year DISTINCT slugs", () => {
    // The whole reason cdsMockSlug is edition-aware: pyq_month is NULL on every
    // CDS row, so without the edition segment 2025-1 and 2025-2 would collide.
    const [first, second] = deriveCdsSittings(fixture("2025-1", "2025-2"));
    expect(first.slug).toBe("cds-2025-i-english");
    expect(second.slug).toBe("cds-2025-ii-english");
    expect(first.slug).not.toBe(second.slug);
    expect(first.title).toBe("CDS (I) 2025 — English");
    expect(second.title).toBe("CDS (II) 2025 — English");
  });

  it("carries the config sourceFile and paper id through untouched", () => {
    const [s] = deriveCdsSittings(fixture("2024-2"));
    expect(s.key).toBe("2024-2");
    expect(s.sourceFile).toBe("Eng_CDS_2024_2.pdf");
    expect(s.year).toBe(2024);
    expect(s.edition).toBe("II");
  });

  it("orders newest year first, edition I before II within a year", () => {
    const got = deriveCdsSittings(fixture("2024-2", "2026-1", "2024-1", "2025-2"));
    expect(got.map((s) => s.key)).toEqual(["2026-1", "2025-2", "2024-1", "2024-2"]);
  });

  it("throws when the id's year disagrees with pyqYear", () => {
    // Two independent fields of one record; a mismatch means one has rotted and
    // the wrong one would file a real sitting under another year's slug.
    const bad = { "2025-1": paper("2025-1", { pyqYear: 2024 }) };
    expect(() => deriveCdsSittings(bad)).toThrow(/id says year 2025 but pyqYear is 2024/);
  });

  it("maps distinct valid ids to distinct slugs (why the dup guard can't fire today)", () => {
    // deriveCdsSittings carries a duplicate-slug refusal, but with the exact
    // YYYY-N parse the id→slug map is injective, so it is a BACKSTOP for a
    // future looser parse rather than something reachable now. This asserts the
    // injectivity that makes it unreachable — if it ever breaks, the guard is
    // what stops one sitting silently overwriting the other.
    const ids = [2024, 2025, 2026].flatMap((y) => [`${y}-1`, `${y}-2`]);
    const slugs = deriveCdsSittings(fixture(...ids)).map((s) => s.slug);
    expect(new Set(slugs).size).toBe(ids.length);
  });
});

describe("deriveCdsSittings against the real scripts/cds/config.ts", () => {
  it("derives one sitting per configured paper, all parsing cleanly", () => {
    const sittings: CdsSitting[] = deriveCdsSittings();
    expect(sittings).toHaveLength(Object.keys(PAPERS).length);
    expect(sittings).toHaveLength(19);
  });

  it("emits 19 distinct slugs and 19 distinct source files", () => {
    const all = deriveCdsSittings();
    expect(new Set(all.map((s) => s.slug)).size).toBe(19);
    expect(new Set(all.map((s) => s.sourceFile)).size).toBe(19);
  });

  it("covers both editions of every year that has two, and 2026 (I only)", () => {
    const all = deriveCdsSittings();
    const byYear = new Map<number, string[]>();
    for (const s of all) byYear.set(s.year, [...(byYear.get(s.year) ?? []), s.edition]);
    expect(byYear.get(2026)).toEqual(["I"]);
    for (const y of [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]) {
      expect(byYear.get(y)).toEqual(["I", "II"]);
    }
  });

  it("every sourceFile matches its config entry exactly", () => {
    for (const s of deriveCdsSittings()) {
      expect(s.sourceFile).toBe(PAPERS[s.key].sourceFile);
    }
  });
});
