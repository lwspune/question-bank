import { describe, expect, it } from "vitest";
import { maskPersonal } from "@/lib/chat/maskPersonal";

// Typed V questions are kept indefinitely (owner, 2026-10-09), so anything a
// student types that identifies them is masked before it is stored.
describe("maskPersonal", () => {
  it("masks an email address", () => {
    expect(maskPersonal("mail me at ravi.k_99@gmail.com please")).toBe("mail me at [email] please");
  });

  it.each([
    ["call 9876543210", "call [phone]"],
    ["call +91 98765 43210", "call [phone]"],
    ["call +91-9876543210 now", "call [phone] now"],
    ["call 098765-43210", "call [phone]"],
  ])("masks the phone number in %j", (input, out) => {
    expect(maskPersonal(input)).toBe(out);
  });

  it("leaves exam years, question numbers and marks alone", () => {
    const q = "Is the 2025 paper Q.31 worth 5 marks? I scored 142 of 300 in JEE 2026";
    expect(maskPersonal(q)).toBe(q);
  });

  it("leaves a long number that is not a phone (a roll number) alone", () => {
    expect(maskPersonal("roll no 12345")).toBe("roll no 12345");
  });
});
