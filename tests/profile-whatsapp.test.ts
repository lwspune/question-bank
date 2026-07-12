import { describe, it, expect } from "vitest";
import { needsWhatsappPrompt } from "@/lib/profile/whatsapp";

describe("needsWhatsappPrompt", () => {
  it("is true when there's no profile / never prompted", () => {
    expect(needsWhatsappPrompt(null)).toBe(true);
    expect(needsWhatsappPrompt(undefined)).toBe(true);
    expect(needsWhatsappPrompt({ whatsappPromptedAt: null })).toBe(true);
  });

  it("is false once the student has decided (opted in OR declined — ask once)", () => {
    expect(needsWhatsappPrompt({ whatsappPromptedAt: "2026-07-12T00:00:00.000Z" })).toBe(false);
  });
});
