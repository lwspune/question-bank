import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  NDA_CUTOFFS,
  cutoffFor,
  getSitting,
  writtenCutoffRange,
  type NdaCutoffSitting,
} from "@/lib/exam/cutoffs/nda";

/**
 * The cut-off corpus is 20 UPSC PDFs (NDA & NA I + II, 2016-2025). Three facts
 * make this data non-obvious, and each one gets pinned by name below rather
 * than left to a shape check:
 *
 *  1. The per-subject minimum is NOT the constant 25% every coaching site
 *     quotes -- four sittings published 20%.
 *  2. NDA II 2025 is the first sitting with SEPARATE male and female cut-offs,
 *     and the first with decimal marks. A single number per stage cannot hold
 *     it, which is why the mark is a list of (audience, marks) pairs.
 *  3. Eight sittings never published a recommended-count or vacancy table at
 *     all. That is stored as null, not 0 -- a 0 would read as "nobody was
 *     recommended", which is a different and false claim.
 */

const SOURCES: Record<string, { sourceFile: string; text: string }> = JSON.parse(
  readFileSync(resolve(__dirname, "../scripts/nda-cutoffs/sources.json"), "utf-8")
);

/** Every sitting UPSC has held since 2016, oldest first. */
const EXPECTED_SLUGS = [
  "nda-2016-i",
  "nda-2016-ii",
  "nda-2017-i",
  "nda-2017-ii",
  "nda-2018-i",
  "nda-2018-ii",
  "nda-2019-i",
  "nda-2019-ii",
  "nda-2020-i",
  "nda-2020-ii",
  "nda-2021-i",
  "nda-2021-ii",
  "nda-2022-i",
  "nda-2022-ii",
  "nda-2023-i",
  "nda-2023-ii",
  "nda-2024-i",
  "nda-2024-ii",
  "nda-2025-i",
  "nda-2025-ii",
];

/** The sittings for which UPSC published no recommendation table. */
const NO_RECOMMENDATION_TABLE = [
  "nda-2016-i",
  "nda-2016-ii",
  "nda-2017-i",
  "nda-2017-ii",
  "nda-2018-i",
  "nda-2018-ii",
  "nda-2019-ii",
  "nda-2020-ii",
];

describe("NDA_CUTOFFS corpus completeness", () => {
  it("carries exactly the 20 sittings 2016-I through 2025-II", () => {
    expect(NDA_CUTOFFS).toHaveLength(20);
  });

  // Reconcile BOTH ways: a one-directional check passes when the module has an
  // extra sitting, or when it silently drops one and duplicates another.
  it("has no missing sittings", () => {
    const have = new Set(NDA_CUTOFFS.map((s) => s.slug));
    expect(EXPECTED_SLUGS.filter((slug) => !have.has(slug))).toEqual([]);
  });

  it("has no unexpected sittings", () => {
    const expected = new Set(EXPECTED_SLUGS);
    expect(NDA_CUTOFFS.map((s) => s.slug).filter((s) => !expected.has(s))).toEqual([]);
  });

  it("has unique slugs", () => {
    expect(new Set(NDA_CUTOFFS.map((s) => s.slug)).size).toBe(NDA_CUTOFFS.length);
  });

  it("is ordered newest-first", () => {
    const keys = NDA_CUTOFFS.map((s) => s.year * 10 + s.sitting);
    expect(keys).toEqual([...keys].sort((a, b) => b - a));
  });

  it("derives its slug from year + sitting", () => {
    for (const s of NDA_CUTOFFS) {
      expect(s.slug).toBe(`nda-${s.year}-${s.sitting === 1 ? "i" : "ii"}`);
    }
  });

  it("covers both sittings of every year 2016-2025", () => {
    for (let year = 2016; year <= 2025; year += 1) {
      const both = NDA_CUTOFFS.filter((s) => s.year === year).map((s) => s.sitting);
      expect([...both].sort()).toEqual([1, 2]);
    }
  });
});

describe("per-subject minimum is stored, not assumed", () => {
  it("is always 20 or 25", () => {
    for (const s of NDA_CUTOFFS) {
      expect([20, 25]).toContain(s.subjectMinimumPct);
    }
  });

  // The headline finding. Pinned BY NAME so a future "simplify to a constant"
  // refactor fails loudly instead of quietly making four sittings wrong.
  it("pins the four sittings that published 20%, not 25%", () => {
    const twenty = NDA_CUTOFFS.filter((s) => s.subjectMinimumPct === 20).map((s) => s.slug);
    expect([...twenty].sort()).toEqual(
      ["nda-2016-ii", "nda-2022-ii", "nda-2023-ii", "nda-2024-i"].sort()
    );
  });
});

describe("gender-split cut-offs (NDA II 2025)", () => {
  const s = getSitting("nda-2025-ii")!;

  it("is the only sitting with more than one audience", () => {
    const split = NDA_CUTOFFS.filter((x) => x.writtenCutoff.length > 1).map((x) => x.slug);
    expect(split).toEqual(["nda-2025-ii"]);
  });

  it("pins both written cut-offs exactly, decimals included", () => {
    expect(cutoffFor(s, "male").written).toBe(304.9);
    expect(cutoffFor(s, "female").written).toBe(358.84);
  });

  it("pins both final cut-offs exactly, decimals included", () => {
    expect(cutoffFor(s, "male").final).toBe(666.01);
    expect(cutoffFor(s, "female").final).toBe(737.4);
  });

  it("records the male/female split of the recommended candidates", () => {
    expect(s.recommended).toEqual({ total: 742, male: 651, female: 91 });
  });

  it("has no 'all' figure to fall back to", () => {
    expect(s.writtenCutoff.some((m) => m.audience === "all")).toBe(false);
  });

  // Inventing one -- picking the male figure, or the higher of the two -- is
  // the exact flattening the CutoffMark[] shape exists to prevent, so the
  // ambiguous query throws instead of quietly answering.
  it("refuses to invent a single 'all' figure for a split sitting", () => {
    expect(() => cutoffFor(s, "all")).toThrow(/separate cut-offs per audience/);
  });
});

describe("single-audience sittings", () => {
  const single = NDA_CUTOFFS.filter((s) => s.slug !== "nda-2025-ii");

  it("use the 'all' audience, never 'male'", () => {
    for (const s of single) {
      expect(s.writtenCutoff.map((m) => m.audience)).toEqual(["all"]);
      expect(s.finalCutoff.map((m) => m.audience)).toEqual(["all"]);
    }
  });

  // A caller asking for the female cut-off of a 2021 sitting must get the
  // published figure, not undefined -- UPSC applied one cut-off to everyone.
  it("answer an audience-specific query with the published figure", () => {
    const s = getSitting("nda-2021-ii")!;
    expect(cutoffFor(s, "female").written).toBe(355);
    expect(cutoffFor(s, "male").written).toBe(355);
    expect(cutoffFor(s, "all").written).toBe(355);
  });
});

describe("absent data is null, never zero", () => {
  it("pins the eight sittings with no recommendation table", () => {
    const absent = NDA_CUTOFFS.filter((s) => s.recommended === null).map((s) => s.slug);
    expect([...absent].sort()).toEqual([...NO_RECOMMENDATION_TABLE].sort());
  });

  it("leaves vacancies and wings null for exactly those sittings", () => {
    for (const s of NDA_CUTOFFS) {
      const published = !NO_RECOMMENDATION_TABLE.includes(s.slug);
      expect(s.vacancies === null).toBe(!published);
      expect(s.wings === null).toBe(!published);
    }
  });
});

describe("mark ranges and internal coherence", () => {
  it("keeps written marks inside the 900-mark paper", () => {
    for (const s of NDA_CUTOFFS) {
      for (const m of s.writtenCutoff) {
        expect(m.marks).toBeGreaterThan(0);
        expect(m.marks).toBeLessThanOrEqual(900);
      }
    }
  });

  it("keeps final marks inside the 1800-mark aggregate", () => {
    for (const s of NDA_CUTOFFS) {
      for (const m of s.finalCutoff) {
        expect(m.marks).toBeGreaterThan(0);
        expect(m.marks).toBeLessThanOrEqual(1800);
      }
    }
  });

  // The final stage adds the SSB interview (900 more marks) to the written
  // total, so the final cut-off must exceed the written one for every audience.
  it("has a final cut-off above the written cut-off for every audience", () => {
    for (const s of NDA_CUTOFFS) {
      for (const m of s.writtenCutoff) {
        expect(cutoffFor(s, m.audience).final).toBeGreaterThan(m.marks);
      }
    }
  });

  it("lists the same audiences for the written and final stages", () => {
    for (const s of NDA_CUTOFFS) {
      expect(s.finalCutoff.map((m) => m.audience)).toEqual(
        s.writtenCutoff.map((m) => m.audience)
      );
    }
  });

  it("recommends at least as many candidates as there are vacancies", () => {
    for (const s of NDA_CUTOFFS) {
      if (s.recommended === null || s.vacancies === null) continue;
      expect(s.recommended.total).toBeGreaterThanOrEqual(s.vacancies);
    }
  });

  it("splits the recommended total exactly when a split is recorded", () => {
    for (const s of NDA_CUTOFFS) {
      if (!s.recommended || s.recommended.male === null) continue;
      expect(s.recommended.male + (s.recommended.female ?? 0)).toBe(s.recommended.total);
    }
  });
});

describe("wing vacancy tables", () => {
  it("sum to the published total for every sitting that has one", () => {
    for (const s of NDA_CUTOFFS) {
      if (s.wings === null) continue;
      const sum = s.wings.reduce((n, w) => n + w.vacancies, 0);
      expect(sum, `${s.slug} wing sum`).toBe(s.vacancies);
    }
  });

  it("never allocates more female seats than the wing has", () => {
    for (const s of NDA_CUTOFFS) {
      for (const w of s.wings ?? []) {
        if (w.female === null) continue;
        expect(w.female).toBeLessThanOrEqual(w.vacancies);
      }
    }
  });

  // 2019, 2020-I and 2021-I print Air Force as ONE line ("120 including 28
  // ground duties"); from 2021-II it is split into Flying / GD-Tech / GD-Non-
  // Tech. The wing table is therefore NOT comparable across that seam, and the
  // flag records which shape a row is in so a consumer can refuse to compare.
  it("flags which Air Force shape each sitting uses", () => {
    const lumped = NDA_CUTOFFS.filter((s) => s.wings && s.airForceShape === "lumped");
    expect(lumped.map((s) => s.slug).sort()).toEqual(
      ["nda-2019-i", "nda-2020-i", "nda-2021-i"].sort()
    );
    for (const s of NDA_CUTOFFS) {
      if (s.wings === null) expect(s.airForceShape).toBeNull();
    }
  });
});

describe("provenance: every claimed figure appears in the source PDF text", () => {
  it("names a source file that exists in sources.json", () => {
    for (const s of NDA_CUTOFFS) {
      expect(SOURCES[s.slug], `${s.slug} missing from sources.json`).toBeTruthy();
      expect(s.sourceFile).toBe(SOURCES[s.slug].sourceFile);
    }
  });

  /**
   * A containment probe against the text extracted from the UPSC PDF. It cannot
   * prove a number landed in the RIGHT field -- the pins above do that -- but it
   * does catch a mistyped digit, which is the realistic failure when 20 tables
   * are transcribed by hand. UPSC pads some figures to three digits ("042"),
   * so each number is matched in both its bare and zero-padded form.
   */
  const appears = (slug: string, value: number): boolean => {
    const text = SOURCES[slug].text;
    const bare = String(value);
    const forms = [bare];
    if (Number.isInteger(value) && value < 100) forms.push(bare.padStart(3, "0"));
    // 304.9 is printed "304.90"; a trailing zero is lost by JS number parsing.
    if (!Number.isInteger(value)) forms.push(value.toFixed(2));
    return forms.some((f) => new RegExp(`(?<![\\d.])${f.replace(".", "\\.")}(?![\\d])`).test(text));
  };

  it("finds every written and final cut-off in its own source text", () => {
    for (const s of NDA_CUTOFFS) {
      for (const m of s.writtenCutoff) {
        expect(appears(s.slug, m.marks), `${s.slug} written ${m.marks}`).toBe(true);
      }
      for (const m of s.finalCutoff) {
        expect(appears(s.slug, m.marks), `${s.slug} final ${m.marks}`).toBe(true);
      }
    }
  });

  it("finds the per-subject minimum in its own source text", () => {
    for (const s of NDA_CUTOFFS) {
      expect(
        new RegExp(`${s.subjectMinimumPct}\\s*%`).test(SOURCES[s.slug].text),
        `${s.slug} subject minimum ${s.subjectMinimumPct}%`
      ).toBe(true);
    }
  });

  it("finds the recommended count and vacancy total in its own source text", () => {
    for (const s of NDA_CUTOFFS) {
      if (s.recommended !== null) {
        expect(appears(s.slug, s.recommended.total), `${s.slug} recommended`).toBe(true);
      }
      if (s.vacancies !== null) {
        expect(appears(s.slug, s.vacancies), `${s.slug} vacancies`).toBe(true);
      }
    }
  });
});

describe("writtenCutoffRange", () => {
  it("reports the corpus min and max across all audiences", () => {
    const range = writtenCutoffRange(NDA_CUTOFFS);
    expect(range).not.toBeNull();
    expect(range!.min).toBe(229); // NDA II 2016
    expect(range!.max).toBe(360); // NDA I 2022
  });

  it("returns null for an empty corpus rather than Infinity", () => {
    expect(writtenCutoffRange([] as NdaCutoffSitting[])).toBeNull();
  });
});
