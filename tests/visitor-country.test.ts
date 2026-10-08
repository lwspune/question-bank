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
import { readCountry, withCountry } from "@/lib/acquisition/country";
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
