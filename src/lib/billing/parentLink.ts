/**
 * "Ask a parent to pay" (2026-11-09, migration 0244): the pure core.
 *
 * WHY: a student meeting a pass offer often cannot pay (no UPI of their own),
 * and "Need to ask a parent" was one of the four reasons students gave for not
 * buying. A student makes a short link, sends it on WhatsApp, and a parent pays
 * on a page written for them, with no account.
 *
 * HOW IT STAYS SAFE: the link names the STUDENT; the order the parent pays is
 * stamped for that student (the ORDER is the contract, as for every pass), and
 * the grant goes to the order's own student. Whoever pays, only that student
 * gets the pass, so a forwarded link costs nothing but the payer's money.
 */
import { randomInt } from "node:crypto";
import { SITE_URL } from "@/lib/brand";
import { ACCENT, BRAND, INK, MUTED, REPLY_TO, escapeHtml, greetingName, type BuiltEmail } from "@/lib/email/templates";
import { planForPaidOrder, stampOrderNotes, type OrderGrant, type PaidOrder, type Plan } from "./plans";

/** How long a link can be paid. A week: long enough for a parent to get to it. */
export const PARENT_LINK_DAYS = 7;

/** Letters and digits a parent can read aloud: no 0/O, 1/l/I. 55 symbols. */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
const CODE_LENGTH = 10;
const CODE_RE = new RegExp(`^[${ALPHABET}]{${CODE_LENGTH}}$`);

/** A new code, about 58 bits: never guessed, short enough to trust. */
export function makeParentCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) code += ALPHABET[randomInt(ALPHABET.length)];
  return code;
}

/** True for a well-formed code, checked before any database read. */
export function isParentCode(v: unknown): v is string {
  return typeof v === "string" && CODE_RE.test(v);
}

/** A stored link (public.parent_pay_links). */
export type ParentLink = {
  code: string;
  userId: string;
  planId: string;
  /** The first name the parent sees, copied when the link was made; null = none. */
  studentName: string | null;
  createdAt: string;
  expiresAt: string;
};

/**
 * The first name a parent sees: the name the student chose, else their sign-up
 * name, first word only. Anything that looks like an email, a handle or has
 * digits gives nothing; the page then says "a PYQ Vault student".
 */
export function parentFirstName(preferredName: string | null | undefined, name: string | null | undefined): string | null {
  for (const raw of [preferredName, name]) {
    if (typeof raw !== "string") continue;
    const word = raw.trim().split(/\s+/)[0] ?? "";
    if (!word) continue;
    if (!/^[\p{L}][\p{L}'-]{1,29}$/u.test(word)) continue;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return null;
}

export type ParentLinkState = "payable" | "expired" | "already_active" | "pass_gone";

/**
 * What the parent page shows. "Already active" wins over everything, so a
 * parent who opens an old link after the student paid is not asked to pay.
 */
export function parentLinkState(input: {
  link: Pick<ParentLink, "expiresAt">;
  /** The link's pass as sold today, or null when no active plan has its id. */
  plan: Plan | null;
  nowMs: number;
  studentHasPass: boolean;
}): ParentLinkState {
  if (input.studentHasPass) return "already_active";
  if (Date.parse(input.link.expiresAt) <= input.nowMs) return "expired";
  const p = input.plan;
  if (!p || !p.active || p.site !== "pyqvault" || p.currency !== "INR") return "pass_gone";
  return "payable";
}

export function parentPayUrl(code: string): string {
  return `${SITE_URL}/pay/${code}`;
}

/** The message the student sends. They can edit it before it goes. */
export function parentShareText(input: {
  examName: string | null;
  planLabel: string;
  price: string;
  length: string;
  url: string;
}): string {
  const what = input.examName ? input.examName : "my exams";
  return `Hi, I'm preparing for ${what} on PYQ Vault. Can you get me the ${input.planLabel}? ${input.price} for ${input.length}. Pay here: ${input.url}`;
}

/** The order a parent pays: the student's order, plus the link it came from. */
export function parentOrderNotes(plan: Plan, link: Pick<ParentLink, "code" | "userId">): Record<string, string> {
  return { ...stampOrderNotes(plan, link.userId), parentLink: link.code };
}

/**
 * What a paid parent order grants, and to whom. The order must name THIS link;
 * every other rule is the ordinary paid-order rule, run for the order's own
 * student (the payer has no account to compare against).
 */
export function parentGrantFromOrder(
  order: PaidOrder,
  code: string
): { ok: true; userId: string; grant: OrderGrant } | { ok: false; reason: string } {
  if (order.status !== "paid") return { ok: false, reason: "order not paid" };
  const notes = order.notes ?? {};
  if (!isParentCode(code) || notes.parentLink !== code) return { ok: false, reason: "order is not this link's" };
  const userId = notes.userId;
  if (!userId) return { ok: false, reason: "no student in order notes" };
  const decided = planForPaidOrder(order, userId);
  if (!decided.ok) return decided;
  return { ok: true, userId, grant: decided.grant };
}

/** The entitlement note for a pass paid through a parent link, read by /dashboard/sales. */
export function parentGrantNote(code: string | undefined | null): string | null {
  return isParentCode(code) ? `parent_link:${code}` : null;
}

/** The student's email when a parent's payment lands (email_sends kind `parent_paid`). */
export const PARENT_PAID_KIND = "parent_paid" as const;

export function parentPaidDedupeKey(paymentId: string): string {
  return `${PARENT_PAID_KIND}:${paymentId}`;
}

export function buildParentPaidEmail(input: { name: string; planLabel: string; length: string }): BuiltEmail {
  const who = greetingName(input.name);
  const url = `${SITE_URL}/me`;
  const subject = `Your ${input.planLabel} is active`;
  const text = [
    who ? `Hi ${who},` : "Hi,",
    "",
    `Your ${input.planLabel} was paid through the link you sent. It is active now, for ${input.length}.`,
    "",
    `Start here: ${url}`,
    "",
    "Say thank you at home. You can reply to this email if anything looks wrong.",
    "",
    BRAND,
  ].join("\n");
  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:520px;margin:0 auto;color:${INK};line-height:1.55">
  <p style="margin:0 0 16px">${who ? `Hi ${escapeHtml(who)},` : "Hi,"}</p>
  <p style="margin:0 0 16px">Your <strong>${escapeHtml(input.planLabel)}</strong> was paid through the link you sent. It is active now, for ${escapeHtml(input.length)}.</p>
  <p style="margin:0 0 24px"><a href="${url}" style="background:${ACCENT};color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;display:inline-block;font-weight:600">Start practising</a></p>
  <p style="margin:0 0 24px;color:${MUTED};font-size:14px">Say thank you at home. You can reply to this email if anything looks wrong.</p>
  <p style="margin:0">${BRAND}</p>
</div>`;
  return { subject, text, html, replyTo: REPLY_TO, headers: {} };
}

export type ParentLinkSummary = { asked: number; opened: number; checkout: number; paid: number; rupees: number };

/**
 * The parent-link funnel for /dashboard/sales: distinct STUDENTS who made a
 * link, whose link a parent opened, whose parent started checkout; then the
 * passes paid that way (entitlement note `parent_link:<code>`) and their rupees.
 */
export function summariseParentLinks(
  events: readonly { userId: string; step: string }[],
  paid: readonly { amountPaise: number }[]
): ParentLinkSummary {
  const who = (step: string) => new Set(events.filter((e) => e.step === step).map((e) => e.userId)).size;
  return {
    asked: who("parent_link_created"),
    opened: who("parent_link_opened"),
    checkout: who("parent_checkout_opened"),
    paid: paid.length,
    rupees: Math.round(paid.reduce((sum, p) => sum + p.amountPaise, 0) / 100),
  };
}
