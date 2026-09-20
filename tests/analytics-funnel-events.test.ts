import { describe, it, expect } from "vitest";
import {
  FUNNEL_EVENTS,
  MAX_FUNNEL_PROPS,
  MAX_FUNNEL_VALUE_LEN,
  buildFunnelEvent,
  isFunnelEvent,
  isFunnelAnalyticsEnabled,
} from "@/lib/analytics/funnelEvents";

describe("FUNNEL_EVENTS", () => {
  it("is a closed allowlist of the six anon-funnel moments", () => {
    expect([...FUNNEL_EVENTS]).toEqual([
      "reveal_wall_hit",
      "reveal_wall_signin_click",
      "teacher_gate_shown",
      "teacher_gate_cta_click",
      "quiz_gate_shown",
      "quiz_gate_submitted",
    ]);
  });

  it("pairs every shown event with a click/submit counterpart", () => {
    // A one-sided count has no denominator. Each `_shown` must have a partner.
    const shown = FUNNEL_EVENTS.filter((n) => n.endsWith("_shown") || n.endsWith("_hit"));
    expect(shown.length).toBeGreaterThan(0);
    for (const s of shown) {
      const stem = s.replace(/_(shown|hit)$/, "");
      const partner = FUNNEL_EVENTS.some(
        (n) => n !== s && n.startsWith(stem) && /_(click|submitted)$/.test(n)
      );
      expect(partner, `${s} has no click/submit counterpart`).toBe(true);
    }
  });
});

describe("isFunnelEvent", () => {
  it("accepts every declared name", () => {
    for (const n of FUNNEL_EVENTS) expect(isFunnelEvent(n)).toBe(true);
  });

  it("rejects an undeclared name and non-strings", () => {
    expect(isFunnelEvent("signup_completed")).toBe(false);
    expect(isFunnelEvent("")).toBe(false);
    expect(isFunnelEvent(null)).toBe(false);
    expect(isFunnelEvent(42)).toBe(false);
  });
});

describe("buildFunnelEvent", () => {
  it("accepts a known name with no properties", () => {
    const r = buildFunnelEvent("reveal_wall_signin_click");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toEqual({ name: "reveal_wall_signin_click" });
  });

  it("accepts the four permitted value types", () => {
    const r = buildFunnelEvent("teacher_gate_shown", { kind: "paper", signedIn: false });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.props).toEqual({ kind: "paper", signedIn: false });
    expect(buildFunnelEvent("quiz_gate_shown", { quizSlug: "x", mode: 1 }).ok).toBe(true);
    expect(buildFunnelEvent("quiz_gate_shown", { quizSlug: "x", mode: null }).ok).toBe(true);
  });

  it("rejects an undeclared event name", () => {
    const r = buildFunnelEvent("pageview");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/unknown/i);
  });

  it("rejects a third property — the Pro plan allows only two", () => {
    expect(MAX_FUNNEL_PROPS).toBe(2);
    const r = buildFunnelEvent("reveal_wall_hit", { surface: "browse", examSlug: "nda", extra: "x" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/propert/i);
  });

  it("rejects nested objects, arrays and undefined values", () => {
    expect(buildFunnelEvent("reveal_wall_hit", { surface: { a: 1 } }).ok).toBe(false);
    expect(buildFunnelEvent("reveal_wall_hit", { surface: ["a"] }).ok).toBe(false);
    expect(buildFunnelEvent("reveal_wall_hit", { surface: undefined }).ok).toBe(false);
  });

  it("rejects a key or value longer than 255 characters", () => {
    expect(MAX_FUNNEL_VALUE_LEN).toBe(255);
    const long = "a".repeat(MAX_FUNNEL_VALUE_LEN + 1);
    expect(buildFunnelEvent("reveal_wall_hit", { surface: long }).ok).toBe(false);
    expect(buildFunnelEvent("reveal_wall_hit", { [long]: "browse" }).ok).toBe(false);
  });

  // --- PII guard. quiz_gate_submitted fires on the one form in the product that
  // captures a name and a mobile number, so this is a live hazard, not a drill.
  it("rejects an email-shaped value", () => {
    const r = buildFunnelEvent("quiz_gate_submitted", { quizSlug: "student@example.com" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/personal/i);
  });

  it("rejects a mobile-shaped value in every common writing", () => {
    for (const mobile of ["9876543210", "+919876543210", "+91 98765 43210", "98765-43210"]) {
      const r = buildFunnelEvent("quiz_gate_submitted", { quizSlug: mobile });
      expect(r.ok, `${mobile} should be rejected`).toBe(false);
    }
  });

  it("does not reject short digit runs that are legitimately not PII", () => {
    expect(buildFunnelEvent("quiz_gate_shown", { quizSlug: "nda-2026", mode: "form" }).ok).toBe(true);
    expect(buildFunnelEvent("reveal_wall_hit", { surface: "board", examSlug: "mht-cet" }).ok).toBe(true);
    expect(buildFunnelEvent("quiz_gate_shown", { mode: 2026 }).ok).toBe(true);
  });
});

describe("isFunnelAnalyticsEnabled", () => {
  it("defaults ON when the variable is absent or blank", () => {
    // Deliberate: a missing env var on a fresh environment must not silently
    // kill the feature. An invisible dead feature is the harder bug to find
    // than a small bill.
    expect(isFunnelAnalyticsEnabled(undefined)).toBe(true);
    expect(isFunnelAnalyticsEnabled("")).toBe(true);
    expect(isFunnelAnalyticsEnabled("   ")).toBe(true);
  });

  it("turns OFF only on an explicit opt-out value", () => {
    for (const v of ["off", "0", "false", "no", "OFF", "False", "  off  "]) {
      expect(isFunnelAnalyticsEnabled(v), `${v} should disable`).toBe(false);
    }
  });

  it("stays ON for affirmative or unrecognised values", () => {
    for (const v of ["on", "1", "true", "yes", "enabled", "maybe"]) {
      expect(isFunnelAnalyticsEnabled(v), `${v} should enable`).toBe(true);
    }
  });
});
