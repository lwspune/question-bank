/**
 * The owner's 6 pm checkout follow-up (2026-11-19, owner): one email a day
 * listing students who opened a pass checkout in the last 24 hours and did not
 * pay, each with a WhatsApp link that opens with a message typed. 20 Oct to
 * 12 Nov: 65 such students (26 with a mobile), and only 5 paid within 7 days.
 */
import { describe, it, expect } from "vitest";
import {
  FOLLOWUP_QUIET_DAYS,
  buildFollowupEmail,
  followupCandidates,
  followupFirstName,
  followupMessage,
  followupWindow,
  keepUnpaid,
  type FollowupEvent,
  type FollowupRow,
} from "@/lib/billing/checkoutFollowup";
import type { Entitlement } from "@/lib/entitlements/access";
import type { Plan } from "@/lib/billing/plans";

// 19 Nov 2026, 18:00 IST: the run.
const NOW = new Date("2026-11-19T12:30:00Z");
const hoursAgo = (h: number) => new Date(NOW.getTime() - h * 3_600_000);
const daysAgo = (d: number) => new Date(NOW.getTime() - d * 86_400_000);

const open = (userId: string, at: Date, planId: string | null = "practice-pass-6m", extra: Partial<FollowupEvent> = {}): FollowupEvent => ({
  userId,
  at,
  step: "checkout_opened",
  gate: "reveals",
  planId,
  country: "IN",
  reason: null,
  ...extra,
});
const declined = (userId: string, at: Date, reason: string): FollowupEvent => ({
  userId,
  at,
  step: "declined",
  gate: "reveals",
  planId: null,
  country: "IN",
  reason,
});

const plan = (p: Partial<Plan> & Pick<Plan, "id" | "scope">): Plan => ({
  label: "Practice Pass",
  blurb: "",
  perks: [],
  urlKey: p.id,
  amountPaise: 19900,
  currency: "INR",
  site: "pyqvault",
  durationDays: 180,
  active: true,
  sortOrder: 1,
  countries: null,
  ...p,
});
const PLANS: Plan[] = [
  plan({ id: "practice-pass-6m", scope: "practice" }),
  plan({ id: "premium-pass-1y", scope: "mocks", label: "Premium Pass", amountPaise: 49900 }),
  plan({ id: "practice-gulf", scope: "practice", amountPaise: 39900, countries: ["AE", "SA"] }),
  plan({ id: "intl-pass-6m", scope: "imat", site: "intl", currency: "USD", label: "IMAT Pass", amountPaise: 2900 }),
];

const grant = (g: Partial<Entitlement>): Entitlement => ({
  id: "e1",
  userId: "u1",
  scope: "practice",
  source: "razorpay",
  status: "active",
  grantedAt: hoursAgo(2).toISOString(),
  expiresAt: null,
  providerRef: null,
  note: null,
  grantedBy: null,
  ...g,
});

const WINDOW = followupWindow(NOW);
const NO_STAFF = new Set<string>();

describe("followupWindow", () => {
  it("covers the 24 hours that end an hour before the run, so a checkout still open is left alone", () => {
    expect(WINDOW.to).toEqual(hoursAgo(1));
    expect(WINDOW.from).toEqual(hoursAgo(25));
  });
});

describe("followupCandidates", () => {
  it("lists a student who opened a checkout in the window", () => {
    const c = followupCandidates([open("u1", hoursAgo(5))], WINDOW, NO_STAFF);
    expect(c).toEqual([
      { userId: "u1", planId: "practice-pass-6m", openedAt: hoursAgo(5), lastOpenedAt: hoursAgo(5), gate: "reveals", country: "IN", reason: null },
    ]);
  });

  it("leaves out a checkout opened in the last hour (they may still be paying)", () => {
    expect(followupCandidates([open("u1", hoursAgo(0.5))], WINDOW, NO_STAFF)).toEqual([]);
  });

  it("leaves out a checkout from before the window (yesterday's email had it)", () => {
    expect(followupCandidates([open("u1", hoursAgo(26))], WINDOW, NO_STAFF)).toEqual([]);
  });

  it(`leaves out a student who opened a checkout in the ${FOLLOWUP_QUIET_DAYS} days before the window: listed once, not chased`, () => {
    expect(followupCandidates([open("u1", daysAgo(5)), open("u1", hoursAgo(5))], WINDOW, NO_STAFF)).toEqual([]);
    expect(followupCandidates([open("u1", daysAgo(FOLLOWUP_QUIET_DAYS + 2)), open("u1", hoursAgo(5))], WINDOW, NO_STAFF)).toHaveLength(1);
  });

  it("lists a student once, naming the pass of their latest open and dating it from their first", () => {
    const c = followupCandidates(
      [open("u1", hoursAgo(20)), open("u1", hoursAgo(4), "premium-pass-1y", { gate: "teacher" })],
      WINDOW,
      NO_STAFF
    );
    expect(c).toHaveLength(1);
    expect(c[0]).toMatchObject({ planId: "premium-pass-1y", openedAt: hoursAgo(20), lastOpenedAt: hoursAgo(4), gate: "teacher" });
  });

  it("leaves out staff", () => {
    expect(followupCandidates([open("staff1", hoursAgo(5))], WINDOW, new Set(["staff1"]))).toEqual([]);
  });

  it("leaves out an open with no pass named", () => {
    expect(followupCandidates([open("u1", hoursAgo(5), null)], WINDOW, NO_STAFF)).toEqual([]);
  });

  it("carries the reason the student tapped after their checkout", () => {
    const c = followupCandidates([open("u1", hoursAgo(5)), declined("u1", hoursAgo(4), "ask_parent")], WINDOW, NO_STAFF);
    expect(c[0].reason).toBe("ask_parent");
  });

  it("ignores a reason from before the checkout, and one that is not a known reason", () => {
    expect(followupCandidates([declined("u1", hoursAgo(6), "too_expensive"), open("u1", hoursAgo(5))], WINDOW, NO_STAFF)[0].reason).toBeNull();
    expect(followupCandidates([open("u1", hoursAgo(5)), declined("u1", hoursAgo(4), "bogus")], WINDOW, NO_STAFF)[0].reason).toBeNull();
  });

  it("orders students by when they left, earliest first", () => {
    const c = followupCandidates([open("late", hoursAgo(3)), open("early", hoursAgo(20))], WINDOW, NO_STAFF);
    expect(c.map((x) => x.userId)).toEqual(["early", "late"]);
  });
});

describe("keepUnpaid", () => {
  const [c] = followupCandidates([open("u1", hoursAgo(5))], WINDOW, NO_STAFF);

  it("keeps a student with no pass, priced at their country's price", () => {
    const kept = keepUnpaid([c], new Map(), PLANS, NOW);
    expect(kept).toHaveLength(1);
    expect(kept[0].plan.id).toBe("practice-pass-6m");

    const [gulf] = followupCandidates([open("u2", hoursAgo(5), "practice-pass-6m", { country: "AE" })], WINDOW, NO_STAFF);
    expect(keepUnpaid([gulf], new Map(), PLANS, NOW)[0].plan.id).toBe("practice-gulf");
  });

  it("drops a student who paid after opening the checkout", () => {
    expect(keepUnpaid([c], new Map([["u1", [grant({ grantedAt: hoursAgo(2).toISOString() })]]]), PLANS, NOW)).toEqual([]);
  });

  it("drops a student whose active pass covers the one they opened, a comp included", () => {
    const comp = grant({ source: "comp", grantedAt: daysAgo(30).toISOString() });
    expect(keepUnpaid([c], new Map([["u1", [comp]]]), PLANS, NOW)).toEqual([]);
  });

  it("keeps a Practice holder who left a Premium upgrade", () => {
    const [up] = followupCandidates([open("u1", hoursAgo(5), "premium-pass-1y")], WINDOW, NO_STAFF);
    const practice = grant({ scope: "practice", grantedAt: daysAgo(30).toISOString() });
    expect(keepUnpaid([up], new Map([["u1", [practice]]]), PLANS, NOW)).toHaveLength(1);
  });

  it("drops an intl pass and a pass no longer on sale", () => {
    const [intl] = followupCandidates([open("u1", hoursAgo(5), "intl-pass-6m")], WINDOW, NO_STAFF);
    const [gone] = followupCandidates([open("u2", hoursAgo(5), "old-pass")], WINDOW, NO_STAFF);
    expect(keepUnpaid([intl, gone], new Map(), PLANS, NOW)).toEqual([]);
  });
});

describe("followupFirstName", () => {
  it("prefers the name the student chose, then the account name, first word, case fixed", () => {
    expect(followupFirstName("riya", "Riya Sharma")).toBe("Riya");
    expect(followupFirstName(null, "AARAV SHARMA")).toBe("Aarav");
  });

  it("gives null for an email or nothing", () => {
    expect(followupFirstName(null, "aarav.s@gmail.com")).toBeNull();
    expect(followupFirstName(null, null)).toBeNull();
  });
});

describe("followupMessage", () => {
  const base = { firstName: "Riya", examName: "NDA", planLabel: "Practice Pass", price: "₹199", parentUrl: "https://www.pyqvault.com/pay/ABCDEFGHJK" };

  it("reads as the owner's draft", () => {
    expect(followupMessage(base)).toBe(
      "Hi Riya, this is Vilas. I built PYQ Vault. I saw you were looking at the Practice Pass (₹199) for NDA, but the payment didn't finish. Any questions I can help with? If it's easier for a parent to pay, they can use this link: https://www.pyqvault.com/pay/ABCDEFGHJK"
    );
  });

  it("works with no name, no exam and no parent link", () => {
    expect(followupMessage({ ...base, firstName: null, examName: null, parentUrl: null })).toBe(
      "Hi, this is Vilas. I built PYQ Vault. I saw you were looking at the Practice Pass (₹199), but the payment didn't finish. Any questions I can help with?"
    );
  });

  it("has no em dash", () => {
    expect(followupMessage(base)).not.toMatch(/[—–]/);
  });
});

describe("buildFollowupEmail", () => {
  const row = (r: Partial<FollowupRow>): FollowupRow => ({
    name: "Riya Sharma",
    email: "riya@example.com",
    mobile: "919876543210",
    examName: "NDA",
    planLabel: "Practice Pass",
    price: "₹199",
    leftAt: hoursAgo(5),
    gate: "reveals",
    reason: "ask_parent",
    message: "Hi Riya, this is Vilas. I built PYQ Vault.",
    ...r,
  });

  it("sends nothing on a day with nobody to message", () => {
    expect(buildFollowupEmail([], NOW)).toBeNull();
  });

  it("names the count, and gives each student with a mobile a WhatsApp link with the message typed", () => {
    const email = buildFollowupEmail([row({}), row({ name: "Aarav", mobile: null, email: "aarav@example.com", reason: null })], NOW)!;
    expect(email.subject).toBe("PYQ Vault: 2 students left checkout without paying");
    expect(email.html).toContain(`https://wa.me/919876543210?text=${encodeURIComponent("Hi Riya, this is Vilas. I built PYQ Vault.")}`);
    expect(email.text).toContain("Riya Sharma");
    expect(email.text).toContain("Practice Pass ₹199");
    expect(email.text).toContain("Need to ask a parent");
    expect(email.text).toContain("daily answer limit");
    // 5 hours before 18:00 IST: the time they left, India time, not UTC (07:30).
    expect(email.text).toContain("13:00");
  });

  it("lists a student with no mobile under email, with the message ready to paste", () => {
    const email = buildFollowupEmail([row({ mobile: null })], NOW)!;
    expect(email.subject).toBe("PYQ Vault: 1 student left checkout without paying");
    expect(email.html).not.toContain("wa.me");
    expect(email.html).toContain("mailto:riya@example.com");
  });

  // Seen on the first live dry run (2026-11-19): two accounts (NEET and
  // MHT-CET) carried one mobile, which would have put two links to one person.
  it("lists a mobile once, keeping the account that left checkout last", () => {
    const email = buildFollowupEmail(
      [row({ name: "First Account", leftAt: hoursAgo(10) }), row({ name: "Second Account", leftAt: hoursAgo(3) })],
      NOW
    )!;
    expect(email.subject).toBe("PYQ Vault: 1 student left checkout without paying");
    expect(email.text).toContain("Second Account");
    expect(email.text).not.toContain("First Account");
  });

  it("escapes a student's name in the HTML", () => {
    const email = buildFollowupEmail([row({ name: "<b>x</b>" })], NOW)!;
    expect(email.html).not.toContain("<b>x</b>");
    expect(email.html).toContain("&lt;b&gt;x&lt;/b&gt;");
  });
});
