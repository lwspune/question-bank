/**
 * readWhileStill (helpers/stableRead.ts): a count compared with a ground truth
 * is only fair when nothing changed the rows in between. Pure, no database.
 */
import { describe, it, expect } from "vitest";
import { readWhileStill } from "./helpers/stableRead";

const seq = <T>(values: T[]) => {
  let i = 0;
  return async () => values[Math.min(i++, values.length - 1)];
};

describe("readWhileStill", () => {
  it("returns the measurement taken between two equal truth reads", async () => {
    const r = await readWhileStill(seq([177, 177]), seq([177]));
    expect(r).toEqual({ truth: 177, measured: 177, still: true });
  });

  it("tries again when a row arrived during the read, and uses the still window", async () => {
    // Window 1: truth 177 -> 180 (another file added rows): not used. Window 2: 180 -> 180.
    const r = await readWhileStill(seq([177, 180, 180, 180]), seq([178, 180]));
    expect(r).toEqual({ truth: 180, measured: 180, still: true });
  });

  it("still reports a wrong count: a still window does not hide a real mismatch", async () => {
    const r = await readWhileStill(seq([180, 180]), seq([177]));
    expect(r.still).toBe(true);
    expect(r.measured).not.toBe(r.truth);
  });

  it("gives up after its tries and says the rows never stood still", async () => {
    let n = 0;
    const r = await readWhileStill(async () => n++, async () => 0, 3);
    expect(r.still).toBe(false);
  });

  it("compares structured truths by value", async () => {
    const r = await readWhileStill(seq([{ a: 1 }, { a: 1 }]), seq([{ a: 1 }]));
    expect(r.still).toBe(true);
  });
});
