import type { MetadataRoute } from "next";
import { allSitemapEntries } from "@/lib/seo/sitemapAll";
import { isIntlUrl } from "@/lib/sites/intl";

/**
 * www's sitemap: every PYQ Vault page. The international exams' pages are in
 * intl.pyqvault.com's own sitemap (src/app/intl/sitemap.xml), since www 308s
 * them there. The entries themselves are built in lib/seo/sitemapAll.ts.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return (await allSitemapEntries()).filter((e) => !isIntlUrl(e.url));
}
