import { describe, it, expect } from "vitest";
import { progressTiles } from "@/lib/me/stats";

/**
 * The /me progress row. It counted mocks sat, notes topics mastered and saved
 * questions: on 2026-11-05, 446 of 745 students saw three zeros there, 99% saw
 * 0 topics mastered, while the bank and /board took 31,000 answers a month.
 * The row now shows what every surface counts: answered, % right, fixed.
 */
describe("progressTiles", () => {
  it("no row before the first answer: a row of zeros reads as 'you did nothing'", () => {
    expect(progressTiles({ answered: 0, right: 0, fixed: 0 }, 0)).toBeNull();
  });

  it("no row when the numbers did not load: a failed read is not a zero", () => {
    expect(progressTiles(null, 3)).toBeNull();
    expect(progressTiles(undefined, null)).toBeNull();
  });

  it("answered, % right and fixed, in that order", () => {
    const t = progressTiles({ answered: 40, right: 30, fixed: 4 }, 0);
    expect(t?.map((x) => [x.key, x.value, x.label])).toEqual([
      ["answered", "40", "answered"],
      ["right", "75%", "right"],
      ["fixed", "4", "fixed"],
    ]);
  });

  it("rounds the share to a whole percent", () => {
    expect(progressTiles({ answered: 3, right: 1, fixed: 0 }, 0)?.[1].value).toBe("33%");
    expect(progressTiles({ answered: 3, right: 2, fixed: 0 }, 0)?.[1].value).toBe("67%");
  });

  it("formats large counts the Indian way, like the header line", () => {
    expect(progressTiles({ answered: 123456, right: 1000, fixed: 1500 }, 0)?.[0].value).toBe("1,23,456");
    expect(progressTiles({ answered: 123456, right: 1000, fixed: 1500 }, 0)?.[2].value).toBe("1,500");
  });

  it("the fixed tile opens the drill and names what is waiting, only when something is", () => {
    const some = progressTiles({ answered: 40, right: 30, fixed: 4 }, 12)!;
    expect(some[2]).toMatchObject({ href: "/drill?from=me_tile", note: "12 to fix" });
    const none = progressTiles({ answered: 40, right: 30, fixed: 4 }, 0)!;
    expect(none[2].note).toBeUndefined();
    const unknown = progressTiles({ answered: 40, right: 30, fixed: 4 }, null)!;
    expect(unknown[2].note).toBeUndefined();
  });

  it("answered and % right are numbers to read, not links", () => {
    const t = progressTiles({ answered: 40, right: 30, fixed: 4 }, 0)!;
    expect(t[0].href).toBeUndefined();
    expect(t[1].href).toBeUndefined();
  });
});
