import { describe, it, expect } from "vitest";
import { safeNextPath } from "@/lib/auth/redirect";

describe("safeNextPath", () => {
  it("returns the fallback for non-string input", () => {
    expect(safeNextPath(undefined)).toBe("/browse");
    expect(safeNextPath(null)).toBe("/browse");
    expect(safeNextPath(42)).toBe("/browse");
    expect(safeNextPath({})).toBe("/browse");
  });

  it("honors an explicit fallback", () => {
    expect(safeNextPath(undefined, "/me")).toBe("/me");
  });

  it("allows internal absolute paths", () => {
    expect(safeNextPath("/me")).toBe("/me");
    expect(safeNextPath("/notes/nda/vectors/dot-product")).toBe(
      "/notes/nda/vectors/dot-product"
    );
    expect(safeNextPath("/browse?examId=abc&chapter=x")).toBe(
      "/browse?examId=abc&chapter=x"
    );
  });

  it("rejects external absolute URLs (open-redirect guard)", () => {
    expect(safeNextPath("http://evil.com")).toBe("/browse");
    expect(safeNextPath("https://evil.com/path")).toBe("/browse");
  });

  it("rejects protocol-relative and backslash tricks", () => {
    expect(safeNextPath("//evil.com")).toBe("/browse");
    expect(safeNextPath("/\\evil.com")).toBe("/browse");
    expect(safeNextPath("/\t//evil.com")).toBe("/browse");
  });

  it("rejects a path that does not start with a single slash", () => {
    expect(safeNextPath("")).toBe("/browse");
    expect(safeNextPath("me")).toBe("/browse");
    expect(safeNextPath("javascript:alert(1)")).toBe("/browse");
  });
});
