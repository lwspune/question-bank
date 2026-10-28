/**
 * Spec for choosing WHICH sitemap URLs an automatic IndexNow run sends.
 *
 * WHY THIS EXISTS (2026-10-28). IndexNow is for new and changed pages; resending
 * unchanged ones is the behaviour Bing warns about. The automatic run therefore
 * compares the live sitemap with the copy it saved last time and sends only the
 * difference.
 *
 * THE TRAP THIS SPEC PINS: ~570 sitemap entries (hubs and index pages) carry
 * `lastModified: buildDate`, the moment the sitemap was generated, so their date
 * moves on EVERY read. A plain "date changed" rule resends all of them on every
 * run. No real content date can be later than the generation moment, so the
 * newest date in the file IS that moment: an entry carrying it only counts when
 * the URL itself is new.
 */
import { describe, it, expect } from "vitest";
import { parseSitemap, selectChangedUrls } from "@/lib/seo/indexnow";

const u = (p: string) => `https://www.pyqvault.com${p}`;

const STAMP_OLD = "2026-10-27T09:00:00.123Z";
const STAMP_NEW = "2026-10-28T09:00:00.456Z";

describe("parseSitemap", () => {
  it("reads each <loc> with its <lastmod>", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://www.pyqvault.com/notes</loc>
<lastmod>2026-10-01T03:26:20.000Z</lastmod>
<changefreq>weekly</changefreq>
</url>
<url>
<loc>https://www.pyqvault.com/guide</loc>
<lastmod>2026-10-02T03:26:20.000Z</lastmod>
</url>
</urlset>`;
    expect(parseSitemap(xml)).toEqual({
      [u("/notes")]: "2026-10-01T03:26:20.000Z",
      [u("/guide")]: "2026-10-02T03:26:20.000Z",
    });
  });

  it("keeps an entry with no <lastmod>, as an empty date", () => {
    const xml = `<urlset><url><loc>https://www.pyqvault.com/a</loc></url></urlset>`;
    expect(parseSitemap(xml)).toEqual({ [u("/a")]: "" });
  });

  it("decodes XML entities in the URL", () => {
    const xml = `<urlset><url><loc>https://www.pyqvault.com/a?x=1&amp;y=2</loc></url></urlset>`;
    expect(Object.keys(parseSitemap(xml))).toEqual([u("/a?x=1&y=2")]);
  });

  it("throws on a sitemap with no URLs, rather than reporting nothing changed", () => {
    expect(() => parseSitemap("<urlset></urlset>")).toThrow(/zero URLs/);
  });
});

describe("selectChangedUrls", () => {
  it("first run (no saved copy) sends every URL", () => {
    const curr = { [u("/a")]: "2026-10-01T00:00:00.000Z", [u("/b")]: STAMP_NEW };
    const r = selectChangedUrls(null, curr);
    expect(r.urls).toEqual([u("/a"), u("/b")]);
    expect(r.firstRun).toBe(true);
  });

  it("sends a URL that was not in the saved copy", () => {
    const prev = { [u("/a")]: "2026-10-01T00:00:00.000Z" };
    const curr = { ...prev, [u("/new")]: "2026-10-02T00:00:00.000Z" };
    const r = selectChangedUrls(prev, curr);
    expect(r.urls).toEqual([u("/new")]);
    expect(r.added).toBe(1);
  });

  it("sends a URL whose real content date moved", () => {
    const prev = { [u("/a")]: "2026-10-01T00:00:00.000Z", [u("/hub")]: STAMP_OLD };
    const curr = { [u("/a")]: "2026-10-05T00:00:00.000Z", [u("/hub")]: STAMP_NEW };
    const r = selectChangedUrls(prev, curr);
    expect(r.urls).toEqual([u("/a")]);
    expect(r.changed).toBe(1);
  });

  it("skips an entry whose date is only the sitemap's generation time", () => {
    const prev = { [u("/a")]: "2026-10-01T00:00:00.000Z", [u("/hub")]: STAMP_OLD };
    const curr = { [u("/a")]: "2026-10-01T00:00:00.000Z", [u("/hub")]: STAMP_NEW };
    const r = selectChangedUrls(prev, curr);
    expect(r.urls).toEqual([]);
    expect(r.skippedGenerated).toBe(1);
  });

  it("still sends a NEW URL that carries the generation time", () => {
    const prev = { [u("/a")]: "2026-10-01T00:00:00.000Z" };
    const curr = { ...prev, [u("/new-hub")]: STAMP_NEW };
    expect(selectChangedUrls(prev, curr).urls).toEqual([u("/new-hub")]);
  });

  it("sends nothing when nothing changed", () => {
    const snap = { [u("/a")]: "2026-10-01T00:00:00.000Z", [u("/b")]: "2026-10-02T00:00:00.000Z" };
    const r = selectChangedUrls(snap, { ...snap });
    expect(r.urls).toEqual([]);
    expect(r.unchanged).toBe(2);
  });

  it("ignores URLs removed from the sitemap (IndexNow is not told about them)", () => {
    const prev = { [u("/a")]: "2026-10-01T00:00:00.000Z", [u("/gone")]: "2026-10-01T00:00:00.000Z" };
    const curr = { [u("/a")]: "2026-10-01T00:00:00.000Z" };
    const r = selectChangedUrls(prev, curr);
    expect(r.urls).toEqual([]);
    expect(r.removed).toBe(1);
  });

  it("does not treat a missing date as a change", () => {
    const prev = { [u("/a")]: "" };
    expect(selectChangedUrls(prev, { [u("/a")]: "" }).urls).toEqual([]);
  });
});
