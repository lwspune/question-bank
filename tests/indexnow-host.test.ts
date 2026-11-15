/**
 * IndexNow for both sites (2026-11-15). intl.pyqvault.com's 330 sitemap URLs had
 * never been submitted: the script was hard-wired to www. IndexNow rejects a
 * whole batch on any off-host URL, so each host is its own run with its own
 * sitemap, key location and saved copy; `--host` picks it.
 */
import { describe, it, expect } from "vitest";
import { indexNowHost, INDEXNOW_HOSTS } from "@/lib/seo/indexnow";

describe("indexNowHost", () => {
  it("defaults to www, as every run before it did", () => {
    expect(indexNowHost(undefined)).toBe("www.pyqvault.com");
  });

  it("takes the short name or the full host for intl", () => {
    expect(indexNowHost("intl")).toBe("intl.pyqvault.com");
    expect(indexNowHost("intl.pyqvault.com")).toBe("intl.pyqvault.com");
    expect(indexNowHost("www")).toBe("www.pyqvault.com");
  });

  it("refuses any other host rather than submit for a site we do not own", () => {
    expect(() => indexNowHost("pyqvault.com")).toThrow(/host/);
    expect(() => indexNowHost("example.com")).toThrow(/host/);
  });

  it("knows exactly the two sites", () => {
    expect([...INDEXNOW_HOSTS]).toEqual(["www.pyqvault.com", "intl.pyqvault.com"]);
  });
});
