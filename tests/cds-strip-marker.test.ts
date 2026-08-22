import { describe, it, expect } from "vitest";
import { stripDerivationMarker } from "../scripts/cds/lib";

/**
 * The CDS ingest bakes an internal provenance bracket into the SOLUTION text
 * itself (scripts/cds/lib.ts), so it prints verbatim in a student-facing answer
 * key. This helper removes exactly that bracket and nothing else.
 *
 * The rules below each defend a specific way a looser implementation goes wrong:
 * a greedy `[...]` strip would eat legitimate editorial brackets, and a
 * non-idempotent one would corrupt text on a second pass over an already-cleaned
 * corpus.
 */
describe("stripDerivationMarker", () => {
  const marker = "[LLM-derived, confidence: MED; no official key — verify before PUBLIC]";

  it("removes the marker and the whitespace holding it on", () => {
    expect(stripDerivationMarker(`Answer: B. Because reasons. ${marker}`)).toBe(
      "Answer: B. Because reasons."
    );
  });

  it("handles every confidence level, including the HIGH parenthetical", () => {
    for (const conf of [
      "LOW",
      "MED",
      "HIGH",
      "HIGH (verified in review)",
    ]) {
      const m = `[LLM-derived, confidence: ${conf}; no official key — verify before PUBLIC]`;
      expect(stripDerivationMarker(`Answer: A. Text. ${m}`)).toBe("Answer: A. Text.");
    }
  });

  it("is idempotent — a second pass over cleaned text changes nothing", () => {
    const once = stripDerivationMarker(`Answer: C. Text. ${marker}`);
    expect(stripDerivationMarker(once)).toBe(once);
  });

  it("returns text with no marker unchanged", () => {
    const plain = "Answer: D. A perfectly ordinary solution.";
    expect(stripDerivationMarker(plain)).toBe(plain);
  });

  it("leaves OTHER bracketed editorial notes alone", () => {
    // [Textbook…] errata brackets are load-bearing across the bank — a greedy
    // bracket strip would silently delete adjudicated findings.
    const withErratum =
      "Answer: B. Working. [Textbook: the printed key gives 12, which is impossible here.]";
    expect(stripDerivationMarker(withErratum)).toBe(withErratum);
    expect(stripDerivationMarker(`${withErratum} ${marker}`)).toBe(withErratum);
  });

  it("removes the marker even when it is not at the very end", () => {
    expect(stripDerivationMarker(`Answer: A. ${marker} Trailing note.`)).toBe(
      "Answer: A. Trailing note."
    );
  });

  it("tolerates an ASCII hyphen where the em dash belongs", () => {
    const ascii = "[LLM-derived, confidence: LOW; no official key - verify before PUBLIC]";
    expect(stripDerivationMarker(`Answer: A. Text. ${ascii}`)).toBe("Answer: A. Text.");
  });

  it("handles null and empty input without throwing", () => {
    expect(stripDerivationMarker(null)).toBe("");
    expect(stripDerivationMarker("")).toBe("");
  });

  it("does not leave a double space or a trailing space behind", () => {
    const out = stripDerivationMarker(`Answer: A. One. ${marker} Two.`);
    expect(out).not.toMatch(/ {2}/);
    expect(out).toBe(out.trim());
  });
});
