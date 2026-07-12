/**
 * Pure state resolver for the client-side /notes practice gate. Three states so
 * the gate can show a skeleton while auth resolves (no flash of walled content),
 * then reveal the interactive practice to signed-in users or a sign-in wall to
 * anon. The gate is a conversion mechanism over PUBLIC content (the checkpoint
 * PYQs are already on /browse), so it lives client-side to keep every notes page
 * ISR-cached — it is NOT a security boundary.
 */
import { describe, it, expect } from "vitest";
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
