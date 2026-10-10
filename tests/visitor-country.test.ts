/**
 * readCountry: the visitor's country as Vercel's edge reports it, in the
 * `x-vercel-ip-country` request header (ISO 3166-1 alpha-2, e.g. "IN").
 * Absent locally and on any non-Vercel host, so "no country" is a normal
 * answer, never an error. Anything that is not two letters is refused, so
 * the column's CHECK can never be the thing that catches it.
 *
 * withCountry: stamps that country onto a paywall_event's metadata, on the
 * server, so a browser can never supply its own.
 */
import { describe, it, expect } from "vitest";
import { COUNTRY_RECORDED_SINCE, countryName, readCountry, withCountry } from "@/lib/acquisition/country";
import { paywallEvent } from "@/lib/activity/clientEvents";

const headers = (v?: string) => new Headers(v === undefined ? {} : { "x-vercel-ip-country": v });

describe("readCountry", () => {
  it("returns the two-letter code Vercel sends", () => {
    expect(readCountry(headers("IN"))).toBe("IN");
    expect(readCountry(headers("KE"))).toBe("KE");
  });

  it("upper-cases and trims a code that is otherwise valid", () => {
    expect(readCountry(headers(" in "))).toBe("IN");
  });

  it("returns null when the header is missing (local dev, non-Vercel hosts)", () => {
    expect(readCountry(headers())).toBeNull();
  });

  it("returns null for anything that is not exactly two letters", () => {
    for (const bad of ["", "I", "IND", "1N", "I-", "<script>", "India"]) {
      expect(readCountry(headers(bad))).toBeNull();
    }
  });
});

describe("withCountry", () => {
  it("adds the country to the event's metadata, keeping what was there", () => {
    const e = withCountry(paywallEvent("checkout_opened", "pricing", "mock-pass-6m"), "IN");
    expect(e.metadata).toEqual({ step: "checkout_opened", gate: "pricing", country: "IN" });
    expect(e.refId).toBe("mock-pass-6m");
  });

  it("leaves the event untouched when there is no country", () => {
    const before = paywallEvent("checkout_dismissed", "pricing");
    expect(withCountry(before, null)).toEqual(before);
  });

  it("does not mutate the event it was given", () => {
    const before = paywallEvent("checkout_opened", "teacher");
    withCountry(before, "IN");
    expect(before.metadata).toEqual({ step: "checkout_opened", gate: "teacher" });
  });
});

describe("countryName", () => {
  it("names a country from its two-letter code", () => {
    expect(countryName("IN")).toBe("India");
    expect(countryName("AE")).toBe("United Arab Emirates");
  });

  // Intl answers an unassigned code with the code itself ("XX") or with
  // "Unknown Region" ("ZZ"). Both mean "we do not know this one", and the
  // dashboard should show the raw code rather than a made-up name.
  it("returns the code itself for a code Intl does not know", () => {
    expect(countryName("XX")).toBe("XX");
    expect(countryName("ZZ")).toBe("ZZ");
  });
});

describe("COUNTRY_RECORDED_SINCE", () => {
  // The deploy that started recording landed between 15:40 and 16:00 UTC on
  // 9 Oct; accounts made before it have no country and must not be counted
  // as "not recorded" on /dashboard/growth.
  it("is the moment recording went live, as an ISO timestamp", () => {
    expect(new Date(COUNTRY_RECORDED_SINCE).toISOString()).toBe("2026-10-09T16:00:00.000Z");
  });
});
