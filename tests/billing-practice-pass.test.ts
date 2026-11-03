/**
 * Two www passes by feature (owner, 2026-11-03). Buyers split cleanly in the
 * 30 days to 2026-11-02: 12 of 27 practised online and downloaded little, 12
 * downloaded PDFs and barely practised. So:
 *   Practice Pass (`practice`) - every online limit lifted: answers, drill,
 *     saves, projected score, mocks, chapter tests, V.
 *   Premium Pass  (`mocks`)    - all of that, plus PDF downloads.
 *
 * The online checks ask for `mocks` (the exam's pass) as they always have, and
 * `practice` covers that request. Downloads ask for `downloads`, a request
 * that only the Premium and retired Teacher passes (and `all`) cover. A wall
 * offers the CHEAPEST pass that covers what the student was stopped from.
 */
import { describe, it, expect } from "vitest";
import {
  offerForNeed,
  ownsPlan,
  resolveOrderPlan,
  SELLABLE_SCOPES,
  type Plan,
} from "@/lib/billing/plans";
import { coversAny, downloadScopesFor, holdsPassFor, passScopesFor } from "@/lib/billing/passScope";
import { DOWNLOAD_PASS_SCOPE } from "@/lib/export/access";
import { hasPassFromEntitlements } from "@/lib/header-session";
import { COMP_SCOPE_OPTIONS } from "@/lib/entitlements/compGrant";
import {
  SCOPE_ALL,
  SCOPE_DOWNLOADS,
  SCOPE_IMAT,
  SCOPE_MOCKS,
  SCOPE_PRACTICE,
  SCOPE_TEACHER,
  scopeCovers,
  type Entitlement,
} from "@/lib/entitlements/access";

const plan = (over: Partial<Plan>): Plan => ({
  id: "x",
  label: "Pass",
  blurb: "",
  perks: [],
  urlKey: "x",
  amountPaise: 100,
  currency: "INR",
  site: "pyqvault",
  durationDays: 182,
  scope: SCOPE_MOCKS,
  active: true,
  sortOrder: 1,
  countries: null,
  ...over,
});

const practice = plan({ id: "practice-pass-6m", urlKey: "practice", scope: SCOPE_PRACTICE, amountPaise: 19900, sortOrder: 0 });
const premium = plan({ id: "mock-pass-6m", urlKey: "mocks", scope: SCOPE_MOCKS, amountPaise: 49900, sortOrder: 1 });
const imatWorld = plan({ id: "imat-6m", scope: SCOPE_IMAT, site: "intl", currency: "USD", amountPaise: 1900 });
const imatIndia = plan({ id: "imat-india-6m", scope: SCOPE_IMAT, site: "intl", amountPaise: 99900, countries: ["IN"] });

const grant = (scope: string): Entitlement => ({
  id: "e",
  userId: "u",
  scope,
  source: "razorpay",
  status: "active",
  grantedAt: "2026-11-01T00:00:00Z",
  expiresAt: null,
  providerRef: null,
  note: null,
  grantedBy: null,
});

describe("what each pass covers", () => {
  it("the Practice Pass covers every online limit (the `mocks` request) and nothing to download", () => {
    expect(scopeCovers(SCOPE_PRACTICE, SCOPE_MOCKS)).toBe(true);
    expect(scopeCovers(SCOPE_PRACTICE, SCOPE_PRACTICE)).toBe(true);
    expect(scopeCovers(SCOPE_PRACTICE, SCOPE_DOWNLOADS)).toBe(false);
    expect(scopeCovers(SCOPE_PRACTICE, SCOPE_IMAT)).toBe(false);
  });

  it("downloads ask for `downloads`, which Premium, Teacher and all cover", () => {
    expect(DOWNLOAD_PASS_SCOPE).toBe(SCOPE_DOWNLOADS);
    for (const held of [SCOPE_MOCKS, SCOPE_TEACHER, SCOPE_ALL]) {
      expect(scopeCovers(held, SCOPE_DOWNLOADS), held).toBe(true);
    }
  });

  it("Premium and Teacher holders keep everything they had, and count as holding Practice", () => {
    for (const held of [SCOPE_MOCKS, SCOPE_TEACHER]) {
      expect(scopeCovers(held, SCOPE_MOCKS), held).toBe(true);
      expect(scopeCovers(held, SCOPE_PRACTICE), held).toBe(true);
    }
  });

  it("an online check on a www exam lets a Practice holder through", () => {
    const summary = { hasPass: true, passScopes: [SCOPE_PRACTICE] };
    expect(holdsPassFor(summary, passScopesFor("pyqvault", "nda"))).toBe(true);
    expect(holdsPassFor(summary, passScopesFor("pyqvault"))).toBe(true);
    // ...but not on an IMAT question.
    expect(holdsPassFor(summary, passScopesFor("intl", "imat"))).toBe(false);
  });

  it("a download check refuses a Practice holder and lets a Premium holder through", () => {
    expect(coversAny([SCOPE_PRACTICE], downloadScopesFor("pyqvault"))).toBe(false);
    expect(coversAny([SCOPE_MOCKS], downloadScopesFor("pyqvault"))).toBe(true);
  });

  it("download scopes per site: www asks for downloads, intl for its exams' own passes", () => {
    expect(downloadScopesFor("pyqvault")).toEqual([SCOPE_DOWNLOADS]);
    expect(downloadScopesFor("intl")).toContain(SCOPE_IMAT);
    expect(downloadScopesFor("intl")).not.toContain(SCOPE_DOWNLOADS);
    expect(downloadScopesFor("intl")).not.toContain(SCOPE_MOCKS);
  });

  it("Practice can be sold and comp-granted; `downloads` is a request, never a pass", () => {
    expect(SELLABLE_SCOPES).toContain(SCOPE_PRACTICE);
    expect(SELLABLE_SCOPES).not.toContain(SCOPE_DOWNLOADS);
    expect(COMP_SCOPE_OPTIONS.map((o) => o.value)).toContain(SCOPE_PRACTICE);
    expect(COMP_SCOPE_OPTIONS.map((o) => o.value)).not.toContain(SCOPE_DOWNLOADS);
  });

  it("a Practice holder gets the header's pass mark", () => {
    expect(hasPassFromEntitlements([grant(SCOPE_PRACTICE)], Date.now())).toBe(true);
  });
});

describe("offerForNeed: the cheapest pass that lifts what stopped the student", () => {
  const both = [premium, practice];

  it("an online wall (answers, drill, mocks, V) offers the Practice Pass", () => {
    expect(offerForNeed(both, SCOPE_MOCKS, "pyqvault", "IN")?.id).toBe("practice-pass-6m");
  });

  it("a download wall offers the Premium Pass", () => {
    expect(offerForNeed(both, SCOPE_DOWNLOADS, "pyqvault", "IN")?.id).toBe("mock-pass-6m");
  });

  it("with no Practice Pass on sale, an online wall offers Premium", () => {
    expect(offerForNeed([premium], SCOPE_MOCKS, "pyqvault", "IN")?.id).toBe("mock-pass-6m");
    expect(offerForNeed([premium, { ...practice, active: false }], SCOPE_MOCKS, "pyqvault", null)?.id).toBe(
      "mock-pass-6m"
    );
  });

  it("with nothing that downloads on sale, a download wall offers nothing", () => {
    expect(offerForNeed([practice], SCOPE_DOWNLOADS, "pyqvault", "IN")).toBeNull();
  });

  it("the cheapest wins whatever the sort order", () => {
    expect(offerForNeed([premium, { ...practice, sortOrder: 9 }], SCOPE_MOCKS, "pyqvault", "IN")?.id).toBe(
      "practice-pass-6m"
    );
  });

  it("keeps the country rule: IMAT in rupees for India, dollars elsewhere", () => {
    const intl = [imatWorld, imatIndia, practice, premium];
    expect(offerForNeed(intl, SCOPE_IMAT, "intl", "IN")?.id).toBe("imat-india-6m");
    expect(offerForNeed(intl, SCOPE_IMAT, "intl", "US")?.id).toBe("imat-6m");
    expect(offerForNeed(intl, SCOPE_IMAT, "intl", null)?.id).toBe("imat-6m");
  });

  it("never sells a www pass on intl, or an IMAT pass on www", () => {
    expect(offerForNeed([practice, premium], SCOPE_MOCKS, "intl", "IN")).toBeNull();
    expect(offerForNeed([imatWorld], SCOPE_IMAT, "pyqvault", "IN")).toBeNull();
  });
});

describe("checkout sells the pass the student chose", () => {
  it("both www passes on sale: each id sells itself", () => {
    expect(resolveOrderPlan([practice, premium], "practice-pass-6m", "IN")?.id).toBe("practice-pass-6m");
    expect(resolveOrderPlan([practice, premium], "mock-pass-6m", "IN")?.id).toBe("mock-pass-6m");
  });
});

describe("ownsPlan: what /pricing marks as already yours", () => {
  it("a Practice holder owns Practice, not Premium (Premium adds downloads)", () => {
    expect(ownsPlan([grant(SCOPE_PRACTICE)], practice, Date.now())).toBe(true);
    expect(ownsPlan([grant(SCOPE_PRACTICE)], premium, Date.now())).toBe(false);
  });

  it("a Premium or Teacher holder owns both", () => {
    for (const held of [SCOPE_MOCKS, SCOPE_TEACHER, SCOPE_ALL]) {
      expect(ownsPlan([grant(held)], practice, Date.now()), held).toBe(true);
      expect(ownsPlan([grant(held)], premium, Date.now()), held).toBe(true);
    }
  });

  it("an expired grant owns nothing", () => {
    const expired = { ...grant(SCOPE_MOCKS), expiresAt: "2026-01-01T00:00:00Z" };
    expect(ownsPlan([expired], practice, Date.now())).toBe(false);
  });

  it("an IMAT holder owns the IMAT pass only", () => {
    expect(ownsPlan([grant(SCOPE_IMAT)], imatWorld, Date.now())).toBe(true);
    expect(ownsPlan([grant(SCOPE_IMAT)], practice, Date.now())).toBe(false);
  });
});
