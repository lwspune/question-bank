/**
 * The owner's checkout follow-up (2026-11-19, owner): at 6 pm IST, one email
 * listing the students who opened a pass checkout (and, since 2026-11-26, an
 * ebook checkout) in the last 24 hours and did not pay, each with a WhatsApp link that opens with a message typed. The
 * owner reads it and presses send, one student at a time; nothing is sent to a
 * student from here.
 *
 * WHY: 20 Oct to 12 Nov, 65 students left a checkout unpaid (26 with a mobile)
 * and only 5 paid within 7 days. The student-side bar ("Your checkout didn't
 * complete", ./leftCheckout) is the automatic reminder; this is the personal one.
 *
 * Listed ONCE: a student who opened a checkout in the 14 days before the
 * window is left out, so a student who keeps looking is not chased daily.
 *
 * A FAILED payment (2026-11-26) is named beside the student, read from
 * Razorpay itself (./paymentFailure): 6 of 13 FamPay payments were declined
 * on a first try that a second try fixed, so a decline gets a "try again" line.
 *
 * Pure. Reads: ./checkoutFollowupService. Runner: scripts/billing/checkout-followup.ts.
 */
import { SITE_URL } from "@/lib/brand";
import { ACCENT, BRAND, INK, MUTED, REPLY_TO, escapeHtml, type BuiltEmail } from "@/lib/email/templates";
import { checkInFirstName } from "@/lib/students/checkIn";
import { whatsappHref } from "@/lib/profile/mobile";
import { SCOPE_MOCKS, hasActiveScope, type Entitlement } from "@/lib/entitlements/access";
import { ebookPricePaise } from "@/lib/ebooks/pricing";
import { DECLINE_REASON_LABELS, isDeclineReason, type DeclineReason } from "./declineReasons";
import { stillUnpaid } from "./leftCheckout";
import { ownerFailureLabel, type FailureKind } from "./paymentFailure";
import { resolveOrderPlan, type Plan } from "./plans";

const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;

/** A checkout opened under an hour ago may still be paid: the window ends then. */
export const FOLLOWUP_GRACE_HOURS = 1;
/** One run a day, so the window is a day. */
export const FOLLOWUP_WINDOW_HOURS = 24;
/** A student who opened a checkout this many days before the window was listed then. */
export const FOLLOWUP_QUIET_DAYS = 14;

export function followupWindow(now: Date): { from: Date; to: Date } {
  const to = new Date(now.getTime() - FOLLOWUP_GRACE_HOURS * HOUR_MS);
  return { from: new Date(to.getTime() - FOLLOWUP_WINDOW_HOURS * HOUR_MS), to };
}

/** How far back the service reads: the window plus the quiet days before it. */
export function followupReadSince(now: Date): Date {
  return new Date(followupWindow(now).from.getTime() - FOLLOWUP_QUIET_DAYS * DAY_MS);
}

/** One paywall_event row: a checkout opened, or the reason a student tapped. */
export type FollowupEvent = {
  userId: string;
  at: Date;
  step: string;
  gate: string;
  planId: string | null;
  country: string | null;
  reason: string | null;
};

export type FollowupCandidate = {
  userId: string;
  /** The pass of their latest open in the window. */
  planId: string;
  /** Their first open in the window: anything bought after it means they decided. */
  openedAt: Date;
  lastOpenedAt: Date;
  gate: string;
  country: string | null;
  reason: DeclineReason | null;
};

export function followupCandidates(
  events: readonly FollowupEvent[],
  window: { from: Date; to: Date },
  staff: ReadonlySet<string>
): FollowupCandidate[] {
  const from = window.from.getTime();
  const to = window.to.getTime();
  const quietFrom = from - FOLLOWUP_QUIET_DAYS * DAY_MS;

  const byUser = new Map<string, FollowupEvent[]>();
  for (const e of events) {
    if (staff.has(e.userId)) continue;
    const list = byUser.get(e.userId) ?? [];
    list.push(e);
    byUser.set(e.userId, list);
  }

  const out: FollowupCandidate[] = [];
  for (const [userId, list] of byUser) {
    const opens = list.filter((e) => e.step === "checkout_opened" && e.planId).sort((a, b) => a.at.getTime() - b.at.getTime());
    const inWindow = opens.filter((e) => e.at.getTime() >= from && e.at.getTime() <= to);
    if (inWindow.length === 0) continue;
    if (opens.some((e) => e.at.getTime() >= quietFrom && e.at.getTime() < from)) continue;
    const first = inWindow[0];
    const last = inWindow[inWindow.length - 1];
    const reasons = list
      .filter((e) => e.step === "declined" && e.at.getTime() >= first.at.getTime() && e.at.getTime() <= to && isDeclineReason(e.reason))
      .sort((a, b) => b.at.getTime() - a.at.getTime());
    out.push({
      userId,
      planId: last.planId as string,
      openedAt: first.at,
      lastOpenedAt: last.at,
      gate: last.gate,
      country: last.country,
      reason: (reasons[0]?.reason as DeclineReason | undefined) ?? null,
    });
  }
  return out.sort((a, b) => a.lastOpenedAt.getTime() - b.lastOpenedAt.getTime());
}

/** A student who opened an ebook checkout in the window. */
export type BookFollowupCandidate = {
  userId: string;
  /** The book of their latest open in the window. */
  slug: string;
  openedAt: Date;
  lastOpenedAt: Date;
  country: string | null;
};

/**
 * Ebook checkouts (2026-11-26, owner): the order route writes
 * book_checkout_opened with the book's slug (read here as `planId`). Listed
 * once per 14 days like a pass, counted apart from pass opens; a student who
 * also left a pass in the window is listed for the pass alone (`passUserIds`),
 * so one person gets one message.
 */
export function bookFollowupCandidates(
  events: readonly FollowupEvent[],
  window: { from: Date; to: Date },
  staff: ReadonlySet<string>,
  passUserIds: ReadonlySet<string>
): BookFollowupCandidate[] {
  const from = window.from.getTime();
  const to = window.to.getTime();
  const quietFrom = from - FOLLOWUP_QUIET_DAYS * DAY_MS;
  const byUser = new Map<string, FollowupEvent[]>();
  for (const e of events) {
    if (e.step !== "book_checkout_opened" || !e.planId) continue;
    if (staff.has(e.userId) || passUserIds.has(e.userId)) continue;
    byUser.set(e.userId, [...(byUser.get(e.userId) ?? []), e]);
  }
  const out: BookFollowupCandidate[] = [];
  for (const [userId, list] of byUser) {
    const opens = [...list].sort((a, b) => a.at.getTime() - b.at.getTime());
    const inWindow = opens.filter((e) => e.at.getTime() >= from && e.at.getTime() <= to);
    if (inWindow.length === 0) continue;
    if (opens.some((e) => e.at.getTime() >= quietFrom && e.at.getTime() < from)) continue;
    const last = inWindow[inWindow.length - 1];
    out.push({ userId, slug: last.planId as string, openedAt: inWindow[0].at, lastOpenedAt: last.at, country: last.country });
  }
  return out.sort((a, b) => a.lastOpenedAt.getTime() - b.lastOpenedAt.getTime());
}

/**
 * Books still worth a message: on sale, not owned, priced as checkout would
 * price them (a Premium holder's 20% off, lib/ebooks/pricing).
 */
export function keepUnpaidBooks(
  candidates: readonly BookFollowupCandidate[],
  ownedByUser: ReadonlyMap<string, ReadonlySet<string>>,
  books: ReadonlyMap<string, { title: string; pricePaise: number }>,
  grantsByUser: ReadonlyMap<string, readonly Entitlement[]>,
  now: Date
): (BookFollowupCandidate & { title: string; amountPaise: number })[] {
  const out: (BookFollowupCandidate & { title: string; amountPaise: number })[] = [];
  for (const c of candidates) {
    const book = books.get(c.slug);
    if (!book) continue;
    if (ownedByUser.get(c.userId)?.has(c.slug)) continue;
    const passHolder = hasActiveScope([...(grantsByUser.get(c.userId) ?? [])], SCOPE_MOCKS, now.getTime());
    out.push({ ...c, title: book.title, amountPaise: ebookPricePaise(book.pricePaise, passHolder) });
  }
  return out;
}

/**
 * Students still worth a message, each with the pass at their own country's
 * price (as checkout would charge them). www passes only: an intl pass is sold
 * in dollars to students a WhatsApp from India does not fit, and a pass no
 * longer on sale has nothing to complete.
 */
export function keepUnpaid(
  candidates: readonly FollowupCandidate[],
  grantsByUser: ReadonlyMap<string, readonly Entitlement[]>,
  plans: readonly Plan[],
  now: Date
): (FollowupCandidate & { plan: Plan })[] {
  const out: (FollowupCandidate & { plan: Plan })[] = [];
  for (const c of candidates) {
    const plan = resolveOrderPlan(plans, c.planId, c.country);
    if (!plan || plan.site !== "pyqvault") continue;
    if (!stillUnpaid({ planId: c.planId, openedAt: c.openedAt }, grantsByUser.get(c.userId) ?? [], plan.scope, now)) continue;
    out.push({ ...c, plan });
  }
  return out;
}

/** The name to greet by: the one the student chose, else their account name. */
export function followupFirstName(preferredName: string | null | undefined, name: string | null | undefined): string | null {
  return checkInFirstName(preferredName ?? "") ?? checkInFirstName(name ?? "");
}

/** A failed payment, as the 6 pm list carries it. */
export type FollowupFailure = { kind: FailureKind; app: string | null };

/**
 * The owner's message (wording approved 2026-11-19). A payment their UPI app
 * declined (2026-11-26) gets the "try again" line instead of "didn't finish";
 * a timeout or a low balance keeps the usual wording.
 */
export function followupMessage(input: {
  firstName: string | null;
  examName: string | null;
  planLabel: string;
  price: string;
  parentUrl: string | null;
  failure?: FollowupFailure | null;
}): string {
  const greeting = input.firstName ? `Hi ${input.firstName},` : "Hi,";
  const exam = input.examName ? ` for ${input.examName}` : "";
  const parent = input.parentUrl ? ` If it's easier for a parent to pay, they can use this link: ${input.parentUrl}` : "";
  const item = `the ${input.planLabel} (${input.price})${exam}`;
  if (input.failure?.kind === "declined") {
    const retry =
      input.failure.app === "FamPay"
        ? "FamPay often declines the first try, and trying again usually works. Paying with another UPI app works too."
        : "This often works on a second try, or with another UPI app.";
    return `${greeting} this is Vilas. I built PYQ Vault. I saw your payment for ${item} didn't go through. ${retry} Any questions I can help with?${parent}`;
  }
  return `${greeting} this is Vilas. I built PYQ Vault. I saw you were looking at ${item}, but the payment didn't finish. Any questions I can help with?${parent}`;
}

/** Where the student met the offer, as the owner would say it. */
const GATE_LABELS: Record<string, string> = {
  mock_limit: "free mock limit",
  teacher: "a download",
  pricing: "the pricing page",
  chapter_test: "chapter test limit",
  drill: "drill limit",
  reveals: "daily answer limit",
  saves: "save limit",
  projection: "score projection",
  store: "the store",
  v_hourly: "V's hourly limit",
  parent: "a parent's pay page",
  return: "the checkout-didn't-complete bar",
};

export function gateLabel(gate: string): string {
  return GATE_LABELS[gate] ?? gate;
}

/** One student in the email. */
export type FollowupRow = {
  name: string;
  email: string | null;
  mobile: string | null;
  examName: string | null;
  planLabel: string;
  price: string;
  leftAt: Date;
  gate: string;
  reason: DeclineReason | string | null;
  /** Their latest failed payment in the window, read from Razorpay (2026-11-26). */
  failure?: FollowupFailure | null;
  message: string;
};

const TIME_IST = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function details(r: FollowupRow): string {
  const parts = [
    r.examName,
    `${r.planLabel} ${r.price}`,
    `left ${TIME_IST.format(r.leftAt)}`,
    `from ${gateLabel(r.gate)}`,
  ].filter((p): p is string => Boolean(p));
  if (r.failure) parts.push(ownerFailureLabel(r.failure));
  if (r.reason) parts.push(`said: ${isDeclineReason(r.reason) ? DECLINE_REASON_LABELS[r.reason] : r.reason}`);
  return parts.join(" · ");
}

function mailtoHref(email: string, message: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(`Your ${BRAND} checkout`)}&body=${encodeURIComponent(message)}`;
}

/**
 * One row per mobile: two accounts can carry one number (seen on the first
 * live run, 2026-11-19), and one person should get one message. The account
 * that left checkout last stays, in the original order.
 */
function onePerMobile(rows: readonly FollowupRow[]): FollowupRow[] {
  const latest = new Map<string, FollowupRow>();
  for (const r of rows) {
    if (!r.mobile) continue;
    const seen = latest.get(r.mobile);
    if (!seen || r.leftAt.getTime() > seen.leftAt.getTime()) latest.set(r.mobile, r);
  }
  return rows.filter((r) => !r.mobile || latest.get(r.mobile) === r);
}

/** The 6 pm email, or null on a day with nobody listed (then nothing is sent). */
export function buildFollowupEmail(allRows: readonly FollowupRow[], now: Date): BuiltEmail | null {
  const rows = onePerMobile(allRows);
  if (rows.length === 0) return null;
  const withMobile = rows.filter((r) => whatsappHref(r.mobile, r.message));
  const withoutMobile = rows.filter((r) => !whatsappHref(r.mobile, r.message));
  const n = rows.length;
  const subject = `${BRAND}: ${n} ${n === 1 ? "student" : "students"} left checkout without paying`;
  const intro = `Students who opened a pass or ebook checkout in the 24 hours to ${TIME_IST.format(followupWindow(now).to)} and have not paid. Each is listed once; the message is typed for you to read and send.`;
  const outro = `Sales and parent links: ${SITE_URL}/dashboard/sales`;

  const textSections: string[] = [intro, ""];
  if (withMobile.length > 0) {
    textSections.push("On WhatsApp:");
    for (const r of withMobile) textSections.push(`- ${r.name} (+${r.mobile}): ${details(r)}`, `  ${whatsappHref(r.mobile, r.message)}`);
    textSections.push("");
  }
  if (withoutMobile.length > 0) {
    textSections.push("No mobile, email only:");
    for (const r of withoutMobile) textSections.push(`- ${r.name} (${r.email ?? "no email"}): ${details(r)}`, `  ${r.message}`);
    textSections.push("");
  }
  textSections.push(outro);

  const li = (r: FollowupRow, action: string) =>
    `    <li style="margin:0 0 12px"><strong>${escapeHtml(r.name)}</strong><br><span style="color:${MUTED}">${escapeHtml(details(r))}</span><br>${action}</li>`;
  const link = (href: string, label: string) =>
    `<a href="${escapeHtml(href)}" style="color:${ACCENT};font-weight:600">${escapeHtml(label)}</a>`;
  const htmlSections: string[] = [];
  if (withMobile.length > 0) {
    htmlSections.push(`  <p style="margin:0 0 6px"><strong>On WhatsApp</strong></p>
  <ul style="margin:0 0 12px;padding-left:20px">
${withMobile.map((r) => li(r, link(whatsappHref(r.mobile, r.message) as string, `Message on WhatsApp (+${r.mobile})`))).join("\n")}
  </ul>`);
  }
  if (withoutMobile.length > 0) {
    htmlSections.push(`  <p style="margin:0 0 6px"><strong>No mobile, email only</strong></p>
  <ul style="margin:0 0 12px;padding-left:20px">
${withoutMobile
  .map((r) => li(r, r.email ? link(mailtoHref(r.email, r.message), `Email ${r.email}`) : `<span style="color:${MUTED}">No email</span>`))
  .join("\n")}
  </ul>`);
  }
  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:620px;margin:0 auto;color:${INK};line-height:1.55">
  <p style="margin:0 0 12px">${escapeHtml(intro)}</p>
${htmlSections.join("\n")}
  <p style="margin:0 0 12px;color:${MUTED}">${link(`${SITE_URL}/dashboard/sales`, "Sales and parent links")}</p>
</div>`;

  return { subject, text: textSections.join("\n"), html, replyTo: REPLY_TO, headers: {} };
}
