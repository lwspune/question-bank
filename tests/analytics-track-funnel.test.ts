import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * Behavioural test for the kill switch and the send path.
 *
 * This exists because the cheap proof is a LIE: a production build with
 * NEXT_PUBLIC_FUNNEL_ANALYTICS=off still ships all six event-name literals in
 * the client bundle (the bundler cannot prove the calls dead across the module
 * boundary). Grepping the bundle therefore tests nothing. The only honest test
 * of "is it off" is whether `track` is CALLED.
 *
 * The flag is read at module scope, so each case resets the module registry and
 * re-imports rather than reassigning a value that has already been captured.
 */

const trackSpy = vi.fn();
vi.mock("@vercel/analytics", () => ({
  track: (...args: unknown[]) => trackSpy(...args),
}));

async function loadWithFlag(flag: string | undefined) {
  vi.resetModules();
  trackSpy.mockClear();
  if (flag === undefined) delete process.env.NEXT_PUBLIC_FUNNEL_ANALYTICS;
  else process.env.NEXT_PUBLIC_FUNNEL_ANALYTICS = flag;
  return import("@/lib/analytics/trackFunnel");
}

beforeEach(() => {
  trackSpy.mockClear();
});

describe("trackFunnel kill switch", () => {
  it("SENDS when the flag is unset — absent must not mean off", async () => {
    const { trackFunnel, FUNNEL_ANALYTICS_ENABLED } = await loadWithFlag(undefined);
    expect(FUNNEL_ANALYTICS_ENABLED).toBe(true);
    trackFunnel("reveal_wall_hit", { surface: "bank", exam: "NDA" });
    expect(trackSpy).toHaveBeenCalledTimes(1);
    expect(trackSpy).toHaveBeenCalledWith("reveal_wall_hit", { surface: "bank", exam: "NDA" });
  });

  it("SENDS NOTHING when the flag is off", async () => {
    const { trackFunnel, FUNNEL_ANALYTICS_ENABLED } = await loadWithFlag("off");
    expect(FUNNEL_ANALYTICS_ENABLED).toBe(false);
    trackFunnel("reveal_wall_hit", { surface: "bank", exam: "NDA" });
    trackFunnel("quiz_gate_submitted", { quizSlug: "x", mode: "form" });
    expect(trackSpy).not.toHaveBeenCalled();
  });

  it("honours every documented opt-out spelling", async () => {
    for (const flag of ["off", "0", "false", "no", "OFF"]) {
      const { trackFunnel } = await loadWithFlag(flag);
      trackFunnel("teacher_gate_shown", { signedIn: false, mode: "cart" });
      expect(trackSpy, `${flag} should suppress`).not.toHaveBeenCalled();
    }
  });
});

describe("trackFunnel send path", () => {
  it("drops an event that fails validation rather than sending it", async () => {
    const { trackFunnel } = await loadWithFlag(undefined);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    // A mobile number in a property — the hazard quiz_gate_submitted sits next to.
    trackFunnel("quiz_gate_submitted", { quizSlug: "9876543210" });
    expect(trackSpy).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("survives a throwing analytics client — telemetry never breaks the page", async () => {
    const { trackFunnel } = await loadWithFlag(undefined);
    trackSpy.mockImplementationOnce(() => {
      throw new Error("ad blocker");
    });
    expect(() => trackFunnel("reveal_wall_signin_click", { surface: "board" })).not.toThrow();
  });
});

describe("trackFunnelOnce", () => {
  it("sends the first call and suppresses repeats of the same key", async () => {
    const { trackFunnelOnce } = await loadWithFlag(undefined);
    trackFunnelOnce("teacher_gate_shown", "cart", { signedIn: false, mode: "cart" });
    trackFunnelOnce("teacher_gate_shown", "cart", { signedIn: false, mode: "cart" });
    trackFunnelOnce("teacher_gate_shown", "cart", { signedIn: false, mode: "cart" });
    expect(trackSpy).toHaveBeenCalledTimes(1);
  });

  it("treats a different dedupe key as a different moment", async () => {
    const { trackFunnelOnce } = await loadWithFlag(undefined);
    trackFunnelOnce("teacher_gate_shown", "filters", { signedIn: false, mode: "filters" });
    trackFunnelOnce("teacher_gate_shown", "cart", { signedIn: false, mode: "cart" });
    expect(trackSpy).toHaveBeenCalledTimes(2);
  });

  it("does not let one event's key suppress another's", async () => {
    const { trackFunnelOnce } = await loadWithFlag(undefined);
    trackFunnelOnce("reveal_wall_hit", "bank", { surface: "bank", exam: "NDA" });
    trackFunnelOnce("reveal_wall_signin_click", "bank", { surface: "bank" });
    expect(trackSpy).toHaveBeenCalledTimes(2);
  });
});
