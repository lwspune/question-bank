/**
 * The authoring window, and the dated/evergreen split.
 *
 * Both constants under test are MEASURED, not chosen, and the measurement is
 * recorded here so a later session can re-run it rather than trust a number:
 *
 *   -- how far back does a Current-Affairs PYQ reach?
 *   select (pyq_year - newest_ref) as lag_years, count(*) ...
 *      -> lag 0: 62 (56%) | lag 1: 33 (30%) | lag 2+: 15 (14%)
 *
 * For a September sitting "lag 0" is 0-8 months and "lag 1" is 9-20, so a
 * 20-month reach covers 86% of the dated questions and an 8-month reach covers
 * 56%. That is the whole argument for WINDOW_BACK_MONTHS.
 *
 * The ceiling is weaker evidence and is treated as such: only ELEVEN PYQs carry
 * an explicit month+year in the STEM (as opposed to in a solution we authored
 * ourselves, which would be measuring our own writing). Their lag runs 2 to 11
 * months and never fresher than 2 — UPSC sets the paper months ahead. Eleven
 * rows is a documented assumption, not a derived constant.
 */
import { describe, it, expect } from "vitest";
import {
  parseEventDates,
  newestEventDate,
  classifyGenre,
  evergreenCaveat,
  poolWindow,
  windowVerdict,
  eventLag,
  monthIndex,
  WINDOW_BACK_MONTHS,
  FRESHNESS_CEILING_MONTHS,
} from "@/lib/currentAffairs/window";

describe("parseEventDates", () => {
  it("reads a month-precision date", () => {
    expect(parseEventDates("Which two countries signed a deal in March 2026 ?")).toEqual([
      { year: 2026, month: 3 },
    ]);
  });

  it("reads a bare year as month-null rather than inventing a month", () => {
    expect(parseEventDates("Chandrayaan-3, in 2023, soft-landed near the lunar south pole")).toEqual(
      [{ year: 2023, month: null }]
    );
  });

  it("does not double-count the year of a month-precision date", () => {
    // "March 2026" must not also yield a bare {2026, null}.
    const got = parseEventDates("In March 2026 the agreement was signed.");
    expect(got).toEqual([{ year: 2026, month: 3 }]);
  });

  it("finds several dates in one blob", () => {
    const got = parseEventDates("The 2024 report was published in January 2025.");
    expect(got).toContainEqual({ year: 2024, month: null });
    expect(got).toContainEqual({ year: 2025, month: 1 });
  });

  it("ignores numbers that are not plausible event years", () => {
    expect(parseEventDates("A force of 1947 newtons acts on the body")).toEqual([]);
    expect(parseEventDates("The target was struck at 2400 metres")).toEqual([]);
  });

  it("returns nothing for an evergreen stem", () => {
    expect(parseEventDates("PM MITRA Parks relate to which one of the following industries?")).toEqual(
      []
    );
  });
});

describe("newestEventDate", () => {
  it("returns the latest year", () => {
    expect(newestEventDate("Events of 2019 and of 2024 are compared")).toEqual({
      year: 2024,
      month: null,
    });
  });

  it("keeps month precision when the newest year has a month somewhere", () => {
    // A bare "2026" could mean December, but preferring the precise reading is
    // what lets windowVerdict answer at all instead of shrugging "partial".
    expect(newestEventDate("Through 2026, and specifically in March 2026, ...")).toEqual({
      year: 2026,
      month: 3,
    });
  });

  it("takes the latest month within the newest year", () => {
    expect(newestEventDate("In January 2026 and again in July 2026")).toEqual({
      year: 2026,
      month: 7,
    });
  });

  it("is null when nothing is dated", () => {
    expect(newestEventDate("Which agency releases the S.A.F.E. Accommodation report?")).toBeNull();
  });
});

describe("classifyGenre", () => {
  it("calls a year-bearing question dated", () => {
    expect(classifyGenre("In February 2024, India scrapped the Free Movement Regime")).toBe("dated");
  });

  it("calls a named-entity lookup evergreen", () => {
    expect(classifyGenre("Which one of the following statements about 'REJUPAVE' is correct?")).toBe(
      "evergreen"
    );
    expect(classifyGenre("Ramanujan Fellowship was launched under the :")).toBe("evergreen");
    expect(
      classifyGenre("Which of the following countries is not a member of the International Big Cat Alliance ?")
    ).toBe("evergreen");
  });
});

describe("evergreenCaveat", () => {
  it("flags a month with no year — the classifier cannot place it", () => {
    expect(evergreenCaveat("The exercise was held in August at Jaisalmer")).toBeTruthy();
  });

  it("flags a floating recency word", () => {
    expect(evergreenCaveat("Aadi Mahotsav held recently in New Delhi")).toBeTruthy();
    expect(evergreenCaveat("eSanjeevani was latest integrated with")).toBeTruthy();
  });

  it("flags a two-digit fiscal span that carries no full year", () => {
    expect(evergreenCaveat("the 2025-26 cycle")).toBeTruthy();
  });

  it("is silent on a genuinely timeless stem", () => {
    expect(
      evergreenCaveat("What is the nickname of the National Men's Hockey Team of Australia ?")
    ).toBeNull();
  });
});

describe("poolWindow", () => {
  it("spans T-20 months to T-2 months", () => {
    const w = poolWindow("2026-09");
    expect(w.fromIndex).toBe(monthIndex(2025, 1));
    expect(w.toIndex).toBe(monthIndex(2026, 7));
  });

  it("handles a year boundary on an April sitting", () => {
    const w = poolWindow("2027-04");
    expect(w.fromIndex).toBe(monthIndex(2025, 8));
    expect(w.toIndex).toBe(monthIndex(2027, 2));
  });

  it("is built from the two documented constants", () => {
    expect(WINDOW_BACK_MONTHS).toBe(20);
    expect(FRESHNESS_CEILING_MONTHS).toBe(2);
    const w = poolWindow("2026-09");
    expect(w.toIndex - w.fromIndex).toBe(WINDOW_BACK_MONTHS - FRESHNESS_CEILING_MONTHS);
  });
});

describe("windowVerdict", () => {
  const w = poolWindow("2026-09"); // 2025-01 .. 2026-07

  it("accepts a month-precision date inside", () => {
    expect(windowVerdict({ year: 2026, month: 3 }, w)).toBe("in");
  });

  it("rejects one that is too fresh for the paper to have been set", () => {
    expect(windowVerdict({ year: 2026, month: 8 }, w)).toBe("out");
  });

  it("rejects one that is too old", () => {
    expect(windowVerdict({ year: 2024, month: 11 }, w)).toBe("out");
  });

  it("accepts a bare year wholly inside", () => {
    expect(windowVerdict({ year: 2025, month: null }, w)).toBe("in");
  });

  it("calls a straddling bare year PARTIAL rather than guessing", () => {
    // 2026 runs Jan..Dec; the window covers Jan..Jul. Nothing in the text says which.
    expect(windowVerdict({ year: 2026, month: null }, w)).toBe("partial");
  });

  it("rejects a bare year with no overlap at all", () => {
    expect(windowVerdict({ year: 2023, month: null }, w)).toBe("out");
  });
});

describe("eventLag", () => {
  it("is exact for a month-precision date", () => {
    expect(eventLag({ year: 2026, month: 3 }, "2026-09")).toEqual({ minMonths: 6, maxMonths: 6 });
  });

  it("is a span for a bare year, because the year is a span", () => {
    // Dec 2025 is 9 months before Sep 2026; Jan 2025 is 20.
    expect(eventLag({ year: 2025, month: null }, "2026-09")).toEqual({
      minMonths: 9,
      maxMonths: 20,
    });
  });

  it("clamps a bare year containing the exam month at zero rather than going negative", () => {
    expect(eventLag({ year: 2026, month: null }, "2026-09")).toEqual({ minMonths: 0, maxMonths: 8 });
  });
});
