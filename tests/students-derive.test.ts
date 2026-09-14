import { describe, it, expect } from "vitest";
import { providerLabel, displayName } from "@/lib/students/derive";

describe("displayName", () => {
  it("prefers full_name, then name, then email", () => {
    expect(displayName({ full_name: "Asha K" }, "a@x.com")).toBe("Asha K");
    expect(displayName({ name: "Bob" }, "b@x.com")).toBe("Bob");
    expect(displayName(null, "c@x.com")).toBe("c@x.com");
  });
  it("falls back to email when the name is blank", () => {
    expect(displayName({ full_name: "  " }, "d@x.com")).toBe("d@x.com");
  });
});

describe("providerLabel", () => {
  it("maps known providers to a friendly label", () => {
    expect(providerLabel("google")).toBe("Google");
    expect(providerLabel("email")).toBe("Email");
  });
  it("treats a missing provider as Email (password signup)", () => {
    expect(providerLabel(undefined)).toBe("Email");
    expect(providerLabel(null)).toBe("Email");
  });
  it("capitalizes an unknown provider", () => {
    expect(providerLabel("github")).toBe("Github");
  });
});
