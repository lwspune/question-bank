import { describe, it, expect } from "vitest";
import { parseClientEvent } from "@/lib/activity/clientEvents";
import { isActivityKind } from "@/lib/activity/events";
import { LEVELS } from "@/lib/play/levels";

const NOW = new Date("2026-11-16T10:00:00Z");
const ok = { kind: "play_round", level: 2, correct: 18, wrong: 2, points: 260, cleared: false };

describe("play_round (a finished /play round, signed in)", () => {
  it("is an activity kind", () => {
    expect(isActivityKind("play_round")).toBe(true);
  });

  it("records the level, counts, points and whether it cleared, with no dedupe (each round is its own)", () => {
    const r = parseClientEvent(ok, "u1", NOW);
    expect(r).toEqual({
      ok: true,
      value: { kind: "play_round", metadata: { level: 2, correct: 18, wrong: 2, points: 260, cleared: false } },
    });
  });

  it("accepts every real level and nothing else", () => {
    for (const l of LEVELS) expect(parseClientEvent({ ...ok, level: l.id }, "u1", NOW).ok).toBe(true);
    for (const level of [0, LEVELS.length + 1, 1.5, "2", null]) {
      expect(parseClientEvent({ ...ok, level }, "u1", NOW).ok).toBe(false);
    }
  });

  it("rejects counts a 60-second round cannot produce", () => {
    for (const bad of [{ correct: -1 }, { correct: 201 }, { wrong: 201 }, { correct: 2.5 }, { points: 20001 }, { points: "9" }]) {
      expect(parseClientEvent({ ...ok, ...bad }, "u1", NOW).ok).toBe(false);
    }
  });

  it("needs cleared to be a boolean", () => {
    expect(parseClientEvent({ ...ok, cleared: "yes" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ ...ok, cleared: undefined }, "u1", NOW).ok).toBe(false);
  });

  it("carries nothing else", () => {
    expect(parseClientEvent({ ...ok, surface: "start" }, "u1", NOW).ok).toBe(false);
  });
});
