/**
 * Pure helpers for batch join codes (migration 0085). No I/O.
 *
 * A join code is read off a whiteboard or out of a WhatsApp message and typed
 * by hand on a phone, so normalisation is the whole job: the code the student
 * types is never byte-identical to the one stored, and every difference that
 * is not a real mistake has to be absorbed here.
 */
import { describe, it, expect } from "vitest";
import {
  JOIN_CODE_ALPHABET,
  JOIN_CODE_LENGTH,
  formatJoinCode,
  generateJoinCode,
  normalizeJoinCode,
} from "@/lib/batches/joinCode";

describe("generateJoinCode", () => {
  it("uses only the unambiguous alphabet", () => {
    for (let i = 0; i < 200; i++) {
      const code = generateJoinCode();
      expect(code).toHaveLength(JOIN_CODE_LENGTH);
      for (const ch of code) expect(JOIN_CODE_ALPHABET).toContain(ch);
    }
  });

  it("excludes the letters that look like digits", () => {
    // I/L/O are absent by construction (Crockford base32), which is what makes
    // the confusable mapping in normalizeJoinCode unambiguous rather than a guess.
    for (const ch of "ILOU") expect(JOIN_CODE_ALPHABET).not.toContain(ch);
  });

  it("has an alphabet length that divides 256, or the generator is biased", () => {
    // generateJoinCode maps a random BYTE with `% length`. That is exactly
    // uniform only while 256 % length === 0. Changing the alphabet to a length
    // that does not divide 256 would silently skew codes toward its first
    // characters — invisible in every other test here.
    expect(256 % JOIN_CODE_ALPHABET.length).toBe(0);
  });

  it("does not obviously repeat", () => {
    const seen = new Set(Array.from({ length: 500 }, () => generateJoinCode()));
    expect(seen.size).toBe(500);
  });
});

describe("normalizeJoinCode", () => {
  const code = "ABCD2345";

  it("accepts the code exactly as generated", () => {
    expect(normalizeJoinCode(code)).toBe(code);
  });

  it("accepts it as displayed, with the grouping dash", () => {
    expect(normalizeJoinCode("ABCD-2345")).toBe(code);
  });

  it("absorbs lowercase, spaces and stray punctuation from a paste", () => {
    expect(normalizeJoinCode("  abcd 2345 ")).toBe(code);
    expect(normalizeJoinCode("abcd_2345")).toBe(code);
  });

  it("maps the confusable characters the alphabet deliberately excludes", () => {
    // A student reads "0" as the letter O and types it, or reads "1" as I or l.
    // Crockford's mapping is defined precisely so this is a repair, not a guess.
    expect(normalizeJoinCode("OOOO1111")).toBe("00001111");
    expect(normalizeJoinCode("iiii-LLLL")).toBe("11111111");
  });

  it("rejects the wrong length rather than padding or truncating", () => {
    expect(normalizeJoinCode("ABCD234")).toBeNull();
    expect(normalizeJoinCode("ABCD23456")).toBeNull();
    expect(normalizeJoinCode("")).toBeNull();
  });

  it("rejects a character outside the alphabet with no confusable mapping", () => {
    expect(normalizeJoinCode("ABCD234U")).toBeNull();
  });

  it("never throws on junk input", () => {
    expect(normalizeJoinCode("!!!")).toBeNull();
    expect(normalizeJoinCode("   ")).toBeNull();
  });

  it("round-trips whatever it generates, through the displayed form", () => {
    for (let i = 0; i < 100; i++) {
      const c = generateJoinCode();
      expect(normalizeJoinCode(formatJoinCode(c))).toBe(c);
    }
  });
});

describe("formatJoinCode", () => {
  it("groups into two halves for reading aloud", () => {
    expect(formatJoinCode("ABCD2345")).toBe("ABCD-2345");
  });
});
