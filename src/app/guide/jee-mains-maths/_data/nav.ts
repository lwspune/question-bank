/** Route base + side nav shared by every /guide/jee-mains-maths page. */
import { ROUTES } from "./jee-mains-maths";

export const GUIDE_BASE = "/guide/jee-mains-maths";

export function jeeGuideSideNav(): { href: string; label: string }[] {
  return ROUTES.map((r) => ({ href: r.slug ? `${GUIDE_BASE}/${r.slug}` : GUIDE_BASE, label: r.label }));
}
