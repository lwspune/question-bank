import { describe, it, expect } from "vitest";
import {
  parseAcquisition,
  isFirstTouchWorthStoring,
  acquisitionForAccount,
  ACQ_MAX_LEN,
} from "@/lib/acquisition/source";

const SELF = "www.pyqvault.com";
const at = (path: string) => `https://${SELF}${path}`;

describe("parseAcquisition — referrer classification", () => {
  it("reads a search engine as organic", () => {
    const a = parseAcquisition({ url: at("/questions/nda/maths/sets"), referrer: "https://www.google.com/", selfHost: SELF });
    expect(a).toEqual({
      source: "google",
      medium: "organic",
      campaign: null,
      landing: "/questions/nda/maths/sets",
      referrerHost: "google.com",
    });
  });

  it("recognises the search engines students actually use", () => {
    for (const host of ["google.co.in", "bing.com", "duckduckgo.com", "yandex.com", "search.yahoo.com"]) {
      const a = parseAcquisition({ url: at("/"), referrer: `https://${host}/`, selfHost: SELF });
      expect(a!.medium, host).toBe("organic");
    }
  });

  it("reads social and messaging referrers as social", () => {
    for (const host of ["instagram.com", "l.facebook.com", "t.co", "www.linkedin.com", "youtube.com"]) {
      const a = parseAcquisition({ url: at("/"), referrer: `https://${host}/x`, selfHost: SELF });
      expect(a!.medium, host).toBe("social");
    }
  });

  it("treats an unknown external site as a referral, keeping the host", () => {
    const a = parseAcquisition({ url: at("/mock"), referrer: "https://somecoaching.in/links", selfHost: SELF });
    expect(a!.medium).toBe("referral");
    expect(a!.source).toBe("somecoaching.in");
  });

  it("reads no referrer as direct", () => {
    const a = parseAcquisition({ url: at("/"), referrer: null, selfHost: SELF });
    expect(a!.source).toBe("direct");
    expect(a!.medium).toBe("direct");
    expect(a!.referrerHost).toBeNull();
  });

  it("treats an empty-string referrer as direct too", () => {
    expect(parseAcquisition({ url: at("/"), referrer: "", selfHost: SELF })!.medium).toBe("direct");
  });
});

describe("parseAcquisition — internal navigation is not an acquisition", () => {
  it("returns null when the referrer is our own site", () => {
    const a = parseAcquisition({ url: at("/browse"), referrer: at("/questions/nda/maths/sets"), selfHost: SELF });
    expect(a).toBeNull();
  });

  it("ignores a www/apex mismatch on our own host", () => {
    const a = parseAcquisition({ url: at("/browse"), referrer: "https://pyqvault.com/notes", selfHost: SELF });
    expect(a).toBeNull();
  });

  it("but a UTM on an internal link still counts — that is a tagged campaign click", () => {
    const a = parseAcquisition({
      url: at("/mock?utm_source=newsletter&utm_medium=email"),
      referrer: at("/browse"),
      selfHost: SELF,
    });
    expect(a!.source).toBe("newsletter");
    expect(a!.medium).toBe("email");
  });
});

describe("parseAcquisition — a sign-in hop is not an arrival", () => {
  // A visitor with no referrer who signs in through Google's redirect comes
  // back to /welcome with accounts.google.com as the referrer. Reading that as
  // a Google search credited 27 accounts to Google that Google never sent.
  it("returns null when the referrer is Google's sign-in page", () => {
    for (const host of ["accounts.google.com", "accounts.google.co.in"]) {
      const a = parseAcquisition({ url: at("/welcome"), referrer: `https://${host}/`, selfHost: SELF });
      expect(a, host).toBeNull();
    }
  });

  it("returns null when the referrer is our Supabase auth host", () => {
    const a = parseAcquisition({
      url: at("/welcome"),
      referrer: "https://wunvtnqlzjrkvolslbnm.supabase.co/auth/v1/callback",
      selfHost: SELF,
    });
    expect(a).toBeNull();
  });

  it("still reads a Google SEARCH referrer as organic", () => {
    const a = parseAcquisition({ url: at("/"), referrer: "https://www.google.com/", selfHost: SELF });
    expect(a!.source).toBe("google");
    expect(a!.medium).toBe("organic");
  });

  it("but a UTM on the landing URL still counts, as on an internal link", () => {
    const a = parseAcquisition({
      url: at("/welcome?utm_source=newsletter&utm_medium=email"),
      referrer: "https://accounts.google.com/",
      selfHost: SELF,
    });
    expect(a!.source).toBe("newsletter");
  });
});

describe("parseAcquisition — Gmail is email, not Google search", () => {
  it("reads mail.google.com as gmail / email", () => {
    const a = parseAcquisition({ url: at("/mock"), referrer: "https://mail.google.com/", selfHost: SELF });
    expect(a!.source).toBe("gmail");
    expect(a!.medium).toBe("email");
    expect(a!.referrerHost).toBe("mail.google.com");
  });
});

describe("parseAcquisition — UTM wins over the referrer", () => {
  it("prefers explicit campaign tags", () => {
    const a = parseAcquisition({
      url: at("/notes?utm_source=whatsapp&utm_medium=broadcast&utm_campaign=nda_sep"),
      referrer: "https://www.google.com/",
      selfHost: SELF,
    });
    expect(a!.source).toBe("whatsapp");
    expect(a!.medium).toBe("broadcast");
    expect(a!.campaign).toBe("nda_sep");
    // The referrer is still recorded — it is evidence, not a contradiction.
    expect(a!.referrerHost).toBe("google.com");
  });

  it("falls back to a campaign medium when utm_medium is absent", () => {
    const a = parseAcquisition({ url: at("/?utm_source=poster_qr"), referrer: null, selfHost: SELF });
    expect(a!.source).toBe("poster_qr");
    expect(a!.medium).toBe("campaign");
  });

  it("ignores a blank utm_source rather than storing an empty string", () => {
    const a = parseAcquisition({ url: at("/?utm_source=&utm_medium=email"), referrer: null, selfHost: SELF });
    expect(a!.source).toBe("direct");
  });
});

describe("parseAcquisition — normalisation and hostile input", () => {
  it("lowercases and strips www from the referrer host", () => {
    const a = parseAcquisition({ url: at("/"), referrer: "https://WWW.Example.COM/a", selfHost: SELF });
    expect(a!.source).toBe("example.com");
  });

  it("caps every stored field so a crafted URL cannot write an essay into the row", () => {
    const long = "x".repeat(500);
    const a = parseAcquisition({
      url: at(`/${long}?utm_source=${long}&utm_campaign=${long}`),
      referrer: null,
      selfHost: SELF,
    });
    expect(a!.source.length).toBeLessThanOrEqual(ACQ_MAX_LEN);
    expect(a!.campaign!.length).toBeLessThanOrEqual(ACQ_MAX_LEN);
    expect(a!.landing.length).toBeLessThanOrEqual(ACQ_MAX_LEN);
  });

  it("keeps only the PATH of the landing page — a query string can carry PII", () => {
    const a = parseAcquisition({ url: at("/browse?q=my+name&exam=nda"), referrer: null, selfHost: SELF });
    expect(a!.landing).toBe("/browse");
  });

  it("FAILS SAFE on a malformed url or referrer rather than throwing into a render", () => {
    expect(parseAcquisition({ url: "not a url", referrer: null, selfHost: SELF })).toBeNull();
    const a = parseAcquisition({ url: at("/"), referrer: "://broken", selfHost: SELF });
    expect(a!.medium).toBe("direct"); // unparseable referrer is treated as absent
  });
});

describe("isFirstTouchWorthStoring — first NAMED touch wins; a direct visit only holds the landing page", () => {
  it("stores when nothing has been captured yet", () => {
    expect(isFirstTouchWorthStoring({ existing: null, incoming: { source: "google", medium: "organic" } })).toBe(true);
  });

  it("does NOT overwrite an existing named first touch", () => {
    const existing = { source: "google", medium: "organic" };
    expect(isFirstTouchWorthStoring({ existing, incoming: { source: "instagram", medium: "social" } })).toBe(false);
  });

  it("stores a direct visit when nothing is captured, so its landing page is kept", () => {
    // 2026-10-13: half of signups had no channel AND no landing page, so we
    // could not even say where they came in. Internal page moves return null
    // from parseAcquisition, so a direct record cannot come from one.
    expect(isFirstTouchWorthStoring({ existing: null, incoming: { source: "direct", medium: "direct" } })).toBe(true);
  });

  it("lets a later named channel replace a stored direct visit", () => {
    const existing = { source: "direct", medium: "direct" };
    expect(isFirstTouchWorthStoring({ existing, incoming: { source: "chatgpt.com", medium: "campaign" } })).toBe(true);
  });

  it("never lets a direct visit replace anything, not even another direct one", () => {
    expect(
      isFirstTouchWorthStoring({ existing: { source: "google", medium: "organic" }, incoming: { source: "direct", medium: "direct" } })
    ).toBe(false);
    expect(
      isFirstTouchWorthStoring({ existing: { source: "direct", medium: "direct" }, incoming: { source: "direct", medium: "direct" } })
    ).toBe(false);
  });
});

describe("acquisitionForAccount — a direct record is saved only for a new account", () => {
  const direct = { source: "direct", medium: "direct", campaign: null, landing: "/browse", referrerHost: null };
  const google = { source: "google", medium: "organic", campaign: null, landing: "/", referrerHost: "google.com" };

  it("keeps a direct record for a new account", () => {
    expect(acquisitionForAccount(direct, true)).toEqual(direct);
  });

  it("drops a direct record for an old account, which stays 'never learned'", () => {
    // An account made before this change, onboarding today from a browser with
    // no cookie, did not arrive direct: we just never learned how it arrived.
    expect(acquisitionForAccount(direct, false)).toBeNull();
  });

  it("keeps a named channel either way, as before", () => {
    expect(acquisitionForAccount(google, true)).toEqual(google);
    expect(acquisitionForAccount(google, false)).toEqual(google);
  });

  it("passes null through", () => {
    expect(acquisitionForAccount(null, true)).toBeNull();
  });
});
