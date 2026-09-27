import { describe, it, expect } from "vitest";
import { readHead, auditPages, DESCRIPTION_MIN, DESCRIPTION_MAX } from "@/lib/seo/pageAudit";

describe("readHead", () => {
  it("reads title, description and robots from the head only", () => {
    const html =
      '<html><head><title>Alkanes — MHT-CET Chemistry Notes · PYQ Vault</title>' +
      '<meta name="description" content="Rock &amp; roll"/><meta name="robots" content="index, follow"/>' +
      "</head><body><title>not this</title></body></html>";
    expect(readHead(html)).toEqual({
      title: "Alkanes — MHT-CET Chemistry Notes · PYQ Vault",
      description: "Rock & roll",
      robots: "index, follow",
    });
  });

  it("returns empty strings when a tag is missing", () => {
    expect(readHead("<html><head></head></html>")).toEqual({ title: "", description: "", robots: "" });
  });
});

describe("auditPages", () => {
  const ok = (url: string, title: string, description = "x".repeat(100)) => ({
    url, status: 200, title, description, robots: "index, follow",
  });

  it("flags long titles, duplicate titles, bad descriptions, failed fetches and noindex", () => {
    const r = auditPages([
      ok("/a", "Short title"),
      ok("/b", "y".repeat(71)),
      ok("/c", "Same"),
      ok("/d", "Same"),
      ok("/e", "Fine", "too short"),
      ok("/f", "Fine 2", "z".repeat(DESCRIPTION_MAX + 1)),
      { url: "/g", status: 404, title: "", description: "", robots: "" },
      { ...ok("/h", "Hidden"), robots: "noindex" },
    ]);
    expect(r.longTitles.map((x) => x.url)).toEqual(["/b"]);
    expect(r.duplicateTitles).toEqual([{ title: "Same", urls: ["/c", "/d"] }]);
    expect(r.badDescriptions.map((x) => x.url)).toEqual(["/e", "/f"]);
    expect(r.failed.map((x) => x.url)).toEqual(["/g"]);
    expect(r.noindex.map((x) => x.url)).toEqual(["/h"]);
    expect(r.checked).toBe(8);
  });

  it("does not count a failed page's empty title as a duplicate", () => {
    const r = auditPages([
      { url: "/x", status: 404, title: "", description: "", robots: "" },
      { url: "/y", status: 404, title: "", description: "", robots: "" },
    ]);
    expect(r.duplicateTitles).toEqual([]);
    expect(r.badDescriptions).toEqual([]);
  });

  it("uses Bing's description range", () => {
    expect([DESCRIPTION_MIN, DESCRIPTION_MAX]).toEqual([25, 160]);
  });
});
