/**
 * Spec for the IndexNow submission payload.
 *
 * WHY THIS EXISTS (2026-09-17). Search Console's Coverage export reads 12 pages
 * indexed against 1,462 not, and the crawl-stats export explains it: in 51 days
 * Googlebot made **21 discovery requests**, so the discovered-not-crawled
 * backlog clears in ~9.5 years. Google offers no way to raise that; its only
 * manual lever is URL Inspection at ~10/day.
 *
 * IndexNow is the lever that DOES exist. Bing, Yandex, Naver and Seznam accept a
 * push submission and act on it in days rather than years, and Bing is already
 * this site's #3 referrer (204 visitors/30d) as well as the index behind
 * ChatGPT search. Google does NOT participate — nothing here helps Google, and
 * a reader should not infer that it does.
 *
 * THE TRAP THIS SPEC EXISTS TO PIN: IndexNow rejects an ENTIRE submission when
 * any single URL is off-host. One `http://` URL, one apex-domain URL, or one
 * stray absolute link to another domain silently voids the whole batch — the
 * API answers 422 and nothing is submitted. Partial success is not a thing, so
 * the payload builder must reject off-host URLs itself rather than discover it
 * over the wire.
 */
import { describe, it, expect } from "vitest";
import {
  buildIndexNowPayloads,
  isValidIndexNowKey,
  MAX_URLS_PER_SUBMISSION,
  type IndexNowPayload,
} from "@/lib/seo/indexnow";

const HOST = "www.pyqvault.com";
const KEY = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const u = (p: string) => `https://${HOST}${p}`;

const build = (urls: string[]): IndexNowPayload[] =>
  buildIndexNowPayloads(urls, { host: HOST, key: KEY, keyLocation: KEY_LOCATION });

describe("isValidIndexNowKey", () => {
  it("accepts a 32-char hex key", () => {
    expect(isValidIndexNowKey(KEY)).toBe(true);
  });

  it("rejects keys outside the 8..128 character range", () => {
    expect(isValidIndexNowKey("short")).toBe(false);
    expect(isValidIndexNowKey("a".repeat(129))).toBe(false);
    expect(isValidIndexNowKey("a".repeat(8))).toBe(true);
    expect(isValidIndexNowKey("a".repeat(128))).toBe(true);
  });

  it("rejects a key with characters that cannot appear in a URL path", () => {
    // The key is also the FILENAME served at /<key>.txt, so anything needing
    // escaping there would make the ownership check unresolvable.
    expect(isValidIndexNowKey("has spaces here")).toBe(false);
    expect(isValidIndexNowKey("has/slash/inside")).toBe(false);
    expect(isValidIndexNowKey("has.dot.inside")).toBe(false);
  });
});

describe("buildIndexNowPayloads", () => {
  it("builds one payload carrying host, key, keyLocation and the URLs", () => {
    const [p, ...rest] = build([u("/"), u("/guide")]);
    expect(rest).toEqual([]);
    expect(p.host).toBe(HOST);
    expect(p.key).toBe(KEY);
    expect(p.keyLocation).toBe(KEY_LOCATION);
    expect(p.urlList).toEqual([u("/"), u("/guide")]);
  });

  it("THROWS on an off-host URL rather than dropping it", () => {
    // Dropping would be worse than failing: the caller would report a
    // successful submission of a set that silently lost a page.
    expect(() => build([u("/"), "https://example.com/x"])).toThrow(/example\.com/);
  });

  it("THROWS on the apex domain, which is a DIFFERENT host to IndexNow", () => {
    // pyqvault.com 308-redirects to www, and the crawl export shows 47 requests
    // already wasted on that hop. IndexNow does not follow it — it 422s.
    expect(() => build([u("/"), "https://pyqvault.com/guide"])).toThrow(/pyqvault\.com/);
  });

  it("THROWS on a non-https URL", () => {
    expect(() => build([`http://${HOST}/guide`])).toThrow(/https/i);
  });

  it("THROWS on a site-relative path", () => {
    // The sitemap loader emits absolute URLs; a relative one means the caller
    // stripped the origin and would submit something meaningless.
    expect(() => build(["/guide"])).toThrow();
  });

  it("THROWS on an invalid key rather than submitting an unownable batch", () => {
    expect(() =>
      buildIndexNowPayloads([u("/")], { host: HOST, key: "bad", keyLocation: KEY_LOCATION })
    ).toThrow(/key/i);
  });

  it("de-duplicates while preserving first-seen order", () => {
    const [p] = build([u("/b"), u("/a"), u("/b"), u("/a")]);
    expect(p.urlList).toEqual([u("/b"), u("/a")]);
  });

  it("returns NO payload for an empty list rather than an empty submission", () => {
    // An empty urlList is a 422, and "submitted 0 URLs" should be a no-op the
    // caller can report honestly, not a failed request.
    expect(build([])).toEqual([]);
  });

  it("chunks at the 10,000-URL limit", () => {
    const many = Array.from({ length: MAX_URLS_PER_SUBMISSION + 5 }, (_, i) => u(`/p${i}`));
    const payloads = build(many);
    expect(payloads).toHaveLength(2);
    expect(payloads[0].urlList).toHaveLength(MAX_URLS_PER_SUBMISSION);
    expect(payloads[1].urlList).toHaveLength(5);
    // Every chunk must carry the key — a keyless chunk is rejected on its own.
    expect(payloads.every((p) => p.key === KEY)).toBe(true);
  });

  it("does not mutate the caller's array", () => {
    const input = [u("/b"), u("/b"), u("/a")];
    const copy = [...input];
    build(input);
    expect(input).toEqual(copy);
  });
});
