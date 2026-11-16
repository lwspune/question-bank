import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { gradeNtaItem, parseNtaKeyText, type NtaKeyShift } from "@/lib/scoreCalc/ntaKey";

/**
 * The fixture is `pdftotext -layout` of NTA's public "JEE (Main) 2026 Session 2
 * final answer key on which result compiled" (B.E./B.Tech), downloaded from
 * jeemain.nta.nic.in on 2026-11-16. Real data, so every edge case below is one
 * NTA actually printed.
 */
const TEXT = readFileSync(join(__dirname, "fixtures/score-calc/nta-jee-2026-s2-final-key.txt"), "utf8");

function shift(shifts: NtaKeyShift[], region: NtaKeyShift["region"], date: string, n: number): NtaKeyShift {
  const s = shifts.find((x) => x.region === region && x.date === date && x.shift === n);
  if (!s) throw new Error(`no shift ${region} ${date} ${n}`);
  return s;
}

describe("parseNtaKeyText (real 2026 Session 2 final key)", () => {
  const shifts = parseNtaKeyText(TEXT);

  it("finds 9 shifts for each of the two regions", () => {
    expect(shifts.filter((s) => s.region === "india")).toHaveLength(9);
    expect(shifts.filter((s) => s.region === "outside")).toHaveLength(9);
  });

  it("gives every shift 25 questions in each subject", () => {
    for (const s of shifts) {
      const counts = { maths: 0, physics: 0, chemistry: 0 };
      for (const e of s.entries.values()) counts[e.subject] += 1;
      expect(counts, `${s.region} ${s.date} ${s.shift}`).toEqual({ maths: 25, physics: 25, chemistry: 25 });
    }
  });

  it("reads plain option-ID answers in the right subject column", () => {
    const s = shift(shifts, "india", "2026-04-02", 1);
    expect(s.entries.get("6911211")).toEqual({ subject: "maths", answer: { kind: "values", values: ["6911213"] } });
    expect(s.entries.get("69112126")).toEqual({ subject: "physics", answer: { kind: "values", values: ["69112187"] } });
    expect(s.entries.get("69112151")).toEqual({ subject: "chemistry", answer: { kind: "values", values: ["691121174"] } });
  });

  it("reads a dropped question", () => {
    expect(shift(shifts, "india", "2026-04-04", 1).entries.get("695278261")).toEqual({
      subject: "physics",
      answer: { kind: "dropped" },
    });
  });

  it("reads 'or' between accepted numeric answers", () => {
    expect(shift(shifts, "india", "2026-04-05", 1).entries.get("695278372")?.answer).toEqual({
      kind: "values",
      values: ["41", "42"],
    });
  });

  it("reads two accepted options separated by a comma", () => {
    expect(shift(shifts, "india", "2026-04-06", 2).entries.get("6911211245")?.answer).toEqual({
      kind: "values",
      values: ["6911214242", "6911214244"],
    });
  });

  it("reads 'Any non-negative Integer'", () => {
    expect(shift(shifts, "india", "2026-04-05", 1).entries.get("695278325")).toEqual({
      subject: "maths",
      answer: { kind: "any-non-negative-integer" },
    });
  });

  it("refuses a shift that comes out short, rather than score against half a key", () => {
    const cut = TEXT.replace(/\r?\n695278371 4\r?\n/, "\n").replace("695278321 72                   695278346 2                           695278371 4", "695278321 72                   695278346 2");
    expect(() => parseNtaKeyText(cut)).toThrow(/05\.04\.2026|2026-04-05/);
  });
});

describe("gradeNtaItem", () => {
  const values = { kind: "values" as const, values: ["6911213"] };

  it("marks a chosen option against the key", () => {
    expect(gradeNtaItem(values, "6911213")).toBe("right");
    expect(gradeNtaItem(values, "6911214")).toBe("wrong");
    expect(gradeNtaItem(values, null)).toBe("blank");
  });

  it("compares numeric answers as numbers", () => {
    const num = { kind: "values" as const, values: ["41", "42"] };
    expect(gradeNtaItem(num, "42")).toBe("right");
    expect(gradeNtaItem(num, "41.00")).toBe("right");
    expect(gradeNtaItem(num, "40")).toBe("wrong");
  });

  it("gives a dropped question full marks to everyone by default", () => {
    expect(gradeNtaItem({ kind: "dropped" }, null)).toBe("bonus");
    expect(gradeNtaItem({ kind: "dropped" }, "6911214")).toBe("bonus");
  });

  it("can give a dropped question only to those who attempted it, if NTA's rule says so", () => {
    expect(gradeNtaItem({ kind: "dropped" }, null, "attempted")).toBe("blank");
    expect(gradeNtaItem({ kind: "dropped" }, "7", "attempted")).toBe("bonus");
  });

  it("accepts any non-negative integer, and nothing else", () => {
    const any = { kind: "any-non-negative-integer" as const };
    expect(gradeNtaItem(any, "0")).toBe("right");
    expect(gradeNtaItem(any, "17")).toBe("right");
    expect(gradeNtaItem(any, "-3")).toBe("wrong");
    expect(gradeNtaItem(any, "2.5")).toBe("wrong");
    expect(gradeNtaItem(any, null)).toBe("blank");
  });
});
