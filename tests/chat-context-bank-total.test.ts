/**
 * V's "N public questions" figure comes from the cached exam catalogue
 * (2026-11-08). Before, loadVContext counted every PUBLIC question on EVERY
 * message, uncached: 262 calls and 22 GB read in 36 hours, for a number that
 * only moves on an ingest. Source scan: loadVContext is not unit-testable here.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const src = readFileSync(join(process.cwd(), "src/lib/chat/context.ts"), "utf8");

describe("V's context", () => {
  it("never counts the questions table itself", () => {
    expect(src).not.toMatch(/from\("questions"\)/);
  });

  it("reads the bank total from the catalogue", () => {
    expect(src).toMatch(/allPublicQuestions/);
  });
});
