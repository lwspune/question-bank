import { describe, expect, it } from "vitest";
import { deriveUceedSittings, uceedSittings } from "../scripts/mocks/uceedSittings";

describe("UCEED sittings: one Part A mock per year in the bank", () => {
  it("names each year's paper by its source file, slug and title", () => {
    const [s] = deriveUceedSittings([2023], () => []);
    expect(s).toEqual({
      key: "2023",
      year: 2023,
      sourceFile: "UCEED 2023 Part A (IIT Bombay)",
      slug: "uceed-2023",
      title: "UCEED 2023 Part A",
      graceNumbers: [],
    });
  });

  it("makes IIT Bombay's cancelled questions grace (they carry no key)", () => {
    const [s] = deriveUceedSittings([2020], (y) => (y === 2020 ? [36, 64, 65] : []));
    expect(s.graceNumbers).toEqual([36, 64, 65]);
  });

  it("reads 2019 to 2026 from the committed keys, with 2020's three cancellations", () => {
    const all = uceedSittings();
    expect(all.map((s) => s.year)).toEqual([2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]);
    expect(all.find((s) => s.year === 2020)?.graceNumbers).toEqual([36, 64, 65]);
  });
});
