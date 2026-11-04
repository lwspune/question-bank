import { describe, expect, it } from "vitest";
import { compareSittings, mhSittingLabel, ndaSittingLabel } from "@/lib/homework/sittings";

describe("compareSittings", () => {
  it("orders MH papers by date, not alphabetically", () => {
    const got = ["Jul 2024", "Mar 2016", "Feb 2024", "Jun 2026", "Feb 2020", "Feb 2026"].sort(compareSittings);
    expect(got).toEqual(["Mar 2016", "Feb 2020", "Feb 2024", "Jul 2024", "Feb 2026", "Jun 2026"]);
  });

  it("orders CBSE years as before", () => {
    expect(["2025", "2022", "2024"].sort(compareSittings)).toEqual(["2022", "2024", "2025"]);
  });

  it("orders NDA papers by year, then NDA 1 before NDA 2", () => {
    const got = ["NDA 2 2024", "NDA 1 2026", "NDA 1 2017", "NDA 1 2024", "NDA 2 2017"].sort(compareSittings);
    expect(got).toEqual(["NDA 1 2017", "NDA 2 2017", "NDA 1 2024", "NDA 2 2024", "NDA 1 2026"]);
  });

  it("refuses an NDA paper number other than 1 or 2", () => {
    expect(() => ["NDA 3 2024", "NDA 1 2024"].sort(compareSittings)).toThrow(/NDA 3 2024/);
  });

  it("refuses a label it cannot date", () => {
    expect(() => ["Spring 2024", "2022"].sort(compareSittings)).toThrow(/Spring 2024/);
  });
});

describe("mhSittingLabel", () => {
  it("names a paper by its month and year", () => {
    expect(mhSittingLabel(2024, "July")).toBe("Jul 2024");
    expect(mhSittingLabel(2020, "February")).toBe("Feb 2020");
  });

  it("files a 2019 row with no month under the one 2019 paper, March", () => {
    expect(mhSittingLabel(2019, null)).toBe("Mar 2019");
  });

  it("refuses any other row with no month", () => {
    expect(() => mhSittingLabel(2024, null)).toThrow(/2024/);
  });
});

describe("ndaSittingLabel", () => {
  it("names the April paper NDA 1 and the September paper NDA 2", () => {
    expect(ndaSittingLabel(2024, "Apr")).toBe("NDA 1 2024");
    expect(ndaSittingLabel(2026, "Sep")).toBe("NDA 2 2026");
    expect(ndaSittingLabel(2019, "September")).toBe("NDA 2 2019");
  });

  it("refuses a row with no month or another month", () => {
    expect(() => ndaSittingLabel(2024, null)).toThrow(/2024/);
    expect(() => ndaSittingLabel(2024, "Jan")).toThrow(/Jan/);
  });
});
