/**
 * The Review tab's wiring (2026-11-08): where it sits among the student's
 * tabs, how its use is counted, and that the old /saved address still lands
 * on the saved list (V, the welcome email and old bookmarks all link it).
 */
import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const nav = vi.hoisted(() => ({ permanentRedirect: vi.fn(), redirect: vi.fn() }));
vi.mock("next/navigation", () => ({
  permanentRedirect: (url: string) => nav.permanentRedirect(url),
  redirect: (url: string) => nav.redirect(url),
}));

import { ME_TABS } from "@/components/me/MeHeader";
import { SURFACES } from "@/lib/activity/views";
import { DRILL_FROM } from "@/lib/drill/from";
import SavedPage from "@/app/saved/page";

describe("the Review tab", () => {
  it("sits second: Home · Review · Performance · Account", () => {
    expect(ME_TABS.map((t) => t.label)).toEqual(["Home", "Review", "Performance", "Account"]);
    expect(ME_TABS.find((t) => t.key === "review")?.href).toBe("/review");
  });

  it("counts a visit to each list apart", () => {
    expect(SURFACES).toContain("review");
    expect(SURFACES).toContain("review_saved");
  });

  it("tags a Fix tap from Review, so its drills can be read apart", () => {
    expect(DRILL_FROM).toContain("review_tab");
  });
});

describe("the old /saved address", () => {
  it("sends the student to the saved list on Review, for good", async () => {
    await SavedPage();
    expect(nav.permanentRedirect).toHaveBeenCalledWith("/review?list=saved");
  });

  it("is no longer what the avatar menu links", () => {
    const menu = readFileSync(join(process.cwd(), "src/components/UserMenu.tsx"), "utf8");
    expect(menu).toContain('href="/review?list=saved"');
    expect(menu).not.toContain('href="/saved"');
  });
});
