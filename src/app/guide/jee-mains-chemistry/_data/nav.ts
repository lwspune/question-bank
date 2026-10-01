/** Route base + side nav shared by every /guide/jee-mains-chemistry page. */
import { ROUTES } from "./jee-mains-chemistry";

export const GUIDE_BASE = "/guide/jee-mains-chemistry";

export function jeeChemGuideSideNav(): { href: string; label: string }[] {
  return ROUTES.map((r) => ({ href: r.slug ? `${GUIDE_BASE}/${r.slug}` : GUIDE_BASE, label: r.label }));
}
