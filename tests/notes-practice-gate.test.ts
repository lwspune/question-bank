/**
 * Pure state resolver for the client-side /notes practice gate. Three states so
 * the gate can show a skeleton while auth resolves (no flash of walled content),
 * then reveal the interactive practice to signed-in users or a sign-in wall to
 * anon. The gate is a conversion mechanism over PUBLIC content (the checkpoint
 * PYQs are already on /browse), so it lives client-side to keep every notes page
 * ISR-cached — it is NOT a security boundary.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { practiceGateState } from "@/lib/notes/access";

describe("practiceGateState", () => {
  it("returns 'loading' while auth is unresolved (either signed-in value)", () => {
    expect(practiceGateState({ signedIn: false, loading: true })).toBe("loading");
    expect(practiceGateState({ signedIn: true, loading: true })).toBe("loading");
  });

  it("returns 'locked' for a resolved anon viewer", () => {
    expect(practiceGateState({ signedIn: false, loading: false })).toBe("locked");
  });

  it("returns 'open' for a resolved signed-in viewer", () => {
    expect(practiceGateState({ signedIn: true, loading: false })).toBe("open");
  });
});

/**
 * The wall's funnel pair (2026-11-03). Until then the notes page's main sign-in
 * moment had no denominator: signups that landed on /notes were countable, the
 * readers who MET the wall were not. A SOURCE scan, because the repo has no
 * jsdom; the emitter drift gate proves the names are emitted somewhere, this
 * proves they are emitted HERE and in the right way.
 */
describe("PracticeGate sign-in wall telemetry", () => {
  const src = readFileSync(
    join(process.cwd(), "src", "app", "notes", "_components", "PracticeGate.tsx"),
    "utf8"
  );

  it("counts the wall when it comes into VIEW, not when it mounts", () => {
    // The checkpoint wall mounts at the foot of every anon page view and the
    // compact wall mounts inside a CLOSED <details>, so a mount count would be a
    // page-view count. Only a view means a reader reached it.
    expect(src).toMatch(/new IntersectionObserver\(/);
    expect(src).toMatch(/trackFunnelOnce\(\s*"notes_practice_wall_shown"/);
  });

  it("dedupes per page AND variant, so a page's two walls stay apart", () => {
    expect(src).toMatch(/trackFunnelOnce\(\s*"notes_practice_wall_shown",\s*`\$\{pathname[^`]*\$\{variant\}`/);
  });

  it("records the click on BOTH sign-in links of the full wall and on the compact one", () => {
    const clicks = src.match(/trackFunnel\(\s*"notes_practice_wall_signin_click"/g) ?? [];
    expect(clicks.length).toBe(3);
  });
});
