/**
 * The mock result page's "Your full performance" link (2026-11-15). It pointed
 * at /performance on both sites; intl does not serve that path, so an IMAT
 * student was sent to www, where they are not signed in (each site keeps its
 * own login cookie). On intl it goes to the map, which intl serves.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { intlHostDecision, progressPathFor } from "@/lib/sites/intl";

describe("progressPathFor", () => {
  it("keeps www's performance page", () => {
    expect(progressPathFor("pyqvault")).toBe("/performance");
  });

  it("sends an intl student to a page intl serves itself", () => {
    const path = progressPathFor("intl");
    expect(path).toBe("/me/map");
    expect(intlHostDecision(path, "")).toEqual({ kind: "next" });
  });

  it("www's path would have left intl", () => {
    expect(intlHostDecision("/performance", "")).toMatchObject({ kind: "redirect" });
  });
});

describe("the mock result page", () => {
  const dir = join(process.cwd(), "src/app/mock/attempt/[attemptId]/result");
  it.each(["Findings.tsx", "ScorePlanCard.tsx"])("%s links to the site's own progress page", (f) => {
    const src = readFileSync(join(dir, f), "utf8");
    expect(src).not.toMatch(/href="\/performance"/);
    expect(src).toMatch(/progressHref/);
  });
});
