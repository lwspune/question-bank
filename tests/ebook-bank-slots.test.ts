/**
 * A Chapter-wise PYQs book read straight from the bank (2026-11-21, Homi
 * Bhabha Class 9): an exam with no homework plan and no stored papers. Every
 * PUBLIC past question of the book's subjects, newest sitting first, a passage
 * and its questions as one slot, each chapter in a pinned order with the
 * subjects in turn. A chapter the order does not name stops the build, so a
 * re-cut taxonomy can never drop a chapter from a paid book unseen.
 */
import { describe, it, expect } from "vitest";
import { bankSittingLabel, bankSlots, type BankRow } from "@/lib/ebooks/bankSlots";

const row = (id: string, over: Partial<BankRow> = {}): BankRow => ({
  id,
  setId: null,
  subject: "Physics",
  chapterId: "sound",
  chapterName: "Sound",
  year: 2024,
  note: "Homi Bhabha Std IX (30 November 2024)",
  questionNumber: id.replace(/\D/g, "") || "1",
  ...over,
});

const ORDER = {
  subjects: ["Physics", "Chemistry"],
  chapterOrder: { Physics: ["Motion", "Sound"], Chemistry: ["Atomic Structure"] },
};

describe("bankSittingLabel", () => {
  it("prints what the note's brackets hold, else the note, else the year", () => {
    expect(bankSittingLabel("Homi Bhabha Std IX (30 November 2024)", 2024)).toBe("30 November 2024");
    expect(bankSittingLabel("Homi Bhabha Std IX (21 November 2021, online)", 2021)).toBe("21 November 2021, online");
    expect(bankSittingLabel("Homi Bhabha Std IX (2023-24 competition)", 2023)).toBe("2023-24 competition");
    expect(bankSittingLabel("March 2019", 2019)).toBe("March 2019");
    expect(bankSittingLabel(null, 2018)).toBe("2018");
    expect(bankSittingLabel(null, null)).toBe("");
  });
});

describe("bankSlots", () => {
  it("puts the newest sitting first, months within a year, then the paper's own numbers", () => {
    const slots = bankSlots(
      [
        row("q10", { year: 2021, note: "Homi Bhabha Std IX (24 January 2021, online)" }),
        row("q2", { year: 2021, note: "Homi Bhabha Std IX (19 December 2021, online)" }),
        row("q9", { year: 2010, note: "Homi Bhabha Std IX (4 September 2010)" }),
        row("q11", { year: 2021, note: "Homi Bhabha Std IX (19 December 2021, online)" }),
        row("q3"),
      ],
      ORDER
    );
    expect(slots.map((s) => s.parts[0])).toEqual(["q3", "q2", "q11", "q10", "q9"]);
    expect(slots.map((s) => s.order)).toEqual([0, 1, 2, 3, 4]);
    expect(slots[0].note).toBe("30 November 2024");
  });

  it("keeps a passage's questions together as one slot, in the paper's order, under its first part's chapter", () => {
    const slots = bankSlots(
      [
        row("q37", { setId: "s1", chapterId: "motion", chapterName: "Motion" }),
        row("q36", { setId: "s1" }),
        row("q38", { setId: "s1" }),
        row("q5"),
      ],
      ORDER
    );
    expect(slots).toHaveLength(2);
    const set = slots.find((s) => s.parts.length > 1)!;
    expect(set.parts).toEqual(["q36", "q37", "q38"]);
    expect(set.chapterName).toBe("Sound");
  });

  it("orders chapters by subject, then by the pinned order inside the subject", () => {
    const slots = bankSlots(
      [
        row("q1", { subject: "Chemistry", chapterId: "atom", chapterName: "Atomic Structure" }),
        row("q2"),
        row("q3", { chapterId: "motion", chapterName: "Motion" }),
      ],
      ORDER
    );
    const order = (id: string) => slots.find((s) => s.parts[0] === id)!.chapterOrder;
    expect(order("q3")).toBeLessThan(order("q2"));
    expect(order("q2")).toBeLessThan(order("q1"));
  });

  it("marks nothing: every question is printed without marks", () => {
    expect(bankSlots([row("q1")], ORDER)[0].marks).toBeNull();
  });

  it("stops on a chapter the order does not name, and on a subject it does not read", () => {
    expect(() => bankSlots([row("q1", { chapterName: "Optics" })], ORDER)).toThrow(/Optics/);
    expect(() => bankSlots([row("q1", { subject: "Biology", chapterName: "Microbes" })], ORDER)).toThrow(/Biology/);
  });
});
