import { describe, expect, it } from "vitest";
import { planFinalKey, type LiveRow, type BuiltRow } from "../scripts/mpsc/finalKey";

const live = (n: number, answer: string, cancelled = false, hash = `h${n}`): LiveRow => ({
  n,
  id: `id${n}`,
  contentHash: hash,
  answer,
  cancelled,
});
const built = (n: number, answer: string, hash = `h${n}`): BuiltRow => ({ n, answer, contentHash: hash });

describe("planFinalKey (a paper moving from MPSC's first key to its final key)", () => {
  it("leaves a row alone when the final key agrees", () => {
    expect(planFinalKey([live(1, "A")], [built(1, "A")])).toEqual({ changes: [], errors: [] });
  });

  it("re-keys a changed answer and carries the new content_hash", () => {
    const plan = planFinalKey([live(19, "C")], [built(19, "D", "new19")]);
    expect(plan.errors).toEqual([]);
    expect(plan.changes).toEqual([
      { n: 19, id: "id19", kind: "rekey", from: "C", to: "D", oldHash: "h19", newHash: "new19" },
    ]);
  });

  it("cancels a question the final key cancels", () => {
    const plan = planFinalKey([live(36, "D")], [built(36, "CANCELLED", "new36")]);
    expect(plan.changes).toEqual([
      { n: 36, id: "id36", kind: "cancel", from: "D", to: "CANCELLED", oldHash: "h36", newHash: "new36" },
    ]);
  });

  it("refuses to un-cancel: a final key never restores a question", () => {
    const plan = planFinalKey([live(5, "", true)], [built(5, "B", "new5")]);
    expect(plan.changes).toEqual([]);
    expect(plan.errors).toEqual(["Q5: cancelled in the bank but keyed B by the final key"]);
  });

  it("refuses a hash change with no answer change (the text drifted, not the key)", () => {
    const plan = planFinalKey([live(7, "A")], [built(7, "A", "other")]);
    expect(plan.errors).toEqual(["Q7: content_hash differs but the answer did not change: the stored text drifted"]);
  });

  it("names questions missing on either side", () => {
    const plan = planFinalKey([live(1, "A")], [built(1, "A"), built(2, "B")]);
    expect(plan.errors).toEqual(["Q2: no live row"]);
    const plan2 = planFinalKey([live(1, "A"), live(3, "C")], [built(1, "A")]);
    expect(plan2.errors).toEqual(["Q3: live row but no built record"]);
  });
});
