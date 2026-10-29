import { intlRobotsTxt } from "@/lib/sites/intlSitemap";

// intl.pyqvault.com/robots.txt (the middleware rewrites it here).
export const dynamic = "force-static";

export function GET() {
  return new Response(intlRobotsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
