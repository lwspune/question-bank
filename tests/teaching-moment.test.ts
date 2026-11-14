/**
 * The one line under a bank answer (lib/questions/teachingMoment.ts, 2026-11-14):
 * at most one teaching moment per answer, in a fixed order, and the first new
 * moment, "Same mistake again".
 */
import { describe, it, expect } from "vitest";
import {
  pickMoment,
  priorMissFrom,
  sameMistakeFor,
  sameMistakeLine,
  parseMoment,
  type PriorMiss,
  type SameMistake,
} from "@/lib/questions/teachingMoment";
import type { StuckOffer } from "@/lib/questions/stuckOffer";

const Q = "0f8fad5b-d9cb-469f-a165-70867728950e";
// 15:30 in India on 14 Nov.
const NOW = new Date("2026-11-14T10:00:00Z");

const stuck: StuckOffer = { questionId: Q, subtopic: "Sum and product of roots", history: [false, true, false, false], easierId: null };

function miss(at: string, metadata: Record<string, unknown>) {
  return { kind: "answer_wrong", metadata, created_at: at };
}

describe("priorMissFrom: the student's last miss on this question", () => {
  it("is the newest miss, with the option picked then", () => {
    const prior = priorMissFrom([
      miss("2026-11-10T05:00:00Z", { surface: "bank", chose: "C" }),
      miss("2026-11-12T05:00:00Z", { surface: "drill", chose: "B" }),
      miss("2026-11-11T05:00:00Z", { surface: "board", chose: "D" }),
    ]);
    expect(prior).toEqual({ at: "2026-11-12T05:00:00Z", chose: "B", inMock: false });
  });

  it("knows a mock miss, which records no option", () => {
    expect(priorMissFrom([miss("2026-11-12T05:00:00Z", { mockId: "m1", sectionKey: "s1" })])).toEqual({
      at: "2026-11-12T05:00:00Z",
      chose: null,
      inMock: true,
    });
  });

  it("leaves out Review later (a self-mark is not a miss) and anything that is not answer_wrong", () => {
    expect(
      priorMissFrom([
        miss("2026-11-12T05:00:00Z", { surface: "bank", selfMark: "review_later" }),
        { kind: "v_not_understood", metadata: { surface: "v" }, created_at: "2026-11-13T05:00:00Z" },
      ])
    ).toBeNull();
  });

  it("drops an option label it cannot trust", () => {
    expect(priorMissFrom([miss("2026-11-12T05:00:00Z", { surface: "bank", chose: "Z9" })])?.chose).toBeNull();
  });

  it("is null with no earlier miss", () => {
    expect(priorMissFrom([])).toBeNull();
  });
});

describe("sameMistakeFor", () => {
  it("is the moment when there is an earlier miss", () => {
    const prior: PriorMiss = { at: "2026-11-12T05:00:00Z", chose: "B", inMock: false };
    expect(sameMistakeFor(Q, "B", prior)).toEqual({ kind: "same_mistake", questionId: Q, chose: "B", prior });
  });

  it("is null without one", () => {
    expect(sameMistakeFor(Q, "B", null)).toBeNull();
  });
});

describe("pickMoment: one line per answer, in a fixed order", () => {
  const same = sameMistakeFor(Q, "B", { at: "2026-11-12T05:00:00Z", chose: "B", inMock: false });

  it("puts Same mistake again before the stuck offer", () => {
    expect(pickMoment({ sameMistake: same, stuck })?.kind).toBe("same_mistake");
  });

  it("shows the stuck offer when it is the only one", () => {
    expect(pickMoment({ sameMistake: null, stuck })).toEqual({ kind: "stuck", questionId: Q, offer: stuck });
  });

  it("shows nothing when nothing applies", () => {
    expect(pickMoment({ sameMistake: null, stuck: null })).toBeNull();
  });
});

describe("sameMistakeLine: the words", () => {
  const at = (iso: string, chose: string | null, inMock = false): SameMistake => ({
    kind: "same_mistake",
    questionId: Q,
    chose: "B",
    prior: { at: iso, chose, inMock },
  });

  it("names the same option, with the date", () => {
    expect(sameMistakeLine(at("2026-11-12T05:00:00Z", "B"), { now: NOW, hasSolution: false })).toEqual({
      lead: "You picked B here last time too",
      rest: " (12 Nov).",
    });
  });

  it("names the other option when it differs", () => {
    expect(sameMistakeLine(at("2026-11-12T05:00:00Z", "C"), { now: NOW, hasSolution: false })).toEqual({
      lead: "You missed this one on 12 Nov too",
      rest: ", with C that time.",
    });
  });

  it("says a mock when the miss was in a mock", () => {
    expect(sameMistakeLine(at("2026-11-12T05:00:00Z", null, true), { now: NOW, hasSolution: false })).toEqual({
      lead: "You missed this one in a mock on 12 Nov too",
      rest: ".",
    });
  });

  it("says only the date when the option is not known", () => {
    expect(sameMistakeLine(at("2026-11-12T05:00:00Z", null), { now: NOW, hasSolution: false })).toEqual({
      lead: "You missed this one on 12 Nov too",
      rest: ".",
    });
  });

  it("says earlier today and yesterday by the day in India", () => {
    // 00:30 in India on 14 Nov is still today; 23:30 on 13 Nov is yesterday.
    expect(sameMistakeLine(at("2026-11-13T19:00:00Z", "B"), { now: NOW, hasSolution: false }).rest).toBe(" (earlier today).");
    expect(sameMistakeLine(at("2026-11-13T18:00:00Z", null), { now: NOW, hasSolution: false }).lead).toBe(
      "You missed this one yesterday too"
    );
    expect(sameMistakeLine(at("2026-11-13T18:00:00Z", null, true), { now: NOW, hasSolution: false }).lead).toBe(
      "You missed this one in a mock yesterday too"
    );
  });

  it("points at the solution only when the question has one", () => {
    expect(sameMistakeLine(at("2026-11-12T05:00:00Z", "B"), { now: NOW, hasSolution: true }).rest).toBe(
      " (12 Nov). Take the solution step by step this time."
    );
  });
});

describe("parseMoment: the practice route's reply", () => {
  it("accepts Same mistake again", () => {
    const raw = { kind: "same_mistake", questionId: Q, chose: "B", prior: { at: "2026-11-12T05:00:00Z", chose: "C", inMock: false } };
    expect(parseMoment(raw)).toEqual(raw);
  });

  it("accepts the stuck offer when its question matches", () => {
    expect(parseMoment({ kind: "stuck", questionId: Q, offer: stuck })).toEqual({ kind: "stuck", questionId: Q, offer: stuck });
    expect(parseMoment({ kind: "stuck", questionId: "1f8fad5b-d9cb-469f-a165-70867728950e", offer: stuck })).toBeNull();
  });

  it("refuses anything malformed", () => {
    const ok = { kind: "same_mistake", questionId: Q, chose: "B", prior: { at: "2026-11-12T05:00:00Z", chose: null, inMock: true } };
    expect(parseMoment(ok)).not.toBeNull();
    expect(parseMoment({ ...ok, kind: "fix_nudge" })).toBeNull();
    expect(parseMoment({ ...ok, questionId: "x" })).toBeNull();
    expect(parseMoment({ ...ok, chose: "Z" })).toBeNull();
    expect(parseMoment({ ...ok, prior: { ...ok.prior, at: "not a date" } })).toBeNull();
    expect(parseMoment({ ...ok, prior: { ...ok.prior, inMock: "yes" } })).toBeNull();
    expect(parseMoment(null)).toBeNull();
  });
});
