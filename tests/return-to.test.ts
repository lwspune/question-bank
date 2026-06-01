import { describe, it, expect } from "vitest";
import {
  isSafeReturnPath,
  parseReturnTarget,
  RETURN_TO_KEY,
} from "@/lib/browse/returnTo";

describe("isSafeReturnPath", () => {
  it("accepts internal /notes paths", () => {
    expect(isSafeReturnPath("/notes/nda-maths/vectors/cross-product")).toBe(
      true
    );
  });

  it("accepts internal /notes paths with a fragment", () => {
    expect(
      isSafeReturnPath("/notes/nda-maths/vectors/cross-product#triple-product")
    ).toBe(true);
  });

  it("accepts internal /guide paths", () => {
    expect(isSafeReturnPath("/guide/nda-maths/principles/vieta")).toBe(true);
  });

  it("rejects null / undefined / empty", () => {
    expect(isSafeReturnPath(null)).toBe(false);
    expect(isSafeReturnPath(undefined)).toBe(false);
    expect(isSafeReturnPath("")).toBe(false);
  });

  it("rejects paths outside the allow-list", () => {
    expect(isSafeReturnPath("/browse")).toBe(false);
    expect(isSafeReturnPath("/dashboard")).toBe(false);
    expect(isSafeReturnPath("/")).toBe(false);
  });

  it("rejects absolute URLs (open-redirect guard)", () => {
    expect(isSafeReturnPath("https://evil.example.com/notes/x")).toBe(false);
    expect(isSafeReturnPath("http://evil.example.com")).toBe(false);
  });

  it("rejects protocol-relative URLs", () => {
    expect(isSafeReturnPath("//evil.example.com/notes/x")).toBe(false);
  });

  it("rejects backslash tricks", () => {
    expect(isSafeReturnPath("/notes\\..\\dashboard")).toBe(false);
  });

  it("requires a leading slash", () => {
    expect(isSafeReturnPath("notes/nda-maths")).toBe(false);
  });
});

describe("parseReturnTarget", () => {
  it("returns null when no from param", () => {
    expect(parseReturnTarget("?examId=e1&subjectId=s2")).toBeNull();
  });

  it("returns href + label for a valid from", () => {
    const search =
      "?extras=u1%2Cu2&from=%2Fnotes%2Fnda-maths%2Fvectors%2Fcross-product%23triple&fromLabel=Vectors%20notes";
    expect(parseReturnTarget(search)).toEqual({
      href: "/notes/nda-maths/vectors/cross-product#triple",
      label: "Vectors notes",
    });
  });

  it("tolerates a missing leading question mark", () => {
    expect(
      parseReturnTarget("from=%2Fnotes%2Fnda-maths%2Fvectors")
    ).toEqual({ href: "/notes/nda-maths/vectors", label: "your notes" });
  });

  it("falls back to a generic label when fromLabel is absent", () => {
    expect(parseReturnTarget("?from=%2Fguide%2Fnda-maths")).toEqual({
      href: "/guide/nda-maths",
      label: "your notes",
    });
  });

  it("returns null when from fails the safe-path guard", () => {
    expect(
      parseReturnTarget("?from=https%3A%2F%2Fevil.example.com")
    ).toBeNull();
    expect(parseReturnTarget("?from=%2Fbrowse")).toBeNull();
  });

  it("trims a whitespace-only label down to the fallback", () => {
    expect(
      parseReturnTarget("?from=%2Fnotes%2Fx&fromLabel=%20%20")
    ).toEqual({ href: "/notes/x", label: "your notes" });
  });
});

describe("RETURN_TO_KEY", () => {
  it("is a stable, versioned sessionStorage key", () => {
    expect(RETURN_TO_KEY).toBe("qb:returnTo:v1");
  });
});
