import { describe, it, expect } from "vitest";
import { validateChatMessage, CHAT_MESSAGE_MAX } from "@/lib/chat/validate";

describe("validateChatMessage", () => {
  it("accepts a normal question", () => {
    const v = validateChatMessage({ message: "Which exams do you cover?" });
    expect(v.ok).toBe(true);
    if (v.ok) expect(v.value).toBe("Which exams do you cover?");
  });

  it("trims surrounding whitespace", () => {
    const v = validateChatMessage({ message: "  how much is the teacher pass?  " });
    expect(v.ok).toBe(true);
    if (v.ok) expect(v.value).toBe("how much is the teacher pass?");
  });

  it("rejects an empty message", () => {
    const v = validateChatMessage({ message: "" });
    expect(v.ok).toBe(false);
  });

  it("rejects a whitespace-only message", () => {
    const v = validateChatMessage({ message: "   " });
    expect(v.ok).toBe(false);
  });

  it("rejects a missing message field", () => {
    const v = validateChatMessage({});
    expect(v.ok).toBe(false);
  });

  it(`rejects a message over ${CHAT_MESSAGE_MAX} characters rather than truncating it`, () => {
    const v = validateChatMessage({ message: "x".repeat(CHAT_MESSAGE_MAX + 1) });
    expect(v.ok).toBe(false);
  });

  it(`accepts a message of exactly ${CHAT_MESSAGE_MAX} characters`, () => {
    const v = validateChatMessage({ message: "x".repeat(CHAT_MESSAGE_MAX) });
    expect(v.ok).toBe(true);
  });
});
