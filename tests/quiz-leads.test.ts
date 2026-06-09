import { describe, it, expect } from "vitest";
import {
  normalizeMobile,
  isValidIndianMobile,
  rollupLeadsByMobile,
  type LeadRow,
} from "@/lib/quiz/leads";

describe("normalizeMobile", () => {
  it("normalises a bare 10-digit number to 91XXXXXXXXXX", () => {
    expect(normalizeMobile("9876543210")).toBe("919876543210");
  });

  it("strips spaces, dashes and a +91 prefix", () => {
    expect(normalizeMobile("+91 98765-43210")).toBe("919876543210");
  });

  it("handles a leading 0 (STD-style) 11-digit number", () => {
    expect(normalizeMobile("098765 43210")).toBe("919876543210");
  });

  it("passes through an already-normalised 91XXXXXXXXXX", () => {
    expect(normalizeMobile("919876543210")).toBe("919876543210");
  });

  it("rejects numbers that are too short / too long", () => {
    expect(normalizeMobile("12345")).toBeNull();
    expect(normalizeMobile("98765432101")).toBeNull(); // 11 digits, not 0-led
  });

  it("rejects Indian mobiles not starting 6-9", () => {
    expect(normalizeMobile("1234567890")).toBeNull();
    expect(normalizeMobile("5876543210")).toBeNull();
  });

  it("rejects empty / non-numeric input", () => {
    expect(normalizeMobile("")).toBeNull();
    expect(normalizeMobile("abcdefghij")).toBeNull();
  });
});

describe("isValidIndianMobile", () => {
  it("is true for valid numbers, false otherwise", () => {
    expect(isValidIndianMobile("9876543210")).toBe(true);
    expect(isValidIndianMobile("+91 98765 43210")).toBe(true);
    expect(isValidIndianMobile("1234567890")).toBe(false);
    expect(isValidIndianMobile("")).toBe(false);
  });
});

describe("rollupLeadsByMobile", () => {
  const rows: LeadRow[] = [
    { quiz_id: "qa", name: "Rahul", mobile: "919000000001", best_score: 8, attempts: 2, last_attempt_at: "2026-06-09T10:00:00Z", first_seen_at: "2026-06-08T09:00:00Z" },
    { quiz_id: "qb", name: "Rahul K", mobile: "919000000001", best_score: 12, attempts: 1, last_attempt_at: "2026-06-09T12:00:00Z", first_seen_at: "2026-06-09T11:00:00Z" },
    { quiz_id: "qa", name: "Sana", mobile: "919000000002", best_score: 5, attempts: 1, last_attempt_at: "2026-06-09T08:00:00Z", first_seen_at: "2026-06-09T08:00:00Z" },
  ];

  it("groups multiple quizzes by the same mobile into one person", () => {
    const groups = rollupLeadsByMobile(rows);
    expect(groups).toHaveLength(2);
    const rahul = groups.find((g) => g.mobile === "919000000001")!;
    expect(rahul.quizzes).toBe(2); // distinct quiz_id count
    expect(rahul.totalAttempts).toBe(3); // 2 + 1
    expect(rahul.bestScore).toBe(12); // max across quizzes
    expect(rahul.leads).toHaveLength(2);
  });

  it("uses the most-recent name and lastSeen for the person", () => {
    const rahul = rollupLeadsByMobile(rows).find((g) => g.mobile === "919000000001")!;
    expect(rahul.name).toBe("Rahul K"); // from the later last_attempt_at
    expect(rahul.lastSeen).toBe("2026-06-09T12:00:00Z");
    expect(rahul.firstSeen).toBe("2026-06-08T09:00:00Z");
  });

  it("sorts people by most-recently-seen first", () => {
    const groups = rollupLeadsByMobile(rows);
    expect(groups[0].mobile).toBe("919000000001"); // last seen 12:00 > Sana 08:00
  });

  it("returns [] for no rows", () => {
    expect(rollupLeadsByMobile([])).toEqual([]);
  });
});
