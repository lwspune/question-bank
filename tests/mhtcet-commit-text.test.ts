import { describe, expect, it } from "vitest";
import { commitText } from "../scripts/mhtcet/lib";

// commitText is the ONE normalisation commit.ts applies before storing a stem, option
// or solution. build-pdf-shift checks the committed form, not the transcript form,
// because the normaliser rewrites function names inside math zones and a word in
// \text{} can be caught by it.
describe("commitText", () => {
  it("upgrades a bare function name inside math to its upright macro", () => {
    expect(commitText(String.raw`\(sin x\)`)).toBe(String.raw`\(\sin x\)`);
  });

  it("leaves prose outside math alone", () => {
    expect(commitText("work done during expansion")).toBe("work done during expansion");
  });

  it("rewrites a prose word inside \\text{} in math (why prose belongs outside math)", () => {
    expect(commitText(String.raw`\(\text{work done during expansion}\)`)).toContain(String.raw`\exp`);
  });
});
