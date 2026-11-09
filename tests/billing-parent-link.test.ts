/**
 * "Ask a parent to pay" (2026-11-09): the pure core. What is locked:
 *
 * - the code: 10 characters a parent can read aloud, never guessable;
 * - the name a parent sees: a first name or nothing, never an email;
 * - what the parent page shows (payable · expired · already active · pass gone);
 * - the order: stamped for the STUDENT, carrying the link's code;
 * - the grant: to the order's own student, and only for the link it names.
 */
import { describe, it, expect } from "vitest";
import {
  PARENT_LINK_DAYS,
  isParentCode,
  makeParentCode,
  parentFirstName,
  parentLinkState,
  parentOrderNotes,
  parentGrantFromOrder,
  parentPayUrl,
  parentShareText,
  parentGrantNote,
  buildParentPaidEmail,
  summariseParentLinks,
  type ParentLink,
} from "@/lib/billing/parentLink";
import type { Plan } from "@/lib/billing/plans";

const plan: Plan = {
  id: "practice-pass-6m",
  label: "Practice Pass",
  blurb: "",
  perks: [],
  urlKey: "practice",
  amountPaise: 19900,
  currency: "INR",
  site: "pyqvault",
  durationDays: 182,
  scope: "practice",
  active: true,
  sortOrder: 0,
};

const NOW = Date.parse("2026-11-09T10:00:00Z");
const link: ParentLink = {
  code: "AbCdEfGh23",
  userId: "11111111-1111-4111-8111-111111111111",
  planId: plan.id,
  studentName: "Riya",
  createdAt: new Date(NOW).toISOString(),
  expiresAt: new Date(NOW + PARENT_LINK_DAYS * 86_400_000).toISOString(),
};

describe("makeParentCode / isParentCode", () => {
  it("makes 10 characters with no look-alikes (0 O 1 l I)", () => {
    for (let i = 0; i < 200; i++) {
      const code = makeParentCode();
      expect(code).toHaveLength(10);
      expect(code).not.toMatch(/[0O1lI]/);
      expect(isParentCode(code)).toBe(true);
    }
  });

  it("does not repeat (60 bits: a guess never lands)", () => {
    const seen = new Set(Array.from({ length: 2000 }, () => makeParentCode()));
    expect(seen.size).toBe(2000);
  });

  it("refuses anything else before a database read", () => {
    for (const bad of ["", "short", "AbCdEfGh2", "AbCdEfGh234", "AbCdEfGh2!", "../../etc", "AbCdEfGh2O", null, 42]) {
      expect(isParentCode(bad)).toBe(false);
    }
  });
});

describe("parentFirstName", () => {
  it("prefers the name the student chose, first word only", () => {
    expect(parentFirstName("Riya", "Riya Sharma")).toBe("Riya");
    expect(parentFirstName(null, "Riya Sharma")).toBe("Riya");
    expect(parentFirstName("  aman  ", null)).toBe("Aman");
  });

  it("never shows an email, a handle or digits: nothing instead", () => {
    expect(parentFirstName(null, "riya@gmail.com")).toBeNull();
    expect(parentFirstName(null, "riya_2008")).toBeNull();
    expect(parentFirstName(null, "")).toBeNull();
    expect(parentFirstName(null, null)).toBeNull();
    expect(parentFirstName("x", null)).toBeNull();
    // A chosen name that fails falls back to the sign-up name.
    expect(parentFirstName("riya_2008", "Riya Sharma")).toBe("Riya");
  });

  it("caps a long word", () => {
    expect(parentFirstName(null, "A".repeat(60))).toBeNull();
  });
});

describe("parentLinkState", () => {
  const base = { link, plan, nowMs: NOW + 3_600_000, studentHasPass: false };

  it("is payable inside the week with the pass on sale", () => {
    expect(parentLinkState(base)).toBe("payable");
  });

  it("is expired after the week", () => {
    expect(parentLinkState({ ...base, nowMs: Date.parse(link.expiresAt) + 1 })).toBe("expired");
  });

  it("says already active before anything else, so nobody pays twice", () => {
    expect(parentLinkState({ ...base, studentHasPass: true })).toBe("already_active");
    expect(parentLinkState({ ...base, studentHasPass: true, nowMs: Date.parse(link.expiresAt) + 1 })).toBe("already_active");
  });

  it("is pass_gone when the pass is no longer sold in rupees on www", () => {
    expect(parentLinkState({ ...base, plan: null })).toBe("pass_gone");
    expect(parentLinkState({ ...base, plan: { ...plan, active: false } })).toBe("pass_gone");
    expect(parentLinkState({ ...base, plan: { ...plan, currency: "USD", site: "intl" } })).toBe("pass_gone");
  });
});

describe("parentShareText / parentPayUrl", () => {
  it("names the exam, the pass, the price and the link", () => {
    const url = parentPayUrl(link.code);
    expect(url).toBe("https://www.pyqvault.com/pay/AbCdEfGh23");
    const text = parentShareText({ examName: "NDA", planLabel: "Practice Pass", price: "₹199", length: "6 months", url });
    expect(text).toBe(
      "Hi, I'm preparing for NDA on PYQ Vault. Can you get me the Practice Pass? ₹199 for 6 months. Pay here: https://www.pyqvault.com/pay/AbCdEfGh23"
    );
  });

  it("reads naturally with no exam", () => {
    const text = parentShareText({ examName: null, planLabel: "Premium Pass", price: "₹499", length: "6 months", url: "u" });
    expect(text.startsWith("Hi, I'm preparing for my exams on PYQ Vault.")).toBe(true);
  });

  it("has no em dash (owner rule)", () => {
    const text = parentShareText({ examName: "CDS", planLabel: "Premium Pass", price: "₹499", length: "6 months", url: "u" });
    expect(text).not.toMatch(/—|–/);
  });
});

describe("parentOrderNotes / parentGrantFromOrder", () => {
  const notes = parentOrderNotes(plan, link);

  it("stamps the order for the student, with the link's code", () => {
    expect(notes.userId).toBe(link.userId);
    expect(notes.planId).toBe(plan.id);
    expect(notes.amountPaise).toBe("19900");
    expect(notes.parentLink).toBe(link.code);
  });

  const paid = { status: "paid", amount_paid: 19900, currency: "INR", notes };

  it("grants the order's student for the link it names", () => {
    const r = parentGrantFromOrder(paid, link.code);
    expect(r).toEqual({
      ok: true,
      userId: link.userId,
      grant: { planId: plan.id, scope: "practice", durationDays: 182, amountPaise: 19900, currency: "INR" },
    });
  });

  it("refuses an order made for another link or none", () => {
    expect(parentGrantFromOrder(paid, "ZZZZZZZZZZ")).toMatchObject({ ok: false });
    const plain = { ...paid, notes: { ...notes, parentLink: undefined as unknown as string } };
    expect(parentGrantFromOrder(plain, link.code)).toMatchObject({ ok: false });
  });

  it("keeps the paid-order rules: unpaid and short-paid orders grant nothing", () => {
    expect(parentGrantFromOrder({ ...paid, status: "attempted" }, link.code)).toEqual({ ok: false, reason: "order not paid" });
    expect(parentGrantFromOrder({ ...paid, amount_paid: 100 }, link.code)).toMatchObject({ ok: false });
  });

  it("marks the pass as paid through a parent link", () => {
    expect(parentGrantNote(link.code)).toBe("parent_link:AbCdEfGh23");
    expect(parentGrantNote(undefined)).toBeNull();
    expect(parentGrantNote("not a code")).toBeNull();
  });
});

describe("buildParentPaidEmail", () => {
  it("tells the student the pass is active, from their parent link", () => {
    const e = buildParentPaidEmail({ name: "Riya Sharma", planLabel: "Practice Pass", length: "6 months" });
    expect(e.subject).toBe("Your Practice Pass is active");
    expect(e.text).toContain("Hi Riya,");
    expect(e.text).toContain("paid through the link you sent");
    expect(e.text).toContain("6 months");
    expect(e.html).toContain("Practice Pass");
    expect(e.text + e.html).not.toMatch(/—|–/);
  });

  it("escapes what it prints", () => {
    const e = buildParentPaidEmail({ name: "<b>", planLabel: "Pass <i>", length: "6 months" });
    expect(e.html).not.toContain("<i>");
  });
});

describe("summariseParentLinks (/dashboard/sales)", () => {
  it("counts STUDENTS at each step, and the passes and rupees paid", () => {
    const s = summariseParentLinks(
      [
        { userId: "a", step: "parent_link_created" },
        { userId: "a", step: "parent_link_created" },
        { userId: "b", step: "parent_link_created" },
        { userId: "a", step: "parent_link_opened" },
        { userId: "a", step: "parent_link_opened" },
        { userId: "a", step: "parent_checkout_opened" },
        { userId: "c", step: "shown" },
      ],
      [{ amountPaise: 19900 }, { amountPaise: 49900 }]
    );
    expect(s).toEqual({ asked: 2, opened: 1, checkout: 1, paid: 2, rupees: 698 });
  });
});
