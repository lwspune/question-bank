/**
 * The browser half of the server-decided daily answer limit (migration 0228,
 * 2026-11-08). The server's claim_reveal decides every NEW answer; this pins
 * when the page must ask it, how its reply is read, and how a reply updates the
 * page's display copy (which cards look locked). The database half is pinned in
 * free-save-limit.integration.test.ts.
 */
import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { applyClaim, claimReveal, needsClaim, parseClaim } from "@/lib/questions/claimReveal";
import { isRevealLocked, revealDecision } from "@/lib/questions/revealMeter";

const base = { signedIn: true, surface: "bank" as const, unlimited: false, todayIds: [] as string[], exemptIds: [] as string[], questionId: "q" };

describe("needsClaim: when the page must ask the server", () => {
  it("asks for a new answer on a counted surface", () => {
    expect(needsClaim(base)).toBe(true);
    expect(needsClaim({ ...base, surface: "board" })).toBe(true);
    expect(needsClaim({ ...base, surface: "guide" })).toBe(true);
  });

  it("asks even when the page holds no copy of today's count (the read failed)", () => {
    expect(needsClaim({ ...base, todayIds: [] })).toBe(true);
  });

  it("does not ask for an answer already open today, a path question, or a confirmed pass", () => {
    expect(needsClaim({ ...base, todayIds: ["q"] })).toBe(false);
    expect(needsClaim({ ...base, exemptIds: ["q"] })).toBe(false);
    expect(needsClaim({ ...base, unlimited: true })).toBe(false);
  });

  it("does not ask signed out (the device's own wall) or on the question of the day", () => {
    expect(needsClaim({ ...base, signedIn: false })).toBe(false);
    expect(needsClaim({ ...base, surface: "daily" })).toBe(false);
  });
});

describe("parseClaim", () => {
  it("reads the server's reply", () => {
    expect(parseClaim({ allowed: false, reason: "limit", used: 15, limit: 15 })).toEqual({ allowed: false, reason: "limit", used: 15, limit: 15 });
    expect(parseClaim({ allowed: true, reason: "pass", used: null, limit: null })).toEqual({ allowed: true, reason: "pass", used: null, limit: null });
  });

  it("refuses a reply it does not understand", () => {
    expect(parseClaim(null)).toBeNull();
    expect(parseClaim({ allowed: "yes", reason: "counted" })).toBeNull();
    expect(parseClaim({ allowed: true, reason: "because" })).toBeNull();
  });
});

describe("claimReveal", () => {
  it("returns the server's decision", async () => {
    const rpc = vi.fn().mockResolvedValue({ data: { allowed: true, reason: "counted", used: 3, limit: 15 }, error: null });
    expect(await claimReveal(rpc, "q", "board")).toEqual({ allowed: true, reason: "counted", used: 3, limit: 15 });
    expect(rpc).toHaveBeenCalledWith("claim_reveal", { p_question_id: "q", p_surface: "board" });
  });

  it("returns null when the server cannot be asked: the caller lets this ONE answer through", async () => {
    expect(await claimReveal(vi.fn().mockResolvedValue({ data: null, error: { message: "timeout" } }), "q", "bank")).toBeNull();
    expect(await claimReveal(vi.fn().mockRejectedValue(new TypeError("offline")), "q", "bank")).toBeNull();
    expect(await claimReveal(vi.fn().mockResolvedValue({ data: { nonsense: 1 }, error: null }), "q", "bank")).toBeNull();
  });
});

describe("applyClaim: the page's display copy follows the server", () => {
  it("adds a counted answer and takes the server's count", () => {
    expect(applyClaim({ limit: 15, todayIds: ["a"], used: 1 }, "q", { allowed: true, reason: "counted", used: 4, limit: 15 })).toEqual({
      limit: 15,
      todayIds: ["a", "q"],
      used: 4,
    });
  });

  it("builds a copy from a refusal when the page had none, so every new card locks", () => {
    const after = applyClaim(null, "q", { allowed: false, reason: "limit", used: 15, limit: 15 });
    expect(after).toEqual({ limit: 15, todayIds: [], used: 15 });
    expect(isRevealLocked({ signedIn: true, loading: false, revealedIds: [], questionId: "other", daily: after })).toBe(true);
  });

  it("leaves the copy alone for answers the limit does not touch", () => {
    const copy = { limit: 15, todayIds: ["a"], used: 1 };
    expect(applyClaim(copy, "q", { allowed: true, reason: "pass", used: null, limit: null })).toBe(copy);
    expect(applyClaim(copy, "q", { allowed: true, reason: "path", used: null, limit: 15 })).toBe(copy);
  });
});

describe("revealDecision reads the server's count (`used`), not only the ids the page saw", () => {
  it("locks once the server says the day's answers are used, even if this page opened none", () => {
    const daily = { limit: 15, todayIds: ["a"], used: 15 };
    expect(revealDecision({ signedIn: true, revealedIds: [], questionId: "new", daily }).allow).toBe(false);
    expect(revealDecision({ signedIn: true, revealedIds: [], questionId: "a", daily }).allow).toBe(true);
  });
});

describe("wiring", () => {
  const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

  it("the meter asks the server through claimReveal", () => {
    expect(read("src/components/reveal/useRevealMeter.ts")).toMatch(/claimReveal\(/);
  });

  it("V's explanation is decided by the same function", () => {
    const src = read("src/lib/chat/questionReveal.ts");
    expect(src).toMatch(/claim_reveal/);
    expect(src).not.toMatch(/paidRevealedToday\(/);
  });

  it("the display copy reads the count of record, and a failed limits read is an error", () => {
    const src = read("src/app/api/me/reveals/route.ts");
    expect(src).toMatch(/daily_reveals/);
    expect(src).not.toMatch(/loadPaidRevealedToday/);
    expect(src).not.toMatch(/!limits \|\|/);
  });
});
