/**
 * A price shown is the price charged, wherever the buyer is (2026-11-15).
 *
 * Plans may be sold to some countries only (`plans.countries`, migration 0206):
 * the Gulf price of the www passes is the first such plan on www. The order
 * route already picks the buyer's country price (resolveOrderPlan), so any
 * surface that shows a price WITHOUT the buyer's country would quote ₹499 to a
 * buyer in the UAE and then charge them the Gulf price.
 *
 * Two halves:
 * - the pure rules, with a Gulf plan in the list;
 * - a source scan: every file that reads the plans is either country-aware
 *   (and passes the buyer's country) or listed below as country-free with the
 *   reason. A new file that reads plans fails here until it is classified.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import {
  offerForNeed,
  plansForBuyer,
  resolveOrderPlan,
  planBuyersNote,
  type Plan,
} from "@/lib/billing/plans";

const GULF = ["AE", "SA", "QA", "OM", "KW", "BH"];

function plan(p: Partial<Plan> & Pick<Plan, "id" | "scope" | "amountPaise">): Plan {
  return {
    label: p.scope === "practice" ? "Practice Pass" : "Premium Pass",
    site: "pyqvault",
    currency: "INR",
    durationDays: 182,
    active: true,
    sortOrder: 0,
    countries: null,
    ...p,
  } as Plan;
}

const PLANS: Plan[] = [
  plan({ id: "practice-pass-6m", scope: "practice", amountPaise: 19900, sortOrder: 1 }),
  plan({ id: "mock-pass-6m", scope: "mocks", amountPaise: 49900, sortOrder: 2 }),
  plan({ id: "practice-pass-gulf", scope: "practice", amountPaise: 39900, sortOrder: 1, countries: GULF }),
  plan({ id: "mock-pass-gulf", scope: "mocks", amountPaise: 99900, sortOrder: 2, countries: GULF }),
];

describe("Gulf prices: the pure rules", () => {
  it("a buyer in the UAE sees only the Gulf passes", () => {
    expect(plansForBuyer(PLANS, "pyqvault", "AE").map((p) => p.id)).toEqual(["practice-pass-gulf", "mock-pass-gulf"]);
  });

  it("a buyer in India, or of unknown country, never sees a Gulf pass", () => {
    for (const c of ["IN", null]) {
      expect(plansForBuyer(PLANS, "pyqvault", c).map((p) => p.id)).toEqual(["practice-pass-6m", "mock-pass-6m"]);
    }
  });

  it("checkout sells the Gulf price to a Gulf buyer whichever button they pressed", () => {
    expect(resolveOrderPlan(PLANS, "mock-pass-6m", "SA")?.id).toBe("mock-pass-gulf");
    expect(resolveOrderPlan(PLANS, "mock-pass-gulf", "IN")?.id).toBe("mock-pass-6m");
  });

  it("a wall offers the Gulf Practice Pass to a Gulf buyer", () => {
    expect(offerForNeed(PLANS, "mocks", "pyqvault", "QA")?.id).toBe("practice-pass-gulf");
    expect(offerForNeed(PLANS, "mocks", "pyqvault", "IN")?.id).toBe("practice-pass-6m");
  });

  it("Terms and Refunds say who a country price is for", () => {
    expect(planBuyersNote(PLANS[0])).toBe("");
    expect(planBuyersNote(plan({ id: "x", scope: "mocks", amountPaise: 1, countries: ["AE", "SA"] }))).toBe(
      "for buyers in United Arab Emirates and Saudi Arabia"
    );
    expect(planBuyersNote(PLANS[3])).toBe(
      "for buyers in United Arab Emirates, Saudi Arabia, Qatar, Oman, Kuwait and Bahrain"
    );
  });
});

// ---- source scan ----------------------------------------------------------

const ROOT = process.cwd();
const READS_PLANS = /\b(listActivePlans|listActivePlansCached|passOnSale)\(/;
const DEFINITIONS = new Set(["src/lib/billing/plansQuery.ts", "src/lib/billing/passOnSale.ts"]);

/** Shows a price to a buyer, so it must pass the buyer's country. */
const COUNTRY_AWARE = [
  "src/app/api/billing/order/route.ts",
  "src/app/api/billing/parent-link/route.ts",
  "src/app/api/chat/question/route.ts",
  "src/app/api/chat/typed/route.ts",
  "src/app/api/export/access/route.ts",
  "src/app/api/me/fix-points/route.ts",
  "src/app/api/me/reveals/route.ts",
  "src/app/browse/renderBrowse.tsx",
  "src/app/mock/[slug]/page.tsx",
  "src/app/pricing/page.tsx",
  "src/lib/billing/leftCheckoutService.ts",
  "src/lib/billing/premiumLimits.ts",
  "src/lib/chat/context.ts",
];

/** Reads plans without the buyer's country, on purpose. */
const COUNTRY_FREE: Record<string, string> = {
  "src/lib/billing/applyPaidOrder.ts": "grants from the order's own stamped plan; reads a plan only for its label in the parent-paid email",
  "src/app/api/billing/parent-verify/route.ts": "grants from the order's own stamped plan",
  "src/app/api/billing/parent-order/route.ts": "sells the plan fixed on the link when the student made it",
  "src/app/pay/[code]/page.tsx": "shows the plan fixed on the link when the student made it",
  "src/app/terms/page.tsx": "lists every pass, each country price saying who it is for (planBuyersNote)",
  "src/app/refunds/page.tsx": "lists every pass, each country price saying who it is for (planBuyersNote)",
};

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(name)) out.push(relative(ROOT, p).replace(/\\/g, "/"));
  }
  return out;
}

const readers = walk(join(ROOT, "src"))
  .filter((f) => !DEFINITIONS.has(f) && READS_PLANS.test(readFileSync(join(ROOT, f), "utf8")))
  .sort();

describe("every price display knows the buyer's country", () => {
  it("every file that reads the plans is classified", () => {
    expect(readers).toEqual([...COUNTRY_AWARE, ...Object.keys(COUNTRY_FREE)].sort());
  });

  it.each(COUNTRY_AWARE)("%s passes the buyer's country", (f) => {
    const src = readFileSync(join(ROOT, f), "utf8");
    expect(src).toMatch(/readCountry\(|\bcountry\b/);
  });

  it.each(readers)("%s never calls passOnSale without a country", (f) => {
    const src = readFileSync(join(ROOT, f), "utf8");
    for (const call of src.match(/passOnSale\([^)]*\)/g) ?? []) expect(call).toMatch(/country/);
  });

  it.each(["src/app/terms/page.tsx", "src/app/refunds/page.tsx"])("%s says who a country price is for", (f) => {
    expect(readFileSync(join(ROOT, f), "utf8")).toMatch(/planBuyersNote\(/);
  });

  it("V quotes the passes this buyer can buy", () => {
    expect(readFileSync(join(ROOT, "src/lib/chat/context.ts"), "utf8")).toMatch(/plansForBuyer\(/);
  });

  it("Fix Points prices the passes this buyer can buy", () => {
    expect(readFileSync(join(ROOT, "src/app/api/me/fix-points/route.ts"), "utf8")).toMatch(/plansForBuyer\(/);
  });

  it("the checkout bar and the parent link pick the buyer's country price", () => {
    for (const f of ["src/lib/billing/leftCheckoutService.ts", "src/app/api/billing/parent-link/route.ts"]) {
      expect(readFileSync(join(ROOT, f), "utf8")).toMatch(/resolveOrderPlan\(/);
    }
  });
});
