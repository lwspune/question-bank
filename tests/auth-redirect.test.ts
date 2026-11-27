import { describe, it, expect } from "vitest";
import { safeNextPath, signedInAuthPageRedirect, signedInHome, withNext, needsFullLoad } from "@/lib/auth/redirect";

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

describe("signedInAuthPageRedirect", () => {
  it("sends a signed-in visitor on /login to /dashboard by default", () => {
    expect(signedInAuthPageRedirect("/login", null)).toBe("/dashboard");
  });

  it("sends a signed-in visitor on /signup to /dashboard by default", () => {
    expect(signedInAuthPageRedirect("/signup", null)).toBe("/dashboard");
  });

  it("honours a safe ?next=", () => {
    expect(signedInAuthPageRedirect("/login", "/browse?exam=nda")).toBe(
      "/browse?exam=nda"
    );
    expect(signedInAuthPageRedirect("/signup", "/pricing")).toBe("/pricing");
  });

  it("refuses an off-site ?next=", () => {
    expect(signedInAuthPageRedirect("/login", "//evil.com")).toBe("/dashboard");
    expect(signedInAuthPageRedirect("/login", "https://evil.com")).toBe(
      "/dashboard"
    );
  });

  it("never points back at an auth page (no redirect loop)", () => {
    expect(signedInAuthPageRedirect("/login", "/login")).toBe("/dashboard");
    expect(signedInAuthPageRedirect("/login", "/signup?next=/me")).toBe(
      "/dashboard"
    );
    expect(signedInAuthPageRedirect("/signup", "/login/")).toBe("/dashboard");
  });

  it("leaves every other path alone", () => {
    expect(signedInAuthPageRedirect("/dashboard", null)).toBeNull();
    expect(signedInAuthPageRedirect("/account", "/me")).toBeNull();
    expect(signedInAuthPageRedirect("/loginx", null)).toBeNull();
  });
});

describe("signedInHome", () => {
  // Where a signed-in person lands when nothing else was asked for. It mirrors
  // /dashboard's own routing, so sending people here directly saves the hop
  // through /dashboard that every student login took (Clarity, 2026-10-05).
  it("sends a student (no org membership) to /me", () => {
    expect(signedInHome(null)).toBe("/me");
  });

  it("sends a teacher to the bank", () => {
    expect(signedInHome("TEACHER")).toBe("/browse");
  });

  it("sends an admin to the dashboard", () => {
    expect(signedInHome("ADMIN")).toBe("/dashboard");
  });
});

describe("withNext (switching between sign-up and sign-in keeps where the student was going)", () => {
  it("adds a safe next", () => {
    expect(withNext("/login", "/api/partner-course/cds-sikandar-3")).toBe("/login?next=%2Fapi%2Fpartner-course%2Fcds-sikandar-3");
  });
  it("leaves the link bare with no next", () => {
    expect(withNext("/signup", null)).toBe("/signup");
    expect(withNext("/signup", "")).toBe("/signup");
  });
  it("drops an off-site next rather than carrying it", () => {
    expect(withNext("/login", "//evil.example")).toBe("/login");
    expect(withNext("/login", "https://evil.example")).toBe("/login");
  });
});

describe("needsFullLoad (a sign-in returning to a link that leaves the app)", () => {
  it("is true for a route handler such as the course tap link", () => {
    expect(needsFullLoad("/api/partner-course/cds-sikandar-3")).toBe(true);
  });
  it("is false for an app page", () => {
    expect(needsFullLoad("/me")).toBe(false);
    expect(needsFullLoad("/welcome?next=%2Fapi%2Fpartner-course%2Fx")).toBe(false);
    expect(needsFullLoad("/apiary")).toBe(false);
  });
});
