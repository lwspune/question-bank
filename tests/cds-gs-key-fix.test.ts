/**
 * Spec for planKeyFix (scripts/cds-gs/keyFix.ts): changing the key of a LIVE CDS
 * General Knowledge row in place.
 *
 * The row keeps its id (drills, saves, mock answers and item stats point at it), so
 * the new content_hash must be what the lane's own builder computes for the same
 * stem and options under the new key, and a row whose stored hash does not match its
 * own content is refused rather than silently re-hashed.
 */
import { describe, expect, it } from "vitest";
import { planKeyFix, type LiveRow } from "../scripts/cds-gs/keyFix";
import { contentHash } from "../src/lib/upload/hash";

const opts = [
  { label: "A", text: "Tibet", is_correct: false },
  { label: "B", text: "Hong Kong", is_correct: true },
  { label: "C", text: "Xinjiang", is_correct: false },
  { label: "D", text: "Inner Mongolia", is_correct: false },
];
const live = (over: Partial<LiveRow> = {}): LiveRow => ({
  text: "Which became part of China in 1997?",
  content_hash: contentHash("Which became part of China in 1997?", opts.map((o) => o.text), "B"),
  options: opts,
  ...over,
});
const fix = { answer: "C", reasoning: "Because of the reasons given." };

describe("planKeyFix", () => {
  it("re-hashes the same stem and options under the new key", () => {
    const plan = planKeyFix(live(), fix, false);
    expect(plan.from).toBe("B");
    expect(plan.newHash).toBe(contentHash("Which became part of China in 1997?", opts.map((o) => o.text), "C"));
  });

  it("flips exactly the old and the new option", () => {
    const plan = planKeyFix(live(), fix, false);
    expect(plan.flips).toEqual([
      { label: "B", is_correct: false },
      { label: "C", is_correct: true },
    ]);
  });

  it("writes the reasoning with the corrected-on-review tail", () => {
    const plan = planKeyFix(live(), fix, false);
    expect(plan.solution.startsWith("Because of the reasons given. [Derived answer")).toBe(true);
    expect(plan.solution).toMatch(/corrected on review/i);
  });

  it("refuses a 'change' to the key the row already has", () => {
    expect(() => planKeyFix(live(), { ...fix, answer: "B" }, false)).toThrow(/already/);
  });

  it("refuses a letter the row has no option for", () => {
    expect(() => planKeyFix(live(), { ...fix, answer: "E" }, false)).toThrow(/no option/);
  });

  it("refuses a row whose stored hash does not match its own content (a stale hash)", () => {
    expect(() => planKeyFix(live({ content_hash: "deadbeef" }), fix, false)).toThrow(/stale/);
  });

  it("refuses a row with no single keyed option", () => {
    const two = opts.map((o) => ({ ...o, is_correct: o.label === "A" || o.label === "B" }));
    expect(() => planKeyFix(live({ options: two }), fix, false)).toThrow(/exactly one/);
  });

  it("refuses reasoning that carries a bracket (the tail is the only bracket)", () => {
    expect(() => planKeyFix(live(), { ...fix, reasoning: "See [1]." }, false)).toThrow(/bracket/);
  });

  it("refuses a keyed paper: its key is UPSC's, not ours to change", () => {
    expect(() => planKeyFix(live(), fix, true)).toThrow(/official key/);
  });
});
