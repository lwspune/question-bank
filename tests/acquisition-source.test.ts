import { describe, it, expect } from "vitest";
import {
  parseAcquisition,
  isFirstTouchWorthStoring,
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

describe("isFirstTouchWorthStoring — first touch wins, and direct never overwrites", () => {
  it("stores when nothing has been captured yet", () => {
    expect(isFirstTouchWorthStoring({ existing: null, incoming: { source: "google", medium: "organic" } })).toBe(true);
  });

  it("does NOT overwrite an existing first touch", () => {
    const existing = { source: "google", medium: "organic" };
    expect(isFirstTouchWorthStoring({ existing, incoming: { source: "instagram", medium: "social" } })).toBe(false);
  });

  it("refuses to store a bare direct hit as the first touch", () => {
    // Otherwise the first internal page load of a session overwrites nothing
    // with "direct" and every campaign click is attributed to nobody.
    expect(isFirstTouchWorthStoring({ existing: null, incoming: { source: "direct", medium: "direct" } })).toBe(false);
  });
});
