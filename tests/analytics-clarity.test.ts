import { describe, it, expect } from "vitest";
import {
  CLARITY_EXCLUDED_PREFIXES,
  buildClaritySnippet,
  clarityCommandFor,
  isClarityHost,
  resolveClarityProjectId,
  shouldLoadClarity,
} from "@/lib/analytics/clarity";

/**
 * Microsoft Clarity session recordings: the pure rule for WHERE the tag may
 * load, and the one place the inline snippet is assembled.
 *
 * The route rule is the privacy boundary. A recording is a replay of the screen
 * shipped to a third party, and the staff surfaces render student rosters,
 * lead mobile numbers and comp grants that nobody consented to have replayed.
 * The rule must therefore fail CLOSED on every staff prefix and must match on
 * a path segment, not a string prefix — `/accounting` is not `/account`.
 */

describe("shouldLoadClarity", () => {
  it("loads on the public and student surfaces", () => {
    for (const p of ["/", "/browse", "/notes/nda/maths", "/mock/attempt/abc/result", "/me", "/quiz/x", "/pricing", "/login"]) {
      expect(shouldLoadClarity(p), p).toBe(true);
    }
  });

  it("refuses every staff prefix, root and nested", () => {
    for (const prefix of CLARITY_EXCLUDED_PREFIXES) {
      expect(shouldLoadClarity(prefix), prefix).toBe(false);
      expect(shouldLoadClarity(`${prefix}/`), `${prefix}/`).toBe(false);
      expect(shouldLoadClarity(`${prefix}/x/y`), `${prefix}/x/y`).toBe(false);
    }
  });

  it("covers the surfaces that render an org name or personal rows", () => {
    // Mirrors the middleware matcher + the superadmin console + the org-scoped
    // paper/book surfaces (the CLAUDE.md list of where organizations.name renders).
    expect(CLARITY_EXCLUDED_PREFIXES).toEqual(
      expect.arrayContaining(["/dashboard", "/superadmin", "/account", "/upload", "/uploads", "/papers", "/books"]),
    );
  });

  it("matches on a segment boundary, not a string prefix", () => {
    expect(shouldLoadClarity("/accounting")).toBe(true);
    expect(shouldLoadClarity("/dashboards-of-the-world")).toBe(true);
    expect(shouldLoadClarity("/uploader")).toBe(true);
  });

  it("fails closed on an unusable pathname", () => {
    expect(shouldLoadClarity("")).toBe(false);
    expect(shouldLoadClarity(null)).toBe(false);
  });
});

// Only the live site records. On 2026-10-01 two of 76 recorded sessions were
// localhost dev visits: .env.local carries the production project id, so every
// local test landed in the same project as real students. Preview deploys
// would do the same. An allowlist fails closed on any host nobody named.
describe("isClarityHost", () => {
  it("records on the production hosts", () => {
    expect(isClarityHost("www.pyqvault.com")).toBe(true);
    expect(isClarityHost("pyqvault.com")).toBe(true);
  });

  it("never records local development", () => {
    for (const h of ["localhost", "127.0.0.1", "[::1]", "192.168.1.5", "mypc.local"]) {
      expect(isClarityHost(h), h).toBe(false);
    }
  });

  it("never records preview or legacy deploy hosts", () => {
    expect(isClarityHost("question-bank-git-feat-x-lws-pune.vercel.app")).toBe(false);
    expect(isClarityHost("question-bank-sage.vercel.app")).toBe(false);
  });

  it("fails closed on lookalikes and junk", () => {
    for (const h of ["pyqvault.com.evil.io", "evilpyqvault.com", "", null, undefined]) {
      expect(isClarityHost(h as string), String(h)).toBe(false);
    }
  });

  it("ignores case, as hostnames do", () => {
    expect(isClarityHost("WWW.PyqVault.com")).toBe(true);
  });
});

describe("clarityCommandFor", () => {
  it("stops recording when a client-side navigation crosses INTO staff, starts when it leaves", () => {
    // Clarity is loaded once per document; a soft navigation from /browse to
    // /dashboard keeps the script alive, so the island has to tell it to stop.
    expect(clarityCommandFor("/dashboard/students")).toBe("stop");
    expect(clarityCommandFor("/browse")).toBe("start");
  });
});

describe("resolveClarityProjectId", () => {
  it("returns the id only when it is a plain lowercase alphanumeric token", () => {
    expect(resolveClarityProjectId("yqft2ktqvu")).toBe("yqft2ktqvu");
  });

  it("is OFF when unset or blank — an absent id must not inject a broken tag", () => {
    expect(resolveClarityProjectId(undefined)).toBeNull();
    expect(resolveClarityProjectId("")).toBeNull();
    expect(resolveClarityProjectId("   ")).toBeNull();
  });

  it("rejects anything that could break out of the inline script", () => {
    // The id is interpolated into a <script> body; only a token shape is allowed.
    for (const bad of ['abc"', "abc</script>", "a b", "ABC123", "x;alert(1)"]) {
      expect(resolveClarityProjectId(bad), bad).toBeNull();
    }
  });
});

describe("buildClaritySnippet", () => {
  it("is Clarity's own loader with the project id in the tag URL argument", () => {
    const s = buildClaritySnippet("yqft2ktqvu");
    expect(s).toContain('"https://www.clarity.ms/tag/"+i');
    expect(s).toContain('window, document, "clarity", "script", "yqft2ktqvu"');
    expect(s).not.toContain("<script");
  });
});
