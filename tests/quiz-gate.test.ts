import { describe, it, expect } from "vitest";
import { resolveQuizGate, priorConsentValid, type StoredIdentity } from "@/lib/quiz/gate";

describe("resolveQuizGate", () => {
  it("skips the gate entirely for a signed-in student (mobile or not)", () => {
    expect(resolveQuizGate({ signedIn: true, stored: null })).toBe("skip");
    expect(
      resolveQuizGate({ signedIn: true, stored: { name: "A", mobile: "9800000000" } })
    ).toBe("skip");
  });

  it("shows the one-tap continue for an anon returner with a complete stored identity", () => {
    expect(
      resolveQuizGate({ signedIn: false, stored: { name: "Asha", mobile: "9800000000" } })
    ).toBe("continue");
  });

  it("falls back to the full form for an anon first-timer (no stored identity)", () => {
    expect(resolveQuizGate({ signedIn: false, stored: null })).toBe("form");
  });

  it("falls back to the form when a stored identity is missing name or mobile", () => {
    expect(resolveQuizGate({ signedIn: false, stored: { name: "", mobile: "9800000000" } })).toBe(
      "form"
    );
    expect(resolveQuizGate({ signedIn: false, stored: { name: "Asha", mobile: "  " } })).toBe(
      "form"
    );
  });
});

describe("priorConsentValid", () => {
  it("is true only when the stored identity carries a consent timestamp", () => {
    const withConsent: StoredIdentity = {
      name: "Asha",
      mobile: "9800000000",
      consentedAt: "2026-07-22T00:00:00.000Z",
    };
    expect(priorConsentValid(withConsent)).toBe(true);
  });

  it("is false for a legacy stored identity without a consent timestamp", () => {
    expect(priorConsentValid({ name: "Asha", mobile: "9800000000" })).toBe(false);
  });

  it("is false when there is no stored identity", () => {
    expect(priorConsentValid(null)).toBe(false);
  });
});
