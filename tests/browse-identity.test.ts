/**
 * Unit spec for the public-page identity resolver (pure halves).
 *
 * Why this exists: `/browse` used to resolve the viewer THREE times per request
 * — `getSessionMember()` + `getSessionUser()` + `getSessionSuperadmin()` — each
 * constructing its own Supabase client and each calling `auth.getUser()`, all
 * sequentially, on every hit including the anon ones that are the overwhelming
 * majority of traffic. This collapses that to a single resolution, and skips it
 * entirely when the request carries no Supabase auth cookie at all.
 *
 * The cookie sniff is deliberately PERMISSIVE. A false positive (we run the
 * normal auth path for a request that turns out to be anon) costs one wasted
 * lookup. A false negative (we treat a genuinely signed-in staff member as anon)
 * would silently strip their Edit button and paper-builder affordances. So the
 * predicate errs toward "might be signed in" — never toward "definitely not".
 */
import { describe, it, expect } from "vitest";
import {
  hasSupabaseAuthCookie,
  isSupabaseAuthCookieName,
  deriveIdentity,
  ANON_IDENTITY,
} from "@/lib/auth-identity";

describe("isSupabaseAuthCookieName", () => {
  it("matches the standard @supabase/ssr session cookie", () => {
    expect(isSupabaseAuthCookieName("sb-wunvtnqlzjrkvolslbnm-auth-token")).toBe(
      true
    );
  });

  it("matches the CHUNKED session cookie halves", () => {
    // A session larger than the 4KB cookie limit is split into `.0`, `.1`, ...
    // Missing these would read a large signed-in session as anon.
    expect(
      isSupabaseAuthCookieName("sb-wunvtnqlzjrkvolslbnm-auth-token.0")
    ).toBe(true);
    expect(
      isSupabaseAuthCookieName("sb-wunvtnqlzjrkvolslbnm-auth-token.1")
    ).toBe(true);
  });

  it("matches the OAuth code-verifier cookie too (permissive by design)", () => {
    // Not a session, but a mid-OAuth request is not worth a false negative.
    expect(
      isSupabaseAuthCookieName("sb-wunvtnqlzjrkvolslbnm-auth-token-code-verifier")
    ).toBe(true);
  });

  it("ignores this project's own non-auth cookies", () => {
    expect(isSupabaseAuthCookieName("qb_exam")).toBe(false);
    expect(isSupabaseAuthCookieName("qb_revealed")).toBe(false);
    expect(isSupabaseAuthCookieName("qb_mobile_prompt")).toBe(false);
  });

  it("ignores unrelated third-party cookies", () => {
    expect(isSupabaseAuthCookieName("_vercel_jwt")).toBe(false);
    expect(isSupabaseAuthCookieName("__Host-next-auth.csrf-token")).toBe(false);
    expect(isSupabaseAuthCookieName("")).toBe(false);
  });

  it("does not match a bare `sb-` prefix with no auth-token segment", () => {
    expect(isSupabaseAuthCookieName("sb-provider-token")).toBe(false);
  });
});

describe("hasSupabaseAuthCookie", () => {
  it("is false for a request with no cookies at all", () => {
    expect(hasSupabaseAuthCookie([])).toBe(false);
  });

  it("is false for an anon visitor carrying only app cookies", () => {
    // The common case: a student who picked an exam but never signed in.
    expect(hasSupabaseAuthCookie(["qb_exam", "qb_revealed"])).toBe(false);
  });

  it("is true when a session cookie sits among app cookies", () => {
    expect(
      hasSupabaseAuthCookie([
        "qb_exam",
        "sb-wunvtnqlzjrkvolslbnm-auth-token",
        "qb_revealed",
      ])
    ).toBe(true);
  });

  it("is true when only a chunked half is present", () => {
    expect(
      hasSupabaseAuthCookie(["sb-wunvtnqlzjrkvolslbnm-auth-token.1"])
    ).toBe(true);
  });
});

describe("deriveIdentity", () => {
  it("returns the anon identity when there is no user", () => {
    expect(
      deriveIdentity({ hasUser: false, isOrgMember: false, isSuperadmin: false })
    ).toEqual(ANON_IDENTITY);
  });

  it("never grants anything on a userless request, even if the flags say otherwise", () => {
    // Defensive: no user ⇒ no privilege, regardless of stale lookup results.
    expect(
      deriveIdentity({ hasUser: false, isOrgMember: true, isSuperadmin: true })
    ).toEqual(ANON_IDENTITY);
  });

  it("treats a self-serve student as signed-in but not staff", () => {
    expect(
      deriveIdentity({ hasUser: true, isOrgMember: false, isSuperadmin: false })
    ).toEqual({ isSignedIn: true, isStaff: false, canEditContent: false });
  });

  it("treats an org member as staff", () => {
    expect(
      deriveIdentity({ hasUser: true, isOrgMember: true, isSuperadmin: false })
    ).toEqual({ isSignedIn: true, isStaff: true, canEditContent: false });
  });

  it("grants content editing to a superadmin who is NOT an org member", () => {
    // Superadmin lives in `platform_admins`, not `org_members` (migration 0056)
    // — so the two axes are independent and must not be collapsed.
    expect(
      deriveIdentity({ hasUser: true, isOrgMember: false, isSuperadmin: true })
    ).toEqual({ isSignedIn: true, isStaff: false, canEditContent: true });
  });

  it("grants both when the superadmin is also an org member (the live operator)", () => {
    expect(
      deriveIdentity({ hasUser: true, isOrgMember: true, isSuperadmin: true })
    ).toEqual({ isSignedIn: true, isStaff: true, canEditContent: true });
  });
});
