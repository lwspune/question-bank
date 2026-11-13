import { describe, expect, it } from "vitest";
import { flawedBlocks, graceReason } from "../scripts/rrb-ntpc/grace";

/**
 * Every flawed NTPC question (two right options, none, or a key we dispute) rides as grace in its
 * mock. grace.ts reads them from the committed transcripts, the source of record.
 */
describe("RRB NTPC flawed questions", () => {
  it("finds the 18 flawed questions across the 24 transcripts, each with a student notice", () => {
    const all = flawedBlocks();
    expect(all).toHaveLength(18);
    for (const f of all) expect(f.notice.length).toBeGreaterThan(20);
    expect(all).toContainEqual(expect.objectContaining({ shiftId: "g1-2026-03-16-s1", number: 32 }));
    expect(all).toContainEqual(expect.objectContaining({ shiftId: "g1-2026-03-27-s3", number: 57 }));
  });

  it("writes a reason naming the paper, the question and the lane", () => {
    expect(graceReason({ shiftId: "g1-2026-03-22-s3", number: 30, notice: "Statement 2 is not correct." })).toBe(
      "RRB NTPC Graduate CBT 1, 22 Mar 2026, Shift 3 Q30: Statement 2 is not correct. (scripts/rrb-ntpc)"
    );
  });
});
