import { describe, expect, it } from "vitest";
import { cdsSittingLabel, cetSittingLabel, compareSittings, mhSittingLabel, ndaSittingLabel, sscSittingLabel, sscTier2SittingLabel } from "@/lib/homework/sittings";

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

  it("orders CDS papers by year, then CDS 1 before CDS 2", () => {
    const got = ["CDS 2 2024", "CDS 1 2026", "CDS 2 2016", "CDS 1 2024", "CDS 1 2017"].sort(compareSittings);
    expect(got).toEqual(["CDS 2 2016", "CDS 1 2017", "CDS 1 2024", "CDS 2 2024", "CDS 1 2026"]);
  });

  it("refuses a CDS paper number other than 1 or 2", () => {
    expect(() => ["CDS 3 2024", "CDS 1 2024"].sort(compareSittings)).toThrow(/CDS 3 2024/);
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

describe("cdsSittingLabel", () => {
  it("names the April paper CDS 1 and the September paper CDS 2", () => {
    expect(cdsSittingLabel(2024, "April")).toBe("CDS 1 2024");
    expect(cdsSittingLabel(2016, "September")).toBe("CDS 2 2016");
  });

  it("refuses a row with no month or another month", () => {
    expect(() => cdsSittingLabel(2024, null)).toThrow(/2024/);
    expect(() => cdsSittingLabel(2024, "Feb")).toThrow(/Feb/);
  });
});

// MHT-CET (2026-11-04): a paper is one SHIFT, named by its date and shift as
// students know it. The bank's notes vary by year ("10th May Shift 1",
// "19 April Shift II", and only "May Shift 1" / "Shift 1" for 2021-2022, which
// held one paper each).
describe("cetSittingLabel", () => {
  it("names a shift by its day, month, year and shift number", () => {
    expect(cetSittingLabel(2023, "May", "10th May Shift 1")).toBe("10 May 2023 S1");
    expect(cetSittingLabel(2025, "April", "19 April Shift II")).toBe("19 Apr 2025 S2");
    expect(cetSittingLabel(2026, "May", "12 May Shift I")).toBe("12 May 2026 S1");
  });

  it("names a year's only paper by its month when the note carries no day", () => {
    expect(cetSittingLabel(2021, "May", "May Shift 1")).toBe("May 2021 S1");
    expect(cetSittingLabel(2022, "May", "Shift 1")).toBe("May 2022 S1");
  });

  it("takes the month from the note when the note names one (six 2025 rows carry month May for an April sitting)", () => {
    expect(cetSittingLabel(2025, "May", "19 April Shift II")).toBe("19 Apr 2025 S2");
  });

  it("refuses a note it cannot read, never guessing", () => {
    expect(() => cetSittingLabel(2024, "May", "Morning paper")).toThrow(/shift/);
    expect(() => cetSittingLabel(2024, null, "Shift 1")).toThrow(/month/);
  });
});

describe("compareSittings with MHT-CET shifts", () => {
  it("orders shifts by date, then shift, across months and years", () => {
    const labels = ["12 May 2026 S1", "10 May 2023 S2", "May 2021 S1", "20 Apr 2026 S2", "10 May 2023 S1", "19 Apr 2025 S2", "9 May 2023 S1"];
    expect([...labels].sort(compareSittings)).toEqual([
      "May 2021 S1", "9 May 2023 S1", "10 May 2023 S1", "10 May 2023 S2", "19 Apr 2025 S2", "20 Apr 2026 S2", "12 May 2026 S1",
    ]);
  });

  it("keeps the other exams' order as it was", () => {
    expect(["2024", "2023"].sort(compareSittings)).toEqual(["2023", "2024"]);
    expect(["NDA 2 2024", "NDA 1 2024"].sort(compareSittings)).toEqual(["NDA 1 2024", "NDA 2 2024"]);
  });
});

// SSC CGL (2026-11-06): a paper is one shift, up to four a day, named like an
// MHT-CET shift ("14 Jul 2023 S3") from the note the ingestion wrote.
describe("sscSittingLabel", () => {
  it("names a shift by its date and shift from the note", () => {
    expect(sscSittingLabel("Tier I, 14 Jul 2023, Shift 1")).toBe("14 Jul 2023 S1");
    expect(sscSittingLabel("Tier I, 9 Sep 2024, Shift 4")).toBe("9 Sep 2024 S4");
  });

  it("refuses a note it cannot read, never guessing", () => {
    expect(() => sscSittingLabel("Tier I, 14 Jul 2023")).toThrow(/14 Jul 2023/);
    expect(() => sscSittingLabel(null)).toThrow(/note/);
    expect(() => sscSittingLabel("Tier I, 14 Jul 2023, Shift 5")).toThrow(/Shift 5/);
  });
});

describe("compareSittings with four shifts a day", () => {
  it("keeps every shift of a day before the next day's first shift", () => {
    const labels = ["15 Jul 2023 S1", "14 Jul 2023 S4", "14 Jul 2023 S3", "14 Jul 2023 S1", "14 Jul 2023 S2"];
    expect([...labels].sort(compareSittings)).toEqual([
      "14 Jul 2023 S1", "14 Jul 2023 S2", "14 Jul 2023 S3", "14 Jul 2023 S4", "15 Jul 2023 S1",
    ]);
  });

  it("keeps the last day of a month before the next month", () => {
    expect(["1 Aug 2023 S1", "31 Jul 2023 S4"].sort(compareSittings)).toEqual(["31 Jul 2023 S4", "1 Aug 2023 S1"]);
  });
});

// SSC CGL Tier II (2026-11-06): one paper a day, named by its date, "18 Jan 2025 Tier II".
describe("sscTier2SittingLabel", () => {
  it("names a Tier II paper by its date from the note", () => {
    expect(sscTier2SittingLabel("Tier II (CGL 2024), 18 Jan 2025")).toBe("18 Jan 2025 Tier II");
    expect(sscTier2SittingLabel("Tier II (CGL 2019), 15 Nov 2020")).toBe("15 Nov 2020 Tier II");
  });

  it("refuses a note it cannot read, never guessing", () => {
    expect(() => sscTier2SittingLabel("Tier I, 14 Jul 2023, Shift 1")).toThrow(/Tier I, 14 Jul 2023/);
    expect(() => sscTier2SittingLabel(null)).toThrow(/note/);
  });

  it("sorts Tier II papers by date, the CGL 2022 papers of March 2023 in order", () => {
    const got = ["18 Jan 2026 Tier II", "7 Mar 2023 Tier II", "15 Nov 2020 Tier II", "2 Mar 2023 Tier II", "26 Oct 2023 Tier II"].sort(compareSittings);
    expect(got).toEqual(["15 Nov 2020 Tier II", "2 Mar 2023 Tier II", "7 Mar 2023 Tier II", "26 Oct 2023 Tier II", "18 Jan 2026 Tier II"]);
  });
});
