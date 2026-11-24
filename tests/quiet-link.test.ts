/**
 * QuietLink (PAGE_WEIGHT_SPEC.md item 1): a link the router does not fetch in
 * advance when it scrolls into view, only once a student shows intent (a
 * finger on it, a mouse over it, keyboard focus).
 *
 * Why: measured 2026-11-24 on a signed-out phone, scrolling a notes page to
 * its foot made the router fetch 57 more pages (+416 KB sent, +2.5 MB
 * unpacked), nearly all from the footer; `/questions` alone is 902 KB. The
 * homepage fetched 85.
 *
 * The two rules it must keep (spec section 2): the anchor a search engine
 * reads is byte-identical to a plain Link's, and nothing on screen changes.
 * Server-rendered here (no jsdom in this repo), so the tap itself is checked
 * on a phone, not here.
 */
import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import Link from "next/link";
import QuietLink, { intentHandlers } from "@/components/QuietLink";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ prefetch: () => {}, push: () => {}, replace: () => {} }),
  usePathname: () => "/",
}));

describe("QuietLink markup", () => {
  it("renders the same anchor as a plain Link", () => {
    const props = { href: "/questions", className: "transition-colors hover:text-foreground", "aria-current": "page" as const };
    const quiet = renderToStaticMarkup(createElement(QuietLink, props, "Question bank"));
    const plain = renderToStaticMarkup(createElement(Link, props, "Question bank"));
    expect(quiet).toBe(plain);
    expect(quiet).toContain('href="/questions"');
  });

  it("keeps an aria-label and nested content", () => {
    const quiet = renderToStaticMarkup(createElement(QuietLink, { href: "/play", "aria-label": "Play: learning games" }, createElement("span", null, "Play")));
    expect(quiet).toBe('<a aria-label="Play: learning games" href="/play"><span>Play</span></a>');
  });
});

describe("intentHandlers", () => {
  it("marks intent on mouse enter, touch start and focus, and still calls the caller's own handler", () => {
    const onIntent = vi.fn();
    const own = { onMouseEnter: vi.fn(), onTouchStart: vi.fn(), onFocus: vi.fn() };
    const h = intentHandlers(own, onIntent);
    const e = {} as never;
    h.onMouseEnter(e);
    h.onTouchStart(e);
    h.onFocus(e);
    expect(onIntent).toHaveBeenCalledTimes(3);
    expect(own.onMouseEnter).toHaveBeenCalledWith(e);
    expect(own.onTouchStart).toHaveBeenCalledWith(e);
    expect(own.onFocus).toHaveBeenCalledWith(e);
  });

  it("works when the caller passed no handlers", () => {
    const onIntent = vi.fn();
    intentHandlers({}, onIntent).onTouchStart({} as never);
    expect(onIntent).toHaveBeenCalledOnce();
  });
});

describe("QuietLink source", () => {
  const src = readFileSync("src/components/QuietLink.tsx", "utf8");

  it("does not fetch until intent, then hands back to Next's default", () => {
    // Next's documented pattern (docs/01-app/02-guides/prefetching.md,
    // HoverPrefetchLink): false before intent, null (the default) after.
    expect(src).toMatch(/prefetch=\{active \? null : false\}/);
  });
});

const read = (p: string) => readFileSync(p, "utf8");

describe("where QuietLink is used", () => {
  it("every internal footer link is quiet", () => {
    for (const f of ["src/components/PyqVaultFooter.tsx", "src/components/footer/IntlFooter.tsx"]) {
      const s = read(f);
      expect(s, f).not.toMatch(/from "next\/link"/);
      expect(s, f).toMatch(/from "@\/components\/QuietLink"/);
      expect(s.match(/<Link\b/g) ?? [], f).toEqual([]);
    }
  });

  it("the header's Store, Visuals and Play buttons are quiet", () => {
    const s = read("src/components/header/HeaderBar.tsx");
    for (const fn of ["StoreLink", "VisualsLink", "PlayLink"]) {
      const body = s.slice(s.indexOf(`function ${fn}(`), s.indexOf("\n}\n", s.indexOf(`function ${fn}(`)));
      expect(body, fn).toMatch(/<QuietLink\b/);
      expect(body, fn).not.toMatch(/<Link\b/);
    }
  });

  it("sign-in links are quiet (VERCEL_COST_SPEC.md item 2)", () => {
    // The header's Sign in fetched /login in advance on every signed-out page
    // view: 5.3K of 228K CDN requests in 12 hours, the largest link left.
    const s = read("src/components/reveal/SignInLink.tsx");
    expect(s).not.toMatch(/from "next\/link"/);
    expect(s).toMatch(/from "@\/components\/QuietLink"/);
    expect(s.match(/<Link\b/g) ?? []).toEqual([]);
    // Both the Suspense fallback and the link with the query stay quiet.
    expect((s.match(/<QuietLink\b/g) ?? []).length).toBe(2);
  });

  it("the main study tabs keep Next's default, so those taps stay instant", () => {
    for (const f of ["src/components/MobileTabBar.tsx", "src/components/PrimaryNav.tsx"]) {
      expect(read(f), f).not.toMatch(/QuietLink/);
    }
  });

  it("a side menu does not fetch the page it is on", () => {
    const s = read("src/app/guide/_components/GuideSideNav.tsx");
    expect(s).toMatch(/prefetch=\{pathname === item\.href \? false : undefined\}/);
  });
});
