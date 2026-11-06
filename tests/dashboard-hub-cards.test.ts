import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { HUB_SECTIONS, visibleSections, type HubContext } from "@/app/dashboard/hubCards";

const DASHBOARD = path.resolve(__dirname, "../src/app/dashboard");

const ctx = (over: Partial<HubContext> = {}): HubContext => ({
  isFresh: false,
  openReports: 0,
  openConceptReports: 0,
  sheetsWaiting: 0,
  ...over,
});

const hrefs = (role: { isAdmin: boolean; isSuperadmin: boolean }) =>
  visibleSections(role).flatMap((s) => s.cards.map((c) => c.href));

/** Every /dashboard/<name> folder holding its own page.tsx: a page someone can
 *  open. questions/ is excluded by construction (its only page is
 *  questions/[id]/edit, reached from a question, never from the hub). */
function dashboardPages(): string[] {
  return fs
    .readdirSync(DASHBOARD, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(DASHBOARD, d.name, "page.tsx")))
    .map((d) => `/dashboard/${d.name}`)
    .sort();
}

describe("dashboard hub cards", () => {
  it("links every /dashboard page, so none is reachable only by URL", () => {
    // Quiz Leads was reachable only from a link inside Daily Quizzes until
    // 2026-11-06. A new page now fails here until the hub links it.
    const linked = new Set(hrefs({ isAdmin: true, isSuperadmin: true }));
    const orphans = dashboardPages().filter((p) => !linked.has(p));
    expect(orphans).toEqual([]);
  });

  it("shows an admin who is not superadmin no superadmin card", () => {
    const admin = new Set(hrefs({ isAdmin: true, isSuperadmin: false }));
    const superOnly = HUB_SECTIONS.flatMap((s) => s.cards)
      .filter((c) => c.audience === "superadmin")
      .map((c) => c.href);
    expect(superOnly.length).toBeGreaterThan(0);
    for (const href of superOnly) expect(admin.has(href)).toBe(false);
    for (const href of [
      "/dashboard/reports",
      "/dashboard/notes-reports",
      "/dashboard/members",
      "/dashboard/branches",
      "/dashboard/papers",
      "/dashboard/batches",
      "/browse",
    ]) {
      expect(admin.has(href)).toBe(true);
    }
  });

  it("drops a section with nothing visible rather than rendering an empty heading", () => {
    for (const role of [
      { isAdmin: true, isSuperadmin: false },
      { isAdmin: false, isSuperadmin: false },
    ]) {
      for (const s of visibleSections(role)) expect(s.cards.length).toBeGreaterThan(0);
    }
  });

  it("links each page once", () => {
    const all = HUB_SECTIONS.flatMap((s) => s.cards.map((c) => c.href));
    expect(new Set(all).size).toBe(all.length);
  });

  it("puts the work that is waiting first, with its count as the badge", () => {
    const [first] = visibleSections({ isAdmin: true, isSuperadmin: true });
    expect(first.cards.map((c) => c.href)).toEqual([
      "/dashboard/reports",
      "/dashboard/notes-reports",
      "/dashboard/answer-sheets",
    ]);
    const c = ctx({ openReports: 2, openConceptReports: 0, sheetsWaiting: 3 });
    expect(first.cards.map((card) => card.badge?.(c) ?? 0)).toEqual([2, 0, 3]);
    expect(first.cards[0].describe(c)).toBe("2 open reports need review.");
    expect(first.cards[0].describe(ctx({ openReports: 1 }))).toBe("1 open report needs review.");
  });

  it("describes what each page covers today", () => {
    const card = (href: string) =>
      HUB_SECTIONS.flatMap((s) => s.cards).find((c) => c.href === href)!;
    // The map gained Physics and Maths; it was described as Chemistry only.
    expect(card("/dashboard/syllabus").describe(ctx())).toMatch(/Chemistry, Physics and Maths/);
    // V is a tutor now, not "the FAQ helper".
    expect(card("/dashboard/chat").describe(ctx())).not.toMatch(/FAQ/);
  });
});
