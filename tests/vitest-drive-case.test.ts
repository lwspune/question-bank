import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { upperDriveLetter } from "../scripts/lib/driveCase.mjs";

// Vitest crashes EVERY test file ("reading 'config'", 0 tests) when it starts
// from a folder spelled with a lowercase drive letter (c:\...): test files then
// import vitest by a path that differs only in case from the runner's own, so
// it loads twice. The Bash tool starts in c:\...\Question_Bank, and a `cd` to
// that same folder keeps the lowercase spelling, so a push from there crashed
// the gate at least six times (2026-11-11 to 2026-11-17). Moving to uppercase
// inside vitest.config.ts is too late (measured: still crashes), so the test
// scripts start Vitest through scripts/vitest.mjs, which fixes the folder first.

describe("upperDriveLetter", () => {
  it("uppercases a lowercase Windows drive letter", () => {
    expect(upperDriveLetter("c:\\Users\\vilas\\Downloads\\Question_Bank")).toBe(
      "C:\\Users\\vilas\\Downloads\\Question_Bank",
    );
    expect(upperDriveLetter("d:\\")).toBe("D:\\");
  });

  it("leaves an uppercase drive letter alone", () => {
    expect(upperDriveLetter("C:\\Users\\vilas")).toBe("C:\\Users\\vilas");
  });

  it("leaves a POSIX path alone (CI runs on Ubuntu)", () => {
    expect(upperDriveLetter("/home/runner/work/question-bank")).toBe(
      "/home/runner/work/question-bank",
    );
  });

  it("only touches the drive letter, never the rest of the path", () => {
    expect(upperDriveLetter("c:\\users\\c:odd")).toBe("C:\\users\\c:odd");
  });
});

describe("package.json test scripts", () => {
  const scripts: Record<string, string> = JSON.parse(
    readFileSync(path.resolve(__dirname, "..", "package.json"), "utf8"),
  ).scripts;

  it.each(["test", "test:watch", "test:prod-contract"])(
    "%s starts Vitest through scripts/vitest.mjs",
    (name) => {
      expect(scripts[name]).toMatch(/^node scripts\/vitest\.mjs\b/);
    },
  );
});
