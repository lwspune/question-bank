import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import {
  resolveGoogleClientId,
  shouldOfferOneTap,
  makeNonce,
  oneTapDestination,
  googleButtonDestination,
  isNewAccount,
  ONE_TAP_SIGNUP_SOURCE,
} from "@/lib/auth/oneTap";

const ID = "967773031774-ipoan0rqif44c61jpsf2nisrt6doipdc.apps.googleusercontent.com";

describe("resolveGoogleClientId", () => {
  it("accepts a web client id, trimmed", () => {
    expect(resolveGoogleClientId(`  ${ID}\n`)).toBe(ID);
  });

  // The Vercel value was first pasted as the Supabase dashboard URL. A wrong
  // value must switch One Tap OFF, not load Google with a broken client.
  it("rejects anything that is not a Google client id", () => {
    expect(resolveGoogleClientId(undefined)).toBeNull();
    expect(resolveGoogleClientId("")).toBeNull();
    expect(resolveGoogleClientId("https://supabase.com/dashboard/project/x/auth/providers")).toBeNull();
    expect(resolveGoogleClientId("abc.apps.googleusercontent.com.evil.com")).toBeNull();
  });
});

describe("shouldOfferOneTap", () => {
  const base = { clientId: ID, signedIn: false, loading: false, alreadyOffered: false };

  it("offers to a signed-out visitor once auth has resolved", () => {
    expect(shouldOfferOneTap(base)).toBe(true);
  });

  it("never offers without a client id", () => {
    expect(shouldOfferOneTap({ ...base, clientId: null })).toBe(false);
  });

  it("never offers to a signed-in viewer, or before auth resolves", () => {
    expect(shouldOfferOneTap({ ...base, signedIn: true })).toBe(false);
    expect(shouldOfferOneTap({ ...base, loading: true })).toBe(false);
  });

  // Once per page: a visitor who dismissed it should not be re-asked by every
  // locked card they scroll past.
  it("offers at most once per page", () => {
    expect(shouldOfferOneTap({ ...base, alreadyOffered: true })).toBe(false);
  });
});

describe("makeNonce", () => {
  it("returns a raw nonce and its SHA-256 hex digest", async () => {
    const { raw, hashed } = await makeNonce();
    expect(raw.length).toBeGreaterThanOrEqual(32);
    expect(hashed).toBe(createHash("sha256").update(raw).digest("hex"));
  });

  it("is fresh on every call", async () => {
    const a = await makeNonce();
    const b = await makeNonce();
    expect(a.raw).not.toBe(b.raw);
  });
});

describe("oneTapDestination", () => {
  it("sends a not-yet-onboarded account through /welcome back to this page", () => {
    expect(oneTapDestination({ onboardedAt: null }, "/browse?examId=x&subjectId=y")).toBe(
      "/welcome?next=%2Fbrowse%3FexamId%3Dx%26subjectId%3Dy"
    );
  });

  it("keeps an onboarded account on the page (null = stay)", () => {
    expect(oneTapDestination({ onboardedAt: "2026-09-01T00:00:00Z" }, "/browse")).toBeNull();
  });

  it("never builds an off-site next", () => {
    expect(oneTapDestination({ onboardedAt: null }, "//evil.com")).toBe("/welcome?next=%2Fbrowse");
  });
});

describe("googleButtonDestination", () => {
  it("sends a brand-new account through /welcome, then on to next", () => {
    expect(googleButtonDestination({ onboardedAt: null }, "/mock/nda-2024-i", "/me")).toBe(
      "/welcome?next=%2Fmock%2Fnda-2024-i"
    );
  });

  it("sends an onboarded account straight to next", () => {
    expect(googleButtonDestination({ onboardedAt: "2026-09-01T00:00:00Z" }, "/browse?x=1", "/me")).toBe(
      "/browse?x=1"
    );
  });

  it("falls back to the person's home for a missing or off-site next", () => {
    const onboarded = { onboardedAt: "2026-09-01T00:00:00Z" };
    expect(googleButtonDestination(onboarded, null, "/me")).toBe("/me");
    expect(googleButtonDestination(onboarded, "//evil.com", "/dashboard")).toBe("/dashboard");
    expect(googleButtonDestination({ onboardedAt: null }, "https://evil.com", "/me")).toBe("/welcome?next=%2Fme");
  });
});

describe("isNewAccount", () => {
  // Only a brand-new account may be stamped signup_source=onetap. An existing
  // account with no source (most of them) signing in via One Tap is a RETURN,
  // and stamping it would credit One Tap with signups it did not cause.
  it("is true when the account was created at this sign-in", () => {
    expect(isNewAccount("2026-10-01T10:00:00.000Z", "2026-10-01T10:00:00.412Z")).toBe(true);
  });

  it("is false for an older account signing in again", () => {
    expect(isNewAccount("2026-08-01T10:00:00Z", "2026-10-01T10:00:00Z")).toBe(false);
  });

  it("is false when either timestamp is missing or unreadable", () => {
    expect(isNewAccount(undefined, "2026-10-01T10:00:00Z")).toBe(false);
    expect(isNewAccount("2026-10-01T10:00:00Z", null)).toBe(false);
    expect(isNewAccount("garbage", "2026-10-01T10:00:00Z")).toBe(false);
  });
});

describe("ONE_TAP_SIGNUP_SOURCE", () => {
  it("is the attribution stamped on a first-time One Tap account", () => {
    expect(ONE_TAP_SIGNUP_SOURCE).toBe("onetap");
  });
});
