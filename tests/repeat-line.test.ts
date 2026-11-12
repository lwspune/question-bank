import { describe, expect, it } from "vitest";
import { repeatLine, pickRepeatGroup, type RepeatGroup } from "@/lib/questions/repeatLine";

const g = (tier: "repeat" | "type", sittings: string[], n = 7, planSlug = "nda-maths"): RepeatGroup => ({
  tier,
  sittings,
  n,
  planSlug,
});

describe("pickRepeatGroup", () => {
  it("shows nothing for a question in no group", () => {
    expect(pickRepeatGroup([])).toBeNull();
  });

  it("needs an exact repeat in 2+ papers", () => {
    expect(pickRepeatGroup([g("repeat", ["NDA 1 2017"])])).toBeNull();
    expect(pickRepeatGroup([g("repeat", ["NDA 1 2017", "NDA 2 2024"])])?.tier).toBe("repeat");
  });

  it("needs a type asked 5+ times", () => {
    expect(pickRepeatGroup([g("type", ["2019", "2020", "2021", "2022"])])).toBeNull();
    expect(pickRepeatGroup([g("type", ["2019", "2020", "2021", "2022", "2023"])])?.tier).toBe("type");
  });

  it("prefers an exact repeat over a type asked more often", () => {
    const repeat = g("repeat", ["NDA 1 2017", "NDA 2 2024"], 1);
    const type = g("type", ["a 2017", "b 2018", "c 2019", "d 2020", "e 2021", "f 2022", "g 2023", "h 2024"], 2);
    expect(pickRepeatGroup([type, repeat])).toBe(repeat);
  });

  it("among the same kind, picks the one asked most", () => {
    const two = g("repeat", ["NDA 1 2017", "NDA 2 2024"], 1);
    const three = g("repeat", ["NDA 1 2017", "NDA 1 2021", "NDA 2 2024"], 2);
    expect(pickRepeatGroup([two, three])).toBe(three);
  });
});

describe("repeatLine", () => {
  it("lists up to 4 papers of an exact repeat and counts the ones with new numbers", () => {
    expect(repeatLine([g("repeat", ["NDA 1 2017*", "NDA 1 2021*", "NDA 2 2024"], 196)])).toEqual({
      kind: "repeat",
      count: 3,
      lead: "Asked in 3 papers",
      rest: ": NDA 1 2017, NDA 1 2021, NDA 2 2024 (new numbers in 2)",
      href: "/homework/nda-maths/group/196",
      linkText: "See all 3",
    });
  });

  it("leaves out the new-numbers note when every paper printed it the same", () => {
    expect(repeatLine([g("repeat", ["27 Jul 2022", "24 Jan 2025", "21 Jan 2026 S2"])])?.rest).toBe(
      ": 27 Jul 2022, 24 Jan 2025, 21 Jan 2026 S2"
    );
  });

  it("says years, not papers, where the plan stores bare years (CBSE)", () => {
    const line = repeatLine([g("repeat", ["2022", "2023*", "2025"], 4, "cbse-12-physics")]);
    expect(line?.lead).toBe("Asked in 3 years");
    expect(line?.rest).toBe(": 2022, 2023, 2025 (new numbers in 1)");
  });

  it("gives a year range instead of a list past 4 papers", () => {
    const line = repeatLine([
      g("repeat", ["10 May 2023 S1", "13 May 2024 S2*", "19 Apr 2025 S2", "15 May 2026 S1", "15 May 2026 S2"]),
    ]);
    expect(line?.lead).toBe("Asked in 5 papers");
    expect(line?.rest).toBe(", 2023 to 2026 (new numbers in 1)");
    expect(line?.linkText).toBe("See all 5");
  });

  it("words a type as questions like this, never as this question", () => {
    const line = repeatLine([
      g(
        "type",
        ["May 2022 S1", "3 May 2023 S1", "3 May 2023 S2", "14 May 2024 S2", "19 Apr 2025 S1", "19 Apr 2026 S1", "13 May 2026 S2", "15 May 2026 S1", "15 May 2026 S2"],
        50,
        "mht-cet-physics"
      ),
    ]);
    expect(line).toEqual({
      kind: "type",
      count: 9,
      lead: "Questions like this were asked 9 times",
      rest: ", 2022 to 2026, each with its own numbers",
      href: "/homework/mht-cet-physics/group/50",
      linkText: "See all 9",
    });
  });

  it("says 'in <year>' when every paper is from one year", () => {
    const line = repeatLine([g("type", ["1 Feb 2024", "27 Jan 2024", "29 Jan 2024", "30 Jan 2024", "9 Apr 2024"])]);
    expect(line?.rest).toBe(" in 2024, each with its own numbers");
  });

  it("drops the range rather than guess when a paper's name carries no year", () => {
    const line = repeatLine([g("repeat", ["Set A", "Set B", "Set C", "Set D", "Set E"])]);
    expect(line?.lead).toBe("Asked in 5 papers");
    expect(line?.rest).toBe("");
  });

  it("returns null when no group qualifies", () => {
    expect(repeatLine([g("type", ["2019", "2020"])])).toBeNull();
  });
});
