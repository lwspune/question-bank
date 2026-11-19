/**
 * V on intl.pyqvault.com (owner, 2026-11-19: "lets allow v on intl site").
 *
 * Until then V's window hid itself on intl, but the Ask V buttons still showed
 * and still sent: three IMAT students tapped, V answered, and they saw nothing
 * (one tapped five times and hit the hourly limit). Everything V was told was
 * about www: rupee passes paid by UPI, Indian exams, /board, /performance,
 * /about. On intl it is told only what is true there, and links only pages
 * intl serves (a www-only path bounces the student to www, signed out: each
 * site keeps its own login).
 */
import { describe, it, expect } from "vitest";
import { pathsInReply } from "@/lib/chat/replyLinks";
import {
  buildExamFacts,
  buildIntlNotesFacts,
  buildPlanFacts,
  buildSystemPrompt,
  examFactFromEntry,
  INTL_NAV_FACTS,
  NAV_FACTS,
} from "@/lib/chat/facts";
import { intlHostDecision, LIVE_INTL_EXAMS } from "@/lib/sites/intl";
import { appPageExists } from "./helpers/appRoutes";

const intlExams = buildExamFacts(
  LIVE_INTL_EXAMS.map((e) => examFactFromEntry(e, new Map([["imat", 240], ["enem", 450]]))),
  "intl"
);

const intlPrompt = buildSystemPrompt({
  site: "intl",
  exams: intlExams,
  plans: ["Premium Pass: $19 for 6 months (unlocks: imat)."],
  bankTotal: 1371,
  nav: INTL_NAV_FACTS,
  notes: buildIntlNotesFacts(LIVE_INTL_EXAMS),
  payBy: "card or another method shown at checkout",
  explainEnabled: true,
  planEnabled: true,
});

const wwwPrompt = buildSystemPrompt({
  exams: ["NDA: senior stage."],
  plans: ["Practice Pass: ₹199 for 6 months (unlocks: practice)."],
  bankTotal: 1,
  nav: NAV_FACTS,
  explainEnabled: true,
  planEnabled: true,
});

/** Does intl keep this path on intl? A section index (/notes, /mock) redirects within intl; anything else goes to www. */
const servedOnIntl = (path: string) => {
  const d = intlHostDecision(path.split(/[?#]/)[0], "");
  return d.kind !== "redirect" || d.url.startsWith("/");
};

describe("what V is told on intl", () => {
  it("says it is PYQ Vault Global for international exams, not a bank of Indian exams", () => {
    expect(intlPrompt).toMatch(/PYQ Vault Global \(intl\.pyqvault\.com\)/);
    expect(intlPrompt).not.toMatch(/Indian exams/);
  });

  it("names only the international exams, with their mock pages on intl", () => {
    expect(intlPrompt).toMatch(/^IMAT: .*\/mock\/exam\/imat/m);
    expect(intlPrompt).toMatch(/^ENEM: .*\/mock\/exam\/enem/m);
    expect(intlPrompt).not.toMatch(/\bNDA\b|\bNEET\b|\bCBSE\b/);
  });

  it("says ENEM is free and IMAT is past papers, never 'board papers'", () => {
    expect(intlPrompt).toMatch(/^ENEM: .*free for everyone/m);
    expect(intlPrompt).toMatch(/^IMAT: .*past papers and practice questions/m);
    expect(intlPrompt).not.toMatch(/board papers/);
  });

  it("pays the way intl's checkout does, never by UPI or netbanking unless the passes say so", () => {
    expect(intlPrompt).toMatch(/pay by card or another method shown at checkout/);
    expect(intlPrompt).not.toMatch(/UPI|netbanking/);
  });

  it("drops what exists only on www: /board, guides' Top 10, Ask a parent, WhatsApp, Hindi and Marathi", () => {
    for (const www of [/\/board/, /Ask a parent/i, /WhatsApp/, /Hindi/, /Marathi/, /Hinglish/, /Maharashtra/, /Build a practice test/]) {
      expect(intlPrompt).not.toMatch(www);
    }
  });

  it("sends progress to /me/map and contact to /contact, which intl serves, not /performance or /about", () => {
    expect(intlPrompt).toMatch(/\/me\/map/);
    expect(intlPrompt).toMatch(/\/contact/);
    expect(intlPrompt).not.toMatch(/\/performance|\/about\b/);
  });

  it("replies in the language the student writes in", () => {
    expect(intlPrompt).toMatch(/Reply in the language the student writes in/);
  });

  it("does not claim 20+ exams", () => {
    expect(intlPrompt).not.toMatch(/20\+ exams/);
  });

  it("links only pages intl serves itself, so a link never bounces the student to www", () => {
    const paths = pathsInReply(intlPrompt);
    expect(paths.length).toBeGreaterThan(5);
    for (const path of paths) {
      expect(servedOnIntl(path), path).toBe(true);
      expect(appPageExists(path), path).toBe(true);
    }
  });
});

// Browser check, 2026-11-19: on intl V said "The Premium Pass costs ₹19": every pass line was formatted
// in rupees, whatever the pass's currency.
describe("a pass's price in its own currency", () => {
  it("writes a dollar pass in dollars and a rupee pass in rupees", () => {
    const [usd, inr] = buildPlanFacts([
      { label: "Premium Pass", amountPaise: 1900, currency: "USD", durationDays: 182, scope: "imat" },
      { label: "Premium Pass", amountPaise: 99900, currency: "INR", durationDays: 182, scope: "imat" },
    ]);
    expect(usd).toMatch(/^Premium Pass: \$19 for/);
    expect(inr).toMatch(/^Premium Pass: ₹999 for/);
  });
});

describe("what V is told on www stays as it was", () => {
  it("keeps its identity, rupee payment and www pages", () => {
    expect(wwwPrompt).toMatch(/a past-year-question bank for Indian exams/);
    expect(wwwPrompt).toMatch(/pay by UPI, card or netbanking/);
    expect(wwwPrompt).toMatch(/\/performance/);
    expect(wwwPrompt).toMatch(/contact form on \/about/);
    expect(wwwPrompt).toMatch(/Build a practice test/);
    expect(wwwPrompt).not.toMatch(/PYQ Vault Global/);
  });
});
