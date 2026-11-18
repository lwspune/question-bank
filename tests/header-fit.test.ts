import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { footerLinks } from "@/lib/nav/footerLinks";

/**
 * The tablet/desktop header must fit (owner, 2026-11-18). On the school's
 * smart board (about 1000 px of page) the study tabs slid UNDER the Ebooks,
 * Classes and Play buttons: measured on the live site, a student's tabs
 * overlapped from about 1050 px down and a staff member's from 1920 px down.
 *
 * Three rules keep it from coming back. Layout cannot be measured without a
 * browser here, so this pins the rules in the source; the widths themselves
 * were checked by hand with the before/after sheet.
 */
const src = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
const primaryNav = src("src/components/PrimaryNav.tsx");
const userMenu = src("src/components/UserMenu.tsx");

describe("header fits beside Ebooks, Classes and Play", () => {
  it("has no Guides tab in the top nav", () => {
    expect(primaryNav).not.toMatch(/label:\s*"Guides"/);
    expect(primaryNav).not.toMatch(/guidesHref/);
  });

  it("shows Guides in the avatar menu at every width", () => {
    const guides = userMenu.match(/<Link\s+href=\{guidesHref\}[\s\S]*?<\/Link>/);
    expect(guides).not.toBeNull();
    expect(guides![0]).not.toMatch(/sm:hidden/);
  });

  it("keeps Guides reachable for signed-out visitors from the footer", () => {
    const hrefs = footerLinks().flatMap((g) => g.links.map((l) => l.href));
    expect(hrefs).toContain("/guide");
  });

  it("hides the tab icons below 2xl, so the labels need less room", () => {
    expect(primaryNav).toMatch(/<Icon className="[^"]*\bhidden\b[^"]*\b2xl:block\b/);
  });

  it("below lg, drops the wordmark and the button icons as a phone does", () => {
    // At 820 px (iPad portrait) the first cut still clipped Board and the
    // avatar: the row needed ~110 px more. The logo and the words stay.
    const headerBar = src("src/components/header/HeaderBar.tsx");
    expect(headerBar).toMatch(/<span className="max-lg:sr-only">PYQ Vault<\/span>/);
    for (const icon of ["ShoppingBag", "GraduationCap", "Gamepad2"]) {
      expect(headerBar).toMatch(new RegExp(`<${icon} className="hidden h-4 w-4 shrink-0 lg:block"`));
    }
  });

  it("scrolls the tabs inside their own strip instead of running under the buttons", () => {
    const nav = primaryNav.match(/<nav[\s\S]*?className="([^"]*)"/);
    expect(nav).not.toBeNull();
    expect(nav![1]).toMatch(/\boverflow-x-auto\b/);
  });
});
