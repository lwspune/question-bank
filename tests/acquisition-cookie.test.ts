import { describe, it, expect } from "vitest";
import { readAcquisitionCookie, writeAcquisitionCookieValue } from "@/lib/acquisition/cookie";
import { ACQ_MAX_LEN } from "@/lib/acquisition/source";

const good = encodeURIComponent(
  JSON.stringify({ s: "google", m: "organic", c: null, l: "/questions/nda", r: "google.com" })
);

describe("readAcquisitionCookie — the cookie is UNTRUSTED client input", () => {
  it("reads a well-formed value", () => {
    expect(readAcquisitionCookie(good)).toEqual({
      source: "google",
      medium: "organic",
      campaign: null,
      landing: "/questions/nda",
      referrerHost: "google.com",
    });
  });

  it("returns null for absent or empty input", () => {
    expect(readAcquisitionCookie(null)).toBeNull();
    expect(readAcquisitionCookie("")).toBeNull();
  });

  it("returns null rather than throwing on junk", () => {
    for (const bad of ["not json", "%%%", "{", "[]", encodeURIComponent('"a string"'), encodeURIComponent("42")]) {
      expect(readAcquisitionCookie(bad), bad).toBeNull();
    }
  });

  it("REQUIRES source and medium — a partial record is not attribution", () => {
    const noMedium = encodeURIComponent(JSON.stringify({ s: "google" }));
    expect(readAcquisitionCookie(noMedium)).toBeNull();
  });

  it("TRUNCATES an over-long field instead of letting it reach a CHECK and 500", () => {
    const long = "x".repeat(400);
    const v = encodeURIComponent(JSON.stringify({ s: long, m: long, c: long, l: long, r: long }));
    const acq = readAcquisitionCookie(v)!;
    expect(acq.source.length).toBe(ACQ_MAX_LEN);
    expect(acq.medium.length).toBe(ACQ_MAX_LEN);
    expect(acq.campaign!.length).toBe(ACQ_MAX_LEN);
    expect(acq.landing.length).toBe(ACQ_MAX_LEN);
    expect(acq.referrerHost!.length).toBe(ACQ_MAX_LEN);
  });

  it("coerces a non-string field to null rather than storing an object", () => {
    const v = encodeURIComponent(JSON.stringify({ s: "google", m: "organic", c: { a: 1 }, l: 5, r: [] }));
    const acq = readAcquisitionCookie(v)!;
    expect(acq.campaign).toBeNull();
    expect(acq.referrerHost).toBeNull();
    expect(acq.landing).toBe("/"); // a non-string landing falls back, never throws
  });

  it("round-trips what the client writer produces", () => {
    const value = writeAcquisitionCookieValue({
      source: "instagram",
      medium: "social",
      campaign: "sep_push",
      landing: "/notes",
      referrerHost: "instagram.com",
    });
    expect(readAcquisitionCookie(value)).toEqual({
      source: "instagram",
      medium: "social",
      campaign: "sep_push",
      landing: "/notes",
      referrerHost: "instagram.com",
    });
  });
});
