/**
 * V and the things its facts do not name (2026-11-27). In 30 days V told
 * students eight times that a real feature did not exist or that it had "no
 * information" about it: the app, offline classes, renewal, Ask a parent to
 * pay, Sign out, the homework section, and a Practice Pass holder's ₹300
 * upgrade price, which V called a payment outside the site. Three fixes:
 *  - a missing fact is never a "no" (rule 1a), save the two complete lists;
 *  - a price below the list price is the student's own (rule 6d);
 *  - how pass prices work (upgrade, Vault Points, no renewal) is a fact, its
 *    sentence kept beside the billing code it describes.
 */
import { describe, it, expect } from "vitest";
import { buildPassRuleFacts, buildSystemPrompt, buildSystemTail, NAV_FACTS } from "@/lib/chat/facts";
import { UPGRADE_V_FACT } from "@/lib/billing/upgrade";
import { FIX_POINTS_V_FACT, FIX_POINTS_MAX_PCT } from "@/lib/billing/fixPoints";
import { PASS_RENEWAL_V_FACT } from "@/lib/billing/plans";
import { REFERRAL_V_FACT, REFERRAL_FRIEND_PCT } from "@/lib/referrals/referral";

const base = {
  exams: ["NDA: senior stage, has mocks."],
  plans: ["Practice Pass: ₹199 for 6 months (unlocks: practice)."],
  bankTotal: 146050,
  nav: NAV_FACTS,
};

const rule = (p: string, n: string) => p.split("\n").find((l) => l.startsWith(`${n}. `)) ?? "";

describe("how pass prices work (buildPassRuleFacts)", () => {
  const facts = buildPassRuleFacts();

  it("explains the upgrade: the days left come off and the new pass ends on the same day", () => {
    expect(UPGRADE_V_FACT).toMatch(/days left/i);
    expect(UPGRADE_V_FACT).toMatch(/same (day|date)/i);
    expect(UPGRADE_V_FACT).toMatch(/\/pricing/);
  });

  it("explains Vault Points with the live cap from the code", () => {
    expect(FIX_POINTS_V_FACT).toMatch(/Vault Points/);
    expect(FIX_POINTS_V_FACT).toContain(`${FIX_POINTS_MAX_PCT}%`);
  });

  it("says a pass is paid once and never renews on its own", () => {
    expect(PASS_RENEWAL_V_FACT).toMatch(/once/i);
    expect(PASS_RENEWAL_V_FACT).toMatch(/not renew|never renew/i);
  });

  it("explains the invite offer with the live numbers from the code", () => {
    expect(REFERRAL_V_FACT).toContain(`${REFERRAL_FRIEND_PCT}%`);
    expect(REFERRAL_V_FACT).toContain("/me");
  });

  it("names no price, since prices are data edited at /dashboard/pricing", () => {
    expect(UPGRADE_V_FACT).not.toMatch(/₹\d/);
  });

  it("reads each sentence from the module it describes, so a change there is a change here", () => {
    expect(facts).toEqual([UPGRADE_V_FACT, FIX_POINTS_V_FACT, REFERRAL_V_FACT, PASS_RENEWAL_V_FACT]);
  });

  it("reaches the prompt beside the passes on sale", () => {
    const p = buildSystemPrompt({ ...base, passRules: facts });
    const sale = p.slice(p.indexOf("PASSES ON SALE"), p.indexOf("WHERE THINGS ARE"));
    for (const f of facts) expect(sale).toContain(f);
  });

  it("uses no em dashes, since V copies the style it is shown", () => {
    for (const f of facts) expect(f).not.toContain(String.fromCharCode(0x2014));
  });
});

describe("rule 1a: a missing fact is not a no", () => {
  const p = buildSystemPrompt(base);
  const r = rule(p, "1a");

  it("forbids saying a feature, price or option does not exist because the facts do not name it", () => {
    expect(r).toMatch(/never say/i);
    expect(r).toMatch(/feature/i);
    expect(r).toMatch(/price/i);
  });

  it("sends the student to the page most likely to show it", () => {
    expect(r).toContain("/pricing");
    expect(r).toContain("/account");
    expect(r).toContain("/about");
  });

  it("keeps firm answers for the two complete lists", () => {
    expect(r).toContain("PASSES ON SALE");
    expect(r).toContain("EXAMS");
  });
});

describe("rule 6d: a lower price is the student's own", () => {
  const r = rule(buildSystemPrompt(base), "6d");

  it("reads a price below the list price as their upgrade or Vault Points price", () => {
    expect(r).toMatch(/upgrade/i);
    expect(r).toMatch(/Vault Points/);
  });

  it("never calls a price on our own site a scam", () => {
    expect(r).toMatch(/never/i);
    expect(r).toMatch(/scam/i);
  });

  it("uses the student's own pass line when it is given", () => {
    expect(r).toMatch(/THEIR PASS/);
  });
});

describe("the student's own pass in the tail", () => {
  const line = "THEIR PASS: They hold the Practice Pass until 28 May 2027.";

  it("goes in the per-message tail, never the cached instructions", () => {
    expect(buildSystemPrompt(base)).not.toContain("They hold the Practice Pass");
    expect(buildSystemTail({ page: "/me", signedIn: true, ownPass: line })).toContain(line);
  });

  it("is left out when there is none", () => {
    expect(buildSystemTail({ page: "/me", signedIn: true })).not.toContain("THEIR PASS");
  });
});
