import { describe, it, expect } from "vitest";
import { selectRecentYears } from "@/lib/questions/selectRecentYears";

describe("selectRecentYears", () => {
  it("returns the N most recent years from a descending-sorted input", () => {
    expect(selectRecentYears([2025, 2024, 2023, 2022, 2021], 3)).toEqual([
      2025, 2024, 2023,
    ]);
  });

  it("returns all years when there are fewer than N available", () => {
    expect(selectRecentYears([2024, 2023], 5)).toEqual([2024, 2023]);
  });

  it("returns all years when exactly N are available", () => {
    expect(selectRecentYears([2025, 2024, 2023], 3)).toEqual([
      2025, 2024, 2023,
    ]);
  });

  it("handles unsorted input by sorting descending first", () => {
    expect(selectRecentYears([2021, 2025, 2023, 2024, 2022], 3)).toEqual([
      2025, 2024, 2023,
    ]);
  });

  it("dedupes before selecting", () => {
    expect(selectRecentYears([2025, 2025, 2024, 2024, 2023], 3)).toEqual([
      2025, 2024, 2023,
    ]);
  });

  it("returns empty for empty input", () => {
    expect(selectRecentYears([], 3)).toEqual([]);
  });

  it("returns empty for n=0", () => {
    expect(selectRecentYears([2025, 2024], 0)).toEqual([]);
  });

  it("does not mutate the input", () => {
    const input = [2021, 2025, 2023];
    const snapshot = [...input];
    selectRecentYears(input, 2);
    expect(input).toEqual(snapshot);
  });
});
