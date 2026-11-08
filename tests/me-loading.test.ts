/**
 * Each of the student's pages shows a loading screen the moment its tab is
 * tapped (2026-11-08); since step 3 the tabs are Home · Review · Progress, and
 * /performance (Papers) loads under Progress. Account has no tab now: its
 * loading screen shows no strip. Before this none of the three had a loading.tsx, so a
 * tap left the old page on screen until the new one was fully built: 0.4-0.8 s
 * warm in production, 3.3 s on a cold start.
 *
 * The loading screen already shows the TAPPED tab as selected, so the tap
 * answers at once. Server-rendered markup (no jsdom here).
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import MeLoading from "@/components/me/MeLoading";

const ROUTES = [
  { dir: "me", tab: "home", href: "/me" },
  { dir: "review", tab: "review", href: "/review" },
  { dir: "performance", tab: "performance", href: "/progress" },
] as const;

describe("MeLoading", () => {
  it("shows no tab strip for Account, which lives in the avatar menu", () => {
    const out = renderToStaticMarkup(createElement(MeLoading, { active: "account" }));
    expect(out).not.toContain('aria-current="page"');
    expect(out).toContain('aria-busy="true"');
  });

  for (const r of ROUTES) {
    it(`marks ${r.tab} as the open tab`, () => {
      const out = renderToStaticMarkup(createElement(MeLoading, { active: r.tab }));
      expect(out).toMatch(new RegExp(`aria-current="page"[^>]*href="${r.href}"|href="${r.href}"[^>]*aria-current="page"`));
      expect(out.match(/aria-current="page"/g)).toHaveLength(1);
      // Says it is loading, for a screen reader.
      expect(out).toContain('aria-busy="true"');
    });
  }
});

describe("each tab's route has its loading screen", () => {
  for (const r of ROUTES) {
    it(`src/app/${r.dir}/loading.tsx shows ${r.tab}`, () => {
      const file = join(process.cwd(), "src", "app", r.dir, "loading.tsx");
      expect(existsSync(file)).toBe(true);
      const src = readFileSync(file, "utf8");
      expect(src).toContain("MeLoading");
      expect(src).toContain(`active="${r.tab}"`);
    });
  }
});
