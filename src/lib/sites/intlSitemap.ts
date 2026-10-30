/**
 * intl.pyqvault.com's sitemap and robots (2026-10-30). Next's sitemap.ts and
 * robots.ts serve ONE host, so the intl host's are route handlers under
 * src/app/intl/, built from the same shared entry list as www's.
 */
import type { MetadataRoute } from "next";
import { INTL_ORIGIN, isIntlUrl } from "@/lib/sites/intl";

/** The international pages of the shared list, moved onto the intl origin, after the intl home. */
export function intlSitemapEntries(all: MetadataRoute.Sitemap, now: Date): MetadataRoute.Sitemap {
  const pages = all
    .filter((e) => isIntlUrl(e.url))
    .map((e) => {
      const u = new URL(e.url);
      return { ...e, url: `${INTL_ORIGIN}${u.pathname}${u.search}` };
    });
  return [{ url: `${INTL_ORIGIN}/`, lastModified: now, changeFrequency: "weekly", priority: 1 }, ...pages];
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function sitemapXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries.map((e) => {
    const lines = [`<loc>${escapeXml(e.url)}</loc>`];
    if (e.lastModified) lines.push(`<lastmod>${new Date(e.lastModified).toISOString()}</lastmod>`);
    if (e.changeFrequency) lines.push(`<changefreq>${e.changeFrequency}</changefreq>`);
    if (e.priority !== undefined) lines.push(`<priority>${e.priority}</priority>`);
    return `<url>\n${lines.join("\n")}\n</url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

export function intlRobotsTxt(): string {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api",
    "Disallow: /account",
    "",
    `Sitemap: ${INTL_ORIGIN}/sitemap.xml`,
    "",
  ].join("\n");
}
