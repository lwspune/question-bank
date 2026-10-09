import { describe, it, expect } from "vitest";
import { paperKey, freeForPaper } from "@/lib/export/freePaper";
import { downloadPerksFirst } from "@/lib/billing/gateCopy";

/**
 * The free download is ONE PAPER (2026-10-07): the Question Paper and its
 * Answer Key for the same questions. It was one FILE, and 7 of 8 students took
 * the paper, then met the pass offer the moment they asked for its key; none
 * opened checkout. "Same paper" is recognised from the request, before the
 * questions are fetched, so the key comes from what the request names.
 */
describe("paperKey", () => {
  it("names a past paper by its slug", () => {
    expect(paperKey({ mockSlug: "nda-2026-sep-maths" })).toBe("mock:nda-2026-sep-maths");
  });

  it("names a selection by its questions, whatever their order or repeats", () => {
    const a = paperKey({ questionIds: ["q2", "q1", "q3"] });
    expect(paperKey({ questionIds: ["q3", "q1", "q2", "q1"] })).toBe(a);
    expect(paperKey({ questionIds: ["q1", "q2"] })).not.toBe(a);
    expect(a?.startsWith("ids:")).toBe(true);
  });

  it("names a filtered paper by its filters, ignoring the page, key order and list order", () => {
    const base = { examId: "e", chapterIds: ["c2", "c1"], difficulties: ["easy"], page: 1 };
    const a = paperKey({ filters: base });
    expect(paperKey({ filters: { page: 3, difficulties: ["easy"], chapterIds: ["c1", "c2"], examId: "e" } })).toBe(a);
    expect(paperKey({ filters: { ...base, chapterIds: ["c1"] } })).not.toBe(a);
    expect(a?.startsWith("filters:")).toBe(true);
  });

  it("names a board past paper by its exam and slug (2026-10-09)", () => {
    expect(paperKey({ boardPaper: { exam: "cbse-12", slug: "2025-55-1-2" } })).toBe("board:cbse-12:2025-55-1-2");
    expect(paperKey({ boardPaper: { exam: "cbse-12", slug: "2025-55-1-3" } })).not.toBe(
      paperKey({ boardPaper: { exam: "cbse-12", slug: "2025-55-1-2" } })
    );
  });

  it("returns null when the request names no paper", () => {
    expect(paperKey({})).toBeNull();
  });
});

describe("freeForPaper", () => {
  it("is free when the account has not used its free paper", () => {
    expect(freeForPaper(null, "mock:x")).toBe(true);
  });

  it("stays free for the same paper, so its other file (or a re-download) is free too", () => {
    expect(freeForPaper({ setKey: "mock:x" }, "mock:x")).toBe(true);
  });

  it("is not free for a different paper", () => {
    expect(freeForPaper({ setKey: "mock:x" }, "mock:y")).toBe(false);
  });

  it("is not free for anyone who used the old one-file download (no key recorded)", () => {
    expect(freeForPaper({ setKey: null }, "mock:x")).toBe(false);
  });

  it("is not free when the request names no paper", () => {
    expect(freeForPaper({ setKey: "mock:x" }, null)).toBe(false);
  });
});

describe("downloadPerksFirst", () => {
  const perks = ["Unlimited answers", "All chapter tests", "Question Paper + Answer Key as PDF downloads", "Saved questions"];

  it("moves the download perk to the top and keeps the rest in order", () => {
    expect(downloadPerksFirst(perks)).toEqual([
      "Question Paper + Answer Key as PDF downloads",
      "Unlimited answers",
      "All chapter tests",
      "Saved questions",
    ]);
  });

  it("leaves a list with no download perk unchanged", () => {
    expect(downloadPerksFirst(["A", "B"])).toEqual(["A", "B"]);
  });
});
