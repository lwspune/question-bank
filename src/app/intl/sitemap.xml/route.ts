import { allSitemapEntries } from "@/lib/seo/sitemapAll";
import { intlSitemapEntries, sitemapXml } from "@/lib/sites/intlSitemap";

// intl.pyqvault.com/sitemap.xml (the middleware rewrites it here). Built at
// deploy and kept a day, like www's sitemap.
export const revalidate = 86400;

export async function GET() {
  const xml = sitemapXml(intlSitemapEntries(await allSitemapEntries(), new Date()));
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
