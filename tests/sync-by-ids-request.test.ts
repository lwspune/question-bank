import { describe, expect, it } from "vitest";
import { parseIdsParam, MAX_IDS } from "@/lib/sync/byIdsRequest";

const A = "11111111-1111-4111-8111-111111111111";
const B = "22222222-2222-4222-8222-222222222222";

describe("parseIdsParam", () => {
  it("parses a comma-separated list", () => {
    expect(parseIdsParam(`${A},${B}`)).toEqual({ ok: true, ids: [A, B] });
  });

  it("trims whitespace and ignores empty segments", () => {
    expect(parseIdsParam(` ${A} , , ${B} ,`)).toEqual({ ok: true, ids: [A, B] });
  });

  it("dedupes — a repeated id must not eat the cap", () => {
    expect(parseIdsParam(`${A},${A},${B}`)).toEqual({ ok: true, ids: [A, B] });
  });

  it("rejects a missing or empty parameter", () => {
    expect(parseIdsParam(null).ok).toBe(false);
    expect(parseIdsParam("").ok).toBe(false);
    expect(parseIdsParam(" , ").ok).toBe(false);
  });

  it("rejects anything that is not a uuid, naming the offender", () => {
    const r = parseIdsParam(`${A},eng-geo-19aug-7`);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("eng-geo-19aug-7");
  });

  it("REFUSES an over-cap request rather than silently truncating", () => {
    const many = Array.from({ length: MAX_IDS + 1 }, (_, i) =>
      `${String(i).padStart(8, "0")}-1111-4111-8111-111111111111`
    ).join(",");
    const r = parseIdsParam(many);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/too many|max/i);
  });

  it("accepts exactly the cap", () => {
    const many = Array.from({ length: MAX_IDS }, (_, i) =>
      `${String(i).padStart(8, "0")}-1111-4111-8111-111111111111`
    ).join(",");
    expect(parseIdsParam(many).ok).toBe(true);
  });
});
