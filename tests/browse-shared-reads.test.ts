/**
 * The two reads /browse remembers instead of asking the database every visit.
 *
 * - The year list is remembered from a SIGNED-OUT read, so it may only be
 *   served to viewers whose own read would be identical. Staff (org members)
 *   and the superadmin can also see private questions, so they keep a live
 *   read; serving them the public list would hide years that exist only in a
 *   private upload, and remembering THEIR list would publish those years.
 * - The price list is remembered under a tag, and the route that saves prices
 *   must clear that tag, or /browse shows an old price after an edit.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { yearsSource } from "@/lib/questions/browseSharedReads";

describe("yearsSource", () => {
  it("serves the remembered list to a signed-out visitor or a student (both see PUBLIC only)", () => {
    expect(yearsSource({ isStaff: false, canEditContent: false })).toBe("cached");
  });

  it("reads live for staff, who can see private questions", () => {
    expect(yearsSource({ isStaff: true, canEditContent: false })).toBe("live");
  });

  it("reads live for the superadmin", () => {
    expect(yearsSource({ isStaff: false, canEditContent: true })).toBe("live");
  });
});

describe("the remembered price list is cleared on every price save", () => {
  const read = (rel: string) => fs.readFileSync(path.resolve(__dirname, "..", rel), "utf8");

  it("caches under PLANS_CACHE_TAG", () => {
    expect(read("src/lib/billing/plansQuery.ts")).toMatch(/tags:\s*\[\s*PLANS_CACHE_TAG\s*\]/);
  });

  it("the plans route clears PLANS_CACHE_TAG in the helper every write calls", () => {
    const route = read("src/app/api/admin/plans/route.ts");
    expect(route).toMatch(/function revalidateQuotingPages\(\)\s*\{[^}]*revalidateTag\(PLANS_CACHE_TAG\)/);
    // Every write branch calls that helper: upsert, setActive, saveSettings.
    expect(route.match(/revalidateQuotingPages\(\);/g)?.length).toBe(3);
  });
});
