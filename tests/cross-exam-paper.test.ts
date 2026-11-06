/**
 * How an exam twin names its paper: the sitting the student knows, reusing the
 * homework plans' labels (lib/homework/sittings.ts) so the two never disagree.
 */
import { describe, it, expect } from "vitest";
import { twinPaper } from "@/lib/crossExam/paper";

describe("twinPaper", () => {
  it("names an NDA paper by sitting, newest ordering last month first", () => {
    expect(twinPaper("NDA", 2023, "September", null)).toEqual({
      examLabel: "NDA",
      paper: "NDA 2 2023",
      paperOrder: 202309,
    });
    expect(twinPaper("NDA", 2019, "April", null).paper).toBe("NDA 1 2019");
  });

  it("prefixes an MHT-CET shift with the exam", () => {
    expect(twinPaper("MHT-CET", 2025, "May", "10th May Shift 2")).toMatchObject({
      examLabel: "MHT-CET",
      paper: "MHT-CET 10 May 2025 S2",
      paperOrder: 202505,
    });
  });

  it("falls back to exam, month and year for an exam without its own labeller", () => {
    expect(twinPaper("JEE Mains", 2024, "January", "29 Jan Shift 2").paper).toBe("JEE Mains Jan 2024");
    expect(twinPaper("NEET", 2023, null, null)).toMatchObject({ paper: "NEET 2023", paperOrder: 202300 });
  });

  it("never throws on a row its labeller cannot read", () => {
    expect(twinPaper("NDA", 2021, null, null).paper).toBe("NDA 2021");
    expect(twinPaper("MHT-CET", 2024, "May", "no shift here").paper).toBe("MHT-CET May 2024");
  });
});
