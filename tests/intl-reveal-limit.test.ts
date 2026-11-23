/**
 * The intl site's own daily answer limit (migration 0274, 2026-11-19, owner:
 * "for intl add 10 qs reveal limit"). claim_reveal applies
 * paywall_settings.intl_free_reveals_per_day to a question whose exam sells an
 * intl pass (IMAT, MCAT) and the www limit to every other paid exam; a free
 * exam (ENEM, owner 2026-11-19: "IMAT only for now") stays unlimited. Every
 * number a page shows must be the one the server enforces. The database half
 * is pinned in free-save-limit.integration.test.ts.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { INTL_PASS_SCOPES, SCOPE_FREE, SCOPE_IMAT, SCOPE_MCAT, SCOPE_MOCKS } from "@/lib/entitlements/access";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { passScopeForExam, passScopesFor, revealLimitFor } from "@/lib/billing/passScope";
import { EMPTY_PAYWALL_SETTINGS, nextPaywallSettings } from "@/lib/billing/paywallSettings";
import { fillPerks, type FreeLimits } from "@/lib/billing/perkLimits";
import { buildFreeFacts } from "@/lib/chat/facts";

const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

describe("INTL_PASS_SCOPES: the passes whose exams take the intl limit", () => {
  it("is IMAT and MCAT", () => {
    expect([...INTL_PASS_SCOPES].sort()).toEqual([SCOPE_IMAT, SCOPE_MCAT].sort());
  });

  it("covers every paid exam on the intl site", () => {
    const paidIntl = EXAM_REGISTRY.filter((e) => e.site === "intl")
      .map((e) => passScopeForExam(e.slug))
      .filter((s) => s !== SCOPE_FREE);
    expect(paidIntl.length).toBeGreaterThan(0);
    for (const s of paidIntl) expect(INTL_PASS_SCOPES).toContain(s);
  });

  it("matches the list claim_reveal checks in SQL", () => {
    const sql = read("supabase/migrations/0274_intl_reveal_limit.sql");
    const m = sql.match(/private\.intl_pass_scopes\(\)[\s\S]*?array\[([^\]]*)\]/);
    expect(m).not.toBeNull();
    const listed = m![1].split(",").map((s) => s.trim().replace(/'/g, "").replace(/::text$/, ""));
    expect(listed.sort()).toEqual([...INTL_PASS_SCOPES].sort());
  });
});

describe("revealLimitFor: the number a page shows", () => {
  const limits = { revealsPerDay: 15, intlRevealsPerDay: 10 };

  it("an intl exam's page shows the intl limit", () => {
    expect(revealLimitFor(limits, [SCOPE_IMAT])).toBe(10);
    expect(revealLimitFor(limits, passScopesFor("intl"))).toBe(10);
    expect(revealLimitFor(limits, passScopesFor("intl", "imat"))).toBe(10);
  });

  it("a www page shows the www limit", () => {
    expect(revealLimitFor(limits, [SCOPE_MOCKS])).toBe(15);
    expect(revealLimitFor(limits, passScopesFor("pyqvault"))).toBe(15);
  });

  it("the intl limit switched off is no limit, even with the www one on", () => {
    expect(revealLimitFor({ revealsPerDay: 15, intlRevealsPerDay: null }, [SCOPE_IMAT])).toBeNull();
  });

  it("a database before 0274 (no intl field) keeps the www number, as it enforced", () => {
    expect(revealLimitFor({ revealsPerDay: 15 }, [SCOPE_IMAT])).toBe(15);
  });
});

describe("the admin page edits the intl limit like any other", () => {
  it("switches it on, changes it and off, touching nothing else", () => {
    const on = nextPaywallSettings({ ...EMPTY_PAYWALL_SETTINGS, freeRevealsPerDay: 15 }, { which: "intlReveals", enabled: true, limit: 10 }, "2026-11-19T00:00:00Z");
    expect(on).toMatchObject({ ok: true, next: { freeIntlRevealsPerDay: 10, freeRevealsPerDay: 15 } });
    const off = nextPaywallSettings(on.ok ? on.next : EMPTY_PAYWALL_SETTINGS, { which: "intlReveals", enabled: false, limit: 0 }, "2026-11-19T00:00:00Z");
    expect(off).toMatchObject({ ok: true, next: { freeIntlRevealsPerDay: null, freeRevealsPerDay: 15 } });
  });

  it("the pricing page has a field for it", () => {
    expect(read("src/app/dashboard/pricing/PricingAdminClient.tsx")).toMatch(/field: "freeIntlRevealsPerDay"/);
  });
});

describe("words a student reads", () => {
  const limits: FreeLimits = {
    reveals: 15,
    intlReveals: 10,
    drill: 10,
    saves: 20,
    mocks: 3,
    chapterTests: 5,
    projectionDays: null,
    papersPerDay: 5,
  };

  it("an intl pass perk quotes the intl number", () => {
    expect(fillPerks(["Unlimited answers in the question bank (free: {intlReveals} a day)"], limits)).toEqual([
      "Unlimited answers in the question bank (free: 10 a day)",
    ]);
  });

  it("the migration moves the intl passes' perks onto {intlReveals}", () => {
    expect(read("supabase/migrations/0274_intl_reveal_limit.sql")).toMatch(/\{intlReveals\}/);
  });

  it("V states both numbers", () => {
    const facts = buildFreeFacts(limits).join("\n");
    expect(facts).toMatch(/15 a day free/);
    expect(facts).toMatch(/IMAT[^\n]*10 a day/);
  });
});

describe("wiring", () => {
  it("the reveal meter's limit comes from revealLimitFor", () => {
    const src = read("src/app/api/me/reveals/route.ts");
    expect(src).toMatch(/revealLimitFor\(/);
    expect(src).not.toMatch(/limits\.revealsPerDay/);
  });
});
